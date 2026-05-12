import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { tools } from '@/src/data'
import { URL_LANG_CODES } from '@/lib/i18n-utils'
import { buildAlternates, buildOG, buildTwitter, BASE } from '@/lib/seo'
import { getToolMeta } from '@/lib/server-i18n'

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

  const { title, description } = getToolMeta(lang, slug)
  const basePath = `/${slug}`
  const canonicalUrl = `${BASE}/${lang}${basePath}`

  return {
    title,
    description,
    alternates: buildAlternates(canonicalUrl, basePath),
    openGraph: buildOG({ title, description, url: canonicalUrl }),
    twitter: buildTwitter({ title, description }),
  }
}

export default async function LangToolPage(
  { params }: { params: Promise<{ tool: string }> },
) {
  const { tool: slug } = await params
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) notFound()

  return <AppShell page="tool" toolSlug={slug} />
}
