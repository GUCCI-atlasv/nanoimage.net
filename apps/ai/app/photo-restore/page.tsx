import type { Metadata } from 'next'
import { BASE, pageMetadata, softwareAppJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { PhotoRestoreTool } from './PhotoRestoreTool'

const url = `${BASE}/photo-restore`

export const metadata: Metadata = pageMetadata({
  title: 'Photo Restore & Colorize — On-device, No Upload | AI NanoImage',
  description:
    'Restore contrast and sharpness of old photos and add warm natural color to black-and-white pictures. Instant on-device Canvas processing — no model download, no upload, free.',
  url,
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    breadcrumbJsonLd([
      { name: 'AI NanoImage', url: BASE },
      { name: 'Photo Restore & Colorize', url },
    ]),
    softwareAppJsonLd({
      name: 'Photo Restore & Colorize — AI NanoImage',
      url,
      description:
        'Restore old photos and colorize black-and-white pictures in your browser. No upload — private family photos stay on your device.',
    }),
    faqJsonLd([
      {
        q: 'Is my photo uploaded anywhere?',
        a: 'No. All restoration and colorization processing happens inside your browser using Canvas APIs. Your photo — especially private family photos — never leaves your device.',
      },
      {
        q: 'What does the Restore mode do?',
        a: 'Restore applies three steps: a gentle bilateral-approximate denoiser that softens grain and scratches while preserving edges; adaptive contrast equalization that brings out faded mid-tones; and a Laplacian sharpening pass that recovers edge crispness lost in old scanning.',
      },
      {
        q: 'How accurate is the colorization?',
        a: 'Colorization uses a luminance-guided tone mapping: shadows map to warm brown, midtones toward green-teal (foliage, fabric), highlights toward blue sky and warm sunlight. It produces natural-looking results on most outdoor and portrait photos, but it is an estimate — not a recovery of the actual original colors. Adjust the strength slider to control intensity.',
      },
      {
        q: 'Can I run Restore and Colorize together?',
        a: 'Yes — use "Restore + Colorize" mode. The photo is first denoised and sharpened, then colorized. This order gives the best result because colorizing a sharpened image preserves edge-color alignment.',
      },
      {
        q: 'What photos work best?',
        a: 'Scanned black-and-white or sepia portraits and landscape photos respond best. Very low-resolution scans (< 300 px on the short side) have limited quality to recover. For those, try the Image Upscaler first, then Restore.',
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
          <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🎞️</div>
          <h1>Photo Restore & Colorize</h1>
          <p>
            Bring old, faded photos back to life — denoise, boost contrast, sharpen, and add
            warm natural tones to black-and-white pictures. All on-device, no model download.
          </p>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <span className="privacy-badge">🔒 Photo stays in your browser</span>
            <span className="trust-pill">🔧 Restore: denoise + contrast + sharpen</span>
            <span className="trust-pill">🎨 Colorize: luminance tone mapping</span>
            <span className="trust-pill">⚡ Instant — no model download</span>
          </div>
        </div>

        {/* Live tool */}
        <PhotoRestoreTool />

        {/* How it works */}
        <section style={{ marginTop: '3rem' }}>
          <h2 className="section-title">How it works</h2>
          <div className="how-to-steps">
            <div className="how-to-step">Upload an old, faded, or black-and-white JPG, PNG, or WebP photo.</div>
            <div className="how-to-step">Choose Restore (sharpen & denoise), Colorize (add color), or both.</div>
            <div className="how-to-step">For Colorize, adjust the strength slider to control how vivid the colors appear.</div>
            <div className="how-to-step">Drag the before/after slider to compare, then download your restored PNG.</div>
          </div>
        </section>

        {/* Under the hood */}
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
            ⚙️ Under the hood
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              {
                title: 'Restore: Bilateral denoiser',
                body: 'Approximates a bilateral filter by averaging only nearby pixels with similar color values (color distance threshold), preserving edges while smoothing grain and scratches.',
              },
              {
                title: 'Restore: Adaptive CLAHE contrast',
                body: 'Histogram is clipped at 2% of pixel count before equalization — avoids the harsh over-amplification of classic histogram equalization while recovering faded tones.',
              },
              {
                title: 'Colorize: Luminance tone mapping',
                body: 'Each grey level maps to an RGB offset on a hand-tuned curve: warm browns for shadows, teal-greens for midtones, sky-blues and warm whites for highlights. Strength slider scales the offset.',
              },
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
            <li>Restore: bilateral denoise → adaptive contrast → Laplacian sharpening</li>
            <li>Colorize: luminance-guided warm-to-cool tone mapping</li>
            <li>Colorize strength slider — 20%–100%</li>
            <li>Restore + Colorize: chained for best results</li>
            <li>Before/after drag-slider comparison</li>
            <li>No model download · no upload · no account · free</li>
            <li>Export as full-resolution PNG</li>
          </ul>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title">FAQ</h2>
          <dl className="faq-list">
            {[
              {
                q: 'Is my photo uploaded anywhere?',
                a: 'No. All restoration and colorization processing happens inside your browser using Canvas APIs. Your photo — especially private family photos — never leaves your device.',
              },
              {
                q: 'What does the Restore mode do?',
                a: 'Restore applies three steps: a gentle bilateral-approximate denoiser that softens grain and scratches while preserving edges; adaptive contrast equalization that brings out faded mid-tones; and a Laplacian sharpening pass that recovers edge crispness lost in old scanning.',
              },
              {
                q: 'How accurate is the colorization?',
                a: 'Colorization uses a luminance-guided tone mapping: shadows map to warm brown, midtones toward green-teal (foliage, fabric), highlights toward blue sky and warm sunlight. It produces natural-looking results on most outdoor and portrait photos, but it is an estimate — not a recovery of the actual original colors. Adjust the strength slider to control intensity.',
              },
              {
                q: 'Can I run Restore and Colorize together?',
                a: 'Yes — use "Restore + Colorize" mode. The photo is first denoised and sharpened, then colorized. This order gives the best result because colorizing a sharpened image preserves edge-color alignment.',
              },
              {
                q: 'What photos work best?',
                a: 'Scanned black-and-white or sepia portraits and landscape photos respond best. Very low-resolution scans (< 300 px on the short side) have limited quality to recover. For those, try the Image Upscaler first, then Restore.',
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
            <a href="/image-upscaler" className="btn btn-primary">🔍 Image Upscaler — enlarge first →</a>
            <a href="/background-remover" className="btn btn-secondary">✂️ AI Background Remover →</a>
            <a href="/smart-crop" className="btn btn-secondary">🎯 Smart Crop & Blur →</a>
            <a href="/tools" className="btn btn-secondary">All AI tools →</a>
          </div>
        </section>
      </div>
    </>
  )
}
