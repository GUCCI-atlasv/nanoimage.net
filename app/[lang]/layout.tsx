/**
 * Localised root layout — one of two root layouts in this app.
 * (The other is app/(en)/layout.tsx for English routes.)
 *
 * This is a route-group root layout; app/layout.tsx has been removed so that
 * Next.js treats this file as the actual root for all [lang]/* routes.
 * Each root layout must include its own <html> and <body> tags.
 *
 * The html `lang` attribute is derived from the URL segment at build time,
 * so every statically generated HTML file gets the correct BCP 47 language code.
 */
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { I18nProvider } from '@/src/i18n'
import { URL_TO_LANG } from '@/lib/i18n-utils'
import { buildSiteJsonLd, URL_TO_BCP47 } from '@/lib/seo'
import type { LangCode } from '@/src/i18n'
import '@/src/index.css'
import '@/src/App.css'

const SITE_URL = 'https://nanoimage.net'

/** Map internal LangCode → BCP 47 HTML lang attribute value */
const HTML_LANG: Record<string, string> = {
  'zh-CN': 'zh-Hans',
  'zh-TW': 'zh-Hant',
  ja:      'ja',
  ko:      'ko',
  fr:      'fr',
  es:      'es',
  pt:      'pt',
  ru:      'ru',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
}

/**
 * Override the English root layout's title template so localised pages don't
 * get "| NanoImage" appended twice (their titles already include the brand).
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s',
    default: 'NanoImage',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const langCode = (URL_TO_LANG[lang] ?? 'en') as LangCode
  const htmlLang = HTML_LANG[langCode] ?? langCode
  // WebSite + Organization graph (PRD 4.6.1), tagged with this route's language
  // so the brand node matches the page it is emitted on.
  const websiteJsonLd = buildSiteJsonLd(URL_TO_BCP47[lang] ?? 'en')

  return (
    <html lang={htmlLang}>
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
        <I18nProvider initialLang={langCode}>{children}</I18nProvider>
      </body>
    </html>
  )
}
