/**
 * Portrait Blur — MediaPipe selfie_segmenter wrapper (PRD §4.3).
 *
 * WASM runtime: self-hosted at /wasm/ (copied from node_modules during build).
 * This eliminates the third-party jsdelivr CDN dependency and its single-point
 * failure risk.
 *
 * Model: selfie_segmenter float16, ~3 MB, loaded from Google's MediaPipe CDN
 * (storage.googleapis.com) on first use and cached in the browser.
 *
 * This file is browser-only. Only call from 'use client' components.
 */

// Self-hosted WASM runtime (served from Cloudflare Pages, no third-party CDN)
const MEDIAPIPE_WASM = '/wasm'

const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let segmenterPromise: Promise<any> | null = null

export type BlurPhase = 'idle' | 'loading' | 'segmenting' | 'done' | 'error'

/**
 * Lazily load and cache the MediaPipe ImageSegmenter.
 * Uses GPU delegate when available, falls back to CPU.
 */
export async function getSegmenter(preferGpu: boolean) {
  if (segmenterPromise) return segmenterPromise

  segmenterPromise = (async () => {
    const { ImageSegmenter, FilesetResolver } = await import('@mediapipe/tasks-vision')

    const vision = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM)

    try {
      return await ImageSegmenter.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: MODEL_URL,
          delegate: preferGpu ? 'GPU' : 'CPU',
        },
        runningMode: 'IMAGE',
        outputCategoryMask: false,
        outputConfidenceMasks: true,
      })
    } catch {
      // GPU delegate failed — retry with CPU
      return await ImageSegmenter.createFromOptions(vision, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate: 'CPU' },
        runningMode: 'IMAGE',
        outputCategoryMask: false,
        outputConfidenceMasks: true,
      })
    }
  })()

  return segmenterPromise
}

/**
 * Apply portrait background blur.
 * Returns a composited HTMLCanvasElement: sharp subject over blurred background.
 *
 * @param bitmap    Source ImageBitmap (full resolution)
 * @param blurPx    CSS blur radius in display pixels (maps to radius for the output)
 * @param preferGpu Use GPU delegate when available
 */
export async function blurBackground(
  bitmap: ImageBitmap,
  blurPx: number,
  preferGpu: boolean,
): Promise<HTMLCanvasElement> {
  const segmenter = await getSegmenter(preferGpu)

  // Render bitmap to an HTMLImageElement-like source via an offscreen canvas.
  // MediaPipe's segment() accepts HTMLImageElement | HTMLVideoElement | HTMLCanvasElement.
  const srcCanvas = document.createElement('canvas')
  srcCanvas.width = bitmap.width
  srcCanvas.height = bitmap.height
  const srcCtx = srcCanvas.getContext('2d')!
  srcCtx.drawImage(bitmap, 0, 0)

  const result = segmenter.segment(srcCanvas)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const maskTensor = result.confidenceMasks?.[0] as any
  if (!maskTensor) throw new Error('Segmentation returned no confidence mask.')

  // maskTensor is a MPMask — get the underlying Float32Array via getAsFloat32Array().
  const maskData: Float32Array = maskTensor.getAsFloat32Array()
  const mW: number = maskTensor.width
  const mH: number = maskTensor.height
  maskTensor.close()

  const W = bitmap.width
  const H = bitmap.height

  // ── 1. Create blurred background ──────────────────────────────────────────
  const bgCanvas = document.createElement('canvas')
  bgCanvas.width = W
  bgCanvas.height = H
  const bgCtx = bgCanvas.getContext('2d')!
  bgCtx.filter = `blur(${blurPx}px)`
  bgCtx.drawImage(bitmap, 0, 0)
  bgCtx.filter = 'none'
  const bgData = bgCtx.getImageData(0, 0, W, H)

  // ── 2. Get original pixel data ────────────────────────────────────────────
  const origData = srcCtx.getImageData(0, 0, W, H)

  // ── 3. Composite: alpha-blend original (foreground) over blurred (background)
  const out = new Uint8ClampedArray(W * H * 4)
  for (let py = 0; py < H; py++) {
    for (let px = 0; px < W; px++) {
      const pi = py * W + px

      // Sample the mask at mask resolution (nearest-neighbor).
      const mx = Math.min(Math.round((px / W) * mW), mW - 1)
      const my = Math.min(Math.round((py / H) * mH), mH - 1)
      const alpha = maskData[my * mW + mx] // 0 = background, 1 = subject

      const oi = pi * 4
      out[oi]     = Math.round(alpha * origData.data[oi]     + (1 - alpha) * bgData.data[oi])
      out[oi + 1] = Math.round(alpha * origData.data[oi + 1] + (1 - alpha) * bgData.data[oi + 1])
      out[oi + 2] = Math.round(alpha * origData.data[oi + 2] + (1 - alpha) * bgData.data[oi + 2])
      out[oi + 3] = 255
    }
  }

  const outCanvas = document.createElement('canvas')
  outCanvas.width = W
  outCanvas.height = H
  const outCtx = outCanvas.getContext('2d')!
  outCtx.putImageData(new ImageData(out, W, H), 0, 0)
  return outCanvas
}
