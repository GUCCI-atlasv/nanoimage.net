'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, ChangeEvent, DragEvent, FormEvent, PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import JSZip from 'jszip'
import { PDFDocument, PageSizes } from 'pdf-lib'
import * as exifr from 'exifr'
import { blogPosts, categories, tools, type BlogPost, type Tool } from './data'
import { useI18n, LANGS, type LangCode } from './i18n'


type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp'
type BackgroundMode = 'color' | 'image' | 'gradient' | 'transparent'

function localizeBlogPost(post: BlogPost, lang: LangCode): BlogPost {
  const localized = post.localizations?.[lang]
  return localized ? { ...post, ...localized } : post
}

function sortBlogPostsByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date))
}

type ToolSettingsState = {
  format: OutputFormat
  quality: number
  width: number
  height: number
  resizeMode: 'pixels' | 'percentage'
  percentage: number
  keepAspect: boolean
  cropX: number
  cropY: number
  cropWidth: number
  cropHeight: number
  angle: number
  flipX: boolean
  flipY: boolean
  text: string
  textSize: number
  textColor: string
  textXPercent: number
  textYPercent: number
  textBoxWidthPercent: number
  textBoxHeightPercent: number
  textBold: boolean
  textItalic: boolean
  textUnderline: boolean
  textShadow: boolean
  textOutline: boolean
  textAlign: 'left' | 'center' | 'right'
  textShadowColor: string
  textOutlineColor: string
  textShadowBlur: number
  textShadowOffsetX: number
  textShadowOffsetY: number
  textRenderLines?: string[]
  textLayers?: TextLayer[]
  memeTopText: string
  memeBottomText: string
  memeFont: 'Impact' | 'Anton' | 'Arial Black' | 'Comic Sans MS'
  memeOutlineWidth: number
  blurAreas?: CropArea[]
  pixelateAreas?: CropArea[]
  colorAreas?: ColorArea[]
  backgroundAreas?: BackgroundArea[]
  watermarkMode: 'text' | 'image'
  watermarkImageDataUrl: string
  watermarkImageName: string
  watermarkOpacity: number
  blur: number
  pixelSize: number
  background: string
  colorTolerance: number
  backgroundMode: BackgroundMode
  backgroundImageDataUrl: string
  backgroundImageName: string
  brightness: number
  contrast: number
  saturation: number
  vibrance: number
  exposure: number
  highlights: number
  shadows: number
  sharpness: number
  clarity: number
  warmth: number
  tint: number
  upscaleScale: number
  resampling: 'smooth' | 'sharp'
}

type ProcessedFile = {
  name: string
  url: string
  blob: Blob
  size: number
}

type PendingUpload = {
  id: number
  files: File[]
}

type PdfOptions = {
  pageSize: 'a4' | 'letter'
  orientation: 'portrait' | 'landscape'
  margin: number
  imageFit: 'fit' | 'fill' | 'actual'
  spacing: number
  caption: boolean
  sameSize: boolean
  compress: boolean
}

type PhotoGridOptions = {
  columns: number
  rows: number
  aspectRatio: '1:1' | '4:5' | '16:9' | '9:16'
  spacing: number
  border: number
  radius: number
  background: string
}

type PhotoGridOffsets = Record<number, { x: number; y: number }>

type GifOptions = {
  width: number
  height: number
  fit: 'contain' | 'cover' | 'stretch'
  frameDuration: number
  loop: 'forever' | 'once' | 'three'
  colors: number
  optimize: boolean
}

type CollageItem = {
  id: number
  fileIndex: number
  x: number
  y: number
  width: number
  height: number
  rotate: number
}

type CollageOptions = {
  width: number
  height: number
  background: string
  spacing: number
  radius: number
  template: 'classic' | 'polaroid' | 'scrapbook' | 'film' | 'paper' | 'square' | 'creative' | 'minimal' | 'mood'
  text: string
  sticker: string
}

type CropArea = {
  id: number
  x: number
  y: number
  width: number
  height: number
}

type ColorArea = CropArea & {
  color: string
  tolerance: number
}

type BackgroundArea = CropArea & {
  background: string
  backgroundMode: BackgroundMode
  backgroundImageDataUrl: string
  tolerance: number
}

type TextLayer = {
  id: number
  text: string
  textSize?: number
  textColor?: string
  textXPercent?: number
  textYPercent?: number
  textBoxWidthPercent?: number
  textBoxHeightPercent?: number
  textBold?: boolean
  textItalic?: boolean
  textUnderline?: boolean
  textShadow?: boolean
  textOutline?: boolean
  textAlign?: 'left' | 'center' | 'right'
  textShadowColor?: string
  textOutlineColor?: string
  textShadowBlur?: number
  textShadowOffsetX?: number
  textShadowOffsetY?: number
}

const formatLabels: Record<OutputFormat, string> = {
  'image/png': 'PNG',
  'image/jpeg': 'JPG',
  'image/webp': 'WebP',
}

const mvpSlugs = new Set(tools.filter((tool) => tool.mvp).map((tool) => tool.slug))

const categoryIconMap: Record<string, string> = {
  'optimize-images': 'trend',
  'edit-images': 'scissors',
  'convert-formats': 'convert',
  'create-more': 'sparkle',
  'privacy-protection': 'shield',
  'video-tools': 'play',
}

const toolIconMap: Record<string, string> = {
  'compress-image': 'file',
  'resize-image': 'crop',
  'batch-compress': 'stack',
  'upscale-image': 'sun',
  'crop-image': 'crop',
  'rotate-image': 'rotate',
  'flip-image': 'flip',
  'add-text': 'text',
  'change-background': 'image',
  'enhance-image': 'magic',
  'change-color': 'palette',
  'convert-image': 'file',
  'convert-to-webp': 'file',
  'image-to-pdf': 'file',
  'gif-maker': 'image',
  'meme-generator': 'smile',
  'image-collage': 'grid',
  'photo-grid': 'grid',
  'remove-exif': 'info',
  'blur-image': 'sun',
  'pixelate-image': 'dots',
  'add-watermark': 'watermark',
  'video-to-gif': 'image',
  'video-to-mp3': 'music',
}

// Routing is handled by Next.js; see components/AppShell.tsx
export default function App() { return null }

export function Header({ navigate: _navigate }: { navigate: (to: string) => void }) {
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { t, lang, setLang } = useI18n()

  return (
    <header className="header">
      <a className="logo" href="/" aria-label="NanoImage Home">
        <img src="/assets/brand/logo/nanoimage-logo.svg" alt="NanoImage" width="170" height="32" />
      </a>
      <nav className="nav" aria-label="Primary navigation">
        <div
          className="tools-menu"
          onPointerEnter={(event) => {
            if (event.pointerType === 'mouse') setOpen(true)
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === 'mouse') setOpen(false)
          }}
        >
          <button
            className="nav-link"
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {t.nav.tools} <span aria-hidden="true">⌄</span>
          </button>
          {/* Always rendered for SEO; visibility controlled via CSS */}
          <div className={`dropdown${open ? '' : ' dropdown-hidden'}`} aria-hidden={!open}>
            {categories.map((category) => (
              <div className="dropdown-group" key={category.id}>
                  <p className="dropdown-group-label">{t.categories[category.id]?.title ?? category.title}</p>
                {tools
                  .filter((tool) => tool.category === category.id)
                  .map((tool) => (
                    <a
                      className="dropdown-tool"
                      key={tool.slug}
                      href={`/${tool.slug}`}
                      tabIndex={open ? 0 : -1}
                      onClick={() => setOpen(false)}
                    >
                      <span className={`mini-icon ${category.tone}`}>
                        <HomeIcon name={toolIconMap[tool.slug] ?? categoryIconMap[category.id]} />
                      </span>
                      <span>
                        <strong>{t.toolsData[tool.slug]?.name ?? tool.name}</strong>
                        <small>{t.toolsData[tool.slug]?.description ?? tool.description}</small>
                      </span>
                    </a>
                  ))}
              </div>
            ))}
          </div>
        </div>
        <a className="nav-link" href="/how-it-works">
          {t.nav.howItWorks}
        </a>
        <a className="nav-link" href="/blog">
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
                  onClick={() => {
                    setLang(l.code as LangCode)
                    setLangOpen(false)
                  }}
                >
                  <span>{l.flag}</span> {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export function HomePage({
  navigate: _navigate,
  onCompressUpload,
}: {
  navigate: (to: string) => void
  onCompressUpload: (files: File[]) => void
}) {
  const { t } = useI18n()
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <h1>
            {t.hero.headline1} <span>{t.hero.headline2}</span>
          </h1>
          <p>{t.hero.subtext}</p>
          <div className="hero-actions">
            <UploadButton label={t.hero.uploadBtn} onFiles={onCompressUpload} />
            <span>{t.hero.orDragDrop}</span>
          </div>
        </div>
        <a className="hero-dropzone" href="/compress-image">
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
        </a>
        <TrustPoints compact />
      </section>
      <section className="category-grid">
        {categories.map((category) => {
          const categoryTools = tools.filter((tool) => tool.category === category.id)
          const isNewCategory = category.id === 'video-tools'
          return (
            <article className={`category-card ${isNewCategory ? 'category-card-new' : ''}`} key={category.id}>
              {isNewCategory && <span className="category-new-badge">NEW</span>}
              <span className={`category-icon ${category.tone}`}>
                <HomeIcon name={categoryIconMap[category.id]} />
              </span>
              <h2>{t.categories[category.id]?.title ?? category.title}</h2>
              <p>{t.categories[category.id]?.description ?? category.description}</p>
              <ul>
                {categoryTools.map((tool) => (
                  <li key={tool.slug}>
                    <a href={`/${tool.slug}`}>
                      {tool.badge && tool.badge !== 'NEW' ? (
                        <em className={`tool-type-tag tool-type-${tool.badge.toLowerCase()}`}>{tool.badge}</em>
                      ) : (
                        <span className={`tool-list-icon ${category.tone}`}>
                          <HomeIcon name={toolIconMap[tool.slug] ?? 'file'} />
                        </span>
                      )}
                      {t.toolsData[tool.slug]?.name ?? tool.name}
                      {tool.badge === 'NEW' && <em>NEW</em>}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                className={`view-all view-all-${category.tone}`}
                href={`/tools/${category.id}`}
              >
                {t.categories[category.id]?.viewAllLabel ?? category.viewAllLabel} →
              </a>
            </article>
          )
        })}
      </section>
      <TrustBar />
    </>
  )
}

const VIDEO_TOOL_SLUGS = new Set(['video-to-gif', 'video-to-mp3'])

export function ToolPage({
  tool,
  navigate,
  pendingUpload,
  onPendingUploadConsumed,
}: {
  tool: Tool
  navigate: (to: string) => void
  pendingUpload: PendingUpload | null
  onPendingUploadConsumed: () => void
}) {
  if (VIDEO_TOOL_SLUGS.has(tool.slug)) {
    return (
      <section className="tool-page video-tool-page">
        {tool.slug === 'video-to-gif' && <VideoToGifPage tool={tool} navigate={navigate} />}
        {tool.slug === 'video-to-mp3' && <VideoToMp3Page tool={tool} navigate={navigate} />}
        <ToolFaqSection slug={tool.slug} />
      </section>
    )
  }
  return (
    <section className={`tool-page ${mvpSlugs.has(tool.slug) ? 'compress-page' : ''}`}>
      <Breadcrumbs current={tool.name} navigate={navigate} />
      {mvpSlugs.has(tool.slug) ? (
        <ImageToolWorkspace
          tool={tool}
          pendingUpload={pendingUpload}
          onPendingUploadConsumed={onPendingUploadConsumed}
        />
      ) : (
        <ComingSoonTool tool={tool} />
      )}
      <ToolFaqSection slug={tool.slug} />
    </section>
  )
}

export function Breadcrumbs({ current }: { current: string; navigate: (to: string) => void }) {
  const { t } = useI18n()
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">{t.breadcrumbs.home}</a>
      <span>/</span>
      <span>{t.breadcrumbs.tools}</span>
      <span>/</span>
      <span>{current}</span>
    </nav>
  )
}

export function ImageToolWorkspace({
  tool,
  pendingUpload,
  onPendingUploadConsumed,
}: {
  tool: Tool
  pendingUpload?: PendingUpload | null
  onPendingUploadConsumed?: () => void
}) {
  const { t } = useI18n()
  const [files, setFiles] = useState<File[]>([])
  const [previewUrl, setPreviewUrl] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [processed, setProcessed] = useState<ProcessedFile | null>(null)
  const [batch, setBatch] = useState<ProcessedFile[]>([])
  const [metadata, setMetadata] = useState<Record<string, unknown> | null>(null)
  const [compressPreset, setCompressPreset] = useState<'recommended' | 'smallest' | 'high' | 'custom'>('high')
  const [cropMode, setCropMode] = useState<'single' | 'multiple'>('single')
  const [cropAreas, setCropAreas] = useState<CropArea[]>([])
  const [activeCropId, setActiveCropId] = useState(1)
  const [nextCropId, setNextCropId] = useState(2)
  const [rotateZoom, setRotateZoom] = useState(100)
  const [textZoom, setTextZoom] = useState(100)
  const [textLayers, setTextLayers] = useState<TextLayer[]>([{ id: 1, text: 'Adventure Awaits' }])
  const [activeTextLayerId, setActiveTextLayerId] = useState(1)
  const [nextTextLayerId, setNextTextLayerId] = useState(2)
  const [textHistory, setTextHistory] = useState<ToolSettingsState[]>([])
  const [textFuture, setTextFuture] = useState<ToolSettingsState[]>([])
  const [textToolMode, setTextToolMode] = useState<'move' | 'text'>('move')
  const [textPreviewImgWidth, setTextPreviewImgWidth] = useState(0)
  const [pixelateMode, setPixelateMode] = useState<'brush' | 'eraser'>('brush')
  const [pixelateAreas, setPixelateAreas] = useState<CropArea[]>([])
  const [pixelateHistory, setPixelateHistory] = useState<string[]>(['Original'])
  const [blurMode, setBlurMode] = useState<'brush' | 'eraser'>('brush')
  const [blurAreas, setBlurAreas] = useState<CropArea[]>([])
  const [blurHistory, setBlurHistory] = useState<string[]>(['Original'])
  const [changeColorMode, setChangeColorMode] = useState<'brush' | 'eraser'>('brush')
  const [changeColorAreas, setChangeColorAreas] = useState<ColorArea[]>([])
  const [changeColorHistory, setChangeColorHistory] = useState<string[]>(['Original'])
  const [backgroundAreas, setBackgroundAreas] = useState<BackgroundArea[]>([])
  const [backgroundCompare, setBackgroundCompare] = useState(true)
  const [upscaleCompare, setUpscaleCompare] = useState(true)
  const [upscaleCustomMode, setUpscaleCustomMode] = useState(false)
  const [memePanel, setMemePanel] = useState<'text' | 'image'>('text')
  const [memeHistory, setMemeHistory] = useState<string[]>(['Meme created'])
  const [convertSort, setConvertSort] = useState<'custom' | 'name' | 'size'>('name')
  const [enhancePanel, setEnhancePanel] = useState<'adjust' | 'filters'>('adjust')
  const [pdfSort, setPdfSort] = useState<'custom' | 'name' | 'size'>('custom')
  const [pdfOptions, setPdfOptions] = useState<PdfOptions>({
    pageSize: 'a4',
    orientation: 'portrait',
    margin: 20,
    imageFit: 'fit',
    spacing: 10,
    caption: false,
    sameSize: true,
    compress: true,
  })
  const [photoGridOptions, setPhotoGridOptions] = useState<PhotoGridOptions>({
    columns: 2,
    rows: 2,
    aspectRatio: '1:1',
    spacing: 20,
    border: 4,
    radius: 12,
    background: '#ffffff',
  })
  const [photoGridOffsets, setPhotoGridOffsets] = useState<PhotoGridOffsets>({})
  const [activePhotoGridIndex, setActivePhotoGridIndex] = useState(0)
  const [photoGridZoom, setPhotoGridZoom] = useState(100)
  const [gifOptions, setGifOptions] = useState<GifOptions>({
    width: 1280,
    height: 720,
    fit: 'contain',
    frameDuration: 0.5,
    loop: 'forever',
    colors: 128,
    optimize: true,
  })
  const [gifPreviewIndex, setGifPreviewIndex] = useState(0)
  const [gifPlaying, setGifPlaying] = useState(false)
  const [gifSpeed, setGifSpeed] = useState(1)
  const [collageOptions, setCollageOptions] = useState<CollageOptions>({
    width: 1080,
    height: 1080,
    background: '#f7f1ea',
    spacing: 20,
    radius: 8,
    template: 'polaroid',
    text: '♡ Good vibes ♡',
    sticker: '🌿',
  })
  const [collageItems, setCollageItems] = useState<CollageItem[]>([])
  const [activeCollageItemId, setActiveCollageItemId] = useState<number | null>(null)
  const [collageToolMode, setCollageToolMode] = useState<'select' | 'move' | 'text' | 'sticker'>('select')
  const [collageZoom, setCollageZoom] = useState(100)
  const [removeExifMode, setRemoveExifMode] = useState<'all' | 'location'>('all')
  const textPreviewImageRef = useRef<HTMLImageElement | null>(null)
  const textSelectionBoxRef = useRef<HTMLDivElement | null>(null)
  const textPreviewTextRef = useRef<HTMLElement | null>(null)
  const watermarkImageOverlayRef = useRef<HTMLImageElement | null>(null)
  const [settings, setSettings] = useState<ToolSettingsState>({
    format: tool.slug === 'convert-to-webp' ? 'image/webp' : 'image/jpeg',
    quality: 1,
    width: 0,
    height: 0,
    resizeMode: 'pixels',
    percentage: 100,
    keepAspect: true,
    cropX: 0,
    cropY: 0,
    cropWidth: 0,
    cropHeight: 0,
    angle: tool.slug === 'rotate-image' ? 90 : 0,
    flipX: tool.slug === 'flip-image',
    flipY: false,
    text: tool.slug === 'add-text' ? 'Adventure Awaits' : 'NanoImage',
    textSize: tool.slug === 'add-text' ? 120 : 54,
    textColor: '#ffffff',
    textXPercent: 50,
    textYPercent: 47,
    textBoxWidthPercent: 74,
    textBoxHeightPercent: 45,
    textBold: true,
    textItalic: false,
    textUnderline: false,
    textShadow: true,
    textOutline: false,
    textAlign: 'center',
    textShadowColor: '#000000',
    textOutlineColor: '#ffffff',
    textShadowBlur: 12,
    textShadowOffsetX: 4,
    textShadowOffsetY: 4,
    memeTopText: 'WHEN YOU FINISH ALL YOUR TASKS',
    memeBottomText: "AND IT'S ONLY 10AM",
    memeFont: 'Impact',
    memeOutlineWidth: 4,
    watermarkMode: 'text',
    watermarkImageDataUrl: '',
    watermarkImageName: '',
    watermarkOpacity: 0.35,
    blur: 10,
    pixelSize: 12,
    background: '#ffffff',
    colorTolerance: 78,
    backgroundMode: 'color',
    backgroundImageDataUrl: '',
    backgroundImageName: '',
    brightness: 12,
    contrast: 18,
    saturation: 20,
    vibrance: 15,
    exposure: 6,
    highlights: -10,
    shadows: 25,
    sharpness: 30,
    clarity: 15,
    warmth: 5,
    tint: 0,
    upscaleScale: 2,
    resampling: 'smooth',
  })

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  useEffect(() => () => {
    if (processed) URL.revokeObjectURL(processed.url)
  }, [processed])

  useEffect(() => () => {
    batch.forEach((item) => URL.revokeObjectURL(item.url))
  }, [batch])

  const filePreviewUrls = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files])

  useEffect(() => () => {
    filePreviewUrls.forEach((url) => URL.revokeObjectURL(url))
  }, [filePreviewUrls])

  useEffect(() => {
    if (tool.slug !== 'gif-maker' || !gifPlaying || files.length < 2) return undefined
    const interval = window.setInterval(() => {
      setGifPreviewIndex((index) => (index + 1) % files.length)
    }, Math.max(80, (gifOptions.frameDuration * 1000) / gifSpeed))
    return () => window.clearInterval(interval)
  }, [files.length, gifOptions.frameDuration, gifPlaying, gifSpeed, tool.slug])

  const clearOutputs = useCallback(() => {
    setError('')
    setStatus('')
    setMetadata(null)
    setProcessed(null)
    setBatch([])
  }, [])

  const handleFiles = useCallback(async (nextFiles: File[]) => {
    clearOutputs()
    const accepted = nextFiles.filter((file) => file.type.startsWith('image/'))
    if (!accepted.length) {
      setError(t.tool.errorNotImage)
      return
    }
    const maxFiles = tool.slug === 'gif-maker' ? 50 : 20
    if (['batch-compress', 'gif-maker', 'image-collage'].includes(tool.slug) && accepted.length > maxFiles) {
      setError(t.tool.errorTooMany.replace('{max}', String(maxFiles)))
      return
    }
    setFiles(['batch-compress', 'image-to-pdf', 'convert-image', 'convert-to-webp', 'photo-grid', 'gif-maker', 'image-collage'].includes(tool.slug) ? accepted : accepted.slice(0, 1))
    const first = accepted[0]
    setPreviewUrl(URL.createObjectURL(first))
    const bitmap = await loadBitmap(first)
    if (tool.slug === 'compress-image') {
      setCompressPreset('high')
      setSettings((value) => ({
        ...value,
        format: 'image/jpeg',
      }))
    }
    if (tool.slug === 'resize-image') {
      setSettings((value) => ({
        ...value,
        quality: 1,
        percentage: 100,
      }))
    }
    setSettings((value) => ({
      ...value,
      quality: 1,
      width: bitmap.width,
      height: bitmap.height,
      cropWidth: bitmap.width,
      cropHeight: bitmap.height,
    }))
    if (tool.slug === 'crop-image') {
      setCropMode('single')
      setActiveCropId(1)
      setNextCropId(2)
      setCropAreas([{ id: 1, x: 0, y: 0, width: bitmap.width, height: bitmap.height }])
      setSettings((value) => ({ ...value, quality: 1 }))
    }
    if (tool.slug === 'add-text') {
      setTextLayers([textLayerFromSettings(1, {
        ...settings,
        text: 'Adventure Awaits',
        textSize: 120,
        textXPercent: 50,
        textYPercent: 47,
        textBoxWidthPercent: 74,
        textBoxHeightPercent: 45,
      })])
      setActiveTextLayerId(1)
      setNextTextLayerId(2)
      setTextHistory([])
      setTextFuture([])
      setTextPreviewImgWidth(0)
    }
    if (tool.slug === 'pixelate-image') {
      const size = Math.round(Math.min(bitmap.width, bitmap.height) * 0.23)
      setPixelateMode('brush')
      setPixelateAreas([])
      setPixelateHistory(['Original'])
      setSettings((value) => ({
        ...value,
        cropX: Math.round(bitmap.width * 0.18),
        cropY: Math.round(bitmap.height * 0.48),
        cropWidth: size,
        cropHeight: size,
        pixelSize: 25,
      }))
    }
    if (tool.slug === 'blur-image') {
      const size = defaultBlurBrushSize(bitmap.width, bitmap.height)
      setBlurMode('brush')
      setBlurAreas([])
      setBlurHistory(['Original'])
      setSettings((value) => ({
        ...value,
        cropX: Math.round(bitmap.width * 0.62),
        cropY: Math.round(bitmap.height * 0.56),
        cropWidth: size,
        cropHeight: size,
        blur: 12,
      }))
    }
    if (tool.slug === 'change-color') {
      const size = Math.round(Math.min(bitmap.width, bitmap.height) * 0.28)
      setChangeColorMode('brush')
      setChangeColorAreas([])
      setChangeColorHistory(['Original'])
      setRotateZoom(100)
      setSettings((value) => ({
        ...value,
        background: '#7d52ff',
        cropX: Math.round(bitmap.width * 0.36),
        cropY: Math.round(bitmap.height * 0.34),
        cropWidth: size,
        cropHeight: size,
        colorTolerance: 78,
        colorAreas: [],
      }))
    }
    if (tool.slug === 'change-background') {
      const size = Math.round(Math.min(bitmap.width, bitmap.height) * 0.24)
      setBackgroundAreas([])
      setBackgroundCompare(true)
      setRotateZoom(100)
      setSettings((value) => ({
        ...value,
        background: '#ffffff',
        colorTolerance: 72,
        cropX: Math.max(0, Math.round(bitmap.width * 0.08)),
        cropY: Math.max(0, Math.round(bitmap.height * 0.08)),
        cropWidth: size,
        cropHeight: size,
        backgroundAreas: [],
        backgroundMode: 'color',
        backgroundImageDataUrl: '',
        backgroundImageName: '',
      }))
    }
    if (tool.slug === 'enhance-image') {
      setRotateZoom(100)
      setEnhancePanel('adjust')
      setSettings((value) => ({
        ...value,
        brightness: 12,
        contrast: 18,
        saturation: 20,
        vibrance: 15,
        exposure: 6,
        highlights: -10,
        shadows: 25,
        sharpness: 30,
        clarity: 15,
        warmth: 5,
        tint: 0,
      }))
    }
    if (tool.slug === 'photo-grid') {
      setPhotoGridZoom(100)
      setPhotoGridOffsets({})
      setActivePhotoGridIndex(0)
      setPhotoGridOptions((current) => ({
        ...current,
        columns: accepted.length >= 6 ? 3 : 2,
        rows: Math.max(1, Math.ceil(Math.min(accepted.length, 8) / (accepted.length >= 6 ? 3 : 2))),
      }))
    }
    if (tool.slug === 'gif-maker') {
      setGifPreviewIndex(0)
      setGifPlaying(false)
      setGifOptions((current) => ({
        ...current,
        width: 1280,
        height: 720,
        frameDuration: 0.5,
        fit: 'contain',
        loop: 'forever',
      }))
    }
    if (tool.slug === 'image-collage') {
      setCollageZoom(100)
      setActiveCollageItemId(1)
      setCollageItems(createCollageItems(accepted.length, 'polaroid'))
      setCollageOptions((current) => ({
        ...current,
        width: 1080,
        height: 1080,
        template: 'polaroid',
        background: '#f7f1ea',
        spacing: 20,
        radius: 8,
      }))
    }
    if (tool.slug === 'upscale-image') {
      setRotateZoom(100)
      setUpscaleCompare(true)
      setUpscaleCustomMode(false)
      setSettings((value) => ({
        ...value,
        upscaleScale: 2,
        resampling: 'smooth',
        width: bitmap.width * 2,
        height: bitmap.height * 2,
        sharpness: 35,
        quality: 1,
        format: 'image/jpeg',
      }))
    }
    if (tool.slug === 'meme-generator') {
      setTextZoom(100)
      setMemePanel('text')
      setMemeHistory(['Meme created'])
      setSettings((value) => ({
        ...value,
        format: 'image/jpeg',
        quality: 1,
        textColor: '#ffffff',
        textAlign: 'center',
        textBold: true,
        memeTopText: value.memeTopText || 'WHEN YOU FINISH ALL YOUR TASKS',
        memeBottomText: value.memeBottomText || "AND IT'S ONLY 10AM",
        memeFont: 'Impact',
        memeOutlineWidth: 4,
        textSize: Math.max(42, Math.round(bitmap.width * 0.07)),
      }))
    }
    if (tool.slug === 'remove-exif') {
      setRemoveExifMode('all')
      try {
        const parsed = await exifr.parse(first)
        setMetadata(parsed ?? {})
      } catch {
        setMetadata({})
      }
    }
  }, [clearOutputs, settings, tool.slug])

  useEffect(() => {
    if (!pendingUpload?.files.length) return
    const upload = pendingUpload.files
    queueMicrotask(() => {
      void handleFiles(upload)
      onPendingUploadConsumed?.()
    })
  }, [handleFiles, onPendingUploadConsumed, pendingUpload])

  const process = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setStatus(t.tool.processingBrowser)
    try {
      if (!files.length) throw new Error(t.tool.errorPleaseUpload)
      if (tool.slug === 'batch-compress') {
        const results = await Promise.all(files.map((file) => processImage(file, tool.slug, settings)))
        const zip = new JSZip()
        results.forEach((item) => zip.file(item.name, item.blob))
        const zipBlob = await zip.generateAsync({ type: 'blob' })
        setProcessed({
          name: 'nanoimage-compressed-images.zip',
          blob: zipBlob,
          size: zipBlob.size,
          url: URL.createObjectURL(zipBlob),
        })
        setBatch(results)
      } else if (tool.slug === 'image-to-pdf') {
        const blob = await createPdf(files, pdfOptions)
        setProcessed({
          name: 'nanoimage-images.pdf',
          blob,
          size: blob.size,
          url: URL.createObjectURL(blob),
        })
      } else if (tool.slug === 'gif-maker') {
        if (files.length < 2) throw new Error(t.tool.errorTwoImages)
        const blob = await createGif(files, gifOptions)
        setProcessed({
          name: 'nanoimage-animation.gif',
          blob,
          size: blob.size,
          url: URL.createObjectURL(blob),
        })
      } else if (tool.slug === 'image-collage') {
        if (!files.length) throw new Error('Please upload images first.')
        const result = await createImageCollage(files, collageOptions, collageItems.length ? collageItems : createCollageItems(files.length, collageOptions.template))
        setProcessed(result)
      } else {
        let processSettings = settings
        const previewImageRect = textPreviewImageRef.current?.getBoundingClientRect()
        const selectionBoxRect = textSelectionBoxRef.current?.getBoundingClientRect()
        const watermarkImageRect = watermarkImageOverlayRef.current?.getBoundingClientRect()
        const previewImageWidth = previewImageRect?.width || textPreviewImgWidth
        if ((tool.slug === 'add-text' || tool.slug === 'add-watermark') && previewImageWidth > 0 && settings.width > 0) {
          const scale = settings.width / previewImageWidth
          const previewFontSize = textPreviewTextRef.current
            ? Number.parseFloat(window.getComputedStyle(textPreviewTextRef.current).fontSize)
            : settings.textSize
          const measuredRect = settings.watermarkMode === 'image' ? watermarkImageRect : selectionBoxRect
          const measuredBox = previewImageRect && measuredRect
            ? {
                textXPercent: ((measuredRect.left + measuredRect.width / 2 - previewImageRect.left) / previewImageRect.width) * 100,
                textYPercent: ((measuredRect.top + measuredRect.height / 2 - previewImageRect.top) / previewImageRect.height) * 100,
                textBoxWidthPercent: (measuredRect.width / previewImageRect.width) * 100,
                textBoxHeightPercent: (measuredRect.height / previewImageRect.height) * 100,
              }
            : {}
          processSettings = {
            ...settings,
            ...measuredBox,
            textSize: Math.round(previewFontSize * scale),
            textShadowBlur: Math.round(settings.textShadowBlur * scale),
            textShadowOffsetX: Math.round(settings.textShadowOffsetX * scale),
            textShadowOffsetY: Math.round(settings.textShadowOffsetY * scale),
          }
          if (tool.slug === 'add-text') {
            processSettings = {
              ...processSettings,
              textLayers: textLayers.map((layer) => (
                layer.id === activeTextLayerId ? textLayerFromSettings(layer.id, processSettings) : layer
              )),
            }
          }
        }
        setProcessed(await processImage(files[0], tool.slug, processSettings))
      }
      setStatus('Done. Your result is ready to download.')
      if (tool.slug === 'meme-generator') {
        setMemeHistory((history) => ['Meme created', ...history].slice(0, 5))
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong while processing this image.')
      setStatus('')
    }
  }

  const resetTool = () => {
    setFiles([])
    setPreviewUrl('')
    clearOutputs()
  }

  const downloadProcessedFile = (item: ProcessedFile) => {
    const link = document.createElement('a')
    link.href = item.url
    link.download = item.name
    link.click()
  }

  const processCropAndDownload = async (area?: CropArea) => {
    setError('')
    setStatus(t.tool.processingBrowser)
    try {
      if (!files.length) throw new Error(t.tool.errorPleaseUpload)
      const cropSettings = area
        ? { ...settings, cropX: area.x, cropY: area.y, cropWidth: area.width, cropHeight: area.height }
        : settings
      const result = await processImage(files[0], tool.slug, cropSettings)
      setProcessed(result)
      setStatus('Done. Your result is ready to download.')
      downloadProcessedFile(result)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong while processing this image.')
      setStatus('')
    }
  }

  const resultSaved =
    files[0] && processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf')
      ? Math.max(0, files[0].size - processed.size)
      : 0
  const resultSavedPercent = files[0] && resultSaved > 0 ? Math.round((resultSaved / files[0].size) * 100) : 0
  const isBatchUpload = tool.slug === 'batch-compress' || tool.slug === 'image-to-pdf'
  const isCompressTool = tool.slug === 'compress-image'
  const actionSummary = resultSaved > 0
    ? `Save ${formatSize(resultSaved)} (${resultSavedPercent}%)`
    : processed
      ? 'Result ready'
      : 'Run the tool to prepare a download'
  const totalOriginalSize = files.reduce((sum, file) => sum + file.size, 0)
  const totalCompressedSize = batch.reduce((sum, item) => sum + item.size, 0)
  const totalBatchSaved = totalCompressedSize > 0 ? Math.max(0, totalOriginalSize - totalCompressedSize) : 0
  const totalBatchSavedPercent = totalOriginalSize > 0 && totalBatchSaved > 0
    ? Math.round((totalBatchSaved / totalOriginalSize) * 100)
    : 0

  if (tool.slug === 'crop-image') {
    const normalizeCropArea = (area: CropArea) => {
      const maxWidth = Math.max(1, settings.width)
      const maxHeight = Math.max(1, settings.height)
      const width = clamp(Math.round(area.width), 24, maxWidth)
      const height = clamp(Math.round(area.height), 24, maxHeight)
      return {
        ...area,
        x: clamp(Math.round(area.x), 0, Math.max(0, maxWidth - width)),
        y: clamp(Math.round(area.y), 0, Math.max(0, maxHeight - height)),
        width,
        height,
      }
    }

    const activeCropArea = cropAreas.find((area) => area.id === activeCropId)
      ?? cropAreas[0]
      ?? { id: 1, x: settings.cropX, y: settings.cropY, width: settings.cropWidth, height: settings.cropHeight }

    const syncCropSettings = (area: CropArea) => {
      setSettings((value) => ({
        ...value,
        cropX: area.x,
        cropY: area.y,
        cropWidth: area.width,
        cropHeight: area.height,
      }))
    }

    const selectCropArea = (area: CropArea) => {
      const nextArea = normalizeCropArea(area)
      setActiveCropId(nextArea.id)
      syncCropSettings(nextArea)
    }

    const updateCropArea = (id: number, patch: Partial<CropArea>) => {
      clearOutputs()
      const source = cropAreas.find((area) => area.id === id) ?? activeCropArea
      const nextArea = normalizeCropArea({ ...source, ...patch })
      setCropAreas((current) => current.length
        ? current.map((area) => area.id === id ? nextArea : area)
        : [nextArea])
      setActiveCropId(id)
      syncCropSettings(nextArea)
    }

    const addCropArea = () => {
      if (!settings.width || !settings.height) return
      clearOutputs()
      const areaWidth = Math.max(48, Math.round(settings.width * 0.38))
      const areaHeight = Math.max(48, Math.round(settings.height * 0.34))
      const nextArea = normalizeCropArea({
        id: nextCropId,
        x: Math.round((settings.width - areaWidth) / 2),
        y: Math.round((settings.height - areaHeight) / 2),
        width: areaWidth,
        height: areaHeight,
      })
      setCropMode('multiple')
      setCropAreas((current) => [...(current.length ? current : [activeCropArea]), nextArea])
      setActiveCropId(nextArea.id)
      setNextCropId((value) => value + 1)
      syncCropSettings(nextArea)
    }

    const deleteCropArea = (id = activeCropId) => {
      clearOutputs()
      if (cropAreas.length <= 1) {
        const resetArea = normalizeCropArea({ id: 1, x: 0, y: 0, width: settings.width, height: settings.height })
        setCropAreas([resetArea])
        setActiveCropId(1)
        syncCropSettings(resetArea)
        return
      }
      const remaining = cropAreas.filter((area) => area.id !== id)
      const nextArea = remaining[0]
      setCropAreas(remaining)
      setActiveCropId(nextArea.id)
      syncCropSettings(nextArea)
    }

    const resetCropSelection = () => {
      clearOutputs()
      const resetArea = normalizeCropArea({ id: activeCropId || 1, x: 0, y: 0, width: settings.width, height: settings.height })
      setCropAreas((current) => {
        if (!current.length) return [resetArea]
        return current.map((area) => area.id === resetArea.id ? resetArea : area)
      })
      setActiveCropId(resetArea.id)
      syncCropSettings(resetArea)
    }

    const handleCropPointerDown = (
      area: CropArea,
      event: ReactPointerEvent<HTMLElement>,
      mode: 'move' | 'resize' = 'move',
      corner: 'tl' | 'tr' | 'bl' | 'br' = 'br',
    ) => {
      const stage = event.currentTarget.closest('.crop-image-stage') as HTMLElement | null
      if (!stage || !settings.width || !settings.height) return
      event.preventDefault()
      event.stopPropagation()
      clearOutputs()
      selectCropArea(area)
      const rect = stage.getBoundingClientRect()
      const startX = event.clientX
      const startY = event.clientY
      const startArea = normalizeCropArea(area)
      const scaleX = settings.width / rect.width
      const scaleY = settings.height / rect.height

      const moveCrop = (moveEvent: PointerEvent) => {
        const deltaX = Math.round((moveEvent.clientX - startX) * scaleX)
        const deltaY = Math.round((moveEvent.clientY - startY) * scaleY)
        if (mode === 'move') {
          updateCropArea(area.id, { x: startArea.x + deltaX, y: startArea.y + deltaY })
          return
        }

        const minSize = 24
        let nextX = startArea.x
        let nextY = startArea.y
        let nextWidth = startArea.width
        let nextHeight = startArea.height

        if (corner.includes('l')) {
          nextX = clamp(startArea.x + deltaX, 0, startArea.x + startArea.width - minSize)
          nextWidth = startArea.width + (startArea.x - nextX)
        }
        if (corner.includes('r')) {
          nextWidth = clamp(startArea.width + deltaX, minSize, settings.width - startArea.x)
        }
        if (corner.includes('t')) {
          nextY = clamp(startArea.y + deltaY, 0, startArea.y + startArea.height - minSize)
          nextHeight = startArea.height + (startArea.y - nextY)
        }
        if (corner.includes('b')) {
          nextHeight = clamp(startArea.height + deltaY, minSize, settings.height - startArea.y)
        }

        updateCropArea(area.id, { x: nextX, y: nextY, width: nextWidth, height: nextHeight })
      }

      const stopMove = () => {
        window.removeEventListener('pointermove', moveCrop)
        window.removeEventListener('pointerup', stopMove)
      }

      window.addEventListener('pointermove', moveCrop)
      window.addEventListener('pointerup', stopMove)
    }

    const updateActiveCropArea = (patch: Partial<CropArea>) => updateCropArea(activeCropArea.id, patch)
    const visibleCropAreas = cropMode === 'multiple' ? cropAreas : [activeCropArea]
    const processAllCropAreasAndDownload = async () => {
      setError('')
      setStatus('Processing all crop areas in your browser...')
      try {
        if (!files.length) throw new Error(t.tool.errorPleaseUpload)
        const areas = cropAreas.length ? cropAreas : [activeCropArea]
        const results = await Promise.all(areas.map((area) => processImage(files[0], tool.slug, {
          ...settings,
          cropX: area.x,
          cropY: area.y,
          cropWidth: area.width,
          cropHeight: area.height,
        })))
        const zip = new JSZip()
        results.forEach((item, index) => zip.file(`crop-area-${index + 1}-${item.name}`, item.blob))
        const zipBlob = await zip.generateAsync({ type: 'blob' })
        const result = {
          name: 'nanoimage-cropped-areas.zip',
          blob: zipBlob,
          size: zipBlob.size,
          url: URL.createObjectURL(zipBlob),
        }
        setProcessed(result)
        setBatch(results)
        setStatus('Done. Your cropped areas are ready to download.')
        downloadProcessedFile(result)
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Something went wrong while processing these crop areas.')
        setStatus('')
      }
    }
    const cropAreaStyle = (area: CropArea) => ({
      left: `${settings.width ? (area.x / settings.width) * 100 : 7}%`,
      top: `${settings.height ? (area.y / settings.height) * 100 : 10}%`,
      width: `${settings.width ? (area.width / settings.width) * 100 : 42}%`,
      height: `${settings.height ? (area.height / settings.height) * 100 : 38}%`,
    }) as CSSProperties
    const cropStageStyle = {
      aspectRatio: settings.width && settings.height ? `${settings.width} / ${settings.height}` : undefined,
      width: settings.width && settings.height
        ? `min(100%, ${Math.round((settings.width / settings.height) * 470)}px)`
        : undefined,
    } as CSSProperties

    return (
      <div className="workspace crop-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle"><HomeIcon name="crop" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="lock" /> Your images stay private</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="smile" /> Always free. No limits.</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h2><HomeIcon name="sparkle" /> Tips for cropping</h2>
            <p>✓ Drag the corners or edges to adjust areas.</p>
            <p>✓ Hold Shift to keep the aspect ratio.</p>
            <p>✓ You can move a selected area by dragging inside.</p>
            <p>✓ Create multiple crops for different formats.</p>
          </aside>
        </div>
        <form className={`crop-layout ${cropMode === 'single' ? 'single-crop-layout' : ''}`} onSubmit={process}>
          <aside className="settings-panel crop-settings-panel">
            <h2>Crop Settings</h2>
            <div className="crop-mode-grid">
              <button className={cropMode === 'single' ? 'active' : ''} type="button" onClick={() => setCropMode('single')}><HomeIcon name="crop" /> Single Area <small>Crop one part</small></button>
              <button className={cropMode === 'multiple' ? 'active' : ''} type="button" onClick={() => setCropMode('multiple')}><HomeIcon name="grid" /> Multiple Areas <small>Crop several parts</small></button>
            </div>
            <label>
              Aspect Ratio
              <select>
                <option>Free</option>
                <option>1:1 Square</option>
                <option>4:3</option>
                <option>16:9</option>
                <option>9:16</option>
              </select>
            </label>
            <div className="crop-number-grid">
              <label>Crop X<input min="0" type="number" value={settings.cropX} onChange={(event) => updateActiveCropArea({ x: Number(event.target.value) })} /></label>
              <label>Crop Y<input min="0" type="number" value={settings.cropY} onChange={(event) => updateActiveCropArea({ y: Number(event.target.value) })} /></label>
              <label>Width<input min="1" type="number" value={settings.cropWidth} onChange={(event) => updateActiveCropArea({ width: Number(event.target.value) })} /></label>
              <label>Height<input min="1" type="number" value={settings.cropHeight} onChange={(event) => updateActiveCropArea({ height: Number(event.target.value) })} /></label>
            </div>
            <div className="resize-section">
              <span className="field-title">Output Format</span>
              <div className="format-pills">
                {Object.entries(formatLabels).map(([value, label]) => (
                  <button
                    className={settings.format === value ? 'active' : ''}
                    key={value}
                    type="button"
                    onClick={() => {
                      clearOutputs()
                      setSettings((current) => ({ ...current, format: value as OutputFormat }))
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <label>
              Image Quality {Math.round(settings.quality * 100)}%
              <input min="0.35" max="1" step="0.01" type="range" value={settings.quality} onChange={(event) => {
                clearOutputs()
                setSettings((value) => ({ ...value, quality: Number(event.target.value) }))
              }} />
            </label>
            <label className="toggle-row metadata-toggle">
              <input type="checkbox" defaultChecked />
              Keep metadata (EXIF)
            </label>
            <div className="how-to-card">
              <h3>How to crop</h3>
              <p>1. Upload your image</p>
              <p>2. Adjust the crop area</p>
              <p>3. Download selected or all cropped images</p>
            </div>
          </aside>

          <section className="crop-editor-card">
            <div className="crop-editor-toolbar">
              <div>
                <strong>{files[0]?.name ?? 'Upload an image'}</strong>
                {files[0] && <span>{settings.width} × {settings.height} · {formatSize(files[0].size)}</span>}
              </div>
              <div>
                {cropMode === 'multiple' && <button className="secondary" type="button" onClick={addCropArea}><HomeIcon name="crop" /> Add Area</button>}
                {cropMode === 'multiple' && <button className="secondary" type="button" onClick={() => deleteCropArea()}><HomeIcon name="trash" /> Delete Area</button>}
                <button className="secondary" type="button">−</button>
                <span>100%</span>
                <button className="secondary" type="button">+</button>
              </div>
            </div>
            {previewUrl ? (
              <div className="crop-canvas">
                <div className="crop-image-stage" style={cropStageStyle}>
                  <img src={previewUrl} alt="Crop preview" />
                  <div className="crop-mask"></div>
                  {visibleCropAreas.map((area, index) => (
                    <div
                      className={`crop-box ${area.id === activeCropId ? 'active-crop-box primary-box' : index % 2 === 0 ? 'yellow-box' : 'green-box'}`}
                      key={area.id}
                      style={cropAreaStyle(area)}
                      onPointerDown={(event) => handleCropPointerDown(area, event)}
                    >
                      <span>{index + 1}</span>
                      <i onPointerDown={(event) => handleCropPointerDown(area, event, 'resize', 'tl')}></i>
                      <i onPointerDown={(event) => handleCropPointerDown(area, event, 'resize', 'tr')}></i>
                      <i onPointerDown={(event) => handleCropPointerDown(area, event, 'resize', 'bl')}></i>
                      <i onPointerDown={(event) => handleCropPointerDown(area, event, 'resize', 'br')}></i>
                    </div>
                  ))}
                </div>
                <div className="crop-hint"><HomeIcon name="crop" /> Drag inside to move · drag corners to resize</div>
              </div>
            ) : (
              <div className="empty-preview">Upload an image to start cropping.</div>
            )}
            <div className="crop-bottom-bar">
              <button className="secondary" type="button" onClick={resetCropSelection}><HomeIcon name="rotate" /> Reset</button>
              <span className="privacy-note"><HomeIcon name="lock" /> Your images are processed in your browser. We never upload your files.</span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> {cropMode === 'multiple' ? 'Download All Areas' : 'Download Selected'}</a>
              ) : (
                <button className="primary" type="button" onClick={() => cropMode === 'multiple' ? processAllCropAreasAndDownload() : processCropAndDownload()}><HomeIcon name="download" /> {cropMode === 'multiple' ? 'Download All Areas' : 'Download Selected'}</button>
              )}
            </div>
          </section>

          {cropMode === 'multiple' && <aside className="cropped-areas-card">
            <div className="areas-heading">
              <h2>Cropped Areas ({cropAreas.length})</h2>
              <button type="button" onClick={addCropArea}>Add Area</button>
            </div>
            {cropAreas.map((area, index) => (
              <div className={`cropped-area-item ${area.id === activeCropId ? 'active' : ''}`} key={area.id} onClick={() => selectCropArea(area)}>
                <span className={area.id === activeCropId ? 'purple' : index % 2 === 0 ? 'yellow' : 'green'}>{index + 1}</span>
                <div className="area-thumb"><HomeIcon name="image" /></div>
                <div>
                  <strong>Area {index + 1}</strong>
                  <small>{area.width} × {area.height} <em>{area.x}, {area.y}</em></small>
                </div>
                <button type="button" onClick={(event) => { event.stopPropagation(); selectCropArea(area); void processCropAndDownload(area) }}><HomeIcon name="download" /></button>
                <button type="button" onClick={(event) => { event.stopPropagation(); deleteCropArea(area.id) }}><HomeIcon name="trash" /></button>
              </div>
            ))}
            <p className="crop-tip">Tip: You can reorder the crops by dragging the items.</p>
          </aside>}
        </form>
      </div>
    )
  }

  if (tool.slug === 'change-background') {
    const palette = ['#ffffff', '#d8dde2', '#050505', '#ef3f78', '#ff7a3d', '#ffc233', '#ffd81f', '#43c99a', '#32b8d8', '#2f7de1', '#6d4de7', '#7d52ff', '#a039b7']
    const updateBackground = (background: string) => {
      clearOutputs()
      setSettings((current) => ({ ...current, background, backgroundMode: 'color' }))
    }
    const updateBackgroundBrushSize = (size: number) => {
      clearOutputs()
      setSettings((current) => {
        const centerX = current.cropX + (current.cropWidth || size) / 2
        const centerY = current.cropY + (current.cropHeight || size) / 2
        return {
          ...current,
          cropX: Math.round(clamp(centerX - size / 2, 0, Math.max(0, current.width - size))),
          cropY: Math.round(clamp(centerY - size / 2, 0, Math.max(0, current.height - size))),
          cropWidth: size,
          cropHeight: size,
        }
      })
    }
    const setBackgroundMode = (backgroundMode: BackgroundMode) => {
      clearOutputs()
      setSettings((current) => ({
        ...current,
        backgroundMode,
        format: backgroundMode === 'transparent' ? 'image/png' : current.format,
        background: backgroundMode === 'gradient'
          ? '#7d52ff'
          : backgroundMode === 'transparent'
            ? 'transparent'
            : backgroundMode === 'color' && current.background === 'transparent'
              ? '#ffffff'
              : current.background,
      }))
    }
    const resetBackgroundSettings = () => {
      clearOutputs()
      setRotateZoom(100)
      setBackgroundCompare(true)
      setBackgroundAreas([])
      setSettings((current) => ({
        ...current,
        colorTolerance: 72,
        background: '#ffffff',
        backgroundMode: 'color',
        backgroundImageDataUrl: '',
        backgroundImageName: '',
        backgroundAreas: [],
      }))
    }
    const handleBackgroundImage = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      event.currentTarget.value = ''
      if (!file) return
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image background file.')
        return
      }
      clearOutputs()
      setSettings((current) => ({
        ...current,
        backgroundMode: 'image',
        backgroundImageDataUrl: '',
        backgroundImageName: file.name,
      }))
      const dataUrl = await fileToDataUrl(file)
      setSettings((current) => ({ ...current, backgroundImageDataUrl: dataUrl }))
    }
    const previewScale = rotateZoom / 100
    const backgroundSelectionStyle = {
      left: `${settings.width && settings.cropWidth ? ((settings.cropX + settings.cropWidth / 2) / settings.width) * 100 : 10}%`,
      top: `${settings.height && settings.cropHeight ? ((settings.cropY + settings.cropHeight / 2) / settings.height) * 100 : 10}%`,
      width: `${settings.width && settings.cropWidth ? (settings.cropWidth / settings.width) * 100 : 24}%`,
      height: `${settings.height && settings.cropHeight ? (settings.cropHeight / settings.height) * 100 : 24}%`,
      transform: `translate(-50%, -50%) scale(${previewScale})`,
      ...backgroundMarkerPaint(settings.backgroundMode, settings.background, settings.backgroundImageDataUrl),
    } as CSSProperties
    const committedBackgroundStyles = backgroundAreas.map((area) => ({
      left: `${settings.width ? ((area.x + area.width / 2) / settings.width) * 100 : 10}%`,
      top: `${settings.height ? ((area.y + area.height / 2) / settings.height) * 100 : 10}%`,
      width: `${settings.width ? (area.width / settings.width) * 100 : 24}%`,
      height: `${settings.height ? (area.height / settings.height) * 100 : 24}%`,
      transform: `translate(-50%, -50%) scale(${previewScale})`,
      ...backgroundMarkerPaint(area.backgroundMode, area.background, area.backgroundImageDataUrl),
    }) as CSSProperties)
    const previewBackgroundStyle = {
      backgroundColor: settings.backgroundMode === 'transparent' ? undefined : settings.background,
      backgroundImage: settings.backgroundMode === 'image' && settings.backgroundImageDataUrl
        ? `url(${settings.backgroundImageDataUrl})`
        : settings.backgroundMode === 'gradient'
          ? 'linear-gradient(135deg, #7d52ff, #32b8d8 52%, #ffc233)'
          : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    } as CSSProperties
    const placeBackgroundSelection = (event: ReactPointerEvent<HTMLElement> | PointerEvent, rect: DOMRect) => {
      if (!settings.width || !settings.height) return null
      const size = settings.cropWidth || Math.round(Math.min(settings.width, settings.height) * 0.24)
      const nextX = ((event.clientX - rect.left) / rect.width) * settings.width - size / 2
      const nextY = ((event.clientY - rect.top) / rect.height) * settings.height - size / 2
      const area: BackgroundArea = {
        id: Date.now(),
        x: Math.round(clamp(nextX, 0, Math.max(0, settings.width - size))),
        y: Math.round(clamp(nextY, 0, Math.max(0, settings.height - size))),
        width: size,
        height: size,
        background: settings.background,
        backgroundMode: settings.backgroundMode,
        backgroundImageDataUrl: settings.backgroundImageDataUrl,
        tolerance: settings.colorTolerance,
      }
      clearOutputs()
      setSettings((current) => ({
        ...current,
        cropX: area.x,
        cropY: area.y,
        cropWidth: size,
        cropHeight: size,
      }))
      return area
    }
    const commitBackgroundArea = (area?: BackgroundArea | null) => {
      const edit = area ?? (settings.cropWidth && settings.cropHeight ? {
        id: Date.now(),
        x: settings.cropX,
        y: settings.cropY,
        width: settings.cropWidth,
        height: settings.cropHeight,
        background: settings.background,
        backgroundMode: settings.backgroundMode,
        backgroundImageDataUrl: settings.backgroundImageDataUrl,
        tolerance: settings.colorTolerance,
      } : null)
      if (!edit) return
      const nextAreas = [...backgroundAreas, edit].slice(-30)
      setBackgroundAreas(nextAreas)
      setSettings((current) => ({ ...current, backgroundAreas: nextAreas }))
      setStatus(`Added background edit ${nextAreas.length}. You can keep selecting or download the image.`)
    }
    const handleBackgroundPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
      const figure = event.currentTarget as HTMLElement
      if (!settings.width || !settings.height) return
      event.preventDefault()
      const imageRect = figure.querySelector('img')?.getBoundingClientRect()
      const rect = imageRect ?? figure.getBoundingClientRect()
      let pendingArea = placeBackgroundSelection(event, rect)
      const moveSelection = (moveEvent: PointerEvent) => {
        pendingArea = placeBackgroundSelection(moveEvent, rect)
      }
      const stopMove = () => {
        commitBackgroundArea(pendingArea)
        window.removeEventListener('pointermove', moveSelection)
        window.removeEventListener('pointerup', stopMove)
      }
      window.addEventListener('pointermove', moveSelection)
      window.addEventListener('pointerup', stopMove)
    }

    return (
      <div className="workspace change-bg-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle"><HomeIcon name="image" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> 100% free</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="shield" /> Your images stay private</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h2><HomeIcon name="sparkle" /> Tips for best results</h2>
            <p>✓ Use a high-resolution image.</p>
            <p>✓ Clear subject edges work best.</p>
            <p>✓ Try different background options.</p>
            <p>✓ Download HD for best quality.</p>
          </aside>
        </div>

        <form className="change-bg-layout" onSubmit={process}>
          <aside className="settings-panel change-bg-settings-panel">
            <h2>Background</h2>
            <div className="background-tabs">
              <button className={settings.backgroundMode === 'color' ? 'active' : ''} type="button" onClick={() => setBackgroundMode('color')}>Color</button>
              <button className={settings.backgroundMode === 'image' ? 'active' : ''} type="button" onClick={() => setBackgroundMode('image')}><HomeIcon name="image" /> Image</button>
              <button className={settings.backgroundMode === 'gradient' ? 'active' : ''} type="button" onClick={() => setBackgroundMode('gradient')}>Gradient</button>
              <button className={settings.backgroundMode === 'transparent' ? 'active' : ''} type="button" onClick={() => setBackgroundMode('transparent')}>Transparent</button>
            </div>
            <label>
              <input type="color" value={settings.background === 'transparent' ? '#ffffff' : settings.background} onChange={(event) => updateBackground(event.target.value)} />
            </label>
            <div className="background-palette">
              {palette.map((color) => (
                <button
                  className={settings.background.toLowerCase() === color ? 'active' : ''}
                  key={color}
                  style={{ background: color }}
                  type="button"
                  onClick={() => updateBackground(color)}
                ></button>
              ))}
            </div>
            <div className="image-background-card">
              <strong>Image Background <em>New</em></strong>
              <label className="secondary full upload-bg-button">
                <HomeIcon name="upload" /> {settings.backgroundImageName || 'Upload Background Image'}
                <input accept="image/*" type="file" onChange={handleBackgroundImage} />
              </label>
            </div>
            <label>
              Fit
              <select>
                <option>Cover</option>
                <option>Contain</option>
                <option>Fill</option>
              </select>
            </label>
            <label>
              Selection Size <span>{settings.cropWidth || 120}px</span>
              <input min="40" max="520" type="range" value={settings.cropWidth || 120} onChange={(event) => updateBackgroundBrushSize(Number(event.target.value))} />
            </label>
            <label>
              Tolerance <span>{settings.colorTolerance}%</span>
              <input min="10" max="100" type="range" value={settings.colorTolerance} onChange={(event) => { clearOutputs(); setSettings((current) => ({ ...current, colorTolerance: Number(event.target.value) })) }} />
            </label>
          </aside>

          <section className="change-bg-preview-card">
            <div className="rotate-preview-toolbar">
              <div>
                <span>Zoom</span>
                <button type="button" onClick={() => setRotateZoom((value) => clamp(value - 10, 50, 200))}>−</button>
                <strong>{rotateZoom}%</strong>
                <button type="button" onClick={() => setRotateZoom((value) => clamp(value + 10, 50, 200))}>+</button>
              </div>
              <div><span>Compare</span><label className="switch"><input checked={backgroundCompare} type="checkbox" onChange={(event) => setBackgroundCompare(event.target.checked)} /><i></i></label><button type="button" onClick={resetBackgroundSettings}><HomeIcon name="rotate" /> Undo</button><button type="button" disabled>Redo</button></div>
            </div>
            {previewUrl ? (
              <div className={`change-bg-compare ${backgroundCompare ? '' : 'single-preview'}`}>
                {backgroundCompare && <figure>
                  <span>Original</span>
                  <img src={previewUrl} alt="Original background preview" style={{ transform: `scale(${previewScale})` }} />
                </figure>}
                <figure className="change-bg-preview-figure" style={previewBackgroundStyle} onPointerDown={handleBackgroundPointerDown}>
                  <span>Preview</span>
                  <img src={processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl} alt="Changed background preview" style={{ transform: `scale(${previewScale})` }} />
                  {!processed && committedBackgroundStyles.map((style, index) => <span className="background-selection-overlay committed" key={backgroundAreas[index]?.id ?? index} style={style}></span>)}
                  {!processed && <button className="background-selection-overlay" style={backgroundSelectionStyle} type="button" aria-label="Selected background sample area"></button>}
                </figure>
                {backgroundCompare && <div className="compare-handle">↔</div>}
              </div>
            ) : (
              <div className="empty-preview">Upload an image to change the background.</div>
            )}
            {(processed || status) && (
              <div className="change-bg-success">
                <span><HomeIcon name="shield" /></span>
                <div><strong>Background removed successfully!</strong><p>Choose a new background and download your image.</p></div>
                <HomeIcon name="sparkle" />
              </div>
            )}
            {error && <p className="error">{error}</p>}
            <div className="change-bg-bottom-bar">
              <button className="secondary" type="button" onClick={resetBackgroundSettings}><HomeIcon name="rotate" /> Reset</button>
              <span></span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> Download Image</button>
              )}
            </div>
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> Tip: For complex images, choose a solid color background for best results.</p>
          </section>

          <aside className="change-bg-side-card">
            <section>
              <div className="areas-heading"><h2>Presets</h2><button type="button">View all</button></div>
              <div className="background-preset-grid">
                {[
                  ['transparent', 'Transparent'],
                  ['#ffffff', 'White'],
                  ['#000000', 'Black'],
                  ['#d8dde2', 'Light Gray'],
                  ['#c8ecf7', 'Soft Blue'],
                  ['#f7adc3', 'Soft Pink'],
                  ['#71a9b8', 'Ocean'],
                  ['#c7a17a', 'Wood'],
                  ['#f4f2ef', 'Marble'],
                ].map(([color, label]) => (
                  <button key={label} type="button" onClick={() => color === 'transparent' ? setBackgroundMode('transparent') : updateBackground(color)}>
                    <span className={color === 'transparent' ? 'checker' : ''} style={color === 'transparent' ? undefined : { background: color }}></span>
                    <small>{label}</small>
                  </button>
                ))}
              </div>
            </section>
            <section>
              <h2>Layers</h2>
              <div className="text-layer"><span><HomeIcon name="image" /></span><strong>Subject</strong><small>Locked</small></div>
              <div className="text-layer"><span className={settings.backgroundMode === 'transparent' ? 'checker' : ''} style={settings.backgroundMode === 'transparent' ? undefined : previewBackgroundStyle}></span><strong>Background</strong><small>{settings.backgroundMode}</small></div>
            </section>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'change-color') {
    const colorPalette = ['#ff3b58', '#ff7a1a', '#ffc928', '#32a852', '#4287f5', '#7d52ff', '#ff8fb3', '#34bdb2', '#333333', '#8a542f', '#000000', '#7bdff2']
    const colorZoom = rotateZoom
    const colorScale = colorZoom / 100
    const selectionStyle = {
      left: `${settings.width && settings.cropWidth ? ((settings.cropX + settings.cropWidth / 2) / settings.width) * 100 : 50}%`,
      top: `${settings.height && settings.cropHeight ? ((settings.cropY + settings.cropHeight / 2) / settings.height) * 100 : 50}%`,
      width: `${settings.width && settings.cropWidth ? (settings.cropWidth / settings.width) * 100 : 100}%`,
      height: `${settings.height && settings.cropHeight ? (settings.cropHeight / settings.height) * 100 : 100}%`,
      transform: `translate(-50%, -50%) scale(${colorScale})`,
    } as CSSProperties
    const colorPreviewStyle = {
      ...selectionStyle,
      background: settings.background,
    } as CSSProperties
    const committedColorStyles = changeColorAreas.map((area) => ({
      left: `${settings.width ? ((area.x + area.width / 2) / settings.width) * 100 : 50}%`,
      top: `${settings.height ? ((area.y + area.height / 2) / settings.height) * 100 : 50}%`,
      width: `${settings.width ? (area.width / settings.width) * 100 : 20}%`,
      height: `${settings.height ? (area.height / settings.height) * 100 : 20}%`,
      background: area.color,
      transform: `translate(-50%, -50%) scale(${colorScale})`,
    }) as CSSProperties)
    const updateColorSetting = (patch: Partial<Pick<ToolSettingsState, 'cropX' | 'cropY' | 'cropWidth' | 'cropHeight' | 'background' | 'colorTolerance'>>) => {
      clearOutputs()
      setSettings((current) => ({ ...current, ...patch }))
    }
    const updateColorBrushSize = (size: number) => {
      clearOutputs()
      setSettings((current) => {
        const centerX = current.cropX + (current.cropWidth || size) / 2
        const centerY = current.cropY + (current.cropHeight || size) / 2
        return {
          ...current,
          cropX: Math.round(clamp(centerX - size / 2, 0, Math.max(0, current.width - size))),
          cropY: Math.round(clamp(centerY - size / 2, 0, Math.max(0, current.height - size))),
          cropWidth: size,
          cropHeight: size,
        }
      })
    }
    const selectFullColorArea = () => {
      clearOutputs()
      setChangeColorMode('brush')
      setSettings((current) => ({
        ...current,
        cropX: 0,
        cropY: 0,
        cropWidth: current.width,
        cropHeight: current.height,
      }))
    }
    const resetColorSettings = () => {
      clearOutputs()
      setRotateZoom(100)
      setChangeColorMode('brush')
      setChangeColorAreas([])
      const size = Math.round(Math.min(settings.width || 320, settings.height || 320) * 0.35)
      setSettings((current) => ({
        ...current,
        background: '#7d52ff',
        cropX: Math.round((current.width || 320) * 0.34),
        cropY: Math.round((current.height || 320) * 0.28),
        cropWidth: size,
        cropHeight: size,
        colorTolerance: 78,
      }))
    }
    const clearColorSelection = () => {
      clearOutputs()
      setChangeColorMode('eraser')
      const nextAreas = changeColorAreas.slice(0, -1)
      setChangeColorAreas(nextAreas)
      setSettings((current) => ({ ...current, colorAreas: nextAreas }))
      setChangeColorHistory((history) => ['Last color edit removed', ...history.filter((item) => item !== 'Last color edit removed')].slice(0, 4))
    }
    const placeColorSelection = (event: ReactPointerEvent<HTMLElement> | PointerEvent, rect: DOMRect) => {
      if (!settings.width || !settings.height) return null
      const size = settings.cropWidth || Math.round(Math.min(settings.width, settings.height) * 0.28)
      const nextX = ((event.clientX - rect.left) / rect.width) * settings.width - size / 2
      const nextY = ((event.clientY - rect.top) / rect.height) * settings.height - size / 2
      const area: ColorArea = {
        id: Date.now(),
        x: Math.round(clamp(nextX, 0, Math.max(0, settings.width - size))),
        y: Math.round(clamp(nextY, 0, Math.max(0, settings.height - size))),
        width: size,
        height: size,
        color: settings.background,
        tolerance: settings.colorTolerance,
      }
      updateColorSetting({
        cropX: area.x,
        cropY: area.y,
        cropWidth: size,
        cropHeight: size,
      })
      return area
    }
    const commitColorArea = (area?: ColorArea | null) => {
      const edit: ColorArea | null = area ?? (settings.cropWidth && settings.cropHeight ? {
        id: Date.now(),
        x: settings.cropX,
        y: settings.cropY,
        width: settings.cropWidth,
        height: settings.cropHeight,
        color: settings.background,
        tolerance: settings.colorTolerance,
      } : null)
      if (!edit) return
      setChangeColorAreas((areas) => [...areas, edit].slice(-30))
      setSettings((current) => ({ ...current, colorAreas: [...changeColorAreas, edit].slice(-30) }))
      setStatus(`Added color edit ${changeColorAreas.length + 1}. You can keep painting or download the image.`)
      setChangeColorHistory((history) => [`${settings.background.toUpperCase()} area ${changeColorAreas.length + 1}`, ...history].slice(0, 5))
    }
    const handleColorStagePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
      const figure = event.currentTarget as HTMLElement
      if (!settings.width || !settings.height) return
      event.preventDefault()
      if (changeColorMode === 'eraser') {
        clearColorSelection()
        return
      }
      const imageRect = figure.querySelector('img')?.getBoundingClientRect()
      const rect = imageRect ?? figure.getBoundingClientRect()
      let pendingArea = placeColorSelection(event, rect)
      const moveSelection = (moveEvent: PointerEvent) => {
        pendingArea = placeColorSelection(moveEvent, rect)
      }
      const stopMove = () => {
        commitColorArea(pendingArea)
        window.removeEventListener('pointermove', moveSelection)
        window.removeEventListener('pointerup', stopMove)
      }
      window.addEventListener('pointermove', moveSelection)
      window.addEventListener('pointerup', stopMove)
    }
    const handleColorSelectionPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
      const figure = event.currentTarget.closest('figure') as HTMLElement | null
      if (!figure || !settings.width || !settings.height || !settings.cropWidth || !settings.cropHeight) return
      event.preventDefault()
      event.stopPropagation()
      if (changeColorMode === 'eraser') {
        clearColorSelection()
        return
      }
      clearOutputs()
      const imageRect = figure.querySelector('img')?.getBoundingClientRect()
      const rect = imageRect ?? figure.getBoundingClientRect()
      const startX = event.clientX
      const startY = event.clientY
      const startCropX = settings.cropX
      const startCropY = settings.cropY
      let pendingArea: ColorArea = {
        id: Date.now(),
        x: startCropX,
        y: startCropY,
        width: settings.cropWidth,
        height: settings.cropHeight,
        color: settings.background,
        tolerance: settings.colorTolerance,
      }
      const moveSelection = (moveEvent: PointerEvent) => {
        const deltaX = ((moveEvent.clientX - startX) / rect.width) * settings.width
        const deltaY = ((moveEvent.clientY - startY) / rect.height) * settings.height
        pendingArea = {
          ...pendingArea,
          x: Math.round(clamp(startCropX + deltaX, 0, Math.max(0, settings.width - settings.cropWidth))),
          y: Math.round(clamp(startCropY + deltaY, 0, Math.max(0, settings.height - settings.cropHeight))),
        }
        updateColorSetting({ cropX: pendingArea.x, cropY: pendingArea.y })
      }
      const stopMove = () => {
        commitColorArea(pendingArea)
        window.removeEventListener('pointermove', moveSelection)
        window.removeEventListener('pointerup', stopMove)
      }
      window.addEventListener('pointermove', moveSelection)
      window.addEventListener('pointerup', stopMove)
    }

    return (
      <div className="workspace change-color-workspace">
        <div className="pixelate-top-grid">
          <section className="pixelate-title-card">
            <Breadcrumbs current={tool.name} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="palette" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="device" /> Runs in your browser</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="shield" /> Your images stay private</span>
              <span><HomeIcon name="smile" /> Always free. No limits.</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="pixelate-help-card">
            <h2>💡 Tips for best results</h2>
            <p>✓ Use high-resolution images.</p>
            <p>✓ Select the area carefully for better accuracy.</p>
            <p>✓ Try different color modes.</p>
            <p>✓ You can reset and try another color.</p>
          </aside>
        </div>
        <form className="change-bg-layout change-color-layout" onSubmit={process}>
          <aside className="settings-panel change-bg-settings-panel">
            <section>
              <div className="pixelate-section-heading"><strong>Select Area</strong></div>
              <div className="pixelate-tool-toggle">
                <button className={changeColorMode === 'brush' ? 'active' : ''} type="button" onClick={() => setChangeColorMode('brush')}><HomeIcon name="palette" /> Brush</button>
                <button className={changeColorMode === 'eraser' ? 'active' : ''} type="button" onClick={clearColorSelection}>⌫ Eraser</button>
              </div>
              <label>Brush Size <span>{settings.cropWidth || 120}px</span><input min="60" max="520" type="range" value={settings.cropWidth || 120} onChange={(event) => updateColorBrushSize(Number(event.target.value))} /></label>
              <label>Tolerance <span>{settings.colorTolerance}%</span><input min="10" max="100" type="range" value={settings.colorTolerance} onChange={(event) => updateColorSetting({ colorTolerance: Number(event.target.value) })} /></label>
              <label>Feather <span>0px</span><input min="0" max="40" type="range" value={0} readOnly /></label>
              <div className="pixelate-action-row">
                <button className="secondary" type="button" onClick={selectFullColorArea}>Select All</button>
                <button className="secondary" type="button" onClick={resetColorSettings}>Reset Selection</button>
              </div>
            </section>
            <section className="color-options-card">
              <h2>Color Options</h2>
              <label>New Color <input type="color" value={settings.background} onChange={(event) => updateColorSetting({ background: event.target.value })} /></label>
              <input value={settings.background.toUpperCase()} onChange={(event) => updateColorSetting({ background: event.target.value })} />
              <label>Color Mode<select><option>Solid Color</option><option>Tint</option><option>Hue Replace</option></select></label>
            </section>
          </aside>
          <section className="change-bg-preview-card">
            <div className="rotate-preview-toolbar">
              <div><span>Zoom</span><button type="button" onClick={() => setRotateZoom((value) => clamp(value - 10, 50, 200))}>−</button><strong>{colorZoom}%</strong><button type="button" onClick={() => setRotateZoom((value) => clamp(value + 10, 50, 200))}>+</button></div>
              <div><button type="button" onClick={resetColorSettings}><HomeIcon name="rotate" /> Undo</button><button type="button" disabled>Redo</button></div>
            </div>
            {previewUrl ? (
              <div className="change-bg-compare change-color-stage">
                <figure>
                  <span>Original</span>
                  <img src={previewUrl} alt="Original color preview" style={{ transform: `scale(${colorScale})` }} />
                </figure>
                <figure className="change-color-preview-figure" onPointerDown={handleColorStagePointerDown}>
                  <span>Preview</span>
                  <img src={processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl} alt="Changed color preview" style={{ transform: `scale(${colorScale})` }} />
                  {!processed && committedColorStyles.map((style, index) => <span className="color-preview-overlay committed" key={changeColorAreas[index]?.id ?? index} style={style}></span>)}
                  {!processed && Boolean(settings.cropWidth && settings.cropHeight) && <span className="color-preview-overlay" style={colorPreviewStyle}></span>}
                  {!processed && (
                    <button
                      className={`color-selection-overlay ${changeColorMode === 'eraser' ? 'eraser' : ''}`}
                      style={selectionStyle}
                      type="button"
                      onPointerDown={settings.cropWidth && settings.cropHeight ? handleColorSelectionPointerDown : handleColorStagePointerDown}
                    ></button>
                  )}
                </figure>
                <div className="compare-handle">↔</div>
              </div>
            ) : (
              <div className="empty-preview">Upload an image to change color.</div>
            )}
            {(processed || status) && (
              <div className="change-bg-success">
                <span><HomeIcon name="shield" /></span>
                <div><strong>Color changed successfully!</strong><p>Download your image or continue editing.</p></div>
                <HomeIcon name="sparkle" />
              </div>
            )}
            {error && <p className="error">{error}</p>}
            <div className="change-bg-bottom-bar">
              <button className="secondary" type="button" onClick={resetColorSettings}><HomeIcon name="rotate" /> Reset</button>
              <span></span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> Download Image</button>
              )}
            </div>
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> Tip: Use the eraser to refine the selected area for more accurate color changes.</p>
          </section>
          <aside className="change-bg-side-card">
            <section>
              <div className="areas-heading"><h2>Popular Colors</h2><button type="button">View all</button></div>
              <div className="popular-color-grid">
                {colorPalette.map((color) => <button className={settings.background.toLowerCase() === color ? 'active' : ''} key={color} style={{ background: color }} type="button" onClick={() => updateColorSetting({ background: color })}></button>)}
              </div>
            </section>
            <section>
              <div className="areas-heading"><h2>Recent Colors</h2><button type="button">Clear</button></div>
              <div className="recent-color-row">{colorPalette.slice(0, 5).map((color) => <button key={color} style={{ background: color }} type="button" onClick={() => updateColorSetting({ background: color })}></button>)}<button type="button">+</button></div>
            </section>
            <section>
              <div className="areas-heading"><h2>History</h2><button type="button">Clear</button></div>
              {changeColorHistory.map((item, index) => (
                <div className="history-item" key={item}><span><HomeIcon name="palette" /></span><div><strong>{item}</strong><small>{index === 0 ? 'Just now' : `${index + 1} minutes ago`}</small></div><button type="button">⋮</button></div>
              ))}
            </section>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'add-text') {
    const commitTextSettings = (updater: (current: ToolSettingsState) => ToolSettingsState) => {
      clearOutputs()
      setSettings((current) => {
        setTextHistory((history) => [...history, current].slice(-20))
        setTextFuture([])
        const nextSettings = updater(current)
        if (activeTextLayerId) {
          setTextLayers((layers) => layers.map((layer) => layer.id === activeTextLayerId ? textLayerFromSettings(layer.id, nextSettings) : layer))
        }
        return nextSettings
      })
    }
    const updateTextSetting = <K extends keyof ToolSettingsState>(key: K, value: ToolSettingsState[K]) => {
      commitTextSettings((current) => ({ ...current, [key]: value }))
    }
    const resetTextSettings = () => {
      clearOutputs()
      setTextZoom(100)
      setSettings((current) => ({
        ...current,
        text: 'Adventure Awaits',
        textSize: 120,
        textColor: '#ffffff',
        textXPercent: 50,
        textYPercent: 47,
        textBoxWidthPercent: 74,
        textBoxHeightPercent: 45,
        textBold: true,
        textItalic: false,
        textUnderline: false,
        textShadow: true,
        textOutline: false,
        textAlign: 'center',
        textShadowColor: '#000000',
        textOutlineColor: '#ffffff',
        textShadowBlur: 12,
        textShadowOffsetX: 4,
        textShadowOffsetY: 4,
        watermarkMode: 'text',
        watermarkOpacity: 0.35,
      }))
      setTextLayers([textLayerFromSettings(1, {
        ...settings,
        text: 'Adventure Awaits',
        textSize: 120,
        textColor: '#ffffff',
        textXPercent: 50,
        textYPercent: 47,
        textBoxWidthPercent: 74,
        textBoxHeightPercent: 45,
        textBold: true,
        textItalic: false,
        textUnderline: false,
        textShadow: true,
        textOutline: false,
        textAlign: 'center',
        textShadowColor: '#000000',
        textOutlineColor: '#ffffff',
        textShadowBlur: 12,
        textShadowOffsetX: 4,
        textShadowOffsetY: 4,
      })])
      setActiveTextLayerId(1)
      setNextTextLayerId(2)
      setTextHistory([])
      setTextFuture([])
    }
    const addTextLayer = () => {
      clearOutputs()
      setTextHistory((history) => [...history, settings].slice(-20))
      setTextFuture([])
      const nextSettings = {
        ...settings,
        text: 'New Text',
        textXPercent: 50,
        textYPercent: 35 + (textLayers.length % 4) * 12,
        textBoxWidthPercent: 60,
        textBoxHeightPercent: 32,
      }
      const nextLayer = textLayerFromSettings(nextTextLayerId, nextSettings)
      setTextLayers((layers) => [...layers, nextLayer])
      setActiveTextLayerId(nextLayer.id)
      setNextTextLayerId((value) => value + 1)
      setSettings(nextSettings)
      setTextToolMode('text')
    }
    const selectTextLayer = (layer: TextLayer) => {
      setActiveTextLayerId(layer.id)
      clearOutputs()
      setSettings((current) => settingsFromTextLayer(current, layer))
    }
    const deleteTextLayer = (id: number) => {
      setTextLayers((layers) => {
        const remaining = layers.filter((layer) => layer.id !== id)
        if (id === activeTextLayerId) {
          const nextLayer = remaining[0]
          setActiveTextLayerId(nextLayer?.id ?? 0)
          setSettings((current) => nextLayer ? settingsFromTextLayer(current, nextLayer) : { ...current, text: '' })
        }
        return remaining
      })
    }
    const undoTextEdit = () => {
      setTextHistory((history) => {
        const previous = history.at(-1)
        if (!previous) return history
        setTextFuture((future) => [settings, ...future].slice(0, 20))
        setSettings(previous)
        return history.slice(0, -1)
      })
    }
    const redoTextEdit = () => {
      setTextFuture((future) => {
        const next = future[0]
        if (!next) return future
        setTextHistory((history) => [...history, settings].slice(-20))
        setSettings(next)
        return future.slice(1)
      })
    }
    const textPresets = ['Summer Vibes', 'Stay Positive', 'Good Vibes', 'Dream Big', 'Thank You!', 'Just Breathe']
    const textLines = settings.text.trim() ? textLinesForImage(settings.text) : []
    const textPreviewScale = textZoom / 100
    const updateTextBox = (patch: Partial<Pick<ToolSettingsState, 'textXPercent' | 'textYPercent' | 'textBoxWidthPercent' | 'textBoxHeightPercent' | 'textSize'>>) => {
      commitTextSettings((current) => ({ ...current, ...patch }))
    }
    const handleTextBoxPointerDown = (
      event: ReactPointerEvent<HTMLElement>,
      mode: 'move' | 'resize' = 'move',
      corner: 'tl' | 'tr' | 'bl' | 'br' = 'br',
    ) => {
      const stage = event.currentTarget.closest('.add-text-stage') as HTMLElement | null
      if (!stage) return
      event.preventDefault()
      event.stopPropagation()
      clearOutputs()
      const rect = stage.getBoundingClientRect()
      const startX = event.clientX
      const startY = event.clientY
      const startLeft = settings.textXPercent - settings.textBoxWidthPercent / 2
      const startTop = settings.textYPercent - settings.textBoxHeightPercent / 2
      const startRight = settings.textXPercent + settings.textBoxWidthPercent / 2
      const startBottom = settings.textYPercent + settings.textBoxHeightPercent / 2
      const startSize = settings.textSize

      const moveText = (moveEvent: PointerEvent) => {
        const deltaX = ((moveEvent.clientX - startX) / rect.width) * 100
        const deltaY = ((moveEvent.clientY - startY) / rect.height) * 100
        if (mode === 'move') {
          updateTextBox({
            textXPercent: clamp(settings.textXPercent + deltaX, settings.textBoxWidthPercent / 2, 100 - settings.textBoxWidthPercent / 2),
            textYPercent: clamp(settings.textYPercent + deltaY, settings.textBoxHeightPercent / 2, 100 - settings.textBoxHeightPercent / 2),
          })
          return
        }

        let nextLeft = startLeft
        let nextTop = startTop
        let nextRight = startRight
        let nextBottom = startBottom
        if (corner.includes('l')) nextLeft = clamp(startLeft + deltaX, 0, startRight - 16)
        if (corner.includes('r')) nextRight = clamp(startRight + deltaX, startLeft + 16, 100)
        if (corner.includes('t')) nextTop = clamp(startTop + deltaY, 0, startBottom - 12)
        if (corner.includes('b')) nextBottom = clamp(startBottom + deltaY, startTop + 12, 100)
        const nextWidth = nextRight - nextLeft
        const nextHeight = nextBottom - nextTop
        updateTextBox({
          textXPercent: nextLeft + nextWidth / 2,
          textYPercent: nextTop + nextHeight / 2,
          textBoxWidthPercent: nextWidth,
          textBoxHeightPercent: nextHeight,
          textSize: clamp(Math.round(startSize * (nextHeight / settings.textBoxHeightPercent)), 24, 180),
        })
      }

      const stopMove = () => {
        window.removeEventListener('pointermove', moveText)
        window.removeEventListener('pointerup', stopMove)
      }

      window.addEventListener('pointermove', moveText)
      window.addEventListener('pointerup', stopMove)
    }
    const textBoxStyle = {
      left: `${settings.textXPercent}%`,
      top: `${settings.textYPercent}%`,
      width: `${settings.textBoxWidthPercent}%`,
      height: `${settings.textBoxHeightPercent}%`,
      transform: `translate(-50%, -50%) scale(${textPreviewScale})`,
    } as CSSProperties
    const textLayerBoxStyle = (layer: TextLayer) => {
      const layerSettings = settingsFromTextLayer(settings, layer)
      return {
        left: `${layerSettings.textXPercent}%`,
        top: `${layerSettings.textYPercent}%`,
        width: `${layerSettings.textBoxWidthPercent}%`,
        height: `${layerSettings.textBoxHeightPercent}%`,
        transform: `translate(-50%, -50%) scale(${textPreviewScale})`,
      } as CSSProperties
    }
    const textLayerTextStyle = (layer: TextLayer) => {
      const layerSettings = settingsFromTextLayer(settings, layer)
      return {
        color: layerSettings.textColor,
        fontSize: `clamp(2rem, ${layerSettings.textSize / 18}vw, 6.8rem)`,
        fontWeight: layerSettings.textBold ? 900 : 500,
        textAlign: layerSettings.textAlign,
        textShadow: layerSettings.textShadow ? `${layerSettings.textShadowOffsetX}px ${layerSettings.textShadowOffsetY}px ${layerSettings.textShadowBlur}px ${layerSettings.textShadowColor}` : 'none',
        WebkitTextStroke: layerSettings.textOutline ? `2px ${layerSettings.textOutlineColor}` : '0',
      } as CSSProperties
    }
    const inactiveTextLayers = textLayers.filter((layer) => layer.id !== activeTextLayerId)

    return (
      <div className="workspace add-text-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle"><HomeIcon name="text" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="lock" /> Your images stay private</span>
              <span><HomeIcon name="smile" /> No signup required</span>
              <span><HomeIcon name="bolt" /> Always free. No limits.</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h2><HomeIcon name="sparkle" /> Tips for best results</h2>
            <p>✓ Use high contrast between text and background.</p>
            <p>✓ Add a shadow or outline to make text stand out.</p>
            <p>✓ Try different fonts to match your image style.</p>
            <p>✓ Keep important text away from edges.</p>
          </aside>
        </div>

        <form className="add-text-layout" onSubmit={process}>
          <aside className="settings-panel add-text-settings-panel">
            <h2>Text Settings</h2>
            <textarea value={settings.text} onChange={(event) => updateTextSetting('text', event.target.value)} />
            <label>
              Font
              <select>
                <option>Pacifico</option>
                <option>Inter</option>
                <option>Serif</option>
              </select>
            </label>
            <label>
              Size <span>{settings.textSize} px</span>
              <input min="24" max="180" step="1" type="range" value={settings.textSize} onChange={(event) => updateTextSetting('textSize', Number(event.target.value))} />
            </label>
            <label>
              Color
              <input type="color" value={settings.textColor} onChange={(event) => updateTextSetting('textColor', event.target.value)} />
            </label>
            <div className="text-style-row">
              <button className={settings.textBold ? 'active' : ''} type="button" onClick={() => updateTextSetting('textBold', !settings.textBold)}>B</button>
              <button className={settings.textItalic ? 'active' : ''} type="button" onClick={() => updateTextSetting('textItalic', !settings.textItalic)}><em>I</em></button>
              <button className={settings.textUnderline ? 'active' : ''} type="button" onClick={() => updateTextSetting('textUnderline', !settings.textUnderline)}><u>U</u></button>
              <button className={settings.textAlign === 'left' ? 'active' : ''} type="button" onClick={() => updateTextSetting('textAlign', 'left')}>≡</button>
              <button className={settings.textAlign === 'center' ? 'active' : ''} type="button" onClick={() => updateTextSetting('textAlign', 'center')}>≣</button>
              <button className={settings.textAlign === 'right' ? 'active' : ''} type="button" onClick={() => updateTextSetting('textAlign', 'right')}>≡</button>
            </div>
            <div className="text-effects-card">
              <strong>Effects</strong>
              <label className="toggle-row metadata-toggle"><input type="checkbox" checked={settings.textShadow} onChange={(event) => updateTextSetting('textShadow', event.target.checked)} /> Shadow <input type="color" value={settings.textShadowColor} onChange={(event) => updateTextSetting('textShadowColor', event.target.value)} /></label>
              <label>Blur <input min="0" max="24" type="range" value={settings.textShadowBlur} onChange={(event) => updateTextSetting('textShadowBlur', Number(event.target.value))} /></label>
              <label>Offset X <input min="-24" max="24" type="range" value={settings.textShadowOffsetX} onChange={(event) => updateTextSetting('textShadowOffsetX', Number(event.target.value))} /></label>
              <label>Offset Y <input min="-24" max="24" type="range" value={settings.textShadowOffsetY} onChange={(event) => updateTextSetting('textShadowOffsetY', Number(event.target.value))} /></label>
              <label className="toggle-row metadata-toggle"><input type="checkbox" checked={settings.textOutline} onChange={(event) => updateTextSetting('textOutline', event.target.checked)} /> Outline <input type="color" value={settings.textOutlineColor} onChange={(event) => updateTextSetting('textOutlineColor', event.target.value)} /></label>
            </div>
            <button className="secondary full" type="button">More Options⌄</button>
          </aside>

          <section className="add-text-editor-card">
            <div className="add-text-toolbar">
              <div>
                <button type="button" onClick={() => setTextZoom((value) => clamp(value - 10, 50, 200))}>−</button>
                <strong>{textZoom}%</strong>
                <button type="button" onClick={() => setTextZoom((value) => clamp(value + 10, 50, 200))}>+</button>
              </div>
              <div>
                <button className={textToolMode === 'move' ? 'active' : ''} type="button" onClick={() => setTextToolMode('move')}>Move</button>
                <button className={textToolMode === 'text' ? 'active' : ''} type="button" onClick={addTextLayer}>T Text</button>
                <button type="button" disabled={!textHistory.length} onClick={undoTextEdit}>Undo</button>
                <button type="button" disabled={!textFuture.length} onClick={redoTextEdit}>Redo</button>
                <button type="button" onClick={resetTextSettings}>Reset</button>
              </div>
            </div>
            {previewUrl ? (
              <div className="add-text-stage">
                <img
                  ref={textPreviewImageRef}
                  src={previewUrl}
                  alt="Add text preview"
                  style={{ transform: `scale(${textPreviewScale})` }}
                  onLoad={(e) => setTextPreviewImgWidth((e.currentTarget as HTMLImageElement).getBoundingClientRect().width)}
                />
                {inactiveTextLayers.map((layer) => {
                  const layerSettings = settingsFromTextLayer(settings, layer)
                  const layerLines = layerSettings.text.trim() ? textLinesForImage(layerSettings.text) : []
                  return (
                    <button className="text-static-layer" key={layer.id} type="button" style={textLayerBoxStyle(layer)} onClick={() => selectTextLayer(layer)}>
                      <strong
                        className={`${layerSettings.textItalic ? 'italic' : ''} ${layerSettings.textUnderline ? 'underline' : ''}`}
                        style={textLayerTextStyle(layer)}
                      >
                        {layerLines.map((line) => <em key={line}>{line}</em>)}
                      </strong>
                    </button>
                  )
                })}
                <div ref={textSelectionBoxRef} className="text-selection-box" style={textBoxStyle} onPointerDown={(event) => handleTextBoxPointerDown(event)}>
                  <span onPointerDown={(event) => handleTextBoxPointerDown(event, 'resize', 'tl')}></span>
                  <span onPointerDown={(event) => handleTextBoxPointerDown(event, 'resize', 'tr')}></span>
                  <span onPointerDown={(event) => handleTextBoxPointerDown(event, 'resize', 'bl')}></span>
                  <span onPointerDown={(event) => handleTextBoxPointerDown(event, 'resize', 'br')}></span>
                  <strong
                    ref={textPreviewTextRef}
                    className={`${settings.textItalic ? 'italic' : ''} ${settings.textUnderline ? 'underline' : ''}`}
                    style={{
                      color: settings.textColor,
                      fontSize: `clamp(2rem, ${settings.textSize / 18}vw, 6.8rem)`,
                      fontWeight: settings.textBold ? 900 : 500,
                      textAlign: settings.textAlign,
                      textShadow: settings.textShadow ? `${settings.textShadowOffsetX}px ${settings.textShadowOffsetY}px ${settings.textShadowBlur}px ${settings.textShadowColor}` : 'none',
                      WebkitTextStroke: settings.textOutline ? `2px ${settings.textOutlineColor}` : '0',
                    }}
                  >
                    {textLines.map((line) => <em key={line}>{line}</em>)}
                  </strong>
                </div>
              </div>
            ) : (
              <div className="empty-preview">Upload an image to add text.</div>
            )}
            <div className="add-text-meta">
              <span>Original: {settings.width || 1920} × {settings.height || 1280}</span>
              <span>Current: {settings.width || 1920} × {settings.height || 1280}</span>
            </div>
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <div className="add-text-bottom-bar">
              <button className="secondary" type="button" onClick={resetTextSettings}><HomeIcon name="rotate" /> Reset</button>
              <span></span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> Download Image</button>
              )}
            </div>
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> Tip: You can double-click the text on the image to edit it directly.</p>
          </section>

          <aside className="add-text-side-card">
            <section>
              <div className="areas-heading"><h2>Text Presets</h2><button type="button">View all</button></div>
              <div className="text-preset-grid">
                {textPresets.map((preset) => (
                  <button key={preset} type="button" onClick={() => updateTextSetting('text', preset)}>{preset}</button>
                ))}
              </div>
            </section>
            <section>
              <h2>Layers ({textLayers.length + 1})</h2>
              {textLayers.map((layer) => (
                <div className={`text-layer ${layer.id === activeTextLayerId ? 'active' : ''}`} key={layer.id} onClick={() => selectTextLayer(layer)}>
                  <span>T</span>
                  <strong>{layer.id === activeTextLayerId ? settings.text || 'Untitled text' : layer.text || 'Untitled text'}</strong>
                  <button type="button" onClick={(event) => { event.stopPropagation(); deleteTextLayer(layer.id) }}><HomeIcon name="trash" /></button>
                </div>
              ))}
              <div className="text-layer"><span><HomeIcon name="image" /></span><strong>Background</strong><small>Locked</small></div>
              <div className="layer-actions">
                <button type="button" onClick={addTextLayer}>Add Layer</button>
                <button type="button" onClick={() => deleteTextLayer(activeTextLayerId)}>Delete Layer</button>
              </div>
            </section>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'add-watermark') {
    const updateWatermarkSetting = <K extends keyof ToolSettingsState>(key: K, value: ToolSettingsState[K]) => {
      clearOutputs()
      setSettings((current) => ({ ...current, [key]: value }))
    }
    const handleWatermarkImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
      const image = event.currentTarget.files?.[0]
      event.currentTarget.value = ''
      if (!image) return
      if (!image.type.startsWith('image/')) {
        setError('Please upload an image file for the watermark.')
        return
      }
      clearOutputs()
      const dataUrl = await fileToDataUrl(image)
      setSettings((current) => ({
        ...current,
        watermarkMode: 'image',
        watermarkImageDataUrl: dataUrl,
        watermarkImageName: image.name,
        textBoxWidthPercent: 34,
        textBoxHeightPercent: 18,
      }))
    }
    const resetWatermarkSettings = () => {
      clearOutputs()
      setTextZoom(100)
      setSettings((current) => ({
        ...current,
        text: 'NanoImage',
        textSize: 74,
        textColor: '#ffffff',
        textXPercent: 72,
        textYPercent: 78,
        textBoxWidthPercent: 44,
        textBoxHeightPercent: 18,
        textBold: true,
        textItalic: false,
        textUnderline: false,
        textShadow: true,
        textOutline: false,
        textAlign: 'center',
        textShadowColor: '#000000',
        textOutlineColor: '#ffffff',
        textShadowBlur: 12,
        textShadowOffsetX: 4,
        textShadowOffsetY: 4,
        watermarkMode: 'text',
        watermarkOpacity: 0.7,
      }))
    }
    const watermarkPresets = [
      { label: 'Bottom Right', x: 72, y: 78 },
      { label: 'Bottom Left', x: 28, y: 78 },
      { label: 'Top Right', x: 72, y: 22 },
      { label: 'Top Left', x: 28, y: 22 },
      { label: 'Center', x: 50, y: 50 },
      { label: 'None', x: 50, y: 50 },
    ]
    const watermarkLines = settings.text.trim() ? textLinesForImage(settings.text) : []
    const watermarkPreviewScale = textZoom / 100
    const updateWatermarkBox = (patch: Partial<Pick<ToolSettingsState, 'textXPercent' | 'textYPercent' | 'textBoxWidthPercent' | 'textBoxHeightPercent' | 'textSize'>>) => {
      clearOutputs()
      setSettings((current) => ({ ...current, ...patch }))
    }
    const handleWatermarkPointerDown = (
      event: ReactPointerEvent<HTMLElement>,
      mode: 'move' | 'resize' = 'move',
      corner: 'tl' | 'tr' | 'bl' | 'br' = 'br',
    ) => {
      const stage = event.currentTarget.closest('.add-text-stage') as HTMLElement | null
      if (!stage) return
      event.preventDefault()
      event.stopPropagation()
      clearOutputs()
      const rect = stage.getBoundingClientRect()
      const startX = event.clientX
      const startY = event.clientY
      const startLeft = settings.textXPercent - settings.textBoxWidthPercent / 2
      const startTop = settings.textYPercent - settings.textBoxHeightPercent / 2
      const startRight = settings.textXPercent + settings.textBoxWidthPercent / 2
      const startBottom = settings.textYPercent + settings.textBoxHeightPercent / 2
      const startSize = settings.textSize

      const moveWatermark = (moveEvent: PointerEvent) => {
        const deltaX = ((moveEvent.clientX - startX) / rect.width) * 100
        const deltaY = ((moveEvent.clientY - startY) / rect.height) * 100
        if (mode === 'move') {
          updateWatermarkBox({
            textXPercent: clamp(settings.textXPercent + deltaX, settings.textBoxWidthPercent / 2, 100 - settings.textBoxWidthPercent / 2),
            textYPercent: clamp(settings.textYPercent + deltaY, settings.textBoxHeightPercent / 2, 100 - settings.textBoxHeightPercent / 2),
          })
          return
        }

        let nextLeft = startLeft
        let nextTop = startTop
        let nextRight = startRight
        let nextBottom = startBottom
        if (corner.includes('l')) nextLeft = clamp(startLeft + deltaX, 0, startRight - 16)
        if (corner.includes('r')) nextRight = clamp(startRight + deltaX, startLeft + 16, 100)
        if (corner.includes('t')) nextTop = clamp(startTop + deltaY, 0, startBottom - 12)
        if (corner.includes('b')) nextBottom = clamp(startBottom + deltaY, startTop + 12, 100)
        const nextWidth = nextRight - nextLeft
        const nextHeight = nextBottom - nextTop
        updateWatermarkBox({
          textXPercent: nextLeft + nextWidth / 2,
          textYPercent: nextTop + nextHeight / 2,
          textBoxWidthPercent: nextWidth,
          textBoxHeightPercent: nextHeight,
          textSize: clamp(Math.round(startSize * (nextHeight / settings.textBoxHeightPercent)), 18, 180),
        })
      }

      const stopMove = () => {
        window.removeEventListener('pointermove', moveWatermark)
        window.removeEventListener('pointerup', stopMove)
      }

      window.addEventListener('pointermove', moveWatermark)
      window.addEventListener('pointerup', stopMove)
    }
    const watermarkBoxStyle = {
      left: `${settings.textXPercent}%`,
      top: `${settings.textYPercent}%`,
      width: `${settings.textBoxWidthPercent}%`,
      height: `${settings.textBoxHeightPercent}%`,
      transform: `translate(-50%, -50%) scale(${watermarkPreviewScale})`,
    } as CSSProperties

    return (
      <div className="workspace watermark-workspace add-text-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle"><HomeIcon name="watermark" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> 100% free</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="shield" /> Your images stay private</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h2><HomeIcon name="sparkle" /> Quick Tips</h2>
            <p>✓ Use transparency for a subtle watermark.</p>
            <p>✓ Try different positions and sizes.</p>
            <p>✓ Protect your photos and your brand.</p>
          </aside>
        </div>

        <form className="add-text-layout watermark-layout" onSubmit={process}>
          <aside className="settings-panel add-text-settings-panel watermark-settings-panel">
            <h2>Watermark Settings</h2>
            <div className="watermark-tabs">
              <button className={settings.watermarkMode === 'text' ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('watermarkMode', 'text')}>Tt Text Watermark</button>
              <button className={settings.watermarkMode === 'image' ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('watermarkMode', 'image')}><HomeIcon name="image" /> Image Watermark</button>
            </div>
            {settings.watermarkMode === 'text' ? (
              <>
                <label>
                  Text
                  <textarea value={settings.text} onChange={(event) => updateWatermarkSetting('text', event.target.value)} />
                </label>
                <label>
                  Font
                  <select>
                    <option>Pacifico</option>
                    <option>Inter</option>
                    <option>Serif</option>
                  </select>
                </label>
                <label>
                  Size <span>{settings.textSize} px</span>
                  <input min="18" max="180" step="1" type="range" value={settings.textSize} onChange={(event) => updateWatermarkSetting('textSize', Number(event.target.value))} />
                </label>
                <label>
                  Color
                  <input type="color" value={settings.textColor} onChange={(event) => updateWatermarkSetting('textColor', event.target.value)} />
                </label>
              </>
            ) : (
              <label className="image-watermark-upload">
                Image
                <input type="file" accept="image/*" onChange={handleWatermarkImageUpload} />
                <span><HomeIcon name="upload" /> Upload Watermark Image</span>
                <small>{settings.watermarkImageName || 'PNG, JPG, WebP, or SVG-style image'}</small>
              </label>
            )}
            <label>
              Opacity <span>{Math.round(settings.watermarkOpacity * 100)}%</span>
              <input min="0.1" max="1" step="0.05" type="range" value={settings.watermarkOpacity} onChange={(event) => updateWatermarkSetting('watermarkOpacity', Number(event.target.value))} />
            </label>
            {settings.watermarkMode === 'text' && (
              <>
                <div className="text-style-row">
                  <button className={settings.textBold ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('textBold', !settings.textBold)}>B</button>
                  <button className={settings.textItalic ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('textItalic', !settings.textItalic)}><em>I</em></button>
                  <button className={settings.textUnderline ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('textUnderline', !settings.textUnderline)}><u>U</u></button>
                  <button className={settings.textAlign === 'left' ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('textAlign', 'left')}>≡</button>
                  <button className={settings.textAlign === 'center' ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('textAlign', 'center')}>≣</button>
                  <button className={settings.textAlign === 'right' ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('textAlign', 'right')}>≡</button>
                </div>
                <div className="text-effects-card">
                  <strong>Effects</strong>
                  <label className="toggle-row metadata-toggle"><input type="checkbox" checked={settings.textShadow} onChange={(event) => updateWatermarkSetting('textShadow', event.target.checked)} /> Shadow <input type="color" value={settings.textShadowColor} onChange={(event) => updateWatermarkSetting('textShadowColor', event.target.value)} /></label>
                  <label>Blur <input min="0" max="24" type="range" value={settings.textShadowBlur} onChange={(event) => updateWatermarkSetting('textShadowBlur', Number(event.target.value))} /></label>
                  <label>Offset X <input min="-24" max="24" type="range" value={settings.textShadowOffsetX} onChange={(event) => updateWatermarkSetting('textShadowOffsetX', Number(event.target.value))} /></label>
                  <label>Offset Y <input min="-24" max="24" type="range" value={settings.textShadowOffsetY} onChange={(event) => updateWatermarkSetting('textShadowOffsetY', Number(event.target.value))} /></label>
                  <label className="toggle-row metadata-toggle"><input type="checkbox" checked={settings.textOutline} onChange={(event) => updateWatermarkSetting('textOutline', event.target.checked)} /> Outline <input type="color" value={settings.textOutlineColor} onChange={(event) => updateWatermarkSetting('textOutlineColor', event.target.value)} /></label>
                </div>
              </>
            )}
            <button className="secondary full" type="button">More Options⌄</button>
          </aside>

          <section className="add-text-editor-card watermark-preview-card">
            <div className="add-text-toolbar">
              <div>
                <button type="button" onClick={() => setTextZoom((value) => clamp(value - 10, 50, 200))}>−</button>
                <strong>{textZoom}%</strong>
                <button type="button" onClick={() => setTextZoom((value) => clamp(value + 10, 50, 200))}>+</button>
              </div>
              <div>
                <button className={textToolMode === 'move' ? 'active' : ''} type="button" onClick={() => setTextToolMode('move')}>Move</button>
                <button className={textToolMode === 'text' ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('text', settings.text || 'NanoImage')}>T Text</button>
                <button type="button" onClick={resetWatermarkSettings}>Reset</button>
              </div>
            </div>
            {previewUrl ? (
              <div className="add-text-stage watermark-stage">
                <img
                  ref={textPreviewImageRef}
                  src={previewUrl}
                  alt="Add watermark preview"
                  style={{ transform: `scale(${watermarkPreviewScale})` }}
                  onLoad={(event) => setTextPreviewImgWidth((event.currentTarget as HTMLImageElement).getBoundingClientRect().width)}
                />
                <div ref={textSelectionBoxRef} className="text-selection-box" style={watermarkBoxStyle} onPointerDown={(event) => handleWatermarkPointerDown(event)}>
                  <span onPointerDown={(event) => handleWatermarkPointerDown(event, 'resize', 'tl')}></span>
                  <span onPointerDown={(event) => handleWatermarkPointerDown(event, 'resize', 'tr')}></span>
                  <span onPointerDown={(event) => handleWatermarkPointerDown(event, 'resize', 'bl')}></span>
                  <span onPointerDown={(event) => handleWatermarkPointerDown(event, 'resize', 'br')}></span>
                  {settings.watermarkMode === 'image' ? (
                    settings.watermarkImageDataUrl ? (
                      <img
                        ref={watermarkImageOverlayRef}
                        className="watermark-image-overlay"
                        src={settings.watermarkImageDataUrl}
                        alt={settings.watermarkImageName || 'Watermark image'}
                        style={{ opacity: settings.watermarkOpacity }}
                      />
                    ) : (
                      <strong className="watermark-upload-placeholder"><em>Upload image</em></strong>
                    )
                  ) : (
                    <strong
                      ref={textPreviewTextRef}
                      className={`${settings.textItalic ? 'italic' : ''} ${settings.textUnderline ? 'underline' : ''}`}
                      style={{
                        color: settings.textColor,
                        fontSize: `clamp(1.4rem, ${settings.textSize / 18}vw, 5.8rem)`,
                        fontWeight: settings.textBold ? 900 : 500,
                        opacity: settings.watermarkOpacity,
                        textAlign: settings.textAlign,
                        textShadow: settings.textShadow ? `${settings.textShadowOffsetX}px ${settings.textShadowOffsetY}px ${settings.textShadowBlur}px ${settings.textShadowColor}` : 'none',
                        WebkitTextStroke: settings.textOutline ? `2px ${settings.textOutlineColor}` : '0',
                      }}
                    >
                      {watermarkLines.map((line) => <em key={line}>{line}</em>)}
                    </strong>
                  )}
                </div>
              </div>
            ) : (
              <div className="empty-preview">Upload an image to add a watermark.</div>
            )}
            <div className="add-text-meta">
              <span>Original: {settings.width || 1920} × {settings.height || 1280}</span>
              <span>Current: {settings.width || 1920} × {settings.height || 1280}</span>
            </div>
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <div className="add-text-bottom-bar watermark-bottom-bar">
              <button className="secondary" type="button" onClick={resetWatermarkSettings}><HomeIcon name="rotate" /> Reset</button>
              <span></span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> Download Image</button>
              )}
            </div>
            <p className="privacy-note add-text-tip"><HomeIcon name="lock" /> Your image is processed in your browser. It never leaves your device.</p>
          </section>

          <aside className="add-text-side-card watermark-side-card">
            <section>
              <div className="areas-heading"><h2>Presets</h2><button type="button">View all</button></div>
              <div className="text-preset-grid watermark-preset-grid">
                {watermarkPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      if (preset.label === 'None') {
                        setSettings((current) => ({ ...current, text: '', watermarkImageDataUrl: '', watermarkImageName: '' }))
                      }
                      else setSettings((current) => ({ ...current, text: current.text || 'NanoImage', textXPercent: preset.x, textYPercent: preset.y }))
                      clearOutputs()
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </section>
            <section>
              <h2>Layers</h2>
              <div className="text-layer active">
                <span>{settings.watermarkMode === 'image' ? <HomeIcon name="image" /> : 'T'}</span>
                <strong>{settings.watermarkMode === 'image' ? settings.watermarkImageName || 'No image watermark' : settings.text || 'No watermark'}</strong>
                <button
                  type="button"
                  onClick={() => {
                    if (settings.watermarkMode === 'image') setSettings((current) => ({ ...current, watermarkImageDataUrl: '', watermarkImageName: '' }))
                    else updateWatermarkSetting('text', '')
                    clearOutputs()
                  }}
                >
                  <HomeIcon name="trash" />
                </button>
              </div>
              <div className="text-layer"><span><HomeIcon name="image" /></span><strong>Background</strong><small>Locked</small></div>
            </section>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'flip-image') {
    const flipMode = settings.flipX && settings.flipY
      ? 'Both'
      : settings.flipY
        ? 'Vertical'
        : 'Horizontal'

    return (
      <div className="workspace flip-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle"><HomeIcon name="flip" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="lock" /> Your images stay private</span>
              <span><HomeIcon name="smile" /> No signup required</span>
              <span><HomeIcon name="bolt" /> Always free. No limits.</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h2><HomeIcon name="sparkle" /> What is Flip?</h2>
            <p>Flipping an image creates a mirrored version. Useful for:</p>
            <p>✓ Correcting mirror selfies</p>
            <p>✓ Matching design directions</p>
            <p>✓ Creating reflections</p>
            <p>✓ Fun photo edits</p>
          </aside>
        </div>
        <form className="flip-layout" onSubmit={process}>
          <aside className="settings-panel flip-settings-panel">
            <h2>Flip Options</h2>
            <span className="field-title">Flip Mode</span>
            <div className="flip-mode-grid">
              <button
                className={settings.flipX && !settings.flipY ? 'active' : ''}
                type="button"
                onClick={() => setSettings((value) => ({ ...value, flipX: true, flipY: false }))}
              >
                <HomeIcon name="flip" /> Flip Horizontal
              </button>
              <button
                className={!settings.flipX && settings.flipY ? 'active' : ''}
                type="button"
                onClick={() => setSettings((value) => ({ ...value, flipX: false, flipY: true }))}
              >
                <HomeIcon name="flip" /> Flip Vertical
              </button>
              <button
                className={settings.flipX && settings.flipY ? 'active' : ''}
                type="button"
                onClick={() => setSettings((value) => ({ ...value, flipX: true, flipY: true }))}
              >
                <HomeIcon name="flip" /> Flip Both
              </button>
            </div>
            <div className="flip-description">
              <strong>Description</strong>
              <p>
                {flipMode === 'Horizontal' && 'Flip the image left to right (mirror horizontally).'}
                {flipMode === 'Vertical' && 'Flip the image top to bottom (mirror vertically).'}
                {flipMode === 'Both' && 'Flip the image horizontally and vertically at the same time.'}
              </p>
            </div>
            <div className="flip-more-options">
              <h2>More Options</h2>
              <label className="toggle-row metadata-toggle">
                <input type="checkbox" defaultChecked />
                Keep metadata (EXIF)
              </label>
            </div>
          </aside>

          <section className="flip-preview-card">
            <div className="flip-compare-grid">
              <figure>
                <div className="figure-top"><strong>Original Image</strong>{settings.width > 0 && <em>{settings.width} × {settings.height}</em>}</div>
                {previewUrl ? <img src={previewUrl} alt="Original preview" /> : <div className="empty-preview">Upload an image to flip.</div>}
              </figure>
              <div className="flip-arrow">→</div>
              <figure>
                <div className="figure-top"><strong>Flipped Image ({flipMode})</strong>{settings.width > 0 && <em>{settings.width} × {settings.height}</em>}</div>
                {previewUrl ? (
                  <img
                    src={processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl}
                    alt="Flipped preview"
                    style={{ transform: processed ? 'none' : `scaleX(${settings.flipX ? -1 : 1}) scaleY(${settings.flipY ? -1 : 1})` }}
                  />
                ) : (
                  <div className="empty-preview">Your flipped image will appear here.</div>
                )}
              </figure>
            </div>
            {(processed || status) && (
              <div className="flip-success">
                <span><HomeIcon name="shield" /></span>
                <div><strong>Ready!</strong><p>{status || 'Your image has been flipped.'}</p></div>
                <HomeIcon name="smile" />
              </div>
            )}
            {error && <p className="error">{error}</p>}
            <div className="flip-bottom-bar">
              <button className="secondary" type="button" onClick={resetTool}><HomeIcon name="rotate" /> Reset</button>
              <span></span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Flipped Image</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> Download Flipped Image</button>
              )}
            </div>
            <p className="privacy-note flip-privacy"><HomeIcon name="lock" /> Your images are processed in your browser. We never upload your files.</p>
          </section>

          <aside className="flip-side-card">
            <section>
              <h2>Supported formats</h2>
              {[
                ['JPG / JPEG', 'Recommended'],
                ['PNG', 'Lossless quality'],
                ['WebP', 'Smaller file size'],
                ['GIF', 'Animated images'],
              ].map(([format, note]) => (
                <div className="format-support-item" key={format}>
                  <span>{format.split(' ')[0]}</span>
                  <div><strong>{format}</strong><small>{note}</small></div>
                </div>
              ))}
            </section>
            <div className="flip-tip-card">
              <HomeIcon name="sparkle" />
              <p>Tip: You can flip the image horizontally, vertically, or both to get the perfect result.</p>
            </div>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'rotate-image') {
    const resetRotateSettings = () => {
      clearOutputs()
      setRotateZoom(100)
      setSettings((value) => ({
        ...value,
        angle: 90,
        flipX: false,
        flipY: false,
        background: '#ffffff',
      }))
    }

    const updateRotateAngle = (angle: number) => {
      clearOutputs()
      setSettings((value) => ({ ...value, angle }))
    }

    const updateRotateZoom = (delta: number) => {
      setRotateZoom((value) => clamp(value + delta, 50, 200))
    }

    const previewScale = rotateZoom / 100

    return (
      <div className="workspace rotate-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle"><HomeIcon name="rotate" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> 100% free</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="shield" /> Your images stay private</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h2><HomeIcon name="sparkle" /> Quick Tips</h2>
            <p>✓ Use 90° buttons for quick rotation.</p>
            <p>✓ Use custom angle for precise rotation.</p>
            <p>✓ Preview before and after.</p>
            <p>✓ You can also flip or reset the image.</p>
          </aside>
        </div>
        <form className="rotate-layout" onSubmit={process}>
          <aside className="settings-panel rotate-settings-panel">
            <h2>Rotate</h2>
            <div className="angle-buttons">
              <button className={settings.angle === -90 ? 'active' : ''} type="button" onClick={() => updateRotateAngle(-90)}><HomeIcon name="rotate" /> 90° Left</button>
              <button className={settings.angle === 90 ? 'active' : ''} type="button" onClick={() => updateRotateAngle(90)}><HomeIcon name="rotate" /> 90° Right</button>
              <button className={settings.angle === 180 ? 'active' : ''} type="button" onClick={() => updateRotateAngle(180)}><HomeIcon name="rotate" /> 180°</button>
            </div>
            <label>
              Angle {settings.angle}°
              <input min="-180" max="180" step="1" type="range" value={settings.angle} onChange={(event) => updateRotateAngle(Number(event.target.value))} />
            </label>
            <div className="angle-scale"><span>-180°</span><span>180°</span></div>
            <h2>Flip</h2>
            <div className="flip-buttons">
              <button className={settings.flipX ? 'active' : ''} type="button" onClick={() => { clearOutputs(); setSettings((value) => ({ ...value, flipX: !value.flipX })) }}><HomeIcon name="flip" /> Flip Horizontal</button>
              <button className={settings.flipY ? 'active' : ''} type="button" onClick={() => { clearOutputs(); setSettings((value) => ({ ...value, flipY: !value.flipY })) }}><HomeIcon name="flip" /> Flip Vertical</button>
            </div>
            <h2>Canvas Options</h2>
            <label>
              Fit
              <select>
                <option>Expand Canvas (Keep All)</option>
                <option>Crop to original size</option>
              </select>
            </label>
            <label>
              Background
              <input type="color" value={settings.background} onChange={(event) => { clearOutputs(); setSettings((value) => ({ ...value, background: event.target.value })) }} />
            </label>
            <button className="secondary full" type="button" onClick={resetRotateSettings}><HomeIcon name="rotate" /> Reset All</button>
          </aside>

          <section className="rotate-preview-card">
            <div className="rotate-preview-toolbar">
              <div>
                <span>Zoom</span>
                <button type="button" onClick={() => updateRotateZoom(-10)}>−</button>
                <strong>{rotateZoom}%</strong>
                <button type="button" onClick={() => updateRotateZoom(10)}>+</button>
                <button type="button" onClick={() => setRotateZoom(100)}>Fit</button>
              </div>
              <div><span>Compare</span><label className="switch"><input type="checkbox" defaultChecked /><i></i></label><button type="button" onClick={resetRotateSettings}><HomeIcon name="rotate" /> Reset</button></div>
            </div>
            {previewUrl ? (
              <div className="rotate-compare">
                <figure>
                  <span>Original</span>
                  <img src={previewUrl} alt="Original preview" style={{ transform: `scale(${previewScale})` }} />
                </figure>
                <figure style={{ backgroundColor: settings.background }}>
                  <span>Rotated ({settings.angle}°)</span>
                  <img
                    src={processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl}
                    alt="Rotated preview"
                    style={{ transform: processed ? `scale(${previewScale})` : `rotate(${settings.angle}deg) scale(${previewScale}) scaleX(${settings.flipX ? -1 : 1}) scaleY(${settings.flipY ? -1 : 1})` }}
                  />
                </figure>
                <div className="compare-handle">↔</div>
              </div>
            ) : (
              <div className="empty-preview">Upload an image to rotate.</div>
            )}
            <div className="rotate-bottom-bar">
              <span className="privacy-note"><HomeIcon name="lock" /> Your image is processed in your browser. It never leaves your device.</span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Rotated Image</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> Download Rotated Image</button>
              )}
            </div>
          </section>

        </form>
      </div>
    )
  }

  if (tool.slug === 'image-collage') {
    const collageTemplates = [
      ['classic', 'Classic'],
      ['polaroid', 'Polaroid'],
      ['scrapbook', 'Scrapbook'],
      ['film', 'Film Strip'],
      ['paper', 'Paper'],
      ['square', 'Square'],
      ['creative', 'Creative'],
      ['minimal', 'Minimal'],
      ['mood', 'Mood Board'],
    ] as const
    const canvasSizes = [
      [1080, 1080, 'Instagram Post (1080 × 1080)'],
      [1080, 1350, 'Portrait (1080 × 1350)'],
      [1200, 900, 'Landscape (1200 × 900)'],
      [1920, 1080, 'Wide (1920 × 1080)'],
    ] as const
    const addCollageFiles = (nextFiles: File[]) => {
      const accepted = nextFiles.filter((file) => file.type.startsWith('image/')).slice(0, 20 - files.length)
      if (!accepted.length) return
      clearOutputs()
      const nextCount = files.length + accepted.length
      setFiles((current) => [...current, ...accepted].slice(0, 20))
      setCollageItems(createCollageItems(nextCount, collageOptions.template))
      if (!previewUrl) setPreviewUrl(URL.createObjectURL(accepted[0]))
    }
    const removeCollageFile = (index: number) => {
      clearOutputs()
      const nextCount = Math.max(0, files.length - 1)
      setFiles((current) => current.filter((_, currentIndex) => currentIndex !== index))
      setCollageItems(createCollageItems(nextCount, collageOptions.template))
      setActiveCollageItemId(nextCount ? 1 : null)
    }
    const updateCollageOptions = (patch: Partial<CollageOptions>) => {
      clearOutputs()
      setCollageOptions((current) => ({ ...current, ...patch }))
    }
    const selectTemplate = (template: CollageOptions['template']) => {
      clearOutputs()
      setCollageOptions((current) => ({ ...current, template }))
      setCollageItems(createCollageItems(files.length, template))
      setActiveCollageItemId(files.length ? 1 : null)
    }
    const startCollageDrag = (event: ReactPointerEvent<HTMLElement>, item: CollageItem) => {
      if (!['select', 'move'].includes(collageToolMode)) return
      const stage = event.currentTarget.closest('.collage-canvas') as HTMLElement | null
      if (!stage) return
      event.preventDefault()
      setActiveCollageItemId(item.id)
      const rect = stage.getBoundingClientRect()
      const startX = event.clientX
      const startY = event.clientY
      const initial = { x: item.x, y: item.y }
      const onMove = (moveEvent: PointerEvent) => {
        const dx = ((moveEvent.clientX - startX) / rect.width) * 100
        const dy = ((moveEvent.clientY - startY) / rect.height) * 100
        setCollageItems((current) => current.map((currentItem) => currentItem.id === item.id
          ? { ...currentItem, x: clamp(initial.x + dx, 0, 100 - currentItem.width), y: clamp(initial.y + dy, 0, 100 - currentItem.height) }
          : currentItem))
      }
      const onUp = () => {
        clearOutputs()
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
      }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp, { once: true })
    }
    const activeItem = collageItems.find((item) => item.id === activeCollageItemId)

    return (
      <div className="workspace collage-workspace">
        <form className="collage-layout" onSubmit={process}>
          <aside className="collage-left-card">
            <Breadcrumbs current={tool.name} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="grid" /></span>
            <h1>{tool.name}</h1>
            <p>Create beautiful collages with your photos, text, stickers and more.</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> 100% free</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
              <span><HomeIcon name="shield" /> Your images stay private</span>
            </div>
            <div className="meme-tabs collage-tabs">
              <button className="active" type="button"><HomeIcon name="image" /> Images</button>
              <button type="button" onClick={() => setCollageToolMode('text')}><HomeIcon name="text" /> Text</button>
              <button type="button" onClick={() => setCollageToolMode('sticker')}><HomeIcon name="smile" /> Stickers</button>
              <button type="button"><HomeIcon name="palette" /> Background</button>
            </div>
            <div className="areas-heading"><h2>Images ({files.length})</h2><button type="button" onClick={() => { clearOutputs(); setFiles([]); setPreviewUrl(''); setCollageItems([]) }}>Clear All</button></div>
            <div className="collage-thumb-grid">
              {files.map((file, index) => <button className={collageItems.some((item) => item.fileIndex === index && item.id === activeCollageItemId) ? 'active' : ''} key={`${file.name}-${index}`} type="button" onClick={() => setActiveCollageItemId(collageItems.find((item) => item.fileIndex === index)?.id ?? null)}><img src={filePreviewUrls[index]} alt="" /><span onClick={(event) => { event.stopPropagation(); removeCollageFile(index) }}>×</span></button>)}
            </div>
            <UploadButton label="Add More Images" multiple onFiles={addCollageFiles} />
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> Tip: Drag images on the canvas to position them. Double click to edit text.</p>
            <button className="secondary full" type="button" onClick={resetTool}><HomeIcon name="rotate" /> Reset</button>
          </aside>

          <section className="collage-editor-card">
            <div className="collage-toolbar">
              <div>{(['select', 'move', 'text', 'sticker'] as const).map((mode) => <button className={collageToolMode === mode ? 'active' : ''} key={mode} type="button" onClick={() => setCollageToolMode(mode)}>{mode === 'select' ? 'Select' : mode === 'move' ? 'Move' : mode === 'text' ? 'Text' : 'Sticker'}</button>)}<button type="button" onClick={() => activeItem && setCollageItems((current) => current.filter((item) => item.id !== activeItem.id))}><HomeIcon name="trash" /> Delete</button></div>
              <div><button type="button">Undo</button><button disabled type="button">Redo</button></div>
            </div>
            <div className="collage-canvas-wrap">
              <div className="collage-canvas" style={{ aspectRatio: `${collageOptions.width} / ${collageOptions.height}`, background: collageOptions.background, transform: `scale(${collageZoom / 100})` }}>
                {collageItems.map((item) => {
                  const preview = filePreviewUrls[item.fileIndex]
                  if (!preview) return null
                  return <figure className={item.id === activeCollageItemId ? 'active' : ''} key={item.id} onPointerDown={(event) => startCollageDrag(event, item)} style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.width}%`, height: `${item.height}%`, transform: `rotate(${item.rotate}deg)`, borderRadius: `${collageOptions.radius}px` }}><img src={preview} alt="" /></figure>
                })}
                {collageOptions.text && <strong className="collage-caption">{collageOptions.text}</strong>}
                {collageOptions.sticker && <span className="collage-sticker one">{collageOptions.sticker}</span>}
                <span className="collage-sticker two">♡</span>
              </div>
            </div>
            <div className="collage-bottom-tools"><span><HomeIcon name="bolt" /> Drag to move</span><div><button type="button" onClick={() => setCollageZoom((value) => clamp(value - 10, 50, 180))}>−</button><strong>{collageZoom}%</strong><button type="button" onClick={() => setCollageZoom((value) => clamp(value + 10, 50, 180))}>+</button><button type="button" onClick={() => setCollageZoom(100)}>Fit</button></div><button type="button">⛶</button></div>
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> All changes are saved in your browser. Your images are safe and private.</p>
          </section>

          <aside className="collage-right-card">
            <div className="meme-tabs collage-side-tabs"><button className="active" type="button">Templates</button><button type="button">Layouts</button></div>
            <div className="collage-template-grid">{collageTemplates.map(([template, label]) => <button className={collageOptions.template === template ? 'active' : ''} key={template} type="button" onClick={() => selectTemplate(template)}><span>{label.slice(0, 1)}</span><small>{label}</small></button>)}</div>
            <section className="collage-settings-section">
              <h2>Canvas Settings</h2>
              <label>Canvas Size<select value={`${collageOptions.width}x${collageOptions.height}`} onChange={(event) => { const [width, height] = event.target.value.split('x').map(Number); updateCollageOptions({ width, height }) }}>{canvasSizes.map(([width, height, label]) => <option key={label} value={`${width}x${height}`}>{label}</option>)}</select></label>
              <div className="dimension-grid"><label>Width<input type="number" value={collageOptions.width} onChange={(event) => updateCollageOptions({ width: Number(event.target.value) })} /></label><label>Height<input type="number" value={collageOptions.height} onChange={(event) => updateCollageOptions({ height: Number(event.target.value) })} /></label></div>
              <label>Background<input type="color" value={collageOptions.background} onChange={(event) => updateCollageOptions({ background: event.target.value })} /></label>
              <label>Spacing <span>{collageOptions.spacing}px</span><input min="0" max="60" type="range" value={collageOptions.spacing} onChange={(event) => updateCollageOptions({ spacing: Number(event.target.value) })} /></label>
              <label>Corner Radius <span>{collageOptions.radius}px</span><input min="0" max="40" type="range" value={collageOptions.radius} onChange={(event) => updateCollageOptions({ radius: Number(event.target.value) })} /></label>
              <label>Caption<input value={collageOptions.text} onChange={(event) => updateCollageOptions({ text: event.target.value })} /></label>
            </section>
            <section className="collage-layers"><h2>Layers</h2>{collageItems.slice().reverse().map((item) => <button className={item.id === activeCollageItemId ? 'active' : ''} key={item.id} type="button" onClick={() => setActiveCollageItemId(item.id)}><span>Image {item.fileIndex + 1}</span><HomeIcon name="search" /></button>)}</section>
          </aside>

          <div className="collage-download-bar">
            <span></span>
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Collage</a> : <button className="primary" type="submit"><HomeIcon name="download" /> Download Collage</button>}
          </div>
        </form>
      </div>
    )
  }

  if (tool.slug === 'gif-maker') {
    const gifCanvasSizes = [
      [1280, 720, '1280 × 720 (16:9)'],
      [1080, 1080, '1080 × 1080 (1:1)'],
      [1080, 1350, '1080 × 1350 (4:5)'],
      [720, 1280, '720 × 1280 (9:16)'],
    ] as const
    const addGifFiles = (nextFiles: File[]) => {
      const accepted = nextFiles.filter((file) => file.type.startsWith('image/')).slice(0, 50 - files.length)
      if (!accepted.length) return
      clearOutputs()
      setFiles((current) => [...current, ...accepted].slice(0, 50))
      if (!previewUrl) setPreviewUrl(URL.createObjectURL(accepted[0]))
    }
    const removeGifFile = (index: number) => {
      clearOutputs()
      setFiles((current) => current.filter((_, currentIndex) => currentIndex !== index))
      setGifPreviewIndex((current) => clamp(Math.min(current, files.length - 2), 0, Math.max(0, files.length - 2)))
    }
    const moveGifFile = (index: number, direction: -1 | 1) => {
      const target = index + direction
      if (target < 0 || target >= files.length) return
      clearOutputs()
      setFiles((current) => {
        const next = [...current]
        const [item] = next.splice(index, 1)
        next.splice(target, 0, item)
        return next
      })
      setGifPreviewIndex(target)
    }
    const updateGifOptions = (patch: Partial<GifOptions>) => {
      clearOutputs()
      setGifOptions((current) => ({ ...current, ...patch }))
    }
    return (
      <div className="workspace gif-workspace">
        <div className="compress-top gif-top-grid">
          <section className="compress-title-card">
            <Breadcrumbs current={tool.name} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="image" /></span>
            <h1>{tool.name}</h1>
            <p>Create GIFs from your images in seconds. 100% free and runs in your browser.</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> 100% free</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="shield" /> Your images stay private</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple onFiles={handleFiles} />
        </div>

        <form className="gif-layout" onSubmit={process}>
          <aside className="gif-frames-card">
            <div className="areas-heading"><h2>Images ({files.length})</h2><button type="button" onClick={() => { clearOutputs(); setFiles([]); setPreviewUrl(''); setGifPreviewIndex(0) }}>Clear All</button></div>
            <div className="gif-frame-list">
              {files.map((file, index) => <div className={index === gifPreviewIndex ? 'gif-frame-row active' : 'gif-frame-row'} key={`${file.name}-${index}`} onClick={() => setGifPreviewIndex(index)}><button type="button" onClick={(event) => { event.stopPropagation(); moveGifFile(index, -1) }}>⌃</button><img src={filePreviewUrls[index]} alt="" /><span>{index + 1}</span><div><strong>{file.name}</strong><small>Frame {index + 1}</small></div><button type="button" onClick={(event) => { event.stopPropagation(); removeGifFile(index) }}>×</button></div>)}
              {!files.length && <div className="convert-empty-list">Upload images to build your GIF.</div>}
            </div>
            <UploadButton label="Add More Images" multiple onFiles={addGifFiles} />
            <button className="secondary full" type="button" onClick={resetTool}><HomeIcon name="rotate" /> Reset</button>
          </aside>

          <section className="gif-preview-card">
            <div className="gif-preview-toolbar"><h2>Preview</h2><div><span>Preview Speed</span><select value={gifSpeed} onChange={(event) => setGifSpeed(Number(event.target.value))}><option value={0.5}>0.5x</option><option value={1}>1x</option><option value={1.5}>1.5x</option><option value={2}>2x</option></select><button type="button" onClick={() => setGifPlaying(true)}><HomeIcon name="play" /> Play</button><button type="button" onClick={() => setGifPlaying(false)}>Pause</button></div></div>
            {files.length ? (
              <>
                <div className="gif-stage" style={{ aspectRatio: `${gifOptions.width} / ${gifOptions.height}` }}><img src={filePreviewUrls[gifPreviewIndex] ?? filePreviewUrls[0]} alt="GIF preview frame" /></div>
                <strong className="gif-counter">{gifPreviewIndex + 1} / {files.length}</strong>
                <div className="gif-timeline">
                  <button type="button" onClick={() => setGifPreviewIndex((index) => clamp(index - 1, 0, files.length - 1))}>‹</button>
                  <div>{files.map((file, index) => <button className={index === gifPreviewIndex ? 'active' : ''} key={`${file.name}-thumb-${index}`} type="button" onClick={() => setGifPreviewIndex(index)}><img src={filePreviewUrls[index]} alt="" /><small>{gifOptions.frameDuration}s</small></button>)}</div>
                  <button type="button" onClick={() => setGifPreviewIndex((index) => (index + 1) % files.length)}>›</button>
                </div>
              </>
            ) : <div className="empty-preview">Upload images to preview your GIF.</div>}
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> Tip: Drag order is represented by the frame list. Use the arrow controls to reorder images.</p>
          </section>

          <aside className="gif-settings-card">
            <h2>GIF Settings</h2>
            <label>Canvas Size<select value={`${gifOptions.width}x${gifOptions.height}`} onChange={(event) => {
              const [width, height] = event.target.value.split('x').map(Number)
              updateGifOptions({ width, height })
            }}>{gifCanvasSizes.map(([width, height, label]) => <option key={label} value={`${width}x${height}`}>{label}</option>)}</select></label>
            <div className="dimension-grid"><label><input type="number" value={gifOptions.width} onChange={(event) => updateGifOptions({ width: Number(event.target.value) })} /> px</label><label><input type="number" value={gifOptions.height} onChange={(event) => updateGifOptions({ height: Number(event.target.value) })} /> px</label></div>
            <label>Fit<select value={gifOptions.fit} onChange={(event) => updateGifOptions({ fit: event.target.value as GifOptions['fit'] })}><option value="contain">Contain (Fit whole image)</option><option value="cover">Cover (Fill canvas)</option><option value="stretch">Stretch</option></select></label>
            <label>Frame Duration <span>{gifOptions.frameDuration}s</span><input min="0.1" max="2" step="0.1" type="range" value={gifOptions.frameDuration} onChange={(event) => updateGifOptions({ frameDuration: Number(event.target.value) })} /></label>
            <label>Loop<select value={gifOptions.loop} onChange={(event) => updateGifOptions({ loop: event.target.value as GifOptions['loop'] })}><option value="forever">Forever</option><option value="once">Once</option><option value="three">3 times</option></select></label>
            <h2>Advanced Options</h2>
            <label>Quality / Colors <span>{gifOptions.colors}</span><input min="32" max="256" step="32" type="range" value={gifOptions.colors} onChange={(event) => updateGifOptions({ colors: Number(event.target.value) })} /></label>
            <label className="checkbox-row"><input type="checkbox" checked={gifOptions.optimize} onChange={(event) => updateGifOptions({ optimize: event.target.checked })} /> Optimize for smaller file size</label>
          </aside>

          <div className="gif-bottom-bar">
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> GIFs with more frames or higher quality may result in larger file sizes.</p>
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download GIF</a> : <button className="primary" type="submit"><HomeIcon name="download" /> Create GIF</button>}
          </div>
        </form>
      </div>
    )
  }

  if (tool.slug === 'meme-generator') {
    const memeTemplates = [
      ['Success Kid', '#9ee7ff', '💪'],
      ['Distracted Boyfriend', '#ffd3b6', '👀'],
      ['Drake Hotline Bling', '#ffc233', '🎧'],
      ['Change My Mind', '#d8d2c4', '☕'],
      ['Woman Yelling at Cat', '#f5c6d6', '🐱'],
      ['Expanding Brain', '#182052', '🧠'],
      ['Mocking SpongeBob', '#f9dc5c', '🧽'],
      ['This is Fine', '#ff9d3d', '🔥'],
      ['Hide The Pain Harold', '#e7eef8', '🙂'],
    ] as const
    const memeFontStack = settings.memeFont === 'Impact'
      ? 'Impact, "Arial Black", sans-serif'
      : settings.memeFont === 'Anton'
        ? 'Anton, Impact, sans-serif'
        : `"${settings.memeFont}", Impact, sans-serif`
    const memeTextStyle: CSSProperties = {
      color: settings.textColor,
      fontFamily: memeFontStack,
      fontSize: `${Math.max(20, Math.round((settings.textSize || 72) * (textZoom / 100) * 0.9))}px`,
      textAlign: settings.textAlign,
      WebkitTextStroke: `${settings.memeOutlineWidth}px ${settings.textOutlineColor}`,
      textShadow: `0 ${Math.max(1, settings.memeOutlineWidth)}px 0 ${settings.textOutlineColor}, 0 4px 12px rgba(0,0,0,.35)`,
    }
    const updateMemeSetting = (key: keyof ToolSettingsState, value: string | number | boolean) => {
      clearOutputs()
      setSettings((current) => ({ ...current, [key]: value }))
    }
    const resetMeme = () => {
      clearOutputs()
      setTextZoom(100)
      setSettings((current) => ({
        ...current,
        memeTopText: 'WHEN YOU FINISH ALL YOUR TASKS',
        memeBottomText: "AND IT'S ONLY 10AM",
        memeFont: 'Impact',
        textColor: '#ffffff',
        textOutlineColor: '#000000',
        memeOutlineWidth: 4,
        textSize: Math.max(42, Math.round((settings.width || 1200) * 0.06)),
        textAlign: 'center',
      }))
    }
    const selectMemeTemplate = async (name: string, color: string, emoji: string) => {
      clearOutputs()
      const file = await fileFromDataUrl(memeTemplateDataUrl(name, color, emoji), `${name.toLowerCase().replace(/\s+/g, '-')}.svg`)
      await handleFiles([file])
      setSettings((current) => ({
        ...current,
        memeTopText: name === 'Success Kid' ? 'WHEN YOU FINISH ALL YOUR TASKS' : current.memeTopText,
        memeBottomText: name === 'Success Kid' ? "AND IT'S ONLY 10AM" : current.memeBottomText,
      }))
    }

    return (
      <div className="workspace meme-workspace">
        <div className="compress-top meme-top-grid">
          <section className="compress-title-card">
            <Breadcrumbs current={tool.name} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="smile" /></span>
            <h1>{tool.name}</h1>
            <p>Create funny memes with easy-to-use tools. 100% free and runs in your browser.</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> 100% free</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="shield" /> Your memes stay private</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h2><HomeIcon name="sparkle" /> Quick Tips</h2>
            <p>✓ Choose a popular template or upload your own image.</p>
            <p>✓ Add funny text on top and bottom.</p>
            <p>✓ Adjust font, size, outline, and alignment.</p>
            <p>✓ Preview your meme and download it.</p>
          </aside>
        </div>

        <form className="meme-layout" onSubmit={process}>
          <aside className="meme-settings-card">
            <div className="meme-tabs">
              <button className={memePanel === 'text' ? 'active' : ''} type="button" onClick={() => setMemePanel('text')}><HomeIcon name="text" /> Text</button>
              <button className={memePanel === 'image' ? 'active' : ''} type="button" onClick={() => setMemePanel('image')}><HomeIcon name="image" /> Image</button>
            </div>
            {memePanel === 'text' ? (
              <>
                <label>Top Text<textarea maxLength={80} value={settings.memeTopText} onChange={(event) => updateMemeSetting('memeTopText', event.target.value.toUpperCase())} /><small>{settings.memeTopText.length}/80</small></label>
                <label>Bottom Text<textarea maxLength={80} value={settings.memeBottomText} onChange={(event) => updateMemeSetting('memeBottomText', event.target.value.toUpperCase())} /><small>{settings.memeBottomText.length}/80</small></label>
                <label>Font<div className="meme-font-row"><select value={settings.memeFont} onChange={(event) => updateMemeSetting('memeFont', event.target.value)}><option>Impact</option><option>Anton</option><option>Arial Black</option><option>Comic Sans MS</option></select><button className={settings.textBold ? 'active' : ''} type="button" onClick={() => updateMemeSetting('textBold', !settings.textBold)}>B</button></div></label>
                <label>Font Size <span>{settings.textSize}px</span><input min="28" max="140" type="range" value={settings.textSize} onChange={(event) => updateMemeSetting('textSize', Number(event.target.value))} /></label>
                <label>Text Color <input type="color" value={settings.textColor} onChange={(event) => updateMemeSetting('textColor', event.target.value)} /></label>
                <label>Outline <span>{settings.memeOutlineWidth}px</span><input min="0" max="12" type="range" value={settings.memeOutlineWidth} onChange={(event) => updateMemeSetting('memeOutlineWidth', Number(event.target.value))} /></label>
                <label>Outline Color <input type="color" value={settings.textOutlineColor} onChange={(event) => updateMemeSetting('textOutlineColor', event.target.value)} /></label>
                <label>Alignment<div className="alignment-row">{(['left', 'center', 'right'] as const).map((align) => <button className={settings.textAlign === align ? 'active' : ''} key={align} type="button" onClick={() => updateMemeSetting('textAlign', align)}>{align === 'left' ? '←' : align === 'right' ? '→' : '↔'}</button>)}</div></label>
                <button className="secondary full" type="button">More Options⌄</button>
              </>
            ) : (
              <div className="meme-image-panel">
                <UploadButton label="Upload Image" onFiles={handleFiles} />
                <p>Use your own JPG, PNG, WebP, or GIF image as the meme background.</p>
                <div className="format-pills">
                  {[
                    ['image/jpeg', 'JPG'],
                    ['image/png', 'PNG'],
                    ['image/webp', 'WebP'],
                  ].map(([format, label]) => <button className={settings.format === format ? 'active' : ''} key={format} type="button" onClick={() => updateMemeSetting('format', format)}>{label}</button>)}
                </div>
              </div>
            )}
          </aside>

          <section className="meme-preview-card">
            <div className="rotate-preview-toolbar"><div><span>Zoom</span><button type="button" onClick={() => setTextZoom((value) => clamp(value - 10, 50, 200))}>−</button><strong>{textZoom}%</strong><button type="button" onClick={() => setTextZoom((value) => clamp(value + 10, 50, 200))}>+</button><button type="button" onClick={() => setTextZoom(100)}>Fit</button></div><div><span>Compare</span><label className="switch"><input disabled type="checkbox" /><i></i></label><button type="button" onClick={resetMeme}><HomeIcon name="rotate" /> Reset</button></div></div>
            {previewUrl ? (
              <div className="meme-stage">
                <img ref={textPreviewImageRef} src={previewUrl} alt="Meme preview" style={{ transform: `scale(${textZoom / 100})` }} />
                <strong className="meme-caption top" style={memeTextStyle}>{settings.memeTopText}</strong>
                <strong className="meme-caption bottom" style={memeTextStyle}>{settings.memeBottomText}</strong>
              </div>
            ) : <div className="empty-preview">Choose a template or upload an image.</div>}
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> Tip: Impact font with outline works best for most memes.</p>
          </section>

          <aside className="meme-side-card">
            <section>
              <div className="areas-heading"><h2>Templates</h2><button type="button">View all</button></div>
              <div className="meme-template-grid">
                {memeTemplates.map(([name, color, emoji]) => <button key={name} type="button" onClick={() => void selectMemeTemplate(name, color, emoji)}><img alt="" src={memeTemplateDataUrl(name, color, emoji)} /><small>{name}</small></button>)}
              </div>
            </section>
            <section>
              <div className="areas-heading"><h2>History</h2><button type="button" onClick={() => setMemeHistory([])}>Clear</button></div>
              {memeHistory.map((item, index) => <div className="history-item" key={`${item}-${index}`}><span><HomeIcon name="smile" /></span><div><strong>{item}</strong><small>{index === 0 ? 'Just now' : `${index * 5} minutes ago`}</small></div><button type="button">⋮</button></div>)}
            </section>
          </aside>

          <div className="meme-bottom-bar">
            <button className="secondary" type="button" onClick={resetMeme}><HomeIcon name="rotate" /> Reset</button>
            <span></span>
            {previewUrl && <a className="secondary" href={previewUrl} download={files[0]?.name ?? 'original-image'}><HomeIcon name="download" /> Download Original</a>}
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a> : <button className="primary" type="submit"><HomeIcon name="download" /> Download Image</button>}
          </div>
        </form>
      </div>
    )
  }

  if (tool.slug === 'upscale-image') {
    const originalWidth = settings.cropWidth || Math.max(1, Math.round(settings.width / Math.max(settings.upscaleScale, 1)))
    const originalHeight = settings.cropHeight || Math.max(1, Math.round(settings.height / Math.max(settings.upscaleScale, 1)))
    const previewImage = processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl
    const updateScale = (scale: number) => {
      clearOutputs()
      setUpscaleCustomMode(false)
      setSettings((current) => ({
        ...current,
        upscaleScale: scale,
        width: Math.round(originalWidth * scale),
        height: Math.round(originalHeight * scale),
      }))
    }
    const updateCustomScale = (scale: number) => {
      const nextScale = clamp(Number(scale.toFixed(1)), 1, 6)
      clearOutputs()
      setUpscaleCustomMode(true)
      setSettings((current) => ({
        ...current,
        upscaleScale: nextScale,
        width: Math.round(originalWidth * nextScale),
        height: Math.round(originalHeight * nextScale),
      }))
    }
    const updateUpscaleSize = (key: 'width' | 'height', value: number) => {
      clearOutputs()
      setUpscaleCustomMode(true)
      setSettings((current) => {
        const scale = key === 'width' ? value / originalWidth : value / originalHeight
        return {
          ...current,
          [key]: value,
          upscaleScale: Math.max(1, Number(scale.toFixed(2))),
          [key === 'width' ? 'height' : 'width']: key === 'width' ? Math.round(originalHeight * scale) : Math.round(originalWidth * scale),
        }
      })
    }
    const resetUpscaleSettings = () => {
      clearOutputs()
      setRotateZoom(100)
      setUpscaleCustomMode(false)
      setSettings((current) => ({
        ...current,
        upscaleScale: 2,
        resampling: 'smooth',
        width: originalWidth * 2,
        height: originalHeight * 2,
        sharpness: 35,
        quality: 1,
        format: 'image/jpeg',
      }))
    }

    return (
      <div className="workspace upscale-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle"><HomeIcon name="upload" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> 100% free</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="shield" /> Your images stay private</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h2><HomeIcon name="sparkle" /> Quick Tips</h2>
            <p>✓ Use 2x or 3x for the best results.</p>
            <p>✓ Smooth works best for photos.</p>
            <p>✓ Sharp works best for text and edges.</p>
            <p>✓ Higher sharpness may add more details, but can also add noise.</p>
          </aside>
        </div>

        <form className="upscale-layout" onSubmit={process}>
          <aside className="upscale-settings-card">
            <h2>Upscale Settings</h2>
            <label>Scale</label>
            <div className="scale-button-grid">{[2, 3, 4].map((scale) => <button className={settings.upscaleScale === scale && !upscaleCustomMode ? 'active' : ''} key={scale} type="button" onClick={() => updateScale(scale)}>{scale}x</button>)}<button className={upscaleCustomMode ? 'active' : ''} type="button" onClick={() => setUpscaleCustomMode(true)}>Custom</button></div>
            {upscaleCustomMode && (
              <label>Custom Scale <span>{settings.upscaleScale}x</span><input min="1" max="6" step="0.1" type="number" value={settings.upscaleScale} onChange={(event) => updateCustomScale(Number(event.target.value) || 1)} /></label>
            )}
            <div className="dimension-grid">
              <label>Width<input type="number" value={settings.width} onChange={(event) => updateUpscaleSize('width', Number(event.target.value))} /></label>
              <label>Height<input type="number" value={settings.height} onChange={(event) => updateUpscaleSize('height', Number(event.target.value))} /></label>
            </div>
            <small>Original: {originalWidth} × {originalHeight} px</small>
            <label>Resampling Method</label>
            <div className="scale-button-grid resampling-button-grid"><button className={settings.resampling === 'smooth' ? 'active' : ''} type="button" onClick={() => { clearOutputs(); setSettings((current) => ({ ...current, resampling: 'smooth' })) }}>Smooth</button><button className={settings.resampling === 'sharp' ? 'active' : ''} type="button" onClick={() => { clearOutputs(); setSettings((current) => ({ ...current, resampling: 'sharp' })) }}>Sharp</button></div>
            <label>Sharpen <span>{settings.sharpness}%</span><input min="0" max="100" type="range" value={settings.sharpness} onChange={(event) => { clearOutputs(); setSettings((current) => ({ ...current, sharpness: Number(event.target.value) })) }} /></label>
            <h2>Output Settings</h2>
            <label>Format</label>
            <div className="format-pills">
              {[
                ['image/png', 'PNG'],
                ['image/jpeg', 'JPG'],
                ['image/webp', 'WebP'],
              ].map(([format, label]) => <button className={settings.format === format ? 'active' : ''} key={format} type="button" onClick={() => { clearOutputs(); setSettings((current) => ({ ...current, format: format as OutputFormat })) }}>{label}</button>)}
            </div>
            <label>Quality <span>{Math.round(settings.quality * 100)}%</span><input min="0.35" max="1" step="0.01" type="range" value={settings.quality} onChange={(event) => { clearOutputs(); setSettings((current) => ({ ...current, quality: Number(event.target.value) })) }} /></label>
            <button className="secondary full" type="button" onClick={resetUpscaleSettings}><HomeIcon name="rotate" /> Reset</button>
          </aside>

          <section className="upscale-preview-card">
            <div className="rotate-preview-toolbar"><div><span>Zoom</span><button type="button" onClick={() => setRotateZoom((value) => clamp(value - 10, 50, 200))}>−</button><strong>{rotateZoom}%</strong><button type="button" onClick={() => setRotateZoom((value) => clamp(value + 10, 50, 200))}>+</button><button type="button" onClick={() => setRotateZoom(100)}>Fit</button></div><div><span>Compare</span><label className="switch"><input checked={upscaleCompare} type="checkbox" onChange={(event) => setUpscaleCompare(event.target.checked)} /><i></i></label><button type="button" onClick={resetUpscaleSettings}><HomeIcon name="rotate" /> Reset</button></div></div>
            {previewUrl ? (
              <div className={`upscale-compare ${upscaleCompare ? '' : 'single-preview'}`}>
                {upscaleCompare && <figure><span>Original<br />{originalWidth} × {originalHeight}</span><img src={previewUrl} alt="Original preview" style={{ filter: 'blur(2px)', transform: `scale(${rotateZoom / 100})` }} /></figure>}
                <figure><span>Upscaled {settings.upscaleScale}x<br />{settings.width} × {settings.height}</span><img src={previewImage} alt="Upscaled preview" style={{ transform: `scale(${rotateZoom / 100})` }} /></figure>
                {upscaleCompare && <div className="compare-handle">↔</div>}
                <em>Original: {originalWidth} × {originalHeight}px → Upscaled: {settings.width} × {settings.height}px ({settings.upscaleScale}x)</em>
              </div>
            ) : <div className="empty-preview">Upload an image to upscale.</div>}
            {error && <p className="error">{error}</p>}
            {status && <div className="change-bg-success"><span><HomeIcon name="shield" /></span><div><strong>Upscale ready!</strong><p>{status}</p></div><HomeIcon name="sparkle" /></div>}
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> Higher scale means larger file size. Use 2x for best balance between quality and performance.</p>
          </section>

          <div className="upscale-bottom-bar">
            <span></span>
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Upscaled Image</a> : <button className="primary" type="submit"><HomeIcon name="download" /> Download Upscaled Image</button>}
          </div>
        </form>
      </div>
    )
  }

  if (tool.slug === 'photo-grid') {
    const gridSlots = photoGridOptions.columns * photoGridOptions.rows
    const visibleGridFiles = files.slice(0, gridSlots)
    const addGridFiles = async (nextFiles: File[]) => {
      clearOutputs()
      const accepted = nextFiles.filter((file) => file.type.startsWith('image/'))
      if (!accepted.length) {
        setError('Please upload image files.')
        return
      }
      setFiles((current) => [...current, ...accepted].slice(0, 20))
      if (!previewUrl) {
        setPreviewUrl(URL.createObjectURL(accepted[0]))
        const bitmap = await loadBitmap(accepted[0])
        setSettings((current) => ({ ...current, width: bitmap.width, height: bitmap.height }))
      }
    }
    const removeGridFile = (index: number) => {
      clearOutputs()
      setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))
      setPhotoGridOffsets((current) => {
        const next: PhotoGridOffsets = {}
        Object.entries(current).forEach(([key, value]) => {
          const itemIndex = Number(key)
          if (itemIndex < index) next[itemIndex] = value
          if (itemIndex > index) next[itemIndex - 1] = value
        })
        return next
      })
      setActivePhotoGridIndex((current) => clamp(Math.min(current, files.length - 2), 0, Math.max(0, files.length - 2)))
    }
    const clearGridFiles = () => {
      clearOutputs()
      setFiles([])
      setPreviewUrl('')
      setPhotoGridOffsets({})
      setActivePhotoGridIndex(0)
    }
    const updateGridOptions = (patch: Partial<PhotoGridOptions>) => {
      clearOutputs()
      setPhotoGridOptions((current) => ({ ...current, ...patch }))
    }
    const makeGrid = async () => {
      setError('')
      setStatus('Creating your photo grid...')
      try {
        if (!files.length) throw new Error('Please upload images first.')
        const result = await createPhotoGrid(files, photoGridOptions, photoGridOffsets)
        setProcessed(result)
        setStatus('Done. Your photo grid is ready to download.')
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Something went wrong while creating your photo grid.')
        setStatus('')
      }
    }
    const layoutPresets: Array<[number, number, string]> = [
      [1, 1, '1×1'],
      [2, 2, '2×2'],
      [1, 3, '1×3'],
      [3, 1, '3×1'],
      [3, 2, '3×2'],
      [2, 3, '2×3'],
      [3, 3, '3×3'],
      [4, 4, '4×4'],
    ]
    const backgroundOptions = ['transparent', '#ffffff', '#000000', '#e5e5e5', '#f1ebff']
    const gridAspect = photoGridOptions.aspectRatio.replace(':', ' / ')
    const moveGridPhoto = (index: number, deltaX: number, deltaY: number) => {
      clearOutputs()
      setPhotoGridOffsets((current) => {
        const currentOffset = current[index] ?? { x: 0, y: 0 }
        return {
          ...current,
          [index]: {
            x: clamp(currentOffset.x + deltaX, -100, 100),
            y: clamp(currentOffset.y + deltaY, -100, 100),
          },
        }
      })
    }
    const resetGridPhotoPosition = (index: number) => {
      clearOutputs()
      setPhotoGridOffsets((current) => {
        const next = { ...current }
        delete next[index]
        return next
      })
    }
    const handleGridPhotoPointerDown = (event: ReactPointerEvent<HTMLElement>, index: number) => {
      const cell = event.currentTarget as HTMLElement
      setActivePhotoGridIndex(index)
      const startX = event.clientX
      const startY = event.clientY
      const startOffset = photoGridOffsets[index] ?? { x: 0, y: 0 }
      const rect = cell.getBoundingClientRect()
      event.preventDefault()
      event.stopPropagation()
      clearOutputs()
      const movePhoto = (moveEvent: PointerEvent) => {
        const deltaX = ((moveEvent.clientX - startX) / Math.max(1, rect.width)) * 120
        const deltaY = ((moveEvent.clientY - startY) / Math.max(1, rect.height)) * 120
        setPhotoGridOffsets((current) => ({
          ...current,
          [index]: {
            x: clamp(startOffset.x + deltaX, -100, 100),
            y: clamp(startOffset.y + deltaY, -100, 100),
          },
        }))
      }
      const stopMove = () => {
        window.removeEventListener('pointermove', movePhoto)
        window.removeEventListener('pointerup', stopMove)
      }
      window.addEventListener('pointermove', movePhoto)
      window.addEventListener('pointerup', stopMove)
    }

    return (
      <div className="workspace photo-grid-workspace">
        <div className="photo-grid-shell">
          <aside className="photo-left-card">
            <Breadcrumbs current={tool.name} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="grid" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> 100% free</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
              <span><HomeIcon name="shield" /> Your images stay private</span>
            </div>
            <div className="photo-tabs"><button className="active" type="button"><HomeIcon name="image" /> Images</button><button type="button"><HomeIcon name="settings" /> Settings</button></div>
            <div className="areas-heading"><h2>Add Images ({files.length}/20)</h2><button type="button" onClick={clearGridFiles}>Clear All</button></div>
            <div className="photo-thumb-grid">
              {files.map((file, index) => <button key={`${file.name}-${index}`} type="button" onClick={() => removeGridFile(index)}><img src={filePreviewUrls[index]} alt="" /><span>×</span></button>)}
            </div>
            <UploadButton label="Add More Images" multiple onFiles={addGridFiles} />
            <p className="privacy-note"><HomeIcon name="sparkle" /> Tip: Drag a photo inside the grid to adjust its position.</p>
            <button className="secondary full" type="button" onClick={clearGridFiles}><HomeIcon name="rotate" /> Reset</button>
          </aside>

          <main className="photo-editor-card">
            <div className="photo-editor-toolbar">
              <section><strong>Grid Layout</strong><div>{layoutPresets.slice(0, 8).map(([columns, rows, label]) => <button className={photoGridOptions.columns === columns && photoGridOptions.rows === rows ? 'active' : ''} key={label} type="button" onClick={() => updateGridOptions({ columns, rows })}>{label}</button>)}</div></section>
              <section><strong>Aspect Ratio</strong><div>{(['1:1', '4:5', '16:9', '9:16'] as const).map((ratio) => <button className={photoGridOptions.aspectRatio === ratio ? 'active' : ''} key={ratio} type="button" onClick={() => updateGridOptions({ aspectRatio: ratio })}>{ratio}</button>)}</div></section>
            </div>
            <div className="photo-grid-canvas" style={{ background: photoGridOptions.background === 'transparent' ? undefined : photoGridOptions.background, transform: `scale(${photoGridZoom / 100})` }}>
              <div
                className="photo-grid-preview"
                style={{
                  gridTemplateColumns: `repeat(${photoGridOptions.columns}, 1fr)`,
                  gap: `${photoGridOptions.spacing}px`,
                  padding: `${photoGridOptions.border}px`,
                  borderRadius: `${photoGridOptions.radius}px`,
                  aspectRatio: gridAspect,
                }}
              >
                {Array.from({ length: gridSlots }).map((_, index) => visibleGridFiles[index] ? (
                  <div className={index === activePhotoGridIndex ? 'photo-grid-cell active' : 'photo-grid-cell'} key={index} style={{ borderRadius: `${photoGridOptions.radius}px` }} onPointerDown={(event) => handleGridPhotoPointerDown(event, index)}>
                    <img
                      src={filePreviewUrls[index]}
                      alt=""
                      style={{
                        transform: `translate(${((photoGridOffsets[index]?.x ?? 0) * 0.12).toFixed(2)}%, ${((photoGridOffsets[index]?.y ?? 0) * 0.12).toFixed(2)}%)`,
                      }}
                    />
                  </div>
                ) : (
                  <span key={index}><HomeIcon name="image" /></span>
                ))}
              </div>
            </div>
            <div className="photo-editor-controls">
              <button type="button" disabled={!visibleGridFiles[activePhotoGridIndex]} onClick={() => moveGridPhoto(activePhotoGridIndex, -12, 0)}>←</button><button type="button" disabled={!visibleGridFiles[activePhotoGridIndex]} onClick={() => moveGridPhoto(activePhotoGridIndex, 12, 0)}>→</button><button type="button" disabled={!visibleGridFiles[activePhotoGridIndex]} onClick={() => moveGridPhoto(activePhotoGridIndex, 0, -12)}>↑</button><button type="button" disabled={!visibleGridFiles[activePhotoGridIndex]} onClick={() => moveGridPhoto(activePhotoGridIndex, 0, 12)}>↓</button><button type="button" disabled={!visibleGridFiles[activePhotoGridIndex]} onClick={() => resetGridPhotoPosition(activePhotoGridIndex)}>Reset photo</button>
              <button type="button" onClick={() => setPhotoGridZoom((value) => clamp(value - 10, 50, 150))}>−</button><strong>{photoGridZoom}%</strong><button type="button" onClick={() => setPhotoGridZoom((value) => clamp(value + 10, 50, 150))}>+</button>
              <button type="button" onClick={() => setPhotoGridZoom(100)}>Fit</button>
            </div>
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
          </main>

          <aside className="photo-right-card">
            <section>
              <div className="areas-heading"><h2>Layout Presets</h2><button type="button">View all</button></div>
              <div className="photo-layout-grid">{layoutPresets.slice(1, 8).map(([columns, rows, label]) => <button className={photoGridOptions.columns === columns && photoGridOptions.rows === rows ? 'active' : ''} key={label} type="button" onClick={() => updateGridOptions({ columns, rows })}><span style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>{Array.from({ length: Math.min(columns * rows, 9) }).map((_, index) => <i key={index}></i>)}</span><small>{label}</small></button>)}</div>
            </section>
            <section className="photo-settings-section">
              <label>Spacing <span>{photoGridOptions.spacing}px</span><input min="0" max="60" type="range" value={photoGridOptions.spacing} onChange={(event) => updateGridOptions({ spacing: Number(event.target.value) })} /></label>
              <label>Border <span>{photoGridOptions.border}px</span><input min="0" max="30" type="range" value={photoGridOptions.border} onChange={(event) => updateGridOptions({ border: Number(event.target.value) })} /></label>
              <label>Corner Radius <span>{photoGridOptions.radius}px</span><input min="0" max="40" type="range" value={photoGridOptions.radius} onChange={(event) => updateGridOptions({ radius: Number(event.target.value) })} /></label>
              <strong>Background</strong>
              <div className="photo-bg-row">{backgroundOptions.map((color) => <button className={photoGridOptions.background === color ? 'active' : ''} key={color} style={color === 'transparent' ? undefined : { background: color }} type="button" onClick={() => updateGridOptions({ background: color })}></button>)}<input type="color" value={photoGridOptions.background === 'transparent' ? '#ffffff' : photoGridOptions.background} onChange={(event) => updateGridOptions({ background: event.target.value })} /></div>
            </section>
          </aside>

          <div className="photo-bottom-bar">
            <span className="privacy-note"><HomeIcon name="shield" /> All processing happens in your browser. Your images are safe and private.</span>
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a> : <button className="primary" type="button" onClick={() => void makeGrid()}><HomeIcon name="download" /> Download Image</button>}
          </div>
        </div>
      </div>
    )
  }

  if (tool.slug === 'image-to-pdf') {
    const sortedPdfFiles = files
      .map((file, index) => ({ file, originalIndex: index, preview: filePreviewUrls[index] }))
      .sort((left, right) => {
        if (pdfSort === 'name') return left.file.name.localeCompare(right.file.name)
        if (pdfSort === 'size') return right.file.size - left.file.size
        return left.originalIndex - right.originalIndex
      })
    const addPdfFiles = async (nextFiles: File[]) => {
      clearOutputs()
      const accepted = nextFiles.filter((file) => file.type.startsWith('image/'))
      if (!accepted.length) {
        setError("We couldn't read these images. Please upload JPG, PNG, WebP, GIF, BMP, or TIFF files.")
        return
      }
      setFiles((current) => [...current, ...accepted].slice(0, 30))
      if (!previewUrl) {
        setPreviewUrl(URL.createObjectURL(accepted[0]))
        const bitmap = await loadBitmap(accepted[0])
        setSettings((current) => ({ ...current, width: bitmap.width, height: bitmap.height }))
      }
    }
    const removePdfFile = (index: number) => {
      clearOutputs()
      setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))
    }
    const clearPdfFiles = () => {
      clearOutputs()
      setFiles([])
      setPreviewUrl('')
      setPdfSort('custom')
    }
    const convertPdfFiles = async (event: FormEvent) => {
      event.preventDefault()
      setError('')
      setStatus('Creating your PDF in your browser...')
      try {
        if (!files.length) throw new Error('Please upload images first.')
        const orderedFiles = sortedPdfFiles.map((item) => item.file)
        const blob = await createPdf(orderedFiles, pdfOptions)
        setProcessed({
          name: 'nanoimage-images.pdf',
          blob,
          size: blob.size,
          url: URL.createObjectURL(blob),
        })
        setStatus('Done. Your PDF is ready to download.')
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Something went wrong while creating your PDF.')
        setStatus('')
      }
    }
    const updatePdfOption = <K extends keyof PdfOptions>(key: K, value: PdfOptions[K]) => {
      clearOutputs()
      setPdfOptions((current) => ({ ...current, [key]: value }))
    }
    const pageLabel = pdfOptions.pageSize === 'a4' ? 'A4 (210 × 297 mm)' : 'Letter (8.5 × 11 in)'
    const pdfPreviewPageStyle = {
      aspectRatio: pdfOptions.orientation === 'landscape' ? '1.414 / 1' : '1 / 1.414',
      padding: `${clamp(pdfOptions.margin * 0.08, 0.55, 2.1)}rem`,
    } as CSSProperties
    const pdfPreviewImageStyle = {
      objectFit: pdfOptions.imageFit === 'fill' ? 'cover' : 'contain',
      width: pdfOptions.imageFit === 'actual' ? 'auto' : '100%',
      height: pdfOptions.imageFit === 'actual' ? 'auto' : '100%',
      maxWidth: '100%',
      maxHeight: '100%',
    } as CSSProperties

    return (
      <div className="workspace pdf-workspace">
        <div className="convert-top-grid">
          <section className="convert-title-card">
            <Breadcrumbs current={tool.name} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="file" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> 100% free</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="shield" /> Your files stay private</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple onFiles={handleFiles} />
          <aside className="convert-help-card">
            <h2>💡 How it works</h2>
            {['Upload one or more images.', 'Arrange the order and choose PDF settings.', 'Click Convert to PDF.', 'Download your PDF file instantly.'].map((item, index) => <p key={item}><strong>{index + 1}</strong> {item}</p>)}
          </aside>
        </div>

        <form className="pdf-layout" onSubmit={convertPdfFiles}>
          <section className="pdf-list-card">
            <div className="convert-list-heading">
              <strong>Images ({files.length})</strong>
              <div>
                <span>Sort by</span>
                <select value={pdfSort} onChange={(event) => setPdfSort(event.target.value as typeof pdfSort)}>
                  <option value="custom">Custom</option>
                  <option value="name">Name</option>
                  <option value="size">Size</option>
                </select>
                <UploadButton label="Add More" multiple onFiles={addPdfFiles} />
                <button type="button" onClick={clearPdfFiles}>Clear All <HomeIcon name="trash" /></button>
              </div>
            </div>
            <div className="pdf-file-list">
              {sortedPdfFiles.map(({ file, originalIndex, preview }, index) => (
                <div className="pdf-file-row" key={`${file.name}-${originalIndex}`}>
                  <span className="drag-handle">⋮⋮</span>
                  <img src={preview} alt="" />
                  <div><strong>{index + 1} {file.name}</strong><small>{formatSize(file.size)}</small></div>
                  <button type="button" onClick={() => removePdfFile(originalIndex)}>×</button>
                </div>
              ))}
              {!files.length && <div className="convert-empty-list">Upload images to create a PDF.</div>}
            </div>
            <UploadButton label="Add More Images" multiple onFiles={addPdfFiles} />
          </section>

          <section className="pdf-preview-card">
            <div className="pdf-preview-toolbar"><button type="button">‹</button><button type="button">›</button><strong>1 / {Math.max(files.length, 1)}</strong><button type="button">−</button><select><option>Fit</option></select><button type="button">+</button></div>
            <div className="pdf-page-preview">
              {(sortedPdfFiles.length ? sortedPdfFiles : []).slice(0, 3).map(({ preview, file }) => <figure key={file.name} style={pdfPreviewPageStyle}><img src={preview} alt="" style={pdfPreviewImageStyle} />{pdfOptions.caption && <figcaption>{file.name}</figcaption>}</figure>)}
              {!sortedPdfFiles.length && <span>PDF preview will appear here.</span>}
            </div>
          </section>

          <aside className="pdf-settings-card">
            <h2>Page Settings</h2>
            <label>Page Size<select value={pdfOptions.pageSize} onChange={(event) => updatePdfOption('pageSize', event.target.value as PdfOptions['pageSize'])}><option value="a4">A4 (210 × 297 mm)</option><option value="letter">Letter (8.5 × 11 in)</option></select></label>
            <div className="pdf-radio-row"><span>Orientation</span><label><input checked={pdfOptions.orientation === 'portrait'} type="radio" onChange={() => updatePdfOption('orientation', 'portrait')} /> Portrait</label><label><input checked={pdfOptions.orientation === 'landscape'} type="radio" onChange={() => updatePdfOption('orientation', 'landscape')} /> Landscape</label></div>
            <label>Margin<select value={pdfOptions.margin} onChange={(event) => updatePdfOption('margin', Number(event.target.value))}><option value={10}>Small (10 mm)</option><option value={20}>Normal (20 mm)</option><option value={30}>Large (30 mm)</option></select></label>
            <label>Image Fit<select value={pdfOptions.imageFit} onChange={(event) => updatePdfOption('imageFit', event.target.value as PdfOptions['imageFit'])}><option value="fit">Fit to page</option><option value="fill">Fill page</option><option value="actual">Actual size</option></select></label>
            <label>Spacing Between Images <span>{pdfOptions.spacing} mm</span><input min="0" max="40" type="range" value={pdfOptions.spacing} onChange={(event) => updatePdfOption('spacing', Number(event.target.value))} /></label>
            <div className="convert-options">
              <strong>More Options</strong>
              <label><input checked={pdfOptions.caption} type="checkbox" onChange={(event) => updatePdfOption('caption', event.target.checked)} /> Add image filename as caption</label>
              <label><input checked={pdfOptions.sameSize} type="checkbox" onChange={(event) => updatePdfOption('sameSize', event.target.checked)} /> Make all pages the same size</label>
              <label><input checked={pdfOptions.compress} type="checkbox" onChange={(event) => updatePdfOption('compress', event.target.checked)} /> Compress PDF</label>
            </div>
          </aside>

          <div className="pdf-bottom-bar">
            <button className="secondary" type="button" onClick={clearPdfFiles}><HomeIcon name="rotate" /> Reset</button>
            <span className="privacy-note"><HomeIcon name="sparkle" /> Tip: You can drag and drop to reorder images.</span>
            <button className="secondary" type="submit"><HomeIcon name="file" /> Convert to PDF</button>
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download PDF</a> : <button className="primary" type="submit"><HomeIcon name="download" /> Download PDF</button>}
          </div>
          {error && <p className="error">{error}</p>}
          {status && <p className="status">{status} {processed ? `(${pageLabel})` : ''}</p>}
        </form>
      </div>
    )
  }

  if (tool.slug === 'enhance-image') {
    const enhanceAdjustments: Array<[keyof ToolSettingsState, string, number, number]> = [
      ['brightness', 'Brightness', -50, 50],
      ['contrast', 'Contrast', -50, 50],
      ['saturation', 'Saturation', -50, 60],
      ['vibrance', 'Vibrance', -50, 60],
      ['exposure', 'Exposure', -40, 40],
      ['highlights', 'Highlights', -60, 60],
      ['shadows', 'Shadows', -60, 60],
      ['sharpness', 'Sharpness', 0, 60],
      ['clarity', 'Clarity', -30, 50],
      ['warmth', 'Warmth', -50, 50],
      ['tint', 'Tint', -50, 50],
    ]
    const presetValues = [
      ['None', { brightness: 0, contrast: 0, saturation: 0, vibrance: 0, exposure: 0, highlights: 0, shadows: 0, sharpness: 0, clarity: 0, warmth: 0, tint: 0 }],
      ['Auto Enhance', { brightness: 12, contrast: 18, saturation: 20, vibrance: 15, exposure: 6, highlights: -10, shadows: 25, sharpness: 30, clarity: 15, warmth: 5, tint: 0 }],
      ['Vivid', { brightness: 8, contrast: 28, saturation: 42, vibrance: 32, exposure: 4, highlights: -14, shadows: 18, sharpness: 34, clarity: 22, warmth: 4, tint: 0 }],
      ['Bright', { brightness: 24, contrast: 10, saturation: 14, vibrance: 12, exposure: 14, highlights: -6, shadows: 18, sharpness: 16, clarity: 8, warmth: 2, tint: 0 }],
      ['Warm', { brightness: 10, contrast: 14, saturation: 16, vibrance: 12, exposure: 4, highlights: -8, shadows: 16, sharpness: 18, clarity: 10, warmth: 28, tint: 6 }],
      ['Cool', { brightness: 8, contrast: 18, saturation: 12, vibrance: 16, exposure: 2, highlights: -10, shadows: 15, sharpness: 22, clarity: 16, warmth: -24, tint: -8 }],
      ['Soft', { brightness: 10, contrast: -8, saturation: 8, vibrance: 8, exposure: 5, highlights: -18, shadows: 20, sharpness: 6, clarity: -10, warmth: 6, tint: 0 }],
      ['Clear', { brightness: 6, contrast: 24, saturation: 12, vibrance: 14, exposure: 0, highlights: -20, shadows: 20, sharpness: 42, clarity: 28, warmth: 0, tint: 0 }],
      ['B&W', { brightness: 4, contrast: 26, saturation: -50, vibrance: -50, exposure: 0, highlights: -8, shadows: 12, sharpness: 25, clarity: 20, warmth: 0, tint: 0 }],
    ] as const
    const enhanceFilter = enhanceCssFilter(settings)
    const updateEnhanceSetting = (key: keyof ToolSettingsState, value: number) => {
      clearOutputs()
      setSettings((current) => ({ ...current, [key]: value }))
    }
    const applyEnhancePreset = (preset: (typeof presetValues)[number]) => {
      clearOutputs()
      setSettings((current) => ({ ...current, ...preset[1] }))
      setStatus(`${preset[0]} preset applied.`)
    }
    const resetEnhanceSettings = () => {
      clearOutputs()
      setEnhancePanel('adjust')
      setRotateZoom(100)
      setSettings((current) => ({ ...current, ...presetValues[0][1] }))
    }
    const previewImage = processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl

    return (
      <div className="workspace enhance-workspace">
        <div className="pixelate-top-grid">
          <section className="pixelate-title-card">
            <Breadcrumbs current={tool.name} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="magic" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> 100% free</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="shield" /> Your images stay private</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="pixelate-help-card">
            <h2>✨ Quick Tips</h2>
            <p>✓ Adjust the sliders to enhance your image.</p>
            <p>✓ Use Compare view to see the difference.</p>
            <p>✓ All changes are done in your browser.</p>
            <p>✓ You can reset to the original at any time.</p>
          </aside>
        </div>

        <form className="enhance-layout" onSubmit={process}>
          <aside className="enhance-settings-card">
            <div className="enhance-tabs">
              <button className={enhancePanel === 'adjust' ? 'active' : ''} type="button" onClick={() => setEnhancePanel('adjust')}>Adjust</button>
              <button className={enhancePanel === 'filters' ? 'active' : ''} type="button" onClick={() => setEnhancePanel('filters')}>Filters</button>
            </div>
            {enhancePanel === 'adjust' ? enhanceAdjustments.map(([key, label, min, max]) => (
                <label className="enhance-slider" key={key}>
                  <span>{label}</span>
                  <input min={min} max={max} type="range" value={Number(settings[key])} onChange={(event) => updateEnhanceSetting(key, Number(event.target.value))} />
                  <em>{Number(settings[key])}</em>
                </label>
              )) : (
                <div className="enhance-filter-list">
                  {presetValues.map((preset, index) => (
                    <button key={preset[0]} type="button" onClick={() => applyEnhancePreset(preset)}>
                      <span className={`preset-thumb preset-${index}`}></span>
                      <strong>{preset[0]}</strong>
                    </button>
                  ))}
                </div>
              )}
            <button className="secondary full" type="button" onClick={resetEnhanceSettings}><HomeIcon name="rotate" /> Reset All</button>
          </aside>

          <section className="enhance-preview-card">
            <div className="enhance-toolbar">
              <div><span>View:</span><button className="active" type="button">Before / After</button></div>
              <div><span>Zoom</span><button type="button" onClick={() => setRotateZoom((value) => clamp(value - 10, 50, 200))}>−</button><strong>{rotateZoom}%</strong><button type="button" onClick={() => setRotateZoom((value) => clamp(value + 10, 50, 200))}>+</button><span>Compare</span><label className="switch"><input checked readOnly type="checkbox" /><i></i></label></div>
            </div>
            {previewUrl ? (
              <div className="enhance-stage before-after">
                <figure><span>Before</span><img src={previewUrl} alt="Before enhancement" style={{ transform: `scale(${rotateZoom / 100})` }} /></figure>
                <figure><span>After</span><img src={previewImage} alt="After enhancement" style={{ filter: processed ? undefined : enhanceFilter, transform: `scale(${rotateZoom / 100})` }} /></figure>
              </div>
            ) : (
              <div className="empty-preview">Upload an image to enhance.</div>
            )}
            {(processed || status) && <div className="change-bg-success"><span><HomeIcon name="shield" /></span><div><strong>Enhancement ready!</strong><p>{status || 'Download your enhanced image.'}</p></div><HomeIcon name="sparkle" /></div>}
            {error && <p className="error">{error}</p>}
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> Tip: Adjust the sliders on the left to enhance your image.</p>
          </section>

          <aside className="enhance-side-card">
            <section>
              <h2>Presets</h2>
              <div className="enhance-preset-grid">
                {presetValues.map((preset, index) => <button key={preset[0]} type="button" onClick={() => applyEnhancePreset(preset)}><span className={`preset-thumb preset-${index}`}></span><small>{preset[0]}</small></button>)}
              </div>
            </section>
          </aside>

          <div className="enhance-bottom-bar">
            <button className="secondary" type="button" onClick={resetEnhanceSettings}><HomeIcon name="rotate" /> Reset</button>
            <span></span>
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a> : <button className="primary" type="submit"><HomeIcon name="download" /> Download Image</button>}
          </div>
        </form>
      </div>
    )
  }

  if (tool.slug === 'convert-image' || tool.slug === 'convert-to-webp') {
    const isWebpOnly = tool.slug === 'convert-to-webp'
    const outputFormat = isWebpOnly ? 'image/webp' : settings.format
    const outputLabel = extensionFor(outputFormat).toUpperCase()
    const originalTotal = files.reduce((sum, file) => sum + file.size, 0)
    const convertedTotal = batch.length ? batch.reduce((sum, item) => sum + item.size, 0) : 0
    const convertedSaved = originalTotal && convertedTotal ? Math.round(((originalTotal - convertedTotal) / originalTotal) * 100) : 0
    const sortedConvertFiles = files
      .map((file, index) => ({ file, originalIndex: index }))
      .sort((left, right) => {
        if (convertSort === 'name') return left.file.name.localeCompare(right.file.name)
        if (convertSort === 'size') return right.file.size - left.file.size
        return left.originalIndex - right.originalIndex
      })
    const convertFiles = async (event: FormEvent) => {
      event.preventDefault()
      setError('')
      setStatus('Converting in your browser...')
      try {
        if (!files.length) throw new Error('Please upload images first.')
        const results = await Promise.all(files.map((file) => processImage(file, tool.slug, { ...settings, format: outputFormat })))
        setBatch(results)
        if (results.length === 1) {
          setProcessed(results[0])
        } else {
          const zip = new JSZip()
          results.forEach((item) => zip.file(item.name, item.blob))
          const zipBlob = await zip.generateAsync({ type: 'blob' })
          setProcessed({
            name: isWebpOnly ? 'nanoimage-webp-images.zip' : 'nanoimage-converted-images.zip',
            blob: zipBlob,
            size: zipBlob.size,
            url: URL.createObjectURL(zipBlob),
          })
        }
        setStatus('Done. Your result is ready to download.')
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Something went wrong while converting images.')
        setStatus('')
      }
    }
    const removeConvertFile = (index: number) => {
      clearOutputs()
      setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))
    }
    const clearConvertFiles = () => {
      clearOutputs()
      setFiles([])
      setPreviewUrl('')
      setConvertSort('name')
    }
    const addConvertFiles = async (nextFiles: File[]) => {
      clearOutputs()
      const accepted = nextFiles.filter((file) => file.type.startsWith('image/'))
      if (!accepted.length) {
        setError("We couldn't read these images. Please upload JPG, PNG, WebP, or GIF files.")
        return
      }
      setFiles((current) => [...current, ...accepted].slice(0, 20))
      if (!previewUrl) {
        const first = accepted[0]
        setPreviewUrl(URL.createObjectURL(first))
        const bitmap = await loadBitmap(first)
        setSettings((value) => ({
          ...value,
          width: bitmap.width,
          height: bitmap.height,
        }))
      }
    }

    return (
      <div className="workspace convert-workspace">
        <div className="convert-top-grid">
          <section className="convert-title-card">
            <Breadcrumbs current={tool.name} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="convert" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> 100% free</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="shield" /> Your images stay private</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple onFiles={handleFiles} />
          <aside className="convert-help-card">
            <h2>{isWebpOnly ? '💡 Why WebP?' : '🔄 Supported Conversions'}</h2>
            {isWebpOnly ? (
              <>
                <p>✓ WebP images are smaller in size.</p>
                <p>✓ Better quality at a lower file size.</p>
                <p>✓ Perfect for websites and web apps.</p>
                <p>✓ Supported by all modern browsers.</p>
              </>
            ) : (
              <div className="conversion-pills">
                {['JPG → PNG', 'JPG → WebP', 'PNG → JPG', 'GIF → PNG', 'WebP → JPG', 'BMP → JPG', 'PNG → WebP', 'TIFF → JPG'].map((item) => <span key={item}>{item}</span>)}
                <small>...and more!</small>
              </div>
            )}
          </aside>
        </div>

        <form className="convert-layout" onSubmit={convertFiles}>
          <section className="convert-list-card">
            <div className="convert-list-heading">
              <strong>{files.length || (isWebpOnly ? 5 : 10)} Images Added</strong>
              <div>
                <span>Sort by</span>
                <select value={convertSort} onChange={(event) => setConvertSort(event.target.value as 'custom' | 'name' | 'size')}>
                  <option value="custom">Custom</option>
                  <option value="name">Name</option>
                  <option value="size">Size</option>
                </select>
                <UploadButton label="Add More" multiple onFiles={addConvertFiles} />
                <button type="button" onClick={clearConvertFiles}>Clear All <HomeIcon name="trash" /></button>
              </div>
            </div>
            <div className="convert-file-list">
              {sortedConvertFiles.map(({ file, originalIndex }, index) => {
                const result = batch[originalIndex]
                const saved = result ? Math.round(((file.size - result.size) / file.size) * 100) : 0
                return (
                  <div className="convert-file-row" key={`${file.name}-${index}`}>
                    <span className="drag-handle">⋮⋮</span>
                    <div className="convert-thumb">{previewUrl && index === 0 ? <img src={previewUrl} alt="" /> : <HomeIcon name="image" />}</div>
                    <div><strong>{file.name}</strong><small>{file.type.split('/')[1]?.toUpperCase() || 'IMG'} · {formatSize(file.size)}</small></div>
                    <span className="convert-arrow">→</span>
                    {isWebpOnly ? <strong className="format-target">WebP</strong> : (
                      <select value={settings.format} onChange={(event) => { clearOutputs(); setSettings((value) => ({ ...value, format: event.target.value as OutputFormat })) }}>
                        <option value="image/png">PNG</option>
                        <option value="image/jpeg">JPG</option>
                        <option value="image/webp">WebP</option>
                      </select>
                    )}
                    <div className="estimated-size"><small>{result ? 'Result size' : 'Result size'}</small><strong>{result ? formatSize(result.size) : 'After conversion'} {result && saved !== 0 && <em>{saved > 0 ? `↓ ${saved}%` : `↑ ${Math.abs(saved)}%`}</em>}</strong></div>
                    <button type="button" onClick={() => removeConvertFile(originalIndex)}>×</button>
                  </div>
                )
              })}
              {!files.length && <div className="convert-empty-list">Upload images to start converting.</div>}
            </div>
            <UploadButton label="Add More Images" multiple onFiles={addConvertFiles} />
            <div className="convert-total-row">
              <span>Total {files.length} images</span>
              <span>Original size: {formatSize(originalTotal)}</span>
              <span>{outputLabel} size: {convertedTotal ? formatSize(convertedTotal) : 'After conversion'} {convertedTotal > 0 && convertedSaved !== 0 && `(${convertedSaved > 0 ? `↓ ${convertedSaved}%` : `↑ ${Math.abs(convertedSaved)}%`})`}</span>
            </div>
          </section>

          <aside className="convert-settings-card">
            <h2>{isWebpOnly ? 'WebP Settings' : 'Convert To'}</h2>
            {!isWebpOnly && (
              <div className="format-card-grid">
                {[
                  ['image/jpeg', 'JPG'],
                  ['image/png', 'PNG'],
                  ['image/webp', 'WebP'],
                ].map(([value, label]) => (
                  <button className={settings.format === value ? 'active' : ''} key={value} type="button" onClick={() => { clearOutputs(); setSettings((current) => ({ ...current, format: value as OutputFormat })) }}>
                    <HomeIcon name="file" /> {label}
                  </button>
                ))}
              </div>
            )}
            <label>
              Quality <span>{Math.round(settings.quality * 100)}%</span>
              <input min="0.35" max="1" step="0.01" type="range" value={settings.quality} onChange={(event) => { clearOutputs(); setSettings((value) => ({ ...value, quality: Number(event.target.value) })) }} />
            </label>
            {isWebpOnly && (
              <label>
                Resize (optional)
                <select><option>Don't resize</option><option>Resize by width</option><option>Resize by percentage</option></select>
              </label>
            )}
            <div className="convert-options">
              <strong>Options</strong>
              <label><input type="checkbox" defaultChecked /> Remove metadata (EXIF)</label>
              <label><input type="checkbox" defaultChecked /> Optimize for Web</label>
              <label><input type="checkbox" defaultChecked /> {isWebpOnly ? 'Lossy (smaller size)' : 'Keep original dimensions'}</label>
            </div>
          </aside>

          <div className="convert-bottom-bar">
            <button className="secondary" type="button" onClick={clearConvertFiles}><HomeIcon name="rotate" /> Reset</button>
            <span className="privacy-note"><HomeIcon name="sparkle" /> Tip: {isWebpOnly ? 'WebP images are perfect for websites and can significantly improve page load speed.' : 'Converting to WebP can significantly reduce file size while maintaining quality.'}</span>
            {!isWebpOnly && previewUrl && <a className="secondary" href={previewUrl} download={files[0]?.name ?? 'original-image'}><HomeIcon name="download" /> Download Original</a>}
            {processed ? (
              <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> {isWebpOnly ? 'Download WebP' : 'Download Images'}</a>
            ) : (
              <button className="primary" type="submit"><HomeIcon name="download" /> {isWebpOnly ? 'Convert to WebP' : 'Convert Images'}</button>
            )}
          </div>
          {error && <p className="error">{error}</p>}
          {status && <p className="status">{status}</p>}
        </form>
      </div>
    )
  }

  if (tool.slug === 'batch-compress') {
    return (
      <div className="workspace compress-workspace batch-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle"><HomeIcon name="stack" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="lock" /> Your images stay private</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="smile" /> Always free. No limits.</span>
            </div>
          </section>
          <UploadDropzone multiple onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h2><HomeIcon name="sparkle" /> Tips for better compression</h2>
            <p>✓ JPG is best for photos and complex images</p>
            <p>✓ PNG is best for graphics and transparency</p>
            <p>✓ Lower quality = smaller file size</p>
            <p>✓ Preview before you download</p>
          </aside>
        </div>
        <form className="batch-layout" onSubmit={process}>
          <section className="batch-table-card">
            <div className="batch-toolbar">
              <div className="batch-tabs">
                <button className="active" type="button">All Images ({files.length})</button>
                <button type="button">Completed ({batch.length})</button>
              </div>
              <div className="batch-actions">
                <label className="secondary add-more-button">
                  <HomeIcon name="upload" /> Add more
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => handleFiles([...files, ...Array.from(event.target.files ?? [])])}
                  />
                </label>
                <button className="secondary" type="button" onClick={resetTool}><HomeIcon name="trash" /> Remove all</button>
              </div>
              <div className="batch-settings-inline">
                <label>
                  Output format
                  <select value={settings.format} onChange={(event) => setSettings((value) => ({ ...value, format: event.target.value as OutputFormat }))}>
                    {Object.entries(formatLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
                <label>
                  Quality {Math.round(settings.quality * 100)}%
                  <input min="0.35" max="1" step="0.01" type="range" value={settings.quality} onChange={(event) => setSettings((value) => ({ ...value, quality: Number(event.target.value) }))} />
                </label>
              </div>
            </div>
            <div className="batch-table">
              <div className="batch-row batch-head">
                <span></span>
                <span>Image</span>
                <span>Original</span>
                <span>Settings</span>
                <span>Compressed</span>
                <span>Status</span>
                <span>Action</span>
              </div>
              {files.length ? files.map((file, index) => {
                const result = batch[index]
                const saved = result ? Math.max(0, file.size - result.size) : 0
                const savedPercent = result && saved > 0 ? Math.round((saved / file.size) * 100) : 0
                return (
                  <div className="batch-row" key={`${file.name}-${index}`}>
                    <span><input type="checkbox" defaultChecked /></span>
                    <span className="batch-file">
                      <span className="batch-thumb"><HomeIcon name="image" /></span>
                      <span><strong>{file.name}</strong><small>{file.type.replace('image/', '').toUpperCase() || 'IMAGE'}</small></span>
                    </span>
                    <span>{formatSize(file.size)}</span>
                    <span>{formatLabels[settings.format]} · {Math.round(settings.quality * 100)}%</span>
                    <span>{result ? <><strong>{formatSize(result.size)}</strong> <em>-{savedPercent}%</em></> : '-'}</span>
                    <span className={result ? 'ready-status' : ''}>{result ? 'Ready' : 'Pending'}</span>
                    <span className="batch-row-actions"><HomeIcon name="info" /><HomeIcon name="trash" /></span>
                  </div>
                )
              }) : (
                <div className="batch-empty">Upload images to build a compression batch.</div>
              )}
            </div>
            <div className="batch-table-footer">
              <label><input type="checkbox" defaultChecked /> Select all</label>
              <span>Total original size: {formatSize(totalOriginalSize)}</span>
              <span>Total compressed size: {totalCompressedSize ? formatSize(totalCompressedSize) : '-'}</span>
              <strong>{totalBatchSaved ? `You'll save ${formatSize(totalBatchSaved)} (${totalBatchSavedPercent}%)` : 'Run compression to calculate savings'}</strong>
            </div>
            {error && <p className="error">{error}</p>}
            <p className="privacy-note batch-privacy"><HomeIcon name="lock" /> Your images are processed in your browser. We never upload them to our servers.</p>
          </section>
          <aside className="batch-summary-card">
            <h2><HomeIcon name="trend" /> Compression summary</h2>
            <div className="summary-list">
              <span>Total images <strong>{files.length}</strong></span>
              <span>Total original size <strong>{formatSize(totalOriginalSize)}</strong></span>
              <span>Total compressed size <strong>{totalCompressedSize ? formatSize(totalCompressedSize) : '-'}</strong></span>
              <span>Space saved <strong>{totalBatchSaved ? `${formatSize(totalBatchSaved)} (${totalBatchSavedPercent}%)` : '-'}</strong></span>
            </div>
            <div className="summary-ring" style={{ '--progress': `${totalBatchSavedPercent || 0}%` } as CSSProperties}>
              <strong>{totalBatchSavedPercent || 0}%</strong>
            </div>
            {processed ? (
              <a className="download-button full" href={processed.url} download={processed.name}>
                <HomeIcon name="download" /> Download All (ZIP)
              </a>
            ) : (
              <button className="primary full" type="submit"><HomeIcon name="download" /> Compress & Download ZIP</button>
            )}
            <button className="secondary full" type="button" onClick={resetTool}><HomeIcon name="rotate" /> Reset</button>
            <p>All images will be downloaded as a ZIP file.</p>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'pixelate-image') {
    const pixelZoom = rotateZoom
    const pixelScale = pixelZoom / 100
    const selectionStyle = {
      left: `${settings.width ? ((settings.cropX + settings.cropWidth / 2) / settings.width) * 100 : 32}%`,
      top: `${settings.height ? ((settings.cropY + settings.cropHeight / 2) / settings.height) * 100 : 58}%`,
      width: `${settings.width ? (settings.cropWidth / settings.width) * 100 : 22}%`,
      height: `${settings.height ? (settings.cropHeight / settings.height) * 100 : 22}%`,
      transform: `translate(-50%, -50%) scale(${pixelScale})`,
    } as CSSProperties
    const updatePixelSelection = (patch: Partial<Pick<ToolSettingsState, 'cropX' | 'cropY' | 'cropWidth' | 'cropHeight' | 'pixelSize'>>) => {
      clearOutputs()
      setSettings((current) => ({ ...current, ...patch }))
    }
    const resetPixelateSettings = () => {
      clearOutputs()
      setRotateZoom(100)
      setPixelateMode('brush')
      setPixelateAreas([])
      const size = Math.round(Math.min(settings.width || 320, settings.height || 320) * 0.23)
      setSettings((current) => ({
        ...current,
        cropX: Math.round((current.width || 320) * 0.18),
        cropY: Math.round((current.height || 320) * 0.48),
        cropWidth: size,
        cropHeight: size,
        pixelSize: 25,
      }))
    }
    const clearPixelSelection = (recordHistory = true) => {
      clearOutputs()
      setPixelateAreas([])
      setSettings((current) => ({ ...current, cropWidth: 0, cropHeight: 0 }))
      if (recordHistory) setPixelateHistory((history) => ['Selection cleared', ...history.filter((item) => item !== 'Selection cleared')].slice(0, 5))
    }
    const pixelPatchForPointer = (event: PointerEvent | ReactPointerEvent<HTMLElement>, rect: DOMRect) => {
      if (!settings.width || !settings.height) return null
      const size = settings.cropWidth || Math.round(Math.min(settings.width, settings.height) * 0.23)
      const centerX = ((event.clientX - rect.left) / rect.width) * settings.width
      const centerY = ((event.clientY - rect.top) / rect.height) * settings.height
      return {
        cropWidth: size,
        cropHeight: size,
        cropX: Math.round(clamp(centerX - size / 2, 0, Math.max(0, settings.width - size))),
        cropY: Math.round(clamp(centerY - size / 2, 0, Math.max(0, settings.height - size))),
      }
    }
    const processPixelateSettings = async (nextSettings: ToolSettingsState, area?: CropArea) => {
      if (!files.length) return
      setError('')
      setStatus(t.tool.processingBrowser)
      try {
        const nextAreas = area
          ? [...pixelateAreas, area]
          : pixelateAreas.length
            ? pixelateAreas
            : nextSettings.cropWidth && nextSettings.cropHeight
              ? [{ id: Date.now(), x: nextSettings.cropX, y: nextSettings.cropY, width: nextSettings.cropWidth, height: nextSettings.cropHeight }]
              : []
        setPixelateAreas(nextAreas)
        setProcessed(await processImage(files[0], tool.slug, { ...nextSettings, pixelateAreas: nextAreas }))
        setStatus('Done. Your result is ready to download.')
        setPixelateHistory((history) => ['Pixelate area', ...history].slice(0, 5))
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Something went wrong while processing this image.')
        setStatus('')
      }
    }
    const erasePixelAreaAtPointer = async (event: PointerEvent | ReactPointerEvent<HTMLElement>, rect: DOMRect) => {
      if (!settings.width || !settings.height) return
      const pointX = ((event.clientX - rect.left) / rect.width) * settings.width
      const pointY = ((event.clientY - rect.top) / rect.height) * settings.height
      const brushSize = settings.cropWidth || Math.round(Math.min(settings.width, settings.height) * 0.23)
      const eraseRadius = brushSize / 2
      const nextAreas = pixelateAreas.filter((area) => {
        const areaCenterX = area.x + area.width / 2
        const areaCenterY = area.y + area.height / 2
        const areaRadius = Math.max(area.width, area.height) / 2
        const distance = Math.hypot(areaCenterX - pointX, areaCenterY - pointY)
        return distance > areaRadius + eraseRadius
      })
      if (!pixelateAreas.length && settings.cropWidth && settings.cropHeight) {
        clearPixelSelection(false)
        setPixelateHistory((history) => ['Selection erased', ...history.filter((item) => item !== 'Selection erased')].slice(0, 5))
        return
      }
      if (!files.length || nextAreas.length === pixelateAreas.length) return
      clearOutputs()
      setPixelateAreas(nextAreas)
      setPixelateHistory((history) => ['Selection erased', ...history.filter((item) => item !== 'Selection erased')].slice(0, 5))
      if (!nextAreas.length) {
        setProcessed(null)
        setStatus('')
        return
      }
      setStatus(t.tool.processingBrowser)
      try {
        setProcessed(await processImage(files[0], tool.slug, { ...settings, pixelateAreas: nextAreas }))
        setStatus('Done. Your result is ready to download.')
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Something went wrong while processing this image.')
        setStatus('')
      }
    }
    const movePixelSelectionToPointer = (event: PointerEvent | ReactPointerEvent<HTMLElement>, rect: DOMRect) => {
      if (pixelateMode === 'eraser') {
        return null
      }
      const patch = pixelPatchForPointer(event, rect)
      if (!patch) return null
      updatePixelSelection(patch)
      return { ...settings, ...patch }
    }
    const handlePixelStagePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
      const stage = event.currentTarget as HTMLElement
      if (!settings.width || !settings.height) return
      event.preventDefault()
      clearOutputs()
      const rect = stage.getBoundingClientRect()
      if (pixelateMode === 'eraser') {
        void erasePixelAreaAtPointer(event, rect)
        return
      }
      let latestSettings = movePixelSelectionToPointer(event, rect)
      const moveSelection = (moveEvent: PointerEvent) => {
        latestSettings = movePixelSelectionToPointer(moveEvent, rect)
      }
      const stopMove = () => {
        window.removeEventListener('pointermove', moveSelection)
        window.removeEventListener('pointerup', stopMove)
        if (latestSettings) {
          void processPixelateSettings(latestSettings, {
            id: Date.now(),
            x: latestSettings.cropX,
            y: latestSettings.cropY,
            width: latestSettings.cropWidth,
            height: latestSettings.cropHeight,
          })
        }
      }
      window.addEventListener('pointermove', moveSelection)
      window.addEventListener('pointerup', stopMove)
    }
    const setBrushSize = (size: number) => {
      updatePixelSelection({
        cropWidth: size,
        cropHeight: size,
        cropX: clamp(settings.cropX, 0, Math.max(0, settings.width - size)),
        cropY: clamp(settings.cropY, 0, Math.max(0, settings.height - size)),
      })
    }
    const handlePixelSelectionPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
      const stage = event.currentTarget.closest('.pixelate-stage') as HTMLElement | null
      if (!stage || !settings.width || !settings.height) return
      event.preventDefault()
      event.stopPropagation()
      clearOutputs()
      if (pixelateMode === 'eraser') {
        const rect = stage.getBoundingClientRect()
        void erasePixelAreaAtPointer(event, rect)
        return
      }
      const rect = stage.getBoundingClientRect()
      const startX = event.clientX
      const startY = event.clientY
      const startCropX = settings.cropX
      const startCropY = settings.cropY

      let latestSettings: ToolSettingsState = settings
      const moveSelection = (moveEvent: PointerEvent) => {
        const deltaX = ((moveEvent.clientX - startX) / rect.width) * settings.width
        const deltaY = ((moveEvent.clientY - startY) / rect.height) * settings.height
        const patch = {
          cropX: Math.round(clamp(startCropX + deltaX, 0, Math.max(0, settings.width - settings.cropWidth))),
          cropY: Math.round(clamp(startCropY + deltaY, 0, Math.max(0, settings.height - settings.cropHeight))),
        }
        latestSettings = { ...settings, ...patch }
        updatePixelSelection(patch)
      }
      const stopMove = () => {
        window.removeEventListener('pointermove', moveSelection)
        window.removeEventListener('pointerup', stopMove)
        void processPixelateSettings(latestSettings, {
          id: Date.now(),
          x: latestSettings.cropX,
          y: latestSettings.cropY,
          width: latestSettings.cropWidth,
          height: latestSettings.cropHeight,
        })
      }
      window.addEventListener('pointermove', moveSelection)
      window.addEventListener('pointerup', stopMove)
    }
    const submitPixelate = (event: FormEvent) => {
      event.preventDefault()
      void processPixelateSettings(settings, settings.cropWidth && settings.cropHeight
        ? { id: Date.now(), x: settings.cropX, y: settings.cropY, width: settings.cropWidth, height: settings.cropHeight }
        : undefined)
    }

    return (
      <div className="workspace pixelate-workspace">
        <div className="pixelate-top-grid">
          <section className="pixelate-title-card">
            <Breadcrumbs current={tool.name} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="dots" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> 100% free</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="shield" /> Your images stay private</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="pixelate-help-card">
            <h2>💡 Quick Help</h2>
            <p>✓ Use the brush to select the area.</p>
            <p>✓ Adjust pixel size for stronger blur.</p>
            <p>✓ Use clear selection to reset the area.</p>
            <p>✓ Download your edited image.</p>
          </aside>
        </div>

        <form className="pixelate-layout" onSubmit={submitPixelate}>
          <aside className="settings-panel pixelate-settings-panel">
            <section>
              <div className="pixelate-section-heading"><strong>Select Area</strong><span>?</span></div>
              <div className="pixelate-tool-toggle">
                <button className={pixelateMode === 'brush' ? 'active' : ''} type="button" onClick={() => setPixelateMode('brush')}><HomeIcon name="dots" /> Brush</button>
                <button className={pixelateMode === 'eraser' ? 'active' : ''} type="button" onClick={() => setPixelateMode('eraser')}>⌫ Eraser</button>
              </div>
              <label>Brush Size <span>{settings.cropWidth || 80}px</span><input min="40" max="420" type="range" value={settings.cropWidth || 80} onChange={(event) => setBrushSize(Number(event.target.value))} /></label>
              <label>Hardness <span>50%</span><input min="0" max="100" type="range" value={50} readOnly /></label>
              <div className="pixelate-action-row">
                <button className="primary" type="submit">Pixelate Area</button>
                <button className="secondary" type="button" onClick={() => clearPixelSelection()}>Clear Selection</button>
              </div>
            </section>
            <section>
              <h2>Pixelate Settings</h2>
              <label>Pixel Size <span>{settings.pixelSize}px</span><input min="10" max="80" type="range" value={settings.pixelSize} onChange={(event) => updatePixelSelection({ pixelSize: Number(event.target.value) })} /></label>
              <label>Pixelate Strength <span>100%</span><input min="30" max="100" type="range" value={100} readOnly /></label>
            </section>
            <button className="secondary full" type="button" onClick={resetPixelateSettings}><HomeIcon name="rotate" /> Reset</button>
          </aside>

          <section className="pixelate-editor-card">
            <div className="pixelate-toolbar">
              <div><span>Zoom</span><button type="button" onClick={() => setRotateZoom((value) => clamp(value - 10, 50, 200))}>−</button><strong>{pixelZoom}%</strong><button type="button" onClick={() => setRotateZoom((value) => clamp(value + 10, 50, 200))}>+</button><button type="button" onClick={() => setRotateZoom(100)}>Fit</button></div>
              <div><button type="button" onClick={resetPixelateSettings}><HomeIcon name="rotate" /> Reset</button></div>
            </div>
            {previewUrl ? (
              <div className={`pixelate-stage ${pixelateMode === 'eraser' ? 'eraser-mode' : ''}`} onPointerDown={handlePixelStagePointerDown}>
                <img src={processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl} alt="Pixelate preview" style={{ transform: `scale(${pixelScale})` }} />
                {!processed && settings.cropWidth > 0 && settings.cropHeight > 0 && <button className={`pixelate-selection ${pixelateMode === 'eraser' ? 'eraser' : ''}`} type="button" style={selectionStyle} onPointerDown={handlePixelSelectionPointerDown}></button>}
                {!processed && <div className="pixelate-tip"><span>💡</span> Tip: Use the brush to select the area you want to pixelate.<button type="button">×</button></div>}
              </div>
            ) : (
              <div className="empty-preview pixelate-empty">Upload an image to start pixelating.</div>
            )}
            <div className="add-text-meta">
              <span>Original: {settings.width || 1920} × {settings.height || 1280}</span>
              <span>Current: {settings.width || 1920} × {settings.height || 1280}</span>
            </div>
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <div className="pixelate-bottom-bar">
              <span className="privacy-note"><HomeIcon name="lock" /> All processing is done in your browser. Your images never leave your device.</span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> Download Image</button>
              )}
            </div>
          </section>

          <aside className="pixelate-side-card">
            <section>
              <h2>Presets</h2>
              <div className="pixelate-preset-grid">
                {[['Light', 10], ['Medium', 20], ['Strong', 40], ['Extreme', 80]].map(([label, size]) => (
                  <button className={settings.pixelSize === size ? 'active' : ''} key={label} type="button" onClick={() => updatePixelSelection({ pixelSize: Number(size) })}>
                    <span></span><strong>{label}</strong><small>({size}px)</small>
                  </button>
                ))}
              </div>
            </section>
            <section>
              <div className="areas-heading"><h2>Recent Edits</h2><button type="button" onClick={() => setPixelateHistory(['Original'])}>Clear</button></div>
              {pixelateHistory.map((item, index) => (
                <div className="history-item" key={`${item}-${index}`}>
                  <span>{item === 'Original' ? <HomeIcon name="image" /> : '▦'}</span>
                  <div><strong>{item}</strong><small>{index === 0 ? 'Just now' : `${index + 1} minutes ago`}</small></div>
                  <button type="button">⋮</button>
                </div>
              ))}
            </section>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'blur-image') {
    const blurZoom = rotateZoom
    const blurScale = blurZoom / 100
    const currentBlurBrushSize = settings.cropWidth || defaultBlurBrushSize(settings.width, settings.height)
    const maxBlurBrushSize = Math.max(80, Math.min(320, Math.round(Math.min(settings.width || 320, settings.height || 320) * 0.45)))
    const selectionStyle = {
      left: `${settings.width ? ((settings.cropX + settings.cropWidth / 2) / settings.width) * 100 : 68}%`,
      top: `${settings.height ? ((settings.cropY + settings.cropHeight / 2) / settings.height) * 100 : 62}%`,
      width: `${settings.width ? (settings.cropWidth / settings.width) * 100 : 22}%`,
      height: `${settings.height ? (settings.cropHeight / settings.height) * 100 : 22}%`,
      transform: `translate(-50%, -50%) scale(${blurScale})`,
    } as CSSProperties
    const blurAreaStyle = (area: CropArea) => ({
      left: `${settings.width ? ((area.x + area.width / 2) / settings.width) * 100 : 0}%`,
      top: `${settings.height ? ((area.y + area.height / 2) / settings.height) * 100 : 0}%`,
      width: `${settings.width ? (area.width / settings.width) * 100 : 0}%`,
      height: `${settings.height ? (area.height / settings.height) * 100 : 0}%`,
      transform: `translate(-50%, -50%) scale(${blurScale})`,
    }) as CSSProperties
    const updateBlurSelection = (patch: Partial<Pick<ToolSettingsState, 'cropX' | 'cropY' | 'cropWidth' | 'cropHeight' | 'blur'>>) => {
      clearOutputs()
      setSettings((current) => ({ ...current, ...patch }))
    }
    const resetBlurSettings = () => {
      clearOutputs()
      setRotateZoom(100)
      setBlurMode('brush')
      setBlurAreas([])
      const size = defaultBlurBrushSize(settings.width, settings.height)
      setSettings((current) => ({
        ...current,
        cropX: Math.round((current.width || 320) * 0.62),
        cropY: Math.round((current.height || 320) * 0.56),
        cropWidth: size,
        cropHeight: size,
        blur: 12,
      }))
    }
    const clearBlurSelection = () => {
      clearOutputs()
      setBlurAreas([])
      setSettings((current) => ({ ...current, cropWidth: 0, cropHeight: 0 }))
      setBlurHistory((history) => ['Selection cleared', ...history.filter((item) => item !== 'Selection cleared')].slice(0, 5))
    }
    const blurPatchForPointer = (event: PointerEvent | ReactPointerEvent<HTMLElement>, rect: DOMRect) => {
      if (!settings.width || !settings.height) return null
      const size = currentBlurBrushSize
      const centerX = ((event.clientX - rect.left) / rect.width) * settings.width
      const centerY = ((event.clientY - rect.top) / rect.height) * settings.height
      return {
        cropWidth: size,
        cropHeight: size,
        cropX: Math.round(clamp(centerX - size / 2, 0, Math.max(0, settings.width - size))),
        cropY: Math.round(clamp(centerY - size / 2, 0, Math.max(0, settings.height - size))),
      }
    }
    const blurAreaFromPatch = (patch: Pick<ToolSettingsState, 'cropX' | 'cropY' | 'cropWidth' | 'cropHeight'>) => ({
      id: Date.now() + Math.round(patch.cropX + patch.cropY),
      x: patch.cropX,
      y: patch.cropY,
      width: patch.cropWidth,
      height: patch.cropHeight,
    })
    const areasIntersect = (left: CropArea, right: CropArea) => {
      const leftCenterX = left.x + left.width / 2
      const leftCenterY = left.y + left.height / 2
      const rightCenterX = right.x + right.width / 2
      const rightCenterY = right.y + right.height / 2
      const distance = Math.hypot(leftCenterX - rightCenterX, leftCenterY - rightCenterY)
      return distance < (left.width + right.width) / 2
    }
    const processBlurSettings = async (nextSettings: ToolSettingsState, nextBlurAreas?: CropArea[]) => {
      if (!files.length) return
      setError('')
      setStatus(t.tool.processingBrowser)
      try {
        const nextAreas = nextBlurAreas ?? (blurAreas.length
          ? blurAreas
          : nextSettings.cropWidth && nextSettings.cropHeight
            ? [{ id: Date.now(), x: nextSettings.cropX, y: nextSettings.cropY, width: nextSettings.cropWidth, height: nextSettings.cropHeight }]
            : [])
        setBlurAreas(nextAreas)
        setProcessed(await processImage(files[0], tool.slug, { ...nextSettings, blurAreas: nextAreas }))
        setStatus('Done. Your result is ready to download.')
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Something went wrong while processing this image.')
        setStatus('')
      }
    }
    const moveBlurSelectionToPointer = (event: PointerEvent | ReactPointerEvent<HTMLElement>, rect: DOMRect) => {
      const patch = blurPatchForPointer(event, rect)
      if (!patch) return null
      updateBlurSelection(patch)
      return { ...settings, ...patch }
    }
    const handleBlurStagePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
      const stage = event.currentTarget as HTMLElement
      if (!settings.width || !settings.height) return
      event.preventDefault()
      clearOutputs()
      const rect = stage.getBoundingClientRect()
      let latestSettings = moveBlurSelectionToPointer(event, rect)
      let workingAreas = blurAreas
      const updateAreasForPointer = (nextSettings: ToolSettingsState | null) => {
        if (!nextSettings) return
        const pointerArea = blurAreaFromPatch(nextSettings)
        if (blurMode === 'eraser') {
          workingAreas = workingAreas.filter((area) => !areasIntersect(area, pointerArea))
        } else {
          const lastArea = workingAreas.at(-1)
          if (!lastArea || Math.hypot(lastArea.x - pointerArea.x, lastArea.y - pointerArea.y) > pointerArea.width * 0.35) {
            workingAreas = [...workingAreas, pointerArea]
          }
        }
        setBlurAreas(workingAreas)
      }
      updateAreasForPointer(latestSettings)
      const moveSelection = (moveEvent: PointerEvent) => {
        latestSettings = moveBlurSelectionToPointer(moveEvent, rect)
        updateAreasForPointer(latestSettings)
      }
      const stopMove = () => {
        window.removeEventListener('pointermove', moveSelection)
        window.removeEventListener('pointerup', stopMove)
        if (latestSettings) {
          setBlurHistory((history) => [blurMode === 'eraser' ? 'Area erased' : 'Blur applied', ...history].slice(0, 5))
          void processBlurSettings(latestSettings, workingAreas)
        }
      }
      window.addEventListener('pointermove', moveSelection)
      window.addEventListener('pointerup', stopMove)
    }
    const setBlurBrushSize = (size: number) => {
      updateBlurSelection({
        cropWidth: size,
        cropHeight: size,
        cropX: clamp(settings.cropX, 0, Math.max(0, settings.width - size)),
        cropY: clamp(settings.cropY, 0, Math.max(0, settings.height - size)),
      })
    }
    const submitBlur = (event: FormEvent) => {
      event.preventDefault()
      void processBlurSettings(settings)
    }
    const undoLastBlurAction = () => {
      if (!blurAreas.length) return
      const nextAreas = blurAreas.slice(0, -1)
      setBlurAreas(nextAreas)
      setBlurHistory((history) => ['Undo last blur', ...history].slice(0, 5))
      void processBlurSettings(settings, nextAreas)
    }
    const clearAllBlurActions = () => {
      clearOutputs()
      setBlurAreas([])
      setBlurHistory(['Original'])
    }

    return (
      <div className="workspace blur-workspace pixelate-workspace">
        <div className="pixelate-top-grid">
          <section className="pixelate-title-card">
            <Breadcrumbs current={tool.name} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="sun" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> 100% free</span>
              <span><HomeIcon name="lock" /> No signup required</span>
              <span><HomeIcon name="shield" /> Your images stay private</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="pixelate-help-card">
            <h2>💡 Quick Help</h2>
            <p>✓ Use the brush to paint the area to blur.</p>
            <p>✓ Adjust blur strength for more or less blur.</p>
            <p>✓ Use eraser to remove parts from selection.</p>
            <p>✓ Download your edited image.</p>
          </aside>
        </div>

        <form className="pixelate-layout" onSubmit={submitBlur}>
          <aside className="settings-panel pixelate-settings-panel">
            <section>
              <div className="pixelate-section-heading"><strong>Select Area</strong><span>?</span></div>
              <div className="pixelate-tool-toggle">
                <button className={blurMode === 'brush' ? 'active' : ''} type="button" onClick={() => setBlurMode('brush')}><HomeIcon name="sun" /> Brush</button>
                <button className={blurMode === 'eraser' ? 'active' : ''} type="button" onClick={() => setBlurMode('eraser')}>⌫ Eraser</button>
              </div>
              <label>Brush Size <span>{currentBlurBrushSize}px</span><input min="40" max={maxBlurBrushSize} type="range" value={currentBlurBrushSize} onChange={(event) => setBlurBrushSize(Number(event.target.value))} /></label>
              <label>Hardness <span>50%</span><input min="0" max="100" type="range" value={50} readOnly /></label>
              <div className="pixelate-action-row">
                <button className="primary" type="submit">Blur Area</button>
                <button className="secondary" type="button" onClick={clearBlurSelection}>Clear Selection</button>
              </div>
            </section>
            <section>
              <h2>Blur Settings</h2>
              <label>Blur Strength <span>{Math.round((settings.blur / 30) * 100)}%</span><input min="1" max="30" type="range" value={settings.blur} onChange={(event) => updateBlurSelection({ blur: Number(event.target.value) })} /></label>
              <label>Blur Type<select><option>Gaussian Blur</option><option>Soft Blur</option><option>Background Blur</option></select></label>
            </section>
            <button className="secondary full" type="button" onClick={resetBlurSettings}><HomeIcon name="rotate" /> Reset</button>
          </aside>

          <section className="pixelate-editor-card">
            <div className="pixelate-toolbar">
              <div><span>Zoom</span><button type="button" onClick={() => setRotateZoom((value) => clamp(value - 10, 50, 200))}>−</button><strong>{blurZoom}%</strong><button type="button" onClick={() => setRotateZoom((value) => clamp(value + 10, 50, 200))}>+</button><button type="button" onClick={() => setRotateZoom(100)}>Fit</button></div>
              <div><button type="button" onClick={resetBlurSettings}><HomeIcon name="rotate" /> Reset</button></div>
            </div>
            {previewUrl ? (
              <div className={`pixelate-stage blur-stage ${blurMode === 'eraser' ? 'eraser-mode' : ''}`} onPointerDown={handleBlurStagePointerDown}>
                <img src={processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl} alt="Blur preview" style={{ transform: `scale(${blurScale})` }} />
                {blurAreas.map((area) => <span className="pixelate-selection blur-selection committed" key={area.id} style={blurAreaStyle(area)}></span>)}
                {settings.cropWidth > 0 && settings.cropHeight > 0 && <button className={`pixelate-selection blur-selection ${blurMode === 'eraser' ? 'eraser' : ''}`} type="button" style={selectionStyle}></button>}
                <div className="pixelate-tip"><span>💡</span> Tip: Use the brush to select the area you want to blur.<button type="button">×</button></div>
              </div>
            ) : (
              <div className="empty-preview pixelate-empty">Upload an image to start blurring.</div>
            )}
            <div className="add-text-meta">
              <span>Original: {settings.width || 1920} × {settings.height || 1280}</span>
              <span>Current: {settings.width || 1920} × {settings.height || 1280}</span>
            </div>
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <div className="pixelate-bottom-bar">
              <span className="privacy-note"><HomeIcon name="lock" /> Your image is processed in your browser. It never leaves your device.</span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> Download Image</button>
              )}
            </div>
          </section>

          <aside className="pixelate-side-card">
            <section>
              <div className="areas-heading"><h2>History</h2><button type="button" disabled={!blurAreas.length} onClick={undoLastBlurAction}>Undo</button><button type="button" onClick={clearAllBlurActions}>Clear</button></div>
              {blurHistory.map((item, index) => (
                <div className="history-item" key={`${item}-${index}`}>
                  <span>{item === 'Original' ? <HomeIcon name="image" /> : 'Tt'}</span>
                  <div><strong>{item}</strong><small>{index === 0 ? 'Just now' : `${index + 1} minutes ago`}</small></div>
                  <button type="button" disabled={!blurAreas.length} onClick={undoLastBlurAction}>Undo</button>
                </div>
              ))}
            </section>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'remove-exif') {
    const metadataEntries = metadata ? Object.entries(metadata).filter(([, value]) => value !== undefined && value !== null) : []
    const gpsValue = metadataEntries.find(([key]) => key.toLowerCase().includes('latitude') || key.toLowerCase().includes('longitude'))
    const cameraValue = metadataEntries.find(([key]) => ['make', 'model', 'lensmodel'].includes(key.toLowerCase()))
    const dateValue = metadataEntries.find(([key]) => key.toLowerCase().includes('date'))
    const isoValue = metadataEntries.find(([key]) => key.toLowerCase() === 'iso')
    const originalSize = files[0]?.size ?? 0
    const afterSize = processed?.size ?? originalSize
    const savedBytes = Math.max(0, originalSize - afterSize)
    const savedPercent = originalSize ? Math.round((savedBytes / originalSize) * 1000) / 10 : 0
    const exifSummary = [
      ['Camera', cameraValue ? String(cameraValue[1]) : 'Not found'],
      ['Date', dateValue ? String(dateValue[1]).slice(0, 24) : 'Not found'],
      ['Location', gpsValue ? 'GPS data detected' : 'Not found'],
      ['ISO', isoValue ? String(isoValue[1]) : 'Not found'],
    ]

    return (
      <div className="workspace remove-exif-workspace">
        <div className="remove-exif-top-grid">
          <section className="remove-exif-title-card">
            <Breadcrumbs current={tool.name} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="info" /></span>
            <h1>{tool.name}</h1>
            <p>{tool.subtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="shield" /> Protect your privacy</span>
              <span><HomeIcon name="search" /> Remove location & device info</span>
              <span><HomeIcon name="lock" /> 100% free. No signup required</span>
              <span><HomeIcon name="device" /> Processed in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="remove-exif-help-card">
            <h2>✨ What is EXIF?</h2>
            <p>EXIF metadata may contain private image details such as:</p>
            <ul>
              <li><HomeIcon name="search" /> Location (GPS)</li>
              <li><HomeIcon name="image" /> Camera & lens info</li>
              <li><HomeIcon name="file" /> Date & time</li>
              <li><HomeIcon name="device" /> Device settings</li>
            </ul>
            <strong><HomeIcon name="shield" /> Remove EXIF to protect your privacy.</strong>
          </aside>
        </div>

        <form className="remove-exif-layout" onSubmit={process}>
          <aside className="settings-panel remove-exif-options-card">
            <h2>Options</h2>
            <span className="field-title">Remove</span>
            <label className="toggle-row metadata-toggle">
              <input type="radio" name="remove-exif-mode" checked={removeExifMode === 'all'} onChange={() => setRemoveExifMode('all')} />
              All EXIF metadata
              <small>Recommended</small>
            </label>
            <label className="toggle-row metadata-toggle">
              <input type="radio" name="remove-exif-mode" checked={removeExifMode === 'location'} onChange={() => setRemoveExifMode('location')} />
              Location information only
            </label>
            {removeExifMode === 'location' && (
              <p className="remove-exif-mode-note">Browser processing will remove all metadata to ensure GPS data is fully cleared.</p>
            )}
            <span className="field-title">Output format</span>
            <select value={settings.format} onChange={(event) => setSettings((value) => ({ ...value, format: event.target.value as OutputFormat }))}>
              <option value="image/jpeg">Keep original format</option>
              <option value="image/jpeg">JPG</option>
              <option value="image/png">PNG</option>
              <option value="image/webp">WebP</option>
            </select>
            <button className="primary full" type="submit"><HomeIcon name="sparkle" /> Remove EXIF</button>
            <button className="secondary full" type="button" onClick={resetTool}>Reset</button>
          </aside>

          <section className="remove-exif-preview-card">
            <div className="preview-heading">
              <h2>Preview</h2>
              <button className="compare-button" type="button"><HomeIcon name="convert" /> Compare</button>
            </div>
            {previewUrl ? (
              <div className="remove-exif-compare">
                <figure>
                  <figcaption><strong>Original</strong><span>{files[0]?.name}</span></figcaption>
                  <img src={previewUrl} alt="Original with EXIF" />
                  <div className="exif-overlay">
                    <strong>EXIF Info</strong>
                    {exifSummary.map(([label, value]) => <span key={label}>{label}: {value}</span>)}
                    {gpsValue && <em>⚠ Contains GPS location</em>}
                  </div>
                </figure>
                <div className="remove-exif-arrow">→</div>
                <figure>
                  <figcaption><strong>Without EXIF</strong><span>{processed?.name ?? `${fileNameWithoutExtension(files[0]?.name ?? 'image')}_noexif.jpg`}</span></figcaption>
                  <img src={processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl} alt="Without EXIF preview" />
                  <div className="no-exif-overlay"><strong>✓ No EXIF metadata</strong><span>All metadata has been removed.</span></div>
                </figure>
              </div>
            ) : (
              <div className="empty-preview remove-exif-empty">Upload an image to preview EXIF metadata.</div>
            )}
            {metadata && (
              <div className="remove-exif-success">
                ✓ EXIF metadata will be completely removed from your image.
              </div>
            )}
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
          </section>

          <aside className="remove-exif-summary-card">
            <h2>Summary</h2>
            <dl>
              <div><dt>Original file</dt><dd>{files[0]?.name ?? '-'}</dd></div>
              <div><dt>Original size</dt><dd>{originalSize ? formatSize(originalSize) : '-'}</dd></div>
              <div><dt>After removing EXIF</dt><dd>{processed ? formatSize(afterSize) : '-'}</dd></div>
              <div><dt>Size saved</dt><dd className="green-text">{processed ? `${formatSize(savedBytes)} (${savedPercent}%)` : '-'}</dd></div>
            </dl>
            <div className="ready-badge"><span>✓</span><strong>{processed ? 'Ready to download' : 'Ready after processing'}</strong></div>
            {processed ? (
              <a className="download-button full" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a>
            ) : (
              <button className="primary full" type="submit"><HomeIcon name="download" /> Download Image</button>
            )}
          </aside>
        </form>

        <p className="remove-exif-privacy-note"><HomeIcon name="lock" /> Your image is processed in your browser. We never upload your files to our servers.</p>
      </div>
    )
  }

  return (
    <div className="workspace compress-workspace">
      <div className="compress-top">
        <section className="compress-title-card">
          <span className="title-doodle"><HomeIcon name={toolIconMap[tool.slug] ?? 'sparkle'} /></span>
          <h1>{tool.name}</h1>
          <p>{tool.subtitle}</p>
          <div className="privacy-card">
            <span><HomeIcon name="lock" /> Your images stay private</span>
            <span><HomeIcon name="lock" /> No signup required</span>
            <span><HomeIcon name="smile" /> Always free. No limits.</span>
          </div>
        </section>
        <UploadDropzone multiple={isBatchUpload} onFiles={handleFiles} />
        <aside className="compress-tips-card">
          <h2><HomeIcon name="sparkle" /> Tips for this tool</h2>
          {tool.tips.map((tip) => <p key={tip}>✓ {tip}</p>)}
        </aside>
      </div>
      <form className="tool-panels compress-tool-panels" onSubmit={process}>
        <aside className="settings-panel">
          <h2>{settingsTitle(tool, t)}</h2>
          {isCompressTool && (
            <div className="preset-row">
              <span>Preset</span>
              <div>
                <button className={compressPreset === 'recommended' ? 'preset active' : 'preset'} type="button" onClick={() => { clearOutputs(); setCompressPreset('recommended'); setSettings((value) => ({ ...value, quality: 0.82 })) }}>{t.tool.preset.recommended}</button>
                <button className={compressPreset === 'smallest' ? 'preset active' : 'preset'} type="button" onClick={() => { clearOutputs(); setCompressPreset('smallest'); setSettings((value) => ({ ...value, quality: 0.62 })) }}>{t.tool.preset.smallest}</button>
                <button className={compressPreset === 'high' ? 'preset active' : 'preset'} type="button" onClick={() => { clearOutputs(); setCompressPreset('high'); setSettings((value) => ({ ...value, quality: 1 })) }}>{t.tool.preset.high}</button>
              </div>
            </div>
          )}
          <ToolSettings tool={tool} settings={settings} setSettings={setSettings} onSettingsChange={() => { clearOutputs(); if (isCompressTool) setCompressPreset('custom') }} />
          <button className="primary full apply-button" type="submit">
            {buttonLabel(tool.slug, t)}
          </button>
          <button
            className="secondary full"
            type="button"
            onClick={resetTool}
          >
            {t.tool.reset}
          </button>
        </aside>
        <section className="preview-panel">
          <div className="preview-heading">
            <h2>{t.tool.preview}</h2>
            <button type="button" className="compare-button"><HomeIcon name="convert" /> Compare</button>
          </div>
          {previewUrl ? (
            <div className="preview-grid">
              <figure>
                <div className="figure-top"><span>{t.tool.original}: {files[0]?.name}</span><em>{files[0] && formatSize(files[0].size)}</em></div>
                <img src={previewUrl} alt="Original preview" />
                <figcaption>{t.tool.original} {files[0] && formatSize(files[0].size)}</figcaption>
              </figure>
              {processed ? (
                <figure>
                  <div className="figure-top"><span>{t.tool.result}</span><em>{formatSize(processed.size)} {resultSavedPercent > 0 && `(-${resultSavedPercent}%)`}</em></div>
                  {processed.blob.type === 'application/pdf' || processed.name.endsWith('.zip') ? (
                    <div className="file-result">{processed.name}</div>
                  ) : (
                    <img src={processed.url} alt="Processed preview" />
                  )}
                  <figcaption>{t.tool.result} {formatSize(processed.size)}</figcaption>
                </figure>
              ) : (
                <div className="empty-preview">{t.tool.noImageYet}</div>
              )}
            </div>
          ) : (
            <div className="empty-preview">{t.tool.noImageYet}</div>
          )}
          {(status || resultSavedPercent > 0) && (
            <div className="combined-success">
              {resultSavedPercent > 0 && <strong>Great! Your file is {resultSavedPercent}% smaller.</strong>}
              {status && <span>{status}</span>}
            </div>
          )}
          {metadata && (
            <div className="metadata-box">
              <h3>EXIF preview</h3>
              {Object.keys(metadata).length ? (
                <pre>{JSON.stringify(metadata, null, 2).slice(0, 1200)}</pre>
              ) : (
                <p>No readable EXIF metadata found.</p>
              )}
            </div>
          )}
          {batch.length > 0 && (
            <ul className="batch-list">
              {batch.map((item) => (
                <li key={item.name}>{item.name} · {formatSize(item.size)}</li>
              ))}
            </ul>
          )}
          <div className="compress-preview-footer">
            <div className="compress-preview-notes">
              {error && <p className="error">{error}</p>}
              <p className="privacy-note">{t.trust.barPrivateDesc}</p>
            </div>
            <div className="compress-action-bar">
              <span>{actionSummary}</span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}>
                  <HomeIcon name="download" /> {downloadLabel(processed, t)}
                </a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> {downloadLabel(undefined, t)}</button>
              )}
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}

export function ToolSettings({
  tool,
  settings,
  setSettings,
  onSettingsChange,
}: {
  tool: Tool
  settings: ToolSettingsState
  setSettings: React.Dispatch<React.SetStateAction<ToolSettingsState>>
  onSettingsChange?: () => void
}) {
  const update = <K extends keyof ToolSettingsState>(key: K, value: ToolSettingsState[K]) => {
    onSettingsChange?.()
    setSettings((current) => ({ ...current, [key]: value }))
  }

  if (tool.slug === 'resize-image') {
    const setDimensions = (width: number, height: number) => {
      setSettings((current) => ({ ...current, width, height }))
    }
    const updateWidth = (width: number) => {
      setSettings((current) => ({
        ...current,
        width,
        height: current.keepAspect && current.width > 0
          ? Math.max(1, Math.round((width * current.height) / current.width))
          : current.height,
      }))
    }
    const updateHeight = (height: number) => {
      setSettings((current) => ({
        ...current,
        height,
        width: current.keepAspect && current.height > 0
          ? Math.max(1, Math.round((height * current.width) / current.height))
          : current.width,
      }))
    }

    return (
      <div className="resize-settings">
        <div className="resize-section">
          <span className="field-title">Resize By</span>
          <div className="segmented-control">
            <button
              className={settings.resizeMode === 'pixels' ? 'active' : ''}
              type="button"
              onClick={() => update('resizeMode', 'pixels')}
            >
              Pixels
            </button>
            <button
              className={settings.resizeMode === 'percentage' ? 'active' : ''}
              type="button"
              onClick={() => update('resizeMode', 'percentage')}
            >
              Percentage
            </button>
          </div>
        </div>

        {settings.resizeMode === 'pixels' ? (
          <div className="resize-section">
            <span className="field-title">Dimensions</span>
            <div className="dimension-grid">
              <label>
                Width (px)
                <input min="1" type="number" value={settings.width} onChange={(event) => updateWidth(Number(event.target.value))} />
              </label>
              <label>
                Height (px)
                <input min="1" type="number" value={settings.height} onChange={(event) => updateHeight(Number(event.target.value))} />
              </label>
            </div>
            <label className="toggle-row">
              <input type="checkbox" checked={settings.keepAspect} onChange={(event) => update('keepAspect', event.target.checked)} />
              Keep aspect ratio
            </label>
          </div>
        ) : (
          <label>
            Scale percentage {settings.percentage}%
            <input min="1" max="400" type="range" value={settings.percentage} onChange={(event) => update('percentage', Number(event.target.value))} />
          </label>
        )}

        <div className="resize-section">
          <span className="field-title">Common Sizes</span>
          <div className="size-pills">
            <button type="button" onClick={() => setDimensions(1920, 1080)}>1920 × 1080</button>
            <button type="button" onClick={() => setDimensions(1280, 720)}>1280 × 720</button>
            <button type="button" onClick={() => setDimensions(1024, 768)}>1024 × 768</button>
            <button type="button" onClick={() => setDimensions(800, 600)}>800 × 600</button>
            <button type="button" onClick={() => setDimensions(settings.width, settings.height)}>Custom</button>
          </div>
        </div>

        <div className="resize-section">
          <span className="field-title">Output Format</span>
          <div className="format-pills">
            {Object.entries(formatLabels).map(([value, label]) => (
              <button
                className={settings.format === value ? 'active' : ''}
                key={value}
                type="button"
                onClick={() => update('format', value as OutputFormat)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label>
          Image Quality {Math.round(settings.quality * 100)}%
          <input min="0.35" max="1" step="0.01" type="range" value={settings.quality} onChange={(event) => update('quality', Number(event.target.value))} />
        </label>

        <label className="toggle-row metadata-toggle">
          <input type="checkbox" defaultChecked />
          Keep metadata (EXIF)
        </label>
      </div>
    )
  }

  return (
    <>
      {['compress-image', 'crop-image', 'rotate-image', 'flip-image', 'convert-image', 'add-text', 'add-watermark', 'blur-image', 'pixelate-image', 'remove-exif'].includes(tool.slug) && (
        <label>
          Output format
          <select value={settings.format} onChange={(event) => update('format', event.target.value as OutputFormat)}>
            {Object.entries(formatLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
      )}
      {tool.slug === 'convert-to-webp' && (
        <label>
          Output format
          <input value="WebP" readOnly />
        </label>
      )}
      {['compress-image', 'batch-compress', 'convert-image', 'convert-to-webp'].includes(tool.slug) && (
        <label>
          Quality {Math.round(settings.quality * 100)}%
          <input min="0.35" max="1" step="0.01" type="range" value={settings.quality} onChange={(event) => update('quality', Number(event.target.value))} />
        </label>
      )}
      {tool.slug === 'crop-image' && (
        <div className="two-col">
          <label>Crop X<input min="0" type="number" value={settings.cropX} onChange={(event) => update('cropX', Number(event.target.value))} /></label>
          <label>Crop Y<input min="0" type="number" value={settings.cropY} onChange={(event) => update('cropY', Number(event.target.value))} /></label>
          <label>Width<input min="1" type="number" value={settings.cropWidth} onChange={(event) => update('cropWidth', Number(event.target.value))} /></label>
          <label>Height<input min="1" type="number" value={settings.cropHeight} onChange={(event) => update('cropHeight', Number(event.target.value))} /></label>
        </div>
      )}
      {tool.slug === 'rotate-image' && (
        <>
          <label>
            Angle {settings.angle}°
            <input min="-180" max="180" step="1" type="range" value={settings.angle} onChange={(event) => update('angle', Number(event.target.value))} />
          </label>
          <label>
            Background
            <input type="color" value={settings.background} onChange={(event) => update('background', event.target.value)} />
          </label>
        </>
      )}
      {tool.slug === 'flip-image' && (
        <div className="check-row">
          <label><input type="checkbox" checked={settings.flipX} onChange={(event) => update('flipX', event.target.checked)} /> Horizontal</label>
          <label><input type="checkbox" checked={settings.flipY} onChange={(event) => update('flipY', event.target.checked)} /> Vertical</label>
        </div>
      )}
      {['add-text', 'add-watermark'].includes(tool.slug) && (
        <>
          <label>
            Text
            <input value={settings.text} onChange={(event) => update('text', event.target.value)} />
          </label>
          <label>
            Font size {settings.textSize}px
            <input min="12" max="160" type="range" value={settings.textSize} onChange={(event) => update('textSize', Number(event.target.value))} />
          </label>
          <label>
            Color
            <input type="color" value={settings.textColor} onChange={(event) => update('textColor', event.target.value)} />
          </label>
        </>
      )}
      {tool.slug === 'add-watermark' && (
        <label>
          Opacity {Math.round(settings.watermarkOpacity * 100)}%
          <input min="0.1" max="1" step="0.05" type="range" value={settings.watermarkOpacity} onChange={(event) => update('watermarkOpacity', Number(event.target.value))} />
        </label>
      )}
      {tool.slug === 'blur-image' && (
        <label>
          Blur strength {settings.blur}px
          <input min="1" max="30" type="range" value={settings.blur} onChange={(event) => update('blur', Number(event.target.value))} />
        </label>
      )}
      {tool.slug === 'pixelate-image' && (
        <label>
          Pixel size {settings.pixelSize}px
          <input min="4" max="48" type="range" value={settings.pixelSize} onChange={(event) => update('pixelSize', Number(event.target.value))} />
        </label>
      )}
    </>
  )
}

export function UploadDropzone({ multiple, onFiles }: { multiple?: boolean; onFiles: (files: File[]) => void }) {
  const [dragging, setDragging] = useState(false)
  const { t } = useI18n()

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setDragging(false)
    onFiles(Array.from(event.dataTransfer.files))
  }

  return (
    <label
      className={`upload-zone ${dragging ? 'dragging' : ''}`}
      onDragOver={(event) => {
        event.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
    >
      <span className="upload-mark"><HomeIcon name="upload" /></span>
      <strong>{multiple ? t.tool.uploadImages : t.tool.uploadImage}</strong>
      <small>
        {multiple ? t.tool.orDragImages : t.tool.orDragImage}
      </small>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onFiles(Array.from(event.target.files ?? []))
          event.currentTarget.value = ''
        }}
      />
    </label>
  )
}

export function UploadButton({ label = 'Upload an image', multiple = false, onFiles }: { label?: string; multiple?: boolean; onFiles: (files: File[]) => void }) {
  return (
    <label className="primary upload-button">
      <HomeIcon name="upload" /> {label}
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(event) => {
          onFiles(Array.from(event.target.files ?? []))
          event.currentTarget.value = ''
        }}
      />
    </label>
  )
}

export function HomeIcon({ name }: { name?: string }) {
  const icon = name ?? 'sparkle'

  return (
    <svg className="home-icon" viewBox="0 0 32 32" aria-hidden="true">
      {icon === 'trend' && (
        <>
          <path d="M6 22 13 15l4 4 8-10" />
          <path d="M20 9h5v5" />
        </>
      )}
      {icon === 'scissors' && (
        <>
          <circle cx="9" cy="22" r="3.2" />
          <circle cx="9" cy="10" r="3.2" />
          <path d="M12 19 25 7M12 13l13 12" />
        </>
      )}
      {icon === 'convert' && (
        <>
          <path d="M10 8h10l4 4v12H10z" />
          <path d="M20 8v5h5M8 13H4m0 0 3-3m-3 3 3 3M24 20h4m0 0-3-3m3 3-3 3" />
        </>
      )}
      {icon === 'sparkle' && (
        <>
          <path d="M16 4c2.1 5.5 3.2 6.6 8.5 8.5C19.2 14.4 18.1 15.5 16 21c-2.1-5.5-3.2-6.6-8.5-8.5C12.8 10.6 13.9 9.5 16 4Z" />
          <path d="M23 22c1 2.5 1.6 3 4 4-2.4 1-3 1.5-4 4-1-2.5-1.6-3-4-4 2.4-1 3-1.5 4-4Z" />
        </>
      )}
      {icon === 'shield' && (
        <path d="M16 4 25 8v7c0 6-3.6 10.4-9 13-5.4-2.6-9-7-9-13V8z" />
      )}
      {icon === 'lock' && (
        <>
          <rect x="7" y="14" width="18" height="13" rx="2" />
          <path d="M11 14v-3a5 5 0 0 1 10 0v3" />
        </>
      )}
      {icon === 'bolt' && (
        <path d="M18 3 8 17h8l-2 12 10-15h-8z" />
      )}
      {icon === 'device' && (
        <>
          <rect x="5" y="8" width="22" height="15" rx="2" />
          <path d="M12 27h8M16 23v4" />
        </>
      )}
      {icon === 'file' && (
        <>
          <path d="M10 6h8l5 5v15H10z" />
          <path d="M18 6v6h6M13 18h8M13 22h5" />
        </>
      )}
      {icon === 'crop' && (
        <>
          <path d="M9 4v19h19" />
          <path d="M4 9h19v19" />
        </>
      )}
      {icon === 'stack' && (
        <>
          <rect x="7" y="7" width="13" height="13" rx="2" />
          <rect x="12" y="12" width="13" height="13" rx="2" />
        </>
      )}
      {icon === 'sun' && (
        <>
          <circle cx="16" cy="16" r="4" />
          <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l3 3M21.5 21.5l3 3M24.5 7.5l-3 3M10.5 21.5l-3 3" />
        </>
      )}
      {icon === 'rotate' && (
        <>
          <path d="M23 11a8 8 0 1 0 1.2 8" />
          <path d="M23 5v6h-6" />
        </>
      )}
      {icon === 'flip' && (
        <>
          <path d="m7 8 7 8-7 8zM25 8l-7 8 7 8zM16 6v20" />
        </>
      )}
      {icon === 'text' && (
        <>
          <path d="M7 8h18M16 8v18M11 26h10" />
        </>
      )}
      {icon === 'image' && (
        <>
          <rect x="6" y="7" width="20" height="18" rx="3" />
          <path d="m9 22 6-7 4 5 3-3 4 5" />
          <circle cx="21" cy="12" r="2" />
        </>
      )}
      {icon === 'magic' && (
        <>
          <path d="m7 25 17-17M18 7l7 7M8 9l1-4M12 12l4-1M21 23l4 2" />
        </>
      )}
      {icon === 'palette' && (
        <>
          <path d="M16 5c-6 0-10 4.1-10 9.6 0 4.6 3.4 8.4 8.1 8.4h2.2c1.5 0 2.2 1.4 1.3 2.6-.8 1.1 0 2.4 1.4 2.2 4.1-.7 7-4.7 7-10.2C26 10.5 22 5 16 5Z" />
          <circle cx="11" cy="13" r="1" />
          <circle cx="16" cy="10" r="1" />
          <circle cx="21" cy="13" r="1" />
        </>
      )}
      {icon === 'smile' && (
        <>
          <circle cx="16" cy="16" r="10" />
          <path d="M12 13h.1M20 13h.1M11.5 18.5c2.2 2.4 6.8 2.4 9 0" />
        </>
      )}
      {icon === 'grid' && (
        <>
          <rect x="7" y="7" width="7" height="7" rx="1" />
          <rect x="18" y="7" width="7" height="7" rx="1" />
          <rect x="7" y="18" width="7" height="7" rx="1" />
          <rect x="18" y="18" width="7" height="7" rx="1" />
        </>
      )}
      {icon === 'info' && (
        <>
          <circle cx="16" cy="16" r="10" />
          <path d="M16 15v7M16 10h.1" />
        </>
      )}
      {icon === 'dots' && (
        <>
          <circle cx="9" cy="9" r="2" />
          <circle cx="16" cy="9" r="2" />
          <circle cx="23" cy="9" r="2" />
          <circle cx="9" cy="16" r="2" />
          <circle cx="16" cy="16" r="2" />
          <circle cx="23" cy="16" r="2" />
          <circle cx="9" cy="23" r="2" />
          <circle cx="16" cy="23" r="2" />
          <circle cx="23" cy="23" r="2" />
        </>
      )}
      {icon === 'watermark' && (
        <>
          <path d="M8 23V9h16v14" />
          <path d="M12 23c0-4 8-4 8 0M12 14h8" />
        </>
      )}
      {icon === 'trash' && (
        <>
          <path d="M8 10h16M13 10V7h6v3M11 13l1 13h8l1-13" />
          <path d="M15 16v7M19 16v7" />
        </>
      )}
      {icon === 'upload' && (
        <>
          <path d="M16 23V6M9 13l7-7 7 7" />
          <path d="M7 24v3h18v-3" />
        </>
      )}
      {icon === 'download' && (
        <>
          <path d="M16 6v17M9 16l7 7 7-7" />
          <path d="M7 24v3h18v-3" />
        </>
      )}
      {icon === 'search' && (
        <>
          <circle cx="14" cy="14" r="7" />
          <path d="m20 20 6 6" />
        </>
      )}
      {icon === 'play' && (
        <path d="M10 6l16 10-16 10z" />
      )}
      {icon === 'music' && (
        <>
          <path d="M9 18V8l14-3v10" />
          <circle cx="9" cy="21" r="3" />
          <circle cx="23" cy="18" r="3" />
        </>
      )}
      {icon === 'settings' && (
        <>
          <circle cx="16" cy="16" r="3" />
          <path d="M16 5v3M16 24v3M5 16h3M24 16h3M8.2 8.2l2.1 2.1M21.7 21.7l2.1 2.1M8.2 23.8l2.1-2.1M21.7 10.3l2.1-2.1" />
        </>
      )}
      {icon === 'check' && (
        <path d="M6 16l7 7 13-13" />
      )}
      {![
        'trend',
        'scissors',
        'convert',
        'sparkle',
        'shield',
        'lock',
        'bolt',
        'device',
        'file',
        'crop',
        'stack',
        'sun',
        'rotate',
        'flip',
        'text',
        'image',
        'magic',
        'palette',
        'smile',
        'grid',
        'info',
        'dots',
        'watermark',
        'trash',
        'upload',
        'download',
        'search',
        'play',
        'music',
        'settings',
        'check',
      ].includes(icon) && <path d="M16 4c2.1 5.5 3.2 6.6 8.5 8.5C19.2 14.4 18.1 15.5 16 21c-2.1-5.5-3.2-6.6-8.5-8.5C12.8 10.6 13.9 9.5 16 4Z" />}
    </svg>
  )
}

function textLinesForImage(text: string) {
  const value = text.trim() || 'NanoImage'
  if (value.includes('\n')) return value.split(/\n+/)
  return value.split(/\s+/).length > 2 ? value.replace(/\s+(\S+)$/, '\n$1').split('\n') : [value]
}

function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const value = text.trim()
  if (!value) return []
  return value.split(/\n+/).flatMap((paragraph) => {
    const words = paragraph.split(/\s+/).filter(Boolean)
    if (words.length <= 1) return words.length ? words : ['']
    const lines: string[] = []
    let line = words[0]
    words.slice(1).forEach((word) => {
      const candidate = `${line} ${word}`
      if (ctx.measureText(candidate).width <= maxWidth) {
        line = candidate
      } else {
        lines.push(line)
        line = word
      }
    })
    lines.push(line)
    return lines
  })
}

function textLayerFromSettings(id: number, settings: ToolSettingsState): TextLayer {
  return {
    id,
    text: settings.text,
    textSize: settings.textSize,
    textColor: settings.textColor,
    textXPercent: settings.textXPercent,
    textYPercent: settings.textYPercent,
    textBoxWidthPercent: settings.textBoxWidthPercent,
    textBoxHeightPercent: settings.textBoxHeightPercent,
    textBold: settings.textBold,
    textItalic: settings.textItalic,
    textUnderline: settings.textUnderline,
    textShadow: settings.textShadow,
    textOutline: settings.textOutline,
    textAlign: settings.textAlign,
    textShadowColor: settings.textShadowColor,
    textOutlineColor: settings.textOutlineColor,
    textShadowBlur: settings.textShadowBlur,
    textShadowOffsetX: settings.textShadowOffsetX,
    textShadowOffsetY: settings.textShadowOffsetY,
  }
}

function settingsFromTextLayer(settings: ToolSettingsState, layer: TextLayer): ToolSettingsState {
  return {
    ...settings,
    text: layer.text,
    textSize: layer.textSize ?? settings.textSize,
    textColor: layer.textColor ?? settings.textColor,
    textXPercent: layer.textXPercent ?? settings.textXPercent,
    textYPercent: layer.textYPercent ?? settings.textYPercent,
    textBoxWidthPercent: layer.textBoxWidthPercent ?? settings.textBoxWidthPercent,
    textBoxHeightPercent: layer.textBoxHeightPercent ?? settings.textBoxHeightPercent,
    textBold: layer.textBold ?? settings.textBold,
    textItalic: layer.textItalic ?? settings.textItalic,
    textUnderline: layer.textUnderline ?? settings.textUnderline,
    textShadow: layer.textShadow ?? settings.textShadow,
    textOutline: layer.textOutline ?? settings.textOutline,
    textAlign: layer.textAlign ?? settings.textAlign,
    textShadowColor: layer.textShadowColor ?? settings.textShadowColor,
    textOutlineColor: layer.textOutlineColor ?? settings.textOutlineColor,
    textShadowBlur: layer.textShadowBlur ?? settings.textShadowBlur,
    textShadowOffsetX: layer.textShadowOffsetX ?? settings.textShadowOffsetX,
    textShadowOffsetY: layer.textShadowOffsetY ?? settings.textShadowOffsetY,
  }
}

function drawTextLayerOnCanvas(ctx: CanvasRenderingContext2D, width: number, height: number, layerSettings: ToolSettingsState) {
  if (!layerSettings.text.trim()) return
  ctx.save()
  ctx.font = `${layerSettings.textItalic ? 'italic ' : ''}${layerSettings.textBold ? 900 : 500} ${layerSettings.textSize}px "Comic Sans MS", "Trebuchet MS", cursive`
  ctx.fillStyle = layerSettings.textColor
  ctx.strokeStyle = layerSettings.textOutline ? layerSettings.textOutlineColor : 'rgba(0,0,0,.35)'
  ctx.lineWidth = Math.max(2, layerSettings.textSize / 54)
  ctx.textAlign = layerSettings.textAlign
  ctx.textBaseline = 'middle'
  if (layerSettings.textShadow) {
    ctx.shadowColor = layerSettings.textShadowColor
    ctx.shadowBlur = layerSettings.textShadowBlur
    ctx.shadowOffsetX = layerSettings.textShadowOffsetX
    ctx.shadowOffsetY = layerSettings.textShadowOffsetY
  }
  const textBoxWidth = width * (layerSettings.textBoxWidthPercent / 100)
  const textBoxLeft = width * ((layerSettings.textXPercent - layerSettings.textBoxWidthPercent / 2) / 100)
  const textBoxRight = textBoxLeft + textBoxWidth
  const x = layerSettings.textAlign === 'left'
    ? textBoxLeft
    : layerSettings.textAlign === 'right'
      ? textBoxRight
      : width * (layerSettings.textXPercent / 100)
  const y = height * (layerSettings.textYPercent / 100)
  const lines = wrapCanvasText(ctx, layerSettings.text, textBoxWidth)
  const lineHeight = layerSettings.textSize * 0.86
  lines.forEach((line, index) => {
    const lineY = y + (index - (lines.length - 1) / 2) * lineHeight
    if (layerSettings.textOutline) ctx.strokeText(line, x, lineY)
    ctx.fillText(line, x, lineY)
    if (layerSettings.textUnderline) {
      const underlineWidth = ctx.measureText(line).width
      const underlineY = lineY + layerSettings.textSize * 0.48
      const startX = layerSettings.textAlign === 'left' ? x : layerSettings.textAlign === 'right' ? x - underlineWidth : x - underlineWidth / 2
      const endX = layerSettings.textAlign === 'left' ? x + underlineWidth : layerSettings.textAlign === 'right' ? x : x + underlineWidth / 2
      ctx.beginPath()
      ctx.moveTo(startX, underlineY)
      ctx.lineTo(endX, underlineY)
      ctx.lineWidth = Math.max(2, layerSettings.textSize / 18)
      ctx.strokeStyle = layerSettings.textColor
      ctx.stroke()
    }
  })
  ctx.restore()
}

function drawMemeCaption(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  settings: ToolSettingsState,
  placement: 'top' | 'bottom',
) {
  const value = text.trim().toUpperCase()
  if (!value) return
  const fontFamily = settings.memeFont === 'Impact'
    ? 'Impact, Arial Black, sans-serif'
    : `${settings.memeFont}, Impact, Arial Black, sans-serif`
  let fontSize = settings.textSize || Math.round(ctx.canvas.width * 0.07)
  ctx.save()
  ctx.textAlign = settings.textAlign
  ctx.textBaseline = placement === 'top' ? 'top' : 'bottom'
  ctx.lineJoin = 'round'
  ctx.fillStyle = settings.textColor
  ctx.strokeStyle = settings.textOutlineColor || '#000000'
  ctx.lineWidth = Math.max(0, settings.memeOutlineWidth) * Math.max(1, ctx.canvas.width / 1200)
  ctx.shadowColor = 'rgba(0,0,0,.28)'
  ctx.shadowBlur = 4
  const lines = value.split(/\n+/).flatMap((paragraph) => {
    const words = paragraph.split(/\s+/).filter(Boolean)
    const output: string[] = []
    let current = ''
    words.forEach((word) => {
      const candidate = current ? `${current} ${word}` : word
      ctx.font = `${settings.textBold ? 900 : 700} ${fontSize}px ${fontFamily}`
      if (ctx.measureText(candidate).width <= maxWidth || !current) {
        current = candidate
      } else {
        output.push(current)
        current = word
      }
    })
    if (current) output.push(current)
    return output
  })
  while (fontSize > 24) {
    ctx.font = `${settings.textBold ? 900 : 700} ${fontSize}px ${fontFamily}`
    if (lines.every((line) => ctx.measureText(line).width <= maxWidth)) break
    fontSize -= 2
  }
  const lineHeight = fontSize * 1.02
  const totalHeight = lineHeight * lines.length
  const alignX = settings.textAlign === 'left' ? ctx.canvas.width * 0.04 : settings.textAlign === 'right' ? ctx.canvas.width * 0.96 : x
  lines.forEach((line, index) => {
    const lineY = placement === 'top' ? y + index * lineHeight : y - totalHeight + (index + 1) * lineHeight
    if (settings.memeOutlineWidth > 0) ctx.strokeText(line, alignX, lineY, maxWidth)
    ctx.fillText(line, alignX, lineY, maxWidth)
  })
  ctx.restore()
}

async function processImage(file: File, slug: string, settings: ToolSettingsState): Promise<ProcessedFile> {
  const bitmap = await loadBitmap(file)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Your browser does not support Canvas processing.')
  const format = slug === 'convert-to-webp'
    ? 'image/webp'
    : slug === 'change-background' && (settings.backgroundMode === 'transparent' || settings.backgroundAreas?.some((area) => area.backgroundMode === 'transparent'))
      ? 'image/png'
      : settings.format

  if (slug === 'resize-image') {
    if (settings.resizeMode === 'percentage') {
      const scale = Math.max(1, settings.percentage) / 100
      canvas.width = Math.max(1, Math.round(bitmap.width * scale))
      canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    } else {
      canvas.width = settings.width || bitmap.width
      canvas.height = settings.height || bitmap.height
    }
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  } else if (slug === 'upscale-image') {
    canvas.width = Math.max(bitmap.width, settings.width || Math.round(bitmap.width * settings.upscaleScale))
    canvas.height = Math.max(bitmap.height, settings.height || Math.round(bitmap.height * settings.upscaleScale))
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = settings.resampling === 'sharp' ? 'medium' : 'high'
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    if (settings.sharpness > 0) {
      applyCanvasSharpen(ctx, canvas.width, canvas.height, settings.sharpness, settings.resampling)
    }
  } else if (slug === 'crop-image') {
    const width = clamp(settings.cropWidth || bitmap.width, 1, bitmap.width)
    const height = clamp(settings.cropHeight || bitmap.height, 1, bitmap.height)
    const cropX = clamp(settings.cropX, 0, Math.max(0, bitmap.width - width))
    const cropY = clamp(settings.cropY, 0, Math.max(0, bitmap.height - height))
    canvas.width = width
    canvas.height = height
    ctx.drawImage(bitmap, cropX, cropY, width, height, 0, 0, width, height)
  } else if (slug === 'rotate-image') {
    const radians = (settings.angle * Math.PI) / 180
    const sin = Math.abs(Math.sin(radians))
    const cos = Math.abs(Math.cos(radians))
    canvas.width = Math.round(bitmap.width * cos + bitmap.height * sin)
    canvas.height = Math.round(bitmap.width * sin + bitmap.height * cos)
    ctx.fillStyle = settings.background
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(radians)
    ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2)
  } else if (slug === 'flip-image') {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.translate(settings.flipX ? canvas.width : 0, settings.flipY ? canvas.height : 0)
    ctx.scale(settings.flipX ? -1 : 1, settings.flipY ? -1 : 1)
    ctx.drawImage(bitmap, 0, 0)
  } else if (slug === 'enhance-image') {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.filter = enhanceCssFilter(settings)
    ctx.drawImage(bitmap, 0, 0)
    ctx.filter = 'none'
    applyEnhanceColorOverlay(ctx, canvas.width, canvas.height, settings)
  } else if (slug === 'change-background') {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    const sourceCanvas = document.createElement('canvas')
    sourceCanvas.width = bitmap.width
    sourceCanvas.height = bitmap.height
    const sourceCtx = sourceCanvas.getContext('2d')
    if (!sourceCtx) throw new Error('Your browser does not support Canvas processing.')
    sourceCtx.drawImage(bitmap, 0, 0)
    const sourceData = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height)
    const output = new ImageData(new Uint8ClampedArray(sourceData.data), sourceData.width, sourceData.height)
    const areas = settings.backgroundAreas?.length
      ? settings.backgroundAreas
      : settings.cropWidth && settings.cropHeight
        ? [{
            id: 1,
            x: settings.cropX,
            y: settings.cropY,
            width: settings.cropWidth,
            height: settings.cropHeight,
            background: settings.background,
            backgroundMode: settings.backgroundMode,
            backgroundImageDataUrl: settings.backgroundImageDataUrl,
            tolerance: settings.colorTolerance,
          }]
        : []
    if (!areas.length) throw new Error('Please click or drag on the image to add a background edit first.')
    for (const area of areas) {
      await paintCanvasBackground(ctx, canvas.width, canvas.height, {
        ...settings,
        background: area.background,
        backgroundMode: area.backgroundMode,
        backgroundImageDataUrl: area.backgroundImageDataUrl,
      })
      const backgroundData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const sampleX = clamp(Math.round(area.x + area.width / 2), 0, bitmap.width - 1)
      const sampleY = clamp(Math.round(area.y + area.height / 2), 0, bitmap.height - 1)
      const sampleIndex = (sampleY * bitmap.width + sampleX) * 4
      const sampleR = sourceData.data[sampleIndex]
      const sampleG = sourceData.data[sampleIndex + 1]
      const sampleB = sourceData.data[sampleIndex + 2]
      const maxDistance = 441.68
      const toleranceDistance = maxDistance * clamp(area.tolerance / 100, 0.1, 1)
      for (let index = 0; index < sourceData.data.length; index += 4) {
        const r = sourceData.data[index]
        const g = sourceData.data[index + 1]
        const b = sourceData.data[index + 2]
        const alpha = sourceData.data[index + 3]
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const luminance = (r * 0.299) + (g * 0.587) + (b * 0.114)
        const likelyPlainBackground = luminance > 224 && max - min < 34
        const sampleDistance = Math.hypot(r - sampleR, g - sampleG, b - sampleB)
        const sampledBackground = sampleDistance <= toleranceDistance
        const sampleAmount = sampledBackground ? 1 - clamp(sampleDistance / toleranceDistance, 0, 0.85) : 0
        const whiteAmount = likelyPlainBackground ? clamp((luminance - 224) / 31, 0, 1) : 0
        const replaceAmount = alpha < 250 ? 1 : Math.max(sampleAmount, whiteAmount)
        if (replaceAmount > 0) {
          output.data[index] = Math.round((r * (1 - replaceAmount)) + (backgroundData.data[index] * replaceAmount))
          output.data[index + 1] = Math.round((g * (1 - replaceAmount)) + (backgroundData.data[index + 1] * replaceAmount))
          output.data[index + 2] = Math.round((b * (1 - replaceAmount)) + (backgroundData.data[index + 2] * replaceAmount))
          output.data[index + 3] = area.backgroundMode === 'transparent' ? Math.round(alpha * (1 - replaceAmount)) : 255
        }
      }
    }
    ctx.putImageData(output, 0, 0)
  } else if (slug === 'change-color') {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.drawImage(bitmap, 0, 0)
    const areas = settings.colorAreas?.length
      ? settings.colorAreas
      : settings.cropWidth && settings.cropHeight
        ? [{ id: 1, x: settings.cropX, y: settings.cropY, width: settings.cropWidth, height: settings.cropHeight, color: settings.background, tolerance: settings.colorTolerance }]
        : []
    if (!areas.length) throw new Error('Please click or drag on the image to add a color edit first.')
    areas.forEach((area) => {
      const regionWidth = clamp(area.width, 1, bitmap.width)
      const regionHeight = clamp(area.height, 1, bitmap.height)
      const regionX = clamp(area.x, 0, Math.max(0, bitmap.width - regionWidth))
      const regionY = clamp(area.y, 0, Math.max(0, bitmap.height - regionHeight))
      const targetColor = hexToRgb(area.color)
      const imageData = ctx.getImageData(regionX, regionY, regionWidth, regionHeight)
      const radiusX = regionWidth / 2
      const radiusY = regionHeight / 2
      for (let y = 0; y < regionHeight; y += 1) {
        for (let x = 0; x < regionWidth; x += 1) {
          const normalizedX = (x - radiusX) / radiusX
          const normalizedY = (y - radiusY) / radiusY
          if ((normalizedX * normalizedX) + (normalizedY * normalizedY) > 1) continue
          const index = (y * regionWidth + x) * 4
          const alpha = imageData.data[index + 3] / 255
          if (!alpha) continue
          const luminance = ((imageData.data[index] * 0.299) + (imageData.data[index + 1] * 0.587) + (imageData.data[index + 2] * 0.114)) / 255
          const tintStrength = clamp(area.tolerance / 100, 0.1, 1)
          imageData.data[index] = Math.round((imageData.data[index] * (1 - tintStrength)) + (targetColor.r * (0.45 + luminance * 0.65) * tintStrength))
          imageData.data[index + 1] = Math.round((imageData.data[index + 1] * (1 - tintStrength)) + (targetColor.g * (0.45 + luminance * 0.65) * tintStrength))
          imageData.data[index + 2] = Math.round((imageData.data[index + 2] * (1 - tintStrength)) + (targetColor.b * (0.45 + luminance * 0.65) * tintStrength))
        }
      }
      ctx.putImageData(imageData, regionX, regionY)
    })
  } else if (slug === 'meme-generator') {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.drawImage(bitmap, 0, 0)
    drawMemeCaption(ctx, settings.memeTopText, canvas.width / 2, canvas.height * 0.08, canvas.width * 0.92, settings, 'top')
    drawMemeCaption(ctx, settings.memeBottomText, canvas.width / 2, canvas.height * 0.92, canvas.width * 0.92, settings, 'bottom')
  } else if (slug === 'add-text' || slug === 'add-watermark') {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.drawImage(bitmap, 0, 0)
    if (slug === 'add-text' && settings.textLayers?.length) {
      settings.textLayers.forEach((layer) => drawTextLayerOnCanvas(ctx, canvas.width, canvas.height, settingsFromTextLayer(settings, layer)))
    } else {
    ctx.save()
    ctx.globalAlpha = slug === 'add-watermark' ? settings.watermarkOpacity : 1
    ctx.font = `${settings.textItalic ? 'italic ' : ''}${settings.textBold ? 900 : 500} ${settings.textSize}px "Comic Sans MS", "Trebuchet MS", cursive`
    ctx.fillStyle = settings.textColor
    ctx.strokeStyle = settings.textOutline ? settings.textOutlineColor : 'rgba(0,0,0,.35)'
    ctx.lineWidth = Math.max(2, settings.textSize / 54)
    ctx.textAlign = settings.textAlign
    ctx.textBaseline = 'middle'
    if (settings.textShadow) {
      ctx.shadowColor = settings.textShadowColor
      ctx.shadowBlur = settings.textShadowBlur
      ctx.shadowOffsetX = settings.textShadowOffsetX
      ctx.shadowOffsetY = settings.textShadowOffsetY
    }
    const textBoxWidth = canvas.width * (settings.textBoxWidthPercent / 100)
    const textBoxHeight = canvas.height * (settings.textBoxHeightPercent / 100)
    const textBoxLeft = canvas.width * ((settings.textXPercent - settings.textBoxWidthPercent / 2) / 100)
    const textBoxTop = canvas.height * ((settings.textYPercent - settings.textBoxHeightPercent / 2) / 100)
    const textBoxRight = textBoxLeft + textBoxWidth
    if (slug === 'add-watermark' && settings.watermarkMode === 'image') {
      if (!settings.watermarkImageDataUrl) throw new Error('Please upload a watermark image first.')
      const watermark = await loadBitmapFromDataUrl(settings.watermarkImageDataUrl)
      ctx.drawImage(watermark, textBoxLeft, textBoxTop, textBoxWidth, textBoxHeight)
      ctx.restore()
      const blob = await canvasToBlob(canvas, format, settings.quality)
      return {
        blob,
        size: blob.size,
        url: URL.createObjectURL(blob),
        name: `${fileNameWithoutExtension(file.name)}-${slug}.${extensionFor(format)}`,
      }
    }
    const x = settings.textAlign === 'left'
      ? textBoxLeft
      : settings.textAlign === 'right'
        ? textBoxRight
        : canvas.width * (settings.textXPercent / 100)
    const y = canvas.height * (settings.textYPercent / 100)
    const lines = settings.textRenderLines ?? wrapCanvasText(ctx, settings.text, textBoxWidth)
    const lineHeight = settings.textSize * 0.86
    lines.forEach((line, index) => {
      const lineY = y + (index - (lines.length - 1) / 2) * lineHeight
      if (settings.textOutline) ctx.strokeText(line, x, lineY)
      ctx.fillText(line, x, lineY)
      if (settings.textUnderline && (slug === 'add-text' || slug === 'add-watermark')) {
        const width = ctx.measureText(line).width
        const underlineY = lineY + settings.textSize * 0.48
        const startX = settings.textAlign === 'left' ? x : settings.textAlign === 'right' ? x - width : x - width / 2
        const endX = settings.textAlign === 'left' ? x + width : settings.textAlign === 'right' ? x : x + width / 2
        ctx.beginPath()
        ctx.moveTo(startX, underlineY)
        ctx.lineTo(endX, underlineY)
        ctx.lineWidth = Math.max(2, settings.textSize / 18)
        ctx.strokeStyle = settings.textColor
        ctx.stroke()
      }
    })
    ctx.restore()
    }
  } else if (slug === 'blur-image') {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.drawImage(bitmap, 0, 0)
    const areas = settings.blurAreas
      ? settings.blurAreas
      : settings.cropWidth && settings.cropHeight
        ? [{ id: 1, x: settings.cropX, y: settings.cropY, width: settings.cropWidth, height: settings.cropHeight }]
        : []
    areas.forEach((area) => {
      const regionWidth = clamp(area.width || bitmap.width, 1, bitmap.width)
      const regionHeight = clamp(area.height || bitmap.height, 1, bitmap.height)
      const regionX = clamp(area.x, 0, Math.max(0, bitmap.width - regionWidth))
      const regionY = clamp(area.y, 0, Math.max(0, bitmap.height - regionHeight))
      const regionCanvas = document.createElement('canvas')
      regionCanvas.width = regionWidth
      regionCanvas.height = regionHeight
      const regionCtx = regionCanvas.getContext('2d')
      if (!regionCtx) throw new Error('Your browser does not support Canvas processing.')
      regionCtx.filter = `blur(${settings.blur}px)`
      regionCtx.drawImage(bitmap, regionX, regionY, regionWidth, regionHeight, 0, 0, regionWidth, regionHeight)
      ctx.save()
      ctx.beginPath()
      ctx.ellipse(regionX + regionWidth / 2, regionY + regionHeight / 2, regionWidth / 2, regionHeight / 2, 0, 0, Math.PI * 2)
      ctx.clip()
      ctx.drawImage(regionCanvas, regionX, regionY)
      ctx.restore()
    })
  } else if (slug === 'pixelate-image') {
    const size = settings.pixelSize
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.drawImage(bitmap, 0, 0)
    const areas = settings.pixelateAreas?.length
      ? settings.pixelateAreas
      : settings.cropWidth && settings.cropHeight
        ? [{ id: 1, x: settings.cropX, y: settings.cropY, width: settings.cropWidth, height: settings.cropHeight }]
        : []
    if (!areas.length) {
      const blob = await canvasToBlob(canvas, format, settings.quality)
      return {
        blob,
        size: blob.size,
        url: URL.createObjectURL(blob),
        name: `${fileNameWithoutExtension(file.name)}-${slug}.${extensionFor(format)}`,
      }
    }
    areas.forEach((area) => {
      const regionWidth = clamp(area.width || bitmap.width, 1, bitmap.width)
      const regionHeight = clamp(area.height || bitmap.height, 1, bitmap.height)
      const regionX = clamp(area.x, 0, Math.max(0, bitmap.width - regionWidth))
      const regionY = clamp(area.y, 0, Math.max(0, bitmap.height - regionHeight))
      const smallCanvas = document.createElement('canvas')
      smallCanvas.width = Math.max(1, Math.floor(regionWidth / size))
      smallCanvas.height = Math.max(1, Math.floor(regionHeight / size))
      const smallCtx = smallCanvas.getContext('2d')
      if (!smallCtx) throw new Error('Your browser does not support Canvas processing.')
      smallCtx.drawImage(bitmap, regionX, regionY, regionWidth, regionHeight, 0, 0, smallCanvas.width, smallCanvas.height)
      ctx.save()
      ctx.beginPath()
      ctx.ellipse(regionX + regionWidth / 2, regionY + regionHeight / 2, regionWidth / 2, regionHeight / 2, 0, 0, Math.PI * 2)
      ctx.clip()
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(smallCanvas, regionX, regionY, regionWidth, regionHeight)
      ctx.restore()
    })
  } else {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.drawImage(bitmap, 0, 0)
  }

  const canReturnOriginalResize = slug === 'resize-image'
    && canvas.width === bitmap.width
    && canvas.height === bitmap.height
    && isSameImageMime(format, file.type)
  const canReturnOriginalConvert = slug === 'convert-image'
    && settings.quality >= 1
    && isSameImageMime(format, file.type)
  const shouldOptimizeSize = slug === 'compress-image' || slug === 'resize-image'
  const blob = canReturnOriginalConvert
    ? file
    : shouldOptimizeSize
    ? await compressedCanvasToBlob(canvas, format, settings.quality, file, slug === 'compress-image' || canReturnOriginalResize || canReturnOriginalConvert)
    : await canvasToBlob(canvas, format, settings.quality)
  const outputName = (slug === 'compress-image' || slug === 'resize-image' || slug === 'convert-image') && blob === file
    ? file.name
    : `${fileNameWithoutExtension(file.name)}-${slug}.${extensionFor(format)}`
  return {
    blob,
    size: blob.size,
    url: URL.createObjectURL(blob),
    name: outputName,
  }
}

async function createPdf(files: File[], options: PdfOptions = {
  pageSize: 'a4',
  orientation: 'portrait',
  margin: 20,
  imageFit: 'fit',
  spacing: 10,
  caption: false,
  sameSize: true,
  compress: true,
}) {
  const pdf = await PDFDocument.create()
  const baseSize = options.pageSize === 'letter' ? PageSizes.Letter : PageSizes.A4
  const pageSize: [number, number] = options.orientation === 'landscape' ? [baseSize[1], baseSize[0]] : [baseSize[0], baseSize[1]]
  const margin = options.margin * 2.83465
  const spacing = options.spacing * 2.83465
  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer())
    const image = file.type.includes('png')
      ? await pdf.embedPng(bytes)
      : await pdf.embedJpg(bytes).catch(async () => {
          const converted = await processImage(file, 'convert-image', {
            format: 'image/jpeg',
            quality: 0.9,
            width: 0,
            height: 0,
            resizeMode: 'pixels',
            percentage: 100,
            keepAspect: true,
            cropX: 0,
            cropY: 0,
            cropWidth: 0,
            cropHeight: 0,
            angle: 0,
            flipX: false,
            flipY: false,
            text: '',
            textSize: 54,
            textColor: '#ffffff',
            textXPercent: 50,
            textYPercent: 47,
            textBoxWidthPercent: 74,
            textBoxHeightPercent: 45,
            textBold: true,
            textItalic: false,
            textUnderline: false,
            textShadow: true,
            textOutline: false,
            textAlign: 'center',
            textShadowColor: '#000000',
            textOutlineColor: '#ffffff',
            textShadowBlur: 12,
            textShadowOffsetX: 4,
            textShadowOffsetY: 4,
            memeTopText: '',
            memeBottomText: '',
            memeFont: 'Impact',
            memeOutlineWidth: 4,
            watermarkMode: 'text',
            watermarkImageDataUrl: '',
            watermarkImageName: '',
            watermarkOpacity: 0.35,
            blur: 10,
            pixelSize: 12,
            background: '#ffffff',
            colorTolerance: 78,
            backgroundMode: 'color',
            backgroundImageDataUrl: '',
            backgroundImageName: '',
            brightness: 0,
            contrast: 0,
            saturation: 0,
            vibrance: 0,
            exposure: 0,
            highlights: 0,
            shadows: 0,
            sharpness: 0,
            clarity: 0,
            warmth: 0,
            tint: 0,
            upscaleScale: 2,
            resampling: 'smooth',
          })
          return pdf.embedJpg(new Uint8Array(await converted.blob.arrayBuffer()))
        })
    const page = pdf.addPage(options.sameSize ? pageSize : pageSize)
    const availableWidth = Math.max(1, page.getWidth() - margin * 2)
    const captionSpace = options.caption ? 18 + spacing : 0
    const availableHeight = Math.max(1, page.getHeight() - margin * 2 - captionSpace)
    const fit = options.imageFit === 'fill'
      ? image.scale(Math.max(availableWidth / image.width, availableHeight / image.height))
      : options.imageFit === 'actual'
        ? image.scale(Math.min(1, Math.min(availableWidth / image.width, availableHeight / image.height)))
        : image.scaleToFit(availableWidth, availableHeight)
    page.drawImage(image, {
      x: margin + (availableWidth - fit.width) / 2,
      y: margin + captionSpace + (availableHeight - fit.height) / 2,
      width: fit.width,
      height: fit.height,
    })
    if (options.caption) {
      page.drawText(file.name, {
        x: margin,
        y: margin,
        size: 10,
      })
    }
  }
  const pdfBytes = await pdf.save({ useObjectStreams: options.compress })
  return new Blob([pdfBytes.buffer.slice(0) as ArrayBuffer], { type: 'application/pdf' })
}

async function createPhotoGrid(files: File[], options: PhotoGridOptions, offsets: PhotoGridOffsets = {}): Promise<ProcessedFile> {
  const ratioMap: Record<PhotoGridOptions['aspectRatio'], number> = {
    '1:1': 1,
    '4:5': 4 / 5,
    '16:9': 16 / 9,
    '9:16': 9 / 16,
  }
  const outputWidth = 1600
  const outputHeight = Math.round(outputWidth / ratioMap[options.aspectRatio])
  const canvas = document.createElement('canvas')
  canvas.width = outputWidth
  canvas.height = outputHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Your browser does not support Canvas processing.')
  if (options.background === 'transparent') {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  } else {
    ctx.fillStyle = options.background
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  const slots = options.columns * options.rows
  const images = await Promise.all(files.slice(0, slots).map(loadBitmap))
  const gap = options.spacing
  const border = options.border
  const cellWidth = (outputWidth - border * 2 - gap * (options.columns - 1)) / options.columns
  const cellHeight = (outputHeight - border * 2 - gap * (options.rows - 1)) / options.rows
  images.forEach((image, index) => {
    const column = index % options.columns
    const row = Math.floor(index / options.columns)
    const x = border + column * (cellWidth + gap)
    const y = border + row * (cellHeight + gap)
    const offset = offsets[index] ?? { x: 0, y: 0 }
    drawRoundedImage(ctx, image, x, y, cellWidth, cellHeight, options.radius, offset.x, offset.y)
  })
  const blob = await canvasToBlob(canvas, 'image/png', 0.95)
  return {
    blob,
    size: blob.size,
    url: URL.createObjectURL(blob),
    name: 'nanoimage-photo-grid.png',
  }
}

function createCollageItems(count: number, template: CollageOptions['template']): CollageItem[] {
  const base = [
    { x: 6, y: 8, width: 32, height: 32, rotate: -7 },
    { x: 34, y: 8, width: 30, height: 40, rotate: 2 },
    { x: 64, y: 12, width: 28, height: 32, rotate: 6 },
    { x: 9, y: 46, width: 29, height: 36, rotate: 3 },
    { x: 39, y: 51, width: 27, height: 34, rotate: -3 },
    { x: 66, y: 49, width: 26, height: 34, rotate: 4 },
    { x: 4, y: 64, width: 22, height: 25, rotate: -5 },
    { x: 76, y: 65, width: 20, height: 23, rotate: 8 },
  ]
  const square = [
    { x: 4, y: 4, width: 44, height: 44, rotate: 0 },
    { x: 52, y: 4, width: 44, height: 44, rotate: 0 },
    { x: 4, y: 52, width: 44, height: 44, rotate: 0 },
    { x: 52, y: 52, width: 44, height: 44, rotate: 0 },
  ]
  const film = [
    { x: 5, y: 12, width: 28, height: 76, rotate: 0 },
    { x: 36, y: 12, width: 28, height: 76, rotate: 0 },
    { x: 67, y: 12, width: 28, height: 76, rotate: 0 },
  ]
  const source = template === 'square' || template === 'minimal' ? square : template === 'film' ? film : base
  return Array.from({ length: count }, (_, index) => {
    const item = source[index % source.length]
    const offset = Math.floor(index / source.length) * 4
    return {
      id: index + 1,
      fileIndex: index,
      x: clamp(item.x + offset, 0, 88),
      y: clamp(item.y + offset, 0, 88),
      width: item.width,
      height: item.height,
      rotate: template === 'classic' || template === 'square' || template === 'minimal' ? 0 : item.rotate,
    }
  })
}

async function createImageCollage(files: File[], options: CollageOptions, items: CollageItem[]): Promise<ProcessedFile> {
  const canvas = document.createElement('canvas')
  canvas.width = clamp(Math.round(options.width), 300, 2400)
  canvas.height = clamp(Math.round(options.height), 300, 2400)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Your browser does not support Canvas processing.')
  ctx.fillStyle = options.background
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.globalAlpha = 0.18
  ctx.strokeStyle = '#d7c8b8'
  for (let x = 0; x < canvas.width; x += 54) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()
  }
  for (let y = 0; y < canvas.height; y += 54) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
    ctx.stroke()
  }
  ctx.restore()
  const bitmaps = await Promise.all(files.map(loadBitmap))
  items.forEach((item) => {
    const image = bitmaps[item.fileIndex]
    if (!image) return
    const x = canvas.width * (item.x / 100)
    const y = canvas.height * (item.y / 100)
    const width = canvas.width * (item.width / 100)
    const height = canvas.height * (item.height / 100)
    ctx.save()
    ctx.translate(x + width / 2, y + height / 2)
    ctx.rotate((item.rotate * Math.PI) / 180)
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = 'rgba(39, 25, 84, 0.22)'
    ctx.shadowBlur = 24
    ctx.shadowOffsetY = 10
    const frame = Math.max(8, options.spacing * 0.6)
    roundedRectPath(ctx, -width / 2 - frame, -height / 2 - frame, width + frame * 2, height + frame * 2 + (options.template === 'polaroid' ? frame * 2 : 0), options.radius)
    ctx.fill()
    ctx.shadowColor = 'transparent'
    roundedRectPath(ctx, -width / 2, -height / 2, width, height, options.radius)
    ctx.clip()
    const scale = Math.max(width / image.width, height / image.height)
    const drawWidth = image.width * scale
    const drawHeight = image.height * scale
    ctx.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)
    ctx.restore()
  })
  if (options.text.trim()) {
    ctx.save()
    ctx.fillStyle = '#7d5c73'
    ctx.font = `700 ${Math.max(28, canvas.width * 0.035)}px "Comic Sans MS", "Trebuchet MS", cursive`
    ctx.textAlign = 'center'
    ctx.fillText(options.text, canvas.width / 2, canvas.height * 0.88)
    ctx.restore()
  }
  if (options.sticker) {
    ctx.save()
    ctx.font = `${Math.max(54, canvas.width * 0.075)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`
    ctx.fillText(options.sticker, canvas.width * 0.88, canvas.height * 0.88)
    ctx.fillText('♡', canvas.width * 0.72, canvas.height * 0.16)
    ctx.restore()
  }
  const blob = await canvasToBlob(canvas, 'image/png', 0.95)
  return {
    blob,
    size: blob.size,
    url: URL.createObjectURL(blob),
    name: 'nanoimage-collage.png',
  }
}

async function createGif(files: File[], options: GifOptions) {
  const width = clamp(Math.round(options.width), 64, 1920)
  const height = clamp(Math.round(options.height), 64, 1920)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('Your browser does not support Canvas processing.')
  const frames: Uint8Array[] = []
  for (const file of files.slice(0, 50)) {
    const image = await loadBitmap(file)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
    drawFittedImage(ctx, image, width, height, options.fit)
    frames.push(indexGifPixels(ctx.getImageData(0, 0, width, height).data, options.colors))
  }
  const bytes: number[] = []
  writeAscii(bytes, 'GIF89a')
  writeShort(bytes, width)
  writeShort(bytes, height)
  bytes.push(0xf7, 0, 0)
  writeGifPalette(bytes)
  writeAscii(bytes, '!\xff\x0bNETSCAPE2.0\x03\x01')
  writeShort(bytes, options.loop === 'forever' ? 0 : options.loop === 'three' ? 3 : 1)
  bytes.push(0)
  const delay = clamp(Math.round(options.frameDuration * 100), 1, 200)
  frames.forEach((pixels) => {
    writeAscii(bytes, '!\xf9\x04')
    bytes.push(0x08)
    writeShort(bytes, delay)
    bytes.push(0, 0)
    bytes.push(0x2c)
    writeShort(bytes, 0)
    writeShort(bytes, 0)
    writeShort(bytes, width)
    writeShort(bytes, height)
    bytes.push(0)
    bytes.push(8)
    writeSubBlocks(bytes, lzwEncodeGif(pixels))
  })
  bytes.push(0x3b)
  return new Blob([new Uint8Array(bytes)], { type: 'image/gif' })
}

function drawFittedImage(ctx: CanvasRenderingContext2D, image: ImageBitmap, width: number, height: number, fit: GifOptions['fit']) {
  if (fit === 'stretch') {
    ctx.drawImage(image, 0, 0, width, height)
    return
  }
  const scale = fit === 'cover' ? Math.max(width / image.width, height / image.height) : Math.min(width / image.width, height / image.height)
  const drawWidth = image.width * scale
  const drawHeight = image.height * scale
  ctx.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
}

function indexGifPixels(data: Uint8ClampedArray, colors: number) {
  const indexed = new Uint8Array(data.length / 4)
  const bucketSize = Math.max(1, Math.floor(256 / clamp(colors, 32, 256)))
  for (let source = 0, target = 0; source < data.length; source += 4, target += 1) {
    const r = data[source + 3] < 8 ? 255 : data[source]
    const g = data[source + 3] < 8 ? 255 : data[source + 1]
    const b = data[source + 3] < 8 ? 255 : data[source + 2]
    const index = ((r & 0xe0) | ((g & 0xe0) >> 3) | (b >> 6))
    indexed[target] = Math.floor(index / bucketSize) * bucketSize
  }
  return indexed
}

function writeGifPalette(bytes: number[]) {
  for (let index = 0; index < 256; index += 1) {
    bytes.push(index & 0xe0, (index & 0x1c) << 3, (index & 0x03) << 6)
  }
}

function lzwEncodeGif(pixels: Uint8Array) {
  const clearCode = 256
  const endCode = 257
  const output: number[] = []
  let bitBuffer = 0
  let bitCount = 0
  const codeSize = 9
  const writeCode = (code: number) => {
    bitBuffer |= code << bitCount
    bitCount += codeSize
    while (bitCount >= 8) {
      output.push(bitBuffer & 0xff)
      bitBuffer >>= 8
      bitCount -= 8
    }
  }

  // Use a conservative GIF LZW stream: emit raw palette indexes and reset
  // frequently before decoders increase the code size. It is larger but avoids
  // corrupted/black frames from incomplete dictionary compression.
  writeCode(clearCode)
  let codesSinceClear = 0
  for (const pixel of pixels) {
    if (codesSinceClear >= 240) {
      writeCode(clearCode)
      codesSinceClear = 0
    }
    writeCode(pixel)
    codesSinceClear += 1
  }
  writeCode(endCode)
  if (bitCount > 0) output.push(bitBuffer & 0xff)
  return output
}

function writeSubBlocks(bytes: number[], data: number[]) {
  for (let index = 0; index < data.length; index += 255) {
    const chunk = data.slice(index, index + 255)
    bytes.push(chunk.length, ...chunk)
  }
  bytes.push(0)
}

function writeAscii(bytes: number[], value: string) {
  for (let index = 0; index < value.length; index += 1) bytes.push(value.charCodeAt(index) & 0xff)
}

function writeShort(bytes: number[], value: number) {
  bytes.push(value & 0xff, (value >> 8) & 0xff)
}

function drawRoundedImage(ctx: CanvasRenderingContext2D, image: ImageBitmap, x: number, y: number, width: number, height: number, radius: number, offsetX = 0, offsetY = 0) {
  const scale = Math.max(width / image.width, height / image.height)
  const drawWidth = image.width * scale
  const drawHeight = image.height * scale
  const maxShiftX = Math.max(0, (drawWidth - width) / 2)
  const maxShiftY = Math.max(0, (drawHeight - height) / 2)
  const drawX = x + (width - drawWidth) / 2 + (clamp(offsetX, -100, 100) / 100) * maxShiftX
  const drawY = y + (height - drawHeight) / 2 + (clamp(offsetY, -100, 100) / 100) * maxShiftY
  ctx.save()
  roundedRectPath(ctx, x, y, width, height, Math.min(radius, width / 2, height / 2))
  ctx.clip()
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight)
  ctx.restore()
}

function roundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

async function loadBitmap(file: File): Promise<ImageBitmap> {
  return createImageBitmap(file)
}

async function loadBitmapFromDataUrl(dataUrl: string): Promise<ImageBitmap> {
  const response = await fetch(dataUrl)
  const blob = await response.blob()
  return createImageBitmap(blob)
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Unable to read this watermark image.'))
    reader.readAsDataURL(file)
  })
}

async function fileFromDataUrl(dataUrl: string, name: string) {
  const response = await fetch(dataUrl)
  const blob = await response.blob()
  return new File([blob], name, { type: blob.type || 'image/svg+xml' })
}

function memeTemplateDataUrl(name: string, color: string, emoji: string) {
  const escapedName = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${color}" offset="0"/><stop stop-color="#ffffff" offset="1"/></linearGradient></defs><rect width="1200" height="900" fill="url(#g)"/><circle cx="600" cy="430" r="230" fill="rgba(255,255,255,.42)"/><text x="600" y="485" text-anchor="middle" font-size="230" font-family="Apple Color Emoji, Segoe UI Emoji">${emoji}</text><text x="600" y="820" text-anchor="middle" fill="rgba(35,28,73,.42)" font-size="52" font-family="Arial Black, sans-serif">${escapedName}</text></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function canvasToBlob(canvas: HTMLCanvasElement, type: OutputFormat, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Canvas export failed. Please try a different image or format.'))
    }, type, quality)
  })
}

async function compressedCanvasToBlob(canvas: HTMLCanvasElement, type: OutputFormat, quality: number, originalFile: File, allowOriginalFallback = true) {
  let best = await canvasToBlob(canvas, type, quality)
  if (best.size <= originalFile.size) return best
  if (type !== 'image/png') {
    const qualitySteps = [quality, 0.92, 0.86, 0.8, 0.72, 0.64, 0.56, 0.48, 0.4, 0.35]
      .map((value) => Math.min(value, quality))
      .filter((value, index, values) => value >= 0.35 && values.indexOf(value) === index)
      .sort((left, right) => right - left)
    for (const nextQuality of qualitySteps) {
      const nextBlob = await canvasToBlob(canvas, type, nextQuality)
      if (nextBlob.size < best.size) best = nextBlob
      if (nextBlob.size <= originalFile.size) return nextBlob
    }
  }
  return best.size <= originalFile.size || !allowOriginalFallback ? best : originalFile
}

function isSameImageMime(format: OutputFormat, fileType: string) {
  if (format === fileType) return true
  return format === 'image/jpeg' && (fileType === 'image/jpg' || fileType === 'image/jpeg')
}

// ─────────────────────────────────────────────────────────────────────────────
// Video to GIF
// ─────────────────────────────────────────────────────────────────────────────

type GifVideoOptions = {
  width: number
  fps: number
  quality: 'low' | 'medium' | 'high'
  loop: 'forever' | 'once' | 'custom'
  loopCount: number
  dither: boolean
  colors: 64 | 128 | 256
  speed: 0.5 | 1 | 2
  reverse: boolean
}

export function VideoToGifPage({ tool, navigate }: { tool: Tool; navigate: (to: string) => void }) {
  const { t } = useI18n()
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoDuration, setVideoDuration] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(5)
  const [thumbnails, setThumbnails] = useState<string[]>([])
  const [status, setStatus] = useState('')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [resultUrl, setResultUrl] = useState('')
  const [resultSize, setResultSize] = useState(0)
  const [converting, setConverting] = useState(false)
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [options, setOptions] = useState<GifVideoOptions>({
    width: 480,
    fps: 10,
    quality: 'high',
    loop: 'forever',
    loopCount: 3,
    dither: false,
    colors: 256,
    speed: 1,
    reverse: false,
  })
  const videoRef = useRef<HTMLVideoElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef(false)

  const handleVideoUpload = (files: File[]) => {
    const file = files.find((f) => f.type.startsWith('video/'))
    if (!file) { setError(t.videoGif.errorNotVideo); return }
    if (file.size > 100 * 1024 * 1024) { setError(t.videoGif.errorTooLarge); return }
    setError('')
    setResultUrl('')
    setResultSize(0)
    setStatus('')
    setProgress(0)
    if (videoUrl) URL.revokeObjectURL(videoUrl)
    const url = URL.createObjectURL(file)
    setVideoFile(file)
    setVideoUrl(url)
    setThumbnails([])
  }

  const seekVideo = (video: HTMLVideoElement, time: number) =>
    new Promise<void>((resolve) => {
      const onSeeked = () => { video.removeEventListener('seeked', onSeeked); resolve() }
      video.addEventListener('seeked', onSeeked)
      video.currentTime = time
    })

  async function generateThumbnails(video: HTMLVideoElement, dur: number) {
    const count = 12
    const canvas = document.createElement('canvas')
    canvas.width = 120
    canvas.height = 68
    const ctx = canvas.getContext('2d')!
    const thumbs: string[] = []
    for (let i = 0; i < count; i++) {
      const t = (i / (count - 1)) * dur
      await seekVideo(video, t)
      ctx.drawImage(video, 0, 0, 120, 68)
      thumbs.push(canvas.toDataURL('image/jpeg', 0.6))
    }
    setThumbnails(thumbs)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!videoUrl || !videoRef.current) return
    const video = videoRef.current
    const onMeta = async () => {
      const dur = video.duration
      if (!isFinite(dur) || dur <= 0) { setError(t.videoGif.errorCannotRead); return }
      if (dur > 60) { setError(t.videoGif.errorTooLong); return }
      setVideoDuration(dur)
      setStartTime(0)
      setEndTime(Math.min(5, dur))
      setError('')
      await generateThumbnails(video, dur)
    }
    video.addEventListener('loadedmetadata', onMeta)
    return () => video.removeEventListener('loadedmetadata', onMeta)
  }, [videoUrl])

  const updateOption = <K extends keyof GifVideoOptions>(key: K, value: GifVideoOptions[K]) =>
    setOptions((prev) => ({ ...prev, [key]: value }))

  const clipDuration = endTime - startTime
  const clipTooLong = clipDuration > 15
  const frameCount = Math.ceil(clipDuration * options.fps / options.speed)

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current || !videoDuration) return
    const rect = timelineRef.current.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const t = ratio * videoDuration
    if (videoRef.current) videoRef.current.currentTime = t
  }

  const convertToGif = async () => {
    if (!videoRef.current || !videoFile || clipTooLong) return
    setConverting(true)
    setError('')
    setResultUrl('')
    cancelRef.current = false

    try {
      const gifenc = await import('gifenc')
      const video = videoRef.current
      const outWidth = options.width
      const aspectRatio = video.videoHeight / video.videoWidth
      const outHeight = Math.round(outWidth * aspectRatio)
      const canvas = document.createElement('canvas')
      canvas.width = outWidth
      canvas.height = outHeight
      const ctx = canvas.getContext('2d')!

      const loopCount = options.loop === 'forever' ? 0 : options.loop === 'once' ? 1 : options.loopCount
      const encoder = gifenc.GIFEncoder()
      const delayMs = Math.round((1000 / options.fps) * options.speed)
      const colorCount = options.colors

      setStatus(t.videoGif.progressReading)
      const times: number[] = []
      for (let i = 0; i < frameCount; i++) {
        if (cancelRef.current) { setStatus(t.videoGif.cancelled); setConverting(false); return }
        const frameFraction = i / Math.max(frameCount - 1, 1)
        times.push(startTime + frameFraction * clipDuration)
      }

      const orderedTimes = options.reverse ? [...times].reverse() : times

      for (let i = 0; i < orderedTimes.length; i++) {
        if (cancelRef.current) { setStatus(t.videoGif.cancelled); setConverting(false); return }
        await seekVideo(video, orderedTimes[i])
        ctx.drawImage(video, 0, 0, outWidth, outHeight)
        const imageData = ctx.getImageData(0, 0, outWidth, outHeight)
        const palette = gifenc.quantize(imageData.data, colorCount, { format: 'rgb565' })
        const indexed = gifenc.applyPalette(imageData.data, palette)
        encoder.writeFrame(indexed, outWidth, outHeight, { palette, delay: delayMs, repeat: loopCount })
        setProgress(Math.round(((i + 1) / orderedTimes.length) * 100))
        setStatus(t.videoGif.progressEncoding.replace('{current}', String(i + 1)).replace('{total}', String(orderedTimes.length)))
      }

      encoder.finish()
      const bytes = encoder.bytes()
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'image/gif' })
      setResultUrl(URL.createObjectURL(blob))
      setResultSize(blob.size)
      setStatus(t.videoGif.resultTitle)
    } catch (err) {
      setError(t.videoGif.errorGifFailed)
      console.error(err)
    } finally {
      setConverting(false)
      setProgress(0)
    }
  }

  const previewGif = async () => {
    if (!videoRef.current || clipTooLong) return
    const prevStart = startTime
    const prevEnd = Math.min(startTime + 3, endTime)
    const shortOptions = { ...options, fps: Math.min(options.fps, 8), width: Math.min(options.width, 320) }
    setStatus(t.videoGif.progressGenerating)
    setError('')
    try {
      const gifenc = await import('gifenc')
      const video = videoRef.current
      const outWidth = shortOptions.width
      const aspectRatio = video.videoHeight / video.videoWidth
      const outHeight = Math.round(outWidth * aspectRatio)
      const canvas = document.createElement('canvas')
      canvas.width = outWidth
      canvas.height = outHeight
      const ctx = canvas.getContext('2d')!
      const previewFrameCount = Math.min(Math.ceil((prevEnd - prevStart) * shortOptions.fps), 20)
      const encoder = gifenc.GIFEncoder()
      const delayMs = Math.round(1000 / shortOptions.fps)
      for (let i = 0; i < previewFrameCount; i++) {
        const t = prevStart + (i / Math.max(previewFrameCount - 1, 1)) * (prevEnd - prevStart)
        await seekVideo(video, t)
        ctx.drawImage(video, 0, 0, outWidth, outHeight)
        const imageData = ctx.getImageData(0, 0, outWidth, outHeight)
        const palette = gifenc.quantize(imageData.data, 128, { format: 'rgb565' })
        const indexed = gifenc.applyPalette(imageData.data, palette)
        encoder.writeFrame(indexed, outWidth, outHeight, { palette, delay: delayMs, repeat: 0 })
      }
      encoder.finish()
      const gifBytes = encoder.bytes()
      const blob = new Blob([gifBytes.buffer as ArrayBuffer], { type: 'image/gif' })
      setResultUrl(URL.createObjectURL(blob))
      setResultSize(blob.size)
      setStatus(t.videoGif.resultPreviewNote)
    } catch { setError(t.videoGif.errorPreviewFailed) }
  }

  const reset = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl)
    if (resultUrl) URL.revokeObjectURL(resultUrl)
    setVideoFile(null)
    setVideoUrl('')
    setVideoDuration(0)
    setStartTime(0)
    setEndTime(5)
    setThumbnails([])
    setStatus('')
    setError('')
    setResultUrl('')
    setResultSize(0)
    setProgress(0)
  }

  const fmtTime = (s: number) => {
    const mm = String(Math.floor(s / 60)).padStart(2, '0')
    const ss = String(Math.floor(s % 60)).padStart(2, '0')
    const ms = String(Math.floor((s % 1) * 10)).padStart(1, '0')
    return `${mm}:${ss}.${ms}`
  }

  const startPct = videoDuration ? (startTime / videoDuration) * 100 : 0
  const endPct = videoDuration ? (endTime / videoDuration) * 100 : 100

  const qualityMap = { low: t.videoGif.qualityLow, medium: t.videoGif.qualityMedium, high: t.videoGif.qualityHigh }

  return (
    <div className="video-tool-layout">
      {/* Hidden video element */}
      {videoUrl && <video ref={videoRef} src={videoUrl} preload="auto" style={{ display: 'none' }} />}

      {/* Left / Main column */}
      <div className="video-main-col">
        <Breadcrumbs current={tool.name} navigate={navigate} />

        {/* Header */}
        <div className="video-page-header">
          <h1>{t.videoGif.title}</h1>
          <p>{t.videoGif.subtitle}</p>
          <div className="video-trust-row">
            <span><HomeIcon name="shield" /> {t.videoGif.trustNoUploads}</span>
            <span><HomeIcon name="lock" /> {t.videoGif.trust100Private}</span>
            <span><HomeIcon name="bolt" /> {t.videoGif.trustFree}</span>
          </div>
        </div>

        {/* Step 1: Upload */}
        <div className="video-step-card">
          <div className="video-step-label"><span className="step-badge">1</span> {t.videoGif.step1}</div>
          {!videoFile ? (
            <VideoDropzone onFiles={handleVideoUpload} accept="video/mp4,video/webm,video/quicktime" hint={t.videoGif.dropzoneHint} note={t.videoGif.dropzoneNote} />
          ) : (
            <div className="video-uploaded-row">
              <HomeIcon name="play" />
              <div>
                <strong>{videoFile.name}</strong>
                <small>{(videoFile.size / 1024 / 1024).toFixed(1)} MB · {fmtTime(videoDuration)}</small>
              </div>
              <button type="button" className="secondary small" onClick={reset}>{t.videoGif.remove}</button>
            </div>
          )}
        </div>

        {/* Step 2: Select clip */}
        {videoFile && (
          <div className="video-step-card">
            <div className="video-step-label">
              <span className="step-badge">2</span> {t.videoGif.step2}
              {clipTooLong && <span className="clip-limit-badge">{t.videoGif.clipLimitBadge}</span>}
            </div>

            {/* Timeline */}
            <div className="video-timeline-wrap">
              <div className="video-timeline" ref={timelineRef} onClick={handleTimelineClick}>
                <div className="timeline-thumbs">
                  {thumbnails.map((src, i) => (
                    <img key={i} src={src} alt="" />
                  ))}
                  {!thumbnails.length && <div className="timeline-loading">{t.videoGif.timelineLoading}</div>}
                </div>
                {/* Selected range highlight */}
                <div className="timeline-range" style={{ left: `${startPct}%`, width: `${endPct - startPct}%` }} />
                {/* Start handle */}
                <div
                  className="timeline-handle start"
                  style={{ left: `${startPct}%` }}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId)
                    const rect = timelineRef.current!.getBoundingClientRect()
                    const onMove = (ev: PointerEvent) => {
                      const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width))
                      const t = Math.min(ratio * videoDuration, endTime - 0.5)
                      setStartTime(Math.max(0, t))
                    }
                    const onUp = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
                    window.addEventListener('pointermove', onMove)
                    window.addEventListener('pointerup', onUp)
                  }}
                >
                  <span className="handle-time">{fmtTime(startTime)}</span>
                </div>
                {/* End handle */}
                <div
                  className="timeline-handle end"
                  style={{ left: `${endPct}%` }}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId)
                    const rect = timelineRef.current!.getBoundingClientRect()
                    const onMove = (ev: PointerEvent) => {
                      const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width))
                      const t = Math.max(ratio * videoDuration, startTime + 0.5)
                      setEndTime(Math.min(videoDuration, t))
                    }
                    const onUp = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
                    window.addEventListener('pointermove', onMove)
                    window.addEventListener('pointerup', onUp)
                  }}
                >
                  <span className="handle-time">{fmtTime(endTime)}</span>
                </div>
                {/* Playhead */}
              </div>
              <div className="timeline-ticks">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span key={i}>{fmtTime((i / 6) * videoDuration)}</span>
                ))}
              </div>
            </div>

            <div className="video-time-inputs">
              <label>{t.videoGif.labelStart}<input type="number" min={0} max={endTime - 0.1} step={0.1} value={startTime.toFixed(1)} onChange={(e) => setStartTime(Math.max(0, Math.min(Number(e.target.value), endTime - 0.1)))} /></label>
              <label>{t.videoGif.labelEnd}<input type="number" min={startTime + 0.1} max={videoDuration} step={0.1} value={endTime.toFixed(1)} onChange={(e) => setEndTime(Math.min(videoDuration, Math.max(Number(e.target.value), startTime + 0.1)))} /></label>
              <label>{t.videoGif.labelDuration}<input type="text" readOnly value={fmtTime(clipDuration)} /></label>
            </div>

            {clipTooLong && <p className="video-clip-error">{t.videoGif.clipLimitError}</p>}
            <p className="video-tip-note"><HomeIcon name="sparkle" /> {t.videoGif.tipShortClip}</p>
          </div>
        )}

        {/* Step 3: Convert */}
        {videoFile && (
          <div className="video-step-card">
            <div className="video-step-label"><span className="step-badge">3</span> {t.videoGif.step3}</div>
            {converting ? (
              <div className="video-progress">
                <div className="video-progress-bar"><div style={{ width: `${progress}%` }} /></div>
                <p>{status}</p>
                <button type="button" className="secondary" onClick={() => { cancelRef.current = true }}>{t.videoGif.cancelBtn}</button>
              </div>
            ) : (
              <div className="video-action-row">
                <button type="button" className="primary" disabled={clipTooLong || !videoDuration} onClick={convertToGif}>
                  <HomeIcon name="sparkle" /> {t.videoGif.convertBtn}
                </button>
                <button type="button" className="secondary" disabled={clipTooLong || !videoDuration} onClick={previewGif}>
                  <HomeIcon name="search" /> {t.videoGif.previewBtn}
                </button>
              </div>
            )}
            <p className="video-privacy-note"><HomeIcon name="lock" /> {t.videoGif.privacyNote}</p>
            {error && <p className="video-error">{error}</p>}
            {status && !converting && <p className="video-status">{status}</p>}
          </div>
        )}

        {/* Result */}
        {resultUrl && (
          <div className="video-result-card">
            <h2>{t.videoGif.resultTitle}</h2>
            <div className="video-result-preview">
              <img src={resultUrl} alt="GIF result" />
            </div>
            <div className="video-result-meta">
              <span>{t.videoGif.resultSize}: {(resultSize / 1024).toFixed(0)} KB</span>
              <span>{t.videoGif.resultDuration}: {fmtTime(clipDuration)}</span>
              <span>{t.videoGif.resultFps}: {options.fps}</span>
              <span>{t.videoGif.resultWidth}: {options.width}px</span>
              <span>{t.videoGif.resultQuality}: {qualityMap[options.quality]}</span>
            </div>
            <div className="video-result-actions">
              <a className="download-button" href={resultUrl} download={`${videoFile?.name.replace(/\.[^.]+$/, '') ?? 'clip'}.gif`}>
                <HomeIcon name="download" /> {t.videoGif.downloadBtn}
              </a>
              <button type="button" className="secondary" onClick={reset}>{t.videoGif.startOver}</button>
            </div>
          </div>
        )}
      </div>

      {/* Right sidebar */}
      <aside className="video-sidebar">
        <div className="video-sidebar-card">
          <h2><HomeIcon name="settings" /> {t.videoGif.optionsTitle}</h2>

          <label className="video-setting-label">
            {t.videoGif.outputSizeLabel}
            <select value={options.width === 320 ? '320' : options.width === 480 ? '480' : options.width === 720 ? '720' : 'custom'} onChange={(e) => { if (e.target.value !== 'custom') updateOption('width', Number(e.target.value)) }}>
              <option value="320">320px</option>
              <option value="480">480px (Recommended)</option>
              <option value="720">720px Max</option>
              <option value="custom">{t.videoGif.outputSizeCustom}</option>
            </select>
            <div className="video-custom-width"><input type="number" min={120} max={720} value={options.width} onChange={(e) => updateOption('width', Math.max(120, Math.min(720, Number(e.target.value))))} /> px</div>
            <small>{t.videoGif.maxWidth}</small>
          </label>

          <label className="video-setting-label">
            {t.videoGif.fpsLabel}
            <select value={options.fps} onChange={(e) => updateOption('fps', Number(e.target.value))}>
              <option value={5}>{t.videoGif.fps5}</option>
              <option value={10}>{t.videoGif.fps10}</option>
              <option value={15}>{t.videoGif.fps15}</option>
            </select>
          </label>

          <label className="video-setting-label">
            {t.videoGif.qualityLabel}
            <select value={options.quality} onChange={(e) => updateOption('quality', e.target.value as GifVideoOptions['quality'])}>
              <option value="low">{t.videoGif.qualityLow}</option>
              <option value="medium">{t.videoGif.qualityMedium}</option>
              <option value="high">{t.videoGif.qualityHigh}</option>
            </select>
          </label>

          <label className="video-setting-label">
            {t.videoGif.loopLabel}
            <select value={options.loop} onChange={(e) => updateOption('loop', e.target.value as GifVideoOptions['loop'])}>
              <option value="forever">{t.videoGif.loopForever}</option>
              <option value="once">{t.videoGif.loopOnce}</option>
              <option value="custom">{t.videoGif.loopCustom}</option>
            </select>
          </label>

          {options.loop === 'custom' && (
            <label className="video-setting-label">
              {t.videoGif.loopCountLabel}
              <input type="number" min={1} max={99} value={options.loopCount} onChange={(e) => updateOption('loopCount', Number(e.target.value))} />
            </label>
          )}

          <div className="video-fps-hint"><HomeIcon name="sparkle" /> {t.videoGif.fpsHint}</div>

          <button type="button" className="video-advanced-toggle" onClick={() => setAdvancedOpen((o) => !o)}>
            {t.videoGif.advancedToggle} {advancedOpen ? '▲' : '▼'}
          </button>
          {advancedOpen && (
            <div className="video-advanced">
              <label className="checkbox-row"><input type="checkbox" checked={options.dither} onChange={(e) => updateOption('dither', e.target.checked)} /> {t.videoGif.advancedDither}</label>
              <label className="video-setting-label">{t.videoGif.advancedColors}
                <select value={options.colors} onChange={(e) => updateOption('colors', Number(e.target.value) as GifVideoOptions['colors'])}>
                  <option value={64}>64</option>
                  <option value={128}>128</option>
                  <option value={256}>256</option>
                </select>
              </label>
              <label className="video-setting-label">{t.videoGif.advancedSpeed}
                <select value={options.speed} onChange={(e) => updateOption('speed', Number(e.target.value) as GifVideoOptions['speed'])}>
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={2}>2x</option>
                </select>
              </label>
              <label className="checkbox-row"><input type="checkbox" checked={options.reverse} onChange={(e) => updateOption('reverse', e.target.checked)} /> {t.videoGif.advancedReverse}</label>
            </div>
          )}
        </div>

        <div className="video-sidebar-card">
          <h2><HomeIcon name="info" /> {t.videoGif.limitsTitle}</h2>
          <ul className="video-limits-list">
            {t.videoGif.limits.map((item, i) => (
              <li key={i}><HomeIcon name="check" /> {item}</li>
            ))}
          </ul>
        </div>

        <div className="video-sidebar-card privacy">
          <HomeIcon name="shield" />
          <h3>{t.videoGif.privacyTitle}</h3>
          <p>{t.videoGif.privacyText}</p>
        </div>
      </aside>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Video to MP3
// ─────────────────────────────────────────────────────────────────────────────

type Mp3AudioOptions = {
  format: 'mp3'
  quality: 96 | 128 | 192 | 256 | 320
  channels: 'stereo' | 'mono'
  normalizeVolume: boolean
  fadeIn: boolean
  fadeOut: boolean
  sampleRate: 44100 | 48000
}

export function VideoToMp3Page({ tool, navigate }: { tool: Tool; navigate: (to: string) => void }) {
  const { t } = useI18n()
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoDuration, setVideoDuration] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [thumbnails, setThumbnails] = useState<string[]>([])
  const [status, setStatus] = useState('')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [resultUrl, setResultUrl] = useState('')
  const [resultSize, setResultSize] = useState(0)
  const [resultDuration, setResultDuration] = useState(0)
  const [resultFormat, setResultFormat] = useState<'mp3' | 'wav'>('mp3')
  const [converting, setConverting] = useState(false)
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [options, setOptions] = useState<Mp3AudioOptions>({
    format: 'mp3',
    quality: 192,
    channels: 'stereo',
    normalizeVolume: false,
    fadeIn: false,
    fadeOut: false,
    sampleRate: 44100,
  })
  const videoRef = useRef<HTMLVideoElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef(false)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const handleVideoUpload = (files: File[]) => {
    const file = files.find((f) => f.type.startsWith('video/') || f.type === 'audio/mpeg' || f.type.includes('audio'))
    if (!file) { setError(t.videoMp3.errorNotVideo); return }
    if (file.size > 200 * 1024 * 1024) { setError(t.videoMp3.errorTooLarge); return }
    setError('')
    setResultUrl('')
    setResultSize(0)
    setStatus('')
    setProgress(0)
    if (videoUrl) URL.revokeObjectURL(videoUrl)
    const url = URL.createObjectURL(file)
    setVideoFile(file)
    setVideoUrl(url)
    setThumbnails([])
  }

  const seekVideoMp3 = (video: HTMLVideoElement, time: number) =>
    new Promise<void>((resolve) => {
      const onSeeked = () => { video.removeEventListener('seeked', onSeeked); resolve() }
      video.addEventListener('seeked', onSeeked)
      video.currentTime = time
    })

  async function generateThumbnailsMp3(video: HTMLVideoElement, dur: number) {
    const count = 12
    const canvas = document.createElement('canvas')
    canvas.width = 120
    canvas.height = 68
    const ctx = canvas.getContext('2d')!
    const thumbs: string[] = []
    for (let i = 0; i < count; i++) {
      const t = (i / (count - 1)) * dur
      await seekVideoMp3(video, t)
      ctx.drawImage(video, 0, 0, 120, 68)
      thumbs.push(canvas.toDataURL('image/jpeg', 0.6))
    }
    setThumbnails(thumbs)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!videoUrl || !videoRef.current) return
    const video = videoRef.current
    const onMeta = async () => {
      const dur = video.duration
      if (!isFinite(dur) || dur <= 0) { setError(t.videoMp3.errorCannotExtract); return }
      if (dur > 600) { setError(t.videoMp3.errorTooLong); return }
      setVideoDuration(dur)
      setStartTime(0)
      setEndTime(dur)
      setError('')
      await generateThumbnailsMp3(video, dur)
    }
    video.addEventListener('loadedmetadata', onMeta)
    return () => video.removeEventListener('loadedmetadata', onMeta)
  }, [videoUrl])

  const updateOption = <K extends keyof Mp3AudioOptions>(key: K, value: Mp3AudioOptions[K]) =>
    setOptions((prev) => ({ ...prev, [key]: value }))

  // Pure-JS WAV encoder — no external library, always works
  const encodeWAV = (audioBuffer: AudioBuffer, startSample: number, endSample: number, numChannels: number): Blob => {
    const length = endSample - startSample
    const sampleRate = audioBuffer.sampleRate
    const byteCount = length * numChannels * 2 // 16-bit PCM
    const wavBuf = new ArrayBuffer(44 + byteCount)
    const view = new DataView(wavBuf)
    const ws = (off: number, s: string) => { for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i)) }
    ws(0, 'RIFF'); view.setUint32(4, 36 + byteCount, true)
    ws(8, 'WAVE'); ws(12, 'fmt '); view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)          // PCM
    view.setUint16(22, numChannels, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * numChannels * 2, true)
    view.setUint16(32, numChannels * 2, true)
    view.setUint16(34, 16, true)
    ws(36, 'data'); view.setUint32(40, byteCount, true)
    let off = 44
    for (let i = 0; i < length; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        const s = Math.max(-1, Math.min(1, audioBuffer.getChannelData(ch)[startSample + i]))
        view.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
        off += 2
      }
    }
    return new Blob([wavBuf], { type: 'audio/wav' })
  }

  const convertToMp3 = async () => {
    if (!videoFile || !videoRef.current) return
    setConverting(true)
    setError('')
    setResultUrl('')
    cancelRef.current = false

    try {
      setStatus(t.videoMp3.statusDecoding)
      setProgress(10)

      // Decode audio via Web Audio API
      const arrayBuffer = await videoFile.arrayBuffer()
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioContext()
      }
      const audioCtx = audioCtxRef.current
      if (audioCtx.state === 'suspended') await audioCtx.resume()

      let audioBuffer: AudioBuffer
      try {
        // Support both Promise-based (modern) and callback-based (legacy Safari) APIs
        audioBuffer = await new Promise<AudioBuffer>((resolve, reject) => {
          const p = audioCtx.decodeAudioData(arrayBuffer,
            (buf) => resolve(buf),
            (err) => reject(err ?? new Error('decodeAudioData failed'))
          )
          if (p) p.then(resolve).catch(reject)
        })
      } catch (decodeErr) {
        console.error('[VideoToMp3] decodeAudioData failed:', decodeErr)
        setError(t.videoMp3.errorCannotExtract)
        setConverting(false)
        return
      }

      if (cancelRef.current) { setStatus(t.videoMp3.cancelled); setConverting(false); return }
      setStatus(t.videoMp3.statusProcessing)
      setProgress(40)

      const clip_start = startTime
      const clip_end = endTime
      const clipDur = clip_end - clip_start
      const sampleRate = audioBuffer.sampleRate
      const startSample = Math.floor(clip_start * sampleRate)
      const endSample = Math.min(Math.floor(clip_end * sampleRate), audioBuffer.length)
      const numSamples = endSample - startSample

      if (numSamples <= 0) throw new Error('No audio samples in selected range.')

      const outChannels = options.channels === 'stereo' ? Math.min(audioBuffer.numberOfChannels, 2) : 1

      setStatus(t.videoMp3.statusEncoding)
      setProgress(60)

      // Try MP3 encoding via lamejs; fall back to WAV if it fails
      let blob: Blob | null = null
      let outputFormat: 'mp3' | 'wav' = 'mp3'

      try {
        const { Mp3Encoder: Mp3EncoderClass } = await import('@breezystack/lamejs')
        if (typeof Mp3EncoderClass !== 'function') throw new Error('Mp3Encoder not found in module')

        const toInt16 = (arr: Float32Array, start: number, end: number): Int16Array => {
          const out = new Int16Array(end - start)
          for (let i = 0; i < out.length; i++) {
            out[i] = Math.max(-32768, Math.min(32767, Math.round(arr[start + i] * 32767)))
          }
          return out
        }

        const leftInt16 = toInt16(audioBuffer.getChannelData(0), startSample, endSample)
        const rightInt16 = outChannels === 2
          ? toInt16(audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : audioBuffer.getChannelData(0), startSample, endSample)
          : leftInt16

        const supportedRates = [8000, 11025, 12000, 16000, 22050, 24000, 32000, 44100, 48000]
        const encRate = supportedRates.reduce((p, c) => Math.abs(c - sampleRate) < Math.abs(p - sampleRate) ? c : p)

        const encoder = new Mp3EncoderClass(outChannels, encRate, options.quality)
        const mp3Chunks: Uint8Array[] = []
        const chunkSize = 1152

        for (let offset = 0; offset < numSamples; offset += chunkSize) {
          if (cancelRef.current) { setStatus(t.videoMp3.cancelled); setConverting(false); return }
          const lc = leftInt16.subarray(offset, offset + chunkSize)
          const rc = outChannels === 2 ? rightInt16.subarray(offset, offset + chunkSize) : undefined
          const buf = outChannels === 2 ? encoder.encodeBuffer(lc, rc) : encoder.encodeBuffer(lc)
          if (buf.length > 0) mp3Chunks.push(buf)
          if ((offset / chunkSize) % 500 === 0) {
            setProgress(60 + Math.round((offset / numSamples) * 35))
            await new Promise<void>((r) => setTimeout(r, 0))
          }
        }

        const flush = encoder.flush()
        if (flush.length > 0) mp3Chunks.push(flush)

        const total = mp3Chunks.reduce((s, c) => s + c.length, 0)
        if (total === 0) throw new Error('@breezystack/lamejs produced empty output')

        const merged = new Uint8Array(total)
        let mOff = 0
        for (const c of mp3Chunks) { merged.set(c, mOff); mOff += c.length }
        blob = new Blob([merged], { type: 'audio/mpeg' })
        outputFormat = 'mp3'
      } catch (mp3Err) {
        console.warn('[VideoToMp3] MP3 encoding failed, falling back to WAV:', mp3Err)
        // Always-works WAV fallback
        blob = encodeWAV(audioBuffer, startSample, endSample, outChannels)
        outputFormat = 'wav'
      }

      setProgress(98)
      setStatus(t.videoMp3.statusPreparing)

      setResultUrl(URL.createObjectURL(blob))
      setResultSize(blob.size)
      setResultDuration(clipDur)
      setResultFormat(outputFormat)
      setProgress(100)
      setStatus(t.videoMp3.resultTitle)
    } catch (err) {
      console.error('[VideoToMp3] unexpected error:', err)
      setError(t.videoMp3.errorConversionFailed)
    } finally {
      setConverting(false)
    }
  }

  const previewAudio = () => {
    if (!videoRef.current || !videoDuration) return
    const video = videoRef.current
    video.currentTime = startTime
    video.play()
    setTimeout(() => video.pause(), Math.min(10, endTime - startTime) * 1000)
  }

  const reset = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl)
    if (resultUrl) URL.revokeObjectURL(resultUrl)
    setVideoFile(null)
    setVideoUrl('')
    setVideoDuration(0)
    setStartTime(0)
    setEndTime(0)
    setThumbnails([])
    setStatus('')
    setError('')
    setResultUrl('')
    setResultSize(0)
    setResultFormat('mp3')
    setProgress(0)
  }

  const fmtTimeMp3 = (s: number) => {
    const mm = String(Math.floor(s / 60)).padStart(2, '0')
    const ss = String(Math.floor(s % 60)).padStart(2, '0')
    return `${mm}:${ss}`
  }

  const startPct = videoDuration ? (startTime / videoDuration) * 100 : 0
  const endPct = videoDuration ? (endTime / videoDuration) * 100 : 100

  return (
    <div className="video-tool-layout">
      {videoUrl && <video ref={videoRef} src={videoUrl} preload="auto" style={{ display: 'none' }} />}

      {/* Left / Main column */}
      <div className="video-main-col">
        <Breadcrumbs current={tool.name} navigate={navigate} />

        <div className="video-page-header">
          <h1>{t.videoMp3.title} <span aria-hidden="true">🎵</span></h1>
          <p>{t.videoMp3.subtitle}</p>
          <div className="video-trust-row">
            <span><HomeIcon name="shield" /> {t.videoMp3.trustNoUploads}</span>
            <span><HomeIcon name="lock" /> {t.videoMp3.trust100Private}</span>
            <span><HomeIcon name="bolt" /> {t.videoMp3.trustFree}</span>
          </div>
        </div>

        {/* Step 1: Upload */}
        <div className="video-step-card">
          <div className="video-step-label"><span className="step-badge">1</span> {t.videoMp3.step1}</div>
          {!videoFile ? (
            <VideoDropzone onFiles={handleVideoUpload} accept="video/mp4,video/webm,video/quicktime,video/avi,video/*" hint={t.videoMp3.dropzoneHint} />
          ) : (
            <div className="video-uploaded-row">
              <HomeIcon name="play" />
              <div>
                <strong>{videoFile.name}</strong>
                <small>{(videoFile.size / 1024 / 1024).toFixed(1)} MB · {fmtTimeMp3(videoDuration)}</small>
              </div>
              <button type="button" className="secondary small" onClick={reset}>{t.videoMp3.remove}</button>
            </div>
          )}
        </div>

        {/* Step 2: Select audio section */}
        {videoFile && (
          <div className="video-step-card">
            <div className="video-step-label"><span className="step-badge">2</span> {t.videoMp3.step2} <small>{t.videoMp3.step2Optional}</small></div>
            <p className="video-section-desc">{t.videoMp3.step2Desc}</p>

            {/* Timeline */}
            <div className="video-timeline-wrap">
              <div className="video-timeline" ref={timelineRef}>
                <div className="timeline-thumbs">
                  {thumbnails.map((src, i) => <img key={i} src={src} alt="" />)}
                  {!thumbnails.length && <div className="timeline-loading">{t.videoMp3.timelineLoading}</div>}
                </div>
                <div className="timeline-range" style={{ left: `${startPct}%`, width: `${endPct - startPct}%` }} />
                <div
                  className="timeline-handle start"
                  style={{ left: `${startPct}%` }}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId)
                    const rect = timelineRef.current!.getBoundingClientRect()
                    const onMove = (ev: PointerEvent) => {
                      const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width))
                      setStartTime(Math.max(0, Math.min(ratio * videoDuration, endTime - 1)))
                    }
                    const onUp = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
                    window.addEventListener('pointermove', onMove)
                    window.addEventListener('pointerup', onUp)
                  }}
                >
                  <span className="handle-time">{fmtTimeMp3(startTime)}</span>
                </div>
                <div
                  className="timeline-handle end"
                  style={{ left: `${endPct}%` }}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId)
                    const rect = timelineRef.current!.getBoundingClientRect()
                    const onMove = (ev: PointerEvent) => {
                      const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width))
                      setEndTime(Math.min(videoDuration, Math.max(ratio * videoDuration, startTime + 1)))
                    }
                    const onUp = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
                    window.addEventListener('pointermove', onMove)
                    window.addEventListener('pointerup', onUp)
                  }}
                >
                  <span className="handle-time">{fmtTimeMp3(endTime)}</span>
                </div>
              </div>
              <div className="timeline-ticks">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span key={i}>{fmtTimeMp3((i / 6) * videoDuration)}</span>
                ))}
              </div>
            </div>

            <div className="video-time-inputs">
              <label>{t.videoMp3.labelStart}<input type="number" min={0} max={endTime - 1} step={1} value={startTime.toFixed(0)} onChange={(e) => setStartTime(Math.max(0, Math.min(Number(e.target.value), endTime - 1)))} /></label>
              <label>{t.videoMp3.labelEnd}<input type="number" min={startTime + 1} max={videoDuration} step={1} value={endTime.toFixed(0)} onChange={(e) => setEndTime(Math.min(videoDuration, Math.max(Number(e.target.value), startTime + 1)))} /></label>
              <label>{t.videoMp3.labelDuration}<input type="text" readOnly value={fmtTimeMp3(endTime - startTime)} /></label>
            </div>
          </div>
        )}

        {/* Step 3: Convert */}
        {videoFile && (
          <div className="video-step-card">
            <div className="video-step-label"><span className="step-badge">3</span> {t.videoMp3.step3}</div>
            {converting ? (
              <div className="video-progress">
                <div className="video-progress-bar"><div style={{ width: `${progress}%` }} /></div>
                <p>{status}</p>
                <button type="button" className="secondary" onClick={() => { cancelRef.current = true }}>{t.videoMp3.cancelBtn}</button>
              </div>
            ) : (
              <div className="video-action-row">
                <button type="button" className="primary" disabled={!videoDuration} onClick={convertToMp3}>
                  <HomeIcon name="music" /> {t.videoMp3.convertBtn}
                </button>
                <button type="button" className="secondary" disabled={!videoDuration} onClick={previewAudio}>
                  <HomeIcon name="play" /> {t.videoMp3.previewBtn}
                </button>
              </div>
            )}
            <p className="video-privacy-note"><HomeIcon name="lock" /> {t.videoMp3.privacyNote}</p>
            {error && <p className="video-error">{error}</p>}
            {status && !converting && <p className="video-status">{status}</p>}
          </div>
        )}

        {/* Result */}
        {resultUrl && (
          <div className="video-result-card">
            <h2>{t.videoMp3.resultTitle}</h2>
            {resultFormat === 'wav' && (
              <p className="video-format-note">⚠️ Output format: WAV (browser MP3 encoding unavailable). The audio is fully extracted and playable.</p>
            )}
            <audio controls src={resultUrl} className="video-audio-player" />
            <div className="video-result-meta">
              <span>{t.videoMp3.resultDuration}: {fmtTimeMp3(resultDuration)}</span>
              <span>{resultFormat === 'mp3' ? `${t.videoMp3.resultBitrate}: ${options.quality} kbps` : 'Format: WAV (PCM)'}</span>
              <span>{t.videoMp3.resultSize}: {(resultSize / 1024 / 1024).toFixed(1)} MB</span>
              <span>{t.videoMp3.resultChannels}: {options.channels}</span>
            </div>
            <div className="video-result-actions">
              <a className="download-button" href={resultUrl} download={`${videoFile?.name.replace(/\.[^.]+$/, '') ?? 'audio'}.${resultFormat}`}>
                <HomeIcon name="download" /> {resultFormat === 'mp3' ? t.videoMp3.downloadBtn : 'Download WAV'}
              </a>
              <button type="button" className="secondary" onClick={reset}>{t.videoMp3.convertAnother}</button>
            </div>
          </div>
        )}
      </div>

      {/* Right sidebar */}
      <aside className="video-sidebar">
        <div className="video-sidebar-card">
          <h2><HomeIcon name="settings" /> {t.videoMp3.settingsTitle}</h2>

          <label className="video-setting-label">
            {t.videoMp3.formatLabel}
            <select value={options.format} disabled>
              <option value="mp3">MP3</option>
            </select>
          </label>

          <label className="video-setting-label">
            {t.videoMp3.qualityLabel}
            <select value={options.quality} onChange={(e) => updateOption('quality', Number(e.target.value) as Mp3AudioOptions['quality'])}>
              <option value={96}>96 kbps (Small size)</option>
              <option value={128}>128 kbps (Standard)</option>
              <option value={192}>192 kbps (Recommended)</option>
              <option value={256}>256 kbps (High quality)</option>
              <option value={320}>320 kbps (Best quality)</option>
            </select>
            <small>{t.videoMp3.qualityHint}</small>
          </label>

          <label className="video-setting-label">
            {t.videoMp3.channelsLabel}
            <select value={options.channels} onChange={(e) => updateOption('channels', e.target.value as Mp3AudioOptions['channels'])}>
              <option value="stereo">{t.videoMp3.stereo}</option>
              <option value="mono">{t.videoMp3.mono}</option>
            </select>
          </label>

          <button type="button" className="video-advanced-toggle" onClick={() => setAdvancedOpen((o) => !o)}>
            {t.videoMp3.advancedToggle} {advancedOpen ? '▲' : '▼'}
          </button>
          {advancedOpen && (
            <div className="video-advanced">
              <label className="checkbox-row"><input type="checkbox" checked={options.normalizeVolume} onChange={(e) => updateOption('normalizeVolume', e.target.checked)} /> {t.videoMp3.advancedNormalize}</label>
              <label className="checkbox-row"><input type="checkbox" checked={options.fadeIn} onChange={(e) => updateOption('fadeIn', e.target.checked)} /> {t.videoMp3.advancedFadeIn}</label>
              <label className="checkbox-row"><input type="checkbox" checked={options.fadeOut} onChange={(e) => updateOption('fadeOut', e.target.checked)} /> {t.videoMp3.advancedFadeOut}</label>
              <label className="video-setting-label">{t.videoMp3.advancedSampleRate}
                <select value={options.sampleRate} onChange={(e) => updateOption('sampleRate', Number(e.target.value) as Mp3AudioOptions['sampleRate'])}>
                  <option value={44100}>44.1 kHz</option>
                  <option value={48000}>48 kHz</option>
                </select>
              </label>
            </div>
          )}
        </div>

        <div className="video-sidebar-card">
          <h2><HomeIcon name="info" /> {t.videoMp3.aboutTitle}</h2>
          <ul className="video-limits-list">
            {t.videoMp3.aboutItems.map((item, i) => (
              <li key={i}><HomeIcon name="check" /> {item}</li>
            ))}
          </ul>
        </div>

        <div className="video-sidebar-card privacy">
          <HomeIcon name="shield" />
          <h3>{t.videoMp3.privacyTitle}</h3>
          <p>{t.videoMp3.privacyText}</p>
        </div>
      </aside>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared video upload dropzone
// ─────────────────────────────────────────────────────────────────────────────

export function VideoDropzone({ onFiles, accept, hint, note }: { onFiles: (files: File[]) => void; accept: string; hint: string; note?: string }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length) onFiles(files)
  }

  return (
    <div
      className={`video-dropzone ${dragging ? 'dragging' : ''}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click() }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={(e) => { const files = Array.from(e.target.files ?? []); if (files.length) onFiles(files); e.target.value = '' }}
      />
      <div className="video-dropzone-icon"><HomeIcon name="play" /></div>
      <strong>Click to upload or drag and drop</strong>
      <small>{hint}</small>
      {note && <span className="video-dropzone-note"><HomeIcon name="shield" /> {note}</span>}
    </div>
  )
}

export function ComingSoonTool({ tool }: { tool: Tool }) {
  return (
    <div className="coming-soon">
      <h2>{tool.name} is planned for the next batch.</h2>
      <p>This page is ready for SEO and navigation, but the interactive editor will ship after the first browser tools are stable.</p>
      <div className="tips-panel inline">
        {tool.tips.map((tip) => <p key={tip}>{tip}</p>)}
      </div>
    </div>
  )
}

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

// ─────────────────────────────────────────────────────────────────────────────
// CLI Landing Page
// ─────────────────────────────────────────────────────────────────────────────

const CLI_COMMANDS = [
  {
    cmd: 'compress',
    desc: 'Reduce image file size with quality control.',
    example: 'nanoimage compress photo.jpg --quality 75 --output photo-compressed.jpg',
  },
  {
    cmd: 'resize',
    desc: 'Change image dimensions by pixels, percentage, or max width.',
    example: 'nanoimage resize hero.jpg --width 1200 --output hero-1200.jpg',
  },
  {
    cmd: 'convert',
    desc: 'Convert images between JPG, PNG, and WebP.',
    example: 'nanoimage convert logo.png --to jpg --output logo.jpg',
  },
  {
    cmd: 'webp',
    desc: 'Fast WebP conversion for web-ready images.',
    example: 'nanoimage webp photo.jpg --quality 80 --output photo.webp',
  },
  {
    cmd: 'remove-exif',
    desc: 'Strip metadata from images before sharing.',
    example: 'nanoimage remove-exif photo.jpg --output photo-clean.jpg',
  },
]

const CLI_BENEFITS = [
  { icon: 'lock', title: 'Local processing', desc: 'Files never leave your machine. No uploads, no server.' },
  { icon: 'bolt', title: 'Batch optimization', desc: 'Process entire folders with a single command.' },
  { icon: 'convert', title: 'WebP conversion', desc: 'Convert any image to WebP for smaller web assets.' },
  { icon: 'dots', title: 'CI/CD friendly', desc: 'Drop it into build scripts and GitHub Actions.' },
  { icon: 'file', title: 'JSON output', desc: 'Machine-readable results for automation workflows.' },
  { icon: 'shield', title: 'EXIF removal', desc: 'Clean metadata from images before publishing.' },
]

const CLI_FAQS = [
  { q: 'Does NanoImage CLI upload my images?', a: 'No. CLI processing happens entirely on your local machine. Files are never sent to any server.' },
  { q: 'Can I use it in CI/CD?', a: 'Yes. Use commands in npm scripts, build pipelines, or GitHub Actions. The --json flag gives machine-readable output for automation.' },
  { q: 'Which image formats are supported?', a: 'CLI v1 focuses on JPG, PNG, and WebP. More formats may be added in future versions.' },
  { q: 'Can I process entire folders?', a: 'Yes. Pass a directory as input and an output directory. Directories are processed recursively by default.' },
]

export function CliPage({ navigate: _navigate }: { navigate: (to: string) => void }) {
  return (
    <section className="cli-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <span>CLI</span>
      </nav>

      {/* Hero */}
      <div className="cli-hero">
        <div className="cli-hero-badge">
          <HomeIcon name="bolt" /> Developer tool
        </div>
        <h1>NanoImage CLI</h1>
        <p className="cli-hero-subtitle">Compress, resize, convert, and clean image files locally with a simple command-line tool.</p>
        <div className="cli-install-block">
          <code className="cli-install-cmd">npm install -g nanoimage</code>
        </div>
        <div className="cli-hero-actions">
          <a className="primary" href="/docs/cli">View CLI docs</a>
          <a className="secondary" href="https://www.npmjs.com/package/nanoimage" target="_blank" rel="noopener noreferrer">View on npm</a>
        </div>
        <div className="cli-code-preview">
          <div className="cli-code-bar"><span /><span /><span /></div>
          <pre><code><span className="cli-token-cmd">nanoimage</span> compress ./images <span className="cli-token-flag">--quality</span> 75 <span className="cli-token-flag">--output</span> ./compressed{'\n'}<span className="cli-token-cmd">nanoimage</span> webp ./public <span className="cli-token-flag">--quality</span> 82 <span className="cli-token-flag">--remove-exif</span>{'\n'}<span className="cli-token-cmd">nanoimage</span> resize hero.jpg <span className="cli-token-flag">--width</span> 1200 <span className="cli-token-flag">--output</span> hero-1200.jpg</code></pre>
        </div>
      </div>

      {/* Benefits */}
      <div className="cli-benefits-grid">
        {CLI_BENEFITS.map(b => (
          <div key={b.title} className="cli-benefit-card">
            <span className="cli-benefit-icon"><HomeIcon name={b.icon} /></span>
            <strong>{b.title}</strong>
            <p>{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Commands */}
      <h2 className="cli-section-title">5 commands. Ready to use.</h2>
      <div className="cli-commands-list">
        {CLI_COMMANDS.map(c => (
          <div key={c.cmd} className="cli-command-card">
            <div className="cli-command-header">
              <code className="cli-command-name">{c.cmd}</code>
              <span className="cli-command-desc">{c.desc}</span>
            </div>
            <pre className="cli-command-example"><code>{c.example}</code></pre>
          </div>
        ))}
      </div>

      {/* Use cases */}
      <div className="cli-usecases">
        <h2 className="cli-section-title">Built for real workflows</h2>
        <ul className="cli-usecase-list">
          <li><HomeIcon name="check" /> Optimize website images before deployment</li>
          <li><HomeIcon name="check" /> Compress blog images before publishing</li>
          <li><HomeIcon name="check" /> Convert asset folders to WebP</li>
          <li><HomeIcon name="check" /> Clean metadata from product photos in bulk</li>
          <li><HomeIcon name="check" /> Automate image pipelines in GitHub Actions</li>
          <li><HomeIcon name="check" /> Get JSON output for build logs and CI reports</li>
        </ul>
      </div>

      {/* Install */}
      <div className="cli-install-section">
        <h2 className="cli-section-title">Get started in seconds</h2>
        <div className="cli-install-options">
          <div className="cli-install-option">
            <p className="cli-install-label">Global install</p>
            <pre className="cli-command-example"><code>npm install -g nanoimage</code></pre>
          </div>
          <div className="cli-install-option">
            <p className="cli-install-label">Run without installing</p>
            <pre className="cli-command-example"><code>npx nanoimage compress input.jpg --quality 75</code></pre>
          </div>
        </div>
        <p className="cli-install-note">Requires Node.js 18 or later. &nbsp;·&nbsp; <a href="https://www.npmjs.com/package/nanoimage" target="_blank" rel="noopener noreferrer">npm package</a></p>
        <div className="cli-install-cta">
          <a className="primary" href="/docs/cli">Read the full docs</a>
        </div>
      </div>

      {/* FAQ */}
      <div className="cli-faq">
        <h2 className="cli-section-title">FAQ</h2>
        <dl className="tool-faq-list">
          {CLI_FAQS.map((item, i) => (
            <div key={i} className="tool-faq-item">
              <dt className="tool-faq-question">{item.q}</dt>
              <dd className="tool-faq-answer"><p>{item.a}</p></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CLI Docs Page
// ─────────────────────────────────────────────────────────────────────────────

export function DocsCliPage({ navigate: _navigate }: { navigate: (to: string) => void }) {
  return (
    <div className="docs-cli-layout">
      {/* Sidebar */}
      <aside className="docs-cli-sidebar">
        <nav className="docs-toc">
          <p className="docs-toc-title">On this page</p>
          <a href="#overview">Overview</a>
          <a href="#installation">Installation</a>
          <a href="#quick-start">Quick start</a>
          <a href="#compress">compress</a>
          <a href="#resize">resize</a>
          <a href="#convert">convert</a>
          <a href="#webp">webp</a>
          <a href="#remove-exif">remove-exif</a>
          <a href="#batch">Batch processing</a>
          <a href="#json-output">JSON output</a>
          <a href="#ci-cd">CI/CD</a>
          <a href="#troubleshooting">Troubleshooting</a>
          <a href="#faq">FAQ</a>
        </nav>
      </aside>

      {/* Main content */}
      <section className="docs-cli-main">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/cli">CLI</a>
          <span>/</span>
          <span>Docs</span>
        </nav>

        <h1>NanoImage CLI Documentation</h1>
        <p className="docs-cli-lead">Install and use NanoImage CLI to compress, resize, convert, and clean images from the command line.</p>

        {/* Overview */}
        <section id="overview" className="docs-section">
          <h2>Overview</h2>
          <p>NanoImage CLI is a command-line image optimization tool. It runs locally on your machine and processes files without any uploads.</p>
          <p>CLI v1 includes five commands:</p>
          <ul>
            <li><code>compress</code> — Reduce image file size</li>
            <li><code>resize</code> — Change image dimensions</li>
            <li><code>convert</code> — Convert between formats</li>
            <li><code>webp</code> — Convert to WebP</li>
            <li><code>remove-exif</code> — Strip metadata</li>
          </ul>
          <p>All commands support single files and directories. For one file, <code>--output</code> can be a file path. For a folder, <code>--output</code> should be an output directory.</p>
        </section>

        {/* Installation */}
        <section id="installation" className="docs-section">
          <h2>Installation</h2>
          <p>Requires <strong>Node.js 18 or later</strong>.</p>
          <p>Install globally with npm:</p>
          <pre className="docs-code-block"><code>npm install -g nanoimage</code></pre>
          <p>Or use without installing:</p>
          <pre className="docs-code-block"><code>npx nanoimage --help</code></pre>
          <p>Verify the install:</p>
          <pre className="docs-code-block"><code>nanoimage --version</code></pre>
        </section>

        {/* Quick start */}
        <section id="quick-start" className="docs-section">
          <h2>Quick start</h2>
          <p>One example for each command:</p>
          <pre className="docs-code-block"><code>nanoimage compress photo.jpg --quality 75 --output photo-compressed.jpg</code></pre>
          <pre className="docs-code-block"><code>nanoimage resize photo.jpg --width 1200 --output photo-1200.jpg</code></pre>
          <pre className="docs-code-block"><code>nanoimage convert photo.png --to jpg --output photo.jpg</code></pre>
          <pre className="docs-code-block"><code>nanoimage webp photo.jpg --quality 80 --output photo.webp</code></pre>
          <pre className="docs-code-block"><code>nanoimage remove-exif photo.jpg --output photo-clean.jpg</code></pre>
        </section>

        {/* compress */}
        <section id="compress" className="docs-section">
          <h2>compress</h2>
          <p>Compress an image or a folder of images.</p>
          <h3>Usage</h3>
          <pre className="docs-code-block"><code>nanoimage compress {'<input>'} [options]</code></pre>
          <h3>Examples</h3>
          <pre className="docs-code-block"><code>nanoimage compress photo.jpg --quality 75 --output photo-compressed.jpg</code></pre>
          <pre className="docs-code-block"><code>nanoimage compress ./images --quality 75 --output ./compressed</code></pre>
          <h3>Options</h3>
          <div className="docs-table-wrap">
            <table className="docs-table">
              <thead><tr><th>Option</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>--quality, -q</code></td><td>Output quality from 1 to 100</td></tr>
                <tr><td><code>--output, -o</code></td><td>Output file or directory</td></tr>
              </tbody>
            </table>
          </div>
          <div className="docs-note">
            <strong>Notes:</strong> JPG and WebP give the best results with quality control. PNG compression may have smaller savings in v1.
          </div>
        </section>

        {/* resize */}
        <section id="resize" className="docs-section">
          <h2>resize</h2>
          <p>Resize images by width or height. Aspect ratio is kept by default when only one dimension is provided.</p>
          <h3>Usage</h3>
          <pre className="docs-code-block"><code>nanoimage resize {'<input>'} [options]</code></pre>
          <h3>Examples</h3>
          <pre className="docs-code-block"><code>nanoimage resize photo.jpg --width 1200 --output photo-1200.jpg</code></pre>
          <pre className="docs-code-block"><code>nanoimage resize photo.jpg --height 800 --output photo-800h.jpg</code></pre>
          <pre className="docs-code-block"><code>nanoimage resize ./images --width 1600 --output ./resized</code></pre>
          <h3>Options</h3>
          <div className="docs-table-wrap">
            <table className="docs-table">
              <thead><tr><th>Option</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>--width, -w</code></td><td>Target width in px</td></tr>
                <tr><td><code>--height, -h</code></td><td>Target height in px</td></tr>
                <tr><td><code>--fit</code></td><td>Sharp fit mode: inside, contain, cover, fill, or outside</td></tr>
                <tr><td><code>--enlarge</code></td><td>Allow enlarging images smaller than the target size</td></tr>
                <tr><td><code>--output, -o</code></td><td>Output file or directory</td></tr>
              </tbody>
            </table>
          </div>
          <div className="docs-note">
            <strong>Notes:</strong> If only width is provided, height is calculated automatically. If only height is provided, width is calculated automatically.
          </div>
        </section>

        {/* convert */}
        <section id="convert" className="docs-section">
          <h2>convert</h2>
          <p>Convert images between common formats.</p>
          <h3>Usage</h3>
          <pre className="docs-code-block"><code>nanoimage convert {'<input>'} --to {'<format>'} [options]</code></pre>
          <h3>Examples</h3>
          <pre className="docs-code-block"><code>nanoimage convert input.png --to jpg --output output.jpg</code></pre>
          <pre className="docs-code-block"><code>nanoimage convert logo.png --to jpg --background white --output logo.jpg</code></pre>
          <pre className="docs-code-block"><code>nanoimage convert ./images --to webp --quality 80 --output ./converted</code></pre>
          <h3>Options</h3>
          <div className="docs-table-wrap">
            <table className="docs-table">
              <thead><tr><th>Option</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>--to</code></td><td>Target format: jpg, png, webp, or avif</td></tr>
                <tr><td><code>--output, -o</code></td><td>Output file or directory</td></tr>
                <tr><td><code>--quality, -q</code></td><td>Quality for JPG/WebP</td></tr>
                <tr><td><code>--background</code></td><td>Background color when converting transparency to JPG</td></tr>
              </tbody>
            </table>
          </div>
          <div className="docs-note">
            <strong>Notes:</strong> JPG does not support transparency. Transparent PNG or WebP converted to JPG will use a white background by default unless <code>--background</code> is specified.
          </div>
        </section>

        {/* webp */}
        <section id="webp" className="docs-section">
          <h2>webp</h2>
          <p>Convert images to WebP. This is a shortcut for a common web optimization workflow.</p>
          <h3>Usage</h3>
          <pre className="docs-code-block"><code>nanoimage webp {'<input>'} [options]</code></pre>
          <h3>Examples</h3>
          <pre className="docs-code-block"><code>nanoimage webp hero.jpg --quality 80 --output hero.webp</code></pre>
          <pre className="docs-code-block"><code>nanoimage webp ./images --quality 82 --output ./webp</code></pre>
          <pre className="docs-code-block"><code>nanoimage webp ./public/images --quality 82 --remove-exif --output ./public/images-webp</code></pre>
          <h3>Options</h3>
          <div className="docs-table-wrap">
            <table className="docs-table">
              <thead><tr><th>Option</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>--quality, -q</code></td><td>WebP quality from 1 to 100</td></tr>
                <tr><td><code>--output, -o</code></td><td>Output file or directory</td></tr>
                <tr><td><code>--remove-exif</code></td><td>Remove metadata during conversion</td></tr>
              </tbody>
            </table>
          </div>
          <div className="docs-note">
            <strong>Notes:</strong> WebP is recommended for websites and blogs. Use <code>--quality</code> to balance visual quality and output size.
          </div>
        </section>

        {/* remove-exif */}
        <section id="remove-exif" className="docs-section">
          <h2>remove-exif</h2>
          <p>Remove common EXIF metadata from images. Useful before publishing personal, product, or website images.</p>
          <h3>Usage</h3>
          <pre className="docs-code-block"><code>nanoimage remove-exif {'<input>'} [options]</code></pre>
          <h3>Examples</h3>
          <pre className="docs-code-block"><code>nanoimage remove-exif photo.jpg --output photo-clean.jpg</code></pre>
          <pre className="docs-code-block"><code>nanoimage remove-exif ./uploads --output ./uploads-clean</code></pre>
          <h3>Options</h3>
          <div className="docs-table-wrap">
            <table className="docs-table">
              <thead><tr><th>Option</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>--output, -o</code></td><td>Output file or directory</td></tr>
              </tbody>
            </table>
          </div>
          <div className="docs-note">
            <strong>Notes:</strong> Removes common EXIF metadata. Does not guarantee every possible metadata field in every format.
          </div>
        </section>

        {/* batch */}
        <section id="batch" className="docs-section">
          <h2>Batch processing</h2>
          <p>All commands accept a directory as input. Pass a folder path and an output folder.</p>
          <pre className="docs-code-block"><code>nanoimage compress ./images --quality 75 --output ./compressed</code></pre>
          <pre className="docs-code-block"><code>nanoimage resize ./images --width 1200 --output ./resized</code></pre>
          <pre className="docs-code-block"><code>nanoimage webp ./images --quality 80 --output ./webp</code></pre>
          <p>Directory inputs are processed recursively by default.</p>
          <div className="docs-note">
            For single-file inputs, <code>--output</code> can be a file path such as <code>photo-compressed.jpg</code>. For folder inputs, use an output directory such as <code>./compressed</code>.
          </div>
        </section>

        {/* json */}
        <section id="json-output" className="docs-section">
          <h2>JSON output</h2>
          <p>Add <code>--json</code> to any command for machine-readable output. Useful for CI/CD, build scripts, logs, and AI agent workflows.</p>
          <pre className="docs-code-block"><code>nanoimage compress photo.jpg --quality 75 --json</code></pre>
          <p>Example output:</p>
          <pre className="docs-code-block"><code>{`[
  {
    "input": "photo.jpg",
    "output": "photo-compressed.jpg",
    "inputSize": 2457600,
    "outputSize": 524288
  }
]`}</code></pre>
        </section>

        {/* CI/CD */}
        <section id="ci-cd" className="docs-section">
          <h2>CI/CD usage</h2>
          <p>Add NanoImage CLI to your <code>package.json</code> scripts:</p>
          <pre className="docs-code-block"><code>{`{
  "scripts": {
    "optimize-images": "nanoimage compress ./public/images --quality 75 --output ./public/images-optimized"
  }
}`}</code></pre>
          <p>GitHub Actions example:</p>
          <pre className="docs-code-block"><code>{`name: Optimize Images

on: [push]

jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install -g nanoimage
      - run: nanoimage compress ./public/images --quality 75 --output ./public/images-optimized`}</code></pre>
        </section>

        {/* Troubleshooting */}
        <section id="troubleshooting" className="docs-section">
          <h2>Troubleshooting</h2>
          <div className="docs-table-wrap">
            <table className="docs-table">
              <thead><tr><th>Error</th><th>Meaning</th><th>Fix</th></tr></thead>
              <tbody>
                <tr><td><code>Unsupported format</code></td><td>Input format not supported</td><td>Use JPG, PNG, or WebP</td></tr>
                <tr><td><code>Cannot write output</code></td><td>Permission or path issue</td><td>Check folder permissions</td></tr>
                <tr><td><code>Input not found</code></td><td>File path is wrong</td><td>Check the input path</td></tr>
                <tr><td><code>Processing failed</code></td><td>Image decode/encode failed</td><td>Try another file or format</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="docs-section">
          <h2>FAQ</h2>
          <dl className="tool-faq-list">
            {CLI_FAQS.map((item, i) => (
              <div key={i} className="tool-faq-item">
                <dt className="tool-faq-question">{item.q}</dt>
                <dd className="tool-faq-answer"><p>{item.a}</p></dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <div className="docs-cli-cta">
          <h2>Ready to optimize images from your terminal?</h2>
          <pre className="docs-code-block"><code>npm install -g nanoimage</code></pre>
          <div className="docs-cli-cta-links">
            <a className="primary" href="/cli">CLI overview</a>
            <a className="secondary" href="/blog/introducing-nanoimage-cli">Read launch post</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export function HowItWorksPage({ navigate: _navigate }: { navigate: (to: string) => void }) {
  const { t } = useI18n()
  const stepIcons = [['crop', 'image', 'file', 'dots'], ['upload'], ['settings'], ['download']]
  const benefitIcons = ['bolt', 'lock', 'heart', 'smile']
  const flowToolsI18n: [string, string, string][] = [
    ['image', t.toolsData['compress-image']?.name ?? 'Compress Image', '/compress-image'],
    ['crop', t.toolsData['resize-image']?.name ?? 'Resize Image', '/resize-image'],
    ['crop', t.toolsData['crop-image']?.name ?? 'Crop Image', '/crop-image'],
    ['convert', t.toolsData['convert-image']?.name ?? 'Convert Image', '/convert-image'],
    ['file', t.toolsData['convert-to-webp']?.name ?? 'Convert to WebP', '/convert-to-webp'],
    ['file', t.toolsData['image-to-pdf']?.name ?? 'Image to PDF', '/image-to-pdf'],
    ['sparkle', t.toolsData['change-background']?.name ?? 'Change Background', '/change-background'],
    ['text', t.toolsData['add-text']?.name ?? 'Add Text', '/add-text'],
    ['dots', 'And many more', '/'],
  ]
  return (
    <section className="how-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">{t.breadcrumbs.home}</a>
        <span>/</span>
        <span>{t.how.breadcrumb}</span>
      </nav>

      <div className="how-hero">
        <div className="how-hero-copy">
          <h1>{t.how.title} <mark>{t.how.titleMark}</mark></h1>
          <p>{t.how.subtitle}</p>
          <div className="how-actions">
            <a className="primary" href="/">{t.how.exploreAll}</a>
            <a className="secondary" href="/compress-image">{t.how.tryCompress}</a>
          </div>
        </div>
        <div className="how-hero-art">
          <img src="/assets/how-it-works-banner.png" alt="NanoImage tools workflow illustration" />
        </div>
      </div>

      <h2 className="how-section-title">{t.how.stepsTitle} <HomeIcon name="sparkle" /></h2>
      <div className="how-steps-grid">
        {t.how.steps.map(([title, body], index) => (
          <article key={index}>
            <span className="step-number">{index + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
            <div className={`step-visual step-${index + 1}`}>
              {stepIcons[index].map((icon) => <i key={icon}><HomeIcon name={icon} /></i>)}
              {index === 1 && <b>{t.how.uploadDrop}</b>}
              {index === 2 && <><small>Quality <em></em> <strong>90%</strong></small><small>Format <strong>WebP</strong></small><label><input type="checkbox" checked readOnly /> {t.how.keepTransparency}</label></>}
              {index === 3 && <><strong>✓</strong><p>{t.how.ready}</p><button type="button">{t.how.download}</button></>}
            </div>
          </article>
        ))}
      </div>

      <h2 className="how-section-title">{t.how.whyTitle}</h2>
      <div className="how-benefits-grid">
        {t.how.benefits.map(([title, body], index) => (
          <article key={index}>
            <span><HomeIcon name={benefitIcons[index]} /></span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>

      <h2 className="how-section-title">{t.how.flowTitle}</h2>
      <div className="how-tool-flow">
        {flowToolsI18n.map(([icon, label, to]) => (
          <a key={to} href={to}>
            <span><HomeIcon name={icon} /></span>
            <small>{label}</small>
          </a>
        ))}
      </div>

      <div className="how-cta">
        <span><HomeIcon name="image" /></span>
        <div><h2>{t.how.ctaTitle}</h2><p>{t.how.ctaDesc}</p></div>
        <a className="primary" href="/">{t.how.exploreAll}</a>
        <a className="secondary" href="/compress-image">{t.how.tryCompress}</a>
      </div>

      <div className="how-mini-trust">
        <span><HomeIcon name="bolt" /> {t.trust.tagBrowser}</span>
        <span><HomeIcon name="lock" /> {t.trust.tagPrivate}</span>
        <span><HomeIcon name="smile" /> {t.trust.tagFree}</span>
      </div>
    </section>
  )
}

export function BlogPage({ navigate }: { navigate: (to: string) => void }) {
  const { t, lang } = useI18n()
  const postsPerPage = 3
  const [activeFilter, setActiveFilter] = useState(t.blog.filters[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const localizedPosts = useMemo(() => sortBlogPostsByDateDesc(blogPosts.map((post) => localizeBlogPost(post, lang))), [lang])
  const filteredPosts = useMemo(() => {
    const text = searchQuery.trim().toLowerCase()
    return localizedPosts.filter((post) => {
      const category = post.category.toLowerCase()
      const matchesFilter = activeFilter === t.blog.filters[0] || category.includes(activeFilter.toLowerCase())
      const matchesSearch = !text || [post.title, post.excerpt, post.category].some((value) => value.toLowerCase().includes(text))
      return matchesFilter && matchesSearch
    })
  }, [activeFilter, localizedPosts, searchQuery, t.blog.filters])
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage))
  const currentPage = Math.min(page, totalPages)
  const visiblePosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
  const changeFilter = (filter: string) => {
    setActiveFilter(filter)
    setPage(1)
  }

  return (
    <section className="blog-page">
      <div className="blog-hero">
        <div>
          <h1>{t.blog.title}</h1>
          <p>{t.blog.subtitle}</p>
        </div>
        <BlogThumb index={0} large />
      </div>

      <div className="blog-shell">
        <div className="blog-main-card">
          <div className="blog-filter-row">
            <div>{t.blog.filters.map((filter) => <button className={activeFilter === filter ? 'active' : ''} key={filter} type="button" onClick={() => changeFilter(filter)}>{filter}</button>)}</div>
            <label><HomeIcon name="search" /><input value={searchQuery} placeholder={t.blog.search} onChange={(event) => { setSearchQuery(event.target.value); setPage(1) }} /></label>
          </div>
          <div className="blog-list">
            {visiblePosts.length === 0 && (
              <div className="blog-empty">
                <strong>{t.blog.noResults}</strong>
              </div>
            )}
            {visiblePosts.map((post) => {
              const postIndex = localizedPosts.findIndex((item) => item.slug === post.slug)
              return (
              <article className="blog-list-item" key={post.slug}>
                <a className="blog-thumb-button" href={`/blog/${post.slug}`} aria-label={`Open ${post.title}`}>
                  <BlogThumb imageSrc={post.coverImage} index={postIndex} />
                </a>
                <div>
                  {postIndex === 0 && <span className="blog-new-badge">{t.blog.newBadge}</span>}
                  <h2><a className="blog-title-button" href={`/blog/${post.slug}`}>{post.title}</a></h2>
                  <small>{post.date} · {post.category.split('/')[0].trim()}</small>
                  <p>{post.excerpt}</p>
                  <a href={`/blog/${post.slug}`}>{t.blog.readMore}</a>
                </div>
              </article>
              )
            })}
          </div>
          <div className="blog-pagination">
            <button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>‹</button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button className={currentPage === pageNumber ? 'active' : ''} key={pageNumber} type="button" onClick={() => setPage(pageNumber)}>{pageNumber}</button>
            ))}
            <button type="button" disabled={currentPage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>›</button>
          </div>
        </div>
        <BlogSidebar navigate={navigate} />
      </div>
      <p className="blog-privacy-note"><HomeIcon name="lock" /> {t.trust.barPrivateDesc}</p>
    </section>
  )
}

export function BlogPostPage({ navigate, slug }: { navigate: (to: string) => void; slug: string }) {
  const { t, lang } = useI18n()
  const localizedPosts = useMemo(() => sortBlogPostsByDateDesc(blogPosts.map((item) => localizeBlogPost(item, lang))), [lang])
  const post = localizedPosts.find((item) => item.slug === slug)!
  const postIndex = Math.max(0, localizedPosts.findIndex((item) => item.slug === slug))
  const previousPost = localizedPosts[(postIndex - 1 + localizedPosts.length) % localizedPosts.length]
  const nextPost = localizedPosts[(postIndex + 1) % localizedPosts.length]

  return (
    <section className="article-page">
      <nav className="blog-breadcrumbs">
        <a href="/">{t.breadcrumbs.home}</a>
        <span>/</span>
        <a href="/blog">{t.blog.breadcrumb}</a>
        <span>/</span>
        <span>{post.title}</span>
      </nav>
      <div className="article-shell">
        <article className="article-card">
          <span className="article-category">{post.category.split('/')[0].trim()}</span>
          <h1>{post.title}</h1>
          <div className="article-meta"><span><HomeIcon name="info" /> {post.date}</span><span><HomeIcon name="smile" /> {post.readTime}</span><span><HomeIcon name="device" /> NanoImage Team</span><span className="share-actions">{t.blog.share} <button type="button">X</button><button type="button">f</button><button type="button">↗</button></span></div>
          <BlogThumb imageSrc={post.coverImage} index={postIndex} large />
          <p className="article-excerpt">{post.excerpt}</p>
          {post.body ? <BlogMarkdown markdown={post.body} /> : (
            <div className="article-body">
              <h2>Start with the task</h2>
              <p>NanoImage tools are designed around one everyday job at a time: make a file smaller, crop a screenshot, convert a format, or clean metadata before sharing.</p>
              <h2>Keep files private</h2>
              <p>The first version runs image processing in the browser whenever possible. That means your file does not need to be uploaded for the core tools.</p>
              <h2>Choose practical settings</h2>
              <p>For web use, WebP with balanced quality is often a strong choice. For documents, JPG and PDF are still common defaults.</p>
            </div>
          )}
          <div className="article-nav">
            <a href={`/blog/${previousPost.slug}`}>← {t.blog.prevPage}<small>{previousPost.title}</small></a>
            <a href={`/blog/${nextPost.slug}`}>{t.blog.nextPage}<small>{nextPost.title}</small></a>
          </div>
        </article>
        <BlogSidebar navigate={navigate} currentSlug={slug} />
      </div>
      <p className="blog-privacy-note"><HomeIcon name="lock" /> {t.trust.barPrivateDesc}</p>
    </section>
  )
}

export function BlogSidebar({ navigate: _navigate, currentSlug }: { navigate: (to: string) => void; currentSlug?: string }) {
  const { t, lang } = useI18n()
  const popularPosts = sortBlogPostsByDateDesc(blogPosts.map((post) => localizeBlogPost(post, lang)))
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 5)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const submitSubscription = () => {
    const subscriberEmail = email.trim()
    if (!subscriberEmail) return
    const subject = encodeURIComponent('NanoImage newsletter subscription')
    const body = encodeURIComponent(`Please add this email to the NanoImage newsletter list:\n\n${subscriberEmail}`)
    window.location.href = `mailto:support@nanoimage.net?subject=${subject}&body=${body}`
    setSubscribed(true)
  }

  return (
    <aside className="blog-sidebar">
      <section className="blog-side-card about">
        <h2><HomeIcon name="sparkle" /> About NanoImage</h2>
        <p>{t.trust.tagBrowser}. {t.trust.noInstallDesc}</p>
        <p>{t.trust.privateDesc}</p>
        <a href="/">{t.how.exploreAll} →</a>
      </section>
      <section className="blog-side-card popular">
        <h2><HomeIcon name="sparkle" /> {t.blog.sidebarLatest}</h2>
        {popularPosts.map((post, index) => (
          <a key={post.slug} href={`/blog/${post.slug}`}>
            <BlogThumb imageSrc={post.coverImage} index={index + 1} small />
            <span><strong>{post.title}</strong><small>{post.date}</small></span>
          </a>
        ))}
      </section>
      <section className="blog-side-card subscribe">
        <span><HomeIcon name="file" /></span>
        <h2>{t.blog.sidebarStayInLoop}</h2>
        <p>{t.blog.sidebarStayDesc}</p>
        <input value={email} placeholder={t.blog.sidebarEmail} type="email" onChange={(event) => { setEmail(event.target.value); setSubscribed(false) }} />
        <button type="button" onClick={submitSubscription}>{t.blog.sidebarSubscribe}</button>
        <small>{subscribed ? t.blog.sidebarSubscribed : t.blog.sidebarPrivacy}</small>
      </section>
    </aside>
  )
}

export function BlogThumb({ index, imageSrc, large, small }: { index: number; imageSrc?: string; large?: boolean; small?: boolean }) {
  const icons = ['image', 'lock', 'file', 'crop', 'sparkle', 'convert']
  const icon = icons[index % icons.length]
  return (
    <div className={`blog-thumb thumb-${index % 6} ${large ? 'large' : ''} ${small ? 'small' : ''}`}>
      {imageSrc ? (
        <img src={imageSrc} alt="" />
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

export function BlogMarkdown({ markdown }: { markdown: string }) {
  const blocks = useMemo(() => {
    const parsed: { type: 'code' | 'line'; content: string; lang?: string }[] = []
    const lines = markdown.split('\n')
    let codeLang = ''
    let codeLines: string[] | null = null

    for (const line of lines) {
      const fence = line.trim().match(/^```(.*)$/)
      if (fence) {
        if (codeLines) {
          parsed.push({ type: 'code', content: codeLines.join('\n'), lang: codeLang })
          codeLines = null
          codeLang = ''
        } else {
          codeLang = fence[1].trim()
          codeLines = []
        }
        continue
      }
      if (codeLines) codeLines.push(line)
      else parsed.push({ type: 'line', content: line })
    }

    if (codeLines) parsed.push({ type: 'code', content: codeLines.join('\n'), lang: codeLang })
    return parsed
  }, [markdown])

  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        const key = `${index}-${block.content}`
        if (block.type === 'code') {
          return <pre className="article-code-block" key={key}><code>{block.content}</code></pre>
        }
        const line = block.content
        const trimmed = line.trim()
        if (!trimmed) return null
        const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
        if (imageMatch) return <img className="article-inline-image" key={key} src={imageMatch[2]} alt={imageMatch[1]} />
        if (trimmed.startsWith('### ')) return <h3 key={key}>{renderInlineMarkdown(trimmed.replace('### ', ''))}</h3>
        if (trimmed.startsWith('## ')) return <h2 key={key}>{renderInlineMarkdown(trimmed.replace('## ', ''))}</h2>
        if (trimmed.startsWith('> ')) return <blockquote key={key}>{renderInlineMarkdown(trimmed.replace('> ', ''))}</blockquote>
        if (trimmed.startsWith('- ')) return <p className="article-bullet" key={key}>{renderInlineMarkdown(trimmed.replace('- ', ''))}</p>
        if (/^\d+\.\s/.test(trimmed)) return <p className="article-bullet numbered" key={key}>{renderInlineMarkdown(trimmed.replace(/^\d+\.\s/, ''))}</p>
        return <p key={key}>{renderInlineMarkdown(trimmed)}</p>
      })}
    </div>
  )
}

function renderInlineMarkdown(value: string): ReactNode {
  const parts = value.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g)
  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      return <a key={`${part}-${index}`} href={linkMatch[2]}>{renderInlineMarkdown(linkMatch[1])}</a>
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export function LegalPage({ markdown }: { markdown: string }) {
  return (
    <article className="legal-page">
      {markdown.split('\n').map((line, index) => {
        const key = `${index}-${line}`
        if (!line.trim()) return null
        if (line.startsWith('# ')) return <h1 key={key}>{line.replace('# ', '')}</h1>
        if (line.startsWith('## ')) return <h2 key={key}>{line.replace('## ', '')}</h2>
        if (line.startsWith('### ')) return <h3 key={key}>{line.replace('### ', '')}</h3>
        if (line.startsWith('- ')) return <p className="legal-bullet" key={key}>{line}</p>
        return <p key={key}>{line}</p>
      })}
    </article>
  )
}

export function TrustPoints({ compact }: { compact?: boolean }) {
  const { t } = useI18n()
  const items: [string, string, string][] = [
    ['smile', t.trust.free, t.trust.freeDesc],
    ['bolt', t.trust.noInstall, t.trust.noInstallDesc],
    ['shield', t.trust.private, t.trust.privateDesc],
    ['sparkle', t.trust.simple, t.trust.simpleDesc],
  ]
  return (
    <div className={compact ? 'trust-points compact' : 'trust-points'}>
      {items.map(([icon, title, body]) => (
        <div key={icon}>
          <span><HomeIcon name={icon} /></span>
          <strong>{title}</strong>
          <small>{body}</small>
        </div>
      ))}
    </div>
  )
}

export function TrustBar() {
  const { t } = useI18n()
  const items: [string, string, string][] = [
    ['lock', t.trust.bar100Free, t.trust.bar100FreeDesc],
    ['shield', t.trust.barPrivate, t.trust.barPrivateDesc],
    ['bolt', t.trust.barEasy, t.trust.barEasyDesc],
    ['device', t.trust.barAllDevices, t.trust.barAllDevicesDesc],
  ]
  return (
    <section className="trust-bar">
      {items.map(([icon, title, body]) => (
        <article key={icon}>
          <span><HomeIcon name={icon} /></span>
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        </article>
      ))}
    </section>
  )
}

export function Footer({ navigate: _navigate }: { navigate: (to: string) => void }) {
  const { t } = useI18n()
  return (
    <footer className="footer-wrap">
      <div className="footer-main">
        <a href="/" className="footer-logo">
          <img src="/assets/brand/logo/nanoimage-logo.svg" alt="NanoImage" width="120" height="24" />
        </a>
        <nav className="footer-center-nav">
          <a href="/cli">CLI</a>
          <span className="footer-sep">|</span>
          <a href="https://github.com/GUCCI-atlasv/nanoimage.net" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
        <nav className="footer-right-nav">
          <a href="/privacy-policy">{t.footer.privacy}</a>
          <span className="footer-sep">|</span>
          <a href="/terms-of-use">{t.footer.terms}</a>
          <span className="footer-sep">|</span>
          <span className="footer-contact" title="support [at] nanoimage.net">{t.footer.contact}</span>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>{t.footer.copyright}</span>
      </div>
    </footer>
  )
}

export function NotFoundPage({ navigate: _navigate }: { navigate: (to: string) => void }) {
  const { t } = useI18n()
  return (
    <section className="content-page">
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.desc}</p>
      <a className="primary" href="/">{t.notFound.back}</a>
    </section>
  )
}

function buttonLabel(slug: string, t: { tool: { convertToPdf: string; convert: string; compress: string; addWatermark: string; addText: string; apply: string } }) {
  if (slug.includes('pdf')) return t.tool.convertToPdf
  if (slug.includes('convert')) return t.tool.convert
  if (slug.includes('compress')) return t.tool.compress
  if (slug.includes('watermark')) return t.tool.addWatermark
  if (slug.includes('text')) return t.tool.addText
  return t.tool.apply
}

function settingsTitle(tool: Tool, t: { tool: { compressionSettings: string; pdfSettings: string; settings: string } }) {
  if (tool.slug === 'compress-image') return t.tool.compressionSettings
  if (tool.slug === 'image-to-pdf') return t.tool.pdfSettings
  return `${tool.name} ${t.tool.settings}`
}

function downloadLabel(file: ProcessedFile | undefined, t: { tool: { download: string; downloadZip: string; downloadPdf: string } }) {
  if (!file) return t.tool.download
  if (file.name.endsWith('.zip')) return t.tool.downloadZip
  if (file.name.endsWith('.pdf')) return t.tool.downloadPdf
  return t.tool.download
}

function formatSize(size: number) {
  if (size < 1024 * 1024) return `${Math.round(size / 1024)}KB`
  return `${(size / 1024 / 1024).toFixed(2)}MB`
}

function fileNameWithoutExtension(name: string) {
  return name.replace(/\.[^/.]+$/, '') || 'nanoimage'
}

function extensionFor(type: OutputFormat) {
  return type === 'image/png' ? 'png' : type === 'image/webp' ? 'webp' : 'jpg'
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function defaultBlurBrushSize(width: number, height: number) {
  return width || height ? 50 : 50
}

function backgroundMarkerPaint(mode: BackgroundMode, color: string, imageDataUrl: string): CSSProperties {
  if (mode === 'transparent') {
    return {
      backgroundColor: 'transparent',
      backgroundImage: 'linear-gradient(45deg, #d8d8d8 25%, transparent 25%), linear-gradient(-45deg, #d8d8d8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d8d8d8 75%), linear-gradient(-45deg, transparent 75%, #d8d8d8 75%)',
      backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0',
      backgroundSize: '12px 12px',
      boxShadow: '0 0 0 2px rgba(80, 80, 80, 0.45), 0 16px 35px rgba(47, 35, 105, 0.2)',
    }
  }
  if (mode === 'image' && imageDataUrl) {
    return {
      backgroundImage: `url(${imageDataUrl})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.75), 0 16px 35px rgba(47, 35, 105, 0.2)',
    }
  }
  if (mode === 'gradient') {
    return {
      backgroundImage: 'linear-gradient(135deg, #7d52ff, #32b8d8 52%, #ffc233)',
      boxShadow: '0 0 0 2px rgba(50, 184, 216, 0.75), 0 16px 35px rgba(47, 35, 105, 0.2)',
    }
  }
  const markerColor = color === 'transparent' ? '#ffffff' : color
  return {
    backgroundColor: markerColor,
    boxShadow: `0 0 0 2px ${markerColor}, 0 16px 35px rgba(47, 35, 105, 0.2)`,
  }
}

function enhanceCssFilter(settings: ToolSettingsState) {
  const brightness = 100 + settings.brightness + settings.exposure
  const contrast = 100 + settings.contrast + settings.clarity * 0.45
  const saturation = 100 + settings.saturation + settings.vibrance
  return `brightness(${clamp(brightness, 20, 190)}%) contrast(${clamp(contrast, 20, 190)}%) saturate(${clamp(saturation, 0, 220)}%)`
}

function applyEnhanceColorOverlay(ctx: CanvasRenderingContext2D, width: number, height: number, settings: ToolSettingsState) {
  if (settings.warmth) {
    ctx.save()
    ctx.globalAlpha = Math.min(Math.abs(settings.warmth) / 100, 0.28)
    ctx.fillStyle = settings.warmth > 0 ? '#ff9d3d' : '#3d8bff'
    ctx.globalCompositeOperation = 'soft-light'
    ctx.fillRect(0, 0, width, height)
    ctx.restore()
  }
  if (settings.tint) {
    ctx.save()
    ctx.globalAlpha = Math.min(Math.abs(settings.tint) / 100, 0.22)
    ctx.fillStyle = settings.tint > 0 ? '#ff4cc6' : '#37d67a'
    ctx.globalCompositeOperation = 'soft-light'
    ctx.fillRect(0, 0, width, height)
    ctx.restore()
  }
  if (settings.highlights || settings.shadows) {
    const imageData = ctx.getImageData(0, 0, width, height)
    const highlight = settings.highlights / 100
    const shadow = settings.shadows / 100
    for (let index = 0; index < imageData.data.length; index += 4) {
      const luminance = (imageData.data[index] * 0.299 + imageData.data[index + 1] * 0.587 + imageData.data[index + 2] * 0.114) / 255
      const amount = luminance > 0.6 ? highlight * (luminance - 0.6) : shadow * (0.6 - luminance)
      imageData.data[index] = clamp(Math.round(imageData.data[index] + 255 * amount), 0, 255)
      imageData.data[index + 1] = clamp(Math.round(imageData.data[index + 1] + 255 * amount), 0, 255)
      imageData.data[index + 2] = clamp(Math.round(imageData.data[index + 2] + 255 * amount), 0, 255)
    }
    ctx.putImageData(imageData, 0, 0)
  }
}

function applyCanvasSharpen(ctx: CanvasRenderingContext2D, width: number, height: number, sharpness: number, resampling: ToolSettingsState['resampling']) {
  const source = ctx.getImageData(0, 0, width, height)
  const output = new ImageData(new Uint8ClampedArray(source.data), width, height)
  const amount = clamp(sharpness / 100, 0, 1) * (resampling === 'sharp' ? 0.78 : 0.48)
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = (y * width + x) * 4
      for (let channel = 0; channel < 3; channel += 1) {
        const center = source.data[index + channel]
        const top = source.data[index - width * 4 + channel]
        const bottom = source.data[index + width * 4 + channel]
        const left = source.data[index - 4 + channel]
        const right = source.data[index + 4 + channel]
        output.data[index + channel] = clamp(Math.round(center * (1 + amount * 4) - (top + bottom + left + right) * amount), 0, 255)
      }
    }
  }
  ctx.putImageData(output, 0, 0)
}

async function paintCanvasBackground(ctx: CanvasRenderingContext2D, width: number, height: number, settings: ToolSettingsState) {
  ctx.clearRect(0, 0, width, height)
  if (settings.backgroundMode === 'transparent') return
  if (settings.backgroundMode === 'gradient') {
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#7d52ff')
    gradient.addColorStop(0.55, '#32b8d8')
    gradient.addColorStop(1, '#ffc233')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
    return
  }
  if (settings.backgroundMode === 'image' && settings.backgroundImageDataUrl) {
    const background = await loadBitmapFromDataUrl(settings.backgroundImageDataUrl)
    const scale = Math.max(width / background.width, height / background.height)
    const drawWidth = background.width * scale
    const drawHeight = background.height * scale
    ctx.drawImage(background, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
    return
  }
  ctx.fillStyle = settings.background === 'transparent' ? '#ffffff' : settings.background
  ctx.fillRect(0, 0, width, height)
}

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '').trim()
  const value = normalized.length === 3
    ? normalized.split('').map((char) => `${char}${char}`).join('')
    : normalized.padEnd(6, '0').slice(0, 6)
  const parsed = Number.parseInt(value, 16)
  if (Number.isNaN(parsed)) return { r: 125, g: 82, b: 255 }
  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255,
  }
}

export function CategoryPage({ categoryId }: { categoryId: string }) {
  const { t } = useI18n()
  const cat = categories.find((c) => c.id === categoryId)
  const catTools = tools.filter((tool) => tool.category === categoryId)
  if (!cat) return null
  return (
    <section className="category-landing">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <span>{t.categories[cat.id]?.title ?? cat.title}</span>
      </nav>
      <div className="category-landing-hero">
        <h1>{t.categories[cat.id]?.title ?? cat.title}</h1>
        <p>{cat.description}</p>
      </div>
      <ul className="category-landing-list">
        {catTools.map((tool) => (
          <li key={tool.slug}>
            <a href={`/${tool.slug}`} className="category-landing-card">
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
    </section>
  )
}

