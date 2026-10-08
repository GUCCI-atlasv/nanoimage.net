import type { Metadata } from 'next'

export const BASE = 'https://ai.nanoimage.net'
export const MAIN_SITE = 'https://nanoimage.net'
export const BRAND = 'AI NanoImage'

/** The core differentiator — repeated across pages for consistency. */
export const TAGLINE = 'The AI image tools that still don’t upload your photos.'

type OgInput = {
  title: string
  description: string
  url: string
  image?: string
}

export function pageMetadata({ title, description, url, image }: OgInput): Metadata {
  const ogImage = image ?? `${BASE}/og-default.png`
  return {
    // Use `absolute` so Next.js does NOT append the site-level template suffix
    // (e.g. "| AI NanoImage") — our metaTitles already include the brand name.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND,
      type: 'website',
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export function softwareAppJsonLd(opts: {
  name: string
  url: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: opts.name,
    url: opts.url,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web (WebGPU / WASM)',
    browserRequirements: 'Requires JavaScript. WebGPU recommended.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: opts.description,
    featureList: ['On-device AI inference', 'No image upload', 'No account', 'Free'],
  }
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/**
 * Metadata for pages that aren't live yet.
 * noindex prevents thin "coming soon" pages from diluting site authority.
 * Content is still crawlable (follow: true) for link equity.
 */
export function comingSoonMetadata({ title, description, url, image }: OgInput): Metadata {
  return {
    ...pageMetadata({ title, description, url, image }),
    robots: { index: false, follow: true },
  }
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}
