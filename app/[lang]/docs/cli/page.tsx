import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { URL_LANG_CODES } from '@/lib/i18n-utils'
import { buildOG, buildTwitter, BASE } from '@/lib/seo'
import { getPageMeta, DOCS_CLI_META } from '@/lib/server-i18n'

export function generateStaticParams() {
  return URL_LANG_CODES.map((lang) => ({ lang }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> },
): Promise<Metadata> {
  const { lang } = await params
  const { title, description } = getPageMeta(DOCS_CLI_META, lang)
  const canonicalUrl = `${BASE}/${lang}/docs/cli`
  return {
    title,
    description,
    // Body is English-only (legal) or client-rendered (CLI): thin duplicates of the
    // EN page. GSC 2026-10 had these in "Crawled - currently not indexed"; keep them
    // out of the index and out of the hreflang cluster until they are localized.
    robots: { index: false, follow: true },
    alternates: { canonical: canonicalUrl },
    openGraph: buildOG({ title, description, url: canonicalUrl, urlLang: lang }),
    twitter: buildTwitter({ title, description }),
  }
}

export default function LangDocsCliPage() {
  return <AppShell page="docs-cli" />
}
