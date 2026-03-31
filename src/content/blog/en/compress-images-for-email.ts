export const content = `
# How to Compress Images for Email Attachments

You've taken a photo and want to email it — but the attachment is 8MB and your email client is throwing an error, or you know the recipient's inbox will push it to spam, or it'll take forever to load on their phone.

Email and large image files don't get along. Here's why, and how to fix it in under a minute.

---

## Why Email and Large Images Don't Mix

**Attachment size limits:** Most email providers cap attachment sizes at 10–25MB per email. Gmail allows up to 25MB; Outlook up to 20MB; Yahoo up to 25MB. Corporate email servers are often stricter — 10MB or even 5MB limits are common.

**Recipient inbox limits:** Even if your outgoing server allows a 20MB attachment, the recipient's server may reject it. A common corporate server setting caps incoming attachments at 10MB.

**Mobile data:** Opening a 5MB email attachment on a mobile data connection costs real data and time. Recipients on limited data plans may delay opening your email or not open it at all.

**Spam filters:** Some spam filters flag emails with large attachments, reducing the chance your email reaches the inbox.

**Storage:** Both sender and recipient use storage quota for attachments. A 5MB photo saved in both inboxes uses 10MB of combined storage.

---

## What Size Should Email Images Be?

It depends on what the image is for:

| Purpose | Recommended File Size | Recommended Dimensions |
|---------|----------------------|----------------------|
| General photo sharing | 500KB – 1MB | 1200–1600px wide |
| Profile / headshot | Under 500KB | 800×800px |
| Document scan | Under 1MB | 1200px wide at 150dpi |
| Email newsletter image | Under 200KB | 600px wide |
| Proof / preview to client | 200KB – 500KB | 1000–1200px wide |
| Print-quality delivery | 3–8MB | Full resolution |

For most personal and professional emails, **under 1MB per image** is a good target. Under 500KB is better if you're sending to people on mobile.

---

## Step-by-Step: Compress an Image for Email

### Step 1: Open NanoImage Compress

Go to [NanoImage Compress Image](/compress/). No account, no installation. Your photo is processed in your browser — it never reaches a server.

### Step 2: Upload Your Photo

Drag or click to upload. Works with JPEG, PNG, and WebP.

### Step 3: Set Your Target File Size

In the target size field, enter your desired output size:
- **General email:** 500–800KB
- **Tight attachment limits:** 200–300KB
- **Bulk photos (5+ images):** 200–400KB each (total attachment stays under most limits)

Click **Compress**. NanoImage finds the optimal quality level to hit your target.

### Step 4: Preview and Download

Check the preview — especially faces, text, and fine detail. At 500KB–1MB, a typical photo should look identical to the original at email viewing sizes. Download and attach to your email.

---

## Should You Resize Before Compressing?

Often, yes. A 4000×3000px photo compressed to 500KB will look noticeably worse than an 1600×1200px photo compressed to 500KB — the smaller photo can be stored at higher JPEG quality because there are fewer pixels to encode.

**Recommended workflow for large photos:**

1. Open [NanoImage Resize](/resize/) and resize to **1200–1600px wide** (long edge)
2. Download the resized photo
3. Open [NanoImage Compress](/compress/) and set target to 500KB–1MB
4. Download and attach

This two-step approach gives you the best quality at the smallest file size.

---

## Sending Multiple Photos

If you're sending multiple photos in one email, the total attachment size matters more than any individual image.

**Quick math:**
- 5 photos at 1MB each = 5MB total ✅ (fine for most services)
- 10 photos at 2MB each = 20MB total ⚠️ (approaching limits)
- 20 photos at 3MB each = 60MB total ❌ (will fail)

For large batches, compress each photo to 200–400KB. 20 photos at 300KB each = 6MB total — well under every major email provider's limit.

NanoImage supports batch compression — upload multiple photos at once and apply the same target size to all of them simultaneously.

---

## Alternatives to Email for Large Photos

If you genuinely need to share full-resolution photos (for print, professional use, or archival purposes), email isn't the right tool regardless of compression:

- **Google Drive / Dropbox / OneDrive:** Share a link instead of an attachment. No file size limits. The recipient downloads only what they want.
- **WeTransfer:** Free file sharing up to 2GB. Good for one-time large sends.
- **iCloud Photos / Google Photos shared albums:** Best for sharing photo albums with family.

Compress for email when the recipient just needs to see the photo. Use file sharing when they need the full-resolution file.

---

## Email Format: JPEG, PNG, or WebP?

For email photo attachments, **JPEG is the best choice**:
- Universally supported by all email clients and operating systems
- The most efficient format for photographic images
- Most email clients display JPEG inline (visible without downloading)

Avoid sending WebP as email attachments — older email clients (especially Outlook) may not display WebP inline and will show it as a generic attachment icon.

If your image is a PNG (screenshot, graphic, logo), you can keep it as PNG for images with text or transparency. For photographs in PNG format, convert to JPEG before emailing — the file size reduction is dramatic with no visible quality change.

---

## Frequently Asked Questions

**My email says "attachment too large" — what should I do?**
Compress to under half the listed limit to give yourself a safe margin. If your server says 10MB limit, aim for 4–5MB total.

**Will the recipient notice the image is compressed?**
At 500KB–1MB for a standard photo, no. Email clients display images at screen resolution (typically 72–96dpi), not at print quality. The compression won't be visible.

**Can I compress a PDF for email?**
NanoImage works with image files (JPEG, PNG, WebP). For PDF compression, you need a dedicated PDF tool.

**Should I ZIP the images before sending?**
For JPEG files, ZIP compression adds almost nothing — JPEGs are already compressed. ZIP is useful for sending many files organized in a folder, not for reducing JPEG file sizes.

**What if I need to send a very high-resolution file?**
Use a file sharing service (Google Drive, Dropbox, WeTransfer) and email the link instead. Never compress a print-quality photo so aggressively that it loses usable resolution — the recipient should receive the full file.

---

## Summary

Compressing photos for email:

1. **Resize first** if the photo is larger than 1600px wide — use [NanoImage Resize](/resize/)
2. **Compress to target** — 500KB–1MB for single images, 200–400KB per image for batches
3. **Use JPEG format** — most compatible with all email clients
4. **Check total attachment size** before sending — stay well under your provider's limit

**[Compress your photo for email — free, no upload, instant →](/compress/)**
`;
