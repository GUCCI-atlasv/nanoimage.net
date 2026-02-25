export const content = `
Every platform has different requirements for images. WhatsApp compresses photos automatically but often makes them blurry. Email attachments get blocked if they're too large. Instagram crops your photo if the dimensions are wrong.

This guide gives you the exact sizes you need for each platform — and how to resize your images quickly without installing any software.

## Why Resizing Matters

Your phone camera takes photos at 12 megapixels or more. That produces a file of 3,000 × 4,000 pixels or larger — far more than any phone screen or social media platform actually displays.

Sending oversized images causes several problems:
- **WhatsApp** re-compresses them and makes them look blurry
- **Email** clients may block attachments over a certain size
- **Instagram** may crop them if the aspect ratio is wrong
- **Websites** load slowly if images are too large

Resizing before you send gives you control over exactly what the recipient sees.

## Recommended Image Sizes by Platform

### WhatsApp

| Use Case | Recommended Size |
|----------|-----------------|
| Profile photo | 500 × 500 px |
| Shared photo (best quality) | 1600 × 1200 px max |
| Document image | Under 5MB |

**The problem with WhatsApp:** When you send a photo normally, WhatsApp automatically compresses it to save bandwidth — sometimes reducing quality significantly. To send a photo at full quality, use the "Document" option instead of the standard photo share. But even then, keeping images under 2MB is good practice.

**Best approach:** Resize to 1600px on the longest side before sending. This preserves visible quality while avoiding heavy re-compression.

### Email

| Use Case | Recommended Size |
|----------|-----------------|
| Inline image (in email body) | 600–800px wide |
| Attachment (general) | Under 1MB per image |
| Profile / avatar | 400 × 400 px |

**The problem with email:** Corporate email servers often have attachment limits of 10–25MB total. If you're sending multiple photos, each one being 5MB means you'll hit the limit fast. Resizing images to under 500KB each allows you to send 20+ photos in one email.

**Best approach:** Resize to 1200px wide maximum, then compress. For a single photo that needs to look good, 1200px wide at moderate compression is typically under 300KB.

### Instagram

| Format | Recommended Size | Aspect Ratio |
|--------|-----------------|--------------|
| Square post | 1080 × 1080 px | 1:1 |
| Portrait post | 1080 × 1350 px | 4:5 |
| Landscape post | 1080 × 566 px | 1.91:1 |
| Story / Reel | 1080 × 1920 px | 9:16 |

**The problem with Instagram:** If your image doesn't match one of the supported aspect ratios, Instagram will either add white borders or crop it automatically. Neither looks great.

**Best approach:** Resize to exactly 1080px wide with the correct height for your format. Use the [Resize tool on NanoImage](/resize-image) to set exact pixel dimensions.

### Other Common Platforms

| Platform | Profile Photo | Shared Image |
|----------|-------------|-------------|
| Facebook | 170 × 170 px | 1200 × 630 px (link preview) |
| Twitter/X | 400 × 400 px | 1200 × 675 px |
| LinkedIn | 400 × 400 px | 1200 × 627 px |
| YouTube thumbnail | 1280 × 720 px | — |

## How to Resize an Image in 3 Steps (No Software Needed)

1. **Go to [NanoImage Resize Tool](/resize-image)**
2. **Upload your image** — drag and drop or click to select
3. **Enter your target dimensions** — set width, height, or both. Enable "Lock aspect ratio" to avoid stretching the image.
4. **Download** your resized image

Your image is processed entirely in your browser. Nothing is uploaded to any server.

## Resize vs. Compress — What's the Difference?

These two things are often confused:

**Resizing** changes the pixel dimensions of an image. A 4000×3000 image resized to 1200×900 will have fewer pixels — it's a physically smaller image.

**Compressing** reduces the file size of an image without necessarily changing its pixel dimensions. A 1200×900 image can be compressed from 800KB to 200KB by reducing the JPEG quality.

For most practical purposes, you want to do **both**: resize first to appropriate dimensions, then compress to an appropriate file size.

NanoImage has separate tools for each:
- [Resize Image](/resize-image) — change pixel dimensions
- [Compress Image](/compress-image) — reduce file size

## Common Mistakes to Avoid

**Enlarging small images.** If you have a 400×400 image and resize it to 2000×2000, it won't become sharper — it'll just look blurry and pixelated. Resizing only works well when you're making images smaller.

**Ignoring aspect ratio.** Forcing a portrait photo (tall) into square dimensions will stretch or squish it. Always maintain the original proportions unless you intentionally want to crop.

**Resizing after compression.** Always resize first, then compress. If you compress first, then resize larger, you'll amplify any compression artifacts.

**Not saving the original.** Always keep a copy of your original high-resolution image. Once you resize and compress, you can't recover the lost detail. NanoImage never modifies your original — it always creates a new download.

## Quick Reference: What Size Should I Use?

| You're sending to... | Resize to... |
|---------------------|-------------|
| WhatsApp chat | 1600px wide |
| Email (inline) | 800px wide |
| Email (attachment) | 1200px wide + compress to <500KB |
| Instagram square | 1080 × 1080px |
| Instagram story | 1080 × 1920px |
| Twitter/X post | 1200 × 675px |
| LinkedIn post | 1200 × 627px |
| Profile photo (any platform) | 400 × 400px or 500 × 500px |

## Summary

Resizing images before sharing is one of the simplest ways to improve quality and avoid problems across platforms. The key points:

- Each platform has ideal dimensions — use the table above as your reference
- Always resize before compressing, not after
- For WhatsApp, aim for 1600px wide to prevent automatic re-compression from degrading quality
- For Instagram, match the aspect ratio exactly to avoid cropping
- Use a browser-based tool to keep your images private
`;
