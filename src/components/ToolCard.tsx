'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Tool } from '@/lib/tools';

const categoryDot: Record<string, string> = {
  optimize: 'dot-blue',
  transform: 'dot-yellow',
  effects: 'dot-red',
  decorate: 'dot-yellow',
  convert: 'dot-blue',
  create: 'dot-red',
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const t = useTranslations('tools');

  return (
    <Link href={`/${tool.slug}` as any}>
      <div className="tool-card group h-full">
        <div className="flex items-center gap-2 mb-3">
          <span className={`dot ${categoryDot[tool.category] || 'dot-yellow'}`} />
          <h3 className="font-display text-[13px] font-bold uppercase tracking-[2px] text-text group-hover:text-accent transition-colors">
            {t(`${tool.id}.name`)}
          </h3>
        </div>
        <p className="font-mono text-[11px] text-muted leading-relaxed line-clamp-2">
          {t(`${tool.id}.metaDescription`)}
        </p>
        <div className="mt-4 font-mono text-[11px] text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          Open tool →
        </div>
      </div>
    </Link>
  );
}
