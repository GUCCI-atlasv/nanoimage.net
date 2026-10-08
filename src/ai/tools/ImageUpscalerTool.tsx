'use client'
import { useState, useCallback } from 'react'
import { DropZone } from '../components/DropZone'
import { BeforeAfterSlider } from '../components/BeforeAfterSlider'
import { upscaleImage, scaleToCanvas, type UpscaleMode } from '../lib/imageUpscaler'

type Phase = 'idle' | 'processing' | 'done' | 'error'

export function ImageUpscalerTool() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [error, setError] = useState('')
  const [pct, setPct] = useState(0)
  const [phaseLabel, setPhaseLabel] = useState('')
  const [scale, setScale] = useState<2 | 4>(2)
  const [mode, setMode] = useState<UpscaleMode>('photo')
  const [outputSize, setOutputSize] = useState('')

  const [beforeCanvas, setBeforeCanvas] = useState<HTMLCanvasElement | null>(null)
  const [afterCanvas, setAfterCanvas] = useState<HTMLCanvasElement | null>(null)

  const run = useCallback(async (file: File) => {
    setPhase('processing')
    setError('')
    setPct(0)
    setBeforeCanvas(null)
    setAfterCanvas(null)

    try {
      const bitmap = await createImageBitmap(file)

      // Before: simple bicubic-equivalent scale
      const before = scaleToCanvas(bitmap, scale)
      setBeforeCanvas(before)

      const after = await upscaleImage(bitmap, scale, mode, (p) => {
        setPct(p.pct)
        setPhaseLabel(p.phase === 'upscaling' ? `Upscaling… ${p.pct}%` : p.phase === 'sharpening' ? 'Sharpening…' : 'Done')
      })
      setAfterCanvas(after)
      setOutputSize(`${after.width} × ${after.height} px`)
      setPhase('done')
    } catch (e) {
      setError(String(e))
      setPhase('error')
    }
  }, [scale, mode])

  function downloadResult() {
    if (!afterCanvas) return
    const url = afterCanvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `upscaled-${scale}x.png`
    a.click()
  }

  function reset() {
    setPhase('idle')
    setPct(0)
    setBeforeCanvas(null)
    setAfterCanvas(null)
  }

  return (
    <div className="tool-wrap">
      {/* Controls */}
      {phase !== 'done' && (
        <div className="controls-bar">
          <div className="pill-group" role="group" aria-label="Scale">
            {([2, 4] as const).map((s) => (
              <button key={s} className={`pill${scale === s ? ' active' : ''}`} onClick={() => setScale(s)}>
                {s}× Upscale
              </button>
            ))}
          </div>
          <div className="pill-group" role="group" aria-label="Mode">
            {(['photo', 'illustration'] as const).map((m) => (
              <button key={m} className={`pill${mode === m ? ' active' : ''}`} onClick={() => setMode(m)}>
                {m === 'photo' ? '📷 Photo' : '🎨 Illustration'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Upload */}
      {phase === 'idle' && (
        <DropZone
          accept="image/jpeg,image/png,image/webp"
          onFiles={(files) => { if (files[0]) run(files[0]) }}
        />
      )}

      {/* Processing */}
      {phase === 'processing' && (
        <div className="status-panel">
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <p className="status-label">{phaseLabel || 'Starting…'}</p>
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
          <p className="result-info">
            Output: <strong>{outputSize}</strong> &nbsp;·&nbsp; Mode: {mode} {scale}×
          </p>
          <BeforeAfterSlider
            beforeCanvas={beforeCanvas}
            afterCanvas={afterCanvas}
            beforeLabel={`${scale === 2 ? '1×' : '1×'} Standard`}
            afterLabel={`${scale}× Enhanced`}
          />
          <div className="action-row">
            <button className="btn btn-primary" onClick={downloadResult}>
              ⬇ Download PNG
            </button>
            <button className="btn" onClick={reset}>
              ↩ New image
            </button>
          </div>
          <p className="privacy-tip">
            ✓ Verify: open DevTools → Network — no image upload requests were made.
          </p>
        </div>
      )}
    </div>
  )
}
