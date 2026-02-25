import type { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';
import { blogPosts } from '@/lib/blog';

const baseUrl = 'https://www.nanoimage.net';
const locales = ['en', 'pt-BR', 'pt-PT', 'es', 'fr', 'ru'] as const;

function buildAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = locale === 'en' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;
  }
  languages['x-default'] = `${baseUrl}${path}`;
  return languages;
}

function buildMultiLocaleEntries(
  path: string,
  opts: { lastModified: Date; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number },
): MetadataRoute.Sitemap {
  const alternates = { languages: buildAlternates(path) };
  return locales.map((locale) => ({
    url: locale === 'en' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`,
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
