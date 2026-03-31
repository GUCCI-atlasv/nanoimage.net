export const content = `
# How to Resize a Photo for a Visa or Passport Application

Passport and visa photo requirements are notoriously strict. Wrong dimensions, wrong file size, wrong background — and your application gets rejected. Processing a new photo costs time and sometimes money, and can delay your travel plans.

This guide covers the exact requirements for the most common passports and visas, and walks you through how to resize and prepare your photo yourself — for free, in your browser.

---

## Why Passport Photo Requirements Are So Strict

Passport photos are used for facial recognition, identity verification, and biometric matching. The strict sizing requirements ensure:

- The face is consistently positioned and sized for automated matching
- The photo fits the physical passport booklet dimensions
- Digital systems can extract facial features reliably

Most rejections happen because of **wrong aspect ratio**, **face too small or too large in the frame**, or **file size too large or too small** — not because the photo itself looks bad.

---

## Passport Photo Size Requirements by Country

### United States (US Passport)

| Requirement | Spec |
|-------------|------|
| Print size | 2 × 2 inches (51 × 51 mm) |
| Digital size | 600 × 600 px minimum, up to 1200 × 1200 px |
| Aspect ratio | 1:1 (square) |
| File size | 240KB to 10MB (for online applications) |
| Face size | Head must occupy 50–69% of the frame height |
| Background | Plain white or off-white |

### United Kingdom (UK Passport)

| Requirement | Spec |
|-------------|------|
| Print size | 35 × 45 mm |
| Aspect ratio | 35:45 (roughly 7:9) |
| Digital size | Minimum 600 px on shortest side |
| File size | Under 10MB |
| Face size | 29–34 mm from chin to crown |
| Background | Light grey or cream |

### Schengen Visa (EU)

| Requirement | Spec |
|-------------|------|
| Print size | 35 × 45 mm |
| Aspect ratio | 35:45 |
| Face size | 32–36 mm from chin to top of head (70–80% of frame) |
| Background | Light/white |

### Canada Passport

| Requirement | Spec |
|-------------|------|
| Print size | 50 × 70 mm |
| Aspect ratio | 5:7 |
| Face size | 31–36 mm from chin to crown |
| Background | White |

### Australia Passport

| Requirement | Spec |
|-------------|------|
| Print size | 35 × 45 mm |
| Aspect ratio | 35:45 |
| Face | Must fill 70–80% of frame |
| Background | Plain light |

### India Passport / Visa

| Requirement | Spec |
|-------------|------|
| Print size | 51 × 51 mm (2 × 2 inches) |
| Digital size | 200 × 200 px to 1000 × 1000 px |
| File size | 10KB to 1MB |
| Background | White |

---

## Step-by-Step: Prepare Your Passport Photo

### Step 1: Take the Photo

Before resizing anything, you need a good source photo:

- **Plain background:** Use a white or light-coloured wall. Avoid shadows — stand a foot away from the wall.
- **Neutral expression:** Mouth closed, eyes open and clearly visible.
- **Head position:** Look directly at the camera. No tilting.
- **No glasses:** Most countries now reject photos with glasses.
- **Lighting:** Even light on your face. No harsh shadows on one side.

Take the photo in good light (near a window works well) on any smartphone camera in portrait orientation.

### Step 2: Crop to the Right Aspect Ratio

Open [NanoImage Crop](/crop/) and upload your photo.

For **US, Indian passports:** Select the **1:1** preset → position the crop box so your face is centered with space above your head and below your chin → crop.

For **UK, Schengen, Australian passports:** Select **Custom** ratio → enter **35:45** → position so the face fills 70–80% of the frame height → crop.

For **Canadian passports:** Select **Custom** → enter **5:7** → crop.

**Face positioning tip:** Your eyes should be in the upper third of the frame, roughly 2/3 of the way up from the bottom of the image.

### Step 3: Resize to Required Dimensions

Open [NanoImage Resize](/resize/) and upload your cropped photo.

Enter the target dimensions in pixels. For most online applications:
- US passport (digital): **600 × 600 px** (minimum) — you can go up to 1200 × 1200 px
- UK/Schengen/Australia (digital): **600 × 771 px** (scales 35:45 to 600px wide)
- Canada (digital): **600 × 840 px** (scales 5:7 to 600px wide)
- India (digital): **600 × 600 px**

Make sure **Lock Aspect Ratio** is enabled. Since you've already cropped to the right ratio, the dimensions should calculate correctly.

### Step 4: Check the File Size

Most online passport photo submission portals have a file size limit (commonly 240KB–10MB).

Check your resized photo's file size. If it's too large, open [NanoImage Compress](/compress/), upload the photo, set a target file size slightly under the limit, and download.

If it's too small (rare but possible), the photo may be too low resolution — go back and take a new photo at higher resolution.

---

## Common Rejection Reasons (and How to Avoid Them)

**Face too small:** If your head occupies less than 50% of the frame height, the photo will be rejected. Crop closer to your face — leave less empty space above your head.

**Face too large:** If your head is cut off at the top or chin, crop out to give more space. The target is 70–80% face coverage in the frame.

**Wrong aspect ratio:** A portrait photo cropped from a landscape image won't automatically be the right ratio. Always use the custom ratio crop tool rather than cropping by eye.

**Shadow on background:** Rejected for failing the "plain background" requirement. Retake the photo with more distance between you and the wall.

**File too large:** Many government portals have strict upper limits (sometimes as low as 240KB for US applications). Use the target-size compression tool to hit a specific KB target.

**Wrong format:** Some portals require JPEG specifically (not PNG, not WebP). Use [NanoImage Convert to JPG](/convert-jpg/) to ensure the output is .jpg.

---

## Why Do This in Your Browser?

A passport photo contains your full face, biometric data, and is often paired with personal information. Using a server-based tool means uploading a high-resolution face photo to a third party.

NanoImage handles all processing in your browser — the crop, resize, and compress operations all happen on your device. Your photo never leaves your computer or phone.

---

## Frequently Asked Questions

**Can I take my own passport photo at home?**
Yes — for digital submissions and many in-person applications, self-taken photos are accepted as long as they meet the technical requirements. The photo must be recent (usually within 6 months).

**Does the photo need to be printed or can I submit it digitally?**
Most new passport applications (US, UK, Canada, Australia) offer digital photo submission. Check your specific application portal. For in-person submissions at post offices or photo centres, you'll need a print.

**What resolution should I use?**
For digital submissions: 600px on the short side is the minimum for most portals. 1200px is safe for all portals without exceeding any upper limit.

**Can I use a photo with glasses?**
As of 2023–2026, virtually all major passport-issuing countries reject photos with glasses, including prescription and sunglasses. Remove glasses for the photo.

**My portal says the file is too large even after compressing. What do I do?**
Set a more aggressive target in NanoImage Compress — try 200KB for portals with tight limits. At 600×600px, a JPEG at quality 70–75 typically comes in under 100KB with acceptable quality.

---

## Summary

Preparing your own passport or visa photo:

1. Take a well-lit photo against a plain background
2. [Crop to the right aspect ratio](/crop/) — 1:1 for US/India, 35:45 for UK/Schengen/Australia, 5:7 for Canada
3. [Resize to required pixel dimensions](/resize/)
4. [Compress to meet file size limits](/compress/) if needed
5. [Convert to JPG](/convert-jpg/) if the portal requires JPEG

**[Resize your passport photo now — free, no upload, no account →](/resize/)**
`;
