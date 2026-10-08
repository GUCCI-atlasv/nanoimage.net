import type { BlogPost } from '../data'

export type BlogLoc = Partial<Omit<BlogPost, 'slug' | 'date' | 'coverImage' | 'localizations'>>
export type BlogLocMap = Record<string, BlogLoc>

export const compressLocalizations: BlogLocMap = {
  'zh-CN': {
    category: '技巧',
    title: '如何压缩图片而不损失画质',
    excerpt: '学习如何压缩 JPG、PNG 和 WebP 图片，在保持视觉清晰的同时减小文件体积。',
    readTime: '8 分钟阅读',
    metaDescription: '学习如何压缩 JPG、PNG 和 WebP 图片而不损失明显画质。实用指南：更小的图片文件、更快的网站加载速度、更便捷的分享体验。',
    body: `过大的图片文件会拖慢网站加载、让邮件难以发送，还可能导致表单、电商平台和社交平台的图片上传失败。

好消息是，大多数图片都可以大幅缩小体积，同时几乎看不出画质差异。

本指南将介绍图片压缩的原理、JPG/PNG/WebP 格式选择，以及如何在保持清晰锐利的同时减小文件大小。

![原图与压缩后对比](/assets/blog/compress-images-comparison.png)

## 图片压缩是什么意思？

图片压缩就是减小图片文件的体积。更小的文件更容易上传、下载、分享、存储、通过邮件发送，也更适合用在网站、文档或 PDF 中。

压缩并不一定会让图片变丑。合理的压缩会去掉不必要的数据，在视觉上尽量接近原图。

## 为什么要压缩图片？

### 网站加载更快

大图是网页加载缓慢的常见原因之一。压缩图片能明显提升速度，尤其在手机或弱网环境下。

### 上传更轻松

很多网站对图片大小有限制。压缩有助于通过头像、商品图、证件照等上传审核。

### 邮件和消息更轻便

大附件可能被拦截或发送缓慢，压缩后分享更方便。

### 节省存储空间

截图、照片、商品图和设计素材积累多了，压缩能节省大量磁盘空间。

## 有损压缩 vs 无损压缩

### 有损压缩

有损压缩通过丢弃部分图像数据来减小体积。在合适的质量设置下，照片看起来几乎与原图一致，但文件小很多。

常用于：JPG、WebP、网站照片、社交媒体图片、商品图。

### 无损压缩

无损压缩在不损失可见细节的前提下减小体积，适合保留锐利边缘、文字、图标和透明区域。

常用于：PNG 图形、图标、截图、UI 图片、带文字的图片、透明图。

## JPG、PNG 还是 WebP：该选哪种格式？

选对格式是减小体积最简单的方法之一。

### 照片用 JPG

JPG 最适合照片和色彩丰富的复杂图像，如相机照片、商品图、旅行照、博客配图。JPG 不支持透明，不适合 Logo 或抠图。

### 图形和透明用 PNG

PNG 适合需要锐利边缘或透明背景的图片：Logo、图标、截图、UI 元素、带文字的图片。

### 网页图片用 WebP

WebP 是较新的格式，往往比 JPG 或 PNG 更小，同时保持较好画质，适合网站、博客和商品展示。

## 质量参数该设多少？

大多数压缩工具都提供质量滑块。数值越高细节越多、文件越大；越低文件越小，但可能出现模糊、噪点或色块。

推荐起点：

- **JPG：** 70–85
- **WebP：** 65–80
- **PNG：** 尽量使用无损或优化 PNG

日常图片通常不需要 100% 质量，**75–80** 往往与原图非常接近，却能节省大量空间。

## 如何压缩图片而不损失可见画质

### 1. 先选对格式

照片用 JPG 或 WebP；有透明、文字、图标或锐利图形时用 PNG 或 WebP。

### 2. 先缩小过大的尺寸

很多图片远超实际需要。手机照片可能有 4000px 宽，但文章里只显示 1200px。先调整尺寸再压缩，效果往往更明显。

### 3. 使用平衡的质量设置

不要把质量设得太低。从 75–80 开始预览，若仍清晰可再略降。

### 4. 对比压缩前后

下载前务必预览，留意模糊细节、色块、色带、文字发糊、边缘变虚等问题，出现则提高质量。

### 5. 不需要时移除元数据

图片可能包含相机型号、拍摄日期、位置等 EXIF 信息。移除可略微减小体积并保护隐私。

## 不同场景的最佳压缩设置

### 网站图片

- 格式：WebP 或 JPG
- 宽度：1200–2000px
- 质量：70–80
- 移除元数据：是

### 博客配图

- 格式：WebP
- 宽度：1200px
- 质量：75–80

### 商品照片

- 格式：WebP 或 JPG
- 宽度：1500–2000px
- 质量：80–85

### 邮件附件

- 格式：JPG
- 宽度：1000–1600px
- 质量：70–80

### 截图

- 格式：PNG 或 WebP
- 仅在必要时调整尺寸
- 文字需清晰时保持较高质量

## 常见压缩误区

### 透明图误用 JPG

JPG 不支持透明，透明 PNG 转 JPG 后背景可能变白或变黑。

### 反复压缩同一张 JPG

多次有损压缩会累积画质损失，尽量保留原图再压缩。

### 质量设得过低

过低会出现明显色块和发糊，应适当提高质量。

### 上传超大图却不调整尺寸

压缩有帮助，但先缩小尺寸往往更省空间。

## 用 NanoImage 压缩图片

NanoImage 让压缩变得简单，全程在浏览器中完成：

1. 打开 [**压缩图片**](/compress-image) 工具
2. 上传或拖放图片
3. 选择推荐、最小体积或高质量等预设
4. 选择输出格式：JPG、PNG 或 WebP
5. 调整质量滑块并预览
6. 下载压缩后的图片

多张图片可使用 [**批量压缩**](/batch-compress)，一次处理并打包为 ZIP 下载。

## 压缩后的图片会泄露隐私吗？

NanoImage 尽可能在浏览器本地处理图片，无需主动上传到服务器。适合压缩个人照片、截图或文档后再分享。

## 最后建议

图片压缩是在体积与画质之间找平衡。对大多数图片，最佳做法是：

1. 选对格式
2. 过大时先调整尺寸
3. 使用平衡的质量设置

## 立即体验

使用 NanoImage 免费在线压缩图片。

[**压缩图片**](/compress-image)：/compress-image

[**批量压缩**](/batch-compress)：/batch-compress

[**转换为 WebP**](/convert-to-webp)：/convert-to-webp`,
  },
  'zh-TW': {
    category: '技巧',
    title: '如何壓縮圖片而不損失畫質',
    excerpt: '學習如何壓縮 JPG、PNG 和 WebP 圖片，在保持視覺清晰的同時縮小檔案體積。',
    readTime: '8 分鐘閱讀',
    metaDescription: '學習如何壓縮 JPG、PNG 和 WebP 圖片而不損失明顯畫質。實用指南：更小的圖片檔案、更快的網站載入、更便捷的分享體驗。',
    body: `過大的圖片檔案會拖慢網站、讓郵件難以寄送，也可能導致表單、電商平台與社群平台上傳失敗。

好消息是，大多數圖片都能大幅縮小體積，同時幾乎看不出畫質差異。

本指南說明圖片壓縮原理、JPG/PNG/WebP 格式選擇，以及如何在保持清晰銳利的同時減少檔案大小。

![原圖與壓縮後對比](/assets/blog/compress-images-comparison.png)

## 圖片壓縮是什麼意思？

圖片壓縮就是減少檔案體積。較小的檔案更容易上傳、下載、分享、儲存、透過郵件寄送，也更適合用在網站、文件或 PDF。

壓縮不一定會讓圖片變醜。良好的壓縮會移除不必要資料，視覺上盡量接近原圖。

## 為什麼要壓縮圖片？

### 網站載入更快

大圖是網頁變慢的常見原因。壓縮能明顯提升速度，尤其在手機或慢速網路環境。

### 上傳更輕鬆

許多網站限制檔案大小。壓縮有助於通過大頭照、商品圖、證件照等上傳審核。

### 郵件與訊息更輕便

大型附件可能被攔截或寄送緩慢，壓縮後分享更方便。

### 節省儲存空間

截圖、照片、商品圖與設計素材累積多了，壓縮能節省大量磁碟空間。

## 有損壓縮 vs 無損壓縮

### 有損壓縮

有損壓縮透過捨棄部分影像資料來縮小體積。在合適品質下，照片看起來幾乎與原圖一致。

常用於：JPG、WebP、網站照片、社群圖片、商品圖。

### 無損壓縮

無損壓縮在不損失可見細節的前提下減少體積，適合保留銳利邊緣、文字、圖示與透明區域。

常用於：PNG 圖形、圖示、截圖、UI 圖片、含文字圖片、透明圖。

## JPG、PNG 還是 WebP：該選哪種格式？

### 照片用 JPG

JPG 最適合照片與色彩豐富的複雜圖像。不支援透明，不適合 Logo 或去背圖。

### 圖形與透明用 PNG

PNG 適合需要銳利邊緣或透明背景的圖片：Logo、圖示、截圖、UI 元素、含文字圖片。

### 網頁圖片用 WebP

WebP 往往比 JPG 或 PNG 更小，同時保持良好畫質，適合網站、部落格與商品展示。

## 品質參數該設多少？

推薦起點：

- **JPG：** 70–85
- **WebP：** 65–80
- **PNG：** 盡量使用無損或最佳化 PNG

日常圖片通常不需要 100% 品質，**75–80** 往往與原圖非常接近。

## 如何壓縮圖片而不損失可見畫質

### 1. 先選對格式

照片用 JPG 或 WebP；有透明、文字、圖示或銳利圖形時用 PNG 或 WebP。

### 2. 先縮小過大的尺寸

手機照片可能有 4000px 寬，文章卻只顯示 1200px。先調整尺寸再壓縮效果更明顯。

### 3. 使用平衡的品質設定

從 75–80 開始預覽，若仍清晰可再略降。

### 4. 對比壓縮前後

留意模糊、色塊、色帶、文字發糊等問題，出現則提高品質。

### 5. 不需要時移除中繼資料

圖片可能含相機型號、拍攝日期、位置等 EXIF。移除可略減體積並保護隱私。

## 不同場景的最佳壓縮設定

### 網站圖片

格式 WebP 或 JPG，寬度 1200–2000px，品質 70–80，移除中繼資料。

### 部落格配圖

格式 WebP，寬度 1200px，品質 75–80。

### 商品照片

格式 WebP 或 JPG，寬度 1500–2000px，品質 80–85。

### 郵件附件

格式 JPG，寬度 1000–1600px，品質 70–80。

### 截圖

格式 PNG 或 WebP，文字需清晰時保持較高品質。

## 常見壓縮誤區

透明圖誤用 JPG、反覆壓縮同一張 JPG、品質設過低、上傳超大圖卻不調整尺寸——都會影響結果。

## 用 NanoImage 壓縮圖片

1. 開啟 [**壓縮圖片**](/compress-image)
2. 上傳或拖放圖片
3. 選擇預設並調整品質
4. 預覽後下載

多張圖片可用 [**批次壓縮**](/batch-compress) 一次處理。

## 壓縮後的圖片會洩露隱私嗎？

NanoImage 盡可能在瀏覽器本機處理，無需主動上傳到伺服器。

## 最後建議

壓縮是在體積與畫質間找平衡：選對格式、過大時先調整尺寸、使用平衡品質。

## 立即體驗

[**壓縮圖片**](/compress-image)：/compress-image

[**批次壓縮**](/batch-compress)：/batch-compress

[**轉換為 WebP**](/convert-to-webp)：/convert-to-webp`,
  },
  ja: {
    category: 'ヒント',
    title: '画質を損なわずに画像を圧縮する方法',
    excerpt: 'JPG、PNG、WebP 画像を視覚的な品質を保ちながら圧縮する方法を解説します。',
    readTime: '8分で読めます',
    metaDescription: 'JPG、PNG、WebP 画像を目に見える画質を損なわずに圧縮する方法。ファイルサイズ削減、サイト高速化、共有のしやすさを実現する実践ガイド。',
    body: `大きな画像ファイルは Web サイトの表示を遅くし、メール送信を難しくし、フォームや EC サイト、SNS でのアップロードエラーの原因にもなります。

多くの画像は、見た目をほとんど変えずにかなり小さくできます。

このガイドでは、画像圧縮の仕組み、JPG/PNG/WebP の選び方、画質を保ったままファイルサイズを減らす方法を説明します。

![元画像と圧縮後の比較](/assets/blog/compress-images-comparison.png)

## 画像圧縮とは？

画像圧縮とは、ファイルサイズを小さくすることです。小さいファイルはアップロード、ダウンロード、共有、保存、メール送信、Web サイトや文書での利用が容易になります。

圧縮は必ずしも画質を悪くしません。適切な圧縮は不要なデータを取り除き、見た目を元画像に近づけます。

## なぜ画像を圧縮するのか？

### Web サイトの高速化

大きな画像はページ読み込みが遅い主な原因のひとつです。特にモバイルや低速回線で効果が大きいです。

### アップロードのしやすさ

多くのサイトはファイルサイズに制限があります。プロフィール写真、商品画像、書類などで圧縮が役立ちます。

### メール・メッセージの軽量化

大きな添付ファイルはブロックされたり送信に時間がかかったりします。

### ストレージの節約

スクリーンショット、写真、商品画像が増えると、圧縮でディスク容量を大幅に節約できます。

## 可逆圧縮と非可逆圧縮

### 非可逆（ロッシー）圧縮

一部の画像データを削除してサイズを減らします。適切な品質設定なら、写真はほぼ同じに見えながら大幅に小さくなります。

JPG、WebP、Web 写真、SNS 画像、商品写真に適しています。

### 可逆（ロスレス）圧縮

見た目のデータを失わずにサイズを減らします。エッジ、テキスト、アイコン、透明部分をきれいに保つ場合に有効です。

PNG グラフィック、アイコン、スクリーンショット、UI 画像、透明画像に適しています。

## JPG、PNG、WebP：どれを選ぶ？

### 写真には JPG

カメラ写真、商品写真、旅行写真、ブログ画像など、色が豊富な写真に最適。透明には非対応です。

### グラフィックと透明には PNG

ロゴ、アイコン、スクリーンショット、UI 要素、テキスト入り画像に最適。

### Web 向けには WebP

JPG や PNG より小さく、品質も良好なことが多い現代的な形式です。

## 品質設定はどれくらい？

- **JPG：** 70–85
- **WebP：** 65–80
- **PNG：** 可能ならロスレスまたは最適化 PNG

多くの日常画像では 100% は不要で、**75–80** で十分なことが多いです。

## 目に見える画質を損なわずに圧縮する手順

### 1. 適切な形式を選ぶ

写真は JPG または WebP。透明、テキスト、アイコンがある場合は PNG または WebP。

### 2. 大きすぎる画像は先にリサイズ

4000px 幅の写真を 1200px で表示するなら、先にリサイズしてから圧縮すると効果的です。

### 3. バランスの取れた品質設定

75–80 から始め、プレビューしながら調整します。

### 4. 圧縮前後を比較

ぼけ、ブロックノイズ、色のバンディング、文字のにじみに注意してください。

### 5. 不要ならメタデータを削除

EXIF にはカメラ情報や撮影日時が含まれることがあります。削除でサイズ削減とプライバシー保護に役立ちます。

## 用途別のおすすめ設定

### Web サイト画像

WebP または JPG、幅 1200–2000px、品質 70–80。

### ブログ画像

WebP、幅 1200px、品質 75–80。

### 商品写真

WebP または JPG、幅 1500–2000px、品質 80–85。

### メール添付

JPG、幅 1000–1600px、品質 70–80。

### スクリーンショット

PNG または WebP。文字の鮮明さが重要なら高品質を維持。

## よくある圧縮の失敗

透明画像を JPG にする、同じ JPG を何度も圧縮する、品質を下げすぎる、巨大なままアップロードする——これらは画質低下の原因です。

## NanoImage で画像を圧縮する

1. [**画像を圧縮**](/compress-image) を開く
2. 画像をアップロードまたはドラッグ＆ドロップ
3. プリセットと出力形式（JPG/PNG/WebP）を選択
4. 品質スライダーで調整しプレビュー
5. ダウンロード

複数ファイルは [**一括圧縮**](/batch-compress) で ZIP ダウンロード可能です。

## 圧縮した画像のプライバシーは？

NanoImage は可能な限りブラウザ内でローカル処理します。サーバーへ意図的にアップロードする必要はありません。

## まとめ

形式の選択、必要ならリサイズ、バランスの取れた品質設定——この 3 点で多くの画像は最適化できます。

## 今すぐ試す

[**画像を圧縮**](/compress-image)：/compress-image

[**一括圧縮**](/batch-compress)：/batch-compress

[**WebP に変換**](/convert-to-webp)：/convert-to-webp`,
  },
  ko: {
    category: '팁',
    title: '화질 손실 없이 이미지 압축하는 방법',
    excerpt: 'JPG, PNG, WebP 이미지를 시각적 품질을 유지하면서 압축하는 방법을 알아보세요.',
    readTime: '8분 읽기',
    metaDescription: 'JPG, PNG, WebP 이미지를 눈에 띄는 화질 손실 없이 압축하는 방법. 더 작은 파일, 더 빠른 웹사이트, 더 쉬운 공유를 위한 실용 가이드.',
    body: `큰 이미지 파일은 웹사이트를 느리게 만들고, 이메일 전송을 어렵게 하며, 양식·쇼핑몰·SNS 업로드 오류를 일으킬 수 있습니다.

다행히 대부분의 이미지는 눈에 띄게 나빠지지 않으면서 크게 줄일 수 있습니다.

이 가이드에서는 이미지 압축 원리, JPG/PNG/WebP 선택, 화질을 유지하며 파일 크기를 줄이는 방법을 설명합니다.

![원본과 압축 후 비교](/assets/blog/compress-images-comparison.png)

## 이미지 압축이란?

이미지 압축은 파일 크기를 줄이는 것입니다. 작은 파일은 업로드, 다운로드, 공유, 저장, 이메일 전송, 웹사이트·문서 사용이 더 쉽습니다.

압축이 항상 화질을 망치는 것은 아닙니다. 적절한 압축은 불필요한 데이터를 제거하면서 시각적으로 원본에 가깝게 유지합니다.

## 왜 이미지를 압축해야 하나요?

### 더 빠른 웹사이트

큰 이미지는 페이지 로딩이 느린 흔한 원인입니다. 모바일이나 느린 연결에서 특히 효과적입니다.

### 더 쉬운 업로드

많은 사이트가 파일 크기를 제한합니다. 프로필 사진, 상품 이미지, 서류 제출에 압축이 도움이 됩니다.

### 가벼운 이메일·메시지

큰 첨부 파일은 차단되거나 전송이 오래 걸릴 수 있습니다.

### 저장 공간 절약

스크린샷, 사진, 상품 이미지가 쌓이면 압축으로 디스크를 크게 절약할 수 있습니다.

## 손실 압축 vs 무손실 압축

### 손실 압축

일부 이미지 데이터를 제거해 크기를 줄입니다. 적절한 품질 설정이면 사진은 거의 동일해 보이면서 훨씬 작아집니다.

JPG, WebP, 웹 사진, SNS 이미지, 상품 사진에 적합합니다.

### 무손실 압축

눈에 보이는 데이터를 잃지 않고 크기를 줄입니다. 선명한 가장자리, 텍스트, 아이콘, 투명 영역에 유용합니다.

PNG 그래픽, 아이콘, 스크린샷, UI 이미지, 투명 이미지에 적합합니다.

## JPG, PNG, WebP 중 무엇을 선택할까?

### 사진에는 JPG

카메라 사진, 상품 사진, 여행 사진, 블로그 이미지에 최적. 투명 배경은 지원하지 않습니다.

### 그래픽·투명에는 PNG

로고, 아이콘, 스크린샷, UI 요소, 텍스트 포함 이미지에 적합합니다.

### 웹 이미지에는 WebP

JPG나 PNG보다 작으면서 품질도 좋은 경우가 많은 현대적 형식입니다.

## 품질 설정은 얼마나?

- **JPG:** 70–85
- **WebP:** 65–80
- **PNG:** 가능하면 무손실 또는 최적화 PNG

대부분의 일상 이미지는 100%가 필요 없으며 **75–80**이면 충분한 경우가 많습니다.

## 눈에 띄는 화질 손실 없이 압축하는 5단계

### 1. 올바른 형식 선택

사진은 JPG 또는 WebP. 투명, 텍스트, 아이콘이 있으면 PNG 또는 WebP.

### 2. 너무 큰 이미지는 먼저 리사이즈

4000px 너비 사진을 1200px로 표시한다면, 먼저 리사이즈 후 압축이 효과적입니다.

### 3. 균형 잡힌 품질 설정

75–80에서 시작해 미리보기하며 조정하세요.

### 4. 압축 전후 비교

흐림, 블록 노이즈, 색 띠, 글자 번짐에 주의하세요.

### 5. 필요 없으면 메타데이터 제거

EXIF에 카메라 정보, 촬영 일시가 포함될 수 있습니다.

## 용도별 권장 설정

웹사이트: WebP/JPG, 너비 1200–2000px, 품질 70–80. 블로그: WebP, 1200px, 75–80. 상품: WebP/JPG, 1500–2000px, 80–85. 이메일: JPG, 1000–1600px, 70–80. 스크린샷: PNG/WebP, 텍스트 선명도 유지.

## 흔한 압축 실수

투명 이미지에 JPG 사용, 같은 JPG 반복 압축, 품질 과도하게 낮춤, 거대한 이미지 그대로 업로드.

## NanoImage로 이미지 압축하기

1. [**이미지 압축**](/compress-image) 열기
2. 이미지 업로드 또는 드래그 앤 드롭
3. 프리셋·출력 형식(JPG/PNG/WebP) 선택
4. 품질 슬라이더 조정 후 미리보기
5. 다운로드

여러 파일은 [**일괄 압축**](/batch-compress)으로 ZIP 다운로드.

## 압축된 이미지의 프라이버시는?

NanoImage는 가능한 한 브라우저에서 로컬 처리합니다. 서버에 의도적으로 업로드할 필요가 없습니다.

## 마무리 팁

형식 선택, 필요 시 리사이즈, 균형 잡힌 품질——이 세 가지로 대부분 최적화됩니다.

## 지금 사용해 보기

[**이미지 압축**](/compress-image)：/compress-image

[**일괄 압축**](/batch-compress)：/batch-compress

[**WebP 변환**](/convert-to-webp)：/convert-to-webp`,
  },
  fr: {
    category: 'Conseils',
    title: 'Comment compresser des images sans perdre en qualité',
    excerpt: 'Apprenez à compresser des images JPG, PNG et WebP tout en conservant une qualité visuelle nette.',
    readTime: '8 min de lecture',
    metaDescription: 'Apprenez à compresser des images JPG, PNG et WebP sans perte visible de qualité. Guide pratique pour des fichiers plus légers, un site plus rapide et un partage facilité.',
    body: `Les fichiers image volumineux ralentissent les sites web, compliquent l'envoi d'e-mails et provoquent des erreurs d'upload sur les formulaires, marketplaces et réseaux sociaux.

La bonne nouvelle : la plupart des images peuvent être fortement réduites sans dégradation visible.

Ce guide explique le fonctionnement de la compression, le choix entre JPG, PNG et WebP, et comment réduire la taille tout en gardant des images nettes.

![Comparaison image originale et compressée](/assets/blog/compress-images-comparison.png)

## Qu'est-ce que la compression d'image ?

La compression d'image consiste à réduire la taille du fichier. Un fichier plus petit est plus facile à téléverser, télécharger, partager, stocker, envoyer par e-mail et utiliser sur un site ou dans un document.

Une bonne compression ne dégrade pas forcément l'image : elle supprime les données inutiles tout en restant visuellement proche de l'original.

## Pourquoi compresser des images ?

### Sites web plus rapides

Les grandes images sont une cause fréquente de lenteur. La compression améliore l'expérience, surtout sur mobile.

### Uploads plus simples

De nombreux sites limitent la taille des fichiers. La compression aide pour les photos de profil, produits ou documents.

### E-mails et messages plus légers

Les pièces jointes volumineuses peuvent être bloquées ou lentes à envoyer.

### Meilleur stockage

Screenshots, photos et visuels produits s'accumulent : la compression économise beaucoup d'espace disque.

## Compression avec perte vs sans perte

### Compression avec perte (lossy)

Réduit la taille en supprimant certaines données. À bon réglage, une photo peut paraître quasi identique tout en étant bien plus légère.

Utilisée pour JPG, WebP, photos web, réseaux sociaux, visuels produits.

### Compression sans perte (lossless)

Réduit la taille sans supprimer de détails visibles. Idéale pour les bords nets, textes, icônes et transparence.

Utilisée pour PNG, icônes, captures d'écran, UI, images avec texte.

## JPG, PNG ou WebP : quel format choisir ?

### JPG pour les photos

Idéal pour photos d'appareil, produits, voyages, articles de blog. Pas de transparence.

### PNG pour graphiques et transparence

Logos, icônes, captures, éléments UI, images avec texte.

### WebP pour le web

Format moderne souvent plus petit que JPG ou PNG avec une bonne qualité.

## Quel réglage de qualité choisir ?

- **JPG :** 70–85
- **WebP :** 65–80
- **PNG :** sans perte ou PNG optimisé si possible

Pour la plupart des usages, **75–80** suffit souvent sans perte visible.

## Comment compresser sans perte visible

### 1. Choisir le bon format

Photos : JPG ou WebP. Transparence, texte, icônes : PNG ou WebP.

### 2. Redimensionner les images trop grandes

Une photo de 4000 px affichée à 1200 px doit d'abord être redimensionnée.

### 3. Qualité équilibrée

Commencez à 75–80 et prévisualisez.

### 4. Comparer avant/après

Surveillez flou, blocs, bandes de couleur, texte illisible.

### 5. Supprimer les métadonnées si inutiles

EXIF peut contenir appareil, date, localisation.

## Meilleurs réglages par usage

Site web : WebP/JPG, 1200–2000 px, qualité 70–80. Blog : WebP, 1200 px, 75–80. Produits : WebP/JPG, 1500–2000 px, 80–85. E-mail : JPG, 1000–1600 px, 70–80. Captures : PNG/WebP, qualité élevée si texte net requis.

## Erreurs courantes

JPG pour images transparentes, recompression répétée du même JPG, qualité trop basse, upload d'images énormes sans redimensionnement.

## Compresser avec NanoImage

1. Ouvrez [**Compresser une image**](/compress-image)
2. Téléversez ou glissez-déposez
3. Choisissez un préréglage et le format (JPG/PNG/WebP)
4. Ajustez la qualité et prévisualisez
5. Téléchargez

Pour plusieurs fichiers : [**Compression par lot**](/batch-compress).

## Les images compressées restent-elles privées ?

NanoImage traite les images localement dans le navigateur quand c'est possible, sans upload intentionnel vers nos serveurs.

## Conseils finaux

Équilibrez taille et qualité : bon format, redimensionnement si nécessaire, qualité modérée.

## Essayer maintenant

[**Compresser une image**](/compress-image)：/compress-image

[**Compression par lot**](/batch-compress)：/batch-compress

[**Convertir en WebP**](/convert-to-webp)：/convert-to-webp`,
  },
  es: {
    category: 'Consejos',
    title: 'Cómo comprimir imágenes sin perder calidad',
    excerpt: 'Aprende a comprimir imágenes JPG, PNG y WebP manteniendo una calidad visual nítida.',
    readTime: '8 min de lectura',
    metaDescription: 'Aprende a comprimir imágenes JPG, PNG y WebP sin pérdida visible de calidad. Guía práctica para archivos más pequeños, sitios más rápidos y mejor compartición.',
    body: `Los archivos de imagen grandes ralentizan sitios web, dificultan el envío de correos y provocan errores al subir en formularios, marketplaces y redes sociales.

La buena noticia: la mayoría de imágenes pueden reducirse mucho sin verse notablemente peor.

Esta guía explica cómo funciona la compresión, cuándo usar JPG, PNG o WebP y cómo reducir el tamaño manteniendo nitidez.

![Comparación imagen original y comprimida](/assets/blog/compress-images-comparison.png)

## ¿Qué significa comprimir una imagen?

Comprimir una imagen significa reducir el tamaño del archivo. Un archivo más pequeño es más fácil de subir, descargar, compartir, almacenar, enviar por correo y usar en sitios web o documentos.

Una buena compresión no siempre empeora la imagen: elimina datos innecesarios manteniéndola visualmente cercana al original.

## ¿Por qué comprimir imágenes?

### Sitios web más rápidos

Las imágenes grandes son una causa frecuente de lentitud, especialmente en móvil.

### Subidas más fáciles

Muchos sitios limitan el tamaño. La compresión ayuda con fotos de perfil, productos y documentos.

### Correos y mensajes más ligeros

Los adjuntos grandes pueden bloquearse o tardar en enviarse.

### Mejor almacenamiento

Capturas, fotos y assets de producto ocupan mucho espacio con el tiempo.

## Compresión con pérdida vs sin pérdida

### Con pérdida (lossy)

Reduce el tamaño eliminando datos. Con el ajuste correcto, una foto puede verse casi igual siendo mucho más pequeña.

Para JPG, WebP, fotos web, redes sociales, productos.

### Sin pérdida (lossless)

Reduce sin eliminar detalles visibles. Ideal para bordes nítidos, texto, iconos y transparencia.

Para PNG, iconos, capturas, UI, imágenes con texto.

## JPG, PNG o WebP: ¿cuál elegir?

### JPG para fotos

Fotos de cámara, productos, viajes, blog. Sin transparencia.

### PNG para gráficos y transparencia

Logos, iconos, capturas, UI, imágenes con texto.

### WebP para la web

Formato moderno, a menudo más pequeño que JPG o PNG con buena calidad.

## ¿Qué ajuste de calidad elegir?

- **JPG:** 70–85
- **WebP:** 65–80
- **PNG:** sin pérdida u optimizado si es posible

Para la mayoría, **75–80** suele bastar sin pérdida visible.

## Cómo comprimir sin pérdida visible

### 1. Elegir el formato correcto

Fotos: JPG o WebP. Transparencia, texto, iconos: PNG o WebP.

### 2. Redimensionar imágenes sobredimensionadas

Una foto de 4000 px mostrada a 1200 px debe redimensionarse primero.

### 3. Calidad equilibrada

Empieza en 75–80 y previsualiza.

### 4. Comparar antes y después

Busca desenfoque, bloques, bandas de color, texto ilegible.

### 5. Eliminar metadatos si no los necesitas

EXIF puede incluir cámara, fecha y ubicación.

## Mejores ajustes por caso de uso

Web: WebP/JPG, 1200–2000 px, calidad 70–80. Blog: WebP, 1200 px, 75–80. Productos: WebP/JPG, 1500–2000 px, 80–85. Email: JPG, 1000–1600 px, 70–80. Capturas: PNG/WebP, alta calidad si el texto debe ser nítido.

## Errores comunes

JPG para imágenes transparentes, recomprimir el mismo JPG varias veces, calidad demasiado baja, subir imágenes enormes sin redimensionar.

## Comprimir con NanoImage

1. Abre [**Comprimir imagen**](/compress-image)
2. Sube o arrastra la imagen
3. Elige preset y formato (JPG/PNG/WebP)
4. Ajusta calidad y previsualiza
5. Descarga

Para varios archivos: [**Compresión por lotes**](/batch-compress).

## ¿Las imágenes comprimidas son privadas?

NanoImage procesa localmente en el navegador cuando es posible, sin subir intencionalmente a nuestros servidores.

## Consejos finales

Equilibra tamaño y calidad: formato correcto, redimensionar si es necesario, calidad moderada.

## Pruébalo ahora

[**Comprimir imagen**](/compress-image)：/compress-image

[**Compresión por lotes**](/batch-compress)：/batch-compress

[**Convertir a WebP**](/convert-to-webp)：/convert-to-webp`,
  },
  pt: {
    category: 'Dicas',
    title: 'Como comprimir imagens sem perder qualidade',
    excerpt: 'Aprenda a comprimir imagens JPG, PNG e WebP mantendo qualidade visual nítida.',
    readTime: '8 min de leitura',
    metaDescription: 'Aprenda a comprimir imagens JPG, PNG e WebP sem perda visível de qualidade. Guia prático para arquivos menores, sites mais rápidos e compartilhamento facilitado.',
    body: `Arquivos de imagem grandes deixam sites lentos, dificultam o envio de e-mails e causam erros de upload em formulários, marketplaces e redes sociais.

A boa notícia: a maioria das imagens pode ficar bem menor sem parecer visivelmente pior.

Este guia explica como funciona a compressão, quando usar JPG, PNG ou WebP e como reduzir o tamanho mantendo nitidez.

![Comparação imagem original e comprimida](/assets/blog/compress-images-comparison.png)

## O que significa comprimir uma imagem?

Comprimir uma imagem significa reduzir o tamanho do arquivo. Arquivos menores são mais fáceis de enviar, baixar, compartilhar, armazenar, anexar a e-mails e usar em sites ou documentos.

Uma boa compressão não necessariamente prejudica a imagem: remove dados desnecessários mantendo-a visualmente próxima do original.

## Por que comprimir imagens?

### Sites mais rápidos

Imagens grandes são uma causa comum de lentidão, especialmente no celular.

### Uploads mais fáceis

Muitos sites limitam o tamanho. A compressão ajuda com fotos de perfil, produtos e documentos.

### E-mails e mensagens mais leves

Anexos grandes podem ser bloqueados ou demorar para enviar.

### Melhor armazenamento

Capturas, fotos e assets de produto ocupam muito espaço com o tempo.

## Compressão com perda vs sem perda

### Com perda (lossy)

Reduz o tamanho removendo dados. Com ajuste correto, uma foto pode parecer quase igual sendo muito menor.

Para JPG, WebP, fotos web, redes sociais, produtos.

### Sem perda (lossless)

Reduz sem remover detalhes visíveis. Ideal para bordas nítidas, texto, ícones e transparência.

Para PNG, ícones, capturas, UI, imagens com texto.

## JPG, PNG ou WebP: qual escolher?

### JPG para fotos

Fotos de câmera, produtos, viagens, blog. Sem transparência.

### PNG para gráficos e transparência

Logos, ícones, capturas, UI, imagens com texto.

### WebP para a web

Formato moderno, muitas vezes menor que JPG ou PNG com boa qualidade.

## Qual ajuste de qualidade escolher?

- **JPG:** 70–85
- **WebP:** 65–80
- **PNG:** sem perda ou otimizado se possível

Para a maioria, **75–80** costuma bastar sem perda visível.

## Como comprimir sem perda visível

### 1. Escolher o formato certo

Fotos: JPG ou WebP. Transparência, texto, ícones: PNG ou WebP.

### 2. Redimensionar imagens grandes demais

Uma foto de 4000 px exibida a 1200 px deve ser redimensionada primeiro.

### 3. Qualidade equilibrada

Comece em 75–80 e visualize.

### 4. Comparar antes e depois

Procure desfoque, blocos, faixas de cor, texto ilegível.

### 5. Remover metadados se não precisar

EXIF pode incluir câmera, data e localização.

## Melhores ajustes por caso de uso

Web: WebP/JPG, 1200–2000 px, qualidade 70–80. Blog: WebP, 1200 px, 75–80. Produtos: WebP/JPG, 1500–2000 px, 80–85. E-mail: JPG, 1000–1600 px, 70–80. Capturas: PNG/WebP, alta qualidade se o texto precisa ser nítido.

## Erros comuns

JPG para imagens transparentes, recomprimir o mesmo JPG várias vezes, qualidade muito baixa, enviar imagens enormes sem redimensionar.

## Comprimir com NanoImage

1. Abra [**Comprimir imagem**](/compress-image)
2. Envie ou arraste a imagem
3. Escolha preset e formato (JPG/PNG/WebP)
4. Ajuste qualidade e visualize
5. Baixe

Para vários arquivos: [**Compressão em lote**](/batch-compress).

## As imagens comprimidas são privadas?

O NanoImage processa localmente no navegador quando possível, sem upload intencional aos nossos servidores.

## Dicas finais

Equilibre tamanho e qualidade: formato certo, redimensionar se necessário, qualidade moderada.

## Experimente agora

[**Comprimir imagem**](/compress-image)：/compress-image

[**Compressão em lote**](/batch-compress)：/batch-compress

[**Converter para WebP**](/convert-to-webp)：/convert-to-webp`,
  },
  ru: {
    category: 'Советы',
    title: 'Как сжать изображения без потери качества',
    excerpt: 'Узнайте, как сжимать JPG, PNG и WebP, сохраняя визуальную чёткость изображений.',
    readTime: '8 мин чтения',
    metaDescription: 'Узнайте, как сжимать JPG, PNG и WebP без заметной потери качества. Практическое руководство: меньшие файлы, быстрее сайт, удобнее делиться.',
    body: `Большие файлы изображений замедляют сайты, усложняют отправку писем и вызывают ошибки загрузки в формах, маркетплейсах и соцсетях.

Хорошая новость: большинство изображений можно сильно уменьшить без заметной потери качества.

В этом руководстве — как работает сжатие, когда выбирать JPG, PNG или WebP и как уменьшить размер, сохраняя чёткость.

![Сравнение оригинала и сжатого изображения](/assets/blog/compress-images-comparison.png)

## Что такое сжатие изображений?

Сжатие изображений — это уменьшение размера файла. Меньший файл проще загрузить, скачать, отправить, хранить, прикрепить к письму и использовать на сайте или в документе.

Хорошее сжатие не обязательно портит картинку: оно убирает лишние данные, оставаясь визуально близким к оригиналу.

## Зачем сжимать изображения?

### Быстрее загружается сайт

Крупные изображения — частая причина медленных страниц, особенно на мобильных.

### Проще загружать

Многие сайты ограничивают размер файла. Сжатие помогает с аватарами, товарами и документами.

### Легче письма и сообщения

Большие вложения могут блокироваться или долго отправляться.

### Экономия места

Скриншоты, фото и товарные изображения со временем занимают много диска.

## Сжатие с потерями и без потерь

### С потерями (lossy)

Уменьшает размер, удаляя часть данных. При правильных настройках фото выглядит почти как оригинал, но файл намного меньше.

Для JPG, WebP, веб-фото, соцсетей, товаров.

### Без потерь (lossless)

Уменьшает размер без удаления видимых деталей. Подходит для чётких краёв, текста, иконок и прозрачности.

Для PNG, иконок, скриншотов, UI, изображений с текстом.

## JPG, PNG или WebP: что выбрать?

### JPG для фотографий

Снимки с камеры, товары, путешествия, блог. Без прозрачности.

### PNG для графики и прозрачности

Логотипы, иконки, скриншоты, UI, изображения с текстом.

### WebP для веба

Современный формат, часто меньше JPG или PNG при хорошем качестве.

## Какой уровень качества выбрать?

- **JPG:** 70–85
- **WebP:** 65–80
- **PNG:** без потерь или оптимизированный PNG

Для большинства задач **75–80** достаточно без заметной потери.

## Как сжать без видимой потери качества

### 1. Выбрать правильный формат

Фото: JPG или WebP. Прозрачность, текст, иконки: PNG или WebP.

### 2. Сначала уменьшить слишком большие размеры

Фото 4000 px, показываемое в 1200 px, лучше сначала изменить по размеру.

### 3. Сбалансированное качество

Начните с 75–80 и просмотрите результат.

### 4. Сравнить до и после

Ищите размытие, блоки, полосы цвета, нечитаемый текст.

### 5. Удалить метаданные при необходимости

EXIF может содержать камеру, дату и геолокацию.

## Лучшие настройки по сценариям

Сайт: WebP/JPG, 1200–2000 px, качество 70–80. Блог: WebP, 1200 px, 75–80. Товары: WebP/JPG, 1500–2000 px, 80–85. Почта: JPG, 1000–1600 px, 70–80. Скриншоты: PNG/WebP, высокое качество для чёткого текста.

## Типичные ошибки

JPG для прозрачных изображений, повторное сжатие одного JPG, слишком низкое качество, загрузка огромных файлов без изменения размера.

## Сжатие в NanoImage

1. Откройте [**Сжать изображение**](/compress-image)
2. Загрузите или перетащите файл
3. Выберите пресет и формат (JPG/PNG/WebP)
4. Настройте качество и просмотрите
5. Скачайте

Для нескольких файлов: [**Пакетное сжатие**](/batch-compress).

## Остаются ли сжатые изображения приватными?

NanoImage по возможности обрабатывает изображения локально в браузере, без намеренной загрузки на серверы.

## Итоговые советы

Баланс размера и качества: правильный формат, изменение размера при необходимости, умеренное качество.

## Попробуйте сейчас

[**Сжать изображение**](/compress-image)：/compress-image

[**Пакетное сжатие**](/batch-compress)：/batch-compress

[**Конвертировать в WebP**](/convert-to-webp)：/convert-to-webp`,
  },
}
