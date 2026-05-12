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
  const title = 'NanoImage CLI — Compress & Optimize Images from the Terminal'
  const description =
    'Install NanoImage CLI to compress, resize, convert, and optimize images locally from the command line. Free and open source.'
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
