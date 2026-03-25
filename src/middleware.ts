import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// IP → language mapping (v3.2 complete)
const LANG_MAP: Record<string, string> = {
  // Portuguese (Brazil)
  BR: 'pt-BR',
  // Portuguese (Portugal + African countries)
  PT: 'pt-PT', AO: 'pt-PT', MZ: 'pt-PT', CV: 'pt-PT', TL: 'pt-PT', GW: 'pt-PT', ST: 'pt-PT',
  // Spanish
  MX: 'es', ES: 'es', AR: 'es', CO: 'es', CL: 'es',
  PE: 'es', VE: 'es', EC: 'es', BO: 'es', PY: 'es',
  UY: 'es', CR: 'es', PA: 'es', GT: 'es', HN: 'es',
  SV: 'es', NI: 'es', DO: 'es', CU: 'es', PR: 'es',
  // French
  FR: 'fr', BE: 'fr', LU: 'fr', SN: 'fr', CI: 'fr',
  CM: 'fr', ML: 'fr', BF: 'fr', NE: 'fr', TG: 'fr',
  BJ: 'fr', GA: 'fr', DZ: 'fr', MA: 'fr', TN: 'fr',
  // Russian (excluding Ukraine UA — stays on English by default)
  RU: 'ru', KZ: 'ru', BY: 'ru', KG: 'ru', TJ: 'ru',
  AM: 'ru', AZ: 'ru', GE: 'ru', UZ: 'ru', TM: 'ru',
  // Japanese
  JP: 'ja',
  // Simplified Chinese (overseas Chinese communities; CN mainland excluded)
  MY: 'zh-CN', SG: 'zh-CN',
  // Traditional Chinese
  TW: 'zh-TW', HK: 'zh-TW', MO: 'zh-TW',
};

const SUPPORTED_LOCALES = new Set(['en', 'pt-BR', 'pt-PT', 'es', 'fr', 'ru', 'ja', 'zh-CN', 'zh-TW']);

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip GeoIP redirect if a locale prefix is already present
  const firstSegment = pathname.split('/')[1];
  if (SUPPORTED_LOCALES.has(firstSegment)) {
    return intlMiddleware(req);
  }

  // Check saved language preference from cookie
  const cookieVal = req.cookies.get('nano_lang')?.value;
  if (cookieVal && SUPPORTED_LOCALES.has(cookieVal) && cookieVal !== 'en') {
    const url = req.nextUrl.clone();
    url.pathname = `/${cookieVal}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url, 302);
  }

  // GeoIP detection via Cloudflare header
  const country = req.headers.get('cf-ipcountry') ?? '';
  const targetLocale = LANG_MAP[country];
  if (targetLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${targetLocale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url, 302);
  }

  // Default: let next-intl handle the rest
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(en|pt-BR|pt-PT|es|fr|ru|ja|zh-CN|zh-TW)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
