/**
 * Image Upscaler — high-quality Canvas-based super-resolution (PRD F2).
 *
 * Technique: iterative bilinear upsampling in 1.4× steps (avoids aliasing
 * from one large jump) + adaptive unsharp mask post-processing.
 *
 * This produces visibly sharper results than a single bicubic step and
 * works on any device with no model download. It is labelled clearly as
 * "Canvas mode" while the architecture is ready to accept a WebGPU/ONNX
 * model (Real-ESRGAN / Swin2SR) as a drop-in replacement.
 *
 * All processing is synchronous per-step so we can report progress.
 */

export type UpscaleMode = 'photo' | 'illustration'

export type UpscaleProgress = {
  phase: 'upscaling' | 'sharpening' | 'done'
  stepsDone: number
  stepsTotal: number
  pct: number
}

type ProgressCb = (p: UpscaleProgress) => void

// ── Internal helpers ──────────────────────────────────────────────────────────

/** Step-scale an image on an offscreen canvas. Returns a new canvas. */
function scaleStep(src: HTMLCanvasElement, factor: number): HTMLCanvasElement {
  const w = Math.round(src.width * factor)
  const h = Math.round(src.height * factor)
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const ctx = c.getContext('2d')!
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(src, 0, 0, w, h)
  return c
}

/**
 * Unsharp mask: subtract a blurred copy, scale the high-frequency part,
 * add back to original. Strength 0–2 (1 = standard).
 * Illustration mode uses a softer radius to preserve linework.
 */
function unsharpMask(
  src: HTMLCanvasElement,
  radius: number,
  amount: number,
): HTMLCanvasElement {
  const W = src.width; const H = src.height

  // Blur the source onto a temp canvas using CSS filter
  const blurred = document.createElement('canvas')
  blurred.width = W; blurred.height = H
  const bCtx = blurred.getContext('2d')!
  bCtx.filter = `blur(${radius}px)`
  bCtx.drawImage(src, 0, 0)
  bCtx.filter = 'none'

  const origData = src.getContext('2d')!.getImageData(0, 0, W, H)
  const blurData = bCtx.getImageData(0, 0, W, H)
  const out = new Uint8ClampedArray(origData.data.length)

  for (let i = 0; i < origData.data.length; i++) {
    if ((i & 3) === 3) { out[i] = origData.data[i]; continue } // alpha
    const orig = origData.data[i]
    const blur = blurData.data[i]
    const high = orig - blur
    out[i] = Math.max(0, Math.min(255, Math.round(orig + amount * high)))
  }

  const outCanvas = document.createElement('canvas')
  outCanvas.width = W; outCanvas.height = H
  outCanvas.getContext('2d')!.putImageData(new ImageData(out, W, H), 0, 0)
  return outCanvas
}

/** Apply a subtle contrast boost (better perceived sharpness for photo mode). */
function contrastBoost(src: HTMLCanvasElement, factor: number): HTMLCanvasElement {
  const W = src.width; const H = src.height
  const data = src.getContext('2d')!.getImageData(0, 0, W, H)
  const d = data.data
  for (let i = 0; i < d.length; i++) {
    if ((i & 3) === 3) continue
    d[i] = Math.max(0, Math.min(255, Math.round(128 + factor * (d[i] - 128))))
  }
  const out = document.createElement('canvas')
  out.width = W; out.height = H
  out.getContext('2d')!.putImageData(data, 0, 0)
  return out
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Upscale an image by `scale` (2 or 4) using iterative bilinear + unsharp mask.
 * Reports progress via `onProgress`. Yields to the event loop between steps
 * via `setTimeout(0)` so the UI stays responsive.
 */
export async function upscaleImage(
  bitmap: ImageBitmap,
  scale: 2 | 4,
  mode: UpscaleMode,
  onProgress: ProgressCb,
): Promise<HTMLCanvasElement> {
  // Draw source onto a canvas so we can manipulate it
  let current = document.createElement('canvas')
  current.width = bitmap.width; current.height = bitmap.height
  current.getContext('2d')!.drawImage(bitmap, 0, 0)

  // Determine step sequence: 1.4× steps until we reach the target scale
  const steps: number[] = []
  let accumulated = 1
  while (accumulated < scale - 0.01) {
    const remaining = scale / accumulated
    const step = Math.min(remaining, 1.6) // max 1.6× per step
    steps.push(step)
    accumulated *= step
  }

  const total = steps.length + 1 // +1 for sharpening

  for (let i = 0; i < steps.length; i++) {
    onProgress({ phase: 'upscaling', stepsDone: i, stepsTotal: total, pct: Math.round((i / total) * 85) })
    // Yield to event loop
    await new Promise<void>((r) => setTimeout(r, 0))
    current = scaleStep(current, steps[i])
  }

  // Sharpening pass
  onProgress({ phase: 'sharpening', stepsDone: steps.length, stepsTotal: total, pct: 90 })
  await new Promise<void>((r) => setTimeout(r, 0))

  if (mode === 'photo') {
    current = unsharpMask(current, 1.5, 0.7)
    current = contrastBoost(current, 1.05)
  } else {
    // Illustration: crisp edges without halos
    current = unsharpMask(current, 0.8, 0.55)
  }

  onProgress({ phase: 'done', stepsDone: total, stepsTotal: total, pct: 100 })
  return current
}

/** Quick bicubic-equivalent for the "original" preview (used in before/after). */
export function scaleToCanvas(bitmap: ImageBitmap, scale: number): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = Math.round(bitmap.width * scale)
  c.height = Math.round(bitmap.height * scale)
  const ctx = c.getContext('2d')!
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(bitmap, 0, 0, c.width, c.height)
  return c
}

/**
 * Synchronous multi-pass upscale to an exact target size.
 * Same technique as `upscaleImage` (iterative ≤1.6× bilinear steps + adaptive
 * unsharp mask) but without progress callbacks or event-loop yields, so it can
 * drop into the main site's synchronous canvas pipeline. Used by the merged
 * /upscale-image tool (upgraded engine from ai.nanoimage.net, 2026-07).
 */
export function upscaleToCanvasSync(
  bitmap: ImageBitmap,
  targetWidth: number,
  targetHeight: number,
  mode: UpscaleMode = 'photo',
): HTMLCanvasElement {
  let current = document.createElement('canvas')
  current.width = bitmap.width
  current.height = bitmap.height
  current.getContext('2d')!.drawImage(bitmap, 0, 0)

  const scale = Math.max(targetWidth / bitmap.width, targetHeight / bitmap.height, 1)
  let accumulated = 1
  while (accumulated < scale - 0.01) {
    const remaining = scale / accumulated
    const step = Math.min(remaining, 1.6)
    current = scaleStep(current, step)
    accumulated *= step
  }

  // Snap exactly to the requested output size.
  if (current.width !== targetWidth || current.height !== targetHeight) {
    const snap = document.createElement('canvas')
    snap.width = targetWidth
    snap.height = targetHeight
    const sCtx = snap.getContext('2d')!
    sCtx.imageSmoothingEnabled = true
    sCtx.imageSmoothingQuality = 'high'
    sCtx.drawImage(current, 0, 0, targetWidth, targetHeight)
    current = snap
  }

  if (scale > 1.01) {
    current = mode === 'photo'
      ? contrastBoost(unsharpMask(current, 1.5, 0.7), 1.05)
      : unsharpMask(current, 0.8, 0.55)
  }
  return current
}
