'use client'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { en, type Translations } from './en'
import { zhCN } from './zh-CN'
import { zhTW } from './zh-TW'
import { ja } from './ja'
import { ko } from './ko'
import { fr } from './fr'
import { es } from './es'
import { pt } from './pt'
import { ru } from './ru'

export type LangCode = 'en' | 'zh-CN' | 'zh-TW' | 'ja' | 'ko' | 'fr' | 'es' | 'pt' | 'ru'

export const LANGS: { code: LangCode; label: string; flag: string }[] = [
  { code: 'en',    label: 'English',    flag: '🇺🇸' },
  { code: 'zh-CN', label: '简体中文',   flag: '🇨🇳' },
  { code: 'zh-TW', label: '繁體中文',   flag: '🌏' },
  { code: 'ja',    label: '日本語',      flag: '🇯🇵' },
  { code: 'ko',    label: '한국어',      flag: '🇰🇷' },
  { code: 'fr',    label: 'Français',   flag: '🇫🇷' },
  { code: 'es',    label: 'Español',    flag: '🇪🇸' },
  { code: 'pt',    label: 'Português',  flag: '🇧🇷' },
  { code: 'ru',    label: 'Русский',    flag: '🇷🇺' },
]

const translations: Record<LangCode, Translations> = {
  'en':    en,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'ja':    ja,
  'ko':    ko,
  'fr':    fr,
  'es':    es,
  'pt':    pt,
  'ru':    ru,
}

// Country code → language
const COUNTRY_TO_LANG: Record<string, LangCode> = {
  CN: 'zh-CN',
  TW: 'zh-TW', HK: 'zh-TW', MO: 'zh-TW',
  JP: 'ja',
  KR: 'ko',
  FR: 'fr', BE: 'fr', LU: 'fr', MC: 'fr', SN: 'fr', CI: 'fr', CM: 'fr', MG: 'fr',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es', EC: 'es',
  GT: 'es', CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es', SV: 'es', NI: 'es',
  CR: 'es', PA: 'es', UY: 'es',
  BR: 'pt', PT: 'pt', AO: 'pt', MZ: 'pt',
  RU: 'ru', BY: 'ru', KZ: 'ru', UZ: 'ru',
}

// Browser locale → language
function browserLocaleToLang(locale: string): LangCode {
  const l = locale.toLowerCase()
  if (l.startsWith('zh-tw') || l.startsWith('zh-hant') || l.startsWith('zh-hk') || l.startsWith('zh-mo')) return 'zh-TW'
  if (l.startsWith('zh')) return 'zh-CN'
  if (l.startsWith('ja')) return 'ja'
  if (l.startsWith('ko')) return 'ko'
  if (l.startsWith('fr')) return 'fr'
  if (l.startsWith('es')) return 'es'
  if (l.startsWith('pt')) return 'pt'
  if (l.startsWith('ru')) return 'ru'
  return 'en'
}

const STORAGE_KEY = 'nanoimage_lang'

function getStoredLang(): LangCode | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v && v in translations) return v as LangCode
  } catch { /* noop */ }
  return null
}

function storeLang(code: LangCode) {
  try { localStorage.setItem(STORAGE_KEY, code) } catch { /* noop */ }
}

async function detectLangFromIp(): Promise<LangCode | null> {
  try {
    const res = await fetch('https://ipapi.co/country/', { signal: AbortSignal.timeout(3000) })
    const country = (await res.text()).trim().toUpperCase()
    return COUNTRY_TO_LANG[country] ?? null
  } catch {
    return null
  }
}

// ─── Context ────────────────────────────────────────────────────────────────

type I18nContextType = {
  t: Translations
  lang: LangCode
  setLang: (code: LangCode) => void
}

const I18nContext = createContext<I18nContextType>({
  t: en,
  lang: 'en',
  setLang: () => {},
})

export function I18nProvider({ children }: { children: ReactNode }) {
  // Start with 'en' for SSR safety; detect correct language on client
  const [lang, setLangState] = useState<LangCode>('en')

  const setLang = useCallback((code: LangCode) => {
    setLangState(code)
    storeLang(code)
  }, [])

  // Detect language on client side only
  useEffect(() => {
    const stored = getStoredLang()
    if (stored) {
      setLangState(stored)
      return
    }
    const detected = browserLocaleToLang(navigator.language ?? 'en')
    setLangState(detected)
    // Refine with IP if no stored preference
    detectLangFromIp().then((ipDetected) => {
      if (ipDetected && !getStoredLang()) {
        setLangState(ipDetected)
      }
    })
  }, [])

  const t = translations[lang] ?? en

  return (
    <I18nContext.Provider value={{ t, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
