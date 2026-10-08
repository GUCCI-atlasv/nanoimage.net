import { blogPosts } from '@/src/data'
import type { LangCode } from '@/src/i18n'
import { getCategoryHubPageContent, type CategoryHubCategoryId, type CategoryHubPageContent } from '@/src/category-hub-i18n'
import type { CategoryHubConfig } from '@/src/category-hub-i18n/merge'

export const TOOL_MENU_EXCLUDED_SLUGS = new Set([
  'compress-image-to-100kb',
  'compress-image-to-200kb',
  'compress-image-to-500kb',
  'compress-image-to-1mb',
])

export const CATEGORY_HUB_BANNERS: Record<CategoryHubCategoryId, string> = {
  'optimize-images': '/banner/optimize-images.png',
  'edit-images': '/banner/edit-images.png',
  'convert-formats': '/banner/convert-formats.png',
  'create-more': '/banner/create-more.png',
  'privacy-protection': '/banner/privacy-protection.png',
  'ai-tools': '/banner/ai-tools.png',
  'video-tools': '/banner/video-tools.png',
}

const HUB_META: Record<
  CategoryHubCategoryId,
  Pick<CategoryHubConfig, 'relatedCategoryIds' | 'blogGuideSlugs'>
> = {
  'optimize-images': {
    relatedCategoryIds: ['edit-images', 'convert-formats', 'privacy-protection'],
    blogGuideSlugs: [
      'how-to-compress-images-without-losing-quality',
      'how-to-resize-images-without-losing-quality',
      'optimize-images-for-web',
      'nanoimage-vs-tinypng',
      'social-media-image-sizes',
    ],
  },
  'edit-images': {
    relatedCategoryIds: ['optimize-images', 'create-more', 'privacy-protection'],
    blogGuideSlugs: [
      'how-to-crop-image-online',
      'quick-image-edits-online',
      'how-to-resize-images-without-losing-quality',
      'how-to-make-passport-photo-online-for-free',
      'social-media-image-sizes',
    ],
  },
  'convert-formats': {
    relatedCategoryIds: ['optimize-images', 'create-more', 'video-tools'],
    blogGuideSlugs: ['how-to-convert-png-to-jpg-online', 'jpg-png-webp-avif', 'image-format-guide'],
  },
  'create-more': {
    relatedCategoryIds: ['edit-images', 'convert-formats', 'video-tools'],
    blogGuideSlugs: ['what-is-grid-maker', 'instagram-image-sizes'],
  },
  'privacy-protection': {
    relatedCategoryIds: ['edit-images', 'optimize-images'],
    blogGuideSlugs: [
      'protect-photos-online',
      'what-is-exif-data',
      'how-to-blur-photo-online',
      'how-to-add-watermark-to-photo-online',
    ],
  },
  'ai-tools': {
    relatedCategoryIds: ['edit-images', 'optimize-images', 'privacy-protection'],
    blogGuideSlugs: ['protect-photos-online', 'what-is-exif-data'],
  },
  'video-tools': {
    relatedCategoryIds: ['convert-formats', 'create-more'],
    blogGuideSlugs: [],
  },
}

/**
 * @param lang Internal LangCode ('zh-CN'), NOT a URL prefix ('zh').
 *             Callers on the [lang] route must convert via URL_TO_LANG first —
 *             passing the raw 'zh' segment silently missed the zh-CN entry and
 *             served every Chinese hub page in English.
 */
export function getCategoryHub(lang: LangCode, categoryId: string): CategoryHubConfig | undefined {
  const id = categoryId as CategoryHubCategoryId
  const content = getCategoryHubPageContent(lang, id)
  const meta = HUB_META[id]
  if (!content || !meta) return undefined
  return { ...content, ...meta }
}

export function getCategoryHubBlogGuides(slugs: string[], lang: LangCode) {
  return slugs
    .map((slug) => {
      const post = blogPosts.find((p) => p.slug === slug)
      if (!post) return null
      const loc = post.localizations?.[lang]
      return {
        slug: post.slug,
        title: loc?.title ?? post.title,
        excerpt: loc?.excerpt ?? post.excerpt,
      }
    })
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
}

export type { CategoryHubConfig, CategoryHubPageContent }
