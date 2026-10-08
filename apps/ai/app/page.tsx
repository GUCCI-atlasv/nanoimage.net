import type { Metadata } from 'next'
import { features } from '@/lib/features'
import { BASE, pageMetadata, softwareAppJsonLd } from '@/lib/seo'

const title = 'AI NanoImage — On-device AI Image Tools. Still No Upload.'
const description =
  'AI background removal, super-resolution, object erasure, photo restoration, and smart crop — all running in your browser. No upload, no account, no watermark. Free forever.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  ...pageMetadata({ title, description, url: BASE }),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${BASE}/#webpage`,
      url: BASE,
      name: title,
      description,
      inLanguage: 'en',
      isPartOf: { '@id': `${BASE}/#website` },
    },
    softwareAppJsonLd({ name: 'AI NanoImage', url: BASE, description }),
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-emoji">🤖✂️</div>
        <h1>
          AI image tools that <em>still</em> don&apos;t upload your photos.
        </h1>
        <p>
          Background removal, upscaling, object erasure, photo restoration, smart crop —
          all powered by on-device AI (WebGPU / WASM). Your image never leaves the browser.
        </p>
        <div className="trust-pills">
          <span className="trust-pill">🔒 Zero upload</span>
          <span className="trust-pill">⚡ WebGPU accelerated</span>
          <span className="trust-pill">🎁 Free forever</span>
          <span className="trust-pill">🚫 No account</span>
          <span className="trust-pill">💾 Works offline after first load</span>
        </div>
        <a href="/background-remover" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
          Try AI Background Remover →
        </a>
      </section>

      {/* ── Before / After visual demo ── */}
      <section
        style={{
          background: 'var(--paper)',
          borderTop: '1.5px solid var(--line)',
          borderBottom: '1.5px solid var(--line)',
          padding: '3rem 1.25rem',
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ai-accent)', marginBottom: '.5rem' }}>
            See the difference
          </p>
          <h2
            style={{
              textAlign: 'center',
              font: '700 1.5rem/1.2 var(--sans)',
              color: 'var(--ink)',
              margin: '0 0 2rem',
            }}
          >
            One click. Subject out. Background gone.
          </h2>

          {/* Split card comparison */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            {/* Before */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1.5px solid var(--line)',
                  background: '#e8e8e8',
                  aspectRatio: '4/3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
                aria-label="Before: photo with busy background"
              >
                {/* CSS illustration of a "messy background" scene */}
                <svg viewBox="0 0 400 300" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  {/* Sky */}
                  <rect width="400" height="300" fill="#b0c8e0" />
                  {/* Ground */}
                  <rect y="200" width="400" height="100" fill="#8ab87a" />
                  {/* Buildings in background */}
                  <rect x="20" y="100" width="60" height="140" fill="#9eaec0" />
                  <rect x="90" y="130" width="50" height="110" fill="#8fa0b5" />
                  <rect x="310" y="80" width="70" height="160" fill="#9eaec0" />
                  {/* Crowd blobs */}
                  <ellipse cx="60" cy="200" rx="20" ry="30" fill="#c07850" />
                  <ellipse cx="340" cy="205" rx="18" ry="28" fill="#d08860" />
                  {/* Main subject — person silhouette */}
                  <ellipse cx="200" cy="155" rx="38" ry="52" fill="#4a3728" />
                  <ellipse cx="200" cy="108" rx="26" ry="28" fill="#d4956a" />
                  {/* Noise label */}
                  <text x="200" y="270" textAnchor="middle" fontSize="11" fill="white" fontFamily="sans-serif" opacity=".8">busy background</text>
                </svg>
              </div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)', marginTop: '.75rem' }}>
                Before — original photo
              </p>
            </div>

            {/* Arrow */}
            <div style={{ textAlign: 'center', color: 'var(--ai-accent)', fontSize: '1.75rem' }}>→</div>

            {/* After */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1.5px solid #c8b8ff',
                  background: 'repeating-conic-gradient(#e4e4e4 0% 25%, #fff 0% 50%) 0 0 / 20px 20px',
                  aspectRatio: '4/3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
                aria-label="After: subject on transparent background"
              >
                <svg viewBox="0 0 400 300" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  {/* Only the subject — same silhouette, no background */}
                  <ellipse cx="200" cy="165" rx="38" ry="52" fill="#4a3728" />
                  <ellipse cx="200" cy="113" rx="26" ry="28" fill="#d4956a" />
                  {/* Glow ring to indicate selection */}
                  <ellipse cx="200" cy="140" rx="56" ry="72" fill="none" stroke="#7d52ff" strokeWidth="2" strokeDasharray="6 4" opacity=".6" />
                  <text x="200" y="270" textAnchor="middle" fontSize="11" fill="#7d52ff" fontFamily="sans-serif" opacity=".9">transparent background</text>
                </svg>
              </div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ai-accent)', marginTop: '.75rem' }}>
                After — transparent PNG, ready to use
              </p>
            </div>
          </div>

          {/* Verifiable privacy tip */}
          <p
            style={{
              textAlign: 'center',
              fontSize: '13px',
              color: 'var(--muted)',
              marginTop: '1.5rem',
              maxWidth: '540px',
              marginInline: 'auto',
            }}
          >
            <strong style={{ color: 'var(--ink)' }}>🔒 Verify it:</strong> open DevTools → Network tab while using the tool.
            You&apos;ll see <em>zero image upload requests</em>. Only the AI model weights come from our CDN.
          </p>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <a href="/background-remover" className="btn btn-primary">
              Try it now — free, no signup →
            </a>
          </div>
        </div>
      </section>

      {/* ── Feature grid ── */}
      <section className="page-wrap wide" style={{ paddingTop: '2.5rem' }}>
        <h2 className="section-title">All AI tools</h2>
        <div className="feature-grid">
          {features.map((f) => (
            <a key={f.slug} href={`/${f.slug}`} className="feature-card">
              <div className="card-icon">{f.emoji}</div>
              <h2>{f.name}</h2>
              <p>{f.subtitle}</p>
              <div className={`card-status${f.status === 'soon' ? ' soon' : ''}`}>
                {f.status === 'live' ? '✓ Available now' : '⏳ Coming soon'}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── "Still no upload" explainer ── */}
      <section
        className="page-wrap"
        style={{
          padding: '4rem 1.25rem',
          textAlign: 'center',
          borderTop: '1.5px solid var(--line)',
          marginTop: '3rem',
        }}
      >
        <h2
          style={{
            font: '700 1.6rem/1.2 var(--sans)',
            color: 'var(--ink)',
            marginBottom: '1rem',
          }}
        >
          "Still no upload." — what that means
        </h2>
        <p
          style={{
            maxWidth: '560px',
            margin: '0 auto 1.5rem',
            fontSize: '15px',
            color: 'var(--muted)',
          }}
        >
          Every competitor — remove.bg, Cleanup.pictures, Upscale.media — sends your photos to
          their servers. We download the AI model <em>to your device once</em>, then all
          inference runs locally. Your images stay in your browser&apos;s memory. We see nothing.
        </p>

        {/* How-it-works mini grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            maxWidth: '700px',
            margin: '0 auto 2rem',
            textAlign: 'left',
          }}
        >
          {[
            { icon: '📥', title: 'Model downloads once', body: 'The AI weights fetch from our CDN and cache in your browser.' },
            { icon: '💻', title: 'Inference runs locally', body: 'WebGPU or WASM processes your image entirely on your device.' },
            { icon: '📤', title: 'Nothing leaves the tab', body: 'Your photo lives only in browser memory — never on a server.' },
          ].map(({ icon, title, body }) => (
            <div
              key={title}
              style={{
                background: 'var(--paper)',
                border: '1.5px solid var(--line)',
                borderRadius: '14px',
                padding: '1.1rem',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '.4rem' }}>{icon}</div>
              <strong style={{ fontSize: '14px', color: 'var(--ink)', display: 'block', marginBottom: '.3rem' }}>{title}</strong>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{body}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="https://nanoimage.net" className="btn btn-secondary" rel="noopener" target="_blank">
            ← Basic tools on nanoimage.net
          </a>
          <a href="/background-remover" className="btn btn-primary">
            Try AI background removal →
          </a>
        </div>
      </section>
    </>
  )
}
