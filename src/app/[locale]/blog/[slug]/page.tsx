import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost } from '@/lib/blog';
import { routing } from '@/i18n/routing';
import BlogArticleClient from './BlogArticleClient';

export const runtime = 'edge';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      url: `/blog/${post.slug}`,
      type: 'article',
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

async function loadBlogContent(locale: string, slug: string): Promise<string> {
  try {
    const mod = await import(`@/content/blog/${locale}/${slug}`);
    return mod.content;
  } catch {
    try {
      const mod = await import(`@/content/blog/en/${slug}`);
      return mod.content;
    } catch {
      return '';
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const content = await loadBlogContent(locale, slug);
  if (!content) notFound();

  return <BlogArticleClient post={post} content={content} />;
}
