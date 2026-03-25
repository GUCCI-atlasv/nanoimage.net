import { useTranslations } from 'next-intl';
import ToolCard from '@/components/ToolCard';
import { tools } from '@/lib/tools';
import { blogPosts } from '@/lib/blog';
import { WebApplicationJsonLd, HomeFAQJsonLd, WebSiteJsonLd } from '@/components/JsonLd';
import { Link } from '@/i18n/routing';

export default function HomePage() {
  return <HomePageContent />;
}

function HomePageContent() {
  const t = useTranslations();
  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

  return (
    <>
      <WebApplicationJsonLd />
      <WebSiteJsonLd />
      <HomeFAQJsonLd />

      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-24 px-6">
        <h1 className="font-display font-extrabold text-[clamp(36px,6vw,80px)] leading-none tracking-[-3px]">
          {t('home.hero.title')}{' '}
          <span className="text-accent">— Zero Fuss</span>
        </h1>
        <p className="font-mono text-[13px] text-muted mt-4 tracking-wider max-w-2xl mx-auto">
          {'// '}{t('home.hero.subtitle')}
        </p>
        <a
          href="#tools"
          className="btn-primary inline-flex items-center gap-2 mt-8"
        >
          {t('home.hero.cta')}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['privacy', 'fast', 'free'] as const).map((feature) => (
            <div key={feature} className="panel-card text-center">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 bg-surface-hover border border-border">
                {feature === 'privacy' && (
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )}
                {feature === 'fast' && (
                  <svg className="w-5 h-5 text-accent3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
                {feature === 'free' && (
                  <svg className="w-5 h-5 text-accent2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
              </div>
              <h3 className="font-display text-[13px] font-bold uppercase tracking-[2px] text-text mb-2">
                {t(`home.features.${feature}.title`)}
              </h3>
              <p className="font-mono text-[11px] text-muted leading-relaxed">
                {t(`home.features.${feature}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text mb-3 tracking-tight">
            {t('home.toolsSection.title')}
          </h2>
          <p className="font-mono text-[12px] text-muted tracking-wide">
            {t('home.toolsSection.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Latest from Blog */}
      <section className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text mb-3 tracking-tight">
            Latest from Blog
          </h2>
          <p className="font-mono text-[12px] text-muted tracking-wide">
            Tips, guides, and best practices for image editing
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="panel-card hover:border-accent/40 transition-all group"
            >
              <span className="font-mono text-[10px] uppercase tracking-[2px] text-accent">{post.category}</span>
              <h3 className="font-display text-[14px] font-bold text-text mt-2 mb-2 group-hover:text-accent transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="font-mono text-[11px] text-muted leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
              <p className="font-mono text-[10px] text-muted mt-3">{post.readingTime}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/blog" className="btn-secondary inline-flex items-center gap-2">
            View All Articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-display text-xl md:text-2xl font-bold text-text mb-4 tracking-tight">
          {t('home.about.title')}
        </h2>
        <p className="font-mono text-[12px] text-muted leading-relaxed">
          {t('home.about.text')}
        </p>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="font-display text-xl md:text-2xl font-bold text-text mb-6 tracking-tight">
          {t('home.faq.title')}
        </h2>
        <div className="space-y-3">
          {faqKeys.map((key) => (
            <details key={key} className="group panel-card cursor-pointer">
              <summary className="font-display text-[13px] font-bold text-text list-none flex items-center justify-between uppercase tracking-wider">
                {t(`home.faq.${key}`)}
                <svg className="w-4 h-4 text-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="font-mono text-[12px] text-muted mt-3 leading-relaxed">
                {t(`home.faq.${key.replace('q', 'a')}`)}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
