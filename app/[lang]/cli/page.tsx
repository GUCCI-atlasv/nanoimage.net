import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { URL_LANG_CODES } from '@/lib/i18n-utils'
import { buildAlternates, buildOG, buildTwitter, BASE } from '@/lib/seo'
import { getPageMeta, CLI_META } from '@/lib/server-i18n'

export function generateStaticParams() {
  return URL_LANG_CODES.map((lang) => ({ lang }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> },
): Promise<Metadata> {
  const { lang } = await params
  const { title, description } = getPageMeta(CLI_META, lang)
  const canonicalUrl = `${BASE}/${lang}/cli`
  return {
    title,
    description,
    alternates: buildAlternates(canonicalUrl, '/cli'),
    openGraph: buildOG({ title, description, url: canonicalUrl }),
    twitter: buildTwitter({ title, description }),
  }
}

export default function LangCliPage() {
  return <AppShell page="cli" />
}
