import type { BlogPost } from '../data'
import type { BlogLoc, BlogLocMap } from './exif'
import { compressLocalizations } from './compress'
import { resizeLocalizations } from './resize'
import { exifEnglishPatch, exifLocalizations } from './exif'
import { tinypngExtraLocalizations } from './tinypng-extra'
import { gridMakerExtraLocalizations } from './grid-maker-extra'
import { fourWayExtraLocalizations } from './four-way-extra'
import { optimizeWebLocalizations } from './optimize-web'
import { quickEditsLocalizations } from './quick-edits'
import { formatGuideLocalizations } from './format-guide'
import { protectPhotosLocalizations } from './protect-photos'

type PatchEntry = {
  slug: string
  /** Merged into the English post fields (title, body, …). */
  english?: BlogLoc
  /** Merged into post.localizations[lang]. */
  localizations: BlogLocMap
}

const PATCHES: PatchEntry[] = [
  {
    slug: 'how-to-compress-images-without-losing-quality',
    localizations: compressLocalizations,
  },
  {
    slug: 'how-to-resize-images-without-losing-quality',
    localizations: resizeLocalizations,
  },
  {
    slug: 'what-is-exif-data',
    english: exifEnglishPatch,
    localizations: exifLocalizations,
  },
  {
    slug: 'nanoimage-vs-tinypng',
    localizations: tinypngExtraLocalizations,
  },
  {
    slug: 'what-is-grid-maker',
    localizations: gridMakerExtraLocalizations,
  },
  {
    slug: 'nanoimage-vs-tinypng-vs-squoosh-vs-photopea',
    localizations: fourWayExtraLocalizations,
  },
  {
    slug: 'optimize-images-for-web',
    localizations: optimizeWebLocalizations,
  },
  {
    slug: 'quick-image-edits-online',
    localizations: quickEditsLocalizations,
  },
  {
    slug: 'image-format-guide',
    localizations: formatGuideLocalizations,
  },
  {
    slug: 'protect-photos-online',
    localizations: protectPhotosLocalizations,
  },
]

function mergeLoc(existing: BlogLoc | undefined, patch: BlogLoc): BlogLoc {
  return existing ? { ...existing, ...patch } : patch
}

/** Apply SEO batch-4 blog translations onto the raw blogPosts array (in place). */
export function applyBlogTranslations(posts: BlogPost[]): BlogPost[] {
  for (const { slug, english, localizations } of PATCHES) {
    const post = posts.find((p) => p.slug === slug)
    if (!post) continue

    if (english) {
      Object.assign(post, english)
    }

    post.localizations = post.localizations ?? {}
    for (const [lang, loc] of Object.entries(localizations)) {
      post.localizations[lang] = mergeLoc(post.localizations[lang], loc)
    }
  }

  return posts
}
