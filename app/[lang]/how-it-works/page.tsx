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
  const title = 'How NanoImage Works - 100% Browser-Based Image Processing'
  const description =
    'NanoImage processes all images directly in your browser using the Canvas API. Your files never leave your device.'
  const canonicalUrl = `${BASE}/${lang}/how-it-works`
  return {
    title,
    description,
    alternates: buildAlternates(canonicalUrl, '/how-it-works'),
    openGraph: buildOG({ title, description, url: canonicalUrl }),
    twitter: buildTwitter({ title, description }),
  }
}

export default function LangHowItWorksPage() {
  return <AppShell page="how-it-works" />
}
