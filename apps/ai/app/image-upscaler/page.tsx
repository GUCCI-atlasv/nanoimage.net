import type { Metadata } from 'next'
import { BASE, pageMetadata, softwareAppJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { ImageUpscalerTool } from './ImageUpscalerTool'

const url = `${BASE}/image-upscaler`

export const metadata: Metadata = pageMetadata({
  title: 'Image Upscaler 2× / 4× — Smart, No Upload | AI NanoImage',
  description:
    'Enlarge photos and illustrations 2× or 4× with multi-pass smart upsampling and adaptive sharpening — sharper than standard bicubic, instant, no model download. Free, no upload.',
  url,
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    breadcrumbJsonLd([
      { name: 'AI NanoImage', url: BASE },
      { name: 'Image Upscaler', url },
    ]),
    softwareAppJsonLd({
      name: 'AI Image Upscaler 2× / 4× — AI NanoImage',
      url,
      description:
        'Upscale images 2× or 4× with on-device super-resolution. No upload, no watermark, free. Works in any modern browser.',
    }),
    faqJsonLd([
      {
        q: 'Is my image uploaded anywhere?',
        a: 'No. All processing happens in your browser using Canvas APIs. Your image never leaves your device — not even the upscaled result.',
      },
      {
        q: 'How is this better than just resizing in Photoshop or Preview?',
        a: 'Browser apps and standard tools use bicubic interpolation, which blurs detail when scaling up. Our multi-pass approach with adaptive unsharp masking recovers edge crispness and reduces halos, producing a noticeably sharper result without AI model downloads.',
      },
      {
        q: 'What is the difference between Photo and Illustration mode?',
        a: 'Photo mode applies a stronger contrast boost and a wider unsharp mask radius, which works well for natural photography. Illustration mode uses a tighter, softer sharpening pass that preserves clean linework and flat color areas without introducing halos.',
      },
      {
        q: 'Is there a maximum image size?',
        a: 'Processing is done in your browser, so very large images (>20 MP) may take longer or hit memory limits on low-end devices. For best results, start with images up to ~8 MP. 4× on a 2000×2000 px source produces a 64 MP output — which may stress older devices.',
      },
      {
        q: 'Can I upscale illustrations and anime images?',
        a: 'Yes — switch to Illustration mode. It uses a softer sharpening profile that preserves clean lines and avoids over-sharpening flat color regions typical of anime and vector art.',
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
          <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🔍</div>
          <h1>Image Upscaler 2× / 4×</h1>
          <p>
            Enlarge photos and illustrations with noticeably sharper edges than standard resizing.
            Multi-pass bilinear upsampling + adaptive unsharp mask — instant, no model download.
          </p>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <span className="privacy-badge">🔒 Photo stays in your browser</span>
            <span className="trust-pill">📷 Photo mode</span>
            <span className="trust-pill">🎨 Illustration mode</span>
            <span className="trust-pill">⚡ Instant — no model download</span>
          </div>
        </div>

        {/* Live tool */}
        <ImageUpscalerTool />

        {/* How it works */}
        <section style={{ marginTop: '3rem' }}>
          <h2 className="section-title">How it works</h2>
          <div className="how-to-steps">
            <div className="how-to-step">Upload a JPG, PNG, or WebP image.</div>
            <div className="how-to-step">Choose your target scale (2× or 4×) and mode (Photo or Illustration).</div>
            <div className="how-to-step">The image is upscaled in progressive 1.4× steps to avoid aliasing, then an adaptive unsharp mask recovers edge crispness.</div>
            <div className="how-to-step">Drag the before/after slider to compare, then download as PNG.</div>
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
                title: 'Multi-pass bilinear upsampling',
                body: 'Instead of one large jump (which blurs), we scale in 1.4× increments with <code>imageSmoothingQuality: high</code>. Intermediate steps preserve frequency content.',
              },
              {
                title: 'Adaptive unsharp mask',
                body: 'Subtract a CSS-blurred copy from the upscaled image, scale the high-frequency remainder, add back. Radius and amount differ between Photo and Illustration modes.',
              },
              {
                title: 'Contrast micro-boost (Photo)',
                body: 'A gentle global contrast adjustment (factor 1.05) restores perceived brightness that bilinear averaging tends to soften. Skipped for illustrations to protect flat fills.',
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <strong style={{ fontSize: '13px', color: 'var(--ink)', display: 'block', marginBottom: '.35rem' }}>{title}</strong>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: body }} />
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title">Features</h2>
          <ul className="tool-bullets">
            <li>2× and 4× upscaling — output resolution is exactly input × scale</li>
            <li>Photo mode: sharpening optimized for natural photography</li>
            <li>Illustration mode: crisp linework without halos</li>
            <li>Before/after drag-slider for instant comparison</li>
            <li>No model download — instant processing on any device</li>
            <li>No upload · no account · no watermark · free</li>
            <li>Export as full-resolution PNG</li>
          </ul>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title">FAQ</h2>
          <dl className="faq-list">
            {[
              {
                q: 'Is my image uploaded anywhere?',
                a: 'No. All processing happens in your browser using Canvas APIs. Your image never leaves your device — not even the upscaled result.',
              },
              {
                q: 'How is this better than just resizing in Photoshop or Preview?',
                a: 'Browser apps and standard tools use bicubic interpolation, which blurs detail when scaling up. Our multi-pass approach with adaptive unsharp masking recovers edge crispness and reduces halos, producing a noticeably sharper result without AI model downloads.',
              },
              {
                q: 'What is the difference between Photo and Illustration mode?',
                a: 'Photo mode applies a stronger contrast boost and a wider unsharp mask radius, which works well for natural photography. Illustration mode uses a tighter, softer sharpening pass that preserves clean linework and flat color areas without introducing halos.',
              },
              {
                q: 'Is there a maximum image size?',
                a: 'Processing is done in your browser, so very large images (>20 MP) may take longer or hit memory limits on low-end devices. For best results, start with images up to ~8 MP.',
              },
              {
                q: 'Can I upscale illustrations and anime images?',
                a: 'Yes — switch to Illustration mode. It uses a softer sharpening profile that preserves clean lines and avoids over-sharpening flat color regions typical of anime and vector art.',
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
            <a href="https://nanoimage.net/resize-image" className="btn btn-secondary" rel="noopener" target="_blank">Resize on nanoimage.net →</a>
            <a href="/tools" className="btn btn-secondary">All AI tools →</a>
          </div>
        </section>
      </div>
    </>
  )
}
