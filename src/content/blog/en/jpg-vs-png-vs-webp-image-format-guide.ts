export const content = `
# JPG vs PNG vs WebP — Which Image Format Should You Use?

If you've ever wondered why there are so many image formats — and why it matters which one you pick — this guide is for you.

The short version: different formats make different trade-offs between file size, quality, and features like transparency. Choosing the wrong one can mean unnecessarily large files, visible quality loss, or compatibility problems.

Here's everything you need to know, in plain English.

---

## The Three Formats at a Glance

| | JPG | PNG | WebP |
|---|---|---|---|
| **Compression** | Lossy | Lossless | Both (lossy & lossless) |
| **Transparency** | ❌ No | ✅ Yes | ✅ Yes |
| **File size** | Small | Medium–Large | Smallest |
| **Best for** | Photos | Graphics, logos, screenshots | Web images (all types) |
| **Browser support** | Universal | Universal | Modern browsers (95%+) |
| **Editing quality** | Degrades with each save | No quality loss | Minimal loss (lossless mode) |

---

## JPG (JPEG) — The Photo Standard

JPG has been the dominant format for photographs since the 1990s. It works by analyzing the image and discarding visual information that the human eye is least likely to notice — a process called **lossy compression**.

### How JPG compression works
When you save a JPG, the encoder divides the image into 8×8 pixel blocks and applies a mathematical transformation (Discrete Cosine Transform) to each block. High-frequency details (sharp edges, fine texture) are reduced more aggressively than low-frequency information (smooth gradients, large areas of similar color).

At high quality settings (85–100%), this process is nearly invisible. At low quality settings (below 60%), you start to see characteristic "artifacts" — blocky patches, especially around edges and text.

### When to use JPG
- ✅ Photographs and real-world images
- ✅ Product photos for e-commerce
- ✅ Images you need to share via email (small file size)
- ✅ Anywhere file size matters more than pixel-perfect quality

### When NOT to use JPG
- ❌ Images with text (compression artifacts make text look blurry)
- ❌ Logos and icons (sharp edges get blocky)
- ❌ Images with transparent backgrounds
- ❌ Files you'll edit and re-save repeatedly (quality degrades each time)

---

## PNG — The Quality and Transparency Champion

PNG uses **lossless compression** — no visual information is ever discarded. What you put in is exactly what you get out, pixel for pixel. This makes PNG ideal for images where accuracy matters: logos, screenshots, graphics, and anything with transparency.

### The transparency advantage
PNG supports an **alpha channel** — a fourth data layer that stores transparency information for each pixel. This means parts of the image can be fully transparent, fully opaque, or anything in between. This is essential for:
- Logos placed on different colored backgrounds
- UI elements (buttons, icons)
- Stickers and overlays

JPG simply cannot do this. If you try to save a transparent image as JPG, the transparent areas fill with a solid color (usually white).

### PNG file sizes
The trade-off for lossless quality is larger files. A PNG photograph can be 3–5× larger than an equivalent JPG. For web use, this is a significant disadvantage for photos — but perfectly acceptable for logos and graphics where the visual elements are simpler and compress more efficiently.

### When to use PNG
- ✅ Logos and brand assets
- ✅ Screenshots (especially with UI elements and text)
- ✅ Images requiring transparency
- ✅ Graphics with flat colors, sharp lines, or text
- ✅ Source files you'll edit repeatedly

### When NOT to use PNG
- ❌ Photographs on web pages (too large, use JPG or WebP instead)
- ❌ When file size is the top priority

---

## WebP — The Modern Web Format

WebP was developed by Google and released in 2010. It's designed to be the best of both worlds: smaller file sizes than both JPG and PNG, while supporting transparency and offering both lossy and lossless modes.

### The size advantage
WebP typically produces:
- **25–35% smaller** files than equivalent-quality JPG
- **26% smaller** files than equivalent PNG

That's a significant bandwidth saving for websites, where image loading speed directly affects user experience and search engine rankings.

### Compatibility
WebP is now supported by all major modern browsers: Chrome, Firefox, Safari (since 2020), Edge, and Opera. As of 2024, browser support is above 95% globally. However, some older software and platforms don't support it — particularly older email clients and some image editors.

### When to use WebP
- ✅ Web images where performance matters
- ✅ When you want maximum compression with minimal quality loss
- ✅ Images with transparency that need to load fast
- ✅ Any scenario where JPG or PNG would work but you want a smaller file

### When NOT to use WebP
- ❌ When the target platform has limited WebP support (e.g., older email clients)
- ❌ When compatibility with older software is required
- ❌ When editing in applications that don't support WebP

---

## Real-World File Size Comparison

Here's a typical example with a 2000×1500px photograph:

| Format | Settings | File Size |
|---|---|---|
| PNG (lossless) | — | ~8.5 MB |
| JPG | 90% quality | ~1.8 MB |
| JPG | 80% quality | ~1.1 MB |
| WebP | 80% quality | ~780 KB |
| WebP | Lossless | ~6.2 MB |

For a photo, WebP at 80% quality delivers the best balance — similar visual quality to JPG at 80% but about 30% smaller.

---

## GIF and BMP — A Quick Note

You'll occasionally encounter two other formats:

**GIF** — Supports animation (hence its popularity for memes and reactions). Limited to 256 colors, which makes it unsuitable for photographs. For static images, PNG is always better. For animations, consider WebP (which supports animation) or video formats.

**BMP** — An uncompressed Windows format. Files are enormous (a 1920×1080 BMP is typically 6+ MB). There's almost no reason to use BMP for anything other than legacy Windows applications.

---

## Quick Decision Guide

**Is it a photograph?** → Use **JPG** (or WebP if the platform supports it)

**Does it need a transparent background?** → Use **PNG** (or WebP)

**Is it a logo, icon, or screenshot?** → Use **PNG**

**Is it going on a website and you want the smallest possible file?** → Use **WebP**

**Will you edit it again later?** → Use **PNG** (to avoid quality loss on re-saves)

**Does it need to work in all email clients and old software?** → Use **JPG** or **PNG**

---

## Converting Between Formats

Need to change an image from one format to another? [NanoImage's Convert to JPG tool](https://nanoimage.net/convert-to-jpg) handles PNG, WebP, GIF, and BMP → JPG conversions instantly in your browser.

---

## Related Tools

- **[Compress Image](https://nanoimage.net/compress-image)** — Reduce JPG or PNG file size without switching formats
- **[Convert to JPG](https://nanoimage.net/convert-to-jpg)** — Convert PNG, WebP, GIF, BMP to JPG
- **[Resize Image](https://nanoimage.net/resize-image)** — Change image dimensions
`;
