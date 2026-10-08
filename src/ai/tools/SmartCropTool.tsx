'use client'
import {
  useState, useRef, useCallback, useEffect, type PointerEvent as ReactPointerEvent,
} from 'react'
import { DropZone } from '../components/DropZone'
import { ModelLoader } from '../components/ModelLoader'
import { useCapability } from '../components/CapabilityBanner'
import {
  ASPECT_RATIOS, findBestCrop, drawCropOverlay, exportCrop,
  type CropBox, type AspectRatio,
} from '../lib/smartCrop'
import { blurBackground, type BlurPhase } from '../lib/portraitBlur'

// ── Shared upload state ───────────────────────────────────────────────────────

type Tab = 'crop' | 'blur'

export function SmartCropTool() {
  const cap = useCapability()
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null)
  const [fileName, setFileName] = useState('image')
  const [tab, setTab] = useState<Tab>('crop')

  async function handleFiles(files: File[]) {
    const f = files[0]
    if (!f) return
    const bmp = await createImageBitmap(f)
    setBitmap(bmp)
    setFileName(f.name.replace(/\.[^.]+$/, ''))
  }

  return (
    <div>
      {/* Upload zone — always visible until image loaded */}
      {!bitmap && (
        <DropZone onFiles={handleFiles} />
      )}

      {/* Tab bar — only after upload */}
      {bitmap && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '.75rem' }}>
            <div className="tab-bar">
              <button className={`tab-btn${tab === 'crop' ? ' active' : ''}`} onClick={() => setTab('crop')}>
                ✂️ Smart Crop
              </button>
              <button className={`tab-btn${tab === 'blur' ? ' active' : ''}`} onClick={() => setTab('blur')}>
                🌫️ Portrait Blur
              </button>
            </div>
            <button
              className="btn btn-secondary"
              style={{ fontSize: '13px', padding: '7px 14px' }}
              onClick={() => setBitmap(null)}
            >
              ← Change image
            </button>
          </div>

          {tab === 'crop' && (
            <CropPanel bitmap={bitmap} fileName={fileName} />
          )}
          {tab === 'blur' && (
            <BlurPanel bitmap={bitmap} fileName={fileName} preferGpu={cap?.tier === 'webgpu'} />
          )}
        </>
      )}

      {/* Verifiable privacy tip */}
      <div
        style={{
          marginTop: '1.5rem',
          background: '#f0fdf4',
          border: '1.5px solid #bbf7d0',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          fontSize: '13px',
          lineHeight: 1.7,
          color: '#166534',
        }}
      >
        <strong>🔒 Verify it yourself:</strong> Open DevTools → Network → use the tool.
        You&apos;ll see <em>zero image upload requests</em>. Smart Crop uses no network at all;
        Portrait Blur only downloads the 3 MB model once.
      </div>
    </div>
  )
}

// ── Smart Crop Panel ──────────────────────────────────────────────────────────

const MAX_DISPLAY = 780 // px wide limit for canvas display

function CropPanel({ bitmap, fileName }: { bitmap: ImageBitmap; fileName: string }) {
  const [ratio, setRatio] = useState<AspectRatio>(ASPECT_RATIOS[0])
  const [cropBox, setCropBox] = useState<CropBox | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Scale factor: image → display canvas
  const scale = Math.min(MAX_DISPLAY / bitmap.width, 1)
  const dW = Math.round(bitmap.width * scale)
  const dH = Math.round(bitmap.height * scale)

  // Convert crop box (image px) → display px
  function toDisplay(b: CropBox): CropBox {
    return { x: b.x * scale, y: b.y * scale, w: b.w * scale, h: b.h * scale }
  }
  // Convert display px → image px
  function toImage(b: CropBox): CropBox {
    return {
      x: Math.round(b.x / scale), y: Math.round(b.y / scale),
      w: Math.round(b.w / scale), h: Math.round(b.h / scale),
    }
  }

  // Draw image + overlay whenever cropBox changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = dW
    canvas.height = dH
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(bitmap, 0, 0, dW, dH)
    if (cropBox) drawCropOverlay(ctx, dW, dH, toDisplay(cropBox))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bitmap, cropBox, dW, dH])

  // Auto-detect on first render and when ratio changes
  useEffect(() => {
    const box = findBestCrop(bitmap, ratio)
    setCropBox(box)
  }, [bitmap, ratio])

  // ── Drag interaction ─────────────────────────────────────────────────────
  const dragState = useRef<{
    startX: number; startY: number
    origBox: CropBox // in display px
    mode: 'move' | 'tl' | 'tr' | 'bl' | 'br'
  } | null>(null)

  function getPointerPos(e: ReactPointerEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) * (dW / rect.width),
      y: (e.clientY - rect.top) * (dH / rect.height),
    }
  }

  function hitTest(px: number, py: number, box: CropBox) {
    const hs = 14
    const corners: [string, number, number][] = [
      ['tl', box.x, box.y],
      ['tr', box.x + box.w, box.y],
      ['bl', box.x, box.y + box.h],
      ['br', box.x + box.w, box.y + box.h],
    ]
    for (const [name, cx, cy] of corners) {
      if (Math.abs(px - cx) < hs && Math.abs(py - cy) < hs) return name
    }
    if (px >= box.x && px <= box.x + box.w && py >= box.y && py <= box.y + box.h)
      return 'move'
    return null
  }

  function onPointerDown(e: ReactPointerEvent<HTMLCanvasElement>) {
    if (!cropBox) return
    const { x, y } = getPointerPos(e)
    const db = toDisplay(cropBox)
    const mode = hitTest(x, y, db)
    if (!mode) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragState.current = { startX: x, startY: y, origBox: db, mode: mode as never }
  }

  function onPointerMove(e: ReactPointerEvent<HTMLCanvasElement>) {
    const ds = dragState.current
    if (!ds || !cropBox) return
    const { x, y } = getPointerPos(e)
    const dx = x - ds.startX
    const dy = y - ds.startY
    const ob = ds.origBox
    const nb = { ...ob }

    if (ds.mode === 'move') {
      nb.x = Math.max(0, Math.min(dW - ob.w, ob.x + dx))
      nb.y = Math.max(0, Math.min(dH - ob.h, ob.y + dy))
    } else {
      // Resize — maintain aspect ratio by moving the appropriate corner
      const ar = ob.w / ob.h
      if (ds.mode === 'br') {
        const nw = Math.max(40, Math.min(dW - ob.x, ob.w + dx))
        nb.w = nw; nb.h = nw / ar
      } else if (ds.mode === 'tr') {
        const nw = Math.max(40, Math.min(dW - ob.x, ob.w + dx))
        nb.w = nw; nb.h = nw / ar
        nb.y = ob.y + ob.h - nb.h
      } else if (ds.mode === 'bl') {
        const nw = Math.max(40, Math.min(ob.x + ob.w, ob.w - dx))
        nb.w = nw; nb.h = nw / ar
        nb.x = ob.x + ob.w - nw
      } else if (ds.mode === 'tl') {
        const nw = Math.max(40, Math.min(ob.x + ob.w, ob.w - dx))
        nb.w = nw; nb.h = nw / ar
        nb.x = ob.x + ob.w - nw
        nb.y = ob.y + ob.h - nb.h
      }
      // Clamp
      if (nb.x < 0) { nb.w += nb.x; nb.x = 0 }
      if (nb.y < 0) { nb.h += nb.y; nb.y = 0 }
      if (nb.x + nb.w > dW) nb.w = dW - nb.x
      if (nb.y + nb.h > dH) nb.h = dH - nb.y
    }

    setCropBox(toImage(nb))
  }

  function onPointerUp(e: ReactPointerEvent<HTMLCanvasElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId)
    dragState.current = null
  }

  function download() {
    if (!cropBox) return
    const url = exportCrop(bitmap, cropBox)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName}-crop-${ratio.label.replace(':', 'x')}.png`
    a.click()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Ratio selector */}
      <div>
        <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', margin: '0 0 .5rem' }}>
          Target ratio
        </p>
        <div className="ratio-pills">
          {ASPECT_RATIOS.map((r) => (
            <button
              key={r.label}
              className={`ratio-pill${r.label === ratio.label ? ' active' : ''}`}
              onClick={() => setRatio(r)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="crop-canvas-wrap">
        <canvas
          ref={canvasRef}
          style={{ width: dW, height: dH, cursor: 'move' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      </div>

      <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>
        Drag the box to reposition · drag corners to resize · maintains aspect ratio
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
        <button
          className="btn btn-secondary"
          onClick={() => { const box = findBestCrop(bitmap, ratio); setCropBox(box) }}
        >
          ✨ Auto-detect subject
        </button>
        <button className="btn btn-primary" onClick={download} disabled={!cropBox}>
          ⬇ Download crop
        </button>
      </div>

      {cropBox && (
        <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>
          Crop: {cropBox.w} × {cropBox.h} px (from {bitmap.width} × {bitmap.height} original)
        </p>
      )}
    </div>
  )
}

// ── Portrait Blur Panel ───────────────────────────────────────────────────────

function BlurPanel({
  bitmap, fileName, preferGpu,
}: {
  bitmap: ImageBitmap
  fileName: string
  preferGpu: boolean
}) {
  const [blurStrength, setBlurStrength] = useState(12)
  const [phase, setPhase] = useState<BlurPhase>('idle')
  const [resultCanvas, setResultCanvas] = useState<HTMLCanvasElement | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [showOriginal, setShowOriginal] = useState(false)

  async function applyBlur() {
    setPhase('loading')
    setResultCanvas(null)
    setErrorMsg('')
    try {
      const canvas = await blurBackground(bitmap, blurStrength, preferGpu)
      setResultCanvas(canvas)
      setPhase('done')
    } catch (e) {
      console.error(e)
      const msg = e instanceof Error ? e.message : 'Segmentation failed.'
      setErrorMsg(msg)
      setPhase('error')
    }
  }

  function download() {
    if (!resultCanvas) return
    const a = document.createElement('a')
    a.href = resultCanvas.toDataURL('image/png')
    a.download = `${fileName}-portrait-blur.png`
    a.click()
  }

  const isLoading = phase === 'loading' || phase === 'segmenting'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Original image preview — always shown so users can see their upload */}
      {phase !== 'done' && (
        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', margin: '0 0 .5rem' }}>
            Your image
          </p>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1.5px solid var(--line)', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <OriginalPreview bitmap={bitmap} />
          </div>
        </div>
      )}

      {/* Model note */}
      <div
        style={{
          background: 'var(--ai-accent-light)',
          border: '1.5px solid #c8b8ff',
          borderRadius: '12px',
          padding: '.875rem 1rem',
          fontSize: '13px',
          color: '#3a1f9e',
          lineHeight: 1.6,
        }}
      >
        <strong>First run:</strong> downloads the MediaPipe selfie segmentation model (~3 MB)
        and caches it for offline use. Subsequent runs are instant.
      </div>

      {/* Blur strength */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', margin: 0 }}>
            Blur strength
          </p>
          <span style={{ fontSize: '13px', color: 'var(--ai-accent)', fontWeight: 700 }}>
            {blurStrength}
          </span>
        </div>
        <input
          type="range"
          min={2} max={40} step={1}
          value={blurStrength}
          className="blur-slider"
          style={{ '--pct': `${((blurStrength - 2) / 38) * 100}%` } as React.CSSProperties}
          onChange={(e) => setBlurStrength(Number(e.target.value))}
          aria-label="Blur strength"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', marginTop: '.25rem' }}>
          <span>Subtle</span><span>Heavy</span>
        </div>
      </div>

      {/* Apply button */}
      {phase !== 'done' && (
        <button className="btn btn-primary" onClick={applyBlur} disabled={isLoading} style={{ alignSelf: 'flex-start' }}>
          {isLoading ? '⏳ Processing…' : '🌫️ Apply blur'}
        </button>
      )}

      {/* Loading */}
      {isLoading && (
        <ModelLoader
          progress={{ percent: phase === 'loading' ? 40 : 80 }}
          modelNote="~3 MB · MediaPipe selfie segmenter"
        />
      )}

      {/* Error */}
      {phase === 'error' && (
        <div className="cap-banner unsupported">
          <span>⚠️ {errorMsg}</span>
          <button
            className="btn btn-secondary"
            style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '13px' }}
            onClick={() => { setPhase('idle'); setErrorMsg('') }}
          >
            Try again
          </button>
        </div>
      )}

      {/* Result */}
      {phase === 'done' && resultCanvas && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Toggle before/after */}
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <button
              className={`tab-btn${!showOriginal ? ' active' : ''}`}
              style={{ fontSize: '13px', padding: '6px 14px', borderRadius: '8px' }}
              onClick={() => setShowOriginal(false)}
            >
              After
            </button>
            <button
              className={`tab-btn${showOriginal ? ' active' : ''}`}
              style={{ fontSize: '13px', padding: '6px 14px', borderRadius: '8px' }}
              onClick={() => setShowOriginal(true)}
            >
              Before
            </button>
          </div>

          <div
            style={{
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1.5px solid var(--line)',
              background: '#1a1a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {showOriginal
              ? <OriginalPreview bitmap={bitmap} />
              : <CanvasDisplay canvas={resultCanvas} />
            }
          </div>

          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={download}>
              ⬇ Download PNG
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => { setPhase('idle'); setResultCanvas(null) }}
            >
              Adjust &amp; reapply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Display helpers ───────────────────────────────────────────────────────────

function CanvasDisplay({ canvas }: { canvas: HTMLCanvasElement }) {
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    node.innerHTML = ''
    const clone = document.createElement('canvas')
    clone.width = canvas.width
    clone.height = canvas.height
    clone.style.cssText = 'max-width:100%;max-height:60vh;display:block;'
    clone.getContext('2d')?.drawImage(canvas, 0, 0)
    node.appendChild(clone)
  }, [canvas])
  return <div ref={ref} />
}

function OriginalPreview({ bitmap }: { bitmap: ImageBitmap }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0)
  }, [bitmap])
  return (
    <canvas
      ref={ref}
      style={{ maxWidth: '100%', maxHeight: '60vh', display: 'block' }}
    />
  )
}
