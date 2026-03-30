import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/favicon.ico', '/_next/', '/api/'],
    },
    sitemap: 'https://nanoimage.net/sitemap.xml',
  };
}
