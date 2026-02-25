'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useState, useRef } from 'react';

interface ImageUploaderProps {
  onImageLoad: (image: HTMLImageElement, file: File) => void;
  multiple?: boolean;
  maxFiles?: number;
  onMultipleLoad?: (images: { image: HTMLImageElement; file: File }[]) => void;
}

export default function ImageUploader({ onImageLoad, multiple = false, maxFiles = 10, onMultipleLoad }: ImageUploaderProps) {
  const t = useTranslations('common');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File): Promise<{ image: HTMLImageElement; file: File }> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('not_image'));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => resolve({ image: img, file });
        img.onerror = () => reject(new Error('load_failed'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('read_failed'));
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    setError(null);
    const fileArray = Array.from(files).slice(0, maxFiles);

    try {
      if (multiple && onMultipleLoad) {
        const results = await Promise.all(fileArray.map(processFile));
        onMultipleLoad(results);
      } else if (fileArray[0]) {
        const result = await processFile(fileArray[0]);
        onImageLoad(result.image, result.file);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'unknown';
      if (errorMsg === 'not_image') {
        setError(t('errorNotImage'));
      } else if (errorMsg === 'load_failed') {
        setError(t('errorLoadFailed'));
      } else {
        setError(t('errorReadFailed'));
      }
      // Reset input so user can retry the same file
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [multiple, maxFiles, onMultipleLoad, onImageLoad, processFile, t]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div
      className={`upload-zone ${isDragging ? 'drag-over' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => { setError(null); inputRef.current?.click(); }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-4">
        <span className="text-5xl">⬡</span>
        <div>
          <h3 className="font-display text-lg font-bold text-text">{t('dragDrop')}</h3>
          <p className="font-mono text-[12px] text-muted mt-1">{t('supportedFormats')}</p>
          {multiple && (
            <p className="font-mono text-[12px] text-accent mt-1">{t('batchUpload', { max: maxFiles })}</p>
          )}
        </div>
        {error && (
          <div className="bg-accent2/10 border border-accent2/30 rounded-lg px-4 py-2.5 flex items-center gap-2">
            <svg className="w-4 h-4 text-accent2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="font-mono text-[12px] text-accent2">{error}</p>
          </div>
        )}
        <button
          type="button"
          className="btn-primary mt-2"
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
        >
          SELECT FILE
        </button>
      </div>
    </div>
  );
}
