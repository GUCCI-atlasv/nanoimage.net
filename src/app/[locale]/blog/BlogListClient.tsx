'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import type { BlogPost } from '@/lib/blog';
import { blogCategories } from '@/lib/blog';

const categoryColors: Record<string, string> = {
  'How-to': 'text-accent',
  Privacy: 'text-accent2',
  Tips: 'text-accent3',
  Comparisons: 'text-muted',
  'Platform Guide': 'text-accent',
};

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
      <nav className="font-mono text-[11px] text-muted mb-8">
        <Link href="/" className="hover:text-accent transition-colors">Home</Link>
        <span className="mx-2">→</span>
        <span className="text-text">Blog</span>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-extrabold text-text mb-4 tracking-tight">
        Image Tips & Guides
      </h1>
      <p className="font-mono text-[12px] text-muted mb-10 max-w-2xl">
        Learn how to compress, resize, and edit images the right way. Free guides and tips from the NanoImage team.
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory(null)}
          className={`btn-tool text-xs${!activeCategory ? ' active' : ''}`}
        >
          All
        </button>
        {blogCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`btn-tool text-xs${activeCategory === cat ? ' active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group panel-card hover:border-accent/40 transition-all duration-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`font-mono text-[10px] uppercase tracking-[2px] ${categoryColors[post.category] || 'text-muted'}`}>
                {post.category}
              </span>
              <span className="font-mono text-[10px] text-muted">·</span>
              <span className="font-mono text-[10px] text-muted">{post.readingTime}</span>
            </div>
            <h2 className="font-display text-[15px] font-bold text-text mb-2 group-hover:text-accent transition-colors leading-snug">
              {post.title}
            </h2>
            <p className="font-mono text-[11px] text-muted leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
            <p className="font-mono text-[11px] text-muted mt-3">
              {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="font-mono text-[12px] text-muted text-center py-12">
          No articles in this category yet.
        </p>
      )}
    </div>
  );
}
