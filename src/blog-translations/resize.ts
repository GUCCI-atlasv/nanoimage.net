import type { BlogPost } from '../data'

export type BlogLoc = Partial<Omit<BlogPost, 'slug' | 'date' | 'coverImage' | 'localizations'>>
export type BlogLocMap = Record<string, BlogLoc>

export const resizeLocalizations: BlogLocMap = {
  'zh-CN': {
    category: '技巧',
    title: '如何调整图片尺寸而不损失画质',
    excerpt: '学习如何为网站、社交媒体、邮件和文档调整 JPG、PNG、WebP 图片尺寸，避免模糊或变形。',
    readTime: '8 分钟阅读',
    metaDescription: '学习如何为网站、社交媒体、邮件和文档调整 JPG、PNG、WebP 图片尺寸，避免模糊或变形。',
    body: `图片尺寸并不总是符合你的使用场景。手机照片可能对网站来说太大，商品图可能需要特定宽度，头像可能需要正方形，上传表单也可能拒绝超大图片——这时就需要调整尺寸。

本指南介绍如何正确调整图片尺寸、避免模糊，以及网站、社交媒体、邮件和文档的推荐尺寸。

![原图与调整后对比](/assets/blog/resize-images-comparison.png)

## 调整图片尺寸是什么意思？

调整尺寸就是改变图片的宽度和高度。例如把 4000 × 3000 px 改为 1200 × 900 px。画面内容不变，但像素更少，文件通常更小，上传和显示也更方便。

也可以放大图片，但放大不会凭空增加真实细节。原图太小时过度放大会发糊或出现像素块。

## 为什么要调整尺寸？

### 网站加载更快

网站只显示 1200px 宽的图片时，上传 5000px 宽的图通常没必要。先调整尺寸能提升加载速度和体验。

### 社交媒体更合适

各平台对尺寸和宽高比有推荐值，调整尺寸比 awkward 裁剪更自然。

### 邮件分享更轻松

大图让附件变重，先调整尺寸再发送更顺畅。

### 文档和 PDF 更整洁

Word、演示文稿和 PDF 中的超大图会让文件臃肿，调整尺寸可保持合理体积。

### 减少上传错误

许多表单和网站有文件大小或尺寸限制，调整尺寸有助于满足要求。

## 调整尺寸 vs 裁剪：有什么区别？

### 调整尺寸（Resize）

改变宽高但保留完整画面。例如 4000 × 3000 → 1200 × 900，不裁掉任何内容。

### 裁剪（Crop）

裁掉部分画面。例如 4000 × 3000 → 1080 × 1080 正方形，会去掉边缘区域。

画面内容正确但尺寸不对时用 [**调整尺寸**](/resize-image)；需要改构图或去多余区域时用 [**裁剪图片**](/crop-image)。

## 像素、百分比和宽高比

### 像素

图片由像素点组成，尺寸通常写作宽 × 高，如 1920 × 1080 px。

### 百分比

按百分比缩放，50% 表示宽高各变为原来一半。4000 × 3000 缩到 50% 即 2000 × 1500。

### 宽高比

宽高之间的关系，常见有 1:1 正方形、4:3 经典照片、16:9 宽屏、9:16 竖屏、4:5 社交帖子。

调整时通常应保持原宽高比，避免拉伸变形。

## 尽量保持宽高比

常见错误是把 4000 × 3000 直接改成 1200 × 1200 而不裁剪，画面会被挤压变形。

开启 **保持宽高比**，改宽度时高度会自动按比例调整。4000 × 3000 宽改为 1200 时，高度自动变为 900。

## 常见用途的推荐尺寸

### 网站横幅

推荐宽度 1600–2400 px，全宽横幅可用更大尺寸，但避免不必要的 5000px 大图。

### 博客配图

推荐宽度 1200 px，足够清晰且文件合理。

### 商品图片

推荐宽度 1500–2000 px，兼顾放大查看和文件体积。

### 邮件图片

推荐宽度 800–1200 px，邮件客户端不需要极大尺寸。

### 头像

推荐 400 × 400 或 800 × 800 px，需要时先裁成正方形再调整。

### 社交媒体

常见尺寸：1080 × 1080 方形帖、1080 × 1350 竖图、1080 × 1920 故事/竖屏、1200 × 630 链接预览。请以各平台最新要求为准。

## 应该先调整尺寸还是先压缩？

通常 **先调整尺寸，再压缩**。

推荐流程：

1. 调整到实际需要的尺寸
2. 压缩减小体积
3. 下载前预览效果

先压缩超大图再缩小，可能损失两次画质。

## 能否放大图片而不损失画质？

可以放大，但有上限。小幅放大（如 800 × 600 → 1200 × 900）通常尚可；大幅放大（如 800 × 600 → 4000 × 3000）除非用 AI 超分，否则会模糊。

NanoImage 的基础调整和放大面向浏览器日常任务，不是 AI 超分辨率工具。

## 调整尺寸的最佳实践

### 1. 从原图开始

尽量用原始文件而非已压缩或已调整过的副本。

### 2. 避免反复调整

每次导出都可能改变画质，尽量一次到位。

### 3. 开启保持宽高比

防止拉伸变形。

### 4. 按实际显示尺寸调整

网站显示 1200px 宽，就调整到接近 1200px。

### 5. 选对输出格式

照片用 JPG，透明或锐利图形用 PNG，网页图片用 WebP。

### 6. 下载前预览

检查文字、人脸、商品边缘和 Logo 等关键细节。

## 常见调整尺寸误区

拉伸变形、缩得太小导致高分屏发糊、上传超大图拖慢网站、过度放大小图、PNG 照片体积仍远大于 JPG/WebP。

## 用 NanoImage 调整尺寸

1. 打开 [**调整尺寸**](/resize-image)
2. 上传或拖放图片
3. 按像素或百分比调整
4. 输入新宽度或高度
5. 开启保持宽高比
6. 选择 PNG、JPG 或 WebP
7. 预览并下载

无需安装软件或注册账号，几秒钟即可完成。

## 调整后的图片会泄露隐私吗？

NanoImage 尽可能在浏览器本地处理，文件无需主动上传到服务器，适合处理个人照片、截图和文档。

## 调整尺寸 + 压缩，效果最佳

若目标是减小体积，两者配合效果最好：

1. 把 4000px 宽图调整为 1200px
2. 转为 WebP 或 JPG
3. 用平衡质量压缩

这样可大幅减小文件，同时保持清晰。

## 总结

调整尺寸是让图片更易上传、分享和在线使用的最简单方法之一。关键是：选对尺寸、保持宽高比、避免过度放大、选对格式、需要时再压缩。

## 立即体验

[**调整尺寸**](/resize-image)：/resize-image

[**压缩图片**](/compress-image)：/compress-image

[**转换为 WebP**](/convert-to-webp)：/convert-to-webp`,
  },
  'zh-TW': {
    category: '技巧',
    title: '如何調整圖片尺寸而不損失畫質',
    excerpt: '學習如何為網站、社群媒體、郵件和文件調整 JPG、PNG、WebP 圖片尺寸，避免模糊或變形。',
    readTime: '8 分鐘閱讀',
    metaDescription: '學習如何為網站、社群媒體、郵件和文件調整 JPG、PNG、WebP 圖片尺寸，避免模糊或變形。',
    body: `圖片尺寸並不總是符合你的使用場景。手機照片可能對網站來說太大，商品圖可能需要特定寬度，大頭照可能需要正方形，上傳表單也可能拒絕超大圖片——這時就需要調整尺寸。

本指南介紹如何正確調整圖片尺寸、避免模糊，以及網站、社群媒體、郵件和文件的推薦尺寸。

![原圖與調整後對比](/assets/blog/resize-images-comparison.png)

## 調整圖片尺寸是什麼意思？

調整尺寸就是改變圖片的寬度和高度。例如把 4000 × 3000 px 改為 1200 × 900 px。畫面內容不變，但像素更少，檔案通常更小。

也可以放大圖片，但放大不會憑空增加真實細節。原圖太小時過度放大會發糊或出現像素塊。

## 為什麼要調整尺寸？

### 網站載入更快

網站只顯示 1200px 寬的圖片時，上傳 5000px 寬的圖通常沒必要。

### 社群媒體更合適

各平台對尺寸和寬高比有推薦值，調整尺寸比生硬裁切更自然。

### 郵件分享更輕鬆

大圖讓附件變重，先調整尺寸再寄送更順暢。

### 文件和 PDF 更整潔

Word、簡報和 PDF 中的超大圖會讓檔案臃腫。

### 減少上傳錯誤

許多表單和網站有檔案大小或尺寸限制。

## 調整尺寸 vs 裁切：有什麼區別？

調整尺寸改變寬高但保留完整畫面；裁切則去掉部分區域。畫面正確但尺寸不對用 [**調整尺寸**](/resize-image)；需改構圖用 [**裁切圖片**](/crop-image)。

## 像素、百分比和寬高比

像素是組成圖片的基本單位；百分比按比例縮放；寬高比是寬與高的關係（1:1、4:3、16:9、9:16、4:5 等）。調整時應保持原寬高比。

## 盡量保持寬高比

把 4000 × 3000 直接改成 1200 × 1200 而不裁切會擠壓變形。開啟 **保持寬高比** 可自動按比例調整。

## 常見用途的推薦尺寸

網站橫幅 1600–2400 px；部落格 1200 px；商品 1500–2000 px；郵件 800–1200 px；大頭照 400×400 或 800×800；社群常見 1080×1080、1080×1350、1080×1920、1200×630。

## 應該先調整尺寸還是先壓縮？

通常 **先調整尺寸，再壓縮**。先壓縮超大圖再縮小，可能損失兩次畫質。

## 能否放大圖片而不損失畫質？

可以放大但有上限。小幅放大通常尚可；大幅放大除非用 AI 超分，否則會模糊。

## 調整尺寸的最佳實踐

從原圖開始、避免反覆調整、開啟保持寬高比、按實際顯示尺寸調整、選對輸出格式、下載前預覽。

## 常見調整尺寸誤區

拉伸變形、縮得太小、上傳超大圖、過度放大小圖、PNG 照片體積仍過大。

## 用 NanoImage 調整尺寸

1. 開啟 [**調整尺寸**](/resize-image)
2. 上傳或拖放圖片
3. 按像素或百分比調整
4. 開啟保持寬高比
5. 選擇格式並預覽下載

## 調整後的圖片會洩露隱私嗎？

NanoImage 盡可能在瀏覽器本機處理，無需主動上傳到伺服器。

## 調整尺寸 + 壓縮，效果最佳

把 4000px 圖調為 1200px → 轉 WebP/JPG → 平衡品質壓縮，可大幅減小檔案。

## 總結

選對尺寸、保持寬高比、避免過度放大、選對格式、需要時再壓縮。

## 立即體驗

[**調整尺寸**](/resize-image)：/resize-image

[**壓縮圖片**](/compress-image)：/compress-image

[**轉換為 WebP**](/convert-to-webp)：/convert-to-webp`,
  },
  ja: {
    category: 'ヒント',
    title: '画質を損なわずに画像サイズを変更する方法',
    excerpt: 'Web サイト、SNS、メール、文書向けに JPG、PNG、WebP 画像のサイズをぼやけや歪みなく調整する方法を解説します。',
    readTime: '8分で読めます',
    metaDescription: 'Web サイト、SNS、メール、文書向けに JPG、PNG、WebP 画像のサイズをぼやけや歪みなく調整する方法を解説します。',
    body: `画像のサイズは、使いたい場所に合わないことがよくあります。スマホ写真は Web サイトには大きすぎ、商品画像は特定の幅が必要、プロフィール写真は正方形が求められる——そんなときにリサイズが役立ちます。

このガイドでは、正しいリサイズ方法、ぼやけの回避、用途別の推奨サイズを説明します。

![元画像とリサイズ後の比較](/assets/blog/resize-images-comparison.png)

## 画像のリサイズとは？

リサイズとは幅と高さを変更することです。例：4000 × 3000 px → 1200 × 900 px。内容は同じですがピクセル数が減り、ファイルも小さくなります。

拡大も可能ですが、小さすぎる画像を大きくしすぎるとぼやけやピクセル化が起きます。

## なぜリサイズするのか？

### Web サイトの高速化

1200px で表示するなら 5000px の画像は不要です。

### SNS に最適化

各プラットフォームの推奨サイズやアスペクト比に合わせやすくなります。

### メール共有の軽量化

大きな添付ファイルを避けられます。

### 文書・PDF の整理

Word や PDF 内の巨大画像を適切なサイズに。

### アップロードエラーの回避

サイズやファイル制限を満たしやすくなります。

## リサイズ vs クロップ

リサイズは全体を保ったまま寸法を変更。クロップは一部を切り取ります。構図は正しいがサイズが違う場合は [**画像リサイズ**](/resize-image)、構図変更には [**画像クロップ**](/crop-image)。

## ピクセル、パーセント、アスペクト比

ピクセルは画像の最小単位。パーセントは比率で縮小（50% で半分）。アスペクト比は幅と高さの比（1:1、4:3、16:9、9:16、4:5 など）。通常は比率を維持して歪みを防ぎます。

## 可能な限りアスペクト比を維持

4000 × 3000 を 1200 × 1200 にすると横に潰れます。**アスペクト比を維持** をオンにすると、幅を 1200 にすると高さは自動で 900 になります。

## 用途別の推奨サイズ

ヒーロー画像 1600–2400 px、ブログ 1200 px、商品 1500–2000 px、メール 800–1200 px、プロフィール 400×400 または 800×800、SNS は 1080×1080、1080×1350、1080×1920、1200×630 など。

## リサイズと圧縮、どちらを先に？

通常は **先にリサイズ、後に圧縮**。巨大画像を圧縮してから縮小すると画質を二重に失う可能性があります。

## 拡大しても画質は保てる？

限界があります。800 × 600 → 1200 × 900 は許容範囲ですが、800 × 600 → 4000 × 3000 は AI アップスケールなしではぼやけます。

## リサイズのベストプラクティス

オリジナルから作業、繰り返しリサイズを避ける、アスペクト比維持、表示サイズに合わせる、適切な形式（写真 JPG、透明 PNG、Web WebP）、ダウンロード前にプレビュー。

## よくある失敗

引き伸ばし、縮小しすぎ、巨大画像のままアップロード、低解像度の過度な拡大、PNG 写真のまま大きなファイル。

## NanoImage でリサイズ

1. [**画像リサイズ**](/resize-image) を開く
2. 画像をアップロード
3. ピクセルまたはパーセントで指定
4. アスペクト比維持をオン
5. 形式を選びプレビューしてダウンロード

## リサイズ後のプライバシーは？

可能な限りブラウザ内でローカル処理。サーバーへの意図的なアップロードは不要です。

## リサイズ + 圧縮で最良の結果

4000px → 1200px にリサイズ → WebP/JPG に変換 → バランスの良い品質で圧縮。

## まとめ

必要な寸法を選び、アスペクト比を維持し、過度な拡大を避け、適切な形式を選び、必要なら圧縮を。

## 今すぐ試す

[**画像リサイズ**](/resize-image)：/resize-image

[**画像を圧縮**](/compress-image)：/compress-image

[**WebP に変換**](/convert-to-webp)：/convert-to-webp`,
  },
  ko: {
    category: '팁',
    title: '화질 손실 없이 이미지 크기 조정하는 방법',
    excerpt: '웹사이트, SNS, 이메일, 문서용 JPG, PNG, WebP 이미지를 흐리거나 왜곡되지 않게 조정하는 방법을 알아보세요.',
    readTime: '8분 읽기',
    metaDescription: '웹사이트, SNS, 이메일, 문서용 JPG, PNG, WebP 이미지를 흐리거나 왜곡되지 않게 조정하는 방법을 알아보세요.',
    body: `이미지 크기가 사용 목적에 맞지 않는 경우가 많습니다. 휴대폰 사진은 웹사이트에 너무 크고, 상품 이미지는 특정 너비가 필요하며, 프로필 사진은 정사각형이어야 할 수 있습니다.

이 가이드에서는 올바른 크기 조정 방법, 흐림 방지, 용도별 권장 크기를 설명합니다.

![원본과 크기 조정 후 비교](/assets/blog/resize-images-comparison.png)

## 이미지 크기 조정이란?

너비와 높이를 변경하는 것입니다. 예: 4000 × 3000 px → 1200 × 900 px. 내용은 같지만 픽셀이 줄어 파일도 작아집니다.

확대도 가능하지만, 너무 작은 이미지를 과도하게 키우면 흐려지거나 픽셀화됩니다.

## 왜 크기를 조정해야 하나요?

### 더 빠른 웹사이트

1200px로 표시한다면 5000px 이미지는 불필요합니다.

### SNS에 최적화

플랫폼별 권장 크기와 비율에 맞출 수 있습니다.

### 이메일 공유 용이

큰 첨부 파일을 피할 수 있습니다.

### 문서·PDF 정리

Word, PDF의 거대 이미지를 적절한 크기로.

### 업로드 오류 감소

크기·파일 제한을 충족하기 쉽습니다.

## 크기 조정 vs 자르기

크기 조정은 전체를 유지하며 치수 변경, 자르기는 일부를 제거합니다. 구도는 맞지만 크기가 틀리면 [**이미지 크기 조정**](/resize-image), 구도 변경은 [**이미지 자르기**](/crop-image).

## 픽셀, 백분율, 가로세로 비율

픽셀은 이미지의 최소 단위. 백분율은 비율로 축소(50%면 절반). 가로세로 비율은 1:1, 4:3, 16:9, 9:16, 4:5 등. 보통 비율을 유지해 왜곡을 방지합니다.

## 가능하면 가로세로 비율 유지

4000 × 3000을 1200 × 1200으로 바꾸면 찌그러집니다. **비율 유지**를 켜면 너비 1200일 때 높이는 자동으로 900이 됩니다.

## 용도별 권장 크기

히어로 1600–2400 px, 블로그 1200 px, 상품 1500–2000 px, 이메일 800–1200 px, 프로필 400×400 또는 800×800, SNS 1080×1080, 1080×1350, 1080×1920, 1200×630.

## 크기 조정과 압축, 무엇을 먼저?

보통 **먼저 크기 조정, 그다음 압축**. 거대 이미지를 압축 후 축소하면 화질을 두 번 잃을 수 있습니다.

## 확대해도 화질이 유지되나요?

한계가 있습니다. 800 × 600 → 1200 × 900은 괜찮지만, 800 × 600 → 4000 × 3000은 AI 업스케일 없이는 흐려집니다.

## 크기 조정 모범 사례

원본에서 작업, 반복 조정 피하기, 비율 유지, 표시 크기에 맞추기, 적절한 형식(사진 JPG, 투명 PNG, 웹 WebP), 다운로드 전 미리보기.

## 흔한 실수

늘리기, 과도한 축소, 거대 이미지 업로드, 저해상도 과도 확대, PNG 사진의 큰 파일.

## NanoImage로 크기 조정

1. [**이미지 크기 조정**](/resize-image) 열기
2. 이미지 업로드
3. 픽셀 또는 백분율 지정
4. 비율 유지 켜기
5. 형식 선택 후 미리보기·다운로드

## 조정 후 프라이버시는?

가능한 한 브라우저에서 로컬 처리. 서버에 의도적으로 업로드할 필요 없습니다.

## 크기 조정 + 압축으로 최상의 결과

4000px → 1200px 조정 → WebP/JPG 변환 → 균형 잡힌 품질로 압축.

## 마무리

필요한 치수 선택, 비율 유지, 과도한 확대 피하기, 적절한 형식, 필요 시 압축.

## 지금 사용해 보기

[**이미지 크기 조정**](/resize-image)：/resize-image

[**이미지 압축**](/compress-image)：/compress-image

[**WebP 변환**](/convert-to-webp)：/convert-to-webp`,
  },
  fr: {
    category: 'Conseils',
    title: 'Comment redimensionner des images sans perdre en qualité',
    excerpt: 'Apprenez à redimensionner des images JPG, PNG et WebP pour le web, les réseaux sociaux, l\'e-mail et les documents sans flou ni déformation.',
    readTime: '8 min de lecture',
    metaDescription: 'Apprenez à redimensionner des images JPG, PNG et WebP pour le web, les réseaux sociaux, l\'e-mail et les documents sans flou ni déformation.',
    body: `Les images n'ont pas toujours la bonne taille pour leur usage. Une photo de téléphone peut être trop grande pour un site web, une image produit peut nécessiter une largeur précise, une photo de profil peut devoir être carrée.

Ce guide explique comment redimensionner correctement, éviter le flou et quelles tailles utiliser selon l'usage.

![Comparaison image originale et redimensionnée](/assets/blog/resize-images-comparison.png)

## Que signifie redimensionner une image ?

Redimensionner consiste à modifier la largeur et la hauteur. Exemple : 4000 × 3000 px → 1200 × 900 px. Le contenu visuel reste le même, mais avec moins de pixels et souvent un fichier plus léger.

On peut aussi agrandir, mais l'agrandissement n'ajoute pas de vrais détails. Trop agrandir une petite image provoque flou ou pixellisation.

## Pourquoi redimensionner ?

### Sites web plus rapides

Si l'image s'affiche à 1200 px, un fichier de 5000 px est inutile.

### Meilleurs posts sur les réseaux sociaux

Chaque plateforme a des tailles et ratios recommandés.

### Partage par e-mail facilité

Les grandes images alourdissent les pièces jointes.

### Documents et PDF plus légers

Word, présentations et PDF contiennent souvent des images surdimensionnées.

### Moins d'erreurs d'upload

Respecter les limites de taille et de dimensions.

## Redimensionner vs recadrer

Redimensionner change les dimensions en gardant toute l'image. Recadrer supprime une partie. Utilisez [**Redimensionner**](/resize-image) si le contenu est bon mais la taille non ; [**Recadrer**](/crop-image) pour changer la composition.

## Pixels, pourcentage et ratio d'aspect

Les pixels composent l'image. Le pourcentage réduit proportionnellement (50 % = moitié). Le ratio d'aspect lie largeur et hauteur (1:1, 4:3, 16:9, 9:16, 4:5). Gardez le ratio pour éviter l'étirement.

## Toujours garder le ratio d'aspect si possible

Passer de 4000 × 3000 à 1200 × 1200 sans recadrage déforme l'image. Activez **Conserver le ratio** : largeur 1200 → hauteur 900 automatiquement.

## Meilleures tailles par usage

Bannière web 1600–2400 px, blog 1200 px, produits 1500–2000 px, e-mail 800–1200 px, profil 400×400 ou 800×800, réseaux sociaux 1080×1080, 1080×1350, 1080×1920, 1200×630.

## Redimensionner avant ou après compression ?

En général **redimensionnez d'abord, compressez ensuite**. Compresser une énorme image puis la réduire peut dégrader deux fois.

## Peut-on agrandir sans perdre en qualité ?

Avec des limites. 800 × 600 → 1200 × 900 peut passer ; 800 × 600 → 4000 × 3000 sera flou sans upscaling IA.

## Bonnes pratiques

Partir de l'original, éviter les redimensionnements répétés, garder le ratio, adapter à la taille d'affichage, bon format (JPG photos, PNG transparence, WebP web), prévisualiser avant téléchargement.

## Erreurs courantes

Étirement, réduction excessive, upload d'images énormes, agrandissement excessif de basse résolution, PNG photo trop lourd.

## Redimensionner avec NanoImage

1. Ouvrez [**Redimensionner**](/resize-image)
2. Téléversez l'image
3. Choisissez pixels ou pourcentage
4. Activez le ratio
5. Sélectionnez le format, prévisualisez, téléchargez

## Les images redimensionnées restent-elles privées ?

Traitement local dans le navigateur quand c'est possible.

## Redimensionner + compresser pour le meilleur résultat

4000 px → 1200 px, conversion WebP/JPG, compression à qualité équilibrée.

## En résumé

Choisissez les dimensions nécessaires, gardez le ratio, évitez l'agrandissement excessif, bon format, compressez si besoin.

## Essayer maintenant

[**Redimensionner**](/resize-image)：/resize-image

[**Compresser**](/compress-image)：/compress-image

[**Convertir en WebP**](/convert-to-webp)：/convert-to-webp`,
  },
  es: {
    category: 'Consejos',
    title: 'Cómo redimensionar imágenes sin perder calidad',
    excerpt: 'Aprende a redimensionar imágenes JPG, PNG y WebP para sitios web, redes sociales, correo y documentos sin desenfoque ni distorsión.',
    readTime: '8 min de lectura',
    metaDescription: 'Aprende a redimensionar imágenes JPG, PNG y WebP para sitios web, redes sociales, correo y documentos sin desenfoque ni distorsión.',
    body: `Las imágenes no siempre tienen el tamaño adecuado. Una foto del móvil puede ser demasiado grande para una web, una imagen de producto puede necesitar un ancho específico, una foto de perfil puede requerir formato cuadrado.

Esta guía explica cómo redimensionar correctamente, evitar el desenfoque y qué tamaños usar según el caso.

![Comparación imagen original y redimensionada](/assets/blog/resize-images-comparison.png)

## ¿Qué significa redimensionar una imagen?

Redimensionar es cambiar el ancho y la altura. Ejemplo: 4000 × 3000 px → 1200 × 900 px. El contenido visual se mantiene, pero con menos píxeles y archivo más pequeño.

También se puede agrandar, pero ampliar no añade detalle real. Ampliar demasiado una imagen pequeña causa desenfoque o pixelación.

## ¿Por qué redimensionar?

### Sitios web más rápidos

Si se muestra a 1200 px, un archivo de 5000 px es innecesario.

### Mejores publicaciones en redes sociales

Cada plataforma tiene tamaños y proporciones recomendados.

### Compartir por correo más fácil

Las imágenes grandes encarecen los adjuntos.

### Documentos y PDF más ligeros

Word, presentaciones y PDF suelen incluir imágenes sobredimensionadas.

### Menos errores de subida

Cumplir límites de tamaño y dimensiones.

## Redimensionar vs recortar

Redimensionar cambia dimensiones manteniendo toda la imagen. Recortar elimina parte. Usa [**Redimensionar**](/resize-image) si el contenido es correcto pero el tamaño no; [**Recortar**](/crop-image) para cambiar la composición.

## Píxeles, porcentaje y relación de aspecto

Los píxeles componen la imagen. El porcentaje reduce proporcionalmente (50 % = mitad). La relación de aspecto une ancho y alto (1:1, 4:3, 16:9, 9:16, 4:5). Mantén la proporción para evitar estiramiento.

## Mantener siempre la relación de aspecto

Pasar de 4000 × 3000 a 1200 × 1200 sin recortar deforma la imagen. Activa **Mantener proporción**: ancho 1200 → alto 900 automáticamente.

## Mejores tamaños por uso

Banner web 1600–2400 px, blog 1200 px, productos 1500–2000 px, correo 800–1200 px, perfil 400×400 u 800×800, redes 1080×1080, 1080×1350, 1080×1920, 1200×630.

## ¿Redimensionar antes o después de comprimir?

Normalmente **redimensiona primero, comprime después**. Comprimir una imagen enorme y luego reducirla puede degradar dos veces.

## ¿Se puede ampliar sin perder calidad?

Con límites. 800 × 600 → 1200 × 900 puede funcionar; 800 × 600 → 4000 × 3000 se verá borroso sin upscaling IA.

## Mejores prácticas

Partir del original, evitar redimensionamientos repetidos, mantener proporción, adaptar al tamaño de visualización, formato correcto (JPG fotos, PNG transparencia, WebP web), previsualizar antes de descargar.

## Errores comunes

Estiramiento, reducción excesiva, subir imágenes enormes, ampliar demasiado baja resolución, PNG foto demasiado pesado.

## Redimensionar con NanoImage

1. Abre [**Redimensionar**](/resize-image)
2. Sube la imagen
3. Elige píxeles o porcentaje
4. Activa mantener proporción
5. Selecciona formato, previsualiza, descarga

## ¿Las imágenes redimensionadas son privadas?

Procesamiento local en el navegador cuando es posible.

## Redimensionar + comprimir para el mejor resultado

4000 px → 1200 px, conversión WebP/JPG, compresión con calidad equilibrada.

## Reflexiones finales

Elige las dimensiones necesarias, mantén la proporción, evita ampliar demasiado, formato correcto, comprime si importa el tamaño.

## Pruébalo ahora

[**Redimensionar**](/resize-image)：/resize-image

[**Comprimir**](/compress-image)：/compress-image

[**Convertir a WebP**](/convert-to-webp)：/convert-to-webp`,
  },
  pt: {
    category: 'Dicas',
    title: 'Como redimensionar imagens sem perder qualidade',
    excerpt: 'Aprenda a redimensionar imagens JPG, PNG e WebP para sites, redes sociais, e-mail e documentos sem desfoque ou distorção.',
    readTime: '8 min de leitura',
    metaDescription: 'Aprenda a redimensionar imagens JPG, PNG e WebP para sites, redes sociais, e-mail e documentos sem desfoque ou distorção.',
    body: `As imagens nem sempre têm o tamanho certo para o uso desejado. Uma foto do celular pode ser grande demais para um site, uma imagem de produto pode precisar de largura específica, uma foto de perfil pode precisar ser quadrada.

Este guia explica como redimensionar corretamente, evitar desfoque e quais tamanhos usar por caso.

![Comparação imagem original e redimensionada](/assets/blog/resize-images-comparison.png)

## O que significa redimensionar uma imagem?

Redimensionar é alterar largura e altura. Exemplo: 4000 × 3000 px → 1200 × 900 px. O conteúdo visual permanece, mas com menos pixels e arquivo menor.

Também é possível ampliar, mas ampliar não adiciona detalhe real. Ampliar demais uma imagem pequena causa desfoque ou pixelização.

## Por que redimensionar?

### Sites mais rápidos

Se exibe a 1200 px, um arquivo de 5000 px é desnecessário.

### Melhores posts em redes sociais

Cada plataforma tem tamanhos e proporções recomendados.

### Compartilhamento por e-mail mais fácil

Imagens grandes pesam nos anexos.

### Documentos e PDF mais leves

Word, apresentações e PDF costumam ter imagens grandes demais.

### Menos erros de upload

Atender limites de tamanho e dimensões.

## Redimensionar vs recortar

Redimensionar muda dimensões mantendo a imagem inteira. Recortar remove parte. Use [**Redimensionar**](/resize-image) se o conteúdo está certo mas o tamanho não; [**Recortar**](/crop-image) para mudar a composição.

## Pixels, porcentagem e proporção

Pixels compõem a imagem. Porcentagem reduz proporcionalmente (50 % = metade). Proporção liga largura e altura (1:1, 4:3, 16:9, 9:16, 4:5). Mantenha a proporção para evitar esticamento.

## Sempre manter a proporção quando possível

De 4000 × 3000 para 1200 × 1200 sem recortar deforma a imagem. Ative **Manter proporção**: largura 1200 → altura 900 automaticamente.

## Melhores tamanhos por uso

Banner web 1600–2400 px, blog 1200 px, produtos 1500–2000 px, e-mail 800–1200 px, perfil 400×400 ou 800×800, redes 1080×1080, 1080×1350, 1080×1920, 1200×630.

## Redimensionar antes ou depois de comprimir?

Normalmente **redimensione primeiro, comprima depois**. Comprimir imagem enorme e depois reduzir pode degradar duas vezes.

## Dá para ampliar sem perder qualidade?

Com limites. 800 × 600 → 1200 × 900 pode funcionar; 800 × 600 → 4000 × 3000 ficará borrado sem upscaling IA.

## Melhores práticas

Partir do original, evitar redimensionamentos repetidos, manter proporção, adaptar ao tamanho de exibição, formato certo (JPG fotos, PNG transparência, WebP web), visualizar antes de baixar.

## Erros comuns

Esticamento, redução excessiva, enviar imagens enormes, ampliar demais baixa resolução, PNG foto muito pesado.

## Redimensionar com NanoImage

1. Abra [**Redimensionar**](/resize-image)
2. Envie a imagem
3. Escolha pixels ou porcentagem
4. Ative manter proporção
5. Selecione formato, visualize, baixe

## As imagens redimensionadas são privadas?

Processamento local no navegador quando possível.

## Redimensionar + comprimir para o melhor resultado

4000 px → 1200 px, conversão WebP/JPG, compressão com qualidade equilibrada.

## Considerações finais

Escolha as dimensões necessárias, mantenha a proporção, evite ampliar demais, formato certo, comprima se o tamanho importar.

## Experimente agora

[**Redimensionar**](/resize-image)：/resize-image

[**Comprimir**](/compress-image)：/compress-image

[**Converter para WebP**](/convert-to-webp)：/convert-to-webp`,
  },
  ru: {
    category: 'Советы',
    title: 'Как изменить размер изображений без потери качества',
    excerpt: 'Узнайте, как изменять размер JPG, PNG и WebP для сайтов, соцсетей, почты и документов без размытия и искажений.',
    readTime: '8 мин чтения',
    metaDescription: 'Узнайте, как изменять размер JPG, PNG и WebP для сайтов, соцсетей, почты и документов без размытия и искажений.',
    body: `Размер изображения не всегда подходит для задачи. Фото с телефона может быть слишком большим для сайта, товарное фото — требовать определённой ширины, аватар — быть квадратным.

В этом руководстве — как правильно изменять размер, избегать размытия и какие размеры выбирать.

![Сравнение оригинала и изменённого размера](/assets/blog/resize-images-comparison.png)

## Что значит изменить размер изображения?

Изменение размера — это смена ширины и высоты. Пример: 4000 × 3000 px → 1200 × 900 px. Содержание то же, но пикселей меньше и файл обычно легче.

Можно и увеличить, но увеличение не добавляет реальных деталей. Слишком сильное увеличение маленького изображения даёт размытие или пикселизацию.

## Зачем изменять размер?

### Быстрее загружается сайт

Если показывается 1200 px, файл 5000 px обычно не нужен.

### Лучше посты в соцсетях

У каждой платформы свои рекомендуемые размеры и пропорции.

### Проще делиться по почте

Большие изображения утяжеляют вложения.

### Легче документы и PDF

Word, презентации и PDF часто содержат слишком крупные картинки.

### Меньше ошибок загрузки

Соблюдение лимитов размера и габаритов.

## Изменение размера vs обрезка

Изменение размера меняет габариты, сохраняя всё изображение. Обрезка убирает часть. Используйте [**Изменить размер**](/resize-image), если содержание верное, а размер нет; [**Обрезать**](/crop-image) — для смены композиции.

## Пиксели, проценты и соотношение сторон

Пиксели составляют изображение. Проценты уменьшают пропорционально (50 % = половина). Соотношение сторон связывает ширину и высоту (1:1, 4:3, 16:9, 9:16, 4:5). Сохраняйте пропорции, чтобы избежать растягивания.

## По возможности сохраняйте пропорции

4000 × 3000 → 1200 × 1200 без обрезки искажает картинку. Включите **Сохранять пропорции**: ширина 1200 → высота 900 автоматически.

## Лучшие размеры по сценариям

Баннер 1600–2400 px, блог 1200 px, товары 1500–2000 px, почта 800–1200 px, профиль 400×400 или 800×800, соцсети 1080×1080, 1080×1350, 1080×1920, 1200×630.

## Сначала изменить размер или сжать?

Обычно **сначала размер, потом сжатие**. Сжать огромное изображение и потом уменьшить — двойная потеря качества.

## Можно ли увеличить без потери качества?

С ограничениями. 800 × 600 → 1200 × 900 может сойти; 800 × 600 → 4000 × 3000 будет размытым без ИИ-апскейла.

## Лучшие практики

Работать с оригиналом, не менять размер многократно, сохранять пропорции, подгонять под размер отображения, правильный формат (JPG фото, PNG прозрачность, WebP веб), просмотр перед скачиванием.

## Типичные ошибки

Растягивание, чрезмерное уменьшение, загрузка огромных файлов, слишком сильное увеличение низкого разрешения, тяжёлый PNG-фото.

## Изменить размер в NanoImage

1. Откройте [**Изменить размер**](/resize-image)
2. Загрузите изображение
3. Укажите пиксели или проценты
4. Включите сохранение пропорций
5. Выберите формат, просмотрите, скачайте

## Остаются ли изображения приватными?

Локальная обработка в браузере, когда это возможно.

## Изменение размера + сжатие — лучший результат

4000 px → 1200 px, конвертация WebP/JPG, сжатие со сбалансированным качеством.

## Итог

Выберите нужные габариты, сохраните пропорции, не увеличивайте слишком сильно, выберите формат, сожмите при необходимости.

## Попробуйте сейчас

[**Изменить размер**](/resize-image)：/resize-image

[**Сжать**](/compress-image)：/compress-image

[**Конвертировать в WebP**](/convert-to-webp)：/convert-to-webp`,
  },
}
