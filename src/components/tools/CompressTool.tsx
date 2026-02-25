'use client';

import { useState, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import ImageUploader from '@/components/ImageUploader';
import DownloadButton from '@/components/DownloadButton';

interface CompressToolProps {
  defaultTargetKB?: number;
}

interface ImageItem {
  original: { image: HTMLImageElement; file: File };
  compressed: string | null;
  compressedSize: number;
  isProcessing: boolean;
  skipped: boolean;
}

const DEFAULT_QUALITY = 80;

export default function CompressTool({ defaultTargetKB = 200 }: CompressToolProps) {
  const t = useTranslations('tools.compress-image');
  const tc = useTranslations('common');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [targetKB, setTargetKB] = useState(defaultTargetKB);
  const [quality, setQuality] = useState(DEFAULT_QUALITY);
  const [qualityHint, setQualityHint] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const maxTargetKB = images.length > 0
    ? Math.max(Math.ceil(Math.max(...images.map(i => i.original.file.size)) / 1024), 1)
    : 10000;

  const compressImage = useCallback(async (
    img: HTMLImageElement,
    originalSize: number,
    targetBytes: number,
    initialQuality: number
  ): Promise<{ dataUrl: string; size: number; skipped: boolean }> => {
    if (targetBytes >= originalSize) {
      return { dataUrl: img.src, size: originalSize, skipped: true };
    }

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    let lo = 0.01, hi = initialQuality / 100;
    let bestDataUrl = '';
    let bestSize = 0;

    for (let i = 0; i < 10; i++) {
      const mid = (lo + hi) / 2;
      const dataUrl = canvas.toDataURL('image/jpeg', mid);
      const size = Math.round((dataUrl.length - 'data:image/jpeg;base64,'.length) * 0.75);

      if (size <= targetBytes) {
        bestDataUrl = dataUrl;
        bestSize = size;
        lo = mid;
      } else {
        hi = mid;
      }
    }

    if (!bestDataUrl) {
      bestDataUrl = canvas.toDataURL('image/jpeg', lo);
      bestSize = Math.round((bestDataUrl.length - 'data:image/jpeg;base64,'.length) * 0.75);
    }

    return { dataUrl: bestDataUrl, size: bestSize, skipped: false };
  }, []);

  const handleImageLoad = useCallback((image: HTMLImageElement, file: File) => {
    setImages([{ original: { image, file }, compressed: null, compressedSize: 0, isProcessing: false, skipped: false }]);
    setTargetKB(defaultTargetKB);
    setQuality(DEFAULT_QUALITY);
    setQualityHint(null);
  }, [defaultTargetKB]);

  const handleMultipleLoad = useCallback((items: { image: HTMLImageElement; file: File }[]) => {
    setImages(items.map(item => ({
      original: item,
      compressed: null,
      compressedSize: 0,
      isProcessing: false,
      skipped: false,
    })));
    setTargetKB(defaultTargetKB);
    setQuality(DEFAULT_QUALITY);
    setQualityHint(null);
  }, [defaultTargetKB]);

  const handleCompress = useCallback(async () => {
    const targetBytes = targetKB * 1024;
    let anyBelowTarget = false;

    for (let i = 0; i < images.length; i++) {
      setImages(prev => prev.map((item, idx) =>
        idx === i ? { ...item, isProcessing: true } : item
      ));

      const originalSize = images[i].original.file.size;
      const result = await compressImage(images[i].original.image, originalSize, targetBytes, quality);

      if (!result.skipped && (result.size < targetBytes * 0.5 || (quality < 50 && result.size < targetBytes * 0.95))) {
        anyBelowTarget = true;
      }

      setImages(prev => prev.map((item, idx) =>
        idx === i ? {
          ...item,
          compressed: result.dataUrl,
          compressedSize: result.size,
          isProcessing: false,
          skipped: result.skipped,
        } : item
      ));
    }

    if (anyBelowTarget) {
      setQualityHint(t('qualityHint'));
    } else {
      setQualityHint(null);
    }
  }, [images, targetKB, quality, compressImage, t]);

  const handleReset = useCallback(() => {
    setTargetKB(defaultTargetKB);
    setQuality(DEFAULT_QUALITY);
    setQualityHint(null);
    setImages(prev => prev.map(item => ({
      ...item,
      compressed: null,
      compressedSize: 0,
      isProcessing: false,
      skipped: false,
    })));
  }, [defaultTargetKB]);

  const handleNewUpload = useCallback(() => {
    setImages([]);
    setTargetKB(defaultTargetKB);
    setQuality(DEFAULT_QUALITY);
    setQualityHint(null);
  }, [defaultTargetKB]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

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
      <canvas ref={canvasRef} className="hidden" />

      <div className="panel-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="compress-target-size" className="block label-mono mb-2">
              {t('targetSize')}
            </label>
            <div className="flex items-center gap-3">
              <input
                id="compress-target-size"
                type="number"
                value={targetKB}
                onChange={(e) => setTargetKB(Math.min(Math.max(1, parseInt(e.target.value) || 1), maxTargetKB))}
                className="input-dark w-32 focus:border-transparent"
                min={1}
                max={maxTargetKB}
              />
              <span className="font-mono text-[11px] text-muted whitespace-nowrap">
                KB <span className="text-muted/60">(max {maxTargetKB})</span>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="compress-quality" className="block label-mono mb-2">
              {tc('quality')}: <span className="text-accent">{quality}%</span>
            </label>
            <input
              id="compress-quality"
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => { setQuality(parseInt(e.target.value)); setQualityHint(null); }}
              className="slider-accent"
            />
          </div>
        </div>

        {qualityHint && (
          <div className="bg-accent/10 border border-accent/30 rounded-lg px-4 py-2.5 flex items-center gap-2">
            <span className="text-accent text-sm">💡</span>
            <p className="font-mono text-[11px] text-accent">{qualityHint}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button onClick={handleCompress} className="btn-primary" disabled={images.some(img => img.isProcessing)}>
            {images.some(img => img.isProcessing) ? t('compressing') : tc('apply')}
          </button>
          <button onClick={handleReset} className="btn-secondary">
            {tc('reset')}
          </button>
          <button onClick={handleNewUpload} className="btn-secondary">
            {tc('uploadNew')}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {images.map((item, idx) => (
          <div key={idx} className="bg-surface border border-border rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="label-mono mb-2">{tc('original')}</h3>
                <div className="relative aspect-video bg-surface rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={item.original.image.src}
                    alt="Original"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <p className="font-mono text-[11px] text-muted mt-2">
                  {tc('fileSize')}: {formatSize(item.original.file.size)} · {item.original.image.naturalWidth}×{item.original.image.naturalHeight}
                </p>
              </div>

              <div>
                <h3 className="label-mono mb-2">{tc('result')}</h3>
                <div className="relative aspect-video bg-surface rounded-lg overflow-hidden flex items-center justify-center">
                  {item.isProcessing ? (
                    <div className="flex items-center gap-2 text-accent">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {t('compressing')}
                    </div>
                  ) : item.compressed ? (
                    <img
                      src={item.compressed}
                      alt="Compressed"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <p className="text-muted">{tc('preview')}</p>
                  )}
                </div>
                {item.compressed && (
                  <>
                    <p className="font-mono text-[11px] text-muted mt-2">
                      {item.skipped ? (
                        <span className="text-accent">{t('alreadySmall')}</span>
                      ) : (
                        <>
                          {tc('fileSize')}: {formatSize(item.compressedSize)} · {item.original.image.naturalWidth}×{item.original.image.naturalHeight}
                          {' '}
                          <span className="text-accent">
                            ({t('reduction')}: {((1 - item.compressedSize / item.original.file.size) * 100).toFixed(1)}%)
                          </span>
                        </>
                      )}
                    </p>
                    {!item.skipped && (
                      <div className="mt-2 flex justify-end">
                        <DownloadButton
                          dataUrl={item.compressed}
                          filename={`compressed-${item.original.file.name.replace(/\.[^.]+$/, '')}.jpg`}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
