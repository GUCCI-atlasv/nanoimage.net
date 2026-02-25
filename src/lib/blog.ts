export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: 'How-to' | 'Privacy' | 'Tips' | 'Comparisons';
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  relatedTools: string[];
  relatedArticles: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'compress-image-to-200kb',
    title: 'How to Compress an Image to 200KB Online — Free & Private',
    metaTitle: 'How to Compress an Image to 200KB Online — Free & Private',
    metaDescription: 'Learn how to compress any image to under 200KB without losing visible quality. Free browser-based tool, no upload required. Step-by-step guide.',
    excerpt: 'Many websites and apps have strict file size limits. This guide shows you the easiest ways to compress an image to 200KB — without installing any software.',
    category: 'How-to',
    publishedAt: '2026-02-20',
    updatedAt: '2026-02-20',
    readingTime: '5 min',
    relatedTools: ['compress-image', 'compress-image-to-100kb', 'resize-image'],
    relatedArticles: ['image-privacy-online-tools', 'resize-images-for-platforms'],
  },
  {
    slug: 'image-privacy-online-tools',
    title: 'Do Online Image Tools Store Your Photos? The Truth About Image Privacy',
    metaTitle: 'Do Online Image Tools Store Your Photos? The Truth About Image Privacy',
    metaDescription: 'Find out what really happens when you upload images to online tools. Learn how browser-based tools protect your privacy and how to verify it yourself.',
    excerpt: 'You upload a photo to compress it. But what happened to your image in between? This article explains what actually happens — and how to protect yourself.',
    category: 'Privacy',
    publishedAt: '2026-02-20',
    updatedAt: '2026-02-20',
    readingTime: '5 min',
    relatedTools: ['compress-image', 'resize-image', 'rotate-image'],
    relatedArticles: ['compress-image-to-200kb', 'resize-images-for-platforms'],
  },
  {
    slug: 'resize-images-for-platforms',
    title: 'How to Resize Images for WhatsApp, Email, and Instagram (Free & Easy)',
    metaTitle: 'How to Resize Images for WhatsApp, Email & Instagram — Free Guide',
    metaDescription: 'Get the exact image sizes for WhatsApp, Email, Instagram, Twitter, and more. Free step-by-step guide with a browser-based resize tool.',
    excerpt: 'Every platform has different image requirements. This guide gives you the exact sizes you need — and how to resize quickly without installing any software.',
    category: 'How-to',
    publishedAt: '2026-02-20',
    updatedAt: '2026-02-20',
    readingTime: '5 min',
    relatedTools: ['resize-image', 'compress-image', 'crop-image'],
    relatedArticles: ['compress-image-to-200kb', 'image-privacy-online-tools'],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, count);
}

export const blogCategories = ['How-to', 'Privacy', 'Tips', 'Comparisons'] as const;
