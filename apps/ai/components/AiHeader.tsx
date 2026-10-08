'use client'
import { usePathname } from 'next/navigation'
import { features } from '@/lib/features'

const MAIN_SITE = 'https://nanoimage.net'

export function AiHeader() {
  const pathname = usePathname()

  return (
    <header className="ai-header">
      <a className="logo" href="/" aria-label="AI NanoImage Home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/brand/logo/nanoimage-logo.svg"
          alt="NanoImage"
          width={120}
          height={28}
        />
        <span className="logo-badge">AI</span>
      </a>

      <nav aria-label="Primary navigation">
        {features.slice(0, 3).map((f) => (
          <a
            key={f.slug}
            href={`/${f.slug}`}
            className={`nav-link${pathname === `/${f.slug}` ? ' active' : ''}`}
          >
            {f.emoji} {f.name}
          </a>
        ))}
        <a href="/tools" className={`nav-link${pathname === '/tools' ? ' active' : ''}`}>
          All tools
        </a>
      </nav>

      <a
        href={MAIN_SITE}
        className="main-site-link"
        target="_blank"
        rel="noopener"
        title="Back to main nanoimage.net"
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 1.75c.74 0 1.44.17 2.07.46L3.21 9.07A5.25 5.25 0 0 1 8 2.75Zm0 10.5a5.24 5.24 0 0 1-2.07-.46l6.86-6.86c.3.63.46 1.33.46 2.07A5.25 5.25 0 0 1 8 13.25Z" fill="currentColor"/>
        </svg>
        nanoimage.net
      </a>
    </header>
  )
}
