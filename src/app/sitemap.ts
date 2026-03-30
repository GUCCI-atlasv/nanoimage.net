import type { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';
import { blogPosts } from '@/lib/blog';

const baseUrl = 'https://nanoimage.net';
const locales = ['en', 'pt-BR', 'pt-PT', 'es', 'fr', 'ru', 'ja', 'zh-CN', 'zh-TW'] as const;

// hreflang mapping: zh-CN → zh-Hans, zh-TW → zh-Hant per Google standard
const hreflangMap: Record<string, string> = {
  'zh-CN': 'zh-Hans',
  'zh-TW': 'zh-Hant',
};

function buildAlternates(path: string): Record<string, string> {
  // Normalize: ensure path ends with '/'
  const normalizedPath = path.endsWith('/') ? path : `${path}/`;
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    const hreflang = hreflangMap[locale] ?? locale;
    languages[hreflang] = locale === 'en' ? `${baseUrl}${normalizedPath}` : `${baseUrl}/${locale}${normalizedPath}`;
  }
  languages['x-default'] = `${baseUrl}${normalizedPath}`;
  return languages;
}

function buildMultiLocaleEntries(
  path: string,
  opts: { lastModified: Date; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number },
): MetadataRoute.Sitemap {
  // Normalize: ensure path ends with '/'
  const normalizedPath = path.endsWith('/') ? path : `${path}/`;
  const alternates = { languages: buildAlternates(normalizedPath) };
  return locales.map((locale) => ({
    url: locale === 'en' ? `${baseUrl}${normalizedPath}` : `${baseUrl}/${locale}${normalizedPath}`,
    lastModified: opts.lastModified,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries = buildMultiLocaleEntries('/', {
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  const toolEntries = tools.flatMap((tool) =>
    buildMultiLocaleEntries(`/${tool.slug}`, {
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: tool.priority === 'P0' ? 0.9 : tool.priority === 'P1' ? 0.8 : 0.7,
    }),
  );

  const blogIndexEntries = buildMultiLocaleEntries('/blog', {
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  const blogPostEntries = blogPosts.flatMap((post) =>
    buildMultiLocaleEntries(`/blog/${post.slug}`, {
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
  );

  return [...homeEntries, ...toolEntries, ...blogIndexEntries, ...blogPostEntries];
}
