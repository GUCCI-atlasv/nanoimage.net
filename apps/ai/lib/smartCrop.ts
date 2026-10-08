/**
 * Smart Crop — pure-Canvas Sobel energy algorithm (no model, no network).
 * PRD §4.2: downsample → grayscale → Sobel gradient → integral image →
 *           sliding window to maximise energy → map back to original coords.
 */

export type CropBox = { x: number; y: number; w: number; h: number } // pixels in original image

export type AspectRatio = { label: string; w: number; h: number }

export const ASPECT_RATIOS: AspectRatio[] = [
  { label: '1:1', w: 1, h: 1 },
  { label: '4:5', w: 4, h: 5 },
  { label: '4:3', w: 4, h: 3 },
  { label: '16:9', w: 16, h: 9 },
  { label: '9:16', w: 9, h: 16 },
]

// Downsample target width for energy computation (speed vs accuracy trade-off).
const THUMB_W = 280

// ── Helpers ───────────────────────────────────────────────────────────────────

function getImageData(img: HTMLImageElement | ImageBitmap): ImageData {
  const w = img.width
  const h = img.height
  const scale = Math.min(THUMB_W / w, 1)
  const tw = Math.round(w * scale)
  const th = Math.round(h * scale)

  const canvas = document.createElement('canvas')
  canvas.width = tw
  canvas.height = th
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img as CanvasImageSource, 0, 0, tw, th)
  return ctx.getImageData(0, 0, tw, th)
}

function toGrayscale(data: Uint8ClampedArray, w: number, h: number): Float32Array {
  const gray = new Float32Array(w * h)
  for (let i = 0; i < w * h; i++) {
    gray[i] = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]
  }
  return gray
}

const GX = [-1, 0, 1, -2, 0, 2, -1, 0, 1]
const GY = [-1, -2, -1, 0, 0, 0, 1, 2, 1]

function sobelEnergy(gray: Float32Array, w: number, h: number): Float32Array {
  const energy = new Float32Array(w * h)
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let gx = 0
      let gy = 0
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const ki = (ky + 1) * 3 + (kx + 1)
          const val = gray[(y + ky) * w + (x + kx)]
          gx += GX[ki] * val
          gy += GY[ki] * val
        }
      }
      energy[y * w + x] = Math.sqrt(gx * gx + gy * gy)
    }
  }
  return energy
}

/**
 * Build a 2-D prefix-sum (integral image) from a flat energy array.
 * Output size: (w+1) × (h+1), row-major, with a zero-padded top/left border.
 */
function buildIntegral(energy: Float32Array, w: number, h: number): Float64Array {
  const W = w + 1
  const integral = new Float64Array(W * (h + 1))
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      integral[(y + 1) * W + (x + 1)] =
        energy[y * w + x] +
        integral[y * W + (x + 1)] +
        integral[(y + 1) * W + x] -
        integral[y * W + x]
    }
  }
  return integral
}

/** Sum of energy in rect [x1,y1]–[x2,y2] inclusive using integral image (W = w+1). */
function rectSum(
  integral: Float64Array,
  W: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  return (
    integral[(y2 + 1) * W + (x2 + 1)] -
    integral[y1 * W + (x2 + 1)] -
    integral[(y2 + 1) * W + x1] +
    integral[y1 * W + x1]
  )
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Find the crop box with the maximum Sobel energy for a given aspect ratio.
 * Returns coordinates in the **original image** pixel space.
 */
export function findBestCrop(
  img: HTMLImageElement | ImageBitmap,
  ratio: AspectRatio,
): CropBox {
  const imgW = img.width
  const imgH = img.height

  const { data, width: tw, height: th } = getImageData(img)
  const gray = toGrayscale(data, tw, th)
  const energy = sobelEnergy(gray, tw, th)
  const integral = buildIntegral(energy, tw, th)
  const W = tw + 1

  const rW = ratio.w
  const rH = ratio.h

  // Largest crop window that fits inside the thumbnail with the target ratio.
  let cropW: number
  let cropH: number
  if (tw / th > rW / rH) {
    // Image is wider than ratio → height constrained
    cropH = th
    cropW = Math.round((th * rW) / rH)
  } else {
    cropW = tw
    cropH = Math.round((tw * rH) / rW)
  }
  cropW = Math.min(cropW, tw)
  cropH = Math.min(cropH, th)

  let bestScore = -1
  let bestX = 0
  let bestY = 0

  // Slide horizontally if crop is height-constrained, vertically if width-constrained.
  if (cropH === th) {
    // Slide left-right
    for (let x = 0; x <= tw - cropW; x++) {
      const score = rectSum(integral, W, x, 0, x + cropW - 1, th - 1)
      if (score > bestScore) {
        bestScore = score
        bestX = x
        bestY = 0
      }
    }
  } else {
    // Slide top-bottom
    for (let y = 0; y <= th - cropH; y++) {
      const score = rectSum(integral, W, 0, y, tw - 1, y + cropH - 1)
      if (score > bestScore) {
        bestScore = score
        bestX = 0
        bestY = y
      }
    }
  }

  // Scale back to original image space.
  const scaleX = imgW / tw
  const scaleY = imgH / th
  return {
    x: Math.round(bestX * scaleX),
    y: Math.round(bestY * scaleY),
    w: Math.round(cropW * scaleX),
    h: Math.round(cropH * scaleY),
  }
}

/**
 * Draw the crop overlay on a canvas that already has the image painted on it.
 * - Darkens everything outside the crop box.
 * - Draws a bright border + corner handles.
 */
export function drawCropOverlay(
  ctx: CanvasRenderingContext2D,
  canvasW: number,
  canvasH: number,
  box: CropBox, // in canvas / display pixels
  active = false,
) {
  const { x, y, w, h } = box

  ctx.save()

  // Dark mask OUTSIDE the crop box only.
  // Using evenodd fill rule with two rects (outer canvas + inner crop area):
  // pixels inside the crop box get winding count = 2 (even → not filled),
  // pixels outside get count = 1 (odd → filled).
  // This preserves the image pixels inside the crop box instead of clearing them.
  ctx.fillStyle = 'rgba(0,0,0,0.45)'
  ctx.beginPath()
  ctx.rect(0, 0, canvasW, canvasH)
  ctx.rect(x, y, w, h)
  ctx.fill('evenodd')

  // Border
  ctx.strokeStyle = active ? '#fff' : 'rgba(255,255,255,0.85)'
  ctx.lineWidth = 1.5
  ctx.strokeRect(x, y, w, h)

  // Rule-of-thirds grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.25)'
  ctx.lineWidth = 0.75
  for (let i = 1; i < 3; i++) {
    const gx = x + (w / 3) * i
    const gy = y + (h / 3) * i
    ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx, y + h); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x + w, gy); ctx.stroke()
  }

  // Corner handles
  const hs = 10
  ctx.fillStyle = '#fff'
  const corners: [number, number][] = [
    [x, y], [x + w - hs, y],
    [x, y + h - hs], [x + w - hs, y + h - hs],
  ]
  for (const [cx, cy] of corners) ctx.fillRect(cx, cy, hs, hs)

  ctx.restore()
}

/** Export the crop region from an ImageBitmap at full resolution. Returns a data URL. */
export function exportCrop(src: ImageBitmap, box: CropBox, format = 'image/png'): string {
  const canvas = document.createElement('canvas')
  canvas.width = box.w
  canvas.height = box.h
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(src, box.x, box.y, box.w, box.h, 0, 0, box.w, box.h)
  return canvas.toDataURL(format)
}
