'use client'
import { useState, useRef, useCallback } from 'react'
import { DropZone } from '@/components/DropZone'
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider'
import { restorePhoto, colorizePhoto, restoreAndColorize } from '@/lib/photoRestore'

type Mode = 'restore' | 'colorize' | 'both'
type Phase = 'idle' | 'processing' | 'done' | 'error'

export function PhotoRestoreTool() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [error, setError] = useState('')
  const [pct, setPct] = useState(0)
  const [mode, setMode] = useState<Mode>('restore')
  const [colorStrength, setColorStrength] = useState(0.8)
  const [phaseLabel, setPhaseLabel] = useState('')

  const bitmapRef = useRef<ImageBitmap | null>(null)
  const beforeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const afterCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const run = useCallback(async (file: File) => {
    setPhase('processing')
    setError('')
    setPct(0)

    try {
      const bitmap = await createImageBitmap(file)
      bitmapRef.current = bitmap

      // Before: original
      const before = document.createElement('canvas')
      before.width = bitmap.width; before.height = bitmap.height
      before.getContext('2d')!.drawImage(bitmap, 0, 0)
      beforeCanvasRef.current = before

      let after: HTMLCanvasElement
      if (mode === 'restore') {
        setPhaseLabel('Restoring photo…')
        after = await restorePhoto(bitmap, (p) => { setPct(p.pct); setPhaseLabel(`Restoring… ${p.pct}%`) })
      } else if (mode === 'colorize') {
        setPhaseLabel('Colorizing…')
        after = await colorizePhoto(bitmap, colorStrength, (p) => { setPct(p.pct); setPhaseLabel(`Colorizing… ${p.pct}%`) })
      } else {
        setPhaseLabel('Restoring + colorizing…')
        after = await restoreAndColorize(bitmap, colorStrength, (p) => { setPct(p.pct); setPhaseLabel(`Processing… ${p.pct}%`) })
      }

      afterCanvasRef.current = after
      setPhase('done')
    } catch (e) {
      setError(String(e))
      setPhase('error')
    }
  }, [mode, colorStrength])

  function downloadResult() {
    const canvas = afterCanvasRef.current
    if (!canvas) return
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = `photo-${mode}.png`
    a.click()
  }

  function reset() {
    setPhase('idle')
    setPct(0)
    bitmapRef.current = null
    beforeCanvasRef.current = null
    afterCanvasRef.current = null
  }

  return (
    <div className="tool-wrap">
      {/* Mode selector */}
      {phase !== 'done' && (
        <>
          <div className="controls-bar">
            <div className="pill-group" role="group" aria-label="Processing mode">
              {([
                ['restore', '🔧 Restore'],
                ['colorize', '🎨 Colorize'],
                ['both', '✨ Restore + Colorize'],
              ] as [Mode, string][]).map(([m, label]) => (
                <button key={m} className={`pill${mode === m ? ' active' : ''}`} onClick={() => setMode(m)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {(mode === 'colorize' || mode === 'both') && (
            <div className="slider-row">
              <label className="slider-label" htmlFor="color-strength">
                Color strength: <strong>{Math.round(colorStrength * 100)}%</strong>
              </label>
              <input
                id="color-strength"
                type="range" min={0.2} max={1} step={0.05}
                value={colorStrength}
                onChange={(e) => setColorStrength(parseFloat(e.target.value))}
                className="blur-slider"
              />
            </div>
          )}
        </>
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
      {phase === 'done' && beforeCanvasRef.current && afterCanvasRef.current && (
        <div className="result-wrap">
          <BeforeAfterSlider
            beforeCanvas={beforeCanvasRef.current}
            afterCanvas={afterCanvasRef.current}
            beforeLabel="Original"
            afterLabel={mode === 'restore' ? 'Restored' : mode === 'colorize' ? 'Colorized' : 'Restored + Colorized'}
          />
          <div className="action-row">
            <button className="btn btn-primary" onClick={downloadResult}>⬇ Download PNG</button>
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
