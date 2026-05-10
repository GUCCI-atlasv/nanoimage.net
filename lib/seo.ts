import type { Metadata } from 'next'

const BASE = 'https://nanoimage.net'
const OG_IMAGE = `${BASE}/assets/og-image.png`

/** Canonical + hreflang alternates (x-default + en only, same URL for all). */
export function buildAlternates(url: string): Metadata['alternates'] {
  return {
    canonical: url,
    languages: { 'x-default': url, en: url },
  }
}

/** Full OpenGraph object to paste into each page's metadata. */
export function buildOG(opts: {
  title: string
  description: string
  url: string
  image?: string
}): Metadata['openGraph'] {
  return {
    type: 'website',
    siteName: 'NanoImage',
    title: opts.title,
    description: opts.description,
    url: opts.url,
    images: [{ url: opts.image ?? OG_IMAGE, width: 1200, height: 630 }],
  }
}

/** Twitter Card meta. */
export function buildTwitter(opts: {
  title: string
  description: string
  image?: string
}): Metadata['twitter'] {
  return {
    card: 'summary_large_image',
    site: '@nanoimage',
    title: opts.title,
    description: opts.description,
    images: [opts.image ?? OG_IMAGE],
  }
}

export { BASE, OG_IMAGE }
