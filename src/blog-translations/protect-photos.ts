import type { BlogPost } from '../data'

export type BlogLoc = Partial<Omit<BlogPost, 'slug' | 'date' | 'coverImage' | 'localizations'>>
export type BlogLocMap = Record<string, BlogLoc>

export const protectPhotosLocalizations: BlogLocMap = {
  'zh-CN': {
    category: '隐私',
    title: '分享前如何在线保护照片',
    excerpt: '学习在在线分享照片前，通过移除元数据、模糊敏感细节、像素化私密区域和添加水印来保护照片。',
    readTime: '7 分钟阅读',
    metaDescription: '分享前在线保护照片。在浏览器中移除 EXIF 元数据、模糊人脸或地址、像素化私密区域并添加水印。',
    body: `分享照片看似简单：上传、发送、发布。但照片可能包含肉眼看不到的信息。一张图可能显示人脸、车牌、地址、屏幕、文档、位置线索和隐藏的元数据。在发布或发送前，花一分钟保护本应私有的细节是值得的。

NanoImage 提供在浏览器中运行的专注隐私工具，包括移除 EXIF 元数据、模糊敏感区域、像素化信息和添加水印。

本指南介绍适合日常分享的实用照片保护流程。

## 保护照片是什么意思？

保护照片意味着降低暴露你本不想分享的信息的风险。这些信息可能可见于图像本身，也可能隐藏在文件内部。

可见的敏感细节可能包括：

- 人脸
- 车牌
- 家庭地址
- 身份证号
- 电子邮箱
- 电话号码
- 屏幕和文档
- 孩子的学校名称
- 位置标识或徽章

隐藏的细节可能包括元数据，如相机信息、拍摄时间、编辑软件，有时还有位置数据，取决于设备和设置。

## 步骤 1：移除 EXIF 元数据

EXIF 元数据是存储在图片文件内的信息，可能包含相机型号、日期、时间、镜头设置，有时还有 GPS 位置。并非每张图都含敏感元数据，但若公开分享个人照片，移除元数据是安全习惯。

在向博客、电商平台、论坛、作品集或公开社交平台上传个人照片前，使用 NanoImage 的 [移除 EXIF](/remove-exif) 工具。

## 步骤 2：模糊人脸、车牌、地址和文字

有些信息是可见的，需要手动隐藏。模糊适合在保持整体画面可理解的同时遮盖细节。

在需要隐藏以下内容时使用模糊：

- 合影中的人脸
- 街景照片中的车牌
- 文档上的姓名和地址
- 截图中的私信或邮件
- 账号、票据、标签或收据
- 儿童面部或学校标识

NanoImage 的 [模糊图片](/blur-image) 工具可模糊照片的选定区域，使敏感细节不易辨认。

## 步骤 3：需要更强遮挡时使用像素化

模糊有时效果很好，但对某些细节你可能更偏好像素化。像素化使区域明显被遮挡，适合公开截图、安全报告以及希望观众知道某处被刻意隐藏的图片。

在以下情况使用像素化：

- 车牌
- 公开照片中的人脸
- 身份证件
- 支付信息
- 截图上的敏感文字
- 用户名或内部仪表盘

当你希望比柔和模糊更强的隐私效果时，NanoImage 的 [像素化图片](/pixelate-image) 工具很有帮助。

## 步骤 4：发布前添加水印

水印有助于标明所有权、抑制随意转载，或将视觉内容标为预览。它不能提供完美保护，但对摄影师、创作者、卖家和在线发布图片的团队很有用。

在以下情况使用水印：

- 分享作品集图片
- 发布商品预览
- 发布客户样稿
- 希望用品牌或用户名标注图片
- 希望抑制随意复制

NanoImage 的 [水印](/watermark) 工具可在分享前添加文字或 Logo 水印。

## 分享前的简单隐私清单

发布或发送图片前，问自己：

1. **图片是否显示人脸、地址、车牌、文档或私密屏幕？**
2. **背景是否可能暴露位置？**
3. **文件是否含有应移除的元数据？**
4. **是否应隐藏某人、儿童、客户或同事？**
5. **发布前是否需要水印？**
6. **编辑后的最终文件是否更小、更干净？**

若任一问题答案是「是」，分享前请使用隐私工具。

## 为什么基于浏览器的工具对隐私很重要

使用在线图片工具时，问清楚图片在哪里处理是合理的。有些工具会把文件上传到服务器处理。NanoImage 围绕常见图片任务的浏览器工作流设计，有助于保持流程简单且注重隐私。

处理个人照片、截图、文档、商品预览或内部图片时尤其重要。注重隐私的流程应尽可能避免不必要的上传。

访问 [隐私与保护](/tools/privacy-protection) 查看 NanoImage 完整隐私工具集。

## 常见照片分享场景

### 分享街景照片

模糊或像素化人脸和车牌。公开发布前移除 EXIF 元数据。

推荐工具：

- [模糊图片](/blur-image)
- [像素化图片](/pixelate-image)
- [移除 EXIF](/remove-exif)

### 分享截图

隐藏用户名、邮箱、私信、账号和内部 URL。

推荐工具：

- [模糊图片](/blur-image)
- [像素化图片](/pixelate-image)

### 发布商品预览

若希望将图片标为预览或抑制随意复制，可添加水印。

推荐工具：

- [水印](/watermark)
- [压缩图片](/compress-image)

### 发布个人旅行照片

检查可见位置线索，公开分享前移除隐藏元数据。

推荐工具：

- [移除 EXIF](/remove-exif)
- [模糊图片](/blur-image)

## 常见问题

### 什么是 EXIF 元数据？

EXIF 元数据是存储在部分图片文件内的信息，可能包含相机设置、日期时间、设备详情，有时还有位置数据，取决于来源图片。

### 分享照片前应移除 EXIF 吗？

若公开分享个人照片，移除 EXIF 元数据是好的隐私习惯，可减少不必随图片传播的隐藏信息。

### 模糊比像素化更好吗？

两者都有助于隐藏敏感信息。模糊更柔和，往往更自然。像素化更明显，当你希望更强的视觉遮挡时很有用。

### 水印能防止盗图吗？

水印可抑制随意转载并表明所有权，但不是完美保护手段，最好作为更广泛分享流程的一部分。

## 最后建议

分享照片前，检查可见内容和文件中可能隐藏的内容。移除元数据，模糊或像素化敏感区域，在所有权重要时添加水印。

从 [隐私与保护](/tools/privacy-protection) 开始，或直接前往 [移除 EXIF](/remove-exif)、[模糊图片](/blur-image)、[像素化图片](/pixelate-image) 和 [水印](/watermark)。`,
  },
  'zh-TW': {
    category: '隱私',
    title: '分享前如何線上保護照片',
    excerpt: '學習在線上分享照片前，透過移除中繼資料、模糊敏感細節、像素化私密區域和新增浮水印來保護照片。',
    readTime: '7 分鐘閱讀',
    metaDescription: '分享前線上保護照片。在瀏覽器中移除 EXIF 中繼資料、模糊人臉或地址、像素化私密區域並新增浮水印。',
    body: `分享照片看似簡單：上傳、傳送、發布。但照片可能包含肉眼看不到的資訊。一張圖可能顯示人臉、車牌、地址、螢幕、文件、位置線索和隱藏的中繼資料。在發布或傳送前，花一點時間保護本應私有的細節是值得的。

NanoImage 提供在瀏覽器中執行的專注隱私工具，包括移除 EXIF 中繼資料、模糊敏感區域、像素化資訊和新增浮水印。

本指南介紹適合日常分享的實用照片保護流程。

## 保護照片是什麼意思？

保護照片意味著降低暴露你本不想分享的資訊的風險。這些資訊可能可見於影像本身，也可能隱藏在檔案內部。

可見的敏感細節可能包括：

- 人臉
- 車牌
- 家庭地址
- 身分證號
- 電子郵件
- 電話號碼
- 螢幕和文件
- 孩子的學校名稱
- 位置標示或徽章

隱藏的細節可能包括中繼資料，如相機資訊、拍攝時間、編輯軟體，有時還有位置資料，取決於裝置和設定。

## 步驟 1：移除 EXIF 中繼資料

EXIF 中繼資料是儲存在圖片檔案內的資訊，可能包含相機型號、日期、時間、鏡頭設定，有時還有 GPS 位置。並非每張圖都含敏感中繼資料，但若公開分享個人照片，移除中繼資料是安全習慣。

在向部落格、電商平台、論壇、作品集或公開社群平台上傳個人照片前，使用 NanoImage 的 [移除 EXIF](/remove-exif) 工具。

## 步驟 2：模糊人臉、車牌、地址和文字

有些資訊是可見的，需要手動隱藏。模糊適合在保持整體畫面可理解的同時遮蓋細節。

在需要隱藏以下內容時使用模糊：

- 合影中的人臉
- 街景照片中的車牌
- 文件上的姓名和地址
- 截圖中的私訊或郵件
- 帳號、票據、標籤或收據
- 兒童面部或學校標識

NanoImage 的 [模糊圖片](/blur-image) 工具可模糊照片的選定區域，使敏感細節不易辨認。

## 步驟 3：需要更強遮擋時使用像素化

模糊有時效果很好，但對某些細節你可能更偏好像素化。像素化使區域明顯被遮擋，適合公開截圖、安全報告以及希望觀眾知道某處被刻意隱藏的圖片。

在以下情況使用像素化：

- 車牌
- 公開照片中的人臉
- 身分證件
- 付款資訊
- 截圖上的敏感文字
- 使用者名稱或內部儀表板

當你希望比柔和模糊更強的隱私效果時，NanoImage 的 [像素化圖片](/pixelate-image) 工具很有幫助。

## 步驟 4：發布前新增浮水印

浮水印有助於標明所有權、抑制隨意轉載，或將視覺內容標為預覽。它不能提供完美保護，但對攝影師、創作者、賣家和線上發布圖片的團隊很有用。

在以下情況使用浮水印：

- 分享作品集圖片
- 發布商品預覽
- 發布客戶樣稿
- 希望用品牌或使用者名稱標註圖片
- 希望抑制隨意複製

NanoImage 的 [浮水印](/watermark) 工具可在分享前新增文字或 Logo 浮水印。

## 分享前的簡單隱私清單

發布或傳送圖片前，問自己：

1. **圖片是否顯示人臉、地址、車牌、文件或私密螢幕？**
2. **背景是否可能暴露位置？**
3. **檔案是否含有應移除的中繼資料？**
4. **是否應隱藏某人、兒童、客戶或同事？**
5. **發布前是否需要浮水印？**
6. **編輯後的最終檔案是否更小、更乾淨？**

若任一問題答案是「是」，分享前請使用隱私工具。

## 為什麼基於瀏覽器的工具對隱私很重要

使用線上圖片工具時，問清楚圖片在哪裡處理是合理的。有些工具會把檔案上傳到伺服器處理。NanoImage 圍繞常見圖片任務的瀏覽器工作流設計，有助於保持流程簡單且注重隱私。

處理個人照片、截圖、文件、商品預覽或內部圖片時尤其重要。注重隱私的流程應盡可能避免不必要的上傳。

造訪 [隱私與保護](/tools/privacy-protection) 查看 NanoImage 完整隱私工具集。

## 常見照片分享場景

### 分享街景照片

模糊或像素化人臉和車牌。公開發布前移除 EXIF 中繼資料。

建議工具：

- [模糊圖片](/blur-image)
- [像素化圖片](/pixelate-image)
- [移除 EXIF](/remove-exif)

### 分享截圖

隱藏使用者名稱、郵件、私訊、帳號和內部 URL。

建議工具：

- [模糊圖片](/blur-image)
- [像素化圖片](/pixelate-image)

### 發布商品預覽

若希望將圖片標為預覽或抑制隨意複製，可新增浮水印。

建議工具：

- [浮水印](/watermark)
- [壓縮圖片](/compress-image)

### 發布個人旅行照片

檢查可見位置線索，公開分享前移除隱藏中繼資料。

建議工具：

- [移除 EXIF](/remove-exif)
- [模糊圖片](/blur-image)

## 常見問題

### 什麼是 EXIF 中繼資料？

EXIF 中繼資料是儲存在部分圖片檔案內的資訊，可能包含相機設定、日期時間、裝置詳情，有時還有位置資料，取決於來源圖片。

### 分享照片前應移除 EXIF 嗎？

若公開分享個人照片，移除 EXIF 中繼資料是好的隱私習慣，可減少不必隨圖片傳播的隱藏資訊。

### 模糊比像素化更好嗎？

兩者都有助於隱藏敏感資訊。模糊更柔和，往往更自然。像素化更明顯，當你希望更強的視覺遮擋時很有用。

### 浮水印能防止盜圖嗎？

浮水印可抑制隨意轉載並表明所有權，但不是完美保護手段，最好作為更廣泛分享流程的一部分。

## 最後建議

分享照片前，檢查可見內容和檔案中可能隱藏的內容。移除中繼資料，模糊或像素化敏感區域，在所有權重要時新增浮水印。

從 [隱私與保護](/tools/privacy-protection) 開始，或直接前往 [移除 EXIF](/remove-exif)、[模糊圖片](/blur-image)、[像素化圖片](/pixelate-image) 和 [浮水印](/watermark)。`,
  },
  ja: {
    category: 'プライバシー',
    title: '共有する前にオンラインで写真を保護する方法',
    excerpt: 'メタデータの削除、機密部分のぼかし、プライベート領域のピクセル化、透かしの追加で、オンライン共有前に写真を保護する方法を学びます。',
    readTime: '7分で読めます',
    metaDescription: '共有前にオンラインで写真を保護。ブラウザで EXIF メタデータを削除し、顔や住所をぼかし、プライベート領域をピクセル化し、透かしを追加します。',
    body: `写真の共有は簡単に感じます：アップロード、送信、投稿。しかし写真には目に見えない情報が含まれることがあります。顔、ナンバープレート、住所、画面、書類、位置の手がかり、隠れたメタデータが写っている場合があります。公開や送信の前に、プライベートにすべき詳細を保護する時間を取る価値があります。

NanoImage はブラウザで動作するプライバシー向けツールを提供しています。EXIF メタデータの削除、機密領域のぼかし、ピクセル化、透かしの追加などです。

このガイドでは、日常の共有向けの実用的な写真保護ワークフローを説明します。

## 写真を保護するとは？

写真を保護するとは、意図せず共有してしまう情報を露出するリスクを減らすことです。その情報は画像自体に見える場合も、ファイル内に隠れている場合もあります。

見える機密情報には次が含まれます：

- 顔
- ナンバープレート
- 自宅住所
- 身分証番号
- メールアドレス
- 電話番号
- 画面と書類
- 子どもの学校名
- 位置の看板やバッジ

隠れた情報には、カメラ情報、撮影日時、編集ソフト、場合によっては位置データなどのメタデータが含まれます。

## ステップ 1：EXIF メタデータを削除

EXIF メタデータは画像ファイル内に保存された情報です。カメラモデル、日付、時刻、レンズ設定、場合によっては GPS 位置が含まれることがあります。すべての画像に機密メタデータがあるわけではありませんが、個人写真を公開共有するなら削除は安全な習慣です。

ブログ、マーケットプレイス、フォーラム、ポートフォリオ、公開 SNS に個人写真をアップロードする前に、NanoImage の [EXIF を削除](/remove-exif) を使います。

## ステップ 2：顔、プレート、住所、テキストをぼかす

見える情報は手動で隠す必要があります。ぼかしは、全体の画像を理解可能に保ちながら詳細を隠すのに適しています。

次を隠す必要があるときにぼかしを使います：

- 集合写真の顔
- 街の写真のナンバープレート
- 書類の氏名と住所
- スクリーンショットのプライベートメッセージやメール
- 口座番号、チケット、ラベル、レシート
- 子どもの顔や学校の識別情報

NanoImage の [画像をぼかす](/blur-image) で選択領域をぼかし、機密詳細を読みにくくできます。

## ステップ 3：より強いマスクが必要ならピクセル化

ぼかしは有効ですが、特定の詳細にはピクセル化の方が適する場合があります。ピクセル化は領域が明らかにブロックされているように見せ、公開スクリーンショット、安全報告、意図的に隠したことを示したい画像に有用です。

次の場合にピクセル化：

- ナンバープレート
- 公開写真の顔
- 身分証明書
- 支払い情報
- スクリーンショットの機密テキスト
- ユーザー名や内部ダッシュボード

ソフトなぼかしより強いプライバシー効果が欲しいときは、NanoImage の [画像をピクセル化](/pixelate-image) が役立ちます。

## ステップ 4：公開前に透かしを追加

透かしは所有権の明示、気軽な再利用の抑止、プレビューとしてのラベル付けに役立ちます。完璧な保護ではありませんが、写真家、クリエイター、販売者、オンラインで画像を公開するチームに有用です。

次の場合に透かしを使います：

- ポートフォリオ画像の共有
- 商品プレビューの投稿
- クライアント校了の公開
- ブランドやユーザー名で画像にラベル
- 気軽なコピーの抑止

NanoImage の [透かし](/watermark) で、共有前にテキストやロゴの透かしを追加できます。

## 共有前のシンプルなプライバシーチェックリスト

投稿や送信前に次を確認：

1. **顔、住所、プレート、書類、プライベート画面が写っているか？**
2. **背景が位置を示す可能性は？**
3. **削除すべきメタデータがファイルに含まれるか？**
4. **人物、子ども、顧客、同僚を隠すべきか？**
5. **公開前に透かしが必要か？**
6. **編集後の最終ファイルは小さくクリーンか？**

いずれかが「はい」なら、共有前にプライバシーツールを使います。

## ブラウザベースのツールがプライバシーに重要な理由

オンライン画像ツールを使うとき、どこで処理されるかを確認するのは当然です。サーバーにアップロードして処理するツールもあります。NanoImage は一般的な画像タスクをブラウザ中心のワークフローで設計し、シンプルでプライバシーに配慮したプロセスを目指しています。

個人写真、スクリーンショット、書類、商品プレビュー、社内画像を扱うときに特に重要です。プライバシー重視のワークフローは、不要なアップロードを避けるべきです。

[プライバシーと保護](/tools/privacy-protection) で NanoImage のプライバシーツール一式をご覧ください。

## よくある写真共有シナリオ

### 街の写真を共有

顔とナンバープレートをぼかすかピクセル化。公開前に EXIF を削除。

推奨ツール：

- [画像をぼかす](/blur-image)
- [画像をピクセル化](/pixelate-image)
- [EXIF を削除](/remove-exif)

### スクリーンショットを共有

ユーザー名、メール、プライベートメッセージ、口座番号、内部 URL を隠す。

推奨ツール：

- [画像をぼかす](/blur-image)
- [画像をピクセル化](/pixelate-image)

### 商品プレビューを公開

プレビューとしてラベル付けや気軽なコピー抑止に透かしを追加。

推奨ツール：

- [透かし](/watermark)
- [画像を圧縮](/compress-image)

### 個人の旅行写真を投稿

見える位置の手がかりを確認し、公開前に隠れたメタデータを削除。

推奨ツール：

- [EXIF を削除](/remove-exif)
- [画像をぼかす](/blur-image)

## よくある質問

### EXIF メタデータとは？

EXIF メタデータは一部の画像ファイル内に保存された情報です。カメラ設定、日時、デバイス詳細、場合によっては位置データが含まれることがあります。

### 共有前に EXIF を削除すべき？

個人写真を公開共有するなら、EXIF 削除は良いプライバシー習慣です。画像と一緒に送る必要のない隠れた情報を減らします。

### ぼかしとピクセル化、どちらが良い？

どちらも機密情報の隠蔽に役立ちます。ぼかしは柔らかく自然に見えることが多いです。ピクセル化はより明確で、強い視覚的マスクが欲しいときに有用です。

### 透かしは画像盗用を防げる？

透かしは気軽な再利用を抑止し所有権を示せますが、完璧な保護ではありません。より広い共有ワークフローの一部として使うのが最善です。

## まとめ

共有前に、見える内容とファイルに隠れている可能性のある内容の両方を確認してください。メタデータを削除し、機密領域をぼかすかピクセル化し、所有権が重要なら透かしを追加します。

[プライバシーと保護](/tools/privacy-protection) から始めるか、直接 [EXIF を削除](/remove-exif)、[画像をぼかす](/blur-image)、[画像をピクセル化](/pixelate-image)、[透かし](/watermark) へ。`,
  },
  ko: {
    category: '개인정보',
    title: '공유하기 전에 온라인에서 사진을 보호하는 방법',
    excerpt: '메타데이터 제거, 민감한 세부 정보 흐리게 하기, 사적 영역 픽셀화, 워터마크 추가로 온라인 공유 전 사진을 보호하는 방법을 알아보세요.',
    readTime: '7분 읽기',
    metaDescription: '공유 전 온라인에서 사진을 보호하세요. 브라우저에서 EXIF 메타데이터 제거, 얼굴·주소 흐리게, 사적 영역 픽셀화, 워터마크 추가.',
    body: `사진 공유는 간단해 보입니다: 업로드, 보내기, 게시. 하지만 사진에는 눈에 보이지 않는 정보가 담길 수 있습니다. 얼굴, 번호판, 주소, 화면, 문서, 위치 단서, 숨겨진 메타데이터가 보일 수 있습니다. 게시하거나 보내기 전에 비공개로 남겨야 할 세부 정보를 보호할 시간을 들일 가치가 있습니다.

NanoImage는 브라우저에서 실행되는 프라이버시 도구를 제공합니다. EXIF 메타데이터 제거, 민감 영역 흐리게, 픽셀화, 워터마크 추가 등입니다.

이 가이드는 일상 공유를 위한 실용적인 사진 보호 워크플로를 설명합니다.

## 사진을 보호한다는 것은?

사진 보호는 의도하지 않게 공유할 정보가 노출될 위험을 줄이는 것입니다. 그 정보는 이미지 자체에 보이거나 파일 안에 숨겨져 있을 수 있습니다.

보이는 민감 정보에는 다음이 포함될 수 있습니다:

- 얼굴
- 번호판
- 집 주소
- 신분증 번호
- 이메일 주소
- 전화번호
- 화면과 문서
- 아이의 학교 이름
- 위치 표지판이나 배지

숨겨진 정보에는 카메라 정보, 촬영 시간, 편집 소프트웨어, 경우에 따라 위치 데이터 등 메타데이터가 포함될 수 있습니다.

## 1단계: EXIF 메타데이터 제거

EXIF 메타데이터는 이미지 파일 안에 저장된 정보입니다. 카메라 모델, 날짜, 시간, 렌즈 설정, 경우에 따라 GPS 위치가 포함될 수 있습니다. 모든 이미지에 민감 메타데이터가 있는 것은 아니지만, 개인 사진을 공개 공유한다면 제거는 안전한 습관입니다.

블로그, 마켓플레이스, 포럼, 포트폴리오, 공개 SNS에 개인 사진을 올리기 전에 NanoImage의 [EXIF 제거](/remove-exif)를 사용하세요.

## 2단계: 얼굴, 번호판, 주소, 텍스트 흐리게

일부 정보는 보이므로 수동으로 숨겨야 합니다. 흐리게 하기는 전체 이미지를 이해 가능하게 유지하면서 세부를 가리는 데 유용합니다.

다음을 숨겨야 할 때 흐리게 하기를 사용하세요:

- 단체 사진의 얼굴
- 거리 사진의 번호판
- 문서의 이름과 주소
- 스크린샷의 개인 메시지나 이메일
- 계좌번호, 티켓, 라벨, 영수증
- 아이 얼굴이나 학교 식별 정보

NanoImage의 [이미지 흐리게](/blur-image)로 선택 영역을 흐리게 해 민감 세부를 읽기 어렵게 할 수 있습니다.

## 3단계: 더 강한 마스크가 필요하면 픽셀화

흐리게 하기도 효과적이지만, 특정 세부에는 픽셀화가 더 나을 수 있습니다. 픽셀화는 영역이 명확히 차단된 것처럼 보이게 해 공개 스크린샷, 안전 보고, 의도적으로 숨겼음을 보여주고 싶을 때 유용합니다.

다음에 픽셀화를 사용하세요:

- 번호판
- 공개 사진의 얼굴
- 신분증
- 결제 정보
- 스크린샷의 민감 텍스트
- 사용자명이나 내부 대시보드

부드러운 흐림보다 강한 프라이버시 효과를 원하면 NanoImage의 [이미지 픽셀화](/pixelate-image)가 도움이 됩니다.

## 4단계: 게시 전 워터마크 추가

워터마크는 소유권 표시, 가벼운 재사용 억제, 미리보기 라벨에 도움이 됩니다. 완벽한 보호는 아니지만 사진가, 크리에이터, 판매자, 온라인 이미지 게시 팀에 유용합니다.

다음에 워터마크를 사용하세요:

- 포트폴리오 이미지 공유
- 상품 미리보기 게시
- 클라이언트 교정본 공개
- 브랜드나 사용자명으로 이미지 라벨
- 가벼운 복사 억제

NanoImage의 [워터마크](/watermark)로 공유 전 텍스트나 로고 워터마크를 추가할 수 있습니다.

## 공유 전 간단한 프라이버시 체크리스트

게시하거나 보내기 전에 다음을 확인하세요:

1. **얼굴, 주소, 번호판, 문서, 개인 화면이 보이나?**
2. **배경이 위치를 드러낼 수 있나?**
3. **제거해야 할 메타데이터가 파일에 있나?**
4. **사람, 아이, 고객, 동료를 숨겨야 하나?**
5. **게시 전 워터마크가 필요한가?**
6. **편집 후 최종 파일이 더 작고 깔끔한가?**

하나라도 예라면 공유 전 프라이버시 도구를 사용하세요.

## 브라우저 기반 도구가 프라이버시에 중요한 이유

온라인 이미지 도구를 쓸 때 어디서 처리되는지 묻는 것은 당연합니다. 일부 도구는 서버에 업로드해 처리합니다. NanoImage는 일반 이미지 작업을 브라우저 중심 워크플로로 설계해 단순하고 프라이버시 친화적인 과정을 돕습니다.

개인 사진, 스크린샷, 문서, 상품 미리보기, 내부 이미지 작업 시 특히 중요합니다. 프라이버시 우선 워크플로는 불필요한 업로드를 피해야 합니다.

[프라이버시 및 보호](/tools/privacy-protection)에서 NanoImage 프라이버시 도구 전체를 확인하세요.

## 흔한 사진 공유 시나리오

### 거리 사진 공유

얼굴과 번호판을 흐리게 하거나 픽셀화. 공개 게시 전 EXIF 제거.

권장 도구:

- [이미지 흐리게](/blur-image)
- [이미지 픽셀화](/pixelate-image)
- [EXIF 제거](/remove-exif)

### 스크린샷 공유

사용자명, 이메일, 개인 메시지, 계좌번호, 내부 URL 숨기기.

권장 도구:

- [이미지 흐리게](/blur-image)
- [이미지 픽셀화](/pixelate-image)

### 상품 미리보기 게시

미리보기 라벨이나 가벼운 복사 억제를 위해 워터마크 추가.

권장 도구:

- [워터마크](/watermark)
- [이미지 압축](/compress-image)

### 개인 여행 사진 게시

보이는 위치 단서 확인, 공개 공유 전 숨겨진 메타데이터 제거.

권장 도구:

- [EXIF 제거](/remove-exif)
- [이미지 흐리게](/blur-image)

## FAQ

### EXIF 메타데이터란?

EXIF 메타데이터는 일부 이미지 파일 안에 저장된 정보입니다. 카메라 설정, 날짜·시간, 기기 정보, 경우에 따라 위치 데이터가 포함될 수 있습니다.

### 공유 전 EXIF를 제거해야 하나?

개인 사진을 공개 공유한다면 EXIF 제거는 좋은 프라이버시 습관입니다. 이미지와 함께 갈 필요 없는 숨겨진 정보를 줄입니다.

### 흐리게가 픽셀화보다 나은가?

둘 다 민감 정보 숨기에 도움이 됩니다. 흐리게는 더 부드럽고 자연스러워 보이는 경우가 많습니다. 픽셀화는 더 분명해 강한 시각적 마스크가 필요할 때 유용합니다.

### 워터마크가 이미지 도용을 막나?

워터마크는 가벼운 재사용을 억제하고 소유권을 보여줄 수 있지만 완벽한 보호는 아닙니다. 더 넓은 공유 워크플로의 일부로 쓰는 것이 좋습니다.

## 마무리

공유 전에 보이는 것과 파일에 숨겨질 수 있는 것을 모두 확인하세요. 메타데이터를 제거하고, 민감 영역을 흐리게 하거나 픽셀화하고, 소유권이 중요하면 워터마크를 추가하세요.

[프라이버시 및 보호](/tools/privacy-protection)에서 시작하거나 [EXIF 제거](/remove-exif), [이미지 흐리게](/blur-image), [이미지 픽셀화](/pixelate-image), [워터마크](/watermark)로 바로 이동하세요.`,
  },
  fr: {
    category: 'Confidentialité',
    title: 'Comment protéger vos photos en ligne avant de les partager',
    excerpt: 'Apprenez à protéger vos photos avant de les partager en ligne en supprimant les métadonnées, en floutant les détails sensibles, en pixélisant les zones privées et en ajoutant des filigranes.',
    readTime: '7 min de lecture',
    metaDescription: 'Protégez vos photos en ligne avant de les partager. Supprimez les métadonnées EXIF, floutez visages ou adresses, pixélisez les zones privées et ajoutez des filigranes dans votre navigateur.',
    body: `Partager une photo peut sembler simple : la téléverser, l'envoyer, la publier. Mais les photos peuvent contenir plus d'informations que ce que vous voyez. Une image peut montrer des visages, des plaques d'immatriculation, des adresses, des écrans, des documents, des indices de localisation et des métadonnées cachées. Avant de publier ou d'envoyer une image, il vaut la peine de prendre une minute pour protéger les détails qui doivent rester privés.

NanoImage propose des outils de confidentialité ciblés qui s'exécutent dans votre navigateur, notamment pour supprimer les métadonnées EXIF, flouter les zones sensibles, pixéliser des informations et ajouter des filigranes.

Ce guide explique un workflow pratique de protection des photos pour le partage quotidien.

## Que signifie protéger une photo ?

Protéger une photo signifie réduire le risque d'exposer des informations que vous n'aviez pas l'intention de partager. Ces informations peuvent être visibles dans l'image elle-même ou cachées dans le fichier.

Les détails sensibles visibles peuvent inclure :

- Visages
- Plaques d'immatriculation
- Adresses domiciliaires
- Numéros d'identité
- Adresses e-mail
- Numéros de téléphone
- Écrans et documents
- Noms d'écoles d'enfants
- Panneaux ou badges de localisation

Les détails cachés peuvent inclure des métadonnées telles que les informations de l'appareil photo, l'heure de capture, le logiciel d'édition, et parfois des données de localisation selon l'appareil et les paramètres.

## Étape 1 : Supprimer les métadonnées EXIF

Les métadonnées EXIF sont des informations stockées dans les fichiers image. Elles peuvent inclure le modèle d'appareil, la date, l'heure, les réglages de l'objectif, et dans certains cas la localisation GPS. Toutes les images ne contiennent pas de métadonnées sensibles, mais si vous partagez des photos personnelles publiquement, supprimer les métadonnées est une habitude sûre.

Utilisez l'outil [Supprimer EXIF](/remove-exif) de NanoImage avant de téléverser des photos personnelles sur des blogs, marketplaces, forums, portfolios ou plateformes sociales publiques.

## Étape 2 : Flouter visages, plaques, adresses et texte

Certaines informations sont visibles et doivent être masquées manuellement. Le flou est utile quand vous voulez dissimuler des détails tout en gardant l'image globalement compréhensible.

Utilisez le flou quand vous devez cacher :

- Des visages sur une photo de groupe
- Des plaques sur des photos de rue
- Des noms et adresses sur des documents
- Des messages privés ou e-mails sur une capture d'écran
- Des numéros de compte, tickets, étiquettes ou reçus
- Des visages d'enfants ou identifiants scolaires

L'outil [Flouter l'image](/blur-image) de NanoImage vous permet de flouter des zones sélectionnées pour rendre les détails sensibles moins lisibles.

## Étape 3 : Pixéliser quand vous voulez un masque plus fort

Le flou peut bien fonctionner, mais pour certains détails vous pouvez préférer la pixélisation. La pixélisation rend une zone visiblement bloquée, utile pour des captures publiques, des rapports de sécurité et des images où vous voulez montrer qu'un élément a été intentionnellement masqué.

Utilisez la pixélisation pour :

- Plaques d'immatriculation
- Visages sur des photos publiques
- Documents d'identité
- Détails de paiement
- Texte sensible sur des captures
- Noms d'utilisateur ou tableaux de bord internes

L'outil [Pixéliser l'image](/pixelate-image) de NanoImage est utile quand vous voulez un effet de confidentialité plus fort qu'un flou doux.

## Étape 4 : Ajouter un filigrane avant publication

Un filigrane peut aider à identifier la propriété, décourager la réutilisation occasionnelle ou étiqueter un visuel comme aperçu. Il n'offre pas une protection parfaite, mais il est utile pour les photographes, créateurs, vendeurs et équipes qui publient des images en ligne.

Utilisez un filigrane quand :

- Vous partagez des images de portfolio
- Vous publiez des aperçus produits
- Vous publiez des épreuves client
- Vous voulez étiqueter avec une marque ou un nom d'utilisateur
- Vous voulez décourager la copie occasionnelle

L'outil [Filigrane](/watermark) de NanoImage vous permet d'ajouter un filigrane texte ou logo avant le partage.

## Une checklist confidentialité simple avant partage

Avant de publier ou d'envoyer une image, posez ces questions :

1. **L'image montre-t-elle un visage, une adresse, une plaque, un document ou un écran privé ?**
2. **L'arrière-plan pourrait-il révéler un lieu ?**
3. **Le fichier contient-il des métadonnées à supprimer ?**
4. **Une personne, un enfant, un client ou un collègue doit-il être masqué ?**
5. **L'image a-t-elle besoin d'un filigrane avant publication ?**
6. **Le fichier final est-il plus petit et plus propre après édition ?**

Si la réponse à l'une de ces questions est oui, utilisez un outil de confidentialité avant de partager.

## Pourquoi les outils navigateur comptent pour la confidentialité

Quand vous utilisez un outil image en ligne, il est légitime de demander où l'image est traitée. Certains outils téléversent les fichiers sur un serveur. NanoImage est conçu autour de workflows navigateur pour les tâches courantes, ce qui aide à garder le processus simple et respectueux de la vie privée.

Cela compte pour les photos personnelles, captures, documents, aperçus produits ou images internes. Un workflow axé confidentialité doit éviter les téléversements inutiles.

Visitez [Confidentialité et protection](/tools/privacy-protection) pour voir la collection complète d'outils NanoImage.

## Scénarios courants de partage photo

### Partager une photo de rue

Floutez ou pixélisez visages et plaques. Supprimez les métadonnées EXIF avant publication publique.

Outils suggérés :

- [Flouter l'image](/blur-image)
- [Pixéliser l'image](/pixelate-image)
- [Supprimer EXIF](/remove-exif)

### Partager une capture d'écran

Masquez noms d'utilisateur, e-mails, messages privés, numéros de compte et URL internes.

Outils suggérés :

- [Flouter l'image](/blur-image)
- [Pixéliser l'image](/pixelate-image)

### Publier des aperçus produits

Ajoutez un filigrane pour étiqueter comme aperçu ou décourager la copie occasionnelle.

Outils suggérés :

- [Filigrane](/watermark)
- [Compresser l'image](/compress-image)

### Publier des photos de voyage personnelles

Vérifiez les indices de localisation visibles et supprimez les métadonnées cachées avant partage public.

Outils suggérés :

- [Supprimer EXIF](/remove-exif)
- [Flouter l'image](/blur-image)

## FAQ

### Qu'est-ce que les métadonnées EXIF ?

Les métadonnées EXIF sont des informations stockées dans certains fichiers image. Elles peuvent inclure réglages appareil, date et heure, détails appareil, et parfois localisation selon l'image source.

### Dois-je supprimer les données EXIF avant de partager ?

Si vous partagez des photos personnelles publiquement, supprimer les métadonnées EXIF est une bonne habitude. Cela réduit les informations cachées inutiles.

### Le flou est-il meilleur que la pixélisation ?

Les deux peuvent aider à masquer des informations sensibles. Le flou est plus doux et souvent plus naturel. La pixélisation est plus évidente et utile pour un masque visuel plus fort.

### Un filigrane empêche-t-il le vol d'image ?

Un filigrane peut décourager la réutilisation occasionnelle et montrer la propriété, mais ce n'est pas une protection parfaite. Mieux vaut l'utiliser dans un workflow de partage plus large.

## Conclusion

Avant de partager une photo, vérifiez ce qui est visible et ce qui peut être caché dans le fichier. Supprimez les métadonnées, floutez ou pixélisez les zones sensibles, et ajoutez un filigrane quand la propriété compte.

Commencez par [Confidentialité et protection](/tools/privacy-protection), ou allez directement à [Supprimer EXIF](/remove-exif), [Flouter l'image](/blur-image), [Pixéliser l'image](/pixelate-image) et [Filigrane](/watermark).`,
  },
  es: {
    category: 'Privacidad',
    title: 'Cómo proteger fotos en línea antes de compartirlas',
    excerpt: 'Aprende a proteger fotos antes de compartirlas en línea eliminando metadatos, difuminando detalles sensibles, pixelando áreas privadas y añadiendo marcas de agua.',
    readTime: '7 min de lectura',
    metaDescription: 'Protege fotos en línea antes de compartir. Elimina metadatos EXIF, difumina rostros o direcciones, pixela áreas privadas y añade marcas de agua en tu navegador.',
    body: `Compartir una foto puede parecer simple: subirla, enviarla, publicarla. Pero las fotos pueden contener más información de la que ves. Una imagen puede mostrar rostros, matrículas, direcciones, pantallas, documentos, pistas de ubicación y metadatos ocultos. Antes de publicar o enviar una imagen, vale la pena dedicar un minuto a proteger los detalles que deben permanecer privados.

NanoImage ofrece herramientas de privacidad enfocadas que se ejecutan en tu navegador, incluyendo eliminar metadatos EXIF, difuminar áreas sensibles, pixelar información y añadir marcas de agua.

Esta guía explica un flujo práctico de protección de fotos para el compartir cotidiano.

## ¿Qué significa proteger una foto?

Proteger una foto significa reducir el riesgo de exponer información que no pretendías compartir. Esa información puede ser visible en la imagen o estar oculta dentro del archivo.

Los detalles sensibles visibles pueden incluir:

- Rostros
- Matrículas
- Direcciones del hogar
- Números de identificación
- Direcciones de correo
- Números de teléfono
- Pantallas y documentos
- Nombres de escuelas de niños
- Señales o insignias de ubicación

Los detalles ocultos pueden incluir metadatos como información de cámara, hora de captura, software de edición y, a veces, datos de ubicación según el dispositivo y la configuración.

## Paso 1: Eliminar metadatos EXIF

Los metadatos EXIF son información almacenada dentro de archivos de imagen. Pueden incluir modelo de cámara, fecha, hora, ajustes de lente y, en algunos casos, ubicación GPS. No todas las imágenes contienen metadatos sensibles, pero si compartes fotos personales públicamente, eliminar metadatos es un hábito seguro.

Usa la herramienta [Eliminar EXIF](/remove-exif) de NanoImage antes de subir fotos personales a blogs, marketplaces, foros, portafolios o plataformas sociales públicas.

## Paso 2: Difuminar rostros, matrículas, direcciones y texto

Alguna información es visible y debe ocultarse manualmente. El difuminado es útil cuando quieres ocultar detalles manteniendo la imagen comprensible en conjunto.

Usa difuminado cuando necesites ocultar:

- Rostros en una foto grupal
- Matrículas en fotos de calle
- Nombres y direcciones en documentos
- Mensajes privados o correos en una captura
- Números de cuenta, tickets, etiquetas o recibos
- Rostros de niños o identificadores escolares

La herramienta [Difuminar imagen](/blur-image) de NanoImage te permite difuminar áreas seleccionadas para que el detalle sensible sea menos legible.

## Paso 3: Pixelar cuando quieras una máscara más fuerte

El difuminado puede funcionar bien, pero para ciertos detalles puedes preferir la pixelación. La pixelación hace que un área se vea claramente bloqueada, útil para capturas públicas, informes de seguridad e imágenes donde quieres que los espectadores sepan que algo se ocultó intencionalmente.

Usa pixelación para:

- Matrículas
- Rostros en fotos públicas
- Documentos de identidad
- Detalles de pago
- Texto sensible en capturas
- Nombres de usuario o paneles internos

La herramienta [Pixelar imagen](/pixelate-image) de NanoImage es útil cuando quieres un efecto de privacidad más fuerte que un difuminado suave.

## Paso 4: Añadir marca de agua antes de publicar

Una marca de agua puede ayudar a identificar propiedad, desalentar el uso casual o etiquetar un visual como vista previa. No ofrece protección perfecta, pero es útil para fotógrafos, creadores, vendedores y equipos que publican imágenes en línea.

Usa marca de agua cuando:

- Compartes imágenes de portafolio
- Publicas vistas previas de productos
- Publicas pruebas de cliente
- Quieres etiquetar con marca o nombre de usuario
- Quieres desalentar la copia casual

La herramienta [Marca de agua](/watermark) de NanoImage te permite añadir texto o logo antes de compartir.

## Una checklist de privacidad simple antes de compartir

Antes de publicar o enviar una imagen, pregúntate:

1. **¿La imagen muestra rostro, dirección, matrícula, documento o pantalla privada?**
2. **¿El fondo podría revelar una ubicación?**
3. **¿El archivo contiene metadatos que deben eliminarse?**
4. **¿Debe ocultarse una persona, niño, cliente o compañero?**
5. **¿La imagen necesita marca de agua antes de publicar?**
6. **¿El archivo final es más pequeño y limpio tras editar?**

Si la respuesta a alguna es sí, usa una herramienta de privacidad antes de compartir.

## Por qué importan las herramientas en el navegador para la privacidad

Al usar una herramienta de imagen en línea, es justo preguntar dónde se procesa la imagen. Algunas herramientas suben archivos a un servidor. NanoImage está diseñado en torno a flujos en el navegador para tareas comunes, lo que ayuda a mantener el proceso simple y respetuoso con la privacidad.

Esto importa al trabajar con fotos personales, capturas, documentos, vistas previas de productos o imágenes internas. Un flujo centrado en privacidad debe evitar subidas innecesarias.

Visita [Privacidad y protección](/tools/privacy-protection) para ver la colección completa de herramientas NanoImage.

## Escenarios comunes de compartir fotos

### Compartir una foto de calle

Difumina o pixela rostros y matrículas. Elimina metadatos EXIF antes de publicar públicamente.

Herramientas sugeridas:

- [Difuminar imagen](/blur-image)
- [Pixelar imagen](/pixelate-image)
- [Eliminar EXIF](/remove-exif)

### Compartir una captura de pantalla

Oculta nombres de usuario, correos, mensajes privados, números de cuenta y URL internas.

Herramientas sugeridas:

- [Difuminar imagen](/blur-image)
- [Pixelar imagen](/pixelate-image)

### Publicar vistas previas de productos

Añade marca de agua si quieres etiquetar como vista previa o desalentar la copia casual.

Herramientas sugeridas:

- [Marca de agua](/watermark)
- [Comprimir imagen](/compress-image)

### Publicar fotos de viaje personales

Revisa pistas de ubicación visibles y elimina metadatos ocultos antes del compartir público.

Herramientas sugeridas:

- [Eliminar EXIF](/remove-exif)
- [Difuminar imagen](/blur-image)

## Preguntas frecuentes

### ¿Qué son los metadatos EXIF?

Los metadatos EXIF son información almacenada en algunos archivos de imagen. Pueden incluir ajustes de cámara, fecha y hora, detalles del dispositivo y, a veces, ubicación según la imagen fuente.

### ¿Debo eliminar EXIF antes de compartir fotos?

Si compartes fotos personales públicamente, eliminar metadatos EXIF es un buen hábito de privacidad. Reduce información oculta innecesaria.

### ¿Es mejor difuminar que pixelar?

Ambos pueden ayudar a ocultar información sensible. El difuminado es más suave y a menudo más natural. La pixelación es más obvia y útil cuando quieres una máscara visual más fuerte.

### ¿Una marca de agua previene el robo de imágenes?

Puede desalentar el uso casual y mostrar propiedad, pero no es protección perfecta. Mejor usarla como parte de un flujo de compartir más amplio.

## Conclusión

Antes de compartir una foto, revisa lo visible y lo que puede estar oculto en el archivo. Elimina metadatos, difumina o pixela áreas sensibles y añade marca de agua cuando la propiedad importa.

Empieza con [Privacidad y protección](/tools/privacy-protection), o ve directamente a [Eliminar EXIF](/remove-exif), [Difuminar imagen](/blur-image), [Pixelar imagen](/pixelate-image) y [Marca de agua](/watermark).`,
  },
  pt: {
    category: 'Privacidade',
    title: 'Como proteger fotos online antes de compartilhar',
    excerpt: "Aprenda a proteger fotos antes de compartilhar online removendo metadados, desfocando detalhes sensíveis, pixelando áreas privadas e adicionando marcas d'água.",
    readTime: '7 min de leitura',
    metaDescription: "Proteja fotos online antes de compartilhar. Remova metadados EXIF, desfoque rostos ou endereços, pixelize áreas privadas e adicione marcas d'água no navegador.",
    body: `Compartilhar uma foto pode parecer simples: enviar, postar, publicar. Mas fotos podem conter mais informação do que você vê. Uma imagem pode mostrar rostos, placas, endereços, telas, documentos, pistas de localização e metadados ocultos. Antes de publicar ou enviar, vale dedicar um minuto para proteger detalhes que devem permanecer privados.

O NanoImage oferece ferramentas de privacidade focadas que rodam no navegador, incluindo remover metadados EXIF, desfocar áreas sensíveis, pixelar informações e adicionar marcas d'água.

Este guia explica um fluxo prático de proteção de fotos para compartilhamento do dia a dia.

## O que significa proteger uma foto?

Proteger uma foto significa reduzir o risco de expor informações que você não pretendia compartilhar. Essas informações podem ser visíveis na imagem ou ocultas no arquivo.

Detalhes sensíveis visíveis podem incluir:

- Rostos
- Placas de veículo
- Endereços residenciais
- Números de identidade
- Endereços de e-mail
- Números de telefone
- Telas e documentos
- Nomes de escolas de crianças
- Sinais ou crachás de localização

Detalhes ocultos podem incluir metadados como informações da câmera, hora da captura, software de edição e, às vezes, dados de localização conforme dispositivo e configurações.

## Passo 1: Remover metadados EXIF

Metadados EXIF são informações armazenadas dentro de arquivos de imagem. Podem incluir modelo da câmera, data, hora, configurações da lente e, em alguns casos, localização GPS. Nem toda imagem contém metadados sensíveis, mas se você compartilha fotos pessoais publicamente, remover metadados é um hábito seguro.

Use a ferramenta [Remover EXIF](/remove-exif) do NanoImage antes de enviar fotos pessoais para blogs, marketplaces, fóruns, portfólios ou plataformas sociais públicas.

## Passo 2: Desfocar rostos, placas, endereços e texto

Algumas informações são visíveis e precisam ser ocultadas manualmente. Desfoque é útil quando você quer esconder detalhes mantendo a imagem compreensível no geral.

Use desfoque quando precisar esconder:

- Rostos em foto de grupo
- Placas em fotos de rua
- Nomes e endereços em documentos
- Mensagens privadas ou e-mails em captura
- Números de conta, tickets, etiquetas ou recibos
- Rostos de crianças ou identificadores escolares

A ferramenta [Desfocar imagem](/blur-image) do NanoImage permite desfocar áreas selecionadas para tornar detalhes sensíveis menos legíveis.

## Passo 3: Pixelar quando quiser máscara mais forte

Desfoque pode funcionar bem, mas para certos detalhes você pode preferir pixelização. Pixelização deixa uma área visivelmente bloqueada, útil para capturas públicas, relatórios de segurança e imagens onde você quer que o público saiba que algo foi intencionalmente ocultado.

Use pixelização para:

- Placas de veículo
- Rostos em fotos públicas
- Documentos de identidade
- Detalhes de pagamento
- Texto sensível em capturas
- Nomes de usuário ou painéis internos

A ferramenta [Pixelar imagem](/pixelate-image) do NanoImage ajuda quando você quer efeito de privacidade mais forte que desfoque suave.

## Passo 4: Adicionar marca d'água antes de publicar

Marca d'água pode ajudar a identificar propriedade, desencorajar reuso casual ou rotular um visual como prévia. Não oferece proteção perfeita, mas é útil para fotógrafos, criadores, vendedores e equipes que publicam imagens online.

Use marca d'água quando:

- Compartilha imagens de portfólio
- Publica prévias de produtos
- Publica provas de cliente
- Quer rotular com marca ou nome de usuário
- Quer desencorajar cópia casual

A ferramenta [Marca d'água](/watermark) do NanoImage permite adicionar texto ou logo antes de compartilhar.

## Checklist de privacidade simples antes de compartilhar

Antes de postar ou enviar uma imagem, pergunte:

1. **A imagem mostra rosto, endereço, placa, documento ou tela privada?**
2. **O fundo poderia revelar localização?**
3. **O arquivo contém metadados que devem ser removidos?**
4. **Uma pessoa, criança, cliente ou colega deve ser ocultado?**
5. **A imagem precisa de marca d'água antes de publicar?**
6. **O arquivo final está menor e mais limpo após edição?**

Se a resposta a qualquer pergunta for sim, use ferramenta de privacidade antes de compartilhar.

## Por que ferramentas no navegador importam para privacidade

Ao usar ferramenta de imagem online, é justo perguntar onde a imagem é processada. Algumas ferramentas enviam arquivos a servidor. O NanoImage é projetado em torno de fluxos no navegador para tarefas comuns, ajudando a manter o processo simples e respeitoso à privacidade.

Isso importa ao trabalhar com fotos pessoais, capturas, documentos, prévias de produtos ou imagens internas. Um fluxo focado em privacidade deve evitar uploads desnecessários.

Visite [Privacidade e proteção](/tools/privacy-protection) para ver a coleção completa de ferramentas NanoImage.

## Cenários comuns de compartilhamento de fotos

### Compartilhar foto de rua

Desfoque ou pixelize rostos e placas. Remova metadados EXIF antes de publicar publicamente.

Ferramentas sugeridas:

- [Desfocar imagem](/blur-image)
- [Pixelar imagem](/pixelate-image)
- [Remover EXIF](/remove-exif)

### Compartilhar captura de tela

Oculte nomes de usuário, e-mails, mensagens privadas, números de conta e URLs internas.

Ferramentas sugeridas:

- [Desfocar imagem](/blur-image)
- [Pixelar imagem](/pixelate-image)

### Publicar prévias de produtos

Adicione marca d'água se quiser rotular como prévia ou desencorajar cópia casual.

Ferramentas sugeridas:

- [Marca d'água](/watermark)
- [Comprimir imagem](/compress-image)

### Postar fotos de viagem pessoais

Verifique pistas de localização visíveis e remova metadados ocultos antes do compartilhamento público.

Ferramentas sugeridas:

- [Remover EXIF](/remove-exif)
- [Desfocar imagem](/blur-image)

## Perguntas frequentes

### O que são metadados EXIF?

Metadados EXIF são informações armazenadas em alguns arquivos de imagem. Podem incluir configurações da câmera, data e hora, detalhes do dispositivo e, às vezes, localização conforme a imagem fonte.

### Devo remover EXIF antes de compartilhar fotos?

Se você compartilha fotos pessoais publicamente, remover metadados EXIF é bom hábito de privacidade. Reduz informações ocultas desnecessárias.

### Desfoque é melhor que pixelização?

Ambos ajudam a esconder informações sensíveis. Desfoque é mais suave e muitas vezes mais natural. Pixelização é mais óbvia e útil quando você quer máscara visual mais forte.

### Marca d'água impede roubo de imagem?

Pode desencorajar reuso casual e mostrar propriedade, mas não é proteção perfeita. Melhor usá-la como parte de fluxo de compartilhamento mais amplo.

## Conclusão

Antes de compartilhar uma foto, verifique o visível e o que pode estar oculto no arquivo. Remova metadados, desfoque ou pixelize áreas sensíveis e adicione marca d'água quando propriedade importa.

Comece com [Privacidade e proteção](/tools/privacy-protection), ou vá direto para [Remover EXIF](/remove-exif), [Desfocar imagem](/blur-image), [Pixelar imagem](/pixelate-image) e [Marca d'água](/watermark).`,
  },
  ru: {
    category: 'Конфиденциальность',
    title: 'Как защитить фото онлайн перед публикацией',
    excerpt: 'Узнайте, как защитить фото перед онлайн-публикацией: удалить метаданные, размыть чувствительные детали, пикселизировать личные области и добавить водяные знаки.',
    readTime: '7 мин чтения',
    metaDescription: 'Защитите фото онлайн перед публикацией. Удаляйте EXIF-метаданные, размывайте лица или адреса, пикселизируйте личные области и добавляйте водяные знаки в браузере.',
    body: `Поделиться фото кажется простым: загрузить, отправить, опубликовать. Но фото могут содержать больше информации, чем видно глазу. На снимке могут быть лица, номера, адреса, экраны, документы, подсказки о месте и скрытые метаданные. Перед публикацией или отправкой стоит потратить минуту на защиту деталей, которые должны оставаться личными.

NanoImage предлагает целевые инструменты конфиденциальности в браузере: удаление EXIF-метаданных, размытие чувствительных областей, пикселизация и водяные знаки.

В этом руководстве — практичный процесс защиты фото для повседневного обмена.

## Что значит защитить фото?

Защита фото — это снижение риска раскрыть информацию, которую вы не собирались делиться. Она может быть видна на изображении или скрыта в файле.

Видимые чувствительные детали могут включать:

- Лица
- Номера автомобилей
- Домашние адреса
- Номера удостоверений
- Адреса электронной почты
- Телефоны
- Экраны и документы
- Названия школ детей
- Указатели или бейджи места

Скрытые детали могут включать метаданные: информацию о камере, время съёмки, ПО для редактирования, иногда данные о местоположении в зависимости от устройства и настроек.

## Шаг 1: Удалить EXIF-метаданные

EXIF-метаданные — информация внутри файлов изображений. Могут включать модель камеры, дату, время, настройки объектива и в некоторых случаях GPS. Не в каждом файле есть чувствительные метаданные, но при публичной публикации личных фото удаление — безопасная привычка.

Используйте [Удалить EXIF](/remove-exif) NanoImage перед загрузкой личных фото в блоги, маркетплейсы, форумы, портфолио или публичные соцсети.

## Шаг 2: Размыть лица, номера, адреса и текст

Часть информации видна и требует ручного скрытия. Размытие полезно, когда нужно скрыть детали, сохраняя общую понятность изображения.

Используйте размытие, когда нужно скрыть:

- Лица на групповом фото
- Номера на уличных снимках
- Имена и адреса на документах
- Личные сообщения или почту на скриншоте
- Номера счетов, билеты, этикетки или чеки
- Лица детей или школьные идентификаторы

[Размыть изображение](/blur-image) NanoImage позволяет размыть выбранные области, чтобы чувствительные детали было сложнее прочитать.

## Шаг 3: Пикселизация для более сильной маски

Размытие работает, но для некоторых деталей лучше пикселизация. Она делает область явно заблокированной — полезно для публичных скриншотов, отчётов о безопасности и случаев, когда нужно показать, что что-то намеренно скрыто.

Используйте пикселизацию для:

- Номеров автомобилей
- Лиц на публичных фото
- Удостоверений личности
- Платёжных данных
- Чувствительного текста на скриншотах
- Имён пользователей или внутренних панелей

[Пикселизировать изображение](/pixelate-image) NanoImage полезен, когда нужен более сильный эффект конфиденциальности, чем мягкое размытие.

## Шаг 4: Добавить водяной знак перед публикацией

Водяной знак помогает обозначить авторство, отпугнуть случайное использование или пометить визуал как превью. Это не идеальная защита, но полезно фотографам, авторам, продавцам и командам, публикующим изображения онлайн.

Используйте водяной знак, когда:

- Делитесь портфолио
- Публикуете превью товаров
- Публикуете клиентские пробы
- Хотите пометить брендом или именем пользователя
- Хотите отпугнуть случайное копирование

[Водяной знак](/watermark) NanoImage позволяет добавить текстовый или логотипный знак перед публикацией.

## Простой чеклист конфиденциальности перед публикацией

Перед постом или отправкой спросите:

1. **Видны ли лицо, адрес, номер, документ или личный экран?**
2. **Может ли фон выдать место?**
3. **Есть ли в файле метаданные, которые нужно удалить?**
4. **Нужно ли скрыть человека, ребёнка, клиента или коллегу?**
5. **Нужен ли водяной знак перед публикацией?**
6. **Стал ли итоговый файл меньше и чище после редактирования?**

Если на любой вопрос ответ «да», используйте инструмент конфиденциальности перед публикацией.

## Почему браузерные инструменты важны для конфиденциальности

При использовании онлайн-инструмента справедливо спросить, где обрабатывается изображение. Некоторые загружают файлы на сервер. NanoImage построен вокруг браузерных процессов для типичных задач, что помогает держать процесс простым и дружелюбным к приватности.

Это важно при работе с личными фото, скриншотами, документами, превью товаров или внутренними изображениями. Процесс с приоритетом конфиденциальности должен избегать лишних загрузок.

Посетите [Конфиденциальность и защита](/tools/privacy-protection), чтобы увидеть полную коллекцию инструментов NanoImage.

## Типичные сценарии обмена фото

### Уличное фото

Размойте или пикселизируйте лица и номера. Удалите EXIF перед публичной публикацией.

Рекомендуемые инструменты:

- [Размыть изображение](/blur-image)
- [Пикселизировать изображение](/pixelate-image)
- [Удалить EXIF](/remove-exif)

### Скриншот

Скройте имена пользователей, почту, личные сообщения, номера счетов и внутренние URL.

Рекомендуемые инструменты:

- [Размыть изображение](/blur-image)
- [Пикселизировать изображение](/pixelate-image)

### Превью товаров

Добавьте водяной знак, если хотите пометить как превью или отпугнуть случайное копирование.

Рекомендуемые инструменты:

- [Водяной знак](/watermark)
- [Сжать изображение](/compress-image)

### Личные travel-фото

Проверьте видимые подсказки о месте и удалите скрытые метаданные перед публичной публикацией.

Рекомендуемые инструменты:

- [Удалить EXIF](/remove-exif)
- [Размыть изображение](/blur-image)

## FAQ

### Что такое EXIF-метаданные?

EXIF-метаданные — информация внутри некоторых файлов изображений. Могут включать настройки камеры, дату и время, данные устройства и иногда местоположение в зависимости от исходника.

### Нужно ли удалять EXIF перед публикацией?

При публичной публикации личных фото удаление EXIF — хорошая привычка. Оно уменьшает скрытую информацию, которая не должна путешествовать с изображением.

### Размытие лучше пикселизации?

Оба помогают скрыть чувствительную информацию. Размытие мягче и часто выглядит естественнее. Пикселизация заметнее и полезна, когда нужна более сильная визуальная маска.

### Водяной знак предотвращает кражу изображений?

Он может отпугнуть случайное использование и показать авторство, но не даёт идеальной защиты. Лучше использовать как часть более широкого процесса публикации.

## Итог

Перед публикацией проверьте видимое и скрытое в файле. Удалите метаданные, размойте или пикселизируйте чувствительные области, добавьте водяной знак, когда важно авторство.

Начните с [Конфиденциальность и защита](/tools/privacy-protection) или перейдите к [Удалить EXIF](/remove-exif), [Размыть изображение](/blur-image), [Пикселизировать изображение](/pixelate-image) и [Водяной знак](/watermark).`,
  },
}
