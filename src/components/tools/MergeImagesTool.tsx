'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
  computeMergeLayout,
  drawMergedImage,
  layoutToPreviewScale,
  scaleMergeLayout,
  type MergeDirection,
  type ResizeStrategy,
} from '@/lib/mergeImages';

const MAX_BYTES = 20 * 1024 * 1024;
const MAX_IMAGES = 10;
const PREVIEW_MAX_EDGE = 800;

function isValidHex(hex: string): boolean {
  return /^#([0-9a-fA-F]{6})$/.test(hex);
}

function normalizeHex(hex: string): string | null {
  let h = hex.startsWith('#') ? hex : `#${hex}`;
  if (/^#([0-9a-fA-F]{3})$/.test(h)) {
    const r = h[1], g = h[2], b = h[3];
    h = `#${r}${r}${g}${g}${b}${b}`;
  }
  return isValidHex(h) ? h.toLowerCase() : null;
}

function acceptMime(f: File): boolean {
  const t = f.type.toLowerCase();
  return (
    t === 'image/jpeg' ||
    t === 'image/png' ||
    t === 'image/webp' ||
    t === 'image/bmp' ||
    t === 'image/gif' ||
    t === 'image/jpg'
  );
}

function loadFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('load_failed'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('read_failed'));
    reader.readAsDataURL(file);
  });
}

type Item = { id: string; file: File; image: HTMLImageElement };

export default function MergeImagesTool() {
  const t = useTranslations('tools.merge-images');
  const tc = useTranslations('common');

  const [items, setItems] = useState<Item[]>([]);
  const [direction, setDirection] = useState<MergeDirection>('horizontal');
  const [resizeStrategy, setResizeStrategy] = useState<ResizeStrategy>('largest');
  const [constrainProportions, setConstrainProportions] = useState(true);
  const [borderThickness, setBorderThickness] = useState(0);
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [borderColorInput, setBorderColorInput] = useState('#ffffff');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [backgroundColorInput, setBackgroundColorInput] = useState('#ffffff');
  const [bgTransparent, setBgTransparent] = useState(false);
  const [outputFormat, setOutputFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png');
  const [jpgQuality, setJpgQuality] = useState(92);
  const [webpQuality, setWebpQuality] = useState(85);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [dragReorderIndex, setDragReorderIndex] = useState<number | null>(null);
  const [colorErrorBorder, setColorErrorBorder] = useState(false);
  const [colorErrorBg, setColorErrorBg] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const appendFiles = useCallback(
    async (fileList: FileList | File[]) => {
      setError(null);
      const arr = Array.from(fileList);
      const next: Item[] = [];
      for (const file of arr) {
        if (!acceptMime(file)) {
          setError(t('error_format'));
          continue;
        }
        if (file.size > MAX_BYTES) {
          setError(t('error_size'));
          continue;
        }
        try {
          const image = await loadFile(file);
          next.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, file, image });
        } catch {
          setError(tc('errorLoadFailed'));
        }
      }
      if (!next.length) return;
      let noRoom = false;
      let overCap = false;
      setItems((prev) => {
        const room = MAX_IMAGES - prev.length;
        if (room <= 0) {
          noRoom = true;
          return prev;
        }
        const slice = next.slice(0, room);
        overCap = next.length > room;
        return [...prev, ...slice];
      });
      if (noRoom || overCap) setError(t('error_max'));
    },
    [t, tc],
  );

  const removeAt = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
    setPreviewDataUrl(null);
    setError(null);
    setDirection('horizontal');
    setResizeStrategy('largest');
    setConstrainProportions(true);
    setBorderThickness(0);
    setBorderColor('#ffffff');
    setBorderColorInput('#ffffff');
    setBackgroundColor('#ffffff');
    setBackgroundColorInput('#ffffff');
    setBgTransparent(false);
    setOutputFormat('image/png');
    setJpgQuality(92);
    setWebpQuality(85);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const onReorderDrop = useCallback((toIndex: number, fromIndex: number) => {
    if (fromIndex === toIndex) return;
    setItems((prev) => {
      const copy = [...prev];
      const [removed] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, removed);
      return copy;
    });
  }, []);

  useEffect(() => {
    if (items.length < 2) {
      setPreviewDataUrl(null);
      return;
    }

    if (previewDebounceRef.current) clearTimeout(previewDebounceRef.current);
    previewDebounceRef.current = setTimeout(() => {
      const images = items.map((i) => i.image);
      const layoutFull = computeMergeLayout({
        naturalWidths: images.map((img) => img.naturalWidth),
        naturalHeights: images.map((img) => img.naturalHeight),
        direction,
        resizeStrategy,
        constrainProportions,
        borderThickness,
      });
      const ps = layoutToPreviewScale(layoutFull, PREVIEW_MAX_EDGE);
      const layout = ps < 1 ? scaleMergeLayout(layoutFull, ps) : layoutFull;

      const transparentLetterbox =
        bgTransparent && resizeStrategy === 'none' && outputFormat === 'image/png';

      const canvas = document.createElement('canvas');
      drawMergedImage(canvas, images, layout, direction, {
        backgroundColor,
        borderColor,
        transparentBackground: transparentLetterbox,
        exportOpaque: !transparentLetterbox,
      });
      setPreviewDataUrl(canvas.toDataURL('image/webp', 0.85));
    }, 220);

    return () => {
      if (previewDebounceRef.current) clearTimeout(previewDebounceRef.current);
    };
  }, [
    items,
    direction,
    resizeStrategy,
    constrainProportions,
    borderThickness,
    borderColor,
    backgroundColor,
    bgTransparent,
    outputFormat,
  ]);

  useEffect(() => {
    if (outputFormat !== 'image/png' && bgTransparent) setBgTransparent(false);
  }, [outputFormat, bgTransparent]);

  const mergeAndDownload = useCallback(() => {
    if (items.length < 2) {
      setError(t('error_min'));
      return;
    }
    setProcessing(true);
    setError(null);
    requestAnimationFrame(() => {
      try {
        const images = items.map((i) => i.image);
        const layout = computeMergeLayout({
          naturalWidths: images.map((img) => img.naturalWidth),
          naturalHeights: images.map((img) => img.naturalHeight),
          direction,
          resizeStrategy,
          constrainProportions,
          borderThickness,
        });
        const transparentLetterbox =
          bgTransparent && resizeStrategy === 'none' && outputFormat === 'image/png';

        const canvas = document.createElement('canvas');
        drawMergedImage(canvas, images, layout, direction, {
          backgroundColor,
          borderColor,
          transparentBackground: transparentLetterbox,
          exportOpaque: !transparentLetterbox,
        });

        const ext =
          outputFormat === 'image/png' ? 'png' : outputFormat === 'image/jpeg' ? 'jpg' : 'webp';
        const q = outputFormat === 'image/jpeg' ? jpgQuality / 100 : webpQuality / 100;
        canvas.toBlob(
          (blob) => {
            setProcessing(false);
            if (!blob) {
              setError(tc('errorReadFailed'));
              return;
            }
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nanoimage-merged-${Date.now()}.${ext}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          },
          outputFormat,
          outputFormat === 'image/png' ? undefined : q,
        );
      } catch {
        setProcessing(false);
        setError(tc('errorReadFailed'));
      }
    });
  }, [
    items,
    direction,
    resizeStrategy,
    constrainProportions,
    borderThickness,
    borderColor,
    backgroundColor,
    bgTransparent,
    outputFormat,
    jpgQuality,
    webpQuality,
    t,
    tc,
  ]);

  const applyBorderHex = useCallback((raw: string) => {
    const n = normalizeHex(raw);
    if (n) {
      setBorderColor(n);
      setBorderColorInput(n);
      setColorErrorBorder(false);
    } else setColorErrorBorder(true);
  }, []);

  const applyBgHex = useCallback((raw: string) => {
    const n = normalizeHex(raw);
    if (n) {
      setBackgroundColor(n);
      setBackgroundColorInput(n);
      setColorErrorBg(false);
    } else setColorErrorBg(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div
            className={`upload-zone min-h-[140px] ${dragOver ? 'drag-over' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragOver(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (e.dataTransfer.files?.length) void appendFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/bmp,image/gif"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) void appendFiles(e.target.files);
              }}
            />
            <div className="flex flex-col items-center gap-2 py-4 px-4 text-center">
              <span className="text-3xl">⬡</span>
              <p className="font-display text-sm font-bold text-text">{t('upload_label')}</p>
              <p className="font-mono text-[11px] text-muted">{t('upload_limit')}</p>
              {error && <p className="font-mono text-[11px] text-accent2">{error}</p>}
              <button
                type="button"
                className="btn-primary mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                {tc('uploadImage')}
              </button>
            </div>
          </div>

          {items.length > 0 && (
            <div className="panel-card space-y-3">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <p className="label-mono">{t('drag_reorder')}</p>
                <button type="button" className="font-mono text-[11px] text-muted hover:text-accent uppercase" onClick={clearAll}>
                  {t('btn_clear')}
                </button>
              </div>
              <ul className="flex flex-wrap gap-3">
                {items.map((item, index) => (
                  <li
                    key={item.id}
                    draggable
                    onDragStart={() => setDragReorderIndex(index)}
                    onDragEnd={() => setDragReorderIndex(null)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (dragReorderIndex !== null) onReorderDrop(index, dragReorderIndex);
                      setDragReorderIndex(null);
                    }}
                    className="relative group w-20 h-20 rounded-lg border border-border overflow-hidden bg-surface-hover cursor-grab active:cursor-grabbing"
                  >
                    <img src={item.image.src} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      className="absolute top-1 right-1 w-6 h-6 rounded bg-bg/90 border border-border text-[10px] leading-6 opacity-0 group-hover:opacity-100"
                      onClick={() => removeAt(index)}
                      aria-label={tc('removeImage')}
                    >
                      ×
                    </button>
                    <span
                      className="absolute bottom-0 left-0 right-0 font-mono text-[9px] text-text/90 bg-bg/80 truncate px-1"
                      title={`${item.file.name} · ${item.image.naturalWidth}×${item.image.naturalHeight} · ${(item.file.size / 1024).toFixed(0)} KB`}
                    >
                      {item.file.name}
                    </span>
                  </li>
                ))}
              </ul>
              {items.length < MAX_IMAGES && (
                <button
                  type="button"
                  className="font-mono text-[11px] text-accent hover:underline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {tc('addMore')}
                </button>
              )}
            </div>
          )}

          <div className="panel-card space-y-4">
            <div>
              <label className="block label-mono mb-2">{t('direction')}</label>
              <div className="flex flex-wrap gap-3">
                {(['horizontal', 'vertical'] as const).map((d) => (
                  <label key={d} className="flex items-center gap-2 font-mono text-[12px] text-muted cursor-pointer">
                    <input
                      type="radio"
                      name="merge-dir"
                      checked={direction === d}
                      onChange={() => setDirection(d)}
                      className="accent-accent"
                    />
                    {d === 'horizontal' ? t('direction_horizontal') : t('direction_vertical')}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="resize-strategy" className="block label-mono mb-2">
                {t('resize_strategy')}
              </label>
              <select
                id="resize-strategy"
                value={resizeStrategy}
                onChange={(e) => setResizeStrategy(e.target.value as ResizeStrategy)}
                className="input-dark w-full"
              >
                <option value="none">{t('resize_none')}</option>
                <option value="smallest">{t('resize_smallest')}</option>
                <option value="largest">{t('resize_largest')}</option>
                <option value="first">{t('resize_first')}</option>
              </select>
            </div>

            <label className="flex items-center gap-2 font-mono text-[12px] text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={constrainProportions}
                onChange={(e) => setConstrainProportions(e.target.checked)}
                className="accent-accent"
              />
              {t('keep_ratio')}
            </label>

            <div>
              <label htmlFor="merge-border-t" className="block label-mono mb-2">
                {t('border_thickness')}
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="merge-border-t"
                  type="range"
                  min={0}
                  max={100}
                  value={borderThickness}
                  onChange={(e) => setBorderThickness(parseInt(e.target.value, 10))}
                  className="slider-accent flex-1"
                />
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={borderThickness}
                  onChange={(e) =>
                    setBorderThickness(Math.max(0, Math.min(100, Math.floor(Number(e.target.value)) || 0)))
                  }
                  className="input-dark w-16 text-center"
                />
              </div>
            </div>

            <div>
              <span className="block label-mono mb-2">{t('border_color')}</span>
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="color"
                  value={borderColor}
                  onChange={(e) => {
                    setBorderColor(e.target.value);
                    setBorderColorInput(e.target.value);
                    setColorErrorBorder(false);
                  }}
                  className="w-12 h-10 rounded-lg cursor-pointer border border-border"
                />
                <input
                  type="text"
                  value={borderColorInput}
                  onChange={(e) => setBorderColorInput(e.target.value)}
                  onBlur={() => applyBorderHex(borderColorInput)}
                  onKeyDown={(e) => e.key === 'Enter' && applyBorderHex(borderColorInput)}
                  className={`input-dark w-28 ${colorErrorBorder ? 'border-red-500' : ''}`}
                />
              </div>
            </div>

            <div>
              <span className="block label-mono mb-2">{t('bg_color')}</span>
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => {
                    setBackgroundColor(e.target.value);
                    setBackgroundColorInput(e.target.value);
                    setColorErrorBg(false);
                  }}
                  disabled={bgTransparent}
                  className="w-12 h-10 rounded-lg cursor-pointer border border-border disabled:opacity-40"
                />
                <input
                  type="text"
                  value={backgroundColorInput}
                  onChange={(e) => setBackgroundColorInput(e.target.value)}
                  onBlur={() => applyBgHex(backgroundColorInput)}
                  onKeyDown={(e) => e.key === 'Enter' && applyBgHex(backgroundColorInput)}
                  disabled={bgTransparent}
                  className={`input-dark w-28 ${colorErrorBg ? 'border-red-500' : ''}`}
                />
              </div>
              {outputFormat === 'image/png' && resizeStrategy === 'none' && (
                <label className="flex items-center gap-2 mt-2 font-mono text-[11px] text-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bgTransparent}
                    onChange={(e) => setBgTransparent(e.target.checked)}
                    className="accent-accent"
                  />
                  {t('transparent_bg')}
                </label>
              )}
            </div>

            <div>
              <label htmlFor="merge-format" className="block label-mono mb-2">
                {t('output_format')}
              </label>
              <select
                id="merge-format"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as typeof outputFormat)}
                className="input-dark w-full"
              >
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>

            {outputFormat === 'image/jpeg' && (
              <div>
                <label htmlFor="merge-jpg-q" className="block label-mono mb-2">
                  {t('quality')} (JPG)
                </label>
                <input
                  id="merge-jpg-q"
                  type="range"
                  min={1}
                  max={100}
                  value={jpgQuality}
                  onChange={(e) => setJpgQuality(parseInt(e.target.value, 10))}
                  className="slider-accent w-full"
                />
                <span className="font-mono text-[11px] text-muted">{jpgQuality}</span>
              </div>
            )}

            {outputFormat === 'image/webp' && (
              <div>
                <label htmlFor="merge-webp-q" className="block label-mono mb-2">
                  {t('quality')} (WebP)
                </label>
                <input
                  id="merge-webp-q"
                  type="range"
                  min={1}
                  max={100}
                  value={webpQuality}
                  onChange={(e) => setWebpQuality(parseInt(e.target.value, 10))}
                  className="slider-accent w-full"
                />
                <span className="font-mono text-[11px] text-muted">{webpQuality}</span>
              </div>
            )}

            <button
              type="button"
              className="btn-primary w-full"
              disabled={items.length < 2 || processing}
              onClick={mergeAndDownload}
            >
              {processing ? t('processing') : t('btn_merge')}
            </button>
          </div>
        </div>

        <div className="lg:sticky lg:top-20 space-y-3">
          <h2 className="font-display text-[13px] font-bold uppercase tracking-[2px] text-text flex items-center gap-2">
            <span className="dot dot-blue" />
            {tc('preview')}
          </h2>
          <div className="panel-card min-h-[200px] flex items-center justify-center p-4 bg-surface-hover/30">
            {items.length < 2 ? (
              <p className="font-mono text-[12px] text-muted text-center">{t('preview_empty')}</p>
            ) : previewDataUrl ? (
              <img src={previewDataUrl} alt="" className="max-w-full max-h-[70vh] object-contain rounded-lg border border-border" />
            ) : (
              <p className="font-mono text-[12px] text-muted">{t('processing')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
