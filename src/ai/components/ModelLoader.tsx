'use client'
import type { DownloadProgress } from '../lib/runModel'

type Props = {
  progress: DownloadProgress | null
  /** e.g. "~45 MB" */
  modelNote: string
}

export function ModelLoader({ progress, modelNote }: Props) {
  if (!progress) return null

  const pct = progress.percent
  const done = pct >= 100

  return (
    <div className="model-loader" role="status" aria-live="polite">
      <p className="loader-label">
        {done ? '✓ Model ready' : `Downloading AI model… ${pct}%`}
      </p>
      {!done && (
        <>
          <progress max={100} value={pct} aria-label={`Model download ${pct}%`} />
          <p className="loader-sub">
            {progress.loadedMb != null && progress.totalMb != null
              ? `${progress.loadedMb} / ${progress.totalMb} MB`
              : modelNote}
            {' '}· Cached for offline reuse after this download.
          </p>
        </>
      )}
    </div>
  )
}
