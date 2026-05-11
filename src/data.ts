export type Category = {
  id: string
  title: string
  tone: string
  description: string
  icon: string
  viewAllLabel: string
}

export type Tool = {
  slug: string
  name: string
  category: string
  description: string
  keywords: string[]
  mvp: boolean
  badge?: string
  title: string
  subtitle: string
  tips: string[]
}

export type FaqItem = {
  q: string
  a: string
}

export const toolFaqs: Record<string, FaqItem[]> = {
  'compress-image': [
    { q: 'Will compression reduce image quality?', a: 'It can, depending on the quality setting. Light compression often looks almost the same while making the file much smaller.' },
    { q: 'Can I compress an image to 100KB?', a: 'Often yes. Use JPG or WebP, lower the quality, and resize the image if needed.' },
    { q: 'Which format should I use?', a: 'Use JPG for photos, PNG for transparency or screenshots, and WebP for smaller web-ready images.' },
  ],
  'resize-image': [
    { q: 'Is resizing the same as cropping?', a: 'No. Resizing changes width and height. Cropping removes part of the image.' },
    { q: 'How do I avoid distortion?', a: 'Keep aspect ratio enabled. This prevents the image from being stretched.' },
    { q: 'Will enlarging an image make it sharper?', a: 'No. Basic resizing cannot create real detail. Large upscaling may look blurry.' },
  ],
  'batch-compress': [
    { q: 'What is Batch Compress for?', a: 'It lets you compress multiple images at once with the same settings.' },
    { q: 'How many images can I process?', a: 'A safe limit is up to 20 images, about 20MB each, with a total around 200MB.' },
    { q: 'How do I download the results?', a: 'You can download individual images or export all results as a ZIP file.' },
  ],
  'upscale-image': [
    { q: 'Is Upscale Image AI-powered?', a: 'The basic version is for simple browser-based resizing and sharpening. AI upscaling should be clearly labeled if added later.' },
    { q: 'How much can I enlarge an image?', a: 'Common options are 2x, 3x, and 4x. Larger scaling may reduce clarity.' },
    { q: 'What images work best?', a: 'Photos, web images, and simple graphics that only need light enlargement.' },
  ],
  'crop-image': [
    { q: 'Can I crop by aspect ratio?', a: 'Yes. Common ratios include 1:1, 4:3, 16:9, and 9:16.' },
    { q: 'Can I crop multiple areas?', a: 'Multiple crop areas are supported. Multiple crop results can be downloaded as a ZIP.' },
    { q: 'Does cropping change my original file?', a: 'No. It creates a new cropped image for download.' },
  ],
  'rotate-image': [
    { q: 'Can I rotate by any angle?', a: 'Yes. The tool supports 90°, 180°, and custom angles.' },
    { q: 'Why do I see empty corners after rotation?', a: 'Custom rotation can create empty areas. You can fill them with a background color or crop them.' },
    { q: 'What is the difference between rotate and flip?', a: 'Rotate turns the image by an angle. Flip mirrors it horizontally or vertically.' },
  ],
  'flip-image': [
    { q: 'What flip options are available?', a: 'Horizontal flip, vertical flip, and both directions.' },
    { q: 'Does flipping reduce quality?', a: 'Usually no. It only changes the image direction.' },
    { q: 'When should I use it?', a: 'Use it to fix mirrored images, change direction, or create a mirrored effect.' },
  ],
  'add-text': [
    { q: 'Can I add multiple text boxes?', a: 'Yes. Each text box can be moved and styled separately.' },
    { q: 'Can I drag text on the image?', a: 'Yes. You can place text directly on the image and adjust size, color, opacity, and style.' },
    { q: 'Does Add Text need a server?', a: 'No. Text editing runs entirely in your browser.' },
  ],
  'change-background': [
    { q: 'Does it remove backgrounds automatically?', a: 'Not in the basic version. It works best for transparent PNGs or images that already have a removed background.' },
    { q: 'Can I make the background transparent?', a: 'Yes, if the image supports transparency or already has transparent areas.' },
    { q: 'What background types are supported?', a: 'Solid color, gradient, transparent, or custom image background.' },
  ],
  'change-color': [
    { q: 'Can I change the whole image color?', a: 'Yes. You can adjust overall color or use a brush for local changes.' },
    { q: 'Is color replacement always perfect?', a: 'No. Complex edges, hair, shadows, or reflections may need more advanced editing.' },
    { q: 'What settings are useful?', a: 'Color picker, tolerance, brush size, feather, undo, and redo.' },
  ],
  'enhance-image': [
    { q: 'Is Enhance Image an AI tool?', a: 'The basic version is not AI. It adjusts brightness, contrast, saturation, sharpness, and similar settings.' },
    { q: 'Can I use one-click enhance?', a: 'Yes. Auto Enhance can be offered as a simple preset.' },
    { q: 'Does it overwrite my original image?', a: 'No. It creates a new enhanced image for download.' },
  ],
  'convert-image': [
    { q: 'Which formats are supported?', a: 'JPG, PNG, and WebP are the main formats. More may be added depending on browser support.' },
    { q: 'Will conversion affect quality?', a: 'It may. JPG and WebP can use compression. PNG usually keeps sharp edges but may be larger.' },
    { q: 'Will transparency be kept?', a: 'PNG and WebP can keep transparency. JPG does not support transparency.' },
  ],
  'convert-to-webp': [
    { q: 'Why use WebP?', a: 'WebP often creates smaller files while keeping good visual quality.' },
    { q: 'Is WebP supported everywhere?', a: 'Most modern browsers support WebP. Older apps may not.' },
    { q: 'Why have a separate WebP page?', a: 'It gives users a faster WebP-focused workflow and helps with search visibility.' },
  ],
  'image-to-pdf': [
    { q: 'Can I combine multiple images into one PDF?', a: 'Yes. Upload images, reorder them, and export one PDF.' },
    { q: 'Can I change page size and margins?', a: 'Yes. Common options include A4, Letter, orientation, margins, and image fit.' },
    { q: 'Does Image to PDF need uploading?', a: 'The basic version generates PDFs directly in your browser.' },
  ],
  'gif-maker': [
    { q: 'What is GIF Maker for?', a: 'It creates a GIF from multiple images.' },
    { q: 'Can I control GIF speed?', a: 'Yes. You can adjust frame duration, speed, loop, and size.' },
    { q: 'Why is my GIF large?', a: 'GIFs can become large quickly. Use fewer frames, smaller size, or lower FPS.' },
  ],
  'meme-generator': [
    { q: 'What can I make with Meme Generator?', a: 'You can add top and bottom text to an image or meme template.' },
    { q: 'Can I upload my own image?', a: 'Yes. You can use your own image as the meme background.' },
    { q: 'Are meme templates free to use?', a: 'Only templates with proper rights should be used. Custom or licensed templates are safest.' },
  ],
  'image-collage': [
    { q: 'Is Image Collage the same as Photo Grid?', a: 'No. Collage is freeform. Photo Grid uses fixed grid layouts.' },
    { q: 'What can I add to a collage?', a: 'Images, text, stickers, shapes, frames, and backgrounds.' },
    { q: 'Can it run in the browser?', a: 'Yes. The collage editor runs entirely in your browser.' },
  ],
  'photo-grid': [
    { q: 'What is Photo Grid?', a: 'It combines multiple photos into a clean grid layout.' },
    { q: 'Can I adjust spacing and borders?', a: 'Yes. You can adjust spacing, border, radius, background, and layout ratio.' },
    { q: 'What is it useful for?', a: 'Social posts, product displays, travel photos, comparison images, and simple collages.' },
  ],
  'remove-exif': [
    { q: 'What is EXIF data?', a: 'EXIF is hidden image metadata, such as camera model, date, settings, and sometimes location.' },
    { q: 'Does removing EXIF affect image quality?', a: 'Usually no. It removes hidden metadata, not the visible image.' },
    { q: 'Does it remove all metadata?', a: 'It removes common EXIF data. For sensitive files, check the downloaded result again.' },
  ],
  'blur-image': [
    { q: 'Can I blur only part of an image?', a: 'Yes. Use a brush or selection to blur specific areas.' },
    { q: 'What should I blur?', a: 'Faces, license plates, addresses, usernames, chats, IDs, or private details.' },
    { q: 'Can blur be reversed?', a: 'Downloaded blurred images usually cannot be restored, so blur sensitive areas strongly enough.' },
  ],
  'pixelate-image': [
    { q: 'What is the difference between pixelate and blur?', a: 'Pixelate uses mosaic blocks. Blur softens details. Both can hide sensitive information.' },
    { q: 'Can I adjust pixel size?', a: 'Yes. Larger blocks hide details more strongly.' },
    { q: 'When should I use pixelate?', a: 'Use it for faces, license plates, addresses, account names, QR codes, or document numbers.' },
  ],
  'add-watermark': [
    { q: 'What does Add Watermark support?', a: 'Text or logo watermarks on one image at a time.' },
    { q: 'Does it support batch watermarking?', a: 'Not in the current version. It can be added later.' },
    { q: 'Can I choose position presets?', a: 'You can drag the watermark directly on the image to place it anywhere. Position presets may be added later.' },
  ],
  'video-to-gif': [
    { q: 'Does Video to GIF run in the browser?', a: 'Yes, but video processing is heavy. File size, duration, output width, and FPS must be limited.' },
    { q: 'Why is GIF duration limited?', a: 'Long GIFs become very large and may slow down the browser. A 15-second clip limit is recommended.' },
    { q: 'What settings are recommended?', a: '480px width, 10 FPS, and a short clip under 15 seconds.' },
  ],
  'video-to-mp3': [
    { q: 'Can Video to MP3 run in the browser?', a: 'It uses browser audio tools, but performance and compatibility need careful testing depending on the device.' },
    { q: 'Can I trim the audio?', a: 'Yes. Select a start and end time to export only part of the audio.' },
    { q: 'Which MP3 quality should I choose?', a: '128 kbps for smaller files, 192 kbps for most uses, and 320 kbps for higher quality.' },
  ],
}

export type BlogPost = {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  metaDescription?: string
  coverImage?: string
  body?: string
  localizations?: Record<string, Partial<Omit<BlogPost, 'slug' | 'date' | 'coverImage' | 'localizations'>>>
}

export const categories: Category[] = [
  {
    id: 'optimize-images',
    title: 'Optimize images',
    tone: 'green',
    description: 'Make your images smaller or larger without losing quality.',
    icon: '↗',
    viewAllLabel: 'View all optimize tools',
  },
  {
    id: 'edit-images',
    title: 'Edit images',
    tone: 'purple',
    description: 'Edit and enhance your images with ease.',
    icon: '✂',
    viewAllLabel: 'View all edit tools',
  },
  {
    id: 'convert-formats',
    title: 'Convert formats',
    tone: 'blue',
    description: 'Convert your images to other formats.',
    icon: '⇄',
    viewAllLabel: 'View all convert tools',
  },
  {
    id: 'create-more',
    title: 'Create more',
    tone: 'yellow',
    description: 'Create fun and engaging images.',
    icon: '✧',
    viewAllLabel: 'View all create tools',
  },
  {
    id: 'privacy-protection',
    title: 'Privacy & protection',
    tone: 'teal',
    description: 'Protect your privacy and keep your images secure.',
    icon: '◇',
    viewAllLabel: 'View all privacy tools',
  },
  {
    id: 'video-tools',
    title: 'Video tools',
    tone: 'rose',
    description: 'Convert your videos quickly and easily.',
    icon: '▷',
    viewAllLabel: 'View all video tools',
  },
]

export const tools: Tool[] = [
  {
    slug: 'compress-image',
    name: 'Compress Image',
    category: 'optimize-images',
    description: 'Reduce image file size while keeping quality.',
    keywords: ['compress', 'optimize', 'small', 'jpg', 'png', 'webp'],
    mvp: true,
    title: 'Compress Image Online for Free',
    subtitle: 'Compress JPG, PNG, and WebP images in your browser. No signup required.',
    tips: ['Use WebP for the smallest web-ready files.', 'Lower quality creates smaller JPG and WebP files.'],
  },
  {
    slug: 'resize-image',
    name: 'Resize Image',
    category: 'optimize-images',
    description: 'Change image dimensions by pixels or percentage.',
    keywords: ['resize', 'dimensions', 'width', 'height', 'scale'],
    mvp: true,
    title: 'Resize Image Online',
    subtitle: 'Resize images by pixels or percentage and download instantly.',
    tips: ['Keep aspect ratio on to avoid stretching.', 'Use JPG or WebP for smaller final files.'],
  },
  {
    slug: 'batch-compress',
    name: 'Batch Compress',
    category: 'optimize-images',
    description: 'Compress multiple images and download a ZIP.',
    keywords: ['batch', 'compress', 'zip', 'multiple'],
    mvp: true,
    title: 'Batch Compress Images',
    subtitle: 'Compress up to 20 images at a time and download the results as a ZIP.',
    tips: ['Max 20 images per batch.', 'Each image should be 20MB or smaller.'],
  },
  {
    slug: 'upscale-image',
    name: 'Upscale Image',
    category: 'optimize-images',
    description: 'Make your images larger and sharper in your browser.',
    keywords: ['upscale', 'large', 'sharpen', '2x'],
    mvp: true,
    badge: 'NEW',
    title: 'Upscale Image',
    subtitle: 'A simple browser-based enlarger with sharpening controls.',
    tips: ['This does not use AI super resolution.', 'Best for quick everyday resizing.'],
  },
  {
    slug: 'crop-image',
    name: 'Crop Image',
    category: 'edit-images',
    description: 'Crop images by ratio, pixels, or freeform.',
    keywords: ['crop', 'ratio', 'pixels', 'square'],
    mvp: true,
    title: 'Crop Image Online for Free',
    subtitle: 'Crop by pixels or quick centered presets, then export PNG, JPG, or WebP.',
    tips: ['Set crop values manually for precise exports.', 'Use PNG if you need a lossless result.'],
  },
  {
    slug: 'rotate-image',
    name: 'Rotate Image',
    category: 'edit-images',
    description: 'Rotate photos left, right, or by a custom angle.',
    keywords: ['rotate', 'angle', 'turn'],
    mvp: true,
    title: 'Rotate Image Online',
    subtitle: 'Rotate images by 90 degrees or any custom angle.',
    tips: ['Custom rotation expands the canvas so corners are not cut off.', 'Choose a background color for transparent edges.'],
  },
  {
    slug: 'flip-image',
    name: 'Flip Image',
    category: 'edit-images',
    description: 'Flip images horizontally, vertically, or both.',
    keywords: ['flip', 'mirror', 'horizontal', 'vertical'],
    mvp: true,
    title: 'Flip Image Online',
    subtitle: 'Mirror images horizontally or vertically in seconds.',
    tips: ['Flip both to rotate the image visually by 180 degrees.', 'The original file stays on your device.'],
  },
  {
    slug: 'add-text',
    name: 'Add Text',
    category: 'edit-images',
    description: 'Place simple text on your image.',
    keywords: ['text', 'caption', 'font', 'label'],
    mvp: true,
    title: 'Add Text to Image',
    subtitle: 'Add captions or labels to an image directly in your browser.',
    tips: ['Short text works best for social and document images.', 'Export as PNG for crisp text.'],
  },
  {
    slug: 'change-background',
    name: 'Change Background',
    category: 'edit-images',
    description: 'Change transparent image backgrounds.',
    keywords: ['background', 'transparent', 'color'],
    mvp: true,
    title: 'Change Image Background',
    subtitle: 'Replace transparent PNG backgrounds with a color or gradient.',
    tips: ['This first version does not automatically remove backgrounds.', 'Use transparent PNG files for best results.'],
  },
  {
    slug: 'enhance-image',
    name: 'Enhance Image',
    category: 'edit-images',
    description: 'Adjust brightness, contrast, and color.',
    keywords: ['enhance', 'brightness', 'contrast', 'saturation'],
    mvp: true,
    title: 'Enhance Image',
    subtitle: 'Simple browser filters for everyday image improvements.',
    tips: ['Keep adjustments small for natural results.', 'AI enhancement is not part of this tool.'],
  },
  {
    slug: 'change-color',
    name: 'Change Color',
    category: 'edit-images',
    description: 'Apply basic color changes.',
    keywords: ['color', 'replace', 'tint'],
    mvp: true,
    title: 'Change Image Color',
    subtitle: 'Quick color controls for simple image edits.',
    tips: ['Precise object recoloring is planned for a later version.', 'Use Enhance Image for global color tuning.'],
  },
  {
    slug: 'convert-image',
    name: 'Convert Image',
    category: 'convert-formats',
    description: 'Convert images to PNG, JPG, or WebP.',
    keywords: ['convert', 'format', 'jpg', 'png', 'webp'],
    mvp: true,
    title: 'Convert Image Online',
    subtitle: 'Convert common image formats to JPG, PNG, or WebP in your browser.',
    tips: ['Browser decoding depends on your device support.', 'WebP is a strong default for websites.'],
  },
  {
    slug: 'convert-to-webp',
    name: 'Convert to WebP',
    category: 'convert-formats',
    description: 'Make images smaller and web-ready.',
    keywords: ['webp', 'convert', 'web', 'optimize'],
    mvp: true,
    title: 'Convert Images to WebP Online for Free',
    subtitle: 'Convert JPG, PNG, GIF, BMP, or TIFF images to WebP where supported.',
    tips: ['WebP usually reduces file size for web pages.', 'Use quality around 0.82 for a balanced result.'],
  },
  {
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    category: 'convert-formats',
    description: 'Combine images into a single PDF file.',
    keywords: ['pdf', 'document', 'combine', 'pages'],
    mvp: true,
    title: 'Convert Images to PDF',
    subtitle: 'Combine JPG, PNG, and WebP images into a PDF file online.',
    tips: ['Upload images in the order you want pages to appear.', 'A4 portrait is a good default for documents.'],
  },
  {
    slug: 'gif-maker',
    name: 'GIF Maker',
    category: 'create-more',
    description: 'Create animated GIFs from images.',
    keywords: ['gif', 'animation', 'frames'],
    mvp: true,
    title: 'GIF Maker',
    subtitle: 'Create simple GIFs from multiple images.',
    tips: ['GIF generation is planned for the next batch.', 'Keep source images small for fast processing.'],
  },
  {
    slug: 'meme-generator',
    name: 'Meme Generator',
    category: 'create-more',
    description: 'Make memes with top and bottom text.',
    keywords: ['meme', 'caption', 'fun'],
    mvp: true,
    title: 'Meme Generator',
    subtitle: 'Create simple meme images with bold captions.',
    tips: ['Use your own images to avoid template licensing issues.', 'Text export will run in the browser.'],
  },
  {
    slug: 'image-collage',
    name: 'Image Collage',
    category: 'create-more',
    description: 'Create custom collages with photos and text.',
    keywords: ['collage', 'photos', 'layout'],
    mvp: true,
    title: 'Image Collage',
    subtitle: 'Create beautiful collages with your photos, text, stickers and more.',
    tips: ['Drag images on the canvas to position them.', 'Double click text to edit.'],
  },
  {
    slug: 'photo-grid',
    name: 'Photo Grid',
    category: 'create-more',
    description: 'Combine multiple photos into a clean grid.',
    keywords: ['grid', 'collage', 'photos'],
    mvp: true,
    title: 'Photo Grid',
    subtitle: 'Combine multiple photos into a clean grid.',
    tips: ['Square and 4:5 presets are planned.', 'Canvas export keeps downloads predictable.'],
  },
  {
    slug: 'remove-exif',
    name: 'Remove EXIF',
    category: 'privacy-protection',
    description: 'Remove image metadata for better privacy.',
    keywords: ['exif', 'metadata', 'privacy', 'gps'],
    mvp: true,
    title: 'Remove EXIF Data',
    subtitle: 'Preview and remove image metadata such as camera model, date, and GPS location.',
    tips: ['Canvas re-export removes most image metadata.', 'Some color profiles may also be removed.'],
  },
  {
    slug: 'blur-image',
    name: 'Blur Image',
    category: 'privacy-protection',
    description: 'Blur an image before sharing it.',
    keywords: ['blur', 'privacy', 'hide'],
    mvp: true,
    title: 'Blur Image Online',
    subtitle: 'Apply a browser-based blur effect and download a clean copy.',
    tips: ['This first version blurs the whole image.', 'Local area brushing is planned for a richer editor.'],
  },
  {
    slug: 'pixelate-image',
    name: 'Pixelate Image',
    category: 'privacy-protection',
    description: 'Pixelate images to hide sensitive details.',
    keywords: ['pixelate', 'mosaic', 'privacy', 'hide'],
    mvp: true,
    title: 'Pixelate Image Online',
    subtitle: 'Create a mosaic effect for privacy-friendly sharing.',
    tips: ['This first version pixelates the whole image.', 'Use stronger pixel size for sensitive text.'],
  },
  {
    slug: 'add-watermark',
    name: 'Add Watermark',
    category: 'privacy-protection',
    description: 'Add a text watermark to your image.',
    keywords: ['watermark', 'copyright', 'protect'],
    mvp: true,
    title: 'Add Watermark to Image',
    subtitle: 'Place a text watermark on your image before publishing.',
    tips: ['Use low opacity for subtle copyright marks.', 'Corner positions keep the main subject visible.'],
  },
  {
    slug: 'video-to-gif',
    name: 'Video to GIF',
    category: 'video-tools',
    description: 'Convert a video clip to an animated GIF.',
    keywords: ['video', 'gif', 'convert', 'mp4', 'animation'],
    mvp: true,
    badge: 'GIF',
    title: 'Video to GIF Converter Online for Free - NanoImage',
    subtitle: 'Convert a part of your video to a high-quality GIF. All processing happens in your browser.',
    tips: ['Short clips under 15 seconds work best.', 'Lower FPS and smaller width create smaller GIFs.'],
  },
  {
    slug: 'video-to-mp3',
    name: 'Video to MP3',
    category: 'video-tools',
    description: 'Extract MP3 audio from your video files.',
    keywords: ['video', 'mp3', 'audio', 'extract', 'mp4'],
    mvp: true,
    badge: 'MP3',
    title: 'Video to MP3 Converter Online for Free - NanoImage',
    subtitle: 'Extract high-quality MP3 audio from your videos in seconds.',
    tips: ['192 kbps is recommended for most users.', 'Trim only the audio section you need to save time.'],
  },
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'nanoimage-redesign-free-image-tools',
    category: 'Updates / Product Design',
    title: 'NanoImage.net Redesign: Simpler Free Image Tools for Everyday Work',
    excerpt: 'NanoImage has been redesigned around simple, free image tools that help people compress, resize, convert, crop, and clean up images directly in the browser.',
    date: '2026-05-04',
    readTime: '4 min read',
    metaDescription: 'NanoImage has been redesigned around simple, free image tools that help people compress, resize, convert, crop, and clean up images directly in the browser.',
    body: `NanoImage has a new direction: simple, free image tools for everyday work.

If you only need to compress an image, crop a screenshot, convert a file, make a PDF, or add a watermark, you should not need to open a complex design app.

You need a small tool that is easy to understand and fast to use.

> **Tiny tools for everyday images.**
> Free, simple image tools to resize, compress, convert, crop, and clean up your pictures in seconds.

## Why we redesigned NanoImage

Many image tool websites have become harder to understand. They often focus on AI messaging, account systems, paywalls, and complicated upload flows.

Most everyday image tasks are much simpler:

- Make an image smaller
- Resize an image to a specific width or height
- Crop extra space from a screenshot
- Convert JPG, PNG, or WebP files
- Combine images into a PDF
- Blur or pixelate private information
- Remove image metadata
- Add text or a watermark

The redesign focuses on three questions:

1. Can people understand what NanoImage does right away?
2. Can people find the right tool quickly?
3. Can people feel confident that their images stay private?

## A clearer product position

NanoImage is now positioned as:

**Free image tools for everyday images.**

That means the core of NanoImage is not image generation. It is image processing: compressing, resizing, cropping, converting, cleaning, and making quick edits.

The product is built around common tasks that many people need often, including Compress Image, Resize Image, Convert Image, Image to PDF, Remove EXIF, Blur Image, Pixelate Image, Add Text, and Add Watermark.

Future AI features may be added carefully, but the main experience should stay lightweight, practical, and easy to start.

## A simpler homepage

The homepage now explains the product faster.

The main message is:

**Tiny tools for everyday images.**

The supporting message is:

**Free, simple image tools to resize, compress, convert, crop, and clean up your pictures in seconds.**

The navigation has also been simplified around the parts people need most:

- Tools
- How it works
- Blog
- Free tools
- Language selection

The goal is to help people move from landing on the site to using a tool with as little friction as possible.

## Tools grouped by use case

Instead of showing one long list of tools, NanoImage groups tools by what people are trying to do.

### Optimize images

Tools for making images smaller, larger, or better suited for upload and web use.

### Edit images

Tools for changing composition, direction, text, color, or visual style.

### Convert formats

Tools for changing file types or turning images into documents.

### Create more

Tools for making new visual content from existing images, such as grids, collages, memes, and GIFs.

### Privacy & protection

Tools for removing metadata, hiding sensitive details, and protecting images before sharing.

This structure is easier to scan because people often know their goal before they know the exact tool name.

## Privacy stays visible

A key NanoImage principle is:

**Your images are processed in your browser whenever possible.**

For many core tools, the image can be handled locally in the browser. That means users can complete common tasks without creating an account or sending files through a complicated upload workflow.

The interface now makes these privacy messages easier to see:

- Your images stay private
- No signup required
- Works in your browser
- Core tools are free to use

These messages are not decoration. They explain how NanoImage is meant to work.

## A softer visual style

The redesign also moves away from a heavy AI-template look.

NanoImage now uses:

- A handwritten logo
- More whitespace
- Soft purple accents
- Rounded cards
- Friendly icons
- Small doodle details
- Low-saturation category colors

The goal is not to look flashy. The goal is to feel clear, approachable, and trustworthy.

## What the redesign is really about

This redesign is not just a new visual layer. It clarifies what NanoImage should be:

- Easy to understand
- Free to start
- Focused on small image tasks
- Privacy-friendly
- Lightweight enough for everyday use

NanoImage should feel like a simple toolbox: open the page, pick a tool, process the image, and download the result.

## Summary

NanoImage is not trying to be a heavy design suite or an AI image generation platform.

It is a collection of lightweight online image tools for people who need to quickly compress, crop, convert, clean, or edit everyday images.

The redesign keeps that promise front and center: simple tools, clear pages, and a browser-first experience whenever possible.`,
  },
  {
    slug: 'how-to-compress-images-without-losing-quality',
    category: 'Tips',
    title: 'How to Compress Images Without Losing Quality',
    excerpt: 'Learn how to compress JPG, PNG, and WebP images without losing visible quality.',
    date: '2026-05-06',
    readTime: '8 min read',
    metaDescription: 'Learn how to compress JPG, PNG, and WebP images without losing visible quality. A practical guide to smaller image files, faster websites, and better sharing.',
    coverImage: '/assets/blog/compress-images-cover.png',
    body: `Large image files can slow down websites, make emails harder to send, and cause upload errors on forms, marketplaces, and social platforms.

The good news is that most images can be made much smaller without looking noticeably worse.

In this guide, we’ll explain how image compression works, when to use JPG, PNG, or WebP, and how to reduce file size while keeping your images clean and sharp.

![Original and compressed image comparison](/assets/blog/compress-images-comparison.png)

## What does image compression mean?

Image compression means reducing the file size of an image.

A smaller image file is easier to:

- Upload
- Download
- Share
- Store
- Send by email
- Use on websites
- Add to documents or PDFs

Compression does not always mean making an image look bad. Good compression removes unnecessary data and reduces file size while keeping the image visually close to the original.

## Why should you compress images?

Compressing images is useful in many everyday situations.

### Faster websites

Large images are one of the most common reasons web pages load slowly. Compressing images can make pages feel faster, especially on mobile devices or slower connections.

### Easier uploads

Many websites limit image file size. You may see upload errors when submitting profile photos, product images, documents, forms, or application materials.

Compression helps you stay under those limits.

### Smaller emails and messages

Large attachments can be blocked or take a long time to send. Compressing images makes sharing easier.

### Better storage

If you keep many screenshots, photos, product images, or design assets, compression can save a lot of disk space over time.

## Lossy vs lossless compression

There are two main types of image compression: lossy and lossless.

### Lossy compression

Lossy compression reduces file size by removing some image data.

This sounds bad, but it can work very well. A photo compressed at the right quality setting may look almost identical to the original while being much smaller.

Lossy compression is commonly used for:

- JPG images
- WebP images
- Website photos
- Social media images
- Product photos

### Lossless compression

Lossless compression reduces file size without removing visible image data.

This is useful when you need to keep edges, text, icons, or transparency very clean.

Lossless compression is commonly used for:

- PNG graphics
- Icons
- Screenshots
- UI images
- Images with text
- Transparent images

## JPG, PNG, or WebP: which format should you use?

Choosing the right image format is one of the easiest ways to get a smaller file.

### Use JPG for photos

JPG is usually best for photographs and complex images with many colors.

Use JPG for:

- Camera photos
- Product photos
- Travel photos
- Blog images
- Large website photos

JPG does not support transparency, so it is not ideal for logos or cutout images with transparent backgrounds.

### Use PNG for graphics and transparency

PNG is best for images that need sharp edges or transparent backgrounds.

Use PNG for:

- Logos
- Icons
- Screenshots
- UI elements
- Transparent images
- Images with text

PNG files can be larger than JPG, especially for photos.

### Use WebP for smaller web-ready images

WebP is a modern format that often creates smaller files than JPG or PNG while keeping good quality.

Use WebP for:

- Website images
- Blog images
- Product images
- Lightweight web graphics
- Images that need a smaller file size

WebP is a great choice when you want images to load faster online.

## What quality setting should you choose?

Most image compressors let you choose a quality level.

A higher quality value keeps more detail but creates a larger file. A lower quality value creates a smaller file but may introduce blur, noise, or blocky artifacts.

A good starting point:

- **JPG:** 70–85 quality
- **WebP:** 65–80 quality
- **PNG:** use lossless or optimized PNG when possible

For most everyday images, you do not need 100% quality. A setting around 75–80 often looks very close to the original while saving a lot of space.

## How to compress images without losing visible quality

Here are practical steps you can follow.

### 1. Start with the right format

If your image is a photo, use JPG or WebP.

If your image has transparency, text, icons, or sharp graphics, use PNG or WebP.

### 2. Resize oversized images

Many images are much larger than needed.

For example, a phone photo may be 4000px wide, but a website article may only display it at 1200px wide.

Resizing before compression can reduce file size dramatically.

### 3. Use a balanced quality setting

Avoid setting quality too low. Start around 75–80 and preview the result.

If the image still looks good, you can try lowering it slightly.

### 4. Compare before and after

Always preview the compressed version before downloading. Look for:

- Blurry details
- Blocky areas
- Color banding
- Text becoming hard to read
- Edges becoming fuzzy

If you notice these issues, increase the quality setting.

### 5. Remove metadata if you do not need it

Image files may contain metadata such as camera model, date, and location. Removing metadata can reduce file size slightly and improve privacy.

For privacy-sensitive images, use a Remove EXIF tool before sharing.

## Best compression settings by use case

### Website images

Recommended:

- Format: WebP or JPG
- Width: 1200–2000px, depending on layout
- Quality: 70–80
- Remove metadata: Yes

### Blog images

Recommended:

- Format: WebP
- Width: 1200px
- Quality: 75–80
- Remove metadata: Yes

### Product photos

Recommended:

- Format: WebP or JPG
- Width: 1500–2000px
- Quality: 80–85
- Remove metadata: Optional

### Email attachments

Recommended:

- Format: JPG
- Width: 1000–1600px
- Quality: 70–80
- Remove metadata: Optional

### Screenshots

Recommended:

- Format: PNG or WebP
- Resize only if needed
- Use higher quality if text must stay sharp

## Common image compression mistakes

### Using JPG for transparent images

JPG does not support transparency. If you convert a transparent PNG to JPG, the transparent area may turn white, black, or another background color.

### Compressing the same JPG again and again

Repeated JPG compression can make an image worse each time. Try to keep an original copy and compress from that when possible.

### Setting quality too low

Very low quality can create visible artifacts. If the image looks blocky or muddy, increase the quality setting.

### Uploading huge images when a smaller size is enough

Compression helps, but resizing oversized images often saves even more space.

## How to compress images with NanoImage

NanoImage makes image compression simple and browser-friendly.

1. Open the [**Compress Image**](/compress-image) tool.
2. Upload or drag and drop your image.
3. Choose a preset such as Recommended, Smallest Size, or High Quality.
4. Select an output format: JPG, PNG, or WebP.
5. Adjust the quality slider.
6. Preview the result.
7. Download the compressed image.

For multiple files, use [**Batch Compress**](/batch-compress) to compress several images at once and download them as a ZIP file.

## Do compressed images stay private?

NanoImage is designed to process core image tools in your browser whenever possible.

That means your images can be compressed locally on your device without being intentionally uploaded to our servers.

This makes NanoImage useful for everyday privacy-sensitive tasks, such as compressing personal photos, screenshots, or documents before sharing.

## Final tips

Image compression is about balance.

You want the smallest file possible, but not at the cost of visible quality. For most images, the best result comes from combining three simple steps:

1. Choose the right format.
2. Resize the image if it is too large.
3. Use a balanced quality setting.

With NanoImage, you can compress images quickly, preview the result, and download smaller files in seconds.

## Try it now

Use NanoImage to compress your images online for free.

[**Compress Image**](/compress-image): /compress-image

[**Batch Compress**](/batch-compress): /batch-compress

[**Convert to WebP**](/convert-to-webp): /convert-to-webp`,
  },
  {
    slug: 'how-to-resize-images-without-losing-quality',
    category: 'Tips',
    title: 'How to Resize Images Without Losing Quality',
    excerpt: 'Learn how to resize JPG, PNG, and WebP images for websites, social media, email, and documents without making them blurry or distorted.',
    date: '2026-05-06',
    readTime: '8 min read',
    metaDescription: 'Learn how to resize JPG, PNG, and WebP images for websites, social media, email, and documents without making them blurry or distorted.',
    coverImage: '/assets/blog/resize-images-cover.png',
    body: `Images are not always the right size for where you want to use them.

A photo from your phone may be too large for a website. A product image may need a specific width. A profile picture may need to be square. A document upload form may reject images that are too big.

That is where image resizing helps.

In this guide, we’ll explain how to resize images properly, how to avoid blurry results, and what size settings work best for websites, social media, email, and documents.

![Original and resized image comparison](/assets/blog/resize-images-comparison.png)

## What does resizing an image mean?

Resizing an image means changing its width and height.

For example, you might resize an image from 4000 × 3000 px to 1200 × 900 px.

The image keeps the same visual content, but it uses fewer pixels. This usually makes the file smaller and easier to upload, share, and display.

You can also make an image larger, but enlarging an image does not magically add real detail. If an image is too small, increasing its size too much may make it look soft or blurry.

## Why resize images?

Resizing images is useful for many everyday tasks.

### Faster websites

Large images slow down pages. If your website only displays an image at 1200px wide, uploading a 5000px-wide image is usually unnecessary.

Resizing images before uploading can improve loading speed and user experience.

### Better social media posts

Social platforms often recommend specific image sizes or aspect ratios. Resizing helps your image fit correctly without awkward cropping.

### Easier email sharing

Large images can make email attachments heavy. Resizing photos before sending them can reduce file size and make delivery easier.

### Cleaner documents and PDFs

Oversized images can make Word documents, presentations, and PDFs unnecessarily large. Resizing helps keep files manageable.

### Fewer upload errors

Many forms and websites have file size or dimension limits. Resizing helps your image meet those requirements.

## Resize vs crop: what is the difference?

Resizing and cropping are different.

### Resize

Resize changes the image dimensions while keeping the full image content.

Example: 4000 × 3000 px → 1200 × 900 px.

Nothing is removed. The whole image becomes smaller or larger.

### Crop

Crop removes part of the image.

Example: 4000 × 3000 px → 1080 × 1080 px square crop.

Part of the image is cut away to fit a specific shape or composition.

Use [**Resize Image**](/resize-image) when the image content is already correct but the dimensions are wrong.

Use [**Crop Image**](/crop-image) when you need to remove unwanted areas or change the composition.

## Pixels, percentage, and aspect ratio

Before resizing an image, it helps to understand three basic ideas.

### Pixels

Pixels are the tiny dots that make up an image. Image size is usually shown as width × height in pixels.

Example: 1920 × 1080 px.

This means the image is 1920 pixels wide and 1080 pixels tall.

### Percentage

You can also resize by percentage.

For example, 50% means the new width and height will be half of the original size.

If your image is 4000 × 3000 px, resizing to 50% gives you 2000 × 1500 px.

### Aspect ratio

Aspect ratio is the relationship between width and height.

Common aspect ratios include:

- 1:1 square
- 4:3 classic photo
- 16:9 widescreen
- 9:16 vertical video or story
- 4:5 social post

When resizing, you usually want to keep the original aspect ratio so the image does not look stretched.

## Always keep aspect ratio when possible

One of the most common resizing mistakes is stretching an image.

For example, if you resize a 4000 × 3000 image to 1200 × 1200 without cropping, the image may look squeezed or distorted.

To avoid this, turn on **Keep aspect ratio**. This automatically adjusts one dimension when you change the other.

For example, if your original image is 4000 × 3000 and you change the width to 1200, the height becomes 900 automatically.

## Best image sizes for common uses

There is no single perfect image size, but these recommendations work well for most everyday situations.

### Website hero images

Recommended: 1600–2400 px wide.

Use larger sizes for full-width banners, but avoid uploading huge 5000px images unless truly needed.

### Blog images

Recommended: 1200 px wide.

This is usually enough for article images and keeps file size reasonable.

### Product images

Recommended: 1500–2000 px wide.

This gives enough detail for zoom or product galleries without making the file too heavy.

### Email images

Recommended: 800–1200 px wide.

Email clients do not need extremely large images.

### Profile pictures

Recommended: 400 × 400 px or 800 × 800 px.

Use a square crop first if needed, then resize.

### Social media posts

Common sizes:

- 1080 × 1080 px for square posts
- 1080 × 1350 px for portrait posts
- 1080 × 1920 px for stories or vertical images
- 1200 × 630 px for link previews

Always check the latest size requirements for the platform you are posting to.

## Should you resize before or after compression?

Usually, resize first and compress after.

A good workflow is:

1. Resize the image to the dimensions you actually need.
2. Compress the resized image to reduce file size.
3. Preview the result before downloading.

Why resize first?

Because compression works better when the image is already the correct size. If you compress a huge image and then resize it later, you may lose quality twice.

## Can you enlarge an image without losing quality?

You can enlarge an image, but there are limits.

If you make a small image slightly larger, the result may still look fine. But if you enlarge it too much, it may become blurry or pixelated.

For example, 800 × 600 px → 1200 × 900 px may be acceptable.

But 800 × 600 px → 4000 × 3000 px will usually not look sharp unless you use advanced AI upscaling.

For NanoImage, basic resizing and upscaling are designed for simple browser-based tasks, not AI super-resolution.

## Best practices for resizing images

### 1. Start from the original image

If possible, resize from the original file instead of a previously compressed or resized copy.

This helps preserve quality.

### 2. Do not resize repeatedly

Every time you resize and re-export an image, quality may change. Try to resize once from the best available source.

### 3. Keep aspect ratio on

This prevents stretching and distortion.

### 4. Resize to the display size you need

If your website displays an image at 1200px wide, resize it close to that width.

### 5. Use the right output format

- Use JPG for photos.
- Use PNG for transparency or sharp graphics.
- Use WebP for smaller web-ready images.

### 6. Preview before downloading

Check important details such as text, faces, product edges, and logos.

## Common resizing mistakes

### Stretching the image

This happens when width and height are changed independently without keeping aspect ratio.

### Making images too small

If you resize too aggressively, the image may look blurry on high-resolution screens.

### Uploading oversized images to websites

This slows down your website and wastes bandwidth.

### Enlarging low-resolution images too much

Basic resizing cannot recover missing detail.

### Choosing the wrong format

A resized PNG photo may still be much larger than a JPG or WebP version.

## How to resize images with NanoImage

NanoImage makes resizing simple.

1. Open the [**Resize Image**](/resize-image) tool.
2. Upload or drag and drop your image.
3. Choose to resize by pixels or percentage.
4. Enter a new width or height.
5. Keep aspect ratio turned on if you want to avoid distortion.
6. Choose an output format: PNG, JPG, or WebP.
7. Preview the result.
8. Download your resized image.

NanoImage is designed for everyday image tasks, so you can resize images quickly without installing software or creating an account.

## Do resized images stay private?

NanoImage is built around browser-based image tools whenever possible.

For core tools like resizing, your image can be processed locally in your browser. That means your file does not need to be intentionally uploaded to our servers.

This makes NanoImage useful for resizing personal photos, screenshots, documents, and web images while keeping the process simple and private.

## Resize and compress for the best result

If your goal is to reduce file size, resizing and compression work best together.

Example workflow:

1. Resize a 4000px-wide image to 1200px wide.
2. Convert it to WebP or JPG.
3. Compress it with a balanced quality setting.

This can reduce file size dramatically while keeping the image visually clear.

## Final thoughts

Resizing images is one of the simplest ways to make files easier to upload, share, and use online.

The key is to resize with purpose:

- Choose the dimensions you actually need.
- Keep aspect ratio on.
- Avoid enlarging too much.
- Pick the right output format.
- Compress after resizing when file size matters.

With NanoImage, you can resize images in seconds, directly in your browser, with no signup required.

## Try it now

Use NanoImage to resize your images online for free.

[**Resize Image**](/resize-image): /resize-image

[**Compress Image**](/compress-image): /compress-image

[**Convert to WebP**](/convert-to-webp): /convert-to-webp`,
  },
  {
    slug: 'jpg-png-webp',
    category: 'Tips',
    title: 'JPG vs PNG vs WebP: which format should you use?',
    excerpt: 'Learn the everyday differences between common image formats and when each one makes sense.',
    date: '2025-05-03',
    readTime: '6 min read',
  },
  {
    slug: 'what-is-exif-data',
    category: 'Privacy',
    title: 'What is EXIF data and why remove it?',
    excerpt: 'Photos can include camera, time, and location metadata. Here is what to know before sharing.',
    date: '2025-05-03',
    readTime: '4 min read',
  },
  {
    slug: "introducing-nanoimage-cli",
    category: "Product Updates / Developer Tools",
    title: "Introducing NanoImage CLI: Optimize Images from Your Terminal",
    excerpt: "NanoImage CLI lets developers compress, resize, convert, convert to WebP, and remove EXIF metadata from images locally from the command line.",
    date: "2026-05-10",
    readTime: "8 min read",
    metaDescription: "NanoImage CLI lets developers compress, resize, convert, convert to WebP, and remove EXIF metadata from images locally from the command line.",
    coverImage: "/assets/blog/introducing-nanoimage-cli-cover.png",
    body: "Images are one of the easiest ways to slow down a website. They are also one of the easiest things to fix.\n\nNanoImage started as a simple browser-based image toolset. Now, NanoImage CLI brings the same practical image workflows to the terminal.\n\nWith NanoImage CLI, you can compress, resize, convert, convert to WebP, and remove EXIF metadata from local image files with simple commands.\n\n```bash\nnanoimage compress ./images --quality 75 --output ./compressed\n```\n\nIt is built for developers, content teams, indie hackers, SEO teams, and anyone who wants to optimize images without opening a browser.\n\n## Why We Built NanoImage CLI\n\nThe NanoImage web tools are great when you want to quickly process one image in your browser.\n\nBut some workflows are better from the command line:\n\n- Optimizing a folder of blog images\n- Preparing product images for a website\n- Converting assets to WebP before deployment\n- Removing EXIF metadata before publishing\n- Running image optimization in CI/CD\n- Repeating the same settings across many files\n\nA CLI makes those workflows faster and easier to automate.\n\nInstead of opening each image manually, you can run one command and process an entire folder.\n\n## What You Can Do with NanoImage CLI\n\nThe first release focuses on five practical commands.\n\n### 1. Compress images\n\nReduce file size while keeping a good balance between quality and size.\n\n```bash\nnanoimage compress photo.jpg --quality 75 --output ./compressed\n```\n\nYou can also compress a whole folder:\n\n```bash\nnanoimage compress ./images --quality 75 --output ./compressed\n```\n\n### 2. Resize images\n\nResize images by width, height, or fit mode.\n\n```bash\nnanoimage resize hero.jpg --width 1600 --output ./resized\n```\n\nFor website images, this is useful when original photos are much larger than the display size.\n\n### 3. Convert image formats\n\nConvert between common image formats such as JPG, PNG, WebP, and AVIF.\n\n```bash\nnanoimage convert logo.png --to jpg --background white --output ./converted\n```\n\nThis is helpful when you need a specific format for a website, email, CMS, or upload form.\n\n### 4. Convert to WebP\n\nWebP is a common choice for smaller web-ready images.\n\nNanoImage CLI includes a shortcut command for WebP conversion:\n\n```bash\nnanoimage webp hero.jpg --quality 80 --output ./webp\n```\n\nYou can also convert an entire folder:\n\n```bash\nnanoimage webp ./public/images --quality 82 --output ./public/images-webp\n```\n\n### 5. Remove EXIF metadata\n\nImages can contain hidden metadata such as camera model, date, device settings, and sometimes location information.\n\nNanoImage CLI can remove common EXIF metadata before publishing or sharing images.\n\n```bash\nnanoimage remove-exif photo.jpg --output ./clean\n```\n\nFor folders:\n\n```bash\nnanoimage remove-exif ./uploads --output ./uploads-clean\n```\n\n## Install NanoImage CLI\n\nInstall globally with npm:\n\n```bash\nnpm install -g nanoimage\n```\n\nOr run it with npx:\n\n```bash\nnpx nanoimage --help\n```\n\nRequires Node.js 18 or later.\n\n## Quick Start\n\nHere are the five most useful commands:\n\n```bash\nnanoimage compress photo.jpg --quality 75 --output ./compressed\n```\n\n```bash\nnanoimage resize photo.jpg --width 1200 --output ./resized\n```\n\n```bash\nnanoimage convert photo.png --to jpg --output ./converted\n```\n\n```bash\nnanoimage webp photo.jpg --quality 80 --output ./webp\n```\n\n```bash\nnanoimage remove-exif photo.jpg --output ./clean\n```\n\n## Batch Image Optimization\n\nOne of the best reasons to use a CLI is batch processing.\n\nFor example, you can compress every image in a folder:\n\n```bash\nnanoimage compress ./images --quality 75 --output ./compressed\n```\n\nResize blog images to a practical width:\n\n```bash\nnanoimage resize ./blog-images --width 1200 --output ./blog-images-resized\n```\n\nConvert a folder to WebP:\n\n```bash\nnanoimage webp ./images --quality 80 --output ./webp\n```\n\n## Use It in CI/CD\n\nNanoImage CLI can be used in build scripts.\n\nExample package.json script:\n\n```json\n{\n  \"scripts\": {\n    \"optimize-images\": \"nanoimage compress ./public/images --quality 75 --output ./public/images-optimized\"\n  }\n}\n```\n\nYou can also run it in GitHub Actions:\n\n```yaml\nname: Optimize Images\n\non: [push]\n\njobs:\n  optimize:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm install -g nanoimage\n      - run: nanoimage compress ./public/images --quality 75 --output ./public/images-optimized\n```\n\nThis makes image optimization part of your normal development workflow.\n\n## JSON Output for Automation\n\nNanoImage CLI supports JSON output for scripts and automation.\n\n```bash\nnanoimage compress photo.jpg --quality 75 --json\n```\n\nExample output:\n\n```json\n[\n  {\n    \"input\": \"photo.jpg\",\n    \"output\": \"photo.jpg\",\n    \"inputSize\": 2457600,\n    \"outputSize\": 524288\n  }\n]\n```\n\nThis is useful for logs, CI/CD, custom build systems, and future AI agent workflows.\n\n## Local Image Processing\n\nNanoImage CLI is designed for local processing.\n\nThat means your files are processed on your machine from the terminal. You do not need to upload images to a website just to compress, resize, convert, or clean them.\n\nThis is especially useful for:\n\n- Website assets\n- Product photos\n- Blog images\n- Personal photos\n- Images with private metadata\n- Client projects\n\n## When Should You Use the Web App Instead?\n\nUse the NanoImage web app when you want a visual interface, preview, and quick manual editing.\n\nUse NanoImage CLI when you want automation, batch processing, scripts, and repeatable settings.\n\nA simple rule:\n\n```text\nOne image, visual editing -> use the web app\nMany images, repeatable workflow -> use the CLI\n```\n\n## What Comes Next\n\nThe first NanoImage CLI release focuses on five stable commands:\n\n```text\ncompress\nresize\nconvert\nwebp\nremove-exif\n```\n\nNext, we may explore:\n\n- Image to PDF\n- Rotate and flip\n- Watermarking\n- GitHub Action wrapper\n- More batch reports\n- MCP server for AI agents\n\nThe goal is not to make the CLI complicated. The goal is to keep it fast, practical, and easy to automate.\n\n## Try NanoImage CLI\n\nInstall it with npm:\n\n```bash\nnpm install -g nanoimage\n```\n\nRead the documentation:\n\n```text\nhttps://nanoimage.net/docs/cli\n```\n\nCLI landing page:\n\n```text\nhttps://nanoimage.net/cli\n```\n\nNanoImage CLI gives developers a simple way to optimize images locally, from the terminal, with commands that are easy to understand and easy to automate.",
    localizations: {
      'zh-CN': {
        category: "产品更新 / 开发者工具",
        title: "介绍 NanoImage CLI：在终端中优化图片",
        excerpt: "NanoImage CLI 让开发者可以在本地通过命令行压缩、调整尺寸、转换格式、生成 WebP，并移除图片 EXIF 元数据。",
        readTime: "7 分钟阅读",
        metaDescription: "NanoImage CLI 让开发者可以在本地通过命令行压缩、调整尺寸、转换格式、生成 WebP，并移除图片 EXIF 元数据。",
        body: "图片是拖慢网站速度最常见的原因之一，也是最容易优化的部分之一。\n\nNanoImage 最初是一个简单的浏览器图片工具集合。现在，NanoImage CLI 把同样实用的图片处理流程带到了终端。\n\n使用 NanoImage CLI，你可以用简单命令在本地压缩图片、调整尺寸、转换格式、转为 WebP，并移除 EXIF 元数据。\n\n```bash\nnanoimage compress ./images --quality 75 --output ./compressed\n```\n\n它适合开发者、内容团队、独立开发者、SEO 团队，以及任何希望不用打开浏览器就能批量优化图片的人。\n\n## 为什么要做 NanoImage CLI\n\nNanoImage 网页工具很适合快速处理单张图片。\n\n但有些工作流更适合命令行：\n\n- 优化一整个博客图片文件夹\n- 为网站准备产品图\n- 部署前把资源转换为 WebP\n- 发布前移除 EXIF 元数据\n- 在 CI/CD 中自动优化图片\n- 对大量文件重复使用相同设置\n\nCLI 可以让这些流程更快，也更容易自动化。\n\n## NanoImage CLI 可以做什么\n\n首个版本聚焦 5 个实用命令。\n\n### 1. 压缩图片\n\n在保持较好视觉质量的同时减少文件体积。\n\n```bash\nnanoimage compress photo.jpg --quality 75 --output ./compressed\n```\n\n也可以压缩整个文件夹：\n\n```bash\nnanoimage compress ./images --quality 75 --output ./compressed\n```\n\n### 2. 调整图片尺寸\n\n按宽度、高度或适配模式调整图片。\n\n```bash\nnanoimage resize hero.jpg --width 1600 --output ./resized\n```\n\n### 3. 转换图片格式\n\n在 JPG、PNG、WebP、AVIF 等常见格式之间转换。\n\n```bash\nnanoimage convert logo.png --to jpg --background white --output ./converted\n```\n\n### 4. 转换为 WebP\n\nWebP 是常见的小体积网页图片格式。\n\n```bash\nnanoimage webp hero.jpg --quality 80 --output ./webp\n```\n\n### 5. 移除 EXIF 元数据\n\n图片可能包含相机型号、拍摄时间、设备设置甚至位置信息等隐藏数据。\n\n```bash\nnanoimage remove-exif photo.jpg --output ./clean\n```\n\n## 安装 NanoImage CLI\n\n使用 npm 全局安装：\n\n```bash\nnpm install -g nanoimage\n```\n\n也可以用 npx 直接运行：\n\n```bash\nnpx nanoimage --help\n```\n\n需要 Node.js 18 或更高版本。\n\n## 批量图片优化\n\nCLI 最有价值的场景之一是批量处理。\n\n```bash\nnanoimage compress ./images --quality 75 --output ./compressed\nnanoimage resize ./blog-images --width 1200 --output ./blog-images-resized\nnanoimage webp ./images --quality 80 --output ./webp\n```\n\n## 用在 CI/CD 中\n\nNanoImage CLI 可以放进构建脚本或 GitHub Actions。\n\n```yaml\n- run: npm install -g nanoimage\n- run: nanoimage compress ./public/images --quality 75 --output ./public/images-optimized\n```\n\n## JSON 输出\n\n使用 `--json` 可以输出适合脚本读取的结果。\n\n```bash\nnanoimage compress photo.jpg --quality 75 --json\n```\n\n这对日志、CI/CD、自定义构建系统和未来 AI Agent 工作流都很有用。\n\n## 本地图片处理\n\nNanoImage CLI 在你的机器本地处理文件，不需要把图片上传到网站。\n\n## 什么时候使用网页应用\n\n如果你需要可视化预览和手动编辑，使用 NanoImage 网页版。\n\n如果你需要自动化、批量处理、脚本和可重复设置，使用 NanoImage CLI。\n\n## 立即尝试\n\n```bash\nnpm install -g nanoimage\n```\n\n文档地址：https://nanoimage.net/docs/cli\n\nCLI 页面：https://nanoimage.net/cli",
      },
      'zh-TW': {
        category: "產品更新 / 開發者工具",
        title: "介紹 NanoImage CLI：在終端機中最佳化圖片",
        excerpt: "NanoImage CLI 讓開發者可以在本機透過命令列壓縮、調整尺寸、轉換格式、轉為 WebP，並移除圖片 EXIF 中繼資料。",
        readTime: "7 分鐘閱讀",
        metaDescription: "NanoImage CLI 讓開發者可以在本機透過命令列壓縮、調整尺寸、轉換格式、轉為 WebP，並移除圖片 EXIF 中繼資料。",
        body: "圖片是拖慢網站速度最常見的原因之一，也是最容易改善的部分之一。\n\nNanoImage 原本是一組簡單的瀏覽器圖片工具。現在，NanoImage CLI 把同樣實用的圖片工作流程帶到終端機。\n\n你可以用簡單命令在本機壓縮圖片、調整尺寸、轉換格式、轉成 WebP，並移除 EXIF 中繼資料。\n\n```bash\nnanoimage compress ./images --quality 75 --output ./compressed\n```\n\n它適合開發者、內容團隊、獨立開發者、SEO 團隊，以及想用命令列批次最佳化圖片的人。\n\n## 為什麼要做 NanoImage CLI\n\n網頁工具適合快速處理單張圖片，但有些流程更適合命令列：\n\n- 最佳化整個部落格圖片資料夾\n- 為網站準備產品圖\n- 部署前轉換成 WebP\n- 發布前移除 EXIF 中繼資料\n- 在 CI/CD 中自動處理圖片\n\nCLI 讓這些流程更快，也更容易自動化。\n\n## 主要命令\n\n### 壓縮圖片\n\n```bash\nnanoimage compress photo.jpg --quality 75 --output ./compressed\n```\n\n### 調整尺寸\n\n```bash\nnanoimage resize hero.jpg --width 1600 --output ./resized\n```\n\n### 轉換格式\n\n```bash\nnanoimage convert logo.png --to jpg --background white --output ./converted\n```\n\n### 轉成 WebP\n\n```bash\nnanoimage webp hero.jpg --quality 80 --output ./webp\n```\n\n### 移除 EXIF\n\n```bash\nnanoimage remove-exif photo.jpg --output ./clean\n```\n\n## 安裝\n\n```bash\nnpm install -g nanoimage\n```\n\n或使用 npx：\n\n```bash\nnpx nanoimage --help\n```\n\n需要 Node.js 18 或更新版本。\n\n## 批次與自動化\n\n```bash\nnanoimage compress ./images --quality 75 --output ./compressed\nnanoimage webp ./images --quality 80 --output ./webp\n```\n\n也可以放進 GitHub Actions：\n\n```yaml\n- run: npm install -g nanoimage\n- run: nanoimage compress ./public/images --quality 75 --output ./public/images-optimized\n```\n\n## 立即嘗試\n\n文檔：https://nanoimage.net/docs/cli\n\nCLI 頁面：https://nanoimage.net/cli",
      },
      ja: {
        category: "プロダクト更新 / 開発者ツール",
        title: "NanoImage CLI の紹介：ターミナルで画像を最適化",
        excerpt: "NanoImage CLI は、画像の圧縮、リサイズ、形式変換、WebP 変換、EXIF メタデータ削除をローカルのコマンドラインで実行できます。",
        readTime: "7分で読めます",
        metaDescription: "NanoImage CLI は、画像の圧縮、リサイズ、形式変換、WebP 変換、EXIF メタデータ削除をローカルのコマンドラインで実行できます。",
        body: "画像は Web サイトを遅くする大きな要因のひとつですが、改善しやすい部分でもあります。\n\nNanoImage はブラウザベースの画像ツールとして始まりました。NanoImage CLI は、その実用的なワークフローをターミナルに持ち込みます。\n\n```bash\nnanoimage compress ./images --quality 75 --output ./compressed\n```\n\n開発者、コンテンツチーム、SEO チームなど、ブラウザを開かずに画像を最適化したい人のためのツールです。\n\n## なぜ CLI を作ったのか\n\n単体の画像なら Web ツールが便利です。しかし、フォルダ単位の最適化、WebP 変換、EXIF 削除、CI/CD での自動化には CLI が向いています。\n\n## できること\n\n### 画像を圧縮\n\n```bash\nnanoimage compress photo.jpg --quality 75 --output ./compressed\n```\n\n### 画像をリサイズ\n\n```bash\nnanoimage resize hero.jpg --width 1600 --output ./resized\n```\n\n### 形式を変換\n\n```bash\nnanoimage convert logo.png --to jpg --background white --output ./converted\n```\n\n### WebP に変換\n\n```bash\nnanoimage webp hero.jpg --quality 80 --output ./webp\n```\n\n### EXIF を削除\n\n```bash\nnanoimage remove-exif photo.jpg --output ./clean\n```\n\n## インストール\n\n```bash\nnpm install -g nanoimage\n```\n\nNode.js 18 以降が必要です。\n\n## 自動化\n\n```yaml\n- run: npm install -g nanoimage\n- run: nanoimage compress ./public/images --quality 75 --output ./public/images-optimized\n```\n\n## 試してみる\n\nドキュメント：https://nanoimage.net/docs/cli\n\nCLI ページ：https://nanoimage.net/cli",
      },
      ko: {
        category: "제품 업데이트 / 개발자 도구",
        title: "NanoImage CLI 소개: 터미널에서 이미지 최적화하기",
        excerpt: "NanoImage CLI는 이미지 압축, 크기 조정, 포맷 변환, WebP 변환, EXIF 메타데이터 제거를 로컬 명령줄에서 실행할 수 있게 해줍니다.",
        readTime: "7분 읽기",
        metaDescription: "NanoImage CLI는 이미지 압축, 크기 조정, 포맷 변환, WebP 변환, EXIF 메타데이터 제거를 로컬 명령줄에서 실행할 수 있게 해줍니다.",
        body: "이미지는 웹사이트를 느리게 만드는 가장 흔한 원인 중 하나이며, 동시에 가장 쉽게 개선할 수 있는 부분입니다.\n\nNanoImage는 브라우저 기반 이미지 도구로 시작했습니다. 이제 NanoImage CLI는 같은 작업 흐름을 터미널로 가져옵니다.\n\n```bash\nnanoimage compress ./images --quality 75 --output ./compressed\n```\n\n개발자, 콘텐츠 팀, SEO 팀, 그리고 브라우저를 열지 않고 이미지를 최적화하고 싶은 사람들을 위한 도구입니다.\n\n## 왜 CLI를 만들었나요\n\n단일 이미지는 웹 도구가 편리합니다. 하지만 폴더 단위 최적화, WebP 변환, EXIF 제거, CI/CD 자동화에는 CLI가 더 잘 맞습니다.\n\n## 할 수 있는 작업\n\n### 이미지 압축\n\n```bash\nnanoimage compress photo.jpg --quality 75 --output ./compressed\n```\n\n### 이미지 크기 조정\n\n```bash\nnanoimage resize hero.jpg --width 1600 --output ./resized\n```\n\n### 포맷 변환\n\n```bash\nnanoimage convert logo.png --to jpg --background white --output ./converted\n```\n\n### WebP 변환\n\n```bash\nnanoimage webp hero.jpg --quality 80 --output ./webp\n```\n\n### EXIF 제거\n\n```bash\nnanoimage remove-exif photo.jpg --output ./clean\n```\n\n## 설치\n\n```bash\nnpm install -g nanoimage\n```\n\nNode.js 18 이상이 필요합니다.\n\n## 자동화\n\n```yaml\n- run: npm install -g nanoimage\n- run: nanoimage compress ./public/images --quality 75 --output ./public/images-optimized\n```\n\n## 시작하기\n\n문서：https://nanoimage.net/docs/cli\n\nCLI 페이지：https://nanoimage.net/cli",
      },
      fr: {
        category: "Actualités produit / Outils développeur",
        title: "Présentation de NanoImage CLI : optimisez vos images depuis le terminal",
        excerpt: "NanoImage CLI permet de compresser, redimensionner, convertir, générer du WebP et supprimer les métadonnées EXIF localement depuis la ligne de commande.",
        readTime: "7 min de lecture",
        metaDescription: "NanoImage CLI permet de compresser, redimensionner, convertir, générer du WebP et supprimer les métadonnées EXIF localement depuis la ligne de commande.",
        body: "Les images sont l’une des causes les plus fréquentes d’un site lent. Elles sont aussi l’une des choses les plus simples à optimiser.\n\nNanoImage a commencé comme une suite d’outils d’image dans le navigateur. NanoImage CLI apporte maintenant ces mêmes workflows pratiques au terminal.\n\n```bash\nnanoimage compress ./images --quality 75 --output ./compressed\n```\n\nL’outil s’adresse aux développeurs, équipes contenu, équipes SEO et à toutes les personnes qui veulent optimiser des images sans ouvrir de navigateur.\n\n## Pourquoi NanoImage CLI\n\nLes outils web sont parfaits pour une image unique. Mais certains workflows sont meilleurs en ligne de commande : optimiser un dossier, convertir en WebP, supprimer les EXIF ou automatiser en CI/CD.\n\n## Ce que vous pouvez faire\n\n### Compresser des images\n\n```bash\nnanoimage compress photo.jpg --quality 75 --output ./compressed\n```\n\n### Redimensionner\n\n```bash\nnanoimage resize hero.jpg --width 1600 --output ./resized\n```\n\n### Convertir les formats\n\n```bash\nnanoimage convert logo.png --to jpg --background white --output ./converted\n```\n\n### Convertir en WebP\n\n```bash\nnanoimage webp hero.jpg --quality 80 --output ./webp\n```\n\n### Supprimer les EXIF\n\n```bash\nnanoimage remove-exif photo.jpg --output ./clean\n```\n\n## Installation\n\n```bash\nnpm install -g nanoimage\n```\n\nNode.js 18 ou plus récent est requis.\n\n## Automatisation\n\n```yaml\n- run: npm install -g nanoimage\n- run: nanoimage compress ./public/images --quality 75 --output ./public/images-optimized\n```\n\n## Essayer NanoImage CLI\n\nDocumentation : https://nanoimage.net/docs/cli\n\nPage CLI : https://nanoimage.net/cli",
      },
      es: {
        category: "Actualizaciones / Herramientas para desarrolladores",
        title: "Presentamos NanoImage CLI: optimiza imágenes desde tu terminal",
        excerpt: "NanoImage CLI permite comprimir, redimensionar, convertir, crear WebP y eliminar metadatos EXIF localmente desde la línea de comandos.",
        readTime: "7 min de lectura",
        metaDescription: "NanoImage CLI permite comprimir, redimensionar, convertir, crear WebP y eliminar metadatos EXIF localmente desde la línea de comandos.",
        body: "Las imágenes son una de las formas más comunes de ralentizar un sitio web. También son una de las cosas más fáciles de optimizar.\n\nNanoImage comenzó como un conjunto de herramientas de imagen en el navegador. Ahora NanoImage CLI lleva esos flujos de trabajo prácticos al terminal.\n\n```bash\nnanoimage compress ./images --quality 75 --output ./compressed\n```\n\nEstá pensado para desarrolladores, equipos de contenido, SEO y cualquiera que quiera optimizar imágenes sin abrir el navegador.\n\n## Por qué creamos NanoImage CLI\n\nLa app web es ideal para una imagen. Pero optimizar carpetas, convertir a WebP, eliminar EXIF y automatizar en CI/CD funciona mejor desde la línea de comandos.\n\n## Qué puedes hacer\n\n### Comprimir imágenes\n\n```bash\nnanoimage compress photo.jpg --quality 75 --output ./compressed\n```\n\n### Redimensionar\n\n```bash\nnanoimage resize hero.jpg --width 1600 --output ./resized\n```\n\n### Convertir formatos\n\n```bash\nnanoimage convert logo.png --to jpg --background white --output ./converted\n```\n\n### Convertir a WebP\n\n```bash\nnanoimage webp hero.jpg --quality 80 --output ./webp\n```\n\n### Eliminar EXIF\n\n```bash\nnanoimage remove-exif photo.jpg --output ./clean\n```\n\n## Instalación\n\n```bash\nnpm install -g nanoimage\n```\n\nRequiere Node.js 18 o superior.\n\n## Automatización\n\n```yaml\n- run: npm install -g nanoimage\n- run: nanoimage compress ./public/images --quality 75 --output ./public/images-optimized\n```\n\n## Probar NanoImage CLI\n\nDocumentación: https://nanoimage.net/docs/cli\n\nPágina CLI: https://nanoimage.net/cli",
      },
      pt: {
        category: "Atualizações / Ferramentas para desenvolvedores",
        title: "Apresentando o NanoImage CLI: otimize imagens pelo terminal",
        excerpt: "NanoImage CLI permite comprimir, redimensionar, converter, gerar WebP e remover metadados EXIF localmente pela linha de comando.",
        readTime: "7 min de leitura",
        metaDescription: "NanoImage CLI permite comprimir, redimensionar, converter, gerar WebP e remover metadados EXIF localmente pela linha de comando.",
        body: "Imagens estão entre os motivos mais comuns para um site ficar lento. Também são uma das partes mais fáceis de otimizar.\n\nO NanoImage começou como um conjunto de ferramentas no navegador. Agora o NanoImage CLI leva esses fluxos práticos para o terminal.\n\n```bash\nnanoimage compress ./images --quality 75 --output ./compressed\n```\n\nEle foi feito para desenvolvedores, equipes de conteúdo, SEO e qualquer pessoa que queira otimizar imagens sem abrir o navegador.\n\n## Por que criamos o NanoImage CLI\n\nA versão web é ótima para uma imagem. Mas otimizar pastas, converter para WebP, remover EXIF e automatizar em CI/CD funciona melhor pela linha de comando.\n\n## O que você pode fazer\n\n### Comprimir imagens\n\n```bash\nnanoimage compress photo.jpg --quality 75 --output ./compressed\n```\n\n### Redimensionar\n\n```bash\nnanoimage resize hero.jpg --width 1600 --output ./resized\n```\n\n### Converter formatos\n\n```bash\nnanoimage convert logo.png --to jpg --background white --output ./converted\n```\n\n### Converter para WebP\n\n```bash\nnanoimage webp hero.jpg --quality 80 --output ./webp\n```\n\n### Remover EXIF\n\n```bash\nnanoimage remove-exif photo.jpg --output ./clean\n```\n\n## Instalação\n\n```bash\nnpm install -g nanoimage\n```\n\nRequer Node.js 18 ou superior.\n\n## Automação\n\n```yaml\n- run: npm install -g nanoimage\n- run: nanoimage compress ./public/images --quality 75 --output ./public/images-optimized\n```\n\n## Teste o NanoImage CLI\n\nDocumentação: https://nanoimage.net/docs/cli\n\nPágina CLI: https://nanoimage.net/cli",
      },
      ru: {
        category: "Обновления продукта / Инструменты разработчика",
        title: "Представляем NanoImage CLI: оптимизация изображений из терминала",
        excerpt: "NanoImage CLI позволяет локально сжимать, изменять размер, конвертировать изображения, создавать WebP и удалять EXIF-метаданные из командной строки.",
        readTime: "7 мин чтения",
        metaDescription: "NanoImage CLI позволяет локально сжимать, изменять размер, конвертировать изображения, создавать WebP и удалять EXIF-метаданные из командной строки.",
        body: "Изображения часто замедляют сайт. При этом их обычно легко оптимизировать.\n\nNanoImage начинался как набор браузерных инструментов. Теперь NanoImage CLI переносит те же практичные сценарии в терминал.\n\n```bash\nnanoimage compress ./images --quality 75 --output ./compressed\n```\n\nИнструмент подходит разработчикам, контент-командам, SEO-специалистам и всем, кто хочет оптимизировать изображения без браузера.\n\n## Зачем мы сделали NanoImage CLI\n\nВеб-инструменты удобны для одной картинки. Но папки изображений, WebP-конвертация, удаление EXIF и CI/CD лучше автоматизировать через CLI.\n\n## Что можно делать\n\n### Сжимать изображения\n\n```bash\nnanoimage compress photo.jpg --quality 75 --output ./compressed\n```\n\n### Менять размер\n\n```bash\nnanoimage resize hero.jpg --width 1600 --output ./resized\n```\n\n### Конвертировать форматы\n\n```bash\nnanoimage convert logo.png --to jpg --background white --output ./converted\n```\n\n### Конвертировать в WebP\n\n```bash\nnanoimage webp hero.jpg --quality 80 --output ./webp\n```\n\n### Удалять EXIF\n\n```bash\nnanoimage remove-exif photo.jpg --output ./clean\n```\n\n## Установка\n\n```bash\nnpm install -g nanoimage\n```\n\nТребуется Node.js 18 или новее.\n\n## Автоматизация\n\n```yaml\n- run: npm install -g nanoimage\n- run: nanoimage compress ./public/images --quality 75 --output ./public/images-optimized\n```\n\n## Попробовать NanoImage CLI\n\nДокументация: https://nanoimage.net/docs/cli\n\nСтраница CLI: https://nanoimage.net/cli",
      },
    },
  },
  {
    slug: 'nanoimage-vs-tinypng-vs-squoosh-vs-photopea',
    category: 'Comparison / Reviews',
    title: 'NanoImage vs TinyPNG vs Squoosh vs Photopea: Which Image Tool Is Right for You? (2026)',
    excerpt: `A hands-on, honest comparison of the four most-used free image tools on the web: NanoImage, TinyPNG, Squoosh, and Photopea — including where each one wins and loses.`,
    date: '2026-05-12',
    readTime: '10 min read',
    metaDescription: 'NanoImage vs TinyPNG vs Squoosh vs Photopea compared in 2026: uploads, privacy, compression quality, features, and the use cases each tool wins.',
    body: `# NanoImage vs TinyPNG vs Squoosh vs Photopea: Which Image Tool Is Right for You? (2026)

You need to compress one screenshot. Or resize a photo for Instagram. Or convert a PNG to JPG before emailing it.

This article is a serious comparison of the four tools we'd actually recommend in 2026: **NanoImage, TinyPNG, Squoosh, and Photopea**. We're going to be honest about where each one wins and where it loses — including the one we built ourselves.

**Disclosure**: NanoImage is our project. We've tried to be honest about its weaknesses too.

---

## TL;DR

- **Just need to compress without uploading?** → NanoImage or Squoosh
- **Need an API or WordPress plugin for production?** → TinyPNG
- **Need a full Photoshop replacement in a browser tab?** → Photopea
- **Want compress + resize + crop + convert + 11 other things, all client-side?** → NanoImage
- **Want absolute best compression with codec-level control?** → Squoosh

---

## The Comparison Matrix

| | **NanoImage** | **TinyPNG** | **Squoosh** | **Photopea** |
|---|:---:|:---:|:---:|:---:|
| Upload to server? | No | Yes | No | Optional |
| Account required? | No | Free tier limited | No | No |
| Works offline? | Yes | No | Yes | Partial |
| Number of tools | 15 | 1 | 1 | 50+ |
| Batch processing | Yes (up to 10) | Yes (20 at a time, free) | One at a time | Yes |
| Max file size | Browser RAM limit | 5 MB (free tier) | Browser RAM limit | Browser RAM limit |
| API available | Coming soon | Yes (paid) | No | Yes (paid) |
| Cost | Free forever | Freemium | Free | Free with ads / $5/mo |

---

## NanoImage: 15 Tools, All Running in Your Browser

**Best for**: Anyone who needs several small image tasks in one session, privacy-sensitive users, mobile users, developers who want to recommend a single link to non-technical teammates.

**Where NanoImage wins**:
1. **Coverage breadth.** TinyPNG and Squoosh both do one thing. NanoImage gives you all of them in one UI.
2. **Truly free, no asterisks.** No "first 500/month free" cliff. No watermark. No upsell. Everything runs in your browser.
3. **No upload latency.** A 5 MB photo compresses in ~200ms locally vs. several seconds round-trip.
4. **Privacy is real, not a promise.** Your file never goes to a server — verify via DevTools → Network tab.

**Where NanoImage loses**:
1. **No public API yet.** For server-side pipelines, TinyPNG is the right tool.
2. **Compression isn't quite as aggressive as TinyPNG's** (~10–15% larger files at equivalent quality).
3. **No codec-level control.** Squoosh lets you compare MozJPEG vs WebP vs AVIF side-by-side.
4. **No advanced editing.** No layers, no selection tools, no curves.

---

## TinyPNG: The Production-Grade Compression Workhorse

**Best for**: E-commerce sites with thousands of product images, WordPress sites, production pipelines needing a stable API.

**Where TinyPNG wins**:
1. **Compression quality is best-in-class** for photographic content.
2. **Mature ecosystem.** WordPress plugin, Photoshop plugin, Magento, Shopify, REST API.
3. **Reliable for batch operations.** 20 images at once in free UI; no upper limit via API.

**Where TinyPNG loses**:
1. **You upload everything.** Photos go to Tinify's servers in Amsterdam.
2. **5 MB file limit on free tier.** Modern phone cameras shoot 8–15 MB.
3. **It's one trick.** No resize, crop, convert, or watermark.
4. **Free tier is 500 images/month total.**

---

## Squoosh: The Codec Nerd's Compression Lab

**Best for**: Developers hand-optimizing a landing-page hero image; anyone wanting AVIF/JPEG XL output; tinkerers who enjoy fiddling with quantization.

**Where Squoosh wins**:
1. **Codec depth.** Nothing else gives you MozJPEG vs WebP vs AVIF side-by-side with sub-pixel diffs.
2. **100% client-side, open source** (Apache 2.0).
3. **AVIF and JPEG XL support.**

**Where Squoosh loses**:
1. **One image at a time.** No batch mode.
2. **One job.** No crop, watermark, or meme generator.
3. **Steep UX curve.** Non-developers bounce hard.
4. **Project appears to be in maintenance mode** (last major release: 2024).

---

## Photopea: A Photoshop Replacement in the Browser

**Best for**: Editing PSD files, multi-layer compositing, retouching, color grading, designers with Photoshop muscle memory.

**Where Photopea wins**:
1. **Feature parity with Photoshop is genuinely impressive.** 90% of Photoshop, in a browser.
2. **Opens almost any format.** AI, EPS, SVG, RAW, XCF.
3. **Free forever, ad-supported.** $5/month removes ads.

**Where Photopea loses**:
1. **It's a full editor, not a quick-task tool.** Loading takes 3–5 seconds.
2. **Dense UI.** Basically unusable on mobile.
3. **No batch processing for casual users** without JavaScript scripting.

---

## Decision Guide

| Scenario | Best Tool |
|---|---|
| Compress a screenshot for Slack | NanoImage or Squoosh |
| E-commerce with 5,000 photos in CI | TinyPNG API |
| Designer with a PSD to export | Photopea |
| Resize → crop → watermark in one session | NanoImage |
| Hand-optimize hero image, compare AVIF vs WebP | Squoosh |

---

## What About AI Image Tools?

We've deliberately left "AI image generators" off this list — they create or transform images using AI models. If you need to *do something with* an image you already have, every AI tool is overkill and most won't let you do basic things without uploading first.

---

[**Try NanoImage →**](https://nanoimage.net)

Read our deep-dive comparisons:
- [NanoImage vs TinyPNG](/blog/nanoimage-vs-tinypng/)
- [NanoImage vs Squoosh](/blog/nanoimage-vs-squoosh/)
- [NanoImage vs Photopea](/blog/nanoimage-vs-photopea/)`,
    localizations: {
      'zh-CN': {
        category: '工具对比',
        title: 'NanoImage vs TinyPNG vs Squoosh vs Photopea：哪款图片工具最适合你？（2026）',
        excerpt: '对四款最常用的免费图片工具进行深度对比，涵盖上传隐私、工具数量和各自适用场景。诚实评测，包括我们自己的产品。',
        readTime: '10 分钟阅读',
        metaDescription: '对四款最常用的免费图片工具进行深度对比，涵盖上传隐私、工具数量和各自适用场景。诚实评测，包括我们自己的产品。',
        body: `# NanoImage vs TinyPNG vs Squoosh vs Photopea：哪款图片工具最适合你？（2026）

你需要压缩一张截图，或者给 Instagram 调整图片尺寸，或者在发邮件前把 PNG 转成 JPG。

本文对 2026 年我们真正会推荐的四款工具进行认真对比：**NanoImage、TinyPNG、Squoosh 和 Photopea**。我们会坦诚地说明每款工具的优势和劣势，包括我们自己做的那款。

**利益披露**：NanoImage 是我们的产品。我们也尽量客观地指出了它的不足。

---

## 一句话总结

- **只需压缩、不想上传？** → NanoImage 或 Squoosh
- **需要 API 或 WordPress 插件用于生产环境？** → TinyPNG
- **需要浏览器版 Photoshop？** → Photopea
- **要在一个地方完成压缩 + 调整尺寸 + 裁剪 + 转格式 + 其他 11 件事？** → NanoImage
- **想在一张重要图片上做精细编解码控制？** → Squoosh

---

## 对比总表

| | **NanoImage** | **TinyPNG** | **Squoosh** | **Photopea** |
|---|:---:|:---:|:---:|:---:|
| 需要上传到服务器？ | 否 | 是 | 否 | 可选 |
| 需要注册账号？ | 否 | 免费版有限制 | 否 | 否 |
| 支持离线使用？ | 是 | 否 | 是 | 部分支持 |
| 工具数量 | 15 | 1 | 1 | 50+ |
| 批量处理 | 是（最多 10 张） | 是（免费版最多 20 张） | 逐张处理 | 是 |
| 免费版文件大小限制 | 浏览器内存上限 | 5MB | 浏览器内存上限 | 浏览器内存上限 |
| 提供 API？ | 即将推出 | 是（付费） | 否 | 是（付费） |
| 费用 | 永久免费 | Freemium | 免费 | 免费含广告 / $5/月无广告 |

---

## NanoImage：15 款工具，全在浏览器中运行

**适合人群**：需要在一次会话中完成多个图片任务的用户、注重隐私的用户（医疗、法律、NDA）、移动端用户、开发者。

**NanoImage 的优势**：
1. **工具覆盖广**。TinyPNG 和 Squoosh 只做一件事，NanoImage 把所有常见操作整合在一个 UI 里。
2. **真免费，没有附加条件**。没有"每月 500 张免费"上限，没有水印，没有未来会上线的付费版。
3. **无上传延迟**。5MB 图片本地约 200ms 处理完，而上传服务往往需要数秒。
4. **隐私不是承诺，是可验证的**。打开 DevTools → Network，压缩时没有任何网络请求。

**NanoImage 的劣势**：
1. **暂无公开 API**。服务器端流水线应用 TinyPNG 更合适。
2. **压缩率略低于 TinyPNG**，同等质量下文件约大 10-15%。
3. **无编解码控制**。Squoosh 支持 MozJPEG / WebP / AVIF 并排对比。
4. **无高级编辑功能**。没有图层、选区、曲线。

---

## TinyPNG：生产级压缩利器

**适合**：有大量产品图需要优化的电商、WordPress 站点、需要 API 的生产流水线。

**TinyPNG 的优势**：压缩质量行业顶尖、生态成熟（WordPress/Photoshop 插件）、批量稳定可靠。

**TinyPNG 的劣势**：每次都需上传图片、免费版 5MB 上限、只有压缩一个功能、每月 500 张上限。

---

## Squoosh：编解码控制的专业工具

**适合**：开发者优化重要图片（落地页主图），需要 AVIF/JPEG XL 输出，喜欢深入调节量化参数的用户。

**Squoosh 的优势**：无与伦比的编解码对比深度、100% 客户端开源（Apache 2.0）、支持 AVIF 和 JPEG XL。

**Squoosh 的劣势**：每次只能处理一张图、功能仅限压缩/格式转换、UI 曲线陡峭、项目似乎处于维护模式（最近一次重大更新：2024 年）。

---

## Photopea：浏览器里的 Photoshop

**适合**：打开 PSD 文件、多图层合成、修图、调色、有 Photoshop 使用习惯的设计师。

**Photopea 的优势**：Photoshop 功能复刻程度惊人（约 90%）、支持几乎所有格式（AI、EPS、SVG、RAW、XCF）、永久免费含广告（$5/月去广告）。

**Photopea 的劣势**：加载需要 3-5 秒、界面在移动端基本无法使用、普通用户批量处理需要编写脚本。

---

## 选择指南

| 场景 | 推荐工具 |
|---|---|
| 压缩截图后粘贴到 Slack | NanoImage 或 Squoosh |
| 5000 张产品图在 CI 中优化 | TinyPNG API |
| 设计师需要导出 PSD 中的切图 | Photopea |
| 调整尺寸 → 裁剪 → 加水印一次完成 | NanoImage |
| 精细对比 AVIF vs WebP 编码效果 | Squoosh |

---

[**立即使用 NanoImage →**](https://nanoimage.net)

深度对比文章：
- [NanoImage vs TinyPNG](/blog/nanoimage-vs-tinypng/)
- [NanoImage vs Squoosh](/blog/nanoimage-vs-squoosh/)
- [NanoImage vs Photopea](/blog/nanoimage-vs-photopea/)`,
      },
      'zh-TW': {
        category: '工具對比',
        title: 'NanoImage vs TinyPNG vs Squoosh vs Photopea：哪款圖片工具最適合你？（2026）',
        excerpt: '對四款最常用的免費圖片工具進行深度對比，涵蓋上傳隱私、工具數量和各自適用場景。',
      },
      ja: {
        category: '比較レビュー',
        title: 'NanoImage vs TinyPNG vs Squoosh vs Photopea：あなたに合った画像ツールは？（2026）',
        excerpt: '2026年の無料画像ツール4選を徹底比較。プライバシー、機能数、圧縮品質を正直に評価。',
      },
      ko: {
        category: '비교 리뷰',
        title: 'NanoImage vs TinyPNG vs Squoosh vs Photopea: 어떤 이미지 툴이 맞을까? (2026)',
        excerpt: '2026년 무료 이미지 툴 4가지 심층 비교. 업로드 여부, 개인정보 보호, 기능 수를 솔직하게 평가합니다.',
      },
      fr: {
        category: 'Comparaisons',
        title: `NanoImage vs TinyPNG vs Squoosh vs Photopea : quel outil choisir en 2026 ?`,
        excerpt: `Comparaison honnête des quatre outils d'image gratuits les plus utilisés en 2026 : téléversement, confidentialité, qualité de compression et cas d'usage.`,
      },
      es: {
        category: 'Comparativas',
        title: `NanoImage vs TinyPNG vs Squoosh vs Photopea: ¿cuál elegir en 2026?`,
        excerpt: `Comparativa honesta de las cuatro herramientas de imagen gratuitas más usadas en 2026: privacidad, calidad de compresión y casos de uso.`,
      },
      pt: {
        category: 'Comparativos',
        title: `NanoImage vs TinyPNG vs Squoosh vs Photopea: qual escolher em 2026?`,
        excerpt: `Comparação honesta das quatro ferramentas de imagem gratuitas mais usadas em 2026: privacidade, qualidade de compressão e casos de uso.`,
      },
      ru: {
        category: 'Сравнения',
        title: `NanoImage vs TinyPNG vs Squoosh vs Photopea: какой инструмент выбрать в 2026?`,
        excerpt: `Честное сравнение четырёх популярных бесплатных инструментов для работы с изображениями в 2026: приватность, качество сжатия, набор функций.`,
      },
    },
  },
  {
    slug: 'nanoimage-vs-tinypng',
    category: 'Comparison / Reviews',
    title: 'NanoImage vs TinyPNG: Free Image Compressor Compared (2026)',
    excerpt: `TinyPNG uploads your images to a server. NanoImage doesn't. Here's a head-to-head on speed, quality, privacy, and when each one is the right choice.`,
    date: '2026-05-13',
    readTime: '8 min read',
    metaDescription: 'NanoImage vs TinyPNG compared in 2026: server-side vs browser-based compression, speed, privacy, file size limits, and feature coverage.',
    body: `# NanoImage vs TinyPNG: Free Image Compressor Compared (2026)

If you've compressed an image online in the last decade, you've probably used TinyPNG. The cute panda logo, the drag-and-drop UI, the "we saved 73%" line — it's the default. There's a reason: TinyPNG genuinely produces excellent results.

But there's one thing TinyPNG does that you might not have thought about: it uploads your image. To a server. In Amsterdam. Every single time.

**Disclosure**: NanoImage is our project. We've tried to be fair to TinyPNG — they make a great product.

---

## Quick Comparison

| | **NanoImage** | **TinyPNG** |
|---|:---:|:---:|
| Where does compression happen? | In your browser (Canvas API) | On TinyPNG's servers |
| Upload required? | No | Yes |
| Free tier limit | Unlimited | 500 images/month, 5 MB each |
| Compression quality | Good | Excellent (best-in-class) |
| Speed on a 5 MB photo | ~200ms locally | 2–5 seconds (upload + process + download) |
| Works offline | Yes | No |
| Tools beyond compression | 14 more (resize, crop, convert, …) | None |
| API for production | Coming soon | Yes, mature ($0.009/image after 500/month) |
| Privacy promise | Files never leave your device (verifiable) | Files deleted after processing (trust-based) |

---

## The Compression Quality Question

TinyPNG's Tinify engine has had over a decade of tuning. On our test corpus:

- **PNG screenshots with text**: TinyPNG averaged 71% reduction; NanoImage averaged 58%.
- **JPG photographs**: TinyPNG averaged 64% reduction; NanoImage averaged 59%.
- **PNG logos with transparency**: TinyPNG averaged 78% reduction; NanoImage averaged 64%.

If pure compression ratio is what you optimize for, TinyPNG wins. But ask yourself: how much does that 10–15% extra savings matter for your actual job?

---

## The Privacy Question

When you drop an image on TinyPNG, your browser uploads it to Tinify's servers. Tinify has a clean privacy policy and is GDPR-compliant. But there are situations where any upload is the wrong answer:

- **Healthcare**: Medical images may be regulated under HIPAA or GDPR Article 9.
- **Legal**: Documents or evidence photos subject to legal hold.
- **Corporate**: Mockups of unreleased products, anything under NDA.
- **Personal**: Photos of kids, your home, or your face.

NanoImage handles all of these: nothing is uploaded. Process by JavaScript in your browser via the Canvas API. Verify via DevTools → Network tab (it stays empty).

---

## The Speed Question

| File | TinyPNG (Wi-Fi 200 Mbps) | TinyPNG (4G ~25 Mbps) | NanoImage (any connection) |
|---|---|---|---|
| 500 KB screenshot | 1.4s | 2.1s | 80ms |
| 3 MB photo | 2.3s | 5.6s | 180ms |
| 8 MB photo | N/A (exceeds 5 MB cap) | N/A | 320ms |

On a flaky connection, TinyPNG can take 30 seconds or fail. NanoImage is unaffected.

---

## The Feature Coverage Question

TinyPNG does one thing: compress JPG, PNG, and WebP files. NanoImage does 15: Compress, Compress to 100KB, Resize, Crop, Rotate, Flip, Invert, Black & White, Blur, Add Border, Add Watermark, Convert to JPG, Meme Generator, Split Image, Merge Images.

Real image jobs are usually multi-step. With NanoImage you can complete an entire workflow — resize → compress → watermark — in one tab, without bouncing between tools.

---

## The API & Production-Pipeline Question

Here NanoImage loses, period. TinyPNG's Tinify API is mature, well-documented, and has been powering production image pipelines for over a decade. If you're building an e-commerce site or CI job, use TinyPNG.

---

## When to Use TinyPNG

- Optimizing a large catalog of photos (hundreds or thousands)
- Integrating compression into a production pipeline (WordPress, CI/CD, server-side)
- Images are not sensitive and you don't care about uploads

## When to Use NanoImage

- You need to do more than compress (resize, crop, convert, watermark)
- The image shouldn't leave your device (medical, legal, NDA, personal)
- On a slow or flaky connection
- File exceeds TinyPNG's 5 MB free tier
- You hit TinyPNG's monthly limit and don't want to pay

---

## The Honest Verdict

If you compress images occasionally and don't care about uploads, **TinyPNG is fine**. The panda has earned its reputation.

If you compress images often, do other things to images, or care about your photos not leaving your device, **NanoImage is built for you**. TinyPNG is a precision saw. NanoImage is a Swiss Army knife.

[**Try NanoImage →**](https://nanoimage.net) | [Read the full 4-way comparison →](/blog/nanoimage-vs-tinypng-vs-squoosh-vs-photopea/)`,
    localizations: {
      'zh-CN': {
        category: '工具对比',
        title: 'NanoImage vs TinyPNG：免费图片压缩工具对比（2026）',
        excerpt: 'TinyPNG 会将你的图片上传到服务器，NanoImage 不会。本文从速度、质量、隐私三个维度进行详细对比，帮你选择合适的工具。',
        readTime: '8 分钟阅读',
        metaDescription: 'TinyPNG 会将你的图片上传到服务器，NanoImage 不会。本文从速度、质量、隐私三个维度进行详细对比，帮你选择合适的工具。',
        body: `# NanoImage vs TinyPNG：免费图片压缩工具对比（2026）

如果你在过去十年里压缩过图片，大概率用过 TinyPNG。可爱的熊猫 logo、拖放上传界面、"节省了 73%"的提示——这几乎是行业默认选项。TinyPNG 的确能生产出出色的压缩结果。

但有一件事你可能没太在意：TinyPNG 会上传你的图片，传到阿姆斯特丹的服务器，每次都如此。

对大多数人来说，这没问题。对某些人来说，这是个问题。本文帮你搞清楚你属于哪种情况。

**利益披露**：NanoImage 是我们的产品，但我们尽量公平对待 TinyPNG——他们做的是好产品。

---

## 快速对比

| | **NanoImage** | **TinyPNG** |
|---|:---:|:---:|
| 压缩在哪里发生？ | 浏览器内（Canvas API） | TinyPNG 服务器 |
| 是否需要上传？ | 否 | 是 |
| 免费限制 | 无限制 | 每月 500 张，单文件 5MB |
| 压缩质量 | 良好 | 优秀（行业顶尖） |
| 5MB 图片处理速度 | 本地约 200ms | 2–5 秒（上传+处理+下载） |
| 离线可用 | 是 | 否 |
| 额外功能 | 还有 14 种（调整尺寸、裁剪、转格式……） | 无 |
| 生产环境 API | 即将推出 | 是，成熟（超出 500 张后约 $0.009/张） |
| 隐私保障 | 文件不离开设备（可验证） | 处理后删除（需信任对方） |

---

## 压缩质量

TinyPNG 的 Tinify 引擎经过十余年调优。我们的测试结果：

- **含文字的 PNG 截图**：TinyPNG 平均压缩 71%；NanoImage 平均 58%。
- **手机拍摄的 JPG 照片**：TinyPNG 64%；NanoImage 59%。
- **带透明度的 PNG 图标**：TinyPNG 78%；NanoImage 64%。

压缩率上 TinyPNG 确实更好。但关键问题是：这 10-15% 的差距对你实际的使用场景重要吗？

---

## 隐私问题

当你把图片拖到 TinyPNG 时，浏览器会将图片上传到 Tinify 的服务器，然后发送回压缩结果。Tinify 的隐私政策很干净，符合 GDPR，我们没有理由不信任他们。但有些情况下，任何上传都不可接受：

- **医疗**：医疗图像可能受 HIPAA 或 GDPR 第 9 条约束，向未签署 BAA 的第三方上传可能构成违规。
- **法律**：证据照片或可能被诉讼留存的文件。
- **企业保密**：未发布产品的设计稿、任何保密协议覆盖的内容。
- **个人隐私**：有人就是不希望孩子、家庭或自己的照片经过任何服务器。

NanoImage 处理所有这些情况：文件不会离开设备。通过 DevTools → Network 标签可以验证，压缩过程中没有任何网络请求。

---

## 速度

| 文件 | TinyPNG（Wi-Fi 200Mbps） | TinyPNG（4G ~25Mbps） | NanoImage（任意网络） |
|---|---|---|---|
| 500KB 截图 | 1.4秒 | 2.1秒 | 80ms |
| 3MB 照片 | 2.3秒 | 5.6秒 | 180ms |
| 8MB 照片 | 超过免费限制，不可用 | — | 320ms |

在网络不稳定的场合（咖啡厅、飞机、会议室），TinyPNG 可能需要 30 秒甚至失败，NanoImage 完全不受影响。

---

## 功能覆盖

TinyPNG 只做一件事：压缩 JPG、PNG 和 WebP。NanoImage 做 15 件事：压缩、压缩到 100KB、调整尺寸、裁剪、旋转、翻转、反色、黑白、模糊、添加边框、添加水印、转为 JPG、表情包生成器、分割图片、合并图片。

实际的图片处理任务通常是多步的。在 NanoImage 里，整个流程可以在一个标签页完成。

---

## 什么时候用 TinyPNG

- 优化大量产品图片（数百或数千张）
- 需要接入生产流水线（WordPress、CI/CD）
- 图片内容不敏感，上传没有问题

## 什么时候用 NanoImage

- 不仅仅需要压缩（还要调整尺寸、裁剪、转格式、加水印）
- 图片不能离开设备（医疗、法律、保密、个人）
- 网络不稳定
- 文件超过 TinyPNG 5MB 免费上限
- 已到达每月 500 张上限，不想付费

---

## 结论

如果你偶尔压缩图片，且不介意上传，**TinyPNG 是很好的选择**。熊猫有它应得的声誉。

如果你经常处理图片，或需要多种操作，或不希望图片离开设备，**NanoImage 就是为你打造的**。TinyPNG 是一把精准锯，NanoImage 是一把瑞士军刀。

[**立即使用 NanoImage →**](https://nanoimage.net) | [查看四款工具完整对比 →](/blog/nanoimage-vs-tinypng-vs-squoosh-vs-photopea/)`,
      },
      'zh-TW': {
        category: '工具對比',
        title: 'NanoImage vs TinyPNG：免費圖片壓縮工具對比（2026）',
        excerpt: 'TinyPNG 需要上傳圖片，NanoImage 不需要。從速度、品質、隱私三個維度進行詳細對比。',
      },
      ja: {
        category: '比較レビュー',
        title: 'NanoImage vs TinyPNG: 無料画像圧縮ツール比較（2026）',
        excerpt: 'TinyPNG は画像をサーバーにアップロードします。NanoImage はしません。速度・品質・プライバシーを徹底比較。',
      },
      ko: {
        category: '비교 리뷰',
        title: 'NanoImage vs TinyPNG: 무료 이미지 압축 툴 비교 (2026)',
        excerpt: 'TinyPNG는 이미지를 서버에 업로드합니다. NanoImage는 그렇지 않습니다. 속도, 품질, 개인정보 보호를 비교합니다.',
      },
      fr: {
        category: 'Comparaisons',
        title: `NanoImage vs TinyPNG : comparaison des compresseurs d'images gratuits (2026)`,
        excerpt: `TinyPNG envoie vos images sur un serveur. NanoImage non. Comparaison vitesse, qualité et confidentialité.`,
      },
      es: {
        category: 'Comparativas',
        title: `NanoImage vs TinyPNG: comparativa de compresores de imagen gratuitos (2026)`,
        excerpt: `TinyPNG sube tus imágenes a un servidor. NanoImage no. Comparativa de velocidad, calidad y privacidad.`,
      },
      pt: {
        category: 'Comparativos',
        title: `NanoImage vs TinyPNG: comparativo de compressores de imagem gratuitos (2026)`,
        excerpt: `TinyPNG envia suas imagens para um servidor. NanoImage não. Comparação de velocidade, qualidade e privacidade.`,
      },
      ru: {
        category: 'Сравнения',
        title: `NanoImage vs TinyPNG: сравнение бесплатных инструментов сжатия изображений (2026)`,
        excerpt: `TinyPNG загружает ваши изображения на сервер. NanoImage — нет. Сравнение скорости, качества и приватности.`,
      },
    },
  },
  {
    slug: 'nanoimage-vs-squoosh',
    category: 'Comparison / Reviews',
    title: 'NanoImage vs Squoosh: Browser-Based Image Compression Compared (2026)',
    excerpt: `Both run 100% in your browser and respect your privacy. But they're built for different jobs. Here's when to use Squoosh and when to use NanoImage.`,
    date: '2026-05-14',
    readTime: '7 min read',
    metaDescription: 'NanoImage vs Squoosh in 2026: both client-side and privacy-respecting, but one is a codec lab and the other is a 15-tool everyday suite.',
    body: `# NanoImage vs Squoosh: Browser-Based Image Compression Compared (2026)

Squoosh is one of our favorite tools. It's open source, built by the Google Chrome team, runs 100% in your browser, and has the deepest codec-comparison UI on the web.

So this comparison is a little different. There, the dividing line was philosophical (server vs. client). Here, Squoosh and NanoImage agree on the philosophy — both keep your files on your device. The differences are about *scope* and *audience*.

**Disclosure**: NanoImage is our project. We use Squoosh ourselves for codec optimization work.

---

## TL;DR

- **Squoosh** is a precision lab for compressing one image at a time with deep codec control. Right tool for hand-optimizing your landing-page hero image.
- **NanoImage** is a 15-tool everyday suite. Right tool when you just need to compress, resize, crop, or convert without thinking too hard.
- Use both. They serve different needs.

---

## Quick Comparison

| | **NanoImage** | **Squoosh** |
|---|:---:|:---:|
| Where does compression happen? | Your browser (Canvas API) | Your browser (WASM codecs) |
| Upload required? | No | No |
| Works offline? | Yes | Yes (PWA) |
| Open source? | Partial | Yes (Apache 2.0) |
| Number of tools | 15 | 1 (compression with codec choice) |
| Codecs supported | JPEG, PNG, WebP (Canvas API defaults) | MozJPEG, WebP, AVIF, JPEG XL, OxiPNG |
| Side-by-side codec comparison | No | Yes (signature feature) |
| Batch processing | Yes (up to 10) | No (one image at a time) |
| Crop, Watermark, Meme, Split, Merge | Yes | No |
| Project status | Active development | Maintenance mode (last major release: 2024) |

---

## Where Squoosh Wins

### 1. Codec-level control is unmatched

Squoosh's dual-pane comparison view lets you pick a codec for each pane, adjust quality sliders, and see exactly what each codec produces — file size, visual quality, at the same quality setting and at equivalent file sizes.

If you're optimizing a landing-page hero image that gets 100,000 views a month, the difference between MozJPEG @ 80% and AVIF @ 60% can matter for bandwidth costs and Core Web Vitals.

### 2. Modern codec support

Squoosh ships AVIF and JPEG XL encoders compiled to WebAssembly. Browser-based tools using only Canvas API (NanoImage included) can't produce these formats today.

### 3. Open source and auditable

Full source code on GitHub under Apache 2.0. Self-hostable. Verifiable provenance.

### 4. Built by the Chrome team

Squoosh demonstrates best practices in client-side image processing. The credibility carries weight for enterprise recommendations.

---

## Where Squoosh Loses

### 1. One image at a time

No batch mode. For 30 product photos you need to resize for an Etsy shop, it's an afternoon of repetitive work.

NanoImage accepts up to 10 images at once and processes them in parallel.

### 2. Compression-only feature scope

Squoosh does one job: compress (with format conversion and resize as side effects). No crop, watermark, meme, merge, or filters.

### 3. The UX assumes you understand codecs

Terms like "MozJPEG," "advanced options," and "quantization" are friction for non-developers. Many users bounce after 30 seconds.

NanoImage's UX is deliberately the opposite: pick a tool, drop a file, get a result.

### 4. Project appears to be in maintenance mode

Squoosh hasn't had a major feature release in over a year. NanoImage is in active development; we ship updates every few weeks.

---

## When to Use Squoosh

- Hand-optimizing one important image (landing-page hero, OG card)
- You specifically need AVIF or JPEG XL output
- You want a fully open-source, auditable tool
- You enjoy fiddling with codec settings

## When to Use NanoImage

- You need to do more than compression
- You have multiple images to process (batch)
- You're not a codec expert and want sensible defaults
- You're sharing the link with a non-technical colleague

---

## The Philosophy They Share

Both Squoosh and NanoImage are 100% client-side. Both keep your files on your device. Both are free. Both work offline. Neither asks for an account, email, or credit card.

---

## The Honest Verdict

If you're a developer who wants deep codec control for a small number of important files, **Squoosh is the gold standard**.

If you want one tool that handles everyday image jobs without making you think about codecs, **NanoImage is built for that**.

Squoosh is the lab; NanoImage is the workshop.

[**Try NanoImage →**](https://nanoimage.net) | [Read the full 4-way comparison →](/blog/nanoimage-vs-tinypng-vs-squoosh-vs-photopea/)`,
    localizations: {
      'zh-CN': {
        category: '工具对比',
        title: 'NanoImage vs Squoosh：浏览器端图片压缩工具对比（2026）',
        excerpt: '两款工具都在浏览器本地运行，都尊重隐私。但它们为不同的使用场景而生——这里是选择指南。',
        readTime: '7 分钟阅读',
        metaDescription: '两款工具都在浏览器本地运行，都尊重隐私。但它们为不同的使用场景而生——这里是选择指南。',
        body: `# NanoImage vs Squoosh：浏览器端图片压缩工具对比（2026）

Squoosh 是我们最喜欢的工具之一。它开源，由 Google Chrome 团队打造，100% 在浏览器中运行，并且拥有网络上最深度的编解码对比 UI。NanoImage 在构建时，就将 Squoosh 视为"浏览器图片工具应有样子"的参考。

所以这次对比会有些不同。与 TinyPNG 的分歧在于哲学（服务器 vs. 客户端），这里 Squoosh 和 NanoImage 在哲学上是一致的——两者都把文件留在你的设备上。差异在于**范围**和**受众**。

**利益披露**：NanoImage 是我们的产品。我们自己在编解码优化工作中也会使用 Squoosh。

---

## 一句话总结

- **Squoosh** 是精密实验室，适合对单张图片做深度编解码控制。
- **NanoImage** 是 15 工具的日常套件，适合不想花太多时间、只需要压缩/调整尺寸/裁剪/转格式的场景。
- 两者都值得收藏，它们服务于不同需求。

---

## 快速对比

| | **NanoImage** | **Squoosh** |
|---|:---:|:---:|
| 压缩在哪里发生？ | 浏览器（Canvas API） | 浏览器（WebAssembly 编解码器） |
| 需要上传？ | 否 | 否 |
| 支持离线？ | 是 | 是（PWA） |
| 开源？ | 部分 | 是（Apache 2.0） |
| 工具数量 | 15 | 1（带编解码选项的压缩） |
| 支持的编解码器 | JPEG、PNG、WebP（Canvas API 默认） | MozJPEG、WebP、AVIF、JPEG XL、OxiPNG |
| 编解码并排对比 | 否 | 是（核心特性） |
| 批量处理 | 是（最多 10 张） | 否（逐张处理） |
| 裁剪、水印、表情包、分割、合并 | 是 | 否 |
| 项目状态 | 活跃开发中 | 维护模式（最近重大更新：2024 年） |

---

## Squoosh 的优势

### 1. 无与伦比的编解码控制

Squoosh 的双窗格对比视图是杀手锏。左右各选一种编解码器，分别调整质量滑块，实时看到文件大小和视觉质量的差异。

如果你要优化一个每月 10 万次访问的落地页主图，MozJPEG 80% 和 AVIF 60% 的差距对带宽成本和 Core Web Vitals 都有实际影响。

### 2. 支持新一代编解码格式

Squoosh 内置 WebAssembly 编译的 AVIF 和 JPEG XL 编码器。仅依赖 Canvas API 的工具（包括 NanoImage）目前无法生成这些格式。

### 3. 开源且可审计

完整源码在 GitHub，Apache 2.0 协议。可以自托管，可以审查代码。

### 4. Chrome 团队背书

在企业内部推荐工具时，Chrome 团队构建的项目具有额外的公信力。

---

## Squoosh 的劣势

### 1. 每次只能处理一张图

没有批量模式。30 张 Etsy 产品图逐张处理，需要整个下午。

### 2. 功能仅限压缩

不支持裁剪、水印、表情包生成、图片合并、滤镜。

### 3. UI 曲线陡峭

"MozJPEG"、"高级选项"、"量化"这些术语对非开发者来说是摩擦点，很多用户 30 秒内就离开了。

### 4. 项目处于维护模式

Squoosh 已超过一年没有重大功能更新。NanoImage 在持续开发中，每隔几周就会发布更新。

---

## 何时用 Squoosh

- 手动优化一张重要图片（落地页主图、OG 卡片）
- 需要 AVIF 或 JPEG XL 输出
- 需要完全开源、可审计的工具
- 喜欢深入研究编解码参数

## 何时用 NanoImage

- 需要的不仅仅是压缩（调整尺寸、裁剪、转格式、加水印等）
- 有多张图片需要处理（批量操作）
- 不是编解码专家，想要合理的默认设置
- 需要推荐给不懂技术的同事

---

## 两者共同的理念

Squoosh 和 NanoImage 都是 100% 客户端运行，文件都不会离开设备，都免费，都支持离线，都不需要账号、邮箱或信用卡。

在图片工具的默认选项是"上传文件，相信我们"的世界里，这一共同理念比两者之间的差异更重要。

---

## 结论

如果你是开发者，想对少量重要图片做深度编解码控制，**Squoosh 是金标准**。

如果你想要一个处理日常图片任务、不需要考虑编解码的工具，**NanoImage 为此而生**。

Squoosh 是实验室，NanoImage 是工作台。两者都值得收藏。

[**立即使用 NanoImage →**](https://nanoimage.net) | [查看四款工具完整对比 →](/blog/nanoimage-vs-tinypng-vs-squoosh-vs-photopea/)`,
      },
      'zh-TW': {
        category: '工具對比',
        title: 'NanoImage vs Squoosh：瀏覽器端圖片壓縮工具對比（2026）',
        excerpt: '兩款工具都在瀏覽器本地運行，都尊重隱私。但它們為不同的使用場景而生。',
      },
      ja: {
        category: '比較レビュー',
        title: 'NanoImage vs Squoosh: ブラウザベース画像圧縮ツール比較（2026）',
        excerpt: '両方100%ブラウザで動作しプライバシーを守ります。ただし用途が異なります。使い分けガイド。',
      },
      ko: {
        category: '비교 리뷰',
        title: 'NanoImage vs Squoosh: 브라우저 기반 이미지 압축 툴 비교 (2026)',
        excerpt: '두 툴 모두 100% 브라우저에서 실행되며 개인정보를 보호합니다. 하지만 다른 목적을 위해 만들어졌습니다.',
      },
      fr: {
        category: 'Comparaisons',
        title: `NanoImage vs Squoosh : comparaison des outils de compression dans le navigateur (2026)`,
        excerpt: `Les deux fonctionnent 100% dans votre navigateur et respectent votre vie privée. Mais ils servent des besoins différents.`,
      },
      es: {
        category: 'Comparativas',
        title: `NanoImage vs Squoosh: comparativa de compresores de imagen en el navegador (2026)`,
        excerpt: `Ambos funcionan al 100% en tu navegador y respetan tu privacidad. Pero están diseñados para casos de uso diferentes.`,
      },
      pt: {
        category: 'Comparativos',
        title: `NanoImage vs Squoosh: comparativo de compressores de imagem no navegador (2026)`,
        excerpt: `Ambos funcionam 100% no navegador e respeitam sua privacidade. Mas são feitos para usos diferentes.`,
      },
      ru: {
        category: 'Сравнения',
        title: `NanoImage vs Squoosh: сравнение браузерных инструментов сжатия изображений (2026)`,
        excerpt: `Оба работают 100% в браузере и уважают вашу приватность. Но предназначены для разных задач.`,
      },
    },
  },
  {
    slug: 'nanoimage-vs-photopea',
    category: 'Comparison / Reviews',
    title: 'NanoImage vs Photopea: Quick Tools vs Full Editor (2026)',
    excerpt: `Photopea is a Photoshop replacement in your browser. NanoImage is a 15-tool quick-task suite. They're solving completely different problems — here's how to pick.`,
    date: '2026-05-15',
    readTime: '7 min read',
    metaDescription: 'NanoImage vs Photopea in 2026: when to use a quick image utility suite vs a full browser-based Photoshop replacement.',
    body: `# NanoImage vs Photopea: Quick Tools vs Full Editor (2026)

This comparison is a little unusual. Most "tool A vs tool B" articles are about products that compete for the same user with the same need. NanoImage and Photopea don't, really. Photopea is a Photoshop replacement. NanoImage is a set of fifteen small utilities.

But people genuinely ask "should I use Photopea or NanoImage?" — usually because they're not sure which one fits the job. This article is a decision guide.

**Disclosure**: NanoImage is our project. We respect what Photopea has built.

---

## TL;DR

- If you need to **edit** an image (paint, mask, retouch, layers, open a PSD): **Photopea**
- If you need to **transform** an image (compress, resize, crop, convert, watermark): **NanoImage**
- These are different verbs. Pick the tool that matches the verb.

---

## What Each Tool Actually Is

### Photopea

A browser-based clone of Adobe Photoshop. Opens PSD, AI, EPS, SVG, RAW, XCF. Has layers, masks, brushes, paths, channels, pen tool, healing tools, curves, smart objects. Free with ads; $5/month removes them.

Built and maintained by one developer (Ivan Kuckir) since 2013. Learning curve: roughly the same as Photoshop's.

### NanoImage

Fifteen single-purpose image tools, all running on the Canvas API. Each tool does one thing in 1–3 clicks. No layer panel, no brush tool.

The 15 tools: Compress, Compress to 100KB, Resize, Crop, Rotate, Flip, Invert, Black & White, Blur, Add Border, Add Watermark, Convert to JPG, Meme Generator, Split Image, Merge Images.

---

## Quick Comparison

| | **NanoImage** | **Photopea** |
|---|:---:|:---:|
| Category | Transform / utility | Full editor |
| Time to first result | ~5 seconds | 1–3 minutes |
| Learning curve | Negligible | Steep (Photoshop-level) |
| Layers, masks, brushes | No | Yes |
| PSD support | No | Yes (excellent) |
| Batch processing | Yes (up to 10) | Yes (via Actions, requires scripting) |
| Mobile usable? | Yes | Awkward |
| Free tier | Unlimited, no ads | With ads / $5/mo no ads |
| Files stay on device? | Yes | Yes |

---

## The Decision Tree

**Use Photopea when**:
- You need to open a PSD
- You need pixel editing — retouch, paint, mask, healing
- Multi-layer compositing
- Selection tools (magic wand, lasso, pen)
- Color grading — curves, levels, color balance
- The job would take 5–30 minutes in Photoshop

**Use NanoImage when**:
- You need to compress, resize, crop, or convert
- Add a watermark or border
- Make a meme
- Rotate, flip, or invert
- Batch any of the above across multiple files
- The job would take less than a minute

---

## The Test: How Long Would This Take?

| Task | Photopea | NanoImage |
|---|---|---|
| Compress one screenshot for Slack | 30s | 5s |
| Convert PNG to JPG | 30s | 5s |
| Resize for Instagram | 45s | 10s |
| Crop to 16:9 | 30s | 10s |
| Add watermark to 10 images | 5–15min | 2min (batch) |
| Remove a person from a photo | 1–5min | Not possible |
| Open a PSD and export one layer | 1min | Not possible |

The pattern: below 1 minute of work → NanoImage is 5–10x faster. 5+ minutes of editing → Photopea is the only choice.

---

## The Honest Verdict

If you do real photo editing — retouching, compositing, PSD files — **Photopea is one of the best free tools on the web**.

If you do everyday image utility work — compressing for email, resizing for social, converting formats — **NanoImage is built for that exact category**.

Photopea is what you reach for when you sit down to *make something*. NanoImage is what you reach for when you need to *do a small thing quickly and get back to what you were doing*.

[**Try NanoImage →**](https://nanoimage.net) | [Read the full 4-way comparison →](/blog/nanoimage-vs-tinypng-vs-squoosh-vs-photopea/)`,
    localizations: {
      'zh-CN': {
        category: '工具对比',
        title: 'NanoImage vs Photopea：快速工具 vs 完整编辑器（2026）',
        excerpt: 'Photopea 是浏览器端的 Photoshop 替代品，NanoImage 是 15 个小工具的集合。它们解决的是完全不同的问题——这里是选择指南。',
        readTime: '7 分钟阅读',
        metaDescription: 'Photopea 是浏览器端的 Photoshop 替代品，NanoImage 是 15 个小工具的集合。它们解决的是完全不同的问题——这里是选择指南。',
        body: `# NanoImage vs Photopea：快速工具 vs 完整编辑器（2026）

这次对比有些特别。大多数"工具 A vs 工具 B"的文章，比较的是争夺同一用户、解决同一需求的产品。NanoImage 和 Photopea 并非如此。Photopea 是 Photoshop 的替代品，NanoImage 是 15 个小工具的集合。

但确实有人在问："应该用 Photopea 还是 NanoImage？"——通常是因为不确定哪个更适合当前任务。所以本文更像是一份决策指南。

---

## 一句话总结

- 需要**编辑**图片（绘画、蒙版、修图、图层、打开 PSD）：用 **Photopea**
- 需要**转换**图片（压缩、调整尺寸、裁剪、格式转换、添加水印）：用 **NanoImage**
- 这是两个不同的动词，选择匹配动词的工具。

---

## 两款工具分别是什么

### Photopea

浏览器版 Adobe Photoshop 克隆。支持打开 PSD、AI、EPS、SVG、RAW、XCF。有图层、蒙版、画笔、路径、通道、钢笔工具、修复工具、曲线、智能对象。

由一位开发者（Ivan Kuckir）自 2013 年起独立开发维护。免费含广告；每月 $5 去广告。学习曲线约等于 Photoshop。

### NanoImage

15 个专注单一功能的图片工具，基于 Canvas API 在浏览器中运行。每个工具 1–3 次点击即可完成任务，没有图层面板，没有画笔工具。

---

## 快速对比

| | **NanoImage** | **Photopea** |
|---|:---:|:---:|
| 类型 | 转换 / 实用工具 | 完整编辑器 |
| 首次完成任务的时间 | ~5 秒 | 1–3 分钟 |
| 学习曲线 | 几乎没有 | 陡峭（Photoshop 级别） |
| 图层、蒙版、画笔 | 否 | 是 |
| 支持 PSD | 否 | 是（出色） |
| 批量处理 | 是（最多 10 张） | 是（需要 Actions 脚本） |
| 移动端可用？ | 是 | 勉强可用 |
| 免费版 | 无限制，无广告 | 含广告 / $5/月去广告 |

---

## 决策树

**用 Photopea**：
- 需要打开 PSD 文件
- 需要像素级编辑——修图、绘画、蒙版、修复
- 多图层合成
- 需要选区工具（魔棒、套索、钢笔）
- 调色——曲线、色阶、色彩平衡
- 任务在 Photoshop 中通常需要 5–30 分钟

**用 NanoImage**：
- 压缩用于邮件、Slack 或上传的图片
- 调整到指定像素尺寸（尤其是各平台规格）
- 裁剪到特定比例
- 格式转换（PNG → JPG、WebP → PNG 等）
- 添加水印或边框
- 制作表情包
- 批量处理多张图片
- 任务通常不超过一分钟

---

## 实测：完成任务需要多长时间？

| 任务 | Photopea | NanoImage |
|---|---|---|
| 压缩截图后粘贴到 Slack | 30秒 | 5秒 |
| PNG 转 JPG | 30秒 | 5秒 |
| 为 Instagram 调整尺寸 | 45秒 | 10秒 |
| 裁剪为 16:9 | 30秒 | 10秒 |
| 为 10 张图片加水印 | 5-15分钟 | 2分钟（批量） |
| 从照片中移除某人 | 1-5分钟 | 不支持（工具不对） |
| 打开 PSD 并导出某图层 | 1分钟 | 不支持（工具不对） |

规律：1 分钟以内的任务，NanoImage 快 5–10 倍；5 分钟以上的编辑任务，Photopea 是唯一选择。

---

## 结论

如果你做真正的图片编辑——修图、合成、蒙版、PSD 文件——**Photopea 是网络上最好的免费工具之一**。

如果你做日常图片处理——压缩邮件附件、社交媒体调尺寸、格式转换——**NanoImage 就是为这一类工作而生的**。

Photopea 是你坐下来准备**创作**时打开的工具。NanoImage 是你需要**快速做完一件小事然后回去干正事**时打开的工具。

[**立即使用 NanoImage →**](https://nanoimage.net) | [查看四款工具完整对比 →](/blog/nanoimage-vs-tinypng-vs-squoosh-vs-photopea/)`,
      },
      'zh-TW': {
        category: '工具對比',
        title: 'NanoImage vs Photopea：快速工具 vs 完整編輯器（2026）',
        excerpt: 'Photopea 是瀏覽器端的 Photoshop 替代品，NanoImage 是 15 個小工具的集合。它們解決的是完全不同的問題。',
      },
      ja: {
        category: '比較レビュー',
        title: 'NanoImage vs Photopea: クイックツール vs フルエディタ（2026）',
        excerpt: 'PhotopeaはブラウザのPhotoshop代替。NanoImageは15ツールのユーティリティスイート。全く異なる問題を解決します。',
      },
      ko: {
        category: '비교 리뷰',
        title: 'NanoImage vs Photopea: 빠른 도구 vs 완전한 편집기 (2026)',
        excerpt: 'Photopea는 브라우저 기반 Photoshop 대안이고, NanoImage는 15개 소형 유틸리티 모음입니다. 완전히 다른 문제를 해결합니다.',
      },
      fr: {
        category: 'Comparaisons',
        title: `NanoImage vs Photopea : outils rapides vs éditeur complet (2026)`,
        excerpt: `Photopea est un remplacement Photoshop dans votre navigateur. NanoImage est une suite de 15 utilitaires rapides. Ils résolvent des problèmes très différents.`,
      },
      es: {
        category: 'Comparativas',
        title: `NanoImage vs Photopea: herramientas rápidas vs editor completo (2026)`,
        excerpt: `Photopea es un reemplazo de Photoshop en tu navegador. NanoImage es una suite de 15 utilidades rápidas. Resuelven problemas completamente diferentes.`,
      },
      pt: {
        category: 'Comparativos',
        title: `NanoImage vs Photopea: ferramentas rápidas vs editor completo (2026)`,
        excerpt: `Photopea é um substituto do Photoshop no navegador. NanoImage é um conjunto de 15 utilitários rápidos. Eles resolvem problemas completamente diferentes.`,
      },
      ru: {
        category: 'Сравнения',
        title: `NanoImage vs Photopea: быстрые инструменты vs полноценный редактор (2026)`,
        excerpt: `Photopea — замена Photoshop в браузере. NanoImage — набор из 15 быстрых утилит. Они решают совершенно разные задачи.`,
      },
    },
  },
]
