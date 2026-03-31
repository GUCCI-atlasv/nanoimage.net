export const content = `
# How to Invert Image Colors Online (Free Negative Photo Effect)

Inverting an image's colours creates a negative effect — blacks become white, whites become black, and every colour is replaced by its opposite on the colour wheel. It takes one click and has more practical uses than you might expect.

---

## What Does Inverting Colors Actually Do?

When you invert an image, every pixel value is flipped to its mathematical opposite. In an 8-bit image:

- A pixel with value **0** (black) becomes **255** (white)
- A pixel with value **255** (white) becomes **0** (black)
- A pixel with value **100** (dark grey) becomes **155** (light grey)
- A red pixel (255, 0, 0) becomes cyan (0, 255, 255)
- A yellow pixel (255, 255, 0) becomes blue (0, 0, 255)

The result is the exact colour negative of the original image — the same effect as looking at a traditional film negative.

---

## Practical Uses for Colour Inversion

**Creating negative photo effects.** The classic use case — inverting a photo creates an otherworldly, surreal look. Portraits, architecture, and abstract images often look striking inverted.

**Dark mode UI design.** Designers use colour inversion to preview how UI elements look on dark backgrounds, or to quickly create dark-mode versions of icons and illustrations.

**Accessibility and readability.** Some people with visual impairments or light sensitivity find inverted colours easier to read. Inverting a document or screenshot can make text more readable in certain contexts.

**Checking colour balance.** Photographers and designers sometimes invert an image to spot colour casts and imbalances — a blue cast becomes an obvious orange cast, which is easier to see.

**Creating artistic variations.** Inverted images work well as digital art, poster effects, or as layers in multi-exposure compositions.

**Reading negative film scans.** If you've scanned film negatives directly (without a dedicated film scanner), inverting the resulting image recovers the positive image.

**X-ray and thermal image processing.** Medical and scientific images are sometimes inverted for analysis — viewing bones in black on white vs white on black, or reversing thermal colour gradients.

---

## Step-by-Step: Invert an Image in Your Browser

### Step 1: Open NanoImage Invert Colors

Go to [NanoImage Invert Colors](/invert/). No account, no installation. Your image stays on your device — nothing is uploaded.

### Step 2: Upload Your Image

Drag or click to upload. Supports JPEG, PNG, and WebP.

### Step 3: Preview the Inversion

The inverted image appears instantly. Check how the colours have shifted — the result is an exact mathematical inversion of every pixel.

### Step 4: Download

Click **Download** to save your inverted image. It's ready to use immediately.

---

## Interesting Things to Try Inverting

Some images produce more interesting results when inverted than others:

**Portraits:** Skin tones invert to an eerie cyan-blue. Eyes often look very dramatic. Best for artistic or editorial use.

**Landscapes with blue skies:** The sky becomes a warm orange, and green vegetation becomes magenta — creates a striking alien landscape effect.

**Black and white photos:** Inverting a greyscale photo creates the "film negative" look — black becomes white, shadows become highlights. Particularly effective for portraits.

**Text documents:** White background with black text becomes black background with white text — useful for dark mode conversion.

**Logos and icons:** Great for quickly checking how a logo looks on dark vs light backgrounds.

**Line art and illustrations:** Black linework on white paper becomes white linework on black — useful for certain printing techniques or creating chalk-effect illustrations.

---

## Invert vs Other Colour Effects

It's worth distinguishing colour inversion from related effects:

| Effect | What it does |
|--------|--------------|
| **Invert** | Flips every pixel to its mathematical opposite colour |
| **Greyscale / B&W** | Removes all colour, keeps brightness as grey values |
| **Desaturate** | Reduces colour intensity without full removal |
| **Hue rotate** | Shifts all colours around the colour wheel by a set angle |
| **Negative** | Same as invert (different term, same result) |
| **Solarise** | Partial inversion — only pixels above a brightness threshold are inverted |

NanoImage's Invert Colors tool performs a full inversion. For greyscale conversion, use [NanoImage Black & White](/bw/) instead.

---

## Inverting for Film Negative Recovery

If you've scanned physical film negatives using a regular flatbed scanner or camera, you've probably gotten a reddish-orange image — the negative film base plus inverted colours. Here's how inversion helps:

1. Scan or photograph the film negative as-is
2. Upload to [NanoImage Invert Colors](/invert/)
3. Invert the image
4. The positive image appears (colours and tones are now correct)

**Note:** The orange film base colour will also be inverted (to blue), so you'll likely need to do colour correction after inversion to remove the colour cast. This is a basic first step, not a full negative-to-positive conversion pipeline. Dedicated film scanning software (like Negative Lab Pro or SilverFast) handles this more precisely, but NanoImage's inversion is a quick free starting point.

---

## Frequently Asked Questions

**Is inverting colours the same as "negative" in photo editing apps?**
Yes — "invert colours," "negative," and "colour negative" all refer to the same operation: replacing each pixel value with its mathematical complement (255 minus the original value for each channel).

**Can I invert only part of an image?**
NanoImage's invert tool applies to the whole image. For selective inversion (inverting just a face or a specific object), you'd need a more advanced editor like Photoshop or GIMP.

**Will inverting my image reduce quality?**
No. Colour inversion is a lossless mathematical operation — each pixel is recalculated to an exact value. No data is lost or approximated. The quality of the output is identical to the input.

**Can I invert a PNG with transparency?**
Yes — NanoImage preserves the transparency (alpha channel) when inverting. Only the RGB colour channels are inverted; transparent areas remain transparent.

**How do I get back to the original after inverting?**
Invert it again. Inverting twice returns every pixel exactly to its original value. So if you've saved the inverted image, open it in NanoImage and invert again — you'll get the original colours back.

---

## Summary

Inverting an image's colours:

1. Open [NanoImage Invert Colors](/invert/)
2. Upload your image
3. Preview the negative effect
4. Download — done instantly

One click, no upload, no account.

**[Invert your image colors for free →](/invert/)**
`;
