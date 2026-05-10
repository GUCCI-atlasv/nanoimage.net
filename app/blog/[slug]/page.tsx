import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { blogPosts } from '@/src/data'
import { buildAlternates, buildOG, buildTwitter, BASE, OG_IMAGE } from '@/lib/seo'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: 'Not Found' }

  const title = `${post.title} - NanoImage Blog`
  const description = post.metaDescription ?? post.excerpt
  const url = `${BASE}/blog/${slug}`
  const image = post.coverImage ? `${BASE}${post.coverImage}` : OG_IMAGE

  return {
    title,
    description,
    alternates: buildAlternates(url),
    openGraph: buildOG({ title, description, url, image }),
    twitter: buildTwitter({ title, description, image }),
  }
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  return <AppShell page="blog-post" blogSlug={slug} />
}
