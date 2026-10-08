import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { categories, tools } from '@/src/data'
import { getCategoryHub, TOOL_MENU_EXCLUDED_SLUGS } from '@/lib/category-hub'
import { buildAlternates, buildCategoryHubJsonLd, buildOG, buildTwitter, withBrandTitle, BASE } from '@/lib/seo'
import AppShell from '@/components/AppShell'

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category: slug } = await params
  const hub = getCategoryHub('en', slug)
  const cat = categories.find((c) => c.id === slug)
  if (!cat || !hub) return { title: 'Not Found' }

  const pageTitle = hub.seo.title
  const brandedTitle = withBrandTitle(pageTitle)
  const description = hub.seo.description
  const url = `${BASE}/tools/${slug}`

  return {
    title: pageTitle,
    description,
    alternates: buildAlternates(url),
    openGraph: buildOG({ title: brandedTitle, description, url, urlLang: 'en' }),
    twitter: buildTwitter({ title: brandedTitle, description }),
  }
}

export default async function CategoryPageRoute(
  { params }: { params: Promise<{ category: string }> }
) {
  const { category: slug } = await params
  const hub = getCategoryHub('en', slug)
  const cat = categories.find((c) => c.id === slug)
  if (!cat || !hub) notFound()

  const catTools = tools.filter(
    (t) => t.category === slug && !TOOL_MENU_EXCLUDED_SLUGS.has(t.slug) && !t.deprecated,
  )
  const url = `${BASE}/tools/${slug}`

  const jsonLd = buildCategoryHubJsonLd({
    url,
    name: hub.seo.h1,
    description: hub.seo.description,
    tools: catTools.map((t) => ({
      name: t.name,
      url: `${BASE}/${t.slug}`,
    })),
    faqs: hub.faqs,
  })

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
