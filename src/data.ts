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
]
