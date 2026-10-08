'use client'
/**
 * AI tool pages — merged from ai.nanoimage.net (2026-07).
 * Each wrapper renders the on-device AI tool component inside the main-site
 * tool page shell (breadcrumbs + hero + tool). All models run locally
 * (WebGPU / WASM); images never leave the browser — same privacy promise
 * as every other NanoImage tool.
 */
import type { Tool } from '@/src/data'
import { useI18n } from '@/src/i18n'
import { Breadcrumbs } from '@/src/shared/breadcrumbs'
import { BackgroundRemoverTool } from '@/src/ai/tools/BackgroundRemoverTool'
import { ObjectRemoverTool } from '@/src/ai/tools/ObjectRemoverTool'
import { PhotoRestoreTool } from '@/src/ai/tools/PhotoRestoreTool'
import { SmartCropTool } from '@/src/ai/tools/SmartCropTool'
import '@/src/ai/ai-tools.css'

function AiToolShell({
  tool,
  navigate,
  children,
}: {
  tool: Tool
  navigate: (to: string) => void
  children: React.ReactNode
}) {
  const { t } = useI18n()
  const toolsData = t.toolsData as Record<string, { name?: string; description?: string }>
  const name = toolsData?.[tool.slug]?.name ?? tool.name
  return (
    <>
      <Breadcrumbs current={name} categoryId={tool.category} navigate={navigate} />
      <header className="ai-tool-hero">
        <h1>{tool.title}</h1>
        <p>{tool.subtitle}</p>
      </header>
      <div className="tool-wrap">{children}</div>
    </>
  )
}

export function BackgroundRemoverPage({ tool, navigate }: { tool: Tool; navigate: (to: string) => void }) {
  return (
    <AiToolShell tool={tool} navigate={navigate}>
      <BackgroundRemoverTool
        modelSizeMb={168}
        modelNote="First use downloads the RMBG-1.4 model (~168 MB). Cached locally for offline reuse."
      />
    </AiToolShell>
  )
}

export function ObjectRemoverPage({ tool, navigate }: { tool: Tool; navigate: (to: string) => void }) {
  return (
    <AiToolShell tool={tool} navigate={navigate}>
      <ObjectRemoverTool />
    </AiToolShell>
  )
}

export function PhotoRestorePage({ tool, navigate }: { tool: Tool; navigate: (to: string) => void }) {
  return (
    <AiToolShell tool={tool} navigate={navigate}>
      <PhotoRestoreTool />
    </AiToolShell>
  )
}

export function SmartCropPage({ tool, navigate }: { tool: Tool; navigate: (to: string) => void }) {
  return (
    <AiToolShell tool={tool} navigate={navigate}>
      <SmartCropTool />
    </AiToolShell>
  )
}
