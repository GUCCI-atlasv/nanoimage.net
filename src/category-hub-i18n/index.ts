import type { LangCode } from '@/src/i18n'
import type { CategoryHubCategoryId, CategoryHubPageContent, CategoryHubPages, CategoryHubPagesPartial } from './types'
import { enCategoryHubPages } from './en-pages'
import { zhCNCategoryHubPages } from './zh-CN-pages'
import { zhTWCategoryHubPages } from './zh-TW-pages'
import { jaCategoryHubPages } from './ja-pages'
import { koCategoryHubPages } from './ko-pages'
import { frCategoryHubPages } from './fr-pages'
import { esCategoryHubPages } from './es-pages'
import { ptCategoryHubPages } from './pt-pages'
import { ruCategoryHubPages } from './ru-pages'

const PAGES_BY_LANG: Record<LangCode, CategoryHubPages | CategoryHubPagesPartial> = {
  en: enCategoryHubPages,
  'zh-CN': zhCNCategoryHubPages,
  'zh-TW': zhTWCategoryHubPages,
  ja: jaCategoryHubPages,
  ko: koCategoryHubPages,
  fr: frCategoryHubPages,
  es: esCategoryHubPages,
  pt: ptCategoryHubPages,
  ru: ruCategoryHubPages,
}

/**
 * Resolve hub content, falling back to English *per field* rather than
 * all-or-nothing.
 *
 * Previously a language file that had not translated a category returned the
 * whole English page, so `/zh/tools/ai-tools` … `/ru/tools/ai-tools` all shipped
 * the identical English meta description — Bing flagged duplicate descriptions
 * across 131 pages on 2026-08-07. With a field-level merge a locale can supply
 * just `seo` (the part search engines read) and still inherit English body copy
 * until the long-form translation lands.
 */
export function getCategoryHubPageContent(
  lang: LangCode,
  categoryId: CategoryHubCategoryId,
): CategoryHubPageContent | undefined {
  const en = enCategoryHubPages[categoryId]
  // Without an English base a partial locale entry cannot be completed, so the
  // category is treated as absent rather than shipped with missing fields.
  if (!en) return undefined
  const localized = PAGES_BY_LANG[lang]?.[categoryId]
  if (!localized) return en
  return { ...en, ...localized, seo: { ...en.seo, ...localized.seo } }
}

export type { CategoryHubPageContent, CategoryHubCategoryId, CategoryHubScenario, CategoryHubFaq } from './types'
