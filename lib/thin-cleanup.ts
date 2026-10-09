/**
 * Thin-page cleanup (nanoimage.net, 2026-10-07; source port 2026-10-09).
 * Source: site-diagnosis-2026-10 thin-page-cleanup.csv (Cindy/Kobe approved).
 *  - SHOT 1 (live deploy 63ce4490): 86 localized URLs -> <meta name="robots" content="noindex, follow">
 *  - SHOT 2 (live deploy e5349c13): 6 localized /compress-image-to-100kb -> 301 /{lang}/compress-image
 *    (not generated, removed from sitemap/hreflang, internal links remapped; rules in public/_redirects)
 * The 4 English blog "soft-404 shell" 301s from SHOT 2 are intentionally NOT ported:
 * since the 2026-10-08 source recovery those slugs are real articles with self canonicals.
 */
import type { Metadata } from 'next'

export const THIN_NOINDEX_PATHS: ReadonlySet<string> = new Set([
  '/es/background-remover',
  '/es/blog/introducing-nanoimage-cli',
  '/es/blur-image',
  '/es/cli',
  '/es/docs/cli',
  '/es/gif-maker',
  '/es/how-it-works',
  '/es/image-collage',
  '/es/object-remover',
  '/es/photo-restore',
  '/es/remove-exif',
  '/es/upscale-image',
  '/es/video-to-gif',
  '/fr/background-remover',
  '/fr/blog/how-to-make-passport-photo-online-for-free',
  '/fr/blog/introducing-nanoimage-cli',
  '/fr/cli',
  '/fr/convert-to-webp',
  '/fr/docs/cli',
  '/fr/gif-maker',
  '/fr/how-it-works',
  '/fr/image-collage',
  '/fr/object-remover',
  '/fr/photo-restore',
  '/fr/remove-exif',
  '/fr/upscale-image',
  '/fr/video-to-gif',
  '/ja/black-and-white-image',
  '/ja/blur-image',
  '/ja/docs/cli',
  '/ja/image-collage',
  '/ja/invert-image-colors',
  '/ja/object-remover',
  '/ja/photo-restore',
  '/ja/upscale-image',
  '/ko/black-and-white-image',
  '/ko/cli',
  '/ko/compress-image-to-100kb',
  '/ko/docs/cli',
  '/ko/image-collage',
  '/ko/invert-image-colors',
  '/ko/object-remover',
  '/ko/photo-restore',
  '/pt/background-remover',
  '/pt/blog/how-to-make-passport-photo-online-for-free',
  '/pt/blog/introducing-nanoimage-cli',
  '/pt/blur-image',
  '/pt/cli',
  '/pt/convert-to-webp',
  '/pt/docs/cli',
  '/pt/how-it-works',
  '/pt/image-collage',
  '/pt/object-remover',
  '/pt/photo-restore',
  '/pt/remove-exif',
  '/pt/upscale-image',
  '/pt/video-to-gif',
  '/ru/background-remover',
  '/ru/black-and-white-image',
  '/ru/blog/how-to-make-passport-photo-online-for-free',
  '/ru/blog/introducing-nanoimage-cli',
  '/ru/blog/what-is-exif-data',
  '/ru/convert-to-webp',
  '/ru/gif-maker',
  '/ru/how-it-works',
  '/ru/image-collage',
  '/ru/object-remover',
  '/ru/passport-photo',
  '/ru/photo-restore',
  '/ru/pixelate-image',
  '/ru/tools/video-tools',
  '/ru/video-to-gif',
  '/zh-TW/background-remover',
  '/zh-TW/black-and-white-image',
  '/zh-TW/docs/cli',
  '/zh-TW/invert-image-colors',
  '/zh-TW/object-remover',
  '/zh-TW/photo-restore',
  '/zh-TW/pixelate-image',
  '/zh-TW/upscale-image',
  '/zh-TW/video-to-gif',
  '/zh/background-remover',
  '/zh/docs/cli',
  '/zh/jpg-to-webp',
  '/zh/object-remover',
  '/zh/photo-restore',
]);

/** Locales whose /compress-image-to-100kb page is merged (301) into /{lang}/compress-image. */
export const MERGED_100KB_LANGS: ReadonlySet<string> = new Set([
  'es',
  'fr',
  'ja',
  'pt',
  'ru',
  'zh-TW',
]);

export function thinNoindexRobots(path: string): Pick<Metadata, 'robots'> {
  return THIN_NOINDEX_PATHS.has(path) ? { robots: { index: false, follow: true } } : {}
}

/** Remap a root-relative tool path for a URL lang prefix (null/'' = English). */
export function remapThinPath(urlLang: string | null | undefined, path: string): string {
  if (urlLang && MERGED_100KB_LANGS.has(urlLang) && (path === '/compress-image-to-100kb' || path === '/compress-image-to-100kb/')) {
    return '/compress-image'
  }
  return path
}
