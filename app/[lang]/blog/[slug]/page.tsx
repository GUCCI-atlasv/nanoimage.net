import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { blogPosts } from '@/src/data'
import { URL_LANG_CODES } from '@/lib/i18n-utils'
import { buildAlternates, buildOG, buildTwitter, BASE, OG_IMAGE } from '@/lib/seo'

export function generateStaticParams() {
  return URL_LANG_CODES.flatMap((lang) =>
    blogPosts.map((p) => ({ lang, slug: p.slug })),
  )
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string; slug: string }> },
): Promise<Metadata> {
  const { lang, slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: 'Not Found' }

  const title = `${post.title} - NanoImage Blog`
  const description = post.metaDescription ?? post.excerpt
  const basePath = `/blog/${slug}`
  const canonicalUrl = `${BASE}/${lang}${basePath}`
  const image = post.coverImage ? `${BASE}${post.coverImage}` : OG_IMAGE

  return {
    title,
    description,
    alternates: buildAlternates(canonicalUrl, basePath),
    openGraph: buildOG({ title, description, url: canonicalUrl, image }),
    twitter: buildTwitter({ title, description, image }),
  }
}

export default async function LangBlogPostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  return <AppShell page="blog-post" blogSlug={slug} />
}
