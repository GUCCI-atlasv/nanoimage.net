'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';
import type { Locale } from '@/i18n/routing';

const LANGUAGES: { code: Locale; flag: string; label: string; short: string }[] = [
  { code: 'en', flag: '\u{1F1FA}\u{1F1F8}', label: 'English', short: 'EN' },
  { code: 'pt-BR', flag: '\u{1F1E7}\u{1F1F7}', label: 'Portugu\u00eas (Brasil)', short: 'PT-BR' },
  { code: 'pt-PT', flag: '\u{1F1F5}\u{1F1F9}', label: 'Portugu\u00eas (Portugal)', short: 'PT-PT' },
  { code: 'es', flag: '\u{1F1EA}\u{1F1F8}', label: 'Espa\u00f1ol', short: 'ES' },
  { code: 'fr', flag: '\u{1F1EB}\u{1F1F7}', label: 'Fran\u00e7ais', short: 'FR' },
  { code: 'ru', flag: '\u{1F1F7}\u{1F1FA}', label: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439', short: 'RU' },
  { code: 'ja', flag: '\u{1F1EF}\u{1F1F5}', label: '\u65E5\u672C\u8A9E', short: 'JA' },
  { code: 'zh-CN', flag: '\u{1F1E8}\u{1F1F3}', label: '\u7B80\u4F53\u4E2D\u6587', short: 'ZH-CN' },
  { code: 'zh-TW', flag: '\u{1F1F9}\u{1F1FC}', label: '\u7E41\u9AD4\u4E2D\u6587', short: 'ZH-TW' },
];

function setLangPreference(locale: string) {
  try {
    localStorage.setItem('nano_lang', locale);
  } catch {}
  document.cookie = `nano_lang=${locale};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
}

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(newLocale: Locale) {
    setLangPreference(newLocale);
    setLangOpen(false);
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-[22px] font-display font-extrabold tracking-tight text-text">
              nano<span className="text-accent">image</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="font-mono text-[11px] text-muted hover:text-accent uppercase tracking-[2px] transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              href="/#tools"
              className="font-mono text-[11px] text-muted hover:text-accent uppercase tracking-[2px] transition-colors"
            >
              {t('allTools')}
            </Link>
            <Link
              href="/blog"
              className="font-mono text-[11px] text-muted hover:text-accent uppercase tracking-[2px] transition-colors"
            >
              {t('blog')}
            </Link>

            {/* Desktop Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 font-mono text-[11px] text-muted hover:text-accent uppercase tracking-[2px] transition-colors"
                aria-label="Switch language"
              >
                <span>{currentLang.flag}</span>
                <span>{currentLang.short}</span>
                <svg
                  className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-bg border border-border rounded-lg shadow-xl py-1 z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLocale(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                        locale === lang.code
                          ? 'text-accent bg-accent/10'
                          : 'text-muted hover:text-text hover:bg-border/30'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="flex-1">{lang.label}</span>
                      {locale === lang.code && (
                        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="font-mono text-[11px] text-muted tracking-[2px] hidden lg:block">
              Free · Private · Instant
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-2 pt-4 space-y-3">
            <Link
              href="/"
              className="block font-mono text-[11px] text-muted hover:text-accent uppercase tracking-[2px] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('home')}
            </Link>
            <Link
              href="/#tools"
              className="block font-mono text-[11px] text-muted hover:text-accent uppercase tracking-[2px] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('allTools')}
            </Link>
            <Link
              href="/blog"
              className="block font-mono text-[11px] text-muted hover:text-accent uppercase tracking-[2px] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('blog')}
            </Link>

            {/* Mobile Language Switcher */}
            <div className="pt-3 border-t border-border">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLocale(lang.code)}
                    className={`flex-shrink-0 flex items-center gap-1 px-2 py-1.5 rounded-md text-[10px] font-mono transition-colors ${
                      locale === lang.code
                        ? 'bg-accent/20 text-accent'
                        : 'text-muted hover:text-text hover:bg-border/30'
                    }`}
                    title={lang.label}
                  >
                    <span>{lang.flag}</span>
                    <span className="tracking-wider">{lang.short}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
