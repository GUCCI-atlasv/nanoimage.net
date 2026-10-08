/**
 * Per-post list of URL language codes that have a REAL translation.
 *
 * Why this exists (SEO batch-3, 2026-07-04):
 * GSC flagged ~73 localized blog pages as "Crawled - currently not indexed" /
 * "Duplicate, Google chose different canonical than user" because they served
 * the verbatim English article under /{lang}/blog/... (title, h1 and body all
 * still English). We now only generate a localized blog page when a genuine
 * translation exists; every pruned lang/slug combination is 301-redirected to
 * the English article via public/_redirects.
 *
 * When a translation is added to src/data.ts / src/i18n:
 *   1. Add the URL lang code to the post's array below.
 *   2. Remove the matching 301 line from public/_redirects
 *      (section "Static: untranslated locale blog pages").
 *   3. Add the URL back to public/sitemap.xml.
 *
 * English always exists and is NOT listed here.
 */
import { URL_LANG_CODES, type UrlLangCode } from '@/lib/i18n-utils'

const ALL: readonly UrlLangCode[] = URL_LANG_CODES
const GRID_EXTRA: readonly UrlLangCode[] = ['ja', 'ko', 'fr', 'es', 'pt', 'ru'] as const

export const BLOG_TRANSLATED_LANGS: Record<string, readonly UrlLangCode[]> = {
  // Fully translated in every language
  'how-to-make-passport-photo-online-for-free': ALL,
  'introducing-nanoimage-cli': ALL,
  'jpg-png-webp-avif': ALL,

  // SEO batch-4 (2026-07-04): P1 core tool keywords
  'how-to-compress-images-without-losing-quality': ALL,
  'how-to-resize-images-without-losing-quality': ALL,

  // P2: privacy + comparison
  'what-is-exif-data': ALL,
  'nanoimage-vs-tinypng': ALL,

  // P3: new tool + 4-way comparison hub
  'what-is-grid-maker': ['zh', 'zh-TW', ...GRID_EXTRA],
  'nanoimage-vs-tinypng-vs-squoosh-vs-photopea': ALL,

  // Partially translated (zh only)
  'nanoimage-vs-photopea': ['zh'],
  'nanoimage-vs-squoosh': ['zh'],

  // Hub-support guides (2026-07-05)
  'optimize-images-for-web': ALL,
  'quick-image-edits-online': ALL,
  'image-format-guide': ALL,
  'protect-photos-online': ALL,

  // Rebuilt keyword articles 2026-07-04 (P0-4): English only for now
  'how-to-crop-image-online': [],
  'how-to-convert-png-to-jpg-online': [],
  'how-to-blur-photo-online': [],
  'how-to-add-watermark-to-photo-online': [],
  'instagram-image-sizes': [],
  'social-media-image-sizes': [],

  // Synced from production 2026-10: GIF / bulk-compress / Discord guides, English only
  'how-to-bulk-compress-images': [],
  'how-to-compress-gif': [],
  'how-to-crop-discord-profile-picture': [],
  'how-to-resize-and-crop-a-gif': [],

  // English only (locale copies were duplicates — pruned)
  'nanoimage-redesign-free-image-tools': [],
}

/** URL lang codes (excluding 'en') that have a real translation for a slug. */
export function blogLangsFor(slug: string): readonly UrlLangCode[] {
  // Unknown slugs default to English-only, so a future post is never published
  // in 8 untranslated copies by accident.
  return BLOG_TRANSLATED_LANGS[slug] ?? []
}

export function isBlogLangAvailable(lang: string, slug: string): boolean {
  return (blogLangsFor(slug) as readonly string[]).includes(lang)
}
