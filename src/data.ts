import { staticToolFaqItems } from './app-pages/static-tools/content'

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
  /**
   * 2026-07 整合优化 PRD Phase 1(站点瘦身):
   * deprecated 工具进入下线观察期 —— 页面保持可访问但输出 noindex,
   * 并从首页、导航、分类页、sitemap 中移除。观察 2 周无流量损失后,
   * 启用 public/_redirects 中预置的 301 规则并删除页面。
   */
  deprecated?: boolean
}

export type FaqItem = {
  q: string
  a: string
}

export const toolFaqs: Record<string, FaqItem[]> = {
  // Static tools synced from production (2026-10) — FAQs shared with src/app-pages/static-tools/content.ts
  ...staticToolFaqItems('en'),
  'compress-image': [
    { q: 'Will compression reduce image quality?', a: 'It can, depending on the quality setting. Light compression often looks almost the same while making the file much smaller.' },
    { q: 'Can I compress an image to 100KB?', a: 'Often yes. Use JPG or WebP, lower the quality, and resize the image if needed.' },
    { q: 'Which format should I use?', a: 'Use JPG for photos, PNG for transparency or screenshots, and WebP for smaller web-ready images.' },
  ],
  'resize-image': [
    { q: 'Is resizing the same as cropping?', a: 'No. Resizing changes width and height. Cropping removes part of the image.' },
    { q: 'How do I avoid distortion?', a: 'Keep aspect ratio enabled. This prevents the image from being stretched.' },
    { q: 'Will enlarging an image make it sharper?', a: 'No. Basic resizing cannot create real detail. Large upscaling may look blurry.' },
    { q: 'How do I resize an image to a specific file size, like 50KB or 1MB?', a: 'The resize tool reduces file size indirectly by shrinking pixel dimensions or lowering quality. For precise file-size targets — such as resize image to 50KB or 1MB — use our Compress Image tool, which lets you set an exact output size in KB or MB.' },
    { q: 'How do I resize an image to under 50KB?', a: 'Shrink dimensions (for example to 800 px wide or less), choose JPG or WebP output, and lower quality to about 40–55%. If you still need an exact cap, open Compress Image and set a 50 KB target.' },
    { q: 'How do I resize an image to 512×512?', a: 'Enter 512 in both the Width and Height fields. If your source image is not square, turn off "Keep aspect ratio" first, then click Apply. 512×512 is common for avatars, app icons, and AI training datasets.' },
    { q: 'How do I resize an image to 1280×720 or 1920×1080?', a: 'Click a preset in "Common Sizes" — 1920×1080 (Full HD) and 1280×720 (HD) are one click away. These work well for YouTube thumbnails, slides, and video covers.' },
    { q: 'How do I resize an image in bulk?', a: 'The web tool handles one image at a time. For bulk image resize across folders, use NanoImage CLI to batch resize from the command line.' },
    { q: 'What size should I use to resize an image for Instagram?', a: 'Instagram recommends 1080×1080 px for square posts, 1080×1350 px for portrait posts, and 1080×1920 px for Stories and Reels. Enter those values in Width and Height.' },
    { q: 'How do I resize an image for a LinkedIn banner or profile photo?', a: 'LinkedIn profile photos work best at 400×400 px. For a banner, use 1584×396 px. Enter the target dimensions and click Apply.' },
    { q: 'Can I resize a PNG image without losing transparency?', a: 'Yes. Choose PNG as the output format. JPG fills transparent areas with white because it does not support transparency.' },
    { q: 'What is the best free online image resizer?', a: 'NanoImage runs entirely in your browser — no uploads, no account, and no limits. Resize by pixels, percentage, or presets like HD and Full HD. Pair with Compress Image when you need an exact KB or MB output.' },
    { q: 'Does resizing an image reduce its file size?', a: 'Usually yes. Smaller dimensions generally mean a smaller file. Final size also depends on format and quality — use JPG or WebP for the smallest results.' },
  ],
  'batch-compress': [
    { q: 'What is Batch Compress for?', a: 'It lets you compress multiple images at once with the same settings.' },
    { q: 'How many images can I process?', a: 'A safe limit is up to 20 images, about 20MB each, with a total around 200MB.' },
    { q: 'How do I download the results?', a: 'You can download individual images or export all results as a ZIP file.' },
  ],
  'upscale-image': [
    { q: 'Can I upscale images for free without signing up?', a: 'Yes. NanoImage is a free image upscaler with no account required. Upload JPG, PNG, WebP, or GIF, choose 2x–4x scale, and download — all processing runs in your browser with no server upload.' },
    { q: 'What is the best free image upscaler online?', a: 'NanoImage offers a free browser-based image upscaler with Smooth and Sharp resampling plus a sharpen slider — no credits, no watermarks, and your files never leave your device.' },
    { q: 'Can I upscale anime images?', a: 'Yes. Anime, digital art, and illustrations often upscale well at 2x or 3x with Sharp resampling. Very low-resolution sources may still show softness at 4x — start with 2x for the best balance.' },
    { q: 'Can I batch upscale multiple images?', a: 'The web tool handles one image at a time. For batch image upscaling across folders, use NanoImage CLI from the command line.' },
    { q: 'Is this an AI image upscaler?', a: 'No. This is a browser-based enlarger with resampling and sharpening controls — not generative AI super-resolution. If AI upscaling is added later, it will be clearly labeled.' },
    { q: 'How do I upscale an image in 2025?', a: 'Upload your file, pick 2x, 3x, or 4x (or a custom scale), choose Smooth for photos or Sharp for text and edges, adjust sharpen if needed, then download in PNG, JPG, or WebP.' },
    { q: 'How much can I enlarge an image?', a: 'Preset scales are 2x, 3x, and 4x, with custom scaling up to 6x. Higher scales produce larger files and may soften very small originals — 2x is recommended for everyday use.' },
    { q: 'What images work best?', a: 'Photos, web graphics, product shots, and simple artwork that need moderate enlargement. Pair with Enhance Image for brightness tweaks or Compress Image after upscaling to reduce file size.' },
  ],
  'crop-image': [
    { q: 'Can I crop by aspect ratio?', a: 'Yes. Common ratios include 1:1, 4:3, 16:9, and 9:16.' },
    { q: 'Can I crop multiple areas?', a: 'Multiple crop areas are supported. Multiple crop results can be downloaded as a ZIP.' },
    { q: 'Does cropping change my original file?', a: 'No. It creates a new cropped image for download.' },
  ],
  'passport-photo': [
    { q: 'Is NanoImage Passport Photo Maker free?', a: 'Yes. You can create and download passport, visa, and ID photos for free without signup or watermark.' },
    { q: 'Do you upload my passport photo?', a: 'No. The photo is processed locally in your browser. Your image does not need to leave your device.' },
    { q: 'Can I make a 2x2 inch passport photo?', a: 'Yes. Choose the US Passport Photo or 2x2 inch preset, align your face, and export the correct 600 x 600 px photo.' },
    { q: 'Can I make my photo under 50KB?', a: 'Yes. Use the optional file-size limit and choose 50KB, 100KB, or a custom target. Smaller limits may reduce quality.' },
    { q: 'Is the photo guaranteed to be accepted?', a: 'No. NanoImage helps create photos based on common requirements, but official rules may change. Always verify requirements with the issuing authority.' },
  ],
  'rotate-image': [
    { q: 'Can I rotate by any angle?', a: 'Yes. Rotate image online with 90°, 180°, or any custom angle between -180° and 180°. Use the slider for precise orientation fixes.' },
    { q: 'Why do I see empty corners after rotation?', a: 'Custom rotation can create empty areas around the image. Choose Expand Canvas to keep the full result, pick a background color, or crop afterward with our Crop Image tool.' },
    { q: 'What is the difference between rotate and flip?', a: 'Rotate turns the image by an angle (for example 90°). Flip mirrors it horizontally or vertically without changing the angle. This tool supports both in one workflow.' },
    { q: 'Is this image rotator free to use?', a: 'Yes. NanoImage is a free rotate image online tool with no watermarks, no limits, and no hidden fees.' },
    { q: 'Do I need to create an account?', a: 'No signup is required. Open the page, upload an image, rotate, and download — no email or account.' },
    { q: 'Is my image uploaded to your servers?', a: 'No. All processing happens in your browser. Your file never leaves your device, so photos stay private.' },
    { q: 'What image formats are supported?', a: 'You can rotate JPG, PNG, WebP, and GIF images. Export keeps a web-friendly format based on your settings.' },
    { q: 'Can I rotate a GIF image?', a: 'Yes. Static GIFs rotate like other images. For animated GIFs, upload and rotate; preview the result before downloading.' },
  ],
  'flip-image': [
    { q: 'How do I flip an image online for free?', a: 'Upload your image to NanoImage, choose horizontal, vertical, or both flip modes, then download the mirrored result. No signup and no server upload — everything runs in your browser.' },
    { q: 'What is the difference between flipping and mirroring an image?', a: 'Flipping and mirroring are the same thing. A horizontal flip mirrors left-to-right; a vertical flip mirrors top-to-bottom. You can combine both.' },
    { q: 'Does flipping an image reduce its quality?', a: 'No. Flipping only changes orientation. It does not recompress pixels, so JPG, PNG, WebP, and GIF quality stay the same.' },
    { q: 'What flip options are available?', a: 'Horizontal flip, vertical flip, and both directions at once. Optional EXIF metadata can be kept on export when supported.' },
    { q: 'Is this mirror image tool free to use?', a: 'Yes. NanoImage is a free flip image online tool with no watermarks, no limits, and no hidden fees.' },
    { q: 'Do I need to create an account?', a: 'No signup is required. Open the page, upload, flip, and download — no email or account.' },
    { q: 'Is my image uploaded to your servers?', a: 'No. All processing happens in your browser. Your file never leaves your device.' },
    { q: 'What image formats can I flip?', a: 'You can mirror JPG, PNG, WebP, and GIF images, including many animated GIFs. Preview before download.' },
  ],
  'add-text': [
    { q: 'How do I add text to a photo online for free?', a: 'Upload your photo, type your text in the Text Settings panel, choose font size, color, and effects, then click Download Image. No signup — completely free in your browser.' },
    { q: 'Can I add multiple text boxes on one image?', a: 'Yes. Use Add Layer to create multiple text layers. Each layer can be moved, resized, and styled separately on the canvas.' },
    { q: 'Can I add text to a PNG or WebP image?', a: 'Yes. Add text to JPG, PNG, WebP, and GIF files. PNG is ideal when you need crisp text over transparency.' },
    { q: 'How do I add text to a picture on my iPhone?', a: 'Open this page in Safari on iPhone, upload your picture, add text, and download. No app install required — everything runs in the mobile browser.' },
    { q: 'Can I add text to an animated GIF?', a: 'You can add text overlays to GIF files in this tool. For building or editing animated GIFs, try our GIF Maker tool as well.' },
    { q: 'Is my image uploaded to a server when I add text?', a: 'No. All text editing happens in your browser. Your image never leaves your device.' },
    { q: 'Is this add text to image tool free?', a: 'Yes. NanoImage is free with no watermarks, no limits, and no hidden fees.' },
    { q: 'Can I drag and style text on the image?', a: 'Yes. Drag text on the canvas, double-click to edit, and adjust bold, italic, shadow, outline, alignment, and color.' },
  ],
  'change-background': [
    { q: 'How do I change my image background to white?', a: 'Upload your image, open the Background panel, choose the Color tab, and pick white (#ffffff). Adjust selection size and tolerance, then download.' },
    { q: 'Can I change the background color of a photo online?', a: 'Yes. Use preset colors, a color picker, gradients, transparent output, or upload a custom image background — all free in your browser.' },
    { q: 'How do I make a background transparent?', a: 'Select Transparent in the Background panel. Works best with PNG files or photos with clear subject edges.' },
    { q: 'Can I replace the background with a custom image?', a: 'Yes. Click Image Background, upload any photo, and choose Cover, Contain, or Fill for the fit.' },
    { q: 'Does this tool use AI to change backgrounds?', a: 'NanoImage uses browser-based selection with adjustable tolerance to isolate areas and replace backgrounds. Upload and paint sample regions for assisted edits.' },
    { q: 'Is this background changer free?', a: 'Yes — 100% free, no signup, and your images never leave your browser.' },
    { q: 'What image formats are supported?', a: 'JPG, PNG, WebP, and GIF. Export as PNG for transparency or with your chosen background color or image.' },
    { q: 'Can I change a passport photo background?', a: 'Yes. Upload your portrait, sample the old background area, set white or another solid color, and download — useful for passport-style photos.' },
  ],
  'change-color': [
    { q: 'How do I change the background color of an image?', a: 'Use Select All or paint the background area, pick a new color, and download. For full background swaps, also try our Change Background tool.' },
    { q: 'Can I change image color online for free?', a: 'Yes — 100% free, no signup, and all editing runs in your browser. Your files never upload to our servers.' },
    { q: 'Can I change the whole image color?', a: 'Yes. Use Select All for global tinting or the brush to replace color in specific areas.' },
    { q: 'Does this work as an AI color changer?', a: 'NanoImage uses browser-based color replacement with tolerance and brush selection — not generative AI, but fast and private for everyday edits.' },
    { q: 'Can I change the color of my hair in a photo?', a: 'You can paint over hair regions and pick a new color. Complex hair edges may need careful brushing; results vary by photo.' },
    { q: 'Is color replacement always perfect?', a: 'No. Complex edges, hair, shadows, or reflections may need smaller brushes, lower tolerance, or the eraser to refine.' },
    { q: 'What image formats are supported?', a: 'JPG, PNG, WebP, and GIF up to 20MB. Download your recolored image in your chosen format.' },
    { q: 'What settings are useful?', a: 'New color picker, tolerance, brush size, Select All, eraser, undo, and before/after preview.' },
    { q: 'How do I make an image black and white?', a: 'Use the B&W preset in our Enhance Image tool for a one-click black and white conversion, or apply a gray tint here with Select All for a custom monochrome look.' },
    { q: 'Can I change the color of clothes or an object in a photo?', a: 'Yes. Paint over the shirt, product, or object with the brush, pick the new color, and adjust tolerance for clean edges. Great for product photos and mockups.' },
    { q: 'Can I change a specific color to another color?', a: 'Yes. Brush over the areas containing the color you want to replace, then choose the target color from the palette or hex picker. Tolerance controls how similar shades are matched.' },
  ],
  'black-and-white-image': [
    { q: 'How do I make an image black and white online?', a: 'Upload your photo, and it converts to black and white instantly. Choose PNG or JPG output and download — free, no signup, all in your browser.' },
    { q: 'Is this black and white image converter free?', a: 'Yes. No account, no watermark, no limits. Your image is processed locally in your browser and never uploaded to a server.' },
    { q: 'Will converting to black and white reduce image quality?', a: 'No. The conversion keeps the original resolution. Export as PNG for lossless output or JPG/WebP for smaller files.' },
    { q: 'Can I convert a JPG, PNG, or WebP photo to black and white?', a: 'Yes. JPG, PNG, WebP, and GIF are supported up to 20MB.' },
    { q: 'Can I adjust contrast after converting?', a: 'Yes. Open the result in our Enhance Image tool to fine-tune brightness, contrast, and sharpness for a classic monochrome look.' },
    { q: 'What is the difference between black and white and grayscale?', a: 'In everyday use they mean the same thing: an image made of gray tones. This tool applies a standard grayscale conversion that preserves natural tonal range.' },
  ],
  'invert-image-colors': [
    { q: 'How do I invert the colors of an image?', a: 'Upload your image and the colors invert instantly — like a photo negative. Download as PNG, JPG, or WebP. Free, no signup.' },
    { q: 'What does inverting colors do?', a: 'Every color is replaced by its opposite: black becomes white, blue becomes orange. Inverting twice restores the original image.' },
    { q: 'Can I turn a film negative into a normal photo?', a: 'Yes. Upload a scanned negative and inversion recovers the positive image. Fine-tune the result with our Enhance Image tool.' },
    { q: 'Is this color inverter free and private?', a: 'Yes. 100% free, no account, and all processing happens in your browser — your image never leaves your device.' },
    { q: 'What formats are supported?', a: 'JPG, PNG, WebP, and GIF up to 20MB. Export in your chosen format.' },
  ],
  'enhance-image': [
    { q: 'Is this a free AI image enhancer?', a: 'NanoImage offers free browser-based enhancement with brightness, contrast, saturation, sharpness, and presets. Advanced AI upscaling is a separate tool.' },
    { q: 'Do I need to sign up or create an account?', a: 'No sign up required. Open the page, upload your image, adjust sliders or presets, and download instantly.' },
    { q: 'Can I enhance image quality online without Photoshop?', a: 'Yes. Adjust brightness, contrast, saturation, sharpness, and filters in your browser — no Photoshop or desktop software needed.' },
    { q: 'What image formats are supported?', a: 'JPG, PNG, WebP, and GIF up to 20MB. Download enhanced images in your chosen format.' },
    { q: 'Is my image data kept private?', a: 'Yes. All processing runs locally in your browser. Files never upload to our servers.' },
    { q: 'Can I enhance real estate photos?', a: 'Yes. Use Auto Enhance, Bright, or Clear presets to improve listing photos, then download for MLS or social posts.' },
    { q: 'Can I use one-click enhance?', a: 'Yes. Click Auto Enhance or choose presets like Vivid, Warm, Cool, or B&W for instant results.' },
    { q: 'Does it overwrite my original image?', a: 'No. Your original file stays unchanged. You download a new enhanced copy.' },
  ],
  'convert-image': [
    { q: 'How do I convert an image to JPG for free?', a: 'Upload your image, choose JPG as the output format, adjust quality if needed, and click Convert Images. No signup required — everything runs in your browser.' },
    { q: 'How do I convert an image to high resolution online?', a: 'Upload your image to NanoImage, then use the Upscale Image tool to increase resolution. For format changes at full quality, use 100% quality setting when converting to PNG or WebP.' },
    { q: 'What formats can I convert BMP to?', a: 'You can convert BMP to JPG, PNG, or WebP in your browser. JPG is best for smaller photos; PNG keeps transparency when supported.' },
    { q: 'How do I convert a raw image to JPG?', a: 'If your browser can open the RAW or DNG file, upload it and export as JPG. For unsupported RAW files, open them in desktop software first, then convert here.' },
    { q: 'Does converting to WebP reduce file size?', a: 'Often yes. WebP typically produces smaller files than JPG or PNG at similar visual quality — great for websites and apps.' },
    { q: 'Can I convert image to icon (ICO) format?', a: 'ICO export is not supported yet. Convert to PNG first, then use a dedicated icon tool if you need .ico files.' },
    { q: 'Will transparency be kept?', a: 'PNG and WebP can keep transparency. JPG does not support transparency — transparent areas become solid color.' },
    { q: 'Will conversion affect quality?', a: 'JPG and WebP use compression you can control with the quality slider. PNG is lossless but may produce larger files.' },
  ],
  'convert-to-webp': [
    { q: 'How do I convert a JPG file to WebP?', a: 'Upload your JPG or JPEG to NanoImage, set WebP quality (80–90% is a good default), and click Convert to WebP. Your file converts locally in the browser and downloads instantly — no account needed.' },
    { q: 'Can I convert PNG to WebP online for free?', a: 'Yes. This free PNG to WebP converter runs entirely in your browser. Upload PNG files (including transparency), adjust quality, and download smaller WebP files for faster websites.' },
    { q: 'How do I convert JPEG to WebP?', a: 'JPEG and JPG are the same for this tool. Upload your JPEG image, choose quality settings, and click Convert to WebP to export an optimized WebP file in seconds.' },
    { q: 'Can I convert GIF to WebP?', a: 'Yes, where your browser supports GIF input. Upload a GIF, convert to WebP, and often get a much smaller file for web pages while keeping good visual quality.' },
    { q: 'How to convert SVG to WebP?', a: 'Upload your SVG when your browser can decode it. NanoImage exports WebP when image data is readable in the browser — use PNG or JPG sources if SVG is not supported in your session.' },
    { q: 'Does WebP replace JPEG and PNG?', a: 'WebP is a modern alternative that often beats JPEG and PNG on file size, but JPEG and PNG remain universal for email, print, and older apps. Many sites serve WebP to supported browsers and keep JPG/PNG as fallbacks.' },
    { q: 'Is there a batch WebP converter?', a: 'Yes. Upload up to 20 images at once, convert them all to WebP with the same settings, and download a ZIP. Ideal for optimizing product photos, blog images, or app assets in one pass.' },
    { q: 'Is this WebP converter free to use?', a: '100% free — no signup, no watermarks, no limits. Images are processed on your device and never uploaded to NanoImage servers.' },
  ],
  'image-to-pdf': [
    { q: 'How do I convert JPG to PDF?', a: 'Upload your JPG or JPEG files, arrange page order if you have several, pick page size and margins, then click Convert to PDF. NanoImage runs the JPG to PDF conversion in your browser — no Adobe, no upload, and no account required.' },
    { q: 'How do I convert PNG to PDF?', a: 'Choose PNG files (screenshots, logos, or graphics), upload them, and click Convert to PDF. Transparent PNG areas appear on a white page background. You can mix PNG to PDF with JPG or WebP in the same document.' },
    { q: 'Can I combine multiple images into one PDF?', a: 'Yes. Upload up to 20 images, drag thumbnails to reorder, then click Convert to PDF to combine images into one PDF instantly.' },
    { q: 'Can I merge images into one PDF file?', a: 'Yes — merge images the same way: upload, sort pages, and export one PDF. Helpful when you want one attachment instead of many separate JPG or PNG files.' },
    { q: 'Can I change page size and margins?', a: 'Yes. Choose A4 or Letter page size, portrait or landscape orientation, and small, normal, or large margins. You can also set image fit to "Fit to page", "Fill page", or "Actual size".' },
    { q: 'Does Image to PDF need uploading?', a: 'No. This image to PDF tool runs entirely in your browser. Your files are never sent to any server.' },
    { q: 'How do I insert an image into a PDF file?', a: 'Click "Upload Images" or drag and drop files into the tool. Adjust page size, orientation, and margins, then click "Convert to PDF" and download.' },
    { q: 'Is there an image to PDF converter with no ads?', a: 'Yes — NanoImage is ad-free and runs in your browser with no account and no usage limits.' },
    { q: 'Does this tool work on Android or mobile?', a: 'Yes. Create a PDF from images in Chrome on Android or Safari on iPhone without installing an app.' },
    { q: 'How do I make two images into one PDF?', a: 'Upload both images, drag thumbnails to set order, and click Convert to PDF. You can combine up to 20 images into one PDF per export.' },
  ],
  'gif-maker': [
    { q: 'What is GIF Maker for?', a: 'NanoImage GIF Maker turns multiple images into one animated GIF in your browser. Upload JPG, PNG, WebP, or GIF frames, reorder them, set speed and canvas size, then download — free with no watermark.' },
    { q: 'Can I control GIF speed?', a: 'Yes. Adjust frame duration, preview speed (0.5x–2x), loop count, and canvas dimensions. Longer frame duration lowers FPS and usually reduces file size.' },
    { q: 'How do I make a GIF smaller?', a: 'GIF file size depends on frames, canvas size, colors, and duration. To make a GIF smaller: reduce canvas size, increase frame duration, lower Quality/Colors (try 64 or 32), use fewer frames, and enable Optimize for smaller file size.' },
    { q: 'Can I make a GIF from a video?', a: 'This tool builds GIFs from still images. To convert MP4 or other video clips to GIF, use our Video to GIF tool — it is optimized for short video segments.' },
    { q: 'Is there a GIF maker for Mac?', a: 'Yes. NanoImage runs in Safari, Chrome, and other browsers on Mac, Windows, and Linux. No app install — open the page and create GIFs locally with no server upload.' },
    { q: 'Can I add text to my GIF?', a: 'Create your GIF here, then add captions with Add Text to Image, or use Meme Generator for classic top-and-bottom meme layouts on still images before animating.' },
    { q: 'What is the best free GIF maker app?', a: 'NanoImage is a free online GIF maker with no signup, no watermark, and private browser processing — a solid choice when you want a simple image-to-GIF workflow without desktop software.' },
    { q: 'How many images can I use?', a: 'You can add up to 50 images as frames per GIF. For smaller files, use fewer frames or resize images first with Resize Image.' },
    { q: 'Does NanoImage add a watermark?', a: 'No. Exported GIFs have no NanoImage watermark. Your frames are processed in your browser and are not stored on our servers.' },
  ],
  'meme-generator': [
    { q: 'What can I make with Meme Generator?', a: 'You can add top and bottom text to an image or meme template.' },
    { q: 'Can I upload my own image?', a: 'Yes. You can use your own image as the meme background.' },
    { q: 'Are meme templates free to use?', a: 'Only templates with proper rights should be used. Custom or licensed templates are safest.' },
  ],
  'image-collage': [
    { q: 'Is Image Collage the same as Photo Grid?', a: 'No. Image Collage is a freeform editor — drag photos, add frames, text, and stickers on one canvas. Photo Grid uses fixed grid layouts for evenly spaced tiles. Use Collage for creative posters; use Photo Grid for uniform grids.' },
    { q: 'What can I add to a collage?', a: 'You can add multiple photos, overlay text, stickers, collage frames, custom backgrounds, captions, and spacing or corner-radius controls. Templates include Classic, Polaroid, Film Strip, Scrapbook, and more.' },
    { q: 'Can it run in the browser?', a: 'Yes. The collage editor runs entirely in your browser. Your photos are not uploaded to NanoImage servers, so they stay private.' },
    { q: 'How do I add frames to my collage?', a: 'Select any image on the canvas, then choose a frame style from the Templates panel. Apply collage frames like Classic, Polaroid, Film Strip, and more — each adjustable with spacing and corner radius.' },
    { q: 'Can I make a collage poster for Instagram?', a: 'Yes. Choose Instagram Post (1080 × 1080) for square feed posts, or Portrait (1080 × 1350) for Stories-style layouts. Add text and stickers, then download a ready-to-share image collage poster.' },
    { q: 'What is the best way to make a wall collage?', a: 'Upload all your wall collage images, pick a layout template, and adjust spacing to your taste. Download a high-quality PNG ready for print or sharing — no signup required.' },
    { q: 'Is this the best free image collage app online?', a: 'NanoImage collage maker is 100% free, requires no signup, adds no watermark, and runs entirely in your browser — one of the most private and accessible free online collage tools available.' },
  ],
  'photo-grid': [
    { q: 'What is Photo Grid?', a: 'Photo Grid is a free photo grid generator that combines multiple images into one evenly spaced layout — like a photo grid collage or grid photo frame. Upload photos, pick a grid size, and download.' },
    { q: 'Can I adjust spacing and borders?', a: 'Yes. Adjust spacing, border width, corner radius, background color, and aspect ratio (1:1, 4:5, 16:9, 9:16) to customize your grid photo frame.' },
    { q: 'What can I use a photo grid for?', a: 'Instagram posts, product comparisons, travel highlights, before/after sets, photo grid scrapbooks, and any grid of photos you need for social or print.' },
    { q: 'Is the photo grid maker free?', a: 'Yes. NanoImage photo grid online is 100% free — no signup, no watermark, and no app download. Everything runs in your browser.' },
    { q: 'What grid sizes are available?', a: 'Choose from 1×1, 2×2, 3×3, 4×4, and more layouts (up to 4×4). Upload up to 20 photos and the grid fills automatically.' },
  ],
  'remove-exif': [
    { q: 'How do I remove EXIF data from a photo?', a: 'Upload your photo to NanoImage, choose whether to remove all EXIF metadata or location only, pick an output format, and click Remove EXIF. Download the clean file instantly — everything runs in your browser with no upload to our servers.' },
    { q: 'What is EXIF data?', a: 'EXIF is hidden image metadata embedded in photos. It can include GPS location, camera model, lens info, date and time, and device settings — details you may not want to share online.' },
    { q: 'Does removing EXIF data affect image quality?', a: 'Usually no. EXIF removal strips hidden metadata, not the visible pixels. Your photo should look the same while being safer to share.' },
    { q: 'How to remove EXIF data from photos on iPhone or Android?', a: 'On iPhone, you can share without metadata in some apps, or use an online EXIF remover. On Android, gallery apps vary. For any device, NanoImage\'s free EXIF remover works in your mobile browser without uploading files to a server.' },
    { q: 'What is the best free EXIF data remover online?', a: 'NanoImage offers a free, browser-based EXIF remover that processes images locally on your device — no account, no watermarks, and no server upload — making it one of the most privacy-friendly options available.' },
    { q: 'Does removing EXIF data change the file size?', a: 'Yes, slightly. EXIF metadata adds a small amount of data. After removal, file size typically decreases by a few kilobytes depending on how much metadata was stored.' },
    { q: 'Does it remove all metadata?', a: 'NanoImage removes common EXIF data through browser re-export. For highly sensitive files, preview the result and verify GPS and camera fields are cleared before sharing.' },
    { q: 'What EXIF data can be removed?', a: 'You can strip GPS location, camera and lens information, capture date and time, and related device settings. Removing all EXIF is recommended before posting to social media, marketplaces, or news sites.' },
  ],
  'blur-image': [
    { q: 'How do I blur only part of an image?', a: 'Upload your photo, select the brush tool, paint over the area you want to blur, adjust blur strength, and click Download. You can blur any specific region, object, or person in your image.' },
    { q: 'Can I blur a face in an image for free?', a: 'Yes. Upload your photo, use the brush to paint over the face, adjust strength, and download. It is completely free with no signup required — processed in your browser.' },
    { q: 'What is the best free image blurring tool online?', a: 'NanoImage lets you blur any area of an image online for free — no app download or account needed. Your image is processed locally and never uploaded to a server.' },
    { q: 'Can I blur the edges of an image?', a: 'Yes. Use the brush near the edges of your photo and apply the blur effect. Adjust hardness and strength for a soft or strong edge blur.' },
    { q: 'How do I clear or remove blur from an image?', a: 'Before downloading, use Undo to reverse recent blur strokes. Once you export the file, blurred areas generally cannot be restored — always keep a copy of the original.' },
    { q: 'What should I blur in a photo?', a: 'Common targets include faces, license plates, street addresses, usernames, chat screenshots, IDs, and other private details before sharing online.' },
    { q: 'Does blurring an image reduce quality?', a: 'Only in the areas you blur. The rest of the image stays sharp. Increase blur strength until sensitive details are unreadable.' },
    { q: 'Is this blur tool private and free?', a: 'Yes. NanoImage is 100% free with no watermarks. All editing runs in your browser — your files never leave your device.' },
  ],
  'pixelate-image': [
    { q: 'How do I un-pixelate an image?', a: 'This tool adds mosaic pixelation to selected areas — it cannot restore original detail from an already pixelated photo. Always keep your unedited original. To hide details with soft edges instead of blocks, try Blur Image. For brightness and clarity tweaks on photos you own, try Enhance Image.' },
    { q: 'Can I de-pixelate an image with this tool?', a: 'No. NanoImage pixelates regions you paint with the brush; it does not reverse existing pixelation. Use Undo before downloading if you are still editing. For privacy masking, see Blur Image or Remove EXIF.' },
    { q: 'How do I fix a pixelated image?', a: 'If a photo was pixelated on purpose, you generally cannot recover sharp detail from the exported file. Re-open your original if you have one. To avoid accidental whole-image pixelation, use the brush to select only the area you need.' },
    { q: 'How can I make an image less pixelated?', a: 'Exported pixelated areas cannot be smoothed back to full quality. While editing, use Undo or Clear Selection. For future edits, use smaller pixel blocks or try Blur Image for a softer hide effect.' },
    { q: 'Can I pixelate an image for free?', a: 'Yes. NanoImage is 100% free with no signup. Upload JPG, PNG, WebP, or GIF, paint the area, adjust pixel size, and download — all in your browser with no server upload.' },
    { q: 'What is the difference between pixelate and blur?', a: 'Pixelate uses mosaic blocks. Blur softens details. Both can hide sensitive information — pixelate is stronger for IDs and text; blur looks more natural for faces and backgrounds.' },
    { q: 'Can I adjust pixel size?', a: 'Yes. Use the Pixel Size slider or presets (Light, Medium, Strong, Extreme). Larger blocks hide details more strongly.' },
    { q: 'When should I use pixelate?', a: 'Use it for faces, license plates, addresses, account names, QR codes, or document numbers before sharing screenshots or documents online.' },
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
    id: 'ai-tools',
    title: 'AI tools',
    tone: 'violet',
    description: 'On-device AI — models run in your browser, images never leave your device.',
    icon: '✦',
    viewAllLabel: 'View all AI tools',
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
    slug: 'compress-image-to-100kb',
    name: 'Compress Image to 100KB',
    category: 'optimize-images',
    description: 'Automatically compress JPG, PNG or WebP images to under 100KB in your browser.',
    keywords: ['compress image to 100kb', '100kb image compressor', 'reduce image to 100kb', 'photo under 100kb'],
    mvp: true,
    title: 'Compress Image to 100KB Online for Free',
    subtitle: 'Automatically compress images to under 100KB. No upload, no signup. 100% private in your browser.',
    tips: ['Ideal for online forms, avatars, school portals and small thumbnails.', 'JPG or WebP usually reach the target with best balance.'],
  },
  {
    slug: 'compress-image-to-200kb',
    deprecated: true, // PRD Phase 1: 程序化定值页收敛,保留 100kb,其余并入主压缩页
    name: 'Compress Image to 200KB',
    category: 'optimize-images',
    description: 'Automatically compress images to under 200KB for visa, passport, ID and document uploads.',
    keywords: ['compress image to 200kb', '200kb image compressor', 'reduce image to 200kb', 'photo under 200kb'],
    mvp: true,
    title: 'Compress Image to 200KB Online for Free',
    subtitle: 'Compress photos and documents to under 200KB while keeping them clear. Private, in-browser, no upload.',
    tips: ['Best for visa/passport/ID photos and scanned forms.', 'Keep text readable; use JPG for photos, PNG/WebP when transparency or crisp lines matter.'],
  },
  {
    slug: 'compress-image-to-500kb',
    deprecated: true, // PRD Phase 1: 程序化定值页收敛
    name: 'Compress Image to 500KB',
    category: 'optimize-images',
    description: 'Automatically reduce images to under 500KB for email, blog, CMS and product photos.',
    keywords: ['compress image to 500kb', '500kb image compressor', 'reduce image to 500kb', 'photo under 500kb'],
    mvp: true,
    title: 'Compress Image to 500KB Online for Free',
    subtitle: 'Reduce images to under 500KB for email, websites and product uploads. Automatic quality balance in browser.',
    tips: ['Great for blog images, email attachments and ecommerce product photos.', 'WebP often gives smaller size with good quality for web; resize large photos to ~1920px wide.'],
  },
  {
    slug: 'compress-image-to-1mb',
    deprecated: true, // PRD Phase 1: 程序化定值页收敛
    name: 'Compress Image to 1MB',
    category: 'optimize-images',
    description: 'Automatically compress phone photos and images to under 1MB for sharing and uploads.',
    keywords: ['compress image to 1mb', '1mb image compressor', 'reduce image to 1mb', 'photo under 1mb'],
    mvp: true,
    title: 'Compress Image to 1MB Online for Free',
    subtitle: 'Compress large phone photos to under 1MB without visible quality loss. Private browser processing.',
    tips: ['Perfect for social sharing, HR uploads, chat apps and phone photo libraries.', 'JPG is safe default; WebP for further reduction; very large 12MP+ photos may auto-resize.'],
  },
  {
    slug: 'resize-image',
    name: 'Resize Image Online – Free & Instant',
    category: 'optimize-images',
    description: 'Change image dimensions by pixels or percentage.',
    keywords: ['resize', 'dimensions', 'width', 'height', 'scale', 'kb', 'mb', 'bulk', 'free'],
    mvp: true,
    title: 'Resize Image Online – Pixels, %, MB & KB',
    subtitle:
      'Free online image resizer. Resize images by pixels, percentage, or target file size (KB/MB). Supports JPG, PNG, WebP and GIF. No signup required, 100% private.',
    tips: [
      'Keep aspect ratio on to avoid stretching.',
      'Use presets for 512×512, HD (1280×720), or Full HD (1920×1080).',
      'Need an exact KB or MB? Try Compress Image after resizing.',
      'Use JPG or WebP for smaller files; PNG keeps transparency.',
    ],
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
    name: 'Free Image Upscaler – Enlarge Photos Online Without Losing Quality',
    category: 'optimize-images',
    description: 'Make your images larger and sharper in your browser.',
    keywords: [
      'image upscaler',
      'upscale images online',
      'upscale image free',
      'best free image upscaler',
      'anime image upscaler',
      'ai image upscaler',
      'batch image upscaler',
      'enlarge image',
      '2x 3x 4x',
    ],
    mvp: true,
    badge: 'NEW',
    title: 'Free Image Upscaler – Enlarge Images Online',
    subtitle:
      'Upscale images online for free — no sign up, no upload to server. Enlarge photos 2x, 3x, 4x with sharpening controls. Works in your browser, 100% private.',
    tips: ['Use 2x or 3x for the best everyday results.', 'Smooth resampling works best for photos.', 'Sharp resampling works best for text and edges.'],
  },
  {
    slug: 'crop-image',
    name: 'Crop Image Online',
    category: 'edit-images',
    description: 'Crop images by ratio, pixels, or multiple areas.',
    keywords: ['crop', 'ratio', 'pixels', 'square'],
    mvp: true,
    title: 'Crop Image Online Free – Bulk, Auto & Pixel-Perfect',
    subtitle:
      'Free online crop image tool. Crop by pixels, set aspect ratio (1:1, 4:3, 16:9), or batch crop multiple areas at once. Supports PNG, JPG, WebP. No signup, no upload — runs in your browser.',
    tips: ['Set crop values manually for precise exports.', 'Use PNG if you need a lossless result.'],
  },
  {
    slug: 'passport-photo',
    name: 'Passport Photo Maker',
    category: 'edit-images',
    description: 'Create passport, visa, ID, and exam photos with exact size presets.',
    keywords: [
      'passport photo maker',
      '2x2 passport photo',
      '35x45mm photo',
      'visa photo maker',
      'id photo maker',
      'photo under 50kb',
      '600x600 passport photo',
    ],
    mvp: true,
    badge: 'NEW',
    title: 'Passport Photo Maker Online - Free, Private & No Uploads',
    subtitle:
      'Create passport, visa, and ID photos online. Choose a preset, align your face with guides, set a background, and download instantly. No uploads.',
    tips: [
      'Choose the preset that matches your document or application portal.',
      'Keep your face straight, evenly lit, and centered between the crop guides.',
      'Use the largest file-size limit your portal allows for better quality.',
    ],
  },
  {
    slug: 'rotate-image',
    name: 'Rotate Image Online — Free, Fast & Private',
    category: 'edit-images',
    description: 'Rotate photos left, right, or by a custom angle.',
    keywords: ['rotate', 'angle', 'turn', 'flip', '90', 'free', 'online'],
    mvp: true,
    title: 'Free Rotate Image Online – Any Angle, No Signup',
    subtitle:
      'Rotate images online for free — 90°, 180°, or any custom angle. Flip, crop, and download instantly. No signup, no upload to servers. Works in your browser.',
    tips: [
      'Use 90° buttons for quick rotation.',
      'Use the angle slider for precise custom rotation.',
      'Flip horizontally or vertically in the same tool.',
      'Pick a background color if corners appear after rotation.',
    ],
  },
  {
    slug: 'flip-image',
    name: 'Flip Image Online for Free',
    category: 'edit-images',
    description: 'Flip images horizontally, vertically, or both.',
    keywords: ['flip', 'mirror', 'horizontal', 'vertical', 'free', 'online'],
    mvp: true,
    title: 'Flip Image Online Free – Image Flipper & Mirror Tool',
    subtitle:
      'Flip images online for free. Mirror JPG, PNG, WebP, or GIF files horizontally, vertically, or both in seconds. No signup, no watermark, private browser processing.',
    tips: [
      'Use horizontal flip to fix mirror selfies and front-camera photos.',
      'Use vertical flip for upside-down scans or design layouts.',
      'Flip both axes for a 180°-style mirror without changing angle metadata.',
      'Your original file never leaves your device.',
    ],
  },
  {
    slug: 'add-text',
    name: 'Add Text to Image Online — Free & Instant',
    category: 'edit-images',
    description: 'Place simple text on your image.',
    keywords: ['text', 'caption', 'font', 'label', 'photo', 'free', 'online'],
    mvp: true,
    title: 'Add Text to Image Online — Free Photo Text Editor',
    subtitle:
      'Add text to your photos and images online — free, no signup required. Choose fonts, colors, and effects. Works with JPG, PNG, WebP, and GIF. No upload needed.',
    tips: [
      'Use high contrast between text and the background.',
      'Add shadow or outline so captions stay readable.',
      'Match fonts to your photo style — social, poster, or document.',
      'Keep important text away from image edges.',
    ],
  },
  {
    slug: 'change-background',
    name: 'Change Image Background Color Online — Free Tool',
    category: 'edit-images',
    description: 'Change transparent image backgrounds.',
    keywords: ['background', 'transparent', 'color', 'white', 'free', 'online'],
    mvp: true,
    title: 'Change Image Background Color Online — Free & No Signup',
    subtitle:
      'Change image background color, swap to white, add gradients, or upload a custom image — free online. No signup. Works in your browser. JPG, PNG, WebP supported.',
    tips: [
      'Use a high-resolution image for cleaner edges.',
      'Clear subject edges work best for color replacement.',
      'Try white, transparent, gradient, or custom image backgrounds.',
      'Your file never leaves your device.',
    ],
  },
  {
    slug: 'enhance-image',
    name: 'Free Online Image Enhancer – No Sign Up Required',
    category: 'edit-images',
    description: 'Adjust brightness, contrast, and color.',
    keywords: ['enhance', 'brightness', 'contrast', 'saturation', 'free', 'online', 'ai enhancer'],
    mvp: true,
    title: 'Free AI Image Enhancer Online – Brightness, Contrast & Filters',
    subtitle:
      'Adjust brightness, contrast, saturation, sharpness, and more — all in your browser. Free image enhancer with no sign up, no uploads to server, and instant results.',
    tips: [
      'Adjust sliders for natural-looking improvements.',
      'Use Before/After compare to preview changes.',
      'Try Auto Enhance or filter presets for one-click results.',
      'Your images never leave your device.',
    ],
  },
  {
    slug: 'change-color',
    // PRD Phase 2: title 对齐 Bing 最大需求词形 "image color changer"(72 展示, CTR 5.56%)
    name: 'Image Color Changer – Change Image Color Online Free',
    category: 'edit-images',
    description: 'Replace, tint, or swap any color in an image.',
    keywords: ['image color changer', 'change image color', 'image colour changer', 'change color of image', 'color changer', 'replace color', 'tint', 'online', 'free'],
    mvp: true,
    title: 'Image Color Changer – Change Image Color Online Free',
    subtitle:
      'Free image color changer — replace, tint, or swap any color in a photo online. Change object or background colors, no signup, 100% in your browser.',
    tips: [
      'Use high-resolution images for cleaner edges.',
      'Select areas carefully for accurate color replacement.',
      'Try different colors from the palette or picker.',
      'Your file never leaves your device.',
    ],
  },
  {
    slug: 'black-and-white-image',
    // PRD Phase 2 颜色集群子页: black and white image converter (Bing 23) / make image black and white (Bing 32)
    name: 'Black and White Image Converter – Free Online',
    category: 'edit-images',
    description: 'Convert any photo to black and white online.',
    keywords: ['black and white image converter', 'make image black and white', 'convert image to black and white', 'grayscale image', 'black and white photo', 'free', 'online'],
    mvp: true,
    title: 'Black and White Image Converter – Make a Photo B&W Free',
    subtitle:
      'Make any image black and white online — free, instant, no signup. Convert color photos to classic grayscale in your browser; files never leave your device.',
    tips: [
      'High-contrast photos convert best to black and white.',
      'Export as PNG for lossless quality or JPG for smaller files.',
      'Pair with Enhance Image to fine-tune brightness and contrast after converting.',
      'Your photo never leaves your device.',
    ],
  },
  {
    slug: 'invert-image-colors',
    // PRD Phase 2 颜色集群子页: invert colors online; 俄语需求 инверсия цвета онлайн (GSC 344 展示)
    name: 'Invert Image Colors Online – Free Color Inverter',
    category: 'edit-images',
    description: 'Invert the colors of any image to create a negative.',
    keywords: ['invert image colors', 'invert colors online', 'color inverter', 'negative image', 'invert photo', 'free', 'online'],
    mvp: true,
    title: 'Invert Image Colors Online Free – Photo Negative Maker',
    subtitle:
      'Invert colors of any image online — free, one click, no signup. Create a photo negative effect in your browser; files never leave your device.',
    tips: [
      'Inverting twice restores the original image.',
      'Great for checking scanned film negatives and creating art effects.',
      'Export as PNG to keep exact inverted colors.',
      'Your photo never leaves your device.',
    ],
  },
  {
    slug: 'convert-image',
    name: 'Free Image Converter – Convert JPG, PNG, WebP & More Online',
    category: 'convert-formats',
    description: 'Convert images to PNG, JPG, or WebP.',
    keywords: ['convert', 'format', 'jpg', 'png', 'webp', 'bmp', 'free', 'online'],
    mvp: true,
    title: 'Convert Image Online Free – JPG, PNG, WebP, BMP & More',
    subtitle:
      'Convert JPG to PNG, PNG to WebP, BMP to JPG, and 20+ more formats — free, instant, no signup needed. Try it now — 100% private, works in your browser.',
    tips: [
      'Upload up to 20 images and convert in one batch.',
      'WebP often gives the smallest file size for the web.',
      'Use PNG when you need transparency or lossless edges.',
      'Your files never leave your device.',
    ],
  },
  {
    slug: 'convert-to-webp',
    name: 'Convert JPG, PNG & JPEG to WebP — Free Online Converter',
    category: 'convert-formats',
    description: 'Make images smaller and web-ready.',
    keywords: [
      'webp',
      'jpg to webp',
      'jpeg to webp',
      'png to webp',
      'gif to webp',
      'svg to webp',
      'avif to webp',
      'convert to webp',
      'webp converter',
      'free',
      'online',
    ],
    mvp: true,
    title: 'Convert JPG, PNG & JPEG to WebP Online Free',
    subtitle:
      'Free online JPG to WebP converter. Also supports PNG, JPEG, GIF, SVG and AVIF. No signup, no upload limits — convert images to WebP instantly in your browser.',
    tips: [
      'WebP often cuts file size by 25–80% versus JPG or PNG.',
      'Use quality around 85% for photos; 90–100% for graphics with text.',
      'Batch convert up to 20 images and download as a ZIP.',
      'Your files never leave your device.',
    ],
  },
  {
    slug: 'png-to-webp',
    name: "PNG to WebP Converter — Free, Local, No Upload",
    category: 'convert-formats',
    description: "Convert PNG to WebP in your browser.",
    keywords: ["png to webp", "png to webp converter", "convert png to webp", "transparent png to webp", "batch png to webp", "webp converter"],
    mvp: true,
    badge: 'NEW',
    title: "PNG to WebP Converter — Free, Local, No Upload",
    subtitle:
      "Convert PNG to WebP in your browser. Batch files, quality control, ZIP download. Free, no upload, no signup — private WebP conversion on NanoImage.",
    tips: ["Transparent PNGs keep their alpha channel in WebP.", "Batch up to 20 PNGs and download as files or a ZIP.", "Quality around 80–90% suits photos; go higher for sharp UI art."],
  },
  {
    slug: 'jpg-to-webp',
    name: "JPG to WebP Converter — Free Local JPEG→WebP",
    category: 'convert-formats',
    description: "Convert JPG/JPEG to WebP in your browser.",
    keywords: ["jpg to webp", "jpeg to webp", "jpg to webp converter", "convert jpg to webp", "batch jpg to webp", "webp converter"],
    mvp: true,
    badge: 'NEW',
    title: "JPG to WebP Converter — Free Local JPEG→WebP",
    subtitle:
      "Convert JPG/JPEG to WebP in your browser. Batch convert, quality control, no upload. Free WebP converter for photos on NanoImage.",
    tips: ["WebP usually beats JPEG on file size at similar visual quality.", "Batch up to 20 JPGs and download as files or a ZIP.", "Metadata such as EXIF is stripped during conversion."],
  },
  {
    slug: 'jpg-to-bmp',
    name: "JPG to BMP Converter — Free, Local, No Upload",
    category: 'convert-formats',
    description: "Convert JPG/JPEG to an uncompressed BMP.",
    keywords: ["jpg to bmp", "jpeg to bmp", "jpg to bmp converter", "convert jpg to bmp", "jpeg to bitmap"],
    mvp: true,
    badge: 'NEW',
    title: "JPG to BMP Converter — Free, Local, No Upload",
    subtitle:
      "Convert JPG or JPEG to BMP in your browser. Free, no upload, no signup — private local conversion on NanoImage.",
    tips: ["Output is uncompressed 24-bit BMP, so files are larger than the JPG.", "Batch up to 20 files and download as files or a ZIP.", "Need smaller files? Use JPG to WebP or Compress Image instead."],
  },
  {
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    category: 'convert-formats',
    description: 'Combine images into a single PDF file.',
    keywords: ['pdf', 'document', 'combine', 'pages'],
    mvp: true,
    title: 'Image to PDF Converter – Free & No Signup',
    subtitle: 'Convert JPG, PNG, WebP or GIF images to PDF online. Free, no ads, no signup needed.',
    tips: ['Upload images in the order you want pages to appear.', 'A4 portrait is a good default for documents.'],
  },
  {
    slug: 'gif-maker',
    name: 'Free GIF Maker — Create Animated GIFs from Images Online',
    category: 'create-more',
    description: 'Create animated GIFs from images.',
    keywords: [
      'gif maker',
      'free gif maker',
      'make a gif',
      'make a gif smaller',
      'make gif file size smaller',
      'make mp4 to gif',
      'gif maker mac',
      'best gif maker app',
      'meme maker gif',
      'animated gif',
    ],
    mvp: true,
    // PRD Phase 3: gif maker free Bing 74 展示 0 点击 (pos 9.5), 加 No Watermark 钩子
    title: 'Free GIF Maker — No Watermark, Create Animated GIFs Online',
    subtitle:
      'Free GIF maker with no watermark and no signup. Turn images into animated GIFs in seconds — adjust speed, size, and loops. Works on Mac, Windows, and mobile.',
    tips: ['Use fewer frames and smaller canvas size for lighter GIFs.', 'Enable Optimize and lower colors (64 or 32) to shrink file size.', 'Reorder frames with the arrow controls before exporting.'],
  },
  {
    slug: 'gif-compressor',
    name: "GIF Compressor — Compress GIF to 10MB Locally",
    category: 'create-more',
    description: "Compress animated GIFs to fit size limits.",
    keywords: ["gif compressor", "compress gif", "gif compressor to 10mb", "compress gif for discord", "reduce gif size", "gif compressor 5mb"],
    mvp: true,
    badge: 'NEW',
    title: "GIF Compressor — Compress GIF to 10MB Locally",
    subtitle:
      "Compress GIF to 10MB (or Discord ~8MB, 5MB, 512KB, 256KB) in your browser. Quality, frame, and palette controls. Free, no upload, no signup.",
    tips: ["Pick a target-size preset: Discord, 10MB, 5MB, 512KB or 256KB.", "Lower the scale, skip frames or cut the palette (64 or 32) to shrink a GIF the most.", "Need to make a GIF from images first? Use GIF Maker, then compress."],
  },
  {
    slug: 'meme-generator',
    deprecated: true, // PRD Phase 1: 与 Add Text 意图重叠,功能并入 /add-text
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
    name: 'Free Image Collage Maker Online',
    category: 'create-more',
    description: 'Create custom collages with photos, frames, text, and stickers.',
    keywords: [
      'image collage',
      'image collage maker',
      'free image collage',
      'collage frames',
      'collage maker online',
      'photo collage',
      'wall collage',
      'instagram collage',
    ],
    mvp: true,
    title: 'Free Image Collage Maker — Add Frames, Text & Stickers Online | NanoImage',
    subtitle:
      'Create stunning image collages online — add frames, text, stickers, and backgrounds. Free collage maker, no signup required. Works in your browser, photos stay private.',
    tips: ['Drag images on the canvas to position them.', 'Use Instagram Post (1080 × 1080) for social-ready exports.', 'Try Classic, Polaroid, or Film Strip templates for collage frames.'],
  },
  {
    slug: 'photo-grid',
    deprecated: true, // PRD Phase 1: 与 Collage 意图重叠,并入 /image-collage(注意:grid-maker 保留)
    name: 'Free Photo Grid Maker Online',
    category: 'create-more',
    description: 'Combine multiple photos into a clean grid layout online.',
    keywords: [
      'photo grid online',
      'free photo grid',
      'photo grid generator',
      'photo grid collage',
      'grid photo frame',
      'grid of photos',
      'photo grid maker',
    ],
    mvp: true,
    title: 'Free Photo Grid Maker Online – Create Grid Collages Instantly | NanoImage',
    subtitle:
      'Create a free photo grid online in seconds. Arrange multiple photos into 2×2, 3×3, 4×4 and more grid layouts. No signup required — works in your browser.',
    tips: ['Use 2×2 or 3×3 for Instagram posts.', 'Drag photos inside cells to reposition.', 'Adjust spacing and border for a polished grid photo frame.'],
  },
  {
    slug: 'grid-maker',
    name: 'Free Online Grid Maker for Drawing',
    category: 'create-more',
    description: 'Add a drawing grid to a photo or create a blank printable grid for art practice.',
    keywords: [
      'free online grid maker',
      'grid maker',
      'grid maker for drawing',
      'drawing grid maker',
      'drawing grid generator',
      'add grid to photo',
      'photo grid for drawing',
      'grid overlay tool',
      'artist grid generator',
      'printable grid maker',
      'blank grid maker',
      'grid method drawing',
      'scale drawing grid',
      'portrait grid maker',
      'mural grid maker',
      'isometric grid maker',
      'triangular grid maker',
    ],
    mvp: true,
    badge: 'NEW',
    title: 'Free Online Grid Maker for Drawing | NanoImage',
    subtitle:
      'Create a free drawing grid online. Upload a reference photo or make a blank printable grid, customize rows, columns, labels, colors, and opacity, then export PNG, JPG, or PDF. No signup, no upload.',
    tips: ['Use a 4×4 or 6×6 grid for quick sketching.', 'Turn labels on to reference cells like C3 while drawing.', 'Use blank grid mode to print worksheet-style grid paper.'],
  },
  {
    slug: 'remove-exif',
    name: 'EXIF Remover – Remove EXIF Data from Photos Online',
    category: 'privacy-protection',
    description: 'Remove image metadata for better privacy.',
    keywords: [
      'exif remover',
      'remove exif',
      'remove exif data',
      'remove exif data from photo',
      'exif metadata',
      'gps location',
      'privacy',
      'free',
      'online',
    ],
    mvp: true,
    title: 'EXIF Remover – Remove EXIF Data from Photos Online Free',
    subtitle:
      'Free online EXIF remover. Remove EXIF data from photos in seconds — strip GPS location, camera info, and date. No upload, processed in your browser. JPG, PNG, WebP supported.',
    tips: ['Canvas re-export removes most image metadata.', 'Some color profiles may also be removed.'],
  },
  {
    slug: 'blur-image',
    name: 'Blur Image Online – Free Image Blurring Tool',
    category: 'privacy-protection',
    description: 'Blur an image before sharing it.',
    keywords: [
      'blur image',
      'blur image free',
      'blur images online',
      'blur part of an image',
      'blur image face',
      'image blurring tool',
      'clear blur image',
      'blur edges of image',
      'free',
      'online',
    ],
    mvp: true,
    // PRD Phase 3: Bing 110 展示 0 点击 (pos ~8), CTR 钩子: 秒级 + 隐私
    title: 'Blur Image Online Free – Blur Faces & Backgrounds in Seconds',
    subtitle:
      'Blur faces, license plates, or backgrounds in seconds — free, no upload, no signup. Your photo never leaves your browser, so private images stay private.',
    tips: ['Use the brush to blur only the areas you need.', 'Increase blur strength until sensitive details are unreadable.', 'Keep a copy of the original before downloading.'],
  },
  {
    slug: 'pixelate-image',
    name: 'Pixelate Image Free — Online Pixelator Tool',
    category: 'privacy-protection',
    description: 'Pixelate images to hide sensitive details.',
    keywords: [
      'pixelate image',
      'pixelate image free',
      'pixelate image online',
      'pixelated images free',
      'un pixelate an image',
      'de pixelate image',
      'fix a pixelated image',
      'image to pixelated',
      'mosaic',
      'privacy',
    ],
    mvp: true,
    // PRD Phase 3: 覆盖 image pixelator (Bing 22 展示) 词形
    title: 'Pixelate Image Online Free — Fast Image Pixelator, No Upload',
    subtitle:
      'Free image pixelator — censor faces, license plates, or sensitive info with a pixelated mosaic in seconds. No upload, no signup, works in your browser.',
    tips: ['Use the brush to pixelate only the areas you need.', 'Larger pixel blocks hide text and IDs more strongly.', 'Keep a copy of the original before downloading.'],
  },
  {
    slug: 'add-watermark',
    name: 'Add Watermark to Image',
    category: 'privacy-protection',
    description: 'Add text or logo watermarks to photos online.',
    keywords: ['watermark', 'copyright', 'protect'],
    mvp: true,
    title: 'Add Watermark to Image — Free Online',
    subtitle:
      'Free online watermark tool — add text or logo watermarks to photos in seconds. No signup, no upload, runs in your browser. JPG, PNG, WebP, GIF.',
    tips: ['Use low opacity for subtle copyright marks.', 'Corner positions keep the main subject visible.'],
  },
  {
    slug: 'background-remover',
    name: 'AI Background Remover',
    category: 'ai-tools',
    description: 'Remove the background with on-device AI — download a transparent PNG. No upload.',
    keywords: ['background remover', 'remove background', 'transparent png', 'remove bg', 'on-device background removal', 'ai background remover'],
    mvp: true,
    badge: 'AI',
    title: 'Free AI Background Remover Online',
    subtitle:
      'Remove the background from JPG, PNG, and WebP images directly in your browser. Your photo stays on your device — download a transparent PNG with no signup, no upload, and no watermark.',
    tips: ['First use downloads the AI model (~168 MB) once; it is cached for offline reuse.', 'Use WebGPU-capable browsers (Chrome, Edge) for the fastest results.'],
  },
  {
    slug: 'object-remover',
    name: 'Object Remover',
    category: 'ai-tools',
    description: 'Paint over objects, people, or watermarks and erase them with smart edge-fill.',
    keywords: ['object remover', 'remove object from photo', 'remove watermark', 'inpainting', 'erase object', 'remove people from photos'],
    mvp: true,
    badge: 'AI',
    title: 'Remove Objects from Photos Online — Free',
    subtitle:
      'Paint over people, objects, or watermarks and let smart edge-fill restore the background — on-device, no upload, no signup.',
    tips: ['Use a smaller brush for precise edges.', 'Run several passes for large objects — erase a bit at a time.'],
  },
  {
    slug: 'photo-restore',
    name: 'Photo Restore',
    category: 'ai-tools',
    description: 'Enhance old or faded photos and colorize black-and-white pictures on-device.',
    keywords: ['photo restore', 'restore old photos', 'colorize black and white photo', 'photo enhancement', 'fix old photo'],
    mvp: true,
    badge: 'AI',
    title: 'Restore & Colorize Old Photos Online — Free',
    subtitle:
      'Enhance old or faded photos and add color to black-and-white pictures — all on-device, no upload, no signup.',
    tips: ['Scan photos at 300 DPI or higher for the best restoration.', 'Restore first, then colorize for the most natural result.'],
  },
  {
    slug: 'smart-crop',
    deprecated: true, // PRD Phase 1: Crop + Blur 组合功能,拆并入两个主工具页
    name: 'Smart Crop & Blur',
    category: 'ai-tools',
    description: 'Auto-crop to keep the subject in frame, or add depth-of-field background blur.',
    keywords: ['smart crop', 'auto crop', 'background blur', 'portrait blur', 'depth of field', 'content aware crop'],
    mvp: true,
    badge: 'AI',
    title: 'Smart Crop & Background Blur Online — Free',
    subtitle:
      'Auto-crop to keep the subject in frame, or add a depth-of-field background blur — on-device, no upload, no signup.',
    tips: ['Pick an aspect ratio preset and let smart crop find the best frame.', 'Portrait blur works best with a clear person in the photo.'],
  },
  {
    slug: 'video-to-gif',
    name: 'Video to GIF',
    category: 'video-tools',
    description: 'Convert a video clip to an animated GIF.',
    keywords: ['video', 'gif', 'convert', 'mp4', 'animation'],
    mvp: true,
    badge: 'GIF',
    title: 'Video to GIF Converter Online for Free',
    subtitle: 'Convert a part of your video to a high-quality GIF. All processing happens in your browser.',
    tips: ['Short clips under 15 seconds work best.', 'Lower FPS and smaller width create smaller GIFs.'],
  },
  {
    slug: 'video-to-mp3',
    deprecated: true, // PRD Phase 1: 纯音频工具偏离图片主题,删除并 301 至首页
    name: 'Video to MP3',
    category: 'video-tools',
    description: 'Extract MP3 audio from your video files.',
    keywords: ['video', 'mp3', 'audio', 'extract', 'mp4'],
    mvp: true,
    badge: 'MP3',
    title: 'Video to MP3 Converter Online for Free',
    subtitle: 'Extract high-quality MP3 audio from your videos in seconds.',
    tips: ['192 kbps is recommended for most users.', 'Trim only the audio section you need to save time.'],
  },
]

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-resize-and-crop-a-gif",
    category: "Tips",
    title: "How to Resize and Crop a GIF Without Breaking the Animation",
    excerpt: "Resize an animated GIF in your browser and keep the loop, plus honest options for cropping a GIF and adding a caption. Free, no upload, step by step.",
    date: '2026-10-06',
    readTime: "6 min read",
    metaDescription: "Resize an animated GIF in your browser and keep the loop, plus honest options for cropping a GIF and adding a caption. Free, no upload, step by step.",
    coverImage: '/blog/before-after-gif-resize.png',
    body: "**The question:** \"How do I resize or crop a GIF without breaking the animation? Every editor I try gives me back a still image.\"\n\n**The short answer:** To resize an animated GIF, use a tool that rewrites every frame, not just the first one. In NanoImage that's the [GIF Compressor](/gif-compressor): drag the Scale slider (50% turns an 800px GIF into a 400px one) and download. The animation and loop stay intact, and the file never leaves your browser. Cropping is different. NanoImage doesn't have an animated GIF cropper yet, and our regular Crop Image tool saves PNG, JPG or WebP, so a cropped GIF comes out as a single frame. To crop and keep the motion, crop the source before you make the GIF, or use a desktop tool like ffmpeg or GIMP. Then come back and shrink the result.\n\nHere's how to do each one.\n\n## Why most tools \"break\" a GIF\n\nAn animated GIF is a stack of frames plus a bit of timing and loop data. Most image editors are built for single pictures. They open the file, read the first frame, and save that one frame. Nothing is wrong with your GIF. The tool just isn't reading the whole stack.\n\nSo before you pick a tool, check one thing: does it save its output as an animated GIF? If the output options are only PNG, JPG or WebP, you'll get a still.\n\n## How to resize a GIF in your browser\n\nThe [GIF Compressor](/gif-compressor) has a Scale slider from 30% to 100%. It shrinks every frame by the same amount and keeps the animation playing.\n\nOpen the GIF Compressor and drop in your .gif.\n\nIf all you want is smaller dimensions, set the target size to **Custom** and clear the KB box. With a size target set, the tool can shrink the GIF further, drop colors or skip frames to fit it, so your 400px might end up smaller.\n\nMove **Scale** to the size you need. Some common jumps:\n\n800px to 400px: 50%\n\n1000px to 600px: 60%\n\n640px to 480px: 75%\n\nKeep **Colors** at 256 or 128 and **Frame skip** at 1 so only the canvas size changes.\n\nClick **Compress GIF**, check the before/after preview, and download.\n\n![Before and after: an animated GIF resized from 800px to 400px wide with NanoImage GIF Compressor at 50% scale, shrinking from 4.89 MB to 1.23 MB](/blog/before-after-gif-resize.png)\n\nSmaller dimensions usually mean a much smaller file, since a GIF stores every pixel of every frame. If you also need to get under an upload limit, the same tool has Discord, 10MB, 5MB, 512KB and 256KB presets. Our guide on [how to compress a GIF](/blog/how-to-compress-gif) explains which setting to try first.\n\n**Two limits worth knowing.** The slider works in percentages, so there's no box for typing an exact pixel width. And it only goes down to 30%. If you need an exact width like 498px, or something smaller than 30%, ffmpeg handles it in one line:\n\n```\nffmpeg -i input.gif -vf \"scale=498:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse\" output.gif\n```\n\nThe -1 keeps the aspect ratio. The palette part keeps the colors from getting muddy.\n\n## How to crop a GIF and keep the animation\n\nStraight answer first: NanoImage can't crop an animated GIF right now. Crop Image will open a GIF, but it only saves PNG, JPG or WebP, so you'd get one frame. That's fine if all you want is a still thumbnail. If you want the motion, try one of these.\n\n**Option 1: Crop the source, not the GIF.** If your GIF started as a video or screen recording, crop or trim that first, then turn it into a GIF with [Video to GIF](/video-to-gif) (clips up to 15 seconds, up to 720px wide). For screen recordings, recording only the window you need does the same job and keeps the file a lot smaller.\n\n**Option 2: ffmpeg.** The crop filter takes width, height, then the X and Y of the top-left corner:\n\n```\nffmpeg -i input.gif -vf \"crop=600:400:100:50,split[a][b];[a]palettegen[p];[b][p]paletteuse\" output.gif\n```\n\nThat cuts a 600x400 area starting 100px from the left and 50px from the top, on every frame.\n\n**Option 3: GIMP (free, no command line).**\n\nOpen the GIF. GIMP loads each frame as a layer.\n\nDraw a box with the Rectangle Select tool.\n\nGo to **Image > Crop to Selection**. This crops every layer, not just the top one.\n\nChoose **File > Export As**, save as .gif, and tick **As animation** in the export dialog.\n\n![Three steps to crop an animated GIF: select the area, crop every frame to the selection, then export as an animated GIF](/blog/crop-gif-steps.png)\n\n**Then shrink it.** Cropped GIFs exported from desktop tools are often bigger than they need to be. Run the result through the [GIF Compressor](/gif-compressor) to get it under your size limit.\n\n## Crop first, then resize\n\nIf you need both, crop first. Cropping removes pixels you don't want, so the resize then spends its quality on the part that matters. Resizing first and cropping after leaves you with a smaller, softer image of the bit you actually wanted.\n\nA good order for most GIFs:\n\nCrop (at the source, ffmpeg, or GIMP)\n\nResize (GIF Compressor Scale slider)\n\nCompress to your limit (GIF Compressor presets)\n\n## Adding a caption to a GIF\n\nFor a quick caption, try [Add Text to Image](/add-text). It accepts GIFs, and its own FAQ says adding text to animated GIFs works \"for many GIFs.\" Type the caption, add an outline or shadow so it stays readable over moving frames, then download and check that the file still plays.\n\nIf it comes out as a still, there's a sure fallback. Add your text to the individual frames, then put them together in the [GIF Maker](/gif-maker), which takes up to 50 frames and lets you set speed and looping. Keep captions short and away from the edges. Chat apps often crop previews.\n\n## Quick answers\n\n**Will resizing make my GIF blurry?** Shrinking it rarely does. Making a GIF bigger than its original size will look soft, because no resizer can add detail that isn't there.\n\n**Why is my resized GIF still too big?** Dimensions are only one part of it. Frame count and colors matter too. Try Frame skip 2 or 64 colors in the GIF Compressor.\n\n**Does any of this upload my GIF?** Not the NanoImage tools. The GIF Compressor, Add Text and GIF Maker all run in your browser. ffmpeg and GIMP run on your own computer.\n\n**Is a dedicated GIF resizer coming?** We're working on more GIF tools. For now, the GIF Compressor's Scale slider is the most reliable way to resize an animated GIF on NanoImage.\n\n[Resize your GIF now with the GIF Compressor](/gif-compressor)",
  },
  {
    slug: "how-to-bulk-compress-images",
    category: "Tips",
    title: "How to Bulk Compress Images Without Losing Quality",
    excerpt: "Compress a lot of images at once without wrecking quality. Use NanoImage’s free bulk image compressor in your browser—up to 20 files, ZIP download, no upload.",
    date: '2026-10-05',
    readTime: "7 min read",
    metaDescription: "Compress a lot of images at once without wrecking quality. Use NanoImage’s free bulk image compressor in your browser—up to 20 files, ZIP download, no upload.",
    coverImage: '/blog/bulk-compress-before-after-1200x675.jpg',
    body: "How do I compress a lot of images at once without losing quality? Use a bulk image compressor that lets you set quality, preview results, and download the whole batch as a ZIP. On NanoImage’s [batch compress tool](/batch-compress), you can compress up to 20 JPG, PNG, WebP, or GIF files in your browser—nothing is uploaded to a server. Start around mid quality, check the before/after sizes, and only lower the setting if you still need smaller files.\n\nThat is the short answer. Below is the full workflow, what “without losing quality” actually means, and how to avoid common mistakes when you have a folder of photos to shrink.\n\n## Why batch compression beats one-by-one\n\nIf you have 15 product shots or a week of blog images, opening each file in a single compressor wastes time. You also tend to pick different quality settings for each file, so the set looks inconsistent.\n\nBatch compression means one upload for many files, one quality choice for the batch, one place to compare total original size vs total compressed size, and one ZIP download when you are done.\n\nNanoImage’s [bulk image compressor](/batch-compress) is built for that: max 20 images, 20MB each, formats JPG / PNG / WebP / GIF, all processed locally in the browser.\n\n## What “without losing quality” really means\n\nEvery useful compressor for photos trades some data for a smaller file. The goal is not zero change. The goal is a file that still looks sharp at the size you display it, while cutting weight for the web, email, or CMS uploads.\n\nPractical rules:\n- **Photos:** JPG or WebP at a moderate quality setting usually looks fine and shrinks a lot.\n- **Graphics with text or sharp edges, or anything with transparency:** Prefer PNG when you need crisp lines or an alpha channel.\n- **Preview first:** Always check a few frames of the batch before you download the ZIP.\n- **Stop when it looks good:** The best result is the smallest file that still looks right—not the tiniest number on the screen.\n\nIf one hero image needs careful tuning and the rest are bulk work, compress the batch first, then open that single file in the regular [Compress Image](/compress-image) tool and nudge quality on its own.\n\n## Step-by-step: compress a batch on NanoImage\n\n### 1. Collect the files\n\nPut the images you need in one folder on your Mac or Windows machine. Stick to JPG, PNG, WebP, or GIF. Skip anything over 20MB, or resize it first if a single file is oversized.\n\nAim for 20 files or fewer per run. If you have 40 photos, do two batches. That matches the tool’s limit and keeps previews manageable.\n\n### 2. Open the batch compress page\n\nGo to [https://nanoimage.net/batch-compress](/batch-compress). You do not need an account. The page runs in Chrome, Firefox, Safari, or Edge on Mac and Windows the same way.\n\n### 3. Upload or drag and drop\n\nClick the upload area or drag the files onto it. You should see the list build with original sizes. Use **Select all** if you want every file included.\n\nConfirm the tip line on the page: JPG for photos, PNG for graphics and transparency, lower quality for smaller files, and preview before you download.\n\n### 4. Set quality and run compression\n\nAdjust the quality setting for the batch. Start in the middle if you are unsure. Run compression and watch total original size, total compressed size, and space saved.\n\nIf savings look strong but a photo looks soft or blocky in preview, raise quality and run again. If files are still huge and look fine, lower quality a bit.\n\n### 5. Download the ZIP\n\nClick **Compress & Download ZIP**. Unpack the ZIP into a new folder so you do not overwrite originals. Spot-check a few images at 100% zoom, especially faces, small text, and product edges.\n\nNeed a clean slate? Use **Reset** and start the next batch.\n\n![Batch of photos before and after bulk compression showing smaller file sizes](/blog/bulk-compress-before-after-1200x675.jpg)\n\n## Mac and Windows notes\n\nYou do not need a separate “bulk image compressor Mac” app for this workflow. Because NanoImage runs in the browser:\n- On Mac: Safari or Chrome both work; drag from Finder onto the page.\n- On Windows: Edge or Chrome; drag from File Explorer the same way.\n\nPrivacy is the same on both: processing stays on your device. The site states that images are not uploaded to their servers.\n\n## When batch compress is the wrong tool\n\nUse a different path when:\n- **You only have one image.** Use [Compress Image](/compress-image) instead of the batch page.\n- **You need an exact KB cap** (for example under 100KB for a form). Use NanoImage’s target-size compress pages after or instead of a general batch pass.\n- **Dimensions are wrong.** Resize first if images are huge (4000px-wide phone photos for an 800px blog slot), then compress. Smaller dimensions plus sensible quality beats crushing quality alone.\n- **You need a format change more than a size cut.** Convert first (for example to WebP), then compress if still needed.\n\n## Checklist before you publish\n1. 1. Compare two or three compressed files to the originals at display size.\n2. 2. If the batch totals show a solid size cut and previews look fine, you are done.\n3. 3. Keep originals until the site or client signs off.\n4. 4. Name the output folder clearly (product-photos-compressed).\n\n## Common mistakes\n\n**Crushing quality on the first try.** Start mid, then lower only if you need more savings.\n\n**Flattening transparency.** Do not force everything to JPG when you need PNG.\n\n**Skipping the preview.** Totals can look great while one logo in the batch is ruined.\n\n**Ignoring the 20-file / 20MB limits.** Split the folder instead of forcing oversized files.\n\n**Using random compress sites that store files.** Prefer a local-in-browser tool for client or unpublished photos. NanoImage’s batch page works that way.\n\n## Quick recap\n\nTo compress a lot of images at once without losing quality: open the [batch compress tool](/batch-compress), drop in up to 20 JPG/PNG/WebP/GIF files, set a moderate quality, preview, then download the ZIP. Raise quality if anything looks soft; lower it only when you still need more savings. Use [Compress Image](/compress-image) for one-off fixes, and keep originals until you are happy with the set.",
  },
  {
    slug: "how-to-crop-discord-profile-picture",
    category: "Tips",
    title: "How to Crop a Discord Profile Picture",
    excerpt: "Discord shows a square photo inside a circle. Crop a 512×512 PNG and keep your face in the center so the circle and status dot do not cut it off.",
    date: '2026-10-05',
    readTime: "2 min read",
    metaDescription: "Discord shows a square photo inside a circle. Crop a 512×512 PNG and keep your face in the center so the circle and status dot do not cut it off.",
    coverImage: '/blog/discord-pfp-cropper.png',
    body: "Discord displays a square image inside a circle, so the four corners are cut off. The online-status dot covers the bottom-right of that circle. Crop a square, keep your face in the safe center, and export a PNG at 512×512.\n\n![Discord profile picture before and after cropping to fit the circle](/blog/discord-pfp-cropper.png)\n\nYou upload a square. Discord draws the circle on top of it. A discord pfp cropper is just that square crop.\n\n## What the circle hides\n\nThe four corners never show. If your face sits to one side, the mask takes an ear, hair, or part of a cheek.\n\nThe status dot sits on the bottom-right of the circle. Leave that area empty. An eye, a mouth, or small text there gets covered.\n\n## Crop it\n\nOpen [Crop Image](/crop-image).\n\nClick **Upload Image**, or drag the photo onto the page.\n\nSet **Aspect Ratio** to **1:1 Square**.\n\nDrag inside the box to move it. Drag a corner or an edge to resize it. Hold **Shift** while you drag so it stays a square. Keep the face in the center. Leave a margin at the corners, and a clear gap at the bottom-right.\n\nSet **Width** and **Height** to **512**. Those fields are the crop size in pixels on your file. Check the preview. If 512 cuts the face, raise both numbers by the same amount until the face fits, and keep the crop square.\n\nUnder **Output Format**, click **PNG**. Leave **Image Quality** at 100.\n\nClick **Download Selected**.\n\nUse that PNG as your Discord avatar. If the circle still clips your face, move the square and download again.",
  },
  {
    slug: "how-to-compress-gif",
    category: "Tips",
    title: "How to Compress a GIF for Discord (and Other Size Limits)",
    excerpt: "Hit Discord, email, and CMS size caps by compressing GIFs locally—resize, skip frames, and cut the palette without uploading.",
    date: '2026-09-15',
    readTime: "7 min read",
    metaDescription: "Learn how to compress a GIF for Discord and other size limits. Use NanoImage’s free local GIF compressor—presets for 512KB, 5MB, and Discord—no upload.",
    coverImage: '/assets/blog/compress-gif-cover.png',
    body: "Discord rejects your reaction GIF. An email bounce cites attachment size. A CMS upload bar stalls at 100%. When the format is GIF, the fix is almost always the same: compress the animation until it fits—without wrecking the loop.\n\n![Before and after storyboard showing a GIF file size shrinking after compression](/assets/blog/compress-gif-demo.png)\n\n## Quick answer: how to compress a GIF\n\nTo compress a GIF, reduce colors, frames, or dimensions until the file is under your limit (for example Discord’s upload cap or a 512KB / 5MB target). A local GIF compressor does this in the browser so the file never uploads. Open NanoImage’s [GIF Compressor](/gif-compressor), pick a preset or sliders, preview, and download.\n\n## Why GIF files get huge\n\nGIF stores every frame as a palette image. File size scales with **frames × palette × resolution**:\n\n**More frames** (smooth 30fps loops, long clips) multiply the payload.\n\n**Large canvases** (1080p screen recordings turned into GIF) cost far more than a 480px reaction.\n\n**Fat palettes** (up to 256 colors per frame) keep gradients pretty but bloat bytes.\n\n**Little frame-to-frame reuse** (busy video) compresses worse than a simple emoji loop.\n\nThat is why a five-second screen recording can land at 15–40MB as a GIF even when the same clip is tiny as MP4. Compression is not “make it blurry for fun”—it is choosing which of those three axes to shrink first. If you only remember one mental model: **stop paying for pixels and frames the destination will never show clearly in a chat bubble**.\n\n## How to compress a GIF in your browser (step-by-step)\n\nOpen the [GIF Compressor](/gif-compressor) — free, no account, processed locally in your browser.\n\nDrop in your `.gif`. You should see the original size and a live preview.\n\nPick a **target preset** (Discord, 512KB, 5MB, or custom) **or** nudge quality, scale, frame skip, and palette manually.\n\nWatch the estimated size. If you are still over the limit, tighten one control at a time (see order below).\n\nDownload the compressed GIF. Nothing was uploaded to a server.\n\nBecause NanoImage runs in the browser, private memes, unreleased product loops, and work-in-progress UI recordings never leave your machine. You can confirm in DevTools → Network: no image upload requests. That privacy angle matters more for GIFs than for stills—animated captures often include unread Slack sidebars, email subjects, or staging URLs.\n\n## Discord and common size targets\n\nPlatform caps change, and Discord’s limit depends on your Nitro tier. Treat these as **working ranges**, then verify in the product UI before you publish:\n\n**Discord (typical non-Nitro / Nitro ranges):** often discussed around ~8MB for many uploads; Nitro tiers can be higher. NanoImage’s **Discord** preset targets that common ~8MB wall—if your client still rejects the file, step down to 5MB or lower.\n\n**512KB:** strict email signatures, some ticket systems, older CMS fields, sticker-like assets.\n\n**2–5MB:** many marketing CMSs, casual team-chat shares, newsletter tools with medium caps.\n\n**8MB+:** looser chat uploads and “looks fine on broadband” embeds.\n\nIf a host only says “max upload 1MB” without format nuance, assume the GIF must land **under** that number after compression—not “approximately.” When in doubt, aim 10–15% below the stated cap so encoding overhead does not push you over. Re-open the file’s properties after download; some tools report an estimate that differs slightly from the bytes written to disk.\n\n## Which settings to try first\n\nWork in this order. Each step usually saves more bytes than the next:\n\n**Resize (scale down)** — Dropping 1080p → 640px (or 480px for reactions) is the biggest win with the least “GIF looks broken” risk. Chat GIFs rarely need cinema resolution. Step-by-step: [how to resize and crop a GIF](/blog/how-to-resize-and-crop-a-gif).\n\n**Frame skip / lower frame rate** — Keeping every other frame (or capping around 10–15fps) often halves size on video-like GIFs. Fine for reactions; be gentler on UI demos where motion must stay readable.\n\n**Palette / quality** — Fewer colors flatten gradients and banding appears. Use this after resize/frames when you still need another 20–40%.\n\n**Trim duration** — If the tool or a prior edit can shorten the loop, a 2-second punchline beats an 8-second meandering clip every time.\n\nRule of thumb: **resize → frames → palette**. Jumping straight to maximum quality reduction on a still-huge canvas fights the format. If you must ship tonight and only have one slider pass, pick a preset (512KB or Discord) and let the compressor balance those levers for you—then fine-tune only if the preview looks too soft.\n\n## Create vs compress: when to use GIF Maker first\n\nCompressing assumes you already have a `.gif`. If you are starting from PNGs, JPGs, or a short sequence of stills:\n\nBuild the animation in [GIF Maker](/gif-maker) with a modest canvas and sane frame duration.\n\nExport, then run the result through [GIF Compressor](/gif-compressor) to hit the hard cap.\n\nCreating “too big” on purpose and only crushing quality at the end wastes time. Design for the limit: fewer frames, smaller width, then a light compress pass for the last kilobytes. Screen recordings that “must stay GIF” should be cropped to the active window before either tool—letterboxed desktops are pure dead weight.\n\n## FAQ\n\n**Will compressing a GIF always look worse?**\n\nNot if you resize first. Most Discord-sized reactions look fine at 400–600px wide. Ugly results usually come from crushing the palette on a still-huge canvas.\n\n**Does compression break looping?**\n\nA proper GIF compressor keeps the loop flag. If your download plays once, re-check the tool’s loop setting or re-export; NanoImage’s compressor preserves typical forever-loop behavior unless you change it upstream in the maker.\n\n**Should I switch to animated WebP instead?**\n\nWhen the destination allows it, animated WebP (or MP4/WebM) is often smaller at similar quality. Many chat apps and older email clients still expect GIF. Compress the GIF when the channel demands GIF; use a modern format when you control the page.\n\n**Is a local compressor safer than upload sites?**\n\nYes for private content. Upload-based converters send the entire animation to someone else’s disk. A browser-local tool keeps pixels on your device.\n\n**Can I compress without losing the transparent look?**\n\nGIF transparency is palette-based. Heavy palette cuts can introduce fringing. Prefer resize/frame cuts before aggressive color reduction on transparent stickers.\n\n## Compress your GIF locally\n\nReady to hit the limit? Open the [GIF Compressor](/gif-compressor), choose a Discord / 512KB / 5MB preset, and download a smaller loop—processed on your device. Building from stills? Start with [GIF Maker](/gif-maker), then compress.\n\n[Compress your GIF locally →](/gif-compressor)",
  },
  {
    slug: "how-to-crop-image-online",
    category: "Tips",
    title: "How to Crop an Image Online (Free, No Signup)",
    excerpt: "Crop photos by exact pixels, aspect ratio, or freehand \u2014 right in your browser, with nothing uploaded to a server.",
    date: '2026-07-04',
    readTime: "6 min read",
    metaDescription: "Step-by-step guide to cropping images online for free: exact pixels, aspect ratios like 1:1 and 16:9, multiple crop areas, and privacy-safe browser-based cropping.",
    coverImage: '/assets/blog/how-to-crop-image-online-cover.png',
    body: "Cropping is the fastest way to improve a photo: cut the clutter, fix the framing, and make the subject fill the frame. You don't need Photoshop for that \u2014 a browser is enough. This guide shows how to crop an image online in under a minute, and how to get exact dimensions when a form or platform demands them.\n\n## Crop an image in 4 steps\n\n1. Open the free [Crop Image](/crop-image) tool. It runs 100% in your browser \u2014 your photo is never uploaded.\n2. Drag and drop your JPG, PNG, or WebP file onto the canvas.\n3. Drag the corner handles to frame your shot, or choose a preset ratio (1:1, 4:3, 16:9, 9:16). Hold **Shift** to lock the ratio while dragging.\n4. Click download. Done \u2014 pixels outside the crop are removed, nothing else is changed.\n\n## Crop to exact pixel dimensions\n\nUpload forms often demand exact sizes: a 600\u00d7600 avatar, a 1200\u00d7630 link preview, a 413\u00d7531 ID photo. In the [crop tool](/crop-image), switch to pixel mode and type X, Y, width, and height directly \u2014 the crop box snaps to precisely those values, so what you download is exactly what the form wants.\n\nIf you need a specific **file size** (KB) rather than dimensions, crop first, then run the result through [Compress Image](/compress-image) \u2014 cropping controls pixels, compression controls kilobytes.\n\n## Crop to aspect ratios for social media\n\n- **1:1 (square)** \u2014 Instagram grid classics, profile pictures, product thumbnails\n- **4:5 / 3:4 (portrait)** \u2014 Instagram feed; 3:4 (1080\u00d71440) now fills the profile grid without cropping\n- **16:9 (landscape)** \u2014 YouTube thumbnails, blog headers, presentations\n- **9:16 (vertical)** \u2014 Stories, Reels, TikTok\n\nPick the ratio preset, position the frame, export. For a full list of current platform dimensions, see our [social media image sizes guide](/blog/social-media-image-sizes).\n\n## Crop multiple areas from one image\n\nNeed several cutouts from a single screenshot \u2014 say, three product shots from one photo? The NanoImage crop tool supports **multiple crop areas** in one pass: draw several boxes and export them together as a ZIP. This saves the upload-crop-download loop for every region.\n\n## Why crop in the browser instead of an app?\n\n- **Privacy**: server-based croppers upload your photo; NanoImage processes it locally with the Canvas API. Sensitive screenshots, ID photos, and family pictures never leave your device.\n- **Speed**: no upload/download round trip \u2014 cropping a 10MB photo takes milliseconds.\n- **No account, no watermark, no limits.**\n\n## FAQ\n\n**Does cropping reduce image quality?**\nNo. Cropping removes pixels outside the frame; the remaining pixels are untouched. Quality only changes if you also resize or re-compress afterwards.\n\n**How do I crop a circle?**\nCrop to a 1:1 square first; most platforms (avatars) apply the circular mask themselves. True circular PNG export is on our roadmap.\n\n**Can I undo a crop?**\nIn the tool, yes \u2014 reset before downloading. After download, the removed pixels are gone, so keep your original file.\n\n**What formats are supported?**\nJPG, PNG, WebP, and GIF (first frame). Output keeps the input format by default.\n\nReady? [Crop your image now \u2192](/crop-image)\n\n## Explore edit & optimize tools\n\nAfter cropping, you may need to [resize images online](/resize-image) or [compress images online](/compress-image). Browse [edit images online](/tools/edit-images) and [image optimization tools](/tools/optimize-images) for the full workflow.",
  },
  {
    slug: "how-to-convert-png-to-jpg-online",
    category: "Tips",
    title: "PNG to JPG: How to Convert Online Without Losing Quality",
    excerpt: "Convert PNG to JPG in your browser \u2014 free, private, batch up to 20 files, with quality control and no upload.",
    date: '2026-07-04',
    readTime: "6 min read",
    metaDescription: "How to convert PNG to JPG online for free: when to convert, how to keep quality high, what happens to transparency, and batch conversion \u2014 all in your browser.",
    coverImage: '/assets/blog/how-to-convert-png-to-jpg-online-cover.png',
    body: "PNG files are lossless and crisp \u2014 and often five to ten times larger than they need to be. When a form rejects your upload, an email bounces, or a page loads slowly, converting PNG to JPG is usually the one-minute fix. Here's how to do it properly.\n\n## Convert PNG to JPG in 3 steps\n\n1. Open [Convert Image](/convert-image) \u2014 free, no signup, runs entirely in your browser.\n2. Drop in up to 20 PNG files (max 20MB each).\n3. Choose **JPG** as output, set quality (85\u201392% is the sweet spot), and click Convert. Download files individually or as a ZIP.\n\nYour images are processed locally with the Canvas API \u2014 nothing is uploaded, which matters when converting screenshots with personal data.\n\n## When should you convert PNG to JPG?\n\n- **Photos saved as PNG.** Cameras and screenshots sometimes produce PNGs of photographic content \u2014 JPG stores the same visual quality in a fraction of the size.\n- **Upload limits.** Job portals, government forms, and marketplaces often cap files at 1\u20132MB or accept JPG only.\n- **Email and messaging.** Smaller attachments send faster and don't bounce.\n- **Web performance.** Smaller images mean faster pages and better Core Web Vitals.\n\n## When you should NOT convert\n\n- **Logos, icons, UI elements with sharp edges** \u2014 JPG compression blurs hard edges and text. Keep those as PNG, or convert to [WebP](/convert-to-webp) instead.\n- **Images that need transparency** \u2014 JPG has no alpha channel. Transparent areas will be filled with a solid color (NanoImage lets you pick which; white is the default).\n- **Files you'll keep editing** \u2014 re-saving JPG repeatedly compounds compression artifacts. Edit in PNG, export JPG once at the end.\n\n## Keeping quality high\n\nJPG is lossy, but at quality 85+ the difference from PNG is invisible for photos. Practical settings:\n\n- **Quality 90\u201392**: portfolio images, product photos\n- **Quality 80\u201385**: blog images, social posts \u2014 best size/quality balance\n- **Quality 70**: thumbnails and previews\n\nNeed to hit an exact file size such as 200KB for a form? Convert first, then use [Compress Image to 200KB](/compress-image-to-200kb) \u2014 it automatically finds the highest quality that fits the limit.\n\n## What about transparency?\n\nJPG cannot store transparent pixels. During conversion, transparent regions get a background color. If your PNG has a transparent background you want to keep, your options are: keep PNG, convert to WebP (smaller and supports alpha), or add a background color deliberately with [Change Background](/change-background) first.\n\n## Batch conversion\n\nConverting one file is easy anywhere; converting fifty is where tools differ. NanoImage handles up to 20 files per batch in the browser, and the [NanoImage CLI](/cli) converts entire folders from the terminal: `nanoimage convert ./screenshots --to jpg --output ./jpg`.\n\n## FAQ\n\n**Does converting PNG to JPG lose quality?**\nTechnically yes (JPG is lossy), visibly no at quality 85+ for photographic content. Line art and text suffer most \u2014 keep those as PNG.\n\n**Why is my JPG bigger than the PNG?**\nFor flat-color graphics (charts, screenshots of text), PNG compresses better than JPG. Convert those to WebP or leave them as PNG.\n\n**Is it safe to convert sensitive screenshots online?**\nOnly if the tool doesn't upload them. NanoImage converts locally in your browser \u2014 verify with your browser's network tab.\n\n[Convert PNG to JPG now \u2192](/convert-image)\n\n## More conversion tools\n\nExplore [convert image formats online](/tools/convert-formats): [Convert Image](/convert-image), [Convert to WebP](/convert-to-webp), and [Image to PDF](/image-to-pdf). Then [compress images online](/compress-image) if the platform has a size cap.",
  },
  {
    slug: "how-to-blur-photo-online",
    category: "Privacy",
    title: "How to Blur Part of a Photo Online (Faces, Plates, Text)",
    excerpt: "Blur faces, license plates, addresses, or any region of an image \u2014 free, in your browser, with nothing uploaded.",
    date: '2026-07-04',
    readTime: "6 min read",
    metaDescription: "Blur faces, license plates, and sensitive text in photos online for free. Brush-based selective blur that runs in your browser \u2014 no upload, no signup, no watermark.",
    coverImage: '/assets/blog/how-to-blur-photo-online-cover.png',
    body: "Screenshots with account numbers, photos with strangers' faces, listings that show your license plate \u2014 sharing images safely often means blurring parts of them first. Here's how to do it in the browser in under a minute, without handing the sensitive image to yet another server.\n\n## Blur part of an image in 4 steps\n\n1. Open [Blur Image](/blur-image) \u2014 free, no account, processed locally in your browser.\n2. Upload your JPG, PNG, or WebP.\n3. Paint over the areas to hide: faces, plates, names, addresses. Adjust brush size and blur strength as needed.\n4. Download the result. The rest of the image stays sharp.\n\n## What should you blur before sharing?\n\n- **Faces** \u2014 especially children's and bystanders'. In many countries, publishing identifiable photos of people without consent has legal consequences (GDPR, state privacy laws).\n- **License plates** \u2014 a plate ties a photo to a person and an address.\n- **Documents and screens** \u2014 account numbers, emails, order IDs, QR codes (yes, QR codes can be scanned from photos), meeting links, API keys in terminal screenshots.\n- **House numbers and street signs** in real-estate or marketplace photos.\n- **Boarding passes and tickets** \u2014 barcodes contain your booking data.\n\n## Blur vs pixelate vs black bar \u2014 which hides better?\n\n- **Blur** looks natural and is ideal for faces and backgrounds. Use a strong setting: light blur on text can sometimes be reversed by deblurring tools.\n- **Pixelate** ([Pixelate Image](/pixelate-image)) is the classic mosaic. With large block sizes it is very hard to reverse and reads clearly as \\\"intentionally hidden\\\".\n- **Solid bar** is the most secure for text \u2014 nothing to reconstruct. The tradeoff is aesthetics.\n\nRule of thumb: faces \u2192 blur or pixelate; text and numbers \u2192 strong pixelation or a solid shape. And never hide text by merely lowering contrast or cropping tight \u2014 both are recoverable.\n\n## One more step: strip the metadata\n\nBlurring the pixels doesn't touch the file's hidden metadata. A blurred photo can still contain the GPS coordinates of where it was taken. After blurring, run the file through [Remove EXIF](/remove-exif) \u2014 also browser-based \u2014 to clear location, timestamps, and device info. Two tools, ten seconds, actually private.\n\n## Why browser-based blurring matters here especially\n\nThink about what you're blurring: the sensitive parts. Uploading an unredacted ID photo to a random \\\"free blur tool\\\" server defeats the purpose. NanoImage processes the image with the Canvas API on your device; the original never leaves your machine. You can verify: open DevTools \u2192 Network while using the tool \u2014 no image requests.\n\n## FAQ\n\n**Can blurred images be un-blurred?**\nWeak Gaussian blur on text has been partially reversed in research settings. Use strong blur or pixelation for text; for absolute certainty, use an opaque shape.\n\n**Does blurring reduce the quality of the rest of the photo?**\nNo \u2014 only the painted region is altered. Export quality is configurable.\n\n**Can I blur the whole background instead of a region?**\nYes \u2014 paint the background, or blur everything and re-sharpen the subject area. A dedicated portrait-background mode is on the roadmap.\n\n**Is it really free?**\nYes. No watermark, no signup, no limits.\n\n[Blur your photo now \u2192](/blur-image)\n\n## Privacy-first image tools\n\nPair blurring with [Remove EXIF Data](/remove-exif) before sharing. Explore [image privacy tools](/tools/privacy-protection) including [pixelate an image online](/pixelate-image) when you need stronger redaction.",
  },
  {
    slug: "how-to-add-watermark-to-photo-online",
    category: "Tips",
    title: "How to Add a Watermark to Photos Online (Text or Logo)",
    excerpt: "Protect your photos with a text or logo watermark \u2014 positioned, styled, and exported in your browser for free.",
    date: '2026-07-04',
    readTime: "6 min read",
    metaDescription: "Add text or logo watermarks to photos online for free: placement, opacity, fonts, batch workflows, and how to watermark without uploading your images anywhere.",
    coverImage: '/assets/blog/how-to-add-watermark-to-photo-online-cover.png',
    body: "If you publish photos \u2014 products, portfolio work, real-estate shots, recipes \u2014 a watermark is the simplest way to keep your name attached when images get reposted. Here's how to add one in the browser, plus what actually makes a watermark effective.\n\n## Add a watermark in 4 steps\n\n1. Open [Add Watermark](/add-watermark) \u2014 free, no signup, and your photo is processed locally, never uploaded.\n2. Upload a JPG, PNG, WebP, or GIF.\n3. Choose **Text** (type your name or brand, pick font, size, color) or **Image** (upload your logo, ideally a transparent PNG).\n4. Drag it into position, set opacity to 30\u201350%, and download.\n\nEach watermark is a separate layer, so you can combine a logo with a text line and adjust them independently.\n\n## What makes a good watermark?\n\n- **Visible but not loud.** 30\u201350% opacity over a mid-contrast area. It should mark the photo, not ruin it.\n- **Placed where cropping hurts.** Corners are trivially cropped away. Slight overlap with your subject \u2014 or a small repeated pattern \u2014 survives reposting far better.\n- **Consistent.** Same mark, same corner, same opacity across your catalog builds recognition.\n- **Readable at thumbnail size.** Test at 300px wide; thin scripts vanish.\n\nFor serious theft-protection on high-value images, combine a visible watermark with keeping your originals (and their EXIF capture data) as proof of authorship.\n\n## Text vs logo watermarks\n\n**Text** is faster and always sharp at any size \u2014 your name, brand, or URL in a clean font with a subtle shadow or outline for contrast. **Logo** builds brand recall \u2014 export your logo as transparent PNG at 2\u00d7 the size you need, then scale down in the tool. Many creators use both: logo in one corner, URL along an edge.\n\n## Watermarking for specific platforms\n\nDownscaling after watermarking can make marks illegible. Size the image for its destination first \u2014 see our [social media image sizes guide](/blog/social-media-image-sizes) \u2014 using [Resize Image](/resize-image), then add the watermark at final resolution. Export, done.\n\n## Batch watermarking\n\nThe web tool currently processes one image at a time with full layer control. For folders, the [NanoImage CLI](/cli) roadmap includes watermark batching; today you can combine CLI resizing with per-image watermarking in the browser for final shots.\n\n## Should you watermark at all?\n\nHonest answer: not always. Watermarks add friction for legitimate sharing and won't stop a determined thief with an AI remover. They work best as **attribution** (viewers learn who made it) and **deterrence** (casual reposters keep the credit). For client proofs and previews, they're essential; for personal archives, skip them.\n\n## FAQ\n\n**Does the watermark reduce photo quality?**\nNo \u2014 the image is re-exported at the quality you choose; the watermark is composited losslessly before export.\n\n**Can I save my watermark settings?**\nPresets (corner positions) are built in; saved brand templates are on the roadmap.\n\n**PNG or JPG for the watermarked output?**\nJPG for photos going to social/web; PNG if the source had transparency or hard-edged graphics.\n\n**Is my photo uploaded?**\nNo. Everything runs in your browser \u2014 files never leave your device.\n\n[Add a watermark now \u2192](/add-watermark)\n\n## Protect photos before sharing\n\nWatermarks work best alongside [Remove EXIF Data](/remove-exif) and selective [blur](/blur-image). See all [image privacy & protection tools](/tools/privacy-protection).",
  },
  {
    slug: "instagram-image-sizes",
    category: "Tips",
    title: "Instagram Image Sizes (2026): Feed, Grid, Stories & Reels",
    excerpt: "Current Instagram dimensions: 3:4 posts, the new grid preview, Stories, Reels, and profile pictures \u2014 with exact pixels.",
    date: '2026-07-04',
    readTime: "7 min read",
    metaDescription: "Instagram image sizes for 2026: 1080\u00d71440 (3:4) feed posts, 1080\u00d71350 (4:5), the 3:4 profile grid change, Stories and Reels at 1080\u00d71920, and how to resize without quality loss.",
    coverImage: '/assets/blog/instagram-image-sizes-cover.png',
    body: "Instagram changed its rules again: the profile grid now previews every post at a **3:4 vertical ratio**, and 3:4 uploads (1080\u00d71440) are natively supported. If your posts were designed for the old square grid, they're getting cropped on your own profile. Here are the numbers that matter in 2026.\n\n## Instagram sizes at a glance (2026)\n\n| Placement | Pixels | Ratio |\n| --- | --- | --- |\n| Feed post (recommended) | **1080 \u00d7 1440** | 3:4 |\n| Feed post (classic portrait) | 1080 \u00d7 1350 | 4:5 |\n| Feed post (square) | 1080 \u00d7 1080 | 1:1 |\n| Feed post (landscape) | 1080 \u00d7 566 | 1.91:1 |\n| Profile grid preview | crops to | 3:4 |\n| Stories / Reels | 1080 \u00d7 1920 | 9:16 |\n| Profile picture | 320 \u00d7 320 (shown as circle) | 1:1 |\n\n*Instagram stores images up to 1080px wide and re-compresses everything on upload.*\n\n## The grid change, explained\n\nSince the 2025 redesign, your profile grid shows posts as 3:4 tiles. Consequences:\n\n- **Square (1:1) posts** lose their left/right edges? No \u2014 they lose top and bottom? Neither: they're shown fitted with the sides padded or center-cropped depending on content \u2014 either way, they no longer fill the tile.\n- **4:5 posts** are center-cropped slightly top and bottom in the grid.\n- **3:4 posts (1080\u00d71440)** fill both the feed and the grid tile exactly. That's why 3:4 is now the recommended default.\n\nPractical rule: design in 3:4, keep faces and text inside the middle 4:5 area so both the feed crop and grid crop are safe.\n\n## Resizing for Instagram without quality loss\n\nInstagram re-compresses aggressively; feeding it the right size reduces visible damage:\n\n1. Crop to the target ratio with [Crop Image](/crop-image) (3:4 preset).\n2. Resize to exactly 1080px wide with [Resize Image](/resize-image) \u2014 downscaling yourself beats letting Instagram do it.\n3. Export as JPG quality ~85, or compress to under 1MB with [Compress Image to 1MB](/compress-image-to-1mb) for faster uploads.\n\nAll three steps run in your browser \u2014 nothing is uploaded to anyone's server except Instagram's, at the end, by you.\n\n## Stories and Reels: mind the safe zones\n\nThe canvas is 1080\u00d71920, but the UI eats into it: username and camera icons at top (~250px) and CTA/caption area at bottom (~310px). Keep text and key visuals in the central ~1080\u00d71350 region. Full-bleed backgrounds are fine edge to edge.\n\n## Carousels\n\nAll slides in a carousel display at the ratio of the **first** slide. Mixing ratios gets everything cropped to slide one's ratio \u2014 prepare all slides at the same 3:4 or 4:5 size before uploading. Batch-resize them in one go with [Batch Compress](/batch-compress).\n\n## FAQ\n\n**What's the single best size for Instagram in 2026?**\n1080 \u00d7 1440 (3:4). It fills the feed and the new grid without cropping.\n\n**Why do my photos look blurry after posting?**\nUsually double compression: you uploaded a huge file and Instagram crushed it. Downscale to 1080px wide and ~85% quality yourself first.\n\n**Do old square posts get cropped now?**\nIn the 3:4 grid preview they no longer fill the tile. Existing posts aren't re-cropped in the feed; Instagram lets you adjust the grid preview per post.\n\n**PNG or JPG for Instagram?**\nJPG. Instagram converts uploads to JPG anyway; converting yourself with [Convert Image](/convert-image) keeps control of quality.\n\n*Sizes change \u2014 this guide reflects Instagram as of July 2026. For every other platform, see the [complete social media sizes guide](/blog/social-media-image-sizes).*\n\n## Resize & optimize for Instagram\n\nUse [Crop Image](/crop-image), [Resize Image Online](/resize-image), and [Compress Image](/compress-image). Browse [edit images online](/tools/edit-images) and [optimize images online](/tools/optimize-images) for the full pre-upload workflow.",
  },
  {
    slug: "social-media-image-sizes",
    category: "Tips",
    title: "Social Media Image Sizes: The 2026 Cheat Sheet",
    excerpt: "Exact 2026 image dimensions for Instagram, TikTok, YouTube, X, Facebook, LinkedIn, and Pinterest \u2014 plus a fast resize workflow.",
    date: '2026-07-04',
    readTime: "8 min read",
    metaDescription: "Every social media image size for 2026 in one cheat sheet: Instagram, TikTok, YouTube thumbnails, X/Twitter, Facebook, LinkedIn, Pinterest \u2014 with a free browser-based resize workflow.",
    coverImage: '/assets/blog/social-media-image-sizes-cover.png',
    body: "One image, seven platforms, seven different crops. Post the same file everywhere and something important gets cut on most of them. This cheat sheet lists the sizes that matter in 2026, and the fastest privacy-safe way to produce every variant.\n\n## Quick reference table (2026)\n\n| Platform | Placement | Pixels | Ratio |\n| --- | --- | --- | --- |\n| Instagram | Feed (recommended) | 1080 \u00d7 1440 | 3:4 |\n| Instagram | Stories / Reels | 1080 \u00d7 1920 | 9:16 |\n| TikTok | Video / photo | 1080 \u00d7 1920 | 9:16 |\n| YouTube | Thumbnail | 1280 \u00d7 720 | 16:9 |\n| YouTube | Channel banner | 2560 \u00d7 1440 | 16:9 |\n| X (Twitter) | In-stream image | 1600 \u00d7 900 | 16:9 |\n| X (Twitter) | Header | 1500 \u00d7 500 | 3:1 |\n| Facebook | Feed image | 1080 \u00d7 1350 | 4:5 |\n| Facebook | Link preview (OG) | 1200 \u00d7 630 | 1.91:1 |\n| LinkedIn | Post image | 1200 \u00d7 1200 or 1200 \u00d7 627 | 1:1 / 1.91:1 |\n| Pinterest | Standard pin | 1000 \u00d7 1500 | 2:3 |\n\n*Platforms tweak specs constantly; treat this as the July 2026 snapshot. Instagram details (including the new 3:4 grid) are covered in depth in our [Instagram sizes guide](/blog/instagram-image-sizes).*\n\n## Five rules that outlive any spec change\n\n1. **Design vertical-first.** 9:16 (Stories, TikTok) and 3:4/4:5 (feeds) dominate. A horizontal master crops badly to vertical; a vertical master crops fine to square.\n2. **Keep a safe zone.** Put faces and text in the central 80% \u2014 every platform overlays UI on the edges.\n3. **Export at exactly the display width.** Uploading 4000px files just means the platform re-compresses harder. 1080px wide covers almost everything except YouTube banners.\n4. **JPG at 80\u201385% quality** is the sweet spot for photos; PNG only for text-heavy graphics; platforms convert to their own formats anyway.\n5. **Stay under each platform's size cap** to avoid the most aggressive recompression. When a cap matters (e.g., 1MB), hit it precisely with [Compress Image to 1MB](/compress-image-to-1mb).\n\n## The 3-minute multi-platform workflow\n\nSay you have one hero photo and need IG feed, Story, X, and a YouTube thumbnail:\n\n1. **Crop each ratio** with [Crop Image](/crop-image) \u2014 presets for 1:1, 3:4, 9:16, 16:9. Multiple crop areas can be exported from one image in a single pass.\n2. **Resize to spec** with [Resize Image](/resize-image) \u2014 type the exact pixel targets from the table.\n3. **Add your handle or logo** with [Add Watermark](/add-watermark) if the image tends to get reposted.\n4. **Compress** the batch with [Batch Compress](/batch-compress) so uploads are fast and platform recompression is gentle.\n\nEverything runs in your browser \u2014 no uploads, no account, no watermarks added by the tool itself.\n\n## Link previews (OG images) are images too\n\nThe 1200 \u00d7 630 Facebook/X/LinkedIn link card is the most shared image size on the internet \u2014 it's what appears when your URL is pasted anywhere. If you control a website, prepare a dedicated 1200\u00d7630 OG image per key page instead of letting platforms crop your logo randomly.\n\n## FAQ\n\n**One size for everything?**\nIf you must: 1080 \u00d7 1350 (4:5). It survives Instagram, Facebook, LinkedIn, and X with acceptable crops. But Stories/TikTok really need 9:16.\n\n**Why does my image look soft after uploading?**\nPlatform recompression. Upload at exact display size with quality ~85 \u2014 never larger \u2014 to minimize it.\n\n**Where do I check for spec updates?**\nPlatforms' own creator docs, or refreshed guides like this one \u2014 we update it as specs change.\n\n[Start resizing \u2192](/resize-image)\n\n## Multi-platform workflow\n\nStart with [Resize Image Online](/resize-image) and [Crop Image](/crop-image), then explore [optimize images online](/tools/optimize-images) and [edit images online](/tools/edit-images) for every platform size in the cheat sheet above.",
  },
  {
    slug: 'what-is-grid-maker',
    category: 'Drawing / Grid Maker',
    title: 'Grid Maker 是什么？如何用在线网格工具提升绘画比例与构图效率',
    excerpt: '了解 Grid Maker 如何帮助艺术家、学生和老师给参考图片添加绘画网格，创建可打印空白网格，并用于肖像、临摹、壁画放大和课堂练习。',
    date: '2026-06-22',
    readTime: '8 min read',
    metaDescription: '了解 Grid Maker 在线网格工具如何帮助艺术家、学生和老师给参考图片添加绘画网格，创建可打印空白网格，并用于肖像、临摹、壁画放大和课堂练习。',
    coverImage: '/assets/blog/grid-maker-cover.png',
    body: `想把一张参考照片准确地画到纸上、画布上，或者放大成壁画，却总觉得比例容易跑偏？这正是 **Grid Maker** 可以解决的问题。

Grid Maker，也可以叫 **drawing grid maker** 或 **drawing grid generator**，是一种在线网格工具。它可以帮你把规则的网格线叠加到参考图片上，或者直接生成一张空白的可打印网格纸。对于绘画、临摹、肖像练习、比例训练、插画构图、壁画放大和课堂教学来说，网格都是一种简单但非常实用的方法。

NanoImage Grid Maker 是一个免费的在线工具。你可以上传参考图片，为图片添加方形、矩形、三角形或等距网格，调整行列数量、线条颜色、透明度和标签，然后导出为 PNG、JPG 或 PDF。整个过程在浏览器中完成，不需要注册，也不需要把图片上传到服务器。

## 什么是 Grid Maker？

Grid Maker 是一个用来创建网格的工具。最常见的用途，是给参考图片添加一层网格线，让你可以按照一个个小格子来观察和复制图像。

传统绘画中，很多艺术家会先在参考图上画网格，再在纸张或画布上画出同样比例的网格。然后，艺术家只需要逐格观察每个小区域里的线条、形状和明暗关系，就能更容易地保持整体比例。

在线 Grid Maker 把这个过程数字化了。你不需要手动画线，也不需要用复杂的软件，只需要打开网页、上传图片、设置网格参数，就可以得到一张干净的绘画参考图。

## 为什么绘画时要使用网格？

绘画中最常见的问题之一是比例不准。比如画肖像时，眼睛位置偏高一点、鼻子长度偏短一点，整张脸的感觉就会变化。画建筑、动物、风景或复杂物体时，形状关系也很容易变形。

网格法的价值在于，它把一张复杂图片拆分成许多更小、更容易观察的区域。你不再需要一次性判断整张图，而是可以专注于每个格子里的内容。

使用网格可以帮助你：

- 更准确地观察比例
- 保持人物五官的位置关系
- 把小图放大到大画布上
- 分解复杂构图
- 训练观察能力
- 减少临摹时的整体偏移
- 为课堂练习制作统一参考图

这也是为什么 Grid Maker 特别适合初学者、艺术学生、老师、插画师、肖像画师和壁画创作者。

## NanoImage Grid Maker 可以做什么？

NanoImage Grid Maker 的核心功能可以分成两类：

第一类是 **给图片添加网格**。你可以上传一张参考照片，然后在图片上叠加绘画网格。这适合肖像、人物、动物、风景、静物、产品草图、漫画分镜和壁画参考。

第二类是 **创建空白可打印网格**。如果你不想上传图片，也可以直接生成一张空白网格，用来做练习纸、课堂讲义、构图草稿、等距图练习或几何图案设计。

主要功能包括：

- 添加网格到参考图片
- 创建空白可打印网格
- 支持方形网格
- 支持矩形网格
- 支持三角形网格
- 支持等距网格
- 自定义行数和列数
- 调整线条颜色、宽度和透明度
- 添加字母和数字标签
- 导出 PNG、JPG 或 PDF
- 浏览器本地处理图片
- 无需注册，无需上传

## 如何用 Grid Maker 给图片添加绘画网格？

使用在线 Grid Maker 的流程非常简单。

### 1. 上传参考图片

先选择一张你想临摹或放大的图片。它可以是肖像照、风景照、宠物照片、插画草图、产品参考图，或者任何你想画的图像。

### 2. 选择网格类型

最常用的是方形网格。它适合大多数绘画练习，特别是肖像、静物和比例训练。

如果你的画面比例较宽或较高，可以使用矩形网格。对于几何图案、技术插图或等距绘图，则可以选择三角形网格或等距网格。

### 3. 调整行数和列数

行列数量决定了网格的精细程度。网格越少，画面越简洁，适合快速草图和初学者练习。网格越多，定位越精确，适合复杂图像和精细肖像。

初学者可以从 4×4、5×5 或 8×8 开始。复杂肖像或大幅作品可以使用更多格子。

### 4. 设置线条样式

你可以调整网格线的颜色、粗细和透明度。浅色或半透明线条适合不遮挡图像细节；深色线条适合打印和课堂展示。

### 5. 添加标签

字母和数字标签可以帮助你快速定位每个格子。例如 A1、B2、C3。把参考图和纸面网格标成相同编号后，你就可以更轻松地逐格复制。

### 6. 导出或打印

完成设置后，可以把带网格的图片导出为 PNG、JPG 或 PDF。你可以直接打印，也可以放进 Procreate、Photoshop、Illustrator、Clip Studio Paint 等绘图软件中继续使用。

## Grid Maker 适合哪些使用场景？

### 肖像绘画

肖像对比例非常敏感。眼睛、鼻子、嘴巴、耳朵和脸部轮廓之间的位置关系，只要稍微偏移，人物就会不像。使用 portrait grid maker 可以帮助你更准确地观察五官位置。

### 临摹练习

对于初学者来说，网格可以降低临摹难度。你可以先关注一个小格子里的线条方向和形状，再逐步完成整张图。

### 壁画和大尺寸放大

如果你想把一张小图放大到墙面、海报或大画布上，网格法非常实用。你只需要在原图和目标画布上使用相同比例的网格，就可以把图像逐格放大。

### 课堂教学

老师可以用 Grid Maker 制作统一的绘画练习图、比例观察练习和空白网格纸。学生可以按照编号格子练习观察与复制。

### 插画和构图

插画师可以用网格检查构图平衡、人物位置、背景透视和视觉重心。等距网格还适合制作 3D 风格插画、游戏素材和图标草图。

### 可打印网格纸

如果你只需要空白网格，Printable Grid Maker 可以快速生成练习纸。它适合素描训练、几何图案、等距绘图、笔记规划和手绘草稿。

## 方形、矩形、三角形和等距网格有什么区别？

### 方形网格

方形网格是最经典的绘画网格。它适合肖像、静物、风景、人物和大多数临摹场景。对于 grid method drawing，方形网格通常是最容易上手的选择。

### 矩形网格

矩形网格适合宽幅或竖幅图片。如果你的参考图不是标准方形，矩形网格可以更好地贴合画面比例。

### 三角形网格

三角形网格适合几何图案、装饰设计、抽象构图和一些技术绘图。它也能帮助你观察斜线和角度关系。

### 等距网格

等距网格常用于 3D 风格绘图、像素艺术、建筑草图、游戏素材、图标设计和技术插图。它可以帮助你画出具有空间感的结构。

## 使用 Grid Maker 的实用技巧

### 从较少的格子开始

如果你是初学者，不需要一开始就使用非常密的网格。过多的线条可能会干扰观察。可以先从 4×4 或 5×5 开始，熟悉后再增加精度。

### 保持参考图和画布比例一致

如果你要把图片转移到纸上或画布上，参考图网格和目标网格的比例要一致。这样每个格子的内容才能准确对应。

### 使用标签减少定位错误

当网格较多时，很容易看错行列。开启字母和数字标签，可以让你快速定位每个区域。

### 打印前检查线条颜色

如果你要打印网格，建议使用对比度较高的线条颜色，并确保透明度不会太低。这样打印出来的网格更清晰。

### 不要只复制线条，也要观察关系

网格不是为了机械地描图，而是帮助你训练观察。画每个格子时，注意线条从哪里进入、从哪里离开、与边界的距离是多少，这样更能提升绘画能力。

## 为什么选择在线 Grid Maker？

相比手动画网格，在线 Grid Maker 更快、更准确，也更容易修改。你可以反复调整行列数量、线条颜色和标签，而不用重新画图。

相比专业设计软件，在线工具更轻量。你不需要安装 Photoshop 或 Illustrator，也不需要学习复杂操作。打开浏览器就能开始。

对于需要处理个人照片、客户参考图或学生作业的场景，本地浏览器处理也更安心。图片不需要上传，操作更私密。

## 开始创建你的绘画网格

无论你是在练习肖像、准备临摹、放大壁画，还是为课堂制作练习纸，NanoImage Grid Maker 都可以帮你快速创建清晰、可定制、可打印的绘画网格。

你可以上传参考图片，添加网格线和标签，也可以直接创建空白网格并导出为 PNG、JPG 或 PDF。

**试试 NanoImage Grid Maker：创建你的免费在线绘画网格。**`,
    localizations: {
      en: {
        category: 'Drawing / Grid Maker',
        title: 'What Is a Grid Maker? How Online Drawing Grids Improve Proportion and Composition',
        excerpt: 'Learn how an online Grid Maker helps artists, students, and teachers add drawing grids to reference images, create printable blank grids, and use the grid method for portraits, copying, murals, and classroom practice.',
        readTime: '8 min read',
        metaDescription: 'Learn how an online Grid Maker helps artists, students, and teachers add drawing grids to reference images, create printable blank grids, and use the grid method for portraits, copying, murals, and classroom practice.',
        body: `Have you ever tried to copy a reference photo onto paper, canvas, or a wall, only to find that the proportions drift as you draw? That is exactly the problem a **Grid Maker** can solve.

A Grid Maker, also called a **drawing grid maker** or **drawing grid generator**, is an online tool that adds regular grid lines to a reference image or creates a blank printable grid. For drawing, copying, portraits, proportion practice, illustration layout, mural scaling, and classroom teaching, grids are simple but very useful.

NanoImage Grid Maker is a free online tool. You can upload a reference image, add a square, rectangular, triangular, or isometric grid, adjust rows, columns, line color, opacity, and labels, then export the result as PNG, JPG, or PDF. Everything runs in your browser, with no signup and no image upload.

## What is a Grid Maker?

A Grid Maker is a tool for creating grids. The most common use is adding a grid overlay to a reference image so you can observe and copy the image one small cell at a time.

In traditional drawing, artists often draw a grid on the reference image and then draw a matching grid on paper or canvas. By studying each small square, it becomes easier to keep shapes, values, and proportions accurate.

An online Grid Maker makes this process faster. You do not need to draw lines by hand or open complex design software. Open the page, upload an image, choose your grid settings, and download a clean drawing reference.

## Why use a grid for drawing?

One of the most common drawing problems is inaccurate proportion. In a portrait, a small shift in the eyes, nose, mouth, or face outline can change the whole likeness. Buildings, animals, landscapes, and complex objects can also become distorted.

The grid method works because it breaks a complex image into smaller areas. Instead of judging the whole picture at once, you focus on what happens inside each cell.

Using a drawing grid can help you:

- Observe proportions more accurately
- Keep facial features aligned
- Scale a small image onto a larger canvas
- Break down complex compositions
- Train observation skills
- Reduce overall drift when copying
- Prepare consistent classroom exercises

That is why Grid Maker is useful for beginners, art students, teachers, illustrators, portrait artists, and mural painters.

## What can NanoImage Grid Maker do?

NanoImage Grid Maker has two main workflows.

The first is **adding a grid to an image**. Upload a reference photo and place a drawing grid on top. This is useful for portraits, people, animals, landscapes, still life, product sketches, comic panels, and mural references.

The second is **creating a blank printable grid**. If you do not want to upload an image, you can generate a blank grid for practice sheets, classroom handouts, composition drafts, isometric drawing, or geometric pattern design.

Key features include:

- Add a grid to a reference image
- Create blank printable grids
- Square, rectangular, triangular, and isometric grids
- Custom rows and columns
- Adjustable line color, width, and opacity
- Letter and number labels
- PNG, JPG, and PDF export
- Local browser processing
- No signup and no upload

## How to add a drawing grid to an image

Using an online Grid Maker is straightforward.

### 1. Upload a reference image

Choose the image you want to copy or scale. It can be a portrait, landscape, pet photo, illustration sketch, product reference, or any image you want to draw.

### 2. Choose a grid type

Square grids are the most common choice for drawing practice, especially for portraits, still life, and proportion training.

If your image is wide or tall, use a rectangular grid. For geometric patterns, technical drawings, or isometric sketches, use triangular or isometric grids.

### 3. Adjust rows and columns

Rows and columns control grid detail. Fewer cells are cleaner and better for quick sketches. More cells are more precise and better for detailed portraits or complex images.

Beginners can start with 4×4, 5×5, or 8×8. Complex portraits or large works may need more cells.

### 4. Set line style

Adjust grid color, thickness, and opacity. Light or semi-transparent lines avoid covering image details. Darker lines work well for printing and classroom display.

### 5. Add labels

Letters and numbers help you identify each cell, such as A1, B2, or C3. When your reference and drawing surface share the same labels, it is easier to copy cell by cell.

### 6. Export or print

When the grid is ready, export it as PNG, JPG, or PDF. You can print it directly or import it into Procreate, Photoshop, Illustrator, Clip Studio Paint, or another drawing app.

## Common Grid Maker use cases

### Portrait drawing

Portraits are sensitive to proportion. A portrait grid maker helps you compare feature placement, angles, spacing, and face structure more accurately.

### Copying practice

For beginners, grids reduce the difficulty of copying. Focus on the line direction and shape inside one small cell, then build the full image gradually.

### Murals and large-scale artwork

If you want to enlarge a small image onto a wall, poster, or large canvas, the grid method is practical. Use the same proportions on the reference and target surface, then scale the image cell by cell.

### Classroom teaching

Teachers can use Grid Maker to prepare drawing exercises, proportion worksheets, and blank grid paper. Students can practice observation and copying with numbered cells.

### Illustration and composition

Illustrators can use grids to check composition balance, character placement, background perspective, and visual weight. Isometric grids are also useful for 3D-style illustrations, game assets, and icon sketches.

### Printable grid paper

If you only need a blank grid, the printable grid maker can generate practice paper for sketching, geometry, isometric drawing, notes, and planning.

## Square, rectangular, triangular, and isometric grids

### Square grid

Square grids are the classic drawing grid. They work for portraits, still life, landscapes, figures, and most copying workflows.

### Rectangular grid

Rectangular grids are useful for wide or tall images. If your reference is not square, a rectangular grid can match the image ratio more naturally.

### Triangular grid

Triangular grids are useful for geometric patterns, decorative design, abstract composition, and technical drawing. They can also help you observe diagonal angles.

### Isometric grid

Isometric grids are common in 3D-style drawing, pixel art, architecture sketches, game assets, icons, and technical illustrations.

## Practical tips for using a Grid Maker

### Start with fewer cells

If you are a beginner, do not start with an overly dense grid. Too many lines can distract you. Try 4×4 or 5×5 first, then increase detail later.

### Keep image and canvas ratios aligned

If you are transferring an image to paper or canvas, the reference grid and target grid should use the same proportions. That keeps each cell aligned.

### Use labels to avoid mistakes

When there are many rows and columns, it is easy to lose your place. Labels help you quickly find the correct cell.

### Check line color before printing

For print, use enough contrast and avoid opacity that is too low. Clear grid lines are easier to use on paper.

### Observe relationships, not only outlines

A grid is not just for mechanical copying. It helps train observation. Look at where each line enters and exits a cell, how far it is from the edges, and how shapes relate to each other.

## Why choose an online Grid Maker?

Compared with drawing grids by hand, an online Grid Maker is faster, more accurate, and easier to adjust. You can change rows, columns, line color, opacity, and labels without redrawing the page.

Compared with professional design software, an online tool is lighter. You do not need Photoshop, Illustrator, or a complex workflow. Open the browser and start.

For personal photos, client references, or student work, local browser processing also adds privacy. Your image does not need to be uploaded.

## Start creating your drawing grid

Whether you are practicing portraits, copying a reference, enlarging a mural, or creating classroom worksheets, NanoImage Grid Maker helps you create clean, customizable, printable drawing grids quickly.

Upload a reference image, add grid lines and labels, or create a blank grid and export it as PNG, JPG, or PDF.

**Try NanoImage Grid Maker and create your free online drawing grid.**`,
      },
      'zh-TW': {
        category: '繪畫 / 格線工具',
        title: 'Grid Maker 是什麼？如何用線上格線工具提升繪畫比例與構圖效率',
        excerpt: '了解 Grid Maker 如何幫助藝術家、學生和老師為參考圖片添加繪畫格線、建立可列印空白格線，並用於肖像、臨摹、壁畫放大和課堂練習。',
        readTime: '8 分鐘閱讀',
        metaDescription: '了解 Grid Maker 線上格線工具如何幫助藝術家、學生和老師為參考圖片添加繪畫格線，建立可列印空白格線，並用於肖像、臨摹、壁畫放大和課堂練習。',
        body: `想把一張參考照片準確畫到紙上、畫布上，或放大成壁畫，卻總覺得比例容易跑偏？這正是 **Grid Maker** 可以解決的問題。

Grid Maker，也可以稱為 **drawing grid maker** 或 **drawing grid generator**，是一種線上格線工具。它可以把規則格線疊加到參考圖片上，也可以直接生成空白可列印格線紙。對繪畫、臨摹、肖像練習、比例訓練、插畫構圖、壁畫放大和課堂教學來說，格線都是簡單但非常實用的方法。

NanoImage Grid Maker 是免費線上工具。你可以上傳參考圖片，添加方形、矩形、三角形或等距格線，調整行列數、線條顏色、透明度和標籤，然後匯出 PNG、JPG 或 PDF。整個過程都在瀏覽器中完成，無需註冊，也不需要把圖片上傳到伺服器。

## 什麼是 Grid Maker？

Grid Maker 是用來建立格線的工具。最常見的用途，是為參考圖片添加一層格線，讓你可以按照一個個小格子觀察和複製圖像。

傳統繪畫中，藝術家常會先在參考圖上畫格線，再在紙張或畫布上畫出相同比例的格線。接著只需要逐格觀察每個小區域裡的線條、形狀和明暗關係，就能更容易保持整體比例。

線上 Grid Maker 把這個流程數位化了。你不需要手動畫線，也不需要使用複雜軟體；只要打開網頁、上傳圖片、設定格線參數，就能得到乾淨的繪畫參考圖。

## 為什麼繪畫時要使用格線？

繪畫中最常見的問題之一是比例不準。畫肖像時，眼睛位置、鼻子長度或嘴巴角度只要稍微偏移，整張臉的感覺就會改變。畫建築、動物、風景或複雜物體時，形狀關係也很容易變形。

格線法的價值在於，它把複雜圖片拆分成許多更小、更容易觀察的區域。你不再需要一次判斷整張圖，而是可以專注於每個格子裡的內容。

使用格線可以幫助你：

- 更準確地觀察比例
- 保持人物五官的位置關係
- 把小圖放大到大畫布上
- 分解複雜構圖
- 訓練觀察能力
- 減少臨摹時的整體偏移
- 為課堂練習製作統一參考圖

## NanoImage Grid Maker 可以做什麼？

NanoImage Grid Maker 的核心功能分成兩類。

第一類是 **為圖片添加格線**。你可以上傳參考照片，然後在圖片上疊加繪畫格線。這適合肖像、人物、動物、風景、靜物、產品草圖、漫畫分鏡和壁畫參考。

第二類是 **建立空白可列印格線**。如果不想上傳圖片，也可以直接生成空白格線，用作練習紙、課堂講義、構圖草稿、等距圖練習或幾何圖案設計。

主要功能包括方形、矩形、三角形與等距格線，自訂行列數、線條顏色、寬度與透明度，添加字母和數字標籤，並匯出 PNG、JPG 或 PDF。

## 如何用 Grid Maker 給圖片添加繪畫格線？

### 1. 上傳參考圖片

選擇你想臨摹或放大的圖片，例如肖像照、風景照、寵物照片、插畫草圖或產品參考圖。

### 2. 選擇格線類型

最常用的是方形格線，適合大多數繪畫練習。畫面比例較寬或較高時，可以使用矩形格線；幾何圖案、技術插圖或等距繪圖則可以選擇三角形或等距格線。

### 3. 調整行數和列數

行列數量決定格線精細程度。初學者可以從 4×4、5×5 或 8×8 開始；複雜肖像或大幅作品可以使用更多格子。

### 4. 設定線條樣式和標籤

你可以調整線條顏色、粗細和透明度。開啟字母和數字標籤後，就能快速定位 A1、B2、C3 這類格子。

### 5. 匯出或列印

完成設定後，可以將帶格線的圖片匯出為 PNG、JPG 或 PDF，直接列印，或匯入 Procreate、Photoshop、Illustrator、Clip Studio Paint 等繪圖軟體使用。

## 常見使用場景

Grid Maker 適合肖像繪畫、臨摹練習、壁畫和大尺寸放大、課堂教學、插畫構圖，以及建立可列印格線紙。對初學者來說，格線可以降低臨摹難度；對老師來說，格線可以快速製作統一練習圖；對插畫師和壁畫創作者來說，格線能幫助檢查比例、構圖和放大關係。

## 方形、矩形、三角形和等距格線有什麼不同？

方形格線最經典，適合肖像、靜物、風景和大多數臨摹場景。矩形格線適合寬幅或直幅圖片。三角形格線適合幾何圖案、裝飾設計和技術繪圖。等距格線常用於 3D 風格繪圖、像素藝術、建築草圖、遊戲素材和技術插圖。

## 使用 Grid Maker 的實用技巧

如果你是初學者，可以先從較少格子開始，避免線條過密干擾觀察。轉移到紙張或畫布時，要保持參考圖和目標格線比例一致。格線較多時，建議開啟標籤，避免看錯行列。若要列印，請選擇對比度較高的線條顏色，確保格線清楚可見。

## 為什麼選擇線上 Grid Maker？

相比手動畫格線，線上 Grid Maker 更快、更準確，也更容易修改。相比專業設計軟體，線上工具更輕量，不需要安裝 Photoshop 或 Illustrator。對需要處理個人照片、客戶參考圖或學生作業的場景，瀏覽器本地處理也更安心，圖片不需要上傳。

## 開始建立你的繪畫格線

無論你是在練習肖像、準備臨摹、放大壁畫，還是為課堂製作練習紙，NanoImage Grid Maker 都可以幫你快速建立清晰、可自訂、可列印的繪畫格線。

**試試 NanoImage Grid Maker：建立你的免費線上繪畫格線。**`,
      },
    },
  },
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

[**Convert to WebP**](/convert-to-webp): /convert-to-webp

## Try it with NanoImage

Need to [compress images online](/compress-image) without uploading your files? Browse all [image optimization tools](/tools/optimize-images). You can also [resize images online](/resize-image) or [convert images to WebP](/convert-to-webp) before publishing.`,
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

[**Convert to WebP**](/convert-to-webp): /convert-to-webp

## Resize, then optimize

After resizing, [compress images online](/compress-image) or [convert images to WebP](/convert-to-webp). Browse [optimize images online](/tools/optimize-images) and [edit images online](/tools/edit-images) for related tools.`,
  },
  {
    slug: 'what-is-exif-data',
    category: 'Privacy',
    title: 'What is EXIF data and why remove it?',
    excerpt: 'Photos can include camera, time, and location metadata. Here is what to know before sharing.',
    date: '2025-05-03',
    readTime: '7 min read',
    metaDescription: 'What EXIF metadata reveals about you — GPS location, timestamps, device details — how to check it, and how to remove it in your browser without uploading your photo.',
    body: "Every photo you take carries a hidden second layer of information. Beyond the pixels, image files store metadata \u2014 and the most common metadata format is EXIF (Exchangeable Image File Format). Before you share a photo online, it is worth knowing exactly what that hidden layer says about you.\n\n## What is EXIF data?\n\nEXIF data is a block of structured metadata that cameras and phones embed inside JPG, TIFF, HEIC, and many RAW files the moment a photo is taken. It was designed in the 1990s so that cameras, printers, and editing software could exchange technical details about an image.\n\nTypical EXIF fields include:\n\n- **Date and time** the photo was taken, down to the second\n- **GPS coordinates** \u2014 the exact latitude and longitude, if location services were on\n- **Device details** \u2014 phone or camera model, sometimes the serial number\n- **Camera settings** \u2014 aperture, shutter speed, ISO, focal length, flash\n- **Software history** \u2014 which app or editor last saved the file\n- **Orientation** \u2014 how the camera was rotated, used by viewers to display the photo upright\n- Sometimes a small **embedded thumbnail** of the original shot\n\nNone of this is visible when you look at the picture, but it travels with the file when you email it, upload it to a form, or send it in a chat app that forwards originals.\n\n## Why EXIF data can be a privacy problem\n\nMost EXIF fields are harmless. Two categories are not.\n\n### 1. GPS location\n\nIf location tagging is enabled \u2014 and on most phones it is by default \u2014 every photo stores where it was taken with an accuracy of a few meters. Share an original photo of your home office, your child's room, or your backyard, and anyone who downloads the file can read your home address out of it with free tools.\n\nThis is not theoretical. Journalists, security researchers, and unfortunately also stalkers have repeatedly used photo metadata to locate people. Police departments and privacy organizations explicitly recommend stripping location data from photos of children before posting.\n\n### 2. Time + device fingerprinting\n\nThe combination of exact timestamps, device model, and software history can reveal more than you intend: when you are away from home, which devices you own, and whether an image was edited. For sellers on marketplaces, the timestamp can even contradict a listing (\"photo taken three years ago\").\n\n## When EXIF data is actually useful\n\nEXIF is not the villain \u2014 context is. Keep metadata when:\n\n- **You organize a photo library.** Date, camera, and lens data power search and albums.\n- **You are learning photography.** Reviewing aperture and shutter values of good shots is the fastest way to improve.\n- **You need proof of authorship or authenticity.** Original capture data can support copyright claims.\n- **You print photos.** Orientation and color-space fields help labs render correctly.\n\nStrip metadata when the file leaves your control: uploads to marketplaces, social media that keeps originals, forum posts, job applications, real-estate listings, or any photo of your home and family.\n\n## Do social networks remove EXIF for you?\n\nMostly on display, not always on ingest. Large platforms like Instagram, Facebook, and X strip metadata from the files other users download \u2014 but they read and keep the data for themselves (location history, device graphs). Messaging apps differ: sending a photo \"as a file\" or \"original quality\" usually keeps full EXIF, while standard compressed sending often removes it. Email attachments and cloud drive links always keep everything.\n\nThe safe rule: assume every original file you hand over still contains its metadata.\n\n## How to check what's in your photos\n\n- **Windows**: right-click the file \u2192 Properties \u2192 Details.\n- **macOS**: open in Preview \u2192 Tools \u2192 Show Inspector \u2192 the (i) tab.\n- **iPhone**: Photos app \u2192 swipe up on a photo (or tap \u24d8) to see date, camera, and a map.\n- **Android**: Google Photos \u2192 tap \u24d8.\n- **In your browser**: NanoImage's [Remove EXIF](/remove-exif) tool shows the metadata it finds before deleting it \u2014 without uploading the file anywhere.\n\n## How to remove EXIF data (without uploading your photo)\n\nThe irony of most \"EXIF remover\" websites: to remove private data, you upload your private photo to a stranger's server. That is exactly the step worth avoiding.\n\n[NanoImage Remove EXIF](/remove-exif) works differently \u2014 the file is processed entirely in your browser with the Canvas API. Nothing is uploaded, which you can verify in your browser's network tab:\n\n1. Open [Remove EXIF](/remove-exif).\n2. Drop in a JPG, PNG, or WebP photo.\n3. The tool re-encodes the image without the metadata block \u2014 GPS, timestamps, device info, all of it.\n4. Download the clean copy. The pixels are untouched; only the hidden data is gone.\n\nFor folders full of images, the [NanoImage CLI](/cli) does the same locally from the terminal: `nanoimage remove-exif ./photos --output ./clean`.\n\n## Does removing EXIF change image quality?\n\nRemoving metadata itself is lossless \u2014 EXIF lives in a separate segment of the file, not in the pixel data. Depending on the tool, the image may be re-encoded during the process; NanoImage keeps the original dimensions and lets you control output quality. File size usually drops slightly, since metadata (especially embedded thumbnails) can take up tens of kilobytes.\n\n## FAQ\n\n**Do screenshots contain EXIF data?**\nScreenshots contain basic metadata (device, time) but no GPS on most systems. Photos taken with the camera app are the ones that carry location.\n\n**Does WhatsApp remove EXIF?**\nStandard photo sending compresses images and strips most metadata. Sending as \"document/file\" keeps the original including GPS.\n\n**Can deleted EXIF be recovered?**\nNot from the cleaned file \u2014 the data is gone. But copies you shared earlier still have theirs.\n\n**Is EXIF the same as a watermark?**\nNo. A watermark is visible in the pixels; EXIF is invisible data alongside the pixels. To protect authorship visibly, use the [Add Watermark](/add-watermark) tool; to protect privacy, remove EXIF.\n\n---\n\n**Bottom line:** metadata is useful at home and risky in public. Check what your photos are telling the world, and strip it in your browser \u2014 not on someone else's server \u2014 with [Remove EXIF](/remove-exif).\n\n## Remove metadata before sharing\n\nUse [Remove EXIF Data](/remove-exif) in your browser, then explore [image privacy tools](/tools/privacy-protection) such as [blur private details in an image](/blur-image) and [pixelate an image online](/pixelate-image).",
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

[**Try NanoImage →**](https://nanoimage.net) | [Read the full 4-way comparison →](/blog/nanoimage-vs-tinypng-vs-squoosh-vs-photopea/)

## Related NanoImage tools

NanoImage's privacy-first workflow starts with [Compress Image Online](/compress-image). For folders of assets, try [Batch Compress](/batch-compress). Explore every [optimize images online](/tools/optimize-images) tool in one place, or [convert images to WebP](/convert-to-webp) for smaller web files.`,
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
  {
    slug: 'jpg-png-webp-avif',
    category: 'Tips',
    title: 'JPG vs PNG vs WebP vs AVIF: Which Image Format Compresses Best in 2025?',
    excerpt: 'Compare real compression results for JPG, PNG, WebP, and AVIF to find the right format for your images.',
    date: '2026-05-15',
    readTime: '10 min read',
    metaDescription: 'A practical comparison of JPG, PNG, WebP, and AVIF compression results, quality loss, transparency support, and browser compatibility. Find the best format for your use case.',
    coverImage: '/assets/blog/jpg-png-webp-avif-cover.png',
    body: `When people search for **"image format compression lossless quality 2025"** or **"AVIF image format compression quality comparison JPEG"**, they are usually trying to answer one practical question:

**If I convert the same image to JPG, PNG, WebP, and AVIF, which one gives me the smallest file without making the image look bad?**

The answer depends on the image type, the compression mode, and where the image will be used. In general:

- **JPG** is still great for photos and maximum compatibility.
- **PNG** is best for lossless screenshots, logos, UI graphics, and transparency.
- **WebP** is the safest modern web default.
- **AVIF** often gives the best compression, especially for photos, but still needs compatibility planning.

Let's compare them through the most important lens: **compression results**.

---

## 1. File Size: Which Format Compresses the Most?

File size is usually the main reason people compare image formats.

For the same original image, a typical compression result might look like this:

| Format | Typical File Size Result | Compression Style |
|---|---:|---|
| PNG | Largest for photos, often smaller for flat graphics | Lossless |
| JPG | Much smaller than PNG for photos | Lossy |
| WebP | Usually smaller than JPG at similar visual quality | Lossy or lossless |
| AVIF | Often smallest at similar visual quality | Lossy or lossless |

This does **not** mean AVIF is always the best choice. Compression efficiency depends heavily on the image:

- A **photo** usually compresses very well as JPG, WebP, or AVIF.
- A **screenshot with text** may look worse under aggressive lossy compression.
- A **logo with transparency** should not be saved as JPG.
- A **flat illustration** may compress well as PNG, WebP lossless, or AVIF.

As a practical rule, **AVIF usually wins on file size**, **WebP is the best balance**, **JPG is the safe classic**, and **PNG is the lossless transparency workhorse**.

---

## 2. Quality Loss: Smaller Is Not Always Better

Compression is only useful if the image still looks good.

There are two major types of compression:

### Lossy compression

Lossy compression reduces file size by permanently removing some image data. This can create visible artifacts, especially at high compression levels. JPG is the classic lossy format, while WebP and AVIF can also use lossy compression.

Common lossy artifacts include:

- Blocky edges
- Blurry details
- Color banding in gradients
- Noise around text or sharp lines
- Smudged textures

JPG can look excellent at moderate quality settings, especially for photos. But if pushed too far, it often shows block artifacts and rough gradients.

WebP usually keeps better visual quality than JPG at a similar file size.

AVIF can go even further. It is designed around AV1 image compression and supports lossy and lossless modes, high bit depth, HDR, and alpha transparency. In many photo scenarios, AVIF can preserve more detail at a smaller size than JPG.

### Lossless compression

Lossless compression reduces file size without discarding image data. When decoded, the pixels are preserved.

PNG is the most familiar lossless format. It is designed for lossless, portable, well-compressed raster images with optional alpha transparency.

WebP also supports lossless compression and alpha transparency.

AVIF supports lossless compression too, but in real-world workflows, lossless AVIF is not always the automatic winner. For UI assets, logos, and screenshots, WebP lossless or PNG may still be easier and more predictable.

---

## 3. Transparency Support: JPG Is the Odd One Out

Transparency matters for:

- Logos
- Stickers
- UI icons
- Product cutouts
- Overlay graphics
- Web design assets

Here is the simple breakdown:

| Format | Transparency Support |
|---|---|
| JPG | No |
| PNG | Yes |
| WebP | Yes |
| AVIF | Yes |

**JPG does not support transparent backgrounds**, so it is a poor choice for logos, icons, stickers, and UI elements that need alpha transparency.

**PNG is the traditional choice** for transparent images because it is lossless and widely supported.

**WebP supports transparency** and often creates smaller files than PNG for web use.

**AVIF also supports alpha transparency**, and it can be very efficient for optimizing modern websites.

---

## 4. Browser and Platform Compatibility

### JPG

JPG has the broadest compatibility. It works almost everywhere: browsers, phones, cameras, design tools, CMS platforms, social apps, and email clients.

Use JPG when you need the safest possible format for photographic images.

### PNG

PNG also has excellent compatibility. It is safe for screenshots, graphics, transparent assets, and images where exact pixel reproduction matters.

### WebP

WebP is now widely supported across major browsers including Chrome, Safari, Firefox, Edge, and Opera.

For most modern websites, **WebP is the best default export format** because it offers strong compression, good quality, transparency, and broad browser support.

### AVIF

AVIF support has improved a lot. Current support is strong across the main modern browser ecosystem.

That said, AVIF is newer than JPG, PNG, and WebP. For production websites, AVIF is best used with a fallback:

\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Example image">
</picture>
\`\`\`

This lets modern browsers load AVIF, while older environments fall back to WebP or JPG.

---

## 5. Best Use Cases by Format

### Use JPG for photos and maximum compatibility

Best for: **photographic images where transparency is not needed**.

Avoid JPG for: logos, screenshots with text, transparent images, and images that need repeated editing.

### Use PNG for screenshots, logos, and transparent graphics

Best for: **graphics where clean edges and exact pixels matter**.

Avoid PNG for: large photo-heavy images on websites, unless quality must be preserved exactly.

### Use WebP as the modern web default

Best for: **web images where you want a smaller file than JPG or PNG without taking major compatibility risks**.

Use WebP for: blog images, landing pages, product images, thumbnails, web graphics, and transparent web assets.

### Use AVIF for maximum compression

Best for: **photos, hero images, ecommerce images, and performance-focused websites**.

Use AVIF with fallback formats when compatibility matters.

---

## 6. Quick Decision Guide

- Need the **smallest file size**? Try **AVIF**.
- Need a **safe modern web format**? Use **WebP**.
- Need **maximum compatibility for photos**? Use **JPG**.
- Need **lossless quality or transparency**? Use **PNG** or **WebP lossless**.
- Need **transparent background with smaller web output**? Try **WebP** or **AVIF**.
- Need **pixel-perfect screenshots**? Use **PNG** first, then test WebP lossless.

---

## JPG vs PNG vs WebP vs AVIF Comparison Table

| Dimension | JPG | PNG | WebP | AVIF |
|---|---|---|---|---|
| File Size / Compression | Good for photos, smaller than PNG | Often large for photos, efficient for flat graphics | Usually smaller than JPG/PNG at similar quality | Often the smallest at similar visual quality |
| Compression Type | Mostly lossy | Lossless | Lossy and lossless | Lossy and lossless |
| Quality Loss | Can show artifacts at high compression | No quality loss | Good quality-to-size balance | Excellent quality-to-size ratio |
| Transparency | No | Yes | Yes | Yes |
| Browser Compatibility | Excellent | Excellent | Excellent in modern browsers | Strong modern support, but newer |
| Best For | Photos, social previews, email images | Screenshots, logos, icons, transparent graphics | General web images, thumbnails, transparent assets | High-performance websites, compressed photos |
| Main Weakness | No transparency, visible artifacts when over-compressed | Large file sizes for photos | Older tools may still prefer JPG/PNG | Slower encoding and weaker legacy compatibility |
| Recommended Role in 2025 | Safe fallback | Lossless graphics format | Default modern web format | Best compression format with fallback |

---

## Final Recommendation

For most websites in 2025, the best practical strategy is:

**Use AVIF for maximum compression, WebP as the reliable modern fallback, JPG for legacy photo compatibility, and PNG for lossless transparent graphics.**

No format wins every time. The best choice depends on the image itself.

Want to test the difference yourself? Use **NanoImage** to convert the same image into **JPG, PNG, WebP, and AVIF**, then compare compression results, quality, transparency, and real file size side by side.

## Convert formats with NanoImage

Use [Convert Image Online](/convert-image) for everyday format changes, [Convert JPG/PNG to WebP](/convert-to-webp) for web performance, and [Compress Image](/compress-image) after conversion. See all [convert image formats online](/tools/convert-formats) tools in one hub.`,
    localizations: {
      'zh-CN': {
        category: '技巧',
        title: 'JPG vs PNG vs WebP vs AVIF：2025 年哪种图片格式压缩效果最好？',
        excerpt: '对比 JPG、PNG、WebP 和 AVIF 的实际压缩结果，找到最适合你图片的格式。',
        readTime: '10 分钟阅读',
        metaDescription: '深度对比 JPG、PNG、WebP 和 AVIF 的压缩效果、画质损失、透明度支持和浏览器兼容性，为你的图片选择最合适的格式。',
        body: `当人们搜索"图片格式压缩无损质量 2025"或"AVIF 图片格式压缩质量对比 JPEG"时，他们通常想解答一个实际问题：

**如果把同一张图片转成 JPG、PNG、WebP 和 AVIF，哪种格式体积最小，画质最好？**

答案取决于图片类型、压缩模式和使用场景。总体来说：

- **JPG** 依然非常适合照片，兼容性最广。
- **PNG** 最适合无损截图、Logo、UI 图形和透明背景。
- **WebP** 是最安全的现代网络格式默认选择。
- **AVIF** 通常压缩率最高，尤其适合照片，但仍需考虑兼容性。

让我们从最重要的维度来对比：**压缩结果**。

---

## 1. 文件大小：哪种格式压缩率最高？

同一张原图，典型压缩结果如下：

| 格式 | 典型文件大小 | 压缩方式 |
|---|---:|---|
| PNG | 照片最大，扁平图形往往较小 | 无损 |
| JPG | 照片比 PNG 小很多 | 有损 |
| WebP | 相同视觉质量下通常比 JPG 更小 | 有损或无损 |
| AVIF | 相同视觉质量下通常最小 | 有损或无损 |

这**不代表** AVIF 始终是最佳选择。压缩效率很大程度上取决于图片本身：

- **照片**在 JPG、WebP 或 AVIF 下压缩效果都很好。
- **含文字的截图**在激进的有损压缩下可能变差。
- **带透明背景的 Logo** 不应保存为 JPG。
- **扁平插图**在 PNG、WebP 无损或 AVIF 下效果都不错。

实用经验：**AVIF 通常文件最小**，**WebP 是最佳平衡**，**JPG 是经典安全选项**，**PNG 是无损透明的主力格式**。

---

## 2. 画质损失：越小不一定越好

压缩只有在图片依然好看的前提下才有价值。

### 有损压缩

有损压缩通过永久删除部分图像数据来减小文件大小。常见的有损压缩痕迹：

- 边缘出现方块
- 细节模糊
- 渐变区域出现色带
- 文字或锐利边缘附近出现噪点

JPG 在中等质量设置下效果很好，但压缩过度时常出现方块痕迹和渐变不顺。

WebP 在相同文件大小下通常保持比 JPG 更好的视觉质量。

AVIF 基于 AV1 图像压缩，支持有损和无损模式、高位深、HDR 和 Alpha 透明。在很多照片场景中，AVIF 能在更小体积下保留更多细节。

### 无损压缩

无损压缩在不丢弃任何图像数据的情况下减小文件大小。PNG 是最常见的无损格式，WebP 和 AVIF 同样支持无损压缩。

对于 UI 资源、Logo 和截图，WebP 无损或 PNG 往往更简单可靠。

---

## 3. 透明度支持：JPG 是例外

| 格式 | 透明度支持 |
|---|---|
| JPG | 否 |
| PNG | 是 |
| WebP | 是 |
| AVIF | 是 |

**JPG 不支持透明背景**，不适合需要 Alpha 透明的 Logo、图标和 UI 元素。

**PNG** 是透明图片的传统选择，无损且兼容性广。

**WebP** 支持透明度，网页用途下通常比 PNG 文件更小。

**AVIF** 也支持 Alpha 透明，在优化现代网站时效率很高。

---

## 4. 浏览器和平台兼容性

**JPG**：兼容性最广，几乎在所有浏览器、手机、相机、设计工具和 CMS 平台中都能使用。

**PNG**：兼容性同样优秀，适合截图、图形和透明资源。

**WebP**：已在 Chrome、Safari、Firefox、Edge 和 Opera 等主流浏览器中广泛支持，是大多数现代网站的**最佳默认导出格式**。

**AVIF**：主流现代浏览器支持已相当强，但较新，建议在生产网站中使用回退方案：

\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="示例图片">
</picture>
\`\`\`

---

## 5. 各格式最佳使用场景

**JPG**：照片、博客配图、邮件图片、社交媒体预览。避免用于 Logo、含文字截图和透明图片。

**PNG**：无损质量、清晰文字、UI 截图、Logo、图标、透明背景。避免用于网站大量照片。

**WebP**：通用网页图片，希望比 JPG/PNG 文件更小但不承担重大兼容性风险。适用于博客、落地页、产品图、缩略图。

**AVIF**：照片、Hero 图片、电商图片和注重性能的网站。当兼容性重要时，配合回退格式使用。

---

## 6. 快速决策指南

- 需要**最小文件体积**？试试 **AVIF**。
- 需要**安全的现代网络格式**？使用 **WebP**。
- 需要**照片最广兼容性**？使用 **JPG**。
- 需要**无损质量或透明度**？使用 **PNG** 或 **WebP 无损**。
- 需要**透明背景且文件较小**？试试 **WebP** 或 **AVIF**。
- 需要**像素级精确截图**？先用 **PNG**，再测试 WebP 无损。

---

## JPG vs PNG vs WebP vs AVIF 对比表

| 维度 | JPG | PNG | WebP | AVIF |
|---|---|---|---|---|
| 压缩率 | 照片良好，比 PNG 小 | 照片往往较大 | 相同质量下通常更小 | 相同质量下通常最小 |
| 压缩类型 | 主要有损 | 无损 | 有损和无损 | 有损和无损 |
| 画质损失 | 高压缩下有伪影 | 无画质损失 | 良好的体积画质平衡 | 出色的体积画质比 |
| 透明度 | 否 | 是 | 是 | 是 |
| 浏览器兼容 | 极佳 | 极佳 | 现代浏览器极佳 | 现代浏览器强，较新 |
| 2025 推荐角色 | 安全回退格式 | 无损图形格式 | 默认现代网络格式 | 最佳压缩格式（搭配回退） |

---

## 最终建议

2025 年大多数网站的最佳实践是：

**用 AVIF 获得最高压缩率，用 WebP 作为可靠的现代回退，用 JPG 保证照片的旧版兼容，用 PNG 处理无损透明图形。**

没有哪种格式能赢得所有场景。最佳选择取决于图片本身。

想亲自测试差异？使用 **NanoImage** 把同一张图片转成 **JPG、PNG、WebP 和 AVIF**，直接对比压缩结果、质量、透明度和实际文件大小。`,
      },
      'zh-TW': {
        category: '技巧',
        title: 'JPG vs PNG vs WebP vs AVIF：2025 年哪種圖片格式壓縮效果最好？',
        excerpt: '對比 JPG、PNG、WebP 和 AVIF 的實際壓縮結果，找到最適合你圖片的格式。',
        readTime: '10 分鐘閱讀',
        metaDescription: '深度對比 JPG、PNG、WebP 和 AVIF 的壓縮效果、畫質損失、透明度支援和瀏覽器相容性，為你的圖片選擇最合適的格式。',
        body: `當人們搜尋「圖片格式壓縮無損品質 2025」或「AVIF 圖片格式壓縮品質對比 JPEG」時，通常想解答一個實際問題：

**如果把同一張圖片轉成 JPG、PNG、WebP 和 AVIF，哪種格式體積最小，畫質最好？**

答案取決於圖片類型、壓縮模式和使用場景。總體來說：

- **JPG** 依然非常適合照片，相容性最廣。
- **PNG** 最適合無損截圖、Logo、UI 圖形和透明背景。
- **WebP** 是最安全的現代網路格式預設選擇。
- **AVIF** 通常壓縮率最高，尤其適合照片，但仍需考慮相容性。

讓我們從最重要的維度來對比：**壓縮結果**。

---

## 1. 檔案大小：哪種格式壓縮率最高？

同一張原圖，典型壓縮結果如下：

| 格式 | 典型檔案大小 | 壓縮方式 |
|---|---:|---|
| PNG | 照片最大，扁平圖形往往較小 | 無損 |
| JPG | 照片比 PNG 小很多 | 有損 |
| WebP | 相同視覺品質下通常比 JPG 更小 | 有損或無損 |
| AVIF | 相同視覺品質下通常最小 | 有損或無損 |

壓縮效率很大程度上取決於圖片本身：

- **照片**在 JPG、WebP 或 AVIF 下壓縮效果都很好。
- **含文字的截圖**在激進的有損壓縮下可能變差。
- **帶透明背景的 Logo** 不應儲存為 JPG。

實用經驗：**AVIF 通常檔案最小**，**WebP 是最佳平衡**，**JPG 是經典安全選項**，**PNG 是無損透明的主力格式**。

---

## 2. 畫質損失：越小不一定越好

### 有損壓縮

有損壓縮通過永久刪除部分圖像資料來減小檔案大小。常見的有損壓縮痕跡：方塊邊緣、細節模糊、漸層色帶、雜訊。

JPG 在中等品質設定下效果很好，但壓縮過度時常出現方塊痕跡。WebP 在相同檔案大小下通常保持比 JPG 更好的視覺品質。AVIF 基於 AV1 圖像壓縮，支援有損和無損模式、高位深、HDR 和 Alpha 透明。

### 無損壓縮

PNG 是最常見的無損格式，WebP 和 AVIF 同樣支援無損壓縮。對於 UI 資源、Logo 和截圖，WebP 無損或 PNG 往往更簡單可靠。

---

## 3. 透明度支援：JPG 是例外

| 格式 | 透明度支援 |
|---|---|
| JPG | 否 |
| PNG | 是 |
| WebP | 是 |
| AVIF | 是 |

**JPG 不支援透明背景**，不適合需要 Alpha 透明的 Logo、圖示和 UI 元件。PNG 是透明圖片的傳統選擇，WebP 和 AVIF 也都支援透明度。

---

## 4. 瀏覽器和平台相容性

**JPG**：相容性最廣，幾乎在所有瀏覽器、手機和設計工具中都能使用。

**WebP**：已在 Chrome、Safari、Firefox、Edge 和 Opera 中廣泛支援，是大多數現代網站的**最佳預設匯出格式**。

**AVIF**：主流現代瀏覽器支援已相當強，建議在生產網站中使用回退方案：

\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="範例圖片">
</picture>
\`\`\`

---

## 5. 各格式最佳使用場景

**JPG**：照片、部落格配圖、郵件圖片。避免用於 Logo、含文字截圖和透明圖片。

**PNG**：無損品質、清晰文字、UI 截圖、Logo、圖示、透明背景。

**WebP**：通用網頁圖片，比 JPG/PNG 更小且相容性良好。適用於部落格、落地頁、產品圖、縮圖。

**AVIF**：照片、Hero 圖片、電商圖片和注重效能的網站。當相容性重要時，配合回退格式使用。

---

## 6. 快速決策指南

- 需要**最小檔案體積**？試試 **AVIF**。
- 需要**安全的現代網路格式**？使用 **WebP**。
- 需要**照片最廣相容性**？使用 **JPG**。
- 需要**無損品質或透明度**？使用 **PNG** 或 **WebP 無損**。

---

## JPG vs PNG vs WebP vs AVIF 對比表

| 維度 | JPG | PNG | WebP | AVIF |
|---|---|---|---|---|
| 壓縮率 | 照片良好，比 PNG 小 | 照片往往較大 | 相同品質下通常更小 | 相同品質下通常最小 |
| 壓縮類型 | 主要有損 | 無損 | 有損和無損 | 有損和無損 |
| 透明度 | 否 | 是 | 是 | 是 |
| 瀏覽器相容 | 極佳 | 極佳 | 現代瀏覽器極佳 | 現代瀏覽器強，較新 |
| 2025 推薦角色 | 安全回退格式 | 無損圖形格式 | 預設現代網路格式 | 最佳壓縮格式（搭配回退） |

---

## 最終建議

**用 AVIF 獲得最高壓縮率，用 WebP 作為可靠的現代回退，用 JPG 保證照片的舊版相容，用 PNG 處理無損透明圖形。**

想親自測試差異？使用 **NanoImage** 把同一張圖片轉成 **JPG、PNG、WebP 和 AVIF**，直接對比壓縮結果、品質、透明度和實際檔案大小。`,
      },
      ja: {
        category: 'ヒント',
        title: 'JPG vs PNG vs WebP vs AVIF：2025年最も圧縮効率の高い画像フォーマットはどれ？',
        excerpt: 'JPG、PNG、WebP、AVIFの実際の圧縮結果を比較して、用途に最適なフォーマットを選びましょう。',
        readTime: '10分で読めます',
        metaDescription: 'JPG、PNG、WebP、AVIFの圧縮効率・画質・透過サポート・ブラウザ互換性を実用的に比較。2025年のベストフォーマット選びガイド。',
        body: `「画像フォーマット 圧縮 無損 品質 2025」や「AVIF 画像フォーマット 圧縮 品質 比較 JPEG」で検索する人が知りたいのは、大抵ひとつの実践的な疑問です。

**同じ画像をJPG、PNG、WebP、AVIFに変換したとき、画質を損なわずに最も小さなファイルが得られるのはどれか？**

答えは画像の種類・圧縮モード・用途によって異なります。一般的には：

- **JPG** は写真と最大互換性に依然優れています。
- **PNG** は無損スクリーンショット・ロゴ・UI素材・透過画像に最適です。
- **WebP** は最も安全なモダンウェブのデフォルトです。
- **AVIF** は特に写真で最高の圧縮率を誇りますが、互換性計画が必要です。

最も重要な観点で比較しましょう：**圧縮結果**。

---

## 1. ファイルサイズ：どのフォーマットが最も圧縮できる？

同じ原画での典型的な結果：

| フォーマット | 典型的なファイルサイズ | 圧縮方式 |
|---|---:|---|
| PNG | 写真では最大、フラット画像は小さい | 可逆 |
| JPG | 写真でPNGより大幅に小さい | 非可逆 |
| WebP | 同等品質でJPGより小さいことが多い | 非可逆または可逆 |
| AVIF | 同等品質で最も小さいことが多い | 非可逆または可逆 |

実用的な経験則：**AVIFはサイズで勝つことが多い**、**WebPは最良のバランス**、**JPGは安全なクラシック**、**PNGは可逆透過のメイン形式**。

---

## 2. 画質の劣化：小さければ良いわけではない

### 非可逆圧縮

非可逆圧縮は一部の画像データを永久に削除してファイルサイズを減らします。よくある劣化：ブロックノイズ、ぼかし、グラデーションのバンディング。

JPGは中程度の品質設定で優れた見た目を維持しますが、圧縮しすぎるとブロックアーティファクトが現れます。WebPは同じファイルサイズでJPGより良い画質を維持することが多いです。AVIFはAV1ベースの圧縮で、高ビット深度・HDR・Alpha透過をサポートします。

### 可逆圧縮

PNGが最も一般的な可逆フォーマットです。WebPとAVIFも可逆圧縮をサポートします。UIアセット・ロゴ・スクリーンショットには、WebP可逆またはPNGの方が簡単で予測しやすいです。

---

## 3. 透過サポート：JPGだけが非対応

| フォーマット | 透過サポート |
|---|---|
| JPG | なし |
| PNG | あり |
| WebP | あり |
| AVIF | あり |

**JPGは透過背景をサポートしません。**PNG・WebP・AVIFはいずれもAlpha透過に対応しています。

---

## 4. ブラウザ・プラットフォーム互換性

**JPG**：最も広い互換性。ほぼすべての環境で動作します。

**WebP**：Chrome・Safari・Firefox・Edge・Operaなど主要ブラウザで広くサポートされています。多くの現代サイトで**最良のデフォルト出力フォーマット**です。

**AVIF**：主流のモダンブラウザでの対応は強化されています。本番サイトではフォールバックの使用を推奨します：

\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="サンプル画像">
</picture>
\`\`\`

---

## 5. フォーマット別の最適な使用場面

**JPG**：写真・ブログ画像・メール・SNSプレビュー。ロゴ・透過画像・テキスト入りスクリーンショットには不向き。

**PNG**：可逆品質・鮮明なテキスト・UIスクリーンショット・ロゴ・アイコン・透過背景。

**WebP**：JPGやPNGより小さく、大きな互換リスクなしのウェブ画像全般。

**AVIF**：写真・ヒーロー画像・EC商品画像・パフォーマンス重視サイト。互換性が重要な場合はフォールバックと併用。

---

## 6. クイック決断ガイド

- **最小ファイルサイズ**が必要？ → **AVIF**
- **安全なモダンウェブ形式**が必要？ → **WebP**
- **写真の最大互換性**が必要？ → **JPG**
- **可逆品質または透過**が必要？ → **PNG** または **WebP可逆**

---

## フォーマット比較表

| 項目 | JPG | PNG | WebP | AVIF |
|---|---|---|---|---|
| 圧縮率 | 写真に良い | 写真では大きい | 同等品質でより小さい | 同等品質で最小が多い |
| 透過 | なし | あり | あり | あり |
| ブラウザ互換 | 非常に高い | 非常に高い | モダンブラウザで高い | モダンブラウザで強い |
| 2025の推奨役割 | 安全なフォールバック | 可逆グラフィック | モダンウェブのデフォルト | 最高圧縮（フォールバック付き） |

---

## 最終的な推奨

**AVIFで最高の圧縮率を、WebPを信頼できるモダンフォールバックとして、JPGをレガシー写真互換に、PNGを可逆透過グラフィックに使いましょう。**

**NanoImage**で同じ画像をJPG・PNG・WebP・AVIFに変換して、圧縮結果・品質・透過・実際のファイルサイズを並べて比較してみてください。`,
      },
      ko: {
        category: '팁',
        title: 'JPG vs PNG vs WebP vs AVIF: 2025년 최고의 이미지 압축 포맷은?',
        excerpt: 'JPG, PNG, WebP, AVIF의 실제 압축 결과를 비교하여 이미지에 가장 적합한 포맷을 선택하세요.',
        readTime: '10분 읽기',
        metaDescription: 'JPG, PNG, WebP, AVIF의 압축 효율, 화질 손실, 투명도 지원, 브라우저 호환성을 실용적으로 비교합니다. 2025년 최적 포맷 선택 가이드.',
        body: `「이미지 포맷 압축 무손실 품질 2025」또는 「AVIF 이미지 포맷 압축 품질 비교 JPEG」를 검색하는 사람들은 대개 하나의 실용적인 질문에 답하려 합니다.

**같은 이미지를 JPG, PNG, WebP, AVIF로 변환하면 어떤 포맷이 화질을 유지하면서 파일 크기가 가장 작을까요?**

답은 이미지 종류, 압축 모드, 사용 환경에 따라 다릅니다. 일반적으로:

- **JPG**: 사진과 최대 호환성에 여전히 탁월합니다.
- **PNG**: 무손실 스크린샷, 로고, UI 그래픽, 투명 배경에 최적입니다.
- **WebP**: 가장 안전한 모던 웹 기본 포맷입니다.
- **AVIF**: 특히 사진에서 최고 압축률을 제공하지만 호환성 계획이 필요합니다.

가장 중요한 관점에서 비교해 보겠습니다: **압축 결과**.

---

## 1. 파일 크기: 어떤 포맷이 가장 많이 압축될까?

같은 원본 이미지의 전형적인 압축 결과:

| 포맷 | 전형적인 파일 크기 | 압축 방식 |
|---|---:|---|
| PNG | 사진은 가장 크고, 평면 그래픽은 작을 수 있음 | 무손실 |
| JPG | 사진에서 PNG보다 훨씬 작음 | 손실 |
| WebP | 동등 품질에서 JPG보다 보통 작음 | 손실 또는 무손실 |
| AVIF | 동등 품질에서 보통 가장 작음 | 손실 또는 무손실 |

실용 원칙: **AVIF는 파일 크기에서 자주 승리**, **WebP는 최고의 균형**, **JPG는 안전한 클래식**, **PNG는 무손실 투명도의 주력 포맷**.

---

## 2. 화질 손실: 작을수록 항상 좋은 것은 아닙니다

### 손실 압축

손실 압축은 일부 이미지 데이터를 영구적으로 제거하여 파일 크기를 줄입니다. 일반적인 손실 압축 아티팩트: 블록 노이즈, 흐릿한 디테일, 색상 밴딩.

JPG는 중간 품질 설정에서 뛰어난 결과를 보이지만 과도하게 압축하면 블록 아티팩트가 나타납니다. WebP는 같은 파일 크기에서 보통 JPG보다 더 좋은 화질을 유지합니다. AVIF는 AV1 기반 압축으로 설계되어 높은 비트 깊이, HDR, 알파 투명도를 지원합니다.

### 무손실 압축

PNG가 가장 친숙한 무손실 포맷입니다. WebP와 AVIF도 무손실 압축을 지원합니다. UI 에셋, 로고, 스크린샷에는 WebP 무손실 또는 PNG가 더 간단하고 예측 가능합니다.

---

## 3. 투명도 지원: JPG만 예외

| 포맷 | 투명도 지원 |
|---|---|
| JPG | 아니오 |
| PNG | 예 |
| WebP | 예 |
| AVIF | 예 |

**JPG는 투명 배경을 지원하지 않습니다.** PNG, WebP, AVIF는 모두 알파 투명도를 지원합니다.

---

## 4. 브라우저 및 플랫폼 호환성

**JPG**: 가장 광범위한 호환성. 거의 모든 환경에서 작동합니다.

**WebP**: Chrome, Safari, Firefox, Edge, Opera 등 주요 브라우저에서 광범위하게 지원됩니다. 대부분의 현대 웹사이트에서 **최적의 기본 내보내기 포맷**입니다.

**AVIF**: 주요 모던 브라우저 지원이 강화되었습니다. 프로덕션 사이트에서는 폴백 사용을 권장합니다:

\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="예시 이미지">
</picture>
\`\`\`

---

## 5. 포맷별 최적 사용 사례

**JPG**: 사진, 블로그 이미지, 이메일, SNS 미리보기. 로고, 투명 이미지, 텍스트 스크린샷에는 피하세요.

**PNG**: 무손실 품질, 선명한 텍스트, UI 스크린샷, 로고, 아이콘, 투명 배경.

**WebP**: 큰 호환성 위험 없이 JPG/PNG보다 작은 웹 이미지 전반.

**AVIF**: 사진, 히어로 이미지, 이커머스 이미지, 성능 중시 웹사이트.

---

## 6. 빠른 결정 가이드

- **최소 파일 크기**가 필요하다면? → **AVIF**
- **안전한 모던 웹 포맷**이 필요하다면? → **WebP**
- **사진의 최대 호환성**이 필요하다면? → **JPG**
- **무손실 품질 또는 투명도**가 필요하다면? → **PNG** 또는 **WebP 무손실**

---

## 포맷 비교표

| 항목 | JPG | PNG | WebP | AVIF |
|---|---|---|---|---|
| 압축률 | 사진에 좋음 | 사진은 큰 편 | 동등 품질에서 더 작음 | 동등 품질에서 가장 작음 |
| 투명도 | 아니오 | 예 | 예 | 예 |
| 브라우저 호환성 | 매우 높음 | 매우 높음 | 모던 브라우저 높음 | 모던 브라우저 강함 |
| 2025 추천 역할 | 안전한 폴백 | 무손실 그래픽 | 모던 웹 기본 포맷 | 최고 압축(폴백 포함) |

---

## 최종 권장사항

**AVIF로 최고의 압축률을, WebP를 신뢰할 수 있는 모던 폴백으로, JPG를 레거시 사진 호환성으로, PNG를 무손실 투명 그래픽으로 사용하세요.**

**NanoImage**를 사용해 같은 이미지를 JPG, PNG, WebP, AVIF로 변환하고 압축 결과, 화질, 투명도, 실제 파일 크기를 직접 비교해 보세요.`,
      },
      fr: {
        category: 'Conseils',
        title: 'JPG vs PNG vs WebP vs AVIF : quel format d\'image compresse le mieux en 2025 ?',
        excerpt: 'Comparez les résultats réels de compression entre JPG, PNG, WebP et AVIF pour choisir le bon format selon votre usage.',
        readTime: '10 min de lecture',
        metaDescription: 'Comparaison pratique entre JPG, PNG, WebP et AVIF : taille de fichier, perte de qualité, transparence et compatibilité navigateur. Guide pour choisir le meilleur format en 2025.',
        body: `Quand vous cherchez « compression format image sans perte qualité 2025 » ou « AVIF comparaison qualité compression JPEG », vous cherchez en général à répondre à une question pratique :

**Si je convertis la même image en JPG, PNG, WebP et AVIF, lequel donne le plus petit fichier sans dégrader l'image ?**

La réponse dépend du type d'image, du mode de compression et de l'usage prévu. En général :

- **JPG** reste excellent pour les photos et offre la plus grande compatibilité.
- **PNG** est idéal pour les captures d'écran sans perte, logos, UI et transparence.
- **WebP** est le choix web moderne le plus sûr par défaut.
- **AVIF** offre souvent la meilleure compression, surtout pour les photos, mais nécessite une planification de compatibilité.

---

## 1. Taille de fichier : quel format compresse le plus ?

Pour la même image originale, un résultat de compression typique ressemble à ceci :

| Format | Taille de fichier typique | Style de compression |
|---|---:|---|
| PNG | Le plus grand pour les photos, souvent plus petit pour les graphiques plats | Sans perte |
| JPG | Bien plus petit que PNG pour les photos | Avec perte |
| WebP | Généralement plus petit que JPG à qualité visuelle équivalente | Avec ou sans perte |
| AVIF | Souvent le plus petit à qualité visuelle équivalente | Avec ou sans perte |

Règle pratique : **AVIF gagne généralement sur la taille**, **WebP offre le meilleur équilibre**, **JPG est le classique sûr**, **PNG est le champion lossless**.

---

## 2. Perte de qualité : plus petit n'est pas toujours mieux

### Compression avec perte

La compression avec perte réduit la taille en supprimant définitivement des données d'image. Artefacts courants : bords en blocs, détails flous, bandes de couleur, bruit autour du texte.

JPG est excellent à des réglages de qualité modérés. WebP maintient généralement une meilleure qualité que JPG à même taille. AVIF est conçu autour de la compression AV1 avec mode HDR et alpha.

### Compression sans perte

PNG est le format sans perte le plus familier. WebP et AVIF supportent aussi la compression sans perte.

---

## 3. Transparence : JPG est l'exception

| Format | Support de la transparence |
|---|---|
| JPG | Non |
| PNG | Oui |
| WebP | Oui |
| AVIF | Oui |

**JPG ne supporte pas les fonds transparents.** PNG, WebP et AVIF supportent tous l'alpha.

---

## 4. Compatibilité navigateurs

**JPG** : la plus large compatibilité, fonctionne partout.

**WebP** : largement supporté par Chrome, Safari, Firefox, Edge et Opera. **Meilleur format d'export par défaut** pour la plupart des sites modernes.

**AVIF** : support fort dans les navigateurs modernes. Pour les sites en production, utilisez un fallback :

\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Exemple d'image">
</picture>
\`\`\`

---

## 5. Meilleurs cas d'usage par format

**JPG** : photos, images de blog, e-mails, aperçus réseaux sociaux. À éviter pour les logos, captures d'écran avec texte, images transparentes.

**PNG** : qualité sans perte, texte net, captures UI, logos, icônes, fonds transparents.

**WebP** : images web générales où vous voulez un fichier plus petit que JPG/PNG sans risque de compatibilité majeur.

**AVIF** : photos, images hero, e-commerce, sites axés sur la performance. Utilisez avec fallback si la compatibilité est importante.

---

## 6. Guide de décision rapide

- **Taille de fichier minimale** ? → **AVIF**
- **Format web moderne et sûr** ? → **WebP**
- **Compatibilité maximale pour les photos** ? → **JPG**
- **Qualité sans perte ou transparence** ? → **PNG** ou **WebP lossless**

---

## Tableau comparatif

| Dimension | JPG | PNG | WebP | AVIF |
|---|---|---|---|---|
| Taille / Compression | Bien pour les photos | Grand pour les photos | Plus petit à qualité équivalente | Souvent le plus petit |
| Transparence | Non | Oui | Oui | Oui |
| Compatibilité | Excellente | Excellente | Excellente (navigateurs modernes) | Forte (navigateurs modernes) |
| Rôle recommandé 2025 | Fallback sûr | Format graphique sans perte | Format web moderne par défaut | Meilleure compression avec fallback |

---

## Recommandation finale

**Utilisez AVIF pour la compression maximale, WebP comme fallback moderne fiable, JPG pour la compatibilité photo legacy, et PNG pour les graphiques transparents sans perte.**

Envie de tester vous-même ? Utilisez **NanoImage** pour convertir la même image en JPG, PNG, WebP et AVIF et comparer les résultats côte à côte.`,
      },
      es: {
        category: 'Consejos',
        title: 'JPG vs PNG vs WebP vs AVIF: ¿Qué formato de imagen comprime mejor en 2025?',
        excerpt: 'Compara los resultados reales de compresión entre JPG, PNG, WebP y AVIF para elegir el mejor formato según tu caso de uso.',
        readTime: '10 min de lectura',
        metaDescription: 'Comparación práctica entre JPG, PNG, WebP y AVIF: tamaño de archivo, pérdida de calidad, transparencia y compatibilidad de navegadores. Guía para elegir el mejor formato en 2025.',
        body: `Cuando alguien busca «compresión formato imagen sin pérdida calidad 2025» o «AVIF comparación calidad compresión JPEG», generalmente intenta responder una pregunta práctica:

**Si convierto la misma imagen a JPG, PNG, WebP y AVIF, ¿cuál da el archivo más pequeño sin que la imagen se vea mal?**

La respuesta depende del tipo de imagen, el modo de compresión y el uso previsto. En general:

- **JPG** sigue siendo excelente para fotos y tiene la mayor compatibilidad.
- **PNG** es mejor para capturas sin pérdida, logos, UI y transparencia.
- **WebP** es el formato web moderno más seguro por defecto.
- **AVIF** suele ofrecer la mejor compresión, especialmente para fotos, pero requiere planificación de compatibilidad.

---

## 1. Tamaño de archivo: ¿Qué formato comprime más?

Para la misma imagen original, un resultado típico de compresión sería:

| Formato | Tamaño típico | Tipo de compresión |
|---|---:|---|
| PNG | El mayor para fotos, a menudo menor para gráficos planos | Sin pérdida |
| JPG | Mucho menor que PNG para fotos | Con pérdida |
| WebP | Generalmente menor que JPG a calidad visual similar | Con o sin pérdida |
| AVIF | A menudo el más pequeño a calidad visual similar | Con o sin pérdida |

Regla práctica: **AVIF suele ganar en tamaño**, **WebP es el mejor equilibrio**, **JPG es el clásico seguro**, **PNG es el rey de la transparencia sin pérdida**.

---

## 2. Pérdida de calidad: más pequeño no siempre es mejor

### Compresión con pérdida

La compresión con pérdida reduce el tamaño eliminando datos de imagen permanentemente. Artefactos comunes: bordes en bloques, detalles borrosos, bandas de color, ruido alrededor del texto.

JPG es excelente a ajustes de calidad moderados. WebP suele mantener mejor calidad que JPG al mismo tamaño. AVIF está diseñado alrededor de la compresión AV1 con soporte HDR y alpha.

### Compresión sin pérdida

PNG es el formato sin pérdida más familiar. WebP y AVIF también soportan compresión sin pérdida.

---

## 3. Soporte de transparencia: JPG es la excepción

| Formato | Soporte de transparencia |
|---|---|
| JPG | No |
| PNG | Sí |
| WebP | Sí |
| AVIF | Sí |

**JPG no soporta fondos transparentes.** PNG, WebP y AVIF soportan transparencia alpha.

---

## 4. Compatibilidad con navegadores

**JPG**: la más amplia compatibilidad, funciona en todas partes.

**WebP**: ampliamente soportado en Chrome, Safari, Firefox, Edge y Opera. **El mejor formato de exportación por defecto** para la mayoría de sitios modernos.

**AVIF**: soporte fuerte en navegadores modernos. Para sitios en producción, usa un fallback:

\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Imagen de ejemplo">
</picture>
\`\`\`

---

## 5. Mejores casos de uso por formato

**JPG**: fotos, imágenes de blog, correos, previsualizaciones en redes sociales. Evitar para logos, capturas con texto, imágenes transparentes.

**PNG**: calidad sin pérdida, texto nítido, capturas UI, logos, iconos, fondos transparentes.

**WebP**: imágenes web generales donde quieres archivos más pequeños que JPG/PNG sin riesgos de compatibilidad importantes.

**AVIF**: fotos, imágenes hero, e-commerce, sitios enfocados en el rendimiento. Usar con fallback cuando la compatibilidad importe.

---

## 6. Guía de decisión rápida

- ¿Necesitas el **menor tamaño de archivo**? → **AVIF**
- ¿Necesitas un **formato web moderno y seguro**? → **WebP**
- ¿Necesitas **máxima compatibilidad para fotos**? → **JPG**
- ¿Necesitas **calidad sin pérdida o transparencia**? → **PNG** o **WebP lossless**

---

## Tabla comparativa

| Dimensión | JPG | PNG | WebP | AVIF |
|---|---|---|---|---|
| Compresión | Buena para fotos | Grande para fotos | Más pequeño a igual calidad | A menudo el más pequeño |
| Transparencia | No | Sí | Sí | Sí |
| Compatibilidad | Excelente | Excelente | Excelente (navegadores modernos) | Fuerte (navegadores modernos) |
| Rol recomendado 2025 | Fallback seguro | Gráficos sin pérdida | Formato web moderno por defecto | Mejor compresión con fallback |

---

## Recomendación final

**Usa AVIF para máxima compresión, WebP como fallback moderno fiable, JPG para compatibilidad legacy en fotos, y PNG para gráficos transparentes sin pérdida.**

¿Quieres probar la diferencia tú mismo? Usa **NanoImage** para convertir la misma imagen a JPG, PNG, WebP y AVIF y comparar los resultados directamente.`,
      },
      pt: {
        category: 'Dicas',
        title: 'JPG vs PNG vs WebP vs AVIF: Qual formato de imagem comprime melhor em 2025?',
        excerpt: 'Compare os resultados reais de compressão entre JPG, PNG, WebP e AVIF para escolher o melhor formato para cada caso.',
        readTime: '10 min de leitura',
        metaDescription: 'Comparação prática entre JPG, PNG, WebP e AVIF: tamanho de arquivo, perda de qualidade, suporte à transparência e compatibilidade com navegadores. Guia para 2025.',
        body: `Quando alguém pesquisa «compressão formato imagem sem perda qualidade 2025» ou «AVIF comparação qualidade compressão JPEG», geralmente tenta responder uma pergunta prática:

**Se eu converter a mesma imagem para JPG, PNG, WebP e AVIF, qual dá o menor arquivo sem prejudicar a aparência da imagem?**

A resposta depende do tipo de imagem, do modo de compressão e do uso pretendido. Em geral:

- **JPG** ainda é ótimo para fotos e tem a maior compatibilidade.
- **PNG** é melhor para capturas sem perda, logos, UI e transparência.
- **WebP** é o padrão web moderno mais seguro.
- **AVIF** costuma oferecer a melhor compressão, especialmente para fotos, mas requer planejamento de compatibilidade.

---

## 1. Tamanho de arquivo: qual formato comprime mais?

Para a mesma imagem original, um resultado típico de compressão seria:

| Formato | Tamanho de arquivo típico | Tipo de compressão |
|---|---:|---|
| PNG | O maior para fotos, muitas vezes menor para gráficos planos | Sem perda |
| JPG | Muito menor que PNG para fotos | Com perda |
| WebP | Geralmente menor que JPG a qualidade visual semelhante | Com ou sem perda |
| AVIF | Muitas vezes o menor a qualidade visual semelhante | Com ou sem perda |

Regra prática: **AVIF geralmente vence em tamanho**, **WebP tem o melhor equilíbrio**, **JPG é o clássico seguro**, **PNG é o campeão do lossless**.

---

## 2. Perda de qualidade: menor nem sempre é melhor

### Compressão com perda

A compressão com perda reduz o tamanho removendo dados de imagem permanentemente. Artefatos comuns: bordas em blocos, detalhes borrados, faixas de cor, ruído ao redor do texto.

JPG é excelente em configurações de qualidade moderadas. WebP geralmente mantém melhor qualidade que JPG no mesmo tamanho. AVIF é projetado em torno da compressão AV1 com suporte a HDR e alfa.

### Compressão sem perda

PNG é o formato sem perda mais familiar. WebP e AVIF também suportam compressão sem perda.

---

## 3. Suporte à transparência: JPG é a exceção

| Formato | Suporte à transparência |
|---|---|
| JPG | Não |
| PNG | Sim |
| WebP | Sim |
| AVIF | Sim |

**JPG não suporta fundos transparentes.** PNG, WebP e AVIF suportam transparência alfa.

---

## 4. Compatibilidade com navegadores

**JPG**: compatibilidade mais ampla, funciona em quase todo lugar.

**WebP**: amplamente suportado no Chrome, Safari, Firefox, Edge e Opera. **Melhor formato de exportação padrão** para a maioria dos sites modernos.

**AVIF**: suporte forte nos principais navegadores modernos. Para sites em produção, use um fallback:

\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Imagem de exemplo">
</picture>
\`\`\`

---

## 5. Melhores casos de uso por formato

**JPG**: fotos, imagens de blog, e-mails, visualizações em redes sociais. Evitar para logos, capturas com texto, imagens transparentes.

**PNG**: qualidade sem perda, texto nítido, capturas de UI, logos, ícones, fundos transparentes.

**WebP**: imagens web gerais onde você quer arquivos menores que JPG/PNG sem grandes riscos de compatibilidade.

**AVIF**: fotos, imagens hero, e-commerce, sites focados em performance. Use com fallback quando a compatibilidade importa.

---

## 6. Guia de decisão rápida

- Precisa do **menor tamanho de arquivo**? → **AVIF**
- Precisa de um **formato web moderno e seguro**? → **WebP**
- Precisa de **máxima compatibilidade para fotos**? → **JPG**
- Precisa de **qualidade sem perda ou transparência**? → **PNG** ou **WebP lossless**

---

## Tabela comparativa

| Dimensão | JPG | PNG | WebP | AVIF |
|---|---|---|---|---|
| Compressão | Boa para fotos | Grande para fotos | Menor a qualidade igual | Muitas vezes o menor |
| Transparência | Não | Sim | Sim | Sim |
| Compatibilidade | Excelente | Excelente | Excelente (navegadores modernos) | Forte (navegadores modernos) |
| Papel recomendado 2025 | Fallback seguro | Gráficos sem perda | Formato web moderno padrão | Melhor compressão com fallback |

---

## Recomendação final

**Use AVIF para compressão máxima, WebP como fallback moderno confiável, JPG para compatibilidade legacy em fotos, e PNG para gráficos transparentes sem perda.**

Quer testar a diferença você mesmo? Use o **NanoImage** para converter a mesma imagem em JPG, PNG, WebP e AVIF e comparar os resultados lado a lado.`,
      },
      ru: {
        category: 'Советы',
        title: 'JPG vs PNG vs WebP vs AVIF: какой формат изображений сжимается лучше всего в 2025 году?',
        excerpt: 'Сравните реальные результаты сжатия JPG, PNG, WebP и AVIF, чтобы выбрать лучший формат для вашего контента.',
        readTime: '10 мин чтения',
        metaDescription: 'Практическое сравнение JPG, PNG, WebP и AVIF: размер файла, потеря качества, поддержка прозрачности и совместимость с браузерами. Руководство по выбору лучшего формата в 2025 году.',
        body: `Когда люди ищут «сжатие формата изображений без потерь качество 2025» или «AVIF сравнение качества сжатия JPEG», они обычно хотят ответить на один практический вопрос:

**Если конвертировать одно изображение в JPG, PNG, WebP и AVIF, какой формат даёт наименьший файл без ухудшения качества?**

Ответ зависит от типа изображения, режима сжатия и условий использования. В целом:

- **JPG** по-прежнему отлично подходит для фотографий и обеспечивает максимальную совместимость.
- **PNG** лучший выбор для скриншотов без потерь, логотипов, UI-графики и прозрачности.
- **WebP** — самый безопасный современный стандарт для веба.
- **AVIF** часто даёт лучшее сжатие, особенно для фотографий, но требует планирования совместимости.

---

## 1. Размер файла: какой формат сжимает больше?

Для одного исходного изображения типичный результат сжатия:

| Формат | Типичный размер файла | Тип сжатия |
|---|---:|---|
| PNG | Наибольший для фото, часто меньший для плоской графики | Без потерь |
| JPG | Намного меньше PNG для фотографий | С потерями |
| WebP | Обычно меньше JPG при аналогичном качестве | С потерями или без |
| AVIF | Часто наименьший при аналогичном качестве | С потерями или без |

Практическое правило: **AVIF обычно выигрывает по размеру**, **WebP лучший баланс**, **JPG безопасный классик**, **PNG главный формат для прозрачности без потерь**.

---

## 2. Потеря качества: меньше не всегда лучше

### Сжатие с потерями

Сжатие с потерями уменьшает размер, удаляя часть данных изображения навсегда. Типичные артефакты: блочные края, смазанные детали, полосы на градиентах, шум вокруг текста.

JPG отлично выглядит при умеренных настройках качества. WebP обычно сохраняет лучшее качество, чем JPG при том же размере. AVIF построен на основе сжатия AV1 и поддерживает высокую глубину цвета, HDR и альфа-прозрачность.

### Сжатие без потерь

PNG — самый известный формат без потерь. WebP и AVIF также поддерживают сжатие без потерь.

---

## 3. Поддержка прозрачности: JPG — исключение

| Формат | Поддержка прозрачности |
|---|---|
| JPG | Нет |
| PNG | Да |
| WebP | Да |
| AVIF | Да |

**JPG не поддерживает прозрачный фон.** PNG, WebP и AVIF поддерживают альфа-канал.

---

## 4. Совместимость с браузерами

**JPG**: самая широкая совместимость, работает практически везде.

**WebP**: широко поддерживается в Chrome, Safari, Firefox, Edge и Opera. **Лучший формат экспорта по умолчанию** для большинства современных сайтов.

**AVIF**: поддержка в основных современных браузерах значительно улучшилась. Для продакшн-сайтов рекомендуется использовать фолбек:

\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Пример изображения">
</picture>
\`\`\`

---

## 5. Лучшие сценарии использования по форматам

**JPG**: фотографии, изображения в блоге, e-mail, превью в соцсетях. Избегайте для логотипов, скриншотов с текстом, прозрачных изображений.

**PNG**: качество без потерь, чёткий текст, UI-скриншоты, логотипы, иконки, прозрачный фон.

**WebP**: общие веб-изображения, где нужен меньший файл, чем JPG/PNG, без значительных рисков совместимости.

**AVIF**: фотографии, hero-изображения, e-commerce, сайты, ориентированные на производительность. Используйте с фолбеком, если совместимость важна.

---

## 6. Быстрое руководство по выбору

- Нужен **минимальный размер файла**? → **AVIF**
- Нужен **безопасный современный веб-формат**? → **WebP**
- Нужна **максимальная совместимость для фото**? → **JPG**
- Нужно **качество без потерь или прозрачность**? → **PNG** или **WebP lossless**

---

## Сравнительная таблица

| Параметр | JPG | PNG | WebP | AVIF |
|---|---|---|---|---|
| Сжатие | Хорошо для фото | Крупный для фото | Меньше при равном качестве | Часто наименьший |
| Прозрачность | Нет | Да | Да | Да |
| Совместимость | Отличная | Отличная | Отличная (совр. браузеры) | Высокая (совр. браузеры) |
| Роль в 2025 | Безопасный фолбек | Графика без потерь | Стандарт для совр. веба | Лучшее сжатие с фолбеком |

---

## Итоговая рекомендация

**Используйте AVIF для максимального сжатия, WebP как надёжный современный фолбек, JPG для совместимости с устаревшими системами, и PNG для прозрачной графики без потерь.**

Хотите проверить разницу самостоятельно? Используйте **NanoImage**, чтобы конвертировать одно изображение в JPG, PNG, WebP и AVIF и сравнить результаты напрямую.`,
      },
    },
  },
  {
    slug: 'how-to-make-passport-photo-online-for-free',
    category: 'Tips',
    title: 'Passport Photo Requirements by Country (2026): Size, Background, Pixels & File Limits',
    excerpt:
      'Compare passport photo requirements across major countries and regions, including size families, background rules, pixel guidance, and upload limits.',
    date: '2026-06-08',
    readTime: '12 min read',
    metaDescription:
      '2026 guide to passport photo requirements by country: size, background, pixels, file limits, common rejection reasons, and final submission checklist.',
    coverImage: '/assets/blog/passport-photo-maker-cover.png',
    body: `There is no single international passport photo size that works for every country.

What is broadly standardized is biometric quality: front-facing pose, neutral expression, visible eyes, even lighting, and a plain background. But print size, pixel dimensions, background color, and file-size limits still vary by country and portal.

This 2026 guide compares common country requirements and highlights the mistakes that most often cause rejections.

## Quick Comparison

| Country / Region | Common Print Size | Typical Note |
|---|---:|---|
| United States | 2 × 2 in / 51 × 51 mm | White/off-white background, head 25-35 mm |
| United Kingdom | 35 × 45 mm | Printed photo 45 × 35 mm |
| Canada | 50 × 70 mm | Rules vary by route |
| France | 35 × 45 mm | White background is not accepted |
| Spain | 32 × 26 mm | Smaller than many EU formats |
| China (visa) | 33 × 48 mm | White background, head-size constraints |
| India (common Passport Seva route) | ICAO style, often 630 × 810 px | Face 80-85% |

Always verify the latest official portal before submission.

## What Is Actually Standardized

ICAO Doc 9303 focuses on biometric quality, not one global print size.

Common agreements:

- Front-facing portrait
- Neutral expression
- Eyes clearly visible
- Even light
- No heavy retouching

Common differences:

- Print size
- Pixel dimensions
- Background color
- File-size limits

## Frequent Rejection Reasons

- Wrong pixel dimensions
- File too large
- Wrong background color
- Face cropped too tightly
- Blurry source image
- Heavy beauty filters

## 2025-2026 Caution Points

- India routes can differ across Passport Seva, OCI, visa, and consular flows
- France does not accept white background for official identity photos
- Spain often uses 32 × 26 mm
- China visa routes often use 33 × 48 mm

## Submission Checklist

1. Confirm the exact document type.  
2. Confirm the exact official portal.  
3. Match print size and pixel dimensions.  
4. Check file format and file-size limit.  
5. Verify background color and face position.

## Privacy

Passport and ID photos are sensitive. Browser-based local processing helps reduce server uploads.

NanoImage Passport Photo Maker helps you prepare size, background, DPI, and file-size constraints in one workflow.

## Edit & optimize passport photos

After preparing your photo, use [Compress Image to 200KB](/compress-image-to-200kb) when forms enforce a limit. Browse [edit images online](/tools/edit-images) and [Passport Photo Maker](/passport-photo).`,
    localizations: {
      'zh-CN': {
        category: '技巧',
        title: '2026 各国护照照片要求：尺寸、背景、像素与文件大小限制',
        excerpt: '对比美国、英国、法国、西班牙、中国、印度等国家和地区的护照照片要求，重点解释尺寸家族、背景颜色与线上上传限制。',
        readTime: '12 分钟阅读',
        metaDescription: '2026 各国护照照片要求详解：尺寸、背景、像素、文件大小、常见拒签原因与提交前核对清单。',
        body: `很多人以为“护照照片只有少数几个国际通用尺寸”，这个说法方便记忆，但并不准确。

更实用的事实是：

**不存在唯一的国际护照照片尺寸。** 真正较为统一的是生物识别人脸几何要求（正面、头位、眼睛可见、表情中性、光线均匀、背景简洁）。而打印尺寸、背景颜色、像素尺寸、文件大小限制，仍然因国家和申请入口而变化。

本文将对比 2026 年常见国家/地区的护照照片要求，解释主流尺寸家族，并总结最容易导致照片被拒的错误。

> **重要提示：** 护照、签证和证件照规则会更新。提交前请务必以官方政府网站或官方申请入口的最新说明为准。

## 快速对照表

| 国家 / 地区 | 打印尺寸 | 数字 / 像素指引 | 头部 / 脸部指引 | 背景 |
|---|---:|---:|---:|---|
| **美国** | 2 × 2 英寸 / 51 × 51 mm | 签证照常见 600 × 600 到 1200 × 1200 px；线上护照上传可能还有文件大小规则 | 头高 25–35 mm | 白色或类白色 |
| **英国** | 35 × 45 mm | 数字照片规则因申请流程而异；纸质照片固定 45 × 35 mm | 纸质照头高 29–34 mm | 浅色纯背景 |
| **加拿大** | 50 × 70 mm | 因申请路径而异 | 通常人像占比更大 | 纯白或浅色（按具体入口） |
| **法国** | 35 × 45 mm | 因申请路径而异 | 正面、中性、眼睛可见 | 浅色纯背景（浅蓝/浅灰）；**不允许纯白** |
| **德国** | 35 × 45 mm | 因申请路径而异 | ICAO 风格生物识别照 | 浅灰或浅色纯背景 |
| **西班牙** | 32 × 26 mm | 因领馆 / 文件路径而异 | 正面且可清晰识别 | 白色、纯色、均匀背景 |
| **意大利 / 申根签证** | 常见 35 × 45 mm | 因领馆 / 签证路径而异 | ICAO 风格生物识别照 | 浅色纯背景 |
| **日本** | 35 × 45 mm | 因申请路径而异 | ICAO 风格生物识别照 | 白色或浅色纯背景 |
| **韩国** | 35 × 45 mm | 因申请路径而异 | ICAO 风格生物识别照 | 纯白 |
| **中国** | 签证常见 33 × 48 mm | 各签证中心常见 33 × 48 mm；具体上传规则因入口而异 | 头高 28–33 mm；头宽 15–22 mm | 白色 |
| **印度** | Passport Seva 常见 ICAO 指引；部分路径会出现 45 × 35 mm / 35 × 45 mm 表述差异 | Passport Seva 常见 630 × 810 px，白底，脸部占 80–85% | 脸部占 80–85% | 白色 |
| **澳大利亚** | 35 × 45 mm | 因申请路径而异 | ICAO 风格生物识别照 | 浅色纯背景 |
| **巴西** | 50 × 70 mm / 5 × 7 cm | 因申请路径而异 | ICAO 风格生物识别照 | 白色 |
| **爱尔兰** | 35 × 45 mm | 因申请路径而异 | ICAO 风格生物识别照 | 白色 / 浅灰 |
| **俄罗斯** | 35 × 45 mm | 因申请路径而异 | ICAO 风格生物识别照 | 白色 |
| **南非** | 35 × 45 mm | 因申请路径而异 | ICAO 风格生物识别照 | 白色 |

这张表用于前期规划，不构成最终法律依据。请以你要提交的**国家 + 文件类型 + 具体入口**为准。

## 真正“标准化”的是什么？

很多文章把 35 × 45 mm 叫作“国际标准”，这个说法不完整。  
现代旅行证件更核心的国际基准是 **ICAO Doc 9303**，重点在生物识别质量与脸部几何，不等于所有国家都用同一打印尺寸。

跨国较一致的通常是：

- 面向镜头
- 表情中性
- 眼睛清晰可见
- 光线均匀
- 无明显阴影
- 无重度修图/滤镜
- 纯净背景
- 头部位置正确

差异最常见在：

- 打印尺寸
- 像素尺寸
- 背景颜色
- 文件大小上限
- 是否允许眼镜
- 线上是否需要特殊压缩
- 护照、签证、ID、居留证是否共用同一照片

所以一国可用的照片，另一国不一定接受。

## 三大尺寸家族

### 1）35 × 45 mm 家族

这是最常见的护照/签证尺寸家族，英国、法国、德国、意大利/申根常见路径、日本、韩国、澳洲、爱尔兰、俄罗斯、南非等都经常出现。

但“同尺寸 ≠ 可互换”。例如法国官方证件照不允许纯白背景，而许多国家允许或要求白色。

### 2）2 × 2 英寸方形家族

美国是代表。官方护照照为 **2 × 2 英寸 / 51 × 51 mm**，头高 **25–35 mm**。  
这个方形尺寸不是全球通用尺寸，不能默认复用于英国、欧盟、中国、西班牙、加拿大等申请。

### 3）离群尺寸（最易出错）

- **加拿大：** 50 × 70 mm  
- **中国：** 签证常见 33 × 48 mm  
- **西班牙：** 32 × 26 mm  
- **巴西：** 50 × 70 mm / 5 × 7 cm

这些最容易因为“带了一张所谓标准证件照”而被退件。

## 背景颜色：隐形拒收点

很多人先看尺寸，忽略背景。实际上背景经常是拒收关键。

常见模式：

- **白色或类白：** 美国
- **浅色纯背景：** 英国及许多路径
- **浅蓝或浅灰，非白色：** 法国
- **白色：** 西班牙部分领馆与中国签证常见要求
- **白色：** 印度 Passport Seva 常见 ICAO 指引

危险误区是“白底永远安全”。  
并非如此，法国官方 ANTS 指引明确不允许白底。

## 2025–2026 需要特别注意的点

### 印度：必须按“具体入口”核对

印度相关路径信息较分散。Passport Seva 的 ICAO 指引常见 **630 × 810 px**、白底、脸部占 **80–85%**。同时海外入口也有关于 ICAO 合规照片的时间节点提示。  
但 OCI、签证、海外领馆路径可能出现不同表述，最稳妥做法是按你实际提交入口逐项核对。

### 法国：不是白底

法国最容易背景出错。官方证件照要求浅色纯背景（如浅蓝、浅灰），白底不允许。

### 西班牙：尺寸更小

西班牙常见领馆护照指引是 **32 × 26 mm**，小于多数欧洲国家常见的 35 × 45 mm。

### 中国：33 × 48 mm + 白底

中国签证中心常见指引为 **48 × 33 mm（即 33 × 48 mm）**，并有头高头宽范围；具体数字上传规则仍可能因签证中心或入口而变。

## 线上申请时，数字规格常比打印尺寸更关键

线上系统可能同时校验：

- 像素尺寸
- 文件类型
- 文件大小
- 背景颜色
- 脸部位置
- 图像质量与修图痕迹

所以“看起来对”不等于“上传可通过”。常见失败原因包括：尺寸不对、文件过大、压缩过度导致发虚、背景色错误、阴影重、滤镜过强等。

## 跨国最常见拒收错误

- 用美国 2 × 2 去投英国/欧盟
- 用 35 × 45 去投西班牙
- 法国证件照使用白底
- 默认印度所有入口同一规格
- 忽略线上文件大小限制
- 脸部裁切过近
- 用自拍广角畸变图
- 复用过旧照片
- 未核对最新官方页面

## 一次做对的实操清单

1. 明确具体文件类型（护照/签证/ID/居留）。  
2. 明确签发机构与申请入口。  
3. 匹配精确尺寸，不凭经验猜。  
4. 同时核对像素与文件大小限制。  
5. 背景颜色按官方要求，不想当然。  
6. 使用近期、未重度修饰照片。  
7. 提交前回到官方页面做最终核对。

## 在浏览器里私密处理证件照

护照、签证和 ID 照是高度敏感人像数据。  
很多工具会先把图片上传服务器再处理，这在证件场景下会增加隐私顾虑。

**NanoImage Passport Photo Maker** 采用浏览器端工作流，可在本地完成尺寸、背景、DPI 和文件大小设置，流程更直接、隐私更可控。

适用场景包括：

- 2 × 2 英寸证件照
- 35 × 45 mm 证件照
- 白/浅蓝/浅灰背景处理
- JPG / PNG 导出
- DPI 设置
- 按 KB 上限压缩
- 打印版排版

> 需要严格 KB 限制时，可结合 NanoImage 的按目标大小压缩流程，确保最终文件满足上传上限。

## FAQ

### 真的没有统一的“国际护照照片尺寸”吗？

没有。国际标准更多规范人脸几何和图像质量，不是统一打印尺寸。常见尺寸有 35 × 45、2 × 2、50 × 70、33 × 48、32 × 26 等。

### 35 × 45 mm 能通吃欧洲吗？

不能。很多欧洲路径用 35 × 45，但西班牙常见是 32 × 26，背景要求也可能不同。

### 白底是不是总是安全？

不是。法国官方证件照不允许白底，推荐浅蓝或浅灰等浅色纯背景。

### 美国护照照片尺寸是多少？

美国护照照为 2 × 2 英寸 / 51 × 51 mm，头高 25–35 mm。

### 英国护照照片尺寸是多少？

英国纸质护照照为 45 × 35 mm，头高通常 29–34 mm。

### 西班牙护照照片尺寸是多少？

常见领馆要求是 32 × 26 mm，白色纯净均匀背景。

### 中国签证照片尺寸是多少？

常见为 48 × 33 mm（即 33 × 48 mm），并有头高头宽范围要求。

### 印度护照照片最该检查什么？

先确认你使用的是 Passport Seva、使领馆、OCI 还是签证入口；不同路径可能有不同表述。Passport Seva 常见 ICAO 指引为 630 × 810 px、白底、脸部占 80–85%。

### 为什么线上上传经常失败？

常见原因是像素不符、文件超限、背景错误、裁切位置不对、阴影明显、光线不足或修图过重。

### 一张照片能同时用于多个国家吗？

有时可以，但不能假设一定可用。即使打印尺寸相同，背景、头部占比、像素与文件大小规则也可能不同。

## 最后总结

“全球统一证件照尺寸”这个说法很方便，但不准确。  
更安全的流程是：

**先锁定具体文件和入口 → 核对官方要求 → 按正确尺寸与背景制作 → 按指定格式和文件大小导出。**

可通过 [NanoImage Passport Photo Maker](https://nanoimage.net/passport-photo) 在浏览器中私密完成护照、签证和 ID 照制作。`,
      },
      'zh-TW': {
        category: '技巧',
        title: '2026 各國護照照片要求：尺寸、背景、像素與檔案大小限制',
        excerpt: '整理美國、英國、法國、西班牙、中國、印度等常見路線，重點比較尺寸家族、背景規則與線上上傳限制。',
        readTime: '12 分鐘閱讀',
        metaDescription: '2026 各國護照照片規格懶人包：尺寸、背景、像素、檔案大小、常見退件原因與提交前檢查清單。',
        body: `護照照片並沒有一個全球通用的單一尺寸。

較一致的是生物識別品質要求：正面、自然表情、眼睛清楚可見、光線均勻、背景簡潔。真正會因國家與申請入口而變化的，是尺寸、像素、背景顏色與檔案大小限制。

## 快速對照

| 國家 / 地區 | 常見尺寸 | 常見重點 |
|---|---:|---|
| 美國 | 2 × 2 吋 / 51 × 51 mm | 白或類白背景，頭高 25-35 mm |
| 英國 | 35 × 45 mm | 紙本照片 45 × 35 mm |
| 加拿大 | 50 × 70 mm | 規則依路線不同 |
| 法國 | 35 × 45 mm | 官方身分照不接受白底 |
| 西班牙 | 32 × 26 mm | 比多數歐洲尺寸小 |
| 中國（簽證） | 33 × 48 mm | 白底，頭部比例限制 |
| 印度（Passport Seva 常見路線） | ICAO 風格，常見 630 × 810 px | 臉部占比 80-85% |

## 真正標準化的是什麼

ICAO Doc 9303 強調人臉幾何與影像品質，不是統一列印尺寸。

常見共識：

- 正面拍攝
- 中性表情
- 眼睛可見
- 光線均勻
- 不過度修圖

常見差異：

- 列印尺寸
- 像素要求
- 背景顏色
- 檔案大小上限

## 常見退件原因

- 像素尺寸不符
- 檔案超過上限
- 背景顏色錯誤
- 臉部裁切過近
- 原圖模糊
- 濾鏡或美顏過重

## 2025-2026 注意點

- 印度不同入口（Passport Seva、OCI、簽證、海外領館）可能不同
- 法國官方身分照不接受白底
- 西班牙常見 32 × 26 mm
- 中國簽證常見 33 × 48 mm

## 提交前檢查清單

1. 先確認文件類型。  
2. 先確認官方入口。  
3. 對齊尺寸與像素。  
4. 檢查格式與檔案大小。  
5. 最後核對背景與臉部位置。

## 隱私

證件照屬敏感資料。瀏覽器本地處理可降低上傳風險。

你可以用 NanoImage Passport Photo Maker 在單一流程內設定尺寸、背景、DPI 與檔案大小。`,
      },
      ja: {
        category: 'Tips',
        title: '各国のパスポート写真要件（2026）：サイズ・背景・ピクセル・容量制限',
        excerpt:
          '米国、英国、フランス、スペイン、中国、インドなどの要件を比較し、サイズ体系と背景ルール、アップロード制限を整理します。',
        readTime: '12分で読めます',
        metaDescription:
          '2026年版の国別パスポート写真要件ガイド。サイズ、背景、ピクセル、容量上限、却下されやすい原因を解説します。',
        body: `パスポート写真には、世界共通で使える単一サイズはありません。

比較的共通なのは生体認証品質です。正面、自然な表情、目が見えること、均一な照明、シンプルな背景などです。印刷サイズ、ピクセル条件、背景色、容量上限は国や申請経路で変わります。

## クイック比較

| 国 / 地域 | 代表サイズ | 主な注意点 |
|---|---:|---|
| 米国 | 2 × 2 inch / 51 × 51 mm | 白系背景、頭部25-35 mm |
| 英国 | 35 × 45 mm | 紙写真は45 × 35 mm |
| カナダ | 50 × 70 mm | 経路で条件差 |
| フランス | 35 × 45 mm | 白背景は不可 |
| スペイン | 32 × 26 mm | 欧州の中では小さめ |
| 中国（ビザ） | 33 × 48 mm | 白背景、頭部条件あり |
| インド（Passport Sevaの一般例） | ICAO系、630 × 810 pxが一般的 | 顔占有率80-85% |

## 標準化されている内容

ICAO Doc 9303 は顔の幾何と画質を重視し、単一の印刷サイズを定めるものではありません。

共通しやすい点：

- 正面撮影
- 中立表情
- 目が見える
- 均一な光
- 過度な加工なし

差が出やすい点：

- 印刷サイズ
- ピクセル寸法
- 背景色
- 容量上限

## よくある却下理由

- ピクセル不一致
- 容量超過
- 背景色不一致
- 顔の切り抜き過多
- 元画像のぼけ
- 美顔加工のし過ぎ

## 2025-2026の注意点

- インドはPassport Seva、OCI、ビザ、在外公館で要件差がある場合がある
- フランスは白背景不可
- スペインは32 × 26 mmが一般的
- 中国ビザは33 × 48 mmが一般的

## 提出前チェック

1. 書類種別を確認  
2. 公式ポータルを確認  
3. サイズとピクセルを一致  
4. 形式と容量上限を確認  
5. 背景と顔位置を最終確認

## プライバシー

証明写真は機微情報です。ブラウザ内処理はサーバー送信を減らせます。

NanoImage Passport Photo Maker なら、サイズ、背景、DPI、容量制限を1つの流れで調整できます。`,
      },
      ko: {
        category: '팁',
        title: '국가별 여권사진 규정 (2026): 크기, 배경, 픽셀, 파일 제한',
        excerpt: '미국, 영국, 프랑스, 스페인, 중국, 인도 등 주요 국가 기준을 비교하고, 자주 틀리는 규격 포인트를 정리합니다.',
        readTime: '12분 읽기',
        metaDescription: '2026 국가별 여권사진 가이드. 크기, 배경, 픽셀, 파일 용량 제한과 반려 원인을 한 번에 확인하세요.',
        body: `여권사진에 전 세계 공통 단일 규격이 있다고 생각하기 쉽지만, 실제로는 국가별 차이가 큽니다.

공통에 가까운 것은 생체 인식 품질 기준입니다. 정면, 중립 표정, 눈이 보이는 상태, 균일한 조명, 단색 배경 등이 이에 해당합니다. 반면 인쇄 크기, 픽셀 조건, 배경색, 파일 제한은 국가와 접수 경로에 따라 달라집니다.

## 빠른 비교

| 국가/지역 | 대표 크기 | 핵심 포인트 |
|---|---:|---|
| 미국 | 2 × 2 inch / 51 × 51 mm | 흰색 계열 배경, 머리 높이 25-35 mm |
| 영국 | 35 × 45 mm | 인쇄 사진 45 × 35 mm |
| 캐나다 | 50 × 70 mm | 경로별 규정 차이 |
| 프랑스 | 35 × 45 mm | 신분증 사진에서 흰 배경 불가 |
| 스페인 | 32 × 26 mm | 유럽 일반 규격보다 작음 |
| 중국(비자) | 33 × 48 mm | 흰 배경, 머리 크기 조건 |
| 인도(Passport Seva 예시) | ICAO 기반, 630 × 810 px 자주 사용 | 얼굴 비율 80-85% |

## 무엇이 표준화되어 있나

ICAO Doc 9303은 얼굴 기하와 이미지 품질을 다루며, 단일 인쇄 크기를 강제하지 않습니다.

주로 공통인 항목:

- 정면 촬영
- 중립 표정
- 눈이 선명하게 보임
- 균일한 조명
- 과도한 보정 없음

국가별로 달라지는 항목:

- 인쇄 크기
- 픽셀 크기
- 배경색
- 파일 용량 제한

## 자주 반려되는 이유

- 픽셀 규격 불일치
- 파일 용량 초과
- 배경색 오류
- 얼굴 크롭 과다
- 원본 흐림
- 과한 뷰티 보정

## 2025-2026 주의 포인트

- 인도: Passport Seva, OCI, 비자, 해외 공관 경로별 차이 가능
- 프랑스: 흰 배경 불가
- 스페인: 32 × 26 mm 사용 경향
- 중국 비자: 33 × 48 mm와 머리 비율 조건

## 제출 전 체크리스트

1. 문서 종류 확인  
2. 공식 접수 포털 확인  
3. 크기와 픽셀 규격 일치  
4. 파일 형식과 용량 제한 확인  
5. 배경색과 얼굴 위치 최종 점검

## 개인정보

여권/신분증 사진은 민감 정보입니다. 브라우저 로컬 처리는 서버 업로드를 줄여 프라이버시에 유리합니다.

NanoImage Passport Photo Maker로 크기, 배경, DPI, 파일 제한을 한 번에 설정할 수 있습니다。`,
      },
      fr: {
        category: 'Conseils',
        title: 'Exigences photo passeport par pays (2026) : taille, fond, pixels et limite de fichier',
        excerpt:
          'Comparatif des exigences photo passeport pour les principales destinations : tailles, fond et contraintes de téléversement.',
        readTime: '12 min de lecture',
        metaDescription:
          'Guide 2026 des exigences photo passeport par pays : taille, fond, pixels, limite de fichier et causes fréquentes de refus.',
        body: `Il n existe pas une taille unique de photo passeport valable dans tous les pays.

Ce qui est relativement harmonisé concerne surtout la biométrie : visage de face, expression neutre, yeux visibles, éclairage homogène, fond simple. En revanche, taille papier, dimensions pixel, couleur du fond et poids maximal varient selon le pays et le portail.

## Comparatif rapide

| Pays / Région | Taille courante | Point clé |
|---|---:|---|
| États-Unis | 2 × 2 inch / 51 × 51 mm | Fond blanc ou blanc cassé, tête 25-35 mm |
| Royaume-Uni | 35 × 45 mm | Photo papier 45 × 35 mm |
| Canada | 50 × 70 mm | Variations selon la procédure |
| France | 35 × 45 mm | Fond blanc non accepté |
| Espagne | 32 × 26 mm | Plus petit que beaucoup de formats UE |
| Chine (visa) | 33 × 48 mm | Fond blanc, contraintes de tête |
| Inde (Passport Seva, cas courant) | Style ICAO, souvent 630 × 810 px | Visage 80-85% |

## Ce qui est standardisé

La référence ICAO Doc 9303 traite de qualité biométrique, pas d une taille papier unique.

Souvent commun :

- Visage de face
- Expression neutre
- Yeux visibles
- Lumière régulière
- Pas de retouche forte

Souvent variable :

- Taille papier
- Dimensions pixel
- Couleur du fond
- Limite de fichier

## Causes fréquentes de refus

- Pixels incorrects
- Fichier trop lourd
- Mauvaise couleur de fond
- Recadrage trop serré
- Image floue
- Retouches excessives

## Vigilance 2025-2026

- Inde : différences possibles entre Passport Seva, OCI, visa et routes consulaires
- France : fond blanc non conforme
- Espagne : format 32 × 26 fréquent
- Chine visa : format 33 × 48 fréquent

## Checklist avant soumission

1. Confirmer le type de document  
2. Confirmer le portail officiel  
3. Respecter taille et pixels  
4. Vérifier format et limite de poids  
5. Valider fond et position du visage

## Confidentialité

Les photos passeport et ID sont sensibles. Le traitement local dans le navigateur réduit l exposition des données.

NanoImage Passport Photo Maker permet de régler taille, fond, DPI et limite de fichier dans un seul flux.`,
      },
      es: {
        category: 'Consejos',
        title: 'Requisitos de foto de pasaporte por país (2026): tamaño, fondo, píxeles y límites de archivo',
        excerpt:
          'Comparativa para EE. UU., Reino Unido, Francia, España, China, India y más: tamaños, reglas de fondo y límites de carga.',
        readTime: '12 min de lectura',
        metaDescription:
          'Guía 2026 de requisitos de foto de pasaporte por país: tamaño, fondo, píxeles, peso máximo y causas comunes de rechazo.',
        body: `No existe un único tamaño internacional de foto de pasaporte válido para todos los países.

Lo más estandarizado es la parte biométrica: foto frontal, expresión neutra, ojos visibles, iluminación uniforme y fondo simple. Pero el tamaño impreso, los píxeles, el color de fondo y el límite de archivo cambian según país y portal.

## Comparación rápida

| País / Región | Tamaño común | Punto clave |
|---|---:|---|
| Estados Unidos | 2 × 2 inch / 51 × 51 mm | Fondo blanco o casi blanco, cabeza 25-35 mm |
| Reino Unido | 35 × 45 mm | Foto impresa 45 × 35 mm |
| Canadá | 50 × 70 mm | Varía por ruta de solicitud |
| Francia | 35 × 45 mm | Fondo blanco no aceptado |
| España | 32 × 26 mm | Más pequeño que muchos formatos UE |
| China (visa) | 33 × 48 mm | Fondo blanco, límites de tamaño de cabeza |
| India (Passport Seva común) | Estilo ICAO, frecuente 630 × 810 px | Cara 80-85% |

## Qué sí está estandarizado

ICAO Doc 9303 define calidad biométrica, no un único tamaño físico.

Suele coincidir:

- Retrato frontal
- Expresión neutra
- Ojos claramente visibles
- Luz uniforme
- Sin retoque fuerte

Suele variar:

- Tamaño impreso
- Dimensiones en píxeles
- Color de fondo
- Límite de peso

## Motivos frecuentes de rechazo

- Píxeles incorrectos
- Archivo demasiado grande
- Color de fondo incorrecto
- Recorte de cara demasiado cerrado
- Imagen borrosa
- Filtros o retoque excesivo

## Alertas 2025-2026

- India: puede haber diferencias entre Passport Seva, OCI, visa y consulados
- Francia: fondo blanco no válido
- España: uso común de 32 × 26 mm
- China visa: uso común de 33 × 48 mm

## Checklist antes de enviar

1. Confirmar tipo de documento  
2. Confirmar portal oficial  
3. Ajustar tamaño y píxeles  
4. Verificar formato y peso  
5. Revisar fondo y posición facial

## Privacidad

Las fotos de pasaporte e ID son sensibles. El procesamiento local en navegador reduce exposición de datos.

NanoImage Passport Photo Maker te permite ajustar tamaño, fondo, DPI y límite de archivo en un solo flujo.`,
      },
      pt: {
        category: 'Dicas',
        title: 'Requisitos de foto de passaporte por país (2026): tamanho, fundo, pixels e limite de arquivo',
        excerpt:
          'Comparativo por país para foto de passaporte com foco em tamanhos mais usados, regras de fundo e limitações de upload.',
        readTime: '12 min de leitura',
        metaDescription:
          'Guia 2026 de requisitos de foto de passaporte por país: tamanho, fundo, pixels, limite de arquivo e motivos comuns de rejeição.',
        body: `Não existe um único tamanho internacional de foto de passaporte válido para todos os países.

O que costuma ser padronizado é a qualidade biométrica: rosto frontal, expressão neutra, olhos visíveis, iluminação uniforme e fundo simples. Já tamanho impresso, dimensões em pixels, cor de fundo e limite de arquivo variam por país e portal.

## Comparação rápida

| País / Região | Tamanho comum | Ponto principal |
|---|---:|---|
| Estados Unidos | 2 × 2 inch / 51 × 51 mm | Fundo branco, cabeça 25-35 mm |
| Reino Unido | 35 × 45 mm | Foto impressa 45 × 35 mm |
| Canadá | 50 × 70 mm | Regras variam por rota |
| França | 35 × 45 mm | Fundo branco não aceito |
| Espanha | 32 × 26 mm | Menor que muitos formatos europeus |
| China (visto) | 33 × 48 mm | Fundo branco, limite de proporção da cabeça |
| Índia (Passport Seva comum) | Estilo ICAO, comum 630 × 810 px | Rosto 80-85% |

## O que é realmente padronizado

O ICAO Doc 9303 trata de geometria facial e qualidade, não de um tamanho físico único.

Itens que costumam coincidir:

- Foto frontal
- Expressão neutra
- Olhos visíveis
- Luz uniforme
- Sem retoque forte

Itens que variam:

- Tamanho impresso
- Pixels
- Cor de fundo
- Limite de arquivo

## Motivos frequentes de rejeição

- Pixels incorretos
- Arquivo acima do limite
- Fundo errado
- Recorte de rosto excessivo
- Foto borrada
- Filtro forte

## Atenção em 2025-2026

- Índia: pode haver diferença entre Passport Seva, OCI, visto e consulados
- França: fundo branco não conforme
- Espanha: uso frequente de 32 × 26 mm
- China visto: uso frequente de 33 × 48 mm

## Checklist antes de enviar

1. Confirmar tipo de documento  
2. Confirmar portal oficial  
3. Ajustar tamanho e pixels  
4. Validar formato e limite de arquivo  
5. Conferir fundo e posição do rosto

## Privacidade

Fotos de passaporte e ID são dados sensíveis. Processamento local no navegador reduz exposição.

Com NanoImage Passport Photo Maker, você ajusta tamanho, fundo, DPI e limite de arquivo em um único fluxo.`,
      },
      ru: {
        category: 'Советы',
        title: 'Требования к фото на паспорт по странам (2026): размер, фон, пиксели и лимит файла',
        excerpt:
          'Сравнение требований для США, Великобритании, Франции, Испании, Китая, Индии и других направлений: размеры, фон и ограничения загрузки.',
        readTime: '12 мин чтения',
        metaDescription:
          'Гид 2026 по требованиям к фото на паспорт по странам: размер, фон, пиксели, лимит файла и частые причины отказа.',
        body: `Единого международного размера фото на паспорт для всех стран не существует.

Относительно едины биометрические принципы: фото анфас, нейтральное выражение, видимые глаза, ровный свет, простой фон. Но печатный размер, пиксели, цвет фона и лимит файла зависят от страны и конкретного портала.

## Быстрое сравнение

| Страна / регион | Типичный размер | Ключевой момент |
|---|---:|---|
| США | 2 × 2 inch / 51 × 51 mm | Белый фон, голова 25-35 mm |
| Великобритания | 35 × 45 mm | Печатный формат 45 × 35 mm |
| Канада | 50 × 70 mm | Требования зависят от маршрута подачи |
| Франция | 35 × 45 mm | Белый фон не принимается |
| Испания | 32 × 26 mm | Меньше многих европейских форматов |
| Китай (виза) | 33 × 48 mm | Белый фон, ограничения по размеру головы |
| Индия (часто Passport Seva) | ICAO-стиль, часто 630 × 810 px | Лицо 80-85% |

## Что действительно стандартизировано

ICAO Doc 9303 стандартизирует биометрическое качество, но не единый печатный размер.

Чаще совпадает:

- Фото анфас
- Нейтральное выражение
- Видимые глаза
- Ровный свет
- Без сильной ретуши

Чаще отличается:

- Печатный размер
- Пиксели
- Цвет фона
- Лимит файла

## Частые причины отказа

- Неверные пиксели
- Превышен размер файла
- Неправильный фон
- Слишком тесная обрезка лица
- Размытый исходник
- Сильные фильтры

## Важные моменты 2025-2026

- Индия: Passport Seva, OCI, виза и консульские маршруты могут отличаться
- Франция: белый фон не соответствует требованиям
- Испания: часто используется 32 × 26 mm
- Китай виза: часто используется 33 × 48 mm

## Чеклист перед подачей

1. Уточнить тип документа  
2. Уточнить официальный портал  
3. Сверить размер и пиксели  
4. Проверить формат и лимит файла  
5. Проверить фон и позицию лица

## Конфиденциальность

Фото паспорта и ID — чувствительные данные. Локальная обработка в браузере снижает риск утечки.

NanoImage Passport Photo Maker позволяет в одном потоке настроить размер, фон, DPI и лимит файла.`,
      },
    },
  },
]

import { deliverableBlogPosts } from './blog-posts/deliverables'
blogPosts.push(...deliverableBlogPosts)

import { applyBlogTranslations } from './blog-translations'
applyBlogTranslations(blogPosts)

import { applyBlogImages } from './blog-posts/image-assets'
applyBlogImages(blogPosts)
