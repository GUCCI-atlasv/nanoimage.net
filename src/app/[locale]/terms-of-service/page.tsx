import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Terms of Service — NanoImage',
  description: 'NanoImage Terms of Service. Free, browser-based image editing tools governed by Singapore law.',
  alternates: { canonical: '/terms-of-service' },
  robots: { index: true, follow: false },
};

export default async function TermsOfServicePage({ params }: { params: Promise<{ locale: string }> }) {
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
        <h1>Terms of Service</h1>
        <p className="meta">NanoImage.net · Last updated: February 2026 · v1.0</p>

        <div className="highlight-box">
          <strong>The short version:</strong> NanoImage is a free tool. Use it responsibly, don&apos;t abuse it, and don&apos;t process illegal content. We provide the service as-is.
        </div>

        <h2>Overview</h2>
        <p>These Terms of Service (&quot;Terms&quot;) govern your use of NanoImage.net and all tools and services available on the website. By using NanoImage, you agree to these Terms.</p>

        <h2>1. The Service</h2>
        <p>NanoImage provides free, browser-based image editing tools including image compression, resizing, cropping, rotation, flipping, blurring, watermarking, format conversion, and related utilities.</p>
        <p><strong>Key characteristic:</strong> All image processing happens locally in your browser. Your images are never uploaded to our servers. You retain full ownership and control of your files at all times.</p>

        <h2>2. Eligibility</h2>
        <p>You must be at least <strong>13 years of age</strong> to use NanoImage. By using the service, you represent that you meet this requirement. If you are under 18, you represent that you have your parent or guardian&apos;s permission to use the service.</p>

        <h2>3. Acceptable Use</h2>
        <h3>3.1 You agree NOT to:</h3>
        <ul>
          <li>Use NanoImage to process, distribute, or facilitate illegal content, including but not limited to child sexual abuse material (CSAM)</li>

          <li>Attempt to reverse-engineer, decompile, or extract the source code beyond what is made publicly available</li>
          <li>Use automated scripts, bots, or scrapers to make excessive requests in a way that degrades service for other users</li>
          <li>Circumvent or attempt to circumvent any technical measures we use to protect the service</li>
          <li>Use NanoImage in any manner that could damage, disable, or impair our infrastructure</li>
          <li>Misrepresent your identity or affiliation when submitting feedback or contacting us</li>
        </ul>
        <h3>3.2 Permitted uses include:</h3>
        <ul>
          <li>Personal and commercial image editing</li>
          <li>Batch processing of your own images</li>
          <li>Embedding NanoImage links in tutorials, blog posts, or documentation</li>
          <li>Any lawful image processing task</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <h3>4.1 NanoImage&apos;s IP</h3>
        <p>All content on NanoImage — including the website design, code, logo, copy, and tooling — is the property of NanoImage and is protected by applicable intellectual property laws.</p>
        <h3>4.2 Your Content</h3>
        <p>Because all processing happens locally in your browser, <strong>we never receive, store, or have access to the images you edit</strong>. You retain full ownership of your images.</p>
        <p>If you submit feedback and voluntarily include a screenshot, you grant us a limited, non-exclusive license to use that screenshot for the purpose of responding to your feedback and improving the product.</p>

        <h3>4.3 Third-Party Content</h3>
        <p>You are responsible for ensuring that any images you process using NanoImage do not infringe on third-party intellectual property rights.</p>

        <h2>5. Feedback and Communications</h2>
        <p>If you submit feedback via our <Link href="/feedback">feedback form</Link> or by emailing <a href="mailto:support@nanoimage.net">support@nanoimage.net</a>:</p>
        <ul>
          <li>You grant us permission to use your feedback to improve NanoImage</li>
          <li>You are not entitled to compensation for feedback</li>
          <li>We are not obligated to act on any feedback</li>
          <li>We will not share your feedback or contact information with third parties</li>
        </ul>

        <h2>6. Disclaimer of Warranties</h2>
        <p>NanoImage is provided <strong>&quot;as is&quot;</strong> and <strong>&quot;as available&quot;</strong> without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or uninterrupted, error-free service.</p>
        <p><strong>Use of NanoImage is at your own risk.</strong> Always keep backup copies of important images before processing them with any tool.</p>

        <h2>7. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, NanoImage and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or loss of data, profits, revenue, or business opportunities.</p>
        <p>In no event shall our total liability to you exceed <strong>USD $100</strong>, even if we have been advised of the possibility of such damages.</p>

        <h2>8. Indemnification</h2>
        <p>You agree to indemnify, defend, and hold harmless NanoImage and its operators from any claims, damages, losses, liabilities, costs, and expenses arising from your use of NanoImage in violation of these Terms, your violation of any law or regulation, or your infringement of any third-party rights.</p>

        <h2>9. Third-Party Services and Links</h2>
        <p>NanoImage may contain links to third-party websites or services. We do not endorse, control, or assume responsibility for the content or privacy practices of any third-party sites. NanoImage uses infrastructure services including Cloudflare.</p>

        <h2>10. Service Availability and Modifications</h2>
        <p>We reserve the right to modify, suspend, or discontinue any part of NanoImage at any time, with or without notice. Your continued use of NanoImage after changes to these Terms constitutes your acceptance of the new Terms.</p>

        <h2>11. Termination</h2>
        <p>We reserve the right to restrict or terminate your access to NanoImage at any time, without notice, if we believe you are violating these Terms or using the service in a harmful manner.</p>

        <h2>12. Governing Law</h2>
        <p>These Terms shall be governed by and construed in accordance with the laws of <strong>Singapore</strong>, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Singapore.</p>

        <h2>13. Severability</h2>
        <p>If any provision of these Terms is found to be unenforceable or invalid under applicable law, that provision shall be modified to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.</p>

        <h2>14. Entire Agreement</h2>
        <p>These Terms, together with our <Link href="/privacy-policy">Privacy Policy</Link>, constitute the entire agreement between you and NanoImage regarding your use of the service.</p>

        <h2>15. Contact</h2>
        <p>If you have questions about these Terms, please contact us:</p>
        <p>
          <strong>Email:</strong> <a href="mailto:support@nanoimage.net">support@nanoimage.net</a><br />
          <strong>Website:</strong> <a href="https://nanoimage.net">nanoimage.net</a>
        </p>

        <div className="footer-note">
          <Link href="/privacy-policy">Privacy Policy</Link> · <Link href="/feedback">Feedback</Link>
        </div>
      </article>
    </div>
  );
}
