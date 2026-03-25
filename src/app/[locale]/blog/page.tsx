import type { Metadata } from 'next';
import { blogPosts } from '@/lib/blog';
import BlogListClient from './BlogListClient';
import { buildAlternates } from '@/lib/metadata';

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Image Editing Tips & Guides | NanoImage Blog',
    description: 'Learn how to compress, resize, rotate and edit images online. Free tips and guides from NanoImage — no uploads, 100% private.',
    alternates: buildAlternates('/blog', locale),
    openGraph: { url: locale === 'en' ? '/blog' : `/${locale}/blog` },
  };
}

export default function BlogPage() {
  return <BlogListClient posts={blogPosts} />;
}
