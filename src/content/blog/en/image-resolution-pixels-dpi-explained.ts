export const content = `
# Image Resolution Explained: Pixels, DPI, and Why It Matters

You've probably heard the terms "resolution," "pixels," and "DPI" thrown around when talking about image quality. But what do they actually mean — and when does any of it matter for you?

This guide explains image resolution in plain English, so you can make smart decisions about image size, quality, and format.

---

## What Is a Pixel?

A **pixel** (short for "picture element") is the smallest unit of a digital image. Zoom into any digital photo far enough and you'll see it dissolve into a grid of tiny colored squares — those are pixels.

The total number of pixels in an image is its **resolution**. A 1920×1080 image has 1,920 pixels across and 1,080 pixels tall, for a total of about 2 million pixels — which is why it's called "2 megapixels" (MP).

More pixels means:
- More detail and sharpness
- Larger file sizes
- The ability to print bigger or crop more without losing quality

---

## What Is DPI?

**DPI** stands for "dots per inch." It describes how many pixels are packed into one inch of physical space when an image is printed or displayed.

This is where many people get confused, because DPI is a **print concept** — it's not really meaningful for images displayed on screens.

Here's why: screens display images at whatever size fits the display. A 1920×1080 image on a 24-inch monitor looks different from the same image on a 5-inch phone screen. The pixels per inch change depending on the device, but the image itself is unchanged.

When you **print** an image, DPI becomes critical because it determines how sharp the print will look at a specific physical size.

---

## Screen vs. Print Resolution

### For Screens
Most screens display between 72–144 PPI (pixels per inch). Common standards:
- **Standard monitors:** ~96 PPI
- **Retina / HiDPI displays:** 192–264 PPI
- **Smartphone screens:** 300–460 PPI

For web images, what matters is the **pixel dimensions**, not the DPI setting. A 72 DPI image and a 300 DPI image with the same pixel dimensions look identical on screen.

### For Print
This is where DPI matters. The standard recommendation:

| Use Case | Recommended DPI |
|---|---|
| Professional photo print | 300 DPI |
| Home printer | 200–300 DPI |
| Large format poster (viewed from distance) | 100–150 DPI |
| Billboard (viewed from 10+ meters) | 15–30 DPI |
| Standard office document | 150–200 DPI |

**The rule:** the closer the viewer will be to the printed piece, the higher the DPI needs to be.

---

## Calculating Print Size from Pixel Dimensions

Here's the key formula:

> **Print size (inches) = Pixel dimension ÷ DPI**

So if you have a 3000×2000 pixel image and want to print at 300 DPI:
- Width: 3000 ÷ 300 = **10 inches**
- Height: 2000 ÷ 300 = **6.67 inches**

If you try to print that same 3000×2000 image at a larger size — say 20×13 inches at 300 DPI — you'd need a 6000×3900 pixel image. Stretching the 3000×2000 image to that size means printing at only 150 DPI, which will look noticeably soft.

---

## Why Images Look Great on Screen But Blurry When Printed

This is one of the most common image problems people encounter.

**The cause:** An image that looks sharp on screen may not have enough pixels for the physical print size you want.

**Example:** A photo from a messaging app or social media is often compressed down to 1080×1080 pixels. On screen at 5 inches wide, that's roughly 216 PPI — sharp enough. But try to print it at 8×8 inches at 300 DPI, and you only have 135 DPI — noticeably soft.

**The fix:** Always use the highest resolution original you have. For professional printing, your image needs enough pixels to print at 300 DPI at the desired size.

---

## Megapixels and Camera Resolution

You'll often see cameras marketed by megapixel count. Here's what that means for print:

| Camera Resolution | Max Print Size at 300 DPI |
|---|---|
| 8 MP (3264×2448) | ~10.9 × 8.2 inches |
| 12 MP (4000×3000) | ~13.3 × 10 inches |
| 20 MP (5472×3648) | ~18.2 × 12.2 inches |
| 48 MP (8000×6000) | ~26.7 × 20 inches |

Modern smartphones with 12–50 MP cameras can produce excellent print quality for standard sizes like 4×6, 5×7, and 8×10 inches.

---

## Common Resolution Mistakes

### Using Low-Resolution Images for Print
Downloading images from websites for use in printed materials is a classic mistake. Website images are optimized for small file sizes at screen resolution — they rarely have enough pixels for quality printing.

### Confusing "Resize" with "Increase Resolution"
Resizing an image to larger dimensions doesn't add pixel information — it just stretches the existing pixels. A 500×500 image resized to 2000×2000 will look blurry because the software is guessing at the missing detail (this process is called "upscaling" or "upsampling").

### Ignoring DPI When Exporting for Print
Some design tools let you set DPI when exporting. If you export a web-optimized image at 72 DPI but intend to print it, you may get a smaller physical print than expected — or a blurry one.

---

## Quick Reference: Resolution for Common Uses

| Use Case | Recommended Pixel Dimensions |
|---|---|
| Website full-width banner | 1920×1080 px minimum |
| Instagram post (square) | 1080×1080 px |
| Instagram portrait | 1080×1350 px |
| Facebook cover photo | 851×315 px |
| LinkedIn banner | 1584×396 px |
| Email newsletter image | 600–800 px wide |
| 4×6 photo print (300 DPI) | 1200×1800 px |
| 8×10 photo print (300 DPI) | 2400×3000 px |
| A4 document print (300 DPI) | 2480×3508 px |

---

## Managing Image Resolution with NanoImage

Need to resize an image to specific pixel dimensions? [NanoImage's Resize tool](https://nanoimage.net/resize-image) lets you set exact pixel dimensions directly in your browser — no software needed.

Need to reduce file size without changing dimensions? [Compress](https://nanoimage.net/compress-image) handles that too.

---

## Related Tools

- **[Resize Image](https://nanoimage.net/resize-image)** — Set exact pixel dimensions
- **[Compress Image](https://nanoimage.net/compress-image)** — Reduce file size while keeping dimensions
- **[Crop Image](https://nanoimage.net/crop-image)** — Remove unwanted areas and change aspect ratio
`;
