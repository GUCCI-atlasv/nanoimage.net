import type { CategoryHubPages } from './types'

export const enCategoryHubPages: CategoryHubPages = {
  'ai-tools': {
    seo: {
      title: 'Free AI Image Tools Online – On-Device, No Upload',
      description:
        'AI background removal, object erasure, photo restoration, and smart crop — all running on-device in your browser. Your images never leave your device. Free, no signup, no watermark.',
      h1: 'AI Image Tools — On-Device, No Upload',
      hero:
        'AI image tools that still don’t upload your photos. The models download to your browser once, then all inference runs locally on your device — WebGPU accelerated, with a WASM fallback everywhere.',
    },
    introMarkdown: `## AI image editing without giving up your photos

Most AI image sites work the same way: you upload your photo, their server runs the model, and you download the result — which means your image lives on someone else’s computer. NanoImage’s [AI tools](/tools/ai-tools) flip that model. The AI weights are downloaded to your browser once and cached; after that, every inference runs locally on your device with WebGPU (Chrome, Edge) or a WASM fallback (Firefox, Safari). Your image stays in your browser’s memory and is never uploaded — you can verify it yourself in your browser’s DevTools Network tab.

Use the [AI Background Remover](/background-remover) to cut the subject out of a photo and download a transparent PNG — great for product shots, avatars, and design work. The first run downloads the RMBG-1.4 model (~168 MB); after that it’s cached and fast.

Use the [Object Remover](/object-remover) to paint over people, objects, or watermarks and let smart edge-fill reconstruct the background. For big objects, several small passes usually beat one large one.

Use [Photo Restore](/photo-restore) to enhance old or faded photos and add color to black-and-white pictures — a natural fit for family archives you’d rather not upload anywhere.

Use [Smart Crop & Blur](/smart-crop) to auto-crop to the most interesting region for a chosen aspect ratio, or to add a depth-of-field blur behind a person, powered by on-device segmentation.

These AI tools follow the same rules as every other NanoImage tool: free, no account, no watermark, and no upload. The only thing fetched from our CDN is the model weights themselves. If your device can’t run a model, the tool tells you up front instead of quietly falling back to a server.`,
    scenarios: [
      { question: 'Need a transparent PNG?', toolSlug: 'background-remover' },
      { question: 'Need to erase an object or watermark?', toolSlug: 'object-remover' },
      { question: 'Need to restore or colorize an old photo?', toolSlug: 'photo-restore' },
      { question: 'Need an auto-crop or portrait blur?', toolSlug: 'smart-crop' },
      { question: 'Need a larger, sharper image?', toolSlug: 'upscale-image' },
    ],
    faqs: [
      { q: 'Are the AI tools really free?', a: 'Yes. Like every NanoImage tool, the AI tools are free with no signup and no watermark. There are no per-image credits because there is no server-side inference to pay for — your device does the work.' },
      { q: 'Do AI tools upload my image?', a: 'No. The model weights are downloaded from our CDN once and cached; inference then runs locally in your browser. Your image never leaves your device. You can verify this in the browser DevTools Network tab.' },
      { q: 'Why does the first use take longer?', a: 'The first run downloads the AI model (up to ~168 MB depending on the tool). It is then cached by your browser, so later runs start instantly and can work offline.' },
      { q: 'Which browsers work best?', a: 'Chrome and Edge use WebGPU for the fastest inference. Firefox and Safari fall back to WASM — slower, but fully functional. Older devices with little RAM may not support the largest models.' },
      { q: 'How is this different from remove.bg or other AI sites?', a: 'Those services run the model on their servers, so your photo is uploaded. NanoImage runs the model on your device — same category of results for everyday images, with no upload.' },
    ],
    howItWorks: [
      'Open an AI tool — the model downloads to your browser once and is cached.',
      'Drop in your image. Inference runs locally with WebGPU or WASM; nothing is uploaded.',
      'Preview and download the result at full resolution, free and without watermark.',
    ],
  },
  'optimize-images': {
    seo: {
      title: 'Optimize Images Online – Compress, Resize & Upscale',
      description:
        'Optimize images online for free. Compress, resize, batch compress, and upscale JPG, PNG, WebP, and GIF files directly in your browser with no signup or upload.',
      h1: 'Optimize Images Online',
      hero:
        'Make images smaller, sharper, and easier to share. Use free browser-based tools to compress, resize, batch optimize, or upscale images without uploading your files.',
    },
    introMarkdown: `## Optimize images online for faster websites, easier sharing, and better quality

Image optimization is one of the simplest ways to make digital work faster and easier. Large image files slow down websites, take longer to upload, fill email attachments, and often fail when a form has a strict file size limit. NanoImage gives you a focused set of free online [image optimization tools](/tools/optimize-images) so you can reduce file size, resize dimensions, batch compress multiple files, or upscale a low-resolution image directly in your browser.

The Optimize Images category is built for everyday tasks: compress a JPG before sending it by email, resize a PNG for a website banner, reduce a WebP file for faster loading, or enlarge a small image so it looks clearer in a presentation. Each tool is designed to be simple enough for quick one-off edits, while still giving you useful controls such as output format, quality, dimensions, and target size.

Use the [Compress Image Online](/compress-image) tool when your main goal is to make a file smaller. Compression is useful for blog images, product photos, application forms, document uploads, and social media assets. If you need to meet a specific upload limit, use one of the target-size compressors such as [100KB](/compress-image-to-100kb), [200KB](/compress-image-to-200kb), [500KB](/compress-image-to-500kb), or [1MB](/compress-image-to-1mb).

Use [Resize Image Online](/resize-image) when the image dimensions are the problem. A photo from a phone might be 4000 pixels wide, but a website thumbnail may only need 1200 pixels or less. Resizing can dramatically reduce file size while keeping the image visually clear for its intended use.

Use [Batch Compress](/batch-compress) when you have multiple images to prepare at once. Instead of uploading and downloading files one by one, you can process a group of images together. This is useful for ecommerce sellers, bloggers, designers, students, and anyone preparing many photos for web publishing or sharing.

Use [Upscale Image Online](/upscale-image) when your image is too small and needs to look cleaner at a larger size. Upscaling can help with old screenshots, small product photos, social images, or images that need to fit into a larger layout.

NanoImage is different from many online image tools because optimization happens in your browser whenever possible. Your images are processed locally on your device instead of being uploaded to a server for editing. That makes the workflow faster for many files and helps protect private images, personal documents, product drafts, and client work.

For the best result, choose the tool based on the problem you need to solve. If the file size is too large, compress it. If the width or height is wrong, resize it. If you have many files, batch compress them. If the image is too small, upscale it. You can also combine tools: resize first, then compress; convert to WebP, then compress; or remove EXIF data before publishing.`,
    scenarios: [
      { question: 'Need a smaller file?', toolSlug: 'compress-image' },
      { question: 'Need an exact upload limit (100KB)?', toolSlug: 'compress-image-to-100kb' },
      { question: 'Need an exact upload limit (200KB)?', toolSlug: 'compress-image-to-200kb' },
      { question: 'Need new dimensions?', toolSlug: 'resize-image' },
      { question: 'Need many files at once?', toolSlug: 'batch-compress' },
      { question: 'Need a larger image?', toolSlug: 'upscale-image' },
    ],
    faqs: [
      { q: 'Are NanoImage optimization tools free?', a: 'Yes. Compress, resize, batch compress, and upscale tools are free to use with no signup required for core workflows.' },
      { q: 'Should I compress or resize first?', a: 'Resize first when dimensions are wrong for the platform. Compress when the file size is too large. Many workflows combine both steps.' },
      { q: 'Will compression reduce visible quality?', a: 'At sensible quality settings (often 80–92 for JPG/WebP), photos usually look nearly identical while file size drops significantly.' },
      { q: 'Are my files uploaded to your server?', a: 'NanoImage processes images in your browser where supported. Your files stay on your device during optimization.' },
      { q: 'Which format is best for websites?', a: 'WebP often gives smaller files than JPG for photos. PNG is better for transparency and sharp graphics. Convert with Convert to WebP, then compress if needed.' },
    ],
    howItWorks: [
      'Upload or drop your image in the browser — no account needed.',
      'Choose compression, resize, batch, or upscale settings and preview the result.',
      'Download instantly. Combine with convert or EXIF removal if your workflow needs it.',
    ],
  },
  'edit-images': {
    seo: {
      title: 'Edit Images Online – Crop, Rotate, Flip & Enhance',
      description:
        'Edit images online for free. Crop, rotate, flip, add text, change background, enhance photos, and adjust colors privately in your browser. No signup or watermark.',
      h1: 'Edit Images Online',
      hero:
        'Make quick image edits without installing software. Crop, rotate, flip, add text, change backgrounds, enhance photos, and adjust colors with free browser-based tools.',
    },
    introMarkdown: `## Edit images online without installing software

You do not always need a complex photo editor to make a useful change. Most image editing tasks are simple: crop out extra space, rotate a sideways photo, flip an image, add text, change a background color, enhance a dark picture, or prepare an ID photo. NanoImage brings these everyday [edit images online](/tools/edit-images) tools into one fast, free, browser-based workspace.

Use [Crop Image Online](/crop-image) when you need to remove unwanted areas, focus attention on the subject, or fit an image into a specific aspect ratio. Cropping is useful for profile photos, thumbnails, ecommerce images, blog covers, documents, and social posts.

Use [Rotate Image Online](/rotate-image) when a photo appears sideways or upside down. This often happens when images are moved between phones, cameras, editing apps, and websites.

Use [Flip Image Online](/flip-image) when you want to mirror a photo horizontally or vertically. This is helpful for selfies, design layouts, scanned materials, product direction, and creative effects.

Use [Add Text to Image](/add-text) when you need captions, labels, instructions, memes, thumbnails, or simple promotional graphics.

Use [Change Background](/change-background) when the background color does not fit the final use. This is useful for product images, ID-style photos, simple graphics, and ecommerce listings.

Use [Enhance Image](/enhance-image) when a photo needs quick visual improvement — brightness, contrast, saturation, sharpness, and clarity adjustments.

Use [Change Color](/change-color) when you need to replace, adjust, or tint colors in an image.

Use [Passport Photo Maker](/passport-photo) when you need a photo prepared for an official format with size, background, and file-size controls.

A strong edit workflow often combines more than one tool: crop a photo, [resize images online](/resize-image), [compress images online](/compress-image), and then [remove EXIF data](/remove-exif) before publishing. NanoImage’s biggest advantage is simplicity and privacy — quick browser-based editing with no signup and no watermark on downloads.`,
    scenarios: [
      { question: 'Need to reframe or change aspect ratio?', toolSlug: 'crop-image' },
      { question: 'Photo sideways or upside down?', toolSlug: 'rotate-image' },
      { question: 'Need a mirror effect?', toolSlug: 'flip-image' },
      { question: 'Need captions or labels?', toolSlug: 'add-text' },
      { question: 'Need a clean background?', toolSlug: 'change-background' },
      { question: 'Need quick quality fixes?', toolSlug: 'enhance-image' },
      { question: 'Need passport or visa photo?', toolSlug: 'passport-photo' },
    ],
    faqs: [
      { q: 'Do I need to install software?', a: 'No. All edit tools run in your web browser on desktop and mobile.' },
      { q: 'What is the difference between crop and resize?', a: 'Crop removes parts of the image to change framing. Resize changes pixel dimensions of the whole image.' },
      { q: 'Can I rotate and flip in one workflow?', a: 'Yes. Fix orientation with Rotate Image, then mirror with Flip Image if needed.' },
      { q: 'Will edits add a watermark?', a: 'No. NanoImage downloads are clean without tool watermarks.' },
      { q: 'Are my photos uploaded?', a: 'Processing happens in your browser where supported. Files stay on your device.' },
    ],
    howItWorks: [
      'Open the edit tool you need — crop, rotate, flip, text, and more.',
      'Upload your image and adjust settings in the browser.',
      'Download the edited file. Resize or compress next if the platform has size limits.',
    ],
  },
  'convert-formats': {
    seo: {
      title: 'Convert Image Formats Online – JPG, PNG, WebP, PDF',
      description:
        'Convert image formats online for free. Change JPG, PNG, WebP, GIF, and other files in your browser with no signup and instant download.',
      h1: 'Convert Image Formats Online',
      hero:
        'Convert images to the format you need. Turn JPG, PNG, WebP, GIF, and other files into web-ready or document-friendly formats directly in your browser.',
    },
    introMarkdown: `## Convert image formats online for websites, documents, and sharing

Different image formats are built for different jobs. JPG is common for photos, PNG is useful for transparency and screenshots, WebP is great for small web-ready files, GIF supports animation, and PDF is often required for documents or submissions. NanoImage’s [convert image formats online](/tools/convert-formats) category helps you change files without installing software.

Use [Convert Image Online](/convert-image) when you need a general converter for JPG, PNG, WebP, GIF, BMP, and more. Use [Convert JPG/PNG to WebP](/convert-to-webp) when preparing images for websites or performance-focused pages — WebP often creates smaller files while keeping good visual quality.

Use [Image to PDF Converter](/image-to-pdf) when you need to turn one or more images into a document for receipts, scanned forms, assignments, identity documents, or printable files.

Choosing the right format depends on the final use. Use JPG for regular photos when transparency is not needed. Use PNG for screenshots, graphics, and logos. Use WebP for websites when file size matters. Use PDF when the image needs to be submitted, printed, or shared as a document.

Format conversion is often part of a broader workflow: resize a large PNG, convert to WebP, then [compress images online](/compress-image). Or convert a phone photo to JPG for a form, then compress to fit a size limit. NanoImage keeps the workflow simple — upload, choose output format, download.

Many users search because they are blocked by an upload requirement: “only JPG accepted,” “file must be WebP,” or “submit as PDF.” This hub helps you understand which tool solves the problem and sends you directly to that tool. Privacy-first browser processing matters because users often convert sensitive IDs, receipts, business graphics, and client assets.`,
    scenarios: [
      { question: 'Not sure which converter to use?', toolSlug: 'convert-image' },
      { question: 'Need smaller web files?', toolSlug: 'convert-to-webp' },
      { question: 'Need a document from images?', toolSlug: 'image-to-pdf' },
      { question: 'File still too large after convert?', toolSlug: 'compress-image' },
    ],
    faqs: [
      { q: 'JPG vs PNG vs WebP — which should I use?', a: 'JPG for photos, PNG for transparency and sharp graphics, WebP for smaller web files with good quality.' },
      { q: 'Can I convert multiple images at once?', a: 'Convert Image supports batch conversion for many common workflows.' },
      { q: 'What happens to transparency when converting to JPG?', a: 'JPG has no alpha channel. Transparent areas become a solid background color you can choose.' },
      { q: 'Can I convert images to PDF?', a: 'Yes. Image to PDF merges up to 20 images into one PDF with page size and margin controls.' },
      { q: 'Are conversions processed locally?', a: 'Yes, where supported — files are processed in your browser rather than uploaded for conversion.' },
    ],
    howItWorks: [
      'Choose Convert Image, WebP, or PDF based on your output need.',
      'Upload files and select the target format and quality options.',
      'Download converted files. Compress or resize if the platform has limits.',
    ],
  },
  'create-more': {
    seo: {
      title: 'Create Images Online – GIFs, Memes, Collages & Grids',
      description:
        'Create images online for free. Make GIFs, memes, photo collages, photo grids, and drawing grids in your browser with no signup or watermark.',
      h1: 'Create Images Online',
      hero:
        'Turn your photos into shareable visuals. Make GIFs, memes, collages, photo grids, and drawing grids with simple free tools that work in your browser.',
    },
    introMarkdown: `## Create shareable images, GIFs, memes, collages, and grids

Images are not only something you edit — they are also something you create. NanoImage’s [create images online](/tools/create-more) category brings together tools for making visual content from existing photos or blank layouts.

Use [GIF Maker](/gif-maker) to turn multiple images into an animated GIF — useful for reactions, product previews, before-and-after sequences, and lightweight visual explanations.

Use [Meme Generator](/meme-generator) to add bold top and bottom text quickly. For more control over fonts and layers, try [Add Text to Image](/add-text).

Use [Collage Maker](/image-collage) to combine several photos into one design for Instagram posts, mood boards, event recaps, and product displays.

Use [Photo Grid](/photo-grid) for structured 2×2, 3×3, and 4×4 layouts — portfolios, comparisons, and social posts that need alignment and consistency.

Use [Grid Maker](/grid-maker) to add a drawing grid to a reference photo or create blank printable grids for artists, students, and teachers.

Creative workflows often involve multiple tools: [crop an image online](/crop-image) before adding photos to a collage, [resize images online](/resize-image) before making a grid, [compress images online](/compress-image) before upload, or [add a watermark to an image](/add-watermark) on finished graphics. NanoImage keeps creation lightweight — fast, free, private, and no signup.`,
    scenarios: [
      { question: 'Need an animated GIF?', toolSlug: 'gif-maker' },
      { question: 'Need meme-style text?', toolSlug: 'meme-generator' },
      { question: 'Combine multiple photos?', toolSlug: 'image-collage' },
      { question: 'Need aligned grid layout?', toolSlug: 'photo-grid' },
      { question: 'Need drawing reference grid?', toolSlug: 'grid-maker' },
    ],
    faqs: [
      { q: 'GIF vs video — when use GIF Maker?', a: 'GIFs work best for short loops, reactions, and simple animations without a video player.' },
      { q: 'Collage vs photo grid?', a: 'Collages are freeform creative layouts. Photo grids emphasize equal cells and clean alignment.' },
      { q: 'Will downloads have a watermark?', a: 'No. NanoImage does not add watermarks to created images or GIFs.' },
      { q: 'Can I add text after making a meme?', a: 'Yes. Meme Generator is fastest for classic layouts; Add Text offers more typography control.' },
      { q: 'Do I need an account?', a: 'No account is required for core create tools.' },
    ],
    howItWorks: [
      'Pick GIF, meme, collage, grid, or drawing grid based on your output.',
      'Upload images or configure layout settings in the browser.',
      'Download your creation. Resize or compress before posting to social platforms.',
    ],
  },
  'privacy-protection': {
    seo: {
      title: 'Image Privacy Tools – Remove EXIF, Blur, Pixelate & Watermark',
      description:
        'Protect image privacy online. Remove EXIF data, blur faces, pixelate sensitive areas, and add watermarks in your browser with no signup or upload.',
      h1: 'Image Privacy & Protection Tools',
      hero:
        'Protect sensitive details before you share an image. Remove metadata, blur private areas, pixelate faces or license plates, and add watermarks directly in your browser.',
    },
    introMarkdown: `## Protect your images before you share them online

Every image can contain more information than you expect — location metadata, camera details, timestamps, faces, license plates, addresses, and private background details. NanoImage’s [image privacy tools](/tools/privacy-protection) help you prepare images for safer sharing.

Use [Remove EXIF Data](/remove-exif) to strip hidden metadata from photos. EXIF can include camera model, date, time, and sometimes GPS location. Removing metadata is useful before sharing travel photos, personal images, client work, screenshots, or documents online.

Use [Blur Image Online](/blur-image) to hide information while keeping the overall image natural — faces, addresses, license plates, account numbers, and background details.

Use [Pixelate Image Online](/pixelate-image) for stronger visual privacy. Pixelation is common for censoring faces, IDs, plates, and sensitive areas in screenshots.

Use [Add Watermark to an Image](/add-watermark) to protect ownership or discourage unauthorized reuse with text or logo marks.

Image privacy has two layers: visible details and hidden metadata. A complete workflow may require both — [remove EXIF data](/remove-exif) and blur or pixelate sensitive areas. NanoImage emphasizes browser-based processing so privacy-focused users do not need to upload sensitive images to unknown servers.

Common use cases include hiding faces in classroom photos, removing GPS from phone pictures, blurring license plates before posting a car photo, pixelating usernames in screenshots, and adding watermarks to product photography before public sharing.`,
    scenarios: [
      { question: 'Need to strip hidden metadata?', toolSlug: 'remove-exif' },
      { question: 'Need to hide faces or plates?', toolSlug: 'blur-image' },
      { question: 'Need obvious redaction?', toolSlug: 'pixelate-image' },
      { question: 'Need ownership protection?', toolSlug: 'add-watermark' },
    ],
    faqs: [
      { q: 'What is EXIF data?', a: 'EXIF is metadata embedded in many photos — camera settings, date, time, and sometimes GPS coordinates.' },
      { q: 'Blur vs pixelate — which is better?', a: 'Blur looks natural for faces; pixelate is harder to reverse and clearly signals intentional redaction. Strong blur or pixelate for text and numbers.' },
      { q: 'Does blurring remove EXIF?', a: 'No. Strip metadata separately with Remove EXIF after visual redaction.' },
      { q: 'Are privacy tools free?', a: 'Yes. Core privacy tools are free with no signup required.' },
      { q: 'Are my sensitive files uploaded?', a: 'NanoImage processes files in your browser where supported — verify with DevTools → Network during processing.' },
    ],
    howItWorks: [
      'Upload the image you plan to share publicly.',
      'Remove EXIF, blur, pixelate, or watermark as needed — often in combination.',
      'Download and review the final image before posting.',
    ],
  },
  'video-tools': {
    seo: {
      title: 'Free Online Video Tools – Convert Video to GIF or MP3',
      description:
        'Use free online video tools to convert video clips to GIFs or extract MP3 audio. Fast browser-based tools with no signup and simple downloads.',
      h1: 'Free Online Video Tools',
      hero:
        'Convert short video clips into shareable GIFs or extract audio as MP3. Simple free video tools built for quick browser-based workflows.',
    },
    introMarkdown: `## Simple online video tools for GIFs, audio, and quick conversions

Video files are useful, but they are not always the easiest format to share. A short clip may work better as an animated GIF, while a recording may be more useful as an MP3 audio file. NanoImage’s [free online video tools](/tools/video-tools) give users simple, focused conversion without complicated editing software.

Use [Video to GIF Converter](/video-to-gif) for reactions, tutorials, product previews, social posts, and quick visual explanations. GIFs loop automatically and are often easier to embed than video files.

Use [Video to MP3 Converter](/video-to-mp3) to extract audio from voice notes, lectures, interviews, screen recordings, and reference clips.

This category is a lightweight utility — upload or select a video, choose the output, process, and download. Video tools connect to the rest of NanoImage: convert to GIF, then [compress](/compress-image) or [crop](/crop-image) frames; extract MP3 for podcasts or notes.

GIFs work best for short clips and simple motion. MP3 extraction is best when you only need the sound. If processing is browser-based for supported files, files stay on your device — see each tool’s privacy notice for details.`,
    scenarios: [
      { question: 'Need a looping clip for chat or social?', toolSlug: 'video-to-gif' },
      { question: 'Need audio only from a video?', toolSlug: 'video-to-mp3' },
      { question: 'GIF too large after convert?', toolSlug: 'compress-image' },
      { question: 'Need meme text on a frame?', toolSlug: 'meme-generator' },
    ],
    faqs: [
      { q: 'How long should a video be for GIF conversion?', a: 'Short clips (a few seconds to ~15 seconds) work best. Longer clips produce very large GIFs.' },
      { q: 'Video to MP3 — does it keep the video?', a: 'No. MP3 export is audio only. Keep the original video file if you need both.' },
      { q: 'Are video tools free?', a: 'Yes. Core video conversion tools are free with no signup required.' },
      { q: 'What formats are supported?', a: 'Common browser-supported video formats such as MP4 and WebM. See each tool page for details.' },
      { q: 'Can I edit the GIF after conversion?', a: 'Yes. Use image tools like crop, resize, compress, or add text on exported frames or related image workflows.' },
    ],
    howItWorks: [
      'Open Video to GIF or Video to MP3 and upload your clip.',
      'Adjust quality, timing, or audio settings as needed.',
      'Download the GIF or MP3. Use image tools for further optimization.',
    ],
  },
}
