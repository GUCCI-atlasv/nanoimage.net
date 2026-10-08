import type { Metadata } from 'next'
import { getFeature } from '@/lib/features'
import { BASE, pageMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { BackgroundRemoverTool } from './BackgroundRemoverTool'

const f = getFeature('background-remover')!
const url = `${BASE}/${f.slug}`

export const metadata: Metadata = pageMetadata({
  title: f.metaTitle,
  description: f.metaDescription,
  url,
})

// ── FAQ (10 questions) ────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Is AI NanoImage Background Remover free?',
    a: 'Yes. You can remove image backgrounds in your browser with no sign-up and no watermark.',
  },
  {
    q: 'Does the tool upload my photo?',
    a: 'No. The AI model runs locally in your browser. Your image is processed on your device and is never sent to AI NanoImage or any server.',
  },
  {
    q: 'What image formats are supported?',
    a: 'You can upload JPG, PNG, and WebP images up to 50 MB. The result can be downloaded as a transparent PNG.',
  },
  {
    q: 'Can I remove the background from a WebP image?',
    a: 'Yes. Upload a WebP file, remove the background locally in your browser, and download the cutout as a transparent PNG.',
  },
  {
    q: 'Can I change the background color after removing it?',
    a: 'Yes. After the background is removed you can keep the result as a transparent PNG or pick a solid replacement color before downloading.',
  },
  {
    q: 'Why does the first run take longer?',
    a: 'The first use downloads the RMBG-1.4 AI model, about 168 MB. After that, the model is cached locally for faster reuse. Your image is never uploaded during this download.',
  },
  {
    q: 'Does it work offline after the first download?',
    a: 'After the model is downloaded and cached by your browser, the tool can be reused without an internet connection, depending on your browser cache settings.',
  },
  {
    q: 'How can I verify that my image is not uploaded?',
    a: 'Open your browser DevTools, go to the Network tab, run the background remover and check the requests. You will see the one-time model download, but no image upload request.',
  },
  {
    q: 'Is it good for hair, fur, or complex edges?',
    a: 'The RMBG-1.4 model handles most portraits, product photos, and pets well. Very fine hair, transparent objects, or low-contrast edges may need manual touch-up in a design tool.',
  },
  {
    q: 'What browsers are supported?',
    a: 'The tool works in any modern browser. Chrome and Edge use WebGPU for fastest processing. Firefox and Safari use the WASM fallback — slightly slower but fully functional.',
  },
]

// ── Structured data ───────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    breadcrumbJsonLd([
      { name: 'AI NanoImage', url: BASE },
      { name: 'Background Remover', url },
    ]),
    {
      '@type': 'SoftwareApplication',
      name: 'AI NanoImage Background Remover',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web',
      url,
      description:
        'Free AI background remover that runs locally in your browser. Remove backgrounds from JPG, PNG and WebP images without uploading your photo.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        'Remove image background',
        'On-device AI processing',
        'No image upload',
        'Transparent PNG export',
        'JPG, PNG and WebP support',
        'No sign-up',
        'No watermark',
        'WebGPU acceleration with WASM fallback',
        'Offline reuse after first model download',
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to remove the background from an image',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Upload your image',
          text: 'Drop a JPG, PNG or WebP image (up to 50 MB) into the upload zone or click to browse. Your image is not uploaded — it stays in your browser.',
        },
        {
          '@type': 'HowToStep',
          name: 'AI removes the background locally',
          text: 'The RMBG-1.4 model runs in your browser using WebGPU (Chrome/Edge) or WASM (all other browsers). The first use downloads the model once and caches it locally.',
        },
        {
          '@type': 'HowToStep',
          name: 'Preview on a transparent checkerboard',
          text: 'Check the cutout result. Optionally pick a solid background color to replace the transparency.',
        },
        {
          '@type': 'HowToStep',
          name: 'Download a transparent PNG',
          text: 'Download the finished image as a full-resolution transparent PNG with no watermark and no sign-up required.',
        },
      ],
    },
    faqJsonLd(faqs),
  ],
}

// ── Use Cases data (7 scenarios) ──────────────────────────────────────────────
const useCases = [
  {
    icon: '🛒',
    title: 'Product photos for online stores',
    body: 'Create clean product cutouts for marketplaces, ads and product pages. Remove distracting backgrounds from cosmetics, fashion, furniture and accessories, then download a transparent PNG or add a solid white background. Because the AI runs locally, unreleased product photos and private catalog assets stay on your device.',
  },
  {
    icon: '👤',
    title: 'Profile pictures and headshots',
    body: 'Turn a casual portrait into a clean profile picture for resumes, LinkedIn, portfolios and team pages. Remove the room, street or travel background while keeping the person in focus. Since the image is processed in your browser, personal portraits never need to be uploaded to a remote server.',
  },
  {
    icon: '🎨',
    title: 'Stickers and design assets',
    body: 'Cut out stickers, illustrations, icons and fun graphics for social posts, presentations, thumbnails and design projects. Keep the subject edge clean and export a transparent PNG that can be placed on any background, template or canvas.',
  },
  {
    icon: '🏷️',
    title: 'Logos and graphics',
    body: 'Remove white or solid backgrounds from logos, badges and simple graphics so they are ready for websites, pitch decks, packaging mockups and social media templates. Export a transparent PNG and reuse the asset across light, dark or branded backgrounds.',
  },
  {
    icon: '✍️',
    title: 'Signatures and documents',
    body: 'Create a transparent signature PNG for forms, PDFs and online documents. Remove the paper background while keeping the signature visible, then place it on contracts, invoices or internal documents without opening a complex photo editor.',
  },
  {
    icon: '🔒',
    title: 'Private or sensitive images',
    body: 'Some images should not be uploaded to a third-party server: personal portraits, client assets, unreleased products, internal documents or confidential design drafts. AI NanoImage processes the image locally in your browser, so the original file stays on your device from upload to export.',
  },
  {
    icon: '🖼',
    title: 'WebP, JPG and PNG images',
    body: 'Upload JPG, PNG or WebP images and export the result as a transparent PNG. This makes the cutout easy to reuse in design tools, websites, marketplace listings, slides and social media templates. No format conversion needed before uploading.',
  },
]

const S = { section: { marginTop: '2.5rem' } as React.CSSProperties }

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="page-wrap">

        {/* ── Hero ── */}
        <div className="tool-hero">
          <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>{f.emoji}</div>
          <h1>{f.title}</h1>
          <p>{f.subtitle}</p>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <span className="privacy-badge">🔒 Photo stays in your browser</span>
            <span className="trust-pill">✅ Free — no sign-up, no watermark</span>
            <span className="trust-pill">🖼 Transparent PNG output</span>
          </div>
        </div>

        {/* ── Live tool ── */}
        <BackgroundRemoverTool modelNote={f.modelNote} modelSizeMb={f.modelSizeMb} />

        {/* ── Privacy module ── */}
        <section style={S.section}>
          <h2 className="section-title">Remove backgrounds without uploading your image</h2>
          <p style={{ lineHeight: 1.8, color: 'var(--muted)', fontSize: '15px' }}>
            Most online background removers process your photo on remote servers — meaning your image travels
            across the internet, lands on someone else&apos;s infrastructure, and may be retained or used for
            model training. AI NanoImage works differently: the AI model runs{' '}
            <strong>entirely inside your browser</strong>. The first time you use the tool, your browser
            downloads the RMBG-1.4 background-removal model (about 168 MB) and caches it locally.
            After that, every run is faster and still fully on-device. Your image never leaves the browser tab.
          </p>
          <p style={{ lineHeight: 1.8, color: 'var(--muted)', fontSize: '15px', marginTop: '.75rem' }}>
            This makes it suitable for product photos, client work, private portraits, legal or medical images,
            and any file you would rather not hand to a third-party server.
            Open DevTools → Network while processing — you will see <strong>zero image upload requests</strong>.
          </p>
          <div style={{ marginTop: '1.25rem', background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '12px', padding: '1rem 1.25rem', fontSize: '13px', color: '#166534', lineHeight: 1.7 }}>
            <strong>Verify it yourself:</strong> DevTools → Network → use the tool.
            You will see zero image upload requests. The only outbound traffic is the one-time model download.
          </div>
        </section>

        {/* ── How it works ── */}
        <section style={S.section}>
          <h2 className="section-title">How to remove a background from an image</h2>
          <div className="how-to-steps">
            <div className="how-to-step">
              <strong>Upload a JPG, PNG, or WebP image.</strong> Drag it into the upload zone or click to browse.
              Files up to 50 MB are supported. Your image stays in your browser — not uploaded.
            </div>
            <div className="how-to-step">
              <strong>AI removes the background locally.</strong> The RMBG-1.4 model runs on-device
              using WebGPU (Chrome/Edge) or WASM (all other browsers). First use downloads the model once and caches it.
            </div>
            <div className="how-to-step">
              <strong>Preview the cutout on a transparent checkerboard.</strong> Optionally pick a solid
              replacement background color before downloading.
            </div>
            <div className="how-to-step">
              <strong>Download your transparent PNG.</strong> Full resolution, no watermark, no sign-up required.
            </div>
          </div>
        </section>

        {/* ── Use cases (7 scenarios) ── */}
        <section style={S.section}>
          <h2 className="section-title">Popular use cases</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {useCases.map(({ icon, title, body }) => (
              <div
                key={title}
                style={{ background: 'var(--surface)', border: '1.5px solid var(--line)', borderRadius: '12px', padding: '1.25rem' }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '.5rem' }}>{icon}</div>
                <strong style={{ fontSize: '14px', color: 'var(--ink)', display: 'block', marginBottom: '.4rem' }}>{title}</strong>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WebP module ── */}
        <section style={S.section}>
          <h2 className="section-title">WebP background remover</h2>
          <p style={{ lineHeight: 1.8, color: 'var(--muted)', fontSize: '15px' }}>
            Need to remove the background from a <strong>WebP image</strong>? Drop your WebP file into the upload zone —
            the tool accepts JPG, PNG, and WebP equally. The subject is cut out in your browser and the result is
            available as a <strong>transparent PNG</strong> (or a solid background color if you prefer).
            No format conversion step needed.
          </p>
        </section>

        {/* ── Transparent PNG module ── */}
        <section style={S.section}>
          <h2 className="section-title">Download a transparent PNG</h2>
          <p style={{ lineHeight: 1.8, color: 'var(--muted)', fontSize: '15px' }}>
            After the background is removed, AI NanoImage exports a <strong>transparent PNG</strong> at full
            source resolution — no downscaling, no watermark. Transparent PNGs work in design tools (Figma,
            Canva, Photoshop), ecommerce platforms, presentation software, and websites. If you need a solid
            background instead, pick a color with the color picker before downloading.
          </p>
        </section>

        {/* ── Why choose us ── */}
        <section style={S.section}>
          <h2 className="section-title">Why choose AI NanoImage?</h2>
          <ul className="tool-bullets">
            <li><strong>No upload</strong> — your image is processed on-device and never sent to a server</li>
            <li><strong>No sign-up</strong> — no account, no email, no subscription required</li>
            <li><strong>No watermark</strong> — the full-resolution transparent PNG is yours</li>
            <li><strong>WebP supported</strong> — upload JPG, PNG, or WebP; download transparent PNG</li>
            <li><strong>WebGPU acceleration</strong> in Chrome/Edge; WASM fallback in all other browsers</li>
            <li><strong>Offline after first use</strong> — model is cached locally; no re-download needed</li>
          </ul>
        </section>

        {/* ── Tips ── */}
        <section style={S.section}>
          <h2 className="section-title">Tips for cleaner cutouts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'Use clear contrast', body: 'High contrast between subject and background gives the sharpest cut. A busy background with colors similar to the subject is harder for any model to separate.' },
              { title: 'Avoid motion blur', body: 'Sharp edges produce cleaner masks. Blurry or out-of-focus subjects may leave artefacts around the cutout boundary.' },
              { title: 'Hair and fur', body: 'The model handles most portrait and pet hair well, but very fine or flyaway strands may be imperfect. Shooting against a plain background improves results.' },
              { title: 'Large or low-res images', body: 'The tool processes images at full resolution. Very large files take longer on low-end devices. For best speed on mobile, resize to under 4 MP before uploading.' },
            ].map(({ title, body }) => (
              <div key={title}>
                <strong style={{ fontSize: '13px', color: 'var(--ink)', display: 'block', marginBottom: '.35rem' }}>💡 {title}</strong>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={S.section}>
          <h2 className="section-title">FAQ</h2>
          <dl className="faq-list">
            {faqs.map((faq, i) => (
              <details className="faq-item" key={i}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </dl>
        </section>

        {/* ── Cross-links ── */}
        <section style={{ marginTop: '3rem', borderTop: '1.5px solid var(--line)', paddingTop: '2rem' }}>
          <h2 className="section-title">Continue editing your cutout</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem' }}>
            <a href="/image-upscaler" className="btn btn-primary">🔍 Upscale your cutout →</a>
            <a href="/object-remover" className="btn btn-secondary">🪄 Remove objects before cutting →</a>
            <a href="https://nanoimage.net/change-background" className="btn btn-secondary" rel="noopener" target="_blank">
              Replace with a custom background (nanoimage.net) →
            </a>
            <a href="/tools" className="btn btn-secondary">All AI tools →</a>
          </div>
        </section>

      </div>
    </>
  )
}
