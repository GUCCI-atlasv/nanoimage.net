export type MergeDirection = 'horizontal' | 'vertical';
export type ResizeStrategy = 'none' | 'smallest' | 'largest' | 'first';

export interface MergeLayoutInput {
  naturalWidths: number[];
  naturalHeights: number[];
  direction: MergeDirection;
  resizeStrategy: ResizeStrategy;
  constrainProportions: boolean;
  borderThickness: number;
}

export interface ImagePlacement {
  dx: number;
  dy: number;
  dw: number;
  dh: number;
}

export interface MergeLayout {
  canvasWidth: number;
  canvasHeight: number;
  innerW: number;
  innerH: number;
  borderThickness: number;
  placements: ImagePlacement[];
}

function sum(a: number[]): number {
  return a.reduce((s, v) => s + v, 0);
}

function horizontalScaledWidths(w: number[], h: number[], refH: number): number[] {
  return w.map((wi, i) => Math.round((wi * refH) / h[i]));
}

function verticalScaledHeights(w: number[], h: number[], refW: number): number[] {
  return h.map((hi, i) => Math.round((hi * refW) / w[i]));
}

/**
 * Computes canvas size and per-image draw rectangles (horizontal = row, vertical = column).
 */
export function computeMergeLayout(input: MergeLayoutInput): MergeLayout {
  const { naturalWidths: w, naturalHeights: h, direction, resizeStrategy, constrainProportions, borderThickness: T } = input;
  const n = w.length;
  if (n === 0) {
    return { canvasWidth: T * 2, canvasHeight: T * 2, innerW: 0, innerH: 0, borderThickness: T, placements: [] };
  }

  const dw: number[] = new Array(n);
  const dh: number[] = new Array(n);

  if (direction === 'horizontal') {
    if (resizeStrategy === 'none') {
      for (let i = 0; i < n; i++) {
        dw[i] = w[i];
        dh[i] = h[i];
      }
    } else {
      let refH: number;
      if (resizeStrategy === 'smallest') refH = Math.min(...h);
      else if (resizeStrategy === 'largest') refH = Math.max(...h);
      else refH = h[0];

      if (constrainProportions) {
        const sw = horizontalScaledWidths(w, h, refH);
        for (let i = 0; i < n; i++) {
          dh[i] = refH;
          dw[i] = sw[i];
        }
      } else {
        const sw = horizontalScaledWidths(w, h, refH);
        const refW = Math.max(...sw);
        for (let i = 0; i < n; i++) {
          dh[i] = refH;
          dw[i] = refW;
        }
      }
    }

    const innerH = Math.max(...dh);
    const innerW = sum(dw) + T * Math.max(0, n - 1);
    const placements: ImagePlacement[] = [];
    let x = T;
    for (let i = 0; i < n; i++) {
      const yi = T + (innerH - dh[i]) / 2;
      placements.push({ dx: x, dy: yi, dw: dw[i], dh: dh[i] });
      x += dw[i] + T;
    }

    return {
      canvasWidth: innerW + 2 * T,
      canvasHeight: innerH + 2 * T,
      innerW,
      innerH,
      borderThickness: T,
      placements,
    };
  }

  // vertical
  if (resizeStrategy === 'none') {
    for (let i = 0; i < n; i++) {
      dw[i] = w[i];
      dh[i] = h[i];
    }
  } else {
    let refW: number;
    if (resizeStrategy === 'smallest') refW = Math.min(...w);
    else if (resizeStrategy === 'largest') refW = Math.max(...w);
    else refW = w[0];

    if (constrainProportions) {
      const sh = verticalScaledHeights(w, h, refW);
      for (let i = 0; i < n; i++) {
        dw[i] = refW;
        dh[i] = sh[i];
      }
    } else {
      const sh = verticalScaledHeights(w, h, refW);
      const refH = Math.max(...sh);
      for (let i = 0; i < n; i++) {
        dw[i] = refW;
        dh[i] = refH;
      }
    }
  }

  const innerW = Math.max(...dw);
  const innerH = sum(dh) + T * Math.max(0, n - 1);
  const placements: ImagePlacement[] = [];
  let y = T;
  for (let i = 0; i < n; i++) {
    const xi = T + (innerW - dw[i]) / 2;
    placements.push({ dx: xi, dy: y, dw: dw[i], dh: dh[i] });
    y += dh[i] + T;
  }

  return {
    canvasWidth: innerW + 2 * T,
    canvasHeight: innerH + 2 * T,
    innerW,
    innerH,
    borderThickness: T,
    placements,
  };
}

export function drawMergedImage(
  canvas: HTMLCanvasElement,
  images: HTMLImageElement[],
  layout: MergeLayout,
  direction: MergeDirection,
  opts: {
    backgroundColor: string;
    borderColor: string;
    transparentBackground: boolean;
    exportOpaque: boolean;
  },
) {
  const { canvasWidth: W, canvasHeight: H, innerW, innerH, borderThickness: T, placements } = layout;
  const n = images.length;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d', { alpha: true })!;

  const dw = placements.map((p) => p.dw);
  const dh = placements.map((p) => p.dh);

  const useTransparentLetterbox = opts.transparentBackground && !opts.exportOpaque;

  if (useTransparentLetterbox) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = opts.borderColor;
    ctx.fillRect(0, 0, W, T);
    ctx.fillRect(0, H - T, W, T);
    ctx.fillRect(0, 0, T, H);
    ctx.fillRect(W - T, 0, T, H);
    if (direction === 'horizontal') {
      let x = T;
      for (let i = 0; i < n - 1; i++) {
        x += dw[i];
        ctx.fillRect(x, T, T, innerH);
        x += T;
      }
    } else {
      let y = T;
      for (let i = 0; i < n - 1; i++) {
        y += dh[i];
        ctx.fillRect(T, y, innerW, T);
        y += T;
      }
    }
  } else {
    ctx.fillStyle = opts.borderColor;
    ctx.fillRect(0, 0, W, H);
    if (direction === 'horizontal') {
      let x = T;
      for (let i = 0; i < n; i++) {
        ctx.fillStyle = opts.backgroundColor;
        ctx.fillRect(x, T, dw[i], innerH);
        x += dw[i] + T;
      }
    } else {
      let y = T;
      for (let i = 0; i < n; i++) {
        ctx.fillStyle = opts.backgroundColor;
        ctx.fillRect(T, y, innerW, dh[i]);
        y += dh[i] + T;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    const img = images[i];
    const { dx, dy, dw: ddw, dh: ddh } = placements[i];
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, dx, dy, ddw, ddh);
  }
}

export function layoutToPreviewScale(layout: MergeLayout, maxEdge: number): number {
  const m = Math.max(layout.canvasWidth, layout.canvasHeight);
  if (m <= maxEdge || m === 0) return 1;
  return maxEdge / m;
}

/** Scales layout + placements for low-res preview (keeps full-res images as drawImage source). */
export function scaleMergeLayout(layout: MergeLayout, scale: number): MergeLayout {
  if (scale >= 1) return layout;
  const r = (x: number) => Math.max(0, Math.round(x * scale));
  return {
    canvasWidth: Math.max(1, r(layout.canvasWidth)),
    canvasHeight: Math.max(1, r(layout.canvasHeight)),
    innerW: Math.max(0, r(layout.innerW)),
    innerH: Math.max(0, r(layout.innerH)),
    borderThickness: Math.max(0, r(layout.borderThickness)),
    placements: layout.placements.map((p) => ({
      dx: Math.round(p.dx * scale),
      dy: Math.round(p.dy * scale),
      dw: Math.max(1, Math.round(p.dw * scale)),
      dh: Math.max(1, Math.round(p.dh * scale)),
    })),
  };
}
