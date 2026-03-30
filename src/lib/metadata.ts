const baseUrl = 'https://nanoimage.net';

const locales = ['en', 'pt-BR', 'pt-PT', 'es', 'fr', 'ru', 'ja', 'zh-CN', 'zh-TW'] as const;

// Google 标准 BCP 47 映射
const hreflangMap: Record<string, string> = {
  'zh-CN': 'zh-Hans',
  'zh-TW': 'zh-Hant',
};

/**
 * 为给定路径和当前语言生成 alternates 对象（含 canonical + 全语言 hreflang）。
 * 在每个页面的 generateMetadata 中调用，确保 Google 能识别多语言变体关系。
 * 所有 URL 均为 non-www + https + trailing slash，与 trailingSlash: true 策略一致。
 */
export function buildAlternates(path: string, locale: string) {
  // Normalize: ensure path ends with '/'
  const normalizedPath = path.endsWith('/') ? path : `${path}/`;

  const languages: Record<string, string> = {};

  for (const loc of locales) {
    const hreflang = hreflangMap[loc] ?? loc;
    languages[hreflang] = loc === 'en' ? `${baseUrl}${normalizedPath}` : `${baseUrl}/${loc}${normalizedPath}`;
  }

  // x-default 指向英文版
  languages['x-default'] = `${baseUrl}${normalizedPath}`;

  // canonical 根据当前 locale 指向对应语言版本
  const canonical = locale === 'en' ? `${baseUrl}${normalizedPath}` : `${baseUrl}/${locale}${normalizedPath}`;

  return { canonical, languages };
}
