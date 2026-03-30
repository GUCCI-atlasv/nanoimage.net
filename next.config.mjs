import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Cloudflare Pages compatibility
  images: {
    unoptimized: true,
  },
  // Enforce trailing slash on all URLs for SEO consistency
  trailingSlash: true,
  async redirects() {
    const locales = ['pt-BR', 'pt-PT', 'es', 'fr', 'ru', 'ja', 'zh-CN', 'zh-TW'];

    // Short-form URLs Google discovered that 404 — redirect to canonical slugs
    const shortSlugRedirects = [
      { from: '/compress', to: '/compress-image/' },
      { from: '/crop', to: '/crop-image/' },
      { from: '/resize', to: '/resize-image/' },
      { from: '/blur', to: '/blur-image/' },
      { from: '/watermark', to: '/watermark-image/' },
    ];

    // Blog consolidation: merged format guide (replaces 3 overlapping format articles)
    const formatTarget = '/blog/image-format-guide-jpg-png-webp-gif/';
    const formatSources = [
      '/blog/jpg-vs-png-vs-webp-image-format-guide',
      '/blog/what-is-webp-image-format',
      '/blog/gif-vs-webp-vs-video-animations',
    ];

    // Blog consolidation: social media sizes (replaces 3 platform-specific articles)
    const sizesTarget = '/blog/social-media-image-sizes-2026/';
    const sizesSources = [
      '/blog/instagram-image-sizes-guide-2026',
      '/blog/linkedin-image-sizes-guide-2026',
      '/blog/resize-images-for-platforms',
    ];

    const redirects = [];

    // Short-form tool slug redirects
    for (const { from, to } of shortSlugRedirects) {
      // EN (no prefix)
      redirects.push({ source: from, destination: to, permanent: true });
      // All other locales
      for (const locale of locales) {
        redirects.push({
          source: `/${locale}${from}`,
          destination: `/${locale}${to}`,
          permanent: true,
        });
      }
    }

    // Blog consolidation redirects — EN (no locale prefix)
    for (const src of [...formatSources, ...sizesSources]) {
      const dest = formatSources.includes(src) ? formatTarget : sizesTarget;
      redirects.push({ source: src, destination: dest, permanent: true });
      redirects.push({ source: `${src}/`, destination: dest, permanent: true });
    }

    // Blog consolidation redirects — all other locales
    for (const locale of locales) {
      for (const src of formatSources) {
        redirects.push({ source: `/${locale}${src}`, destination: `/${locale}${formatTarget}`, permanent: true });
        redirects.push({ source: `/${locale}${src}/`, destination: `/${locale}${formatTarget}`, permanent: true });
      }
      for (const src of sizesSources) {
        redirects.push({ source: `/${locale}${src}`, destination: `/${locale}${sizesTarget}`, permanent: true });
        redirects.push({ source: `/${locale}${src}/`, destination: `/${locale}${sizesTarget}`, permanent: true });
      }
    }

    return redirects;
  },
};

export default withNextIntl(nextConfig);
