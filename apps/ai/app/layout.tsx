import type { Metadata, Viewport } from 'next'
import { AiHeader } from '@/components/AiHeader'
import { AiFooter } from '@/components/AiFooter'
import './globals.css'

const SITE_URL = 'https://ai.nanoimage.net'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AI NanoImage — On-device AI Image Tools. No Upload.',
    template: '%s | AI NanoImage',
  },
  description:
    'AI background removal, upscaling, object erasure, photo restoration — all running in your browser. No upload, no account, no watermark. Free forever.',
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'AI NanoImage',
  description:
    'On-device AI image tools: background removal, super-resolution, inpainting, photo restoration. Your images never leave the browser.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#fffdf8" />
        <link rel="preload" href="/assets/brand/logo/nanoimage-logo.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body>
        <div className="site-shell">
          <AiHeader />
          <main>{children}</main>
          <AiFooter />
        </div>
      </body>
    </html>
  )
}
