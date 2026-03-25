import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Privacy Policy — NanoImage',
  description: 'NanoImage Privacy Policy. All image processing happens locally in your browser — your images never leave your device.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: false },
};

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12">
      <div className="mb-8">
        <Link href="/" className="font-mono text-[11px] text-muted hover:text-accent transition-colors uppercase tracking-[2px]">
          ← Home
        </Link>
      </div>

      <article className="prose-legal">
        <h1>Privacy Policy</h1>
        <p className="meta">NanoImage.net · Last updated: February 2026 · v1.0</p>

        <div className="highlight-box">
          <strong>The short version:</strong> We collect almost nothing. All image processing happens locally in your browser — your images never leave your device.
        </div>

        <h2>1. Information We Do NOT Collect</h2>
        <ul>
          <li><strong>Your images.</strong> Every tool on NanoImage processes images entirely within your browser using the Canvas API. No image data is ever uploaded to our servers.</li>
          <li><strong>Your name, account information, or login credentials.</strong> NanoImage requires no account or registration.</li>
          <li><strong>Payment information.</strong> NanoImage is free and does not accept payments.</li>
        </ul>

        <h2>2. Information We Collect</h2>

        <h3>2.1 Analytics (Anonymous)</h3>
        <p>We use privacy-respecting analytics to understand how our tools are used in aggregate. This may include:</p>
        <ul>
          <li>Pages visited and tools used</li>
          <li>Country or region (derived from IP address, not stored)</li>
          <li>Browser type and operating system</li>
          <li>Referring website</li>
          <li>Session duration</li>
        </ul>
        <p>This data is <strong>aggregated and anonymous</strong>. It cannot be used to identify you individually.</p>

        <h3>2.2 Feedback Submissions</h3>
        <p>If you choose to submit feedback via our <Link href="/feedback">Feedback page</Link> or the in-tool feedback bar, we collect:</p>
        <ul>
          <li>The content of your message (feedback type, description)</li>
          <li>Your email address, <strong>only if you voluntarily provide it</strong></li>
          <li>The tool you were using when you submitted feedback</li>
          <li>A screenshot, <strong>only if you voluntarily attach one</strong></li>
        </ul>
        <p>This information is sent directly to <a href="mailto:support@nanoimage.net">support@nanoimage.net</a> via Cloudflare Email Routing and is used solely to respond to your feedback and improve the product. It is not shared with third parties.</p>

        <h3>2.3 Cookies and Local Storage</h3>
        <p>We use <strong>localStorage</strong> and <strong>session cookies</strong> for:</p>
        <ul>
          <li>Remembering your language preference (<code>nano_lang</code>)</li>
          <li>Storing your feedback bar preference (e.g., whether you dismissed it)</li>
        </ul>
        <p>These are <strong>functional cookies</strong> necessary for the site to work as expected. We do not use tracking cookies or advertising cookies.</p>

        <h2>3. How We Use Information</h2>
        <table>
          <thead><tr><th>Information</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td>Anonymous analytics</td><td>Understanding which tools are most useful; improving the product</td></tr>
            <tr><td>Feedback content</td><td>Responding to bug reports and feature requests</td></tr>
            <tr><td>Your email (if provided)</td><td>Replying to your feedback; no marketing emails</td></tr>
            <tr><td>Language preference (localStorage)</td><td>Displaying the site in your preferred language</td></tr>
          </tbody>
        </table>
        <p>We do <strong>not</strong> use your information for advertising, retargeting, selling or sharing with third parties, or building user profiles.</p>


        <h2>4. Third-Party Services</h2>
        <table>
          <thead><tr><th>Service</th><th>Purpose</th><th>Data shared</th></tr></thead>
          <tbody>
            <tr><td><strong>Cloudflare</strong></td><td>DNS, CDN, Workers, Email Routing</td><td>IP address (processed, not stored by us)</td></tr>
            <tr><td><strong>Hosting provider</strong></td><td>Website hosting</td><td>Standard web server logs (IP, request URL)</td></tr>
            <tr><td><strong>Google Fonts</strong></td><td>Typography</td><td>Font requests sent to Google servers</td></tr>
          </tbody>
        </table>
        <p>We do not use Google Analytics, Facebook Pixel, or any advertising trackers.</p>

        <h2>5. Data Retention</h2>
        <ul>
          <li><strong>Image data:</strong> Never stored — not applicable.</li>
          <li><strong>Feedback emails:</strong> Retained in our email inbox until manually deleted.</li>
          <li><strong>Analytics data:</strong> Aggregated, anonymized. No personally identifiable data is retained.</li>
          <li><strong>localStorage / cookies:</strong> Stored in your browser until you clear them.</li>
        </ul>

        <h2>6. Your Rights</h2>
        <p>Depending on your location, you may have the following rights:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of any personal data we hold about you.</li>
          <li><strong>Deletion:</strong> Request deletion of any personal data associated with you.</li>
          <li><strong>Correction:</strong> Request correction of inaccurate personal data.</li>
          <li><strong>Objection:</strong> Object to processing of your data.</li>
        </ul>
        <p>To exercise any of these rights, contact us at <a href="mailto:support@nanoimage.net">support@nanoimage.net</a>.</p>
        <p><strong>EU/EEA users (GDPR):</strong> You have the right to lodge a complaint with your local data protection authority.</p>
        <p><strong>California users (CCPA):</strong> We do not sell personal information.</p>

        <h2>7. Children&apos;s Privacy</h2>
        <p>NanoImage is not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has submitted personal information to us, please contact us at <a href="mailto:support@nanoimage.net">support@nanoimage.net</a>.</p>

        <h2>8. Security</h2>
        <ul>
          <li>All connections to NanoImage use HTTPS (TLS encryption).</li>
          <li>Image processing happens locally in your browser — there is no server-side image handling to secure.</li>
          <li>Feedback submissions are transmitted over encrypted connections to Cloudflare Workers.</li>
        </ul>

        <h2>9. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. When we do, we will update the &quot;Last updated&quot; date at the top of this page. Your continued use of NanoImage after any changes constitutes your acceptance of the updated Privacy Policy.</p>

        <h2>10. Contact</h2>
        <p>If you have questions, concerns, or requests related to this Privacy Policy, please contact us:</p>
        <p>
          <strong>Email:</strong> <a href="mailto:support@nanoimage.net">support@nanoimage.net</a><br />
          <strong>Website:</strong> <a href="https://www.nanoimage.net">nanoimage.net</a>
        </p>
        <p>We aim to respond to all privacy-related inquiries within <strong>5 business days</strong>.</p>

        <div className="footer-note">
          <Link href="/terms-of-service">Terms of Service</Link> · <Link href="/feedback">Feedback</Link>
        </div>
      </article>
    </div>
  );
}
