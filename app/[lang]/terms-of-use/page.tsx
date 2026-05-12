import AppShell from '@/components/AppShell'
import { URL_LANG_CODES } from '@/lib/i18n-utils'

export function generateStaticParams() {
  return URL_LANG_CODES.map((lang) => ({ lang }))
}

export default function LangTermsOfUsePage() {
  return <AppShell page="terms-of-use" />
}
