import type { Metadata } from 'next'

const BASE = 'https://nanoimage.net'
const OG_IMAGE = `${BASE}/assets/og-image.png`

/**
 * Canonical + full hreflang alternates for all 9 supported languages.
 *
 * @param canonicalUrl – The full URL of the CURRENT page (e.g. https://nanoimage.net/zh/compress-image)
 * @param basePath     – The root-relative path WITHOUT lang prefix (e.g. /compress-image).
 *                       If omitted, it is derived from canonicalUrl.
 */
export function buildAlternates(
  canonicalUrl: string,
  basePath?: string,
): Metadata['alternates'] {
  const rawPath = basePath ?? canonicalUrl.replace(BASE, '')
  // Root path: English canonical keeps trailing slash; lang variants omit it
  const isRoot = rawPath === '' || rawPath === '/'
  const enPath = isRoot ? '/' : rawPath   // e.g. '/'  or '/compress-image'
  const langSuffix = isRoot ? '' : rawPath // e.g. ''   or '/compress-image'

  const languages: Record<string, string> = {
    'x-default': `${BASE}${enPath}`,
    en:          `${BASE}${enPath}`,
    zh:          `${BASE}/zh${langSuffix}`,
    'zh-TW':     `${BASE}/zh-TW${langSuffix}`,
    ja:          `${BASE}/ja${langSuffix}`,
    ko:          `${BASE}/ko${langSuffix}`,
    fr:          `${BASE}/fr${langSuffix}`,
    es:          `${BASE}/es${langSuffix}`,
    pt:          `${BASE}/pt${langSuffix}`,
    ru:          `${BASE}/ru${langSuffix}`,
  }

  return { canonical: canonicalUrl, languages }
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
