'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { DragEvent } from 'react'
import type { Tool } from '@/src/data'
import { useI18n } from '@/src/i18n'
import { Breadcrumbs } from '@/src/shared/breadcrumbs'
import { HomeIcon } from '@/src/shared/tool-icons'

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
  const localGifName = t.toolsData[tool.slug]?.name ?? tool.name
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

  const seekVideo = useCallback((video: HTMLVideoElement, time: number) =>
    new Promise<void>((resolve) => {
      const onSeeked = () => { video.removeEventListener('seeked', onSeeked); resolve() }
      video.addEventListener('seeked', onSeeked)
      video.currentTime = time
    }), [])

  const generateThumbnails = useCallback(async (video: HTMLVideoElement, dur: number) => {
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
  }, [seekVideo])

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
  }, [generateThumbnails, t.videoGif.errorCannotRead, t.videoGif.errorTooLong, videoUrl])

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
        <Breadcrumbs current={localGifName} navigate={navigate} />

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
  const localMp3Name = t.toolsData[tool.slug]?.name ?? tool.name
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

  const seekVideoMp3 = useCallback((video: HTMLVideoElement, time: number) =>
    new Promise<void>((resolve) => {
      const onSeeked = () => { video.removeEventListener('seeked', onSeeked); resolve() }
      video.addEventListener('seeked', onSeeked)
      video.currentTime = time
    }), [])

  const generateThumbnailsMp3 = useCallback(async (video: HTMLVideoElement, dur: number) => {
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
  }, [seekVideoMp3])

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
  }, [generateThumbnailsMp3, t.videoMp3.errorCannotExtract, t.videoMp3.errorTooLong, videoUrl])

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
        <Breadcrumbs current={localMp3Name} navigate={navigate} />

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
  const { t } = useI18n()
  return (
    <section className="workspace coming-soon-workspace">
      <div className="compress-top">
        <section className="compress-title-card">
          <span className="title-doodle" aria-hidden="true"><HomeIcon name="sparkle" /></span>
          <h1>{t.toolsData[tool.slug]?.name ?? tool.name}</h1>
          <p>{t.toolsData[tool.slug]?.description ?? tool.description}</p>
          <div className="privacy-card">
            <span><HomeIcon name="bolt" /> {t.tool.alwaysFree}</span>
            <span><HomeIcon name="device" /> {t.tool.worksBrowser}</span>
          </div>
        </section>
      </div>
    </section>
  )
}

