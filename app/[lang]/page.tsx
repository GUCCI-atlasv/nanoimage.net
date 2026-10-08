import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { URL_LANG_CODES } from '@/lib/i18n-utils'
import { buildAlternates, buildOG, buildTwitter, buildHomePageJsonLd, BASE } from '@/lib/seo'
import { getPageMeta, HOME_META } from '@/lib/server-i18n'

export function generateStaticParams() {
  return URL_LANG_CODES.map((lang) => ({ lang }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> },
): Promise<Metadata> {
  const { lang } = await params
  const { title, description } = getPageMeta(HOME_META, lang)
  const canonicalUrl = `${BASE}/${lang}`
  return {
    title,
    description,
    alternates: buildAlternates(canonicalUrl, '/'),
    openGraph: buildOG({ title, description, url: canonicalUrl, urlLang: lang }),
    twitter: buildTwitter({ title, description }),
  }
}

/** Map URL prefix → BCP 47 language code for use in JSON-LD inLanguage. */
const URL_TO_BCP47: Record<string, string> = {
  zh:      'zh-Hans',
  'zh-TW': 'zh-Hant',
  ja:      'ja',
  ko:      'ko',
  fr:      'fr',
  es:      'es',
  pt:      'pt',
  ru:      'ru',
}

export default async function LangHomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const { title, description } = getPageMeta(HOME_META, lang)
  const canonicalUrl = `${BASE}/${lang}`
  const bcp47 = URL_TO_BCP47[lang] ?? lang
  const jsonLd = buildHomePageJsonLd({
    title,
    description,
    url: canonicalUrl,
    inLanguage: bcp47,
  })
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppShell page="home" />
    </>
  )
}
