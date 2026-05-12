/**
 * Server-side i18n helper for generateMetadata.
 * Imports plain translation objects directly (no React, safe for Server Components).
 */
import { en } from '@/src/i18n/en'
import { zhCN } from '@/src/i18n/zh-CN'
import { zhTW } from '@/src/i18n/zh-TW'
import { ja } from '@/src/i18n/ja'
import { ko } from '@/src/i18n/ko'
import { fr } from '@/src/i18n/fr'
import { es } from '@/src/i18n/es'
import { pt } from '@/src/i18n/pt'
import { ru } from '@/src/i18n/ru'
import { URL_TO_LANG } from './i18n-utils'

type Translations = typeof en

const TRANSLATIONS: Record<string, Translations> = {
  en,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  ja,
  ko,
  fr,
  es,
  pt,
  ru,
}

/** Get the full translation object for a URL lang prefix (e.g. 'zh', 'fr'). */
export function getTranslations(urlLang: string): Translations {
  const langCode = URL_TO_LANG[urlLang] ?? 'en'
  return TRANSLATIONS[langCode] ?? en
}

// ─── Tool-page suffix per LangCode ──────────────────────────────────────────
const TOOL_SUFFIX: Record<string, string> = {
  'zh-CN': '在线免费 - NanoImage',
  'zh-TW': '線上免費 - NanoImage',
  ja:      'オンライン無料 - NanoImage',
  ko:      '무료 온라인 - NanoImage',
  fr:      'en ligne gratuit - NanoImage',
  es:      'online gratis - NanoImage',
  pt:      'online grátis - NanoImage',
  ru:      'онлайн бесплатно - NanoImage',
}

/** Build localised title + description for a tool page. */
export function getToolMeta(
  urlLang: string,
  slug: string,
): { title: string; description: string } {
  const langCode = URL_TO_LANG[urlLang] ?? 'en'
  const t = TRANSLATIONS[langCode] ?? en
  const toolEntry = (t.toolsData as Record<string, { name: string; description: string }>)?.[slug]

  if (toolEntry) {
    const suffix = TOOL_SUFFIX[langCode] ?? 'Online - NanoImage'
    return {
      title: `${toolEntry.name} ${suffix}`,
      description: toolEntry.description,
    }
  }

  // Fallback: English tool data
  const enEntry = (en.toolsData as Record<string, { name: string; description: string }>)?.[slug]
  if (enEntry) {
    return {
      title: `${enEntry.name} Online - NanoImage`,
      description: enEntry.description,
    }
  }

  return { title: 'NanoImage', description: '' }
}

// ─── Page-level SEO metadata per language ───────────────────────────────────
type PageMeta = { title: string; description: string }

export const HOME_META: Record<string, PageMeta> = {
  en: {
    title: "NanoImage — 15 Image Tools. No AI. No Upload. No Account.",
    description: "Compress, resize, crop, convert images — 100% in your browser. Your files never leave your device. Free forever.",
  },
  'zh-CN': {
    title: "NanoImage — 15 款图片工具。无需AI。无需上传。无需账号。",
    description: "在线压缩、调整大小、裁剪、转换图片——100% 在浏览器中运行，文件从不离开您的设备。永久免费。",
  },
  'zh-TW': {
    title: "NanoImage — 15 款圖片工具。無需AI。無需上傳。無需帳號。",
    description: "線上壓縮、調整大小、裁切、轉換圖片——100% 在瀏覽器中運行，檔案永不離開您的裝置。永久免費。",
  },
  ja: {
    title: "NanoImage — 15の画像ツール。AI不要。アップロード不要。アカウント不要。",
    description: "画像の圧縮・リサイズ・トリミング・変換をブラウザで完結。ファイルはデバイスから出ません。完全無料。",
  },
  ko: {
    title: "NanoImage — 15가지 이미지 도구. AI 없음. 업로드 없음. 계정 없음.",
    description: "브라우저에서 이미지 압축, 크기 조정, 자르기, 변환. 파일이 기기를 벗어나지 않습니다. 영원히 무료.",
  },
  fr: {
    title: "NanoImage — 15 outils image. Sans IA. Sans upload. Sans compte.",
    description: "Compressez, redimensionnez, recadrez, convertissez vos images dans le navigateur. Vos fichiers restent sur votre appareil. Gratuit à vie.",
  },
  es: {
    title: "NanoImage — 15 herramientas de imagen. Sin IA. Sin subida. Sin cuenta.",
    description: "Comprime, redimensiona, recorta y convierte imágenes en el navegador. Tus archivos nunca salen de tu dispositivo. Gratis para siempre.",
  },
  pt: {
    title: "NanoImage — 15 ferramentas de imagem. Sem IA. Sem upload. Sem conta.",
    description: "Comprima, redimensione, corte e converta imagens no navegador. Seus arquivos nunca saem do seu dispositivo. Gratuito para sempre.",
  },
  ru: {
    title: "NanoImage — 15 инструментов для изображений. Без ИИ. Без загрузки. Без аккаунта.",
    description: "Сжимайте, изменяйте размер, обрезайте и конвертируйте изображения в браузере. Ваши файлы никогда не покидают устройство. Бесплатно навсегда.",
  },
}

export const BLOG_META: Record<string, PageMeta> = {
  en: {
    title: "NanoImage Blog - Image Tools Guides",
    description: "Tips, guides, and updates about image compression, resizing, conversion, and more from the NanoImage team.",
  },
  'zh-CN': {
    title: "NanoImage 博客 - 图片工具使用指南",
    description: "来自 NanoImage 团队关于图片压缩、调整大小、格式转换等主题的技巧与指南。",
  },
  'zh-TW': {
    title: "NanoImage 部落格 - 圖片工具使用指南",
    description: "來自 NanoImage 團隊關於圖片壓縮、調整大小、格式轉換等主題的技巧與指南。",
  },
  ja: {
    title: "NanoImage ブログ - 画像ツール活用ガイド",
    description: "NanoImageチームによる画像圧縮・リサイズ・変換などのヒントとガイド。",
  },
  ko: {
    title: "NanoImage 블로그 - 이미지 도구 가이드",
    description: "NanoImage 팀의 이미지 압축, 크기 조정, 변환 등에 관한 팁과 가이드.",
  },
  fr: {
    title: "Blog NanoImage - Guides d'outils image",
    description: "Conseils, guides et actualités sur la compression, le redimensionnement et la conversion d'images par l'équipe NanoImage.",
  },
  es: {
    title: "Blog NanoImage - Guías de herramientas de imagen",
    description: "Consejos, guías y novedades sobre compresión, redimensionamiento y conversión de imágenes del equipo NanoImage.",
  },
  pt: {
    title: "Blog NanoImage - Guias de ferramentas de imagem",
    description: "Dicas, guias e atualizações sobre compressão, redimensionamento e conversão de imagens da equipe NanoImage.",
  },
  ru: {
    title: "Блог NanoImage - Руководства по инструментам для изображений",
    description: "Советы, руководства и обновления по сжатию, изменению размера и конвертации изображений от команды NanoImage.",
  },
}

export const HOW_META: Record<string, PageMeta> = {
  en: {
    title: "How NanoImage Works - Free Browser-Based Image Tools",
    description: "Learn how NanoImage processes your images 100% in the browser using Canvas API. No server uploads, no accounts.",
  },
  'zh-CN': {
    title: "NanoImage 工作原理 - 免费浏览器图片处理工具",
    description: "了解 NanoImage 如何使用 Canvas API 在浏览器中 100% 处理您的图片，无需上传服务器，无需账号。",
  },
  'zh-TW': {
    title: "NanoImage 工作原理 - 免費瀏覽器圖片處理工具",
    description: "了解 NanoImage 如何使用 Canvas API 在瀏覽器中 100% 處理您的圖片，無需上傳伺服器，無需帳號。",
  },
  ja: {
    title: "NanoImageの仕組み - 無料ブラウザ画像処理ツール",
    description: "NanoImageがCanvas APIを使ってブラウザ内で100%処理する仕組みを学びましょう。サーバー送信なし、アカウント不要。",
  },
  ko: {
    title: "NanoImage 작동 방식 - 무료 브라우저 이미지 도구",
    description: "NanoImage가 Canvas API를 사용해 브라우저에서 100% 이미지를 처리하는 방법을 알아보세요. 서버 업로드 없음, 계정 불필요.",
  },
  fr: {
    title: "Comment fonctionne NanoImage - Outils image gratuits dans le navigateur",
    description: "Découvrez comment NanoImage traite vos images à 100% dans le navigateur avec l'API Canvas. Sans upload, sans compte.",
  },
  es: {
    title: "Cómo funciona NanoImage - Herramientas de imagen gratuitas en el navegador",
    description: "Descubra cómo NanoImage procesa sus imágenes 100% en el navegador con la API Canvas. Sin subida, sin cuenta.",
  },
  pt: {
    title: "Como o NanoImage funciona - Ferramentas de imagem gratuitas no navegador",
    description: "Saiba como o NanoImage processa suas imagens 100% no navegador com a API Canvas. Sem upload, sem conta.",
  },
  ru: {
    title: "Как работает NanoImage - Бесплатные инструменты для изображений в браузере",
    description: "Узнайте, как NanoImage обрабатывает изображения на 100% в браузере через Canvas API. Без загрузки на сервер, без аккаунта.",
  },
}

export const CLI_META: Record<string, PageMeta> = {
  en: {
    title: "NanoImage CLI - Command Line Image Processing Tool",
    description: "Process images from the terminal. Compress, resize, convert, and more with the NanoImage CLI. Install via npm.",
  },
  'zh-CN': {
    title: "NanoImage CLI - 命令行图片处理工具",
    description: "在终端处理图片。使用 NanoImage CLI 进行压缩、调整大小、格式转换等操作，通过 npm 安装。",
  },
  'zh-TW': {
    title: "NanoImage CLI - 命令列圖片處理工具",
    description: "在終端機處理圖片。使用 NanoImage CLI 進行壓縮、調整大小、格式轉換等操作，透過 npm 安裝。",
  },
  ja: {
    title: "NanoImage CLI - コマンドライン画像処理ツール",
    description: "ターミナルから画像を処理。NanoImage CLIで圧縮・リサイズ・変換など。npmでインストール。",
  },
  ko: {
    title: "NanoImage CLI - 명령줄 이미지 처리 도구",
    description: "터미널에서 이미지를 처리하세요. NanoImage CLI로 압축, 크기 조정, 변환 등. npm으로 설치.",
  },
  fr: {
    title: "NanoImage CLI - Outil de traitement d'images en ligne de commande",
    description: "Traitez des images depuis le terminal. Compressez, redimensionnez, convertissez avec le CLI NanoImage. Installation via npm.",
  },
  es: {
    title: "NanoImage CLI - Herramienta de procesamiento de imágenes por línea de comandos",
    description: "Procesa imágenes desde el terminal. Comprime, redimensiona, convierte con NanoImage CLI. Instala via npm.",
  },
  pt: {
    title: "NanoImage CLI - Ferramenta de processamento de imagens por linha de comando",
    description: "Processe imagens pelo terminal. Comprima, redimensione, converta com o NanoImage CLI. Instale via npm.",
  },
  ru: {
    title: "NanoImage CLI - Инструмент обработки изображений командной строки",
    description: "Обрабатывайте изображения из терминала. Сжатие, изменение размера, конвертация с NanoImage CLI. Установка через npm.",
  },
}

export const DOCS_CLI_META: Record<string, PageMeta> = {
  en: {
    title: "NanoImage CLI Documentation - Command Reference",
    description: "Full documentation for the NanoImage CLI. Learn all commands: compress, resize, convert, webp, remove-exif and more.",
  },
  'zh-CN': {
    title: "NanoImage CLI 文档 - 命令参考",
    description: "NanoImage CLI 完整文档。学习所有命令：compress、resize、convert、webp、remove-exif 等。",
  },
  'zh-TW': {
    title: "NanoImage CLI 文件 - 命令參考",
    description: "NanoImage CLI 完整文件。學習所有命令：compress、resize、convert、webp、remove-exif 等。",
  },
  ja: {
    title: "NanoImage CLI ドキュメント - コマンドリファレンス",
    description: "NanoImage CLIの完全なドキュメント。compress、resize、convert、webp、remove-exifなど全コマンドを学びましょう。",
  },
  ko: {
    title: "NanoImage CLI 문서 - 명령어 참조",
    description: "NanoImage CLI 전체 문서. compress, resize, convert, webp, remove-exif 등 모든 명령어를 배우세요.",
  },
  fr: {
    title: "Documentation NanoImage CLI - Référence des commandes",
    description: "Documentation complète du CLI NanoImage. Apprenez toutes les commandes : compress, resize, convert, webp, remove-exif et plus.",
  },
  es: {
    title: "Documentación NanoImage CLI - Referencia de comandos",
    description: "Documentación completa del CLI NanoImage. Aprende todos los comandos: compress, resize, convert, webp, remove-exif y más.",
  },
  pt: {
    title: "Documentação NanoImage CLI - Referência de comandos",
    description: "Documentação completa do NanoImage CLI. Aprenda todos os comandos: compress, resize, convert, webp, remove-exif e mais.",
  },
  ru: {
    title: "Документация NanoImage CLI - Справочник команд",
    description: "Полная документация NanoImage CLI. Изучите все команды: compress, resize, convert, webp, remove-exif и другие.",
  },
}

export const PRIVACY_META: Record<string, PageMeta> = {
  en: { title: "Privacy Policy - NanoImage", description: "NanoImage privacy policy. Your images are processed locally and never uploaded to our servers." },
  'zh-CN': { title: "隐私政策 - NanoImage", description: "NanoImage 隐私政策。您的图片在本地处理，从不上传至我们的服务器。" },
  'zh-TW': { title: "隱私政策 - NanoImage", description: "NanoImage 隱私政策。您的圖片在本地處理，從不上傳至我們的伺服器。" },
  ja: { title: "プライバシーポリシー - NanoImage", description: "NanoImageのプライバシーポリシー。画像はローカルで処理され、サーバーにアップロードされることはありません。" },
  ko: { title: "개인정보 처리방침 - NanoImage", description: "NanoImage 개인정보 처리방침. 이미지는 로컬에서 처리되며 서버에 업로드되지 않습니다." },
  fr: { title: "Politique de confidentialité - NanoImage", description: "Politique de confidentialité NanoImage. Vos images sont traitées localement et ne sont jamais téléchargées vers nos serveurs." },
  es: { title: "Política de privacidad - NanoImage", description: "Política de privacidad de NanoImage. Tus imágenes se procesan localmente y nunca se suben a nuestros servidores." },
  pt: { title: "Política de privacidade - NanoImage", description: "Política de privacidade do NanoImage. Suas imagens são processadas localmente e nunca enviadas para nossos servidores." },
  ru: { title: "Политика конфиденциальности - NanoImage", description: "Политика конфиденциальности NanoImage. Ваши изображения обрабатываются локально и никогда не загружаются на наши серверы." },
}

export const TERMS_META: Record<string, PageMeta> = {
  en: { title: "Terms of Use - NanoImage", description: "Terms of use for NanoImage image processing tools." },
  'zh-CN': { title: "使用条款 - NanoImage", description: "NanoImage 图片处理工具使用条款。" },
  'zh-TW': { title: "使用條款 - NanoImage", description: "NanoImage 圖片處理工具使用條款。" },
  ja: { title: "利用規約 - NanoImage", description: "NanoImage画像処理ツールの利用規約。" },
  ko: { title: "이용 약관 - NanoImage", description: "NanoImage 이미지 처리 도구 이용 약관." },
  fr: { title: "Conditions d'utilisation - NanoImage", description: "Conditions d'utilisation des outils de traitement d'images NanoImage." },
  es: { title: "Términos de uso - NanoImage", description: "Términos de uso de las herramientas de procesamiento de imágenes NanoImage." },
  pt: { title: "Termos de uso - NanoImage", description: "Termos de uso das ferramentas de processamento de imagens NanoImage." },
  ru: { title: "Условия использования - NanoImage", description: "Условия использования инструментов обработки изображений NanoImage." },
}

/**
 * Get page-level meta for a given URL lang code.
 * Falls back to English if the lang is not mapped.
 */
export function getPageMeta(
  table: Record<string, PageMeta>,
  urlLang: string,
): PageMeta {
  const langCode = URL_TO_LANG[urlLang] ?? 'en'
  return table[langCode] ?? table['en']
}
