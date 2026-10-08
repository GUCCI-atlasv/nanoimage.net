'use client'
import { useRef } from 'react'
import type { Tool } from '@/src/data'
import { Breadcrumbs } from '@/src/shared/breadcrumbs'
import { StaticToolHero, StaticToolSeoBlocks, useStaticToolCopy } from './StaticToolSeo'
import { runClassicScript, useStaticToolBoot } from './static-tool-runtime'
import './static-tools.css'

const CONVERTER_SRC = '/assets/bmp-convert/converter-app.js'
const MAX_FILES = 20

const UI = {
  en: {
    drop: 'Drop JPG/JPEG files here or click to choose',
    hint: 'JPG/JPEG/JFIF · batch up to 20 · uncompressed 24-bit BMP · ZIP · EXIF stripped',
    before: 'Before',
    after: 'After',
    note: 'Output is uncompressed 24-bit BMP (no quality slider — size grows vs JPG).',
    convert: 'Convert JPG to BMP',
    download: 'Download BMP',
    downloadZip: 'Download ZIP',
  },
  zh: {
    drop: '拖放 JPG/JPEG 到此处，或点击选择',
    hint: 'JPG/JPEG/JFIF · 最多 20 张 · 未压缩 24 位 BMP · ZIP · 去除 EXIF',
    before: '转换前',
    after: '转换后',
    note: '输出为未压缩 24 位 BMP（无质量滑块 — 体积通常比 JPG 更大）。',
    convert: '将 JPG 转为 BMP',
    download: '下载 BMP',
    downloadZip: '下载 ZIP',
  },
} as const

/**
 * JPG→BMP — React shell around /assets/bmp-convert/converter-app.js.
 * The DOM ids (#wc-*) and window.__BMP_CONVERT__ are the contract with that script.
 */
export function BmpConvertTool({
  tool,
  navigate,
  breadcrumbLabel,
}: {
  tool: Tool
  navigate: (to: string) => void
  breadcrumbLabel: string
}) {
  const { copy, zh } = useStaticToolCopy('jpg-to-bmp')
  const ui = zh ? UI.zh : UI.en
  const rootRef = useRef<HTMLDivElement>(null)

  useStaticToolBoot(rootRef, async () => {
    // The script reads its config once, when it executes.
    window.__BMP_CONVERT__ = { maxFiles: MAX_FILES }
    await runClassicScript(CONVERTER_SRC)
  })

  return (
    <div className="wc-wrap" ref={rootRef}>
      <Breadcrumbs current={breadcrumbLabel} categoryId={tool.category} navigate={navigate} />
      <StaticToolHero prefix="wc" copy={copy} />
      <div className="wc-grid">
        <div className="wc-card">
          <div className="wc-drop" id="wc-drop">
            <strong>{ui.drop}</strong>
            <div className="wc-drop-meta">{ui.hint}</div>
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
          <p className="wc-bmp-note">{ui.note}</p>
          <button type="button" id="wc-convert">
            {ui.convert}
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
