import type { BlogLocMap } from './exif'

export type { BlogLoc, BlogLocMap } from './exif'

export const fourWayExtraLocalizations: BlogLocMap = {
  'zh-TW': {
    category: '工具對比',
    title: 'NanoImage vs TinyPNG vs Squoosh vs Photopea：哪款圖片工具最適合你？（2026）',
    excerpt: '對四款最常用的免費圖片工具進行深度對比，涵蓋上傳隱私、工具數量和各自適用場景。誠實評測，包括我們自己的產品。',
    readTime: '10 分鐘閱讀',
    metaDescription: '2026 年 NanoImage、TinyPNG、Squoosh、Photopea 四款免費圖片工具深度對比：上傳隱私、壓縮品質、功能數量與適用場景。',
    body: `# NanoImage vs TinyPNG vs Squoosh vs Photopea：哪款圖片工具最適合你？（2026）

你需要壓縮一張截圖，或者為 Instagram 調整圖片尺寸，或者在發郵件前把 PNG 轉成 JPG。

本文對 2026 年我們真正會推薦的四款工具進行認真對比：**NanoImage、TinyPNG、Squoosh 和 Photopea**。我們會坦誠說明每款工具的優勢和劣勢，包括我們自己做的那款。

**利益披露**：NanoImage 是我們的產品。我們也盡量客觀地指出了它的不足。

---

## 一句話總結

- **只需壓縮、不想上傳？** → NanoImage 或 Squoosh
- **需要 API 或 WordPress 外掛用於生產環境？** → TinyPNG
- **需要瀏覽器版 Photoshop？** → Photopea
- **要在一個地方完成壓縮 + 調整尺寸 + 裁剪 + 轉格式 + 其他 11 件事？** → NanoImage
- **想在重要圖片上做精細編解碼控制？** → Squoosh

---

## 對比總表

| | **NanoImage** | **TinyPNG** | **Squoosh** | **Photopea** |
|---|:---:|:---:|:---:|:---:|
| 需要上傳到伺服器？ | 否 | 是 | 否 | 可選 |
| 需要註冊帳號？ | 否 | 免費版有限制 | 否 | 否 |
| 支援離線使用？ | 是 | 否 | 是 | 部分支援 |
| 工具數量 | 15 | 1 | 1 | 50+ |
| 批次處理 | 是（最多 10 張） | 是（免費版最多 20 張） | 逐張處理 | 是 |
| 免費版檔案大小限制 | 瀏覽器記憶體上限 | 5MB | 瀏覽器記憶體上限 | 瀏覽器記憶體上限 |
| 提供 API？ | 即將推出 | 是（付費） | 否 | 是（付費） |
| 費用 | 永久免費 | Freemium | 免費 | 免費含廣告 / $5/月無廣告 |

---

## NanoImage：15 款工具，全在瀏覽器中執行

**適合人群**：需要在一次工作階段中完成多個圖片任務的使用者、注重隱私的使用者（醫療、法律、NDA）、行動端使用者、開發者。

**NanoImage 的優勢**：
1. **工具覆蓋廣**。TinyPNG 和 Squoosh 只做一件事，NanoImage 把所有常見操作整合在一個 UI 裡。
2. **真免費，沒有附加條件**。沒有「每月 500 張免費」上限，沒有浮水印，沒有未來會上線的付費版。
3. **無上傳延遲**。5MB 圖片本地約 200ms 處理完，而上傳服務往往需要數秒。
4. **隱私不是承諾，是可驗證的**。開啟 DevTools → Network，壓縮時沒有任何網路請求。

**NanoImage 的劣勢**：
1. **暫無公開 API**。伺服器端流水線應用 TinyPNG 更合適。
2. **壓縮率略低於 TinyPNG**，同等品質下檔案約大 10–15%。
3. **無編解碼控制**。Squoosh 支援 MozJPEG / WebP / AVIF 並排對比。
4. **無進階編輯功能**。沒有圖層、選區、曲線。

---

## TinyPNG：生產級壓縮利器

**適合**：有大量產品圖需要優化的電商、WordPress 站點、需要 API 的生產流水線。

**TinyPNG 的優勢**：
1. **壓縮品質業界頂尖**，尤其適合照片類內容。
2. **生態成熟**：WordPress 外掛、Photoshop 外掛、Magento、Shopify、REST API。
3. **批次操作穩定可靠**：免費 UI 一次 20 張；API 無上限。

**TinyPNG 的劣勢**：
1. **每次都要上傳圖片**到阿姆斯特丹的 Tinify 伺服器。
2. **免費版 5MB 上限**——現代手機常拍 8–15MB。
3. **只有壓縮一個功能**：無調整尺寸、裁剪、轉格式或浮水印。
4. **免費版每月 500 張總上限**。

---

## Squoosh：編解碼控制的專業工具

**適合**：開發者優化重要圖片（落地頁主圖），需要 AVIF/JPEG XL 輸出，喜歡深入調整量化參數的使用者。

**Squoosh 的優勢**：
1. **無與倫比的編解碼對比深度**：MozJPEG vs WebP vs AVIF 並排，連像素級差異都可見。
2. **100% 用戶端、開源**（Apache 2.0）。
3. **支援 AVIF 和 JPEG XL**。

**Squoosh 的劣勢**：
1. **每次只能處理一張圖**，無批次模式。
2. **功能僅限壓縮/格式轉換**：無裁剪、浮水印或迷因產生器。
3. **UI 曲線陡峭**，非開發者容易放棄。
4. **專案似乎處於維護模式**（最近一次重大更新：2024 年）。

---

## Photopea：瀏覽器裡的 Photoshop

**適合**：開啟 PSD 檔案、多圖層合成、修圖、調色、有 Photoshop 使用習慣的設計師。

**Photopea 的優勢**：
1. **Photoshop 功能複製程度驚人**（約 90%），全在瀏覽器分頁中。
2. **幾乎支援所有格式**：AI、EPS、SVG、RAW、XCF。
3. **永久免費含廣告**（$5/月去廣告）。

**Photopea 的劣勢**：
1. **是完整編輯器，不是快速任務工具**：載入需 3–5 秒。
2. **介面在行動端基本無法使用**。
3. **一般使用者批次處理需編寫 JavaScript 腳本**。

---

## 選擇指南

| 場景 | 推薦工具 |
|---|---|
| 壓縮截圖後貼到 Slack | NanoImage 或 Squoosh |
| 5000 張產品圖在 CI 中優化 | TinyPNG API |
| 設計師需要從 PSD 匯出切圖 | Photopea |
| 調整尺寸 → 裁剪 → 加水印一次完成 | NanoImage |
| 精細對比 AVIF vs WebP 編碼效果 | Squoosh |

---

## AI 圖片工具呢？

我們刻意沒把「AI 圖片生成器」列入此對比——它們用模型創建或轉換圖片。若你只是要處理已有圖片，多數 AI 工具過度複雜，且常需先上傳。

---

[**立即使用 NanoImage →**](https://nanoimage.net)

深度對比文章：
- [NanoImage vs TinyPNG](/blog/nanoimage-vs-tinypng/)
- [NanoImage vs Squoosh](/blog/nanoimage-vs-squoosh/)
- [NanoImage vs Photopea](/blog/nanoimage-vs-photopea/)`,
  },

  ja: {
    category: '比較レビュー',
    title: 'NanoImage vs TinyPNG vs Squoosh vs Photopea：あなたに合った画像ツールは？（2026）',
    excerpt: '2026年の無料画像ツール4選を徹底比較。アップロードの有無、プライバシー、圧縮品質、機能数を正直に評価します。',
    readTime: '10分で読める',
    metaDescription: '2026年版 NanoImage・TinyPNG・Squoosh・Photopea 比較：サーバーアップロード、プライバシー、圧縮品質、機能カバレッジと向いている用途。',
    body: `# NanoImage vs TinyPNG vs Squoosh vs Photopea：あなたに合った画像ツールは？（2026）

スクリーンショットを1枚圧縮したい。Instagram用に写真のサイズを変えたい。メール前にPNGをJPGに変換したい——そんな日常の場面で、どのツールを選ぶべきか。

本記事は2026年に実際におすすめする4ツール——**NanoImage、TinyPNG、Squoosh、Photopea**——を率直に比較します。自社プロダクトである NanoImage の弱点も含め、各ツールの勝ち所と負け所を整理します。

**開示**：NanoImage は当社のプロジェクトです。可能な限り公平に評価しています。

---

## TL;DR（要約）

- **アップロードせずに圧縮だけ？** → NanoImage または Squoosh
- **本番向け API や WordPress プラグイン？** → TinyPNG
- **ブラウザで Photoshop 級の編集？** → Photopea
- **圧縮＋リサイズ＋クロップ＋変換＋他11機能を1セッションで？** → NanoImage
- **コーデック単位で最高の圧縮を詰めたい？** → Squoosh

---

## 比較マトリクス

| | **NanoImage** | **TinyPNG** | **Squoosh** | **Photopea** |
|---|:---:|:---:|:---:|:---:|
| サーバーへアップロード？ | いいえ | はい | いいえ | 任意 |
| アカウント必須？ | いいえ | 無料枠に制限 | いいえ | いいえ |
| オフライン動作？ | はい | いいえ | はい | 一部 |
| ツール数 | 15 | 1 | 1 | 50+ |
| バッチ処理 | はい（最大10枚） | はい（無料20枚） | 1枚ずつ | はい |
| ファイルサイズ上限 | ブラウザRAM | 5MB（無料） | ブラウザRAM | ブラウザRAM |
| API | 近日公開 | あり（有料） | なし | あり（有料） |
| 料金 | 永久無料 | Freemium | 無料 | 広告付き無料 / $5/月 |

---

## NanoImage：15ツール、すべてブラウザ内

**向いている人**：1セッションで複数の小さな画像タスクをこなす人、プライバシー重視（医療・法律・NDA）、モバイルユーザー、非エンジニアに1リンクで勧めたい開発者。

**NanoImage の強み**：
1. **機能の幅**。TinyPNG と Squoosh は1機能、NanoImage は1 UI に集約。
2. **本当に無料**。「月500枚まで」や透かし、有料化予告なし。
3. **アップロード遅延なし**。5MB写真をローカルで約200ms。サーバー往復は数秒。
4. **プライバシーは検証可能**。DevTools → Network でリクエストゼロ。

**NanoImage の弱み**：
1. **公開 API 未提供**。サーバーパイプラインは TinyPNG が適任。
2. **圧縮率は TinyPNG よりやや劣る**（同等画質で約10–15%大きい）。
3. **コーデック細かい制御なし**。Squoosh は MozJPEG / WebP / AVIF を並べ比較。
4. **高度編集なし**。レイヤー、選択、カーブ等なし。

---

## TinyPNG：本番向け圧縮の定番

**向いている人**：数千枚の商品画像を持つEC、WordPress、安定 API が必要なCI/CD。

**TinyPNG の強み**：
1. **写真圧縮品質は業界トップクラス**。
2. **成熟エコシステム**：WordPress / Photoshop プラグイン、Magento、Shopify、REST API。
3. **バッチが安定**。無料UIで20枚同時、APIは上限なし。

**TinyPNG の弱み**：
1. **毎回アップロード**。アムステルダムの Tinify サーバーへ。
2. **無料5MB上限**。スマホ写真は8–15MBが普通。
3. **圧縮のみ**。リサイズ、クロップ、変換、透かしなし。
4. **無料は月500枚まで**。

---

## Squoosh：コーデック好きの実験室

**向いている人**：ランディングのヒーロー画像を手作業最適化する開発者、AVIF/JPEG XL 出力、量子化パラメータをいじるのが好きな人。

**Squoosh の強み**：
1. **コーデック比較の深さ**。MozJPEG vs WebP vs AVIF を並べ、差分まで見える。
2. **100%クライアントサイド、Apache 2.0 オープンソース**。
3. **AVIF と JPEG XL 対応**。

**Squoosh の弱み**：
1. **1枚ずつ**。バッチなし。
2. **圧縮・変換のみ**。クロップ、透かし、ミーム生成なし。
3. **UX が急**。非開発者は離脱しやすい。
4. **メンテナンスモード気味**（最後の大型更新：2024年）。

---

## Photopea：ブラウザ版 Photoshop

**向いている人**：PSD編集、多レイヤー合成、レタッチ、カラーグレーディング、Photoshop 筋肉記憶があるデザイナー。

**Photopea の強み**：
1. **Photoshop 機能の再現度が驚異的**（約90%）。
2. **ほぼ全フォーマット**：AI、EPS、SVG、RAW、XCF。
3. **永久無料（広告）**、$5/月で広告非表示。

**Photopea の弱み**：
1. **フルエディタ**。起動に3–5秒。
2. **モバイルでは実質使えない**密度のUI。
3. **カジュアルユーザー向けバッチは JS スクリプトが必要**。

---

## 決定ガイド

| シナリオ | 最適ツール |
|---|---|
| Slack用にスクショを圧縮 | NanoImage または Squoosh |
| CIで5000枚の商品画像 | TinyPNG API |
| PSDから書き出し | Photopea |
| リサイズ→クロップ→透かしを1セッション | NanoImage |
| AVIF vs WebP を手動比較 | Squoosh |

---

## AI画像ツールは？

「AI画像生成」は意図的に除外しました——既存画像の処理なら過剰で、多くはアップロード必須です。

---

[**NanoImage を試す →**](https://nanoimage.net)

詳細比較：
- [NanoImage vs TinyPNG](/blog/nanoimage-vs-tinypng/)
- [NanoImage vs Squoosh](/blog/nanoimage-vs-squoosh/)
- [NanoImage vs Photopea](/blog/nanoimage-vs-photopea/)`,
  },

  ko: {
    category: '비교 리뷰',
    title: 'NanoImage vs TinyPNG vs Squoosh vs Photopea: 어떤 이미지 툴이 맞을까? (2026)',
    excerpt: '2026년 무료 이미지 툴 4가지 심층 비교. 업로드 여부, 개인정보 보호, 압축 품질, 기능 수를 솔직하게 평가합니다.',
    readTime: '10분 읽기',
    metaDescription: '2026 NanoImage·TinyPNG·Squoosh·Photopea 비교: 서버 업로드, 프라이버시, 압축 품질, 기능 범위와 적합한 사용 사례.',
    body: `# NanoImage vs TinyPNG vs Squoosh vs Photopea: 어떤 이미지 툴이 맞을까? (2026)

스크린샷 한 장을 압축하거나, Instagram용으로 크기를 바꾸거나, 이메일 전에 PNG를 JPG로 변환해야 할 때——어떤 도구를 써야 할까요?

이 글은 2026년에 실제로 추천하는 네 도구——**NanoImage, TinyPNG, Squoosh, Photopea**——를 솔직하게 비교합니다. 우리가 만든 NanoImage의 약점도 포함합니다.

**고지**: NanoImage는 우리 프로젝트입니다. 가능한 한 공정하게 평가했습니다.

---

## TL;DR

- **업로드 없이 압축만?** → NanoImage 또는 Squoosh
- **프로덕션용 API나 WordPress 플러그인?** → TinyPNG
- **브라우저에서 Photoshop급 편집?** → Photopea
- **압축+리사이즈+크롭+변환+11가지 더, 한 세션에?** → NanoImage
- **코덱 단위 최고 압축?** → Squoosh

---

## 비교 매트릭스

| | **NanoImage** | **TinyPNG** | **Squoosh** | **Photopea** |
|---|:---:|:---:|:---:|:---:|
| 서버 업로드? | 아니오 | 예 | 아니오 | 선택 |
| 계정 필요? | 아니오 | 무료 한도 | 아니오 | 아니오 |
| 오프라인? | 예 | 아니오 | 예 | 부분 |
| 도구 수 | 15 | 1 | 1 | 50+ |
| 일괄 처리 | 예(최대 10) | 예(무료 20) | 한 장씩 | 예 |
| 파일 크기 한도 | 브라우저 RAM | 5MB(무료) | 브라우저 RAM | 브라우저 RAM |
| API | 곧 출시 | 있음(유료) | 없음 | 있음(유료) |
| 비용 | 영구 무료 | Freemium | 무료 | 광고 무료 / $5/월 |

---

## NanoImage: 15개 도구, 모두 브라우저에서

**적합**: 한 세션에 여러 작은 이미지 작업, 프라이버시 민감(의료·법률·NDA), 모바일, 비기술 동료에게 한 링크로 추천하는 개발자.

**NanoImage 강점**:
1. **기능 폭**. TinyPNG·Squoosh는 한 가지, NanoImage는 하나의 UI에 통합.
2. **진짜 무료**. "월 500장" 절벽, 워터마크, 업셀 없음.
3. **업로드 지연 없음**. 5MB 사진 로컬 ~200ms vs 서버 왕복 수 초.
4. **프라이버시 검증 가능**. DevTools → Network에서 요청 없음.

**NanoImage 약점**:
1. **공개 API 아직 없음**. 서버 파이프라인은 TinyPNG.
2. **압축률 TinyPNG보다 약간 낮음**(동일 품질 ~10–15% 큼).
3. **코덱 세밀 제어 없음**. Squoosh는 MozJPEG/WebP/AVIF 나란히.
4. **고급 편집 없음**. 레이어, 선택, 곡선 없음.

---

## TinyPNG: 프로덕션 압축 일꾼

**적합**: 수천 장 제품 이미지 EC, WordPress, 안정 API CI/CD.

**TinyPNG 강점**:
1. **사진 압축 품질 최상급**.
2. **성숙한 생태계**: WordPress/Photoshop 플러그인, Magento, Shopify, REST API.
3. **일괄 처리 안정**. 무료 UI 20장, API 무제한.

**TinyPNG 약점**:
1. **매번 업로드**. 암스테르담 Tinify 서버.
2. **무료 5MB 한도**. 스마트폰 8–15MB 흔함.
3. **압축만**. 리사이즈, 크롭, 변환, 워터마크 없음.
4. **무료 월 500장**.

---

## Squoosh: 코덱 덕후의 실험실

**적합**: 랜딩 히어로 수동 최적화 개발자, AVIF/JPEG XL, 양자화 파라미터 조정.

**Squoosh 강점**:
1. **코덱 비교 깊이**. MozJPEG vs WebP vs AVIF, 픽셀 diff.
2. **100% 클라이언트, Apache 2.0 오픈소스**.
3. **AVIF·JPEG XL**.

**Squoosh 약점**:
1. **한 장씩**. 배치 없음.
2. **압축/변환만**. 크롭, 워터마크, 밈 생성기 없음.
3. **UX 가파름**. 비개발자 이탈.
4. **유지보수 모드 분위기**(마지막 major: 2024).

---

## Photopea: 브라우저 Photoshop

**적합**: PSD, 다층 합성, 리터치, 색보정, Photoshop 근육 기억 디자이너.

**Photopea 강점**:
1. **Photoshop ~90% 재현**.
2. **거의 모든 포맷**: AI, EPS, SVG, RAW, XCF.
3. **영구 무료(광고)**, $5/월 광고 제거.

**Photopea 약점**:
1. **풀 에디터**. 로딩 3–5초.
2. **모바일에서 사실상 불가**한 UI.
3. **캐주얼 배치는 JS 스크립트**.

---

## 결정 가이드

| 시나리오 | 최적 도구 |
|---|---|
| Slack용 스크린샷 압축 | NanoImage 또는 Squoosh |
| CI에서 5000장 제품 이미지 | TinyPNG API |
| PSD에서 내보내기 | Photopea |
| 리사이즈→크롭→워터마크 한 세션 | NanoImage |
| AVIF vs WebP 수동 비교 | Squoosh |

---

## AI 이미지 도구는?

「AI 생성기」는 의도적으로 제외——이미 있는 이미지 처리에는 과하고 대부분 업로드 필요.

---

[**NanoImage 사용하기 →**](https://nanoimage.net)

심층 비교:
- [NanoImage vs TinyPNG](/blog/nanoimage-vs-tinypng/)
- [NanoImage vs Squoosh](/blog/nanoimage-vs-squoosh/)
- [NanoImage vs Photopea](/blog/nanoimage-vs-photopea/)`,
  },

  fr: {
    category: 'Comparaisons',
    title: `NanoImage vs TinyPNG vs Squoosh vs Photopea : quel outil choisir en 2026 ?`,
    excerpt: `Comparaison honnête des quatre outils d'image gratuits les plus utilisés en 2026 : téléversement, confidentialité, qualité de compression et cas d'usage.`,
    readTime: '10 min de lecture',
    metaDescription: `NanoImage vs TinyPNG vs Squoosh vs Photopea en 2026 : uploads, confidentialité, qualité de compression, fonctionnalités et scénarios où chaque outil excelle.`,
    body: `# NanoImage vs TinyPNG vs Squoosh vs Photopea : quel outil choisir en 2026 ?

Vous devez compresser une capture d'écran. Redimensionner une photo pour Instagram. Convertir un PNG en JPG avant un e-mail.

Cet article compare sérieusement les quatre outils que nous recommandons réellement en 2026 : **NanoImage, TinyPNG, Squoosh et Photopea**. Nous sommes honnêtes sur les forces et faiblesses de chacun — y compris celui que nous avons construit.

**Divulgation** : NanoImage est notre projet. Nous avons aussi listé ses faiblesses.

---

## TL;DR

- **Compresser sans téléverser ?** → NanoImage ou Squoosh
- **API ou plugin WordPress pour la production ?** → TinyPNG
- **Un Photoshop complet dans l'onglet du navigateur ?** → Photopea
- **Compresser + redimensionner + recadrer + convertir + 11 autres tâches, côté client ?** → NanoImage
- **Meilleure compression avec contrôle au niveau codec ?** → Squoosh

---

## Matrice de comparaison

| | **NanoImage** | **TinyPNG** | **Squoosh** | **Photopea** |
|---|:---:|:---:|:---:|:---:|
| Téléversement serveur ? | Non | Oui | Non | Optionnel |
| Compte requis ? | Non | Limite gratuite | Non | Non |
| Hors ligne ? | Oui | Non | Oui | Partiel |
| Nombre d'outils | 15 | 1 | 1 | 50+ |
| Traitement par lot | Oui (jusqu'à 10) | Oui (20 gratuits) | Un par un | Oui |
| Taille max fichier | RAM navigateur | 5 Mo (gratuit) | RAM navigateur | RAM navigateur |
| API | Bientôt | Oui (payant) | Non | Oui (payant) |
| Coût | Gratuit à vie | Freemium | Gratuit | Gratuit avec pubs / 5 $/mois |

---

## NanoImage : 15 outils, tout dans le navigateur

**Idéal pour** : plusieurs petites tâches image en une session, utilisateurs sensibles à la confidentialité, mobile, développeurs recommandant un seul lien.

**Où NanoImage gagne** :
1. **Largeur fonctionnelle.** TinyPNG et Squoosh font une chose ; NanoImage les regroupe.
2. **Vraiment gratuit.** Pas de plafond « 500/mois », pas de filigrane.
3. **Pas de latence d'upload.** ~200 ms en local pour 5 Mo vs plusieurs secondes aller-retour.
4. **Confidentialité vérifiable** via DevTools → Réseau.

**Où NanoImage perd** :
1. **Pas d'API publique.** Pipelines serveur → TinyPNG.
2. **Compression ~10–15 % moins agressive** que TinyPNG à qualité équivalente.
3. **Pas de contrôle codec.** Squoosh compare MozJPEG / WebP / AVIF.
4. **Pas d'édition avancée** (calques, sélections, courbes).

---

## TinyPNG : le cheval de bataille production

**Idéal pour** : e-commerce massif, WordPress, pipelines API stables.

**Où TinyPNG gagne** :
1. **Qualité de compression excellente** pour la photo.
2. **Écosystème mature** : WordPress, Photoshop, Magento, Shopify, REST API.
3. **Lots fiables** : 20 images en UI gratuite ; illimité via API.

**Où TinyPNG perd** :
1. **Tout est téléversé** vers les serveurs Tinify à Amsterdam.
2. **Limite 5 Mo gratuite** ; les téléphones font 8–15 Mo.
3. **Une seule fonction** : pas de redimensionnement, recadrage, conversion.
4. **500 images/mois en gratuit.**

---

## Squoosh : le labo des codec geeks

**Idéal pour** : optimiser manuellement une hero image ; sortie AVIF/JPEG XL ; ajuster la quantification.

**Où Squoosh gagne** :
1. **Profondeur codec** : MozJPEG vs WebP vs AVIF côte à côte.
2. **100 % client, open source** Apache 2.0.
3. **AVIF et JPEG XL.**

**Où Squoosh perd** :
1. **Une image à la fois.**
2. **Compression/conversion seulement.**
3. **Courbe UX raide** pour les non-développeurs.
4. **Projet en mode maintenance** (dernière release majeure : 2024).

---

## Photopea : Photoshop dans le navigateur

**Idéal pour** : PSD, compositing multi-calques, retouche, étalonnage, designers habitués à Photoshop.

**Où Photopea gagne** :
1. **~90 % de parité Photoshop** dans le navigateur.
2. **Presque tous les formats** : AI, EPS, SVG, RAW, XCF.
3. **Gratuit avec pubs** ; 5 $/mois sans pubs.

**Où Photopea perd** :
1. **Éditeur complet** : chargement 3–5 s.
2. **UI dense**, quasi inutilisable sur mobile.
3. **Lots pour utilisateurs casual** via scripts JS.

---

## Guide de décision

| Scénario | Meilleur outil |
|---|---|
| Compresser une capture pour Slack | NanoImage ou Squoosh |
| 5 000 photos produit en CI | TinyPNG API |
| Designer exportant depuis un PSD | Photopea |
| Redimensionner → recadrer → filigrane en une session | NanoImage |
| Comparer AVIF vs WebP à la main | Squoosh |

---

## Et les outils IA ?

Nous avons volontairement exclu les « générateurs IA » — pour traiter une image existante, c'est souvent excessif et upload obligatoire.

---

[**Essayer NanoImage →**](https://nanoimage.net)

Comparaisons détaillées :
- [NanoImage vs TinyPNG](/blog/nanoimage-vs-tinypng/)
- [NanoImage vs Squoosh](/blog/nanoimage-vs-squoosh/)
- [NanoImage vs Photopea](/blog/nanoimage-vs-photopea/)`,
  },

  es: {
    category: 'Comparativas',
    title: `NanoImage vs TinyPNG vs Squoosh vs Photopea: ¿cuál elegir en 2026?`,
    excerpt: `Comparativa honesta de las cuatro herramientas de imagen gratuitas más usadas en 2026: privacidad, calidad de compresión y casos de uso.`,
    readTime: '10 min de lectura',
    metaDescription: `NanoImage vs TinyPNG vs Squoosh vs Photopea en 2026: subidas, privacidad, calidad de compresión, funciones y cuándo gana cada herramienta.`,
    body: `# NanoImage vs TinyPNG vs Squoosh vs Photopea: ¿cuál elegir en 2026?

Necesitas comprimir una captura. Redimensionar una foto para Instagram. Convertir PNG a JPG antes de un correo.

Este artículo compara en serio las cuatro herramientas que realmente recomendamos en 2026: **NanoImage, TinyPNG, Squoosh y Photopea**. Seremos honestos sobre dónde gana y pierde cada una — incluida la nuestra.

**Divulgación**: NanoImage es nuestro proyecto. También listamos sus debilidades.

---

## TL;DR

- **¿Comprimir sin subir?** → NanoImage o Squoosh
- **¿API o plugin WordPress para producción?** → TinyPNG
- **¿Un Photoshop completo en el navegador?** → Photopea
- **¿Comprimir + redimensionar + recortar + convertir + 11 cosas más, todo en el cliente?** → NanoImage
- **¿Máxima compresión con control de códec?** → Squoosh

---

## Matriz de comparación

| | **NanoImage** | **TinyPNG** | **Squoosh** | **Photopea** |
|---|:---:|:---:|:---:|:---:|
| ¿Subida al servidor? | No | Sí | No | Opcional |
| ¿Cuenta requerida? | No | Límite gratis | No | No |
| ¿Funciona offline? | Sí | No | Sí | Parcial |
| N.º de herramientas | 15 | 1 | 1 | 50+ |
| Procesamiento por lotes | Sí (hasta 10) | Sí (20 gratis) | De uno en uno | Sí |
| Tamaño máx. archivo | RAM del navegador | 5 MB (gratis) | RAM del navegador | RAM del navegador |
| API | Próximamente | Sí (de pago) | No | Sí (de pago) |
| Coste | Gratis para siempre | Freemium | Gratis | Gratis con anuncios / 5 $/mes |

---

## NanoImage: 15 herramientas, todo en el navegador

**Ideal para**: varias tareas pequeñas en una sesión, usuarios sensibles a la privacidad, móvil, desarrolladores que recomiendan un solo enlace.

**Donde NanoImage gana**:
1. **Amplitud funcional.** TinyPNG y Squoosh hacen una cosa; NanoImage las une.
2. **Gratis de verdad.** Sin techo de «500/mes», sin marca de agua.
3. **Sin latencia de subida.** ~200 ms local para 5 MB vs varios segundos ida y vuelta.
4. **Privacidad verificable** en DevTools → Red.

**Donde NanoImage pierde**:
1. **Sin API pública aún.** Pipelines servidor → TinyPNG.
2. **Compresión ~10–15 % menos agresiva** que TinyPNG a calidad equivalente.
3. **Sin control de códec.** Squoosh compara MozJPEG / WebP / AVIF.
4. **Sin edición avanzada** (capas, selecciones, curvas).

---

## TinyPNG: el caballo de batalla de producción

**Ideal para**: e-commerce masivo, WordPress, pipelines API estables.

**Donde TinyPNG gana**:
1. **Calidad de compresión excelente** en fotos.
2. **Ecosistema maduro**: WordPress, Photoshop, Magento, Shopify, REST API.
3. **Lotes fiables**: 20 imágenes en UI gratis; ilimitado vía API.

**Donde TinyPNG pierde**:
1. **Todo se sube** a servidores Tinify en Ámsterdam.
2. **Límite 5 MB gratis**; los móviles hacen 8–15 MB.
3. **Una sola función**: sin redimensionar, recortar, convertir.
4. **500 imágenes/mes en gratis.**

---

## Squoosh: el laboratorio de códecs

**Ideal para**: optimizar manualmente una hero image; salida AVIF/JPEG XL; ajustar cuantización.

**Donde Squoosh gana**:
1. **Profundidad de códec**: MozJPEG vs WebP vs AVIF lado a lado.
2. **100 % cliente, código abierto** Apache 2.0.
3. **AVIF y JPEG XL.**

**Donde Squoosh pierde**:
1. **Una imagen a la vez.**
2. **Solo compresión/conversión.**
3. **Curva UX empinada** para no desarrolladores.
4. **Proyecto en modo mantenimiento** (última release mayor: 2024).

---

## Photopea: Photoshop en el navegador

**Ideal para**: PSD, composición multicapa, retoque, color grading, diseñadores con memoria muscular de Photoshop.

**Donde Photopea gana**:
1. **~90 % de paridad con Photoshop** en el navegador.
2. **Casi cualquier formato**: AI, EPS, SVG, RAW, XCF.
3. **Gratis con anuncios**; 5 $/mes sin anuncios.

**Donde Photopea pierde**:
1. **Editor completo**: carga 3–5 s.
2. **UI densa**, casi inutilizable en móvil.
3. **Lotes para usuarios casuales** vía scripts JS.

---

## Guía de decisión

| Escenario | Mejor herramienta |
|---|---|
| Comprimir captura para Slack | NanoImage o Squoosh |
| 5.000 fotos de producto en CI | TinyPNG API |
| Diseñador exportando desde PSD | Photopea |
| Redimensionar → recortar → marca de agua en una sesión | NanoImage |
| Comparar AVIF vs WebP a mano | Squoosh |

---

## ¿Y las herramientas de IA?

Excluimos deliberadamente los «generadores IA» — para procesar una imagen que ya tienes, suelen ser exceso y exigen subida.

---

[**Probar NanoImage →**](https://nanoimage.net)

Comparativas en profundidad:
- [NanoImage vs TinyPNG](/blog/nanoimage-vs-tinypng/)
- [NanoImage vs Squoosh](/blog/nanoimage-vs-squoosh/)
- [NanoImage vs Photopea](/blog/nanoimage-vs-photopea/)`,
  },

  pt: {
    category: 'Comparativos',
    title: `NanoImage vs TinyPNG vs Squoosh vs Photopea: qual escolher em 2026?`,
    excerpt: `Comparação honesta das quatro ferramentas de imagem gratuitas mais usadas em 2026: privacidade, qualidade de compressão e casos de uso.`,
    readTime: '10 min de leitura',
    metaDescription: `NanoImage vs TinyPNG vs Squoosh vs Photopea em 2026: uploads, privacidade, qualidade de compressão, recursos e quando cada ferramenta vence.`,
    body: `# NanoImage vs TinyPNG vs Squoosh vs Photopea: qual escolher em 2026?

Você precisa comprimir uma captura de tela. Redimensionar uma foto para o Instagram. Converter PNG em JPG antes de um e-mail.

Este artigo compara seriamente as quatro ferramentas que realmente recomendamos em 2026: **NanoImage, TinyPNG, Squoosh e Photopea**. Seremos honestos sobre onde cada uma ganha e perde — incluindo a nossa.

**Divulgação**: NanoImage é nosso projeto. Também listamos suas fraquezas.

---

## TL;DR

- **Comprimir sem enviar?** → NanoImage ou Squoosh
- **API ou plugin WordPress para produção?** → TinyPNG
- **Um Photoshop completo no navegador?** → Photopea
- **Comprimir + redimensionar + recortar + converter + 11 coisas, tudo no cliente?** → NanoImage
- **Melhor compressão com controle de codec?** → Squoosh

---

## Matriz de comparação

| | **NanoImage** | **TinyPNG** | **Squoosh** | **Photopea** |
|---|:---:|:---:|:---:|:---:|
| Envia ao servidor? | Não | Sim | Não | Opcional |
| Conta obrigatória? | Não | Limite grátis | Não | Não |
| Funciona offline? | Sim | Não | Sim | Parcial |
| Nº de ferramentas | 15 | 1 | 1 | 50+ |
| Processamento em lote | Sim (até 10) | Sim (20 grátis) | Um por vez | Sim |
| Tamanho máx. arquivo | RAM do navegador | 5 MB (grátis) | RAM do navegador | RAM do navegador |
| API | Em breve | Sim (pago) | Não | Sim (pago) |
| Custo | Grátis para sempre | Freemium | Grátis | Grátis com anúncios / US$ 5/mês |

---

## NanoImage: 15 ferramentas, tudo no navegador

**Ideal para**: várias tarefas pequenas numa sessão, usuários sensíveis à privacidade, mobile, devs que recomendam um único link.

**Onde NanoImage vence**:
1. **Amplitude funcional.** TinyPNG e Squoosh fazem uma coisa; NanoImage reúne tudo.
2. **Grátis de verdade.** Sem teto de «500/mês», sem marca d'água.
3. **Sem latência de upload.** ~200 ms local para 5 MB vs vários segundos ida e volta.
4. **Privacidade verificável** no DevTools → Rede.

**Onde NanoImage perde**:
1. **Sem API pública ainda.** Pipelines servidor → TinyPNG.
2. **Compressão ~10–15 % menos agressiva** que TinyPNG em qualidade equivalente.
3. **Sem controle de codec.** Squoosh compara MozJPEG / WebP / AVIF.
4. **Sem edição avançada** (camadas, seleções, curvas).

---

## TinyPNG: cavalo de batalha de produção

**Ideal para**: e-commerce massivo, WordPress, pipelines API estáveis.

**Onde TinyPNG vence**:
1. **Qualidade de compressão excelente** em fotos.
2. **Ecossistema maduro**: WordPress, Photoshop, Magento, Shopify, REST API.
3. **Lotes confiáveis**: 20 imagens na UI grátis; ilimitado via API.

**Onde TinyPNG perde**:
1. **Tudo é enviado** aos servidores Tinify em Amsterdã.
2. **Limite 5 MB grátis**; celulares fazem 8–15 MB.
3. **Uma função só**: sem redimensionar, recortar, converter.
4. **500 imagens/mês no grátis.**

---

## Squoosh: laboratório de codecs

**Ideal para**: otimizar manualmente uma hero image; saída AVIF/JPEG XL; ajustar quantização.

**Onde Squoosh vence**:
1. **Profundidade de codec**: MozJPEG vs WebP vs AVIF lado a lado.
2. **100 % cliente, open source** Apache 2.0.
3. **AVIF e JPEG XL.**

**Onde Squoosh perde**:
1. **Uma imagem por vez.**
2. **Só compressão/conversão.**
3. **Curva UX íngreme** para não devs.
4. **Projeto em modo manutenção** (último release major: 2024).

---

## Photopea: Photoshop no navegador

**Ideal para**: PSD, composição multicamada, retoque, color grading, designers com memória muscular do Photoshop.

**Onde Photopea vence**:
1. **~90 % de paridade com Photoshop** no navegador.
2. **Quase qualquer formato**: AI, EPS, SVG, RAW, XCF.
3. **Grátis com anúncios**; US$ 5/mês sem anúncios.

**Onde Photopea perde**:
1. **Editor completo**: carrega em 3–5 s.
2. **UI densa**, quase inutilizável no mobile.
3. **Lotes para usuários casuais** via scripts JS.

---

## Guia de decisão

| Cenário | Melhor ferramenta |
|---|---|
| Comprimir captura para Slack | NanoImage ou Squoosh |
| 5.000 fotos de produto em CI | TinyPNG API |
| Designer exportando de PSD | Photopea |
| Redimensionar → recortar → marca d'água numa sessão | NanoImage |
| Comparar AVIF vs WebP manualmente | Squoosh |

---

## E as ferramentas de IA?

Excluímos de propósito os «geradores de IA» — para processar uma imagem que você já tem, costumam ser excesso e exigem upload.

---

[**Experimentar NanoImage →**](https://nanoimage.net)

Comparativos detalhados:
- [NanoImage vs TinyPNG](/blog/nanoimage-vs-tinypng/)
- [NanoImage vs Squoosh](/blog/nanoimage-vs-squoosh/)
- [NanoImage vs Photopea](/blog/nanoimage-vs-photopea/)`,
  },

  ru: {
    category: 'Сравнения',
    title: `NanoImage vs TinyPNG vs Squoosh vs Photopea: какой инструмент выбрать в 2026?`,
    excerpt: `Честное сравнение четырёх популярных бесплатных инструментов для работы с изображениями в 2026: приватность, качество сжатия, набор функций.`,
    readTime: '10 мин чтения',
    metaDescription: `NanoImage vs TinyPNG vs Squoosh vs Photopea в 2026: загрузка на сервер, приватность, качество сжатия, функции и сценарии, где каждый инструмент силён.`,
    body: `# NanoImage vs TinyPNG vs Squoosh vs Photopea: какой инструмент выбрать в 2026?

Нужно сжать скриншот. Изменить размер фото для Instagram. Конвертировать PNG в JPG перед письмом.

В этой статье мы серьёзно сравниваем четыре инструмента, которые реально рекомендуем в 2026 году: **NanoImage, TinyPNG, Squoosh и Photopea**. Честно о сильных и слабых сторонах каждого — включая наш собственный.

**Раскрытие**: NanoImage — наш проект. Мы также указали его слабости.

---

## TL;DR

- **Сжать без загрузки на сервер?** → NanoImage или Squoosh
- **API или плагин WordPress для продакшена?** → TinyPNG
- **Полноценный Photoshop во вкладке браузера?** → Photopea
- **Сжатие + ресайз + кроп + конвертация + ещё 11 задач, всё на клиенте?** → NanoImage
- **Максимальное сжатие с контролем кодека?** → Squoosh

---

## Сравнительная матрица

| | **NanoImage** | **TinyPNG** | **Squoosh** | **Photopea** |
|---|:---:|:---:|:---:|:---:|
| Загрузка на сервер? | Нет | Да | Нет | Опционально |
| Нужен аккаунт? | Нет | Лимит бесплатно | Нет | Нет |
| Работает офлайн? | Да | Нет | Да | Частично |
| Число инструментов | 15 | 1 | 1 | 50+ |
| Пакетная обработка | Да (до 10) | Да (20 бесплатно) | По одному | Да |
| Макс. размер файла | RAM браузера | 5 МБ (бесплатно) | RAM браузера | RAM браузера |
| API | Скоро | Да (платно) | Нет | Да (платно) |
| Стоимость | Бесплатно навсегда | Freemium | Бесплатно | Бесплатно с рекламой / $5/мес |

---

## NanoImage: 15 инструментов, всё в браузере

**Лучше всего для**: нескольких мелких задач за сессию, пользователей с высокими требованиями к приватности, мобильных, разработчиков с одной ссылкой для коллег.

**Где NanoImage выигрывает**:
1. **Широта функций.** TinyPNG и Squoosh делают одно; NanoImage объединяет.
2. **По-настоящему бесплатно.** Без лимита «500/месяц», без водяных знаков.
3. **Без задержки загрузки.** ~200 мс локально для 5 МБ vs секунды туда-обратно.
4. **Приватность проверяема** через DevTools → Network.

**Где NanoImage проигрывает**:
1. **Публичного API пока нет.** Серверные пайплайны → TinyPNG.
2. **Сжатие ~на 10–15 % слабее** TinyPNG при том же качестве.
3. **Нет контроля кодека.** Squoosh сравнивает MozJPEG / WebP / AVIF.
4. **Нет продвинутого редактирования** (слои, выделения, кривые).

---

## TinyPNG: рабочая лошадка продакшена

**Лучше всего для**: массового e-commerce, WordPress, стабильных API-пайплайнов.

**Где TinyPNG выигрывает**:
1. **Отличное качество сжатия** для фото.
2. **Зрелая экосистема**: WordPress, Photoshop, Magento, Shopify, REST API.
3. **Надёжные пакеты**: 20 изображений в бесплатном UI; без лимита через API.

**Где TinyPNG проигрывает**:
1. **Всё загружается** на серверы Tinify в Амстердаме.
2. **Лимит 5 МБ бесплатно**; телефоны снимают 8–15 МБ.
3. **Одна функция**: без ресайза, кропа, конвертации.
4. **500 изображений/месяц бесплатно.**

---

## Squoosh: лаборатория для codec-энтузиастов

**Лучше всего для**: ручной оптимизации hero-изображения; AVIF/JPEG XL; настройки квантования.

**Где Squoosh выигрывает**:
1. **Глубина сравнения кодеков**: MozJPEG vs WebP vs AVIF бок о бок.
2. **100 % на клиенте, open source** Apache 2.0.
3. **AVIF и JPEG XL.**

**Где Squoosh проигрывает**:
1. **По одному изображению.**
2. **Только сжатие/конвертация.**
3. **Крутая кривая UX** для не-разработчиков.
4. **Проект в режиме поддержки** (последний major: 2024).

---

## Photopea: Photoshop в браузере

**Лучше всего для**: PSD, многослойного композитинга, ретуши, цветокоррекции, дизайнеров с памятью Photoshop.

**Где Photopea выигрывает**:
1. **~90 % паритета с Photoshop** в браузере.
2. **Почти любой формат**: AI, EPS, SVG, RAW, XCF.
3. **Бесплатно с рекламой**; $5/мес без рекламы.

**Где Photopea проигрывает**:
1. **Полноценный редактор**: загрузка 3–5 с.
2. **Плотный UI**, на мобильном почти непригоден.
3. **Пакеты для обычных пользователей** через JS-скрипты.

---

## Руководство по выбору

| Сценарий | Лучший инструмент |
|---|---|
| Сжать скриншот для Slack | NanoImage или Squoosh |
| 5000 фото товаров в CI | TinyPNG API |
| Дизайнер экспортирует из PSD | Photopea |
| Ресайз → кроп → водяной знак за сессию | NanoImage |
| Сравнить AVIF vs WebP вручную | Squoosh |

---

## А инструменты ИИ?

Мы намеренно исключили «AI-генераторы» — для обработки уже имеющегося изображения они избыточны и часто требуют загрузки.

---

[**Попробовать NanoImage →**](https://nanoimage.net)

Подробные сравнения:
- [NanoImage vs TinyPNG](/blog/nanoimage-vs-tinypng/)
- [NanoImage vs Squoosh](/blog/nanoimage-vs-squoosh/)
- [NanoImage vs Photopea](/blog/nanoimage-vs-photopea/)`,
  },
}
