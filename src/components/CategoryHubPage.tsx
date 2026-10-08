'use client'
import { categories, tools } from '@/src/data'
import {
  CATEGORY_HUB_BANNERS,
  getCategoryHub,
  getCategoryHubBlogGuides,
  TOOL_MENU_EXCLUDED_SLUGS,
} from '@/lib/category-hub'
import { useI18n, useLangPath } from '@/src/i18n'
import { Breadcrumbs } from '@/src/shared/breadcrumbs'
import { HomeIcon, toolIconMap, categoryIconMap } from '@/src/shared/tool-icons'

function renderHubMarkdown(text: string, lp: (path: string) => string) {
  const blocks = text.split(/\n(?=## )/).filter(Boolean)
  return blocks.map((block, blockIndex) => {
    const lines = block.trim().split('\n')
    const heading = lines[0]?.startsWith('## ') ? lines[0].replace(/^## /, '') : null
    const body = heading ? lines.slice(1).join('\n').trim() : block.trim()
    const paragraphs = body.split(/\n\n+/).filter(Boolean)
    return (
      <article className="category-hub-section" key={`${heading ?? 'intro'}-${blockIndex}`}>
        {heading ? <h2>{heading}</h2> : null}
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{renderInlineLinks(paragraph, lp)}</p>
        ))}
      </article>
    )
  })
}

function renderInlineLinks(text: string, lp: (path: string) => string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (!match) return part
    const [, label, href] = match
    const dest = href.startsWith('http') ? href : lp(href)
    return (
      <a href={dest} key={`${href}-${index}`}>
        {label}
      </a>
    )
  })
}

export function CategoryHubPage({ categoryId }: { categoryId: string }) {
  const { t, lang } = useI18n()
  const lp = useLangPath()
  const cat = categories.find((c) => c.id === categoryId)
  const hub = getCategoryHub(lang, categoryId)
  const catTools = tools.filter(
    (tool) => tool.category === categoryId && !TOOL_MENU_EXCLUDED_SLUGS.has(tool.slug) && !tool.deprecated,
  )
  if (!cat || !hub) return null

  const hubUi = (t as { categoryHub?: Record<string, string> }).categoryHub ?? {}
  const blogGuides = getCategoryHubBlogGuides(hub.blogGuideSlugs, lang)
  const bannerSrc = CATEGORY_HUB_BANNERS[categoryId as keyof typeof CATEGORY_HUB_BANNERS]

  return (
    <section className="category-hub">
      <Breadcrumbs current={hub.seo.h1} navigate={() => {}} />

      {bannerSrc ? (
        <div className="category-hub-banner">
          <img
            src={bannerSrc}
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>
      ) : null}

      <div className="category-hub-hero">
        <h1>{hub.seo.h1}</h1>
        <p className="category-hub-lead">{hub.seo.hero}</p>
        <ul className="category-hub-trust" aria-label="Trust highlights">
          <li><HomeIcon name="bolt" /> {hubUi.trustFree ?? t.trust.bar100Free}</li>
          <li><HomeIcon name="lock" /> {hubUi.trustPrivate ?? t.trust.barPrivateDesc}</li>
          <li><HomeIcon name="sparkle" /> {hubUi.trustNoSignup ?? 'No signup required'}</li>
          <li><HomeIcon name="device" /> {hubUi.trustBrowser ?? t.trust.tagBrowser}</li>
        </ul>
      </div>

      <div className="category-hub-tools">
        <h2>{hubUi.toolsTitle ?? 'Free tools in this category'}</h2>
        <ul className="category-landing-list">
          {catTools.map((tool) => (
            <li key={tool.slug}>
              <a href={lp(`/${tool.slug}`)} className="category-landing-card">
                <span className={`mini-icon ${cat.tone}`}>
                  <HomeIcon name={toolIconMap[tool.slug] ?? categoryIconMap[cat.id]} />
                </span>
                <div>
                  <strong>{t.toolsData[tool.slug]?.name ?? tool.name}</strong>
                  <p>{t.toolsData[tool.slug]?.description ?? tool.description}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="category-hub-intro">
        {renderHubMarkdown(hub.introMarkdown, lp)}
      </div>

      <section className="category-hub-scenarios">
        <h2>{hubUi.scenariosTitle ?? 'Which tool should I use?'}</h2>
        <ul>
          {hub.scenarios.map((item) => {
            const tool = tools.find((entry) => entry.slug === item.toolSlug)
            const toolName = t.toolsData[item.toolSlug]?.name ?? tool?.name ?? item.toolSlug
            return (
              <li key={item.toolSlug}>
                <span>{item.question}</span>
                <a href={lp(`/${item.toolSlug}`)}>{toolName}</a>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="category-hub-how">
        <h2>{hubUi.howTitle ?? 'How NanoImage works'}</h2>
        <ol>
          {hub.howItWorks.map((step, index) => (
            <li key={index}>
              <span className="category-hub-step-num">{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {hub.relatedCategoryIds.length ? (
        <section className="category-hub-related">
          <h2>{hubUi.relatedTitle ?? 'Related categories'}</h2>
          <div className="category-hub-related-grid">
            {hub.relatedCategoryIds.map((id) => {
              const related = categories.find((c) => c.id === id)
              if (!related) return null
              const relatedT = t.categories[id]
              return (
                <a key={id} href={lp(`/tools/${id}`)} className="category-hub-related-card">
                  <span className={`mini-icon ${related.tone}`}>
                    <HomeIcon name={categoryIconMap[id] ?? 'sparkle'} />
                  </span>
                  <strong>{relatedT?.title ?? related.title}</strong>
                  <p>{relatedT?.description ?? related.description}</p>
                </a>
              )
            })}
          </div>
        </section>
      ) : null}

      {blogGuides.length ? (
        <section className="category-hub-guides">
          <h2>{hubUi.guidesTitle ?? 'Guides from the NanoImage blog'}</h2>
          <ul>
            {blogGuides.map((post) => (
              <li key={post.slug}>
                <a href={lp(`/blog/${post.slug}`)}>
                  <strong>{post.title}</strong>
                  <span>{post.excerpt}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="category-hub-faq">
        <h2>{t.faqs.title}</h2>
        <dl>
          {hub.faqs.map((item, i) => (
            <div key={i} className="tool-faq-item">
              <dt>{item.q}</dt>
              <dd><p>{item.a}</p></dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="category-hub-all-tools">
        <a href={lp('/#tools')}>{hubUi.allToolsLink ?? 'Browse all free image tools on NanoImage →'}</a>
      </p>
    </section>
  )
}
