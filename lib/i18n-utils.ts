/**
 * URL ↔ LangCode utilities shared between server and client.
 * No imports from src/i18n to avoid circular dependencies.
 */

/** URL slug codes used as path prefixes (English has no prefix) */
export const URL_LANG_CODES = ['zh', 'zh-TW', 'ja', 'ko', 'fr', 'es', 'pt', 'ru'] as const
export type UrlLangCode = (typeof URL_LANG_CODES)[number]

/** URL prefix → internal LangCode */
export const URL_TO_LANG: Record<string, string> = {
  zh: 'zh-CN',
  'zh-TW': 'zh-TW',
  ja: 'ja',
  ko: 'ko',
  fr: 'fr',
  es: 'es',
  pt: 'pt',
  ru: 'ru',
}

/** Internal LangCode → URL prefix (null = English, no prefix) */
export const LANG_TO_URL: Record<string, string | null> = {
  en: null,
  'zh-CN': 'zh',
  'zh-TW': 'zh-TW',
  ja: 'ja',
  ko: 'ko',
  fr: 'fr',
  es: 'es',
  pt: 'pt',
  ru: 'ru',
}

/**
 * Given a lang code and a root-relative path (e.g. '/compress-image'),
 * return the lang-prefixed path (e.g. '/zh/compress-image').
 */
export function langPath(lang: string, path: string): string {
  const prefix = LANG_TO_URL[lang]
  return prefix ? `/${prefix}${path}` : path
}

/**
 * Strip any known language prefix from a pathname.
 * '/zh/compress-image' → '/compress-image'
 * '/compress-image'    → '/compress-image'
 * '/zh'               → '/'
 */
export function stripLangPrefix(pathname: string): string {
  for (const code of URL_LANG_CODES) {
    if (pathname === `/${code}`) return '/'
    if (pathname.startsWith(`/${code}/`)) return pathname.slice(code.length + 1)
  }
  return pathname
}
