import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { tools } from '@/src/data'
import { buildAlternates, buildOG, buildTwitter, BASE } from '@/lib/seo'

export function generateStaticParams() {
  return tools.map((t) => ({ tool: t.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ tool: string }> }
): Promise<Metadata> {
  const { tool: slug } = await params
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) return { title: 'Not Found' }

  const title = tool.title
  const description = tool.subtitle
  const url = `${BASE}/${slug}`

  return {
    title,
    description,
    alternates: buildAlternates(url),
    openGraph: buildOG({ title: `${title} - NanoImage`, description, url }),
    twitter: buildTwitter({ title: `${title} - NanoImage`, description }),
  }
}

export default async function ToolPage(
  { params }: { params: Promise<{ tool: string }> }
) {
  const { tool: slug } = await params
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) notFound()

  const url = `${BASE}/${slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: `${tool.title} - NanoImage`,
        url,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: tool.subtitle,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE}/` },
          { '@type': 'ListItem', position: 3, name: tool.title, item: url },
        ],
      },
    ],
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
