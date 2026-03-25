'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import ImageUploader from '@/components/ImageUploader';
import DownloadButton from '@/components/DownloadButton';

type Position =
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'center' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'tiled';

interface ImageItem {
  image: HTMLImageElement;
  file: File;
  result: string | null;
}

const DEFAULT_TEXT = 'NanoImage';
const DEFAULT_FONT_SIZE = 24;
const DEFAULT_COLOR = '#ffffff';
const DEFAULT_OPACITY = 50;
const DEFAULT_POSITION: Position = 'bottom-right';

function applyWatermarkToCanvas(
  image: HTMLImageElement,
  text: string,
  fontSize: number,
  fontColor: string,
  opacity: number,
  position: Position
): string {
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(image, 0, 0);

  const trimmed = text.trim();
  if (!trimmed) return canvas.toDataURL('image/png');

  ctx.globalAlpha = opacity / 100;
  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  ctx.fillStyle = fontColor;

  const padding = 20;
  const maxWidth = canvas.width - padding * 2;
  const lineHeight = fontSize * 1.3;

  if (position === 'tiled') {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const textWidth = ctx.measureText(trimmed).width;
    const spacingX = textWidth + 80;
    const spacingY = fontSize + 80;
    for (let y = 0; y < canvas.height + spacingY; y += spacingY) {
      for (let x = 0; x < canvas.width + spacingX; x += spacingX) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 6);
        ctx.fillText(trimmed, 0, 0);
        ctx.restore();
      }
    }
  } else {
    ctx.textBaseline = 'top';

    const words = trimmed.split(' ');
    const lines: string[] = [];
    let current = '';
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);

    const blockHeight = (lines.length - 1) * lineHeight + fontSize;
    let startX: number;
    let startY: number;
    let align: CanvasTextAlign;

    const row = position.startsWith('top') ? 'top' : position.startsWith('bottom') ? 'bottom' : 'middle';
    const col = position.endsWith('left') ? 'left' : position.endsWith('right') ? 'right' : 'center';

    if (col === 'left') { startX = padding; align = 'left'; }
    else if (col === 'right') { startX = canvas.width - padding; align = 'right'; }
    else { startX = canvas.width / 2; align = 'center'; }

    if (row === 'top') { startY = padding; }
    else if (row === 'bottom') { startY = canvas.height - padding - blockHeight; }
    else { startY = (canvas.height - blockHeight) / 2; }

    ctx.textAlign = align;
    lines.forEach((line, i) => {
      ctx.fillText(line, startX, startY + i * lineHeight);
    });
  }

  return canvas.toDataURL('image/png');
}

export default function WatermarkTool() {
  const t = useTranslations('tools.watermark-image');
  const tc = useTranslations('common');

  const [images, setImages] = useState<ImageItem[]>([]);
  const [text, setText] = useState(DEFAULT_TEXT);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [fontColor, setFontColor] = useState(DEFAULT_COLOR);
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY);
  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);
  const [uploaderKey, setUploaderKey] = useState(0);
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  // Re-apply watermark to all images whenever settings change
  useEffect(() => {
    if (images.length === 0) return;
    setImages(prev =>
      prev.map(item => ({
        ...item,
        result: applyWatermarkToCanvas(item.image, text, fontSize, fontColor, opacity, position),
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, fontSize, fontColor, opacity, position]);

  const handleMultipleLoad = useCallback(
    (loaded: { image: HTMLImageElement; file: File }[]) => {
      const newItems: ImageItem[] = loaded.map(({ image, file }) => ({
        image,
        file,
        result: applyWatermarkToCanvas(image, text, fontSize, fontColor, opacity, position),
      }));
      setImages(prev => [...prev, ...newItems]);
      setUploaderKey(k => k + 1);
    },
    [text, fontSize, fontColor, opacity, position]
  );

  const handleImageLoad = useCallback(
    (img: HTMLImageElement, f: File) => {
      handleMultipleLoad([{ image: img, file: f }]);
    },
    [handleMultipleLoad]
  );

  const handleAddMoreFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const fileArray = Array.from(e.target.files);
      const promises = fileArray.map(
        file =>
          new Promise<{ image: HTMLImageElement; file: File }>((resolve, reject) => {
            if (!file.type.startsWith('image/')) { reject(); return; }
            const reader = new FileReader();
            reader.onload = ev => {
              const img = new Image();
              img.onload = () => resolve({ image: img, file });
              img.onerror = reject;
              img.src = ev.target?.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );
      Promise.allSettled(promises).then(results => {
        const loaded = results
          .filter((r): r is PromiseFulfilledResult<{ image: HTMLImageElement; file: File }> => r.status === 'fulfilled')
          .map(r => r.value);
        if (loaded.length > 0) handleMultipleLoad(loaded);
        if (addMoreInputRef.current) addMoreInputRef.current.value = '';
      });
    },
    [handleMultipleLoad]
  );

  const handleRemoveImage = useCallback((index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleReset = useCallback(() => {
    setText(DEFAULT_TEXT);
    setFontSize(DEFAULT_FONT_SIZE);
    setFontColor(DEFAULT_COLOR);
    setOpacity(DEFAULT_OPACITY);
    setPosition(DEFAULT_POSITION);
  }, []);

  const handleNewUpload = useCallback(() => {
    setImages([]);
    setUploaderKey(k => k + 1);
    setText(DEFAULT_TEXT);
    setFontSize(DEFAULT_FONT_SIZE);
    setFontColor(DEFAULT_COLOR);
    setOpacity(DEFAULT_OPACITY);
    setPosition(DEFAULT_POSITION);
  }, []);

  const handleDownloadAll = useCallback(() => {
    images.forEach((item, index) => {
      if (!item.result) return;
      const a = document.createElement('a');
      a.href = item.result;
      a.download = `watermarked-${item.file.name.replace(/\.[^.]+$/, '')}.png`;
      setTimeout(() => { a.click(); }, index * 400);
    });
  }, [images]);

  const positions: { value: Position; label: string }[] = [
    { value: 'top-left', label: t('topLeft') },
    { value: 'top-center', label: t('topCenter') },
    { value: 'top-right', label: t('topRight') },
    { value: 'middle-left', label: t('middleLeft') },
    { value: 'center', label: t('center') },
    { value: 'middle-right', label: t('middleRight') },
    { value: 'bottom-left', label: t('bottomLeft') },
    { value: 'bottom-center', label: t('bottomCenter') },
    { value: 'bottom-right', label: t('bottomRight') },
  ];

  if (images.length === 0) {
    return (
      <ImageUploader
        key={uploaderKey}
        onImageLoad={handleImageLoad}
        multiple
        maxFiles={20}
        onMultipleLoad={handleMultipleLoad}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="panel-card space-y-4">
        <div>
          <label className="block label-mono mb-1">{t('watermarkText')}</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-dark"
            placeholder="Enter watermark text"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block label-mono mb-1">{t('fontSize')}: {fontSize}px</label>
            <input
              type="range"
              min={8}
              max={72}
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="slider-accent"
            />
          </div>
          <div>
            <label className="block label-mono mb-1">{t('fontColor')}</label>
            <input
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="w-12 h-10 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block label-mono mb-1">{t('opacity')}: {opacity}%</label>
            <input
              type="range"
              min={10}
              max={100}
              value={opacity}
              onChange={(e) => setOpacity(parseInt(e.target.value))}
              className="slider-accent"
            />
          </div>
        </div>

        <div>
          <label className="block label-mono mb-2">{t('position')}</label>
          <div className="grid grid-cols-3 gap-2 max-w-xs">
            {positions.map((p) => (
              <button
                key={p.value}
                onClick={() => setPosition(p.value)}
                className={`btn-tool text-xs transition-colors${position === p.value ? ' active' : ''}`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPosition('tiled')}
            className={`mt-2 btn-tool transition-colors${position === 'tiled' ? ' active' : ''}`}
          >
            {t('tiled')}
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={handleReset} className="btn-secondary">
            {tc('reset')}
          </button>
          <button onClick={handleNewUpload} className="btn-secondary">
            {tc('uploadNew')}
          </button>
          {/* Add more images */}
          <input
            ref={addMoreInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleAddMoreFiles}
          />
          <button
            onClick={() => addMoreInputRef.current?.click()}
            className="btn-secondary"
          >
            {tc('addMore')}
          </button>
          {images.length > 1 && (
            <button onClick={handleDownloadAll} className="btn-primary">
              {tc('downloadAll')} ({images.length})
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {images.map((item, idx) => (
          <div key={idx} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] text-muted truncate max-w-[70%]">
                {item.file.name}
              </span>
              <button
                onClick={() => handleRemoveImage(idx)}
                className="font-mono text-[11px] text-accent2 hover:text-accent2/80 transition-colors flex-shrink-0"
                aria-label={tc('removeImage')}
              >
                {tc('removeImage')}
              </button>
            </div>
            <div className="bg-bg rounded-lg overflow-hidden flex items-center justify-center p-4">
              {item.result ? (
                <img
                  src={item.result}
                  alt="Watermarked"
                  className="max-w-full max-h-80 object-contain"
                />
              ) : (
                <p className="text-muted">{tc('preview')}</p>
              )}
            </div>
            {item.result && (
              <div className="mt-3 flex justify-end">
                <DownloadButton
                  dataUrl={item.result}
                  filename={`watermarked-${item.file.name.replace(/\.[^.]+$/, '')}.png`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
