/**
 * English root layout — one of two root layouts in this app.
 * (The other is app/[lang]/layout.tsx for localised routes.)
 *
 * Because this is a route-group root layout, app/layout.tsx has been removed
 * so that Next.js treats this file as the actual root for all (en)/* routes.
 * Each root layout must include its own <html> and <body> tags.
 */
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { I18nProvider } from '@/src/i18n'
import { buildSiteJsonLd } from '@/lib/seo'
import '@/src/index.css'
import '@/src/App.css'

const SITE_URL = 'https://nanoimage.net'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'NanoImage — Free Online Image Tools. No Upload. No Account.',
    template: '%s | NanoImage',
  },
  description:
    'Compress, resize, crop, convert, and edit images 100% in your browser. No account, no upload, no limits. Free forever.',
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

// WebSite + Organization graph (PRD 4.6.1). Shared with app/[lang]/layout.tsx so
// both roots emit an identical brand node for the `#website` / `#organization`
// references used by tool, blog, and category schemas.
const websiteJsonLd = buildSiteJsonLd('en')

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#fffdf8" />
        <link
          rel="preload"
          href="/assets/brand/logo/nanoimage-logo.svg"
          as="image"
          type="image/svg+xml"
          fetchPriority="high"
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="alternate" type="text/plain" title="LLMs" href="/llms.txt" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="alternate" type="application/rss+xml" title="NanoImage Blog" href="/rss.xml" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})})}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <Script
          src="https://ccc-monitor.583079497.workers.dev/beacon.js"
          data-site="nanoimage.net"
          strategy="afterInteractive"
        />
        <noscript>
          <p style={{ textAlign: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
            NanoImage requires JavaScript to run. Please enable JavaScript in your browser to use
            our free image tools.
          </p>
        </noscript>
        <I18nProvider initialLang="en">{children}</I18nProvider>
      </body>
    </html>
  )
}
