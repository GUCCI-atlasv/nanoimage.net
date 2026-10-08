'use client'
import { useRef, useState } from 'react'
import type { Tool } from '@/src/data'
import { Breadcrumbs } from '@/src/shared/breadcrumbs'
import { StaticToolHero, StaticToolSeoBlocks, useStaticToolCopy } from './StaticToolSeo'
import { loadScriptOnce, runModuleScript, useStaticToolBoot } from './static-tool-runtime'
import './static-tools.css'

const OMGGIF_SRC = '/assets/gif-compressor/omggif.js'
const COMPRESSOR_SRC = '/assets/gif-compressor/compressor-app.js?v=20261006-keeporig-zh'

const UI = {
  en: {
    drop: 'Drop a GIF here or click to upload',
    before: 'Before',
    after: 'After',
    preset: 'Target size preset',
    custom: 'Custom',
    customKb: 'Custom KB',
    scale: 'Scale',
    colors: 'Colors / palette',
    frameSkip: 'Frame skip',
    compress: 'Compress GIF',
    download: 'Download compressed GIF',
  },
  zh: {
    drop: '拖放 GIF 到此处，或点击上传',
    before: '压缩前',
    after: '压缩后',
    preset: '目标体积预设',
    custom: '自定义',
    customKb: '自定义 KB',
    scale: '缩放',
    colors: '色板 / 颜色数',
    frameSkip: '抽帧',
    compress: '压缩 GIF',
    download: '下载压缩后的 GIF',
  },
} as const

/**
 * GIF Compressor — React shell around the production vanilla scripts. The DOM ids
 * (#gc-*) are the contract with /assets/gif-compressor/compressor-app.js.
 */
export function GifCompressorTool({
  tool,
  navigate,
  breadcrumbLabel,
}: {
  tool: Tool
  navigate: (to: string) => void
  breadcrumbLabel: string
}) {
  const { copy, zh } = useStaticToolCopy('gif-compressor')
  const ui = zh ? UI.zh : UI.en
  const rootRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(100)

  useStaticToolBoot(rootRef, async () => {
    // omggif defines the global GifReader used by compressor-app.js; load it once per page.
    if (typeof window.GifReader === 'undefined') await loadScriptOnce(OMGGIF_SRC)
    // compressor-app.js binds at module evaluation, so re-evaluate it for every mount.
    await runModuleScript(COMPRESSOR_SRC)
  })

  return (
    <div className="gc-wrap" ref={rootRef}>
      <Breadcrumbs current={breadcrumbLabel} categoryId={tool.category} navigate={navigate} />
      <StaticToolHero prefix="gc" copy={copy} />
      <div className="gc-grid">
        <div className="gc-card">
          <div className="gc-drop" id="gc-drop">
            <strong>{ui.drop}</strong>
            <div id="gc-filename" className="gc-drop-meta" />
            <div id="gc-meta" className="gc-drop-count" />
          </div>
          <input id="gc-file" type="file" accept="image/gif,.gif" hidden />
          <div className="gc-previews">
            <figure>
              <img id="gc-preview-before" alt="" hidden />
              <figcaption>
                {ui.before}: <span id="gc-before-size">—</span>
              </figcaption>
            </figure>
            <figure>
              <img id="gc-preview-after" alt="" hidden />
              <figcaption>
                {ui.after}: <span id="gc-after-size">—</span>
              </figcaption>
            </figure>
          </div>
          <p id="gc-status" />
        </div>
        <div className="gc-card gc-actions" id="gc-actions" hidden>
          <label>
            {ui.preset}
            <select id="gc-preset" defaultValue="512kb">
              <option value="discord">Discord (~8MB)</option>
              <option value="10mb">10 MB</option>
              <option value="5mb">5 MB</option>
              <option value="512kb">512 KB</option>
              <option value="256kb">256 KB</option>
              <option value="custom">{ui.custom}</option>
            </select>
          </label>
          <label id="gc-custom-wrap" hidden>
            {ui.customKb}
            <input id="gc-custom-kb" type="number" min={50} step={50} defaultValue={512} />
          </label>
          <label>
            {ui.scale} <span id="gc-scale-val">{scale}%</span>
            <input
              id="gc-scale"
              type="range"
              min={30}
              max={100}
              step={5}
              defaultValue={100}
              onInput={(event) => setScale(Number(event.currentTarget.value))}
            />
          </label>
          <label>
            {ui.colors}
            <select id="gc-colors" defaultValue="128">
              <option>256</option>
              <option>128</option>
              <option>64</option>
              <option>32</option>
            </select>
          </label>
          <label>
            {ui.frameSkip}
            <select id="gc-frame-skip" defaultValue="1">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>
          <button type="button" id="gc-compress">
            {ui.compress}
          </button>
          <a className="download" id="gc-download" hidden>
            {ui.download}
          </a>
        </div>
      </div>
      <StaticToolSeoBlocks prefix="gc" copy={copy} />
    </div>
  )
}
