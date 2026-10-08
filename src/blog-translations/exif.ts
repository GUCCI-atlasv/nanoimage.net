import type { BlogPost } from '../data'

export type BlogLoc = Partial<Omit<BlogPost, 'slug' | 'date' | 'coverImage' | 'localizations'>>
export type BlogLocMap = Record<string, BlogLoc>

export const exifEnglishPatch: BlogLoc = {
  body: `# What is EXIF data and why remove it?

Every time you take a photo with a smartphone or digital camera, the image file often carries hidden information along with the pixels you see. That hidden layer is called **EXIF** — short for *Exchangeable Image File Format*. It is metadata embedded inside JPG, HEIC, TIFF, and some other image formats.

Most people never see EXIF data when they view a photo in a gallery app. But the information is still there, and anyone with the right tool can read it — sometimes including details you did not intend to share.

## What EXIF data contains

EXIF is not one single field. It is a bundle of tags that describe how and where a photo was captured. Common entries include:

- **Camera and lens**: make, model, lens type, focal length
- **Capture settings**: shutter speed, aperture (f-stop), ISO, flash on/off, white balance
- **Date and time**: when the photo was taken (often in local time)
- **Orientation**: how the camera was held (portrait vs. landscape)
- **GPS location**: latitude and longitude, if location services were enabled
- **Software**: which app or editor last touched the file

On a sunny afternoon walk, that metadata might seem harmless. On a photo posted to social media, a GPS tag can reveal your home address, your child's school, or a private vacation spot.

## Why remove EXIF before sharing online

You do not need to strip metadata from every image you keep on your phone. But before you upload a photo publicly — to Instagram, a forum, a dating app, or a client deliverable — consider what EXIF reveals.

### Privacy and stalking risk

GPS coordinates embedded in EXIF have been used in real-world harassment cases. A photo of your living room, your car in the driveway, or your kid at the park can pin a location within a few meters if geotagging was on.

Even without GPS, the combination of timestamp + camera model + recurring backgrounds can help someone piece together your routine.

### Doxxing and identity exposure

EXIF can include serial numbers, unique device identifiers, and software trails. Journalists, activists, and whistleblowers have accidentally exposed sources because metadata in a shared screenshot or photo was overlooked.

### GDPR and regulated data

Under GDPR, precise location data tied to an identifiable person can qualify as personal data. Organizations publishing user-submitted photos may need to strip EXIF as part of a privacy-by-design workflow — especially for EU-facing sites.

### Smaller files (a bonus)

EXIF blocks add kilobytes, sometimes more. Removing them will not shrink a photo as much as [proper compression](/blog/how-to-compress-images-without-losing-quality), but it is a free, instant size reduction with zero visual change.

## When you might want to keep EXIF

Not every workflow benefits from a metadata wipe.

- **Photography portfolios**: clients and editors often expect intact EXIF to verify settings and authenticity.
- **Archival and forensics**: museums, newsrooms, and investigators rely on original metadata chains.
- **Personal organization**: date and camera tags help sort large personal libraries.

The rule of thumb: **keep EXIF in your archive; remove it in your public copy.**

## How to remove EXIF with NanoImage

NanoImage's [**Remove EXIF**](/remove-exif) tool strips common metadata in your browser. Your file is processed locally — nothing is uploaded to a server. You can verify this yourself: open DevTools → Network while processing, and you will see no outbound image requests.

Steps:

1. Open [**Remove EXIF**](/remove-exif).
2. Drag and drop your JPG or HEIC file (or click to browse).
3. Preview the cleaned image.
4. Download the result.

The visual pixels stay the same; only the hidden metadata layer is removed.

### Batch removal

Need to clean a folder of photos before a blog post or product launch? Use [**Batch Compress**](/batch-compress-image) or process files one by one in the Remove EXIF tool — each file stays on your device, and you can download them individually or in sequence without creating an account.

For command-line workflows, NanoImage CLI also supports \`nanoimage remove-exif ./photos --output ./clean\`.

## Quick checklist before you post

- [ ] Turn off geotagging in your camera app if you do not need it
- [ ] Remove EXIF from any photo that shows your home, workplace, or children
- [ ] Compress separately if file size matters — see our guide on [how to compress images without losing quality](/blog/how-to-compress-images-without-losing-quality)
- [ ] Keep an original copy with EXIF intact if you might need it later

EXIF data is invisible until it is not. A thirty-second cleanup before sharing is one of the simplest privacy wins you can make with your photos.`,
}

export const exifLocalizations: BlogLocMap = {
  'zh-CN': {
    category: '隐私',
    title: '什么是 EXIF 数据？为什么要移除？',
    excerpt: '照片里可能藏着相机型号、拍摄时间和 GPS 位置。分享前你需要了解这些隐藏信息。',
    readTime: '4 分钟阅读',
    metaDescription: '了解 EXIF 元数据是什么、常见字段有哪些，以及为什么在分享照片前应移除 GPS 和隐私信息。浏览器本地免费移除 EXIF。',
    body: `# 什么是 EXIF 数据？为什么要移除？

用手机或数码相机拍下的每一张照片，除了你看到的像素，文件里往往还藏着一层**元数据**，叫做 **EXIF**（Exchangeable Image File Format，可交换图像文件格式）。它嵌入在 JPG、HEIC、TIFF 等格式中，相册应用通常不会显示，但用正确工具就能读取——有时包括你并不想公开的信息。

## EXIF 里有什么

EXIF 不是单一字段，而是一组描述「如何、何时、何地」拍摄的标签：

- **相机与镜头**：品牌、型号、焦距
- **拍摄参数**：快门、光圈、ISO、闪光灯、白平衡
- **日期与时间**：拍摄时刻（多为本地时间）
- **方向**：横拍或竖拍
- **GPS 坐标**：若开启了定位服务
- **软件信息**：最后编辑该文件的应用

散步时拍的照片，元数据看似无害；发到社交媒体后，GPS 可能暴露家庭住址、孩子学校或私人度假地点。

## 为什么分享前要移除 EXIF

不必删掉手机里所有照片的元数据，但在**公开上传**前——朋友圈、论坛、交友软件、客户交付物——请想想 EXIF 会泄露什么。

### 隐私与跟踪风险

EXIF 中的 GPS 曾在现实施骚扰案例中被利用。客厅、 driveway 里的车、公园里的孩子，若开启了地理标记，位置可精确到数米。

即使没有 GPS，时间戳 + 相机型号 + 重复背景也能让人推断你的日常规律。

### 人肉与身份暴露

EXIF 可能含序列号、设备标识和软件痕迹。记者、活动人士曾因在截图或照片中遗漏元数据而意外暴露信息源。

### GDPR 与合规

在 GDPR 下，与可识别个人绑定的精确位置可构成个人数据。面向欧盟用户发布用户上传图片时，按隐私设计原则移除 EXIF 往往是必要步骤。

### 顺带减小体积

EXIF 块会占几 KB 甚至更多。移除它不会像[正确压缩](/blog/how-to-compress-images-without-losing-quality)那样大幅瘦身，但零画质损失、即时完成。

## 什么时候可以保留 EXIF

- **摄影作品集**：客户与编辑常需完整 EXIF 验证参数与真实性
- **档案与取证**：博物馆、新闻机构、调查人员依赖原始元数据链
- **个人整理**：日期与相机标签便于管理大量照片

经验法则：**归档保留 EXIF，对外发布用无 EXIF 副本。**

## 用 NanoImage 移除 EXIF

[**移除 EXIF**](/remove-exif) 工具在浏览器本地处理，**不上传服务器**。打开 DevTools → Network，处理过程中不会有图片外发请求。

步骤：

1. 打开 [**移除 EXIF**](/remove-exif)
2. 拖入 JPG 或 HEIC（或点击选择）
3. 预览清理后的图片
4. 下载结果

像素不变，只去掉隐藏元数据层。

### 批量处理

博客或产品图要整批清理？可在 [**批量压缩**](/batch-compress-image) 流程中配合使用，或在移除 EXIF 工具中逐张处理——文件始终留在本机，无需注册。命令行可用 \`nanoimage remove-exif ./photos --output ./clean\`。

## 发布前 checklist

- [ ] 不需要定位时在相机应用里关闭地理标记
- [ ] 含家庭、工作场所或儿童的照片务必去 EXIF
- [ ] 若关心体积，另做压缩——参见[如何压缩图片且不损画质](/blog/how-to-compress-images-without-losing-quality)
- [ ] 若日后可能需要，另存带 EXIF 的原图

EXIF 平时看不见，一旦被读取后果可能很严重。分享前花半分钟清理，是性价比最高的照片隐私习惯之一。`,
  },
  'zh-TW': {
    category: '隱私',
    title: '什麼是 EXIF 資料？為什麼要移除？',
    excerpt: '照片裡可能藏著相機型號、拍攝時間與 GPS 位置。分享前你需要了解這些隱藏資訊。',
    readTime: '4 分鐘閱讀',
    metaDescription: '了解 EXIF 中繼資料是什麼、常見欄位有哪些，以及為什麼在分享照片前應移除 GPS 與隱私資訊。瀏覽器本地免費移除 EXIF。',
    body: `# 什麼是 EXIF 資料？為什麼要移除？

用智慧型手機或數位相機拍下的每一張照片，除了可見的像素，檔案裡往往還藏著一層**中繼資料**，稱為 **EXIF**（Exchangeable Image File Format，可交換影像檔案格式）。它嵌入在 JPG、HEIC、TIFF 等格式中；相簿 App 通常不會顯示，但用適當工具就能讀取——有時包含你並不想公開的細節。

## EXIF 裡有什麼

EXIF 不是單一欄位，而是一組描述拍攝方式與地點的標籤：

- **相機與鏡頭**：品牌、型號、焦距
- **拍攝參數**：快門、光圈、ISO、閃光燈、白平衡
- **日期與時間**：拍攝時刻
- **方向**：橫拍或直拍
- **GPS 座標**：若已開啟定位
- **軟體資訊**：最後編輯該檔案的 App

看似無害的散步快照，上傳到社群後，GPS 可能暴露住家、孩子學校或私人度假地點。

## 為什麼分享前要移除 EXIF

不必刪掉手機裡所有照片的中繼資料，但在**公開上傳**前——Instagram、論壇、交友 App、客戶交付——請思考 EXIF 會透露什麼。

### 隱私與跟蹤風險

EXIF 中的 GPS 曾在真實騷擾案例中被利用。若開啟地理標記，客廳、車道或公園照片的位置可精確到數公尺。

即使沒有 GPS，時間戳 + 相機型號 + 重複背景也能推斷日常作息。

### 人肉搜索與身份暴露

EXIF 可能含序號與軟體痕跡。記者與吹哨者曾因分享檔案時忽略元資料而意外暴露來源。

### GDPR 與法規

在 GDPR 下，與可識別個人綁定的精確位置屬個人資料。面向歐盟使用者發布用戶上傳圖片時，依隱私設計移除 EXIF 常是必要步驟。

### 順帶縮小檔案

EXIF 會占數 KB。移除它不會像[正確壓縮](/blog/how-to-compress-images-without-losing-quality)那樣大幅減肥，但零畫質損失。

## 什麼時候可以保留 EXIF

- **攝影作品集**：客戶常需完整 EXIF
- **檔案與鑑識**：機構依賴原始元資料鏈
- **個人整理**：日期標籤便於分類

原則：**封存保留 EXIF，對外發布用乾淨副本。**

## 用 NanoImage 移除 EXIF

[**移除 EXIF**](/remove-exif) 在本機瀏覽器處理，**不上傳**。DevTools → Network 可驗證無外送請求。

1. 開啟 [**移除 EXIF**](/remove-exif)
2. 拖入 JPG 或 HEIC
3. 預覽
4. 下載

像素不變，只移除隱藏中繼資料。

### 批次處理

整批清理可用 [**批次壓縮**](/batch-compress-image) 搭配，或逐張在工具中處理。CLI：\`nanoimage remove-exif ./photos --output ./clean\`。

## 發布前 checklist

- [ ] 不需要時關閉地理標記
- [ ] 含住家或兒童的照片務必清理
- [ ] 需要更小檔案請參考[壓縮指南](/blog/how-to-compress-images-without-losing-quality)
- [ ] 保留含 EXIF 的原圖備份

EXIF 平常看不見，一旦被讀取後果可能嚴重。分享前花半分鐘清理，是最簡單的隱私投資之一。`,
  },
  ja: {
    category: 'プライバシー',
    title: 'EXIF とは？削除すべき理由',
    excerpt: '写真にはカメラ情報・撮影日時・GPS 位置などのメタデータが含まれることがあります。共有前に知っておきたいこと。',
    readTime: '4分で読めます',
    metaDescription: 'EXIF メタデータの意味、主要フィールド、オンライン共有前に GPS などを削除すべき理由。ブラウザ内で無料削除。',
    body: `# EXIF とは？削除すべき理由

スマートフォンやデジカメで撮った写真には、見える画素のほかに **EXIF**（Exchangeable Image File Format）という**メタデータ**が JPG・HEIC・TIFF などに埋め込まれていることがよくあります。ギャラリーアプリでは表示されませんが、適切なツールなら誰でも読み取れます——意図せず公開してしまう情報も含まれます。

## EXIF に含まれる主な項目

- **カメラ・レンズ**：メーカー、モデル、焦点距離
- **撮影設定**：シャッター速度、絞り、ISO、フラッシュ、ホワイトバランス
- **日時**：撮影した日時
- **向き**：縦・横
- **GPS**：位置情報サービスがオンだった場合
- **ソフトウェア**：最後に編集したアプリ

散歩中の一枚でも、SNS に投稿すれば GPS から自宅や学校、旅行先が特定される可能性があります。

## 共有前に EXIF を削除する理由

### プライバシーとストーカー行為のリスク

EXIF の GPS は実際の嫌がらせ事例で悪用されたことがあります。リビング、駐車場、公園——位置情報がオンなら数メートル単位で特定可能です。

GPS がなくても、タイムスタンプと機種、背景の組み合わせで生活パターンを推測されることもあります。

### ドキシングと身元暴露

シリアル番号やソフトウェアの痕跡が残ることも。記者や内部告発者が、メタデータの見落としで情報源を晒した例もあります。

### GDPR と規制

GDPR では、個人を特定できる正確な位置情報は個人データに該当し得ます。EU 向けサイトでは、ユーザー投稿画像から EXIF を除去するのが privacy by design の一環です。

### ファイルサイズの副次効果

EXIF ブロックは数 KB 以上。 [適切な圧縮](/blog/how-to-compress-images-without-losing-quality)ほどではありませんが、画質を変えずに少し軽くなります。

## EXIF を残した方がよい場合

- **写真ポートフォリオ**：設定の証明として EXIF が期待される
- **アーカイブ・フォレンジック**：原本のメタデータチェーンが重要
- **個人整理**：日付・機種タグで大量写真を整理

目安：**アーカイブは EXIF 付き、公開用はクリーンコピー。**

## NanoImage で EXIF を削除

[**EXIF 削除**](/remove-exif) はブラウザ内でローカル処理。**アップロード不要**です。DevTools → Network で通信が発生しないことを確認できます。

1. [**EXIF 削除**](/remove-exif) を開く
2. JPG または HEIC をドロップ
3. プレビュー
4. ダウンロード

画素はそのまま、隠れたメタデータだけ除去します。

### 一括処理

ブログや商品画像をまとめて処理する場合は [**一括圧縮**](/batch-compress-image) と併用するか、ツールで 1 枚ずつ処理。CLI では \`nanoimage remove-exif ./photos --output ./clean\`。

## 投稿前チェックリスト

- [ ] 不要ならカメラアプリの位置情報をオフ
- [ ] 自宅・職場・子どもが写る写真は EXIF 削除
- [ ] サイズ重視なら[画質を保った圧縮](/blog/how-to-compress-images-without-losing-quality)も
- [ ] 必要なら EXIF 付き原本を別途保存

EXIF は見えないうちは問題になりません。共有前の 30 秒の手間が、最も手軽なプライバシー対策のひとつです。`,
  },
  ko: {
    category: '개인정보',
    title: 'EXIF 데이터란? 왜 제거해야 할까?',
    excerpt: '사진에는 카메라 정보, 촬영 시간, GPS 위치 등 숨겨진 메타데이터가 포함될 수 있습니다. 공유 전에 알아두세요.',
    readTime: '4분 읽기',
    metaDescription: 'EXIF 메타데이터의 의미, 주요 필드, 온라인 공유 전 GPS 등을 제거해야 하는 이유. 브라우저에서 무료로 EXIF 제거.',
    body: `# EXIF 데이터란? 왜 제거해야 할까?

스마트폰이나 디지털 카메라로 찍은 사진 파일에는 보이는 픽셀 외에 **EXIF**(Exchangeable Image File Format)라는 **메타데이터**가 JPG, HEIC, TIFF 등에 자주 포함됩니다. 갤러리 앱에서는 보이지 않지만, 적절한 도구로 누구나 읽을 수 있습니다——의도치 않게 공개될 수 있는 정보도요.

## EXIF에 담기는 정보

- **카메라·렌즈**: 제조사, 모델, 초점 거리
- **촬영 설정**: 셔터, 조리개, ISO, 플래시, 화이트 밸런스
- **날짜·시간**: 촬영 시각
- **방향**: 가로·세로
- **GPS**: 위치 서비스가 켜져 있었다면
- **소프트웨어**: 마지막으로 편집한 앱

SNS에 올리면 GPS로 집, 학교, 여행지가 드러날 수 있습니다.

## 공유 전 EXIF를 제거하는 이유

### 프라이버시·스토킹 위험

EXIF GPS는 실제 괴롭힘 사례에 악용된 적이 있습니다. 위치 정보가 켜져 있으면 수 미터 단위로 특정 가능합니다.

GPS가 없어도 타임스탬프·기종·반복 배경으로 일상을 추론할 수 있습니다.

### 신상 털기·신원 노출

시리얼 번호·소프트웨어 흔적이 남을 수 있습니다. 기자·내부 고발자가 메타데이터 누락으로 정보원을 노출한 사례도 있습니다.

### GDPR·규제

GDPR에서 개인을 식별 가능한 정확한 위치는 개인정보에 해당할 수 있습니다. EU 대상 사이트는 privacy by design으로 EXIF 제거가 필요할 수 있습니다.

### 파일 크기 보너스

EXIF 블록은 수 KB 이상. [올바른 압축](/blog/how-to-compress-images-without-losing-quality)만큼은 아니지만 화질 변화 없이 약간 줄어듭니다.

## EXIF를 유지해도 되는 경우

- **사진 포트폴리오**: EXIF로 설정·진위 확인
- **아카이브·포렌식**: 원본 메타데이터 체인 중요
- **개인 정리**: 날짜·기종 태그로 대량 사진 관리

원칙: **보관은 EXIF 유지, 공개용은 깨끗한 복사본.**

## NanoImage로 EXIF 제거

[**EXIF 제거**](/remove-exif)는 브라우저에서 로컬 처리, **업로드 없음**. DevTools → Network로 확인 가능.

1. [**EXIF 제거**](/remove-exif) 열기
2. JPG 또는 HEIC 드롭
3. 미리보기
4. 다운로드

픽셀은 그대로, 숨은 메타데이터만 제거.

### 일괄 처리

[**일괄 압축**](/batch-compress-image)과 함께 쓰거나 한 장씩 처리. CLI: \`nanoimage remove-exif ./photos --output ./clean\`.

## 게시 전 체크리스트

- [ ] 필요 없으면 위치 정보 끄기
- [ ] 집·직장·아이 사진은 EXIF 제거
- [ ] 용량이 중요하면 [압축 가이드](/blog/how-to-compress-images-without-losing-quality) 참고
- [ ] EXIF 포함 원본 별도 보관

EXIF는 보이지 않을 뿐, 읽히면 문제가 됩니다. 공유 전 30초 정리가 가장 쉬운 프라이버시 습관입니다.`,
  },
  fr: {
    category: 'Confidentialité',
    title: "Qu'est-ce que les données EXIF et pourquoi les supprimer ?",
    excerpt: 'Vos photos peuvent contenir le modèle d’appareil, la date et la position GPS. Ce qu’il faut savoir avant de partager.',
    readTime: '4 min de lecture',
    metaDescription: 'Comprendre les métadonnées EXIF, les champs courants et pourquoi supprimer le GPS avant de publier. Suppression EXIF gratuite dans le navigateur.',
    body: `# Qu'est-ce que les données EXIF et pourquoi les supprimer ?

Chaque photo prise avec un smartphone ou un appareil photo numérique embarque souvent, outre les pixels visibles, une couche de **métadonnées** appelée **EXIF** (*Exchangeable Image File Format*). Elle est intégrée aux JPG, HEIC, TIFF, etc. Les galeries ne l’affichent pas, mais n’importe qui avec le bon outil peut la lire — parfois des détails que vous n’aviez pas l’intention de partager.

## Ce que contient l’EXIF

- **Appareil et objectif** : marque, modèle, focale
- **Réglages** : vitesse, ouverture, ISO, flash, balance des blancs
- **Date et heure** de prise de vue
- **Orientation** : portrait ou paysage
- **GPS** : si la géolocalisation était activée
- **Logiciel** : dernière application ayant modifié le fichier

Une balade ensoleillée peut sembler anodine ; sur les réseaux sociaux, le GPS peut révéler votre domicile, l’école de vos enfants ou un lieu de vacances privé.

## Pourquoi supprimer l’EXIF avant de partager

### Risque de vie privée et de harcèlement

Les coordonnées GPS de l’EXIF ont servi dans de vrais cas de harcèlement. Salon, voiture, parc — avec géotag, la position peut être précise à quelques mètres.

Sans GPS, horodatage + modèle + arrière-plans récurrents suffisent parfois à reconstituer une routine.

### Doxxing et exposition d’identité

Numéros de série, traces logicielles… Des journalistes et lanceurs d’alerte ont exposé des sources en oubliant les métadonnées d’une capture.

### RGPD et données réglementées

Sous le RGPD, une localisation précise liée à une personne identifiable peut être une donnée personnelle. Les sites recevant des photos d’utilisateurs doivent souvent retirer l’EXIF par conception (*privacy by design*).

### Fichiers plus légers (bonus)

Les blocs EXIF ajoutent des kilo-octets. La [compression adaptée](/blog/how-to-compress-images-without-losing-quality) réduit davantage, mais supprimer l’EXIF est instantané et sans perte visuelle.

## Quand garder l’EXIF

- **Portfolio photo** : les clients attendent parfois l’EXIF intact
- **Archives et forensique** : chaîne de métadonnées originale
- **Organisation personnelle** : tri par date et appareil

Règle : **archivez avec EXIF, publiez une copie nettoyée.**

## Supprimer l’EXIF avec NanoImage

L’outil [**Supprimer EXIF**](/remove-exif) traite vos fichiers **dans le navigateur**, sans envoi serveur. Vérifiez via DevTools → Network : aucune requête image sortante.

1. Ouvrir [**Supprimer EXIF**](/remove-exif)
2. Glisser-déposer un JPG ou HEIC
3. Prévisualiser
4. Télécharger

Les pixels restent identiques ; seule la couche cachée disparaît.

### Traitement par lot

Pour un dossier entier, utilisez [**Compression par lot**](/batch-compress-image) ou traitez fichier par fichier. En CLI : \`nanoimage remove-exif ./photos --output ./clean\`.

## Checklist avant publication

- [ ] Désactiver la géolocalisation si inutile
- [ ] Nettoyer les photos montrant domicile, travail ou enfants
- [ ] Compresser séparément si la taille compte — voir [compresser sans perdre en qualité](/blog/how-to-compress-images-without-losing-quality)
- [ ] Conserver une copie originale avec EXIF si besoin

L’EXIF est invisible jusqu’à ce qu’il ne le soit plus. Une minute de nettoyage avant partage est l’un des gestes de confidentialité les plus simples pour vos photos.`,
  },
  es: {
    category: 'Privacidad',
    title: '¿Qué son los datos EXIF y por qué eliminarlos?',
    excerpt: 'Las fotos pueden incluir modelo de cámara, fecha y ubicación GPS. Lo que debes saber antes de compartir.',
    readTime: '4 min de lectura',
    metaDescription: 'Qué es la metadata EXIF, campos comunes y por qué quitar GPS antes de publicar. Elimina EXIF gratis en el navegador.',
    body: `# ¿Qué son los datos EXIF y por qué eliminarlos?

Cada foto hecha con móvil o cámara digital suele llevar, además de los píxeles visibles, una capa de **metadatos** llamada **EXIF** (*Exchangeable Image File Format*). Se incrusta en JPG, HEIC, TIFF, etc. La galería no la muestra, pero cualquiera con la herramienta adecuada puede leerla — a veces datos que no querías publicar.

## Qué contiene el EXIF

- **Cámara y objetivo**: marca, modelo, focal
- **Ajustes**: obturador, apertura, ISO, flash, balance de blancos
- **Fecha y hora** de captura
- **Orientación**: vertical u horizontal
- **GPS**: si la geolocalización estaba activa
- **Software**: última app que editó el archivo

Un paseo inocente puede convertirse, al subirla a redes, en una pista de tu casa, la escuela de tus hijos o un sitio de vacaciones privado.

## Por qué quitar EXIF antes de compartir

### Privacidad y acoso

Las coordenadas GPS del EXIF se han usado en casos reales de acoso. Salón, coche, parque — con geotag, la ubicación puede ser de pocos metros.

Sin GPS, marca temporal + modelo + fondos repetidos pueden delatar rutinas.

### Doxxing y exposición de identidad

Números de serie, rastros de software… Periodistas y denunciantes han filtrado fuentes por olvidar metadatos en capturas.

### RGPD y datos regulados

Bajo el RGPD, la ubicación precisa vinculada a una persona puede ser dato personal. Los sitios con fotos de usuarios suelen deben quitar EXIF por diseño.

### Archivos más pequeños (extra)

Los bloques EXIF suman kilobytes. La [compresión adecuada](/blog/how-to-compress-images-without-losing-quality) reduce más, pero quitar EXIF es instantáneo y sin cambio visual.

## Cuándo conviene conservar EXIF

- **Portfolio fotográfico**: clientes esperan EXIF intacto
- **Archivo y forense**: cadena de metadatos original
- **Organización personal**: orden por fecha y cámara

Regla: **archiva con EXIF, publica una copia limpia.**

## Cómo quitar EXIF con NanoImage

[**Eliminar EXIF**](/remove-exif) procesa en el **navegador**, sin subir archivos. Compruébalo en DevTools → Network.

1. Abre [**Eliminar EXIF**](/remove-exif)
2. Arrastra JPG o HEIC
3. Previsualiza
4. Descarga

Los píxeles no cambian; solo desaparece la capa oculta.

### Eliminación por lotes

Para carpetas enteras, usa [**Compresión por lotes**](/batch-compress-image) o procesa uno a uno. CLI: \`nanoimage remove-exif ./photos --output ./clean\`.

## Checklist antes de publicar

- [ ] Desactiva geolocalización si no la necesitas
- [ ] Limpia fotos con casa, trabajo o niños
- [ ] Comprime aparte si importa el tamaño — [comprimir sin perder calidad](/blog/how-to-compress-images-without-losing-quality)
- [ ] Guarda original con EXIF si lo necesitarás

El EXIF es invisible hasta que deja de serlo. Medio minuto antes de compartir es una de las victorias de privacidad más fáciles con tus fotos.`,
  },
  pt: {
    category: 'Privacidade',
    title: 'O que são dados EXIF e por que removê-los?',
    excerpt: 'Fotos podem incluir modelo da câmera, data e localização GPS. Saiba o que verificar antes de compartilhar.',
    readTime: '4 min de leitura',
    metaDescription: 'Entenda metadados EXIF, campos comuns e por que remover GPS antes de publicar. Remova EXIF grátis no navegador.',
    body: `# O que são dados EXIF e por que removê-los?

Cada foto tirada com celular ou câmera digital costuma trazer, além dos pixels visíveis, uma camada de **metadados** chamada **EXIF** (*Exchangeable Image File Format*). Ela fica embutida em JPG, HEIC, TIFF etc. O app de galeria não mostra, mas quem tiver a ferramenta certa pode ler — inclusive detalhes que você não queria expor.

## O que o EXIF contém

- **Câmera e lente**: marca, modelo, distância focal
- **Configurações**: obturador, abertura, ISO, flash, balanço de branco
- **Data e hora** da captura
- **Orientação**: retrato ou paisagem
- **GPS**: se a geolocalização estava ativa
- **Software**: último app que editou o arquivo

Um passeio inocente pode, nas redes, revelar sua casa, a escola dos filhos ou um destino de férias privado.

## Por que remover EXIF antes de compartilhar

### Privacidade e risco de perseguição

Coordenadas GPS no EXIF já foram usadas em casos reais de assédio. Sala, carro na garagem, parque — com geotag, a posição pode ser de poucos metros.

Sem GPS, carimbo de data + modelo + fundos repetidos podem traçar rotinas.

### Doxxing e exposição de identidade

Números de série, trilhas de software… Jornalistas e denunciantes já expuseram fontes por esquecer metadados em capturas.

### LGPD/GDPR e dados regulados

Localização precisa ligada a pessoa identificável pode ser dado pessoal. Sites que publicam fotos de usuários muitas vezes precisam remover EXIF por design.

### Arquivos menores (bônus)

Blocos EXIF somam kilobytes. A [compressão adequada](/blog/how-to-compress-images-without-losing-quality) reduz mais, mas remover EXIF é instantâneo e sem perda visual.

## Quando manter EXIF

- **Portfólio fotográfico**: clientes esperam EXIF intacto
- **Arquivo e forense**: cadeia de metadados original
- **Organização pessoal**: ordenar por data e câmera

Regra: **arquive com EXIF, publique cópia limpa.**

## Como remover EXIF com NanoImage

[**Remover EXIF**](/remove-exif) processa no **navegador**, sem upload. Verifique em DevTools → Network.

1. Abra [**Remover EXIF**](/remove-exif)
2. Arraste JPG ou HEIC
3. Pré-visualize
4. Baixe

Os pixels permanecem; só a camada oculta some.

### Remoção em lote

Para pastas inteiras, use [**Compressão em lote**](/batch-compress-image) ou processe um a um. CLI: \`nanoimage remove-exif ./photos --output ./clean\`.

## Checklist antes de publicar

- [ ] Desative geolocalização se não precisar
- [ ] Limpe fotos com casa, trabalho ou crianças
- [ ] Comprima separadamente se o tamanho importar — [comprimir sem perder qualidade](/blog/how-to-compress-images-without-losing-quality)
- [ ] Guarde original com EXIF se precisar depois

EXIF é invisível até deixar de ser. Meio minuto antes de compartilhar é um dos ganhos de privacidade mais simples com suas fotos.`,
  },
  ru: {
    category: 'Конфиденциальность',
    title: 'Что такое EXIF и зачем его удалять?',
    excerpt: 'В фото могут быть модель камеры, дата съёмки и GPS. Что важно знать перед публикацией.',
    readTime: '4 мин чтения',
    metaDescription: 'Что такое метаданные EXIF, типичные поля и почему удалять GPS перед публикацией. Бесплатное удаление EXIF в браузере.',
    body: `# Что такое EXIF и зачем его удалять?

Каждое фото со смартфона или камеры часто содержит не только видимые пиксели, но и слой **метаданных** **EXIF** (*Exchangeable Image File Format*). Они встроены в JPG, HEIC, TIFF и др. Галерея их не показывает, но любой с нужной утилитой может прочитать — иногда то, что вы не собирались раскрывать.

## Что входит в EXIF

- **Камера и объектив**: марка, модель, фокусное расстояние
- **Параметры съёмки**: выдержка, диафрагма, ISO, вспышка, баланс белого
- **Дата и время** съёмки
- **Ориентация**: портрет или альбом
- **GPS**: если геолокация была включена
- **ПО**: последнее приложение, редактировавшее файл

Безобидная прогулка в соцсетях может выдать дом, школу ребёнка или частное место отдыха.

## Зачем удалять EXIF перед публикацией

### Приватность и преследование

GPS в EXIF использовали в реальных случаях harassment. Гостиная, машина, парк — с геотегом точность до нескольких метров.

Без GPS метка времени + модель + повторяющийся фон иногда выдают распорядок дня.

### Доксинг и раскрытие личности

Серийные номера, следы ПО… Журналисты и информаторы теряли анонимность из‑за забытых метаданных в снимках.

### GDPR и регулируемые данные

По GDPR точная геопозиция, связанная с идентифицируемым человеком, — персональные данные. Площадкам с пользовательскими фото часто нужно снимать EXIF по принципу privacy by design.

### Меньший размер (бонус)

Блоки EXIF добавляют килобайты. [Грамотное сжатие](/blog/how-to-compress-images-without-losing-quality) сильнее уменьшает файл, но удаление EXIF мгновенно и без потери качества картинки.

## Когда EXIF лучше оставить

- **Фото-портфолио**: клиенты ждут полный EXIF
- **Архив и форензика**: цепочка оригинальных метаданных
- **Личный порядок**: сортировка по дате и камере

Правило: **в архиве с EXIF, для публикации — чистая копия.**

## Как удалить EXIF в NanoImage

[**Удалить EXIF**](/remove-exif) обрабатывает файлы **в браузере**, без загрузки на сервер. Проверьте DevTools → Network.

1. Откройте [**Удалить EXIF**](/remove-exif)
2. Перетащите JPG или HEIC
3. Предпросмотр
4. Скачайте

Пиксели те же; исчезает только скрытый слой.

### Пакетная обработка

Для папки используйте [**Пакетное сжатие**](/batch-compress-image) или по одному файлу. CLI: \`nanoimage remove-exif ./photos --output ./clean\`.

## Чеклист перед публикацией

- [ ] Отключите геотеги, если они не нужны
- [ ] Очистите фото с домом, работой или детьми
- [ ] Сжимайте отдельно, если важен размер — [сжатие без потери качества](/blog/how-to-compress-images-without-losing-quality)
- [ ] Храните оригинал с EXIF, если он понадобится

EXIF невидим, пока его не прочитают. Полминуты перед публикацией — один из самых простых шагов для приватности ваших фото.`,
  },
}
