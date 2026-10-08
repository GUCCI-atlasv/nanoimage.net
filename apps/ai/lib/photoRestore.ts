/**
 * Photo Restore & Colorize — Canvas-based processing (PRD F4).
 *
 * Restore: adaptive contrast + denoising (bilateral-approximation) + Laplacian sharpening.
 * Colorize: luminance-guided warm-to-cool tone mapping that mimics realistic
 *   skin/sky/foliage hues without a neural network.
 *
 * Architecture note: GFPGAN / DeOldify ONNX models can be wired in when the
 * feasibility pre-research (PRD §4.4) is complete. The UI is already prepared
 * for the download-confirmation flow.
 */

type Progress = { pct: number }
type ProgressCb = (p: Progress) => void

// ── Restore ───────────────────────────────────────────────────────────────────

/**
 * Build a lookup table that maps each input luminance (0-255) to a new value
 * using adaptive histogram equalization (CLAHE-lite).
 * Works channel-by-channel on luminance, then re-applies to RGB.
 */
function buildEqLUT(src: Uint8ClampedArray, n: number): Uint8Array {
  const hist = new Int32Array(256)
  for (let i = 0; i < n; i++) {
    const r = src[i * 4]; const g = src[i * 4 + 1]; const b = src[i * 4 + 2]
    const lum = Math.round(0.299 * r + 0.587 * g + 0.114 * b)
    hist[lum]++
  }
  // Clip histogram at 2% of pixel count (avoids over-amplification)
  const clip = Math.max(1, Math.round(n * 0.02))
  let excess = 0
  for (let i = 0; i < 256; i++) {
    if (hist[i] > clip) { excess += hist[i] - clip; hist[i] = clip }
  }
  const perBin = Math.floor(excess / 256)
  for (let i = 0; i < 256; i++) hist[i] += perBin

  // CDF
  const cdf = new Int32Array(256)
  cdf[0] = hist[0]
  for (let i = 1; i < 256; i++) cdf[i] = cdf[i - 1] + hist[i]
  const cdfMin = cdf.find((v) => v > 0) ?? 1

  const lut = new Uint8Array(256)
  for (let i = 0; i < 256; i++) {
    lut[i] = Math.round(((cdf[i] - cdfMin) / (n - cdfMin)) * 255)
  }
  return lut
}

/** Apply a 3×3 Laplacian sharpening kernel to the image data. */
function applySharpen(data: Uint8ClampedArray, W: number, H: number, strength: number) {
  const tmp = new Uint8ClampedArray(data)
  // 3×3 Laplacian: [0,-1,0,-1,5,-1,0,-1,0] blended with original
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const i = (y * W + x) * 4
      for (let c = 0; c < 3; c++) {
        const val = (
          5 * tmp[i + c]
          - tmp[((y - 1) * W + x) * 4 + c]
          - tmp[((y + 1) * W + x) * 4 + c]
          - tmp[(y * W + x - 1) * 4 + c]
          - tmp[(y * W + x + 1) * 4 + c]
        )
        data[i + c] = Math.max(0, Math.min(255, Math.round(tmp[i + c] + strength * (val - tmp[i + c]))))
      }
    }
  }
}

/** Approximate bilateral filter: block-average then blend (quick denoiser). */
function applyDenoise(data: Uint8ClampedArray, W: number, H: number, radius: number) {
  const tmp = new Uint8ClampedArray(data)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4
      let r = 0, g = 0, b = 0, cnt = 0
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx; const ny = y + dy
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
          const j = (ny * W + nx) * 4
          // Weight by color similarity (approximate bilateral)
          const dR = tmp[i] - tmp[j]; const dG = tmp[i + 1] - tmp[j + 1]; const dB = tmp[i + 2] - tmp[j + 2]
          const colorDist2 = dR * dR + dG * dG + dB * dB
          if (colorDist2 > 2500) continue // skip pixels too different
          r += tmp[j]; g += tmp[j + 1]; b += tmp[j + 2]; cnt++
        }
      }
      if (cnt > 0) { data[i] = r / cnt; data[i + 1] = g / cnt; data[i + 2] = b / cnt }
    }
  }
}

export async function restorePhoto(
  bitmap: ImageBitmap,
  onProgress: ProgressCb,
): Promise<HTMLCanvasElement> {
  const W = bitmap.width; const H = bitmap.height
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0)
  const imageData = ctx.getImageData(0, 0, W, H)
  const d = imageData.data
  const n = W * H

  onProgress({ pct: 10 })
  await new Promise<void>((r) => setTimeout(r, 0))

  // 1. Gentle denoise
  applyDenoise(d, W, H, 1)
  onProgress({ pct: 35 })
  await new Promise<void>((r) => setTimeout(r, 0))

  // 2. Adaptive contrast via luminance LUT
  const lut = buildEqLUT(d, n)
  for (let i = 0; i < n; i++) {
    const r = d[i * 4]; const g = d[i * 4 + 1]; const b = d[i * 4 + 2]
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    const newLum = lut[Math.round(lum)]
    const ratio = lum > 0 ? newLum / lum : 1
    d[i * 4] = Math.min(255, Math.round(r * ratio))
    d[i * 4 + 1] = Math.min(255, Math.round(g * ratio))
    d[i * 4 + 2] = Math.min(255, Math.round(b * ratio))
  }
  onProgress({ pct: 65 })
  await new Promise<void>((r) => setTimeout(r, 0))

  // 3. Sharpening
  applySharpen(d, W, H, 0.35)
  onProgress({ pct: 90 })
  await new Promise<void>((r) => setTimeout(r, 0))

  ctx.putImageData(imageData, 0, 0)
  onProgress({ pct: 100 })
  return c
}

// ── Colorize ──────────────────────────────────────────────────────────────────

/**
 * Map a grayscale luminance (0–255) to an RGB offset using a hand-tuned
 * tone curve that produces realistic skin, sky, and foliage tones.
 *
 * Zones (approximate):
 *   0–60  shadows → warm blue-grey (dark interiors, shadows)
 *  60–130 midtones → warm skin / foliage green-teal
 * 130–200 highlights → sky-blue / warm daylight
 * 200–255 bright highlights → warm white
 */
function luminanceToColor(lum: number, strength: number): [number, number, number] {
  const t = lum / 255 // 0–1

  // Blend between a "cool shadow" palette and "warm highlight" palette
  let rAdd: number, gAdd: number, bAdd: number

  if (t < 0.25) {
    // Deep shadow → warm brown/sepia
    rAdd = 20 + t * 60; gAdd = 10 + t * 20; bAdd = -10
  } else if (t < 0.55) {
    // Midtone → green/teal (foliage, fabric)
    const m = (t - 0.25) / 0.3
    rAdd = -10 + m * 30; gAdd = 20 + m * 20; bAdd = 5 + m * 20
  } else if (t < 0.82) {
    // Upper midtone → sky blue / skin
    const m = (t - 0.55) / 0.27
    rAdd = 20 + m * 40; gAdd = 30 + m * 10; bAdd = 20 + m * 30
  } else {
    // Bright highlight → warm white
    rAdd = 25; gAdd = 20; bAdd = 10
  }

  return [rAdd * strength, gAdd * strength, bAdd * strength]
}

export async function colorizePhoto(
  bitmap: ImageBitmap,
  strength: number, // 0–1
  onProgress: ProgressCb,
): Promise<HTMLCanvasElement> {
  const W = bitmap.width; const H = bitmap.height
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0)
  const imageData = ctx.getImageData(0, 0, W, H)
  const d = imageData.data

  onProgress({ pct: 15 })
  await new Promise<void>((r) => setTimeout(r, 0))

  // First pass: ensure the image is truly grey-balanced (remove any sepia cast)
  // by converting to luminance first
  const n = W * H
  for (let i = 0; i < n; i++) {
    const lum = Math.round(0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2])
    d[i * 4] = lum; d[i * 4 + 1] = lum; d[i * 4 + 2] = lum
  }

  onProgress({ pct: 35 })
  await new Promise<void>((r) => setTimeout(r, 0))

  // Second pass: apply color mapping
  for (let i = 0; i < n; i++) {
    const lum = d[i * 4] // already greyscale
    const [dr, dg, db] = luminanceToColor(lum, strength)
    d[i * 4] = Math.max(0, Math.min(255, lum + dr))
    d[i * 4 + 1] = Math.max(0, Math.min(255, lum + dg))
    d[i * 4 + 2] = Math.max(0, Math.min(255, lum + db))
  }

  onProgress({ pct: 80 })
  await new Promise<void>((r) => setTimeout(r, 0))

  // Subtle sharpening to recover edge crispness after colorize smoothing
  applySharpen(d, W, H, 0.15)

  ctx.putImageData(imageData, 0, 0)
  onProgress({ pct: 100 })
  return c
}

/** Convenience: both restore then colorize sequentially. */
export async function restoreAndColorize(
  bitmap: ImageBitmap,
  strength: number,
  onProgress: ProgressCb,
): Promise<HTMLCanvasElement> {
  const restored = await restorePhoto(bitmap, (p) => onProgress({ pct: Math.round(p.pct * 0.5) }))
  // Turn the restored canvas into a bitmap for colorize
  const bitmap2 = await createImageBitmap(restored)
  return colorizePhoto(bitmap2, strength, (p) => onProgress({ pct: 50 + Math.round(p.pct * 0.5) }))
}
