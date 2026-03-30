export const content = `
# How to Rotate a Sideways Photo Back to Normal

You take a photo holding your phone vertically, upload it somewhere — and it appears sideways. Or you scan a document and the PDF shows it rotated 90 degrees. Or you receive an image from a colleague and it opens upside-down in every program you try.

This is one of the most common and annoying photo problems. Here's why it happens and how to fix it in seconds.

---

## Why Photos Appear Sideways (The EXIF Orientation Problem)

The most common cause of sideways photos isn't that the image data is actually sideways — it's that the photo was taken in one orientation but the **EXIF metadata** says it should be rotated.

Here's what happens:

1. You hold your phone to take a portrait photo
2. The camera sensor captures the image in its physical orientation
3. The phone records an EXIF tag that says "rotate this 90 degrees clockwise when displaying"
4. Software that reads EXIF data (iPhone, Chrome, most modern apps) correctly displays it upright
5. Software that ignores EXIF data displays the raw image — sideways

This is why a photo looks fine on your phone but appears sideways when you upload it to a website, email it, or open it in certain programs.

**The fix:** Rotate the image and save it with the rotation baked in — not just recorded in metadata.

---

## Other Reasons Photos Are Sideways

**Scanned documents:** Flatbed scanners don't always detect orientation automatically. Placing a document at a slight angle, or feeding it in sideways, produces a rotated scan.

**Screenshots from rotated interfaces:** If you take a screenshot while your device is in landscape mode, the screenshot is landscape. In portrait contexts, this appears sideways.

**Downloaded images:** Some images are inherently rotated due to how they were exported from software or cameras.

**DSLR cameras:** Many DSLR and mirrorless cameras don't have accelerometers. Photos taken with the camera rotated may not have orientation metadata at all.

---

## Step-by-Step: Fix a Sideways Photo

### Step 1: Open NanoImage Rotate

Go to [NanoImage Rotate Image](/rotate-image/). Works in any browser — no account, no installation, no upload to a server.

### Step 2: Upload Your Photo

Drag or click to upload. JPEG, PNG, and WebP are supported.

### Step 3: Choose Your Rotation

- **90° clockwise:** The top of the subject is pointing to the left
- **90° counter-clockwise:** The top of the subject is pointing to the right
- **180°:** Photo is upside down

If you're unsure, look at which side the sky (or ceiling) is on, and rotate accordingly.

### Step 4: Download

Click **Rotate** then **Download**. The rotation is baked into the image file — the result displays correctly in every program, browser, and platform.

---

## How to Tell Which Way to Rotate

**Look for gravity-dependent clues:** Water in a glass sits at the bottom. Hair hangs down. Horizons are horizontal. Text reads left-to-right.

**Look at facial features:** Noses point forward. Eyes are horizontal.

**Check the context:** What should be at the top of the image? Rotate until that element is at the top.

When in doubt, try 90° clockwise first — that's the most common orientation issue with portrait photos taken on Android devices.

---

## Permanently Fixing the Rotation (Not Just Metadata)

This is the critical part: some tools "rotate" a photo by updating only the EXIF orientation tag, without actually changing the pixel data. The image appears rotated on screen but is still stored sideways.

If you upload that image to a platform that ignores EXIF data, it appears sideways again.

NanoImage rotates the actual pixel data, not just the metadata. The rotation is permanent and displays correctly everywhere — regardless of whether the viewer reads EXIF tags or not.

---

## Common Scenarios and Their Solutions

**Portrait photo appears sideways on website uploads:**
Most common issue. Rotate 90° in the correct direction. The EXIF metadata is being ignored by the platform.

**Scanned PDF page is sideways:**
NanoImage works with image files — if your scan is a PDF, export the page as a JPEG first (most PDF viewers let you export pages as images), then rotate.

**Photos from an old camera are sideways:**
Older cameras without accelerometers don't record orientation. Rotate manually and save — the rotation will persist.

**Image opens correctly in one app but sideways in another:**
One app is reading EXIF orientation; the other isn't. Rotating and re-saving with NanoImage bakes the rotation into pixel data, fixing it in all apps.

**The image is slightly tilted, not exactly 90°:**
Use NanoImage's custom angle rotation to correct minor tilt. Enter a specific angle (e.g., 2.5° or −3°) to straighten a slightly crooked photo.

---

## Rotate vs Flip: What's the Difference?

**Rotate:** Turns the image by a set number of degrees — 90°, 180°, 270°, or any custom angle. The image spins around its center.

**Flip (mirror):** Creates a mirror image horizontally (left-to-right) or vertically (top-to-bottom).

If your photo is sideways, you need **rotate**, not flip. If your photo is a mirror image of what you intended (common with selfies), use the separate [Flip Image](/flip-image/) tool.

---

## Frequently Asked Questions

**Why does my photo look fine on my phone but sideways everywhere else?**
Your phone reads EXIF orientation data and displays accordingly. Many websites, upload forms, and programs don't. Rotating and re-saving with NanoImage fixes this permanently.

**Will rotating reduce image quality?**
Rotating a JPEG by exactly 90°, 180°, or 270° can be done losslessly — without re-encoding the JPEG data. NanoImage uses lossless rotation when possible, preserving full image quality.

**I rotated my image but it still looks sideways after downloading. What happened?**
Try opening the downloaded file in a different program, or upload it to a website to verify how it displays. Some photo viewers override display based on their own EXIF reading.

**Can I rotate just part of an image?**
No — rotation applies to the entire image. For selective rotation, you'd need a more advanced photo editor.

---

## Summary

Fixing a sideways photo takes about 10 seconds:

1. Open [NanoImage Rotate Image](/rotate-image/)
2. Upload your photo
3. Select 90° clockwise, 90° counter-clockwise, or 180°
4. Download — rotation is permanently baked into the file

**[Fix your sideways photo — free, no upload, no account →](/rotate-image/)**
`;
