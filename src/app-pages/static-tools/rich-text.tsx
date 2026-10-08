'use client'
import type { ReactNode } from 'react'

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g

/**
 * Minimal inline renderer for the copy in content.ts:
 * **bold**, *italic*, `code`, [label](/path). Internal paths are run through `lp`
 * (locale prefix) except /blog/* — blog posts are English-only.
 */
export function renderRichText(text: string, lp: (path: string) => string): ReactNode[] {
  const nodes: ReactNode[] = []
  let last = 0
  let i = 0
  for (const match of text.matchAll(TOKEN)) {
    const token = match[0]
    const index = match.index ?? 0
    if (index > last) nodes.push(text.slice(last, index))
    if (token.startsWith('**')) {
      nodes.push(<strong key={i}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('*')) {
      nodes.push(<em key={i}>{token.slice(1, -1)}</em>)
    } else if (token.startsWith('`')) {
      nodes.push(<code key={i}>{token.slice(1, -1)}</code>)
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link) {
        const [, label, href] = link
        const target = href.startsWith('/') && !href.startsWith('/blog') ? lp(href) : href
        nodes.push(
          <a href={target} key={i}>
            {label}
          </a>,
        )
      }
    }
    last = index + token.length
    i += 1
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}
