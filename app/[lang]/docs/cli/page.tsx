import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { URL_LANG_CODES } from '@/lib/i18n-utils'
import { buildAlternates, buildOG, buildTwitter, BASE } from '@/lib/seo'

export function generateStaticParams() {
  return URL_LANG_CODES.map((lang) => ({ lang }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> },
): Promise<Metadata> {
  const { lang } = await params
  const title = 'NanoImage CLI Documentation'
  const description =
    'Full reference for the NanoImage CLI: installation, commands, options, and examples.'
  const canonicalUrl = `${BASE}/${lang}/docs/cli`
  return {
    title,
    description,
    alternates: buildAlternates(canonicalUrl, '/docs/cli'),
    openGraph: buildOG({ title, description, url: canonicalUrl }),
    twitter: buildTwitter({ title, description }),
  }
}

export default function LangDocsCliPage() {
  return <AppShell page="docs-cli" />
}
