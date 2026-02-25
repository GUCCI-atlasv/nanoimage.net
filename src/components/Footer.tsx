'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { tools } from '@/lib/tools';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="relative z-10 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="text-[22px] font-display font-extrabold tracking-tight text-text">
              nano<span className="text-accent">image</span>
            </span>
            <p className="font-mono text-[11px] text-muted mt-3 tracking-wide">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Tools Column 1 */}
          <div>
            <p className="font-mono text-[11px] text-muted uppercase tracking-[2px] mb-4 font-bold">
              {t('footer.tools')}
            </p>
            <ul className="space-y-2">
              {tools.slice(0, 5).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}` as any}
                    className="font-mono text-[11px] text-muted hover:text-accent transition-colors"
                  >
                    {t(`tools.${tool.id}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Column 2 */}
          <div>
            <p className="font-mono text-[11px] text-muted uppercase tracking-[2px] mb-4 font-bold">
              {t('footer.effects')}
            </p>
            <ul className="space-y-2">
              {tools.slice(5, 10).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}` as any}
                    className="font-mono text-[11px] text-muted hover:text-accent transition-colors"
                  >
                    {t(`tools.${tool.id}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Column 3 + Blog */}
          <div>
            <p className="font-mono text-[11px] text-muted uppercase tracking-[2px] mb-4 font-bold">
              {t('footer.more')}
            </p>
            <ul className="space-y-2">
              {tools.slice(10).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}` as any}
                    className="font-mono text-[11px] text-muted hover:text-accent transition-colors"
                  >
                    {t(`tools.${tool.id}.name`)}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-border/50">
                <Link
                  href="/blog"
                  className="font-mono text-[11px] text-muted hover:text-accent transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-mono text-[11px] text-muted">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="font-mono text-[11px] text-muted">
            100% client-side · no uploads · no tracking
          </p>
        </div>
      </div>
    </footer>
  );
}
