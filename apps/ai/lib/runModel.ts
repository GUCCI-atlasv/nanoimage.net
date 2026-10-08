/**
 * runModel — unified on-device inference wrapper (PRD §4.1).
 *
 * Every feature loads its model lazily on first use and caches it in browser
 * Cache Storage (handled by transformers.js). Nothing here ever uploads the
 * user's image; only model *weights* are fetched from a CDN.
 *
 * This module is browser-only: import it from a 'use client' component and only
 * call its functions inside event handlers / effects.
 */
import type { CapabilityTier } from './capability'

export type DownloadProgress = {
  /** 0–100, best-effort across files. */
  percent: number
  file?: string
  loadedMb?: number
  totalMb?: number
}

type ProgressCb = (p: DownloadProgress) => void

// transformers.js progress events are loosely typed.
type TJProgress = {
  status: string
  file?: string
  progress?: number
  loaded?: number
  total?: number
}

function deviceFor(tier: CapabilityTier): 'webgpu' | 'wasm' {
  return tier === 'webgpu' ? 'webgpu' : 'wasm'
}

// ── Background removal (F1): RMBG-1.4 via transformers.js ────────────────────

const RMBG_MODEL = 'briaai/RMBG-1.4'

type BgPipeline = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  processor: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RawImage: any
}

let bgPipelinePromise: Promise<BgPipeline> | null = null

async function loadBgPipeline(tier: CapabilityTier, onProgress?: ProgressCb): Promise<BgPipeline> {
  if (bgPipelinePromise) return bgPipelinePromise

  bgPipelinePromise = (async () => {
    const tj = await import('@huggingface/transformers')
    const { AutoModel, AutoProcessor, RawImage, env } = tj

    // Allow remote model download (weights only), keep local model dir off.
    env.allowLocalModels = false

    const progress_callback = (e: TJProgress) => {
      if (!onProgress) return
      if (e.status === 'progress') {
        const pct = typeof e.progress === 'number' ? Math.round(e.progress) : 0
        onProgress({
          percent: pct,
          file: e.file,
          loadedMb: e.loaded ? +(e.loaded / 1_048_576).toFixed(1) : undefined,
          totalMb: e.total ? +(e.total / 1_048_576).toFixed(1) : undefined,
        })
      } else if (e.status === 'done' || e.status === 'ready') {
        onProgress({ percent: 100, file: e.file })
      }
    }

    const model = await AutoModel.from_pretrained(RMBG_MODEL, {
      // RMBG ships fp32; use it on both backends for correctness.
      device: deviceFor(tier),
      progress_callback,
      config: { model_type: 'custom' } as unknown as undefined,
    })
    const processor = await AutoProcessor.from_pretrained(RMBG_MODEL, {
      progress_callback,
      config: {
        do_normalize: true,
        do_pad: false,
        do_rescale: true,
        do_resize: true,
        image_mean: [0.5, 0.5, 0.5],
        image_std: [1, 1, 1],
        size: { width: 1024, height: 1024 },
      } as unknown as undefined,
    })

    return { model, processor, RawImage }
  })()

  return bgPipelinePromise
}

export type BgResult = {
  /** RGBA canvas with background removed (alpha = subject). */
  canvas: HTMLCanvasElement
  width: number
  height: number
}

/**
 * Remove the background from an image blob/URL. Returns a transparent-bg canvas.
 */
export async function removeBackground(
  source: Blob | string,
  tier: CapabilityTier,
  onProgress?: ProgressCb,
): Promise<BgResult> {
  const { model, processor, RawImage } = await loadBgPipeline(tier, onProgress)

  const url = typeof source === 'string' ? source : URL.createObjectURL(source)
  try {
    const image = await RawImage.fromURL(url)
    const { pixel_values } = await processor(image)
    const { output } = await model({ input: pixel_values })

    // output is the alpha mask; resize back to original dimensions.
    const mask = await RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(
      image.width,
      image.height,
    )

    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const ctx = canvas.getContext('2d')!

    // Draw original image, then apply mask to the alpha channel.
    const bitmap = await createImageBitmap(
      typeof source === 'string' ? await (await fetch(source)).blob() : source,
    )
    ctx.drawImage(bitmap, 0, 0, image.width, image.height)
    bitmap.close()

    const imageData = ctx.getImageData(0, 0, image.width, image.height)
    const data = imageData.data
    const maskData = mask.data
    for (let i = 0; i < maskData.length; i++) {
      data[i * 4 + 3] = maskData[i]
    }
    ctx.putImageData(imageData, 0, 0)

    return { canvas, width: image.width, height: image.height }
  } finally {
    if (typeof source !== 'string') URL.revokeObjectURL(url)
  }
}

/** Composite a transparent-subject canvas over a solid background color. */
export function compositeOnColor(src: HTMLCanvasElement, color: string): HTMLCanvasElement {
  const out = document.createElement('canvas')
  out.width = src.width
  out.height = src.height
  const ctx = out.getContext('2d')!
  ctx.fillStyle = color
  ctx.fillRect(0, 0, out.width, out.height)
  ctx.drawImage(src, 0, 0)
  return out
}
