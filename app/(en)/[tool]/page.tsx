import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { tools } from '@/src/data'
import { buildAlternates, buildOG, buildTwitter, buildToolJsonLd, getToolOgImage, getToolOpenGraphType, getToolSocialMeta, stripBrandSuffix, URL_TO_BCP47, withBrandTitle, BASE } from '@/lib/seo'
import { getToolSchemaData } from '@/lib/server-i18n'

export function generateStaticParams() {
  return tools.map((t) => ({ tool: t.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ tool: string }> }
): Promise<Metadata> {
  const { tool: slug } = await params
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) return { title: 'Not Found' }

  // Special SEO for target-size landing pages (per PRD)
  let pageTitle = stripBrandSuffix(tool.title)
  const brandedTitle = withBrandTitle(tool.title)
  let description = tool.subtitle
  if (slug === 'grid-maker') {
    pageTitle = 'Free Online Grid Maker for Drawing'
    description = 'Create a free drawing grid online. Upload a reference photo or make a blank printable grid, customize rows, columns, labels, colors, and opacity, then export PNG, JPG, or PDF. No signup, no upload.'
  }
  if (slug === 'compress-image-to-100kb') { pageTitle = 'Compress Image to 100KB Online – Free, No Upload'; description = 'Compress JPG, PNG, or WebP images to under 100KB automatically. Your files are processed in your browser — no upload, no signup, free.' }
  if (slug === 'compress-image-to-200kb') { pageTitle = 'Compress Image to 200KB Online – Free & Private'; description = 'Compress JPG, PNG, or WebP photos to under 200KB in your browser. Ideal for visa, passport, ID, and document uploads. Free, private, no upload.' }
  if (slug === 'compress-image-to-500kb') { pageTitle = 'Compress Image to 500KB Online – Free, No Signup'; description = 'Reduce JPG, PNG, or WebP images to under 500KB in your browser. Perfect for email attachments, blog images, CMS uploads, and product photos.' }
  if (slug === 'compress-image-to-1mb') { pageTitle = 'Compress Image to 1MB Online – Free, In Browser'; description = 'Compress JPG, PNG, or WebP photos to under 1MB instantly in your browser. Great for phone photos, email, social sharing, and upload limits.' }
  const url = `${BASE}/${slug}`
  const ogImage = getToolOgImage(slug)
  const social = getToolSocialMeta(slug)
  const ogTitle = social.ogTitle ?? brandedTitle
  const ogDescription = social.ogDescription ?? description
  const metaDescription = slug === 'grid-maker' ? description : ogDescription

  return {
    title: pageTitle,
    description: metaDescription,
    // PRD Phase 1 站点瘦身:deprecated 工具进入下线观察期,noindex 但保持可访问。
    // 观察 2 周后启用 _redirects 中预置的 301 并删除页面。
    ...(tool.deprecated ? { robots: { index: false, follow: true } } : {}),
    alternates: buildAlternates(url),
    openGraph: buildOG({ title: ogTitle, description: ogDescription, url, image: ogImage, urlLang: 'en', type: getToolOpenGraphType(slug) }),
    twitter: buildTwitter({ title: ogTitle, description: ogDescription, image: ogImage, imageAlt: pageTitle }),
  }
}

export default async function ToolPage(
  { params }: { params: Promise<{ tool: string }> }
) {
  const { tool: slug } = await params
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) notFound()

  const url = `${BASE}/${slug}`
  const { faqs, toolSection, appDescription, homeLabel, toolsLabel, toolsUrl, breadcrumbName, toolSeo } =
    getToolSchemaData('en', slug)

  // Custom schema for the 4 target-size pages per PRD
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let jsonLd: any
  if (['compress-image-to-100kb', 'compress-image-to-200kb', 'compress-image-to-500kb', 'compress-image-to-1mb'].includes(slug)) {
    const h1 = slug === 'compress-image-to-100kb' ? 'Compress Image to 100KB' : slug === 'compress-image-to-200kb' ? 'Compress Image to 200KB' : slug === 'compress-image-to-500kb' ? 'Compress Image to 500KB' : 'Compress Image to 1MB'
    const crumbName = h1
    jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nanoimage.net/' },
            { '@type': 'ListItem', position: 2, name: 'Compress Image', item: 'https://nanoimage.net/compress-image' },
            { '@type': 'ListItem', position: 3, name: crumbName, item: url },
          ],
        },
        {
          '@type': 'WebApplication',
          name: `${h1} - NanoImage`,
          url,
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
      url,
      title: withBrandTitle(tool.title),
      description: tool.subtitle,
      appDescription,
      bcp47: URL_TO_BCP47['en'],
      homeLabel,
      toolsLabel,
      toolsUrl,
      breadcrumbName,
      toolSeo,
      faqs,
      toolSection,
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
