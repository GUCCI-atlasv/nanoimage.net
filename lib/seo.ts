import type { Metadata } from 'next'

const BASE = 'https://nanoimage.net'
const OG_IMAGE = `${BASE}/assets/og-image.png`

/** Per-tool OG images in /public/OG/{slug}.png — filename matches tool slug. */
export const TOOL_OG_SLUGS = new Set([
  'add-text',
  'add-watermark',
  'batch-compress',
  'blur-image',
  'change-background',
  'change-color',
  'compress-image',
  'convert-image',
  'convert-to-webp',
  'crop-image',
  'enhance-image',
  'flip-image',
  'gif-maker',
  'grid-maker',
  'image-collage',
  'image-to-pdf',
  'meme-generator',
  'passport-photo',
  'photo-grid',
  'pixelate-image',
  'remove-exif',
  'resize-image',
  'rotate-image',
  'upscale-image',
  'video-to-gif',
  'video-to-mp3',
])

export function buildToolOgImageUrl(slug: string): string {
  return `${BASE}/OG/${slug}.png`
}

export const SITE_BRAND = 'NanoImage'

/** Remove a trailing "… |/–/- NanoImage" suffix if already present. */
export function stripBrandSuffix(title: string): string {
  return title.replace(new RegExp(`\\s*[|–—\\-]\\s*${SITE_BRAND}\\s*$`, 'i'), '').trim()
}

/**
 * Bing truncates around 65 characters and flagged "Title too long" as High
 * severity on 2026-08-07 (126 pages over budget in the Aug build). Most of the
 * overflow came from a brand suffix appended unconditionally, so drop the
 * suffix rather than the author's headline — truncating a translated title
 * mid-phrase reads worse than simply losing the brand.
 */
export const TITLE_MAX_LENGTH = 65

/** `core + suffix` when it fits the title budget, otherwise `core` alone. */
export function fitTitle(core: string, suffix: string, max: number = TITLE_MAX_LENGTH): string {
  const trimmed = core.trim()
  const full = `${trimmed}${suffix}`
  return full.length <= max ? full : trimmed
}

/** Branded page title for OG/Twitter (matches en layout template: "%s | NanoImage"). */
export function withBrandTitle(pageTitle: string): string {
  return `${stripBrandSuffix(pageTitle)} | ${SITE_BRAND}`
}

/** URL lang prefix → hreflang key used in <link rel="alternate">. */
const URL_TO_HREFLANG: Record<string, string> = {
  zh: 'zh-Hans',
  'zh-TW': 'zh-Hant',
  ja: 'ja',
  ko: 'ko',
  fr: 'fr',
  es: 'es',
  pt: 'pt',
  ru: 'ru',
}

/**
 * Canonical + hreflang alternates.
 *
 * @param canonicalUrl – The full URL of the CURRENT page (e.g. https://nanoimage.net/zh/compress-image)
 * @param basePath     – The root-relative path WITHOUT lang prefix (e.g. /compress-image).
 *                       If omitted, it is derived from canonicalUrl.
 * @param availableLangs – Optional list of URL lang codes (excluding 'en') that
 *                       actually exist for this page. When given, hreflang only
 *                       lists those languages (used for partially translated
 *                       blog posts). When omitted, all 9 languages are listed.
 */
export function buildAlternates(
  canonicalUrl: string,
  basePath?: string,
  availableLangs?: readonly string[],
): Metadata['alternates'] {
  const rawPath = basePath ?? canonicalUrl.replace(BASE, '')
  // Normalise the root path to '' so BASE + '' = https://nanoimage.net (no trailing slash).
  // This keeps canonical and hreflang URLs consistent with trailingSlash: false.
  const isRoot = rawPath === '' || rawPath === '/'
  const enPath = isRoot ? '' : rawPath    // e.g. '' or '/compress-image'
  const langSuffix = isRoot ? '' : rawPath // e.g. '' or '/compress-image'

  const langs = availableLangs ?? Object.keys(URL_TO_HREFLANG)
  const languages: Record<string, string> = {
    'x-default': `${BASE}${enPath}`,
    en:          `${BASE}${enPath}`,
  }
  for (const urlLang of langs) {
    const key = URL_TO_HREFLANG[urlLang]
    if (key) languages[key] = `${BASE}/${urlLang}${langSuffix}`
  }

  return { canonical: canonicalUrl, languages }
}

/** Full OpenGraph object to paste into each page's metadata. */
export function buildOG(opts: {
  title: string
  description: string
  url: string
  image?: string
  urlLang?: string
  /** Open Graph type; default `website`. Use `article` only for blog posts. */
  type?: 'website' | 'article'
}): Metadata['openGraph'] {
  const locale = opts.urlLang ? (URL_TO_OG_LOCALE[opts.urlLang] ?? 'en_US') : 'en_US'
  return {
    type: opts.type ?? 'website',
    siteName: 'NanoImage',
    locale,
    title: opts.title,
    description: opts.description,
    url: opts.url,
    images: [{ url: opts.image ?? OG_IMAGE, width: 1200, height: 630, type: 'image/png' }],
  }
}

/** Twitter Card meta. */
export function buildTwitter(opts: {
  title: string
  description: string
  image?: string
  imageAlt?: string
}): Metadata['twitter'] {
  const imageUrl = opts.image ?? OG_IMAGE
  const imageAlt = opts.imageAlt ?? opts.title
  return {
    card: 'summary_large_image',
    site: '@nanoimage',
    title: opts.title,
    description: opts.description,
    images: [{ url: imageUrl, alt: imageAlt }],
  }
}

/** URL lang prefix → OG locale tag (language_TERRITORY format) */
export const URL_TO_OG_LOCALE: Record<string, string> = {
  en:      'en_US',
  zh:      'zh_CN',
  'zh-TW': 'zh_TW',
  ja:      'ja_JP',
  ko:      'ko_KR',
  fr:      'fr_FR',
  es:      'es_ES',
  pt:      'pt_BR',
  ru:      'ru_RU',
}

/** URL lang prefix → BCP 47 tag for JSON-LD inLanguage */
export const URL_TO_BCP47: Record<string, string> = {
  en:      'en',
  zh:      'zh-Hans',
  'zh-TW': 'zh-Hant',
  ja:      'ja',
  ko:      'ko',
  fr:      'fr',
  es:      'es',
  pt:      'pt',
  ru:      'ru',
}

interface ToolJsonLdOptions {
  url: string
  title: string
  description: string
  /** Richer copy for SoftwareApplication only; defaults to description. */
  appDescription?: string
  bcp47: string
  homeLabel: string
  toolsLabel?: string
  toolsUrl?: string
  /** Breadcrumb leaf label (tool name without site brand suffix). */
  breadcrumbName?: string
  toolSeo?: ToolSeoExtras
  faqs?: { q: string; a: string }[]
  toolSection?: { howToTitle: string; howTo: string[]; howToStepNames?: string[] }
  /**
   * When false, `toolSeo.ogTitle` (English-only copy) is NOT used as the schema
   * `name`. Localized routes must expose their translated name so that Bing/Google
   * render the correct language in rich results. Defaults to true (English route).
   */
  useSeoTitleAsName?: boolean
}

/** Short action label for HowToStep.name (Google rich-result requirement). */
function deriveHowToStepName(text: string, position: number): string {
  const stripped = text
    .replace(/^Click\s+["']/i, '')
    .replace(/^["']/, '')
    .split(/[.—–]/)[0]
    ?.replace(/\s+/g, ' ')
    .trim()
  if (stripped && stripped.length <= 80) return stripped
  if (stripped) return `${stripped.slice(0, 77).trim()}…`
  return `Step ${position}`
}

/**
 * Build a full JSON-LD @graph for a tool page.
 * Includes: WebPage, SoftwareApplication, BreadcrumbList,
 * and optionally FAQPage + HowTo.
 */
export function buildToolJsonLd(opts: ToolJsonLdOptions): object {
  const {
    url,
    title,
    description,
    appDescription,
    bcp47,
    homeLabel,
    toolsLabel,
    toolsUrl,
    breadcrumbName,
    toolSeo,
    faqs,
    toolSection,
    useSeoTitleAsName = true,
  } = opts
  const localizedName = title.replace(/\s*[-–—|]\s*NanoImage\s*$/i, '').trim()
  const pageName = useSeoTitleAsName ? (toolSeo?.ogTitle ?? localizedName) : localizedName
  const breadcrumbLeaf = breadcrumbName ?? pageName
  const appDesc = appDescription ?? description

  const webpage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: pageName,
    description,
    inLanguage: bcp47,
    isPartOf: { '@id': `${BASE}/#website` },
  }
  if (toolSeo) {
    webpage.datePublished = toolSeo.datePublished
    webpage.dateModified = toolSeo.dateModified
  }

  const softwareApp: Record<string, unknown> = {
    '@type': 'SoftwareApplication',
    '@id': `${url}#app`,
    name: pageName,
    url,
    applicationCategory: 'GraphicsApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: appDesc,
    inLanguage: bcp47,
    isPartOf: { '@id': `${BASE}/#website` },
  }
  if (toolSeo) {
    softwareApp.featureList = toolSeo.featureList
    softwareApp.screenshot = toolSeo.screenshot
  }

  const breadcrumbItems: object[] = [
    { '@type': 'ListItem', position: 1, name: homeLabel, item: BASE },
  ]
  if (toolsLabel && toolsUrl) {
    breadcrumbItems.push({ '@type': 'ListItem', position: 2, name: toolsLabel, item: toolsUrl })
    breadcrumbItems.push({ '@type': 'ListItem', position: 3, name: breadcrumbLeaf, item: url })
  } else {
    breadcrumbItems.push({ '@type': 'ListItem', position: 2, name: title, item: url })
  }

  const graph: object[] = [
    webpage,
    softwareApp,
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumbItems,
    },
  ]

  if (faqs && faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      inLanguage: bcp47,
      mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    })
  }

  if (toolSection && toolSection.howTo.length > 0) {
    const stepImages = toolSeo?.howToStepImages
    const fallbackStepImage = toolSeo?.screenshot
    const howTo: Record<string, unknown> = {
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: toolSection.howToTitle,
      inLanguage: bcp47,
      step: toolSection.howTo.map((text, i) => {
        const step: Record<string, unknown> = {
          '@type': 'HowToStep',
          position: i + 1,
          name:
            toolSection.howToStepNames?.[i] ??
            toolSeo?.howToStepNames?.[i] ??
            deriveHowToStepName(text, i + 1),
          text,
        }
        const image = stepImages?.[i] ?? fallbackStepImage
        if (image) step.image = image
        return step
      }),
    }
    if (toolSeo?.howToTotalTime) howTo.totalTime = toolSeo.howToTotalTime
    graph.push(howTo)
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

/** Per-tool SEO extras (OG image, schema fields). Extend as more tools get dedicated assets. */
export type ToolSeoExtras = {
  ogImage: string
  screenshot: string
  featureList: string[]
  datePublished: string
  dateModified: string
  howToTotalTime: string
  /** Optional social titles distinct from the HTML <title> */
  ogTitle?: string
  ogDescription?: string
  /** Per-step HowTo images (falls back to screenshot when omitted). */
  howToStepImages?: string[]
  /** Per-step HowToStep.name (English fallback when i18n step names omitted). */
  howToStepNames?: string[]
}

/** BlogPosting JSON-LD for blog article pages (SEO audit P1-5). */
export function buildBlogPostingJsonLd(opts: {
  url: string
  title: string
  description: string
  datePublished: string
  dateModified?: string
  image?: string
  bcp47: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${opts.url}#article`,
    mainEntityOfPage: opts.url,
    headline: opts.title,
    description: opts.description,
    image: opts.image ?? OG_IMAGE,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: opts.bcp47,
    author: { '@type': 'Organization', name: 'NanoImage', url: BASE },
    publisher: {
      '@type': 'Organization',
      name: 'NanoImage',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/icons/icon-512.png` },
    },
  }
}

/**
 * Site-level `WebSite` + `Organization` graph, emitted once per layout.
 *
 * Tool, blog, and category schemas all reference `${BASE}/#website` via
 * `isPartOf`. Before this existed as a full node with a publisher, that
 * reference resolved to a bare WebSite with no organization behind it, so the
 * brand had nothing for Google/Bing to attach to (see PRD 4.6.1 — the homepage
 * draws only 122 Bing impressions and brand queries total 401).
 *
 * Deliberately omits `potentialAction` / SearchAction: the only search UI is a
 * client-side filter on the blog list, with no URL-addressable results endpoint.
 * Declaring a Sitelinks Searchbox against a non-existent endpoint is invalid
 * markup. Add it here if a real `/search?q=` route ever ships.
 */

/** Homepage provenance dates for GEO / E-E-A-T (machine-readable freshness). */
export const HOME_DATE_PUBLISHED = '2025-06-01'
export const HOME_DATE_MODIFIED = '2026-08-22'

/**
 * Homepage WebPage + SoftwareApplication graph with author/publisher dates.
 * Provenance fields are a primary GEO trust signal for AI citation engines.
 */
export function buildHomePageJsonLd(opts: {
  title: string
  description: string
  url: string
  inLanguage: string
}): object {
  const author = { '@id': `${BASE}/#organization` }
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${opts.url}#webpage`,
        url: opts.url,
        name: opts.title,
        description: opts.description,
        inLanguage: opts.inLanguage,
        isPartOf: { '@id': `${BASE}/#website` },
        author,
        publisher: author,
        datePublished: HOME_DATE_PUBLISHED,
        dateModified: HOME_DATE_MODIFIED,
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${opts.url}#app`,
        name: 'NanoImage',
        url: opts.url,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: opts.description,
        inLanguage: opts.inLanguage,
        author,
        datePublished: HOME_DATE_PUBLISHED,
        dateModified: HOME_DATE_MODIFIED,
      },
    ],
  }
}

export function buildSiteJsonLd(inLanguage: string = 'en'): object {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${BASE}/#website`,
        url: BASE,
        name: SITE_BRAND,
        description:
          'Free online image tools to compress, resize, crop, convert, and edit images in your browser.',
        inLanguage,
        publisher: { '@id': `${BASE}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${BASE}/#organization`,
        name: SITE_BRAND,
        url: BASE,
        logo: {
          '@type': 'ImageObject',
          '@id': `${BASE}/#logo`,
          url: `${BASE}/icons/icon-512.png`,
          width: 512,
          height: 512,
          caption: SITE_BRAND,
        },
        image: { '@id': `${BASE}/#logo` },
        description:
          'NanoImage builds free, privacy-first image tools that run entirely in the browser — no upload, no account, including on-device AI.',
        sameAs: ['https://x.com/nanoimage'],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'support@nanoimage.net',
          url: `${BASE}/#contact`,
        },
      },
    ],
  }
}

/** Tool pages use Open Graph `website` (not `article`, which is for blog/news). */
export function getToolOpenGraphType(_slug: string): 'website' | 'article' {
  return 'website'
}

export const TOOL_SEO_EXTRAS: Partial<Record<string, ToolSeoExtras>> = {
  'passport-photo': {
    ogImage: `${BASE}/OG/passport-photo.png`,
    screenshot: `${BASE}/OG/passport-photo.png`,
    ogTitle: 'Free Passport Photo Maker Online | No Uploads - NanoImage',
    ogDescription:
      'Create passport, visa, and ID photos online for free with exact size, background, DPI, and file size settings. No uploads, no signup, no watermark.',
    featureList: [
      'Passport, visa, and ID photo presets',
      'Face alignment crop guides',
      'Plain background color replacement',
      'DPI and pixel-perfect output sizes',
      'Optional 50KB, 100KB, or custom file size limit',
      'JPG and PNG export',
      '4x6 inch print sheet',
      'Private browser-based processing',
    ],
    datePublished: '2026-06-07',
    dateModified: '2026-06-08',
    howToTotalTime: 'PT2M',
    howToStepNames: [
      'Choose a photo preset',
      'Upload your portrait',
      'Crop and adjust the photo',
      'Download your passport photo',
    ],
  },
  'add-watermark': {
    ogImage: `${BASE}/OG/add-watermark.png`,
    screenshot: `${BASE}/OG/add-watermark.png`,
    featureList: [
      'Text watermark',
      'Logo / image watermark',
      'Drag-to-position on canvas',
      'Opacity control',
      'Shadow and outline effects',
      'Layer management',
      'JPG, PNG, WebP, GIF support',
      '100% browser-based processing',
    ],
    datePublished: '2025-08-01',
    dateModified: '2026-05-16',
    howToTotalTime: 'PT1M',
  },
  'crop-image': {
    ogImage: `${BASE}/OG/crop-image.png`,
    screenshot: `${BASE}/OG/crop-image.png`,
    featureList: [
      'Crop by exact pixels (X, Y, width, height)',
      'Aspect ratio presets: 1:1, 4:3, 16:9, 9:16',
      'Multiple crop areas with ZIP export',
      'Drag handles with Shift to lock ratio',
      'PNG, JPG, WebP output',
      'Optional EXIF metadata retention',
      '100% browser-based, no upload',
    ],
    datePublished: '2025-06-01',
    dateModified: '2026-05-16',
    howToTotalTime: 'PT2M',
  },
  'image-to-pdf': {
    ogImage: `${BASE}/OG/image-to-pdf.png`,
    screenshot: `${BASE}/OG/image-to-pdf.png`,
    featureList: [
      'Merge up to 20 images into one PDF',
      'A4 and Letter page sizes',
      'Portrait and landscape orientation',
      'Adjustable margins and image fit',
      'JPG, PNG, WebP, GIF input',
      '100% browser-based — no upload',
    ],
    datePublished: '2025-07-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT2M',
  },
  'resize-image': {
    ogImage: `${BASE}/OG/resize-image.png`,
    screenshot: `${BASE}/OG/resize-image.png`,
    featureList: [
      'Resize by exact pixels or percentage',
      'One-click presets: 512×512, HD, Full HD',
      'Keep aspect ratio toggle',
      'JPG, PNG, WebP, GIF output',
      'Quality slider for smaller file sizes',
      '100% browser-based — files never uploaded',
    ],
    datePublished: '2025-06-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT1M',
  },
  'rotate-image': {
    ogImage: `${BASE}/OG/rotate-image.png`,
    screenshot: `${BASE}/OG/rotate-image.png`,
    howToStepImages: [
      `${BASE}/assets/tools/rotate-image/howto-step-1.svg`,
      `${BASE}/assets/tools/rotate-image/howto-step-2.svg`,
      `${BASE}/assets/tools/rotate-image/howto-step-3.svg`,
      `${BASE}/assets/tools/rotate-image/howto-step-4.svg`,
    ],
    ogTitle: 'Rotate Image Online Free – Image Rotator for Any Angle',
    ogDescription:
      'Rotate an image 90°, 180° or any angle, straighten crooked photos, and download. Free online image rotator with no signup, no watermark and no upload.',
    featureList: [
      'Rotate 90°, 180°, or any custom angle',
      'Flip horizontal and vertical',
      'Expand canvas or crop to original size',
      'Background color for empty corners',
      'JPG, PNG, WebP, GIF support',
      '100% browser-based — no upload',
    ],
    datePublished: '2025-06-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT1M',
  },
  'flip-image': {
    ogImage: `${BASE}/OG/flip-image.png`,
    screenshot: `${BASE}/OG/flip-image.png`,
    howToStepImages: [
      `${BASE}/assets/tools/flip-image/howto-step-1.svg`,
      `${BASE}/assets/tools/flip-image/howto-step-2.svg`,
      `${BASE}/assets/tools/flip-image/howto-step-3.svg`,
      `${BASE}/assets/tools/flip-image/howto-step-4.svg`,
    ],
    ogTitle: 'Flip Image Online Free – Mirror Image Horizontally or Vertically',
    ogDescription:
      'Flip an image or make a mirror image online. Flip horizontally, vertically or both, then download. Free, no signup, no watermark, and it all runs in your browser.',
    featureList: [
      'Mirror horizontally, vertically, or both',
      'Preview before and after flipping',
      'Fix mirror selfies and reversed photos',
      'Optional EXIF metadata retention',
      'No watermark on download',
      'JPG, PNG, WebP, GIF support',
      '100% browser-based — no upload',
    ],
    datePublished: '2025-06-01',
    dateModified: '2026-06-19',
    howToTotalTime: 'PT1M',
    howToStepNames: [
      'Upload your image',
      'Choose a flip direction',
      'Preview the mirrored result',
      'Download the flipped image',
    ],
  },
  'add-text': {
    ogImage: `${BASE}/OG/add-text.png`,
    screenshot: `${BASE}/OG/add-text.png`,
    howToStepImages: [
      `${BASE}/assets/tools/add-text/howto-step-1.svg`,
      `${BASE}/assets/tools/add-text/howto-step-2.svg`,
      `${BASE}/assets/tools/add-text/howto-step-3.svg`,
      `${BASE}/assets/tools/add-text/howto-step-4.svg`,
    ],
    ogTitle: 'Add Text to Image Online — Free Photo Text Editor',
    ogDescription:
      'Add text to photos and images online for free. Custom fonts, colors, and effects. No signup, no upload. JPG, PNG, WebP & GIF.',
    featureList: [
      'Add text overlays with drag-and-drop',
      'Multiple text layers',
      'Fonts, colors, shadow, and outline',
      'JPG, PNG, WebP, GIF support',
      '100% browser-based — no upload',
    ],
    datePublished: '2025-06-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT2M',
  },
  'change-background': {
    ogImage: `${BASE}/OG/change-background.png`,
    screenshot: `${BASE}/OG/change-background.png`,
    howToStepImages: [
      `${BASE}/assets/tools/change-background/howto-step-1.svg`,
      `${BASE}/assets/tools/change-background/howto-step-2.svg`,
      `${BASE}/assets/tools/change-background/howto-step-3.svg`,
      `${BASE}/assets/tools/change-background/howto-step-4.svg`,
    ],
    ogTitle: 'Change Image Background Color Online — Free',
    ogDescription:
      'Change photo background to white, color, gradient, or custom image. Free, private, no signup. JPG, PNG, WebP & GIF.',
    featureList: [
      'Change background to white, black, or any color',
      'Transparent, gradient, and image backgrounds',
      'Selection-based color replacement',
      'JPG, PNG, WebP, GIF support',
      '100% browser-based — no upload',
    ],
    datePublished: '2025-06-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT2M',
  },
  'enhance-image': {
    ogImage: `${BASE}/OG/enhance-image.png`,
    screenshot: `${BASE}/OG/enhance-image.png`,
    howToStepImages: [
      `${BASE}/assets/tools/enhance-image/howto-step-1.svg`,
      `${BASE}/assets/tools/enhance-image/howto-step-2.svg`,
      `${BASE}/assets/tools/enhance-image/howto-step-3.svg`,
      `${BASE}/assets/tools/enhance-image/howto-step-4.svg`,
    ],
    ogTitle: 'Free AI Image Enhancer Online',
    ogDescription:
      'Enhance images free online — brightness, contrast, saturation, sharpness & presets. No signup, private browser processing.',
    featureList: [
      'Brightness adjustment',
      'Contrast control',
      'Saturation & Vibrance',
      'Sharpness & Clarity',
      'Filter presets',
      'Before/After comparison',
      'No sign up required',
      'Privacy-first processing',
    ],
    datePublished: '2025-06-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT2M',
  },
  'change-color': {
    ogImage: `${BASE}/OG/change-color.png`,
    screenshot: `${BASE}/OG/change-color.png`,
    howToStepImages: [
      `${BASE}/assets/tools/change-color/howto-step-1.svg`,
      `${BASE}/assets/tools/change-color/howto-step-2.svg`,
      `${BASE}/assets/tools/change-color/howto-step-3.svg`,
      `${BASE}/assets/tools/change-color/howto-step-4.svg`,
    ],
    ogTitle: 'Image Color Changer – Change the Color of an Image Free',
    ogDescription:
      'Free image color changer that runs in your browser. Brush over a shirt, logo or background, pick any color or hex code, and download. No signup, no upload.',
    featureList: [
      'Change color in any image area',
      'Brush, eraser, and Select All',
      'Tolerance and color picker',
      'Popular color palette',
      'Before/after preview',
      'No sign up required',
      '100% browser-based',
    ],
    datePublished: '2025-06-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT2M',
  },
  'convert-image': {
    ogImage: `${BASE}/OG/convert-image.png`,
    screenshot: `${BASE}/OG/convert-image.png`,
    howToStepImages: [
      `${BASE}/assets/tools/convert-image/howto-step-1.svg`,
      `${BASE}/assets/tools/convert-image/howto-step-2.svg`,
      `${BASE}/assets/tools/convert-image/howto-step-3.svg`,
      `${BASE}/assets/tools/convert-image/howto-step-4.svg`,
    ],
    ogTitle: 'Convert Image Online Free – JPG, PNG, WebP, BMP & More',
    ogDescription:
      'Convert JPG to PNG, PNG to WebP, BMP to JPG, and 20+ formats — free, instant, no signup. Try it now — 100% private, works in your browser.',
    featureList: [
      'JPG, PNG, WebP output',
      'Batch convert up to 20 images',
      'Quality and EXIF options',
      'JPG ↔ PNG ↔ WebP conversions',
      'BMP and TIFF where supported',
      'No sign up required',
      '100% browser-based',
    ],
    datePublished: '2025-06-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT2M',
  },
  'convert-to-webp': {
    ogImage: `${BASE}/OG/convert-to-webp.png`,
    screenshot: `${BASE}/OG/convert-to-webp.png`,
    howToStepImages: [
      `${BASE}/assets/tools/convert-image/howto-step-1.svg`,
      `${BASE}/assets/tools/convert-image/howto-step-2.svg`,
      `${BASE}/assets/tools/convert-image/howto-step-3.svg`,
      `${BASE}/assets/tools/convert-image/howto-step-4.svg`,
    ],
    ogTitle: 'Convert JPG, PNG & JPEG to WebP Online Free',
    ogDescription:
      'Free online JPG to WebP converter. Also supports PNG, JPEG, GIF, SVG and AVIF. No signup — convert to WebP instantly in your browser.',
    featureList: [
      'JPG, PNG, JPEG to WebP',
      'GIF, SVG, AVIF where supported',
      'Batch convert up to 20 images',
      'Quality and resize options',
      'Remove EXIF metadata',
      'No sign up required',
      '100% browser-based',
    ],
    datePublished: '2025-06-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT2M',
  },
  'png-to-webp': {
    // Static tool synced from production (2026-10); reuses an existing OG card.
    ogImage: `${BASE}/OG/convert-to-webp.png`,
    screenshot: `${BASE}/OG/convert-to-webp.png`,
    featureList: [
      'PNG to WebP in your browser',
      'Keeps transparency (alpha)',
      'Batch convert up to 20 PNGs',
      'Quality slider and ZIP download',
      'No upload, no signup',
    ],
    datePublished: '2026-10-01',
    dateModified: '2026-10-08',
    howToTotalTime: 'PT1M',
  },
  'jpg-to-webp': {
    // Static tool synced from production (2026-10); reuses an existing OG card.
    ogImage: `${BASE}/OG/convert-to-webp.png`,
    screenshot: `${BASE}/OG/convert-to-webp.png`,
    featureList: [
      'JPG/JPEG to WebP in your browser',
      'Batch convert up to 20 JPGs',
      'Quality slider and ZIP download',
      'EXIF metadata stripped',
      'No upload, no signup',
    ],
    datePublished: '2026-10-01',
    dateModified: '2026-10-08',
    howToTotalTime: 'PT1M',
  },
  'jpg-to-bmp': {
    // Static tool synced from production (2026-10); reuses an existing OG card.
    ogImage: `${BASE}/OG/convert-to-webp.png`,
    screenshot: `${BASE}/OG/convert-to-webp.png`,
    featureList: [
      'JPG/JPEG to uncompressed 24-bit BMP',
      'Batch convert up to 20 files',
      'ZIP download',
      'EXIF metadata stripped',
      'No upload, no signup',
    ],
    datePublished: '2026-10-01',
    dateModified: '2026-10-08',
    howToTotalTime: 'PT1M',
  },
  'gif-compressor': {
    // Static tool synced from production (2026-10); reuses an existing OG card.
    ogImage: `${BASE}/OG/gif-maker.png`,
    screenshot: `${BASE}/OG/gif-maker.png`,
    featureList: [
      'Compress GIF to 10MB, 5MB, 512KB or 256KB',
      'Discord (~8MB) preset',
      'Scale, frame skip and palette controls',
      'Before/after size preview',
      'No upload, no signup',
    ],
    datePublished: '2026-09-15',
    dateModified: '2026-10-08',
    howToTotalTime: 'PT1M',
  },
  'remove-exif': {
    ogImage: `${BASE}/OG/remove-exif.png`,
    screenshot: `${BASE}/OG/remove-exif.png`,
    ogTitle: 'EXIF Remover – Remove EXIF Data from Photos Online Free',
    ogDescription:
      'Free online EXIF remover. Strip GPS, camera info, and date from photos in your browser — no upload, no signup. JPG, PNG, WebP supported.',
    featureList: [
      'Remove GPS location from photos',
      'Strip camera & lens metadata',
      'Online EXIF data removal',
      'Browser-based processing, no file upload',
      'JPG, PNG, WebP output',
      'No sign up required',
    ],
    datePublished: '2025-06-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT1M',
  },
  'blur-image': {
    ogImage: `${BASE}/OG/blur-image.png`,
    screenshot: `${BASE}/OG/blur-image.png`,
    ogTitle: 'Blur Image Online Free – Blur Faces, Backgrounds & Text',
    ogDescription:
      'Blur part of a photo in your browser. Brush over a face, license plate, name or background, choose the blur type and strength, and download. Free, no signup, nothing uploaded.',
    featureList: [
      'Blur faces',
      'Blur license plates',
      'Blur edges',
      'Partial image blur',
      'Gaussian blur',
      'Background blur',
    ],
    howToStepNames: [
      'Upload your image',
      'Paint the area to blur',
      'Download your blurred image',
    ],
    datePublished: '2025-06-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT2M',
  },
  'pixelate-image': {
    ogImage: `${BASE}/OG/pixelate-image.png`,
    screenshot: `${BASE}/OG/pixelate-image.png`,
    ogTitle: 'Pixelate Image Online Free – Pixelate Faces, Text & Plates',
    ogDescription:
      'Pixelate part of an image in your browser. Brush over a face, name or license plate, choose the pixel size and download. Free, no signup, and your photo never leaves your device.',
    featureList: [
      'Pixelate part of an image with brush',
      'Adjustable pixel block size',
      'Light to Extreme presets',
      'Hide faces and license plates',
      'Browser-based, no file upload',
      'No sign up required',
    ],
    howToStepNames: [
      'Upload your image',
      'Select the area to pixelate',
      'Download your pixelated image',
    ],
    datePublished: '2025-06-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT2M',
  },
  'upscale-image': {
    ogImage: `${BASE}/OG/upscale-image.png`,
    screenshot: `${BASE}/OG/upscale-image.png`,
    ogTitle: 'Free Image Upscaler – Enlarge Images Online',
    ogDescription:
      'Upscale images online for free in your browser. Enlarge photos 2x, 3x, 4x with sharpening — no signup, private processing.',
    featureList: [
      'Upscale 2x, 3x, or 4x',
      'Custom scale up to 6x',
      'Smooth and Sharp resampling',
      'Adjustable sharpen slider',
      'PNG, JPG, WebP output',
      'No sign up required',
    ],
    howToStepNames: [
      'Upload your image',
      'Choose scale and resampling',
      'Download your upscaled image',
    ],
    datePublished: '2025-08-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT2M',
  },
  'gif-maker': {
    ogImage: `${BASE}/OG/gif-maker.png`,
    screenshot: `${BASE}/OG/gif-maker.png`,
    ogTitle: 'Free GIF Maker — Create Animated GIFs Online',
    ogDescription:
      'Make a GIF free in your browser: drop images, set speed and size, download with no watermark. Local processing — no upload, no signup.',
    featureList: [
      'Create GIF from multiple images',
      'Adjust frame duration and speed',
      'Canvas size presets (16:9, 1:1, 9:16)',
      'Loop and color optimization',
      'Up to 50 frames',
      'No sign up required',
    ],
    howToStepNames: [
      'Upload your images',
      'Adjust GIF settings',
      'Create and download your GIF',
    ],
    datePublished: '2025-07-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT3M',
  },
  'image-collage': {
    ogImage: `${BASE}/OG/image-collage.png`,
    screenshot: `${BASE}/OG/image-collage.png`,
    ogTitle: 'Free Image Collage Maker — Add Frames, Text & Stickers Online',
    ogDescription:
      'Create stunning image collages online — add frames, text, stickers, and backgrounds. Free collage maker, no signup required. Works in your browser, photos stay private.',
    featureList: [
      'Add collage frames, text, stickers, and backgrounds',
      'Templates: Classic, Polaroid, Film Strip, and more',
      'Instagram, Portrait, and Landscape canvas sizes',
      'Freeform drag-and-drop layout',
      'No signup required',
      'Private browser processing',
    ],
    howToStepNames: [
      'Upload your photos',
      'Choose a template',
      'Customize your collage',
      'Adjust canvas size',
      'Download your collage',
    ],
    datePublished: '2025-07-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT5M',
  },
  'photo-grid': {
    ogImage: `${BASE}/OG/photo-grid.png`,
    screenshot: `${BASE}/OG/photo-grid.png`,
    ogTitle: 'Free Photo Grid Maker Online – Create Grid Collages Instantly',
    ogDescription:
      'Create a free photo grid online in seconds. Arrange multiple photos into 2×2, 3×3, 4×4 and more grid layouts. No signup required — works in your browser.',
    featureList: [
      'Photo grid layouts from 2×2 to 4×4',
      'Adjust spacing, border, and corner radius',
      'Aspect ratios: 1:1, 4:5, 16:9, 9:16',
      'Drag to reposition photos in cells',
      'Up to 20 images',
      'No signup required',
    ],
    howToStepNames: [
      'Upload your photos',
      'Select a grid layout',
      'Customize spacing and borders',
      'Reposition photos in the grid',
      'Download your photo grid',
    ],
    datePublished: '2025-07-01',
    dateModified: '2026-05-21',
    howToTotalTime: 'PT5M',
  },
  'grid-maker': {
    ogImage: `${BASE}/OG/grid-maker.png`,
    screenshot: `${BASE}/OG/grid-maker.png`,
    ogTitle: 'Free Online Grid Maker for Drawing',
    ogDescription:
      'Add customizable grids to reference photos or create blank printable grids for drawing, sketching, portraits, murals, and classroom worksheets. Free, private, and browser-based.',
    featureList: [
      'Add a grid to a photo',
      'Create blank printable grids',
      'Square, rectangular, triangular, and isometric grids',
      'Custom rows and columns',
      'Grid labels',
      'PNG, JPG, and PDF export',
      'Browser-based image processing',
    ],
    howToStepNames: [
      'Upload a reference image',
      'Choose a grid type',
      'Customize the grid',
      'Export the grid',
    ],
    datePublished: '2026-06-22',
    dateModified: '2026-06-22',
    howToTotalTime: 'PT2M',
  },
}

export function buildCategoryHubJsonLd(opts: {
  url: string
  name: string
  description: string
  tools: { name: string; url: string }[]
  faqs: { q: string; a: string }[]
  homeLabel?: string
  toolsLabel?: string
}): object {
  const homeLabel = opts.homeLabel ?? 'Home'
  const toolsLabel = opts.toolsLabel ?? 'Tools'
  const graph: object[] = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeLabel, item: BASE },
        { '@type': 'ListItem', position: 2, name: toolsLabel, item: `${BASE}/#tools` },
        { '@type': 'ListItem', position: 3, name: opts.name, item: opts.url },
      ],
    },
    {
      '@type': 'CollectionPage',
      '@id': `${opts.url}#collection`,
      name: opts.name,
      description: opts.description,
      url: opts.url,
      isPartOf: { '@type': 'WebSite', name: 'NanoImage', url: BASE },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: opts.tools.map((tool, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: tool.name,
          url: tool.url,
        })),
      },
    },
  ]
  if (opts.faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: opts.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export function getToolOgImage(slug: string): string {
  if (TOOL_OG_SLUGS.has(slug)) return buildToolOgImageUrl(slug)
  return TOOL_SEO_EXTRAS[slug]?.ogImage ?? OG_IMAGE
}

/** Social-only title/description overrides for tools without a TOOL_SEO_EXTRAS entry. */
const TOOL_SOCIAL_OVERRIDES: Record<string, { ogTitle?: string; ogDescription?: string }> = {
  'batch-compress': { ogTitle: 'Bulk Image Compressor – Batch Compress Free' },
}

export function getToolSocialMeta(slug: string): { ogTitle?: string; ogDescription?: string } {
  const extras = TOOL_SEO_EXTRAS[slug]
  const override = TOOL_SOCIAL_OVERRIDES[slug]
  if (!extras && !override) return {}
  return {
    ogTitle: override?.ogTitle ?? extras?.ogTitle,
    ogDescription: override?.ogDescription ?? extras?.ogDescription,
  }
}

/** Homepage tools section anchor (legacy / fallback). */
export function buildToolsIndexUrl(urlLang: string): string {
  const prefix = urlLang === 'en' ? '' : `/${urlLang}`
  return `${BASE}${prefix}#tools`
}

/** Category tools listing page (e.g. /tools/edit-images). */
export function buildToolsCategoryUrl(urlLang: string, categoryId: string): string {
  const prefix = urlLang === 'en' ? '' : `/${urlLang}`
  return `${BASE}${prefix}/tools/${categoryId}`
}

export { BASE, OG_IMAGE }
