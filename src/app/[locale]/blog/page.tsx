import type { Metadata } from 'next';
import { blogPosts } from '@/lib/blog';
import BlogListClient from './BlogListClient';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Image Editing Tips & Guides | NanoImage Blog',
  description: 'Learn how to compress, resize, rotate and edit images online. Free tips and guides from NanoImage — no uploads, 100% private.',
  alternates: { canonical: '/blog' },
  openGraph: { url: '/blog' },
};

export default function BlogPage() {
  return <BlogListClient posts={blogPosts} />;
}
