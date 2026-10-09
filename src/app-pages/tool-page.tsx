'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, ChangeEvent, DragEvent, FormEvent, PointerEvent as ReactPointerEvent } from 'react'
import dynamic from 'next/dynamic'
import { tools, type Tool } from '@/src/data'
import { useI18n, useLangPath, type LangCode } from '@/src/i18n'
import { loadExifr, loadJSZip, loadPdfLib } from '@/src/lib/heavy-deps'
import { upscaleToCanvasSync } from '@/src/ai/lib/imageUpscaler'
import { Breadcrumbs } from '@/src/shared/breadcrumbs'
import { HomeIcon, toolIconMap } from '@/src/shared/tool-icons'
import { isStaticToolSlug } from '@/src/app-pages/static-tools/content'
import { EN_TOOL_PAGE_HERO_2026_10 } from '@/src/i18n/en-tool-content-2026-10'

const ToolSeoContent = dynamic(() => import('@/src/components/tool-seo').then((m) => ({ default: m.ToolSeoContent })), { ssr: true })
const ToolFaqSection = dynamic(() => import('@/src/components/tool-seo').then((m) => ({ default: m.ToolFaqSection })), { ssr: true })
const VideoToGifPage = dynamic(() => import('@/src/app-pages/video-tools').then((m) => ({ default: m.VideoToGifPage })))
const VideoToMp3Page = dynamic(() => import('@/src/app-pages/video-tools').then((m) => ({ default: m.VideoToMp3Page })))
// AI tools (merged from ai.nanoimage.net) — lazy-loaded so the on-device model
// runtime (transformers.js / MediaPipe) never ships with non-AI pages.
const BackgroundRemoverPage = dynamic(() => import('@/src/app-pages/ai-tools').then((m) => ({ default: m.BackgroundRemoverPage })))
const ObjectRemoverPage = dynamic(() => import('@/src/app-pages/ai-tools').then((m) => ({ default: m.ObjectRemoverPage })))
const PhotoRestorePage = dynamic(() => import('@/src/app-pages/ai-tools').then((m) => ({ default: m.PhotoRestorePage })))
const SmartCropPage = dynamic(() => import('@/src/app-pages/ai-tools').then((m) => ({ default: m.SmartCropPage })))

// Static tools synced from production (vanilla scripts under /public/assets) — lazy-loaded React shells.
const GifCompressorTool = dynamic(() => import('@/src/app-pages/static-tools/GifCompressorTool').then((m) => ({ default: m.GifCompressorTool })))
const WebpConvertTool = dynamic(() => import('@/src/app-pages/static-tools/WebpConvertTool').then((m) => ({ default: m.WebpConvertTool })))
const BmpConvertTool = dynamic(() => import('@/src/app-pages/static-tools/BmpConvertTool').then((m) => ({ default: m.BmpConvertTool })))

type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp'
type BackgroundMode = 'color' | 'image' | 'gradient' | 'transparent'

type ToolSettingsState = {
  format: OutputFormat
  quality: number
  width: number
  height: number
  resizeMode: 'pixels' | 'percentage'
  percentage: number
  keepAspect: boolean
  cropX: number
  cropY: number
  cropWidth: number
  cropHeight: number
  angle: number
  flipX: boolean
  flipY: boolean
  text: string
  textSize: number
  textColor: string
  textXPercent: number
  textYPercent: number
  textBoxWidthPercent: number
  textBoxHeightPercent: number
  textBold: boolean
  textItalic: boolean
  textUnderline: boolean
  textShadow: boolean
  textOutline: boolean
  textAlign: 'left' | 'center' | 'right'
  textShadowColor: string
  textOutlineColor: string
  textShadowBlur: number
  textShadowOffsetX: number
  textShadowOffsetY: number
  textRenderLines?: string[]
  textLayers?: TextLayer[]
  memeTopText: string
  memeBottomText: string
  memeFont: 'Impact' | 'Anton' | 'Arial Black' | 'Comic Sans MS'
  memeOutlineWidth: number
  blurAreas?: CropArea[]
  pixelateAreas?: CropArea[]
  colorAreas?: ColorArea[]
  backgroundAreas?: BackgroundArea[]
  watermarkMode: 'text' | 'image'
  watermarkImageDataUrl: string
  watermarkImageName: string
  watermarkOpacity: number
  blur: number
  pixelSize: number
  background: string
  colorTolerance: number
  backgroundMode: BackgroundMode
  backgroundImageDataUrl: string
  backgroundImageName: string
  brightness: number
  contrast: number
  saturation: number
  vibrance: number
  exposure: number
  highlights: number
  shadows: number
  sharpness: number
  clarity: number
  warmth: number
  tint: number
  upscaleScale: number
  resampling: 'smooth' | 'sharp'
}

type ProcessedFile = {
  name: string
  url: string
  blob: Blob
  size: number
}

type PendingUpload = {
  id: number
  files: File[]
}

type PdfOptions = {
  pageSize: 'a4' | 'letter'
  orientation: 'portrait' | 'landscape'
  margin: number
  imageFit: 'fit' | 'fill' | 'actual'
  spacing: number
  caption: boolean
  sameSize: boolean
  compress: boolean
}

type PhotoGridOptions = {
  columns: number
  rows: number
  aspectRatio: '1:1' | '4:5' | '16:9' | '9:16'
  spacing: number
  border: number
  radius: number
  background: string
}

type PhotoGridOffsets = Record<number, { x: number; y: number }>

type GridMakerType = 'square' | 'rectangular' | 'triangular' | 'isometric'

type GridMakerOptions = {
  gridType: GridMakerType
  columns: number
  rows: number
  lineWidth: number
  color: string
  opacity: number
  showLabels: boolean
  background: string
}

type GifOptions = {
  width: number
  height: number
  fit: 'contain' | 'cover' | 'stretch'
  frameDuration: number
  loop: 'forever' | 'once' | 'three'
  colors: number
  optimize: boolean
}

type CollageItem = {
  id: number
  fileIndex: number
  x: number
  y: number
  width: number
  height: number
  rotate: number
}

type CollageOptions = {
  width: number
  height: number
  background: string
  spacing: number
  radius: number
  template: 'classic' | 'polaroid' | 'scrapbook' | 'film' | 'paper' | 'square' | 'creative' | 'minimal' | 'mood'
  text: string
  sticker: string
}

type CropArea = {
  id: number
  x: number
  y: number
  width: number
  height: number
}

type ColorArea = CropArea & {
  color: string
  tolerance: number
}

type BackgroundArea = CropArea & {
  background: string
  backgroundMode: BackgroundMode
  backgroundImageDataUrl: string
  tolerance: number
}

type TextLayer = {
  id: number
  text: string
  textSize?: number
  textColor?: string
  textXPercent?: number
  textYPercent?: number
  textBoxWidthPercent?: number
  textBoxHeightPercent?: number
  textBold?: boolean
  textItalic?: boolean
  textUnderline?: boolean
  textShadow?: boolean
  textOutline?: boolean
  textAlign?: 'left' | 'center' | 'right'
  textShadowColor?: string
  textOutlineColor?: string
  textShadowBlur?: number
  textShadowOffsetX?: number
  textShadowOffsetY?: number
}

type PassportPhotoPreset = {
  slug: string
  name: string
  group: 'Popular' | 'US/Canada' | 'Europe' | 'Asia' | 'Other'
  flag: string
  width: number
  height: number
  physicalSize: string
  dpi: number
  background: string
  headSize: string
  verified: string
}

type PassportPhotoFileLimit = 'none' | '50' | '100' | 'custom'
type PassportPhotoPanel = 'crop' | 'background' | 'filters' | 'rotate'

const formatLabels: Record<OutputFormat, string> = {
  'image/png': 'PNG',
  'image/jpeg': 'JPG',
  'image/webp': 'WebP',
}

const mvpSlugs = new Set(tools.filter((tool) => tool.mvp).map((tool) => tool.slug))

type GridMakerUiCopy = {
  gridTypes: Record<GridMakerType, string>
  heroSupport: string
  trust: string[]
  uploadTitle: string
  uploadHint: string
  uploadImage: string
  replaceImage: string
  createBlank: string
  usageNote: string
  gridTypeTitle: string
  presetsTitle: string
  previewLabel: string
  fit: string
  reset: string
  settingsTitle: string
  columns: string
  rows: string
  lineWidth: string
  opacity: string
  lineColor: string
  blankBackground: string
  showLabels: string
  gridPresetsTitle: string
  blankDimensions: string
  localNote: string
  downloadFile: string
  print: string
  errors: { upload: string; popup: string; print: string; preview: string; image: string; pdf: string }
  status: { creating: string; imageReady: string; creatingPdf: string; pdfReady: string }
}

const GRID_MAKER_UI: Record<LangCode, GridMakerUiCopy> = {
  en: {
    gridTypes: { square: 'Square', rectangular: 'Rectangular', triangular: 'Triangular', isometric: 'Isometric' },
    heroSupport: 'Choose square, rectangular, triangular, or isometric grids. Adjust rows, columns, line width, color, opacity, and labels, then export your grid as PNG, JPG, or PDF. No signup, no upload.',
    trust: ['Free online grid maker', 'No signup', 'No image upload', 'PNG, JPG, PDF export', 'Printable drawing grids', 'Works in your browser'],
    uploadTitle: 'Upload a reference image',
    uploadHint: 'Or skip upload to export a blank printable grid.',
    uploadImage: 'Upload Image',
    replaceImage: 'Replace Image',
    createBlank: 'Create Blank Grid',
    usageNote: 'Use this for drawing, tracing, murals, classroom worksheets, and proportional sketching.',
    gridTypeTitle: 'Grid Type',
    presetsTitle: 'Presets',
    previewLabel: 'Drawing grid preview',
    fit: 'Fit',
    reset: 'Reset',
    settingsTitle: 'Grid Settings',
    columns: 'Columns',
    rows: 'Rows',
    lineWidth: 'Line Width',
    opacity: 'Opacity',
    lineColor: 'Line Color',
    blankBackground: 'Blank Grid Background',
    showLabels: 'Show A-B-C / 1-2-3 labels',
    gridPresetsTitle: 'Grid Presets',
    blankDimensions: 'Blank 1600 × 1200',
    localNote: 'All drawing grids are rendered locally. Your reference image never leaves this browser.',
    downloadFile: 'Download File',
    print: 'Print',
    errors: { upload: 'Please upload a JPG, PNG, GIF, or WebP image.', popup: 'Please allow popups to print the grid.', print: 'Could not open the print dialog.', preview: 'Could not render the grid preview.', image: 'Something went wrong while creating your grid.', pdf: 'Something went wrong while creating your PDF.' },
    status: { creating: 'Creating your {format} grid...', imageReady: 'Done. Your drawing grid is ready to download.', creatingPdf: 'Creating your printable PDF...', pdfReady: 'Done. Your PDF grid is ready to download.' },
  },
  'zh-CN': {
    gridTypes: { square: '方形', rectangular: '矩形', triangular: '三角形', isometric: '等距' },
    heroSupport: '选择方形、矩形、三角形或等距网格，调整行列、线宽、颜色、透明度和标签，然后导出 PNG、JPG 或 PDF。无需注册，不上传图片。',
    trust: ['免费在线网格工具', '无需注册', '不上传图片', 'PNG、JPG、PDF 导出', '可打印绘画网格', '在浏览器中运行'],
    uploadTitle: '上传参考图片',
    uploadHint: '也可以跳过上传，直接导出空白可打印网格。',
    uploadImage: '上传图片',
    replaceImage: '替换图片',
    createBlank: '创建空白网格',
    usageNote: '适用于绘画、临摹、壁画、课堂练习纸和比例素描。',
    gridTypeTitle: '网格类型',
    presetsTitle: '预设',
    previewLabel: '绘画网格预览',
    fit: '适合',
    reset: '重置',
    settingsTitle: '网格设置',
    columns: '列数',
    rows: '行数',
    lineWidth: '线宽',
    opacity: '透明度',
    lineColor: '线条颜色',
    blankBackground: '空白网格背景',
    showLabels: '显示 A-B-C / 1-2-3 标签',
    gridPresetsTitle: '网格预设',
    blankDimensions: '空白 1600 × 1200',
    localNote: '所有绘画网格都在本地渲染。你的参考图片不会离开此浏览器。',
    downloadFile: '下载文件',
    print: '打印',
    errors: { upload: '请上传 JPG、PNG、GIF 或 WebP 图片。', popup: '请允许弹窗以打印网格。', print: '无法打开打印窗口。', preview: '无法渲染网格预览。', image: '创建网格时出错。', pdf: '创建 PDF 时出错。' },
    status: { creating: '正在创建 {format} 网格...', imageReady: '完成，绘画网格已可下载。', creatingPdf: '正在创建可打印 PDF...', pdfReady: '完成，PDF 网格已可下载。' },
  },
  'zh-TW': {
    gridTypes: { square: '方形', rectangular: '矩形', triangular: '三角形', isometric: '等距' },
    heroSupport: '選擇方形、矩形、三角形或等距格線，調整行列、線寬、顏色、透明度和標籤，然後匯出 PNG、JPG 或 PDF。無需註冊，不上傳圖片。',
    trust: ['免費線上格線工具', '無需註冊', '不上傳圖片', 'PNG、JPG、PDF 匯出', '可列印繪畫格線', '在瀏覽器中執行'],
    uploadTitle: '上傳參考圖片',
    uploadHint: '也可以跳過上傳，直接匯出空白可列印格線。',
    uploadImage: '上傳圖片',
    replaceImage: '替換圖片',
    createBlank: '建立空白格線',
    usageNote: '適用於繪畫、臨摹、壁畫、課堂練習紙和比例素描。',
    gridTypeTitle: '格線類型',
    presetsTitle: '預設',
    previewLabel: '繪畫格線預覽',
    fit: '適合',
    reset: '重設',
    settingsTitle: '格線設定',
    columns: '欄數',
    rows: '列數',
    lineWidth: '線寬',
    opacity: '透明度',
    lineColor: '線條顏色',
    blankBackground: '空白格線背景',
    showLabels: '顯示 A-B-C / 1-2-3 標籤',
    gridPresetsTitle: '格線預設',
    blankDimensions: '空白 1600 × 1200',
    localNote: '所有繪畫格線都在本機渲染。你的參考圖片不會離開此瀏覽器。',
    downloadFile: '下載檔案',
    print: '列印',
    errors: { upload: '請上傳 JPG、PNG、GIF 或 WebP 圖片。', popup: '請允許彈出視窗以列印格線。', print: '無法開啟列印視窗。', preview: '無法渲染格線預覽。', image: '建立格線時發生錯誤。', pdf: '建立 PDF 時發生錯誤。' },
    status: { creating: '正在建立 {format} 格線...', imageReady: '完成，繪畫格線已可下載。', creatingPdf: '正在建立可列印 PDF...', pdfReady: '完成，PDF 格線已可下載。' },
  },
  ja: {
    gridTypes: { square: '正方形', rectangular: '長方形', triangular: '三角形', isometric: 'アイソメトリック' },
    heroSupport: '正方形、長方形、三角形、アイソメトリックのグリッドを選び、行・列・線幅・色・透明度・ラベルを調整して PNG、JPG、PDF に書き出せます。登録不要、アップロード不要です。',
    trust: ['無料オンライングリッドメーカー', '登録不要', '画像アップロードなし', 'PNG、JPG、PDF 書き出し', '印刷用描画グリッド', 'ブラウザで動作'],
    uploadTitle: '参考画像をアップロード',
    uploadHint: 'アップロードせずに空白の印刷用グリッドも書き出せます。',
    uploadImage: '画像をアップロード',
    replaceImage: '画像を置き換え',
    createBlank: '空白グリッドを作成',
    usageNote: '描画、模写、壁画、授業ワークシート、比例スケッチに使えます。',
    gridTypeTitle: 'グリッド種類',
    presetsTitle: 'プリセット',
    previewLabel: '描画グリッドのプレビュー',
    fit: '合わせる',
    reset: 'リセット',
    settingsTitle: 'グリッド設定',
    columns: '列',
    rows: '行',
    lineWidth: '線幅',
    opacity: '不透明度',
    lineColor: '線の色',
    blankBackground: '空白グリッド背景',
    showLabels: 'A-B-C / 1-2-3 ラベルを表示',
    gridPresetsTitle: 'グリッドプリセット',
    blankDimensions: '空白 1600 × 1200',
    localNote: '描画グリッドはすべてローカルで描画されます。参考画像はこのブラウザから離れません。',
    downloadFile: 'ファイルをダウンロード',
    print: '印刷',
    errors: { upload: 'JPG、PNG、GIF、WebP 画像をアップロードしてください。', popup: 'グリッドを印刷するにはポップアップを許可してください。', print: '印刷ダイアログを開けませんでした。', preview: 'グリッドプレビューを描画できませんでした。', image: 'グリッド作成中に問題が発生しました。', pdf: 'PDF 作成中に問題が発生しました。' },
    status: { creating: '{format} グリッドを作成中...', imageReady: '完了しました。描画グリッドをダウンロードできます。', creatingPdf: '印刷用 PDF を作成中...', pdfReady: '完了しました。PDF グリッドをダウンロードできます。' },
  },
  ko: {
    gridTypes: { square: '정사각형', rectangular: '직사각형', triangular: '삼각형', isometric: '아이소메트릭' },
    heroSupport: '정사각형, 직사각형, 삼각형, 아이소메트릭 그리드를 선택하고 행, 열, 선 두께, 색상, 투명도, 라벨을 조정한 뒤 PNG, JPG 또는 PDF로 내보내세요. 가입도 업로드도 필요 없습니다.',
    trust: ['무료 온라인 그리드 메이커', '가입 없음', '이미지 업로드 없음', 'PNG, JPG, PDF 내보내기', '인쇄 가능한 드로잉 그리드', '브라우저에서 실행'],
    uploadTitle: '참고 이미지 업로드',
    uploadHint: '업로드를 건너뛰고 빈 인쇄용 그리드를 내보낼 수도 있습니다.',
    uploadImage: '이미지 업로드',
    replaceImage: '이미지 교체',
    createBlank: '빈 그리드 만들기',
    usageNote: '드로잉, 모사, 벽화, 수업 워크시트, 비례 스케치에 사용하세요.',
    gridTypeTitle: '그리드 유형',
    presetsTitle: '프리셋',
    previewLabel: '드로잉 그리드 미리보기',
    fit: '맞춤',
    reset: '초기화',
    settingsTitle: '그리드 설정',
    columns: '열',
    rows: '행',
    lineWidth: '선 두께',
    opacity: '투명도',
    lineColor: '선 색상',
    blankBackground: '빈 그리드 배경',
    showLabels: 'A-B-C / 1-2-3 라벨 표시',
    gridPresetsTitle: '그리드 프리셋',
    blankDimensions: '빈 1600 × 1200',
    localNote: '모든 드로잉 그리드는 로컬에서 렌더링됩니다. 참고 이미지는 이 브라우저를 떠나지 않습니다.',
    downloadFile: '파일 다운로드',
    print: '인쇄',
    errors: { upload: 'JPG, PNG, GIF 또는 WebP 이미지를 업로드하세요.', popup: '그리드를 인쇄하려면 팝업을 허용하세요.', print: '인쇄 창을 열 수 없습니다.', preview: '그리드 미리보기를 렌더링할 수 없습니다.', image: '그리드를 만드는 중 문제가 발생했습니다.', pdf: 'PDF를 만드는 중 문제가 발생했습니다.' },
    status: { creating: '{format} 그리드를 만드는 중...', imageReady: '완료되었습니다. 드로잉 그리드를 다운로드할 수 있습니다.', creatingPdf: '인쇄용 PDF를 만드는 중...', pdfReady: '완료되었습니다. PDF 그리드를 다운로드할 수 있습니다.' },
  },
  fr: {
    gridTypes: { square: 'Carrée', rectangular: 'Rectangulaire', triangular: 'Triangulaire', isometric: 'Isométrique' },
    heroSupport: 'Choisissez une grille carrée, rectangulaire, triangulaire ou isométrique. Réglez lignes, colonnes, épaisseur, couleur, opacité et repères, puis exportez en PNG, JPG ou PDF. Sans compte, sans upload.',
    trust: ['Créateur de grille gratuit', 'Sans inscription', 'Sans upload d’image', 'Export PNG, JPG, PDF', 'Grilles de dessin imprimables', 'Fonctionne dans le navigateur'],
    uploadTitle: 'Importer une image de référence',
    uploadHint: 'Ou ignorez l’import pour exporter une grille vierge imprimable.',
    uploadImage: 'Importer une image',
    replaceImage: 'Remplacer l’image',
    createBlank: 'Créer une grille vierge',
    usageNote: 'À utiliser pour dessin, copie, fresques, fiches de classe et croquis proportionnel.',
    gridTypeTitle: 'Type de grille',
    presetsTitle: 'Préréglages',
    previewLabel: 'Aperçu de la grille de dessin',
    fit: 'Adapter',
    reset: 'Réinitialiser',
    settingsTitle: 'Réglages de la grille',
    columns: 'Colonnes',
    rows: 'Lignes',
    lineWidth: 'Épaisseur',
    opacity: 'Opacité',
    lineColor: 'Couleur des lignes',
    blankBackground: 'Fond de la grille vierge',
    showLabels: 'Afficher les repères A-B-C / 1-2-3',
    gridPresetsTitle: 'Préréglages de grille',
    blankDimensions: 'Vierge 1600 × 1200',
    localNote: 'Toutes les grilles sont rendues localement. Votre image de référence ne quitte jamais ce navigateur.',
    downloadFile: 'Télécharger le fichier',
    print: 'Imprimer',
    errors: { upload: 'Importez une image JPG, PNG, GIF ou WebP.', popup: 'Autorisez les fenêtres contextuelles pour imprimer la grille.', print: 'Impossible d’ouvrir la fenêtre d’impression.', preview: 'Impossible de générer l’aperçu de la grille.', image: 'Une erreur est survenue lors de la création de la grille.', pdf: 'Une erreur est survenue lors de la création du PDF.' },
    status: { creating: 'Création de la grille {format}...', imageReady: 'Terminé. Votre grille de dessin est prête à télécharger.', creatingPdf: 'Création du PDF imprimable...', pdfReady: 'Terminé. Votre grille PDF est prête à télécharger.' },
  },
  es: {
    gridTypes: { square: 'Cuadrada', rectangular: 'Rectangular', triangular: 'Triangular', isometric: 'Isométrica' },
    heroSupport: 'Elige cuadrículas cuadradas, rectangulares, triangulares o isométricas. Ajusta filas, columnas, grosor, color, opacidad y etiquetas, y exporta en PNG, JPG o PDF. Sin registro ni subida.',
    trust: ['Creador de cuadrícula gratis', 'Sin registro', 'Sin subir imágenes', 'Exportación PNG, JPG, PDF', 'Cuadrículas imprimibles', 'Funciona en el navegador'],
    uploadTitle: 'Sube una imagen de referencia',
    uploadHint: 'O salta la subida para exportar una cuadrícula en blanco imprimible.',
    uploadImage: 'Subir imagen',
    replaceImage: 'Reemplazar imagen',
    createBlank: 'Crear cuadrícula en blanco',
    usageNote: 'Úsalo para dibujo, copia, murales, hojas de clase y bocetos proporcionales.',
    gridTypeTitle: 'Tipo de cuadrícula',
    presetsTitle: 'Presets',
    previewLabel: 'Vista previa de cuadrícula de dibujo',
    fit: 'Ajustar',
    reset: 'Restablecer',
    settingsTitle: 'Ajustes de cuadrícula',
    columns: 'Columnas',
    rows: 'Filas',
    lineWidth: 'Grosor',
    opacity: 'Opacidad',
    lineColor: 'Color de línea',
    blankBackground: 'Fondo de cuadrícula en blanco',
    showLabels: 'Mostrar etiquetas A-B-C / 1-2-3',
    gridPresetsTitle: 'Presets de cuadrícula',
    blankDimensions: 'En blanco 1600 × 1200',
    localNote: 'Todas las cuadrículas se renderizan localmente. Tu imagen de referencia nunca sale de este navegador.',
    downloadFile: 'Descargar archivo',
    print: 'Imprimir',
    errors: { upload: 'Sube una imagen JPG, PNG, GIF o WebP.', popup: 'Permite ventanas emergentes para imprimir la cuadrícula.', print: 'No se pudo abrir el diálogo de impresión.', preview: 'No se pudo renderizar la vista previa.', image: 'Algo salió mal al crear la cuadrícula.', pdf: 'Algo salió mal al crear el PDF.' },
    status: { creating: 'Creando tu cuadrícula {format}...', imageReady: 'Listo. Tu cuadrícula de dibujo está lista para descargar.', creatingPdf: 'Creando tu PDF imprimible...', pdfReady: 'Listo. Tu cuadrícula PDF está lista para descargar.' },
  },
  pt: {
    gridTypes: { square: 'Quadrada', rectangular: 'Retangular', triangular: 'Triangular', isometric: 'Isométrica' },
    heroSupport: 'Escolha grades quadradas, retangulares, triangulares ou isométricas. Ajuste linhas, colunas, espessura, cor, opacidade e etiquetas, e exporte em PNG, JPG ou PDF. Sem cadastro e sem upload.',
    trust: ['Criador de grade grátis', 'Sem cadastro', 'Sem upload de imagem', 'Exportação PNG, JPG, PDF', 'Grades imprimíveis', 'Funciona no navegador'],
    uploadTitle: 'Envie uma imagem de referência',
    uploadHint: 'Ou pule o envio para exportar uma grade em branco imprimível.',
    uploadImage: 'Enviar imagem',
    replaceImage: 'Trocar imagem',
    createBlank: 'Criar grade em branco',
    usageNote: 'Use para desenho, cópia, murais, folhas de aula e esboços proporcionais.',
    gridTypeTitle: 'Tipo de grade',
    presetsTitle: 'Modelos',
    previewLabel: 'Prévia da grade de desenho',
    fit: 'Ajustar',
    reset: 'Redefinir',
    settingsTitle: 'Configurações da grade',
    columns: 'Colunas',
    rows: 'Linhas',
    lineWidth: 'Espessura',
    opacity: 'Opacidade',
    lineColor: 'Cor da linha',
    blankBackground: 'Fundo da grade em branco',
    showLabels: 'Mostrar etiquetas A-B-C / 1-2-3',
    gridPresetsTitle: 'Modelos de grade',
    blankDimensions: 'Em branco 1600 × 1200',
    localNote: 'Todas as grades são renderizadas localmente. Sua imagem de referência nunca sai deste navegador.',
    downloadFile: 'Baixar arquivo',
    print: 'Imprimir',
    errors: { upload: 'Envie uma imagem JPG, PNG, GIF ou WebP.', popup: 'Permita pop-ups para imprimir a grade.', print: 'Não foi possível abrir a janela de impressão.', preview: 'Não foi possível renderizar a prévia da grade.', image: 'Algo deu errado ao criar a grade.', pdf: 'Algo deu errado ao criar o PDF.' },
    status: { creating: 'Criando sua grade {format}...', imageReady: 'Pronto. Sua grade de desenho está pronta para baixar.', creatingPdf: 'Criando seu PDF imprimível...', pdfReady: 'Pronto. Sua grade PDF está pronta para baixar.' },
  },
  ru: {
    gridTypes: { square: 'Квадратная', rectangular: 'Прямоугольная', triangular: 'Треугольная', isometric: 'Изометрическая' },
    heroSupport: 'Выберите квадратную, прямоугольную, треугольную или изометрическую сетку. Настройте строки, столбцы, толщину, цвет, прозрачность и метки, затем экспортируйте PNG, JPG или PDF. Без регистрации и загрузки.',
    trust: ['Бесплатный генератор сетки', 'Без регистрации', 'Без загрузки изображения', 'Экспорт PNG, JPG, PDF', 'Сетки для печати', 'Работает в браузере'],
    uploadTitle: 'Загрузите референс',
    uploadHint: 'Или пропустите загрузку, чтобы экспортировать пустую сетку для печати.',
    uploadImage: 'Загрузить изображение',
    replaceImage: 'Заменить изображение',
    createBlank: 'Создать пустую сетку',
    usageNote: 'Используйте для рисунка, копирования, муралов, учебных листов и пропорциональных скетчей.',
    gridTypeTitle: 'Тип сетки',
    presetsTitle: 'Пресеты',
    previewLabel: 'Предпросмотр сетки для рисования',
    fit: 'Вписать',
    reset: 'Сбросить',
    settingsTitle: 'Настройки сетки',
    columns: 'Столбцы',
    rows: 'Строки',
    lineWidth: 'Толщина',
    opacity: 'Прозрачность',
    lineColor: 'Цвет линий',
    blankBackground: 'Фон пустой сетки',
    showLabels: 'Показать метки A-B-C / 1-2-3',
    gridPresetsTitle: 'Пресеты сетки',
    blankDimensions: 'Пустая 1600 × 1200',
    localNote: 'Все сетки рендерятся локально. Ваш референс не покидает этот браузер.',
    downloadFile: 'Скачать файл',
    print: 'Печать',
    errors: { upload: 'Загрузите изображение JPG, PNG, GIF или WebP.', popup: 'Разрешите всплывающие окна для печати сетки.', print: 'Не удалось открыть окно печати.', preview: 'Не удалось отрисовать предпросмотр сетки.', image: 'Что-то пошло не так при создании сетки.', pdf: 'Что-то пошло не так при создании PDF.' },
    status: { creating: 'Создаём сетку {format}...', imageReady: 'Готово. Сетку для рисования можно скачать.', creatingPdf: 'Создаём PDF для печати...', pdfReady: 'Готово. PDF-сетку можно скачать.' },
  },
}

const PASSPORT_PHOTO_PRESETS: PassportPhotoPreset[] = [
  { slug: 'us-passport', name: 'US Passport Photo', group: 'US/Canada', flag: '🇺🇸', width: 600, height: 600, physicalSize: '2 x 2 in', dpi: 300, background: 'White', headSize: '25 - 35 mm', verified: '2026-06' },
  { slug: 'china-visa', name: 'China Visa Photo', group: 'Asia', flag: '🇨🇳', width: 390, height: 567, physicalSize: '33 x 48 mm', dpi: 300, background: 'White', headSize: '28 - 33 mm', verified: '2026-06' },
  { slug: 'russia-passport', name: 'Russia Passport Photo', group: 'Europe', flag: '🇷🇺', width: 413, height: 531, physicalSize: '35 x 45 mm', dpi: 300, background: 'White', headSize: '32 - 36 mm', verified: '2026-06' },
  { slug: 'japan-passport', name: 'Japan Passport Photo', group: 'Asia', flag: '🇯🇵', width: 413, height: 531, physicalSize: '35 x 45 mm', dpi: 300, background: 'White', headSize: '32 - 36 mm', verified: '2026-06' },
  { slug: 'korea-passport', name: 'Korea Passport Photo', group: 'Asia', flag: '🇰🇷', width: 413, height: 531, physicalSize: '35 x 45 mm', dpi: 300, background: 'White', headSize: '32 - 36 mm', verified: '2026-06' },
  { slug: 'india-passport', name: 'India Passport Photo', group: 'Asia', flag: '🇮🇳', width: 413, height: 531, physicalSize: '35 x 45 mm', dpi: 300, background: 'White', headSize: '25 - 35 mm', verified: '2026-06' },
  { slug: 'uk-passport', name: 'UK Passport Photo', group: 'Europe', flag: '🇬🇧', width: 413, height: 531, physicalSize: '35 x 45 mm', dpi: 300, background: 'Plain light', headSize: '29 - 34 mm', verified: '2026-06' },
  { slug: 'schengen-visa', name: 'Schengen Visa Photo', group: 'Europe', flag: '🇪🇺', width: 413, height: 531, physicalSize: '35 x 45 mm', dpi: 300, background: 'Light grey', headSize: '32 - 36 mm', verified: '2026-06' },
  { slug: 'canada-passport', name: 'Canada Passport Photo', group: 'US/Canada', flag: '🇨🇦', width: 591, height: 827, physicalSize: '50 x 70 mm', dpi: 300, background: 'White or light', headSize: '31 - 36 mm', verified: '2026-06' },
  { slug: '35x45', name: 'Generic 35 x 45 mm', group: 'Other', flag: '▦', width: 413, height: 531, physicalSize: '35 x 45 mm', dpi: 300, background: 'White', headSize: '25 - 35 mm', verified: '2026-06' },
  { slug: '2x2-inch', name: '2 x 2 Inch Photo', group: 'Other', flag: '▣', width: 600, height: 600, physicalSize: '2 x 2 in', dpi: 300, background: 'White', headSize: '25 - 35 mm', verified: '2026-06' },
  { slug: '600x600', name: '600 x 600 Photo', group: 'Other', flag: '□', width: 600, height: 600, physicalSize: '600 x 600 px', dpi: 300, background: 'White', headSize: 'Center face', verified: '2026-06' },
]

const PASSPORT_BACKGROUND_OPTIONS = [
  { label: 'Keep original', color: 'transparent' },
  { label: 'White', color: '#ffffff' },
  { label: 'Off-white', color: '#fbfaf4' },
  { label: 'Light blue', color: '#dbeafe' },
  { label: 'Grey', color: '#e5e7eb' },
]

const VIDEO_TOOL_SLUGS = new Set(['video-to-gif', 'video-to-mp3'])

const AI_TOOL_SLUGS = new Set(['background-remover', 'object-remover', 'photo-restore', 'smart-crop'])
/** Visual label style for tool-UI headings that are not part of the page outline. */
const UI_LABEL_STYLE: CSSProperties = { margin: '0 0 .75rem', color: 'var(--ink)', fontSize: '1rem', fontWeight: 800 }
/** EN pages whose settings panel uses a plain "Settings" label instead of an H2. */
const PLAIN_SETTINGS_LABEL_SLUGS = new Set(['black-and-white-image', 'invert-image-colors'])

function getToolBreadcrumbLabel(
  toolsData: Record<string, { name: string; breadcrumbName?: string }> | undefined,
  slug: string,
  fallbackName: string,
): string {
  const entry = toolsData?.[slug]
  return entry?.breadcrumbName ?? entry?.name ?? fallbackName
}

export function ToolPage({
  tool,
  navigate,
  pendingUpload,
  onPendingUploadConsumed,
}: {
  tool: Tool
  navigate: (to: string) => void
  pendingUpload: PendingUpload | null
  onPendingUploadConsumed: () => void
}) {
  const { t } = useI18n()
  const toolsData = t.toolsData as Record<string, { name: string; breadcrumbName?: string }>
  const breadcrumbLabel = getToolBreadcrumbLabel(toolsData, tool.slug, tool.name)
  if (VIDEO_TOOL_SLUGS.has(tool.slug)) {
    return (
      <section className="tool-page video-tool-page">
        {tool.slug === 'video-to-gif' && <VideoToGifPage tool={tool} navigate={navigate} />}
        {tool.slug === 'video-to-mp3' && <VideoToMp3Page tool={tool} navigate={navigate} />}
        <ToolFaqSection slug={tool.slug} />
      </section>
    )
  }
  if (isStaticToolSlug(tool.slug)) {
    return (
      <section className="tool-page static-tool-page">
        {tool.slug === 'gif-compressor' && <GifCompressorTool tool={tool} navigate={navigate} breadcrumbLabel={breadcrumbLabel} />}
        {tool.slug === 'png-to-webp' && <WebpConvertTool tool={tool} mode="png" navigate={navigate} breadcrumbLabel={breadcrumbLabel} />}
        {tool.slug === 'jpg-to-webp' && <WebpConvertTool tool={tool} mode="jpg" navigate={navigate} breadcrumbLabel={breadcrumbLabel} />}
        {tool.slug === 'jpg-to-bmp' && <BmpConvertTool tool={tool} navigate={navigate} breadcrumbLabel={breadcrumbLabel} />}
      </section>
    )
  }
  if (AI_TOOL_SLUGS.has(tool.slug)) {
    return (
      <section className="tool-page ai-tool-page">
        {tool.slug === 'background-remover' && <BackgroundRemoverPage tool={tool} navigate={navigate} />}
        {tool.slug === 'object-remover' && <ObjectRemoverPage tool={tool} navigate={navigate} />}
        {tool.slug === 'photo-restore' && <PhotoRestorePage tool={tool} navigate={navigate} />}
        {tool.slug === 'smart-crop' && <SmartCropPage tool={tool} navigate={navigate} />}
        <ToolFaqSection slug={tool.slug} />
      </section>
    )
  }
  return (
    <section className={`tool-page ${mvpSlugs.has(tool.slug) ? 'compress-page' : ''}`}>
      {/* For target-size pages, the inner TargetSizeCompressor renders its own Breadcrumbs + title card (to match the special layout). Skip outer to avoid duplicates. */}
      {!['compress-image-to-100kb', 'compress-image-to-200kb', 'compress-image-to-500kb', 'compress-image-to-1mb'].includes(tool.slug) && (
        <Breadcrumbs current={breadcrumbLabel} categoryId={tool.category} navigate={navigate} />
      )}
      {mvpSlugs.has(tool.slug) ? (
        <ImageToolWorkspace
          tool={tool}
          breadcrumbLabel={breadcrumbLabel}
          pendingUpload={pendingUpload}
          onPendingUploadConsumed={onPendingUploadConsumed}
          navigate={navigate}
        />
      ) : (
        <ComingSoonTool tool={tool} />
      )}
      {tool.slug === 'compress-image' && (
        <section className="specific-size-hub">
          {/* eslint-disable @typescript-eslint/no-explicit-any */}
          <h2>{(t as any).compressImageHub?.title ?? 'Compress to a specific file size'}</h2>
          <p className="hub-lead">{(t as any).compressImageHub?.lead ?? 'Need to meet an upload limit? Use a dedicated target-size compressor to automatically reduce your image under a specific file size.'}</p>
          <div className="hub-cards">
            <a href="/compress-image-to-100kb" className="hub-card" onClick={(e) => { e.preventDefault(); navigate('/compress-image-to-100kb') }}>
              <strong>{(t as any).compressImageHub?.to100?.title ?? 'Compress Image to 100KB'}</strong>
              <span>{(t as any).compressImageHub?.to100?.desc ?? 'Best for avatars, online forms, and small upload limits.'}</span>
            </a>
            <a href="/compress-image-to-200kb" className="hub-card" onClick={(e) => { e.preventDefault(); navigate('/compress-image-to-200kb') }}>
              <strong>{(t as any).compressImageHub?.to200?.title ?? 'Compress Image to 200KB'}</strong>
              <span>{(t as any).compressImageHub?.to200?.desc ?? 'Best for document photos, passport photos, and official uploads.'}</span>
            </a>
            <a href="/compress-image-to-500kb" className="hub-card" onClick={(e) => { e.preventDefault(); navigate('/compress-image-to-500kb') }}>
              <strong>{(t as any).compressImageHub?.to500?.title ?? 'Compress Image to 500KB'}</strong>
              <span>{(t as any).compressImageHub?.to500?.desc ?? 'Best for email attachments, blog images, and product photos.'}</span>
            </a>
            <a href="/compress-image-to-1mb" className="hub-card" onClick={(e) => { e.preventDefault(); navigate('/compress-image-to-1mb') }}>
              <strong>{(t as any).compressImageHub?.to1m?.title ?? 'Compress Image to 1MB'}</strong>
              <span>{(t as any).compressImageHub?.to1m?.desc ?? 'Best for phone photos, social sharing, and larger upload limits.'}</span>
            </a>
          </div>
          {/* eslint-enable @typescript-eslint/no-explicit-any */}
        </section>
      )}
      <ToolSeoContent slug={tool.slug} />
      <ToolFaqSection slug={tool.slug} />
    </section>
  )
}

export function ImageToolWorkspace({
  tool,
  breadcrumbLabel,
  pendingUpload,
  onPendingUploadConsumed,
  navigate,
}: {
  tool: Tool
  breadcrumbLabel?: string
  pendingUpload?: PendingUpload | null
  onPendingUploadConsumed?: () => void
  navigate?: (to: string) => void
}) {
  const { t, lang } = useI18n()
  const currentLang = lang as LangCode
  const localName = t.toolsData[tool.slug]?.name ?? tool.name
  const localSubtitle = t.toolsData[tool.slug]?.description ?? tool.subtitle
  const enHero = currentLang === 'en' ? EN_TOOL_PAGE_HERO_2026_10[tool.slug] : undefined
  const [files, setFiles] = useState<File[]>([])
  const [previewUrl, setPreviewUrl] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [processed, setProcessed] = useState<ProcessedFile | null>(null)
  const [batch, setBatch] = useState<ProcessedFile[]>([])
  const [metadata, setMetadata] = useState<Record<string, unknown> | null>(null)
  const [compressPreset, setCompressPreset] = useState<'recommended' | 'smallest' | 'high' | 'custom'>('high')
  const [cropMode, setCropMode] = useState<'single' | 'multiple'>('single')
  const [cropAreas, setCropAreas] = useState<CropArea[]>([])
  const [activeCropId, setActiveCropId] = useState(1)
  const [nextCropId, setNextCropId] = useState(2)
  const [rotateZoom, setRotateZoom] = useState(100)
  const [textZoom, setTextZoom] = useState(100)
  const [textLayers, setTextLayers] = useState<TextLayer[]>([{ id: 1, text: 'Adventure Awaits' }])
  const [activeTextLayerId, setActiveTextLayerId] = useState(1)
  const [nextTextLayerId, setNextTextLayerId] = useState(2)
  const [textHistory, setTextHistory] = useState<ToolSettingsState[]>([])
  const [textFuture, setTextFuture] = useState<ToolSettingsState[]>([])
  const [textToolMode, setTextToolMode] = useState<'move' | 'text'>('move')
  const [textPreviewImgWidth, setTextPreviewImgWidth] = useState(0)
  const [pixelateMode, setPixelateMode] = useState<'brush' | 'eraser'>('brush')
  const [pixelateAreas, setPixelateAreas] = useState<CropArea[]>([])
  const [pixelateHistory, setPixelateHistory] = useState<string[]>(['Original'])
  const [blurMode, setBlurMode] = useState<'brush' | 'eraser'>('brush')
  const [blurAreas, setBlurAreas] = useState<CropArea[]>([])
  const [blurHistory, setBlurHistory] = useState<string[]>(['Original'])
  const [changeColorMode, setChangeColorMode] = useState<'brush' | 'eraser'>('brush')
  const [changeColorAreas, setChangeColorAreas] = useState<ColorArea[]>([])
  const [changeColorHistory, setChangeColorHistory] = useState<string[]>(['Original'])
  const [backgroundAreas, setBackgroundAreas] = useState<BackgroundArea[]>([])
  const [backgroundCompare, setBackgroundCompare] = useState(true)
  const [upscaleCompare, setUpscaleCompare] = useState(true)
  const [upscaleCustomMode, setUpscaleCustomMode] = useState(false)
  const [memePanel, setMemePanel] = useState<'text' | 'image'>('text')
  const [memeHistory, setMemeHistory] = useState<string[]>(['Meme created'])
  const [convertSort, setConvertSort] = useState<'custom' | 'name' | 'size'>('name')
  const [enhancePanel, setEnhancePanel] = useState<'adjust' | 'filters'>('adjust')
  const [pdfSort, setPdfSort] = useState<'custom' | 'name' | 'size'>('custom')
  const [pdfOptions, setPdfOptions] = useState<PdfOptions>({
    pageSize: 'a4',
    orientation: 'portrait',
    margin: 20,
    imageFit: 'fit',
    spacing: 10,
    caption: false,
    sameSize: true,
    compress: true,
  })
  const [photoGridOptions, setPhotoGridOptions] = useState<PhotoGridOptions>({
    columns: 2,
    rows: 2,
    aspectRatio: '1:1',
    spacing: 20,
    border: 4,
    radius: 12,
    background: '#ffffff',
  })
  const [photoGridOffsets, setPhotoGridOffsets] = useState<PhotoGridOffsets>({})
  const [activePhotoGridIndex, setActivePhotoGridIndex] = useState(0)
  const [photoGridZoom, setPhotoGridZoom] = useState(100)
  const gridMakerCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const [gridMakerPreviewScale, setGridMakerPreviewScale] = useState(100)
  const [gridMakerOptions, setGridMakerOptions] = useState<GridMakerOptions>({
    gridType: 'square',
    columns: 4,
    rows: 4,
    lineWidth: 2,
    color: '#111827',
    opacity: 0.6,
    showLabels: true,
    background: '#ffffff',
  })
  const [gifOptions, setGifOptions] = useState<GifOptions>({
    width: 1280,
    height: 720,
    fit: 'contain',
    frameDuration: 0.5,
    loop: 'forever',
    colors: 128,
    optimize: true,
  })
  const [gifPreviewIndex, setGifPreviewIndex] = useState(0)
  const [gifPlaying, setGifPlaying] = useState(false)
  const [gifSpeed, setGifSpeed] = useState(1)
  const [collageOptions, setCollageOptions] = useState<CollageOptions>({
    width: 1080,
    height: 1080,
    background: '#f7f1ea',
    spacing: 20,
    radius: 8,
    template: 'polaroid',
    text: '♡ Good vibes ♡',
    sticker: '🌿',
  })
  const [collageItems, setCollageItems] = useState<CollageItem[]>([])
  const [activeCollageItemId, setActiveCollageItemId] = useState<number | null>(null)
  const [collageToolMode, setCollageToolMode] = useState<'select' | 'move' | 'text' | 'sticker'>('select')
  const [collageZoom, setCollageZoom] = useState(100)
  const [removeExifMode, setRemoveExifMode] = useState<'all' | 'location'>('all')
  const [passportPresetSlug, setPassportPresetSlug] = useState('us-passport')
  const [passportPresetGroup, setPassportPresetGroup] = useState<PassportPhotoPreset['group']>('Popular')
  const [passportPanel, setPassportPanel] = useState<PassportPhotoPanel>('crop')
  const [passportBackground, setPassportBackground] = useState('#ffffff')
  const [passportFileLimit, setPassportFileLimit] = useState<PassportPhotoFileLimit>('50')
  const [passportCustomLimit, setPassportCustomLimit] = useState(50)
  const [passportOutputFormat, setPassportOutputFormat] = useState<OutputFormat>('image/jpeg')
  const [passportZoom, setPassportZoom] = useState(100)
  const [passportOffsetX, setPassportOffsetX] = useState(0)
  const [passportOffsetY, setPassportOffsetY] = useState(0)
  const [passportRotation, setPassportRotation] = useState(0)
  const [passportFlipX, setPassportFlipX] = useState(false)
  const [passportFlipY, setPassportFlipY] = useState(false)
  const [passportBrightness, setPassportBrightness] = useState(0)
  const [passportContrast, setPassportContrast] = useState(0)
  const [passportSaturation, setPassportSaturation] = useState(0)
  const [passportRenderedPreview, setPassportRenderedPreview] = useState('')
  const textPreviewImageRef = useRef<HTMLImageElement | null>(null)
  const textSelectionBoxRef = useRef<HTMLDivElement | null>(null)
  const textPreviewTextRef = useRef<HTMLElement | null>(null)
  const watermarkImageOverlayRef = useRef<HTMLImageElement | null>(null)
  const [settings, setSettings] = useState<ToolSettingsState>({
    format: tool.slug === 'convert-to-webp' ? 'image/webp' : 'image/jpeg',
    quality: 1,
    width: 0,
    height: 0,
    resizeMode: 'pixels',
    percentage: 100,
    keepAspect: true,
    cropX: 0,
    cropY: 0,
    cropWidth: 0,
    cropHeight: 0,
    angle: tool.slug === 'rotate-image' ? 90 : 0,
    flipX: tool.slug === 'flip-image',
    flipY: false,
    text: tool.slug === 'add-text' ? 'Adventure Awaits' : 'NanoImage',
    textSize: tool.slug === 'add-text' ? 120 : 54,
    textColor: '#ffffff',
    textXPercent: 50,
    textYPercent: 47,
    textBoxWidthPercent: 74,
    textBoxHeightPercent: 45,
    textBold: true,
    textItalic: false,
    textUnderline: false,
    textShadow: true,
    textOutline: false,
    textAlign: 'center',
    textShadowColor: '#000000',
    textOutlineColor: '#ffffff',
    textShadowBlur: 12,
    textShadowOffsetX: 4,
    textShadowOffsetY: 4,
    memeTopText: 'WHEN YOU FINISH ALL YOUR TASKS',
    memeBottomText: "AND IT'S ONLY 10AM",
    memeFont: 'Impact',
    memeOutlineWidth: 4,
    watermarkMode: 'text',
    watermarkImageDataUrl: '',
    watermarkImageName: '',
    watermarkOpacity: 0.35,
    blur: 10,
    pixelSize: 12,
    background: '#ffffff',
    colorTolerance: 78,
    backgroundMode: 'color',
    backgroundImageDataUrl: '',
    backgroundImageName: '',
    brightness: 12,
    contrast: 18,
    saturation: 20,
    vibrance: 15,
    exposure: 6,
    highlights: -10,
    shadows: 25,
    sharpness: 30,
    clarity: 15,
    warmth: 5,
    tint: 0,
    upscaleScale: 2,
    resampling: 'smooth',
  })

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  useEffect(() => () => {
    if (processed) URL.revokeObjectURL(processed.url)
  }, [processed])

  useEffect(() => () => {
    batch.forEach((item) => URL.revokeObjectURL(item.url))
  }, [batch])

  const filePreviewUrls = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files])

  useEffect(() => () => {
    filePreviewUrls.forEach((url) => URL.revokeObjectURL(url))
  }, [filePreviewUrls])

  useEffect(() => {
    if (tool.slug !== 'grid-maker') return undefined
    let cancelled = false
    const renderPreview = async () => {
      const canvas = gridMakerCanvasRef.current
      if (!canvas) return
      const image = files[0] ? await loadBitmap(files[0]) : null
      if (cancelled) {
        image?.close()
        return
      }
      renderGridMakerCanvas(canvas, image, gridMakerOptions, { preview: true })
      image?.close()
    }
    void renderPreview().catch((caught) => {
      setError(caught instanceof Error ? caught.message : GRID_MAKER_UI[currentLang].errors.preview)
    })
    return () => {
      cancelled = true
    }
  }, [files, gridMakerOptions, currentLang, tool.slug])

  useEffect(() => {
    if (tool.slug !== 'gif-maker' || !gifPlaying || files.length < 2) return undefined
    const interval = window.setInterval(() => {
      setGifPreviewIndex((index) => (index + 1) % files.length)
    }, Math.max(80, (gifOptions.frameDuration * 1000) / gifSpeed))
    return () => window.clearInterval(interval)
  }, [files.length, gifOptions.frameDuration, gifPlaying, gifSpeed, tool.slug])

  useEffect(() => {
    if (tool.slug !== 'passport-photo' || !files[0]) {
      setPassportRenderedPreview('')
      return undefined
    }
    let cancelled = false
    const preset = PASSPORT_PHOTO_PRESETS.find((item) => item.slug === passportPresetSlug) ?? PASSPORT_PHOTO_PRESETS[0]
    void createPassportPreviewDataUrl(files[0], {
      preset,
      background: passportBackground,
      zoom: passportZoom / 100,
      offsetX: passportOffsetX,
      offsetY: passportOffsetY,
      rotation: passportRotation,
      flipX: passportFlipX,
      flipY: passportFlipY,
      brightness: passportBrightness,
      contrast: passportContrast,
      saturation: passportSaturation,
    }).then((url) => {
      if (!cancelled) setPassportRenderedPreview(url)
    }).catch(() => {
      if (!cancelled) setPassportRenderedPreview('')
    })
    return () => {
      cancelled = true
    }
  }, [files, passportBackground, passportBrightness, passportContrast, passportFlipX, passportFlipY, passportOffsetX, passportOffsetY, passportPresetSlug, passportRotation, passportSaturation, passportZoom, tool.slug])

  const clearOutputs = useCallback(() => {
    setError('')
    setStatus('')
    setMetadata(null)
    setProcessed(null)
    setBatch([])
  }, [])

  const handleFiles = useCallback(async (nextFiles: File[]) => {
    clearOutputs()
    const accepted = nextFiles.filter((file) => file.type.startsWith('image/'))
    if (!accepted.length) {
      setError(t.tool.errorNotImage)
      return
    }
    const maxFiles = tool.slug === 'gif-maker' ? 50 : 20
    if (['batch-compress', 'gif-maker', 'image-collage'].includes(tool.slug) && accepted.length > maxFiles) {
      setError(t.tool.errorTooMany.replace('{max}', String(maxFiles)))
      return
    }
    setFiles(['batch-compress', 'image-to-pdf', 'convert-image', 'convert-to-webp', 'photo-grid', 'gif-maker', 'image-collage'].includes(tool.slug) ? accepted : accepted.slice(0, 1))
    const first = accepted[0]
    setPreviewUrl(URL.createObjectURL(first))
    const bitmap = await loadBitmap(first)
    if (tool.slug === 'compress-image') {
      setCompressPreset('high')
      setSettings((value) => ({
        ...value,
        format: 'image/jpeg',
      }))
    }
    if (tool.slug === 'resize-image') {
      setSettings((value) => ({
        ...value,
        quality: 1,
        percentage: 100,
      }))
    }
    setSettings((value) => ({
      ...value,
      quality: 1,
      width: bitmap.width,
      height: bitmap.height,
      cropWidth: bitmap.width,
      cropHeight: bitmap.height,
    }))
    if (tool.slug === 'crop-image') {
      setCropMode('single')
      setActiveCropId(1)
      setNextCropId(2)
      setCropAreas([{ id: 1, x: 0, y: 0, width: bitmap.width, height: bitmap.height }])
      setSettings((value) => ({ ...value, quality: 1 }))
    }
    if (tool.slug === 'passport-photo') {
      setPassportZoom(100)
      setPassportOffsetX(0)
      setPassportOffsetY(0)
      setPassportRotation(0)
      setPassportFlipX(false)
      setPassportFlipY(false)
      setPassportBrightness(0)
      setPassportContrast(0)
      setPassportSaturation(0)
      setPassportPanel('crop')
      setPassportOutputFormat('image/jpeg')
      setSettings((value) => ({ ...value, quality: 0.95, format: 'image/jpeg' }))
    }
    if (tool.slug === 'add-text') {
      setTextLayers([textLayerFromSettings(1, {
        ...settings,
        text: 'Adventure Awaits',
        textSize: 120,
        textXPercent: 50,
        textYPercent: 47,
        textBoxWidthPercent: 74,
        textBoxHeightPercent: 45,
      })])
      setActiveTextLayerId(1)
      setNextTextLayerId(2)
      setTextHistory([])
      setTextFuture([])
      setTextPreviewImgWidth(0)
    }
    if (tool.slug === 'pixelate-image') {
      const size = Math.round(Math.min(bitmap.width, bitmap.height) * 0.23)
      setPixelateMode('brush')
      setPixelateAreas([])
      setPixelateHistory(['Original'])
      setSettings((value) => ({
        ...value,
        cropX: Math.round(bitmap.width * 0.18),
        cropY: Math.round(bitmap.height * 0.48),
        cropWidth: size,
        cropHeight: size,
        pixelSize: 25,
      }))
    }
    if (tool.slug === 'blur-image') {
      const size = defaultBlurBrushSize(bitmap.width, bitmap.height)
      setBlurMode('brush')
      setBlurAreas([])
      setBlurHistory(['Original'])
      setSettings((value) => ({
        ...value,
        cropX: Math.round(bitmap.width * 0.62),
        cropY: Math.round(bitmap.height * 0.56),
        cropWidth: size,
        cropHeight: size,
        blur: 12,
      }))
    }
    if (tool.slug === 'change-color') {
      const size = Math.round(Math.min(bitmap.width, bitmap.height) * 0.28)
      setChangeColorMode('brush')
      setChangeColorAreas([])
      setChangeColorHistory([t.changeColorPage.historyOriginal])
      setRotateZoom(100)
      setSettings((value) => ({
        ...value,
        background: '#7d52ff',
        cropX: Math.round(bitmap.width * 0.36),
        cropY: Math.round(bitmap.height * 0.34),
        cropWidth: size,
        cropHeight: size,
        colorTolerance: 78,
        colorAreas: [],
      }))
    }
    if (tool.slug === 'change-background') {
      const size = Math.round(Math.min(bitmap.width, bitmap.height) * 0.24)
      setBackgroundAreas([])
      setBackgroundCompare(true)
      setRotateZoom(100)
      setSettings((value) => ({
        ...value,
        background: '#ffffff',
        colorTolerance: 72,
        cropX: Math.max(0, Math.round(bitmap.width * 0.08)),
        cropY: Math.max(0, Math.round(bitmap.height * 0.08)),
        cropWidth: size,
        cropHeight: size,
        backgroundAreas: [],
        backgroundMode: 'color',
        backgroundImageDataUrl: '',
        backgroundImageName: '',
      }))
    }
    if (tool.slug === 'enhance-image') {
      setRotateZoom(100)
      setEnhancePanel('adjust')
      setSettings((value) => ({
        ...value,
        brightness: 12,
        contrast: 18,
        saturation: 20,
        vibrance: 15,
        exposure: 6,
        highlights: -10,
        shadows: 25,
        sharpness: 30,
        clarity: 15,
        warmth: 5,
        tint: 0,
      }))
    }
    if (tool.slug === 'photo-grid') {
      setPhotoGridZoom(100)
      setPhotoGridOffsets({})
      setActivePhotoGridIndex(0)
      setPhotoGridOptions((current) => ({
        ...current,
        columns: accepted.length >= 6 ? 3 : 2,
        rows: Math.max(1, Math.ceil(Math.min(accepted.length, 8) / (accepted.length >= 6 ? 3 : 2))),
      }))
    }
    if (tool.slug === 'gif-maker') {
      setGifPreviewIndex(0)
      setGifPlaying(false)
      setGifOptions((current) => ({
        ...current,
        width: 1280,
        height: 720,
        frameDuration: 0.5,
        fit: 'contain',
        loop: 'forever',
      }))
    }
    if (tool.slug === 'image-collage') {
      setCollageZoom(100)
      setActiveCollageItemId(1)
      setCollageItems(createCollageItems(accepted.length, 'polaroid'))
      setCollageOptions((current) => ({
        ...current,
        width: 1080,
        height: 1080,
        template: 'polaroid',
        background: '#f7f1ea',
        spacing: 20,
        radius: 8,
      }))
    }
    if (tool.slug === 'upscale-image') {
      setRotateZoom(100)
      setUpscaleCompare(true)
      setUpscaleCustomMode(false)
      setSettings((value) => ({
        ...value,
        upscaleScale: 2,
        resampling: 'smooth',
        width: bitmap.width * 2,
        height: bitmap.height * 2,
        sharpness: 35,
        quality: 1,
        format: 'image/jpeg',
      }))
    }
    if (tool.slug === 'meme-generator') {
      setTextZoom(100)
      setMemePanel('text')
      setMemeHistory(['Meme created'])
      setSettings((value) => ({
        ...value,
        format: 'image/jpeg',
        quality: 1,
        textColor: '#ffffff',
        textAlign: 'center',
        textBold: true,
        memeTopText: value.memeTopText || 'WHEN YOU FINISH ALL YOUR TASKS',
        memeBottomText: value.memeBottomText || "AND IT'S ONLY 10AM",
        memeFont: 'Impact',
        memeOutlineWidth: 4,
        textSize: Math.max(42, Math.round(bitmap.width * 0.07)),
      }))
    }
    if (tool.slug === 'remove-exif') {
      setRemoveExifMode('all')
      try {
        const exifr = await loadExifr()
        const parsed = await exifr.parse(first)
        setMetadata(parsed ?? {})
      } catch {
        setMetadata({})
      }
    }
  }, [clearOutputs, settings, tool.slug, t.changeColorPage.historyOriginal, t.tool.errorNotImage, t.tool.errorTooMany])

  useEffect(() => {
    if (!pendingUpload?.files.length) return
    const upload = pendingUpload.files
    queueMicrotask(() => {
      void handleFiles(upload)
      onPendingUploadConsumed?.()
    })
  }, [handleFiles, onPendingUploadConsumed, pendingUpload])

  const process = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setStatus(t.tool.processingBrowser)
    try {
      if (!files.length) throw new Error(t.tool.errorPleaseUpload)
      if (tool.slug === 'batch-compress') {
        const results = await Promise.all(files.map((file) => processImage(file, tool.slug, settings)))
        const JSZip = await loadJSZip()
        const zip = new JSZip()
        results.forEach((item) => zip.file(item.name, item.blob))
        const zipBlob = await zip.generateAsync({ type: 'blob' })
        setProcessed({
          name: 'nanoimage-compressed-images.zip',
          blob: zipBlob,
          size: zipBlob.size,
          url: URL.createObjectURL(zipBlob),
        })
        setBatch(results)
      } else if (tool.slug === 'image-to-pdf') {
        const blob = await createPdf(files, pdfOptions)
        setProcessed({
          name: 'nanoimage-images.pdf',
          blob,
          size: blob.size,
          url: URL.createObjectURL(blob),
        })
      } else if (tool.slug === 'gif-maker') {
        if (files.length < 2) throw new Error(t.tool.errorTwoImages)
        const blob = await createGif(files, gifOptions)
        setProcessed({
          name: 'nanoimage-animation.gif',
          blob,
          size: blob.size,
          url: URL.createObjectURL(blob),
        })
      } else if (tool.slug === 'image-collage') {
        if (!files.length) throw new Error('Please upload images first.')
        const result = await createImageCollage(files, collageOptions, collageItems.length ? collageItems : createCollageItems(files.length, collageOptions.template))
        setProcessed(result)
      } else {
        let processSettings = settings
        const previewImageRect = textPreviewImageRef.current?.getBoundingClientRect()
        const selectionBoxRect = textSelectionBoxRef.current?.getBoundingClientRect()
        const watermarkImageRect = watermarkImageOverlayRef.current?.getBoundingClientRect()
        const previewImageWidth = previewImageRect?.width || textPreviewImgWidth
        if ((tool.slug === 'add-text' || tool.slug === 'add-watermark') && previewImageWidth > 0 && settings.width > 0) {
          const scale = settings.width / previewImageWidth
          const previewFontSize = textPreviewTextRef.current
            ? Number.parseFloat(window.getComputedStyle(textPreviewTextRef.current).fontSize)
            : settings.textSize
          const measuredRect = settings.watermarkMode === 'image' ? watermarkImageRect : selectionBoxRect
          const measuredBox = previewImageRect && measuredRect
            ? {
                textXPercent: ((measuredRect.left + measuredRect.width / 2 - previewImageRect.left) / previewImageRect.width) * 100,
                textYPercent: ((measuredRect.top + measuredRect.height / 2 - previewImageRect.top) / previewImageRect.height) * 100,
                textBoxWidthPercent: (measuredRect.width / previewImageRect.width) * 100,
                textBoxHeightPercent: (measuredRect.height / previewImageRect.height) * 100,
              }
            : {}
          processSettings = {
            ...settings,
            ...measuredBox,
            textSize: Math.round(previewFontSize * scale),
            textShadowBlur: Math.round(settings.textShadowBlur * scale),
            textShadowOffsetX: Math.round(settings.textShadowOffsetX * scale),
            textShadowOffsetY: Math.round(settings.textShadowOffsetY * scale),
          }
          if (tool.slug === 'add-text') {
            processSettings = {
              ...processSettings,
              textLayers: textLayers.map((layer) => (
                layer.id === activeTextLayerId ? textLayerFromSettings(layer.id, processSettings) : layer
              )),
            }
          }
        }
        setProcessed(await processImage(files[0], tool.slug, processSettings))
      }
      setStatus('Done. Your result is ready to download.')
      if (tool.slug === 'meme-generator') {
        setMemeHistory((history) => ['Meme created', ...history].slice(0, 5))
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong while processing this image.')
      setStatus('')
    }
  }

  const resetTool = () => {
    setFiles([])
    setPreviewUrl('')
    clearOutputs()
  }

  const downloadProcessedFile = (item: ProcessedFile) => {
    const link = document.createElement('a')
    link.href = item.url
    link.download = item.name
    link.click()
  }

  const processCropAndDownload = async (area?: CropArea) => {
    setError('')
    setStatus(t.tool.processingBrowser)
    try {
      if (!files.length) throw new Error(t.tool.errorPleaseUpload)
      const cropSettings = area
        ? { ...settings, cropX: area.x, cropY: area.y, cropWidth: area.width, cropHeight: area.height }
        : settings
      const result = await processImage(files[0], tool.slug, cropSettings)
      setProcessed(result)
      setStatus('Done. Your result is ready to download.')
      downloadProcessedFile(result)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong while processing this image.')
      setStatus('')
    }
  }

  const resultSaved =
    files[0] && processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf')
      ? Math.max(0, files[0].size - processed.size)
      : 0
  const resultSavedPercent = files[0] && resultSaved > 0 ? Math.round((resultSaved / files[0].size) * 100) : 0
  const isBatchUpload = tool.slug === 'batch-compress' || tool.slug === 'image-to-pdf'
  const isCompressTool = tool.slug === 'compress-image'

  if (isTargetSizeSlug(tool.slug)) {
    return <TargetSizeCompressor tool={tool} navigate={navigate || (() => {})} />
  }
  const actionSummary = resultSaved > 0
    ? `Save ${formatSize(resultSaved)} (${resultSavedPercent}%)`
    : processed
      ? 'Result ready'
      : 'Run the tool to prepare a download'
  const totalOriginalSize = files.reduce((sum, file) => sum + file.size, 0)
  const totalCompressedSize = batch.reduce((sum, item) => sum + item.size, 0)
  const totalBatchSaved = totalCompressedSize > 0 ? Math.max(0, totalOriginalSize - totalCompressedSize) : 0
  const totalBatchSavedPercent = totalOriginalSize > 0 && totalBatchSaved > 0
    ? Math.round((totalBatchSaved / totalOriginalSize) * 100)
    : 0

  if (tool.slug === 'passport-photo') {
    const pp = t.passportPhoto
    const selectedPreset = PASSPORT_PHOTO_PRESETS.find((preset) => preset.slug === passportPresetSlug) ?? PASSPORT_PHOTO_PRESETS[0]
    const presetGroups = ['Popular', 'US/Canada', 'Europe', 'Asia', 'Other'] as const
    const popularPresetSlugs = new Set(['us-passport', 'china-visa', 'russia-passport', 'india-passport'])
    const presetGroupLabels: Record<PassportPhotoPreset['group'], string> = {
      Popular: pp.groupPopular,
      'US/Canada': pp.groupUsCanada,
      Europe: pp.groupEurope,
      Asia: pp.groupAsia,
      Other: pp.groupOther,
    }
    const visiblePresets = passportPresetGroup === 'Popular'
      ? PASSPORT_PHOTO_PRESETS.filter((preset) => popularPresetSlugs.has(preset.slug))
      : PASSPORT_PHOTO_PRESETS.filter((preset) => preset.group === passportPresetGroup)
    const passportTargetKb = passportFileLimit === 'none'
      ? undefined
      : passportFileLimit === 'custom'
        ? passportCustomLimit
        : Number(passportFileLimit)
    const setPassportFilterPreset = (brightness: number, contrast: number, saturation: number) => {
      clearOutputs()
      setPassportBrightness(brightness)
      setPassportContrast(contrast)
      setPassportSaturation(saturation)
    }
    const resetPassportAdjustments = () => {
      clearOutputs()
      setPassportZoom(100)
      setPassportOffsetX(0)
      setPassportOffsetY(0)
      setPassportRotation(0)
      setPassportFlipX(false)
      setPassportFlipY(false)
      setPassportBrightness(0)
      setPassportContrast(0)
      setPassportSaturation(0)
    }
    const passportPanelContent = (
      <div className="passport-panel">
        {passportPanel === 'crop' && (
          <>
            <strong>{pp.crop}</strong>
            <div className="passport-controls">
              <button type="button" onClick={() => { clearOutputs(); setPassportZoom((value) => clamp(value - 5, 60, 220)) }}>−</button>
              <strong>{passportZoom}%</strong>
              <button type="button" onClick={() => { clearOutputs(); setPassportZoom((value) => clamp(value + 5, 60, 220)) }}>+</button>
              <button type="button" onClick={() => { clearOutputs(); setPassportOffsetX(0); setPassportOffsetY(0); setPassportZoom(100) }}>{pp.fit}</button>
            </div>
            <div className="passport-sliders">
              <label>{pp.horizontal} <input min="-40" max="40" type="range" value={passportOffsetX} onChange={(event) => { clearOutputs(); setPassportOffsetX(Number(event.target.value)) }} /></label>
              <label>{pp.vertical} <input min="-40" max="40" type="range" value={passportOffsetY} onChange={(event) => { clearOutputs(); setPassportOffsetY(Number(event.target.value)) }} /></label>
            </div>
          </>
        )}
        {passportPanel === 'background' && (
          <>
            <strong>{pp.background}</strong>
            <div className="passport-bg-grid">
              {PASSPORT_BACKGROUND_OPTIONS.map((option) => (
                <button
                  aria-label={option.label}
                  className={passportBackground === option.color ? 'active' : ''}
                  key={option.label}
                  style={{ background: option.color === 'transparent' ? 'linear-gradient(135deg,#fff 0 48%,#e5e7eb 48% 52%,#fff 52%)' : option.color }}
                  type="button"
                  onClick={() => { clearOutputs(); setPassportBackground(option.color) }}
                >
                  {passportBackground === option.color ? '✓' : ''}
                </button>
              ))}
            </div>
            <p className="passport-note">{pp.bgNote}</p>
          </>
        )}
        {passportPanel === 'filters' && (
          <>
            <strong>{pp.filters}</strong>
            <div className="passport-filter-presets">
              <button type="button" onClick={() => setPassportFilterPreset(0, 0, 0)}>{pp.natural}</button>
              <button type="button" onClick={() => setPassportFilterPreset(6, 8, -6)}>{pp.idClean}</button>
              <button type="button" onClick={() => setPassportFilterPreset(10, 12, 4)}>{pp.bright}</button>
            </div>
            <div className="passport-sliders">
              <label>{pp.brightness} {passportBrightness > 0 ? `+${passportBrightness}` : passportBrightness}<input min="-30" max="30" type="range" value={passportBrightness} onChange={(event) => { clearOutputs(); setPassportBrightness(Number(event.target.value)) }} /></label>
              <label>{pp.contrast} {passportContrast > 0 ? `+${passportContrast}` : passportContrast}<input min="-30" max="30" type="range" value={passportContrast} onChange={(event) => { clearOutputs(); setPassportContrast(Number(event.target.value)) }} /></label>
              <label>{pp.saturation} {passportSaturation > 0 ? `+${passportSaturation}` : passportSaturation}<input min="-40" max="40" type="range" value={passportSaturation} onChange={(event) => { clearOutputs(); setPassportSaturation(Number(event.target.value)) }} /></label>
            </div>
            <p className="passport-note">{pp.filterNote}</p>
          </>
        )}
        {passportPanel === 'rotate' && (
          <>
            <strong>{pp.rotate}</strong>
            <div className="passport-rotate-grid">
              <button type="button" onClick={() => { clearOutputs(); setPassportRotation((value) => value - 90) }}>{pp.rotateLeft}</button>
              <button type="button" onClick={() => { clearOutputs(); setPassportRotation((value) => value + 90) }}>{pp.rotateRight}</button>
              <button className={passportFlipX ? 'active' : ''} type="button" onClick={() => { clearOutputs(); setPassportFlipX((value) => !value) }}>{pp.flipHorizontal}</button>
              <button className={passportFlipY ? 'active' : ''} type="button" onClick={() => { clearOutputs(); setPassportFlipY((value) => !value) }}>{pp.flipVertical}</button>
            </div>
            <label className="passport-angle">{pp.angle} {passportRotation}°<input min="-180" max="180" step="1" type="range" value={passportRotation} onChange={(event) => { clearOutputs(); setPassportRotation(Number(event.target.value)) }} /></label>
            <button className="secondary small" type="button" onClick={() => { clearOutputs(); setPassportRotation(0); setPassportFlipX(false); setPassportFlipY(false) }}>{pp.resetRotate}</button>
          </>
        )}
        <button className="passport-reset-link" type="button" onClick={resetPassportAdjustments}>{pp.resetAll}</button>
      </div>
    )
    const exportPassport = async (mode: 'single' | 'sheet') => {
      setError('')
      setStatus(pp.processing)
      try {
        if (!files.length) throw new Error(t.tool.errorPleaseUpload)
        const single = await createPassportPhoto(files[0], {
          preset: selectedPreset,
          background: passportBackground,
          format: passportOutputFormat,
          zoom: passportZoom / 100,
          offsetX: passportOffsetX,
          offsetY: passportOffsetY,
          rotation: passportRotation,
          flipX: passportFlipX,
          flipY: passportFlipY,
          brightness: passportBrightness,
          contrast: passportContrast,
          saturation: passportSaturation,
          targetKb: passportTargetKb,
        })
        const result = mode === 'sheet'
          ? await createPassportPrintSheet(single.blob, selectedPreset, passportOutputFormat)
          : single
        setProcessed(result)
        setStatus(pp.done)
        downloadProcessedFile(result)
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : pp.error)
        setStatus('')
      }
    }

    return (
      <div className="passport-photo-page">
        <div className="passport-hero">
          <h1>{localName}</h1>
          <p>{localSubtitle}</p>
          <div className="passport-trust-row">
            <span><HomeIcon name="shield" /> {pp.trustNoUploads}</span>
            <span><HomeIcon name="lock" /> {pp.trustPrivate}</span>
            <span><HomeIcon name="sparkle" /> {pp.trustFree}</span>
          </div>
        </div>

        <div className="passport-layout">
          <div className="passport-main">
            <section className="passport-card">
              <div className="passport-step-title"><span>1</span><strong>{pp.stepChoose}</strong></div>
              <div className="passport-tabs">
                {presetGroups.map((group) => (
                  <button className={passportPresetGroup === group ? 'active' : ''} key={group} type="button" onClick={() => setPassportPresetGroup(group)}>
                    {presetGroupLabels[group]}
                  </button>
                ))}
              </div>
              <div className="passport-preset-grid">
                {visiblePresets.map((preset) => (
                  <button
                    className={preset.slug === selectedPreset.slug ? 'active' : ''}
                    key={preset.slug}
                    type="button"
                    onClick={() => {
                      clearOutputs()
                      setPassportPresetSlug(preset.slug)
                      setPassportPresetGroup(preset.group)
                    }}
                  >
                    <span>{preset.flag}</span>
                    <strong>{preset.name}</strong>
                    <small>{preset.physicalSize} · {preset.width} × {preset.height} px</small>
                  </button>
                ))}
                <select value={passportPresetSlug} onChange={(event) => { const preset = PASSPORT_PHOTO_PRESETS.find((item) => item.slug === event.target.value); clearOutputs(); setPassportPresetSlug(event.target.value); if (preset) setPassportPresetGroup(preset.group) }}>
                  {PASSPORT_PHOTO_PRESETS.map((preset) => (
                    <option key={preset.slug} value={preset.slug}>{preset.name}</option>
                  ))}
                </select>
              </div>
            </section>

            <section className="passport-card">
              <div className="passport-step-title"><span>2</span><strong>{pp.stepAdjust}</strong></div>
              {!previewUrl ? (
                <UploadDropzone onFiles={handleFiles} hintSmall={pp.uploadHint} />
              ) : (
                <div className="passport-editor">
                  <aside className="passport-editor-tools">
                    <button className={passportPanel === 'crop' ? 'active' : ''} type="button" onClick={() => setPassportPanel('crop')}><HomeIcon name="crop" /> {pp.crop}</button>
                    <button className={passportPanel === 'background' ? 'active' : ''} type="button" onClick={() => setPassportPanel('background')}><HomeIcon name="image" /> {pp.background}</button>
                    <button className={passportPanel === 'filters' ? 'active' : ''} type="button" onClick={() => setPassportPanel('filters')}><HomeIcon name="sun" /> {pp.filters}</button>
                    <button className={passportPanel === 'rotate' ? 'active' : ''} type="button" onClick={() => setPassportPanel('rotate')}><HomeIcon name="rotate" /> {pp.rotate}</button>
                    <UploadButton label={pp.replace} onFiles={handleFiles} />
                  </aside>
                  <div className="passport-preview-wrap">
                    <div className="passport-guide-label head">{pp.head}</div>
                    <div className="passport-guide-label eye">{pp.eye}</div>
                    <div className="passport-guide-label chin">{pp.chin}</div>
                    <div className="passport-frame" style={{ aspectRatio: `${selectedPreset.width} / ${selectedPreset.height}`, background: passportBackground === 'transparent' ? '#fff' : passportBackground }}>
                      <img
                        alt="NanoImage passport photo maker interface for creating passport visa and ID photos online"
                        src={passportRenderedPreview || previewUrl}
                      />
                      <span className="guide center"></span>
                      <span className="guide head"></span>
                      <span className="guide eyes"></span>
                      <span className="guide chin"></span>
                    </div>
                    {passportPanelContent}
                  </div>
                </div>
              )}
            </section>

            <section className="passport-card passport-download-card">
              <div className="passport-step-title"><span>3</span><strong>{pp.stepDownload}</strong></div>
              <button className="primary" type="button" onClick={() => void exportPassport('single')}><HomeIcon name="download" /> {pp.downloadPhoto}</button>
              <button className="secondary" type="button" onClick={() => void exportPassport('sheet')}><HomeIcon name="file" /> {pp.printSheet}</button>
              <p><HomeIcon name="check" /> {pp.ready}</p>
            </section>
          </div>

          <aside className="passport-side">
            <section className="passport-card">
              <div className="passport-side-title"><strong>{pp.presetDetails}</strong><span>{pp.compliantGuide}</span></div>
              <dl className="passport-details">
                <div><dt>{pp.size}</dt><dd>{selectedPreset.physicalSize}</dd></div>
                <div><dt>{pp.pixels}</dt><dd>{selectedPreset.width} × {selectedPreset.height} px</dd></div>
                <div><dt>{pp.dpi}</dt><dd>{selectedPreset.dpi} DPI</dd></div>
                <div><dt>{pp.background}</dt><dd>{selectedPreset.background}</dd></div>
                <div><dt>{pp.headSize}</dt><dd>{selectedPreset.headSize}</dd></div>
                <div><dt>{pp.lastVerified}</dt><dd>{selectedPreset.verified}</dd></div>
              </dl>
            </section>

            <section className="passport-card">
              <strong>{pp.background}</strong>
              <div className="passport-bg-grid">
                {PASSPORT_BACKGROUND_OPTIONS.map((option) => (
                  <button
                    aria-label={option.label}
                    className={passportBackground === option.color ? 'active' : ''}
                    key={option.label}
                    style={{ background: option.color === 'transparent' ? 'linear-gradient(135deg,#fff 0 48%,#e5e7eb 48% 52%,#fff 52%)' : option.color }}
                    type="button"
                    onClick={() => { clearOutputs(); setPassportBackground(option.color) }}
                  >
                    {passportBackground === option.color ? '✓' : ''}
                  </button>
                ))}
              </div>
              <p className="passport-note">{pp.bgNote}</p>
            </section>

            <section className="passport-card">
              <strong>{pp.fileSize}</strong>
              <div className="passport-radio-list">
                {(['none', '50', '100', 'custom'] as PassportPhotoFileLimit[]).map((limit) => (
                  <label key={limit}>
                    <input checked={passportFileLimit === limit} name="passport-limit" type="radio" onChange={() => { clearOutputs(); setPassportFileLimit(limit) }} />
                    {limit === 'none' ? pp.noLimit : limit === 'custom' ? pp.custom : `≤ ${limit} KB`}
                  </label>
                ))}
              </div>
              {passportFileLimit === 'custom' && (
                <label className="passport-custom-kb">
                  <input min="20" type="number" value={passportCustomLimit} onChange={(event) => { clearOutputs(); setPassportCustomLimit(Number(event.target.value)) }} />
                  KB
                </label>
              )}
              <p className="passport-note">{pp.smallerNote}</p>
            </section>

            <section className="passport-card">
              <strong>{pp.outputFormat}</strong>
              <div className="format-pills">
                <button className={passportOutputFormat === 'image/jpeg' ? 'active' : ''} type="button" onClick={() => { clearOutputs(); setPassportOutputFormat('image/jpeg') }}>JPG</button>
                <button className={passportOutputFormat === 'image/png' ? 'active' : ''} type="button" onClick={() => { clearOutputs(); setPassportOutputFormat('image/png') }}>PNG</button>
              </div>
            </section>

            {processed && (
              <section className="passport-card">
                <strong>{pp.outputSummary}</strong>
                <p>{selectedPreset.width} × {selectedPreset.height} px · {selectedPreset.dpi} DPI · {passportOutputFormat === 'image/png' ? 'PNG' : 'JPG'}</p>
                <p>{formatSize(processed.size)}{passportTargetKb ? ` · target ≤ ${passportTargetKb}KB` : ''}</p>
              </section>
            )}
          </aside>
        </div>

        {(status || error) && <p className={`tool-status ${error ? 'error' : ''}`}>{error || status}</p>}
      </div>
    )
  }

  if (tool.slug === 'crop-image') {
    const normalizeCropArea = (area: CropArea) => {
      const maxWidth = Math.max(1, settings.width)
      const maxHeight = Math.max(1, settings.height)
      const width = clamp(Math.round(area.width), 24, maxWidth)
      const height = clamp(Math.round(area.height), 24, maxHeight)
      return {
        ...area,
        x: clamp(Math.round(area.x), 0, Math.max(0, maxWidth - width)),
        y: clamp(Math.round(area.y), 0, Math.max(0, maxHeight - height)),
        width,
        height,
      }
    }

    const activeCropArea = cropAreas.find((area) => area.id === activeCropId)
      ?? cropAreas[0]
      ?? { id: 1, x: settings.cropX, y: settings.cropY, width: settings.cropWidth, height: settings.cropHeight }

    const syncCropSettings = (area: CropArea) => {
      setSettings((value) => ({
        ...value,
        cropX: area.x,
        cropY: area.y,
        cropWidth: area.width,
        cropHeight: area.height,
      }))
    }

    const selectCropArea = (area: CropArea) => {
      const nextArea = normalizeCropArea(area)
      setActiveCropId(nextArea.id)
      syncCropSettings(nextArea)
    }

    const updateCropArea = (id: number, patch: Partial<CropArea>) => {
      clearOutputs()
      const source = cropAreas.find((area) => area.id === id) ?? activeCropArea
      const nextArea = normalizeCropArea({ ...source, ...patch })
      setCropAreas((current) => current.length
        ? current.map((area) => area.id === id ? nextArea : area)
        : [nextArea])
      setActiveCropId(id)
      syncCropSettings(nextArea)
    }

    const addCropArea = () => {
      if (!settings.width || !settings.height) return
      clearOutputs()
      const areaWidth = Math.max(48, Math.round(settings.width * 0.38))
      const areaHeight = Math.max(48, Math.round(settings.height * 0.34))
      const nextArea = normalizeCropArea({
        id: nextCropId,
        x: Math.round((settings.width - areaWidth) / 2),
        y: Math.round((settings.height - areaHeight) / 2),
        width: areaWidth,
        height: areaHeight,
      })
      setCropMode('multiple')
      setCropAreas((current) => [...(current.length ? current : [activeCropArea]), nextArea])
      setActiveCropId(nextArea.id)
      setNextCropId((value) => value + 1)
      syncCropSettings(nextArea)
    }

    const deleteCropArea = (id = activeCropId) => {
      clearOutputs()
      if (cropAreas.length <= 1) {
        const resetArea = normalizeCropArea({ id: 1, x: 0, y: 0, width: settings.width, height: settings.height })
        setCropAreas([resetArea])
        setActiveCropId(1)
        syncCropSettings(resetArea)
        return
      }
      const remaining = cropAreas.filter((area) => area.id !== id)
      const nextArea = remaining[0]
      setCropAreas(remaining)
      setActiveCropId(nextArea.id)
      syncCropSettings(nextArea)
    }

    const resetCropSelection = () => {
      clearOutputs()
      const resetArea = normalizeCropArea({ id: activeCropId || 1, x: 0, y: 0, width: settings.width, height: settings.height })
      setCropAreas((current) => {
        if (!current.length) return [resetArea]
        return current.map((area) => area.id === resetArea.id ? resetArea : area)
      })
      setActiveCropId(resetArea.id)
      syncCropSettings(resetArea)
    }

    const handleCropPointerDown = (
      area: CropArea,
      event: ReactPointerEvent<HTMLElement>,
      mode: 'move' | 'resize' = 'move',
      corner: 'tl' | 'tr' | 'bl' | 'br' = 'br',
    ) => {
      const stage = event.currentTarget.closest('.crop-image-stage') as HTMLElement | null
      if (!stage || !settings.width || !settings.height) return
      event.preventDefault()
      event.stopPropagation()
      clearOutputs()
      selectCropArea(area)
      const rect = stage.getBoundingClientRect()
      const startX = event.clientX
      const startY = event.clientY
      const startArea = normalizeCropArea(area)
      const scaleX = settings.width / rect.width
      const scaleY = settings.height / rect.height

      const moveCrop = (moveEvent: PointerEvent) => {
        const deltaX = Math.round((moveEvent.clientX - startX) * scaleX)
        const deltaY = Math.round((moveEvent.clientY - startY) * scaleY)
        if (mode === 'move') {
          updateCropArea(area.id, { x: startArea.x + deltaX, y: startArea.y + deltaY })
          return
        }

        const minSize = 24
        let nextX = startArea.x
        let nextY = startArea.y
        let nextWidth = startArea.width
        let nextHeight = startArea.height

        if (corner.includes('l')) {
          nextX = clamp(startArea.x + deltaX, 0, startArea.x + startArea.width - minSize)
          nextWidth = startArea.width + (startArea.x - nextX)
        }
        if (corner.includes('r')) {
          nextWidth = clamp(startArea.width + deltaX, minSize, settings.width - startArea.x)
        }
        if (corner.includes('t')) {
          nextY = clamp(startArea.y + deltaY, 0, startArea.y + startArea.height - minSize)
          nextHeight = startArea.height + (startArea.y - nextY)
        }
        if (corner.includes('b')) {
          nextHeight = clamp(startArea.height + deltaY, minSize, settings.height - startArea.y)
        }

        updateCropArea(area.id, { x: nextX, y: nextY, width: nextWidth, height: nextHeight })
      }

      const stopMove = () => {
        window.removeEventListener('pointermove', moveCrop)
        window.removeEventListener('pointerup', stopMove)
      }

      window.addEventListener('pointermove', moveCrop)
      window.addEventListener('pointerup', stopMove)
    }

    const updateActiveCropArea = (patch: Partial<CropArea>) => updateCropArea(activeCropArea.id, patch)
    const visibleCropAreas = cropMode === 'multiple' ? cropAreas : [activeCropArea]
    const processAllCropAreasAndDownload = async () => {
      setError('')
      setStatus('Processing all crop areas in your browser...')
      try {
        if (!files.length) throw new Error(t.tool.errorPleaseUpload)
        const areas = cropAreas.length ? cropAreas : [activeCropArea]
        const results = await Promise.all(areas.map((area) => processImage(files[0], tool.slug, {
          ...settings,
          cropX: area.x,
          cropY: area.y,
          cropWidth: area.width,
          cropHeight: area.height,
        })))
        const JSZip = await loadJSZip()
        const zip = new JSZip()
        results.forEach((item, index) => zip.file(`crop-area-${index + 1}-${item.name}`, item.blob))
        const zipBlob = await zip.generateAsync({ type: 'blob' })
        const result = {
          name: 'nanoimage-cropped-areas.zip',
          blob: zipBlob,
          size: zipBlob.size,
          url: URL.createObjectURL(zipBlob),
        }
        setProcessed(result)
        setBatch(results)
        setStatus('Done. Your cropped areas are ready to download.')
        downloadProcessedFile(result)
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Something went wrong while processing these crop areas.')
        setStatus('')
      }
    }
    const cropAreaStyle = (area: CropArea) => ({
      left: `${settings.width ? (area.x / settings.width) * 100 : 7}%`,
      top: `${settings.height ? (area.y / settings.height) * 100 : 10}%`,
      width: `${settings.width ? (area.width / settings.width) * 100 : 42}%`,
      height: `${settings.height ? (area.height / settings.height) * 100 : 38}%`,
    }) as CSSProperties
    const cropStageStyle = {
      aspectRatio: settings.width && settings.height ? `${settings.width} / ${settings.height}` : undefined,
      width: settings.width && settings.height
        ? `min(100%, ${Math.round((settings.width / settings.height) * 470)}px)`
        : undefined,
    } as CSSProperties

    return (
      <div className="workspace crop-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle"><HomeIcon name="crop" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="lock" /> {t.tool.staysPrivate}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="smile" /> {t.tool.alwaysFree}</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h3><HomeIcon name="sparkle" /> {t.tool.tipsForTool}</h3>
            <p>✓ Drag the corners or edges to adjust areas.</p>
            <p>✓ Hold Shift to keep the aspect ratio.</p>
            <p>✓ You can move a selected area by dragging inside.</p>
            <p>✓ Create multiple crops for different formats.</p>
          </aside>
        </div>
        <form className={`crop-layout ${cropMode === 'single' ? 'single-crop-layout' : ''}`} onSubmit={process}>
          <aside className="settings-panel crop-settings-panel">
            <h3>Crop Settings</h3>
            <div className="crop-mode-grid">
              <button className={cropMode === 'single' ? 'active' : ''} type="button" onClick={() => setCropMode('single')}><HomeIcon name="crop" /> Single Area <small>Crop one part</small></button>
              <button className={cropMode === 'multiple' ? 'active' : ''} type="button" onClick={() => setCropMode('multiple')}><HomeIcon name="grid" /> Multiple Areas <small>Crop several parts</small></button>
            </div>
            <label>
              Aspect Ratio
              <select>
                <option>Free</option>
                <option>1:1 Square</option>
                <option>4:3</option>
                <option>16:9</option>
                <option>9:16</option>
              </select>
            </label>
            <div className="crop-number-grid">
              <label>Crop X<input min="0" type="number" value={settings.cropX} onChange={(event) => updateActiveCropArea({ x: Number(event.target.value) })} /></label>
              <label>Crop Y<input min="0" type="number" value={settings.cropY} onChange={(event) => updateActiveCropArea({ y: Number(event.target.value) })} /></label>
              <label>Width<input min="1" type="number" value={settings.cropWidth} onChange={(event) => updateActiveCropArea({ width: Number(event.target.value) })} /></label>
              <label>Height<input min="1" type="number" value={settings.cropHeight} onChange={(event) => updateActiveCropArea({ height: Number(event.target.value) })} /></label>
            </div>
            <div className="resize-section">
              <span className="field-title">Output Format</span>
              <div className="format-pills">
                {Object.entries(formatLabels).map(([value, label]) => (
                  <button
                    className={settings.format === value ? 'active' : ''}
                    key={value}
                    type="button"
                    onClick={() => {
                      clearOutputs()
                      setSettings((current) => ({ ...current, format: value as OutputFormat }))
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <label>
              Image Quality {Math.round(settings.quality * 100)}%
              <input min="0.35" max="1" step="0.01" type="range" value={settings.quality} onChange={(event) => {
                clearOutputs()
                setSettings((value) => ({ ...value, quality: Number(event.target.value) }))
              }} />
            </label>
            <label className="toggle-row metadata-toggle">
              <input type="checkbox" defaultChecked />
              Keep metadata (EXIF)
            </label>
            <div className="how-to-card">
              <h3>How to crop</h3>
              <p>1. Upload your image</p>
              <p>2. Adjust the crop area</p>
              <p>3. Download selected or all cropped images</p>
            </div>
          </aside>

          <section className="crop-editor-card">
            <div className="crop-editor-toolbar">
              <div>
                <strong>{files[0]?.name ?? 'Upload an image'}</strong>
                {files[0] && <span>{settings.width} × {settings.height} · {formatSize(files[0].size)}</span>}
              </div>
              <div>
                {cropMode === 'multiple' && <button className="secondary" type="button" onClick={addCropArea}><HomeIcon name="crop" /> Add Area</button>}
                {cropMode === 'multiple' && <button className="secondary" type="button" onClick={() => deleteCropArea()}><HomeIcon name="trash" /> Delete Area</button>}
                <button className="secondary" type="button">−</button>
                <span>100%</span>
                <button className="secondary" type="button">+</button>
              </div>
            </div>
            {previewUrl ? (
              <div className="crop-canvas">
                <div className="crop-image-stage" style={cropStageStyle}>
                  <img src={previewUrl} alt="Crop preview" />
                  <div className="crop-mask"></div>
                  {visibleCropAreas.map((area, index) => (
                    <div
                      className={`crop-box ${area.id === activeCropId ? 'active-crop-box primary-box' : index % 2 === 0 ? 'yellow-box' : 'green-box'}`}
                      key={area.id}
                      style={cropAreaStyle(area)}
                      onPointerDown={(event) => handleCropPointerDown(area, event)}
                    >
                      <span>{index + 1}</span>
                      <i onPointerDown={(event) => handleCropPointerDown(area, event, 'resize', 'tl')}></i>
                      <i onPointerDown={(event) => handleCropPointerDown(area, event, 'resize', 'tr')}></i>
                      <i onPointerDown={(event) => handleCropPointerDown(area, event, 'resize', 'bl')}></i>
                      <i onPointerDown={(event) => handleCropPointerDown(area, event, 'resize', 'br')}></i>
                    </div>
                  ))}
                </div>
                <div className="crop-hint"><HomeIcon name="crop" /> Drag inside to move · drag corners to resize</div>
              </div>
            ) : (
              <div className="empty-preview">Upload an image to start cropping.</div>
            )}
            <div className="crop-bottom-bar">
              <button className="secondary" type="button" onClick={resetCropSelection}><HomeIcon name="rotate" /> Reset</button>
              <span className="privacy-note"><HomeIcon name="lock" /> Your images are processed in your browser. We never upload your files.</span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> {cropMode === 'multiple' ? 'Download All Areas' : 'Download Selected'}</a>
              ) : (
                <button className="primary" type="button" onClick={() => cropMode === 'multiple' ? processAllCropAreasAndDownload() : processCropAndDownload()}><HomeIcon name="download" /> {cropMode === 'multiple' ? 'Download All Areas' : 'Download Selected'}</button>
              )}
            </div>
          </section>

          {cropMode === 'multiple' && <aside className="cropped-areas-card">
            <div className="areas-heading">
              <h2>Cropped Areas ({cropAreas.length})</h2>
              <button type="button" onClick={addCropArea}>Add Area</button>
            </div>
            {cropAreas.map((area, index) => (
              <div className={`cropped-area-item ${area.id === activeCropId ? 'active' : ''}`} key={area.id} onClick={() => selectCropArea(area)}>
                <span className={area.id === activeCropId ? 'purple' : index % 2 === 0 ? 'yellow' : 'green'}>{index + 1}</span>
                <div className="area-thumb"><HomeIcon name="image" /></div>
                <div>
                  <strong>Area {index + 1}</strong>
                  <small>{area.width} × {area.height} <em>{area.x}, {area.y}</em></small>
                </div>
                <button type="button" onClick={(event) => { event.stopPropagation(); selectCropArea(area); void processCropAndDownload(area) }}><HomeIcon name="download" /></button>
                <button type="button" onClick={(event) => { event.stopPropagation(); deleteCropArea(area.id) }}><HomeIcon name="trash" /></button>
              </div>
            ))}
            <p className="crop-tip">Tip: You can reorder the crops by dragging the items.</p>
          </aside>}
        </form>
      </div>
    )
  }

  if (tool.slug === 'change-background') {
    const cb = t.changeBackgroundPage
    const palette = ['#ffffff', '#d8dde2', '#050505', '#ef3f78', '#ff7a3d', '#ffc233', '#ffd81f', '#43c99a', '#32b8d8', '#2f7de1', '#6d4de7', '#7d52ff', '#a039b7']
    const presetLabels: Record<string, string> = {
      Transparent: cb.presetTransparent,
      White: cb.presetWhite,
      Black: cb.presetBlack,
      'Light Gray': cb.presetLightGray,
      'Soft Blue': cb.presetSoftBlue,
      'Soft Pink': cb.presetSoftPink,
      Ocean: cb.presetOcean,
      Wood: cb.presetWood,
      Marble: cb.presetMarble,
    }
    const updateBackground = (background: string) => {
      clearOutputs()
      setSettings((current) => ({ ...current, background, backgroundMode: 'color' }))
    }
    const updateBackgroundBrushSize = (size: number) => {
      clearOutputs()
      setSettings((current) => {
        const centerX = current.cropX + (current.cropWidth || size) / 2
        const centerY = current.cropY + (current.cropHeight || size) / 2
        return {
          ...current,
          cropX: Math.round(clamp(centerX - size / 2, 0, Math.max(0, current.width - size))),
          cropY: Math.round(clamp(centerY - size / 2, 0, Math.max(0, current.height - size))),
          cropWidth: size,
          cropHeight: size,
        }
      })
    }
    const setBackgroundMode = (backgroundMode: BackgroundMode) => {
      clearOutputs()
      setSettings((current) => ({
        ...current,
        backgroundMode,
        format: backgroundMode === 'transparent' ? 'image/png' : current.format,
        background: backgroundMode === 'gradient'
          ? '#7d52ff'
          : backgroundMode === 'transparent'
            ? 'transparent'
            : backgroundMode === 'color' && current.background === 'transparent'
              ? '#ffffff'
              : current.background,
      }))
    }
    const resetBackgroundSettings = () => {
      clearOutputs()
      setRotateZoom(100)
      setBackgroundCompare(true)
      setBackgroundAreas([])
      setSettings((current) => ({
        ...current,
        colorTolerance: 72,
        background: '#ffffff',
        backgroundMode: 'color',
        backgroundImageDataUrl: '',
        backgroundImageName: '',
        backgroundAreas: [],
      }))
    }
    const handleBackgroundImage = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      event.currentTarget.value = ''
      if (!file) return
      if (!file.type.startsWith('image/')) {
        setError(cb.invalidBackgroundFile)
        return
      }
      clearOutputs()
      setSettings((current) => ({
        ...current,
        backgroundMode: 'image',
        backgroundImageDataUrl: '',
        backgroundImageName: file.name,
      }))
      const dataUrl = await fileToDataUrl(file)
      setSettings((current) => ({ ...current, backgroundImageDataUrl: dataUrl }))
    }
    const previewScale = rotateZoom / 100
    const backgroundSelectionStyle = {
      left: `${settings.width && settings.cropWidth ? ((settings.cropX + settings.cropWidth / 2) / settings.width) * 100 : 10}%`,
      top: `${settings.height && settings.cropHeight ? ((settings.cropY + settings.cropHeight / 2) / settings.height) * 100 : 10}%`,
      width: `${settings.width && settings.cropWidth ? (settings.cropWidth / settings.width) * 100 : 24}%`,
      height: `${settings.height && settings.cropHeight ? (settings.cropHeight / settings.height) * 100 : 24}%`,
      transform: `translate(-50%, -50%) scale(${previewScale})`,
      ...backgroundMarkerPaint(settings.backgroundMode, settings.background, settings.backgroundImageDataUrl),
    } as CSSProperties
    const committedBackgroundStyles = backgroundAreas.map((area) => ({
      left: `${settings.width ? ((area.x + area.width / 2) / settings.width) * 100 : 10}%`,
      top: `${settings.height ? ((area.y + area.height / 2) / settings.height) * 100 : 10}%`,
      width: `${settings.width ? (area.width / settings.width) * 100 : 24}%`,
      height: `${settings.height ? (area.height / settings.height) * 100 : 24}%`,
      transform: `translate(-50%, -50%) scale(${previewScale})`,
      ...backgroundMarkerPaint(area.backgroundMode, area.background, area.backgroundImageDataUrl),
    }) as CSSProperties)
    const previewBackgroundStyle = {
      backgroundColor: settings.backgroundMode === 'transparent' ? undefined : settings.background,
      backgroundImage: settings.backgroundMode === 'image' && settings.backgroundImageDataUrl
        ? `url(${settings.backgroundImageDataUrl})`
        : settings.backgroundMode === 'gradient'
          ? 'linear-gradient(135deg, #7d52ff, #32b8d8 52%, #ffc233)'
          : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    } as CSSProperties
    const placeBackgroundSelection = (event: ReactPointerEvent<HTMLElement> | PointerEvent, rect: DOMRect) => {
      if (!settings.width || !settings.height) return null
      const size = settings.cropWidth || Math.round(Math.min(settings.width, settings.height) * 0.24)
      const nextX = ((event.clientX - rect.left) / rect.width) * settings.width - size / 2
      const nextY = ((event.clientY - rect.top) / rect.height) * settings.height - size / 2
      const area: BackgroundArea = {
        id: Date.now(),
        x: Math.round(clamp(nextX, 0, Math.max(0, settings.width - size))),
        y: Math.round(clamp(nextY, 0, Math.max(0, settings.height - size))),
        width: size,
        height: size,
        background: settings.background,
        backgroundMode: settings.backgroundMode,
        backgroundImageDataUrl: settings.backgroundImageDataUrl,
        tolerance: settings.colorTolerance,
      }
      clearOutputs()
      setSettings((current) => ({
        ...current,
        cropX: area.x,
        cropY: area.y,
        cropWidth: size,
        cropHeight: size,
      }))
      return area
    }
    const commitBackgroundArea = (area?: BackgroundArea | null) => {
      const edit = area ?? (settings.cropWidth && settings.cropHeight ? {
        id: Date.now(),
        x: settings.cropX,
        y: settings.cropY,
        width: settings.cropWidth,
        height: settings.cropHeight,
        background: settings.background,
        backgroundMode: settings.backgroundMode,
        backgroundImageDataUrl: settings.backgroundImageDataUrl,
        tolerance: settings.colorTolerance,
      } : null)
      if (!edit) return
      const nextAreas = [...backgroundAreas, edit].slice(-30)
      setBackgroundAreas(nextAreas)
      setSettings((current) => ({ ...current, backgroundAreas: nextAreas }))
      setStatus(cb.addedBackgroundEdit.replace('{count}', String(nextAreas.length)))
    }
    const handleBackgroundPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
      const figure = event.currentTarget as HTMLElement
      if (!settings.width || !settings.height) return
      event.preventDefault()
      const imageRect = figure.querySelector('img')?.getBoundingClientRect()
      const rect = imageRect ?? figure.getBoundingClientRect()
      let pendingArea = placeBackgroundSelection(event, rect)
      const moveSelection = (moveEvent: PointerEvent) => {
        pendingArea = placeBackgroundSelection(moveEvent, rect)
      }
      const stopMove = () => {
        commitBackgroundArea(pendingArea)
        window.removeEventListener('pointermove', moveSelection)
        window.removeEventListener('pointerup', stopMove)
      }
      window.addEventListener('pointermove', moveSelection)
      window.addEventListener('pointerup', stopMove)
    }

    return (
      <div className="workspace change-bg-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle"><HomeIcon name="image" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> {t.tool.free100}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="shield" /> {t.tool.staysPrivate}</span>
              <span><HomeIcon name="bolt" /> {t.tool.worksBrowser}</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h2 className="change-bg-tips-title"><HomeIcon name="sparkle" /> {cb.tipsTitle}</h2>
            <p>✓ {cb.tip1}</p>
            <p>✓ {cb.tip2}</p>
            <p>✓ {cb.tip3}</p>
            <p>✓ {cb.tip4}</p>
          </aside>
        </div>

        <form className="change-bg-layout" onSubmit={process}>
          <aside className="settings-panel change-bg-settings-panel">
            <p className="change-bg-panel-label">{cb.settingsTitle}</p>
            <div className="background-tabs">
              <button className={settings.backgroundMode === 'color' ? 'active' : ''} type="button" onClick={() => setBackgroundMode('color')}>{cb.tabColor}</button>
              <button className={settings.backgroundMode === 'image' ? 'active' : ''} type="button" onClick={() => setBackgroundMode('image')}><HomeIcon name="image" /> {cb.tabImage}</button>
              <button className={settings.backgroundMode === 'gradient' ? 'active' : ''} type="button" onClick={() => setBackgroundMode('gradient')}>{cb.tabGradient}</button>
              <button className={settings.backgroundMode === 'transparent' ? 'active' : ''} type="button" onClick={() => setBackgroundMode('transparent')}>{cb.tabTransparent}</button>
            </div>
            <label>
              <input type="color" value={settings.background === 'transparent' ? '#ffffff' : settings.background} onChange={(event) => updateBackground(event.target.value)} />
            </label>
            <div className="background-palette">
              {palette.map((color) => (
                <button
                  className={settings.background.toLowerCase() === color ? 'active' : ''}
                  key={color}
                  style={{ background: color }}
                  type="button"
                  onClick={() => updateBackground(color)}
                ></button>
              ))}
            </div>
            <div className="image-background-card">
              <strong>{cb.imageBackgroundTitle} <em>{cb.imageBackgroundNew}</em></strong>
              <label className="secondary full upload-bg-button">
                <HomeIcon name="upload" /> {settings.backgroundImageName || cb.uploadBackgroundImage}
                <input accept="image/*" type="file" onChange={handleBackgroundImage} />
              </label>
            </div>
            <label>
              {cb.fit}
              <select>
                <option>{cb.fitCover}</option>
                <option>{cb.fitContain}</option>
                <option>{cb.fitFill}</option>
              </select>
            </label>
            <label>
              {cb.selectionSize} <span>{settings.cropWidth || 120}px</span>
              <input min="40" max="520" type="range" value={settings.cropWidth || 120} onChange={(event) => updateBackgroundBrushSize(Number(event.target.value))} />
            </label>
            <label>
              {cb.tolerance} <span>{settings.colorTolerance}%</span>
              <input min="10" max="100" type="range" value={settings.colorTolerance} onChange={(event) => { clearOutputs(); setSettings((current) => ({ ...current, colorTolerance: Number(event.target.value) })) }} />
            </label>
          </aside>

          <section className="change-bg-preview-card">
            <div className="rotate-preview-toolbar">
              <div>
                <span>{cb.zoom}</span>
                <button type="button" onClick={() => setRotateZoom((value) => clamp(value - 10, 50, 200))}>−</button>
                <strong>{rotateZoom}%</strong>
                <button type="button" onClick={() => setRotateZoom((value) => clamp(value + 10, 50, 200))}>+</button>
              </div>
              <div><span>{cb.compare}</span><label className="switch"><input checked={backgroundCompare} type="checkbox" onChange={(event) => setBackgroundCompare(event.target.checked)} /><i></i></label><button type="button" onClick={resetBackgroundSettings}><HomeIcon name="rotate" /> {cb.undo}</button><button type="button" disabled>{cb.redo}</button></div>
            </div>
            {previewUrl ? (
              <div className={`change-bg-compare ${backgroundCompare ? '' : 'single-preview'}`}>
                {backgroundCompare && <figure>
                  <span>{cb.original}</span>
                  <img src={previewUrl} alt={cb.originalAlt} style={{ transform: `scale(${previewScale})` }} />
                </figure>}
                <figure className="change-bg-preview-figure" style={previewBackgroundStyle} onPointerDown={handleBackgroundPointerDown}>
                  <span>{cb.preview}</span>
                  <img src={processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl} alt={cb.previewAlt} style={{ transform: `scale(${previewScale})` }} />
                  {!processed && committedBackgroundStyles.map((style, index) => <span className="background-selection-overlay committed" key={backgroundAreas[index]?.id ?? index} style={style}></span>)}
                  {!processed && <button className="background-selection-overlay" style={backgroundSelectionStyle} type="button" aria-label={cb.selectionAriaLabel}></button>}
                </figure>
                {backgroundCompare && <div className="compare-handle">↔</div>}
              </div>
            ) : (
              <div className="empty-preview">{cb.emptyPreview}</div>
            )}
            {(processed || status) && (
              <div className="change-bg-success">
                <span><HomeIcon name="shield" /></span>
                <div><strong>{cb.successTitle}</strong><p>{cb.successDesc}</p></div>
                <HomeIcon name="sparkle" />
              </div>
            )}
            {error && <p className="error">{error}</p>}
            <div className="change-bg-bottom-bar">
              <button className="secondary" type="button" onClick={resetBackgroundSettings}><HomeIcon name="rotate" /> {cb.reset}</button>
              <span></span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> {cb.downloadImage}</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> {cb.downloadImage}</button>
              )}
            </div>
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> {cb.tipComplex}</p>
          </section>

          <aside className="change-bg-side-card">
            <section>
              <div className="areas-heading"><p className="change-bg-panel-label">{cb.presetsTitle}</p><button type="button">{cb.viewAll}</button></div>
              <div className="background-preset-grid">
                {[
                  ['transparent', 'Transparent'],
                  ['#ffffff', 'White'],
                  ['#000000', 'Black'],
                  ['#d8dde2', 'Light Gray'],
                  ['#c8ecf7', 'Soft Blue'],
                  ['#f7adc3', 'Soft Pink'],
                  ['#71a9b8', 'Ocean'],
                  ['#c7a17a', 'Wood'],
                  ['#f4f2ef', 'Marble'],
                ].map(([color, label]) => (
                  <button key={label} type="button" onClick={() => color === 'transparent' ? setBackgroundMode('transparent') : updateBackground(color)}>
                    <span className={color === 'transparent' ? 'checker' : ''} style={color === 'transparent' ? undefined : { background: color }}></span>
                    <small>{presetLabels[label] ?? label}</small>
                  </button>
                ))}
              </div>
            </section>
            <section>
              <p className="change-bg-panel-label">{cb.layersTitle}</p>
              <div className="text-layer"><span><HomeIcon name="image" /></span><strong>{cb.subject}</strong><small>{cb.locked}</small></div>
              <div className="text-layer"><span className={settings.backgroundMode === 'transparent' ? 'checker' : ''} style={settings.backgroundMode === 'transparent' ? undefined : previewBackgroundStyle}></span><strong>{cb.backgroundLayer}</strong><small>{settings.backgroundMode}</small></div>
            </section>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'change-color') {
    const cc = t.changeColorPage
    const colorPalette = ['#ff3b58', '#ff7a1a', '#ffc928', '#32a852', '#4287f5', '#7d52ff', '#ff8fb3', '#34bdb2', '#333333', '#8a542f', '#000000', '#7bdff2']
    const colorZoom = rotateZoom
    const colorScale = colorZoom / 100
    const selectionStyle = {
      left: `${settings.width && settings.cropWidth ? ((settings.cropX + settings.cropWidth / 2) / settings.width) * 100 : 50}%`,
      top: `${settings.height && settings.cropHeight ? ((settings.cropY + settings.cropHeight / 2) / settings.height) * 100 : 50}%`,
      width: `${settings.width && settings.cropWidth ? (settings.cropWidth / settings.width) * 100 : 100}%`,
      height: `${settings.height && settings.cropHeight ? (settings.cropHeight / settings.height) * 100 : 100}%`,
      transform: `translate(-50%, -50%) scale(${colorScale})`,
    } as CSSProperties
    const colorPreviewStyle = {
      ...selectionStyle,
      background: settings.background,
    } as CSSProperties
    const committedColorStyles = changeColorAreas.map((area) => ({
      left: `${settings.width ? ((area.x + area.width / 2) / settings.width) * 100 : 50}%`,
      top: `${settings.height ? ((area.y + area.height / 2) / settings.height) * 100 : 50}%`,
      width: `${settings.width ? (area.width / settings.width) * 100 : 20}%`,
      height: `${settings.height ? (area.height / settings.height) * 100 : 20}%`,
      background: area.color,
      transform: `translate(-50%, -50%) scale(${colorScale})`,
    }) as CSSProperties)
    const updateColorSetting = (patch: Partial<Pick<ToolSettingsState, 'cropX' | 'cropY' | 'cropWidth' | 'cropHeight' | 'background' | 'colorTolerance'>>) => {
      clearOutputs()
      setSettings((current) => ({ ...current, ...patch }))
    }
    const updateColorBrushSize = (size: number) => {
      clearOutputs()
      setSettings((current) => {
        const centerX = current.cropX + (current.cropWidth || size) / 2
        const centerY = current.cropY + (current.cropHeight || size) / 2
        return {
          ...current,
          cropX: Math.round(clamp(centerX - size / 2, 0, Math.max(0, current.width - size))),
          cropY: Math.round(clamp(centerY - size / 2, 0, Math.max(0, current.height - size))),
          cropWidth: size,
          cropHeight: size,
        }
      })
    }
    const selectFullColorArea = () => {
      clearOutputs()
      setChangeColorMode('brush')
      setSettings((current) => ({
        ...current,
        cropX: 0,
        cropY: 0,
        cropWidth: current.width,
        cropHeight: current.height,
      }))
    }
    const resetColorSettings = () => {
      clearOutputs()
      setRotateZoom(100)
      setChangeColorMode('brush')
      setChangeColorAreas([])
      const size = Math.round(Math.min(settings.width || 320, settings.height || 320) * 0.35)
      setSettings((current) => ({
        ...current,
        background: '#7d52ff',
        cropX: Math.round((current.width || 320) * 0.34),
        cropY: Math.round((current.height || 320) * 0.28),
        cropWidth: size,
        cropHeight: size,
        colorTolerance: 78,
      }))
    }
    const clearColorSelection = () => {
      clearOutputs()
      setChangeColorMode('eraser')
      const nextAreas = changeColorAreas.slice(0, -1)
      setChangeColorAreas(nextAreas)
      setSettings((current) => ({ ...current, colorAreas: nextAreas }))
      setChangeColorHistory((history) => [cc.historyLastRemoved, ...history.filter((item) => item !== cc.historyLastRemoved)].slice(0, 4))
    }
    const placeColorSelection = (event: ReactPointerEvent<HTMLElement> | PointerEvent, rect: DOMRect) => {
      if (!settings.width || !settings.height) return null
      const size = settings.cropWidth || Math.round(Math.min(settings.width, settings.height) * 0.28)
      const nextX = ((event.clientX - rect.left) / rect.width) * settings.width - size / 2
      const nextY = ((event.clientY - rect.top) / rect.height) * settings.height - size / 2
      const area: ColorArea = {
        id: Date.now(),
        x: Math.round(clamp(nextX, 0, Math.max(0, settings.width - size))),
        y: Math.round(clamp(nextY, 0, Math.max(0, settings.height - size))),
        width: size,
        height: size,
        color: settings.background,
        tolerance: settings.colorTolerance,
      }
      updateColorSetting({
        cropX: area.x,
        cropY: area.y,
        cropWidth: size,
        cropHeight: size,
      })
      return area
    }
    const commitColorArea = (area?: ColorArea | null) => {
      const edit: ColorArea | null = area ?? (settings.cropWidth && settings.cropHeight ? {
        id: Date.now(),
        x: settings.cropX,
        y: settings.cropY,
        width: settings.cropWidth,
        height: settings.cropHeight,
        color: settings.background,
        tolerance: settings.colorTolerance,
      } : null)
      if (!edit) return
      setChangeColorAreas((areas) => [...areas, edit].slice(-30))
      setSettings((current) => ({ ...current, colorAreas: [...changeColorAreas, edit].slice(-30) }))
      setStatus(cc.addedColorEdit.replace('{count}', String(changeColorAreas.length + 1)))
      setChangeColorHistory((history) => [
        cc.areaEditLabel.replace('{color}', settings.background.toUpperCase()).replace('{count}', String(changeColorAreas.length + 1)),
        ...history,
      ].slice(0, 5))
    }
    const handleColorStagePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
      const figure = event.currentTarget as HTMLElement
      if (!settings.width || !settings.height) return
      event.preventDefault()
      if (changeColorMode === 'eraser') {
        clearColorSelection()
        return
      }
      const imageRect = figure.querySelector('img')?.getBoundingClientRect()
      const rect = imageRect ?? figure.getBoundingClientRect()
      let pendingArea = placeColorSelection(event, rect)
      const moveSelection = (moveEvent: PointerEvent) => {
        pendingArea = placeColorSelection(moveEvent, rect)
      }
      const stopMove = () => {
        commitColorArea(pendingArea)
        window.removeEventListener('pointermove', moveSelection)
        window.removeEventListener('pointerup', stopMove)
      }
      window.addEventListener('pointermove', moveSelection)
      window.addEventListener('pointerup', stopMove)
    }
    const handleColorSelectionPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
      const figure = event.currentTarget.closest('figure') as HTMLElement | null
      if (!figure || !settings.width || !settings.height || !settings.cropWidth || !settings.cropHeight) return
      event.preventDefault()
      event.stopPropagation()
      if (changeColorMode === 'eraser') {
        clearColorSelection()
        return
      }
      clearOutputs()
      const imageRect = figure.querySelector('img')?.getBoundingClientRect()
      const rect = imageRect ?? figure.getBoundingClientRect()
      const startX = event.clientX
      const startY = event.clientY
      const startCropX = settings.cropX
      const startCropY = settings.cropY
      let pendingArea: ColorArea = {
        id: Date.now(),
        x: startCropX,
        y: startCropY,
        width: settings.cropWidth,
        height: settings.cropHeight,
        color: settings.background,
        tolerance: settings.colorTolerance,
      }
      const moveSelection = (moveEvent: PointerEvent) => {
        const deltaX = ((moveEvent.clientX - startX) / rect.width) * settings.width
        const deltaY = ((moveEvent.clientY - startY) / rect.height) * settings.height
        pendingArea = {
          ...pendingArea,
          x: Math.round(clamp(startCropX + deltaX, 0, Math.max(0, settings.width - settings.cropWidth))),
          y: Math.round(clamp(startCropY + deltaY, 0, Math.max(0, settings.height - settings.cropHeight))),
        }
        updateColorSetting({ cropX: pendingArea.x, cropY: pendingArea.y })
      }
      const stopMove = () => {
        commitColorArea(pendingArea)
        window.removeEventListener('pointermove', moveSelection)
        window.removeEventListener('pointerup', stopMove)
      }
      window.addEventListener('pointermove', moveSelection)
      window.addEventListener('pointerup', stopMove)
    }

    return (
      <div className="workspace change-color-workspace">
        <div className="pixelate-top-grid">
          <section className="pixelate-title-card">
            <span className="title-doodle"><HomeIcon name="palette" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="device" /> {t.tool.worksBrowser}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="shield" /> {t.tool.staysPrivate}</span>
              <span><HomeIcon name="smile" /> {t.tool.alwaysFree}</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="pixelate-help-card">
            <p className="change-color-tips-title" style={UI_LABEL_STYLE}>💡 {cc.tipsTitle}</p>
            <p>✓ {cc.tip1}</p>
            <p>✓ {cc.tip2}</p>
            <p>✓ {cc.tip3}</p>
            <p>✓ {cc.tip4}</p>
          </aside>
        </div>
        <form className="change-bg-layout change-color-layout" onSubmit={process}>
          <aside className="settings-panel change-bg-settings-panel">
            <section>
              <div className="pixelate-section-heading"><strong>{cc.selectArea}</strong></div>
              <div className="pixelate-tool-toggle">
                <button className={changeColorMode === 'brush' ? 'active' : ''} type="button" onClick={() => setChangeColorMode('brush')}><HomeIcon name="palette" /> {cc.brush}</button>
                <button className={changeColorMode === 'eraser' ? 'active' : ''} type="button" onClick={clearColorSelection}>⌫ {cc.eraser}</button>
              </div>
              <label>{cc.brushSize} <span>{settings.cropWidth || 120}px</span><input min="60" max="520" type="range" value={settings.cropWidth || 120} onChange={(event) => updateColorBrushSize(Number(event.target.value))} /></label>
              <label>{cc.tolerance} <span>{settings.colorTolerance}%</span><input min="10" max="100" type="range" value={settings.colorTolerance} onChange={(event) => updateColorSetting({ colorTolerance: Number(event.target.value) })} /></label>
              <label>{cc.feather} <span>0px</span><input min="0" max="40" type="range" value={0} readOnly /></label>
              <div className="pixelate-action-row">
                <button className="secondary" type="button" onClick={selectFullColorArea}>{cc.selectAll}</button>
                <button className="secondary" type="button" onClick={resetColorSettings}>{cc.resetSelection}</button>
              </div>
            </section>
            <section className="color-options-card">
              <p className="change-color-panel-label">{cc.colorOptions}</p>
              <label>{cc.newColor} <input type="color" value={settings.background} onChange={(event) => updateColorSetting({ background: event.target.value })} /></label>
              <input value={settings.background.toUpperCase()} onChange={(event) => updateColorSetting({ background: event.target.value })} />
              <label>{cc.colorMode}<select><option>{cc.modeSolid}</option><option>{cc.modeTint}</option><option>{cc.modeHueReplace}</option></select></label>
            </section>
          </aside>
          <section className="change-bg-preview-card">
            <div className="rotate-preview-toolbar">
              <div><span>{cc.zoom}</span><button type="button" onClick={() => setRotateZoom((value) => clamp(value - 10, 50, 200))}>−</button><strong>{colorZoom}%</strong><button type="button" onClick={() => setRotateZoom((value) => clamp(value + 10, 50, 200))}>+</button></div>
              <div><button type="button" onClick={resetColorSettings}><HomeIcon name="rotate" /> {cc.undo}</button><button type="button" disabled>{cc.redo}</button></div>
            </div>
            {previewUrl ? (
              <div className="change-bg-compare change-color-stage">
                <figure>
                  <span>{cc.original}</span>
                  <img src={previewUrl} alt={cc.originalAlt} style={{ transform: `scale(${colorScale})` }} />
                </figure>
                <figure className="change-color-preview-figure" onPointerDown={handleColorStagePointerDown}>
                  <span>{cc.preview}</span>
                  <img src={processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl} alt={cc.previewAlt} style={{ transform: `scale(${colorScale})` }} />
                  {!processed && committedColorStyles.map((style, index) => <span className="color-preview-overlay committed" key={changeColorAreas[index]?.id ?? index} style={style}></span>)}
                  {!processed && Boolean(settings.cropWidth && settings.cropHeight) && <span className="color-preview-overlay" style={colorPreviewStyle}></span>}
                  {!processed && (
                    <button
                      className={`color-selection-overlay ${changeColorMode === 'eraser' ? 'eraser' : ''}`}
                      style={selectionStyle}
                      type="button"
                      onPointerDown={settings.cropWidth && settings.cropHeight ? handleColorSelectionPointerDown : handleColorStagePointerDown}
                    ></button>
                  )}
                </figure>
                <div className="compare-handle">↔</div>
              </div>
            ) : (
              <div className="empty-preview">{cc.emptyPreview}</div>
            )}
            {(processed || status) && (
              <div className="change-bg-success">
                <span><HomeIcon name="shield" /></span>
                <div><strong>{cc.successTitle}</strong><p>{cc.successDesc}</p></div>
                <HomeIcon name="sparkle" />
              </div>
            )}
            {error && <p className="error">{error}</p>}
            <div className="change-bg-bottom-bar">
              <button className="secondary" type="button" onClick={resetColorSettings}><HomeIcon name="rotate" /> {cc.reset}</button>
              <span></span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> {cc.downloadImage}</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> {cc.downloadImage}</button>
              )}
            </div>
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> {cc.tipEraser}</p>
          </section>
          <aside className="change-bg-side-card">
            <section>
              <div className="areas-heading"><p className="change-color-panel-label">{cc.popularColors}</p><button type="button">{cc.viewAll}</button></div>
              <div className="popular-color-grid">
                {colorPalette.map((color) => <button className={settings.background.toLowerCase() === color ? 'active' : ''} key={color} style={{ background: color }} type="button" aria-label={cc.newColor} onClick={() => updateColorSetting({ background: color })}></button>)}
              </div>
            </section>
            <section>
              <div className="areas-heading"><p className="change-color-panel-label">{cc.recentColors}</p><button type="button">{cc.clear}</button></div>
              <div className="recent-color-row">{colorPalette.slice(0, 5).map((color) => <button key={color} style={{ background: color }} type="button" aria-label={cc.newColor} onClick={() => updateColorSetting({ background: color })}></button>)}<button type="button">+</button></div>
            </section>
            <section>
              <div className="areas-heading"><p className="change-color-panel-label">{cc.history}</p><button type="button">{cc.clear}</button></div>
              {changeColorHistory.map((item, index) => (
                <div className="history-item" key={`${item}-${index}`}><span><HomeIcon name="palette" /></span><div><strong>{item === 'Original' || item === cc.historyOriginal ? cc.historyOriginal : item}</strong><small>{index === 0 ? cc.historyJustNow : cc.historyMinutesAgo.replace('{n}', String(index))}</small></div><button type="button">⋮</button></div>
              ))}
            </section>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'add-text') {
    const atp = t.addTextPage
    const commitTextSettings = (updater: (current: ToolSettingsState) => ToolSettingsState) => {
      clearOutputs()
      setSettings((current) => {
        setTextHistory((history) => [...history, current].slice(-20))
        setTextFuture([])
        const nextSettings = updater(current)
        if (activeTextLayerId) {
          setTextLayers((layers) => layers.map((layer) => layer.id === activeTextLayerId ? textLayerFromSettings(layer.id, nextSettings) : layer))
        }
        return nextSettings
      })
    }
    const updateTextSetting = <K extends keyof ToolSettingsState>(key: K, value: ToolSettingsState[K]) => {
      commitTextSettings((current) => ({ ...current, [key]: value }))
    }
    const resetTextSettings = () => {
      clearOutputs()
      setTextZoom(100)
      setSettings((current) => ({
        ...current,
        text: 'Adventure Awaits',
        textSize: 120,
        textColor: '#ffffff',
        textXPercent: 50,
        textYPercent: 47,
        textBoxWidthPercent: 74,
        textBoxHeightPercent: 45,
        textBold: true,
        textItalic: false,
        textUnderline: false,
        textShadow: true,
        textOutline: false,
        textAlign: 'center',
        textShadowColor: '#000000',
        textOutlineColor: '#ffffff',
        textShadowBlur: 12,
        textShadowOffsetX: 4,
        textShadowOffsetY: 4,
        watermarkMode: 'text',
        watermarkOpacity: 0.35,
      }))
      setTextLayers([textLayerFromSettings(1, {
        ...settings,
        text: 'Adventure Awaits',
        textSize: 120,
        textColor: '#ffffff',
        textXPercent: 50,
        textYPercent: 47,
        textBoxWidthPercent: 74,
        textBoxHeightPercent: 45,
        textBold: true,
        textItalic: false,
        textUnderline: false,
        textShadow: true,
        textOutline: false,
        textAlign: 'center',
        textShadowColor: '#000000',
        textOutlineColor: '#ffffff',
        textShadowBlur: 12,
        textShadowOffsetX: 4,
        textShadowOffsetY: 4,
      })])
      setActiveTextLayerId(1)
      setNextTextLayerId(2)
      setTextHistory([])
      setTextFuture([])
    }
    const addTextLayer = () => {
      clearOutputs()
      setTextHistory((history) => [...history, settings].slice(-20))
      setTextFuture([])
      const nextSettings = {
        ...settings,
        text: 'New Text',
        textXPercent: 50,
        textYPercent: 35 + (textLayers.length % 4) * 12,
        textBoxWidthPercent: 60,
        textBoxHeightPercent: 32,
      }
      const nextLayer = textLayerFromSettings(nextTextLayerId, nextSettings)
      setTextLayers((layers) => [...layers, nextLayer])
      setActiveTextLayerId(nextLayer.id)
      setNextTextLayerId((value) => value + 1)
      setSettings(nextSettings)
      setTextToolMode('text')
    }
    const selectTextLayer = (layer: TextLayer) => {
      setActiveTextLayerId(layer.id)
      clearOutputs()
      setSettings((current) => settingsFromTextLayer(current, layer))
    }
    const deleteTextLayer = (id: number) => {
      setTextLayers((layers) => {
        const remaining = layers.filter((layer) => layer.id !== id)
        if (id === activeTextLayerId) {
          const nextLayer = remaining[0]
          setActiveTextLayerId(nextLayer?.id ?? 0)
          setSettings((current) => nextLayer ? settingsFromTextLayer(current, nextLayer) : { ...current, text: '' })
        }
        return remaining
      })
    }
    const undoTextEdit = () => {
      setTextHistory((history) => {
        const previous = history.at(-1)
        if (!previous) return history
        setTextFuture((future) => [settings, ...future].slice(0, 20))
        setSettings(previous)
        return history.slice(0, -1)
      })
    }
    const redoTextEdit = () => {
      setTextFuture((future) => {
        const next = future[0]
        if (!next) return future
        setTextHistory((history) => [...history, settings].slice(-20))
        setSettings(next)
        return future.slice(1)
      })
    }
    const textPresets = ['Summer Vibes', 'Stay Positive', 'Good Vibes', 'Dream Big', 'Thank You!', 'Just Breathe']
    const textLines = settings.text.trim() ? textLinesForImage(settings.text) : []
    const textPreviewScale = textZoom / 100
    const updateTextBox = (patch: Partial<Pick<ToolSettingsState, 'textXPercent' | 'textYPercent' | 'textBoxWidthPercent' | 'textBoxHeightPercent' | 'textSize'>>) => {
      commitTextSettings((current) => ({ ...current, ...patch }))
    }
    const handleTextBoxPointerDown = (
      event: ReactPointerEvent<HTMLElement>,
      mode: 'move' | 'resize' = 'move',
      corner: 'tl' | 'tr' | 'bl' | 'br' = 'br',
    ) => {
      const stage = event.currentTarget.closest('.add-text-stage') as HTMLElement | null
      if (!stage) return
      event.preventDefault()
      event.stopPropagation()
      clearOutputs()
      const rect = stage.getBoundingClientRect()
      const startX = event.clientX
      const startY = event.clientY
      const startLeft = settings.textXPercent - settings.textBoxWidthPercent / 2
      const startTop = settings.textYPercent - settings.textBoxHeightPercent / 2
      const startRight = settings.textXPercent + settings.textBoxWidthPercent / 2
      const startBottom = settings.textYPercent + settings.textBoxHeightPercent / 2
      const startSize = settings.textSize

      const moveText = (moveEvent: PointerEvent) => {
        const deltaX = ((moveEvent.clientX - startX) / rect.width) * 100
        const deltaY = ((moveEvent.clientY - startY) / rect.height) * 100
        if (mode === 'move') {
          updateTextBox({
            textXPercent: clamp(settings.textXPercent + deltaX, settings.textBoxWidthPercent / 2, 100 - settings.textBoxWidthPercent / 2),
            textYPercent: clamp(settings.textYPercent + deltaY, settings.textBoxHeightPercent / 2, 100 - settings.textBoxHeightPercent / 2),
          })
          return
        }

        let nextLeft = startLeft
        let nextTop = startTop
        let nextRight = startRight
        let nextBottom = startBottom
        if (corner.includes('l')) nextLeft = clamp(startLeft + deltaX, 0, startRight - 16)
        if (corner.includes('r')) nextRight = clamp(startRight + deltaX, startLeft + 16, 100)
        if (corner.includes('t')) nextTop = clamp(startTop + deltaY, 0, startBottom - 12)
        if (corner.includes('b')) nextBottom = clamp(startBottom + deltaY, startTop + 12, 100)
        const nextWidth = nextRight - nextLeft
        const nextHeight = nextBottom - nextTop
        updateTextBox({
          textXPercent: nextLeft + nextWidth / 2,
          textYPercent: nextTop + nextHeight / 2,
          textBoxWidthPercent: nextWidth,
          textBoxHeightPercent: nextHeight,
          textSize: clamp(Math.round(startSize * (nextHeight / settings.textBoxHeightPercent)), 24, 180),
        })
      }

      const stopMove = () => {
        window.removeEventListener('pointermove', moveText)
        window.removeEventListener('pointerup', stopMove)
      }

      window.addEventListener('pointermove', moveText)
      window.addEventListener('pointerup', stopMove)
    }
    const textBoxStyle = {
      left: `${settings.textXPercent}%`,
      top: `${settings.textYPercent}%`,
      width: `${settings.textBoxWidthPercent}%`,
      height: `${settings.textBoxHeightPercent}%`,
      transform: `translate(-50%, -50%) scale(${textPreviewScale})`,
    } as CSSProperties
    const textLayerBoxStyle = (layer: TextLayer) => {
      const layerSettings = settingsFromTextLayer(settings, layer)
      return {
        left: `${layerSettings.textXPercent}%`,
        top: `${layerSettings.textYPercent}%`,
        width: `${layerSettings.textBoxWidthPercent}%`,
        height: `${layerSettings.textBoxHeightPercent}%`,
        transform: `translate(-50%, -50%) scale(${textPreviewScale})`,
      } as CSSProperties
    }
    const textLayerTextStyle = (layer: TextLayer) => {
      const layerSettings = settingsFromTextLayer(settings, layer)
      return {
        color: layerSettings.textColor,
        fontSize: `clamp(2rem, ${layerSettings.textSize / 18}vw, 6.8rem)`,
        fontWeight: layerSettings.textBold ? 900 : 500,
        textAlign: layerSettings.textAlign,
        textShadow: layerSettings.textShadow ? `${layerSettings.textShadowOffsetX}px ${layerSettings.textShadowOffsetY}px ${layerSettings.textShadowBlur}px ${layerSettings.textShadowColor}` : 'none',
        WebkitTextStroke: layerSettings.textOutline ? `2px ${layerSettings.textOutlineColor}` : '0',
      } as CSSProperties
    }
    const inactiveTextLayers = textLayers.filter((layer) => layer.id !== activeTextLayerId)

    return (
      <div className="workspace add-text-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle"><HomeIcon name="text" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="lock" /> {t.tool.staysPrivate}</span>
              <span><HomeIcon name="smile" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="bolt" /> {t.tool.alwaysFree}</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h2 className="add-text-tips-title"><HomeIcon name="sparkle" /> {atp.tipsTitle}</h2>
            <p>✓ {atp.tip1}</p>
            <p>✓ {atp.tip2}</p>
            <p>✓ {atp.tip3}</p>
            <p>✓ {atp.tip4}</p>
          </aside>
        </div>

        <form className="add-text-layout" onSubmit={process}>
          <aside className="settings-panel add-text-settings-panel">
            <p className="add-text-panel-label">{atp.settingsTitle}</p>
            <textarea value={settings.text} onChange={(event) => updateTextSetting('text', event.target.value)} />
            <label>
              {atp.font}
              <select>
                <option>Pacifico</option>
                <option>Inter</option>
                <option>Serif</option>
              </select>
            </label>
            <label>
              {atp.size} <span>{settings.textSize} px</span>
              <input min="24" max="180" step="1" type="range" value={settings.textSize} onChange={(event) => updateTextSetting('textSize', Number(event.target.value))} />
            </label>
            <label>
              {atp.color}
              <input type="color" value={settings.textColor} onChange={(event) => updateTextSetting('textColor', event.target.value)} />
            </label>
            <div className="text-style-row">
              <button className={settings.textBold ? 'active' : ''} type="button" onClick={() => updateTextSetting('textBold', !settings.textBold)}>B</button>
              <button className={settings.textItalic ? 'active' : ''} type="button" onClick={() => updateTextSetting('textItalic', !settings.textItalic)}><em>I</em></button>
              <button className={settings.textUnderline ? 'active' : ''} type="button" onClick={() => updateTextSetting('textUnderline', !settings.textUnderline)}><u>U</u></button>
              <button className={settings.textAlign === 'left' ? 'active' : ''} type="button" onClick={() => updateTextSetting('textAlign', 'left')}>≡</button>
              <button className={settings.textAlign === 'center' ? 'active' : ''} type="button" onClick={() => updateTextSetting('textAlign', 'center')}>≣</button>
              <button className={settings.textAlign === 'right' ? 'active' : ''} type="button" onClick={() => updateTextSetting('textAlign', 'right')}>≡</button>
            </div>
            <div className="text-effects-card">
              <strong>{atp.effects}</strong>
              <label className="toggle-row metadata-toggle"><input type="checkbox" checked={settings.textShadow} onChange={(event) => updateTextSetting('textShadow', event.target.checked)} /> {atp.shadow} <input type="color" value={settings.textShadowColor} onChange={(event) => updateTextSetting('textShadowColor', event.target.value)} /></label>
              <label>{atp.blur} <input min="0" max="24" type="range" value={settings.textShadowBlur} onChange={(event) => updateTextSetting('textShadowBlur', Number(event.target.value))} /></label>
              <label>{atp.offsetX} <input min="-24" max="24" type="range" value={settings.textShadowOffsetX} onChange={(event) => updateTextSetting('textShadowOffsetX', Number(event.target.value))} /></label>
              <label>{atp.offsetY} <input min="-24" max="24" type="range" value={settings.textShadowOffsetY} onChange={(event) => updateTextSetting('textShadowOffsetY', Number(event.target.value))} /></label>
              <label className="toggle-row metadata-toggle"><input type="checkbox" checked={settings.textOutline} onChange={(event) => updateTextSetting('textOutline', event.target.checked)} /> {atp.outline} <input type="color" value={settings.textOutlineColor} onChange={(event) => updateTextSetting('textOutlineColor', event.target.value)} /></label>
            </div>
            <button className="secondary full" type="button">{atp.moreOptions}</button>
          </aside>

          <section className="add-text-editor-card">
            <div className="add-text-toolbar">
              <div>
                <button type="button" onClick={() => setTextZoom((value) => clamp(value - 10, 50, 200))}>−</button>
                <strong>{textZoom}%</strong>
                <button type="button" onClick={() => setTextZoom((value) => clamp(value + 10, 50, 200))}>+</button>
              </div>
              <div>
                <button className={textToolMode === 'move' ? 'active' : ''} type="button" onClick={() => setTextToolMode('move')}>{atp.move}</button>
                <button className={textToolMode === 'text' ? 'active' : ''} type="button" onClick={addTextLayer}>T {atp.textTool}</button>
                <button type="button" disabled={!textHistory.length} onClick={undoTextEdit}>{atp.undo}</button>
                <button type="button" disabled={!textFuture.length} onClick={redoTextEdit}>{atp.redo}</button>
                <button type="button" onClick={resetTextSettings}>{atp.reset}</button>
              </div>
            </div>
            {previewUrl ? (
              <div className="add-text-stage">
                <img
                  ref={textPreviewImageRef}
                  src={previewUrl}
                  alt={atp.uploadAlt}
                  style={{ transform: `scale(${textPreviewScale})` }}
                  onLoad={(e) => setTextPreviewImgWidth((e.currentTarget as HTMLImageElement).getBoundingClientRect().width)}
                />
                {inactiveTextLayers.map((layer) => {
                  const layerSettings = settingsFromTextLayer(settings, layer)
                  const layerLines = layerSettings.text.trim() ? textLinesForImage(layerSettings.text) : []
                  return (
                    <button className="text-static-layer" key={layer.id} type="button" style={textLayerBoxStyle(layer)} onClick={() => selectTextLayer(layer)}>
                      <strong
                        className={`${layerSettings.textItalic ? 'italic' : ''} ${layerSettings.textUnderline ? 'underline' : ''}`}
                        style={textLayerTextStyle(layer)}
                      >
                        {layerLines.map((line) => <em key={line}>{line}</em>)}
                      </strong>
                    </button>
                  )
                })}
                <div ref={textSelectionBoxRef} className="text-selection-box" style={textBoxStyle} onPointerDown={(event) => handleTextBoxPointerDown(event)}>
                  <span onPointerDown={(event) => handleTextBoxPointerDown(event, 'resize', 'tl')}></span>
                  <span onPointerDown={(event) => handleTextBoxPointerDown(event, 'resize', 'tr')}></span>
                  <span onPointerDown={(event) => handleTextBoxPointerDown(event, 'resize', 'bl')}></span>
                  <span onPointerDown={(event) => handleTextBoxPointerDown(event, 'resize', 'br')}></span>
                  <strong
                    ref={textPreviewTextRef}
                    className={`${settings.textItalic ? 'italic' : ''} ${settings.textUnderline ? 'underline' : ''}`}
                    style={{
                      color: settings.textColor,
                      fontSize: `clamp(2rem, ${settings.textSize / 18}vw, 6.8rem)`,
                      fontWeight: settings.textBold ? 900 : 500,
                      textAlign: settings.textAlign,
                      textShadow: settings.textShadow ? `${settings.textShadowOffsetX}px ${settings.textShadowOffsetY}px ${settings.textShadowBlur}px ${settings.textShadowColor}` : 'none',
                      WebkitTextStroke: settings.textOutline ? `2px ${settings.textOutlineColor}` : '0',
                    }}
                  >
                    {textLines.map((line) => <em key={line}>{line}</em>)}
                  </strong>
                </div>
              </div>
            ) : (
              <div className="empty-preview">{atp.uploadEmpty}</div>
            )}
            <div className="add-text-meta">
              <span>{atp.original}: {settings.width || 1920} × {settings.height || 1280}</span>
              <span>{atp.current}: {settings.width || 1920} × {settings.height || 1280}</span>
            </div>
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <div className="add-text-bottom-bar">
              <button className="secondary" type="button" onClick={resetTextSettings}><HomeIcon name="rotate" /> {t.tool.reset}</button>
              <span></span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> {atp.downloadImage}</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> {atp.downloadImage}</button>
              )}
            </div>
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> {atp.editTip}</p>
          </section>

          <aside className="add-text-side-card">
            <section>
              <div className="areas-heading"><h2 className="add-text-side-title">{atp.presetsTitle}</h2><button type="button">{atp.viewAll}</button></div>
              <div className="text-preset-grid">
                {textPresets.map((preset) => (
                  <button key={preset} type="button" onClick={() => updateTextSetting('text', preset)}>{preset}</button>
                ))}
              </div>
            </section>
            <section>
              <h2 className="add-text-side-title">{atp.layersTitle} ({textLayers.length + 1})</h2>
              {textLayers.map((layer) => (
                <div className={`text-layer ${layer.id === activeTextLayerId ? 'active' : ''}`} key={layer.id} onClick={() => selectTextLayer(layer)}>
                  <span>T</span>
                  <strong>{layer.id === activeTextLayerId ? settings.text || atp.untitled : layer.text || atp.untitled}</strong>
                  <button type="button" onClick={(event) => { event.stopPropagation(); deleteTextLayer(layer.id) }}><HomeIcon name="trash" /></button>
                </div>
              ))}
              <div className="text-layer"><span><HomeIcon name="image" /></span><strong>{atp.background}</strong><small>{atp.locked}</small></div>
              <div className="layer-actions">
                <button type="button" onClick={addTextLayer}>{atp.addLayer}</button>
                <button type="button" onClick={() => deleteTextLayer(activeTextLayerId)}>{atp.deleteLayer}</button>
              </div>
            </section>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'add-watermark') {
    const updateWatermarkSetting = <K extends keyof ToolSettingsState>(key: K, value: ToolSettingsState[K]) => {
      clearOutputs()
      setSettings((current) => ({ ...current, [key]: value }))
    }
    const handleWatermarkImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
      const image = event.currentTarget.files?.[0]
      event.currentTarget.value = ''
      if (!image) return
      if (!image.type.startsWith('image/')) {
        setError('Please upload an image file for the watermark.')
        return
      }
      clearOutputs()
      const dataUrl = await fileToDataUrl(image)
      setSettings((current) => ({
        ...current,
        watermarkMode: 'image',
        watermarkImageDataUrl: dataUrl,
        watermarkImageName: image.name,
        textBoxWidthPercent: 34,
        textBoxHeightPercent: 18,
      }))
    }
    const resetWatermarkSettings = () => {
      clearOutputs()
      setTextZoom(100)
      setSettings((current) => ({
        ...current,
        text: 'NanoImage',
        textSize: 74,
        textColor: '#ffffff',
        textXPercent: 72,
        textYPercent: 78,
        textBoxWidthPercent: 44,
        textBoxHeightPercent: 18,
        textBold: true,
        textItalic: false,
        textUnderline: false,
        textShadow: true,
        textOutline: false,
        textAlign: 'center',
        textShadowColor: '#000000',
        textOutlineColor: '#ffffff',
        textShadowBlur: 12,
        textShadowOffsetX: 4,
        textShadowOffsetY: 4,
        watermarkMode: 'text',
        watermarkOpacity: 0.7,
      }))
    }
    const watermarkPresets = [
      { label: 'Bottom Right', x: 72, y: 78 },
      { label: 'Bottom Left', x: 28, y: 78 },
      { label: 'Top Right', x: 72, y: 22 },
      { label: 'Top Left', x: 28, y: 22 },
      { label: 'Center', x: 50, y: 50 },
      { label: 'None', x: 50, y: 50 },
    ]
    const watermarkLines = settings.text.trim() ? textLinesForImage(settings.text) : []
    const watermarkPreviewScale = textZoom / 100
    const updateWatermarkBox = (patch: Partial<Pick<ToolSettingsState, 'textXPercent' | 'textYPercent' | 'textBoxWidthPercent' | 'textBoxHeightPercent' | 'textSize'>>) => {
      clearOutputs()
      setSettings((current) => ({ ...current, ...patch }))
    }
    const handleWatermarkPointerDown = (
      event: ReactPointerEvent<HTMLElement>,
      mode: 'move' | 'resize' = 'move',
      corner: 'tl' | 'tr' | 'bl' | 'br' = 'br',
    ) => {
      const stage = event.currentTarget.closest('.add-text-stage') as HTMLElement | null
      if (!stage) return
      event.preventDefault()
      event.stopPropagation()
      clearOutputs()
      const rect = stage.getBoundingClientRect()
      const startX = event.clientX
      const startY = event.clientY
      const startLeft = settings.textXPercent - settings.textBoxWidthPercent / 2
      const startTop = settings.textYPercent - settings.textBoxHeightPercent / 2
      const startRight = settings.textXPercent + settings.textBoxWidthPercent / 2
      const startBottom = settings.textYPercent + settings.textBoxHeightPercent / 2
      const startSize = settings.textSize

      const moveWatermark = (moveEvent: PointerEvent) => {
        const deltaX = ((moveEvent.clientX - startX) / rect.width) * 100
        const deltaY = ((moveEvent.clientY - startY) / rect.height) * 100
        if (mode === 'move') {
          updateWatermarkBox({
            textXPercent: clamp(settings.textXPercent + deltaX, settings.textBoxWidthPercent / 2, 100 - settings.textBoxWidthPercent / 2),
            textYPercent: clamp(settings.textYPercent + deltaY, settings.textBoxHeightPercent / 2, 100 - settings.textBoxHeightPercent / 2),
          })
          return
        }

        let nextLeft = startLeft
        let nextTop = startTop
        let nextRight = startRight
        let nextBottom = startBottom
        if (corner.includes('l')) nextLeft = clamp(startLeft + deltaX, 0, startRight - 16)
        if (corner.includes('r')) nextRight = clamp(startRight + deltaX, startLeft + 16, 100)
        if (corner.includes('t')) nextTop = clamp(startTop + deltaY, 0, startBottom - 12)
        if (corner.includes('b')) nextBottom = clamp(startBottom + deltaY, startTop + 12, 100)
        const nextWidth = nextRight - nextLeft
        const nextHeight = nextBottom - nextTop
        updateWatermarkBox({
          textXPercent: nextLeft + nextWidth / 2,
          textYPercent: nextTop + nextHeight / 2,
          textBoxWidthPercent: nextWidth,
          textBoxHeightPercent: nextHeight,
          textSize: clamp(Math.round(startSize * (nextHeight / settings.textBoxHeightPercent)), 18, 180),
        })
      }

      const stopMove = () => {
        window.removeEventListener('pointermove', moveWatermark)
        window.removeEventListener('pointerup', stopMove)
      }

      window.addEventListener('pointermove', moveWatermark)
      window.addEventListener('pointerup', stopMove)
    }
    const watermarkBoxStyle = {
      left: `${settings.textXPercent}%`,
      top: `${settings.textYPercent}%`,
      width: `${settings.textBoxWidthPercent}%`,
      height: `${settings.textBoxHeightPercent}%`,
      transform: `translate(-50%, -50%) scale(${watermarkPreviewScale})`,
    } as CSSProperties

    return (
      <div className="workspace watermark-workspace add-text-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle"><HomeIcon name="watermark" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> {t.tool.free100}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="shield" /> {t.tool.staysPrivate}</span>
              <span><HomeIcon name="bolt" /> {t.tool.worksBrowser}</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h3><HomeIcon name="sparkle" /> {t.tool.tips}</h3>
            <p>✓ {t.tool.watermarkTip1}</p>
            <p>✓ {t.tool.watermarkTip2}</p>
            <p>✓ {t.tool.watermarkTip3}</p>
          </aside>
        </div>

        <form className="add-text-layout watermark-layout" onSubmit={process}>
          <aside className="settings-panel add-text-settings-panel watermark-settings-panel">
            <h3>Watermark Settings</h3>
            <div className="watermark-tabs">
              <button className={settings.watermarkMode === 'text' ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('watermarkMode', 'text')}>Tt Text Watermark</button>
              <button className={settings.watermarkMode === 'image' ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('watermarkMode', 'image')}><HomeIcon name="image" /> Image Watermark</button>
            </div>
            {settings.watermarkMode === 'text' ? (
              <>
                <label>
                  Text
                  <textarea value={settings.text} onChange={(event) => updateWatermarkSetting('text', event.target.value)} />
                </label>
                <label>
                  Font
                  <select>
                    <option>Pacifico</option>
                    <option>Inter</option>
                    <option>Serif</option>
                  </select>
                </label>
                <label>
                  Size <span>{settings.textSize} px</span>
                  <input min="18" max="180" step="1" type="range" value={settings.textSize} onChange={(event) => updateWatermarkSetting('textSize', Number(event.target.value))} />
                </label>
                <label>
                  Color
                  <input type="color" value={settings.textColor} onChange={(event) => updateWatermarkSetting('textColor', event.target.value)} />
                </label>
              </>
            ) : (
              <label className="image-watermark-upload">
                Image
                <input type="file" accept="image/*" onChange={handleWatermarkImageUpload} />
                <span><HomeIcon name="upload" /> Upload Watermark Image</span>
                <small>{settings.watermarkImageName || 'PNG, JPG, WebP, or SVG-style image'}</small>
              </label>
            )}
            <label>
              Opacity <span>{Math.round(settings.watermarkOpacity * 100)}%</span>
              <input min="0.1" max="1" step="0.05" type="range" value={settings.watermarkOpacity} onChange={(event) => updateWatermarkSetting('watermarkOpacity', Number(event.target.value))} />
            </label>
            {settings.watermarkMode === 'text' && (
              <>
                <div className="text-style-row">
                  <button className={settings.textBold ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('textBold', !settings.textBold)}>B</button>
                  <button className={settings.textItalic ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('textItalic', !settings.textItalic)}><em>I</em></button>
                  <button className={settings.textUnderline ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('textUnderline', !settings.textUnderline)}><u>U</u></button>
                  <button className={settings.textAlign === 'left' ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('textAlign', 'left')}>≡</button>
                  <button className={settings.textAlign === 'center' ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('textAlign', 'center')}>≣</button>
                  <button className={settings.textAlign === 'right' ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('textAlign', 'right')}>≡</button>
                </div>
                <div className="text-effects-card">
                  <strong>Effects</strong>
                  <label className="toggle-row metadata-toggle"><input type="checkbox" checked={settings.textShadow} onChange={(event) => updateWatermarkSetting('textShadow', event.target.checked)} /> Shadow <input type="color" value={settings.textShadowColor} onChange={(event) => updateWatermarkSetting('textShadowColor', event.target.value)} /></label>
                  <label>Blur <input min="0" max="24" type="range" value={settings.textShadowBlur} onChange={(event) => updateWatermarkSetting('textShadowBlur', Number(event.target.value))} /></label>
                  <label>Offset X <input min="-24" max="24" type="range" value={settings.textShadowOffsetX} onChange={(event) => updateWatermarkSetting('textShadowOffsetX', Number(event.target.value))} /></label>
                  <label>Offset Y <input min="-24" max="24" type="range" value={settings.textShadowOffsetY} onChange={(event) => updateWatermarkSetting('textShadowOffsetY', Number(event.target.value))} /></label>
                  <label className="toggle-row metadata-toggle"><input type="checkbox" checked={settings.textOutline} onChange={(event) => updateWatermarkSetting('textOutline', event.target.checked)} /> Outline <input type="color" value={settings.textOutlineColor} onChange={(event) => updateWatermarkSetting('textOutlineColor', event.target.value)} /></label>
                </div>
              </>
            )}
            <button className="secondary full" type="button">More Options⌄</button>
          </aside>

          <section className="add-text-editor-card watermark-preview-card">
            <div className="add-text-toolbar">
              <div>
                <button type="button" onClick={() => setTextZoom((value) => clamp(value - 10, 50, 200))}>−</button>
                <strong>{textZoom}%</strong>
                <button type="button" onClick={() => setTextZoom((value) => clamp(value + 10, 50, 200))}>+</button>
              </div>
              <div>
                <button className={textToolMode === 'move' ? 'active' : ''} type="button" onClick={() => setTextToolMode('move')}>Move</button>
                <button className={textToolMode === 'text' ? 'active' : ''} type="button" onClick={() => updateWatermarkSetting('text', settings.text || 'NanoImage')}>T Text</button>
                <button type="button" onClick={resetWatermarkSettings}>Reset</button>
              </div>
            </div>
            {previewUrl ? (
              <div className="add-text-stage watermark-stage">
                <img
                  ref={textPreviewImageRef}
                  src={previewUrl}
                  alt="Add watermark preview"
                  style={{ transform: `scale(${watermarkPreviewScale})` }}
                  onLoad={(event) => setTextPreviewImgWidth((event.currentTarget as HTMLImageElement).getBoundingClientRect().width)}
                />
                <div ref={textSelectionBoxRef} className="text-selection-box" style={watermarkBoxStyle} onPointerDown={(event) => handleWatermarkPointerDown(event)}>
                  <span onPointerDown={(event) => handleWatermarkPointerDown(event, 'resize', 'tl')}></span>
                  <span onPointerDown={(event) => handleWatermarkPointerDown(event, 'resize', 'tr')}></span>
                  <span onPointerDown={(event) => handleWatermarkPointerDown(event, 'resize', 'bl')}></span>
                  <span onPointerDown={(event) => handleWatermarkPointerDown(event, 'resize', 'br')}></span>
                  {settings.watermarkMode === 'image' ? (
                    settings.watermarkImageDataUrl ? (
                      <img
                        ref={watermarkImageOverlayRef}
                        className="watermark-image-overlay"
                        src={settings.watermarkImageDataUrl}
                        alt={settings.watermarkImageName || 'Watermark image'}
                        style={{ opacity: settings.watermarkOpacity }}
                      />
                    ) : (
                      <strong className="watermark-upload-placeholder"><em>Upload image</em></strong>
                    )
                  ) : (
                    <strong
                      ref={textPreviewTextRef}
                      className={`${settings.textItalic ? 'italic' : ''} ${settings.textUnderline ? 'underline' : ''}`}
                      style={{
                        color: settings.textColor,
                        fontSize: `clamp(1.4rem, ${settings.textSize / 18}vw, 5.8rem)`,
                        fontWeight: settings.textBold ? 900 : 500,
                        opacity: settings.watermarkOpacity,
                        textAlign: settings.textAlign,
                        textShadow: settings.textShadow ? `${settings.textShadowOffsetX}px ${settings.textShadowOffsetY}px ${settings.textShadowBlur}px ${settings.textShadowColor}` : 'none',
                        WebkitTextStroke: settings.textOutline ? `2px ${settings.textOutlineColor}` : '0',
                      }}
                    >
                      {watermarkLines.map((line) => <em key={line}>{line}</em>)}
                    </strong>
                  )}
                </div>
              </div>
            ) : (
              <div className="empty-preview">Upload an image to add a watermark.</div>
            )}
            <div className="add-text-meta">
              <span>Original: {settings.width || 1920} × {settings.height || 1280}</span>
              <span>Current: {settings.width || 1920} × {settings.height || 1280}</span>
            </div>
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <div className="add-text-bottom-bar watermark-bottom-bar">
              <button className="secondary" type="button" onClick={resetWatermarkSettings}><HomeIcon name="rotate" /> Reset</button>
              <span></span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> Download Image</button>
              )}
            </div>
            <p className="privacy-note add-text-tip"><HomeIcon name="lock" /> Your image is processed in your browser. It never leaves your device.</p>
          </section>

          <aside className="add-text-side-card watermark-side-card">
            <section>
              <div className="areas-heading"><h3>Presets</h3><button type="button">View all</button></div>
              <div className="text-preset-grid watermark-preset-grid">
                {watermarkPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      if (preset.label === 'None') {
                        setSettings((current) => ({ ...current, text: '', watermarkImageDataUrl: '', watermarkImageName: '' }))
                      }
                      else setSettings((current) => ({ ...current, text: current.text || 'NanoImage', textXPercent: preset.x, textYPercent: preset.y }))
                      clearOutputs()
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </section>
            <section>
              <h3>Layers</h3>
              <div className="text-layer active">
                <span>{settings.watermarkMode === 'image' ? <HomeIcon name="image" /> : 'T'}</span>
                <strong>{settings.watermarkMode === 'image' ? settings.watermarkImageName || 'No image watermark' : settings.text || 'No watermark'}</strong>
                <button
                  type="button"
                  onClick={() => {
                    if (settings.watermarkMode === 'image') setSettings((current) => ({ ...current, watermarkImageDataUrl: '', watermarkImageName: '' }))
                    else updateWatermarkSetting('text', '')
                    clearOutputs()
                  }}
                >
                  <HomeIcon name="trash" />
                </button>
              </div>
              <div className="text-layer"><span><HomeIcon name="image" /></span><strong>Background</strong><small>Locked</small></div>
            </section>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'flip-image') {
    const fp = t.flipPage
    const flipMode = settings.flipX && settings.flipY
      ? 'Both'
      : settings.flipY
        ? 'Vertical'
        : 'Horizontal'
    const flipModeLabel =
      flipMode === 'Both' ? fp.flipBoth : flipMode === 'Vertical' ? fp.flipVertical : fp.flipHorizontal

    return (
      <div className="workspace flip-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle" aria-hidden="true"><HomeIcon name="flip" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="lock" /> {t.tool.staysPrivate}</span>
              <span><HomeIcon name="smile" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="bolt" /> {t.tool.alwaysFree}</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <p className="flip-tips-title" style={{ display: 'flex', alignItems: 'center', gap: '.55rem', color: '#24315f' }}><HomeIcon name="sparkle" /> {fp.whatIsTitle}</p>
            <p>{fp.whatIsLead}</p>
            <p>✓ {fp.useCase1}</p>
            <p>✓ {fp.useCase2}</p>
            <p>✓ {fp.useCase3}</p>
            <p>✓ {fp.useCase4}</p>
          </aside>
        </div>
        <form className="flip-layout" onSubmit={process}>
          <aside className="settings-panel flip-settings-panel">
            <p className="flip-panel-label">{fp.optionsTitle}</p>
            <span className="field-title">{fp.flipMode}</span>
            <div className="flip-mode-grid">
              <button
                className={settings.flipX && !settings.flipY ? 'active' : ''}
                type="button"
                onClick={() => setSettings((value) => ({ ...value, flipX: true, flipY: false }))}
              >
                <HomeIcon name="flip" /> {fp.flipHorizontal}
              </button>
              <button
                className={!settings.flipX && settings.flipY ? 'active' : ''}
                type="button"
                onClick={() => setSettings((value) => ({ ...value, flipX: false, flipY: true }))}
              >
                <HomeIcon name="flip" /> {fp.flipVertical}
              </button>
              <button
                className={settings.flipX && settings.flipY ? 'active' : ''}
                type="button"
                onClick={() => setSettings((value) => ({ ...value, flipX: true, flipY: true }))}
              >
                <HomeIcon name="flip" /> {fp.flipBoth}
              </button>
            </div>
            <div className="flip-description">
              <strong>{fp.description}</strong>
              <p>
                {flipMode === 'Horizontal' && fp.descHorizontal}
                {flipMode === 'Vertical' && fp.descVertical}
                {flipMode === 'Both' && fp.descBoth}
              </p>
            </div>
            <div className="flip-more-options">
              <p className="flip-panel-label">{fp.moreOptions}</p>
              <label className="toggle-row metadata-toggle">
                <input type="checkbox" defaultChecked />
                {fp.keepExif}
              </label>
            </div>
          </aside>

          <section className="flip-preview-card">
            <div className="flip-compare-grid">
              <figure>
                <div className="figure-top"><strong>{fp.originalImage}</strong>{settings.width > 0 && <em>{settings.width} × {settings.height}</em>}</div>
                {previewUrl ? <img src={previewUrl} alt={fp.originalAlt} /> : <div className="empty-preview">{fp.uploadToFlip}</div>}
              </figure>
              <div className="flip-arrow" aria-hidden="true">→</div>
              <figure>
                <div className="figure-top"><strong>{fp.flippedImage} ({flipModeLabel})</strong>{settings.width > 0 && <em>{settings.width} × {settings.height}</em>}</div>
                {previewUrl ? (
                  <img
                    src={processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl}
                    alt={fp.flippedAlt}
                    style={{ transform: processed ? 'none' : `scaleX(${settings.flipX ? -1 : 1}) scaleY(${settings.flipY ? -1 : 1})` }}
                  />
                ) : (
                  <div className="empty-preview">{fp.flippedPlaceholder}</div>
                )}
              </figure>
            </div>
            {(processed || status) && (
              <div className="flip-success">
                <span aria-hidden="true"><HomeIcon name="shield" /></span>
                <div><strong>{fp.ready}</strong><p>{status || fp.flippedSuccess}</p></div>
                <HomeIcon name="smile" aria-hidden="true" />
              </div>
            )}
            {error && <p className="error">{error}</p>}
            <div className="flip-bottom-bar">
              <button className="secondary" type="button" onClick={resetTool}><HomeIcon name="rotate" /> {t.tool.reset}</button>
              <span></span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> {fp.downloadFlipped}</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> {fp.downloadFlipped}</button>
              )}
            </div>
            <p className="privacy-note flip-privacy"><HomeIcon name="lock" /> {fp.privacyNote}</p>
          </section>

          <aside className="flip-side-card">
            <section>
              <p className="flip-formats-title" style={{ margin: 0 }}>{fp.formatsTitle}</p>
              {[
                [fp.formatJpg, fp.formatJpgNote, 'JPG'],
                [fp.formatPng, fp.formatPngNote, 'PNG'],
                [fp.formatWebp, fp.formatWebpNote, 'WebP'],
                [fp.formatGif, fp.formatGifNote, 'GIF'],
              ].map(([format, note, icon]) => (
                <div className="format-support-item" key={format}>
                  <span aria-label={`${fp.formatIconAlt}: ${icon}`}>{icon}</span>
                  <div><strong>{format}</strong><small>{note}</small></div>
                </div>
              ))}
            </section>
            <div className="flip-tip-card">
              <HomeIcon name="sparkle" aria-hidden="true" />
              <p>{fp.tip}</p>
            </div>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'rotate-image') {
    const resetRotateSettings = () => {
      clearOutputs()
      setRotateZoom(100)
      setSettings((value) => ({
        ...value,
        angle: 90,
        flipX: false,
        flipY: false,
        background: '#ffffff',
      }))
    }

    const updateRotateAngle = (angle: number) => {
      clearOutputs()
      setSettings((value) => ({ ...value, angle }))
    }

    const updateRotateZoom = (delta: number) => {
      setRotateZoom((value) => clamp(value + delta, 50, 200))
    }

    const previewScale = rotateZoom / 100

    return (
      <div className="workspace rotate-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle"><HomeIcon name="rotate" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> {t.tool.free100}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="shield" /> {t.tool.staysPrivate}</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h3><HomeIcon name="sparkle" /> {t.tool.tipsForTool}</h3>
            {tool.tips.map((tip) => <p key={tip}>✓ {tip}</p>)}
          </aside>
        </div>
        <form className="rotate-layout" onSubmit={process}>
          <aside className="settings-panel rotate-settings-panel">
            <p className="rotate-panel-label">Rotate</p>
            <div className="angle-buttons">
              <button className={settings.angle === -90 ? 'active' : ''} type="button" onClick={() => updateRotateAngle(-90)}><HomeIcon name="rotate" /> 90° Left</button>
              <button className={settings.angle === 90 ? 'active' : ''} type="button" onClick={() => updateRotateAngle(90)}><HomeIcon name="rotate" /> 90° Right</button>
              <button className={settings.angle === 180 ? 'active' : ''} type="button" onClick={() => updateRotateAngle(180)}><HomeIcon name="rotate" /> 180°</button>
            </div>
            <label>
              Angle {settings.angle}°
              <input min="-180" max="180" step="1" type="range" value={settings.angle} onChange={(event) => updateRotateAngle(Number(event.target.value))} />
            </label>
            <div className="angle-scale"><span>-180°</span><span>180°</span></div>
            <p className="rotate-panel-label">Flip</p>
            <div className="flip-buttons">
              <button className={settings.flipX ? 'active' : ''} type="button" onClick={() => { clearOutputs(); setSettings((value) => ({ ...value, flipX: !value.flipX })) }}><HomeIcon name="flip" /> Flip Horizontal</button>
              <button className={settings.flipY ? 'active' : ''} type="button" onClick={() => { clearOutputs(); setSettings((value) => ({ ...value, flipY: !value.flipY })) }}><HomeIcon name="flip" /> Flip Vertical</button>
            </div>
            <p className="rotate-panel-label">Canvas Options</p>
            <label>
              Fit
              <select>
                <option>Expand Canvas (Keep All)</option>
                <option>Crop to original size</option>
              </select>
            </label>
            <label>
              Background
              <input type="color" value={settings.background} onChange={(event) => { clearOutputs(); setSettings((value) => ({ ...value, background: event.target.value })) }} />
            </label>
            <button className="secondary full" type="button" onClick={resetRotateSettings}><HomeIcon name="rotate" /> Reset All</button>
          </aside>

          <section className="rotate-preview-card">
            <div className="rotate-preview-toolbar">
              <div>
                <span>Zoom</span>
                <button type="button" onClick={() => updateRotateZoom(-10)}>−</button>
                <strong>{rotateZoom}%</strong>
                <button type="button" onClick={() => updateRotateZoom(10)}>+</button>
                <button type="button" onClick={() => setRotateZoom(100)}>Fit</button>
              </div>
              <div><span>Compare</span><label className="switch"><input type="checkbox" defaultChecked /><i></i></label><button type="button" onClick={resetRotateSettings}><HomeIcon name="rotate" /> Reset</button></div>
            </div>
            {previewUrl ? (
              <div className="rotate-compare">
                <figure>
                  <span>Original</span>
                  <img src={previewUrl} alt="Original preview" style={{ transform: `scale(${previewScale})` }} />
                </figure>
                <figure style={{ backgroundColor: settings.background }}>
                  <span>Rotated ({settings.angle}°)</span>
                  <img
                    src={processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl}
                    alt="Rotated preview"
                    style={{ transform: processed ? `scale(${previewScale})` : `rotate(${settings.angle}deg) scale(${previewScale}) scaleX(${settings.flipX ? -1 : 1}) scaleY(${settings.flipY ? -1 : 1})` }}
                  />
                </figure>
                <div className="compare-handle">↔</div>
              </div>
            ) : (
              <div className="empty-preview">Upload an image to rotate.</div>
            )}
            <div className="rotate-bottom-bar">
              <span className="privacy-note"><HomeIcon name="lock" /> Your image is processed in your browser. It never leaves your device.</span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Rotated Image</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> Download Rotated Image</button>
              )}
            </div>
          </section>

        </form>
      </div>
    )
  }

  if (tool.slug === 'image-collage') {
    const ic = t.collageImagePage
    const collageTemplates = [
      ['classic', 'Classic'],
      ['polaroid', 'Polaroid'],
      ['scrapbook', 'Scrapbook'],
      ['film', 'Film Strip'],
      ['paper', 'Paper'],
      ['square', 'Square'],
      ['creative', 'Creative'],
      ['minimal', 'Minimal'],
      ['mood', 'Mood Board'],
    ] as const
    const canvasSizes = [
      [1080, 1080, 'Instagram Post (1080 × 1080)'],
      [1080, 1350, 'Portrait (1080 × 1350)'],
      [1200, 900, 'Landscape (1200 × 900)'],
      [1920, 1080, 'Wide (1920 × 1080)'],
    ] as const
    const addCollageFiles = (nextFiles: File[]) => {
      const accepted = nextFiles.filter((file) => file.type.startsWith('image/')).slice(0, 20 - files.length)
      if (!accepted.length) return
      clearOutputs()
      const nextCount = files.length + accepted.length
      setFiles((current) => [...current, ...accepted].slice(0, 20))
      setCollageItems(createCollageItems(nextCount, collageOptions.template))
      if (!previewUrl) setPreviewUrl(URL.createObjectURL(accepted[0]))
    }
    const removeCollageFile = (index: number) => {
      clearOutputs()
      const nextCount = Math.max(0, files.length - 1)
      setFiles((current) => current.filter((_, currentIndex) => currentIndex !== index))
      setCollageItems(createCollageItems(nextCount, collageOptions.template))
      setActiveCollageItemId(nextCount ? 1 : null)
    }
    const updateCollageOptions = (patch: Partial<CollageOptions>) => {
      clearOutputs()
      setCollageOptions((current) => ({ ...current, ...patch }))
    }
    const selectTemplate = (template: CollageOptions['template']) => {
      clearOutputs()
      setCollageOptions((current) => ({ ...current, template }))
      setCollageItems(createCollageItems(files.length, template))
      setActiveCollageItemId(files.length ? 1 : null)
    }
    const startCollageDrag = (event: ReactPointerEvent<HTMLElement>, item: CollageItem) => {
      if (!['select', 'move'].includes(collageToolMode)) return
      const stage = event.currentTarget.closest('.collage-canvas') as HTMLElement | null
      if (!stage) return
      event.preventDefault()
      setActiveCollageItemId(item.id)
      const rect = stage.getBoundingClientRect()
      const startX = event.clientX
      const startY = event.clientY
      const initial = { x: item.x, y: item.y }
      const onMove = (moveEvent: PointerEvent) => {
        const dx = ((moveEvent.clientX - startX) / rect.width) * 100
        const dy = ((moveEvent.clientY - startY) / rect.height) * 100
        setCollageItems((current) => current.map((currentItem) => currentItem.id === item.id
          ? { ...currentItem, x: clamp(initial.x + dx, 0, 100 - currentItem.width), y: clamp(initial.y + dy, 0, 100 - currentItem.height) }
          : currentItem))
      }
      const onUp = () => {
        clearOutputs()
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
      }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp, { once: true })
    }
    const activeItem = collageItems.find((item) => item.id === activeCollageItemId)

    return (
      <div className="workspace collage-workspace">
        <form className="collage-layout" onSubmit={process}>
          <aside className="collage-left-card">
            <Breadcrumbs current={localName} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="grid" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <h3 className="pixelate-help-intro-title">{ic.heroTitle}</h3>
            <p className="pixelate-help-intro">{ic.heroIntro}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> {t.tool.free100}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
              <span><HomeIcon name="shield" /> {t.tool.staysPrivate}</span>
            </div>
            <div className="meme-tabs collage-tabs">
              <button className="active" type="button"><HomeIcon name="image" /> Images</button>
              <button type="button" onClick={() => setCollageToolMode('text')}><HomeIcon name="text" /> Text</button>
              <button type="button" onClick={() => setCollageToolMode('sticker')}><HomeIcon name="smile" /> Stickers</button>
              <button type="button"><HomeIcon name="palette" /> Background</button>
            </div>
            <div className="areas-heading"><p className="collage-panel-title">Images ({files.length})</p><button type="button" onClick={() => { clearOutputs(); setFiles([]); setPreviewUrl(''); setCollageItems([]) }}>Clear All</button></div>
            <div className="collage-thumb-grid">
              {files.map((file, index) => <button className={collageItems.some((item) => item.fileIndex === index && item.id === activeCollageItemId) ? 'active' : ''} key={`${file.name}-${index}`} type="button" onClick={() => setActiveCollageItemId(collageItems.find((item) => item.fileIndex === index)?.id ?? null)}><img src={filePreviewUrls[index]} alt="" /><span onClick={(event) => { event.stopPropagation(); removeCollageFile(index) }}>×</span></button>)}
            </div>
            <UploadButton label="Add More Images" multiple onFiles={addCollageFiles} />
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> Tip: Drag images on the canvas to position them. Double click to edit text.</p>
            <button className="secondary full" type="button" onClick={resetTool}><HomeIcon name="rotate" /> Reset</button>
          </aside>

          <section className="collage-editor-card">
            <div className="collage-toolbar">
              <div>{(['select', 'move', 'text', 'sticker'] as const).map((mode) => <button className={collageToolMode === mode ? 'active' : ''} key={mode} type="button" onClick={() => setCollageToolMode(mode)}>{mode === 'select' ? 'Select' : mode === 'move' ? 'Move' : mode === 'text' ? 'Text' : 'Sticker'}</button>)}<button type="button" onClick={() => activeItem && setCollageItems((current) => current.filter((item) => item.id !== activeItem.id))}><HomeIcon name="trash" /> Delete</button></div>
              <div><button type="button">Undo</button><button disabled type="button">Redo</button></div>
            </div>
            <div className="collage-canvas-wrap">
              <div className="collage-canvas" style={{ aspectRatio: `${collageOptions.width} / ${collageOptions.height}`, background: collageOptions.background, transform: `scale(${collageZoom / 100})` }}>
                {collageItems.map((item) => {
                  const preview = filePreviewUrls[item.fileIndex]
                  if (!preview) return null
                  return <figure className={item.id === activeCollageItemId ? 'active' : ''} key={item.id} onPointerDown={(event) => startCollageDrag(event, item)} style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.width}%`, height: `${item.height}%`, transform: `rotate(${item.rotate}deg)`, borderRadius: `${collageOptions.radius}px` }}><img src={preview} alt="" /></figure>
                })}
                {collageOptions.text && <strong className="collage-caption">{collageOptions.text}</strong>}
                {collageOptions.sticker && <span className="collage-sticker one">{collageOptions.sticker}</span>}
                <span className="collage-sticker two">♡</span>
              </div>
            </div>
            <div className="collage-bottom-tools"><span><HomeIcon name="bolt" /> Drag to move</span><div><button type="button" onClick={() => setCollageZoom((value) => clamp(value - 10, 50, 180))}>−</button><strong>{collageZoom}%</strong><button type="button" onClick={() => setCollageZoom((value) => clamp(value + 10, 50, 180))}>+</button><button type="button" onClick={() => setCollageZoom(100)}>Fit</button></div><button type="button">⛶</button></div>
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> All changes are saved in your browser. Your images are safe and private.</p>
          </section>

          <aside className="collage-right-card">
            <div className="meme-tabs collage-side-tabs"><button className="active" type="button">Templates</button><button type="button">Layouts</button></div>
            <div className="collage-template-grid">{collageTemplates.map(([template, label]) => <button className={collageOptions.template === template ? 'active' : ''} key={template} type="button" onClick={() => selectTemplate(template)}><span>{label.slice(0, 1)}</span><small>{label}</small></button>)}</div>
            <section className="collage-settings-section">
              <p className="collage-panel-title">Canvas Settings</p>
              <label>Canvas Size<select value={`${collageOptions.width}x${collageOptions.height}`} onChange={(event) => { const [width, height] = event.target.value.split('x').map(Number); updateCollageOptions({ width, height }) }}>{canvasSizes.map(([width, height, label]) => <option key={label} value={`${width}x${height}`}>{label}</option>)}</select></label>
              <div className="dimension-grid"><label>Width<input type="number" value={collageOptions.width} onChange={(event) => updateCollageOptions({ width: Number(event.target.value) })} /></label><label>Height<input type="number" value={collageOptions.height} onChange={(event) => updateCollageOptions({ height: Number(event.target.value) })} /></label></div>
              <label>Background<input type="color" value={collageOptions.background} onChange={(event) => updateCollageOptions({ background: event.target.value })} /></label>
              <label>Spacing <span>{collageOptions.spacing}px</span><input min="0" max="60" type="range" value={collageOptions.spacing} onChange={(event) => updateCollageOptions({ spacing: Number(event.target.value) })} /></label>
              <label>Corner Radius <span>{collageOptions.radius}px</span><input min="0" max="40" type="range" value={collageOptions.radius} onChange={(event) => updateCollageOptions({ radius: Number(event.target.value) })} /></label>
              <label>Caption<input value={collageOptions.text} onChange={(event) => updateCollageOptions({ text: event.target.value })} /></label>
            </section>
            <section className="collage-layers"><p className="collage-panel-title">Layers</p>{collageItems.slice().reverse().map((item) => <button className={item.id === activeCollageItemId ? 'active' : ''} key={item.id} type="button" onClick={() => setActiveCollageItemId(item.id)}><span>Image {item.fileIndex + 1}</span><HomeIcon name="search" /></button>)}</section>
          </aside>

          <div className="collage-download-bar">
            <span></span>
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Collage</a> : <button className="primary" type="submit"><HomeIcon name="download" /> Download Collage</button>}
          </div>
        </form>
      </div>
    )
  }

  if (tool.slug === 'gif-maker') {
    const gm = t.gifMakerPage
    const gifCanvasSizes = [
      [1280, 720, '1280 × 720 (16:9)'],
      [1080, 1080, '1080 × 1080 (1:1)'],
      [1080, 1350, '1080 × 1350 (4:5)'],
      [720, 1280, '720 × 1280 (9:16)'],
    ] as const
    const addGifFiles = (nextFiles: File[]) => {
      const accepted = nextFiles.filter((file) => file.type.startsWith('image/')).slice(0, 50 - files.length)
      if (!accepted.length) return
      clearOutputs()
      setFiles((current) => [...current, ...accepted].slice(0, 50))
      if (!previewUrl) setPreviewUrl(URL.createObjectURL(accepted[0]))
    }
    const removeGifFile = (index: number) => {
      clearOutputs()
      setFiles((current) => current.filter((_, currentIndex) => currentIndex !== index))
      setGifPreviewIndex((current) => clamp(Math.min(current, files.length - 2), 0, Math.max(0, files.length - 2)))
    }
    const moveGifFile = (index: number, direction: -1 | 1) => {
      const target = index + direction
      if (target < 0 || target >= files.length) return
      clearOutputs()
      setFiles((current) => {
        const next = [...current]
        const [item] = next.splice(index, 1)
        next.splice(target, 0, item)
        return next
      })
      setGifPreviewIndex(target)
    }
    const updateGifOptions = (patch: Partial<GifOptions>) => {
      clearOutputs()
      setGifOptions((current) => ({ ...current, ...patch }))
    }
    return (
      <div className="workspace gif-workspace">
        <div className="compress-top gif-top-grid">
          <section className="compress-title-card">
            <Breadcrumbs current={breadcrumbLabel ?? localName} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="image" /></span>
            <h1>{enHero?.h1 ?? localName}</h1>
            {enHero?.lineHtml ? <p dangerouslySetInnerHTML={{ __html: enHero.lineHtml }} /> : <p>{localSubtitle}</p>}
            <h3 className="pixelate-help-intro-title">{gm.heroTitle}</h3>
            <p className="pixelate-help-intro">{gm.heroIntro}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> {t.tool.free100}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="shield" /> {t.tool.staysPrivate}</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple hintSmall={t.tool.orDragGifImages} onFiles={handleFiles} />
        </div>

        <form className="gif-layout" onSubmit={process}>
          <aside className="gif-frames-card">
            <div className="areas-heading"><h2>Images ({files.length})</h2><button type="button" onClick={() => { clearOutputs(); setFiles([]); setPreviewUrl(''); setGifPreviewIndex(0) }}>Clear All</button></div>
            <div className="gif-frame-list">
              {files.map((file, index) => <div className={index === gifPreviewIndex ? 'gif-frame-row active' : 'gif-frame-row'} key={`${file.name}-${index}`} onClick={() => setGifPreviewIndex(index)}><button type="button" onClick={(event) => { event.stopPropagation(); moveGifFile(index, -1) }}>⌃</button><img src={filePreviewUrls[index]} alt="" /><span>{index + 1}</span><div><strong>{file.name}</strong><small>Frame {index + 1}</small></div><button type="button" onClick={(event) => { event.stopPropagation(); removeGifFile(index) }}>×</button></div>)}
              {!files.length && <div className="convert-empty-list">Upload images to build your GIF.</div>}
            </div>
            <UploadButton label="Add More Images" multiple onFiles={addGifFiles} />
            <button className="secondary full" type="button" onClick={resetTool}><HomeIcon name="rotate" /> Reset</button>
          </aside>

          <section className="gif-preview-card">
            <div className="gif-preview-toolbar"><h2>Preview</h2><div><span>Preview Speed</span><select value={gifSpeed} onChange={(event) => setGifSpeed(Number(event.target.value))}><option value={0.5}>0.5x</option><option value={1}>1x</option><option value={1.5}>1.5x</option><option value={2}>2x</option></select><button type="button" onClick={() => setGifPlaying(true)}><HomeIcon name="play" /> Play</button><button type="button" onClick={() => setGifPlaying(false)}>Pause</button></div></div>
            {files.length ? (
              <>
                <div className="gif-stage" style={{ aspectRatio: `${gifOptions.width} / ${gifOptions.height}` }}><img src={filePreviewUrls[gifPreviewIndex] ?? filePreviewUrls[0]} alt="GIF preview frame" /></div>
                <strong className="gif-counter">{gifPreviewIndex + 1} / {files.length}</strong>
                <div className="gif-timeline">
                  <button type="button" onClick={() => setGifPreviewIndex((index) => clamp(index - 1, 0, files.length - 1))}>‹</button>
                  <div>{files.map((file, index) => <button className={index === gifPreviewIndex ? 'active' : ''} key={`${file.name}-thumb-${index}`} type="button" onClick={() => setGifPreviewIndex(index)}><img src={filePreviewUrls[index]} alt="" /><small>{gifOptions.frameDuration}s</small></button>)}</div>
                  <button type="button" onClick={() => setGifPreviewIndex((index) => (index + 1) % files.length)}>›</button>
                </div>
              </>
            ) : <div className="empty-preview">Upload images to preview your GIF.</div>}
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> Tip: Drag order is represented by the frame list. Use the arrow controls to reorder images.</p>
          </section>

          <aside className="gif-settings-card">
            <h2>GIF Settings</h2>
            <label>Canvas Size<select value={`${gifOptions.width}x${gifOptions.height}`} onChange={(event) => {
              const [width, height] = event.target.value.split('x').map(Number)
              updateGifOptions({ width, height })
            }}>{gifCanvasSizes.map(([width, height, label]) => <option key={label} value={`${width}x${height}`}>{label}</option>)}</select></label>
            <div className="dimension-grid"><label><input type="number" value={gifOptions.width} onChange={(event) => updateGifOptions({ width: Number(event.target.value) })} /> px</label><label><input type="number" value={gifOptions.height} onChange={(event) => updateGifOptions({ height: Number(event.target.value) })} /> px</label></div>
            <label>Fit<select value={gifOptions.fit} onChange={(event) => updateGifOptions({ fit: event.target.value as GifOptions['fit'] })}><option value="contain">Contain (Fit whole image)</option><option value="cover">Cover (Fill canvas)</option><option value="stretch">Stretch</option></select></label>
            <label>Frame Duration <span>{gifOptions.frameDuration}s</span><input min="0.1" max="2" step="0.1" type="range" value={gifOptions.frameDuration} onChange={(event) => updateGifOptions({ frameDuration: Number(event.target.value) })} /></label>
            <label>Loop<select value={gifOptions.loop} onChange={(event) => updateGifOptions({ loop: event.target.value as GifOptions['loop'] })}><option value="forever">Forever</option><option value="once">Once</option><option value="three">3 times</option></select></label>
            <h2>Advanced Options</h2>
            <label>Quality / Colors <span>{gifOptions.colors}</span><input min="32" max="256" step="32" type="range" value={gifOptions.colors} onChange={(event) => updateGifOptions({ colors: Number(event.target.value) })} /></label>
            <label className="checkbox-row"><input type="checkbox" checked={gifOptions.optimize} onChange={(event) => updateGifOptions({ optimize: event.target.checked })} /> Optimize for smaller file size</label>
          </aside>

          <div className="gif-bottom-bar">
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> GIFs with more frames or higher quality may result in larger file sizes.</p>
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download GIF</a> : <button className="primary" type="submit"><HomeIcon name="download" /> Create GIF</button>}
          </div>
        </form>
      </div>
    )
  }

  if (tool.slug === 'meme-generator') {
    const memeTemplates = [
      ['Success Kid', '#9ee7ff', '💪'],
      ['Distracted Boyfriend', '#ffd3b6', '👀'],
      ['Drake Hotline Bling', '#ffc233', '🎧'],
      ['Change My Mind', '#d8d2c4', '☕'],
      ['Woman Yelling at Cat', '#f5c6d6', '🐱'],
      ['Expanding Brain', '#182052', '🧠'],
      ['Mocking SpongeBob', '#f9dc5c', '🧽'],
      ['This is Fine', '#ff9d3d', '🔥'],
      ['Hide The Pain Harold', '#e7eef8', '🙂'],
    ] as const
    const memeFontStack = settings.memeFont === 'Impact'
      ? 'Impact, "Arial Black", sans-serif'
      : settings.memeFont === 'Anton'
        ? 'Anton, Impact, sans-serif'
        : `"${settings.memeFont}", Impact, sans-serif`
    const memeTextStyle: CSSProperties = {
      color: settings.textColor,
      fontFamily: memeFontStack,
      fontSize: `${Math.max(20, Math.round((settings.textSize || 72) * (textZoom / 100) * 0.9))}px`,
      textAlign: settings.textAlign,
      WebkitTextStroke: `${settings.memeOutlineWidth}px ${settings.textOutlineColor}`,
      textShadow: `0 ${Math.max(1, settings.memeOutlineWidth)}px 0 ${settings.textOutlineColor}, 0 4px 12px rgba(0,0,0,.35)`,
    }
    const updateMemeSetting = (key: keyof ToolSettingsState, value: string | number | boolean) => {
      clearOutputs()
      setSettings((current) => ({ ...current, [key]: value }))
    }
    const resetMeme = () => {
      clearOutputs()
      setTextZoom(100)
      setSettings((current) => ({
        ...current,
        memeTopText: 'WHEN YOU FINISH ALL YOUR TASKS',
        memeBottomText: "AND IT'S ONLY 10AM",
        memeFont: 'Impact',
        textColor: '#ffffff',
        textOutlineColor: '#000000',
        memeOutlineWidth: 4,
        textSize: Math.max(42, Math.round((settings.width || 1200) * 0.06)),
        textAlign: 'center',
      }))
    }
    const selectMemeTemplate = async (name: string, color: string, emoji: string) => {
      clearOutputs()
      const file = await fileFromDataUrl(memeTemplateDataUrl(name, color, emoji), `${name.toLowerCase().replace(/\s+/g, '-')}.svg`)
      await handleFiles([file])
      setSettings((current) => ({
        ...current,
        memeTopText: name === 'Success Kid' ? 'WHEN YOU FINISH ALL YOUR TASKS' : current.memeTopText,
        memeBottomText: name === 'Success Kid' ? "AND IT'S ONLY 10AM" : current.memeBottomText,
      }))
    }

    return (
      <div className="workspace meme-workspace">
        <div className="compress-top meme-top-grid">
          <section className="compress-title-card">
            <Breadcrumbs current={localName} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="smile" /></span>
            <h1>{localName}</h1>
            <p>Create funny memes with easy-to-use tools. {t.tool.free100} and runs in your browser.</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> {t.tool.free100}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="shield" /> Your memes stay private</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h2><HomeIcon name="sparkle" /> {t.tool.tips}</h2>
            <p>✓ Choose a popular template or upload your own image.</p>
            <p>✓ Add funny text on top and bottom.</p>
            <p>✓ Adjust font, size, outline, and alignment.</p>
            <p>✓ Preview your meme and download it.</p>
          </aside>
        </div>

        <form className="meme-layout" onSubmit={process}>
          <aside className="meme-settings-card">
            <div className="meme-tabs">
              <button className={memePanel === 'text' ? 'active' : ''} type="button" onClick={() => setMemePanel('text')}><HomeIcon name="text" /> Text</button>
              <button className={memePanel === 'image' ? 'active' : ''} type="button" onClick={() => setMemePanel('image')}><HomeIcon name="image" /> Image</button>
            </div>
            {memePanel === 'text' ? (
              <>
                <label>Top Text<textarea maxLength={80} value={settings.memeTopText} onChange={(event) => updateMemeSetting('memeTopText', event.target.value.toUpperCase())} /><small>{settings.memeTopText.length}/80</small></label>
                <label>Bottom Text<textarea maxLength={80} value={settings.memeBottomText} onChange={(event) => updateMemeSetting('memeBottomText', event.target.value.toUpperCase())} /><small>{settings.memeBottomText.length}/80</small></label>
                <label>Font<div className="meme-font-row"><select value={settings.memeFont} onChange={(event) => updateMemeSetting('memeFont', event.target.value)}><option>Impact</option><option>Anton</option><option>Arial Black</option><option>Comic Sans MS</option></select><button className={settings.textBold ? 'active' : ''} type="button" onClick={() => updateMemeSetting('textBold', !settings.textBold)}>B</button></div></label>
                <label>Font Size <span>{settings.textSize}px</span><input min="28" max="140" type="range" value={settings.textSize} onChange={(event) => updateMemeSetting('textSize', Number(event.target.value))} /></label>
                <label>Text Color <input type="color" value={settings.textColor} onChange={(event) => updateMemeSetting('textColor', event.target.value)} /></label>
                <label>Outline <span>{settings.memeOutlineWidth}px</span><input min="0" max="12" type="range" value={settings.memeOutlineWidth} onChange={(event) => updateMemeSetting('memeOutlineWidth', Number(event.target.value))} /></label>
                <label>Outline Color <input type="color" value={settings.textOutlineColor} onChange={(event) => updateMemeSetting('textOutlineColor', event.target.value)} /></label>
                <label>Alignment<div className="alignment-row">{(['left', 'center', 'right'] as const).map((align) => <button className={settings.textAlign === align ? 'active' : ''} key={align} type="button" onClick={() => updateMemeSetting('textAlign', align)}>{align === 'left' ? '←' : align === 'right' ? '→' : '↔'}</button>)}</div></label>
                <button className="secondary full" type="button">More Options⌄</button>
              </>
            ) : (
              <div className="meme-image-panel">
                <UploadButton label="Upload Image" onFiles={handleFiles} />
                <p>Use your own JPG, PNG, WebP, or GIF image as the meme background.</p>
                <div className="format-pills">
                  {[
                    ['image/jpeg', 'JPG'],
                    ['image/png', 'PNG'],
                    ['image/webp', 'WebP'],
                  ].map(([format, label]) => <button className={settings.format === format ? 'active' : ''} key={format} type="button" onClick={() => updateMemeSetting('format', format)}>{label}</button>)}
                </div>
              </div>
            )}
          </aside>

          <section className="meme-preview-card">
            <div className="rotate-preview-toolbar"><div><span>Zoom</span><button type="button" onClick={() => setTextZoom((value) => clamp(value - 10, 50, 200))}>−</button><strong>{textZoom}%</strong><button type="button" onClick={() => setTextZoom((value) => clamp(value + 10, 50, 200))}>+</button><button type="button" onClick={() => setTextZoom(100)}>Fit</button></div><div><span>Compare</span><label className="switch"><input disabled type="checkbox" /><i></i></label><button type="button" onClick={resetMeme}><HomeIcon name="rotate" /> Reset</button></div></div>
            {previewUrl ? (
              <div className="meme-stage">
                <img ref={textPreviewImageRef} src={previewUrl} alt="Meme preview" style={{ transform: `scale(${textZoom / 100})` }} />
                <strong className="meme-caption top" style={memeTextStyle}>{settings.memeTopText}</strong>
                <strong className="meme-caption bottom" style={memeTextStyle}>{settings.memeBottomText}</strong>
              </div>
            ) : <div className="empty-preview">Choose a template or upload an image.</div>}
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> Tip: Impact font with outline works best for most memes.</p>
          </section>

          <aside className="meme-side-card">
            <section>
              <div className="areas-heading"><h2>Templates</h2><button type="button">View all</button></div>
              <div className="meme-template-grid">
                {memeTemplates.map(([name, color, emoji]) => <button key={name} type="button" onClick={() => void selectMemeTemplate(name, color, emoji)}><img alt="" src={memeTemplateDataUrl(name, color, emoji)} /><small>{name}</small></button>)}
              </div>
            </section>
            <section>
              <div className="areas-heading"><h2>History</h2><button type="button" onClick={() => setMemeHistory([])}>Clear</button></div>
              {memeHistory.map((item, index) => <div className="history-item" key={`${item}-${index}`}><span><HomeIcon name="smile" /></span><div><strong>{item}</strong><small>{index === 0 ? 'Just now' : `${index * 5} minutes ago`}</small></div><button type="button">⋮</button></div>)}
            </section>
          </aside>

          <div className="meme-bottom-bar">
            <button className="secondary" type="button" onClick={resetMeme}><HomeIcon name="rotate" /> Reset</button>
            <span></span>
            {previewUrl && <a className="secondary" href={previewUrl} download={files[0]?.name ?? 'original-image'}><HomeIcon name="download" /> Download Original</a>}
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a> : <button className="primary" type="submit"><HomeIcon name="download" /> Download Image</button>}
          </div>
        </form>
      </div>
    )
  }

  if (tool.slug === 'upscale-image') {
    const up = t.upscaleImagePage
    const originalWidth = settings.cropWidth || Math.max(1, Math.round(settings.width / Math.max(settings.upscaleScale, 1)))
    const originalHeight = settings.cropHeight || Math.max(1, Math.round(settings.height / Math.max(settings.upscaleScale, 1)))
    const previewImage = processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl
    const updateScale = (scale: number) => {
      clearOutputs()
      setUpscaleCustomMode(false)
      setSettings((current) => ({
        ...current,
        upscaleScale: scale,
        width: Math.round(originalWidth * scale),
        height: Math.round(originalHeight * scale),
      }))
    }
    const updateCustomScale = (scale: number) => {
      const nextScale = clamp(Number(scale.toFixed(1)), 1, 6)
      clearOutputs()
      setUpscaleCustomMode(true)
      setSettings((current) => ({
        ...current,
        upscaleScale: nextScale,
        width: Math.round(originalWidth * nextScale),
        height: Math.round(originalHeight * nextScale),
      }))
    }
    const updateUpscaleSize = (key: 'width' | 'height', value: number) => {
      clearOutputs()
      setUpscaleCustomMode(true)
      setSettings((current) => {
        const scale = key === 'width' ? value / originalWidth : value / originalHeight
        return {
          ...current,
          [key]: value,
          upscaleScale: Math.max(1, Number(scale.toFixed(2))),
          [key === 'width' ? 'height' : 'width']: key === 'width' ? Math.round(originalHeight * scale) : Math.round(originalWidth * scale),
        }
      })
    }
    const resetUpscaleSettings = () => {
      clearOutputs()
      setRotateZoom(100)
      setUpscaleCustomMode(false)
      setSettings((current) => ({
        ...current,
        upscaleScale: 2,
        resampling: 'smooth',
        width: originalWidth * 2,
        height: originalHeight * 2,
        sharpness: 35,
        quality: 1,
        format: 'image/jpeg',
      }))
    }

    return (
      <div className="workspace upscale-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <Breadcrumbs current={breadcrumbLabel ?? localName} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="upload" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> {t.tool.free100}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="shield" /> {t.tool.staysPrivate}</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h3 className="pixelate-help-intro-title">{up.heroTitle}</h3>
            <p className="pixelate-help-intro">{up.heroIntro}</p>
            <h2 className="convert-tips-title"><HomeIcon name="sparkle" /> {up.quickHelpTitle}</h2>
            {up.quickHelpSteps.map((line) => (
              <p key={line}>✓ {line}</p>
            ))}
          </aside>
        </div>

        <form className="upscale-layout" onSubmit={process}>
          <aside className="upscale-settings-card">
            <h2>Upscale Settings</h2>
            <label>Scale</label>
            <div className="scale-button-grid">{[2, 3, 4].map((scale) => <button className={settings.upscaleScale === scale && !upscaleCustomMode ? 'active' : ''} key={scale} type="button" onClick={() => updateScale(scale)}>{scale}x</button>)}<button className={upscaleCustomMode ? 'active' : ''} type="button" onClick={() => setUpscaleCustomMode(true)}>Custom</button></div>
            {upscaleCustomMode && (
              <label>Custom Scale <span>{settings.upscaleScale}x</span><input min="1" max="6" step="0.1" type="number" value={settings.upscaleScale} onChange={(event) => updateCustomScale(Number(event.target.value) || 1)} /></label>
            )}
            <div className="dimension-grid">
              <label>Width<input type="number" value={settings.width} onChange={(event) => updateUpscaleSize('width', Number(event.target.value))} /></label>
              <label>Height<input type="number" value={settings.height} onChange={(event) => updateUpscaleSize('height', Number(event.target.value))} /></label>
            </div>
            <small>Original: {originalWidth} × {originalHeight} px</small>
            <label>Resampling Method</label>
            <div className="scale-button-grid resampling-button-grid"><button className={settings.resampling === 'smooth' ? 'active' : ''} type="button" onClick={() => { clearOutputs(); setSettings((current) => ({ ...current, resampling: 'smooth' })) }}>Smooth</button><button className={settings.resampling === 'sharp' ? 'active' : ''} type="button" onClick={() => { clearOutputs(); setSettings((current) => ({ ...current, resampling: 'sharp' })) }}>Sharp</button></div>
            <label>Sharpen <span>{settings.sharpness}%</span><input min="0" max="100" type="range" value={settings.sharpness} onChange={(event) => { clearOutputs(); setSettings((current) => ({ ...current, sharpness: Number(event.target.value) })) }} /></label>
            <h2>Output Settings</h2>
            <label>Format</label>
            <div className="format-pills">
              {[
                ['image/png', 'PNG'],
                ['image/jpeg', 'JPG'],
                ['image/webp', 'WebP'],
              ].map(([format, label]) => <button className={settings.format === format ? 'active' : ''} key={format} type="button" onClick={() => { clearOutputs(); setSettings((current) => ({ ...current, format: format as OutputFormat })) }}>{label}</button>)}
            </div>
            <label>Quality <span>{Math.round(settings.quality * 100)}%</span><input min="0.35" max="1" step="0.01" type="range" value={settings.quality} onChange={(event) => { clearOutputs(); setSettings((current) => ({ ...current, quality: Number(event.target.value) })) }} /></label>
            <button className="secondary full" type="button" onClick={resetUpscaleSettings}><HomeIcon name="rotate" /> Reset</button>
          </aside>

          <section className="upscale-preview-card">
            <div className="rotate-preview-toolbar"><div><span>Zoom</span><button type="button" onClick={() => setRotateZoom((value) => clamp(value - 10, 50, 200))}>−</button><strong>{rotateZoom}%</strong><button type="button" onClick={() => setRotateZoom((value) => clamp(value + 10, 50, 200))}>+</button><button type="button" onClick={() => setRotateZoom(100)}>Fit</button></div><div><span>Compare</span><label className="switch"><input checked={upscaleCompare} type="checkbox" onChange={(event) => setUpscaleCompare(event.target.checked)} /><i></i></label><button type="button" onClick={resetUpscaleSettings}><HomeIcon name="rotate" /> Reset</button></div></div>
            {previewUrl ? (
              <div className={`upscale-compare ${upscaleCompare ? '' : 'single-preview'}`}>
                {upscaleCompare && <figure><span>Original<br />{originalWidth} × {originalHeight}</span><img src={previewUrl} alt="Original preview" style={{ filter: 'blur(2px)', transform: `scale(${rotateZoom / 100})` }} /></figure>}
                <figure><span>Upscaled {settings.upscaleScale}x<br />{settings.width} × {settings.height}</span><img src={previewImage} alt="Upscaled preview" style={{ transform: `scale(${rotateZoom / 100})` }} /></figure>
                {upscaleCompare && <div className="compare-handle">↔</div>}
                <em>Original: {originalWidth} × {originalHeight}px → Upscaled: {settings.width} × {settings.height}px ({settings.upscaleScale}x)</em>
              </div>
            ) : <div className="empty-preview">Upload an image to upscale.</div>}
            {error && <p className="error">{error}</p>}
            {status && <div className="change-bg-success"><span><HomeIcon name="shield" /></span><div><strong>Upscale ready!</strong><p>{status}</p></div><HomeIcon name="sparkle" /></div>}
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> Higher scale means larger file size. Use 2x for best balance between quality and performance.</p>
          </section>

          <div className="upscale-bottom-bar">
            <span></span>
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Upscaled Image</a> : <button className="primary" type="submit"><HomeIcon name="download" /> Download Upscaled Image</button>}
          </div>
        </form>
      </div>
    )
  }

  if (tool.slug === 'grid-maker') {
    const gridUi = GRID_MAKER_UI[currentLang]
    const gridTypeLabels = gridUi.gridTypes
    const gridPresets: Array<[number, number, string]> = [
      [3, 3, '3×3'],
      [4, 4, '4×4'],
      [6, 6, '6×6'],
      [8, 8, '8×8'],
      [12, 12, '12×12'],
      [16, 12, '16×12'],
    ]
    const updateGridMakerOptions = (patch: Partial<GridMakerOptions>) => {
      clearOutputs()
      setGridMakerOptions((current) => {
        const next = { ...current, ...patch }
        if (patch.gridType === 'square') next.rows = next.columns
        if (patch.columns && next.gridType === 'square') next.rows = patch.columns
        return next
      })
    }
    const addGridReference = async (nextFiles: File[]) => {
      clearOutputs()
      const file = nextFiles.find((item) => item.type.startsWith('image/'))
      if (!file) {
        setError(gridUi.errors.upload)
        return
      }
      setFiles([file])
      setPreviewUrl(URL.createObjectURL(file))
      const bitmap = await loadBitmap(file)
      setSettings((current) => ({ ...current, width: bitmap.width, height: bitmap.height }))
      bitmap.close()
      setError('')
    }
    const clearGridMakerImage = () => {
      clearOutputs()
      setFiles([])
      setPreviewUrl('')
      setSettings((current) => ({ ...current, width: 0, height: 0 }))
    }
    const resetGridMaker = () => {
      clearOutputs()
      setGridMakerOptions({
        gridType: 'square',
        columns: 4,
        rows: 4,
        lineWidth: 2,
        color: '#111827',
        opacity: 0.6,
        showLabels: true,
        background: '#ffffff',
      })
      setGridMakerPreviewScale(100)
    }
    const exportGridMaker = async (format: OutputFormat) => {
      setError('')
      setStatus(gridUi.status.creating.replace('{format}', formatLabels[format]))
      try {
        const result = await createGridMakerImage(files[0], gridMakerOptions, format)
        setProcessed(result)
        setStatus(gridUi.status.imageReady)
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : gridUi.errors.image)
        setStatus('')
      }
    }
    const exportGridMakerPdf = async () => {
      setError('')
      setStatus(gridUi.status.creatingPdf)
      try {
        const result = await createGridMakerPdf(files[0], gridMakerOptions)
        setProcessed(result)
        setStatus(gridUi.status.pdfReady)
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : gridUi.errors.pdf)
        setStatus('')
      }
    }
    const printGridMaker = async () => {
      try {
        const result = await createGridMakerImage(files[0], gridMakerOptions, 'image/png')
        const printWindow = window.open('', '_blank')
        if (!printWindow) throw new Error(gridUi.errors.popup)
        printWindow.document.write(`<!doctype html><html><head><title>NanoImage Grid Maker</title><style>body{margin:0;display:grid;min-height:100vh;place-items:center;background:#fff}img{max-width:100%;max-height:100vh}@media print{img{max-width:100%;max-height:100%}}</style></head><body><img src="${result.url}" alt="${gridUi.previewLabel}" onload="window.print();window.onafterprint=window.close"></body></html>`)
        printWindow.document.close()
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : gridUi.errors.print)
      }
    }
    const currentDimensions = files[0] && settings.width && settings.height
      ? `${settings.width} × ${settings.height}`
      : gridUi.blankDimensions

    return (
      <div className="workspace grid-maker-workspace">
        <div className="grid-maker-shell">
          <aside className="photo-left-card grid-maker-intro">
            <Breadcrumbs current={localName} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="grid" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <p className="grid-maker-hero-support">{gridUi.heroSupport}</p>
            <div className="privacy-card">
              <span><HomeIcon name="grid" /> {gridUi.trust[0]}</span>
              <span><HomeIcon name="lock" /> {gridUi.trust[1]}</span>
              <span><HomeIcon name="shield" /> {gridUi.trust[2]}</span>
              <span><HomeIcon name="download" /> {gridUi.trust[3]}</span>
              <span><HomeIcon name="bolt" /> {gridUi.trust[4]}</span>
              <span><HomeIcon name="sparkle" /> {gridUi.trust[5]}</span>
            </div>
            <div className="grid-maker-upload-card">
              {files[0] ? (
                <figure>
                  <img src={filePreviewUrls[0]} alt="Reference image for drawing grid" />
                  <figcaption>
                    <strong>{files[0].name}</strong>
                    <span>{currentDimensions} · {formatSize(files[0].size)}</span>
                  </figcaption>
                </figure>
              ) : (
                <div className="grid-maker-empty">
                  <HomeIcon name="image" />
                  <strong>{gridUi.uploadTitle}</strong>
                  <span>{gridUi.uploadHint}</span>
                </div>
              )}
              <UploadButton label={files[0] ? gridUi.replaceImage : gridUi.uploadImage} onFiles={addGridReference} />
              <button className="secondary full" type="button" onClick={clearGridMakerImage}><HomeIcon name="rotate" /> {gridUi.createBlank}</button>
            </div>
            <p className="privacy-note"><HomeIcon name="sparkle" /> {gridUi.usageNote}</p>
          </aside>

          <main className="photo-editor-card grid-maker-editor">
            <div className="photo-editor-toolbar">
              <section>
                <strong>{gridUi.gridTypeTitle}</strong>
                <div>
                  {(Object.keys(gridTypeLabels) as GridMakerType[]).map((type) => (
                    <button className={gridMakerOptions.gridType === type ? 'active' : ''} key={type} type="button" onClick={() => updateGridMakerOptions({ gridType: type })}>{gridTypeLabels[type]}</button>
                  ))}
                </div>
              </section>
              <section>
                <strong>{gridUi.presetsTitle}</strong>
                <div>{gridPresets.slice(0, 4).map(([columns, rows, label]) => <button className={gridMakerOptions.columns === columns && gridMakerOptions.rows === rows ? 'active' : ''} key={label} type="button" onClick={() => updateGridMakerOptions({ columns, rows })}>{label}</button>)}</div>
              </section>
            </div>
            <div className="grid-maker-canvas-wrap" style={{ transform: `scale(${gridMakerPreviewScale / 100})` }}>
              <canvas ref={gridMakerCanvasRef} aria-label={gridUi.previewLabel} />
            </div>
            <div className="photo-editor-controls">
              <button type="button" onClick={() => setGridMakerPreviewScale((value) => clamp(value - 10, 50, 150))}>−</button>
              <strong>{gridMakerPreviewScale}%</strong>
              <button type="button" onClick={() => setGridMakerPreviewScale((value) => clamp(value + 10, 50, 150))}>+</button>
              <button type="button" onClick={() => setGridMakerPreviewScale(100)}>{gridUi.fit}</button>
              <button type="button" onClick={resetGridMaker}><HomeIcon name="rotate" /> {gridUi.reset}</button>
            </div>
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
          </main>

          <aside className="photo-right-card">
            <section className="photo-settings-section">
              <div className="areas-heading"><p className="collage-panel-title">{gridUi.settingsTitle}</p><span>{currentDimensions}</span></div>
              <label>{gridUi.columns} <span>{gridMakerOptions.columns}</span><input min="1" max="50" type="range" value={gridMakerOptions.columns} onChange={(event) => updateGridMakerOptions({ columns: Number(event.target.value) })} /></label>
              <label>{gridUi.rows} <span>{gridMakerOptions.rows}</span><input disabled={gridMakerOptions.gridType === 'square'} min="1" max="50" type="range" value={gridMakerOptions.rows} onChange={(event) => updateGridMakerOptions({ rows: Number(event.target.value) })} /></label>
              <label>{gridUi.lineWidth} <span>{gridMakerOptions.lineWidth}px</span><input min="1" max="10" type="range" value={gridMakerOptions.lineWidth} onChange={(event) => updateGridMakerOptions({ lineWidth: Number(event.target.value) })} /></label>
              <label>{gridUi.opacity} <span>{Math.round(gridMakerOptions.opacity * 100)}%</span><input min="0.1" max="1" step="0.05" type="range" value={gridMakerOptions.opacity} onChange={(event) => updateGridMakerOptions({ opacity: Number(event.target.value) })} /></label>
              <label>{gridUi.lineColor} <input type="color" value={gridMakerOptions.color} onChange={(event) => updateGridMakerOptions({ color: event.target.value })} /></label>
              <label>{gridUi.blankBackground} <input type="color" value={gridMakerOptions.background} onChange={(event) => updateGridMakerOptions({ background: event.target.value })} /></label>
              <label className="checkbox-row"><input checked={gridMakerOptions.showLabels} type="checkbox" onChange={(event) => updateGridMakerOptions({ showLabels: event.target.checked })} /> {gridUi.showLabels}</label>
            </section>
            <section>
              <div className="areas-heading"><p className="collage-panel-title">{gridUi.gridPresetsTitle}</p></div>
              <div className="photo-layout-grid">{gridPresets.map(([columns, rows, label]) => <button className={gridMakerOptions.columns === columns && gridMakerOptions.rows === rows ? 'active' : ''} key={label} type="button" onClick={() => updateGridMakerOptions({ columns, rows })}><span style={{ gridTemplateColumns: `repeat(${Math.min(columns, 4)}, 1fr)` }}>{Array.from({ length: Math.min(columns * rows, 12) }).map((_, index) => <i key={index}></i>)}</span><small>{label}</small></button>)}</div>
            </section>
          </aside>

          <div className="photo-bottom-bar">
            <span className="privacy-note"><HomeIcon name="shield" /> {gridUi.localNote}</span>
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> {processed.name.endsWith('.pdf') ? 'PDF' : gridUi.downloadFile}</a> : null}
            <button className="secondary" type="button" onClick={printGridMaker}>{gridUi.print}</button>
            <button className="primary" type="button" onClick={() => void exportGridMaker('image/png')}>PNG</button>
            <button className="primary" type="button" onClick={() => void exportGridMaker('image/jpeg')}>JPG</button>
            <button className="primary" type="button" onClick={() => void exportGridMakerPdf()}>PDF</button>
          </div>
        </div>
      </div>
    )
  }

  if (tool.slug === 'photo-grid') {
    const pg = t.photoGridPage
    const gridSlots = photoGridOptions.columns * photoGridOptions.rows
    const visibleGridFiles = files.slice(0, gridSlots)
    const addGridFiles = async (nextFiles: File[]) => {
      clearOutputs()
      const accepted = nextFiles.filter((file) => file.type.startsWith('image/'))
      if (!accepted.length) {
        setError('Please upload image files.')
        return
      }
      setFiles((current) => [...current, ...accepted].slice(0, 20))
      if (!previewUrl) {
        setPreviewUrl(URL.createObjectURL(accepted[0]))
        const bitmap = await loadBitmap(accepted[0])
        setSettings((current) => ({ ...current, width: bitmap.width, height: bitmap.height }))
      }
    }
    const removeGridFile = (index: number) => {
      clearOutputs()
      setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))
      setPhotoGridOffsets((current) => {
        const next: PhotoGridOffsets = {}
        Object.entries(current).forEach(([key, value]) => {
          const itemIndex = Number(key)
          if (itemIndex < index) next[itemIndex] = value
          if (itemIndex > index) next[itemIndex - 1] = value
        })
        return next
      })
      setActivePhotoGridIndex((current) => clamp(Math.min(current, files.length - 2), 0, Math.max(0, files.length - 2)))
    }
    const clearGridFiles = () => {
      clearOutputs()
      setFiles([])
      setPreviewUrl('')
      setPhotoGridOffsets({})
      setActivePhotoGridIndex(0)
    }
    const updateGridOptions = (patch: Partial<PhotoGridOptions>) => {
      clearOutputs()
      setPhotoGridOptions((current) => ({ ...current, ...patch }))
    }
    const makeGrid = async () => {
      setError('')
      setStatus('Creating your photo grid...')
      try {
        if (!files.length) throw new Error('Please upload images first.')
        const result = await createPhotoGrid(files, photoGridOptions, photoGridOffsets)
        setProcessed(result)
        setStatus('Done. Your photo grid is ready to download.')
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Something went wrong while creating your photo grid.')
        setStatus('')
      }
    }
    const layoutPresets: Array<[number, number, string]> = [
      [1, 1, '1×1'],
      [2, 2, '2×2'],
      [1, 3, '1×3'],
      [3, 1, '3×1'],
      [3, 2, '3×2'],
      [2, 3, '2×3'],
      [3, 3, '3×3'],
      [4, 4, '4×4'],
    ]
    const backgroundOptions = ['transparent', '#ffffff', '#000000', '#e5e5e5', '#f1ebff']
    const gridAspect = photoGridOptions.aspectRatio.replace(':', ' / ')
    const moveGridPhoto = (index: number, deltaX: number, deltaY: number) => {
      clearOutputs()
      setPhotoGridOffsets((current) => {
        const currentOffset = current[index] ?? { x: 0, y: 0 }
        return {
          ...current,
          [index]: {
            x: clamp(currentOffset.x + deltaX, -100, 100),
            y: clamp(currentOffset.y + deltaY, -100, 100),
          },
        }
      })
    }
    const resetGridPhotoPosition = (index: number) => {
      clearOutputs()
      setPhotoGridOffsets((current) => {
        const next = { ...current }
        delete next[index]
        return next
      })
    }
    const handleGridPhotoPointerDown = (event: ReactPointerEvent<HTMLElement>, index: number) => {
      const cell = event.currentTarget as HTMLElement
      setActivePhotoGridIndex(index)
      const startX = event.clientX
      const startY = event.clientY
      const startOffset = photoGridOffsets[index] ?? { x: 0, y: 0 }
      const rect = cell.getBoundingClientRect()
      event.preventDefault()
      event.stopPropagation()
      clearOutputs()
      const movePhoto = (moveEvent: PointerEvent) => {
        const deltaX = ((moveEvent.clientX - startX) / Math.max(1, rect.width)) * 120
        const deltaY = ((moveEvent.clientY - startY) / Math.max(1, rect.height)) * 120
        setPhotoGridOffsets((current) => ({
          ...current,
          [index]: {
            x: clamp(startOffset.x + deltaX, -100, 100),
            y: clamp(startOffset.y + deltaY, -100, 100),
          },
        }))
      }
      const stopMove = () => {
        window.removeEventListener('pointermove', movePhoto)
        window.removeEventListener('pointerup', stopMove)
      }
      window.addEventListener('pointermove', movePhoto)
      window.addEventListener('pointerup', stopMove)
    }

    return (
      <div className="workspace photo-grid-workspace">
        <div className="photo-grid-shell">
          <aside className="photo-left-card">
            <Breadcrumbs current={localName} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="grid" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <h3 className="pixelate-help-intro-title">{pg.heroTitle}</h3>
            <p className="pixelate-help-intro">{pg.heroIntro}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> {t.tool.free100}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
              <span><HomeIcon name="shield" /> {t.tool.staysPrivate}</span>
            </div>
            <div className="photo-tabs"><button className="active" type="button"><HomeIcon name="image" /> Images</button><button type="button"><HomeIcon name="settings" /> Settings</button></div>
            <div className="areas-heading"><p className="collage-panel-title">Add Images ({files.length}/20)</p><button type="button" onClick={clearGridFiles}>Clear All</button></div>
            <div className="photo-thumb-grid">
              {files.map((file, index) => <button key={`${file.name}-${index}`} type="button" onClick={() => removeGridFile(index)}><img src={filePreviewUrls[index]} alt="" /><span>×</span></button>)}
            </div>
            <UploadButton label="Add More Images" multiple onFiles={addGridFiles} />
            <p className="privacy-note"><HomeIcon name="sparkle" /> Tip: Drag a photo inside the grid to adjust its position.</p>
            <button className="secondary full" type="button" onClick={clearGridFiles}><HomeIcon name="rotate" /> Reset</button>
          </aside>

          <main className="photo-editor-card">
            <div className="photo-editor-toolbar">
              <section><strong>Grid Layout</strong><div>{layoutPresets.slice(0, 8).map(([columns, rows, label]) => <button className={photoGridOptions.columns === columns && photoGridOptions.rows === rows ? 'active' : ''} key={label} type="button" onClick={() => updateGridOptions({ columns, rows })}>{label}</button>)}</div></section>
              <section><strong>Aspect Ratio</strong><div>{(['1:1', '4:5', '16:9', '9:16'] as const).map((ratio) => <button className={photoGridOptions.aspectRatio === ratio ? 'active' : ''} key={ratio} type="button" onClick={() => updateGridOptions({ aspectRatio: ratio })}>{ratio}</button>)}</div></section>
            </div>
            <div className="photo-grid-canvas" style={{ background: photoGridOptions.background === 'transparent' ? undefined : photoGridOptions.background, transform: `scale(${photoGridZoom / 100})` }}>
              <div
                className="photo-grid-preview"
                role="img"
                aria-label="Free photo grid maker preview"
                style={{
                  gridTemplateColumns: `repeat(${photoGridOptions.columns}, 1fr)`,
                  gap: `${photoGridOptions.spacing}px`,
                  padding: `${photoGridOptions.border}px`,
                  borderRadius: `${photoGridOptions.radius}px`,
                  aspectRatio: gridAspect,
                }}
              >
                {Array.from({ length: gridSlots }).map((_, index) => visibleGridFiles[index] ? (
                  <div className={index === activePhotoGridIndex ? 'photo-grid-cell active' : 'photo-grid-cell'} key={index} style={{ borderRadius: `${photoGridOptions.radius}px` }} onPointerDown={(event) => handleGridPhotoPointerDown(event, index)}>
                    <img
                      src={filePreviewUrls[index]}
                      alt={`Photo ${index + 1} in grid layout`}
                      style={{
                        transform: `translate(${((photoGridOffsets[index]?.x ?? 0) * 0.12).toFixed(2)}%, ${((photoGridOffsets[index]?.y ?? 0) * 0.12).toFixed(2)}%)`,
                      }}
                    />
                  </div>
                ) : (
                  <span key={index}><HomeIcon name="image" /></span>
                ))}
              </div>
            </div>
            <div className="photo-editor-controls">
              <button type="button" disabled={!visibleGridFiles[activePhotoGridIndex]} onClick={() => moveGridPhoto(activePhotoGridIndex, -12, 0)}>←</button><button type="button" disabled={!visibleGridFiles[activePhotoGridIndex]} onClick={() => moveGridPhoto(activePhotoGridIndex, 12, 0)}>→</button><button type="button" disabled={!visibleGridFiles[activePhotoGridIndex]} onClick={() => moveGridPhoto(activePhotoGridIndex, 0, -12)}>↑</button><button type="button" disabled={!visibleGridFiles[activePhotoGridIndex]} onClick={() => moveGridPhoto(activePhotoGridIndex, 0, 12)}>↓</button><button type="button" disabled={!visibleGridFiles[activePhotoGridIndex]} onClick={() => resetGridPhotoPosition(activePhotoGridIndex)}>Reset photo</button>
              <button type="button" onClick={() => setPhotoGridZoom((value) => clamp(value - 10, 50, 150))}>−</button><strong>{photoGridZoom}%</strong><button type="button" onClick={() => setPhotoGridZoom((value) => clamp(value + 10, 50, 150))}>+</button>
              <button type="button" onClick={() => setPhotoGridZoom(100)}>Fit</button>
            </div>
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
          </main>

          <aside className="photo-right-card">
            <section>
              <div className="areas-heading"><p className="collage-panel-title">Layout Presets</p><button type="button">View all</button></div>
              <div className="photo-layout-grid">{layoutPresets.slice(1, 8).map(([columns, rows, label]) => <button className={photoGridOptions.columns === columns && photoGridOptions.rows === rows ? 'active' : ''} key={label} type="button" onClick={() => updateGridOptions({ columns, rows })}><span style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>{Array.from({ length: Math.min(columns * rows, 9) }).map((_, index) => <i key={index}></i>)}</span><small>{label}</small></button>)}</div>
            </section>
            <section className="photo-settings-section">
              <label>Spacing <span>{photoGridOptions.spacing}px</span><input min="0" max="60" type="range" value={photoGridOptions.spacing} onChange={(event) => updateGridOptions({ spacing: Number(event.target.value) })} /></label>
              <label>Border <span>{photoGridOptions.border}px</span><input min="0" max="30" type="range" value={photoGridOptions.border} onChange={(event) => updateGridOptions({ border: Number(event.target.value) })} /></label>
              <label>Corner Radius <span>{photoGridOptions.radius}px</span><input min="0" max="40" type="range" value={photoGridOptions.radius} onChange={(event) => updateGridOptions({ radius: Number(event.target.value) })} /></label>
              <strong>Background</strong>
              <div className="photo-bg-row">{backgroundOptions.map((color) => <button className={photoGridOptions.background === color ? 'active' : ''} key={color} style={color === 'transparent' ? undefined : { background: color }} type="button" onClick={() => updateGridOptions({ background: color })}></button>)}<input type="color" value={photoGridOptions.background === 'transparent' ? '#ffffff' : photoGridOptions.background} onChange={(event) => updateGridOptions({ background: event.target.value })} /></div>
            </section>
          </aside>

          <div className="photo-bottom-bar">
            <span className="privacy-note"><HomeIcon name="shield" /> All processing happens in your browser. Your images are safe and private.</span>
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a> : <button className="primary" type="button" onClick={() => void makeGrid()}><HomeIcon name="download" /> Download Image</button>}
          </div>
        </div>
      </div>
    )
  }

  if (tool.slug === 'image-to-pdf') {
    const sortedPdfFiles = files
      .map((file, index) => ({ file, originalIndex: index, preview: filePreviewUrls[index] }))
      .sort((left, right) => {
        if (pdfSort === 'name') return left.file.name.localeCompare(right.file.name)
        if (pdfSort === 'size') return right.file.size - left.file.size
        return left.originalIndex - right.originalIndex
      })
    const addPdfFiles = async (nextFiles: File[]) => {
      clearOutputs()
      const accepted = nextFiles.filter((file) => file.type.startsWith('image/'))
      if (!accepted.length) {
        setError("We couldn't read these images. Please upload JPG, PNG, WebP, GIF, BMP, or TIFF files.")
        return
      }
      setFiles((current) => [...current, ...accepted].slice(0, 30))
      if (!previewUrl) {
        setPreviewUrl(URL.createObjectURL(accepted[0]))
        const bitmap = await loadBitmap(accepted[0])
        setSettings((current) => ({ ...current, width: bitmap.width, height: bitmap.height }))
      }
    }
    const removePdfFile = (index: number) => {
      clearOutputs()
      setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))
    }
    const clearPdfFiles = () => {
      clearOutputs()
      setFiles([])
      setPreviewUrl('')
      setPdfSort('custom')
    }
    const convertPdfFiles = async (event: FormEvent) => {
      event.preventDefault()
      setError('')
      setStatus('Creating your PDF in your browser...')
      try {
        if (!files.length) throw new Error('Please upload images first.')
        const orderedFiles = sortedPdfFiles.map((item) => item.file)
        const blob = await createPdf(orderedFiles, pdfOptions)
        setProcessed({
          name: 'nanoimage-images.pdf',
          blob,
          size: blob.size,
          url: URL.createObjectURL(blob),
        })
        setStatus('Done. Your PDF is ready to download.')
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Something went wrong while creating your PDF.')
        setStatus('')
      }
    }
    const updatePdfOption = <K extends keyof PdfOptions>(key: K, value: PdfOptions[K]) => {
      clearOutputs()
      setPdfOptions((current) => ({ ...current, [key]: value }))
    }
    const pageLabel = pdfOptions.pageSize === 'a4' ? 'A4 (210 × 297 mm)' : 'Letter (8.5 × 11 in)'
    const pdfPreviewPageStyle = {
      aspectRatio: pdfOptions.orientation === 'landscape' ? '1.414 / 1' : '1 / 1.414',
      padding: `${clamp(pdfOptions.margin * 0.08, 0.55, 2.1)}rem`,
    } as CSSProperties
    const pdfPreviewImageStyle = {
      objectFit: pdfOptions.imageFit === 'fill' ? 'cover' : 'contain',
      width: pdfOptions.imageFit === 'actual' ? 'auto' : '100%',
      height: pdfOptions.imageFit === 'actual' ? 'auto' : '100%',
      maxWidth: '100%',
      maxHeight: '100%',
    } as CSSProperties

    return (
      <div className="workspace pdf-workspace">
        <div className="convert-top-grid">
          <section className="convert-title-card">
            <span className="title-doodle"><HomeIcon name="file" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> {t.tool.free100}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="shield" /> Your files stay private</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple onFiles={handleFiles} />
          <aside className="convert-help-card">
            <h3 className="pdf-help-title">💡 {t.tool.pdfHowItWorks}</h3>
            {(t.tool.pdfHowItWorksSteps ?? []).map((item, index) => (
              <p key={item}><strong>{index + 1}</strong> {item}</p>
            ))}
          </aside>
        </div>

        <form className="pdf-layout" onSubmit={convertPdfFiles}>
          <section className="pdf-list-card">
            <div className="convert-list-heading">
              <strong>Images ({files.length})</strong>
              <div>
                <span>Sort by</span>
                <select value={pdfSort} onChange={(event) => setPdfSort(event.target.value as typeof pdfSort)}>
                  <option value="custom">Custom</option>
                  <option value="name">Name</option>
                  <option value="size">Size</option>
                </select>
                <UploadButton label="Add More" multiple onFiles={addPdfFiles} />
                <button type="button" onClick={clearPdfFiles}>Clear All <HomeIcon name="trash" /></button>
              </div>
            </div>
            <div className="pdf-file-list">
              {sortedPdfFiles.map(({ file, originalIndex, preview }, index) => (
                <div className="pdf-file-row" key={`${file.name}-${originalIndex}`}>
                  <span className="drag-handle">⋮⋮</span>
                  <img src={preview} alt="" />
                  <div><strong>{index + 1} {file.name}</strong><small>{formatSize(file.size)}</small></div>
                  <button type="button" onClick={() => removePdfFile(originalIndex)}>×</button>
                </div>
              ))}
              {!files.length && <div className="convert-empty-list">Upload images to create a PDF.</div>}
            </div>
            <UploadButton label="Add More Images" multiple onFiles={addPdfFiles} />
          </section>

          <section className="pdf-preview-card">
            <div className="pdf-preview-toolbar"><button type="button">‹</button><button type="button">›</button><strong>1 / {Math.max(files.length, 1)}</strong><button type="button">−</button><select><option>Fit</option></select><button type="button">+</button></div>
            <div className="pdf-page-preview">
              {(sortedPdfFiles.length ? sortedPdfFiles : []).slice(0, 3).map(({ preview, file }) => <figure key={file.name} style={pdfPreviewPageStyle}><img src={preview} alt="" style={pdfPreviewImageStyle} />{pdfOptions.caption && <figcaption>{file.name}</figcaption>}</figure>)}
              {!sortedPdfFiles.length && <span>PDF preview will appear here.</span>}
            </div>
          </section>

          <aside className="pdf-settings-card">
            <fieldset className="pdf-settings-fieldset">
              <legend className="pdf-settings-legend">{t.tool.pdfPageSettings}</legend>
            <label>Page Size<select value={pdfOptions.pageSize} onChange={(event) => updatePdfOption('pageSize', event.target.value as PdfOptions['pageSize'])}><option value="a4">A4 (210 × 297 mm)</option><option value="letter">Letter (8.5 × 11 in)</option></select></label>
            <div className="pdf-radio-row"><span>Orientation</span><label><input checked={pdfOptions.orientation === 'portrait'} type="radio" onChange={() => updatePdfOption('orientation', 'portrait')} /> Portrait</label><label><input checked={pdfOptions.orientation === 'landscape'} type="radio" onChange={() => updatePdfOption('orientation', 'landscape')} /> Landscape</label></div>
            <label>Margin<select value={pdfOptions.margin} onChange={(event) => updatePdfOption('margin', Number(event.target.value))}><option value={10}>Small (10 mm)</option><option value={20}>Normal (20 mm)</option><option value={30}>Large (30 mm)</option></select></label>
            <label>Image Fit<select value={pdfOptions.imageFit} onChange={(event) => updatePdfOption('imageFit', event.target.value as PdfOptions['imageFit'])}><option value="fit">Fit to page</option><option value="fill">Fill page</option><option value="actual">Actual size</option></select></label>
            <label>Spacing Between Images <span>{pdfOptions.spacing} mm</span><input min="0" max="40" type="range" value={pdfOptions.spacing} onChange={(event) => updatePdfOption('spacing', Number(event.target.value))} /></label>
            <div className="convert-options">
              <strong>More Options</strong>
              <label><input checked={pdfOptions.caption} type="checkbox" onChange={(event) => updatePdfOption('caption', event.target.checked)} /> Add image filename as caption</label>
              <label><input checked={pdfOptions.sameSize} type="checkbox" onChange={(event) => updatePdfOption('sameSize', event.target.checked)} /> Make all pages the same size</label>
              <label><input checked={pdfOptions.compress} type="checkbox" onChange={(event) => updatePdfOption('compress', event.target.checked)} /> Compress PDF</label>
            </div>
            </fieldset>
          </aside>

          <div className="pdf-bottom-bar">
            <button className="secondary" type="button" onClick={clearPdfFiles}><HomeIcon name="rotate" /> Reset</button>
            <span className="privacy-note"><HomeIcon name="sparkle" /> Tip: You can drag and drop to reorder images.</span>
            <button className="secondary" type="submit"><HomeIcon name="file" /> Convert to PDF</button>
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download PDF</a> : <button className="primary" type="submit"><HomeIcon name="download" /> Download PDF</button>}
          </div>
          {error && <p className="error">{error}</p>}
          {status && <p className="status">{status} {processed ? `(${pageLabel})` : ''}</p>}
        </form>
      </div>
    )
  }

  if (tool.slug === 'enhance-image') {
    const ep = t.enhanceImagePage
    const presetLabels: Record<string, string> = {
      None: ep.presetNone,
      'Auto Enhance': ep.presetAutoEnhance,
      Vivid: ep.presetVivid,
      Bright: ep.presetBright,
      Warm: ep.presetWarm,
      Cool: ep.presetCool,
      Soft: ep.presetSoft,
      Clear: ep.presetClear,
      'B&W': ep.presetBw,
    }
    const enhanceAdjustments: Array<[keyof ToolSettingsState, string, number, number]> = [
      ['brightness', ep.sliderBrightness, -50, 50],
      ['contrast', ep.sliderContrast, -50, 50],
      ['saturation', ep.sliderSaturation, -50, 60],
      ['vibrance', ep.sliderVibrance, -50, 60],
      ['exposure', ep.sliderExposure, -40, 40],
      ['highlights', ep.sliderHighlights, -60, 60],
      ['shadows', ep.sliderShadows, -60, 60],
      ['sharpness', ep.sliderSharpness, 0, 60],
      ['clarity', ep.sliderClarity, -30, 50],
      ['warmth', ep.sliderWarmth, -50, 50],
      ['tint', ep.sliderTint, -50, 50],
    ]
    const presetValues = [
      ['None', { brightness: 0, contrast: 0, saturation: 0, vibrance: 0, exposure: 0, highlights: 0, shadows: 0, sharpness: 0, clarity: 0, warmth: 0, tint: 0 }],
      ['Auto Enhance', { brightness: 12, contrast: 18, saturation: 20, vibrance: 15, exposure: 6, highlights: -10, shadows: 25, sharpness: 30, clarity: 15, warmth: 5, tint: 0 }],
      ['Vivid', { brightness: 8, contrast: 28, saturation: 42, vibrance: 32, exposure: 4, highlights: -14, shadows: 18, sharpness: 34, clarity: 22, warmth: 4, tint: 0 }],
      ['Bright', { brightness: 24, contrast: 10, saturation: 14, vibrance: 12, exposure: 14, highlights: -6, shadows: 18, sharpness: 16, clarity: 8, warmth: 2, tint: 0 }],
      ['Warm', { brightness: 10, contrast: 14, saturation: 16, vibrance: 12, exposure: 4, highlights: -8, shadows: 16, sharpness: 18, clarity: 10, warmth: 28, tint: 6 }],
      ['Cool', { brightness: 8, contrast: 18, saturation: 12, vibrance: 16, exposure: 2, highlights: -10, shadows: 15, sharpness: 22, clarity: 16, warmth: -24, tint: -8 }],
      ['Soft', { brightness: 10, contrast: -8, saturation: 8, vibrance: 8, exposure: 5, highlights: -18, shadows: 20, sharpness: 6, clarity: -10, warmth: 6, tint: 0 }],
      ['Clear', { brightness: 6, contrast: 24, saturation: 12, vibrance: 14, exposure: 0, highlights: -20, shadows: 20, sharpness: 42, clarity: 28, warmth: 0, tint: 0 }],
      ['B&W', { brightness: 4, contrast: 26, saturation: -50, vibrance: -50, exposure: 0, highlights: -8, shadows: 12, sharpness: 25, clarity: 20, warmth: 0, tint: 0 }],
    ] as const
    const enhanceFilter = enhanceCssFilter(settings)
    const updateEnhanceSetting = (key: keyof ToolSettingsState, value: number) => {
      clearOutputs()
      setSettings((current) => ({ ...current, [key]: value }))
    }
    const applyEnhancePreset = (preset: (typeof presetValues)[number]) => {
      clearOutputs()
      setSettings((current) => ({ ...current, ...preset[1] }))
      setStatus(ep.presetApplied.replace('{name}', presetLabels[preset[0]] ?? preset[0]))
    }
    const resetEnhanceSettings = () => {
      clearOutputs()
      setEnhancePanel('adjust')
      setRotateZoom(100)
      setSettings((current) => ({ ...current, ...presetValues[0][1] }))
    }
    const previewImage = processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl

    return (
      <div className="workspace enhance-workspace">
        <div className="pixelate-top-grid">
          <section className="pixelate-title-card">
            <Breadcrumbs current={localName} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="magic" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> {t.tool.free100}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="shield" /> {t.tool.staysPrivate}</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="pixelate-help-card">
            <h2 className="enhance-tips-title">✨ {ep.tipsTitle}</h2>
            <p>✓ {ep.tip1}</p>
            <p>✓ {ep.tip2}</p>
            <p>✓ {ep.tip3}</p>
            <p>✓ {ep.tip4}</p>
          </aside>
        </div>

        <form className="enhance-layout" onSubmit={process}>
          <aside className="enhance-settings-card">
            <div className="enhance-tabs">
              <button className={enhancePanel === 'adjust' ? 'active' : ''} type="button" onClick={() => setEnhancePanel('adjust')}>{ep.tabAdjust}</button>
              <button className={enhancePanel === 'filters' ? 'active' : ''} type="button" onClick={() => setEnhancePanel('filters')}>{ep.tabFilters}</button>
            </div>
            {enhancePanel === 'adjust' ? enhanceAdjustments.map(([key, label, min, max]) => (
                <label className="enhance-slider" key={key}>
                  <span>{label}</span>
                  <input min={min} max={max} type="range" value={Number(settings[key])} onChange={(event) => updateEnhanceSetting(key, Number(event.target.value))} />
                  <em>{Number(settings[key])}</em>
                </label>
              )) : (
                <div className="enhance-filter-list">
                  {presetValues.map((preset, index) => (
                    <button key={preset[0]} type="button" onClick={() => applyEnhancePreset(preset)}>
                      <span className={`preset-thumb preset-${index}`}></span>
                      <strong>{presetLabels[preset[0]] ?? preset[0]}</strong>
                    </button>
                  ))}
                </div>
              )}
            <button className="secondary full" type="button" onClick={resetEnhanceSettings}><HomeIcon name="rotate" /> {ep.resetAll}</button>
          </aside>

          <section className="enhance-preview-card">
            <div className="enhance-toolbar">
              <div><span>{ep.viewLabel}</span><button className="active" type="button">{ep.beforeAfter}</button></div>
              <div><span>{ep.zoom}</span><button type="button" onClick={() => setRotateZoom((value) => clamp(value - 10, 50, 200))}>−</button><strong>{rotateZoom}%</strong><button type="button" onClick={() => setRotateZoom((value) => clamp(value + 10, 50, 200))}>+</button><span>{ep.compare}</span><label className="switch"><input checked readOnly type="checkbox" /><i></i></label></div>
            </div>
            {previewUrl ? (
              <div className="enhance-stage before-after">
                <figure><span>{ep.before}</span><img src={previewUrl} alt={ep.beforeAlt} style={{ transform: `scale(${rotateZoom / 100})` }} /></figure>
                <figure><span>{ep.after}</span><img src={previewImage} alt={ep.afterAlt} style={{ filter: processed ? undefined : enhanceFilter, transform: `scale(${rotateZoom / 100})` }} /></figure>
              </div>
            ) : (
              <div className="empty-preview">{ep.emptyPreview}</div>
            )}
            {(processed || status) && <div className="change-bg-success"><span><HomeIcon name="shield" /></span><div><strong>{ep.successTitle}</strong><p>{status || ep.successDesc}</p></div><HomeIcon name="sparkle" /></div>}
            {error && <p className="error">{error}</p>}
            <p className="privacy-note add-text-tip"><HomeIcon name="sparkle" /> {ep.tipAdjust}</p>
          </section>

          <aside className="enhance-side-card">
            <section>
              <p className="enhance-panel-label">{ep.presetsTitle}</p>
              <div className="enhance-preset-grid">
                {presetValues.map((preset, index) => <button key={preset[0]} type="button" onClick={() => applyEnhancePreset(preset)}><span className={`preset-thumb preset-${index}`}></span><small>{presetLabels[preset[0]] ?? preset[0]}</small></button>)}
              </div>
            </section>
          </aside>

          <div className="enhance-bottom-bar">
            <button className="secondary" type="button" onClick={resetEnhanceSettings}><HomeIcon name="rotate" /> {ep.reset}</button>
            <span></span>
            {processed ? <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> {ep.downloadImage}</a> : <button className="primary" type="submit"><HomeIcon name="download" /> {ep.downloadImage}</button>}
          </div>
        </form>
      </div>
    )
  }

  if (tool.slug === 'convert-image' || tool.slug === 'convert-to-webp') {
    const isWebpOnly = tool.slug === 'convert-to-webp'
    const ci = t.convertImagePage
    const cw = t.convertToWebpPage
    const outputFormat = isWebpOnly ? 'image/webp' : settings.format
    const outputLabel = extensionFor(outputFormat).toUpperCase()
    const originalTotal = files.reduce((sum, file) => sum + file.size, 0)
    const convertedTotal = batch.length ? batch.reduce((sum, item) => sum + item.size, 0) : 0
    const convertedSaved = originalTotal && convertedTotal ? Math.round(((originalTotal - convertedTotal) / originalTotal) * 100) : 0
    const sortedConvertFiles = files
      .map((file, index) => ({ file, originalIndex: index }))
      .sort((left, right) => {
        if (convertSort === 'name') return left.file.name.localeCompare(right.file.name)
        if (convertSort === 'size') return right.file.size - left.file.size
        return left.originalIndex - right.originalIndex
      })
    const convertFiles = async (event: FormEvent) => {
      event.preventDefault()
      setError('')
      setStatus(ci.converting)
      try {
        if (!files.length) throw new Error(ci.uploadFirst)
        const results = await Promise.all(files.map((file) => processImage(file, tool.slug, { ...settings, format: outputFormat })))
        setBatch(results)
        if (results.length === 1) {
          setProcessed(results[0])
        } else {
          const JSZip = await loadJSZip()
          const zip = new JSZip()
          results.forEach((item) => zip.file(item.name, item.blob))
          const zipBlob = await zip.generateAsync({ type: 'blob' })
          setProcessed({
            name: isWebpOnly ? 'nanoimage-webp-images.zip' : 'nanoimage-converted-images.zip',
            blob: zipBlob,
            size: zipBlob.size,
            url: URL.createObjectURL(zipBlob),
          })
        }
        setStatus(ci.done)
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : ci.convertError)
        setStatus('')
      }
    }
    const removeConvertFile = (index: number) => {
      clearOutputs()
      setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))
    }
    const clearConvertFiles = () => {
      clearOutputs()
      setFiles([])
      setPreviewUrl('')
      setConvertSort('name')
    }
    const addConvertFiles = async (nextFiles: File[]) => {
      clearOutputs()
      const accepted = nextFiles.filter((file) => file.type.startsWith('image/'))
      if (!accepted.length) {
        setError(ci.uploadError)
        return
      }
      setFiles((current) => [...current, ...accepted].slice(0, 20))
      if (!previewUrl) {
        const first = accepted[0]
        setPreviewUrl(URL.createObjectURL(first))
        const bitmap = await loadBitmap(first)
        setSettings((value) => ({
          ...value,
          width: bitmap.width,
          height: bitmap.height,
        }))
      }
    }

    return (
      <div className="workspace convert-workspace">
        <div className="convert-top-grid">
          <section className="convert-title-card">
            <Breadcrumbs current={breadcrumbLabel ?? localName} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="convert" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> {t.tool.free100}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="shield" /> {t.tool.staysPrivate}</span>
              <span><HomeIcon name="bolt" /> {t.tool.worksBrowser}</span>
            </div>
          </section>
          <UploadDropzone multiple onFiles={handleFiles} />
          <aside className="convert-help-card">
            <h2 className="convert-tips-title">{isWebpOnly ? `💡 ${cw.whyWebpTitle}` : `🔄 ${ci.supportedConversionsTitle}`}</h2>
            {isWebpOnly ? (
              <>
                <p className="convert-sidebar-prose">{cw.whyWebpIntro}</p>
                <h3 className="convert-sidebar-subtitle">{cw.howToSidebarTitle}</h3>
                <ol className="convert-sidebar-steps">
                  {cw.howToSidebarSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p className="convert-sidebar-note">{cw.howToSidebarNote}</p>
                <h3 className="convert-sidebar-subtitle">{cw.vsFormatsTitle}</h3>
                <p>{cw.vsFormatsBody}</p>
              </>
            ) : (
              <div className="conversion-pills">
                {['JPG → PNG', 'JPG → WebP', 'PNG → JPG', 'GIF → PNG', 'WebP → JPG', 'BMP → JPG', 'PNG → WebP', 'TIFF → JPG'].map((item) => <span key={item}>{item}</span>)}
                <small>{ci.andMore}</small>
              </div>
            )}
          </aside>
        </div>

        <form className="convert-layout" onSubmit={convertFiles}>
          <section className="convert-list-card">
            <div className="convert-list-heading">
              <strong>{ci.imagesAdded.replace('{count}', String(files.length || (isWebpOnly ? 5 : 10)))}</strong>
              <div>
                <span>{ci.sortBy}</span>
                <select value={convertSort} onChange={(event) => setConvertSort(event.target.value as 'custom' | 'name' | 'size')}>
                  <option value="custom">{ci.sortCustom}</option>
                  <option value="name">{ci.sortName}</option>
                  <option value="size">{ci.sortSize}</option>
                </select>
                <UploadButton label={ci.addMore} multiple onFiles={addConvertFiles} />
                <button type="button" onClick={clearConvertFiles}>{ci.clearAll} <HomeIcon name="trash" /></button>
              </div>
            </div>
            <div className="convert-file-list">
              {sortedConvertFiles.map(({ file, originalIndex }, index) => {
                const result = batch[originalIndex]
                const saved = result ? Math.round(((file.size - result.size) / file.size) * 100) : 0
                return (
                  <div className="convert-file-row" key={`${file.name}-${index}`}>
                    <span className="drag-handle">⋮⋮</span>
                    <div className="convert-thumb">{previewUrl && index === 0 ? <img src={previewUrl} alt="" /> : <HomeIcon name="image" />}</div>
                    <div><strong>{file.name}</strong><small>{file.type.split('/')[1]?.toUpperCase() || 'IMG'} · {formatSize(file.size)}</small></div>
                    <span className="convert-arrow">→</span>
                    {isWebpOnly ? <strong className="format-target">WebP</strong> : (
                      <select value={settings.format} onChange={(event) => { clearOutputs(); setSettings((value) => ({ ...value, format: event.target.value as OutputFormat })) }}>
                        <option value="image/png">PNG</option>
                        <option value="image/jpeg">JPG</option>
                        <option value="image/webp">WebP</option>
                      </select>
                    )}
                    <div className="estimated-size"><small>{ci.resultSize}</small><strong>{result ? formatSize(result.size) : ci.afterConversion} {result && saved !== 0 && <em>{saved > 0 ? `↓ ${saved}%` : `↑ ${Math.abs(saved)}%`}</em>}</strong></div>
                    <button type="button" onClick={() => removeConvertFile(originalIndex)}>×</button>
                  </div>
                )
              })}
              {!files.length && <div className="convert-empty-list">{ci.uploadEmpty}</div>}
            </div>
            <UploadButton label={ci.addMoreImages} multiple onFiles={addConvertFiles} />
            <div className="convert-total-row">
              <span>{ci.totalImages.replace('{count}', String(files.length))}</span>
              <span>{ci.originalSize.replace('{size}', formatSize(originalTotal))}</span>
              <span>{ci.outputSize.replace('{format}', outputLabel).replace('{size}', convertedTotal ? formatSize(convertedTotal) : ci.afterConversion)} {convertedTotal > 0 && convertedSaved !== 0 && `(${convertedSaved > 0 ? `↓ ${convertedSaved}%` : `↑ ${Math.abs(convertedSaved)}%`})`}</span>
            </div>
          </section>

          <aside className="convert-settings-card">
            <p className="convert-panel-label">{isWebpOnly ? 'WebP Settings' : ci.convertTo}</p>
            {!isWebpOnly && (
              <div className="format-card-grid">
                {[
                  ['image/jpeg', 'JPG'],
                  ['image/png', 'PNG'],
                  ['image/webp', 'WebP'],
                ].map(([value, label]) => (
                  <button className={settings.format === value ? 'active' : ''} key={value} type="button" onClick={() => { clearOutputs(); setSettings((current) => ({ ...current, format: value as OutputFormat })) }}>
                    <HomeIcon name="file" /> {label}
                  </button>
                ))}
              </div>
            )}
            <label>
              {ci.quality} <span>{Math.round(settings.quality * 100)}%</span>
              <input min="0.35" max="1" step="0.01" type="range" value={settings.quality} onChange={(event) => { clearOutputs(); setSettings((value) => ({ ...value, quality: Number(event.target.value) })) }} />
            </label>
            {isWebpOnly && (
              <label>
                Resize (optional)
                <select><option>Don't resize</option><option>Resize by width</option><option>Resize by percentage</option></select>
              </label>
            )}
            <div className="convert-options">
              <strong>{ci.options}</strong>
              <label><input type="checkbox" defaultChecked /> {ci.removeExif}</label>
              <label><input type="checkbox" defaultChecked /> {ci.optimizeWeb}</label>
              <label><input type="checkbox" defaultChecked /> {isWebpOnly ? cw.lossyLabel : ci.keepDimensions}</label>
            </div>
          </aside>

          <div className="convert-bottom-bar">
            <button className="secondary" type="button" onClick={clearConvertFiles}><HomeIcon name="rotate" /> {ci.reset}</button>
            <span className="privacy-note"><HomeIcon name="sparkle" /> {isWebpOnly ? cw.tipWebp : ci.tipWebp}</span>
            {!isWebpOnly && previewUrl && <a className="secondary" href={previewUrl} download={files[0]?.name ?? 'original-image'}><HomeIcon name="download" /> {ci.downloadOriginal}</a>}
            {processed ? (
              <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> {isWebpOnly ? cw.downloadWebp : ci.downloadImages}</a>
            ) : (
              <button className="primary" type="submit"><HomeIcon name="download" /> {isWebpOnly ? cw.convertButton : ci.convertImages}</button>
            )}
          </div>
          {error && <p className="error">{error}</p>}
          {status && <p className="status">{status}</p>}
        </form>
      </div>
    )
  }

  if (tool.slug === 'batch-compress') {
    return (
      <div className="workspace compress-workspace batch-workspace">
        <div className="compress-top">
          <section className="compress-title-card">
            <span className="title-doodle"><HomeIcon name="stack" /></span>
            <h1>{enHero?.h1 ?? localName}</h1>
            <p>{enHero?.line ?? localSubtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="lock" /> {t.tool.staysPrivate}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="smile" /> {t.tool.alwaysFree}</span>
            </div>
          </section>
          <UploadDropzone multiple onFiles={handleFiles} />
          <aside className="compress-tips-card">
            <h2><HomeIcon name="sparkle" /> Tips for better compression</h2>
            <p>✓ JPG is best for photos and complex images</p>
            <p>✓ PNG is best for graphics and transparency</p>
            <p>✓ Lower quality = smaller file size</p>
            <p>✓ Preview before you download</p>
          </aside>
        </div>
        <form className="batch-layout" onSubmit={process}>
          <section className="batch-table-card">
            <div className="batch-toolbar">
              <div className="batch-tabs">
                <button className="active" type="button">All Images ({files.length})</button>
                <button type="button">Completed ({batch.length})</button>
              </div>
              <div className="batch-actions">
                <label className="secondary add-more-button">
                  <HomeIcon name="upload" /> Add more
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => handleFiles([...files, ...Array.from(event.target.files ?? [])])}
                  />
                </label>
                <button className="secondary" type="button" onClick={resetTool}><HomeIcon name="trash" /> Remove all</button>
              </div>
              <div className="batch-settings-inline">
                <label>
                  Output format
                  <select value={settings.format} onChange={(event) => setSettings((value) => ({ ...value, format: event.target.value as OutputFormat }))}>
                    {Object.entries(formatLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
                <label>
                  Quality {Math.round(settings.quality * 100)}%
                  <input min="0.35" max="1" step="0.01" type="range" value={settings.quality} onChange={(event) => setSettings((value) => ({ ...value, quality: Number(event.target.value) }))} />
                </label>
              </div>
            </div>
            <div className="batch-table">
              <div className="batch-row batch-head">
                <span></span>
                <span>Image</span>
                <span>Original</span>
                <span>Settings</span>
                <span>Compressed</span>
                <span>Status</span>
                <span>Action</span>
              </div>
              {files.length ? files.map((file, index) => {
                const result = batch[index]
                const saved = result ? Math.max(0, file.size - result.size) : 0
                const savedPercent = result && saved > 0 ? Math.round((saved / file.size) * 100) : 0
                return (
                  <div className="batch-row" key={`${file.name}-${index}`}>
                    <span><input type="checkbox" defaultChecked /></span>
                    <span className="batch-file">
                      <span className="batch-thumb"><HomeIcon name="image" /></span>
                      <span><strong>{file.name}</strong><small>{file.type.replace('image/', '').toUpperCase() || 'IMAGE'}</small></span>
                    </span>
                    <span>{formatSize(file.size)}</span>
                    <span>{formatLabels[settings.format]} · {Math.round(settings.quality * 100)}%</span>
                    <span>{result ? <><strong>{formatSize(result.size)}</strong> <em>-{savedPercent}%</em></> : '-'}</span>
                    <span className={result ? 'ready-status' : ''}>{result ? 'Ready' : 'Pending'}</span>
                    <span className="batch-row-actions"><HomeIcon name="info" /><HomeIcon name="trash" /></span>
                  </div>
                )
              }) : (
                <div className="batch-empty">Upload images to build a compression batch.</div>
              )}
            </div>
            <div className="batch-table-footer">
              <label><input type="checkbox" defaultChecked /> Select all</label>
              <span>Total original size: {formatSize(totalOriginalSize)}</span>
              <span>Total compressed size: {totalCompressedSize ? formatSize(totalCompressedSize) : '-'}</span>
              <strong>{totalBatchSaved ? `You'll save ${formatSize(totalBatchSaved)} (${totalBatchSavedPercent}%)` : 'Run compression to calculate savings'}</strong>
            </div>
            {error && <p className="error">{error}</p>}
            <p className="privacy-note batch-privacy"><HomeIcon name="lock" /> Your images are processed in your browser. We never upload them to our servers.</p>
          </section>
          <aside className="batch-summary-card">
            <h2><HomeIcon name="trend" /> Compression summary</h2>
            <div className="summary-list">
              <span>Total images <strong>{files.length}</strong></span>
              <span>Total original size <strong>{formatSize(totalOriginalSize)}</strong></span>
              <span>Total compressed size <strong>{totalCompressedSize ? formatSize(totalCompressedSize) : '-'}</strong></span>
              <span>Space saved <strong>{totalBatchSaved ? `${formatSize(totalBatchSaved)} (${totalBatchSavedPercent}%)` : '-'}</strong></span>
            </div>
            <div className="summary-ring" style={{ '--progress': `${totalBatchSavedPercent || 0}%` } as CSSProperties}>
              <strong>{totalBatchSavedPercent || 0}%</strong>
            </div>
            {processed ? (
              <a className="download-button full" href={processed.url} download={processed.name}>
                <HomeIcon name="download" /> Download All (ZIP)
              </a>
            ) : (
              <button className="primary full" type="submit"><HomeIcon name="download" /> Compress & Download ZIP</button>
            )}
            <button className="secondary full" type="button" onClick={resetTool}><HomeIcon name="rotate" /> Reset</button>
            <p>All images will be downloaded as a ZIP file.</p>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'pixelate-image') {
    const pp = t.pixelateImagePage
    const pixelZoom = rotateZoom
    const pixelScale = pixelZoom / 100
    const selectionStyle = {
      left: `${settings.width ? ((settings.cropX + settings.cropWidth / 2) / settings.width) * 100 : 32}%`,
      top: `${settings.height ? ((settings.cropY + settings.cropHeight / 2) / settings.height) * 100 : 58}%`,
      width: `${settings.width ? (settings.cropWidth / settings.width) * 100 : 22}%`,
      height: `${settings.height ? (settings.cropHeight / settings.height) * 100 : 22}%`,
      transform: `translate(-50%, -50%) scale(${pixelScale})`,
    } as CSSProperties
    const updatePixelSelection = (patch: Partial<Pick<ToolSettingsState, 'cropX' | 'cropY' | 'cropWidth' | 'cropHeight' | 'pixelSize'>>) => {
      clearOutputs()
      setSettings((current) => ({ ...current, ...patch }))
    }
    const resetPixelateSettings = () => {
      clearOutputs()
      setRotateZoom(100)
      setPixelateMode('brush')
      setPixelateAreas([])
      const size = Math.round(Math.min(settings.width || 320, settings.height || 320) * 0.23)
      setSettings((current) => ({
        ...current,
        cropX: Math.round((current.width || 320) * 0.18),
        cropY: Math.round((current.height || 320) * 0.48),
        cropWidth: size,
        cropHeight: size,
        pixelSize: 25,
      }))
    }
    const clearPixelSelection = (recordHistory = true) => {
      clearOutputs()
      setPixelateAreas([])
      setSettings((current) => ({ ...current, cropWidth: 0, cropHeight: 0 }))
      if (recordHistory) setPixelateHistory((history) => ['Selection cleared', ...history.filter((item) => item !== 'Selection cleared')].slice(0, 5))
    }
    const pixelPatchForPointer = (event: PointerEvent | ReactPointerEvent<HTMLElement>, rect: DOMRect) => {
      if (!settings.width || !settings.height) return null
      const size = settings.cropWidth || Math.round(Math.min(settings.width, settings.height) * 0.23)
      const centerX = ((event.clientX - rect.left) / rect.width) * settings.width
      const centerY = ((event.clientY - rect.top) / rect.height) * settings.height
      return {
        cropWidth: size,
        cropHeight: size,
        cropX: Math.round(clamp(centerX - size / 2, 0, Math.max(0, settings.width - size))),
        cropY: Math.round(clamp(centerY - size / 2, 0, Math.max(0, settings.height - size))),
      }
    }
    const processPixelateSettings = async (nextSettings: ToolSettingsState, area?: CropArea) => {
      if (!files.length) return
      setError('')
      setStatus(t.tool.processingBrowser)
      try {
        const nextAreas = area
          ? [...pixelateAreas, area]
          : pixelateAreas.length
            ? pixelateAreas
            : nextSettings.cropWidth && nextSettings.cropHeight
              ? [{ id: Date.now(), x: nextSettings.cropX, y: nextSettings.cropY, width: nextSettings.cropWidth, height: nextSettings.cropHeight }]
              : []
        setPixelateAreas(nextAreas)
        setProcessed(await processImage(files[0], tool.slug, { ...nextSettings, pixelateAreas: nextAreas }))
        setStatus('Done. Your result is ready to download.')
        setPixelateHistory((history) => ['Pixelate area', ...history].slice(0, 5))
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Something went wrong while processing this image.')
        setStatus('')
      }
    }
    const erasePixelAreaAtPointer = async (event: PointerEvent | ReactPointerEvent<HTMLElement>, rect: DOMRect) => {
      if (!settings.width || !settings.height) return
      const pointX = ((event.clientX - rect.left) / rect.width) * settings.width
      const pointY = ((event.clientY - rect.top) / rect.height) * settings.height
      const brushSize = settings.cropWidth || Math.round(Math.min(settings.width, settings.height) * 0.23)
      const eraseRadius = brushSize / 2
      const nextAreas = pixelateAreas.filter((area) => {
        const areaCenterX = area.x + area.width / 2
        const areaCenterY = area.y + area.height / 2
        const areaRadius = Math.max(area.width, area.height) / 2
        const distance = Math.hypot(areaCenterX - pointX, areaCenterY - pointY)
        return distance > areaRadius + eraseRadius
      })
      if (!pixelateAreas.length && settings.cropWidth && settings.cropHeight) {
        clearPixelSelection(false)
        setPixelateHistory((history) => ['Selection erased', ...history.filter((item) => item !== 'Selection erased')].slice(0, 5))
        return
      }
      if (!files.length || nextAreas.length === pixelateAreas.length) return
      clearOutputs()
      setPixelateAreas(nextAreas)
      setPixelateHistory((history) => ['Selection erased', ...history.filter((item) => item !== 'Selection erased')].slice(0, 5))
      if (!nextAreas.length) {
        setProcessed(null)
        setStatus('')
        return
      }
      setStatus(t.tool.processingBrowser)
      try {
        setProcessed(await processImage(files[0], tool.slug, { ...settings, pixelateAreas: nextAreas }))
        setStatus('Done. Your result is ready to download.')
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Something went wrong while processing this image.')
        setStatus('')
      }
    }
    const movePixelSelectionToPointer = (event: PointerEvent | ReactPointerEvent<HTMLElement>, rect: DOMRect) => {
      if (pixelateMode === 'eraser') {
        return null
      }
      const patch = pixelPatchForPointer(event, rect)
      if (!patch) return null
      updatePixelSelection(patch)
      return { ...settings, ...patch }
    }
    const handlePixelStagePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
      const stage = event.currentTarget as HTMLElement
      if (!settings.width || !settings.height) return
      event.preventDefault()
      clearOutputs()
      const rect = stage.getBoundingClientRect()
      if (pixelateMode === 'eraser') {
        void erasePixelAreaAtPointer(event, rect)
        return
      }
      let latestSettings = movePixelSelectionToPointer(event, rect)
      const moveSelection = (moveEvent: PointerEvent) => {
        latestSettings = movePixelSelectionToPointer(moveEvent, rect)
      }
      const stopMove = () => {
        window.removeEventListener('pointermove', moveSelection)
        window.removeEventListener('pointerup', stopMove)
        if (latestSettings) {
          void processPixelateSettings(latestSettings, {
            id: Date.now(),
            x: latestSettings.cropX,
            y: latestSettings.cropY,
            width: latestSettings.cropWidth,
            height: latestSettings.cropHeight,
          })
        }
      }
      window.addEventListener('pointermove', moveSelection)
      window.addEventListener('pointerup', stopMove)
    }
    const setBrushSize = (size: number) => {
      updatePixelSelection({
        cropWidth: size,
        cropHeight: size,
        cropX: clamp(settings.cropX, 0, Math.max(0, settings.width - size)),
        cropY: clamp(settings.cropY, 0, Math.max(0, settings.height - size)),
      })
    }
    const handlePixelSelectionPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
      const stage = event.currentTarget.closest('.pixelate-stage') as HTMLElement | null
      if (!stage || !settings.width || !settings.height) return
      event.preventDefault()
      event.stopPropagation()
      clearOutputs()
      if (pixelateMode === 'eraser') {
        const rect = stage.getBoundingClientRect()
        void erasePixelAreaAtPointer(event, rect)
        return
      }
      const rect = stage.getBoundingClientRect()
      const startX = event.clientX
      const startY = event.clientY
      const startCropX = settings.cropX
      const startCropY = settings.cropY

      let latestSettings: ToolSettingsState = settings
      const moveSelection = (moveEvent: PointerEvent) => {
        const deltaX = ((moveEvent.clientX - startX) / rect.width) * settings.width
        const deltaY = ((moveEvent.clientY - startY) / rect.height) * settings.height
        const patch = {
          cropX: Math.round(clamp(startCropX + deltaX, 0, Math.max(0, settings.width - settings.cropWidth))),
          cropY: Math.round(clamp(startCropY + deltaY, 0, Math.max(0, settings.height - settings.cropHeight))),
        }
        latestSettings = { ...settings, ...patch }
        updatePixelSelection(patch)
      }
      const stopMove = () => {
        window.removeEventListener('pointermove', moveSelection)
        window.removeEventListener('pointerup', stopMove)
        void processPixelateSettings(latestSettings, {
          id: Date.now(),
          x: latestSettings.cropX,
          y: latestSettings.cropY,
          width: latestSettings.cropWidth,
          height: latestSettings.cropHeight,
        })
      }
      window.addEventListener('pointermove', moveSelection)
      window.addEventListener('pointerup', stopMove)
    }
    const submitPixelate = (event: FormEvent) => {
      event.preventDefault()
      void processPixelateSettings(settings, settings.cropWidth && settings.cropHeight
        ? { id: Date.now(), x: settings.cropX, y: settings.cropY, width: settings.cropWidth, height: settings.cropHeight }
        : undefined)
    }

    return (
      <div className="workspace pixelate-workspace">
        <div className="pixelate-top-grid">
          <section className="pixelate-title-card">
            <Breadcrumbs current={breadcrumbLabel ?? localName} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="dots" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> {t.tool.free100}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="shield" /> {t.tool.staysPrivate}</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="pixelate-help-card">
            {currentLang === 'en' ? <p className="pixelate-help-intro-title" style={UI_LABEL_STYLE}>{pp.heroTitle}</p> : <h2 className="pixelate-help-intro-title">{pp.heroTitle}</h2>}
            <p className="pixelate-help-intro">{pp.heroIntro}</p>
            <p className="convert-tips-title" style={UI_LABEL_STYLE}>💡 {pp.quickHelpTitle}</p>
            {pp.quickHelpSteps.map((line) => (
              <p key={line}>✓ {line}</p>
            ))}
          </aside>
        </div>

        <form className="pixelate-layout" onSubmit={submitPixelate}>
          <aside className="settings-panel pixelate-settings-panel">
            <section>
              <div className="pixelate-section-heading"><strong>Select Area</strong><span>?</span></div>
              <div className="pixelate-tool-toggle">
                <button className={pixelateMode === 'brush' ? 'active' : ''} type="button" onClick={() => setPixelateMode('brush')}><HomeIcon name="dots" /> Brush</button>
                <button className={pixelateMode === 'eraser' ? 'active' : ''} type="button" onClick={() => setPixelateMode('eraser')}>⌫ Eraser</button>
              </div>
              <label>Brush Size <span>{settings.cropWidth || 80}px</span><input min="40" max="420" type="range" value={settings.cropWidth || 80} onChange={(event) => setBrushSize(Number(event.target.value))} /></label>
              <label>Hardness <span>50%</span><input min="0" max="100" type="range" value={50} readOnly /></label>
              <div className="pixelate-action-row">
                <button className="primary" type="submit">Pixelate Area</button>
                <button className="secondary" type="button" onClick={() => clearPixelSelection()}>Clear Selection</button>
              </div>
            </section>
            <section>
              <p style={UI_LABEL_STYLE}>Pixelate Settings</p>
              <label>Pixel Size <span>{settings.pixelSize}px</span><input min="10" max="80" type="range" value={settings.pixelSize} onChange={(event) => updatePixelSelection({ pixelSize: Number(event.target.value) })} /></label>
              <label>Pixelate Strength <span>100%</span><input min="30" max="100" type="range" value={100} readOnly /></label>
            </section>
            <button className="secondary full" type="button" onClick={resetPixelateSettings}><HomeIcon name="rotate" /> Reset</button>
          </aside>

          <section className="pixelate-editor-card">
            <div className="pixelate-toolbar">
              <div><span>Zoom</span><button type="button" onClick={() => setRotateZoom((value) => clamp(value - 10, 50, 200))}>−</button><strong>{pixelZoom}%</strong><button type="button" onClick={() => setRotateZoom((value) => clamp(value + 10, 50, 200))}>+</button><button type="button" onClick={() => setRotateZoom(100)}>Fit</button></div>
              <div><button type="button" onClick={resetPixelateSettings}><HomeIcon name="rotate" /> Reset</button></div>
            </div>
            {previewUrl ? (
              <div className={`pixelate-stage ${pixelateMode === 'eraser' ? 'eraser-mode' : ''}`} onPointerDown={handlePixelStagePointerDown}>
                <img src={processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl} alt={pp.previewAlt} style={{ transform: `scale(${pixelScale})` }} />
                {!processed && settings.cropWidth > 0 && settings.cropHeight > 0 && <button className={`pixelate-selection ${pixelateMode === 'eraser' ? 'eraser' : ''}`} type="button" style={selectionStyle} onPointerDown={handlePixelSelectionPointerDown}></button>}
                {!processed && <div className="pixelate-tip"><span>💡</span> Tip: Use the brush to select the area you want to pixelate.<button type="button">×</button></div>}
              </div>
            ) : (
              <div className="empty-preview pixelate-empty">Upload an image to start pixelating.</div>
            )}
            <div className="add-text-meta">
              <span>Original: {settings.width || 1920} × {settings.height || 1280}</span>
              <span>Current: {settings.width || 1920} × {settings.height || 1280}</span>
            </div>
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <div className="pixelate-bottom-bar">
              <span className="privacy-note"><HomeIcon name="lock" /> All processing is done in your browser. Your images never leave your device.</span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> Download Image</button>
              )}
            </div>
          </section>

          <aside className="pixelate-side-card">
            <section>
              <p style={UI_LABEL_STYLE}>Presets</p>
              <div className="pixelate-preset-grid">
                {[['Light', 10], ['Medium', 20], ['Strong', 40], ['Extreme', 80]].map(([label, size]) => (
                  <button className={settings.pixelSize === size ? 'active' : ''} key={label} type="button" onClick={() => updatePixelSelection({ pixelSize: Number(size) })}>
                    <span></span><strong>{label}</strong><small>({size}px)</small>
                  </button>
                ))}
              </div>
            </section>
            <section>
              <div className="areas-heading"><p style={UI_LABEL_STYLE}>Recent Edits</p><button type="button" onClick={() => setPixelateHistory(['Original'])}>Clear</button></div>
              {pixelateHistory.map((item, index) => (
                <div className="history-item" key={`${item}-${index}`}>
                  <span>{item === 'Original' ? <HomeIcon name="image" /> : '▦'}</span>
                  <div><strong>{item}</strong><small>{index === 0 ? 'Just now' : `${index + 1} minutes ago`}</small></div>
                  <button type="button">⋮</button>
                </div>
              ))}
            </section>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'blur-image') {
    const bp = t.blurImagePage
    const blurZoom = rotateZoom
    const blurScale = blurZoom / 100
    const currentBlurBrushSize = settings.cropWidth || defaultBlurBrushSize(settings.width, settings.height)
    const maxBlurBrushSize = Math.max(80, Math.min(320, Math.round(Math.min(settings.width || 320, settings.height || 320) * 0.45)))
    const selectionStyle = {
      left: `${settings.width ? ((settings.cropX + settings.cropWidth / 2) / settings.width) * 100 : 68}%`,
      top: `${settings.height ? ((settings.cropY + settings.cropHeight / 2) / settings.height) * 100 : 62}%`,
      width: `${settings.width ? (settings.cropWidth / settings.width) * 100 : 22}%`,
      height: `${settings.height ? (settings.cropHeight / settings.height) * 100 : 22}%`,
      transform: `translate(-50%, -50%) scale(${blurScale})`,
    } as CSSProperties
    const blurAreaStyle = (area: CropArea) => ({
      left: `${settings.width ? ((area.x + area.width / 2) / settings.width) * 100 : 0}%`,
      top: `${settings.height ? ((area.y + area.height / 2) / settings.height) * 100 : 0}%`,
      width: `${settings.width ? (area.width / settings.width) * 100 : 0}%`,
      height: `${settings.height ? (area.height / settings.height) * 100 : 0}%`,
      transform: `translate(-50%, -50%) scale(${blurScale})`,
    }) as CSSProperties
    const updateBlurSelection = (patch: Partial<Pick<ToolSettingsState, 'cropX' | 'cropY' | 'cropWidth' | 'cropHeight' | 'blur'>>) => {
      clearOutputs()
      setSettings((current) => ({ ...current, ...patch }))
    }
    const resetBlurSettings = () => {
      clearOutputs()
      setRotateZoom(100)
      setBlurMode('brush')
      setBlurAreas([])
      const size = defaultBlurBrushSize(settings.width, settings.height)
      setSettings((current) => ({
        ...current,
        cropX: Math.round((current.width || 320) * 0.62),
        cropY: Math.round((current.height || 320) * 0.56),
        cropWidth: size,
        cropHeight: size,
        blur: 12,
      }))
    }
    const clearBlurSelection = () => {
      clearOutputs()
      setBlurAreas([])
      setSettings((current) => ({ ...current, cropWidth: 0, cropHeight: 0 }))
      setBlurHistory((history) => ['Selection cleared', ...history.filter((item) => item !== 'Selection cleared')].slice(0, 5))
    }
    const blurPatchForPointer = (event: PointerEvent | ReactPointerEvent<HTMLElement>, rect: DOMRect) => {
      if (!settings.width || !settings.height) return null
      const size = currentBlurBrushSize
      const centerX = ((event.clientX - rect.left) / rect.width) * settings.width
      const centerY = ((event.clientY - rect.top) / rect.height) * settings.height
      return {
        cropWidth: size,
        cropHeight: size,
        cropX: Math.round(clamp(centerX - size / 2, 0, Math.max(0, settings.width - size))),
        cropY: Math.round(clamp(centerY - size / 2, 0, Math.max(0, settings.height - size))),
      }
    }
    const blurAreaFromPatch = (patch: Pick<ToolSettingsState, 'cropX' | 'cropY' | 'cropWidth' | 'cropHeight'>) => ({
      id: Date.now() + Math.round(patch.cropX + patch.cropY),
      x: patch.cropX,
      y: patch.cropY,
      width: patch.cropWidth,
      height: patch.cropHeight,
    })
    const areasIntersect = (left: CropArea, right: CropArea) => {
      const leftCenterX = left.x + left.width / 2
      const leftCenterY = left.y + left.height / 2
      const rightCenterX = right.x + right.width / 2
      const rightCenterY = right.y + right.height / 2
      const distance = Math.hypot(leftCenterX - rightCenterX, leftCenterY - rightCenterY)
      return distance < (left.width + right.width) / 2
    }
    const processBlurSettings = async (nextSettings: ToolSettingsState, nextBlurAreas?: CropArea[]) => {
      if (!files.length) return
      setError('')
      setStatus(t.tool.processingBrowser)
      try {
        const nextAreas = nextBlurAreas ?? (blurAreas.length
          ? blurAreas
          : nextSettings.cropWidth && nextSettings.cropHeight
            ? [{ id: Date.now(), x: nextSettings.cropX, y: nextSettings.cropY, width: nextSettings.cropWidth, height: nextSettings.cropHeight }]
            : [])
        setBlurAreas(nextAreas)
        setProcessed(await processImage(files[0], tool.slug, { ...nextSettings, blurAreas: nextAreas }))
        setStatus('Done. Your result is ready to download.')
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Something went wrong while processing this image.')
        setStatus('')
      }
    }
    const moveBlurSelectionToPointer = (event: PointerEvent | ReactPointerEvent<HTMLElement>, rect: DOMRect) => {
      const patch = blurPatchForPointer(event, rect)
      if (!patch) return null
      updateBlurSelection(patch)
      return { ...settings, ...patch }
    }
    const handleBlurStagePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
      const stage = event.currentTarget as HTMLElement
      if (!settings.width || !settings.height) return
      event.preventDefault()
      clearOutputs()
      const rect = stage.getBoundingClientRect()
      let latestSettings = moveBlurSelectionToPointer(event, rect)
      let workingAreas = blurAreas
      const updateAreasForPointer = (nextSettings: ToolSettingsState | null) => {
        if (!nextSettings) return
        const pointerArea = blurAreaFromPatch(nextSettings)
        if (blurMode === 'eraser') {
          workingAreas = workingAreas.filter((area) => !areasIntersect(area, pointerArea))
        } else {
          const lastArea = workingAreas.at(-1)
          if (!lastArea || Math.hypot(lastArea.x - pointerArea.x, lastArea.y - pointerArea.y) > pointerArea.width * 0.35) {
            workingAreas = [...workingAreas, pointerArea]
          }
        }
        setBlurAreas(workingAreas)
      }
      updateAreasForPointer(latestSettings)
      const moveSelection = (moveEvent: PointerEvent) => {
        latestSettings = moveBlurSelectionToPointer(moveEvent, rect)
        updateAreasForPointer(latestSettings)
      }
      const stopMove = () => {
        window.removeEventListener('pointermove', moveSelection)
        window.removeEventListener('pointerup', stopMove)
        if (latestSettings) {
          setBlurHistory((history) => [blurMode === 'eraser' ? 'Area erased' : 'Blur applied', ...history].slice(0, 5))
          void processBlurSettings(latestSettings, workingAreas)
        }
      }
      window.addEventListener('pointermove', moveSelection)
      window.addEventListener('pointerup', stopMove)
    }
    const setBlurBrushSize = (size: number) => {
      updateBlurSelection({
        cropWidth: size,
        cropHeight: size,
        cropX: clamp(settings.cropX, 0, Math.max(0, settings.width - size)),
        cropY: clamp(settings.cropY, 0, Math.max(0, settings.height - size)),
      })
    }
    const submitBlur = (event: FormEvent) => {
      event.preventDefault()
      void processBlurSettings(settings)
    }
    const undoLastBlurAction = () => {
      if (!blurAreas.length) return
      const nextAreas = blurAreas.slice(0, -1)
      setBlurAreas(nextAreas)
      setBlurHistory((history) => ['Undo last blur', ...history].slice(0, 5))
      void processBlurSettings(settings, nextAreas)
    }
    const clearAllBlurActions = () => {
      clearOutputs()
      setBlurAreas([])
      setBlurHistory(['Original'])
    }

    return (
      <div className="workspace blur-workspace pixelate-workspace">
        <div className="pixelate-top-grid">
          <section className="pixelate-title-card">
            <Breadcrumbs current={breadcrumbLabel ?? localName} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="sun" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <p className="tool-hero-subtitle" style={UI_LABEL_STYLE}>{bp.heroTitle}</p>
            <p className="tool-hero-intro">{bp.heroIntro}</p>
            <div className="privacy-card">
              <span><HomeIcon name="smile" /> {t.tool.free100}</span>
              <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
              <span><HomeIcon name="shield" /> {t.tool.staysPrivate}</span>
              <span><HomeIcon name="bolt" /> Works in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="pixelate-help-card">
            <p className="convert-tips-title" style={UI_LABEL_STYLE}>💡 {bp.quickHelpTitle}</p>
            {bp.quickHelpSteps.map((line) => (
              <p key={line}>✓ {line}</p>
            ))}
          </aside>
        </div>

        <form className="pixelate-layout" onSubmit={submitBlur}>
          <aside className="settings-panel pixelate-settings-panel">
            <section>
              <div className="pixelate-section-heading"><strong>Select Area</strong><span>?</span></div>
              <div className="pixelate-tool-toggle">
                <button className={blurMode === 'brush' ? 'active' : ''} type="button" onClick={() => setBlurMode('brush')}><HomeIcon name="sun" /> Brush</button>
                <button className={blurMode === 'eraser' ? 'active' : ''} type="button" onClick={() => setBlurMode('eraser')}>⌫ Eraser</button>
              </div>
              <label>Brush Size <span>{currentBlurBrushSize}px</span><input min="40" max={maxBlurBrushSize} type="range" value={currentBlurBrushSize} onChange={(event) => setBlurBrushSize(Number(event.target.value))} /></label>
              <label>Hardness <span>50%</span><input min="0" max="100" type="range" value={50} readOnly /></label>
              <div className="pixelate-action-row">
                <button className="primary" type="submit">Blur Area</button>
                <button className="secondary" type="button" onClick={clearBlurSelection}>Clear Selection</button>
              </div>
            </section>
            <section>
              <p style={UI_LABEL_STYLE}>Blur Settings</p>
              <label>Blur Strength <span>{Math.round((settings.blur / 30) * 100)}%</span><input min="1" max="30" type="range" value={settings.blur} onChange={(event) => updateBlurSelection({ blur: Number(event.target.value) })} /></label>
              <label>Blur Type<select><option>Gaussian Blur</option><option>Soft Blur</option><option>Background Blur</option></select></label>
            </section>
            <button className="secondary full" type="button" onClick={resetBlurSettings}><HomeIcon name="rotate" /> Reset</button>
          </aside>

          <section className="pixelate-editor-card">
            <div className="pixelate-toolbar">
              <div><span>Zoom</span><button type="button" onClick={() => setRotateZoom((value) => clamp(value - 10, 50, 200))}>−</button><strong>{blurZoom}%</strong><button type="button" onClick={() => setRotateZoom((value) => clamp(value + 10, 50, 200))}>+</button><button type="button" onClick={() => setRotateZoom(100)}>Fit</button></div>
              <div><button type="button" onClick={resetBlurSettings}><HomeIcon name="rotate" /> Reset</button></div>
            </div>
            {previewUrl ? (
              <div className={`pixelate-stage blur-stage ${blurMode === 'eraser' ? 'eraser-mode' : ''}`} onPointerDown={handleBlurStagePointerDown}>
                <img src={processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl} alt="Blur preview" style={{ transform: `scale(${blurScale})` }} />
                {blurAreas.map((area) => <span className="pixelate-selection blur-selection committed" key={area.id} style={blurAreaStyle(area)}></span>)}
                {settings.cropWidth > 0 && settings.cropHeight > 0 && <button className={`pixelate-selection blur-selection ${blurMode === 'eraser' ? 'eraser' : ''}`} type="button" style={selectionStyle}></button>}
                <div className="pixelate-tip"><span>💡</span> Tip: Use the brush to select the area you want to blur.<button type="button">×</button></div>
              </div>
            ) : (
              <div className="empty-preview pixelate-empty">Upload an image to start blurring.</div>
            )}
            <div className="add-text-meta">
              <span>Original: {settings.width || 1920} × {settings.height || 1280}</span>
              <span>Current: {settings.width || 1920} × {settings.height || 1280}</span>
            </div>
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <div className="pixelate-bottom-bar">
              <span className="privacy-note"><HomeIcon name="lock" /> Your image is processed in your browser. It never leaves your device.</span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> Download Image</button>
              )}
            </div>
          </section>

          <aside className="pixelate-side-card">
            <section>
              <div className="areas-heading"><p style={UI_LABEL_STYLE}>History</p><button type="button" disabled={!blurAreas.length} onClick={undoLastBlurAction}>Undo</button><button type="button" onClick={clearAllBlurActions}>Clear</button></div>
              {blurHistory.map((item, index) => (
                <div className="history-item" key={`${item}-${index}`}>
                  <span>{item === 'Original' ? <HomeIcon name="image" /> : 'Tt'}</span>
                  <div><strong>{item}</strong><small>{index === 0 ? 'Just now' : `${index + 1} minutes ago`}</small></div>
                  <button type="button" disabled={!blurAreas.length} onClick={undoLastBlurAction}>Undo</button>
                </div>
              ))}
            </section>
          </aside>
        </form>
      </div>
    )
  }

  if (tool.slug === 'remove-exif') {
    const metadataEntries = metadata ? Object.entries(metadata).filter(([, value]) => value !== undefined && value !== null) : []
    const gpsValue = metadataEntries.find(([key]) => key.toLowerCase().includes('latitude') || key.toLowerCase().includes('longitude'))
    const cameraValue = metadataEntries.find(([key]) => ['make', 'model', 'lensmodel'].includes(key.toLowerCase()))
    const dateValue = metadataEntries.find(([key]) => key.toLowerCase().includes('date'))
    const isoValue = metadataEntries.find(([key]) => key.toLowerCase() === 'iso')
    const originalSize = files[0]?.size ?? 0
    const afterSize = processed?.size ?? originalSize
    const savedBytes = Math.max(0, originalSize - afterSize)
    const savedPercent = originalSize ? Math.round((savedBytes / originalSize) * 1000) / 10 : 0
    const exifSummary = [
      ['Camera', cameraValue ? String(cameraValue[1]) : 'Not found'],
      ['Date', dateValue ? String(dateValue[1]).slice(0, 24) : 'Not found'],
      ['Location', gpsValue ? 'GPS data detected' : 'Not found'],
      ['ISO', isoValue ? String(isoValue[1]) : 'Not found'],
    ]

    return (
      <div className="workspace remove-exif-workspace">
        <div className="remove-exif-top-grid">
          <section className="remove-exif-title-card">
            <Breadcrumbs current={breadcrumbLabel ?? localName} navigate={(to) => window.history.pushState({}, '', to)} />
            <span className="title-doodle"><HomeIcon name="info" /></span>
            <h1>{localName}</h1>
            <p>{localSubtitle}</p>
            <div className="privacy-card">
              <span><HomeIcon name="shield" /> Protect your privacy</span>
              <span><HomeIcon name="search" /> Remove location & device info</span>
              <span><HomeIcon name="lock" /> {t.tool.free100}. {t.tool.noSignup}</span>
              <span><HomeIcon name="device" /> Processed in your browser</span>
            </div>
          </section>
          <UploadDropzone multiple={false} onFiles={handleFiles} />
          <aside className="remove-exif-help-card">
            <h2>✨ What is EXIF?</h2>
            <p>EXIF metadata may contain private image details such as:</p>
            <ul>
              <li><HomeIcon name="search" /> Location (GPS)</li>
              <li><HomeIcon name="image" /> Camera & lens info</li>
              <li><HomeIcon name="file" /> Date & time</li>
              <li><HomeIcon name="device" /> Device settings</li>
            </ul>
            <strong><HomeIcon name="shield" /> Remove EXIF to protect your privacy.</strong>
          </aside>
        </div>

        <form className="remove-exif-layout" onSubmit={process}>
          <aside className="settings-panel remove-exif-options-card">
            <h2>Options</h2>
            <span className="field-title">Remove</span>
            <label className="toggle-row metadata-toggle">
              <input type="radio" name="remove-exif-mode" checked={removeExifMode === 'all'} onChange={() => setRemoveExifMode('all')} />
              All EXIF metadata
              <small>Recommended</small>
            </label>
            <label className="toggle-row metadata-toggle">
              <input type="radio" name="remove-exif-mode" checked={removeExifMode === 'location'} onChange={() => setRemoveExifMode('location')} />
              Location information only
            </label>
            {removeExifMode === 'location' && (
              <p className="remove-exif-mode-note">Browser processing will remove all metadata to ensure GPS data is fully cleared.</p>
            )}
            <span className="field-title">Output format</span>
            <select value={settings.format} onChange={(event) => setSettings((value) => ({ ...value, format: event.target.value as OutputFormat }))}>
              <option value="image/jpeg">Keep original format</option>
              <option value="image/jpeg">JPG</option>
              <option value="image/png">PNG</option>
              <option value="image/webp">WebP</option>
            </select>
            <button className="primary full" type="submit"><HomeIcon name="sparkle" /> Remove EXIF</button>
            <button className="secondary full" type="button" onClick={resetTool}>Reset</button>
          </aside>

          <section className="remove-exif-preview-card">
            <div className="preview-heading">
              <h2>Preview</h2>
              <button className="compare-button" type="button"><HomeIcon name="convert" /> Compare</button>
            </div>
            {previewUrl ? (
              <div className="remove-exif-compare">
                <figure>
                  <figcaption><strong>Original</strong><span>{files[0]?.name}</span></figcaption>
                  <img src={previewUrl} alt="Original with EXIF" />
                  <div className="exif-overlay">
                    <strong>EXIF Info</strong>
                    {exifSummary.map(([label, value]) => <span key={label}>{label}: {value}</span>)}
                    {gpsValue && <em>⚠ Contains GPS location</em>}
                  </div>
                </figure>
                <div className="remove-exif-arrow">→</div>
                <figure>
                  <figcaption><strong>Without EXIF</strong><span>{processed?.name ?? `${fileNameWithoutExtension(files[0]?.name ?? 'image')}_noexif.jpg`}</span></figcaption>
                  <img src={processed && !processed.name.endsWith('.zip') && !processed.name.endsWith('.pdf') ? processed.url : previewUrl} alt="Without EXIF preview" />
                  <div className="no-exif-overlay"><strong>✓ No EXIF metadata</strong><span>All metadata has been removed.</span></div>
                </figure>
              </div>
            ) : (
              <div className="empty-preview remove-exif-empty">Upload an image to preview EXIF metadata.</div>
            )}
            {metadata && (
              <div className="remove-exif-success">
                ✓ EXIF metadata will be completely removed from your image.
              </div>
            )}
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
          </section>

          <aside className="remove-exif-summary-card">
            <h2>Summary</h2>
            <dl>
              <div><dt>Original file</dt><dd>{files[0]?.name ?? '-'}</dd></div>
              <div><dt>Original size</dt><dd>{originalSize ? formatSize(originalSize) : '-'}</dd></div>
              <div><dt>After removing EXIF</dt><dd>{processed ? formatSize(afterSize) : '-'}</dd></div>
              <div><dt>Size saved</dt><dd className="green-text">{processed ? `${formatSize(savedBytes)} (${savedPercent}%)` : '-'}</dd></div>
            </dl>
            <div className="ready-badge"><span>✓</span><strong>{processed ? 'Ready to download' : 'Ready after processing'}</strong></div>
            {processed ? (
              <a className="download-button full" href={processed.url} download={processed.name}><HomeIcon name="download" /> Download Image</a>
            ) : (
              <button className="primary full" type="submit"><HomeIcon name="download" /> Download Image</button>
            )}
          </aside>
        </form>

        <p className="remove-exif-privacy-note"><HomeIcon name="lock" /> Your image is processed in your browser. We never upload your files to our servers.</p>
      </div>
    )
  }

  return (
    <div className="workspace compress-workspace">
      <div className="compress-top">
        <section className="compress-title-card">
          <span className="title-doodle"><HomeIcon name={toolIconMap[tool.slug] ?? 'sparkle'} /></span>
          <h1>{localName}</h1>
          <p>{localSubtitle}</p>
          <div className="privacy-card">
            <span><HomeIcon name="lock" /> {t.tool.staysPrivate}</span>
            <span><HomeIcon name="lock" /> {t.tool.noSignup}</span>
            <span><HomeIcon name="smile" /> {t.tool.alwaysFree}</span>
          </div>
        </section>
        <UploadDropzone multiple={isBatchUpload} onFiles={handleFiles} />
        <aside className="compress-tips-card">
          {tool.slug === 'resize-image' ? (
            <h3><HomeIcon name="sparkle" /> {t.tool.tipsForTool}</h3>
          ) : (
            <h2><HomeIcon name="sparkle" /> {t.tool.tipsForTool}</h2>
          )}
          {tool.tips.map((tip) => <p key={tip}>✓ {tip}</p>)}
        </aside>
      </div>
      <form className="tool-panels compress-tool-panels" onSubmit={process}>
        <aside className="settings-panel">
          {tool.slug === 'resize-image' ? (
            <h3>{settingsTitle(tool, t)}</h3>
          ) : currentLang === 'en' && PLAIN_SETTINGS_LABEL_SLUGS.has(tool.slug) ? (
            <p className="settings-panel-label" style={{ margin: 0, color: 'var(--ink)', fontSize: '1rem', fontWeight: 800 }}>Settings</p>
          ) : (
            <h2>{settingsTitle(tool, t)}</h2>
          )}
          {isCompressTool && (
            <div className="preset-row">
              <span>Preset</span>
              <div>
                <button className={compressPreset === 'recommended' ? 'preset active' : 'preset'} type="button" onClick={() => { clearOutputs(); setCompressPreset('recommended'); setSettings((value) => ({ ...value, quality: 0.82 })) }}>{t.tool.preset.recommended}</button>
                <button className={compressPreset === 'smallest' ? 'preset active' : 'preset'} type="button" onClick={() => { clearOutputs(); setCompressPreset('smallest'); setSettings((value) => ({ ...value, quality: 0.62 })) }}>{t.tool.preset.smallest}</button>
                <button className={compressPreset === 'high' ? 'preset active' : 'preset'} type="button" onClick={() => { clearOutputs(); setCompressPreset('high'); setSettings((value) => ({ ...value, quality: 1 })) }}>{t.tool.preset.high}</button>
              </div>
            </div>
          )}
          <ToolSettings tool={tool} settings={settings} setSettings={setSettings} onSettingsChange={() => { clearOutputs(); if (isCompressTool) setCompressPreset('custom') }} />
          <button className="primary full apply-button" type="submit">
            {buttonLabel(tool.slug, t)}
          </button>
          <button
            className="secondary full"
            type="button"
            onClick={resetTool}
          >
            {t.tool.reset}
          </button>
        </aside>
        <section className="preview-panel">
          <div className="preview-heading">
            <h2>{t.tool.preview}</h2>
            <button type="button" className="compare-button"><HomeIcon name="convert" /> Compare</button>
          </div>
          {previewUrl ? (
            <div className="preview-grid">
              <figure>
                <div className="figure-top"><span>{t.tool.original}: {files[0]?.name}</span><em>{files[0] && formatSize(files[0].size)}</em></div>
                <img src={previewUrl} alt="Original preview" />
                <figcaption>{t.tool.original} {files[0] && formatSize(files[0].size)}</figcaption>
              </figure>
              {processed ? (
                <figure>
                  <div className="figure-top"><span>{t.tool.result}</span><em>{formatSize(processed.size)} {resultSavedPercent > 0 && `(-${resultSavedPercent}%)`}</em></div>
                  {processed.blob.type === 'application/pdf' || processed.name.endsWith('.zip') ? (
                    <div className="file-result">{processed.name}</div>
                  ) : (
                    <img src={processed.url} alt="Processed preview" />
                  )}
                  <figcaption>{t.tool.result} {formatSize(processed.size)}</figcaption>
                </figure>
              ) : (
                <div className="empty-preview">{t.tool.noImageYet}</div>
              )}
            </div>
          ) : (
            <div className="empty-preview">{t.tool.noImageYet}</div>
          )}
          {(status || resultSavedPercent > 0) && (
            <div className="combined-success">
              {resultSavedPercent > 0 && <strong>Great! Your file is {resultSavedPercent}% smaller.</strong>}
              {status && <span>{status}</span>}
            </div>
          )}
          {metadata && (
            <div className="metadata-box">
              <h3>EXIF preview</h3>
              {Object.keys(metadata).length ? (
                <pre>{JSON.stringify(metadata, null, 2).slice(0, 1200)}</pre>
              ) : (
                <p>No readable EXIF metadata found.</p>
              )}
            </div>
          )}
          {batch.length > 0 && (
            <ul className="batch-list">
              {batch.map((item) => (
                <li key={item.name}>{item.name} · {formatSize(item.size)}</li>
              ))}
            </ul>
          )}
          <div className="compress-preview-footer">
            <div className="compress-preview-notes">
              {error && <p className="error">{error}</p>}
              <p className="privacy-note">{t.trust.barPrivateDesc}</p>
            </div>
            <div className="compress-action-bar">
              <span>{actionSummary}</span>
              {processed ? (
                <a className="download-button" href={processed.url} download={processed.name}>
                  <HomeIcon name="download" /> {downloadLabel(processed, t)}
                </a>
              ) : (
                <button className="primary" type="submit"><HomeIcon name="download" /> {downloadLabel(undefined, t)}</button>
              )}
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}

export function ToolSettings({
  tool,
  settings,
  setSettings,
  onSettingsChange,
}: {
  tool: Tool
  settings: ToolSettingsState
  setSettings: React.Dispatch<React.SetStateAction<ToolSettingsState>>
  onSettingsChange?: () => void
}) {
  const update = <K extends keyof ToolSettingsState>(key: K, value: ToolSettingsState[K]) => {
    onSettingsChange?.()
    setSettings((current) => ({ ...current, [key]: value }))
  }

  if (tool.slug === 'resize-image') {
    const setDimensions = (width: number, height: number) => {
      setSettings((current) => ({ ...current, width, height }))
    }
    const updateWidth = (width: number) => {
      setSettings((current) => ({
        ...current,
        width,
        height: current.keepAspect && current.width > 0
          ? Math.max(1, Math.round((width * current.height) / current.width))
          : current.height,
      }))
    }
    const updateHeight = (height: number) => {
      setSettings((current) => ({
        ...current,
        height,
        width: current.keepAspect && current.height > 0
          ? Math.max(1, Math.round((height * current.width) / current.height))
          : current.width,
      }))
    }

    return (
      <div className="resize-settings">
        <div className="resize-section">
          <span className="field-title">Resize By</span>
          <div className="segmented-control">
            <button
              className={settings.resizeMode === 'pixels' ? 'active' : ''}
              type="button"
              onClick={() => update('resizeMode', 'pixels')}
            >
              Pixels
            </button>
            <button
              className={settings.resizeMode === 'percentage' ? 'active' : ''}
              type="button"
              onClick={() => update('resizeMode', 'percentage')}
            >
              Percentage
            </button>
          </div>
        </div>

        {settings.resizeMode === 'pixels' ? (
          <div className="resize-section">
            <span className="field-title">Dimensions</span>
            <div className="dimension-grid">
              <label>
                Width (px)
                <input min="1" type="number" value={settings.width} onChange={(event) => updateWidth(Number(event.target.value))} />
              </label>
              <label>
                Height (px)
                <input min="1" type="number" value={settings.height} onChange={(event) => updateHeight(Number(event.target.value))} />
              </label>
            </div>
            <label className="toggle-row">
              <input type="checkbox" checked={settings.keepAspect} onChange={(event) => update('keepAspect', event.target.checked)} />
              Keep aspect ratio
            </label>
          </div>
        ) : (
          <label>
            Scale percentage {settings.percentage}%
            <input min="1" max="400" type="range" value={settings.percentage} onChange={(event) => update('percentage', Number(event.target.value))} />
          </label>
        )}

        <div className="resize-section">
          <span className="field-title">Common Sizes</span>
          <div className="size-pills">
            <button type="button" onClick={() => setDimensions(512, 512)}>512 × 512</button>
            <button type="button" onClick={() => setDimensions(1080, 1080)}>1080 × 1080</button>
            <button type="button" onClick={() => setDimensions(1920, 1080)}>1920 × 1080</button>
            <button type="button" onClick={() => setDimensions(1280, 720)}>1280 × 720</button>
            <button type="button" onClick={() => setDimensions(1024, 768)}>1024 × 768</button>
            <button type="button" onClick={() => setDimensions(800, 600)}>800 × 600</button>
            <button type="button" onClick={() => setDimensions(settings.width, settings.height)}>Custom</button>
          </div>
        </div>

        <div className="resize-section">
          <span className="field-title">Output Format</span>
          <div className="format-pills">
            {Object.entries(formatLabels).map(([value, label]) => (
              <button
                className={settings.format === value ? 'active' : ''}
                key={value}
                type="button"
                onClick={() => update('format', value as OutputFormat)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label>
          Image Quality {Math.round(settings.quality * 100)}%
          <input min="0.35" max="1" step="0.01" type="range" value={settings.quality} onChange={(event) => update('quality', Number(event.target.value))} />
        </label>

        <label className="toggle-row metadata-toggle">
          <input type="checkbox" defaultChecked />
          Keep metadata (EXIF)
        </label>
      </div>
    )
  }

  return (
    <>
      {['compress-image', 'crop-image', 'rotate-image', 'flip-image', 'convert-image', 'add-text', 'add-watermark', 'blur-image', 'pixelate-image', 'remove-exif', 'black-and-white-image', 'invert-image-colors'].includes(tool.slug) && (
        <label>
          Output format
          <select value={settings.format} onChange={(event) => update('format', event.target.value as OutputFormat)}>
            {Object.entries(formatLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
      )}
      {tool.slug === 'convert-to-webp' && (
        <label>
          Output format
          <input value="WebP" readOnly />
        </label>
      )}
      {['compress-image', 'batch-compress', 'convert-image', 'convert-to-webp'].includes(tool.slug) && (
        <label>
          Quality {Math.round(settings.quality * 100)}%
          <input min="0.35" max="1" step="0.01" type="range" value={settings.quality} onChange={(event) => update('quality', Number(event.target.value))} />
        </label>
      )}
      {tool.slug === 'crop-image' && (
        <div className="two-col">
          <label>Crop X<input min="0" type="number" value={settings.cropX} onChange={(event) => update('cropX', Number(event.target.value))} /></label>
          <label>Crop Y<input min="0" type="number" value={settings.cropY} onChange={(event) => update('cropY', Number(event.target.value))} /></label>
          <label>Width<input min="1" type="number" value={settings.cropWidth} onChange={(event) => update('cropWidth', Number(event.target.value))} /></label>
          <label>Height<input min="1" type="number" value={settings.cropHeight} onChange={(event) => update('cropHeight', Number(event.target.value))} /></label>
        </div>
      )}
      {tool.slug === 'rotate-image' && (
        <>
          <label>
            Angle {settings.angle}°
            <input min="-180" max="180" step="1" type="range" value={settings.angle} onChange={(event) => update('angle', Number(event.target.value))} />
          </label>
          <label>
            Background
            <input type="color" value={settings.background} onChange={(event) => update('background', event.target.value)} />
          </label>
        </>
      )}
      {tool.slug === 'flip-image' && (
        <div className="check-row">
          <label><input type="checkbox" checked={settings.flipX} onChange={(event) => update('flipX', event.target.checked)} /> Horizontal</label>
          <label><input type="checkbox" checked={settings.flipY} onChange={(event) => update('flipY', event.target.checked)} /> Vertical</label>
        </div>
      )}
      {['add-text', 'add-watermark'].includes(tool.slug) && (
        <>
          <label>
            Text
            <input value={settings.text} onChange={(event) => update('text', event.target.value)} />
          </label>
          <label>
            Font size {settings.textSize}px
            <input min="12" max="160" type="range" value={settings.textSize} onChange={(event) => update('textSize', Number(event.target.value))} />
          </label>
          <label>
            Color
            <input type="color" value={settings.textColor} onChange={(event) => update('textColor', event.target.value)} />
          </label>
        </>
      )}
      {tool.slug === 'add-watermark' && (
        <label>
          Opacity {Math.round(settings.watermarkOpacity * 100)}%
          <input min="0.1" max="1" step="0.05" type="range" value={settings.watermarkOpacity} onChange={(event) => update('watermarkOpacity', Number(event.target.value))} />
        </label>
      )}
      {tool.slug === 'blur-image' && (
        <label>
          Blur strength {settings.blur}px
          <input min="1" max="30" type="range" value={settings.blur} onChange={(event) => update('blur', Number(event.target.value))} />
        </label>
      )}
      {tool.slug === 'pixelate-image' && (
        <label>
          Pixel size {settings.pixelSize}px
          <input min="4" max="48" type="range" value={settings.pixelSize} onChange={(event) => update('pixelSize', Number(event.target.value))} />
        </label>
      )}
    </>
  )
}

export function UploadDropzone({
  multiple,
  onFiles,
  hintSmall,
}: {
  multiple?: boolean
  onFiles: (files: File[]) => void
  hintSmall?: string
}) {
  const [dragging, setDragging] = useState(false)
  const { t } = useI18n()

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setDragging(false)
    onFiles(Array.from(event.dataTransfer.files))
  }

  return (
    <label
      className={`upload-zone ${dragging ? 'dragging' : ''}`}
      onDragOver={(event) => {
        event.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
    >
      <span className="upload-mark"><HomeIcon name="upload" /></span>
      <strong>{multiple ? t.tool.uploadImages : t.tool.uploadImage}</strong>
      <small>{hintSmall ?? (multiple ? t.tool.orDragImages : t.tool.orDragImage)}</small>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onFiles(Array.from(event.target.files ?? []))
          event.currentTarget.value = ''
        }}
      />
    </label>
  )
}

export function UploadButton({ label = 'Upload an image', multiple = false, onFiles }: { label?: string; multiple?: boolean; onFiles: (files: File[]) => void }) {
  return (
    <label className="primary upload-button">
      <HomeIcon name="upload" /> {label}
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(event) => {
          onFiles(Array.from(event.target.files ?? []))
          event.currentTarget.value = ''
        }}
      />
    </label>
  )
}

function textLinesForImage(text: string) {
  const value = text.trim() || 'NanoImage'
  if (value.includes('\n')) return value.split(/\n+/)
  return value.split(/\s+/).length > 2 ? value.replace(/\s+(\S+)$/, '\n$1').split('\n') : [value]
}

function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const value = text.trim()
  if (!value) return []
  return value.split(/\n+/).flatMap((paragraph) => {
    const words = paragraph.split(/\s+/).filter(Boolean)
    if (words.length <= 1) return words.length ? words : ['']
    const lines: string[] = []
    let line = words[0]
    words.slice(1).forEach((word) => {
      const candidate = `${line} ${word}`
      if (ctx.measureText(candidate).width <= maxWidth) {
        line = candidate
      } else {
        lines.push(line)
        line = word
      }
    })
    lines.push(line)
    return lines
  })
}

function textLayerFromSettings(id: number, settings: ToolSettingsState): TextLayer {
  return {
    id,
    text: settings.text,
    textSize: settings.textSize,
    textColor: settings.textColor,
    textXPercent: settings.textXPercent,
    textYPercent: settings.textYPercent,
    textBoxWidthPercent: settings.textBoxWidthPercent,
    textBoxHeightPercent: settings.textBoxHeightPercent,
    textBold: settings.textBold,
    textItalic: settings.textItalic,
    textUnderline: settings.textUnderline,
    textShadow: settings.textShadow,
    textOutline: settings.textOutline,
    textAlign: settings.textAlign,
    textShadowColor: settings.textShadowColor,
    textOutlineColor: settings.textOutlineColor,
    textShadowBlur: settings.textShadowBlur,
    textShadowOffsetX: settings.textShadowOffsetX,
    textShadowOffsetY: settings.textShadowOffsetY,
  }
}

function settingsFromTextLayer(settings: ToolSettingsState, layer: TextLayer): ToolSettingsState {
  return {
    ...settings,
    text: layer.text,
    textSize: layer.textSize ?? settings.textSize,
    textColor: layer.textColor ?? settings.textColor,
    textXPercent: layer.textXPercent ?? settings.textXPercent,
    textYPercent: layer.textYPercent ?? settings.textYPercent,
    textBoxWidthPercent: layer.textBoxWidthPercent ?? settings.textBoxWidthPercent,
    textBoxHeightPercent: layer.textBoxHeightPercent ?? settings.textBoxHeightPercent,
    textBold: layer.textBold ?? settings.textBold,
    textItalic: layer.textItalic ?? settings.textItalic,
    textUnderline: layer.textUnderline ?? settings.textUnderline,
    textShadow: layer.textShadow ?? settings.textShadow,
    textOutline: layer.textOutline ?? settings.textOutline,
    textAlign: layer.textAlign ?? settings.textAlign,
    textShadowColor: layer.textShadowColor ?? settings.textShadowColor,
    textOutlineColor: layer.textOutlineColor ?? settings.textOutlineColor,
    textShadowBlur: layer.textShadowBlur ?? settings.textShadowBlur,
    textShadowOffsetX: layer.textShadowOffsetX ?? settings.textShadowOffsetX,
    textShadowOffsetY: layer.textShadowOffsetY ?? settings.textShadowOffsetY,
  }
}

function drawTextLayerOnCanvas(ctx: CanvasRenderingContext2D, width: number, height: number, layerSettings: ToolSettingsState) {
  if (!layerSettings.text.trim()) return
  ctx.save()
  ctx.font = `${layerSettings.textItalic ? 'italic ' : ''}${layerSettings.textBold ? 900 : 500} ${layerSettings.textSize}px "Comic Sans MS", "Trebuchet MS", cursive`
  ctx.fillStyle = layerSettings.textColor
  ctx.strokeStyle = layerSettings.textOutline ? layerSettings.textOutlineColor : 'rgba(0,0,0,.35)'
  ctx.lineWidth = Math.max(2, layerSettings.textSize / 54)
  ctx.textAlign = layerSettings.textAlign
  ctx.textBaseline = 'middle'
  if (layerSettings.textShadow) {
    ctx.shadowColor = layerSettings.textShadowColor
    ctx.shadowBlur = layerSettings.textShadowBlur
    ctx.shadowOffsetX = layerSettings.textShadowOffsetX
    ctx.shadowOffsetY = layerSettings.textShadowOffsetY
  }
  const textBoxWidth = width * (layerSettings.textBoxWidthPercent / 100)
  const textBoxLeft = width * ((layerSettings.textXPercent - layerSettings.textBoxWidthPercent / 2) / 100)
  const textBoxRight = textBoxLeft + textBoxWidth
  const x = layerSettings.textAlign === 'left'
    ? textBoxLeft
    : layerSettings.textAlign === 'right'
      ? textBoxRight
      : width * (layerSettings.textXPercent / 100)
  const y = height * (layerSettings.textYPercent / 100)
  const lines = wrapCanvasText(ctx, layerSettings.text, textBoxWidth)
  const lineHeight = layerSettings.textSize * 0.86
  lines.forEach((line, index) => {
    const lineY = y + (index - (lines.length - 1) / 2) * lineHeight
    if (layerSettings.textOutline) ctx.strokeText(line, x, lineY)
    ctx.fillText(line, x, lineY)
    if (layerSettings.textUnderline) {
      const underlineWidth = ctx.measureText(line).width
      const underlineY = lineY + layerSettings.textSize * 0.48
      const startX = layerSettings.textAlign === 'left' ? x : layerSettings.textAlign === 'right' ? x - underlineWidth : x - underlineWidth / 2
      const endX = layerSettings.textAlign === 'left' ? x + underlineWidth : layerSettings.textAlign === 'right' ? x : x + underlineWidth / 2
      ctx.beginPath()
      ctx.moveTo(startX, underlineY)
      ctx.lineTo(endX, underlineY)
      ctx.lineWidth = Math.max(2, layerSettings.textSize / 18)
      ctx.strokeStyle = layerSettings.textColor
      ctx.stroke()
    }
  })
  ctx.restore()
}

function drawMemeCaption(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  settings: ToolSettingsState,
  placement: 'top' | 'bottom',
) {
  const value = text.trim().toUpperCase()
  if (!value) return
  const fontFamily = settings.memeFont === 'Impact'
    ? 'Impact, Arial Black, sans-serif'
    : `${settings.memeFont}, Impact, Arial Black, sans-serif`
  let fontSize = settings.textSize || Math.round(ctx.canvas.width * 0.07)
  ctx.save()
  ctx.textAlign = settings.textAlign
  ctx.textBaseline = placement === 'top' ? 'top' : 'bottom'
  ctx.lineJoin = 'round'
  ctx.fillStyle = settings.textColor
  ctx.strokeStyle = settings.textOutlineColor || '#000000'
  ctx.lineWidth = Math.max(0, settings.memeOutlineWidth) * Math.max(1, ctx.canvas.width / 1200)
  ctx.shadowColor = 'rgba(0,0,0,.28)'
  ctx.shadowBlur = 4
  const lines = value.split(/\n+/).flatMap((paragraph) => {
    const words = paragraph.split(/\s+/).filter(Boolean)
    const output: string[] = []
    let current = ''
    words.forEach((word) => {
      const candidate = current ? `${current} ${word}` : word
      ctx.font = `${settings.textBold ? 900 : 700} ${fontSize}px ${fontFamily}`
      if (ctx.measureText(candidate).width <= maxWidth || !current) {
        current = candidate
      } else {
        output.push(current)
        current = word
      }
    })
    if (current) output.push(current)
    return output
  })
  while (fontSize > 24) {
    ctx.font = `${settings.textBold ? 900 : 700} ${fontSize}px ${fontFamily}`
    if (lines.every((line) => ctx.measureText(line).width <= maxWidth)) break
    fontSize -= 2
  }
  const lineHeight = fontSize * 1.02
  const totalHeight = lineHeight * lines.length
  const alignX = settings.textAlign === 'left' ? ctx.canvas.width * 0.04 : settings.textAlign === 'right' ? ctx.canvas.width * 0.96 : x
  lines.forEach((line, index) => {
    const lineY = placement === 'top' ? y + index * lineHeight : y - totalHeight + (index + 1) * lineHeight
    if (settings.memeOutlineWidth > 0) ctx.strokeText(line, alignX, lineY, maxWidth)
    ctx.fillText(line, alignX, lineY, maxWidth)
  })
  ctx.restore()
}

async function processImage(file: File, slug: string, settings: ToolSettingsState): Promise<ProcessedFile> {
  const bitmap = await loadBitmap(file)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Your browser does not support Canvas processing.')
  const format = slug === 'convert-to-webp'
    ? 'image/webp'
    : slug === 'change-background' && (settings.backgroundMode === 'transparent' || settings.backgroundAreas?.some((area) => area.backgroundMode === 'transparent'))
      ? 'image/png'
      : settings.format

  if (slug === 'resize-image') {
    if (settings.resizeMode === 'percentage') {
      const scale = Math.max(1, settings.percentage) / 100
      canvas.width = Math.max(1, Math.round(bitmap.width * scale))
      canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    } else {
      canvas.width = settings.width || bitmap.width
      canvas.height = settings.height || bitmap.height
    }
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  } else if (slug === 'upscale-image') {
    // Upgraded engine (merged from ai.nanoimage.net, 2026-07): iterative
    // ≤1.6× bilinear steps + adaptive unsharp mask instead of a single
    // bicubic jump — recovers more edge detail with fewer halos.
    canvas.width = Math.max(bitmap.width, settings.width || Math.round(bitmap.width * settings.upscaleScale))
    canvas.height = Math.max(bitmap.height, settings.height || Math.round(bitmap.height * settings.upscaleScale))
    const upscaled = upscaleToCanvasSync(
      bitmap,
      canvas.width,
      canvas.height,
      settings.resampling === 'sharp' ? 'illustration' : 'photo',
    )
    ctx.drawImage(upscaled, 0, 0)
    if (settings.sharpness > 0) {
      applyCanvasSharpen(ctx, canvas.width, canvas.height, settings.sharpness, settings.resampling)
    }
  } else if (slug === 'crop-image') {
    const width = clamp(settings.cropWidth || bitmap.width, 1, bitmap.width)
    const height = clamp(settings.cropHeight || bitmap.height, 1, bitmap.height)
    const cropX = clamp(settings.cropX, 0, Math.max(0, bitmap.width - width))
    const cropY = clamp(settings.cropY, 0, Math.max(0, bitmap.height - height))
    canvas.width = width
    canvas.height = height
    ctx.drawImage(bitmap, cropX, cropY, width, height, 0, 0, width, height)
  } else if (slug === 'rotate-image') {
    const radians = (settings.angle * Math.PI) / 180
    const sin = Math.abs(Math.sin(radians))
    const cos = Math.abs(Math.cos(radians))
    canvas.width = Math.round(bitmap.width * cos + bitmap.height * sin)
    canvas.height = Math.round(bitmap.width * sin + bitmap.height * cos)
    ctx.fillStyle = settings.background
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(radians)
    ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2)
  } else if (slug === 'flip-image') {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.translate(settings.flipX ? canvas.width : 0, settings.flipY ? canvas.height : 0)
    ctx.scale(settings.flipX ? -1 : 1, settings.flipY ? -1 : 1)
    ctx.drawImage(bitmap, 0, 0)
  } else if (slug === 'enhance-image') {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.filter = enhanceCssFilter(settings)
    ctx.drawImage(bitmap, 0, 0)
    ctx.filter = 'none'
    applyEnhanceColorOverlay(ctx, canvas.width, canvas.height, settings)
  } else if (slug === 'change-background') {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    const sourceCanvas = document.createElement('canvas')
    sourceCanvas.width = bitmap.width
    sourceCanvas.height = bitmap.height
    const sourceCtx = sourceCanvas.getContext('2d')
    if (!sourceCtx) throw new Error('Your browser does not support Canvas processing.')
    sourceCtx.drawImage(bitmap, 0, 0)
    const sourceData = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height)
    const output = new ImageData(new Uint8ClampedArray(sourceData.data), sourceData.width, sourceData.height)
    const areas = settings.backgroundAreas?.length
      ? settings.backgroundAreas
      : settings.cropWidth && settings.cropHeight
        ? [{
            id: 1,
            x: settings.cropX,
            y: settings.cropY,
            width: settings.cropWidth,
            height: settings.cropHeight,
            background: settings.background,
            backgroundMode: settings.backgroundMode,
            backgroundImageDataUrl: settings.backgroundImageDataUrl,
            tolerance: settings.colorTolerance,
          }]
        : []
    if (!areas.length) throw new Error('Please click or drag on the image to add a background edit first.')
    for (const area of areas) {
      await paintCanvasBackground(ctx, canvas.width, canvas.height, {
        ...settings,
        background: area.background,
        backgroundMode: area.backgroundMode,
        backgroundImageDataUrl: area.backgroundImageDataUrl,
      })
      const backgroundData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const sampleX = clamp(Math.round(area.x + area.width / 2), 0, bitmap.width - 1)
      const sampleY = clamp(Math.round(area.y + area.height / 2), 0, bitmap.height - 1)
      const sampleIndex = (sampleY * bitmap.width + sampleX) * 4
      const sampleR = sourceData.data[sampleIndex]
      const sampleG = sourceData.data[sampleIndex + 1]
      const sampleB = sourceData.data[sampleIndex + 2]
      const maxDistance = 441.68
      const toleranceDistance = maxDistance * clamp(area.tolerance / 100, 0.1, 1)
      for (let index = 0; index < sourceData.data.length; index += 4) {
        const r = sourceData.data[index]
        const g = sourceData.data[index + 1]
        const b = sourceData.data[index + 2]
        const alpha = sourceData.data[index + 3]
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const luminance = (r * 0.299) + (g * 0.587) + (b * 0.114)
        const likelyPlainBackground = luminance > 224 && max - min < 34
        const sampleDistance = Math.hypot(r - sampleR, g - sampleG, b - sampleB)
        const sampledBackground = sampleDistance <= toleranceDistance
        const sampleAmount = sampledBackground ? 1 - clamp(sampleDistance / toleranceDistance, 0, 0.85) : 0
        const whiteAmount = likelyPlainBackground ? clamp((luminance - 224) / 31, 0, 1) : 0
        const replaceAmount = alpha < 250 ? 1 : Math.max(sampleAmount, whiteAmount)
        if (replaceAmount > 0) {
          output.data[index] = Math.round((r * (1 - replaceAmount)) + (backgroundData.data[index] * replaceAmount))
          output.data[index + 1] = Math.round((g * (1 - replaceAmount)) + (backgroundData.data[index + 1] * replaceAmount))
          output.data[index + 2] = Math.round((b * (1 - replaceAmount)) + (backgroundData.data[index + 2] * replaceAmount))
          output.data[index + 3] = area.backgroundMode === 'transparent' ? Math.round(alpha * (1 - replaceAmount)) : 255
        }
      }
    }
    ctx.putImageData(output, 0, 0)
  } else if (slug === 'change-color') {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.drawImage(bitmap, 0, 0)
    const areas = settings.colorAreas?.length
      ? settings.colorAreas
      : settings.cropWidth && settings.cropHeight
        ? [{ id: 1, x: settings.cropX, y: settings.cropY, width: settings.cropWidth, height: settings.cropHeight, color: settings.background, tolerance: settings.colorTolerance }]
        : []
    if (!areas.length) throw new Error('Please click or drag on the image to add a color edit first.')
    areas.forEach((area) => {
      const regionWidth = clamp(area.width, 1, bitmap.width)
      const regionHeight = clamp(area.height, 1, bitmap.height)
      const regionX = clamp(area.x, 0, Math.max(0, bitmap.width - regionWidth))
      const regionY = clamp(area.y, 0, Math.max(0, bitmap.height - regionHeight))
      const targetColor = hexToRgb(area.color)
      const imageData = ctx.getImageData(regionX, regionY, regionWidth, regionHeight)
      const radiusX = regionWidth / 2
      const radiusY = regionHeight / 2
      for (let y = 0; y < regionHeight; y += 1) {
        for (let x = 0; x < regionWidth; x += 1) {
          const normalizedX = (x - radiusX) / radiusX
          const normalizedY = (y - radiusY) / radiusY
          if ((normalizedX * normalizedX) + (normalizedY * normalizedY) > 1) continue
          const index = (y * regionWidth + x) * 4
          const alpha = imageData.data[index + 3] / 255
          if (!alpha) continue
          const luminance = ((imageData.data[index] * 0.299) + (imageData.data[index + 1] * 0.587) + (imageData.data[index + 2] * 0.114)) / 255
          const tintStrength = clamp(area.tolerance / 100, 0.1, 1)
          imageData.data[index] = Math.round((imageData.data[index] * (1 - tintStrength)) + (targetColor.r * (0.45 + luminance * 0.65) * tintStrength))
          imageData.data[index + 1] = Math.round((imageData.data[index + 1] * (1 - tintStrength)) + (targetColor.g * (0.45 + luminance * 0.65) * tintStrength))
          imageData.data[index + 2] = Math.round((imageData.data[index + 2] * (1 - tintStrength)) + (targetColor.b * (0.45 + luminance * 0.65) * tintStrength))
        }
      }
      ctx.putImageData(imageData, regionX, regionY)
    })
  } else if (slug === 'meme-generator') {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.drawImage(bitmap, 0, 0)
    drawMemeCaption(ctx, settings.memeTopText, canvas.width / 2, canvas.height * 0.08, canvas.width * 0.92, settings, 'top')
    drawMemeCaption(ctx, settings.memeBottomText, canvas.width / 2, canvas.height * 0.92, canvas.width * 0.92, settings, 'bottom')
  } else if (slug === 'add-text' || slug === 'add-watermark') {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.drawImage(bitmap, 0, 0)
    if (slug === 'add-text' && settings.textLayers?.length) {
      settings.textLayers.forEach((layer) => drawTextLayerOnCanvas(ctx, canvas.width, canvas.height, settingsFromTextLayer(settings, layer)))
    } else {
    ctx.save()
    ctx.globalAlpha = slug === 'add-watermark' ? settings.watermarkOpacity : 1
    ctx.font = `${settings.textItalic ? 'italic ' : ''}${settings.textBold ? 900 : 500} ${settings.textSize}px "Comic Sans MS", "Trebuchet MS", cursive`
    ctx.fillStyle = settings.textColor
    ctx.strokeStyle = settings.textOutline ? settings.textOutlineColor : 'rgba(0,0,0,.35)'
    ctx.lineWidth = Math.max(2, settings.textSize / 54)
    ctx.textAlign = settings.textAlign
    ctx.textBaseline = 'middle'
    if (settings.textShadow) {
      ctx.shadowColor = settings.textShadowColor
      ctx.shadowBlur = settings.textShadowBlur
      ctx.shadowOffsetX = settings.textShadowOffsetX
      ctx.shadowOffsetY = settings.textShadowOffsetY
    }
    const textBoxWidth = canvas.width * (settings.textBoxWidthPercent / 100)
    const textBoxHeight = canvas.height * (settings.textBoxHeightPercent / 100)
    const textBoxLeft = canvas.width * ((settings.textXPercent - settings.textBoxWidthPercent / 2) / 100)
    const textBoxTop = canvas.height * ((settings.textYPercent - settings.textBoxHeightPercent / 2) / 100)
    const textBoxRight = textBoxLeft + textBoxWidth
    if (slug === 'add-watermark' && settings.watermarkMode === 'image') {
      if (!settings.watermarkImageDataUrl) throw new Error('Please upload a watermark image first.')
      const watermark = await loadBitmapFromDataUrl(settings.watermarkImageDataUrl)
      ctx.drawImage(watermark, textBoxLeft, textBoxTop, textBoxWidth, textBoxHeight)
      ctx.restore()
      const blob = await canvasToBlob(canvas, format, settings.quality)
      return {
        blob,
        size: blob.size,
        url: URL.createObjectURL(blob),
        name: `${fileNameWithoutExtension(file.name)}-${slug}.${extensionFor(format)}`,
      }
    }
    const x = settings.textAlign === 'left'
      ? textBoxLeft
      : settings.textAlign === 'right'
        ? textBoxRight
        : canvas.width * (settings.textXPercent / 100)
    const y = canvas.height * (settings.textYPercent / 100)
    const lines = settings.textRenderLines ?? wrapCanvasText(ctx, settings.text, textBoxWidth)
    const lineHeight = settings.textSize * 0.86
    lines.forEach((line, index) => {
      const lineY = y + (index - (lines.length - 1) / 2) * lineHeight
      if (settings.textOutline) ctx.strokeText(line, x, lineY)
      ctx.fillText(line, x, lineY)
      if (settings.textUnderline && (slug === 'add-text' || slug === 'add-watermark')) {
        const width = ctx.measureText(line).width
        const underlineY = lineY + settings.textSize * 0.48
        const startX = settings.textAlign === 'left' ? x : settings.textAlign === 'right' ? x - width : x - width / 2
        const endX = settings.textAlign === 'left' ? x + width : settings.textAlign === 'right' ? x : x + width / 2
        ctx.beginPath()
        ctx.moveTo(startX, underlineY)
        ctx.lineTo(endX, underlineY)
        ctx.lineWidth = Math.max(2, settings.textSize / 18)
        ctx.strokeStyle = settings.textColor
        ctx.stroke()
      }
    })
    ctx.restore()
    }
  } else if (slug === 'black-and-white-image' || slug === 'invert-image-colors') {
    // PRD Phase 2 颜色集群: 纯 canvas 滤镜, 本地处理
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.filter = slug === 'invert-image-colors' ? 'invert(100%)' : 'grayscale(100%)'
    ctx.drawImage(bitmap, 0, 0)
    ctx.filter = 'none'
  } else if (slug === 'blur-image') {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.drawImage(bitmap, 0, 0)
    const areas = settings.blurAreas
      ? settings.blurAreas
      : settings.cropWidth && settings.cropHeight
        ? [{ id: 1, x: settings.cropX, y: settings.cropY, width: settings.cropWidth, height: settings.cropHeight }]
        : []
    areas.forEach((area) => {
      const regionWidth = clamp(area.width || bitmap.width, 1, bitmap.width)
      const regionHeight = clamp(area.height || bitmap.height, 1, bitmap.height)
      const regionX = clamp(area.x, 0, Math.max(0, bitmap.width - regionWidth))
      const regionY = clamp(area.y, 0, Math.max(0, bitmap.height - regionHeight))
      const regionCanvas = document.createElement('canvas')
      regionCanvas.width = regionWidth
      regionCanvas.height = regionHeight
      const regionCtx = regionCanvas.getContext('2d')
      if (!regionCtx) throw new Error('Your browser does not support Canvas processing.')
      regionCtx.filter = `blur(${settings.blur}px)`
      regionCtx.drawImage(bitmap, regionX, regionY, regionWidth, regionHeight, 0, 0, regionWidth, regionHeight)
      ctx.save()
      ctx.beginPath()
      ctx.ellipse(regionX + regionWidth / 2, regionY + regionHeight / 2, regionWidth / 2, regionHeight / 2, 0, 0, Math.PI * 2)
      ctx.clip()
      ctx.drawImage(regionCanvas, regionX, regionY)
      ctx.restore()
    })
  } else if (slug === 'pixelate-image') {
    const size = settings.pixelSize
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.drawImage(bitmap, 0, 0)
    const areas = settings.pixelateAreas?.length
      ? settings.pixelateAreas
      : settings.cropWidth && settings.cropHeight
        ? [{ id: 1, x: settings.cropX, y: settings.cropY, width: settings.cropWidth, height: settings.cropHeight }]
        : []
    if (!areas.length) {
      const blob = await canvasToBlob(canvas, format, settings.quality)
      return {
        blob,
        size: blob.size,
        url: URL.createObjectURL(blob),
        name: `${fileNameWithoutExtension(file.name)}-${slug}.${extensionFor(format)}`,
      }
    }
    areas.forEach((area) => {
      const regionWidth = clamp(area.width || bitmap.width, 1, bitmap.width)
      const regionHeight = clamp(area.height || bitmap.height, 1, bitmap.height)
      const regionX = clamp(area.x, 0, Math.max(0, bitmap.width - regionWidth))
      const regionY = clamp(area.y, 0, Math.max(0, bitmap.height - regionHeight))
      const smallCanvas = document.createElement('canvas')
      smallCanvas.width = Math.max(1, Math.floor(regionWidth / size))
      smallCanvas.height = Math.max(1, Math.floor(regionHeight / size))
      const smallCtx = smallCanvas.getContext('2d')
      if (!smallCtx) throw new Error('Your browser does not support Canvas processing.')
      smallCtx.drawImage(bitmap, regionX, regionY, regionWidth, regionHeight, 0, 0, smallCanvas.width, smallCanvas.height)
      ctx.save()
      ctx.beginPath()
      ctx.ellipse(regionX + regionWidth / 2, regionY + regionHeight / 2, regionWidth / 2, regionHeight / 2, 0, 0, Math.PI * 2)
      ctx.clip()
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(smallCanvas, regionX, regionY, regionWidth, regionHeight)
      ctx.restore()
    })
  } else {
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    ctx.drawImage(bitmap, 0, 0)
  }

  const canReturnOriginalResize = slug === 'resize-image'
    && canvas.width === bitmap.width
    && canvas.height === bitmap.height
    && isSameImageMime(format, file.type)
  const canReturnOriginalConvert = slug === 'convert-image'
    && settings.quality >= 1
    && isSameImageMime(format, file.type)
  const shouldOptimizeSize = slug === 'compress-image' || slug === 'resize-image'
  const blob = canReturnOriginalConvert
    ? file
    : shouldOptimizeSize
    ? await compressedCanvasToBlob(canvas, format, settings.quality, file, slug === 'compress-image' || canReturnOriginalResize || canReturnOriginalConvert)
    : await canvasToBlob(canvas, format, settings.quality)
  const outputName = (slug === 'compress-image' || slug === 'resize-image' || slug === 'convert-image') && blob === file
    ? file.name
    : `${fileNameWithoutExtension(file.name)}-${slug}.${extensionFor(format)}`
  return {
    blob,
    size: blob.size,
    url: URL.createObjectURL(blob),
    name: outputName,
  }
}

async function createPdf(files: File[], options: PdfOptions = {
  pageSize: 'a4',
  orientation: 'portrait',
  margin: 20,
  imageFit: 'fit',
  spacing: 10,
  caption: false,
  sameSize: true,
  compress: true,
}) {
  const { PDFDocument, PageSizes } = await loadPdfLib()
  const pdf = await PDFDocument.create()
  const baseSize = options.pageSize === 'letter' ? PageSizes.Letter : PageSizes.A4
  const pageSize: [number, number] = options.orientation === 'landscape' ? [baseSize[1], baseSize[0]] : [baseSize[0], baseSize[1]]
  const margin = options.margin * 2.83465
  const spacing = options.spacing * 2.83465
  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer())
    const image = file.type.includes('png')
      ? await pdf.embedPng(bytes)
      : await pdf.embedJpg(bytes).catch(async () => {
          const converted = await processImage(file, 'convert-image', {
            format: 'image/jpeg',
            quality: 0.9,
            width: 0,
            height: 0,
            resizeMode: 'pixels',
            percentage: 100,
            keepAspect: true,
            cropX: 0,
            cropY: 0,
            cropWidth: 0,
            cropHeight: 0,
            angle: 0,
            flipX: false,
            flipY: false,
            text: '',
            textSize: 54,
            textColor: '#ffffff',
            textXPercent: 50,
            textYPercent: 47,
            textBoxWidthPercent: 74,
            textBoxHeightPercent: 45,
            textBold: true,
            textItalic: false,
            textUnderline: false,
            textShadow: true,
            textOutline: false,
            textAlign: 'center',
            textShadowColor: '#000000',
            textOutlineColor: '#ffffff',
            textShadowBlur: 12,
            textShadowOffsetX: 4,
            textShadowOffsetY: 4,
            memeTopText: '',
            memeBottomText: '',
            memeFont: 'Impact',
            memeOutlineWidth: 4,
            watermarkMode: 'text',
            watermarkImageDataUrl: '',
            watermarkImageName: '',
            watermarkOpacity: 0.35,
            blur: 10,
            pixelSize: 12,
            background: '#ffffff',
            colorTolerance: 78,
            backgroundMode: 'color',
            backgroundImageDataUrl: '',
            backgroundImageName: '',
            brightness: 0,
            contrast: 0,
            saturation: 0,
            vibrance: 0,
            exposure: 0,
            highlights: 0,
            shadows: 0,
            sharpness: 0,
            clarity: 0,
            warmth: 0,
            tint: 0,
            upscaleScale: 2,
            resampling: 'smooth',
          })
          return pdf.embedJpg(new Uint8Array(await converted.blob.arrayBuffer()))
        })
    const page = pdf.addPage(options.sameSize ? pageSize : pageSize)
    const availableWidth = Math.max(1, page.getWidth() - margin * 2)
    const captionSpace = options.caption ? 18 + spacing : 0
    const availableHeight = Math.max(1, page.getHeight() - margin * 2 - captionSpace)
    const fit = options.imageFit === 'fill'
      ? image.scale(Math.max(availableWidth / image.width, availableHeight / image.height))
      : options.imageFit === 'actual'
        ? image.scale(Math.min(1, Math.min(availableWidth / image.width, availableHeight / image.height)))
        : image.scaleToFit(availableWidth, availableHeight)
    page.drawImage(image, {
      x: margin + (availableWidth - fit.width) / 2,
      y: margin + captionSpace + (availableHeight - fit.height) / 2,
      width: fit.width,
      height: fit.height,
    })
    if (options.caption) {
      page.drawText(file.name, {
        x: margin,
        y: margin,
        size: 10,
      })
    }
  }
  const pdfBytes = await pdf.save({ useObjectStreams: options.compress })
  return new Blob([pdfBytes.buffer.slice(0) as ArrayBuffer], { type: 'application/pdf' })
}

async function createPhotoGrid(files: File[], options: PhotoGridOptions, offsets: PhotoGridOffsets = {}): Promise<ProcessedFile> {
  const ratioMap: Record<PhotoGridOptions['aspectRatio'], number> = {
    '1:1': 1,
    '4:5': 4 / 5,
    '16:9': 16 / 9,
    '9:16': 9 / 16,
  }
  const outputWidth = 1600
  const outputHeight = Math.round(outputWidth / ratioMap[options.aspectRatio])
  const canvas = document.createElement('canvas')
  canvas.width = outputWidth
  canvas.height = outputHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Your browser does not support Canvas processing.')
  if (options.background === 'transparent') {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  } else {
    ctx.fillStyle = options.background
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  const slots = options.columns * options.rows
  const images = await Promise.all(files.slice(0, slots).map(loadBitmap))
  const gap = options.spacing
  const border = options.border
  const cellWidth = (outputWidth - border * 2 - gap * (options.columns - 1)) / options.columns
  const cellHeight = (outputHeight - border * 2 - gap * (options.rows - 1)) / options.rows
  images.forEach((image, index) => {
    const column = index % options.columns
    const row = Math.floor(index / options.columns)
    const x = border + column * (cellWidth + gap)
    const y = border + row * (cellHeight + gap)
    const offset = offsets[index] ?? { x: 0, y: 0 }
    drawRoundedImage(ctx, image, x, y, cellWidth, cellHeight, options.radius, offset.x, offset.y)
  })
  const blob = await canvasToBlob(canvas, 'image/png', 0.95)
  return {
    blob,
    size: blob.size,
    url: URL.createObjectURL(blob),
    name: 'nanoimage-photo-grid.png',
  }
}

async function createGridMakerImage(file: File | undefined, options: GridMakerOptions, format: OutputFormat): Promise<ProcessedFile> {
  const image = file ? await loadBitmap(file) : null
  const canvas = document.createElement('canvas')
  renderGridMakerCanvas(canvas, image, options, { preview: false, format })
  image?.close()
  const blob = await canvasToBlob(canvas, format, format === 'image/png' ? 1 : 0.92)
  const baseName = file ? fileNameWithoutExtension(file.name) : 'blank-grid'
  return {
    blob,
    size: blob.size,
    url: URL.createObjectURL(blob),
    name: `nanoimage-grid-${baseName}.${extensionFor(format)}`,
  }
}

async function createGridMakerPdf(file: File | undefined, options: GridMakerOptions): Promise<ProcessedFile> {
  const imageResult = await createGridMakerImage(file, options, 'image/png')
  const { PDFDocument, PageSizes } = await loadPdfLib()
  const pdf = await PDFDocument.create()
  const bytes = new Uint8Array(await imageResult.blob.arrayBuffer())
  const embedded = await pdf.embedPng(bytes)
  const page = pdf.addPage(PageSizes.A4)
  const margin = 24
  const availableWidth = page.getWidth() - margin * 2
  const availableHeight = page.getHeight() - margin * 2
  const scale = Math.min(availableWidth / embedded.width, availableHeight / embedded.height)
  const width = embedded.width * scale
  const height = embedded.height * scale
  page.drawImage(embedded, {
    x: margin + (availableWidth - width) / 2,
    y: margin + (availableHeight - height) / 2,
    width,
    height,
  })
  const pdfBytes = await pdf.save()
  const blob = new Blob([pdfBytes.buffer.slice(0) as ArrayBuffer], { type: 'application/pdf' })
  const baseName = file ? fileNameWithoutExtension(file.name) : 'blank-grid'
  return {
    blob,
    size: blob.size,
    url: URL.createObjectURL(blob),
    name: `nanoimage-grid-${baseName}.pdf`,
  }
}

function renderGridMakerCanvas(
  canvas: HTMLCanvasElement,
  image: ImageBitmap | null,
  options: GridMakerOptions,
  renderOptions: { preview?: boolean; format?: OutputFormat } = {},
) {
  const sourceWidth = image?.width ?? 1600
  const sourceHeight = image?.height ?? 1200
  const previewScale = renderOptions.preview ? Math.min(1, 920 / Math.max(sourceWidth, sourceHeight)) : 1
  canvas.width = Math.max(1, Math.round(sourceWidth * previewScale))
  canvas.height = Math.max(1, Math.round(sourceHeight * previewScale))
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Your browser does not support Canvas processing.')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (!image || renderOptions.format === 'image/jpeg') {
    ctx.fillStyle = options.background
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  if (image) ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  drawGridMakerLines(ctx, canvas.width, canvas.height, options)
}

function drawGridMakerLines(ctx: CanvasRenderingContext2D, width: number, height: number, options: GridMakerOptions) {
  const columns = Math.round(clamp(options.columns, 1, 50))
  const rows = Math.round(clamp(options.gridType === 'square' ? options.columns : options.rows, 1, 50))
  const cellWidth = width / columns
  const cellHeight = height / rows
  ctx.save()
  ctx.globalAlpha = clamp(options.opacity, 0.1, 1)
  ctx.strokeStyle = options.color
  ctx.lineWidth = Math.max(1, options.lineWidth)
  ctx.lineCap = 'square'

  if (options.gridType === 'isometric') {
    drawIsometricGrid(ctx, width, height, cellWidth, cellHeight)
  } else {
    ctx.beginPath()
    for (let column = 0; column <= columns; column += 1) {
      const x = Math.round(column * cellWidth) + 0.5
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
    }
    for (let row = 0; row <= rows; row += 1) {
      const y = Math.round(row * cellHeight) + 0.5
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
    }
    ctx.stroke()
    if (options.gridType === 'triangular') {
      ctx.beginPath()
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = column * cellWidth
          const y = row * cellHeight
          ctx.moveTo(x, y)
          ctx.lineTo(x + cellWidth, y + cellHeight)
        }
      }
      ctx.stroke()
    }
  }
  ctx.restore()
  if (options.showLabels) drawGridMakerLabels(ctx, width, height, columns, rows, options)
}

function drawIsometricGrid(ctx: CanvasRenderingContext2D, width: number, height: number, cellWidth: number, cellHeight: number) {
  const spacing = Math.max(24, Math.min(cellWidth, cellHeight))
  const diagonalRise = spacing * 0.58
  ctx.beginPath()
  for (let x = -width; x <= width * 2; x += spacing) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x + width, height)
    ctx.moveTo(x, height)
    ctx.lineTo(x + width, 0)
  }
  for (let y = 0; y <= height; y += diagonalRise) {
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
  }
  ctx.stroke()
}

function drawGridMakerLabels(ctx: CanvasRenderingContext2D, width: number, height: number, columns: number, rows: number, options: GridMakerOptions) {
  const fontSize = Math.round(clamp(Math.min(width, height) * 0.025, 13, 34))
  ctx.save()
  ctx.globalAlpha = clamp(options.opacity + 0.25, 0.35, 1)
  ctx.font = `700 ${fontSize}px Inter, Arial, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const pad = Math.max(6, fontSize * 0.35)
  const labelBox = fontSize + pad
  const drawLabel = (label: string, x: number, y: number) => {
    ctx.fillStyle = 'rgba(255,255,255,0.72)'
    ctx.fillRect(x - labelBox / 2, y - labelBox / 2, labelBox, labelBox)
    ctx.fillStyle = options.color
    ctx.fillText(label, x, y + 0.5)
  }
  for (let column = 0; column < columns; column += 1) {
    drawLabel(columnLabel(column), (column + 0.5) * (width / columns), labelBox / 2)
  }
  ctx.textAlign = 'left'
  for (let row = 0; row < rows; row += 1) {
    const y = (row + 0.5) * (height / rows)
    ctx.fillStyle = 'rgba(255,255,255,0.72)'
    ctx.fillRect(pad * 0.5, y - labelBox / 2, labelBox, labelBox)
    ctx.fillStyle = options.color
    ctx.fillText(String(row + 1), pad, y + 0.5)
  }
  ctx.restore()
}

function columnLabel(index: number) {
  let label = ''
  let value = index
  do {
    label = String.fromCharCode(65 + (value % 26)) + label
    value = Math.floor(value / 26) - 1
  } while (value >= 0)
  return label
}

function createCollageItems(count: number, template: CollageOptions['template']): CollageItem[] {
  const base = [
    { x: 6, y: 8, width: 32, height: 32, rotate: -7 },
    { x: 34, y: 8, width: 30, height: 40, rotate: 2 },
    { x: 64, y: 12, width: 28, height: 32, rotate: 6 },
    { x: 9, y: 46, width: 29, height: 36, rotate: 3 },
    { x: 39, y: 51, width: 27, height: 34, rotate: -3 },
    { x: 66, y: 49, width: 26, height: 34, rotate: 4 },
    { x: 4, y: 64, width: 22, height: 25, rotate: -5 },
    { x: 76, y: 65, width: 20, height: 23, rotate: 8 },
  ]
  const square = [
    { x: 4, y: 4, width: 44, height: 44, rotate: 0 },
    { x: 52, y: 4, width: 44, height: 44, rotate: 0 },
    { x: 4, y: 52, width: 44, height: 44, rotate: 0 },
    { x: 52, y: 52, width: 44, height: 44, rotate: 0 },
  ]
  const film = [
    { x: 5, y: 12, width: 28, height: 76, rotate: 0 },
    { x: 36, y: 12, width: 28, height: 76, rotate: 0 },
    { x: 67, y: 12, width: 28, height: 76, rotate: 0 },
  ]
  const source = template === 'square' || template === 'minimal' ? square : template === 'film' ? film : base
  return Array.from({ length: count }, (_, index) => {
    const item = source[index % source.length]
    const offset = Math.floor(index / source.length) * 4
    return {
      id: index + 1,
      fileIndex: index,
      x: clamp(item.x + offset, 0, 88),
      y: clamp(item.y + offset, 0, 88),
      width: item.width,
      height: item.height,
      rotate: template === 'classic' || template === 'square' || template === 'minimal' ? 0 : item.rotate,
    }
  })
}

async function createImageCollage(files: File[], options: CollageOptions, items: CollageItem[]): Promise<ProcessedFile> {
  const canvas = document.createElement('canvas')
  canvas.width = clamp(Math.round(options.width), 300, 2400)
  canvas.height = clamp(Math.round(options.height), 300, 2400)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Your browser does not support Canvas processing.')
  ctx.fillStyle = options.background
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.globalAlpha = 0.18
  ctx.strokeStyle = '#d7c8b8'
  for (let x = 0; x < canvas.width; x += 54) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()
  }
  for (let y = 0; y < canvas.height; y += 54) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
    ctx.stroke()
  }
  ctx.restore()
  const bitmaps = await Promise.all(files.map(loadBitmap))
  items.forEach((item) => {
    const image = bitmaps[item.fileIndex]
    if (!image) return
    const x = canvas.width * (item.x / 100)
    const y = canvas.height * (item.y / 100)
    const width = canvas.width * (item.width / 100)
    const height = canvas.height * (item.height / 100)
    ctx.save()
    ctx.translate(x + width / 2, y + height / 2)
    ctx.rotate((item.rotate * Math.PI) / 180)
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = 'rgba(39, 25, 84, 0.22)'
    ctx.shadowBlur = 24
    ctx.shadowOffsetY = 10
    const frame = Math.max(8, options.spacing * 0.6)
    roundedRectPath(ctx, -width / 2 - frame, -height / 2 - frame, width + frame * 2, height + frame * 2 + (options.template === 'polaroid' ? frame * 2 : 0), options.radius)
    ctx.fill()
    ctx.shadowColor = 'transparent'
    roundedRectPath(ctx, -width / 2, -height / 2, width, height, options.radius)
    ctx.clip()
    const scale = Math.max(width / image.width, height / image.height)
    const drawWidth = image.width * scale
    const drawHeight = image.height * scale
    ctx.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)
    ctx.restore()
  })
  if (options.text.trim()) {
    ctx.save()
    ctx.fillStyle = '#7d5c73'
    ctx.font = `700 ${Math.max(28, canvas.width * 0.035)}px "Comic Sans MS", "Trebuchet MS", cursive`
    ctx.textAlign = 'center'
    ctx.fillText(options.text, canvas.width / 2, canvas.height * 0.88)
    ctx.restore()
  }
  if (options.sticker) {
    ctx.save()
    ctx.font = `${Math.max(54, canvas.width * 0.075)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`
    ctx.fillText(options.sticker, canvas.width * 0.88, canvas.height * 0.88)
    ctx.fillText('♡', canvas.width * 0.72, canvas.height * 0.16)
    ctx.restore()
  }
  const blob = await canvasToBlob(canvas, 'image/png', 0.95)
  return {
    blob,
    size: blob.size,
    url: URL.createObjectURL(blob),
    name: 'nanoimage-collage.png',
  }
}

async function createGif(files: File[], options: GifOptions) {
  const width = clamp(Math.round(options.width), 64, 1920)
  const height = clamp(Math.round(options.height), 64, 1920)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('Your browser does not support Canvas processing.')
  const frames: Uint8Array[] = []
  for (const file of files.slice(0, 50)) {
    const image = await loadBitmap(file)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
    drawFittedImage(ctx, image, width, height, options.fit)
    frames.push(indexGifPixels(ctx.getImageData(0, 0, width, height).data, options.colors))
  }
  const bytes: number[] = []
  writeAscii(bytes, 'GIF89a')
  writeShort(bytes, width)
  writeShort(bytes, height)
  bytes.push(0xf7, 0, 0)
  writeGifPalette(bytes)
  writeAscii(bytes, '!\xff\x0bNETSCAPE2.0\x03\x01')
  writeShort(bytes, options.loop === 'forever' ? 0 : options.loop === 'three' ? 3 : 1)
  bytes.push(0)
  const delay = clamp(Math.round(options.frameDuration * 100), 1, 200)
  frames.forEach((pixels) => {
    writeAscii(bytes, '!\xf9\x04')
    bytes.push(0x08)
    writeShort(bytes, delay)
    bytes.push(0, 0)
    bytes.push(0x2c)
    writeShort(bytes, 0)
    writeShort(bytes, 0)
    writeShort(bytes, width)
    writeShort(bytes, height)
    bytes.push(0)
    bytes.push(8)
    writeSubBlocks(bytes, lzwEncodeGif(pixels))
  })
  bytes.push(0x3b)
  return new Blob([new Uint8Array(bytes)], { type: 'image/gif' })
}

function drawFittedImage(ctx: CanvasRenderingContext2D, image: ImageBitmap, width: number, height: number, fit: GifOptions['fit']) {
  if (fit === 'stretch') {
    ctx.drawImage(image, 0, 0, width, height)
    return
  }
  const scale = fit === 'cover' ? Math.max(width / image.width, height / image.height) : Math.min(width / image.width, height / image.height)
  const drawWidth = image.width * scale
  const drawHeight = image.height * scale
  ctx.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
}

function indexGifPixels(data: Uint8ClampedArray, colors: number) {
  const indexed = new Uint8Array(data.length / 4)
  const bucketSize = Math.max(1, Math.floor(256 / clamp(colors, 32, 256)))
  for (let source = 0, target = 0; source < data.length; source += 4, target += 1) {
    const r = data[source + 3] < 8 ? 255 : data[source]
    const g = data[source + 3] < 8 ? 255 : data[source + 1]
    const b = data[source + 3] < 8 ? 255 : data[source + 2]
    const index = ((r & 0xe0) | ((g & 0xe0) >> 3) | (b >> 6))
    indexed[target] = Math.floor(index / bucketSize) * bucketSize
  }
  return indexed
}

function writeGifPalette(bytes: number[]) {
  for (let index = 0; index < 256; index += 1) {
    bytes.push(index & 0xe0, (index & 0x1c) << 3, (index & 0x03) << 6)
  }
}

function lzwEncodeGif(pixels: Uint8Array) {
  const clearCode = 256
  const endCode = 257
  const output: number[] = []
  let bitBuffer = 0
  let bitCount = 0
  const codeSize = 9
  const writeCode = (code: number) => {
    bitBuffer |= code << bitCount
    bitCount += codeSize
    while (bitCount >= 8) {
      output.push(bitBuffer & 0xff)
      bitBuffer >>= 8
      bitCount -= 8
    }
  }

  // Use a conservative GIF LZW stream: emit raw palette indexes and reset
  // frequently before decoders increase the code size. It is larger but avoids
  // corrupted/black frames from incomplete dictionary compression.
  writeCode(clearCode)
  let codesSinceClear = 0
  for (const pixel of pixels) {
    if (codesSinceClear >= 240) {
      writeCode(clearCode)
      codesSinceClear = 0
    }
    writeCode(pixel)
    codesSinceClear += 1
  }
  writeCode(endCode)
  if (bitCount > 0) output.push(bitBuffer & 0xff)
  return output
}

function writeSubBlocks(bytes: number[], data: number[]) {
  for (let index = 0; index < data.length; index += 255) {
    const chunk = data.slice(index, index + 255)
    bytes.push(chunk.length, ...chunk)
  }
  bytes.push(0)
}

function writeAscii(bytes: number[], value: string) {
  for (let index = 0; index < value.length; index += 1) bytes.push(value.charCodeAt(index) & 0xff)
}

function writeShort(bytes: number[], value: number) {
  bytes.push(value & 0xff, (value >> 8) & 0xff)
}

function drawRoundedImage(ctx: CanvasRenderingContext2D, image: ImageBitmap, x: number, y: number, width: number, height: number, radius: number, offsetX = 0, offsetY = 0) {
  const scale = Math.max(width / image.width, height / image.height)
  const drawWidth = image.width * scale
  const drawHeight = image.height * scale
  const maxShiftX = Math.max(0, (drawWidth - width) / 2)
  const maxShiftY = Math.max(0, (drawHeight - height) / 2)
  const drawX = x + (width - drawWidth) / 2 + (clamp(offsetX, -100, 100) / 100) * maxShiftX
  const drawY = y + (height - drawHeight) / 2 + (clamp(offsetY, -100, 100) / 100) * maxShiftY
  ctx.save()
  roundedRectPath(ctx, x, y, width, height, Math.min(radius, width / 2, height / 2))
  ctx.clip()
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight)
  ctx.restore()
}

function roundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

async function loadBitmap(file: File): Promise<ImageBitmap> {
  return createImageBitmap(file)
}

async function loadBitmapFromDataUrl(dataUrl: string): Promise<ImageBitmap> {
  const response = await fetch(dataUrl)
  const blob = await response.blob()
  return createImageBitmap(blob)
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Unable to read this watermark image.'))
    reader.readAsDataURL(file)
  })
}

async function fileFromDataUrl(dataUrl: string, name: string) {
  const response = await fetch(dataUrl)
  const blob = await response.blob()
  return new File([blob], name, { type: blob.type || 'image/svg+xml' })
}

function memeTemplateDataUrl(name: string, color: string, emoji: string) {
  const escapedName = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${color}" offset="0"/><stop stop-color="#ffffff" offset="1"/></linearGradient></defs><rect width="1200" height="900" fill="url(#g)"/><circle cx="600" cy="430" r="230" fill="rgba(255,255,255,.42)"/><text x="600" y="485" text-anchor="middle" font-size="230" font-family="Apple Color Emoji, Segoe UI Emoji">${emoji}</text><text x="600" y="820" text-anchor="middle" fill="rgba(35,28,73,.42)" font-size="52" font-family="Arial Black, sans-serif">${escapedName}</text></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function canvasToBlob(canvas: HTMLCanvasElement, type: OutputFormat, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Canvas export failed. Please try a different image or format.'))
    }, type, quality)
  })
}

async function compressedCanvasToBlob(canvas: HTMLCanvasElement, type: OutputFormat, quality: number, originalFile: File, allowOriginalFallback = true) {
  let best = await canvasToBlob(canvas, type, quality)
  if (best.size <= originalFile.size) return best
  if (type !== 'image/png') {
    const qualitySteps = [quality, 0.92, 0.86, 0.8, 0.72, 0.64, 0.56, 0.48, 0.4, 0.35]
      .map((value) => Math.min(value, quality))
      .filter((value, index, values) => value >= 0.35 && values.indexOf(value) === index)
      .sort((left, right) => right - left)
    for (const nextQuality of qualitySteps) {
      const nextBlob = await canvasToBlob(canvas, type, nextQuality)
      if (nextBlob.size < best.size) best = nextBlob
      if (nextBlob.size <= originalFile.size) return nextBlob
    }
  }
  return best.size <= originalFile.size || !allowOriginalFallback ? best : originalFile
}

function isSameImageMime(format: OutputFormat, fileType: string) {
  if (format === fileType) return true
  return format === 'image/jpeg' && (fileType === 'image/jpg' || fileType === 'image/jpeg')
}

// ─────────────────────────────────────────────────────────────────────────────
// Target-size compression engine (for compress-image-to-100kb etc.)
// Implements PRD §7: binary search quality + resize fallback, auto format, status
// ─────────────────────────────────────────────────────────────────────────────

const TARGET_SLUGS = ['compress-image-to-100kb', 'compress-image-to-200kb', 'compress-image-to-500kb', 'compress-image-to-1mb'] as const
type TargetSlug = typeof TARGET_SLUGS[number]

function getTargetInfo(slug: string): { kb: number; bytes: number; label: string } | null {
  if (slug === 'compress-image-to-100kb') return { kb: 100, bytes: 102400, label: '100KB' }
  if (slug === 'compress-image-to-200kb') return { kb: 200, bytes: 204800, label: '200KB' }
  if (slug === 'compress-image-to-500kb') return { kb: 500, bytes: 512000, label: '500KB' }
  if (slug === 'compress-image-to-1mb') return { kb: 1024, bytes: 1048576, label: '1MB' }
  return null
}

function isTargetSizeSlug(slug: string): slug is TargetSlug {
  return (TARGET_SLUGS as readonly string[]).includes(slug)
}

type TargetAdvanced = {
  format: 'auto' | 'image/jpeg' | 'image/webp' | 'image/png'
  allowResize: boolean
  removeMetadata: boolean // canvas always strips; kept for UI parity
  preserveTransparency: boolean
  maxWidth: 'auto' | 2560 | 1920 | 1280 | number
  qualityPreference: 'best' | 'smaller' // biases search start or acceptance
}

function decideAutoOutputFormat(inputFile: File, hasTransparency: boolean, originalWidth: number, originalHeight: number): OutputFormat {
  const isPng = inputFile.type === 'image/png'
  const isJpeg = inputFile.type.includes('jpeg') || inputFile.type.includes('jpg')
  // Heuristics from PRD 6.4
  if (hasTransparency) return 'image/png' // preserve by default; caller may override to webp
  if (isPng) return 'image/webp' // screenshots/text often benefit
  if (originalWidth * originalHeight > 2000000 && !isJpeg) return 'image/webp'
  return 'image/jpeg'
}

async function hasAlphaChannel(bitmap: ImageBitmap): Promise<boolean> {
  // Draw once at small size to probe alpha
  const probe = document.createElement('canvas')
  const scale = Math.min(1, 128 / Math.max(bitmap.width, bitmap.height))
  probe.width = Math.max(1, Math.round(bitmap.width * scale))
  probe.height = Math.max(1, Math.round(bitmap.height * scale))
  const pctx = probe.getContext('2d', { willReadFrequently: true })
  if (!pctx) return false
  pctx.drawImage(bitmap, 0, 0, probe.width, probe.height)
  const data = pctx.getImageData(0, 0, probe.width, probe.height).data
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 250) return true
  }
  return false
}

async function encodeToBlob(canvas: HTMLCanvasElement, format: OutputFormat, quality: number): Promise<Blob> {
  return canvasToBlob(canvas, format, quality)
}

async function compressToTargetOnce(
  source: ImageBitmap,
  targetBytes: number,
  outFormat: OutputFormat,
  allowResize: boolean,
  maxSide: number,
  pref: 'best' | 'smaller'
): Promise<{ blob: Blob; quality: number; resized: boolean; width: number; height: number } | null> {
  // Build a working canvas at (possibly reduced) size
  let w = source.width
  let h = source.height
  if (Math.max(w, h) > maxSide) {
    const s = maxSide / Math.max(w, h)
    w = Math.round(w * s)
    h = Math.round(h * s)
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  canvas.width = w
  canvas.height = h
  ctx.drawImage(source, 0, 0, w, h)

  let best: { blob: Blob; quality: number } | null = null
  let lo = pref === 'smaller' ? 0.25 : 0.30
  let hi = pref === 'smaller' ? 0.90 : 0.95
  const iters = 8

  for (let i = 0; i < iters; i++) {
    const q = (lo + hi) / 2
    const blob = await encodeToBlob(canvas, outFormat, q)
    if (blob.size <= targetBytes) {
      best = { blob, quality: q }
      lo = q
    } else {
      hi = q
    }
  }

  if (best) {
    return { blob: best.blob, quality: best.quality, resized: w !== source.width || h !== source.height, width: w, height: h }
  }
  return null
}

async function compressImageToTarget(
  file: File,
  targetBytes: number,
  opts: TargetAdvanced
): Promise<{
  blob: Blob
  outputSize: number
  status: 'success' | 'already-under' | 'failed'
  statusMessage: string
  resized: boolean
  outputFormat: OutputFormat
  width: number
  height: number
  originalSize: number
}> {
  const originalSize = file.size
  const bitmap = await loadBitmap(file)

  // Detect transparency for Auto
  const hasTransparency = file.type === 'image/png' ? await hasAlphaChannel(bitmap) : false

  // Decide output format
  let outFormat: OutputFormat
  if (opts.format === 'auto') {
    outFormat = decideAutoOutputFormat(file, hasTransparency, bitmap.width, bitmap.height)
    if (hasTransparency && opts.preserveTransparency && outFormat !== 'image/png') {
      // prefer webp if browser supports for transparent when not forcing png? keep png for safety or allow webp
      // Per PRD: for transparent prefer PNG or WebP. We'll allow webp if chosen, but default kept png.
      if (outFormat === 'image/jpeg') outFormat = 'image/png'
    }
  } else {
    outFormat = opts.format
  }

  // If original already under target, return original (no re-encode per PRD default)
  if (originalSize <= targetBytes) {
    return {
      blob: file,
      outputSize: originalSize,
      status: 'already-under',
      statusMessage: `Already under ${Math.round(targetBytes / 1024)}KB`,
      resized: false,
      outputFormat: (file.type === 'image/jpeg' ? 'image/jpeg' : file.type === 'image/png' ? 'image/png' : file.type === 'image/webp' ? 'image/webp' : 'image/jpeg') as OutputFormat,
      width: bitmap.width,
      height: bitmap.height,
      originalSize,
    }
  }

  // Compute effective max side from setting
  let maxSide = 4096
  if (opts.maxWidth !== 'auto') {
    maxSide = typeof opts.maxWidth === 'number' ? opts.maxWidth : 1920
  }

  // First attempt at native or max-constrained size
  let result = await compressToTargetOnce(bitmap, targetBytes, outFormat, opts.allowResize, maxSide, opts.qualityPreference)

  let didResize = result ? result.resized : false
  let finalW = result ? result.width : bitmap.width
  let finalH = result ? result.height : bitmap.height

  // Resize fallback loop (PRD: 0.85 scale, up to 8 times, stop below 320px min side)
  if (!result && opts.allowResize) {
    let current = bitmap
    for (let _i = 0; _i < 8; _i++) {
      const scale = 0.85
      const nw = Math.round(current.width * scale)
      const nh = Math.round(current.height * scale)
      if (Math.min(nw, nh) < 320) break

      const tmpCanvas = document.createElement('canvas')
      const tctx = tmpCanvas.getContext('2d')!
      tmpCanvas.width = nw
      tmpCanvas.height = nh
      tctx.drawImage(current, 0, 0, nw, nh)

      const scaledBitmap = await createImageBitmap(tmpCanvas)
      current = scaledBitmap

      const attempt = await compressToTargetOnce(current, targetBytes, outFormat, true, maxSide, opts.qualityPreference)
      if (attempt) {
        result = attempt
        didResize = true
        finalW = attempt.width
        finalH = attempt.height
        break
      }
    }
  }

  if (!result) {
    // Failed to reach target even after fallbacks
    // Return the best we could (lowest quality at smallest we tried) or original canvas at lo quality
    const failCanvas = document.createElement('canvas')
    const fctx = failCanvas.getContext('2d')!
    const fw = Math.min(bitmap.width, maxSide)
    const fh = Math.round(bitmap.height * (fw / bitmap.width))
    failCanvas.width = fw
    failCanvas.height = fh
    fctx.drawImage(bitmap, 0, 0, fw, fh)
    const blob = await encodeToBlob(failCanvas, outFormat, 0.3)
    return {
      blob,
      outputSize: blob.size,
      status: 'failed',
      statusMessage: `Could not reach target size`,
      resized: fw !== bitmap.width || fh !== bitmap.height,
      outputFormat: outFormat,
      width: fw,
      height: fh,
      originalSize,
    }
  }

  const outBlob = result.blob
  const outSize = outBlob.size
  const targetKB = Math.round(targetBytes / 1024)
  const pctOfTarget = (outSize / targetBytes) * 100

  let status: 'success' | 'already-under' | 'failed' = 'success'
  let statusMessage: string
  if (outSize > targetBytes) {
    status = 'failed'
    statusMessage = `Could not reach ${targetKB}KB with current settings`
  } else if (pctOfTarget < 85) {
    statusMessage = `Compressed under ${targetKB}KB (smaller than ideal)`
  } else {
    statusMessage = `Compressed under ${targetKB}KB`
  }

  return {
    blob: outBlob,
    outputSize: outSize,
    status,
    statusMessage,
    resized: didResize,
    outputFormat: outFormat,
    width: finalW,
    height: finalH,
    originalSize,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Target Size Compressor Workspace (landing pages for 100KB/200KB/500KB/1MB)
// ─────────────────────────────────────────────────────────────────────────────

function TargetSizeCompressor({ tool, navigate = (_to: string) => {} }: { tool: Tool; navigate?: (to: string) => void }) {
  const { t } = useI18n()
  const lp = useLangPath()
  const targetInfo = getTargetInfo(tool.slug)!
  const targetKB = targetInfo.kb
  const targetBytes = targetInfo.bytes
  const targetLabel = targetInfo.label

  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState<Array<{
    original: File
    result: { blob: Blob; outputSize: number; status: string; statusMessage: string; resized: boolean; outputFormat: OutputFormat; width: number; height: number; originalSize: number }
    url: string
  }>>([])
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [adv, setAdv] = useState<TargetAdvanced>({
    format: 'auto',
    allowResize: true,
    removeMetadata: true,
    preserveTransparency: true,
    maxWidth: 'auto',
    qualityPreference: 'best',
  })

  const clearAll = () => {
    results.forEach(r => URL.revokeObjectURL(r.url))
    setFiles([])
    setResults([])
    setError('')
    setIsProcessing(false)
  }

  const updateAdv = (patch: Partial<TargetAdvanced>) => {
    setAdv(prev => ({ ...prev, ...patch }))
  }

  const processFiles = async (incoming: File[]) => {
    if (!incoming.length) return
    setError('')
    setIsProcessing(true)
    const accepted = incoming.filter(f => f.type.startsWith('image/'))
    if (!accepted.length) {
      setError(t.tool.errorNotImage)
      setIsProcessing(false)
      return
    }
    const limited = accepted.slice(0, 20)
    setFiles(limited)

    const newResults: typeof results = []
    for (const f of limited) {
      try {
        const r = await compressImageToTarget(f, targetBytes, adv)
        const url = URL.createObjectURL(r.blob)
        newResults.push({ original: f, result: r, url })
      } catch (e: unknown) {
        // produce a failed placeholder using low quality
        const bm = await loadBitmap(f)
        const c = document.createElement('canvas')
        const ct = c.getContext('2d')!
        const mw = Math.min(bm.width, 1200)
        const mh = Math.round(bm.height * (mw / bm.width))
        c.width = mw; c.height = mh
        ct.drawImage(bm, 0, 0, mw, mh)
        const blob = await canvasToBlob(c, 'image/jpeg', 0.3)
        const url = URL.createObjectURL(blob)
        const errMsg = e instanceof Error ? e.message : 'Processing failed'
        newResults.push({
          original: f,
          result: {
            blob,
            outputSize: blob.size,
            status: 'failed',
            statusMessage: errMsg || 'Processing failed',
            resized: mw !== bm.width,
            outputFormat: 'image/jpeg',
            width: mw,
            height: mh,
            originalSize: f.size,
          },
          url,
        })
      }
    }
    // cleanup old
    results.forEach(r => URL.revokeObjectURL(r.url))
    setResults(newResults)
    setIsProcessing(false)
  }

  const reprocess = () => {
    if (files.length) void processFiles(files)
  }

  const downloadOne = (idx: number) => {
    const item = results[idx]
    if (!item) return
    const a = document.createElement('a')
    a.href = item.url
    const ext = extensionFor(item.result.outputFormat)
    a.download = `${fileNameWithoutExtension(item.original.name)}-${targetLabel.toLowerCase()}.${ext}`
    a.click()
  }

  const downloadAll = async () => {
    if (!results.length) return
    if (results.length === 1) {
      downloadOne(0)
      return
    }
    const JSZip = await loadJSZip()
    const zip = new JSZip()
    results.forEach((r, _i) => {
      const ext = extensionFor(r.result.outputFormat)
      zip.file(`${fileNameWithoutExtension(r.original.name)}-${targetLabel.toLowerCase()}.${ext}`, r.result.blob)
    })
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(zipBlob)
    a.download = `nanoimage-${targetLabel.toLowerCase()}-batch.zip`
    a.click()
  }

  const localName = t.toolsData[tool.slug]?.name ?? tool.name
  const localSubtitle = t.toolsData[tool.slug]?.description ?? tool.subtitle

  const relatedTargets = [
    { slug: 'compress-image-to-100kb', label: '100KB', when: targetKB !== 100 },
    { slug: 'compress-image-to-200kb', label: '200KB', when: targetKB !== 200 },
    { slug: 'compress-image-to-500kb', label: '500KB', when: targetKB !== 500 },
    { slug: 'compress-image-to-1mb', label: '1MB', when: targetKB !== 1024 },
  ].filter(r => r.when)

  return (
    <div className="workspace target-size-workspace compress-workspace">
      <div className="compress-top">
        <section className="compress-title-card">
          <Breadcrumbs current={localName} categoryId={tool.category} navigate={navigate} />
          <h1>{localName}</h1>
          <p className="tool-lead">{localSubtitle}</p>
          <div className="trust-row">
            <span><HomeIcon name="lock" /> {t.tool.staysPrivate}</span>
            <span><HomeIcon name="bolt" /> No upload</span>
            <span><HomeIcon name="smile" /> Free forever</span>
          </div>
        </section>

        {/* Upload / Drop zone aligned with /compress-image behavior */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <UploadDropzone multiple onFiles={(incoming) => { if (!isProcessing) void processFiles(incoming) }} hintSmall={(t as any).targetCompressor?.formats ?? 'JPG, PNG, WebP supported'} />
        <div className="target-upload-meta">
          <small>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(t as any).targetCompressor?.targetSizePrefix ?? 'Target size:'} {targetLabel}
          </small>
          <small className="target-hint">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(t as any).targetCompressor?.modePrefix ?? 'Mode: Best quality under'} {targetLabel}
          </small>
        </div>

        {isProcessing && (
          <div className="target-status">
            <span className="spinner" /> {
              /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
              ((t as any).targetCompressor?.compressing ?? 'Compressing to under {label}… Finding the best quality that fits your target size.').replace('{label}', targetLabel)
            }
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="target-results">
          <div className="results-header">
            <h2>{
              /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
              ((t as any).targetCompressor?.resultsHeader ?? 'Results · Target {label}').replace('{label}', targetLabel)
            }</h2>
            <div className="results-actions">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <button type="button" className="secondary" onClick={reprocess}>{(t as any).targetCompressor?.reprocess ?? 'Re-compress with current settings'}</button>
              <button type="button" className="primary" onClick={downloadAll}>
                {(() => {
                  /* eslint-disable @typescript-eslint/no-explicit-any */
                  const tc: any = (t as any).targetCompressor;
                  if (results.length > 1) {
                    return tc?.downloadAll ?? 'Download All (ZIP)';
                  }
                  return tc?.download ?? 'Download';
                  /* eslint-enable @typescript-eslint/no-explicit-any */
                })()}
              </button>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <button type="button" className="secondary" onClick={clearAll}>{(t as any).targetCompressor?.clear ?? 'Clear'}</button>
            </div>
          </div>

          <div className="target-grid">
            {results.map((r, idx) => {
              const saved = Math.max(0, r.result.originalSize - r.result.outputSize)
              const savedPct = r.result.originalSize ? Math.round((saved / r.result.originalSize) * 100) : 0
              const under = r.result.outputSize <= targetBytes
              const pctTarget = Math.round((r.result.outputSize / targetBytes) * 100)
              return (
                <div key={idx} className={`target-result-card ${r.result.status}`}>
                  <div className="thumb">
                    <img src={r.url} alt={r.original.name} />
                  </div>
                  <div className="meta">
                    <div className="filename" title={r.original.name}>{r.original.name}</div>
                    <div className="sizes">
                      <span>Original: {formatSize(r.result.originalSize)}</span>
                      <span>Output: {formatSize(r.result.outputSize)}</span>
                      <span className="saved">Saved {formatSize(saved)} ({savedPct}%)</span>
                    </div>
                    <div className="status-line">
                      <span className={`status-badge ${r.result.status}`}>{r.result.statusMessage}</span>
                      <span className="target-badge">Target {targetLabel}</span>
                    </div>
                    <div className="details">
                      <span>{r.result.outputFormat.replace('image/', '').toUpperCase()}</span>
                      <span>{r.result.width}×{r.result.height}</span>
                      {r.result.resized && <span className="resized">resized</span>}
                      <span className={under ? 'ok' : 'fail'}>{pctTarget}% of target</span>
                    </div>
                  </div>
                  <div className="actions">
                    <button className="download" onClick={() => downloadOne(idx)}><HomeIcon name="download" /> Download</button>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="privacy-note"><HomeIcon name="lock" /> Your images are processed in your browser. We never upload them to our servers.</p>
        </div>
      )}

      {/* Advanced settings (folded by default) */}
      <details className="target-advanced" open={advancedOpen} onToggle={(e) => setAdvancedOpen((e.target as HTMLDetailsElement).open)}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <summary>{(t as any).targetCompressor?.advanced ?? 'Advanced settings'}</summary>
        <div className="adv-grid">
          <label>
            Output format
            <select value={adv.format} onChange={e => { updateAdv({ format: e.target.value as TargetAdvanced['format'] }); if (results.length) reprocess() }}>
              <option value="auto">Auto (recommended)</option>
              <option value="image/jpeg">JPG</option>
              <option value="image/webp">WebP</option>
              <option value="image/png">PNG</option>
            </select>
          </label>
          <label className="check">
            <input type="checkbox" checked={adv.allowResize} onChange={e => { updateAdv({ allowResize: e.target.checked }); if (results.length) reprocess() }} /> Allow resizing (recommended)
          </label>
          <label className="check">
            <input type="checkbox" checked={adv.removeMetadata} onChange={e => updateAdv({ removeMetadata: e.target.checked })} /> Remove metadata
          </label>
          <label className="check">
            <input type="checkbox" checked={adv.preserveTransparency} onChange={e => updateAdv({ preserveTransparency: e.target.checked })} /> Preserve transparency (when possible)
          </label>
          <label>
            Max width
            <select value={String(adv.maxWidth)} onChange={e => { const v = e.target.value === 'auto' ? 'auto' : Number(e.target.value) as TargetAdvanced['maxWidth']; updateAdv({ maxWidth: v }); if (results.length) reprocess() }}>
              <option value="auto">Auto</option>
              <option value="2560">2560 px</option>
              <option value="1920">1920 px (HD)</option>
              <option value="1280">1280 px</option>
            </select>
          </label>
          <label>
            Quality preference
            <select value={adv.qualityPreference} onChange={e => { updateAdv({ qualityPreference: e.target.value as TargetAdvanced['qualityPreference'] }); if (results.length) reprocess() }}>
              <option value="best">Best quality</option>
              <option value="smaller">Smaller file (may look softer)</option>
            </select>
          </label>
        </div>
        <p className="adv-note">{
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          ((t as any).targetCompressor?.advNote ?? 'Changes apply on next compress. The tool always tries to stay ≤ {label} while keeping the highest viable quality.').replace('{label}', targetLabel)
        }</p>
      </details>

      {/* Related target sizes (per PRD) */}
      <section className="target-related">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <h3>{(t as any).targetCompressor?.needDifferent ?? 'Need a different size?'}</h3>
        <div className="related-cards">
          {relatedTargets.map(r => (
            <a key={r.slug} href={lp(`/${r.slug}`)} className="related-card" onClick={(e) => { e.preventDefault(); navigate(lp(`/${r.slug}`)) }}>
              <strong>Compress Image to {r.label}</strong>
              <span>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {r.label === '100KB' && ((t as any).targetCompressor?.related100 ?? 'Avatars, forms, small uploads')}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {r.label === '200KB' && ((t as any).targetCompressor?.related200 ?? 'ID, visa, passport, documents')}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {r.label === '500KB' && ((t as any).targetCompressor?.related500 ?? 'Email, blog, product photos')}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {r.label === '1MB' && ((t as any).targetCompressor?.related1m ?? 'Phone photos, social, HR uploads')}
              </span>
            </a>
          ))}
          <a href={lp('/compress-image')} className="related-card" onClick={(e) => { e.preventDefault(); navigate('/compress-image') }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <strong>{(t as any).targetCompressor?.allTools ?? 'All image compression tools'}</strong>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <span>{(t as any).targetCompressor?.allToolsDesc ?? 'Manual quality, batch, more options'}</span>
          </a>
        </div>
      </section>
    </div>
  )
}

export function ComingSoonTool({ tool }: { tool: Tool }) {
  const { t } = useI18n()
  return (
    <section className="workspace coming-soon-workspace">
      <div className="compress-top">
        <section className="compress-title-card">
          <span className="title-doodle" aria-hidden="true"><HomeIcon name="sparkle" /></span>
          <h1>{t.toolsData[tool.slug]?.name ?? tool.name}</h1>
          <p>{t.toolsData[tool.slug]?.description ?? tool.description}</p>
          <div className="privacy-card">
            <span><HomeIcon name="bolt" /> {t.tool.alwaysFree}</span>
            <span><HomeIcon name="device" /> {t.tool.worksBrowser}</span>
          </div>
        </section>
      </div>
    </section>
  )
}

function buttonLabel(slug: string, t: { tool: { convertToPdf: string; convert: string; compress: string; addWatermark: string; addText: string; apply: string } }) {
  if (slug.includes('pdf')) return t.tool.convertToPdf
  if (slug.includes('convert')) return t.tool.convert
  if (slug.includes('compress')) return t.tool.compress
  if (slug.includes('watermark')) return t.tool.addWatermark
  if (slug.includes('text')) return t.tool.addText
  return t.tool.apply
}

function settingsTitle(tool: Tool, t: { tool: { compressionSettings: string; pdfSettings: string; settings: string } }) {
  if (tool.slug === 'compress-image') return t.tool.compressionSettings
  if (tool.slug === 'image-to-pdf') return t.tool.pdfSettings
  return `${tool.name} ${t.tool.settings}`
}

function downloadLabel(file: ProcessedFile | undefined, t: { tool: { download: string; downloadZip: string; downloadPdf: string } }) {
  if (!file) return t.tool.download
  if (file.name.endsWith('.zip')) return t.tool.downloadZip
  if (file.name.endsWith('.pdf')) return t.tool.downloadPdf
  return t.tool.download
}

function formatSize(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))}KB`
  return `${(size / 1024 / 1024).toFixed(2)}MB`
}

function fileNameWithoutExtension(name: string) {
  return name.replace(/\.[^/.]+$/, '') || 'nanoimage'
}

function extensionFor(type: OutputFormat) {
  return type === 'image/png' ? 'png' : type === 'image/webp' ? 'webp' : 'jpg'
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function defaultBlurBrushSize(width: number, height: number) {
  return width || height ? 50 : 50
}

function backgroundMarkerPaint(mode: BackgroundMode, color: string, imageDataUrl: string): CSSProperties {
  if (mode === 'transparent') {
    return {
      backgroundColor: 'transparent',
      backgroundImage: 'linear-gradient(45deg, #d8d8d8 25%, transparent 25%), linear-gradient(-45deg, #d8d8d8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d8d8d8 75%), linear-gradient(-45deg, transparent 75%, #d8d8d8 75%)',
      backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0',
      backgroundSize: '12px 12px',
    }
  }
  if (mode === 'image' && imageDataUrl) {
    return {
      backgroundImage: `url(${imageDataUrl})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }
  }
  if (mode === 'gradient') {
    return { backgroundImage: 'linear-gradient(135deg, #7d52ff, #32b8d8 52%, #ffc233)' }
  }
  return { backgroundColor: color === 'transparent' ? '#ffffff' : color }
}

function enhanceCssFilter(settings: ToolSettingsState) {
  const brightness = 100 + settings.brightness + settings.exposure
  const contrast = 100 + settings.contrast + settings.clarity * 0.45
  const saturation = 100 + settings.saturation + settings.vibrance
  return `brightness(${clamp(brightness, 20, 190)}%) contrast(${clamp(contrast, 20, 190)}%) saturate(${clamp(saturation, 0, 220)}%)`
}

function applyEnhanceColorOverlay(ctx: CanvasRenderingContext2D, width: number, height: number, settings: ToolSettingsState) {
  if (!settings.highlights && !settings.shadows && !settings.warmth && !settings.tint) return
  if (settings.warmth) {
    ctx.save()
    ctx.globalAlpha = Math.min(Math.abs(settings.warmth) / 100, 0.28)
    ctx.fillStyle = settings.warmth > 0 ? '#ff9d3d' : '#3d8bff'
    ctx.globalCompositeOperation = 'soft-light'
    ctx.fillRect(0, 0, width, height)
    ctx.restore()
  }
}

function applyCanvasSharpen(ctx: CanvasRenderingContext2D, width: number, height: number, sharpness: number, resampling: ToolSettingsState['resampling']) {
  const source = ctx.getImageData(0, 0, width, height)
  const output = new ImageData(new Uint8ClampedArray(source.data), width, height)
  const amount = clamp(sharpness / 100, 0, 1) * (resampling === 'sharp' ? 0.78 : 0.48)
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = (y * width + x) * 4
      for (let channel = 0; channel < 3; channel += 1) {
        const center = source.data[index + channel]
        const top = source.data[index - width * 4 + channel]
        const bottom = source.data[index + width * 4 + channel]
        const left = source.data[index - 4 + channel]
        const right = source.data[index + 4 + channel]
        output.data[index + channel] = clamp(Math.round(center * (1 + amount * 4) - (top + bottom + left + right) * amount), 0, 255)
      }
    }
  }
  ctx.putImageData(output, 0, 0)
}

async function paintCanvasBackground(ctx: CanvasRenderingContext2D, width: number, height: number, settings: ToolSettingsState) {
  ctx.clearRect(0, 0, width, height)
  if (settings.backgroundMode === 'transparent') return
  if (settings.backgroundMode === 'gradient') {
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#7d52ff')
    gradient.addColorStop(0.55, '#32b8d8')
    gradient.addColorStop(1, '#ffc233')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
    return
  }
  if (settings.backgroundMode === 'image' && settings.backgroundImageDataUrl) {
    const background = await loadBitmapFromDataUrl(settings.backgroundImageDataUrl)
    const scale = Math.max(width / background.width, height / background.height)
    const drawWidth = background.width * scale
    const drawHeight = background.height * scale
    ctx.drawImage(background, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
    return
  }
  ctx.fillStyle = settings.background === 'transparent' ? '#ffffff' : settings.background
  ctx.fillRect(0, 0, width, height)
}

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '').trim()
  const value = normalized.length === 3
    ? normalized.split('').map((char) => `${char}${char}`).join('')
    : normalized.padEnd(6, '0').slice(0, 6)
  const parsed = Number.parseInt(value, 16)
  if (Number.isNaN(parsed)) return { r: 125, g: 82, b: 255 }
  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255,
  }
}

type PassportRenderOptions = {
  preset: PassportPhotoPreset
  background: string
  format?: OutputFormat
  zoom?: number
  offsetX?: number
  offsetY?: number
  rotation?: number
  flipX?: boolean
  flipY?: boolean
  brightness?: number
  contrast?: number
  saturation?: number
  targetKb?: number | null
}

async function createPassportPreviewDataUrl(file: File, options: PassportRenderOptions): Promise<string> {
  const result = await createPassportPhoto(file, { ...options, format: 'image/jpeg' })
  return result.url
}

async function createPassportPhoto(file: File, options: PassportRenderOptions): Promise<ProcessedFile> {
  const bitmap = await loadBitmap(file)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas is not supported')
  const widthPx = Math.max(1, Math.round((options.preset.width / 25.4) * options.preset.dpi))
  const heightPx = Math.max(1, Math.round((options.preset.height / 25.4) * options.preset.dpi))
  canvas.width = widthPx
  canvas.height = heightPx
  ctx.fillStyle = options.background || '#ffffff'
  ctx.fillRect(0, 0, widthPx, heightPx)
  const zoom = options.zoom ?? 1
  const drawW = bitmap.width * zoom
  const drawH = bitmap.height * zoom
  const centerX = widthPx / 2 + (options.offsetX ?? 0)
  const centerY = heightPx / 2 + (options.offsetY ?? 0)
  ctx.save()
  ctx.translate(centerX, centerY)
  ctx.rotate(((options.rotation ?? 0) * Math.PI) / 180)
  ctx.scale(options.flipX ? -1 : 1, options.flipY ? -1 : 1)
  ctx.drawImage(bitmap, -drawW / 2, -drawH / 2, drawW, drawH)
  ctx.restore()
  const outType = options.format ?? 'image/jpeg'
  let quality = outType === 'image/png' ? undefined : 0.95
  let blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Failed to render passport photo'))), outType, quality),
  )
  if (options.targetKb && outType !== 'image/png') {
    const targetBytes = options.targetKb * 1024
    let tries = 0
    while (blob.size > targetBytes && quality && quality > 0.4 && tries < 8) {
      quality -= 0.08
      blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Failed to render passport photo'))), outType, quality),
      )
      tries += 1
    }
  }
  const ext = extensionFor(outType)
  return {
    name: `nanoimage-passport-photo.${ext}`,
    blob,
    size: blob.size,
    url: URL.createObjectURL(blob),
  }
}

async function createPassportPrintSheet(singlePhotoBlob: Blob, preset: PassportPhotoPreset, format: OutputFormat = 'image/jpeg'): Promise<ProcessedFile> {
  const bitmap = await loadBitmap(new File([singlePhotoBlob], 'passport-photo', { type: singlePhotoBlob.type || 'image/jpeg' }))
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas is not supported')
  const cardW = Math.max(1, Math.round((preset.width / 25.4) * preset.dpi))
  const cardH = Math.max(1, Math.round((preset.height / 25.4) * preset.dpi))
  const cols = 2
  const rows = 3
  const gap = Math.max(12, Math.round(cardW * 0.08))
  canvas.width = cols * cardW + (cols + 1) * gap
  canvas.height = rows * cardH + (rows + 1) * gap
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const x = gap + c * (cardW + gap)
      const y = gap + r * (cardH + gap)
      ctx.drawImage(bitmap, x, y, cardW, cardH)
    }
  }
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Failed to render print sheet'))), format, format === 'image/png' ? undefined : 0.95),
  )
  const ext = extensionFor(format)
  return {
    name: `nanoimage-passport-sheet.${ext}`,
    blob,
    size: blob.size,
    url: URL.createObjectURL(blob),
  }
}
