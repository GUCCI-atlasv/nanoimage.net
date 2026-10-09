import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { blogPosts } from '@/src/data'
import { URL_TO_LANG } from '@/lib/i18n-utils'
import { blogLangsFor, isBlogLangAvailable } from '@/lib/blog-langs'
import { buildAlternates, buildBlogPostingJsonLd, buildOG, buildTwitter, BASE, OG_IMAGE, URL_TO_BCP47, fitTitle } from '@/lib/seo'
import { thinNoindexRobots } from '@/lib/thin-cleanup'

export function generateStaticParams() {
  // Only emit localized blog pages that have a real translation.
  // Untranslated combinations 301 to the English article via _redirects.
  return blogPosts.flatMap((p) =>
    blogLangsFor(p.slug).map((lang) => ({ lang, slug: p.slug })),
  )
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string; slug: string }> },
): Promise<Metadata> {
  const { lang, slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post || !isBlogLangAvailable(lang, slug)) return { title: 'Not Found' }

  // Use localised data when available
  const langCode = URL_TO_LANG[lang] ?? 'en'
  const loc = post.localizations?.[langCode] ?? (langCode !== 'zh-CN' ? post.localizations?.en : undefined)
  const title = fitTitle(loc?.title ?? post.title, ' - NanoImage Blog')
  const description = loc?.metaDescription ?? loc?.excerpt ?? post.metaDescription ?? post.excerpt

  const basePath = `/blog/${slug}`
  const canonicalUrl = `${BASE}/${lang}${basePath}`
  const image = post.coverImage ? `${BASE}${post.coverImage}` : OG_IMAGE

  return {
    title,
    description,
    alternates: buildAlternates(canonicalUrl, basePath, blogLangsFor(slug)),
    ...thinNoindexRobots(`/${lang}/blog/${slug}`),
    openGraph: buildOG({ title, description, url: canonicalUrl, image, urlLang: lang }),
    twitter: buildTwitter({ title, description, image }),
  }
}

export default async function LangBlogPostPage(
  { params }: { params: Promise<{ lang: string; slug: string }> },
) {
  const { lang, slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post || !isBlogLangAvailable(lang, slug)) notFound()

  const langCode = URL_TO_LANG[lang] ?? 'en'
  const loc = post.localizations?.[langCode] ?? (langCode !== 'zh-CN' ? post.localizations?.en : undefined)
  const jsonLd = buildBlogPostingJsonLd({
    url: `${BASE}/${lang}/blog/${slug}`,
    title: loc?.title ?? post.title,
    description: loc?.metaDescription ?? loc?.excerpt ?? post.metaDescription ?? post.excerpt,
    datePublished: post.date,
    image: post.coverImage ? `${BASE}${post.coverImage}` : undefined,
    bcp47: URL_TO_BCP47[lang] ?? lang,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppShell page="blog-post" blogSlug={slug} />
    </>
  )
}
