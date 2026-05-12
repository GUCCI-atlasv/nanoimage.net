import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { categories } from '@/src/data'
import { URL_LANG_CODES } from '@/lib/i18n-utils'
import { buildAlternates, buildOG, buildTwitter, BASE } from '@/lib/seo'
import { getTranslations } from '@/lib/server-i18n'

export function generateStaticParams() {
  return URL_LANG_CODES.flatMap((lang) =>
    categories.map((c) => ({ lang, category: c.id })),
  )
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string; category: string }> },
): Promise<Metadata> {
  const { lang, category: slug } = await params
  const cat = categories.find((c) => c.id === slug)
  if (!cat) return { title: 'Not Found' }

  const t = getTranslations(lang)
  const cats = t.categories as Record<string, { title: string; description: string }>
  const locCat = cats?.[slug]

  const title = locCat ? `${locCat.title} - NanoImage` : `${cat.title} - NanoImage`
  const description = locCat?.description ?? cat.description
  const basePath = `/tools/${slug}`
  const canonicalUrl = `${BASE}/${lang}${basePath}`

  return {
    title,
    description,
    alternates: buildAlternates(canonicalUrl, basePath),
    openGraph: buildOG({ title, description, url: canonicalUrl }),
    twitter: buildTwitter({ title, description }),
  }
}

export default async function LangCategoryPage(
  { params }: { params: Promise<{ category: string }> },
) {
  const { category: slug } = await params
  const cat = categories.find((c) => c.id === slug)
  if (!cat) notFound()

  return <AppShell page="category" categoryId={slug} />
}
