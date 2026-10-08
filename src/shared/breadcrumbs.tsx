'use client'
import { useI18n, useLangPath } from '@/src/i18n'

export function Breadcrumbs({
  current,
  categoryId,
}: {
  current: string
  categoryId?: string
  navigate: (to: string) => void
}) {
  const { t } = useI18n()
  const lp = useLangPath()
  const toolsHref = categoryId ? lp(`/tools/${categoryId}`) : lp('/#tools')
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <a href={lp('/')}>{t.breadcrumbs.home}</a>
      <span>/</span>
      <a href={toolsHref}>{t.breadcrumbs.tools}</a>
      <span>/</span>
      <span>{current}</span>
    </nav>
  )
}

