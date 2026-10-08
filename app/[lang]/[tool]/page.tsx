import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { tools } from '@/src/data'
import { URL_LANG_CODES } from '@/lib/i18n-utils'
import { buildAlternates, buildOG, buildTwitter, buildToolJsonLd, getToolOgImage, getToolOpenGraphType, getToolSocialMeta, URL_TO_BCP47, BASE } from '@/lib/seo'
import { getToolMeta, getToolSchemaData } from '@/lib/server-i18n'

export function generateStaticParams() {
  return URL_LANG_CODES.flatMap((lang) =>
    tools.map((t) => ({ lang, tool: t.slug })),
  )
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string; tool: string }> },
): Promise<Metadata> {
  const { lang, tool: slug } = await params
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) return { title: 'Not Found' }

  let { title, description } = getToolMeta(lang, slug)
  // Override for target pages (EN PRD titles; other langs fall back to getToolMeta)
  if (lang === 'en' || !lang) {
    if (slug === 'compress-image-to-100kb') { title = 'Compress Image to 100KB Online – Free, No Upload | NanoImage'; description = 'Compress JPG, PNG, or WebP images to under 100KB automatically. Your files are processed in your browser — no upload, no signup, free.' }
    if (slug === 'compress-image-to-200kb') { title = 'Compress Image to 200KB Online – Free & Private | NanoImage'; description = 'Compress JPG, PNG, or WebP photos to under 200KB in your browser. Ideal for visa, passport, ID, and document uploads. Free, private, no upload.' }
    if (slug === 'compress-image-to-500kb') { title = 'Compress Image to 500KB Online – Free, No Signup | NanoImage'; description = 'Reduce JPG, PNG, or WebP images to under 500KB in your browser. Perfect for email attachments, blog images, CMS uploads, and product photos.' }
    if (slug === 'compress-image-to-1mb') { title = 'Compress Image to 1MB Online – Free, In Browser | NanoImage'; description = 'Compress JPG, PNG, or WebP photos to under 1MB instantly in your browser. Great for phone photos, email, social sharing, and upload limits.' }
  }
  const basePath = `/${slug}`
  const canonicalUrl = `${BASE}/${lang}${basePath}`
  const ogImage = getToolOgImage(slug)
  // TOOL_SEO_EXTRAS.ogTitle/ogDescription are English-only copy. Applying them on
  // localized routes overwrote the translated <meta name="description"> and og:*
  // tags with English text on 151/328 non-EN tool pages (Bing SERP snippets were
  // rendering in English for zh/es/fr/pt/ru/ja/ko). Only use them on /en.
  const isEnglish = !lang || lang === 'en'
  const social = isEnglish ? getToolSocialMeta(slug) : {}
  const ogTitle = social.ogTitle ?? title
  const ogDescription = social.ogDescription ?? description
  // Localized routes must always use the translated description.
  const metaDescription = !isEnglish || slug === 'grid-maker' ? description : ogDescription

  return {
    title,
    description: metaDescription,
    // PRD Phase 1 站点瘦身:deprecated 工具 noindex(全语种),观察期后 301
    ...(tool.deprecated ? { robots: { index: false, follow: true } } : {}),
    alternates: buildAlternates(canonicalUrl, basePath),
    openGraph: buildOG({ title: ogTitle, description: ogDescription, url: canonicalUrl, image: ogImage, urlLang: lang, type: getToolOpenGraphType(slug) }),
    twitter: buildTwitter({ title: ogTitle, description: ogDescription, image: ogImage, imageAlt: title }),
  }
}

export default async function LangToolPage(
  { params }: { params: Promise<{ lang: string; tool: string }> },
) {
  const { lang, tool: slug } = await params
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) notFound()

  const { title, description } = getToolMeta(lang, slug)
  const canonicalUrl = `${BASE}/${lang}/${slug}`
  const { faqs, toolSection, appDescription, homeLabel, toolsLabel, toolsUrl, breadcrumbName, toolSeo } =
    getToolSchemaData(lang, slug)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let jsonLd: any
  if (['compress-image-to-100kb', 'compress-image-to-200kb', 'compress-image-to-500kb', 'compress-image-to-1mb'].includes(slug)) {
    const h1 = slug === 'compress-image-to-100kb' ? 'Compress Image to 100KB' : slug === 'compress-image-to-200kb' ? 'Compress Image to 200KB' : slug === 'compress-image-to-500kb' ? 'Compress Image to 500KB' : 'Compress Image to 1MB'
    jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nanoimage.net/' },
            { '@type': 'ListItem', position: 2, name: 'Compress Image', item: 'https://nanoimage.net/compress-image' },
            { '@type': 'ListItem', position: 3, name: h1, item: canonicalUrl },
          ],
        },
        {
          '@type': 'WebApplication',
          name: `${h1} - NanoImage`,
          url: canonicalUrl,
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
        faqs && faqs.length ? {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f: { q: string; a: string }) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        } : null,
      ].filter(Boolean),
    }
  } else {
    jsonLd = buildToolJsonLd({
      url: canonicalUrl,
      title,
      description,
      appDescription,
      bcp47: URL_TO_BCP47[lang] ?? 'en',
      homeLabel,
      toolsLabel,
      toolsUrl,
      breadcrumbName,
      toolSeo,
      faqs,
      toolSection,
      // Localized route: never surface the English TOOL_SEO_EXTRAS.ogTitle as the
      // schema name — use the translated title instead.
      useSeoTitleAsName: !lang || lang === 'en',
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppShell page="tool" toolSlug={slug} />
    </>
  )
}
