import type { Feature } from '@/lib/features'
import { BASE } from '@/lib/seo'

const techDetails: Record<string, { model: string; runtime: string; size: string; why: string }> = {
  'image-upscaler': {
    model: 'Real-ESRGAN (FP16 quantised)',
    runtime: 'ONNX Runtime Web + WebGPU / WebGL',
    size: '~60 MB (cached after first download)',
    why: 'Tiled inference lets it handle large images without overflowing GPU memory.',
  },
  'object-remover': {
    model: 'LaMa — Large Mask inpainting (~208 MB)',
    runtime: 'ONNX Runtime Web + WebGPU / WASM',
    size: '~208 MB (you confirm the download before it starts)',
    why: 'LaMa excels at filling large, complex masked regions with coherent texture.',
  },
  'photo-restore': {
    model: 'GFPGAN / CodeFormer (face restore) + DeOldify-class (colorize)',
    runtime: 'ONNX Runtime Web + WebGPU / WASM',
    size: '~80 MB combined',
    why: 'Two stackable models: restore detail first, then add natural color.',
  },
  'smart-crop': {
    model: 'U²-Net (lightweight saliency / segmentation)',
    runtime: 'ONNX Runtime Web + WebGPU / WASM',
    size: '~10 MB — the lightest feature in the lineup',
    why: 'Detects the most visually salient subject and anchors the crop box to it.',
  },
}

const mainSiteLink: Record<string, string> = {
  'image-upscaler': 'https://nanoimage.net/upscale-image',
  'object-remover': 'https://nanoimage.net/change-background',
  'photo-restore': 'https://nanoimage.net/enhance-image',
  'smart-crop': 'https://nanoimage.net/crop-image',
}

export function ComingSoonPage({ f }: { f: Feature }) {
  const tech = techDetails[f.slug]
  const fallback = mainSiteLink[f.slug]

  return (
    <div className="page-wrap">
      {/* Hero */}
      <div className="tool-hero">
        <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>{f.emoji}</div>
        <h1>{f.title}</h1>
        <p>{f.subtitle}</p>
        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <span className="privacy-badge">🔒 Will run 100% on-device — no upload</span>
          <span
            style={{
              background: '#fff8e1',
              border: '1.5px solid #ffe082',
              color: '#7a5800',
              fontSize: '12px',
              fontWeight: 600,
              padding: '5px 12px',
              borderRadius: '8px',
            }}
          >
            ⏳ Milestone {f.milestone}
          </span>
        </div>
      </div>

      {/* Coming soon card with richer content */}
      <div
        style={{
          background: 'var(--paper)',
          border: '1.5px solid var(--line)',
          borderRadius: '18px',
          padding: '2rem',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ font: '700 1.2rem/1.3 var(--sans)', color: 'var(--ink)', margin: '0 0 1rem' }}>
          What we&apos;re building
        </h2>
        <ul className="tool-bullets">
          {f.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        {tech && (
          <div
            style={{
              marginTop: '1.5rem',
              background: 'var(--ai-accent-light)',
              border: '1.5px solid #c8b8ff',
              borderRadius: '12px',
              padding: '1.25rem',
            }}
          >
            <p style={{ font: '700 13px/1 var(--sans)', color: 'var(--ai-accent)', margin: '0 0 .75rem' }}>
              ⚙️ Under the hood
            </p>
            <dl
              style={{
                display: 'grid',
                gridTemplateColumns: 'max-content 1fr',
                gap: '.4rem 1rem',
                fontSize: '13px',
                margin: 0,
              }}
            >
              {[
                ['Model', tech.model],
                ['Runtime', tech.runtime],
                ['Download', tech.size],
                ['Why it works', tech.why],
              ].map(([label, value]) => (
                <>
                  <dt key={`dt-${label}`} style={{ color: 'var(--muted)', fontWeight: 600 }}>{label}</dt>
                  <dd key={`dd-${label}`} style={{ color: 'var(--ink)', margin: 0 }}>{value}</dd>
                </>
              ))}
            </dl>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '.75rem' }}>
          {fallback && (
            <a href={fallback} className="btn btn-secondary" rel="noopener" target="_blank">
              Use the basic version on nanoimage.net →
            </a>
          )}
          <a href={`${BASE}/background-remover`} className="btn btn-primary">
            ✂️ Try AI Background Remover (live now)
          </a>
        </div>
      </div>

      {/* How it will work */}
      <section style={{ marginTop: '2rem' }}>
        <h2 className="section-title">How it will work</h2>
        <div className="how-to-steps">
          {f.howTo.map((step, i) => (
            <div className="how-to-step" key={i}>{step}</div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {f.faqs.length > 0 && (
        <section style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title">FAQ</h2>
          <dl className="faq-list">
            {f.faqs.map((faq, i) => (
              <details className="faq-item" key={i}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </dl>
        </section>
      )}

      {/* Privacy explainer */}
      <section
        style={{
          marginTop: '2.5rem',
          background: '#f0fdf4',
          border: '1.5px solid #bbf7d0',
          borderRadius: '14px',
          padding: '1.5rem',
        }}
      >
        <h2 style={{ font: '700 1rem/1.3 var(--sans)', color: '#166534', margin: '0 0 .75rem' }}>
          🔒 Still no upload — even with AI
        </h2>
        <p style={{ fontSize: '14px', color: '#166534', margin: 0, lineHeight: 1.7 }}>
          Every other AI image tool sends your photo to a server for processing. We download the AI
          model weights to your browser <strong>once</strong>, then all inference runs locally.
          You can verify this: open DevTools → Network tab → run the tool → you&apos;ll see zero
          image upload requests. Only the model file downloads from our CDN.
        </p>
      </section>
    </div>
  )
}
