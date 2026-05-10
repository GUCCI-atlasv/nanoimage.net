import type { Metadata } from 'next'
import { I18nProvider } from '@/src/i18n'
import '@/src/index.css'
import '@/src/App.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://nanoimage.net'),
  title: {
    default: 'NanoImage - Free Online Image Tools',
    template: '%s - NanoImage',
  },
  description:
    'Free online image tools to compress, resize, crop, convert, and edit images in your browser. No signup required.',
  robots: { index: true, follow: true },
}

// Use canonical form (no trailing slash on root) to match Next.js canonical output
const SITE_URL = 'https://nanoimage.net'

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'NanoImage',
      description:
        'Free online image tools to compress, resize, crop, convert, and edit images in your browser.',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#app`,
      name: 'NanoImage',
      url: SITE_URL,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Free online image tools to compress, resize, crop, convert, and edit images in your browser. No signup required.',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="#fffdf8" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <noscript>
          <p style={{ textAlign: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
            NanoImage requires JavaScript to run. Please enable JavaScript in your browser to use
            our free image tools.
          </p>
        </noscript>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
