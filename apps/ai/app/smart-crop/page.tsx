import type { Metadata } from 'next'
import { getFeature } from '@/lib/features'
import { BASE, pageMetadata, softwareAppJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { SmartCropTool } from './SmartCropTool'

const f = getFeature('smart-crop')!
const url = `${BASE}/${f.slug}`

export const metadata: Metadata = pageMetadata({
  title: 'AI Smart Crop & Portrait Blur — On-device, No Upload | AI NanoImage',
  description:
    'Auto-crop any image to 1:1, 4:5, 16:9, 9:16 or 4:3 with on-device AI subject detection. Or apply portrait background blur (bokeh) with a MediaPipe segmentation model. No upload, free.',
  url,
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    breadcrumbJsonLd([
      { name: 'AI NanoImage', url: BASE },
      { name: 'Smart Crop & Portrait Blur', url },
    ]),
    softwareAppJsonLd({
      name: 'AI Smart Crop & Portrait Blur — AI NanoImage',
      url,
      description:
        'On-device AI smart crop and portrait background blur. Runs in your browser with WebGPU or WASM — no image upload, no account, free.',
    }),
    faqJsonLd([
      {
        q: 'Is my photo uploaded anywhere?',
        a: 'No. Smart Crop uses no network at all — it runs a pure Canvas algorithm. Portrait Blur downloads a 3 MB model once (cached), then processes your image entirely on-device. Your photo never leaves the browser.',
      },
      {
        q: 'How does Smart Crop know where the subject is?',
        a: 'It computes a Sobel edge energy map of your image, builds an integral image for fast rectangle sums, then slides a window at your target ratio to find the region with the most visual detail. No AI model is used — this runs instantly on any device.',
      },
      {
        q: 'Can I adjust the crop after auto-detection?',
        a: 'Yes. Drag the box to reposition it, or drag the corner handles to resize while maintaining the aspect ratio. Then click Download crop.',
      },
      {
        q: 'Which browsers support Portrait Blur?',
        a: 'Portrait Blur uses MediaPipe which runs on WebGPU (Chrome/Edge 113+, fastest) or WASM (any modern browser, slightly slower). Smart Crop works in every modern browser.',
      },
      {
        q: 'What aspect ratios are supported?',
        a: '1:1 (square), 4:5 (Instagram portrait), 4:3 (standard photo), 16:9 (widescreen / YouTube), and 9:16 (vertical / Stories). More ratios including custom input are planned.',
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
          <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🎯</div>
          <h1>AI Smart Crop & Portrait Blur</h1>
          <p>
            Auto-crop to any ratio with instant subject detection — or add a professional
            depth-of-field background blur. Both run on-device, no upload, no account.
          </p>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <span className="privacy-badge">🔒 Photo stays in your browser</span>
            <span className="trust-pill">✂️ Smart Crop — instant, no model</span>
            <span className="trust-pill">🌫️ Portrait Blur — ~3 MB model, cached</span>
          </div>
        </div>

        {/* Live tool */}
        <SmartCropTool />

        {/* How it works */}
        <section style={{ marginTop: '3rem' }}>
          <h2 className="section-title">How Smart Crop works</h2>
          <div className="how-to-steps">
            <div className="how-to-step">Upload a JPG, PNG, or WebP image.</div>
            <div className="how-to-step">Choose your target aspect ratio (1:1, 4:5, 16:9, 9:16, or 4:3).</div>
            <div className="how-to-step">The algorithm instantly computes the most detail-rich crop region and places the box automatically.</div>
            <div className="how-to-step">Drag the box or corners to fine-tune, then download the full-resolution crop.</div>
          </div>
        </section>

        <section style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title">How Portrait Blur works</h2>
          <div className="how-to-steps">
            <div className="how-to-step">Switch to the Portrait Blur tab after uploading.</div>
            <div className="how-to-step">Choose blur strength with the slider.</div>
            <div className="how-to-step">Click "Apply blur" — the MediaPipe model (~3 MB) downloads once then runs on-device to segment the subject.</div>
            <div className="how-to-step">Compare before/after, then download your PNG.</div>
          </div>
        </section>

        {/* Tech under the hood */}
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
                title: 'Smart Crop — zero model',
                body: 'Sobel gradient energy map → 2D integral image → O(n) sliding window search. Runs in &lt;50 ms on any device, no network.',
              },
              {
                title: 'Portrait Blur — MediaPipe',
                body: 'selfie_segmenter float16, ~3 MB. GPU delegate (WebGPU) for speed; WASM CPU fallback everywhere else.',
              },
              {
                title: 'Compositing',
                body: 'Canvas blur filter for background → confidence mask blend for smooth subject edges. Export at full source resolution.',
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <strong style={{ fontSize: '13px', color: 'var(--ink)', display: 'block', marginBottom: '.35rem' }}>{title}</strong>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: body }} />
              </div>
            ))}
          </div>
        </section>

        {/* Features list */}
        <section style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title">Features</h2>
          <ul className="tool-bullets">
            <li>Smart Crop: instant auto-framing to 5 aspect ratios — no model, works offline</li>
            <li>Drag-to-adjust crop box with corner resize handles</li>
            <li>Full-resolution export — no downsampling</li>
            <li>Portrait Blur: MediaPipe selfie segmenter, sharp subject over blurred background</li>
            <li>Blur strength slider (2–40 px radius)</li>
            <li>Before/after compare toggle</li>
            <li>WebGPU accelerated · WASM fallback · no upload · free</li>
          </ul>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title">FAQ</h2>
          <dl className="faq-list">
            {[
              {
                q: 'Is my photo uploaded anywhere?',
                a: 'No. Smart Crop uses no network at all — it runs a pure Canvas algorithm. Portrait Blur downloads a 3 MB model once (cached), then processes your image entirely on-device. Your photo never leaves the browser.',
              },
              {
                q: 'How does Smart Crop know where the subject is?',
                a: 'It computes a Sobel edge energy map of your image, builds an integral image for fast rectangle sums, then slides a window at your target ratio to find the region with the most visual detail. No AI model is used — this runs instantly on any device.',
              },
              {
                q: 'Can I adjust the crop after auto-detection?',
                a: 'Yes. Drag the box to reposition it, or drag the corner handles to resize while maintaining the aspect ratio. Then click Download crop.',
              },
              {
                q: 'Which browsers support Portrait Blur?',
                a: 'Portrait Blur uses MediaPipe which runs on WebGPU (Chrome/Edge 113+, fastest) or WASM (any modern browser, slightly slower). Smart Crop works in every modern browser.',
              },
              {
                q: 'What aspect ratios are supported?',
                a: '1:1 (square), 4:5 (Instagram portrait), 4:3 (standard photo), 16:9 (widescreen / YouTube), and 9:16 (vertical / Stories). More ratios including custom input are planned.',
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
            <a href="/background-remover" className="btn btn-primary">
              ✂️ AI Background Remover →
            </a>
            <a href="https://nanoimage.net/crop-image" className="btn btn-secondary" rel="noopener" target="_blank">
              Manual crop on nanoimage.net →
            </a>
            <a href="/tools" className="btn btn-secondary">All AI tools →</a>
          </div>
        </section>
      </div>
    </>
  )
}
