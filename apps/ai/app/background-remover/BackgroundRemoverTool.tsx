'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import { useCapability } from '@/components/CapabilityBanner'
import { ModelLoader } from '@/components/ModelLoader'
import { DropZone } from '@/components/DropZone'
import { canRunModel, type Capability } from '@/lib/capability'
import { removeBackground, compositeOnColor, type DownloadProgress } from '@/lib/runModel'

type Phase = 'idle' | 'loading-model' | 'inferring' | 'done' | 'error'
type BgMode = 'transparent' | 'color'

const PRESET_COLORS = ['#ffffff', '#000000', '#f5f5f5', '#e8f5e9', '#e3f2fd', '#fce4ec', '#fff8e1']

// Public-domain sample (Wikimedia Commons, CORS-enabled).
// A dog against a plain background — great for showcasing bg removal.
const SAMPLE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/480px-Golde33443.jpg'

// ── Capability status pill shown above the upload zone ───────────────────────

function CapStatusPill({ cap }: { cap: Capability | null }) {
  if (!cap) {
    return (
      <span className="cap-pill cap-pill--detecting">
        <span className="cap-pill-dot" /> Detecting browser capabilities…
      </span>
    )
  }
  if (cap.tier === 'webgpu') {
    return (
      <span className="cap-pill cap-pill--webgpu">
        ⚡ WebGPU detected — fastest on-device processing
      </span>
    )
  }
  if (cap.tier === 'wasm') {
    return (
      <span className="cap-pill cap-pill--wasm">
        ⚙️ Running in compatibility mode (WASM) — works, just a bit slower
      </span>
    )
  }
  return (
    <span className="cap-pill cap-pill--unsupported">
      ⚠️ Limited device — some features may be disabled
    </span>
  )
}

export function BackgroundRemoverTool({
  modelNote,
  modelSizeMb,
}: {
  modelNote: string
  modelSizeMb: number
}) {
  const cap = useCapability()
  const [phase, setPhase] = useState<Phase>('idle')
  const [progress, setProgress] = useState<DownloadProgress | null>(null)
  const [resultCanvas, setResultCanvas] = useState<HTMLCanvasElement | null>(null)
  const [sourceFile, setSourceFile] = useState<File | null>(null)
  const [sourceName, setSourceName] = useState<string>('')
  const [bgMode, setBgMode] = useState<BgMode>('transparent')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [errorMsg, setErrorMsg] = useState('')
  const alphaCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const capability = cap ? canRunModel(cap, modelSizeMb) : null

  const runFromSource = useCallback(
    async (source: File | string, displayName: string) => {
      if (!cap) return
      setSourceFile(source instanceof File ? source : null)
      setSourceName(displayName)
      setPhase('loading-model')
      setProgress({ percent: 0 })
      setResultCanvas(null)
      setErrorMsg('')

      try {
        const result = await removeBackground(source, cap.tier, (p) => {
          setProgress(p)
          if (p.percent >= 100) setPhase('inferring')
        })
        alphaCanvasRef.current = result.canvas
        const display =
          bgMode === 'transparent' ? result.canvas : compositeOnColor(result.canvas, bgColor)
        setResultCanvas(display)
        setPhase('done')
      } catch (e) {
        console.error(e)
        setErrorMsg(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
        setPhase('error')
      }
    },
    [cap, bgMode, bgColor],
  )

  function applyBg(mode: BgMode, color?: string) {
    const ac = alphaCanvasRef.current
    if (!ac) return
    const c = color ?? bgColor
    const display = mode === 'transparent' ? ac : compositeOnColor(ac, c)
    setResultCanvas(display)
    setBgMode(mode)
    if (color) setBgColor(color)
  }

  function downloadResult() {
    if (!resultCanvas) return
    const isPng = bgMode === 'transparent'
    const a = document.createElement('a')
    a.href = resultCanvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', 0.92)
    a.download = `${sourceName.replace(/\.[^.]+$/, '') || 'result'}-no-bg.${isPng ? 'png' : 'jpg'}`
    a.click()
  }

  function reset() {
    setPhase('idle')
    setResultCanvas(null)
    setProgress(null)
    setErrorMsg('')
  }

  const isDisabled = !cap || !capability?.allowed

  return (
    <div>
      {/* ── Inline capability status ── */}
      <div style={{ marginBottom: '1rem' }}>
        <CapStatusPill cap={cap} />
      </div>

      {/* Hard block for unsupported devices */}
      {capability && !capability.allowed && (
        <div className="cap-banner unsupported">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="7" stroke="#c0392b" strokeWidth="1.5" />
            <path d="M8 4v4M8 10v1.5" stroke="#c0392b" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>{capability.message}</span>
        </div>
      )}

      {/* Soft warning for WASM heavy */}
      {capability?.allowed && capability.warn && (
        <div className="cap-banner wasm" style={{ marginBottom: '1rem' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="7" stroke="#b8860b" strokeWidth="1.5" />
            <path d="M8 5v3l2 2" stroke="#b8860b" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>{capability.message}</span>
        </div>
      )}

      {/* ── Upload zone (idle) ── */}
      {phase === 'idle' && (
        <>
          <DropZone onFiles={([f]) => runFromSource(f, f.name)} disabled={isDisabled} />

          {/* Sample image CTA */}
          {!isDisabled && (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button
                className="btn btn-secondary"
                style={{ fontSize: '13px', padding: '8px 18px' }}
                onClick={() => runFromSource(SAMPLE_URL, 'sample-dog')}
              >
                🐕 Try with a sample photo — no upload needed
              </button>
            </div>
          )}

          {/* Model size notice */}
          <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--muted)', marginTop: '.75rem' }}>
            {modelNote}
          </p>
        </>
      )}

      {/* ── Model download / inference progress ── */}
      {(phase === 'loading-model' || phase === 'inferring') && (
        <div>
          <ModelLoader progress={progress} modelNote={modelNote} />
          {phase === 'inferring' && (
            <div
              style={{
                textAlign: 'center',
                color: 'var(--muted)',
                fontSize: '14px',
                padding: '2rem 0',
              }}
            >
              ⏳ Running AI inference on your device…
            </div>
          )}
        </div>
      )}

      {/* ── Error ── */}
      {phase === 'error' && (
        <div className="cap-banner unsupported" style={{ marginBottom: '1rem' }}>
          <span>⚠️ {errorMsg}</span>
          <button
            className="btn btn-secondary"
            style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '13px' }}
            onClick={reset}
          >
            Try again
          </button>
        </div>
      )}

      {/* ── Result ── */}
      {phase === 'done' && resultCanvas && (
        <div className="result-wrap">
          <div className="result-canvas-wrap">
            <CanvasDisplay canvas={resultCanvas} />
          </div>

          {/* Background controls — P2: solid color only in M1; gradient/image planned */}
          <div
            style={{
              background: 'var(--paper)',
              border: '1.5px solid var(--line)',
              borderRadius: '14px',
              padding: '1.25rem',
            }}
          >
            <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)', margin: '0 0 .5rem' }}>
              Background
            </p>
            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 .75rem' }}>
              Solid colors available now · Gradient &amp; image backgrounds coming soon
            </p>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                className="btn btn-secondary"
                style={{
                  fontSize: '13px',
                  padding: '6px 14px',
                  borderColor: bgMode === 'transparent' ? 'var(--ai-accent)' : 'var(--line)',
                  color: bgMode === 'transparent' ? 'var(--ai-accent)' : 'var(--muted)',
                }}
                onClick={() => applyBg('transparent')}
              >
                Transparent
              </button>
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  title={c}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: c,
                    border:
                      bgMode === 'color' && bgColor === c
                        ? '2.5px solid var(--ai-accent)'
                        : '2px solid var(--line)',
                    cursor: 'pointer',
                  }}
                  onClick={() => applyBg('color', c)}
                />
              ))}
              <label title="Custom color" style={{ cursor: 'pointer' }}>
                <input
                  type="color"
                  value={bgColor}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'block',
                  }}
                  onChange={(e) => applyBg('color', e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="result-controls">
            <button className="btn btn-primary" onClick={downloadResult}>
              ⬇ Download {bgMode === 'transparent' ? 'PNG' : 'JPG'}
            </button>
            <button className="btn btn-secondary" onClick={reset}>
              Try another image
            </button>
          </div>
        </div>
      )}

      {/* ── Verifiable privacy tip ── */}
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
        <strong>🔒 Verify it yourself:</strong> Open browser DevTools → Network tab → run the
        tool. You&apos;ll see <em>zero image upload requests</em>. Only the AI model weights
        download from our CDN — your photo never leaves this tab.
      </div>
    </div>
  )
}

/** Renders a canvas element inside a React-managed div without mutating the prop. */
function CanvasDisplay({ canvas }: { canvas: HTMLCanvasElement }) {
  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return
      node.innerHTML = ''
      const clone = document.createElement('canvas')
      clone.width = canvas.width
      clone.height = canvas.height
      clone.style.cssText = 'max-width:100%;max-height:60vh;display:block;'
      clone.getContext('2d')?.drawImage(canvas, 0, 0)
      node.appendChild(clone)
    },
    [canvas],
  )
  return <div ref={ref} />
}
