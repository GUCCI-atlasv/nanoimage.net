export const content = `
Many websites, apps, and email platforms have strict file size limits. A profile photo must be under 100KB. A form attachment can't exceed 200KB. Your photo is 3MB and you have no idea what to do.

This guide shows you the easiest ways to compress an image to 200KB — without installing any software, and without sending your photo to a stranger's server.

## Why Do Files Need to Be Under 200KB?

File size limits exist because of bandwidth, storage, and loading speed. Here are common situations where you'll hit them:

- **Government and visa application forms** — many require photos under 200KB or even 50KB
- **Job application portals** — resume photo uploads often have tight limits
- **Email attachments** — some corporate email systems block large attachments
- **WhatsApp and messaging apps** — images auto-compress, but sometimes you need a specific size
- **Website uploads** — profile photos, product images, avatars

The frustrating part is that modern phone cameras produce images of 3MB to 10MB. A single photo from an iPhone can be 8MB — that's 40 times larger than a 200KB limit.

## Method 1: Use NanoImage (Free, No Upload Required)

The fastest way to compress an image to exactly under 200KB is to use [NanoImage's Compress tool](/compress-image).

**Why NanoImage is different:** Most online compressors upload your image to their servers, process it, then send it back. Your photo passes through a company's computer that you know nothing about. NanoImage processes everything directly in your browser — your image never leaves your device.

**Steps:**

1. Go to [nanoimage.net/compress-image](/compress-image)
2. Click **Upload Image** or drag and drop your photo
3. The tool automatically finds the best compression to get under 200KB
4. Click **Download** to save your compressed image

That's it. No account needed, no watermark added, completely free.

**What file types are supported?** JPG, PNG, WebP, and GIF.

## Method 2: Adjust Size Manually

If you need a specific target size that's different from 200KB, you can manually adjust the quality slider on most compression tools.

A few things to know:

- **JPEG compression** works by reducing detail in areas the human eye is less sensitive to. At 80% quality, most people can't tell the difference from the original. At 60%, you might start to see some blurriness in detailed areas.
- **PNG files** are lossless by default. Converting a PNG to JPG before compressing will usually give you a much smaller file.
- **Resolution matters too.** A 4000×3000 pixel image will always be larger than a 1200×900 image at the same quality. If you only need the image to appear on a screen (not print), reducing the dimensions first is very effective.

## Method 3: Reduce Dimensions First, Then Compress

Sometimes the most effective approach is to resize the image before compressing it.

For most screen uses, an image doesn't need to be wider than 1200 pixels. If your original is 4000 pixels wide, resizing it to 1200 pixels will reduce the file size by roughly 90% before you even apply compression.

You can do this in two steps using NanoImage:

1. First use the [Resize tool](/resize-image) to bring the dimensions down
2. Then use the [Compress tool](/compress-image) to hit your target file size

## What Happens to Image Quality When You Compress?

This is the most common concern. The short answer: **for everyday use, you won't notice a difference.**

Here's what actually changes:

- Very fine details (like texture in fabric or individual leaves on trees) get slightly smoothed out
- Flat areas of color (like a blue sky or a white background) are barely affected
- For portrait photos, skin tones and faces generally look fine down to quite high compression levels

A photo compressed to 200KB from 5MB will look virtually identical on a phone screen or a web page. It would only look noticeably different if you zoomed in very closely or printed it at large size.

## Tips for Getting the Smallest File Size

- **Use JPG instead of PNG** for photos. PNG is best for graphics with text or transparent backgrounds. For photos, JPG is almost always smaller at similar quality.
- **Remove metadata (EXIF data).** Your camera embeds GPS location, device info, and camera settings into every photo. Stripping this data can save 10-50KB on some images.
- **Resize before compressing.** If the image is going to appear at 400×400 pixels on screen, there's no need for it to be 3000×3000 pixels.

## Frequently Asked Questions

**Will compressing to 200KB damage my original photo?**
No. NanoImage downloads a new compressed copy. Your original file on your device is untouched.

**What if my image is still too large after maximum compression?**
If the image is still over 200KB at minimum quality, the image is too large in terms of dimensions. Use the [Resize tool](/resize-image) to reduce the pixel dimensions first, then compress again.

**Is it safe to compress sensitive photos online?**
With NanoImage, yes — because your image never leaves your browser. With other tools that upload to a server, you're trusting that company with your image data. Always check a tool's privacy policy before uploading sensitive files.

**Can I compress multiple images at once?**
Batch compression is on the NanoImage roadmap. Currently, images are processed one at a time.

## Summary

Compressing an image to 200KB is straightforward once you know the right tool. The key points:

- Use a browser-based tool like NanoImage to keep your images private
- For large photos, resize the dimensions before compressing
- JPG format gives the smallest file sizes for photographs
- Quality at 200KB is more than sufficient for web, email, and most form uploads
`;
