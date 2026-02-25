'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import ImageUploader from '@/components/ImageUploader';
import DownloadButton from '@/components/DownloadButton';

export default function MemeGeneratorTool() {
  const t = useTranslations('tools.meme-generator');
  const tc = useTranslations('common');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState('#ffffff');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [uppercase, setUppercase] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const renderRef = useRef(0);

  useEffect(() => {
    if (!image) return;

    const currentRender = ++renderRef.current;

    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d')!;

    ctx.drawImage(image, 0, 0);

    ctx.fillStyle = textColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.textAlign = 'center';
    ctx.lineJoin = 'round';

    const top = uppercase ? topText.toUpperCase() : topText;
    const bottom = uppercase ? bottomText.toUpperCase() : bottomText;
    const padding = 20;
    const maxWidth = canvas.width - padding * 2;

    const drawMemeText = (str: string, x: number, y: number, baseFontSize: number) => {
      let size = baseFontSize;
      ctx.font = `bold ${size}px Impact, Arial Black, sans-serif`;
      while (ctx.measureText(str).width > maxWidth && size > 12) {
        size -= 2;
        ctx.font = `bold ${size}px Impact, Arial Black, sans-serif`;
      }
      ctx.strokeText(str, x, y);
      ctx.fillText(str, x, y);
    };

    if (top) {
      ctx.textBaseline = 'top';
      drawMemeText(top, canvas.width / 2, padding, fontSize);
    }

    if (bottom) {
      ctx.textBaseline = 'bottom';
      drawMemeText(bottom, canvas.width / 2, canvas.height - padding, fontSize);
    }

    if (currentRender === renderRef.current) {
      setResult(canvas.toDataURL('image/png'));
    }
  }, [image, topText, bottomText, fontSize, textColor, strokeColor, strokeWidth, uppercase]);

  const handleImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img);
    setTopText('');
    setBottomText('');
    setFontSize(48);
    setTextColor('#ffffff');
    setStrokeColor('#000000');
    setStrokeWidth(3);
    setUppercase(true);
  }, []);

  const handleReset = useCallback(() => {
    setTopText('');
    setBottomText('');
    setFontSize(48);
    setTextColor('#ffffff');
    setStrokeColor('#000000');
    setStrokeWidth(3);
    setUppercase(true);
  }, []);

  const handleNewUpload = useCallback(() => {
    setImage(null);
    setResult(null);
    setTopText('');
    setBottomText('');
  }, []);

  if (!image) {
    return <ImageUploader onImageLoad={handleImageLoad} />;
  }

  return (
    <div className="space-y-6">
      <div className="panel-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block label-mono mb-1">{t('topText')}</label>
            <input
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              className="input-dark"
              placeholder="Enter top text..."
            />
          </div>
          <div>
            <label className="block label-mono mb-1">{t('bottomText')}</label>
            <input
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              className="input-dark"
              placeholder="Enter bottom text..."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block label-mono mb-1">{t('fontSize')}: {fontSize}px</label>
            <input
              type="range"
              min={20}
              max={100}
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="slider-accent"
            />
          </div>
          <div>
            <label className="block label-mono mb-1">{t('textColor')}</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-12 h-10 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block label-mono mb-1">{t('strokeColor')}</label>
            <input
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              className="w-12 h-10 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block label-mono mb-1">{t('strokeWidth')}: {strokeWidth}px</label>
            <input
              type="range"
              min={0}
              max={10}
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
              className="slider-accent"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="w-4 h-4 rounded accent-[var(--accent)]"
            />
            <span className="label-mono">{t('uppercase')}</span>
          </label>
          <button onClick={handleReset} className="btn-secondary">
            {tc('reset')}
          </button>
          <button onClick={handleNewUpload} className="btn-secondary">
            {tc('uploadNew')}
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="label-mono mb-2">{tc('preview')}</h3>
        <div className="bg-bg rounded-lg overflow-hidden flex items-center justify-center p-4">
          {result ? (
            <img src={result} alt="Meme preview" className="max-w-full max-h-[500px] object-contain" />
          ) : (
            <p className="text-muted">{tc('preview')}</p>
          )}
        </div>
        {result && (
          <div className="mt-3 flex justify-end">
            <DownloadButton dataUrl={result} filename={`meme-${Date.now()}.png`} />
          </div>
        )}
      </div>
    </div>
  );
}
