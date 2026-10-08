import type { Metadata } from 'next'
import { BASE, pageMetadata, softwareAppJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { ObjectRemoverTool } from './ObjectRemoverTool'

const url = `${BASE}/object-remover`

export const metadata: Metadata = pageMetadata({
  title: 'Object & People Remover — Smart Fill, No Upload | AI NanoImage',
  description:
    'Remove people, objects, and watermarks from photos by painting over them. On-device edge-diffusion fill — no model download, no upload, free.',
  url,
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    breadcrumbJsonLd([
      { name: 'AI NanoImage', url: BASE },
      { name: 'Object Remover', url },
    ]),
    softwareAppJsonLd({
      name: 'AI Object & People Remover — AI NanoImage',
      url,
      description:
        'Remove objects, people, and watermarks from photos in your browser. Paint a mask, click remove — no upload, no account, free.',
    }),
    faqJsonLd([
      {
        q: 'Is my photo uploaded anywhere?',
        a: 'No. The entire brush painting and fill algorithm run inside your browser using Canvas APIs. Your photo never leaves your device.',
      },
      {
        q: 'What kind of objects can be removed?',
        a: 'The on-device fill works best for small, isolated objects like stray people in a landscape, logos, watermarks, timestamps, and minor blemishes. For large or complex objects with detailed backgrounds, results may be imperfect — try painting in small sections and iterating.',
      },
      {
        q: 'How does the fill algorithm work?',
        a: 'We use an edge-diffusion (fast-marching style) algorithm: masked pixels are filled layer by layer from the boundary inward, averaging the color of nearby unmasked pixels. This propagates background texture naturally into the removed area without any model download.',
      },
      {
        q: 'Can I undo my brush strokes?',
        a: 'Yes. The Undo button steps back one stroke at a time (up to 30 levels of history). Clear resets the entire mask. After running Remove, you can also use Keep editing to continue painting on the result.',
      },
      {
        q: 'What is the difference from a cloud-based remover?',
        a: 'Cloud removers upload your photo to a server — which may be a problem for private or sensitive images. This tool processes everything on your device, so photos of people, documents, or anything private never leave your browser.',
      },
    ]),
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-wrap">
        {/* Hero */}
        <div className="tool-hero">
          <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🪄</div>
          <h1>Object & People Remover</h1>
          <p>
            Paint over anything you want gone — stray people, watermarks, logos, timestamps.
            On-device edge-diffusion fill restores the background from surrounding pixels, instantly.
          </p>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <span className="privacy-badge">🔒 Photo stays in your browser</span>
            <span className="trust-pill">🖌 Adjustable brush size</span>
            <span className="trust-pill">↩ Undo / redo</span>
            <span className="trust-pill">⚡ No model download needed</span>
          </div>
        </div>

        {/* Live tool */}
        <ObjectRemoverTool />

        {/* How it works */}
        <section style={{ marginTop: '3rem' }}>
          <h2 className="section-title">How it works</h2>
          <div className="how-to-steps">
            <div className="how-to-step">Upload a JPG, PNG, or WebP photo.</div>
            <div className="how-to-step">Use the paint brush to mark the object or person you want removed. Adjust brush size as needed; use Erase to refine the selection.</div>
            <div className="how-to-step">Click "Remove object" — the algorithm fills the masked region by propagating surrounding background colors inward.</div>
            <div className="how-to-step">If the result needs more work, click "Keep editing" to paint on the result and run again. Then download your PNG.</div>
          </div>
        </section>

        {/* Tips */}
        <section
          style={{
            marginTop: '2.5rem',
            background: 'var(--ai-accent-light)',
            border: '1.5px solid #c8b8ff',
            borderRadius: '14px',
            padding: '1.5rem',
          }}
        >
          <h2 style={{ font: '700 1rem/1.3 var(--sans)', color: 'var(--ai-accent)', margin: '0 0 1rem' }}>
            🎨 Tips for best results
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'Paint tight', body: 'Stay close to the object edges. Extra mask area means more background to synthesize, which can look patchy on complex textures.' },
              { title: 'Work in sections', body: 'For large objects, remove in 2–3 smaller patches (use Keep editing). Each pass synthesizes better than one giant mask.' },
              { title: 'Uniform backgrounds', body: 'Plain sky, grass, sand, walls, and floors fill best. Intricate patterns (brick, crowd) may need multiple iterations.' },
            ].map(({ title, body }) => (
              <div key={title}>
                <strong style={{ fontSize: '13px', color: 'var(--ink)', display: 'block', marginBottom: '.35rem' }}>{title}</strong>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title">Features</h2>
          <ul className="tool-bullets">
            <li>Paint brush with S / M / L / XL sizes</li>
            <li>Erase mode to refine brush marks</li>
            <li>Up to 30 levels of undo history</li>
            <li>One-click clear mask</li>
            <li>Before/after comparison slider in result view</li>
            <li>Keep editing — iterate on the result for complex removals</li>
            <li>No model download · no upload · no account · free</li>
          </ul>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title">FAQ</h2>
          <dl className="faq-list">
            {[
              {
                q: 'Is my photo uploaded anywhere?',
                a: 'No. The entire brush painting and fill algorithm run inside your browser using Canvas APIs. Your photo never leaves your device.',
              },
              {
                q: 'What kind of objects can be removed?',
                a: 'The on-device fill works best for small, isolated objects like stray people in a landscape, logos, watermarks, timestamps, and minor blemishes. For large or complex objects with detailed backgrounds, results may be imperfect — try painting in small sections and iterating.',
              },
              {
                q: 'How does the fill algorithm work?',
                a: 'We use an edge-diffusion (fast-marching style) algorithm: masked pixels are filled layer by layer from the boundary inward, averaging the color of nearby unmasked pixels. This propagates background texture naturally into the removed area without any model download.',
              },
              {
                q: 'Can I undo my brush strokes?',
                a: 'Yes. The Undo button steps back one stroke at a time (up to 30 levels of history). Clear resets the entire mask. After running Remove, you can also use Keep editing to continue painting on the result.',
              },
              {
                q: 'What is the difference from a cloud-based remover?',
                a: 'Cloud removers upload your photo to a server — which may be a problem for private or sensitive images. This tool processes everything on your device, so photos of people, documents, or anything private never leave your browser.',
              },
            ].map((faq, i) => (
              <details className="faq-item" key={i}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </dl>
        </section>

        {/* Cross-links */}
        <section style={{ marginTop: '3rem', borderTop: '1.5px solid var(--line)', paddingTop: '2rem' }}>
          <h2 className="section-title">More tools</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem' }}>
            <a href="/background-remover" className="btn btn-primary">✂️ AI Background Remover →</a>
            <a href="/smart-crop" className="btn btn-secondary">🎯 Smart Crop & Blur →</a>
            <a href="/image-upscaler" className="btn btn-secondary">🔍 Image Upscaler →</a>
            <a href="/tools" className="btn btn-secondary">All AI tools →</a>
          </div>
        </section>
      </div>
    </>
  )
}
