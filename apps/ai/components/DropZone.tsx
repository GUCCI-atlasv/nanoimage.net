'use client'
import { useRef, useState, type DragEvent } from 'react'

type Props = {
  onFiles: (files: File[]) => void
  accept?: string
  disabled?: boolean
}

const ACCEPTED = 'image/jpeg,image/png,image/webp'

export function DropZone({ onFiles, accept = ACCEPTED, disabled }: Props) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleDrag(e: DragEvent) {
    e.preventDefault()
    setDragging(e.type !== 'dragleave' && e.type !== 'drop')
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'))
    if (files.length) onFiles(files)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length) onFiles(files)
    // Reset so the same file can be re-selected.
    e.target.value = ''
  }

  return (
    <div
      className={`drop-zone${dragging ? ' dragging' : ''}${disabled ? ' disabled' : ''}`}
      onDragOver={handleDrag}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Upload image"
      onKeyDown={(e) => e.key === 'Enter' && !disabled && inputRef.current?.click()}
    >
      <div className="drop-icon">📤</div>
      <strong style={{ color: 'var(--ink)', fontSize: '15px' }}>Drop an image here</strong>
      <p>or click to browse · JPG, PNG, WebP · max 50 MB</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={handleChange}
        tabIndex={-1}
      />
    </div>
  )
}
