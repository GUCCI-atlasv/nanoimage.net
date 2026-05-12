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
  const canonicalUrl = `${BASE}/${lang}`
  const title = 'NanoImage — 15 Image Tools. No AI. No Upload. No Account.'
  const description =
    'Compress, resize, crop, convert images — 100% in your browser via Canvas API. Your files never leave your device. Free forever, no limits.'
  return {
    title,
    description,
    alternates: buildAlternates(canonicalUrl, '/'),
    openGraph: buildOG({ title, description, url: canonicalUrl }),
    twitter: buildTwitter({ title, description }),
  }
}

export default function LangHomePage() {
  return <AppShell page="home" />
}
