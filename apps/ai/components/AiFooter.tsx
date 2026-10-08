const MAIN_SITE = 'https://nanoimage.net'
const YEAR = new Date().getFullYear()

export function AiFooter() {
  return (
    <footer className="ai-footer">
      <div className="footer-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/brand/logo/nanoimage-logo.svg"
          alt="NanoImage"
          width={100}
          height={24}
        />
        <span className="footer-tagline">
          AI tools that still don&apos;t upload your photos. &copy; {YEAR}
        </span>
      </div>

      <div className="footer-links">
        <a href="/tools">All AI tools</a>
        <a href={MAIN_SITE} rel="noopener">nanoimage.net</a>
        <a href={`${MAIN_SITE}/how-it-works`} rel="noopener">How it works</a>
        <a href={`${MAIN_SITE}/privacy-policy`} rel="noopener">Privacy</a>
        <a href={`${MAIN_SITE}/terms-of-use`} rel="noopener">Terms</a>
      </div>
    </footer>
  )
}
