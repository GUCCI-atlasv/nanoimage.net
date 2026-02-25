export const content = `
You have a photo you need to compress, rotate, or resize. You search online, find a tool, upload your image, and download the result. Simple enough.

But what happened to your photo in between?

Most people never think to ask. This article explains what actually happens when you upload an image to an online tool — and how to protect yourself when you need to edit sensitive photos.

## What Happens When You Upload an Image Online

When you use a typical online image tool, here's the process behind the scenes:

1. You select your photo and click upload
2. Your image is sent over the internet to the tool's server (a computer owned or rented by that company)
3. The server processes your image (compresses it, resizes it, etc.)
4. The processed image is sent back to your browser for download

Your photo exists on someone else's computer during this process. Whether it stays there afterward depends entirely on that company's policies — and most people never read those policies.

## Do They Actually Keep Your Images?

The honest answer: **it depends on the tool, and most don't tell you clearly.**

Here are the different approaches tools take:

**"Deleted immediately after processing"** — Some tools claim to delete uploads instantly after your download. This is the most privacy-friendly policy for server-based tools. But "immediately" often means within a few seconds to a few minutes, and you're trusting their word.

**"Deleted after X hours"** — Many tools keep your files for 1-24 hours to allow you to re-download them. This is common and convenient, but your image sits on their server during that time.

**"May be retained for service improvement"** — This is concerning. Some tools use uploaded images to train systems or improve algorithms. This is usually buried in the terms of service.

**No policy stated** — Many small tools simply don't address this at all. No stated policy is not the same as a privacy-protective one.

## Why This Actually Matters

For most images — a product photo, a meme, a screenshot of something public — the privacy risk is low. But consider these scenarios:

**Government documents and IDs.** Many visa and permit applications require photo uploads with specific size requirements. People routinely compress photos of passports, ID cards, and official documents using random online tools. These documents contain your full name, date of birth, address, and ID number.

**Medical images.** Health app screenshots, medical scan photos, prescription photos. These are some of the most sensitive files you could have on your phone.

**Business and financial documents.** Screenshots of contracts, financial statements, confidential emails. If you're compressing these for a work submission, sending them through a third-party server is a security risk.

**Personal photos.** Photos of yourself, your family, your home — even if not immediately sensitive, this is personal data you may not want stored on unknown servers.

## How Browser-Based Tools Are Different

A newer category of image tools processes everything directly in your browser, using a browser technology called the Canvas API. These tools never need to send your image anywhere.

When you use a browser-based tool like [NanoImage](https://www.nanoimage.net):

1. You select your photo
2. The processing happens entirely within your browser on your own device
3. The result is saved directly to your device
4. At no point does your image travel over the internet to any server

This isn't a policy difference — it's a technical one. The tool is physically incapable of storing your image because it never receives it.

## How to Check if a Tool Uploads Your Images

A few ways to verify:

**Check the privacy policy.** Search for words like "upload", "store", "retain", "delete", and "third party". A trustworthy tool will be explicit about what happens to your files.

**Watch your network traffic.** In any browser, you can open Developer Tools (F12 or right-click → Inspect) and go to the Network tab. Upload an image and watch whether any network requests appear. A browser-based tool will show no upload activity.

**Look for offline functionality.** If a tool works when you turn off your internet after the page loads, it's definitely processing locally. Server-based tools will fail without a connection.

## When to Be Especially Careful

Use a privacy-first, browser-based tool any time you're editing:

- Passport or ID card photos
- Medical documents or health records
- Photos of financial documents
- Business documents marked confidential
- Any image you wouldn't want stored on a stranger's computer

For casual use — resizing a holiday photo or compressing a food image for social media — the risk is lower. But developing the habit of using browser-based tools by default is a reasonable approach.

## The Bottom Line

Most popular online image tools upload your files to their servers. Some delete them quickly, some keep them longer, and some don't tell you clearly either way.

Browser-based tools that process images locally — like NanoImage — are technically incapable of storing your images because they never receive them. For sensitive photos, this is the safest option.

Before you upload your next photo to an online tool, take thirty seconds to check: does this tool upload my image to a server, or does it process it in my browser?

The answer makes a bigger difference than most people realize.
`;
