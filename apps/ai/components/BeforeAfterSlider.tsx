'use client'
import { useRef, useState, useEffect, useCallback } from 'react'

type Props = {
  beforeCanvas: HTMLCanvasElement
  afterCanvas: HTMLCanvasElement
  /** Label shown on the left side (before) */
  beforeLabel?: string
  /** Label shown on the right side (after) */
  afterLabel?: string
}

/**
 * Drag-divider before/after comparison widget.
 * Both canvases must have the same dimensions.
 */
export function BeforeAfterSlider({
  beforeCanvas,
  afterCanvas,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mergedRef = useRef<HTMLCanvasElement>(null)
  const [pos, setPos] = useState(0.5) // 0–1 fraction
  const dragging = useRef(false)

  const W = beforeCanvas.width
  const H = beforeCanvas.height

  // Render the split composite whenever position changes
  useEffect(() => {
    const canvas = mergedRef.current
    if (!canvas) return
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')!

    const splitX = Math.round(pos * W)
    // Left: before
    ctx.drawImage(beforeCanvas, 0, 0)
    // Right: after (clip)
    ctx.save()
    ctx.beginPath()
    ctx.rect(splitX, 0, W - splitX, H)
    ctx.clip()
    ctx.drawImage(afterCanvas, 0, 0)
    ctx.restore()

    // Divider line
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(splitX, 0)
    ctx.lineTo(splitX, H)
    ctx.stroke()

    // Handle circle
    const cy = H / 2
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(splitX, cy, 18, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'rgba(0,0,0,0.15)'
    ctx.lineWidth = 1
    ctx.stroke()
    // Arrows
    ctx.fillStyle = 'var(--ai-accent, #6c3fff)'
    ctx.font = 'bold 13px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('⟨⟩', splitX, cy)
  }, [pos, beforeCanvas, afterCanvas, W, H])

  function updatePos(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const p = Math.max(0.02, Math.min(0.98, (clientX - rect.left) / rect.width))
    setPos(p)
  }

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    updatePos(e.clientX)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    updatePos(e.clientX)
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragging.current = false
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
  }, [])

  // Display scale to fit container
  const maxW = 800
  const scale = Math.min(maxW / W, 1)
  const dW = Math.round(W * scale)
  const dH = Math.round(H * scale)

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', userSelect: 'none', touchAction: 'none', width: dW, maxWidth: '100%' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <canvas
        ref={mergedRef}
        style={{ width: dW, height: dH, display: 'block', cursor: 'col-resize', borderRadius: 14, border: '1.5px solid var(--line)' }}
      />
      {/* Labels */}
      <span style={labelStyle('left')}>{beforeLabel}</span>
      <span style={labelStyle('right')}>{afterLabel}</span>
    </div>
  )
}

function labelStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    top: 10,
    [side]: 10,
    background: 'rgba(0,0,0,0.55)',
    color: '#fff',
    fontSize: 11,
    fontWeight: 700,
    padding: '3px 8px',
    borderRadius: 6,
    pointerEvents: 'none',
    letterSpacing: '.04em',
    textTransform: 'uppercase',
  }
}
