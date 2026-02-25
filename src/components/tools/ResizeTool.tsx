'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ImageUploader from '@/components/ImageUploader';
import DownloadButton from '@/components/DownloadButton';

const PRESETS = [
  { label: '1920×1080', w: 1920, h: 1080 },
  { label: '1280×720', w: 1280, h: 720 },
  { label: '800×600', w: 800, h: 600 },
  { label: '640×480', w: 640, h: 480 },
];

const PERCENTAGES = [25, 50, 75, 200];

export default function ResizeTool() {
  const t = useTranslations('tools.resize-image');
  const tc = useTranslations('common');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [lockRatio, setLockRatio] = useState(true);
  const [mode, setMode] = useState<'pixels' | 'percentage'>('pixels');
  const [percentage, setPercentage] = useState(100);
  const [result, setResult] = useState<string | null>(null);

  // Validation: width and height must be >= 1
  const isValid = width >= 1 && height >= 1;

  const handleImageLoad = useCallback((img: HTMLImageElement, f: File) => {
    setImage(img);
    setFile(f);
    setWidth(img.naturalWidth);
    setHeight(img.naturalHeight);
    setOriginalWidth(img.naturalWidth);
    setOriginalHeight(img.naturalHeight);
    setResult(null);
    setPercentage(100);
  }, []);

  const handleWidthChange = useCallback((w: number) => {
    // Sanitize: remove leading zeros, clamp to non-negative
    const sanitized = Math.max(1, Math.floor(w));
    setWidth(sanitized);
    if (lockRatio && originalWidth) {
      setHeight(Math.round((sanitized / originalWidth) * originalHeight));
    }
  }, [lockRatio, originalWidth, originalHeight]);

  const handleHeightChange = useCallback((h: number) => {
    const sanitized = Math.max(1, Math.floor(h));
    setHeight(sanitized);
    if (lockRatio && originalHeight) {
      setWidth(Math.round((sanitized / originalHeight) * originalWidth));
    }
  }, [lockRatio, originalWidth, originalHeight]);

  const handlePercentageChange = useCallback((pct: number) => {
    setPercentage(pct);
    setWidth(Math.max(1, Math.round(originalWidth * pct / 100)));
    setHeight(Math.max(1, Math.round(originalHeight * pct / 100)));
  }, [originalWidth, originalHeight]);

  // Auto-resize: generate preview whenever width/height changes (if valid)
  useEffect(() => {
    if (!image || !isValid) {
      setResult(null);
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(image, 0, 0, width, height);
    setResult(canvas.toDataURL('image/png'));
  }, [image, width, height, isValid]);

  // Reset: restore original dimensions, keep image
  const handleReset = useCallback(() => {
    if (originalWidth && originalHeight) {
      setWidth(originalWidth);
      setHeight(originalHeight);
      setPercentage(100);
      setResult(null);
    }
  }, [originalWidth, originalHeight]);

  // Upload new image
  const handleNewUpload = useCallback(() => {
    setImage(null);
    setFile(null);
    setResult(null);
    setWidth(0);
    setHeight(0);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setPercentage(100);
  }, []);

  if (!image) {
    return <ImageUploader onImageLoad={handleImageLoad} />;
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="panel-card space-y-4">
        {/* Mode toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setMode('pixels')}
            className={`btn-tool transition-colors ${mode === 'pixels' ? 'active' : ''}`}
          >
            {t('byPixels')}
          </button>
          <button
            onClick={() => {
              setMode('percentage');
              if (originalWidth > 0) setPercentage(Math.min(400, Math.max(10, Math.round(width / originalWidth * 100))));
            }}
            className={`btn-tool transition-colors ${mode === 'percentage' ? 'active' : ''}`}
          >
            {t('byPercentage')}
          </button>
        </div>

        {mode === 'pixels' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block label-mono mb-1">{tc('width')} (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value) || 1)}
                  className="input-dark"
                  min={1}
                />
              </div>
              <div>
                <label className="block label-mono mb-1">{tc('height')} (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(parseInt(e.target.value) || 1)}
                  className="input-dark"
                  min={1}
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={lockRatio}
                onChange={(e) => setLockRatio(e.target.checked)}
                className="w-4 h-4 rounded accent-[var(--accent)]"
              />
              <span className="font-mono text-[12px] text-text">{t('lockAspectRatio')}</span>
            </label>

            {/* Presets */}
            <div>
              <label className="block label-mono mb-2">{t('presetSizes')}</label>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => { setWidth(p.w); setHeight(p.h); }}
                    className={`btn-tool ${width === p.w && height === p.h ? 'active' : ''}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <label className="block label-mono mb-2">
              {t('percentage')}: <span className="value-accent">{percentage}%</span>
            </label>
            <input
              type="range"
              min={10}
              max={400}
              value={percentage}
              onChange={(e) => handlePercentageChange(parseInt(e.target.value))}
              className="slider-accent"
            />
            <div className="flex gap-2 mt-2">
              {PERCENTAGES.map((p) => (
                <button
                  key={p}
                  onClick={() => handlePercentageChange(p)}
                  className={`btn-tool ${percentage === p ? 'active' : ''}`}
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="font-mono text-[11px] text-muted">
          {tc('dimensions')}: {width} × {height} px
          {width !== originalWidth || height !== originalHeight ? (
            <span className="text-accent ml-2">
              (original: {originalWidth} × {originalHeight})
            </span>
          ) : null}
        </p>

        <div className="flex gap-3">
          <button onClick={handleReset} className="btn-secondary">
            {tc('reset')}
          </button>
          <button onClick={handleNewUpload} className="btn-secondary">
            {tc('uploadImage')}
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg p-4">
          <h3 className="label-mono mb-2">
            {tc('original')} ({originalWidth}×{originalHeight})
          </h3>
          <div className="aspect-video bg-bg rounded-lg overflow-hidden flex items-center justify-center">
            <img src={image.src} alt="Original" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <h3 className="label-mono mb-2">
            {tc('result')} ({width}×{height})
          </h3>
          <div className="aspect-video bg-bg rounded-lg overflow-hidden flex items-center justify-center">
            {result ? (
              <img src={result} alt="Resized" className="max-w-full max-h-full object-contain" />
            ) : (
              <p className="text-muted">{tc('preview')}</p>
            )}
          </div>
          {result && (
            <div className="mt-3 flex justify-end">
              <DownloadButton dataUrl={result} filename={`resized-${(file?.name || 'image.png').replace(/\.[^.]+$/, '')}.png`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
