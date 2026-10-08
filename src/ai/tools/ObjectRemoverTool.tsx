'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { DropZone } from '../components/DropZone'
import { BeforeAfterSlider } from '../components/BeforeAfterSlider'
import {
  createMaskCanvas, strokeMask, strokeMaskLine, clearMask, inpaintMasked
} from '../lib/objectRemover'

type Phase = 'idle' | 'painting' | 'processing' | 'done' | 'error'
type BrushMode = 'paint' | 'erase'

const BRUSH_SIZES = [8, 18, 32, 50]

export function ObjectRemoverTool() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [error, setError] = useState('')
  const [pct, setPct] = useState(0)
  const [brushMode, setBrushMode] = useState<BrushMode>('paint')
  const [brushSize, setBrushSize] = useState(18)

  const srcCanvasRef = useRef<HTMLCanvasElement | null>(null)   // source image
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null)  // offscreen mask
  const displayRef = useRef<HTMLCanvasElement>(null)            // composite display
  const [beforeCanvas, setBeforeCanvas] = useState<HTMLCanvasElement | null>(null)
  const [afterCanvas, setAfterCanvas] = useState<HTMLCanvasElement | null>(null)
  const historyRef = useRef<ImageData[]>([])                    // undo stack
  const pointerRef = useRef<{ x: number; y: number } | null>(null)
  const paintingRef = useRef(false)

  // ── Image load ──────────────────────────────────────────────────────────────
  const loadImage = useCallback(async (file: File) => {
    const bitmap = await createImageBitmap(file)
    const W = bitmap.width; const H = bitmap.height

    const src = document.createElement('canvas')
    src.width = W; src.height = H
    src.getContext('2d')!.drawImage(bitmap, 0, 0)
    srcCanvasRef.current = src

    const mask = createMaskCanvas(W, H)
    maskCanvasRef.current = mask

    // Clone for the "before"
    const before = document.createElement('canvas')
    before.width = W; before.height = H
    before.getContext('2d')!.drawImage(src, 0, 0)
    setBeforeCanvas(before)

    historyRef.current = []
    setPhase('painting')
    renderComposite()
  }, [])

  // ── Composite render ────────────────────────────────────────────────────────
  function renderComposite() {
    const display = displayRef.current
    const src = srcCanvasRef.current
    const mask = maskCanvasRef.current
    if (!display || !src || !mask) return

    display.width = src.width; display.height = src.height
    const ctx = display.getContext('2d')!

    // 1. Draw source image
    ctx.drawImage(src, 0, 0)

    // 2. Build a red overlay canvas from the mask alpha channel.
    //    We must NOT use putImageData directly on the display canvas — it
    //    replaces raw pixel values (including alpha) and would wipe the image.
    //    Instead, write into a temp canvas and drawImage it (alpha-composited).
    const mData = mask.getContext('2d')!.getImageData(0, 0, mask.width, mask.height)
    const overlayData = new ImageData(mData.width, mData.height)
    for (let i = 0; i < mData.data.length; i += 4) {
      if (mData.data[i + 3] >= 64) {
        overlayData.data[i]     = 220   // R
        overlayData.data[i + 1] = 40    // G
        overlayData.data[i + 2] = 40    // B
        overlayData.data[i + 3] = 140   // A (semi-transparent)
      }
      // else: leave as 0,0,0,0 (fully transparent — won't affect image below)
    }
    const tmp = document.createElement('canvas')
    tmp.width = mData.width; tmp.height = mData.height
    tmp.getContext('2d')!.putImageData(overlayData, 0, 0)
    ctx.drawImage(tmp, 0, 0) // alpha-composited onto source
  }

  // Re-render when phase is 'painting'
  useEffect(() => {
    if (phase === 'painting') renderComposite()
  })

  // ── Canvas → image coords ───────────────────────────────────────────────────
  function canvasCoords(e: React.PointerEvent): { x: number; y: number } {
    const canvas = displayRef.current!
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
  }

  // ── Brush events ─────────────────────────────────────────────────────────────
  function onPointerDown(e: React.PointerEvent) {
    if (phase !== 'painting') return
    paintingRef.current = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    // Save undo snapshot
    const mask = maskCanvasRef.current!
    historyRef.current.push(mask.getContext('2d')!.getImageData(0, 0, mask.width, mask.height))
    if (historyRef.current.length > 30) historyRef.current.shift()

    const pt = canvasCoords(e)
    pointerRef.current = pt
    strokeMask(mask, pt.x, pt.y, brushSize, brushMode)
    renderComposite()
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!paintingRef.current || phase !== 'painting') return
    const pt = canvasCoords(e)
    const prev = pointerRef.current ?? pt
    strokeMaskLine(maskCanvasRef.current!, prev.x, prev.y, pt.x, pt.y, brushSize, brushMode)
    pointerRef.current = pt
    renderComposite()
  }

  function onPointerUp(e: React.PointerEvent) {
    paintingRef.current = false
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    pointerRef.current = null
  }

  function undo() {
    const snap = historyRef.current.pop()
    if (!snap || !maskCanvasRef.current) return
    maskCanvasRef.current.getContext('2d')!.putImageData(snap, 0, 0)
    renderComposite()
  }

  function clear() {
    if (!maskCanvasRef.current) return
    historyRef.current.push(maskCanvasRef.current.getContext('2d')!
      .getImageData(0, 0, maskCanvasRef.current.width, maskCanvasRef.current.height))
    clearMask(maskCanvasRef.current)
    renderComposite()
  }

  // ── Inpaint ──────────────────────────────────────────────────────────────────
  async function runInpaint() {
    const src = srcCanvasRef.current
    const mask = maskCanvasRef.current
    if (!src || !mask) return

    setPhase('processing')
    setPct(0)
    try {
      const result = await inpaintMasked(src, mask, (p) => setPct(p.pct))
      setAfterCanvas(result)
      setPhase('done')
    } catch (e) {
      setError(String(e))
      setPhase('error')
    }
  }

  function downloadResult() {
    if (!afterCanvas) return
    const a = document.createElement('a')
    a.href = afterCanvas.toDataURL('image/png')
    a.download = 'object-removed.png'
    a.click()
  }

  function keepEditing() {
    // Copy result back to src for iterative editing
    if (!afterCanvas) return
    const src = srcCanvasRef.current!
    src.getContext('2d')!.drawImage(afterCanvas, 0, 0)
    clearMask(maskCanvasRef.current!)
    historyRef.current = []
    setPhase('painting')
    renderComposite()
  }

  function reset() {
    setPhase('idle')
    setPct(0)
    srcCanvasRef.current = null
    maskCanvasRef.current = null
    setBeforeCanvas(null)
    setAfterCanvas(null)
    historyRef.current = []
  }

  // ── Display scale ────────────────────────────────────────────────────────────
  const srcW = srcCanvasRef.current?.width ?? 1
  const srcH = srcCanvasRef.current?.height ?? 1
  const maxW = 760
  const dW = Math.min(maxW, srcW)
  const dH = Math.round((dW / srcW) * srcH)

  return (
    <div className="tool-wrap">
      {/* Upload */}
      {phase === 'idle' && (
        <DropZone
          accept="image/jpeg,image/png,image/webp"
          onFiles={(files) => { if (files[0]) loadImage(files[0]) }}
        />
      )}

      {/* Painting UI */}
      {phase === 'painting' && (
        <>
          <div className="controls-bar">
            <div className="pill-group" role="group" aria-label="Brush mode">
              <button className={`pill${brushMode === 'paint' ? ' active' : ''}`} onClick={() => setBrushMode('paint')}>🖌 Paint</button>
              <button className={`pill${brushMode === 'erase' ? ' active' : ''}`} onClick={() => setBrushMode('erase')}>◻ Erase</button>
            </div>
            <div className="pill-group" role="group" aria-label="Brush size">
              {BRUSH_SIZES.map((s) => (
                <button key={s} className={`pill${brushSize === s ? ' active' : ''}`} onClick={() => setBrushSize(s)} title={`${s}px`}>
                  {s === 8 ? 'S' : s === 18 ? 'M' : s === 32 ? 'L' : 'XL'}
                </button>
              ))}
            </div>
            <div className="pill-group">
              <button className="pill" onClick={undo} title="Undo">↩ Undo</button>
              <button className="pill" onClick={clear} title="Clear mask">🗑 Clear</button>
            </div>
          </div>

          <p className="tool-hint">Paint over the object you want to remove (red = selected area)</p>

          <canvas
            ref={displayRef}
            style={{ width: dW, height: dH, display: 'block', cursor: brushMode === 'paint' ? 'crosshair' : 'cell', borderRadius: 12, border: '1.5px solid var(--line)', touchAction: 'none', maxWidth: '100%' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />

          <div className="action-row" style={{ marginTop: 16 }}>
            <button className="btn btn-primary" onClick={runInpaint}>
              🪄 Remove object
            </button>
            <button className="btn" onClick={reset}>↩ New image</button>
          </div>
        </>
      )}

      {/* Processing */}
      {phase === 'processing' && (
        <div className="status-panel">
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <p className="status-label">Filling masked region… {pct}%</p>
          <p className="status-sub">Processing on your device — nothing is uploaded</p>
        </div>
      )}

      {/* Error */}
      {phase === 'error' && (
        <div className="error-panel">
          <p>Something went wrong: {error}</p>
          <button className="btn" onClick={reset}>Try again</button>
        </div>
      )}

      {/* Result */}
      {phase === 'done' && beforeCanvas && afterCanvas && (
        <div className="result-wrap">
          <BeforeAfterSlider
            beforeCanvas={beforeCanvas}
            afterCanvas={afterCanvas}
            beforeLabel="Before"
            afterLabel="After"
          />
          <div className="action-row">
            <button className="btn btn-primary" onClick={downloadResult}>⬇ Download PNG</button>
            <button className="btn" onClick={keepEditing}>✏ Keep editing</button>
            <button className="btn" onClick={reset}>↩ New image</button>
          </div>
          <p className="privacy-tip">
            ✓ Verify: open DevTools → Network — no image upload requests were made.
          </p>
        </div>
      )}
    </div>
  )
}
