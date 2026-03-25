import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Cloudflare Pages compatibility
  images: {
    unoptimized: true,
  },
  async redirects() {
    const locales = ['pt-BR', 'pt-PT', 'es', 'fr', 'ru', 'ja', 'zh-CN', 'zh-TW'];

    // Short-form URLs Google discovered that 404 — redirect to canonical slugs
    const shortSlugRedirects = [
      { from: '/compress', to: '/compress-image' },
      { from: '/crop', to: '/crop-image' },
      { from: '/resize', to: '/resize-image' },
      { from: '/blur', to: '/blur-image' },
      { from: '/watermark', to: '/watermark-image' },
    ];

    const redirects = [];

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

    return redirects;
  },
};

export default withNextIntl(nextConfig);
