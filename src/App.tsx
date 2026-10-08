'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'



import { blogPosts, categories, tools, type BlogPost, type Tool } from './data'
import { useI18n, useLangPath, LANGS, stripLangPrefix, type LangCode } from './i18n'
import { langPath } from '@/lib/i18n-utils'
import { Breadcrumbs } from '@/src/shared/breadcrumbs'
import { CategoryHubPage } from '@/src/components/CategoryHubPage'
import { HomeIcon, HOMEPAGE_EXCLUDED_TOOL_SLUGS, HOME_TOOL_ICON_MAP, toolIconMap, categoryIconMap } from '@/src/shared/tool-icons'



/**
 * Localized names for the exact-size compressor landing pages.
 * These slugs have no per-language `toolsData` / `nav.toolMenu` entries, so
 * without this fallback they render in English on localized pages (flagged in
 * the 2026-07 SEO audit). Reuses the already-translated compressImageHub keys.
 */
function compressVariantName(t: unknown, slug: string): string | undefined {
  const hub = (t as { compressImageHub?: Record<string, { title?: string }> }).compressImageHub
  if (!hub) return undefined
  const key = {
    'compress-image-to-100kb': 'to100',
    'compress-image-to-200kb': 'to200',
    'compress-image-to-500kb': 'to500',
    'compress-image-to-1mb': 'to1m',
  }[slug]
  return key ? hub[key]?.title : undefined
}

/**
 * Localized tool name for nav/menu rendering.
 *
 * The nav used to fall back straight from `nav.toolMenu` to the English
 * `tool.name` in data.ts, skipping `toolsData` — which is fully translated.
 * That rendered "AI Background Remover" / "Object Remover" / "Photo Restore"
 * in English inside the Chinese nav even though zh-CN translations existed.
 * Order: nav.toolMenu → toolsData → compress-hub fallback → English name.
 */
function toolsDataName(t: unknown, slug: string): string | undefined {
  const data = (t as { toolsData?: Record<string, { name?: string }> }).toolsData
  return data?.[slug]?.name
}

function localizeBlogPost(post: BlogPost, lang: LangCode): BlogPost {
  const localized = post.localizations?.[lang] ?? (lang !== 'zh-CN' ? post.localizations?.en : undefined)
  return localized ? { ...post, ...localized } : post
}

function sortBlogPostsByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date))
}

const HOME_FAQ_ENTRIES: Record<LangCode, { latestFromBlog: string; faqTitle: string; items: { q: string; a: string }[] }> = {
  en: {
    latestFromBlog: 'Latest from the blog',
    faqTitle: 'Frequently Asked Questions',
    items: [
      { q: 'Do my images get uploaded to a server?', a: 'No. NanoImage tools run in your browser. Files stay on your device during processing.' },
      { q: 'Is NanoImage free to use?', a: 'Yes. Core tools are free to use with no account required.' },
      { q: 'Which formats are supported?', a: 'Most tools support common formats like JPG, PNG, WebP, and GIF. Some tools support additional formats based on browser support.' },
      { q: 'Can I compress images to exact size limits like 50KB or 100KB?', a: 'Yes. Use the compression tools and target size controls to meet upload limits for forms and portals.' },
      { q: 'Does NanoImage work on mobile?', a: 'Yes. NanoImage is browser-based and works on desktop, tablet, and mobile devices.' },
      { q: 'Do I need to install anything?', a: 'No installation is required. Open the tool in your browser and start processing.' },
      { q: 'Can I process multiple images at once?', a: 'Yes. Batch tools are available for common workflows like compression and format conversion.' },
      { q: 'Does NanoImage include passport photo presets?', a: 'Yes. The Passport Photo Maker includes country-focused presets and print sheet export options.' },
    ],
  },
  'zh-CN': {
    latestFromBlog: '最新博客文章',
    faqTitle: '常见问题',
    items: [
      { q: '图片会被上传到服务器吗？', a: '不会。NanoImage 在浏览器本地处理，文件不会离开您的设备。' },
      { q: 'NanoImage 是免费的吗？', a: '是的，核心工具可免费使用，无需注册。' },
      { q: '支持哪些图片格式？', a: '常见工具支持 JPG、PNG、WebP、GIF 等格式，具体取决于浏览器能力。' },
      { q: '可以压缩到 50KB 或 100KB 这类精确大小吗？', a: '可以，使用目标体积设置即可满足表单上传限制。' },
      { q: '手机上可以用吗？', a: '可以，NanoImage 支持桌面端、平板和手机浏览器。' },
      { q: '需要安装软件吗？', a: '不需要，打开网页即可开始使用。' },
      { q: '支持批量处理吗？', a: '支持，批量压缩与批量转换等常见流程都可以。' },
      { q: '有证件照预设吗？', a: '有，Passport Photo Maker 提供多国家预设和打印版导出。' },
    ],
  },
  'zh-TW': {
    latestFromBlog: '最新部落格文章',
    faqTitle: '常見問題',
    items: [
      { q: '圖片會上傳到伺服器嗎？', a: '不會。NanoImage 在瀏覽器本地處理，檔案不會離開你的裝置。' },
      { q: 'NanoImage 免費嗎？', a: '是的，核心工具可免費使用，無需註冊。' },
      { q: '支援哪些格式？', a: '常見工具支援 JPG、PNG、WebP、GIF 等格式，依瀏覽器能力而定。' },
      { q: '可以壓縮到 50KB、100KB 這種精確大小嗎？', a: '可以，透過目標大小設定即可符合上傳限制。' },
      { q: '手機可以使用嗎？', a: '可以，桌機、平板、手機都能用。' },
      { q: '需要安裝軟體嗎？', a: '不需要，開啟網頁即可使用。' },
      { q: '支援批次處理嗎？', a: '支援，像批次壓縮與批次轉檔都可使用。' },
      { q: '有證件照預設嗎？', a: '有，Passport Photo Maker 提供多國預設與列印版輸出。' },
    ],
  },
  ja: {
    latestFromBlog: '最新ブログ記事',
    faqTitle: 'よくある質問',
    items: [
      { q: '画像はサーバーにアップロードされますか？', a: 'いいえ。NanoImage はブラウザ内で処理し、ファイルは端末外に出ません。' },
      { q: 'NanoImage は無料ですか？', a: 'はい。主要ツールは無料で、アカウント登録も不要です。' },
      { q: '対応フォーマットは？', a: 'JPG、PNG、WebP、GIF などに対応し、詳細はブラウザ仕様に依存します。' },
      { q: '50KB / 100KB などの指定サイズに圧縮できますか？', a: 'できます。目標サイズ設定でフォーム要件に合わせられます。' },
      { q: 'スマホでも使えますか？', a: 'はい。デスクトップ、タブレット、スマホで利用できます。' },
      { q: 'インストールは必要ですか？', a: '不要です。ブラウザで開いてすぐ使えます。' },
      { q: '一括処理はできますか？', a: 'はい。一括圧縮や一括変換に対応しています。' },
      { q: '証明写真プリセットはありますか？', a: 'あります。Passport Photo Maker に国別プリセットと印刷シート機能があります。' },
    ],
  },
  ko: {
    latestFromBlog: '최신 블로그 글',
    faqTitle: '자주 묻는 질문',
    items: [
      { q: '이미지가 서버로 업로드되나요?', a: '아니요. NanoImage는 브라우저에서 처리하며 파일은 기기를 벗어나지 않습니다.' },
      { q: 'NanoImage는 무료인가요?', a: '네. 핵심 도구는 무료이며 회원가입이 필요 없습니다.' },
      { q: '어떤 포맷을 지원하나요?', a: 'JPG, PNG, WebP, GIF 등 일반 포맷을 지원하며 일부는 브라우저에 따라 달라집니다.' },
      { q: '50KB, 100KB처럼 정확한 크기로 압축할 수 있나요?', a: '가능합니다. 목표 용량 설정으로 업로드 제한에 맞출 수 있습니다.' },
      { q: '모바일에서도 되나요?', a: '네. 데스크톱, 태블릿, 모바일 브라우저에서 모두 사용할 수 있습니다.' },
      { q: '설치가 필요한가요?', a: '아니요. 웹에서 바로 실행됩니다.' },
      { q: '일괄 처리도 가능한가요?', a: '네. 일괄 압축, 일괄 변환 등의 작업을 지원합니다.' },
      { q: '여권사진 프리셋이 있나요?', a: '네. Passport Photo Maker에 국가별 프리셋과 인쇄 시트 내보내기가 있습니다.' },
    ],
  },
  fr: {
    latestFromBlog: 'Derniers articles du blog',
    faqTitle: 'Questions fréquentes',
    items: [
      { q: 'Mes images sont-elles envoyées sur un serveur ?', a: 'Non. NanoImage traite vos fichiers dans le navigateur, sans upload.' },
      { q: 'NanoImage est-il gratuit ?', a: 'Oui. Les outils principaux sont gratuits, sans compte.' },
      { q: 'Quels formats sont pris en charge ?', a: 'JPG, PNG, WebP, GIF et autres formats courants selon le navigateur.' },
      { q: 'Puis-je compresser à 50KB ou 100KB exacts ?', a: 'Oui, via les réglages de taille cible pour respecter les limites de formulaires.' },
      { q: 'Fonctionne-t-il sur mobile ?', a: 'Oui, sur desktop, tablette et mobile.' },
      { q: 'Faut-il installer un logiciel ?', a: 'Non, tout fonctionne directement dans le navigateur.' },
      { q: 'Le traitement en lot est-il disponible ?', a: 'Oui, notamment pour la compression et la conversion.' },
      { q: 'Y a-t-il des presets photo passeport ?', a: 'Oui, avec des presets par pays et export planche d’impression.' },
    ],
  },
  es: {
    latestFromBlog: 'Últimos artículos del blog',
    faqTitle: 'Preguntas frecuentes',
    items: [
      { q: '¿Las imágenes se suben al servidor?', a: 'No. NanoImage procesa en el navegador y los archivos no salen del dispositivo.' },
      { q: '¿NanoImage es gratis?', a: 'Sí. Las herramientas principales son gratuitas y sin registro.' },
      { q: '¿Qué formatos soporta?', a: 'JPG, PNG, WebP, GIF y otros formatos comunes según el navegador.' },
      { q: '¿Puedo comprimir a 50KB o 100KB exactos?', a: 'Sí, con el objetivo de tamaño para cumplir límites de formularios.' },
      { q: '¿Funciona en móvil?', a: 'Sí, en escritorio, tablet y móvil.' },
      { q: '¿Necesito instalar algo?', a: 'No, se usa directamente en el navegador.' },
      { q: '¿Tiene procesamiento por lotes?', a: 'Sí, por ejemplo para compresión y conversión.' },
      { q: '¿Incluye presets para foto de pasaporte?', a: 'Sí, Passport Photo Maker incluye presets por país y hoja de impresión.' },
    ],
  },
  pt: {
    latestFromBlog: 'Últimos artigos do blog',
    faqTitle: 'Perguntas frequentes',
    items: [
      { q: 'As imagens são enviadas para um servidor?', a: 'Não. O NanoImage processa no navegador e os arquivos ficam no dispositivo.' },
      { q: 'O NanoImage é gratuito?', a: 'Sim. As ferramentas principais são grátis e sem cadastro.' },
      { q: 'Quais formatos são suportados?', a: 'JPG, PNG, WebP, GIF e outros formatos comuns conforme o navegador.' },
      { q: 'Posso comprimir para 50KB ou 100KB exatos?', a: 'Sim, usando o alvo de tamanho para atender limites de formulários.' },
      { q: 'Funciona no celular?', a: 'Sim, funciona em desktop, tablet e celular.' },
      { q: 'Preciso instalar algo?', a: 'Não, funciona direto no navegador.' },
      { q: 'Tem processamento em lote?', a: 'Sim, incluindo compressão e conversão em lote.' },
      { q: 'Há presets para foto de passaporte?', a: 'Sim, o Passport Photo Maker inclui presets por país e folha para impressão.' },
    ],
  },
  ru: {
    latestFromBlog: 'Последние статьи блога',
    faqTitle: 'Часто задаваемые вопросы',
    items: [
      { q: 'Изображения загружаются на сервер?', a: 'Нет. NanoImage обрабатывает файлы в браузере, они не покидают устройство.' },
      { q: 'NanoImage бесплатный?', a: 'Да. Основные инструменты бесплатны и без регистрации.' },
      { q: 'Какие форматы поддерживаются?', a: 'Поддерживаются JPG, PNG, WebP, GIF и другие форматы в зависимости от браузера.' },
      { q: 'Можно сжать точно до 50KB или 100KB?', a: 'Да, через настройку целевого размера для требований форм.' },
      { q: 'Работает на телефоне?', a: 'Да, работает на desktop, планшете и телефоне.' },
      { q: 'Нужно что-то устанавливать?', a: 'Нет, все работает прямо в браузере.' },
      { q: 'Есть пакетная обработка?', a: 'Да, доступны пакетное сжатие и конвертация.' },
      { q: 'Есть пресеты для фото на паспорт?', a: 'Да, Passport Photo Maker включает пресеты по странам и лист для печати.' },
    ],
  },
}


/** GEO: answer-first definition + citable quotations (AITDK Citations / Answer-First checks). */
type HomeGeoCopy = {
  definitionTitle: string
  definitionLead: string
  definitionBody: string
  bylinePrefix: string
  authorName: string
  publishedLabel: string
  updatedLabel: string
  citationsTitle: string
  citations: { quote: string; citeLabel: string; href: string }[]
}

const HOME_DATE_PUBLISHED = '2025-06-01'
const HOME_DATE_MODIFIED = '2026-08-22'

const HOME_GEO_COPY: Partial<Record<LangCode, HomeGeoCopy>> = {
  en: {
    definitionTitle: 'What is NanoImage?',
    definitionLead:
      'NanoImage is a free suite of privacy-first image tools that run 100% in your browser — compress, resize, crop, convert, edit, and on-device AI — with no upload, no account, and no server-side processing of your files.',
    definitionBody:
      'Anyone who needs everyday image tasks can open a tool, process the file locally with JavaScript and the Canvas API, then download the result. You can verify privacy in DevTools → Network: no outbound image upload occurs during processing. NanoImage is built for people who want TinyPNG-style convenience without sending photos to a cloud.',
    bylinePrefix: 'By',
    authorName: 'NanoImage Team',
    publishedLabel: 'Published June 1, 2025',
    updatedLabel: 'Updated August 22, 2026',
    citationsTitle: 'Sources & further reading',
    citations: [
      {
        quote:
          'Images remain the predominant resource type on homepages (excluding video): the median desktop page requests about 1,054 KB of images, and the median mobile page about 900 KB.',
        citeLabel: 'HTTP Archive Web Almanac 2024 — Page Weight',
        href: 'https://almanac.httparchive.org/en/2024/page-weight',
      },
      {
        quote:
          'EXIF metadata can include GPS coordinates, device identifiers, and capture timestamps — information many people do not intend to publish when they share a photo online.',
        citeLabel: 'NanoImage — What is EXIF data?',
        href: '/blog/what-is-exif-data',
      },
      {
        quote:
          'Browser-local image tooling keeps originals on-device: processing with the Canvas API never requires uploading the file to a remote editor.',
        citeLabel: 'NanoImage — How it works',
        href: '/how-it-works',
      },
    ],
  },
  'zh-CN': {
    definitionTitle: '什么是 NanoImage？',
    definitionLead:
      'NanoImage 是一套完全在浏览器中运行的免费隐私优先图片工具 — 压缩、缩放、裁剪、转换、编辑与端侧 AI — 无需上传、无需账号，文件不会发到服务器处理。',
    definitionBody:
      '打开工具即可在本地用 JavaScript 与 Canvas API 处理图片并下载结果。可在开发者工具 → Network 中验证：处理过程中没有图片外传请求。NanoImage 面向需要便捷在线修图、又不想把照片交给云端的人。',
    bylinePrefix: '作者',
    authorName: 'NanoImage 团队',
    publishedLabel: '发布于 2025年6月1日',
    updatedLabel: '更新于 2026年8月22日',
    citationsTitle: '参考来源与延伸阅读',
    citations: [
      {
        quote:
          '图片仍是首页（不含视频）的主要资源类型：桌面端首页图片请求量中位数约 1,054 KB，移动端约 900 KB。',
        citeLabel: 'HTTP Archive Web Almanac 2024 — Page Weight',
        href: 'https://almanac.httparchive.org/en/2024/page-weight',
      },
      {
        quote:
          'EXIF 元数据可能包含 GPS、设备标识与拍摄时间 — 许多人在分享照片时并不打算公开这些信息。',
        citeLabel: 'NanoImage — 什么是 EXIF 数据？',
        href: '/blog/what-is-exif-data',
      },
      {
        quote:
          '浏览器本地图片工具把原图留在设备上：用 Canvas API 处理时，无需把文件上传到远程编辑器。',
        citeLabel: 'NanoImage — 工作原理',
        href: '/how-it-works',
      },
    ],
  },
}


// Routing is handled by Next.js; see components/AppShell.tsx
export default function App() { return null }

function useMobileNav() {
  const [isMobileNav, setIsMobileNav] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 720px)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)')
    const sync = () => setIsMobileNav(mq.matches)
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return isMobileNav
}

export function Header({ navigate: _navigate }: { navigate: (to: string) => void }) {
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const isMobileNav = useMobileNav()
  const { t, lang, setLang } = useI18n()
  const lp = useLangPath()

  const closeToolsMenu = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open || !isMobileNav || typeof window === 'undefined') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open, isMobileNav])

  // Language switcher: navigate to the same logical page in the chosen language
  const handleSwitchLang = useCallback((code: LangCode) => {
    setLang(code)
    setLangOpen(false)
    if (typeof window !== 'undefined') {
      const clean = stripLangPrefix(window.location.pathname)
      const dest = langPath(code, clean || '/')
      window.location.href = dest
    }
  }, [setLang])

  const menuLabels = t.nav.toolMenu as Record<string, string>

  const toolsDropdown = (
    <>
      {categories.map((category) => (
        <div className="dropdown-group" key={category.id}>
          <p className="dropdown-group-label">{t.categories[category.id]?.title ?? category.title}</p>
          {tools
            .filter((tool) => tool.category === category.id && !HOMEPAGE_EXCLUDED_TOOL_SLUGS.has(tool.slug) && !tool.deprecated)
            .map((tool) => (
              <a
                className="dropdown-tool"
                key={tool.slug}
                href={lp(`/${tool.slug}`)}
                tabIndex={open ? 0 : -1}
                onClick={closeToolsMenu}
              >
                <span className={`mini-icon ${category.tone}`}>
                  <HomeIcon name={toolIconMap[tool.slug] ?? categoryIconMap[category.id]} />
                </span>
                <strong>
                  {menuLabels[tool.slug] ?? toolsDataName(t, tool.slug) ?? compressVariantName(t, tool.slug) ?? tool.name}
                  {tool.badge ? <span className="dropdown-tool-badge">{tool.badge}</span> : null}
                </strong>
              </a>
            ))}
          <a
            className="dropdown-view-all"
            href={lp(`/tools/${category.id}`)}
            tabIndex={open ? 0 : -1}
            onClick={closeToolsMenu}
          >
            {t.nav.viewAllInCategory} →
          </a>
        </div>
      ))}
    </>
  )

  const mobileToolsPortal = isMobileNav && open && typeof document !== 'undefined'
    ? createPortal(
        <>
          <button
            type="button"
            className="tools-menu-backdrop"
            aria-label="Close tools menu"
            tabIndex={-1}
            onClick={closeToolsMenu}
          />
          <div
            className="dropdown tools-mobile-sheet"
            role="navigation"
            aria-label={t.nav.tools}
          >
            {toolsDropdown}
          </div>
        </>,
        document.body,
      )
    : null

  return (
    <>
      {mobileToolsPortal}
      <header className={`header${open ? ' header-tools-open' : ''}`}>
      <a className="logo" href={lp('/')} aria-label="NanoImage Home">
        <img src="/assets/brand/logo/nanoimage-logo.svg" alt="NanoImage – Free Online Image Tools" width="170" height="32" />
        <span className="sr-only">NanoImage Home</span>
      </a>
      <nav className={`nav${open ? ' nav-tools-open' : ''}`} aria-label="Primary navigation">
        <div
          className={`tools-menu${open ? ' tools-menu-open' : ''}`}
          onPointerEnter={(event) => {
            if (!isMobileNav && event.pointerType === 'mouse') setOpen(true)
          }}
          onPointerLeave={(event) => {
            if (!isMobileNav && event.pointerType === 'mouse') setOpen(false)
          }}
        >
          <button
            className="nav-link"
            type="button"
            aria-expanded={open}
            aria-haspopup="true"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              setOpen((value) => !value)
            }}
          >
            {t.nav.tools} <span aria-hidden="true">⌄</span>
          </button>
          {/* Always in DOM for SEO; on mobile the open state renders via portal */}
          <div
            className={`dropdown${open ? '' : ' dropdown-hidden'}${isMobileNav && open ? ' dropdown-portal-active' : ''}`}
            aria-hidden={!open || (isMobileNav && open)}
          >
            {toolsDropdown}
          </div>
        </div>
        <a className="nav-link" href={lp('/how-it-works')}>
          {t.nav.howItWorks}
        </a>
        <a className="nav-link" href={lp('/blog')}>
          {t.nav.blog}
        </a>
      </nav>
      <div className="header-actions">
        <span className="free-tools">{t.nav.freeTools}</span>
        <div
          className="lang-menu"
          onPointerEnter={(e) => { if (e.pointerType === 'mouse') setLangOpen(true) }}
          onPointerLeave={(e) => { if (e.pointerType === 'mouse') setLangOpen(false) }}
        >
          <button
            className="language"
            type="button"
            aria-label="Language selector"
            aria-expanded={langOpen}
            onClick={() => setLangOpen((v) => !v)}
          >
            {LANGS.find((l) => l.code === lang)?.flag ?? '🌐'} {LANGS.find((l) => l.code === lang)?.label ?? 'English'} ⌄
          </button>
          {langOpen && (
            <div className="lang-dropdown">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  className={lang === l.code ? 'active' : ''}
                  onClick={() => handleSwitchLang(l.code as LangCode)}
                >
                  <span>{l.flag}</span> {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
    </>
  )
}

export function TrustPoints({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n()
  return (
    <div className={compact ? 'trust-points compact' : 'trust-points'}>
      <span>{t.tool.worksBrowser}</span>
      <span>{t.tool.staysPrivate}</span>
      <span>{t.tool.free100}</span>
    </div>
  )
}

export function HomePage({
  navigate: _navigate,
  onCompressUpload,
}: {
  navigate: (to: string) => void
  onCompressUpload: (files: File[]) => void
}) {
  const { t, lang } = useI18n()
  const lp = useLangPath()
  const uploadInput = useRef<HTMLInputElement>(null)
  // Keep homepage "tool count" at core tools only (exclude exact-size SEO landing pages).
  const toolCount = tools.filter(
    (tool) => !HOMEPAGE_EXCLUDED_TOOL_SLUGS.has(tool.slug) && !tool.deprecated,
  ).length
  const toolsData = t.toolsData as Record<string, { name?: string; description?: string }>
  const latestPosts = useMemo(
    () => sortBlogPostsByDateDesc(blogPosts.map((post) => localizeBlogPost(post, lang))).slice(0, 3),
    [lang],
  )
  const homeSeoCopy = HOME_FAQ_ENTRIES[lang] ?? HOME_FAQ_ENTRIES.en
  const homeGeo = HOME_GEO_COPY[lang] ?? HOME_GEO_COPY.en!
  const homeFaqJsonLd = useMemo(() => {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: homeSeoCopy.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    })
  }, [homeSeoCopy])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: homeFaqJsonLd }}
      />
      <section className="hero-section">
        <div className="hero-copy">
          <h1 className="hero-h1-twoline">
            <span>{t.hero.headline1}</span>
            <span>{t.hero.headline2}</span>
          </h1>
          <p className="hero-desc">{t.hero.subtext.replace('{count}', String(toolCount))}</p>
          <div className="hero-actions">
            <a className="hero-cta-primary" href={lp('/compress-image')}>{t.hero.ctaPrimary}</a>
            <a className="hero-cta-secondary" href="#tools">{(t.hero.ctaSecondary ?? 'Browse all {count} tools').replace('{count}', String(toolCount))}</a>
          </div>
        </div>
        <input ref={uploadInput} type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden
          onChange={(event) => {
            const file = event.currentTarget.files?.[0]
            if (file) onCompressUpload([file])
            event.currentTarget.value = ''
          }} />
        <button type="button" className="hero-dropzone"
          onClick={() => uploadInput.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            const file = event.dataTransfer.files[0]
            if (file) onCompressUpload([file])
          }}>
          <span className="floating-tool crop"><HomeIcon name="crop" /></span>
          <span className="floating-tool image"><HomeIcon name="image" /></span>
          <span className="floating-tool text"><HomeIcon name="text" /></span>
          <span className="upload-mark"><HomeIcon name="upload" /></span>
          <strong>{t.hero.dropHere}</strong>
          <em>{t.hero.orClick}</em>
          <small>{t.hero.fileTypes}</small>
          <span className="sample-photo" aria-hidden="true">
            <span></span>
          </span>
        </button>
        <TrustPoints compact />
      </section>

      <section className="home-answer-first" aria-labelledby="what-is-nanoimage">
        <h2 id="what-is-nanoimage">{homeGeo.definitionTitle}</h2>
        <p className="home-answer-lead">
          <strong>{homeGeo.definitionLead}</strong>
        </p>
        <p>{homeGeo.definitionBody}</p>
        <p className="home-byline">
          <span>
            {homeGeo.bylinePrefix}{' '}
            <a href={lp('/how-it-works')}>{homeGeo.authorName}</a>
          </span>
          <span aria-hidden="true"> · </span>
          <time dateTime={HOME_DATE_PUBLISHED}>{homeGeo.publishedLabel}</time>
          <span aria-hidden="true"> · </span>
          <time dateTime={HOME_DATE_MODIFIED}>{homeGeo.updatedLabel}</time>
        </p>
      </section>

      <section className="why-nanoimage" id="why">
        <div className="why-header">
          <h2>{t.why.title}</h2>
          <p className="why-subtitle">{t.why.subtitle}</p>
        </div>
        <div className="why-table-wrap">
          <table className="why-table">
            <thead>
              <tr>
                <th></th>
                <th className="why-col-nano">NanoImage</th>
                <th>TinyPNG</th>
                <th>Cloud AI Sites</th>
                <th>Desktop Software</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t.why.uploadRequired}</td>
                <td className="why-col-nano why-no">✗</td>
                <td className="why-yes">✓</td>
                <td className="why-yes">✓</td>
                <td className="why-no">✗</td>
              </tr>
              <tr>
                <td>{t.why.accountRequired}</td>
                <td className="why-col-nano why-no">✗</td>
                <td>{t.why.freeTierLimited}</td>
                <td className="why-yes">✓</td>
                <td className="why-no">✗</td>
              </tr>
              <tr>
                <td>{t.why.worksOffline}</td>
                <td className="why-col-nano why-yes">✓</td>
                <td className="why-no">✗</td>
                <td className="why-no">✗</td>
                <td className="why-yes">✓</td>
              </tr>
              <tr>
                <td>{t.why.numTools}</td>
                <td className="why-col-nano why-highlight"><strong>{toolCount}</strong></td>
                <td>1</td>
                <td>3–5</td>
                <td>50+</td>
              </tr>
              <tr>
                <td>{t.why.cost}</td>
                <td className="why-col-nano why-highlight"><strong>$0</strong></td>
                <td>{t.why.freemium}</td>
                <td>$5–20/mo</td>
                <td>$20–50/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="why-cta">
          <p>{t.why.trustedBy}</p>
          <a href="#tools" className="why-cta-link">{t.why.seeAll.replace('{count}', String(toolCount))}</a>
        </div>
      </section>

      <section className="home-tool-grid" id="tools">
        {tools
          // 按 homepage SEO PRD：首页主工具列表只保留 1 个一级卡片 "Compress Image"。
          // SEO satellite pages stay routable and indexed, but are not shown as core homepage cards.
          .filter((tool) => !HOMEPAGE_EXCLUDED_TOOL_SLUGS.has(tool.slug) && !tool.deprecated)
          .map((tool) => {
            const iconSrc = HOME_TOOL_ICON_MAP[tool.slug]
            return (
              <article className="home-tool-card" key={tool.slug}>
                <a href={lp(`/${tool.slug}`)}>
                  <span className="home-tool-icon">
                    {iconSrc ? (
                      <img src={iconSrc} alt="" loading="lazy" />
                    ) : (
                      <HomeIcon name={toolIconMap[tool.slug] ?? categoryIconMap[tool.category] ?? 'file'} />
                    )}
                  </span>
                  <div className="home-tool-content">
                    <h3>
                      {toolsData[tool.slug]?.name ?? compressVariantName(t, tool.slug) ?? tool.name}
                      {tool.badge ? <em>{tool.badge}</em> : null}
                    </h3>
                    <p>{toolsData[tool.slug]?.description ?? tool.description}</p>
                  </div>
                </a>
                {tool.slug === 'compress-image' && (
                  <div className="home-tool-quick-targets">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <span>{(t.home as any)?.quickTargetsLabel ?? 'Quick targets'}:</span>
                    {/* PRD Phase 1: 200KB/500KB/1MB 定值页进入下线观察期,内链只保留 100KB */}
                    <a href={lp('/compress-image-to-100kb')}>100KB</a>
                  </div>
                )}
              </article>
            )
          })}
      </section>

      {/* Popular compression targets module (per homepage SEO PRD) */}
      <section className="home-popular-targets">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <h2>{(t.home as any)?.popularCompressionTargetsTitle ?? 'Popular image compression targets'}</h2>
        <p className="home-popular-lead">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(t.home as any)?.popularCompressionTargetsLead ?? 'Need to meet an upload limit? Compress images to a fixed file size directly in your browser.'}
        </p>
        <div className="home-popular-links">
          {/*
            PRD Phase 1: 定值页收敛,仅保留 100KB(有独立搜索需求);其余尺寸引导至主压缩页。
            PRD 4.2.4 修正: 原先三个「Compress Image to 200KB/500KB/1MB」锚文本全部指向
            /compress-image,锚文本承诺的落地页并不存在——既是用户预期错配,也是三条不同
            关键词锚文本指向同一 URL 的内链反模式。按 D-01 这三个页面维持 deprecated,
            因此改为一条诚实的通用入口,尺寸在目标页内选择。
          */}
          <a href={lp('/compress-image-to-100kb')}>{compressVariantName(t, 'compress-image-to-100kb') ?? 'Compress Image to 100KB'}</a>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <a href={lp('/compress-image')}>{(t.home as any)?.popularCompressionOtherSizes ?? 'Compress to a custom size (200KB, 500KB, 1MB…)'}</a>
        </div>
      </section>

      <section className="home-latest-blog">
        <div className="home-latest-blog-head">
          <h2>{homeSeoCopy.latestFromBlog}</h2>
          <a href={lp('/blog')}>{t.blog.readMore}</a>
        </div>
        <div className="home-latest-blog-grid">
          {latestPosts.map((post, index) => (
            <a key={post.slug} className="home-latest-blog-card" href={lp(`/blog/${post.slug}`)}>
              <div className="home-latest-blog-cover-wrap">
                {post.coverImage ? (
                  <img className="home-latest-blog-cover" src={post.coverImage} alt={post.title} />
                ) : (
                  <BlogThumb imageSrc={post.coverImage} index={index} small alt={post.title} />
                )}
              </div>
              <div>
                <strong>{post.title}</strong>
                <small>{post.date}</small>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="home-citations" aria-labelledby="sources-heading">
        <h2 id="sources-heading">{homeGeo.citationsTitle}</h2>
        <div className="home-citations-list">
          {homeGeo.citations.map((item) => (
            <blockquote key={item.href} cite={item.href.startsWith('http') ? item.href : undefined}>
              <p>{item.quote}</p>
              <footer>
                <cite>
                  <a
                    href={item.href.startsWith('http') ? item.href : lp(item.href)}
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {item.citeLabel}
                  </a>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="home-faq">
        <h2>{homeSeoCopy.faqTitle}</h2>
        <div className="home-faq-grid">
          {homeSeoCopy.items.map((item) => (
            <article key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>
      <TrustBar />
    </>
  )
}


export function CliPage({ navigate: _navigate }: { navigate: (to: string) => void }) {
  return (
    <section className="page">
      <h1>NanoImage CLI</h1>
      <p>Command-line tools for image workflows.</p>
    </section>
  )
}

export function DocsCliPage({ navigate: _navigate }: { navigate: (to: string) => void }) {
  return (
    <section className="page">
      <h1>CLI Docs</h1>
      <p>Installation and usage guides for NanoImage CLI.</p>
    </section>
  )
}

export function HowItWorksPage({ navigate }: { navigate: (to: string) => void }) {
  const { t } = useI18n()
  const lp = useLangPath()
  const steps = t.how?.steps ?? []
  const benefits = t.how?.benefits ?? []
  const toolsData = t.toolsData as Record<string, { name?: string; description?: string }>
  const flowSlugs = [
    'compress-image',
    'resize-image',
    'crop-image',
    'convert-image',
    'convert-to-webp',
    'image-to-pdf',
    'change-background',
    'add-text',
  ]
  const flowTools = flowSlugs
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is Tool => Boolean(tool))
  const benefitIcons = ['bolt', 'lock', 'sparkle', 'smile']

  return (
    <section className="how-page">
      <Breadcrumbs current={t.how?.breadcrumb ?? 'How it works'} navigate={navigate} />

      <div className="how-hero">
        <div className="how-hero-copy">
          <h1>
            {t.how?.title ?? 'How NanoImage'}
            <br />
            <mark>{t.how?.titleMark ?? 'works'}</mark>
          </h1>
          <p>{t.how?.subtitle ?? 'Simple image tools that run in your browser.'}</p>
          <div className="how-actions">
            <a className="primary" href={lp('/#tools')}>{t.how?.exploreAll ?? 'Explore All Tools'}</a>
            <a className="secondary" href={lp('/compress-image')}>{t.how?.tryCompress ?? 'Try Compress Image'}</a>
          </div>
        </div>

        <div className="how-hero-art" aria-hidden="true">
          <span className="tape"></span>
          <div className="how-art-flow" style={{ padding: '4.3rem 1.25rem 4.9rem' }}>
            <span><HomeIcon name="image" /></span>
            <b>→</b>
            <div>
              <i><HomeIcon name="image" /></i>
              <i><HomeIcon name="crop" /></i>
              <i><HomeIcon name="file" /></i>
              <i><HomeIcon name="magic" /></i>
            </div>
            <b>→</b>
            <span><HomeIcon name="download" /></span>
          </div>
          <strong><HomeIcon name="sparkle" /></strong>
          <em>{t.tool?.alwaysFree ?? 'Fast, simple, and always free!'}</em>
        </div>
      </div>

      <h2 className="how-section-title">
        {t.how?.stepsTitle ?? 'Edit images in four easy steps'}
        <HomeIcon name="sparkle" />
      </h2>
      <div className="how-steps-grid">
        {steps.map(([title, desc], index) => (
          <article key={`${title}-${index}`}>
            <span className="step-number">{index + 1}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
            {index === 0 && (
              <div className="step-visual">
                <i><HomeIcon name="crop" /></i>
                <i><HomeIcon name="image" /></i>
                <i><HomeIcon name="file" /></i>
                <i><HomeIcon name="dots" /></i>
              </div>
            )}
            {index === 1 && (
              <div className="step-visual step-2">
                <HomeIcon name="upload" />
                <b>{t.how?.uploadDrop ?? 'Upload or drop here'}</b>
              </div>
            )}
            {index === 2 && (
              <div className="step-visual step-3">
                <small>Quality <em></em> 90%</small>
                <small>Format <strong>WebP</strong></small>
                <label><input type="checkbox" defaultChecked readOnly /> {t.how?.keepTransparency ?? 'Keep transparency'}</label>
              </div>
            )}
            {index === 3 && (
              <div className="step-visual step-4">
                <strong><HomeIcon name="check" /></strong>
                <p>{t.how?.ready ?? 'Your image is ready!'}</p>
                <button type="button">{t.how?.download ?? 'Download'}</button>
              </div>
            )}
          </article>
        ))}
      </div>

      <h2 className="how-section-title">{t.how?.whyTitle ?? 'Why people love NanoImage'}</h2>
      <div className="how-benefits-grid">
        {benefits.map(([title, desc], index) => (
          <article key={`${title}-${index}`}>
            <span><HomeIcon name={benefitIcons[index]} /></span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>

      <h2 className="how-section-title">{t.how?.flowTitle ?? 'All tools follow the same simple flow'}</h2>
      <div className="how-tool-flow">
        {flowTools.map((tool) => (
          <a key={tool.slug} href={lp(`/${tool.slug}`)}>
            <span><HomeIcon name={toolIconMap[tool.slug] ?? categoryIconMap[tool.category] ?? 'file'} /></span>
            <small>{toolsData[tool.slug]?.name ?? compressVariantName(t, tool.slug) ?? tool.name}</small>
          </a>
        ))}
        <a href={lp('/#tools')}>
          <span><HomeIcon name="dots" /></span>
          <small>And many more</small>
        </a>
      </div>

      <div className="how-cta">
        <span><HomeIcon name="image" /></span>
        <div>
          <h2>{t.how?.ctaTitle ?? 'Ready to fix an image?'}</h2>
          <p>{t.how?.ctaDesc ?? 'Pick a tool and get started in seconds.'}</p>
        </div>
        <a className="primary" href={lp('/#tools')}>{t.how?.exploreAll ?? 'Explore All Tools'}</a>
        <a className="secondary" href={lp('/compress-image')}>{t.how?.tryCompress ?? 'Try Compress Image'}</a>
      </div>

      <div className="how-mini-trust">
        <span><HomeIcon name="bolt" /> {t.tool?.worksBrowser ?? 'Runs in your browser'}</span>
        <span><HomeIcon name="lock" /> {t.tool?.staysPrivate ?? 'Your files stay private'}</span>
        <span><HomeIcon name="sparkle" /> {t.tool?.free100 ?? 'Free to use, forever'}</span>
      </div>
    </section>
  )
}

export function BlogPage({ navigate }: { navigate: (to: string) => void }) {
  const { t, lang } = useI18n()
  const lp = useLangPath()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState(t.blog?.filters?.[0] ?? 'All')
  const posts = sortBlogPostsByDateDesc(blogPosts.map((p) => localizeBlogPost(p, lang)))
  const filters = t.blog?.filters ?? ['All']
  const normalizedSearch = search.trim().toLowerCase()
  const visiblePosts = posts.filter((post) => {
    const matchesSearch = !normalizedSearch || [post.title, post.excerpt, post.category]
      .some((value) => value.toLowerCase().includes(normalizedSearch))
    const matchesFilter = activeFilter === filters[0] || post.category.toLowerCase().includes(activeFilter.toLowerCase())
    return matchesSearch && matchesFilter
  })
  const latestPosts = posts.slice(0, 4)
  const featuredPost = posts[0]

  return (
    <section className="blog-page">
      <div className="blog-hero">
        <div>
          <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
            <a href={lp('/')}>{t.breadcrumbs?.home ?? 'Home'}</a>
            <span>/</span>
            <span>{t.blog?.breadcrumb ?? 'Blog'}</span>
          </nav>
          <h1>{t.blog?.title ?? 'NanoImage Blog'}</h1>
          <p>{t.blog?.subtitle ?? 'Tips, guides, and updates for everyday image tasks.'}</p>
        </div>
        {featuredPost && (
          <a className="blog-thumb-button" href={lp(`/blog/${featuredPost.slug}`)} aria-label={featuredPost.title}>
            <BlogThumb index={0} imageSrc={featuredPost.coverImage} large alt={featuredPost.title} />
          </a>
        )}
      </div>

      <div className="blog-shell">
        <main className="blog-main-card">
          <div className="blog-filter-row">
            <div>
              {filters.map((filter) => (
                <button
                  className={filter === activeFilter ? 'active' : ''}
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <label>
              <HomeIcon name="search" />
              <input
                type="search"
                value={search}
                placeholder={t.blog?.search ?? 'Search articles...'}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>

          {visiblePosts.length ? (
            visiblePosts.map((post, index) => (
              <article className="blog-list-item" key={post.slug}>
                <a className="blog-thumb-button" href={lp(`/blog/${post.slug}`)} aria-label={post.title}>
                  <BlogThumb index={index} imageSrc={post.coverImage} alt={post.title} />
                </a>
                <div>
                  <span className="blog-new-badge">{post.category}</span>
                  <h2>
                    <a className="blog-title-button" href={lp(`/blog/${post.slug}`)}>{post.title}</a>
                  </h2>
                  <small>{post.date} · {post.readTime}</small>
                  <p>{post.excerpt}</p>
                  <a href={lp(`/blog/${post.slug}`)}>{t.blog?.readMore ?? 'Read more →'}</a>
                </div>
              </article>
            ))
          ) : (
            <div className="blog-empty">
              <strong>{t.blog?.noResults ?? 'No articles found.'}</strong>
              <p>{t.blog?.search ?? 'Search articles...'}</p>
            </div>
          )}
        </main>

        <aside className="blog-sidebar">
          <section className="blog-side-card popular">
            <h2><HomeIcon name="sparkle" /> {t.blog?.sidebarLatest ?? 'Latest Posts'}</h2>
            {latestPosts.map((post, index) => (
              <button key={post.slug} type="button" onClick={() => navigate(`/blog/${post.slug}`)}>
                <BlogThumb index={index} imageSrc={post.coverImage} small alt={post.title} />
                <span>
                  <strong>{post.title}</strong>
                  <small>{post.date}</small>
                </span>
              </button>
            ))}
          </section>

          <section className="blog-side-card subscribe">
            <span><HomeIcon name="lock" /></span>
            <h2>{t.blog?.sidebarStayInLoop ?? 'Stay in the loop'}</h2>
            <p>{t.blog?.sidebarStayDesc ?? 'Get tips and updates from NanoImage.'}</p>
            <input type="email" placeholder={t.blog?.sidebarEmail ?? 'Your email address'} />
            <button type="button">{t.blog?.sidebarSubscribe ?? 'Subscribe'}</button>
            <small>{t.blog?.sidebarPrivacy ?? 'We respect your privacy.'}</small>
          </section>
        </aside>
      </div>
    </section>
  )
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const tokenPattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
  let lastIndex = 0
  let tokenIndex = 0

  for (const match of text.matchAll(tokenPattern)) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index))
    const token = match[0]
    if (token.startsWith('**')) {
      nodes.push(<strong key={`strong-${tokenIndex}`}>{token.slice(2, -2)}</strong>)
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        const [, label, href] = linkMatch
        nodes.push(<a href={href} key={`link-${tokenIndex}`}>{label}</a>)
      }
    }
    lastIndex = match.index + token.length
    tokenIndex += 1
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes.length ? nodes : [text]
}

function renderBlogMarkdown(markdown: string): ReactNode[] {
  const lines = markdown.split('\n')
  const nodes: ReactNode[] = []
  let index = 0

  while (index < lines.length) {
    const rawLine = lines[index]
    const line = rawLine.trim()

    if (!line) {
      index += 1
      continue
    }

    if (line.startsWith('```')) {
      const language = line.slice(3).trim()
      const codeLines: string[] = []
      index += 1
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index])
        index += 1
      }
      nodes.push(
        <pre className="article-code-block" key={`code-${index}`}>
          <code>{language ? `${language}\n${codeLines.join('\n')}` : codeLines.join('\n')}</code>
        </pre>,
      )
      index += 1
      continue
    }

    if (/^\|.+\|$/.test(line) && index + 1 < lines.length && /^\|?[\s:|-]+\|[\s:|-|]*$/.test(lines[index + 1].trim())) {
      const tableLines: string[] = [line]
      index += 2
      while (index < lines.length && /^\|.+\|$/.test(lines[index].trim())) {
        tableLines.push(lines[index].trim())
        index += 1
      }
      const rows = tableLines.map((tableLine) => tableLine.replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()))
      const [head, ...body] = rows
      nodes.push(
        <div className="article-table-wrapper" key={`table-${index}`}>
          <table className="article-table">
            <thead>
              <tr>{head.map((cell, cellIndex) => <th key={cellIndex}>{renderInlineMarkdown(cell)}</th>)}</tr>
            </thead>
            <tbody>
              {body.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => <td key={cellIndex}>{renderInlineMarkdown(cell)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
      continue
    }

    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imageMatch) {
      nodes.push(<img alt={imageMatch[1]} className="article-inline-image" key={`img-${index}`} src={imageMatch[2]} />)
      index += 1
      continue
    }

    if (line.startsWith('### ')) {
      nodes.push(<h3 key={`h3-${index}`}>{renderInlineMarkdown(line.slice(4))}</h3>)
      index += 1
      continue
    }

    if (line.startsWith('## ')) {
      nodes.push(<h2 key={`h2-${index}`}>{renderInlineMarkdown(line.slice(3))}</h2>)
      index += 1
      continue
    }

    if (line.startsWith('> ')) {
      nodes.push(<blockquote key={`quote-${index}`}>{renderInlineMarkdown(line.slice(2))}</blockquote>)
      index += 1
      continue
    }

    const bulletMatch = line.match(/^[-*]\s+(.+)$/)
    if (bulletMatch) {
      nodes.push(<p className="article-bullet" key={`bullet-${index}`}>{renderInlineMarkdown(bulletMatch[1])}</p>)
      index += 1
      continue
    }

    const numberedMatch = line.match(/^\d+\.\s+(.+)$/)
    if (numberedMatch) {
      nodes.push(<p className="article-bullet numbered" key={`numbered-${index}`}>{renderInlineMarkdown(numberedMatch[1])}</p>)
      index += 1
      continue
    }

    nodes.push(<p key={`p-${index}`}>{renderInlineMarkdown(line)}</p>)
    index += 1
  }

  return nodes
}

export function BlogPostPage({ navigate, slug }: { navigate: (to: string) => void; slug: string }) {
  const { t, lang } = useI18n()
  const lp = useLangPath()
  const posts = sortBlogPostsByDateDesc(blogPosts.map((p) => localizeBlogPost(p, lang)))
  const postIndex = posts.findIndex((p) => p.slug === slug)
  const post = posts[postIndex] ?? posts[0]
  const previousPost = postIndex > 0 ? posts[postIndex - 1] : null
  const nextPost = postIndex >= 0 && postIndex < posts.length - 1 ? posts[postIndex + 1] : null
  const latestPosts = posts.filter((item) => item.slug !== post.slug).slice(0, 4)
  const tocItems = (post.body ?? '')
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => line.slice(3))
    .slice(0, 8)

  if (!post) return null
  return (
    <section className="article-page">
      <div className="article-shell">
        <article className="article-card">
          <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
            <a href={lp('/')}>{t.breadcrumbs?.home ?? 'Home'}</a>
            <span>/</span>
            <a href={lp('/blog')}>{t.blog?.breadcrumb ?? 'Blog'}</a>
            <span>/</span>
            <span>{post.title}</span>
          </nav>

          <span className="article-category">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="article-meta">
            <span><HomeIcon name="file" /> {post.date}</span>
            <span><HomeIcon name="sparkle" /> {post.readTime}</span>
            <span className="share-actions">
              <button type="button" aria-label={t.blog?.share ?? 'Share'}>↗</button>
            </span>
          </div>
          {post.coverImage && <BlogThumb index={postIndex >= 0 ? postIndex : 0} imageSrc={post.coverImage} large alt={post.title} />}
          <p className="article-excerpt">{post.excerpt}</p>
          <div className="article-body">
            {renderBlogMarkdown(post.body ?? post.excerpt)}
          </div>

          <nav className="article-nav" aria-label="Article navigation">
            {previousPost ? (
              <a href={lp(`/blog/${previousPost.slug}`)}>
                {t.blog?.prevPage ?? '← Previous'}
                <small>{previousPost.title}</small>
              </a>
            ) : <span></span>}
            {nextPost ? (
              <a href={lp(`/blog/${nextPost.slug}`)}>
                {t.blog?.nextPage ?? 'Next →'}
                <small>{nextPost.title}</small>
              </a>
            ) : <span></span>}
          </nav>
        </article>

        <aside className="blog-sidebar">
          {tocItems.length > 0 && (
            <section className="blog-side-card about">
              <h2><HomeIcon name="file" /> {t.blog?.toc ?? 'Table of Contents'}</h2>
              {tocItems.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </section>
          )}

          <section className="blog-side-card popular">
            <h2><HomeIcon name="sparkle" /> {t.blog?.sidebarLatest ?? 'Latest Posts'}</h2>
            {latestPosts.map((item, index) => (
              <button key={item.slug} type="button" onClick={() => navigate(lp(`/blog/${item.slug}`))}>
                <BlogThumb index={index} imageSrc={item.coverImage} small alt={item.title} />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.date}</small>
                </span>
              </button>
            ))}
          </section>

          <section className="blog-side-card subscribe">
            <span><HomeIcon name="lock" /></span>
            <h2>{t.blog?.sidebarStayInLoop ?? 'Stay in the loop'}</h2>
            <p>{t.blog?.sidebarStayDesc ?? 'Get tips and updates from NanoImage.'}</p>
            <input type="email" placeholder={t.blog?.sidebarEmail ?? 'Your email address'} />
            <button type="button">{t.blog?.sidebarSubscribe ?? 'Subscribe'}</button>
            <small>{t.blog?.sidebarPrivacy ?? 'We respect your privacy.'}</small>
          </section>
        </aside>
      </div>
    </section>
  )
}

export function LegalPage({ markdown }: { markdown: string }) {
  const lines = markdown.split('\n').filter((line) => line.trim().length > 0)
  return (
    <article className="page legal-page">
      {lines.map((line, i) => {
        if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>
        if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>
        if (line.startsWith('# ')) return <h1 key={i}>{line.slice(2)}</h1>
        return <p key={i}>{line}</p>
      })}
    </article>
  )
}

export function Footer({ navigate: _navigate }: { navigate: (to: string) => void }) {
  const { t } = useI18n()
  const lp = useLangPath()
  return (
    <footer className="site-footer" id="contact">
      <span>{(t.footer?.copyright ?? '© 2025 NanoImage. All rights reserved.').replace(/20\d\d/, String(new Date().getFullYear()))}</span>
      <a
        className="site-footer-badge"
        href="https://buildlist.io"
        target="_blank"
        rel="noopener"
      >
        <img
          src="https://buildlist.io/badge.svg"
          alt="Featured on Buildlist"
          style={{ height: 40, width: 'auto' }}
        />
      </a>
      <nav aria-label="Footer">
        <a href={lp('/how-it-works')}>{t.footer?.about ?? 'About'}</a>
        <a href={lp('/privacy-policy')}>{t.footer?.privacy ?? 'Privacy Policy'}</a>
        <a href={lp('/terms-of-use')}>{t.footer?.terms ?? 'Terms of Use'}</a>
        <a href="mailto:support@nanoimage.net">{t.footer?.contact ?? 'Contact'}</a>
      </nav>
    </footer>
  )
}

export function NotFoundPage({ navigate: _navigate }: { navigate: (to: string) => void }) {
  const lp = useLangPath()
  return (
    <section className="page">
      <h1>404</h1>
      <p>Page not found.</p>
      <a href={lp('/')}>Go home</a>
    </section>
  )
}

export function CategoryPage({ categoryId }: { categoryId: string }) {
  return <CategoryHubPage categoryId={categoryId} />
}


/**
 * `alt` defaults to '' only as a last resort. Blog covers are linked article
 * thumbnails, not decoration, so an empty alt drops real content for screen
 * readers and image search — Bing Webmaster flagged missing ALT on 2026-08-07.
 * Callers should pass the post title.
 */
export function BlogThumb({ index, imageSrc, large, small, alt }: { index: number; imageSrc?: string; large?: boolean; small?: boolean; alt?: string }) {
  const icons = ['image', 'lock', 'file', 'crop', 'sparkle', 'convert']
  const icon = icons[index % icons.length]
  return (
    <div className={`blog-thumb thumb-${index % 6} ${large ? 'large' : ''} ${small ? 'small' : ''}`}>
      {imageSrc ? (
        <img src={imageSrc} alt={alt ?? ''} loading={large ? 'eager' : 'lazy'} decoding="async" />
      ) : (
        <>
          <span><HomeIcon name={icon} /></span>
          <i></i>
          {large && <em><HomeIcon name="sparkle" /></em>}
        </>
      )}
    </div>
  )
}

export function TrustBar() {
  const { t } = useI18n()
  return (
    <section className="trust-bar">
      <article><span><HomeIcon name="lock" /></span><div><h2>{t.trust.barPrivate}</h2><p>{t.trust.barPrivateDesc}</p></div></article>
      <article><span><HomeIcon name="bolt" /></span><div><h2>{t.trust.barEasy}</h2><p>{t.trust.barEasyDesc}</p></div></article>
      <article><span><HomeIcon name="device" /></span><div><h2>{t.trust.barAllDevices}</h2><p>{t.trust.barAllDevicesDesc}</p></div></article>
    </section>
  )
}


// NOTE: do NOT re-export ToolPage here — it would pull the entire tool bundle
// into the main chunk and defeat the next/dynamic code-splitting in AppShell.
