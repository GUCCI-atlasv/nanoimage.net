'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getRelatedTools } from '@/lib/tools';
import { FAQJsonLd, HowToJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

interface ToolPageLayoutProps {
  toolId: string;
  children: React.ReactNode;
}

export default function ToolPageLayout({ toolId, children }: ToolPageLayoutProps) {
  const t = useTranslations();
  const relatedTools = getRelatedTools(toolId);

  const faqKeys = ['q1', 'q2', 'q3', 'q4'] as const;
  const howToSteps = ['step1', 'step2', 'step3'] as const;

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-10">
      <FAQJsonLd toolId={toolId} />
      <HowToJsonLd toolId={toolId} />
      <BreadcrumbJsonLd toolId={toolId} />

      {/* H1 */}
      <h1 className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold text-text mb-4 tracking-tight break-words">
        {t(`tools.${toolId}.h1`)}
      </h1>

      {/* Description */}
      <p className="font-mono text-[13px] text-muted mb-8 leading-relaxed max-w-2xl">
        {t(`tools.${toolId}.description`)}
      </p>

      {/* Tool Component */}
      <div className="mb-16">
        {children}
      </div>

      {/* How to Use */}
      <section className="mb-16">
        <h2 className="font-display text-xl font-bold text-text mb-6 uppercase tracking-[2px] flex items-center gap-2">
          <span className="dot dot-blue" />
          {t('common.howToUse')}
        </h2>
        <ol className="space-y-4">
          {howToSteps.map((step, index) => {
            const stepKey = `tools.${toolId}.howToUse.${step}`;
            const stepText = t(stepKey);
            // Skip if translation is missing (returns the key path)
            if (stepText === stepKey || stepText.includes('.howToUse.')) {
              return null;
            }
            return (
              <li key={step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-surface-hover border border-border text-accent rounded-md flex items-center justify-center font-mono font-bold text-sm">
                  {index + 1}
                </div>
                <p className="font-mono text-[12px] text-muted pt-2 leading-relaxed">{stepText}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="font-display text-xl font-bold text-text mb-6 uppercase tracking-[2px] flex items-center gap-2">
          <span className="dot dot-yellow" />
          {t('common.faq')}
        </h2>
        <div className="space-y-3">
          {faqKeys.map((key) => {
            const qKey = `tools.${toolId}.faq.${key}`;
            const aKey = `tools.${toolId}.faq.${key.replace('q', 'a')}`;
            const question = t(qKey);
            const answer = t(aKey);
            // next-intl returns the key path when translation is missing
            if (question === qKey || question.includes('.faq.') || answer === aKey || answer.includes('.faq.')) {
              return null;
            }
            return (
              <details key={key} className="group panel-card cursor-pointer">
                <summary className="font-display text-[13px] font-bold text-text list-none flex items-center justify-between uppercase tracking-wider">
                  {question}
                  <svg className="w-4 h-4 text-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="font-mono text-[12px] text-muted mt-3 leading-relaxed">{answer}</p>
              </details>
            );
          })}
        </div>
      </section>

      {/* Related Tools */}
      <section>
        <h2 className="font-display text-xl font-bold text-text mb-6 uppercase tracking-[2px] flex items-center gap-2">
          <span className="dot dot-red" />
          {t('common.relatedTools')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}` as any}
              className="tool-card group flex flex-col gap-2"
            >
              <span className="text-2xl" style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}>{tool.icon}</span>
              <h3 className="font-display text-[13px] font-bold text-text group-hover:text-accent transition-colors uppercase tracking-[2px]">
                {t(`tools.${tool.id}.name`)}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
