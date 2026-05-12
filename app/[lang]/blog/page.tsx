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
  const title = 'NanoImage Blog - Image Tools Guides'
  const description =
    'Tips, guides, and updates about image compression, resizing, conversion, and more from the NanoImage team.'
  const canonicalUrl = `${BASE}/${lang}/blog`
  return {
    title,
    description,
    alternates: buildAlternates(canonicalUrl, '/blog'),
    openGraph: buildOG({ title, description, url: canonicalUrl }),
    twitter: buildTwitter({ title, description }),
  }
}

export default function LangBlogListPage() {
  return <AppShell page="blog-list" />
}
