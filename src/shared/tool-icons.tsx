'use client'

export const HOMEPAGE_EXCLUDED_TOOL_SLUGS = new Set([
  'compress-image-to-100kb',
  'compress-image-to-200kb',
  'compress-image-to-500kb',
  'compress-image-to-1mb',
])

export const categoryIconMap: Record<string, string> = {
  'optimize-images': 'trend',
  'edit-images': 'scissors',
  'convert-formats': 'convert',
  'create-more': 'sparkle',
  'privacy-protection': 'shield',
  'ai-tools': 'magic',
  'video-tools': 'play',
}

export const toolIconMap: Record<string, string> = {
  'background-remover': 'scissors',
  'object-remover': 'magic',
  'photo-restore': 'sun',
  'smart-crop': 'crop',
  'compress-image': 'file',
  'resize-image': 'crop',
  'batch-compress': 'stack',
  'upscale-image': 'sun',
  'crop-image': 'crop',
  'passport-photo': 'file',
  'rotate-image': 'rotate',
  'flip-image': 'flip',
  'add-text': 'text',
  'change-background': 'image',
  'enhance-image': 'magic',
  'change-color': 'palette',
  'convert-image': 'file',
  'convert-to-webp': 'file',
  'png-to-webp': 'file',
  'jpg-to-webp': 'file',
  'jpg-to-bmp': 'file',
  'image-to-pdf': 'file',
  'gif-maker': 'image',
  'gif-compressor': 'image',
  'meme-generator': 'smile',
  'image-collage': 'grid',
  'photo-grid': 'grid',
  'grid-maker': 'grid',
  'remove-exif': 'info',
  'blur-image': 'sun',
  'pixelate-image': 'dots',
  'add-watermark': 'watermark',
  'video-to-gif': 'image',
  'video-to-mp3': 'music',
}

export const HOME_TOOL_ICON_MAP: Record<string, string> = {
  'compress-image': '/assets/tools/home-icons/compress-image.png',
  'resize-image': '/assets/tools/home-icons/resize-image.png',
  'batch-compress': '/assets/tools/home-icons/batch-compress.png',
  'upscale-image': '/assets/tools/home-icons/upscale-image.png',
  'crop-image': '/assets/tools/home-icons/crop-image.png',
  'passport-photo': '/assets/tools/home-icons/passport-photo.png',
  'rotate-image': '/assets/tools/home-icons/rotate-image.png',
  'flip-image': '/assets/tools/home-icons/flip-image.png',
  'add-text': '/assets/tools/home-icons/add-text.png',
  'change-background': '/assets/tools/home-icons/change-background.png',
  'enhance-image': '/assets/tools/home-icons/enhance-image.png',
  'change-color': '/assets/tools/home-icons/change-color.png',
  'convert-image': '/assets/tools/home-icons/convert-image.png',
  'convert-to-webp': '/assets/tools/home-icons/convert-to-webp.png',
  'png-to-webp': '/assets/tools/home-icons/convert-to-webp.png',
  'jpg-to-webp': '/assets/tools/home-icons/convert-to-webp.png',
  'jpg-to-bmp': '/assets/tools/home-icons/convert-to-webp.png',
  'image-to-pdf': '/assets/tools/home-icons/image-to-pdf.png',
  'gif-maker': '/assets/tools/home-icons/gif-maker.png',
  'gif-compressor': '/assets/tools/home-icons/gif-maker.png',
  'meme-generator': '/assets/tools/home-icons/meme-generator.png',
  'image-collage': '/assets/tools/home-icons/image-collage.png',
  'photo-grid': '/assets/tools/home-icons/photo-grid.png',
  'grid-maker': '/assets/tools/home-icons/grid-maker.png',
  'remove-exif': '/assets/tools/home-icons/remove-exif.png',
  'blur-image': '/assets/tools/home-icons/blur-image.png',
  'pixelate-image': '/assets/tools/home-icons/pixelate-image.png',
  'add-watermark': '/assets/tools/home-icons/add-watermark.png',
  'video-to-gif': '/assets/tools/home-icons/video-to-gif.png',
  'video-to-mp3': '/assets/tools/home-icons/video-to-mp3.png',
}

export function HomeIcon({ name }: { name?: string }) {
  const icon = name ?? 'sparkle'

  return (
    <svg className="home-icon" viewBox="0 0 32 32" aria-hidden="true">
      {icon === 'trend' && (
        <>
          <path d="M6 22 13 15l4 4 8-10" />
          <path d="M20 9h5v5" />
        </>
      )}
      {icon === 'scissors' && (
        <>
          <circle cx="9" cy="22" r="3.2" />
          <circle cx="9" cy="10" r="3.2" />
          <path d="M12 19 25 7M12 13l13 12" />
        </>
      )}
      {icon === 'convert' && (
        <>
          <path d="M10 8h10l4 4v12H10z" />
          <path d="M20 8v5h5M8 13H4m0 0 3-3m-3 3 3 3M24 20h4m0 0-3-3m3 3-3 3" />
        </>
      )}
      {icon === 'sparkle' && (
        <>
          <path d="M16 4c2.1 5.5 3.2 6.6 8.5 8.5C19.2 14.4 18.1 15.5 16 21c-2.1-5.5-3.2-6.6-8.5-8.5C12.8 10.6 13.9 9.5 16 4Z" />
          <path d="M23 22c1 2.5 1.6 3 4 4-2.4 1-3 1.5-4 4-1-2.5-1.6-3-4-4 2.4-1 3-1.5 4-4Z" />
        </>
      )}
      {icon === 'shield' && (
        <path d="M16 4 25 8v7c0 6-3.6 10.4-9 13-5.4-2.6-9-7-9-13V8z" />
      )}
      {icon === 'lock' && (
        <>
          <rect x="7" y="14" width="18" height="13" rx="2" />
          <path d="M11 14v-3a5 5 0 0 1 10 0v3" />
        </>
      )}
      {icon === 'bolt' && (
        <path d="M18 3 8 17h8l-2 12 10-15h-8z" />
      )}
      {icon === 'device' && (
        <>
          <rect x="5" y="8" width="22" height="15" rx="2" />
          <path d="M12 27h8M16 23v4" />
        </>
      )}
      {icon === 'file' && (
        <>
          <path d="M10 6h8l5 5v15H10z" />
          <path d="M18 6v6h6M13 18h8M13 22h5" />
        </>
      )}
      {icon === 'crop' && (
        <>
          <path d="M9 4v19h19" />
          <path d="M4 9h19v19" />
        </>
      )}
      {icon === 'stack' && (
        <>
          <rect x="7" y="7" width="13" height="13" rx="2" />
          <rect x="12" y="12" width="13" height="13" rx="2" />
        </>
      )}
      {icon === 'sun' && (
        <>
          <circle cx="16" cy="16" r="4" />
          <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l3 3M21.5 21.5l3 3M24.5 7.5l-3 3M10.5 21.5l-3 3" />
        </>
      )}
      {icon === 'rotate' && (
        <>
          <path d="M23 11a8 8 0 1 0 1.2 8" />
          <path d="M23 5v6h-6" />
        </>
      )}
      {icon === 'flip' && (
        <>
          <path d="m7 8 7 8-7 8zM25 8l-7 8 7 8zM16 6v20" />
        </>
      )}
      {icon === 'text' && (
        <>
          <path d="M7 8h18M16 8v18M11 26h10" />
        </>
      )}
      {icon === 'image' && (
        <>
          <rect x="6" y="7" width="20" height="18" rx="3" />
          <path d="m9 22 6-7 4 5 3-3 4 5" />
          <circle cx="21" cy="12" r="2" />
        </>
      )}
      {icon === 'magic' && (
        <>
          <path d="m7 25 17-17M18 7l7 7M8 9l1-4M12 12l4-1M21 23l4 2" />
        </>
      )}
      {icon === 'palette' && (
        <>
          <path d="M16 5c-6 0-10 4.1-10 9.6 0 4.6 3.4 8.4 8.1 8.4h2.2c1.5 0 2.2 1.4 1.3 2.6-.8 1.1 0 2.4 1.4 2.2 4.1-.7 7-4.7 7-10.2C26 10.5 22 5 16 5Z" />
          <circle cx="11" cy="13" r="1" />
          <circle cx="16" cy="10" r="1" />
          <circle cx="21" cy="13" r="1" />
        </>
      )}
      {icon === 'smile' && (
        <>
          <circle cx="16" cy="16" r="10" />
          <path d="M12 13h.1M20 13h.1M11.5 18.5c2.2 2.4 6.8 2.4 9 0" />
        </>
      )}
      {icon === 'grid' && (
        <>
          <rect x="7" y="7" width="7" height="7" rx="1" />
          <rect x="18" y="7" width="7" height="7" rx="1" />
          <rect x="7" y="18" width="7" height="7" rx="1" />
          <rect x="18" y="18" width="7" height="7" rx="1" />
        </>
      )}
      {icon === 'info' && (
        <>
          <circle cx="16" cy="16" r="10" />
          <path d="M16 15v7M16 10h.1" />
        </>
      )}
      {icon === 'dots' && (
        <>
          <circle cx="9" cy="9" r="2" />
          <circle cx="16" cy="9" r="2" />
          <circle cx="23" cy="9" r="2" />
          <circle cx="9" cy="16" r="2" />
          <circle cx="16" cy="16" r="2" />
          <circle cx="23" cy="16" r="2" />
          <circle cx="9" cy="23" r="2" />
          <circle cx="16" cy="23" r="2" />
          <circle cx="23" cy="23" r="2" />
        </>
      )}
      {icon === 'watermark' && (
        <>
          <path d="M8 23V9h16v14" />
          <path d="M12 23c0-4 8-4 8 0M12 14h8" />
        </>
      )}
      {icon === 'trash' && (
        <>
          <path d="M8 10h16M13 10V7h6v3M11 13l1 13h8l1-13" />
          <path d="M15 16v7M19 16v7" />
        </>
      )}
      {icon === 'upload' && (
        <>
          <path d="M16 23V6M9 13l7-7 7 7" />
          <path d="M7 24v3h18v-3" />
        </>
      )}
      {icon === 'download' && (
        <>
          <path d="M16 6v17M9 16l7 7 7-7" />
          <path d="M7 24v3h18v-3" />
        </>
      )}
      {icon === 'search' && (
        <>
          <circle cx="14" cy="14" r="7" />
          <path d="m20 20 6 6" />
        </>
      )}
      {icon === 'play' && (
        <path d="M10 6l16 10-16 10z" />
      )}
      {icon === 'music' && (
        <>
          <path d="M9 18V8l14-3v10" />
          <circle cx="9" cy="21" r="3" />
          <circle cx="23" cy="18" r="3" />
        </>
      )}
      {icon === 'settings' && (
        <>
          <circle cx="16" cy="16" r="3" />
          <path d="M16 5v3M16 24v3M5 16h3M24 16h3M8.2 8.2l2.1 2.1M21.7 21.7l2.1 2.1M8.2 23.8l2.1-2.1M21.7 10.3l2.1-2.1" />
        </>
      )}
      {icon === 'check' && (
        <path d="M6 16l7 7 13-13" />
      )}
      {![
        'trend',
        'scissors',
        'convert',
        'sparkle',
        'shield',
        'lock',
        'bolt',
        'device',
        'file',
        'crop',
        'stack',
        'sun',
        'rotate',
        'flip',
        'text',
        'image',
        'magic',
        'palette',
        'smile',
        'grid',
        'info',
        'dots',
        'watermark',
        'trash',
        'upload',
        'download',
        'search',
        'play',
        'music',
        'settings',
        'check',
      ].includes(icon) && <path d="M16 4c2.1 5.5 3.2 6.6 8.5 8.5C19.2 14.4 18.1 15.5 16 21c-2.1-5.5-3.2-6.6-8.5-8.5C12.8 10.6 13.9 9.5 16 4Z" />}
    </svg>
  )
}

