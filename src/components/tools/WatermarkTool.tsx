'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import ImageUploader from '@/components/ImageUploader';
import DownloadButton from '@/components/DownloadButton';

type Position = 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'tiled';

const DEFAULT_TEXT = 'NanoImage';
const DEFAULT_FONT_SIZE = 24;
const DEFAULT_COLOR = '#ffffff';
const DEFAULT_OPACITY = 50;
const DEFAULT_POSITION: Position = 'bottom-right';

export default function WatermarkTool() {
  const t = useTranslations('tools.watermark-image');
  const tc = useTranslations('common');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState(DEFAULT_TEXT);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [fontColor, setFontColor] = useState(DEFAULT_COLOR);
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY);
  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);
  const [result, setResult] = useState<string | null>(null);
  const renderRef = useRef(0);

  const wrapText = useCallback((ctx: CanvasRenderingContext2D, str: string, maxWidth: number): string[] => {
    const words = str.split(' ');
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
    return lines;
  }, []);

  useEffect(() => {
    if (!image) return;

    const currentRender = ++renderRef.current;

    const trimmed = text.trim();
    if (!trimmed) {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(image, 0, 0);
      setResult(canvas.toDataURL('image/png'));
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(image, 0, 0);

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
      const lines = wrapText(ctx, trimmed, maxWidth);
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

    if (currentRender === renderRef.current) {
      setResult(canvas.toDataURL('image/png'));
    }
  }, [image, text, fontSize, fontColor, opacity, position, wrapText]);

  const handleImageLoad = useCallback((img: HTMLImageElement, f: File) => {
    setImage(img);
    setFile(f);
  }, []);

  const handleReset = useCallback(() => {
    setText(DEFAULT_TEXT);
    setFontSize(DEFAULT_FONT_SIZE);
    setFontColor(DEFAULT_COLOR);
    setOpacity(DEFAULT_OPACITY);
    setPosition(DEFAULT_POSITION);
  }, []);

  const handleNewUpload = useCallback(() => {
    setImage(null);
    setFile(null);
    setResult(null);
    setText(DEFAULT_TEXT);
    setFontSize(DEFAULT_FONT_SIZE);
    setFontColor(DEFAULT_COLOR);
    setOpacity(DEFAULT_OPACITY);
    setPosition(DEFAULT_POSITION);
  }, []);

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
    { value: 'tiled', label: t('tiled') },
  ];

  if (!image) {
    return <ImageUploader onImageLoad={handleImageLoad} />;
  }

  return (
    <div className="space-y-6">
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
            {positions.slice(0, 9).map((p) => (
              <button
                key={p.value}
                onClick={() => setPosition(p.value)}
                className={`btn-tool text-xs transition-colors${
                  position === p.value ? ' active' : ''
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPosition('tiled')}
            className={`mt-2 btn-tool transition-colors${
              position === 'tiled' ? ' active' : ''
            }`}
          >
            {t('tiled')}
          </button>
        </div>

        <div className="flex gap-3">
          <button onClick={handleReset} className="btn-secondary">
            {tc('reset')}
          </button>
          <button onClick={handleNewUpload} className="btn-secondary">
            {tc('uploadNew')}
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="label-mono mb-2">{tc('result')}</h3>
        <div className="bg-bg rounded-lg overflow-hidden flex items-center justify-center p-4">
          {result ? (
            <img src={result} alt="Watermarked" className="max-w-full max-h-96 object-contain" />
          ) : (
            <p className="text-muted">{tc('preview')}</p>
          )}
        </div>
        {result && (
          <div className="mt-3 flex justify-end">
            <DownloadButton dataUrl={result} filename={`watermarked-${(file?.name || 'image.png').replace(/\.[^.]+$/, '')}.png`} />
          </div>
        )}
      </div>
    </div>
  );
}
