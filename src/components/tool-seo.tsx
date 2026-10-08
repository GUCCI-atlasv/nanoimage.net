'use client'
import { tools } from '@/src/data'
import { useI18n, useLangPath } from '@/src/i18n'

export function ToolFaqSection({ slug }: { slug: string }) {
  const { t } = useI18n()
  const faqs = t.faqs.items[slug]
  if (!faqs || faqs.length === 0) return null
  return (
    <section className="tool-faq-section">
      <h2 className="tool-faq-title">{t.faqs.title}</h2>
      <dl className="tool-faq-list">
        {faqs.map((item, i) => (
          <div key={i} className="tool-faq-item">
            <dt className="tool-faq-question">{item.q}</dt>
            <dd className="tool-faq-answer"><p>{item.a}</p></dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function ToolSeoContent({ slug }: { slug: string }) {
  const { t } = useI18n()
  const lp = useLangPath()
  const tool = tools.find((item) => item.slug === slug)
  const categoryId = tool?.category
  const categoryHub = (t as { categoryHub?: { exploreCategory?: string } }).categoryHub
  const toolSections = (t.faqs as {
    toolSections?: Record<string, {
      introTitle?: string
      desc?: string
      blocks?: { title: string; body: string }[]
      howToTitle?: string
      howTo?: string[]
      refs?: { label: string; url: string }[]
    }>
    relatedToolsTitle?: string
    relatedToolsHints?: Record<string, string>
    relatedToolsHintsByPage?: Record<string, Record<string, string>>
  }).toolSections
  const section = toolSections?.[slug]
  const relatedByPage = (t.faqs as {
    relatedToolsHintsByPage?: Record<string, Record<string, string>>
    relatedToolsHints?: Record<string, string>
    relatedToolsTitle?: string
  }).relatedToolsHintsByPage?.[slug]
  const relatedFallback = (t.faqs as {
    relatedToolsHints?: Record<string, string>
  }).relatedToolsHints
  const relatedEntries = relatedByPage ? Object.entries(relatedByPage) : []
  const toolsData = t.toolsData as Record<string, { name?: string; breadcrumbName?: string; description?: string }>
  const hasContent = Boolean(
    section?.desc || section?.blocks?.length || section?.howTo?.length || relatedEntries.length || categoryId,
  )
  if (!hasContent) return null
  return (
    <section className="tool-seo-content" aria-label={`${toolsData[slug]?.breadcrumbName ?? toolsData[slug]?.name ?? slug} guide`}>
      {section?.introTitle ? <h2>{section.introTitle}</h2> : null}
      {section?.desc ? <p className="tool-seo-lead">{section.desc}</p> : null}
      {section?.blocks?.map((block) => (
        <article className="tool-seo-block" key={block.title}>
          <h2>{block.title}</h2>
          <p>{block.body}</p>
        </article>
      ))}
      {section?.howTo?.length ? (
        <article className="tool-seo-block">
          <h2>{section.howToTitle ?? 'How to Use This Tool'}</h2>
          <ol className="tool-seo-steps">
            {section.howTo.map((step, index) => <li key={`${step}-${index}`}>{step}</li>)}
          </ol>
        </article>
      ) : null}
      {relatedEntries.length ? (
        <article className="tool-seo-block">
          <h2>{(t.faqs as { relatedToolsTitle?: string }).relatedToolsTitle ?? 'Related Image Tools'}</h2>
          <div className="tool-related-grid">
            {relatedEntries.map(([relatedSlug, hint]) => (
              <a href={lp(`/${relatedSlug}`)} key={relatedSlug}>
                <strong>{toolsData[relatedSlug]?.breadcrumbName ?? toolsData[relatedSlug]?.name ?? relatedSlug}</strong>
                <span>{hint || relatedFallback?.[relatedSlug] || tools.find((tool) => tool.slug === relatedSlug)?.description}</span>
              </a>
            ))}
          </div>
        </article>
      ) : null}
      {section?.refs?.length ? (
        <article className="tool-seo-block">
          <h2>References</h2>
          <ul className="tool-seo-reference-list">
            {section.refs.map((ref) => <li key={ref.url}><a href={ref.url} rel="noopener noreferrer" target="_blank">{ref.label}</a></li>)}
          </ul>
        </article>
      ) : null}
      {categoryId ? (
        <article className="tool-seo-block tool-seo-category-link">
          <h2>{categoryHub?.exploreCategory ?? 'Explore more tools in this category'}</h2>
          <p>
            <a href={lp(`/tools/${categoryId}`)}>
              {(t.categories as Record<string, { title?: string }>)?.[categoryId]?.title ?? categoryId}
            </a>
          </p>
        </article>
      ) : null}
    </section>
  )
}
