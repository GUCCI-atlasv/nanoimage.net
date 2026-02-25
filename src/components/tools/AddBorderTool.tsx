'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ImageUploader from '@/components/ImageUploader';
import DownloadButton from '@/components/DownloadButton';

const PRESET_COLORS: { value: string; label: string }[] = [
  { value: '#000000', label: 'Black' },
  { value: '#ffffff', label: 'White' },
  { value: '#ff0000', label: 'Red' },
  { value: '#0066ff', label: 'Blue' },
  { value: '#00aa00', label: 'Green' },
];

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

export default function AddBorderTool() {
  const t = useTranslations('tools.add-border-to-image');
  const tc = useTranslations('common');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [borderWidth, setBorderWidth] = useState(10);
  const [borderColor, setBorderColor] = useState('#000000');
  const [colorInput, setColorInput] = useState('#000000');
  const [colorError, setColorError] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const applyBorder = useCallback((img: HTMLImageElement, width: number, color: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth + width * 2;
    canvas.height = img.naturalHeight + width * 2;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, width, width);

    return canvas.toDataURL('image/png');
  }, []);

  useEffect(() => {
    if (image) {
      setResult(applyBorder(image, borderWidth, borderColor));
    }
  }, [image, borderWidth, borderColor, applyBorder]);

  const handleImageLoad = useCallback((img: HTMLImageElement, f: File) => {
    setImage(img);
    setFile(f);
    setBorderWidth(10);
    setBorderColor('#000000');
    setColorInput('#000000');
    setColorError(false);
  }, []);

  const handleNewUpload = useCallback(() => {
    setImage(null);
    setFile(null);
    setResult(null);
  }, []);

  const handleReset = useCallback(() => {
    setBorderWidth(10);
    setBorderColor('#000000');
    setColorInput('#000000');
    setColorError(false);
  }, []);

  const applyColorInput = useCallback((value: string) => {
    const normalized = normalizeHex(value);
    if (normalized) {
      setBorderColor(normalized);
      setColorInput(normalized);
      setColorError(false);
    } else {
      setColorError(true);
    }
  }, []);

  const handleColorInputChange = useCallback((value: string) => {
    setColorInput(value);
    setColorError(false);
  }, []);

  const handleColorInputCommit = useCallback(() => {
    applyColorInput(colorInput);
  }, [colorInput, applyColorInput]);

  const handleColorPickerChange = useCallback((value: string) => {
    setBorderColor(value);
    setColorInput(value);
    setColorError(false);
  }, []);

  const handlePresetClick = useCallback((value: string) => {
    setBorderColor(value);
    setColorInput(value);
    setColorError(false);
  }, []);

  if (!image) {
    return <ImageUploader onImageLoad={handleImageLoad} />;
  }

  return (
    <div className="space-y-6">
      <div className="panel-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="border-width" className="block label-mono mb-2">
              {t('borderWidth')}
            </label>
            <div className="flex items-center gap-3">
              <input
                id="border-width"
                type="range"
                min={1}
                max={100}
                value={borderWidth}
                onChange={(e) => setBorderWidth(parseInt(e.target.value))}
                className="slider-accent flex-1"
                aria-valuemin={1}
                aria-valuemax={100}
                aria-valuenow={borderWidth}
                aria-valuetext={`${borderWidth}px`}
              />
              <input
                type="number"
                min={1}
                max={100}
                value={borderWidth}
                onChange={(e) => {
                  const v = Math.max(1, Math.min(100, Math.floor(Number(e.target.value))));
                  setBorderWidth(v);
                }}
                className="input-dark w-20 text-center"
                aria-label={t('borderWidth')}
              />
              <span className="text-muted text-sm font-mono">px</span>
            </div>
          </div>
          <div>
            <label htmlFor="border-color-text" className="block label-mono mb-2">{t('borderColor')}</label>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={borderColor}
                  onChange={(e) => handleColorPickerChange(e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer border border-border"
                  aria-label={t('borderColor')}
                />
                <div className="relative">
                  <input
                    id="border-color-text"
                    type="text"
                    value={colorInput}
                    onChange={(e) => handleColorInputChange(e.target.value)}
                    onBlur={handleColorInputCommit}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleColorInputCommit(); }}
                    className={`input-dark w-28 ${colorError ? 'border-red-500' : ''}`}
                  />
                  {colorError && (
                    <p className="absolute top-full left-0 mt-1 text-xs text-red-500 whitespace-nowrap">
                      Invalid hex (e.g. #ff5500)
                    </p>
                  )}
                </div>
                <div
                  className="w-8 h-8 rounded border-2 border-border"
                  style={{
                    backgroundColor: borderColor,
                    boxShadow: borderColor === '#000000' ? 'inset 0 0 0 1px rgba(255,255,255,0.2)' : 'none',
                  }}
                  title={borderColor}
                />
              </div>
              <div className="flex items-center gap-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => handlePresetClick(c.value)}
                    aria-label={c.label}
                    title={c.label}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      borderColor === c.value
                        ? 'border-accent ring-2 ring-accent ring-offset-2 ring-offset-[var(--bg)]'
                        : 'border-border hover:border-muted'
                    }`}
                    style={{
                      backgroundColor: c.value,
                      boxShadow: c.value === '#000000' ? 'inset 0 0 0 1px rgba(255,255,255,0.2)' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReset} className="btn-secondary">
            {tc('reset')}
          </button>
          <button onClick={handleNewUpload} className="btn-secondary">
            {tc('uploadNew') || 'Upload New Image'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg p-4">
          <h3 className="label-mono mb-2">{tc('original')}</h3>
          <div className="aspect-video bg-bg rounded-lg overflow-hidden flex items-center justify-center">
            <img src={image.src} alt="Original" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <h3 className="label-mono mb-2">{tc('result')}</h3>
          <div className="aspect-video bg-bg rounded-lg overflow-hidden flex items-center justify-center">
            {result ? (
              <img src={result} alt="Bordered" className="max-w-full max-h-full object-contain" />
            ) : (
              <p className="text-muted">{tc('preview')}</p>
            )}
          </div>
          {result && (
            <div className="mt-3 flex justify-end">
              <DownloadButton dataUrl={result} filename={`bordered-${(file?.name || 'image.png').replace(/\.[^.]+$/, '')}.png`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
