'use client'
import { useRef } from 'react'
import type { Tool } from '@/src/data'
import { Breadcrumbs } from '@/src/shared/breadcrumbs'
import { StaticToolHero, StaticToolSeoBlocks, useStaticToolCopy } from './StaticToolSeo'
import { runClassicScript, useStaticToolBoot } from './static-tool-runtime'
import './static-tools.css'

const CONVERTER_SRC = '/assets/webp-convert/converter-app.js'
const MAX_FILES = 20

type WebpMode = 'png' | 'jpg'

const UI = {
  en: {
    png: {
      drop: 'Drop PNG files here or click to choose',
      hint: 'PNG only · batch up to 20 · quality + ZIP',
      convert: 'Convert PNG to WebP',
    },
    jpg: {
      drop: 'Drop JPG/JPEG files here or click to choose',
      hint: 'JPG/JPEG · batch up to 20 · quality + ZIP · EXIF stripped',
      convert: 'Convert JPG to WebP',
    },
    before: 'Before',
    after: 'After',
    quality: 'Quality',
    download: 'Download WebP',
    downloadZip: 'Download ZIP',
  },
  zh: {
    png: {
      drop: '拖放 PNG 到此处，或点击选择',
      hint: '仅 PNG · 最多 20 张 · 质量滑杆 + ZIP',
      convert: '将 PNG 转为 WebP',
    },
    jpg: {
      drop: '拖放 JPG/JPEG 到此处，或点击选择',
      hint: 'JPG/JPEG · 最多 20 张 · 质量 + ZIP · 去除 EXIF',
      convert: '将 JPG 转为 WebP',
    },
    before: '转换前',
    after: '转换后',
    quality: '质量',
    download: '下载 WebP',
    downloadZip: '下载 ZIP',
  },
} as const

/**
 * PNG→WebP / JPG→WebP — React shell around /assets/webp-convert/converter-app.js.
 * The DOM ids (#wc-*) and window.__WEBP_CONVERT__ are the contract with that script.
 */
export function WebpConvertTool({
  tool,
  mode,
  navigate,
  breadcrumbLabel,
}: {
  tool: Tool
  mode: WebpMode
  navigate: (to: string) => void
  breadcrumbLabel: string
}) {
  const { copy, zh } = useStaticToolCopy(mode === 'png' ? 'png-to-webp' : 'jpg-to-webp')
  const ui = zh ? UI.zh : UI.en
  const modeUi = ui[mode]
  const rootRef = useRef<HTMLDivElement>(null)

  // The quality label (#wc-quality-val) is updated by the script itself, so it is not React state.
  useStaticToolBoot(rootRef, async () => {
    // The script reads its config once, when it executes.
    window.__WEBP_CONVERT__ = { mode, maxFiles: MAX_FILES }
    await runClassicScript(CONVERTER_SRC)
  })

  return (
    <div className="wc-wrap" ref={rootRef}>
      <Breadcrumbs current={breadcrumbLabel} categoryId={tool.category} navigate={navigate} />
      <StaticToolHero prefix="wc" copy={copy} />
      <div className="wc-grid">
        <div className="wc-card">
          <div className="wc-drop" id="wc-drop">
            <strong>{modeUi.drop}</strong>
            <div className="wc-drop-meta">{modeUi.hint}</div>
            <div id="wc-count" className="wc-drop-count" />
          </div>
          <input id="wc-file" type="file" multiple hidden />
          <div id="wc-list" />
          <div className="wc-previews">
            <figure>
              <img id="wc-preview" alt="" hidden />
              <figcaption>
                {ui.before}: <span id="wc-before-size">—</span>
              </figcaption>
            </figure>
            <figure>
              <img id="wc-preview-after" alt="" hidden />
              <figcaption>
                {ui.after}: <span id="wc-after-size">—</span>
              </figcaption>
            </figure>
          </div>
          <p id="wc-status" />
        </div>
        <div className="wc-card wc-actions" id="wc-actions" hidden>
          <label>
            {ui.quality} <span id="wc-quality-val">85%</span>
            <input
              id="wc-quality"
              type="range"
              min={50}
              max={100}
              step={1}
              defaultValue={85}
            />
          </label>
          <button type="button" id="wc-convert">
            {modeUi.convert}
          </button>
          <a className="download" id="wc-download" hidden>
            {ui.download}
          </a>
          <a className="download secondary" id="wc-download-zip" hidden>
            {ui.downloadZip}
          </a>
        </div>
      </div>
      <StaticToolSeoBlocks prefix="wc" copy={copy} />
    </div>
  )
}
