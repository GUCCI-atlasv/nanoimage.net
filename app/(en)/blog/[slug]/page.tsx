import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { blogPosts } from '@/src/data'
import { blogLangsFor } from '@/lib/blog-langs'
import { buildAlternates, buildBlogPostingJsonLd, buildOG, buildTwitter, BASE, OG_IMAGE, fitTitle } from '@/lib/seo'

/** News-style posts with no search value are kept out of the index (SEO audit P1-9). */
const NOINDEX_SLUGS = new Set(['nanoimage-redesign-free-image-tools'])

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: 'Not Found' }

  const localized = post.localizations?.en
  const title = fitTitle(localized?.title ?? post.title, ' - NanoImage Blog')
  const description = localized?.metaDescription ?? localized?.excerpt ?? post.metaDescription ?? post.excerpt
  const url = `${BASE}/blog/${slug}`
  const image = post.coverImage ? `${BASE}${post.coverImage}` : OG_IMAGE

  return {
    title,
    description,
    alternates: buildAlternates(url, `/blog/${slug}`, blogLangsFor(slug)),
    openGraph: buildOG({ title, description, url, image, urlLang: 'en', type: 'article' }),
    twitter: buildTwitter({ title, description, image }),
    ...(NOINDEX_SLUGS.has(slug) ? { robots: { index: false, follow: true } } : {}),
  }
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const loc = post.localizations?.en
  const jsonLd = buildBlogPostingJsonLd({
    url: `${BASE}/blog/${slug}`,
    title: loc?.title ?? post.title,
    description: loc?.metaDescription ?? loc?.excerpt ?? post.metaDescription ?? post.excerpt,
    datePublished: post.date,
    image: post.coverImage ? `${BASE}${post.coverImage}` : undefined,
    bcp47: 'en',
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
