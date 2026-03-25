export const content = `
# How to Blur a Photo Online — Censor, Protect Privacy, or Add Depth

Blurring an image isn't just an artistic effect — it's often a practical necessity. You might need to hide a face in a screenshot before sharing it publicly, obscure a license plate in a street photo, or blur a cluttered background so your subject stands out.

Whatever your reason, this guide covers how to blur images online quickly and for free — without uploading your files to any server.

---

## Why Blur an Image?

There are three main reasons people blur photos:

### 1. Privacy Protection
Before sharing screenshots, documents, or photos publicly, you may need to hide:
- Faces (for consent or anonymity)
- Personal information (addresses, phone numbers, email addresses)
- License plates
- Financial details in screenshots
- Usernames or profile photos in social media screenshots

### 2. Censoring Sensitive Content
- Redacting confidential information from documents
- Hiding spoilers in gaming or entertainment content
- Obscuring inappropriate content for broader audiences

### 3. Artistic and Visual Effects
- Creating a "bokeh" (shallow depth of field) effect that professional cameras produce
- Drawing attention to a subject by softening the background
- Adding a dreamy or cinematic quality to photos

---

## Types of Blur

Not all blur is the same. Here are the main types you'll encounter:

**Gaussian Blur** — The most common. Creates a smooth, even softening across the entire image or selected area. Named after the mathematical curve (Gaussian distribution) that describes how pixels are blended.

**Pixelate / Mosaic** — Divides the image into large square blocks. Often used for censoring faces and license plates — it's harder to reverse than Gaussian blur.

**Motion Blur** — Simulates movement by blurring in one direction. Used for artistic speed effects.

**Radial Blur** — Blur that radiates from a center point, creating a spin or zoom effect.

For privacy and censoring purposes, **Gaussian blur** or **pixelation** are the most practical choices.

---

## How to Blur an Image with NanoImage

[NanoImage's Blur tool](https://nanoimage.net/blur-image) applies Gaussian blur to your entire image directly in the browser. No upload, no account, no waiting.

### Step 1: Open the Blur Tool
Go to [nanoimage.net/blur-image](https://nanoimage.net/blur-image).

### Step 2: Upload Your Image
Drag and drop your image or click **Select File**. Supported formats: JPG, PNG, WebP, GIF, BMP.

### Step 3: Adjust the Blur Intensity
Use the slider to control how strong the blur effect is:
- **Low (1–3)** — Subtle softening; good for smoothing skin or reducing noise
- **Medium (4–7)** — Noticeable blur; good for background effects
- **High (8–15)** — Heavy blur; good for hiding details and privacy protection
- **Maximum** — Complete obscuration; subject is unrecognizable

### Step 4: Preview and Download
See the result in real time, then click **Download** to save your blurred image.

---

## Tips for Effective Privacy Protection

### Use Higher Blur for Sensitive Info
For faces, names, or financial data, use a high blur value. Light blur can sometimes be reversed with image processing tools — heavy blur is much harder to undo.

### Pixelation Is Better Than Blur for Text
If you're hiding text (like a password or email address), pixelation is more effective than Gaussian blur. Gaussian blur can sometimes be partially reversed using sharpening algorithms, especially on high-contrast text. Pixelation scrambles the information more completely.

### Cover the Entire Sensitive Area
A common mistake is blurring too small an area. Make sure the blur covers the entire element you're hiding, including any shadows or reflections.

### Keep the Original
Always keep the original unblurred version of your file. NanoImage creates a new file on download — your original is untouched.

---

## Creating a Background Blur Effect

Want to make your subject "pop" from the background, like a professional camera with a wide aperture? Here's a simple approach:

1. **Identify your workflow:** You'll need to blur the background separately from the subject
2. **Use a background removal tool** first to isolate your subject (NanoImage's future feature — currently available on tools like remove.bg)
3. **Apply blur to the background layer**
4. **Composite the layers together**

For a simpler approach that doesn't require layer editing: if your subject is already naturally separated from the background (e.g., a portrait with a plain background), a mild blur applied to the full image and then overlaying the original subject can work. This is best handled in a full image editor if you need precise masking.

---

## When Blurring Isn't Enough

For truly sensitive information — medical records, legal documents, financial data — consider these additional steps:

- **Use black redaction bars** instead of blur (harder to reverse)
- **Delete the sensitive file** after sharing the redacted version
- **Use end-to-end encrypted channels** when sharing documents with sensitive content
- **Verify the blur is sufficient** by zooming in 400–500% after applying

---

## Frequently Asked Questions

**Can blurred text be recovered?**
In theory, some blur algorithms can be partially reversed using "deconvolution" image processing — but only if the blur is light and the original text was high-resolution. For practical privacy protection with a high blur setting, the text cannot be meaningfully recovered.

**Does blurring work on faces?**
Yes. A high-intensity Gaussian blur or pixelation effect on a face makes it unrecognizable in practice. For legal or journalistic use where strict anonymization is required, check the specific standards in your jurisdiction.

**Will the blurred image be a smaller file?**
Interestingly, no. Blurred images are often slightly larger than the originals because blur reduces the sharp edges that compression algorithms exploit. If file size matters, compress after blurring.

**Can I blur just part of an image?**
NanoImage's current blur tool applies the effect to the whole image. For selective area blurring, use the browser's built-in tools or a dedicated censor/redaction tool.

---

## Related Tools

- **[Crop](https://nanoimage.net/crop-image)** — Trim away the part you want to hide entirely
- **[Add Watermark](https://nanoimage.net/watermark-image)** — Add text overlays to images
- **[Compress](https://nanoimage.net/compress-image)** — Reduce file size after editing
`;
