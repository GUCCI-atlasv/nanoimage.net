import type { Metadata } from 'next'
import { features } from '@/lib/features'
import { BASE, pageMetadata } from '@/lib/seo'

const url = `${BASE}/tools`
const title = 'All AI Tools — AI NanoImage'
const description =
  'Browse all on-device AI image tools: background removal, upscaling, object erasure, photo restoration, smart crop. No upload, free.'

export const metadata: Metadata = pageMetadata({ title, description, url })

export default function ToolsPage() {
  return (
    <div className="page-wrap wide">
      <div className="tool-hero">
        <h1>All AI tools</h1>
        <p>
          Five high-demand AI image features — all running in your browser with WebGPU or WASM.
          No account, no upload, no watermark.
        </p>
      </div>
      <div className="feature-grid">
        {features.map((f) => (
          <a key={f.slug} href={`/${f.slug}`} className="feature-card">
            <div className="card-icon">{f.emoji}</div>
            <h2>{f.name}</h2>
            <p>{f.subtitle}</p>
            <div className="card-status" style={{ fontSize: '12px' }}>
              Model: ~{f.modelSizeMb} MB · {f.milestone}
            </div>
            <div className={`card-status${f.status === 'soon' ? ' soon' : ''}`}>
              {f.status === 'live' ? '✓ Available now' : '⏳ Coming soon'}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
