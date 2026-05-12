import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { categories, tools } from '@/src/data'
import { buildAlternates, buildOG, buildTwitter, BASE } from '@/lib/seo'
import AppShell from '@/components/AppShell'

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category: slug } = await params
  const cat = categories.find((c) => c.id === slug)
  if (!cat) return { title: 'Not Found' }

  const title = `${cat.title} - Free Online Tools`
  const description = cat.description
  const url = `${BASE}/tools/${slug}`

  return {
    title,
    description,
    alternates: buildAlternates(url),
    openGraph: buildOG({ title: `${title} - NanoImage`, description, url }),
    twitter: buildTwitter({ title: `${title} - NanoImage`, description }),
  }
}

export default async function CategoryPage(
  { params }: { params: Promise<{ category: string }> }
) {
  const { category: slug } = await params
  const cat = categories.find((c) => c.id === slug)
  if (!cat) notFound()

  const catTools = tools.filter((t) => t.category === slug)
  const url = `${BASE}/tools/${slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: cat.title,
    description: cat.description,
    url,
    hasPart: catTools.map((t) => ({
      '@type': 'SoftwareApplication',
      name: t.title,
      url: `${BASE}/${t.slug}`,
      applicationCategory: 'MultimediaApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppShell page="category" categoryId={slug} />
    </>
  )
}
