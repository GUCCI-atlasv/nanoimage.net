import { I18nProvider } from '@/src/i18n'
import { URL_TO_LANG } from '@/lib/i18n-utils'
import type { LangCode } from '@/src/i18n'

/** Nested layout for language-prefixed routes (/zh/…, /ja/…, etc.)
 *  Wraps children in a new I18nProvider that pre-seeds the language from
 *  the URL, overriding the browser/IP detection done in the root layout. */
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const langCode = (URL_TO_LANG[lang] ?? 'en') as LangCode
  return <I18nProvider initialLang={langCode}>{children}</I18nProvider>
}
