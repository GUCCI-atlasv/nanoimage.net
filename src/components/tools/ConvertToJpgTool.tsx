'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import ImageUploader from '@/components/ImageUploader';
import DownloadButton from '@/components/DownloadButton';

interface ConvertItem {
  original: { image: HTMLImageElement; file: File };
  converted: string | null;
  convertedSize: number;
}

export default function ConvertToJpgTool() {
  const t = useTranslations('tools.convert-to-jpg');
  const tc = useTranslations('common');
  const [images, setImages] = useState<ConvertItem[]>([]);
  const [quality, setQuality] = useState(90);
  const [bgColor, setBgColor] = useState('#ffffff');
  const addInputRef = useRef<HTMLInputElement>(null);
  const [limitWarning, setLimitWarning] = useState('');

  const convertToJpg = useCallback((img: HTMLImageElement, q: number, bg: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg', q / 100);
    const size = Math.round((dataUrl.length - 'data:image/jpeg;base64,'.length) * 0.75);
    return { dataUrl, size };
  }, []);

  const convertAll = useCallback((items: ConvertItem[], q: number, bg: string): ConvertItem[] => {
    return items.map(item => {
      const result = convertToJpg(item.original.image, q, bg);
      return { ...item, converted: result.dataUrl, convertedSize: result.size };
    });
  }, [convertToJpg]);

  useEffect(() => {
    if (images.length > 0 && images.some(item => item.converted === null)) {
      setImages(prev => convertAll(prev, quality, bgColor));
    }
  }, [images.length]);

  useEffect(() => {
    if (images.length > 0 && images.every(item => item.converted !== null)) {
      setImages(prev => convertAll(prev, quality, bgColor));
    }
  }, [quality, bgColor]);

  const handleImageLoad = useCallback((image: HTMLImageElement, file: File) => {
    const result = convertToJpg(image, quality, bgColor);
    setImages([{ original: { image, file }, converted: result.dataUrl, convertedSize: result.size }]);
  }, [quality, bgColor, convertToJpg]);

  const handleMultipleLoad = useCallback((items: { image: HTMLImageElement; file: File }[]) => {
    const converted = items.map(item => {
      const result = convertToJpg(item.image, quality, bgColor);
      return { original: { image: item.image, file: item.file }, converted: result.dataUrl, convertedSize: result.size };
    });
    setImages(converted);
  }, [quality, bgColor, convertToJpg]);

  const handleRemoveItem = useCallback((idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const handleReset = useCallback(() => {
    setQuality(90);
    setBgColor('#ffffff');
  }, []);

  const handleAddFiles = useCallback(async (files: FileList) => {
    const fileArray = Array.from(files);
    const results: { image: HTMLImageElement; file: File }[] = [];
    for (const f of fileArray) {
      if (!f.type.startsWith('image/')) continue;
      try {
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => reject();
            image.src = e.target?.result as string;
          };
          reader.onerror = () => reject();
          reader.readAsDataURL(f);
        });
        results.push({ image: img, file: f });
      } catch { /* skip invalid files */ }
    }
    if (results.length > 0) {
      const maxSlots = 10 - images.length;
      const dropped = results.length - Math.min(results.length, maxSlots);
      const toAdd = results.slice(0, Math.max(0, maxSlots));
      if (dropped > 0) {
        setLimitWarning(`Limit is 10 images. ${dropped} file${dropped > 1 ? 's were' : ' was'} not added.`);
      } else {
        setLimitWarning('');
      }
      if (toAdd.length === 0) return;
      const converted = toAdd.map(r => {
        const res = convertToJpg(r.image, quality, bgColor);
        return { original: { image: r.image, file: r.file }, converted: res.dataUrl, convertedSize: res.size };
      });
      setImages(prev => [...prev, ...converted]);
    }
  }, [images.length, quality, bgColor, convertToJpg]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getJpgName = (originalName: string) => originalName.replace(/\.[^.]+$/, '.jpg');

  if (images.length === 0) {
    return (
      <ImageUploader
        onImageLoad={handleImageLoad}
        multiple={true}
        maxFiles={10}
        onMultipleLoad={handleMultipleLoad}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="panel-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="jpg-quality" className="block label-mono mb-2">
              {t('outputQuality')}: {quality}%
            </label>
            <input
              id="jpg-quality"
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="slider-accent"
            />
          </div>
          <div>
            <label htmlFor="jpg-bgcolor" className="block label-mono mb-2">
              {t('backgroundColor')}
              <span className="text-muted text-xs ml-2">({t('transparent')})</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                id="jpg-bgcolor"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer"
              />
              <span className="font-mono text-[11px] text-muted">{bgColor}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReset} className="btn-secondary">{tc('reset')}</button>
          <button onClick={() => setImages([])} className="btn-secondary">
            {tc('uploadNew')}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {images.map((item, idx) => (
          <div key={idx} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded bg-bg overflow-hidden flex-shrink-0 flex items-center justify-center">
                <img
                  src={item.original.image.src}
                  alt={item.original.file.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-text truncate">{getJpgName(item.original.file.name)}</p>
                <p className="font-mono text-[11px] text-muted">
                  {item.original.file.type || 'image'} → JPEG
                  {item.converted && ` · ${formatSize(item.convertedSize)}`}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {item.converted && (
                  <DownloadButton
                    dataUrl={item.converted}
                    filename={getJpgName(item.original.file.name)}
                  />
                )}
                <button
                  onClick={() => handleRemoveItem(idx)}
                  className="w-8 h-8 rounded-lg border border-border text-muted hover:text-accent2 hover:border-accent2 transition-colors flex items-center justify-center"
                  aria-label={`Remove ${item.original.file.name}`}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {limitWarning && (
        <p className="font-mono text-[11px] text-accent2 bg-accent2/10 border border-accent2/30 rounded-lg px-3 py-2">
          ⚠ {limitWarning}
        </p>
      )}

      {images.length < 10 && (
        <div className="border border-dashed border-border rounded-lg p-4 flex items-center justify-center">
          <input
            ref={addInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) handleAddFiles(e.target.files);
              e.target.value = '';
            }}
            className="hidden"
          />
          <button
            onClick={() => addInputRef.current?.click()}
            className="btn-secondary text-sm"
          >
            + Add More Files ({images.length}/10)
          </button>
        </div>
      )}
    </div>
  );
}
