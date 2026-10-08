'use client'
import { useI18n, useLangPath } from '@/src/i18n'
import { STATIC_TOOL_COPY, staticCopyLang, type StaticToolCopy, type StaticToolSlug } from './content'
import { renderRichText } from './rich-text'

/** Resolve the (en | zh) copy for a static tool in the current UI language. */
export function useStaticToolCopy(slug: StaticToolSlug): { copy: StaticToolCopy; zh: boolean } {
  const { lang } = useI18n()
  const copyLang = staticCopyLang(lang)
  return { copy: STATIC_TOOL_COPY[copyLang][slug], zh: copyLang === 'zh' }
}

/** Hero heading + intro + badges, shared by all static tools. */
export function StaticToolHero({
  prefix,
  copy,
}: {
  prefix: 'gc' | 'wc'
  copy: StaticToolCopy
}) {
  const lp = useLangPath()
  return (
    <section className={`${prefix}-hero`}>
      <h1>{copy.h1}</h1>
      <p>{renderRichText(copy.intro, lp)}</p>
      <div className="st-badges">
        {copy.badges.map((badge) => (
          <span key={badge}>{badge}</span>
        ))}
      </div>
    </section>
  )
}

/** Visible FAQ H2 blocks + related tools (mirrors the production static pages). */
export function StaticToolSeoBlocks({
  prefix,
  copy,
}: {
  prefix: 'gc' | 'wc'
  copy: StaticToolCopy
}) {
  const lp = useLangPath()
  return (
    <>
      {copy.faqs.map((faq) => (
        <section className={`${prefix}-seo-block`} key={faq.q}>
          <h2>{faq.q}</h2>
          <p>{renderRichText(faq.a, lp)}</p>
        </section>
      ))}
      <section className={`${prefix}-seo-block`}>
        <h2>{copy.relatedTitle}</h2>
        <p className={`${prefix}-related`}>
          {copy.related.map((item) => (
            <a href={lp(item.path)} key={item.path}>
              {item.label}
            </a>
          ))}
        </p>
        {copy.guide ? (
          <p className={`${prefix}-related-guide`}>
            {copy.guide.lead} <a href={copy.guide.path}>{copy.guide.label}</a>
          </p>
        ) : null}
      </section>
    </>
  )
}
