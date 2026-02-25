'use client';

import { useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import type { BlogPost } from '@/lib/blog';
import { getRelatedPosts } from '@/lib/blog';
import { tools } from '@/lib/tools';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function parseMarkdown(md: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  let html = md;

  // Tables: convert markdown tables to HTML
  html = html.replace(/(?:^|\n)((?:\|.*\|[ \t]*\n)+)/g, (_, tableBlock: string) => {
    const rows = tableBlock.trim().split('\n').filter((r: string) => r.trim());
    if (rows.length < 2) return _;
    const headerCells = rows[0].split('|').filter((c: string) => c.trim()).map((c: string) => c.trim());
    const isSeparator = (row: string) => /^\|[\s\-:|]+\|$/.test(row.trim());
    const dataStart = isSeparator(rows[1]) ? 2 : 1;

    let table = '<div class="overflow-x-auto my-6"><table class="w-full font-mono text-[11px]"><thead><tr>';
    headerCells.forEach((c: string) => { table += `<th class="text-left text-accent uppercase tracking-wider px-3 py-2 border-b border-border">${c}</th>`; });
    table += '</tr></thead><tbody>';
    for (let i = dataStart; i < rows.length; i++) {
      const cells = rows[i].split('|').filter((c: string) => c.trim()).map((c: string) => c.trim());
      table += '<tr>';
      cells.forEach((c: string) => { table += `<td class="px-3 py-2 text-muted border-b border-border/50">${c}</td>`; });
      table += '</tr>';
    }
    table += '</tbody></table></div>';
    return '\n' + table + '\n';
  });

  // Headings
  html = html.replace(/^### (.+)$/gm, (_, text: string) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    toc.push({ id, text, level: 3 });
    return `<h3 id="${id}" class="font-display text-[15px] font-bold text-text mt-8 mb-3 tracking-tight">${text}</h3>`;
  });
  html = html.replace(/^## (.+)$/gm, (_, text: string) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    toc.push({ id, text, level: 2 });
    return `<h2 id="${id}" class="font-display text-lg font-bold text-text mt-10 mb-4 tracking-tight">${text}</h2>`;
  });

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-text font-semibold">$1</strong>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent hover:underline">$1</a>');

  // Ordered lists
  html = html.replace(/(?:^|\n)((?:\d+\. .+\n?)+)/g, (_, block: string) => {
    const items = block.trim().split('\n').map((l: string) => l.replace(/^\d+\.\s*/, '').trim());
    return '\n<ol class="list-decimal list-inside space-y-1 my-4 font-mono text-[12px] text-muted leading-relaxed">' +
      items.map((i: string) => `<li>${i}</li>`).join('') + '</ol>\n';
  });

  // Unordered lists
  html = html.replace(/(?:^|\n)((?:- .+\n?)+)/g, (_, block: string) => {
    const items = block.trim().split('\n').map((l: string) => l.replace(/^-\s*/, '').trim());
    return '\n<ul class="list-disc list-inside space-y-1 my-4 font-mono text-[12px] text-muted leading-relaxed">' +
      items.map((i: string) => `<li>${i}</li>`).join('') + '</ul>\n';
  });

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="border-border my-8" />');

  // Paragraphs
  html = html.split('\n\n').map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<')) return trimmed;
    return `<p class="font-mono text-[12px] text-muted leading-relaxed my-4">${trimmed.replace(/\n/g, '<br />')}</p>`;
  }).join('\n');

  return { html, toc };
}

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://www.nanoimage.net/blog/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] text-muted uppercase tracking-[2px]">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-colors"
        aria-label="Share on X/Twitter"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-colors"
        aria-label="Share on Facebook"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
      </a>
      <button
        onClick={handleCopy}
        className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-colors"
        aria-label="Copy link"
      >
        {copied ? (
          <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        )}
      </button>
    </div>
  );
}

export default function BlogArticleClient({ post, content }: { post: BlogPost; content: string }) {
  const { html, toc } = useMemo(() => parseMarkdown(content), [content]);
  const relatedPosts = getRelatedPosts(post.slug, 3);
  const relatedTools = tools.filter((t) => post.relatedTools.includes(t.slug));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: 'NanoImage' },
    publisher: { '@type': 'Organization', name: 'NanoImage', url: 'https://www.nanoimage.net' },
    description: post.metaDescription,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.nanoimage.net/blog/${post.slug}` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nanoimage.net' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.nanoimage.net/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.nanoimage.net/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        {/* Breadcrumb */}
        <nav className="font-mono text-[11px] text-muted mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="mx-2">→</span>
          <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
          <span className="mx-2">→</span>
          <span className="text-text">{post.title}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          {/* Main content */}
          <article>
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[2px] text-accent">{post.category}</span>
                <span className="font-mono text-[10px] text-muted">·</span>
                <span className="font-mono text-[10px] text-muted">{post.readingTime}</span>
                <span className="font-mono text-[10px] text-muted">·</span>
                <time className="font-mono text-[10px] text-muted" dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </time>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-text tracking-tight leading-tight">
                {post.title}
              </h1>
            </header>

            <div
              className="prose-nano"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-border">
              <ShareButtons title={post.title} slug={post.slug} />
            </div>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h2 className="font-display text-[13px] font-bold uppercase tracking-[2px] text-text mb-4">Related Tools</h2>
                <div className="flex flex-wrap gap-3">
                  {relatedTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/${tool.slug}`}
                      className="panel-card hover:border-accent/40 transition-all inline-flex items-center gap-2"
                    >
                      <span>{tool.icon}</span>
                      <span className="font-mono text-[11px] text-text">{tool.slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h2 className="font-display text-[13px] font-bold uppercase tracking-[2px] text-text mb-4">Related Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/blog/${rp.slug}`}
                      className="panel-card hover:border-accent/40 transition-all group"
                    >
                      <span className="font-mono text-[10px] text-accent uppercase tracking-[2px]">{rp.category}</span>
                      <h3 className="font-display text-[13px] font-bold text-text mt-1 group-hover:text-accent transition-colors leading-snug">
                        {rp.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* TOC Sidebar */}
          {toc.length > 3 && (
            <aside className="hidden lg:block">
              <div className="sticky top-20">
                <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted mb-4">On This Page</p>
                <nav className="space-y-2">
                  {toc.filter(t => t.level === 2).map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block font-mono text-[11px] text-muted hover:text-accent transition-colors leading-snug"
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
