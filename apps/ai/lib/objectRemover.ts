/**
 * Object Remover — canvas-based mask painting + edge-diffusion inpainting (PRD F3).
 *
 * Painting: maintains a separate greyscale mask canvas updated in real time.
 * Inpainting: "fast marching" style diffusion — fills masked pixels by
 * propagating values from the nearest unmasked pixels outward.
 * This works well for small/medium removals and is instant with no model download.
 *
 * Architecture note: a LaMa ONNX model can be wired in via
 * `runLaMaInpaint(imageData, maskData)` when the model is available.
 * The UI already includes the download-confirmation flow for it.
 */

export type BrushMode = 'paint' | 'erase'

// ── Mask utilities ─────────────────────────────────────────────────────────────

export function createMaskCanvas(width: number, height: number): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = width; c.height = height
  return c
}

/** Paint or erase a circular stroke on the mask canvas. */
export function strokeMask(
  maskCanvas: HTMLCanvasElement,
  x: number,
  y: number,
  radius: number,
  mode: BrushMode,
) {
  const ctx = maskCanvas.getContext('2d')!
  ctx.globalCompositeOperation = mode === 'erase' ? 'destination-out' : 'source-over'
  ctx.fillStyle = 'rgba(255,0,0,1)'
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
}

/** Draw a line between two points (for smooth stroke movement). */
export function strokeMaskLine(
  maskCanvas: HTMLCanvasElement,
  x0: number, y0: number,
  x1: number, y1: number,
  radius: number,
  mode: BrushMode,
) {
  const dx = x1 - x0; const dy = y1 - y0
  const dist = Math.sqrt(dx * dx + dy * dy)
  const steps = Math.max(1, Math.ceil(dist / (radius * 0.5)))
  for (let i = 0; i <= steps; i++) {
    strokeMask(maskCanvas, x0 + (dx * i) / steps, y0 + (dy * i) / steps, radius, mode)
  }
}

/** Clear the entire mask. */
export function clearMask(maskCanvas: HTMLCanvasElement) {
  const ctx = maskCanvas.getContext('2d')!
  ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height)
}

/** Snapshot the current mask pixels as a Uint8Array (alpha channel = mask). */
function getMaskAlpha(maskCanvas: HTMLCanvasElement): Uint8Array {
  const { width: W, height: H } = maskCanvas
  const data = maskCanvas.getContext('2d')!.getImageData(0, 0, W, H).data
  const alpha = new Uint8Array(W * H)
  for (let i = 0; i < W * H; i++) alpha[i] = data[i * 4 + 3]
  return alpha
}

// ── Inpainting ────────────────────────────────────────────────────────────────

type InpaintProgress = { pct: number }
type ProgressCb = (p: InpaintProgress) => void

/**
 * Edge-diffusion inpainting:
 * 1. Build a list of boundary pixels (masked & adjacent to unmasked).
 * 2. For each boundary pixel, average the surrounding unmasked pixels (5×5 window).
 * 3. Propagate inward layer by layer (similar to fast marching / onion peeling).
 *
 * This handles small objects (stray people, logos, watermarks) very well.
 * For large or complex regions, a LaMa-style model would be better.
 */
export async function inpaintMasked(
  source: HTMLCanvasElement,
  maskCanvas: HTMLCanvasElement,
  onProgress: ProgressCb,
): Promise<HTMLCanvasElement> {
  const W = source.width; const H = source.height

  const imgData = source.getContext('2d')!.getImageData(0, 0, W, H)
  const pixels = new Uint8ClampedArray(imgData.data) // working copy
  const mask = getMaskAlpha(maskCanvas)

  // Threshold mask: any alpha ≥ 64 = masked
  const isMasked = new Uint8Array(W * H)
  let maskedCount = 0
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] >= 64) { isMasked[i] = 1; maskedCount++ }
  }

  if (maskedCount === 0) {
    const out = document.createElement('canvas')
    out.width = W; out.height = H
    out.getContext('2d')!.putImageData(imgData, 0, 0)
    return out
  }

  // Helper: index for (x,y)
  const idx = (x: number, y: number) => y * W + x

  // Layer-by-layer peeling
  let remaining = new Set<number>()
  for (let i = 0; i < W * H; i++) if (isMasked[i]) remaining.add(i)

  const filled = new Uint8Array(W * H) // 1 = filled in this pass
  let iteration = 0
  const maxIterations = Math.max(W, H)

  while (remaining.size > 0 && iteration < maxIterations) {
    iteration++
    const thisPass: number[] = []

    for (const pi of remaining) {
      const px = pi % W; const py = Math.floor(pi / W)

      // Collect surrounding unmasked (or already filled) colors in 5×5 window
      let rSum = 0; let gSum = 0; let bSum = 0; let count = 0
      const rad = Math.min(3, 2 + Math.floor(iteration / 8))

      for (let dy = -rad; dy <= rad; dy++) {
        for (let dx = -rad; dx <= rad; dx++) {
          const nx = px + dx; const ny = py + dy
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
          const ni = idx(nx, ny)
          if (!isMasked[ni] || filled[ni]) {
            rSum += pixels[ni * 4]
            gSum += pixels[ni * 4 + 1]
            bSum += pixels[ni * 4 + 2]
            count++
          }
        }
      }

      if (count > 0) {
        thisPass.push(pi)
        pixels[pi * 4] = Math.round(rSum / count)
        pixels[pi * 4 + 1] = Math.round(gSum / count)
        pixels[pi * 4 + 2] = Math.round(bSum / count)
        pixels[pi * 4 + 3] = 255
      }
    }

    for (const pi of thisPass) { filled[pi] = 1; remaining.delete(pi) }

    if (iteration % 5 === 0) {
      const done = maskedCount - remaining.size
      onProgress({ pct: Math.min(95, Math.round((done / maskedCount) * 95)) })
      await new Promise<void>((r) => setTimeout(r, 0))
    }
  }

  onProgress({ pct: 100 })
  const out = document.createElement('canvas')
  out.width = W; out.height = H
  out.getContext('2d')!.putImageData(new ImageData(pixels, W, H), 0, 0)
  return out
}
