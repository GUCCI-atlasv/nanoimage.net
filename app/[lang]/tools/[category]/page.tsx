import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { categories, tools } from '@/src/data'
import { URL_LANG_CODES, URL_TO_LANG } from '@/lib/i18n-utils'
import { getCategoryHub, TOOL_MENU_EXCLUDED_SLUGS } from '@/lib/category-hub'
import { buildAlternates, buildCategoryHubJsonLd, buildOG, buildTwitter, BASE } from '@/lib/seo'
import { getTranslations } from '@/lib/server-i18n'
import type { LangCode } from '@/src/i18n'

export function generateStaticParams() {
  return URL_LANG_CODES.flatMap((lang) =>
    categories.map((c) => ({ lang, category: c.id })),
  )
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string; category: string }> },
): Promise<Metadata> {
  const { lang, category: slug } = await params
  // `lang` is a URL prefix ('zh'); getCategoryHub expects a LangCode ('zh-CN').
  const hub = getCategoryHub((URL_TO_LANG[lang] ?? 'en') as LangCode, slug)
  const cat = categories.find((c) => c.id === slug)
  if (!cat || !hub) return { title: 'Not Found' }

  const title = hub.seo.title
  const description = hub.seo.description
  const basePath = `/tools/${slug}`
  const canonicalUrl = `${BASE}/${lang}${basePath}`

  return {
    title,
    description,
    alternates: buildAlternates(canonicalUrl, basePath),
    openGraph: buildOG({ title, description, url: canonicalUrl, urlLang: lang }),
    twitter: buildTwitter({ title, description }),
  }
}

export default async function LangCategoryPage(
  { params }: { params: Promise<{ lang: string; category: string }> },
) {
  const { lang, category: slug } = await params
  const hub = getCategoryHub((URL_TO_LANG[lang] ?? 'en') as LangCode, slug)
  const cat = categories.find((c) => c.id === slug)
  if (!cat || !hub) notFound()

  const t = getTranslations(lang)
  const catTools = tools.filter(
    (tool) => tool.category === slug && !TOOL_MENU_EXCLUDED_SLUGS.has(tool.slug) && !tool.deprecated,
  )
  const url = `${BASE}/${lang}/tools/${slug}`

  const jsonLd = buildCategoryHubJsonLd({
    url,
    name: hub.seo.h1,
    description: hub.seo.description,
    tools: catTools.map((tool) => ({
      name: (t.toolsData as Record<string, { name?: string }>)?.[tool.slug]?.name ?? tool.name,
      url: `${BASE}/${lang}/${tool.slug}`,
    })),
    faqs: hub.faqs,
    homeLabel: t.breadcrumbs.home,
    toolsLabel: t.breadcrumbs.tools,
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
