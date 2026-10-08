import type { BlogLocMap } from './exif'

export type { BlogLoc, BlogLocMap } from './exif'

export const tinypngExtraLocalizations: BlogLocMap = {
  'zh-TW': {
    category: '工具對比',
    title: 'NanoImage vs TinyPNG：免費圖片壓縮工具對比（2026）',
    excerpt: 'TinyPNG 需要上傳圖片，NanoImage 不需要。從速度、品質、隱私三個維度進行詳細對比。',
    readTime: '8 分鐘閱讀',
    metaDescription: '2026 年 NanoImage 與 TinyPNG 對比：本機 vs 伺服器壓縮、速度、隱私、檔案限制與功能覆蓋。',
    body: `# NanoImage vs TinyPNG：免費圖片壓縮工具對比（2026）

過去十年若你壓縮過圖片，很可能用過 TinyPNG。可愛的熊貓 logo、拖放上傳、「節省了 73%」——幾乎是業界預設。TinyPNG 的壓縮品質確實出色。

但有一件事容易被忽略：TinyPNG 會把你的圖片上傳到阿姆斯特丹的伺服器，每一次都是如此。

**利益披露**：NanoImage 是我們的產品。我們盡量公平評價 TinyPNG——他們做的是好產品。

---

## 快速對比

| | **NanoImage** | **TinyPNG** |
|---|:---:|:---:|
| 壓縮在哪裡發生？ | 瀏覽器內（Canvas API） | TinyPNG 伺服器 |
| 是否需要上傳？ | 否 | 是 |
| 免費限制 | 無限制 | 每月 500 張，單檔 5MB |
| 壓縮品質 | 良好 | 優秀（業界頂尖） |
| 5MB 照片處理速度 | 本機約 200ms | 2–5 秒（上傳+處理+下載） |
| 離線可用 | 是 | 否 |
| 額外功能 | 還有 14 種（調整尺寸、裁剪、轉格式……） | 無 |
| 生產環境 API | 即將推出 | 是，成熟（超出 500 張後約 $0.009/張） |
| 隱私保障 | 檔案不離開裝置（可驗證） | 處理後刪除（需信任對方） |

---

## 壓縮品質

TinyPNG 的 Tinify 引擎經過十餘年調優。我們的測試：

- **含文字的 PNG 截圖**：TinyPNG 平均壓縮 71%；NanoImage 58%。
- **JPG 照片**：TinyPNG 64%；NanoImage 59%。
- **帶透明度的 PNG 圖示**：TinyPNG 78%；NanoImage 64%。

若純看壓縮率，TinyPNG 勝出。但這 10–15% 的差距對你的實際工作重要嗎？

---

## 隱私問題

拖圖到 TinyPNG 時，瀏覽器會上傳到 Tinify 伺服器再回傳結果。Tinify 隱私政策清楚且符合 GDPR，但以下情況任何上傳都不合適：

- **醫療**：可能受 HIPAA 或 GDPR 第 9 條約束。
- **法律**：證據照片或訴訟留存文件。
- **企業保密**：未發布產品、NDA 涵蓋內容。
- **個人**：孩子、住家或本人照片不願經任何伺服器。

NanoImage 全部在本機處理：DevTools → Network 可驗證壓縮過程無網路請求。

---

## 速度

| 檔案 | TinyPNG（Wi-Fi 200Mbps） | TinyPNG（4G ~25Mbps） | NanoImage（任意網路） |
|---|---|---|---|
| 500KB 截圖 | 1.4秒 | 2.1秒 | 80ms |
| 3MB 照片 | 2.3秒 | 5.6秒 | 180ms |
| 8MB 照片 | 超過免費上限 | — | 320ms |

網路不穩時 TinyPNG 可能需 30 秒甚至失敗，NanoImage 不受影響。

---

## 功能覆蓋

TinyPNG 只做壓縮 JPG、PNG、WebP。NanoImage 提供 15 種工具：壓縮、壓縮到 100KB、調整尺寸、裁剪、旋轉、翻轉、反色、黑白、模糊、邊框、浮水印、轉 JPG、迷因產生器、分割、合併。

實務常是多步流程。NanoImage 可在同一分頁完成調整尺寸 → 壓縮 → 加水印。

---

## API 與生產流水線

這裡 NanoImage 目前落後。TinyPNG 的 Tinify API 成熟、文件完善，十餘年來支撐電商與 CI 流水線。若你要整合 WordPress 或伺服器端批次，TinyPNG 仍是首選。

---

## 什麼時候用 TinyPNG

- 優化大量產品圖（數百或數千張）
- 需要接入生產流水線（WordPress、CI/CD）
- 圖片不敏感，上傳無妨

## 什麼時候用 NanoImage

- 不只壓縮（還要裁剪、轉格式、浮水印）
- 圖片不能離開裝置（醫療、法律、保密、個人）
- 網路不穩或離線
- 檔案超過 5MB 免費上限
- 已達每月 500 張上限且不想付費

---

## 結論

偶爾壓縮且不介意上傳，**TinyPNG 很好**。熊貓名不虚传。

若常處理圖片、需要多種操作或重視本機隱私，**NanoImage 為你打造**。TinyPNG 是精準鋸，NanoImage 是瑞士刀。

[**立即使用 NanoImage →**](https://nanoimage.net) | [查看四款工具完整對比 →](/blog/nanoimage-vs-tinypng-vs-squoosh-vs-photopea/)`,
  },
  ja: {
    category: '比較レビュー',
    title: 'NanoImage vs TinyPNG: 無料画像圧縮ツール比較（2026）',
    excerpt: 'TinyPNG は画像をサーバーにアップロードします。NanoImage はしません。速度・品質・プライバシーを徹底比較。',
    readTime: '8分で読めます',
    metaDescription: '2026年版 NanoImage vs TinyPNG：ブラウザ内 vs サーバー圧縮、速度、プライバシー、制限、機能比較。',
    body: `# NanoImage vs TinyPNG: 無料画像圧縮ツール比較（2026）

過去 10 年で画像を圧縮したことがあるなら、TinyPNG を使った可能性が高いです。パンダのロゴ、ドラッグ＆ドロップ、「73% 節約」——業界のデフォルトに近い存在です。TinyPNG の品質は本当に優れています。

ただし見落としがちな点：**TinyPNG は画像をアムステルダムのサーバーにアップロードします。毎回。**

**開示**：NanoImage は当社のプロジェクトです。TinyPNG には公平に評価しています——優れた製品です。

---

## クイック比較

| | **NanoImage** | **TinyPNG** |
|---|:---:|:---:|
| 圧縮の場所 | ブラウザ内（Canvas API） | TinyPNG サーバー |
| アップロード必要？ | いいえ | はい |
| 無料枠 | 無制限 | 月 500 枚、1 ファイル 5MB |
| 圧縮品質 | 良好 | 優秀（最高クラス） |
| 5MB 写真の速度 | ローカル約 200ms | 2–5 秒 |
| オフライン | 可 | 不可 |
| その他ツール | 14 種（リサイズ、クロップ等） | なし |
| 本番 API | 近日公開 | 成熟（500 枚超 $0.009/枚） |
| プライバシー | 端末から出ない（検証可） | 処理後削除（信頼ベース） |

---

## 圧縮品質

Tinify エンジンは 10 年以上のチューニング。テスト結果：

- **文字入り PNG スクリーンショット**：TinyPNG 71%、NanoImage 58%
- **JPG 写真**：TinyPNG 64%、NanoImage 59%
- **透過 PNG ロゴ**：TinyPNG 78%、NanoImage 64%

純粋な圧縮率なら TinyPNG の勝ち。ただし 10–15% の差が実務でどれだけ重要か？

---

## プライバシー

TinyPNG にドロップするとブラウザから Tinify サーバーへアップロードされます。ポリシーは GDPR 準拠ですが、次のケースではアップロード自体が NG です：

- **医療**：HIPAA や GDPR 第 9 条
- **法務**：証拠写真、訴訟保全
- **企業秘密**：未発表製品、NDA 対象
- **個人**：子ども・自宅・顔写真をサーバー経由したくない

NanoImage はすべて端末内処理。DevTools → Network で通信なしを確認できます。

---

## 速度

| ファイル | TinyPNG（Wi-Fi） | TinyPNG（4G） | NanoImage |
|---|---|---|---|
| 500KB | 1.4s | 2.1s | 80ms |
| 3MB | 2.3s | 5.6s | 180ms |
| 8MB | 上限超過 | — | 320ms |

不安定な回線では TinyPNG が 30 秒以上かかったり失敗。NanoImage は影響なし。

---

## 機能カバレッジ

TinyPNG は JPG/PNG/WebP の圧縮のみ。NanoImage は 15 ツール：圧縮、100KB 圧縮、リサイズ、クロップ、回転、反転、白黒、ぼかし、枠、透かし、JPG 変換、ミーム、分割、結合。

実務は多段階が多い。NanoImage なら 1 タブでリサイズ → 圧縮 → 透かしまで。

---

## API と本番パイプライン

ここは NanoImage が現時点で劣ります。Tinify API は成熟し、EC や CI を 10 年以上支えてきました。WordPress 統合やサーバー側バッチなら TinyPNG が第一候補。

---

## TinyPNG を選ぶとき

- 大量カタログ（数百〜数千枚）の最適化
- 本番パイプライン（WordPress、CI/CD）への統合
- 機密性が低くアップロードを気にしない

## NanoImage を選ぶとき

- 圧縮以外（リサイズ、クロップ、変換、透かし）も必要
- 端末から出したくない（医療、法務、NDA、個人）
- 遅い・不安定な回線、オフライン
- 5MB 無料上限超過
- 月 500 枚上限で課金したくない

---

## 結論

たまに圧縮してアップロードを気にしないなら **TinyPNG で十分**。パンダの評判は本物です。

頻繁に画像を扱い、多機能や端末内処理を重視するなら **NanoImage**。TinyPNG は精密のこぎり、NanoImage はスイスアーミーナイフ。

[**NanoImage を試す →**](https://nanoimage.net) | [4 ツール完全比較 →](/blog/nanoimage-vs-tinypng-vs-squoosh-vs-photopea/)`,
  },
  ko: {
    category: '비교 리뷰',
    title: 'NanoImage vs TinyPNG: 무료 이미지 압축 툴 비교 (2026)',
    excerpt: 'TinyPNG는 이미지를 서버에 업로드합니다. NanoImage는 그렇지 않습니다. 속도, 품질, 개인정보 보호를 비교합니다.',
    readTime: '8분 읽기',
    metaDescription: '2026 NanoImage vs TinyPNG: 브라우저 vs 서버 압축, 속도, 프라이버시, 용량 제한, 기능 비교.',
    body: `# NanoImage vs TinyPNG: 무료 이미지 압축 툴 비교 (2026)

지난 10년간 온라인에서 이미지를 압축했다면 TinyPNG를 써 봤을 가능성이 큽니다. 판다 로고, 드래그 앤 드롭, "73% 절약"——사실상 기본값입니다. TinyPNG 품질은 정말 뛰어납니다.

하지만 간과하기 쉬운 점: **TinyPNG는 매번 이미지를 암스테르담 서버에 업로드합니다.**

**고지**: NanoImage는 저희 프로젝트입니다. TinyPNG에 공정하게 평가했습니다——훌륭한 제품입니다.

---

## 빠른 비교

| | **NanoImage** | **TinyPNG** |
|---|:---:|:---:|
| 압축 위치 | 브라우저(Canvas API) | TinyPNG 서버 |
| 업로드 필요? | 아니오 | 예 |
| 무료 한도 | 무제한 | 월 500장, 파일당 5MB |
| 압축 품질 | 좋음 | 우수(최상급) |
| 5MB 사진 속도 | 로컬 ~200ms | 2–5초 |
| 오프라인 | 가능 | 불가 |
| 추가 도구 | 14개(리사이즈, 자르기 등) | 없음 |
| 프로덕션 API | 곧 출시 | 성숙(500장 초과 $0.009/장) |
| 프라이버시 | 기기 밖으로 안 나감(검증 가능) | 처리 후 삭제(신뢰 기반) |

---

## 압축 품질

Tinify 엔진은 10년 이상 튜닝. 테스트:

- **텍스트 PNG 스크린샷**: TinyPNG 71%, NanoImage 58%
- **JPG 사진**: TinyPNG 64%, NanoImage 59%
- **투명 PNG 로고**: TinyPNG 78%, NanoImage 64%

순수 압축률은 TinyPNG 승. 하지만 10–15% 차이가 실무에서 얼마나 중요할까요?

---

## 프라이버시

TinyPNG에 드롭하면 브라우저가 Tinify 서버로 업로드합니다. GDPR 준수 정책이지만 다음 경우 업로드 자체가 문제입니다:

- **의료**: HIPAA, GDPR 제9조
- **법무**: 증거 사진, 소송 보존
- **기업 기밀**: 미공개 제품, NDA
- **개인**: 아이, 집, 얼굴 사진을 서버 거치기 싫을 때

NanoImage는 모두 기기 내 처리. DevTools → Network로 확인 가능.

---

## 속도

| 파일 | TinyPNG(Wi-Fi) | TinyPNG(4G) | NanoImage |
|---|---|---|---|
| 500KB | 1.4s | 2.1s | 80ms |
| 3MB | 2.3s | 5.6s | 180ms |
| 8MB | 한도 초과 | — | 320ms |

불안정한 연결에서 TinyPNG는 30초 이상 또는 실패. NanoImage는 영향 없음.

---

## 기능 범위

TinyPNG는 JPG/PNG/WebP 압축만. NanoImage는 15가지: 압축, 100KB 압축, 리사이즈, 자르기, 회전, 뒤집기, 흑백, 블러, 테두리, 워터마크, JPG 변환, 밈, 분할, 병합.

실무는 다단계가 많습니다. NanoImage에서 한 탭으로 리사이즈 → 압축 → 워터마크.

---

## API와 프로덕션 파이프라인

여기서는 NanoImage가 현재 뒤처집니다. Tinify API는 성숙하고 10년 넘게 EC·CI를 지원했습니다. WordPress·서버 배치 통합은 TinyPNG가 1순위.

---

## TinyPNG를 쓸 때

- 대량 카탈로그(수백~수천 장) 최적화
- 프로덕션 파이프라인(WordPress, CI/CD) 통합
- 민감하지 않고 업로드 OK

## NanoImage를 쓸 때

- 압축 외(리사이즈, 자르기, 변환, 워터마크) 필요
- 기기 밖으로 내보내면 안 됨(의료, 법무, NDA, 개인)
- 느리거나 불안정한 연결, 오프라인
- 5MB 무료 한도 초과
- 월 500장 한도, 유료 원치 않음

---

## 결론

가끔 압축하고 업로드 무관하면 **TinyPNG면 충분**. 판다 평판은 정당합니다.

자주 다루고 다기능·로컬 프라이버시를 중시하면 **NanoImage**. TinyPNG는 정밀 톱, NanoImage는 스위스 군용 칼.

[**NanoImage 사용 →**](https://nanoimage.net) | [4-way 전체 비교 →](/blog/nanoimage-vs-tinypng-vs-squoosh-vs-photopea/)`,
  },
  fr: {
    category: 'Comparaisons',
    title: `NanoImage vs TinyPNG : comparaison des compresseurs d'images gratuits (2026)`,
    excerpt: `TinyPNG envoie vos images sur un serveur. NanoImage non. Comparaison vitesse, qualité et confidentialité.`,
    readTime: '8 min de lecture',
    metaDescription: `NanoImage vs TinyPNG en 2026 : compression navigateur vs serveur, vitesse, confidentialité, limites et fonctionnalités.`,
    body: `# NanoImage vs TinyPNG : comparaison des compresseurs d'images gratuits (2026)

Si vous avez compressé une image en ligne ces dix dernières années, vous avez probablement utilisé TinyPNG. Le panda, le glisser-déposer, le « nous avons économisé 73 % » — c'est presque la référence. TinyPNG produit d'excellents résultats.

Mais une chose est facile à oublier : **TinyPNG envoie votre image sur un serveur à Amsterdam. À chaque fois.**

**Divulgation** : NanoImage est notre projet. Nous avons tenté d'être justes envers TinyPNG — c'est un très bon produit.

---

## Comparaison rapide

| | **NanoImage** | **TinyPNG** |
|---|:---:|:---:|
| Où a lieu la compression ? | Dans le navigateur (Canvas API) | Serveurs TinyPNG |
| Upload requis ? | Non | Oui |
| Limite gratuite | Illimitée | 500 images/mois, 5 Mo chacune |
| Qualité | Bonne | Excellente (meilleure catégorie) |
| Photo 5 Mo | ~200 ms en local | 2–5 s |
| Hors ligne | Oui | Non |
| Autres outils | 14 de plus (redimensionner, recadrer…) | Aucun |
| API production | Bientôt | Oui, mature (~0,009 $/image après 500/mois) |
| Confidentialité | Fichiers sur l'appareil (vérifiable) | Suppression après traitement (confiance) |

---

## Qualité de compression

Le moteur Tinify est affiné depuis plus d'une décennie. Sur notre corpus de test :

- **Captures PNG avec texte** : TinyPNG 71 % ; NanoImage 58 %.
- **Photos JPG** : TinyPNG 64 % ; NanoImage 59 %.
- **Logos PNG transparents** : TinyPNG 78 % ; NanoImage 64 %.

Pour le ratio pur, TinyPNG gagne. Mais ces 10–15 % supplémentaires comptent-ils pour votre cas ?

---

## Confidentialité

En déposant une image sur TinyPNG, le navigateur l'envoie aux serveurs Tinify. Politique propre et conforme RGPD — mais certaines situations excluent tout upload :

- **Santé** : HIPAA, RGPD article 9.
- **Juridique** : preuves, conservation légale.
- **Entreprise** : maquettes non publiées, NDA.
- **Personnel** : photos d'enfants, du domicile, de votre visage.

NanoImage traite tout localement. DevTools → Network reste vide.

---

## Vitesse

| Fichier | TinyPNG (Wi-Fi) | TinyPNG (4G) | NanoImage |
|---|---|---|---|
| 500 Ko | 1,4 s | 2,1 s | 80 ms |
| 3 Mo | 2,3 s | 5,6 s | 180 ms |
| 8 Mo | N/A (plafond 5 Mo) | N/A | 320 ms |

Sur une connexion instable, TinyPNG peut prendre 30 s ou échouer. NanoImage non.

---

## Couverture fonctionnelle

TinyPNG ne compresse que JPG, PNG et WebP. NanoImage en propose 15 : compression, 100 Ko, redimensionner, recadrer, pivoter, retourner, N&B, flou, bordure, filigrane, JPG, mème, diviser, fusionner.

Les tâches réelles sont souvent multi-étapes. NanoImage permet redimensionner → compresser → filigrane dans un seul onglet.

---

## API et pipelines de production

Ici NanoImage est en retrait pour l'instant. L'API Tinify est mature et alimente e-commerce et CI depuis plus de dix ans. Pour WordPress ou un job serveur, choisissez TinyPNG.

---

## Quand utiliser TinyPNG

- Optimiser un grand catalogue (centaines ou milliers d'images)
- Intégrer la compression en production (WordPress, CI/CD)
- Images non sensibles, upload acceptable

## Quand utiliser NanoImage

- Plus que compresser (redimensionner, recadrer, convertir, filigrane)
- L'image ne doit pas quitter l'appareil (médical, juridique, NDA, personnel)
- Connexion lente ou instable, hors ligne
- Fichier > 5 Mo (gratuit TinyPNG)
- Plafond mensuel atteint sans vouloir payer

---

## Verdict

Si vous compressez occasionnellement et l'upload ne vous gêne pas, **TinyPNG convient**. Le panda mérite sa réputation.

Si vous traitez souvent des images, avez besoin de plusieurs outils ou refusez que vos photos quittent l'appareil, **NanoImage est pour vous**. TinyPNG est une scie de précision ; NanoImage un couteau suisse.

[**Essayer NanoImage →**](https://nanoimage.net) | [Comparaison complète à 4 outils →](/blog/nanoimage-vs-tinypng-vs-squoosh-vs-photopea/)`,
  },
  es: {
    category: 'Comparativas',
    title: `NanoImage vs TinyPNG: comparativa de compresores de imagen gratuitos (2026)`,
    excerpt: `TinyPNG sube tus imágenes a un servidor. NanoImage no. Comparativa de velocidad, calidad y privacidad.`,
    readTime: '8 min de lectura',
    metaDescription: `NanoImage vs TinyPNG en 2026: compresión en navegador vs servidor, velocidad, privacidad, límites y funciones.`,
    body: `# NanoImage vs TinyPNG: comparativa de compresores de imagen gratuitos (2026)

Si has comprimido imágenes online en la última década, probablemente usaste TinyPNG. El panda, arrastrar y soltar, el « ahorramos un 73 % » — casi el estándar. TinyPNG ofrece resultados excelentes.

Pero conviene recordar: **TinyPNG sube tu imagen a un servidor en Ámsterdam. Siempre.**

**Divulgación**: NanoImage es nuestro proyecto. Hemos intentado ser justos con TinyPNG — hacen un gran producto.

---

## Comparación rápida

| | **NanoImage** | **TinyPNG** |
|---|:---:|:---:|
| ¿Dónde se comprime? | En el navegador (Canvas API) | Servidores TinyPNG |
| ¿Requiere subida? | No | Sí |
| Límite gratis | Ilimitado | 500 imágenes/mes, 5 MB c/u |
| Calidad | Buena | Excelente (referencia) |
| Foto 5 MB | ~200 ms local | 2–5 s |
| Sin conexión | Sí | No |
| Más herramientas | 14 (redimensionar, recortar…) | Ninguna |
| API producción | Próximamente | Sí, madura (~$0,009/img tras 500/mes) |
| Privacidad | No sale del dispositivo (verificable) | Borrado tras procesar (confianza) |

---

## Calidad de compresión

El motor Tinify lleva más de una década de afinado. En nuestras pruebas:

- **Capturas PNG con texto**: TinyPNG 71 %; NanoImage 58 %.
- **Fotos JPG**: TinyPNG 64 %; NanoImage 59 %.
- **Logos PNG transparentes**: TinyPNG 78 %; NanoImage 64 %.

En ratio puro gana TinyPNG. ¿Importan esos 10–15 % extra en tu trabajo real?

---

## Privacidad

Al soltar una imagen en TinyPNG, el navegador la sube a Tinify. Política clara y GDPR — pero hay casos donde cualquier subida es incorrecta:

- **Sanidad**: HIPAA, GDPR artículo 9.
- **Legal**: pruebas, retención legal.
- **Empresa**: mockups no publicados, NDA.
- **Personal**: fotos de hijos, casa o tu rostro.

NanoImage procesa todo localmente. DevTools → Network sin peticiones.

---

## Velocidad

| Archivo | TinyPNG (Wi-Fi) | TinyPNG (4G) | NanoImage |
|---|---|---|---|
| 500 KB | 1,4 s | 2,1 s | 80 ms |
| 3 MB | 2,3 s | 5,6 s | 180 ms |
| 8 MB | N/A (tope 5 MB) | N/A | 320 ms |

Con conexión inestable TinyPNG puede tardar 30 s o fallar. NanoImage no.

---

## Cobertura de funciones

TinyPNG solo comprime JPG, PNG y WebP. NanoImage ofrece 15: comprimir, 100 KB, redimensionar, recortar, rotar, voltear, B/N, desenfoque, borde, marca de agua, JPG, meme, dividir, unir.

Los flujos reales suelen ser multietapa. NanoImage permite redimensionar → comprimir → marca de agua en una pestaña.

---

## API y pipelines de producción

Aquí NanoImage queda atrás por ahora. La API Tinify es madura y lleva más de diez años en e-commerce y CI. Para WordPress o jobs servidor, elige TinyPNG.

---

## Cuándo usar TinyPNG

- Optimizar catálogos grandes (cientos o miles)
- Integrar compresión en producción (WordPress, CI/CD)
- Imágenes no sensibles, subida aceptable

## Cuándo usar NanoImage

- Más que comprimir (redimensionar, recortar, convertir, marca de agua)
- La imagen no debe salir del dispositivo (médico, legal, NDA, personal)
- Conexión lenta o inestable, offline
- Archivo > 5 MB (gratis TinyPNG)
- Tope mensual sin querer pagar

---

## Veredicto

Si comprimes de vez en cuando y la subida no te importa, **TinyPNG está bien**. El panda se lo ha ganado.

Si trabajas imágenes a menudo, necesitas varias herramientas o no quieres que tus fotos salgan del dispositivo, **NanoImage es para ti**. TinyPNG es una sierra de precisión; NanoImage, una navaja suiza.

[**Probar NanoImage →**](https://nanoimage.net) | [Comparativa completa de 4 herramientas →](/blog/nanoimage-vs-tinypng-vs-squoosh-vs-photopea/)`,
  },
  pt: {
    category: 'Comparativos',
    title: `NanoImage vs TinyPNG: comparativo de compressores de imagem gratuitos (2026)`,
    excerpt: `TinyPNG envia suas imagens para um servidor. NanoImage não. Comparação de velocidade, qualidade e privacidade.`,
    readTime: '8 min de leitura',
    metaDescription: `NanoImage vs TinyPNG em 2026: compressão no navegador vs servidor, velocidade, privacidade, limites e recursos.`,
    body: `# NanoImage vs TinyPNG: comparativo de compressores de imagem gratuitos (2026)

Se você já comprimiu imagens online na última década, provavelmente usou o TinyPNG. O panda, arrastar e soltar, « economizamos 73% » — quase o padrão. O TinyPNG entrega resultados excelentes.

Mas vale lembrar: **o TinyPNG envia sua imagem para um servidor em Amsterdã. Sempre.**

**Divulgação**: NanoImage é nosso projeto. Tentamos ser justos com o TinyPNG — é um ótimo produto.

---

## Comparação rápida

| | **NanoImage** | **TinyPNG** |
|---|:---:|:---:|
| Onde ocorre a compressão? | No navegador (Canvas API) | Servidores TinyPNG |
| Upload necessário? | Não | Sim |
| Limite gratuito | Ilimitado | 500 imagens/mês, 5 MB cada |
| Qualidade | Boa | Excelente (referência) |
| Foto 5 MB | ~200 ms local | 2–5 s |
| Offline | Sim | Não |
| Outras ferramentas | 14 (redimensionar, recortar…) | Nenhuma |
| API produção | Em breve | Sim, madura (~US$ 0,009/img após 500/mês) |
| Privacidade | Arquivo não sai do dispositivo (verificável) | Excluído após processar (confiança) |

---

## Qualidade de compressão

O motor Tinify tem mais de uma década de ajustes. Nos nossos testes:

- **Capturas PNG com texto**: TinyPNG 71%; NanoImage 58%.
- **Fotos JPG**: TinyPNG 64%; NanoImage 59%.
- **Logos PNG transparentes**: TinyPNG 78%; NanoImage 64%.

Em taxa pura, TinyPNG vence. Mas esses 10–15% extras importam no seu caso?

---

## Privacidade

Ao soltar uma imagem no TinyPNG, o navegador envia ao Tinify. Política clara e GDPR — mas há situações em que qualquer upload é inadequado:

- **Saúde**: HIPAA, GDPR artigo 9.
- **Jurídico**: provas, retenção legal.
- **Corporativo**: mockups não lançados, NDA.
- **Pessoal**: fotos de filhos, casa ou seu rosto.

NanoImage processa tudo localmente. DevTools → Network sem requisições.

---

## Velocidade

| Arquivo | TinyPNG (Wi-Fi) | TinyPNG (4G) | NanoImage |
|---|---|---|---|
| 500 KB | 1,4 s | 2,1 s | 80 ms |
| 3 MB | 2,3 s | 5,6 s | 180 ms |
| 8 MB | N/A (teto 5 MB) | N/A | 320 ms |

Em conexão instável o TinyPNG pode levar 30 s ou falhar. NanoImage não.

---

## Cobertura de recursos

TinyPNG só comprime JPG, PNG e WebP. NanoImage oferece 15: comprimir, 100 KB, redimensionar, recortar, girar, espelhar, P&B, desfoque, borda, marca d'água, JPG, meme, dividir, mesclar.

Fluxos reais são multietapas. NanoImage permite redimensionar → comprimir → marca d'água em uma aba.

---

## API e pipelines de produção

Aqui o NanoImage fica atrás por enquanto. A API Tinify é madura e sustenta e-commerce e CI há mais de dez anos. Para WordPress ou jobs no servidor, escolha TinyPNG.

---

## Quando usar TinyPNG

- Otimizar catálogos grandes (centenas ou milhares)
- Integrar compressão em produção (WordPress, CI/CD)
- Imagens não sensíveis, upload aceitável

## Quando usar NanoImage

- Mais que comprimir (redimensionar, recortar, converter, marca d'água)
- Imagem não pode sair do dispositivo (médico, jurídico, NDA, pessoal)
- Conexão lenta ou instável, offline
- Arquivo > 5 MB (grátis TinyPNG)
- Teto mensal sem querer pagar

---

## Veredicto

Se comprime ocasionalmente e o upload não incomoda, **TinyPNG serve**. O panda merece a fama.

Se trabalha imagens com frequência, precisa de várias ferramentas ou não quer que fotos saiam do dispositivo, **NanoImage é para você**. TinyPNG é serra de precisão; NanoImage, canivete suíço.

[**Experimentar NanoImage →**](https://nanoimage.net) | [Comparativo completo de 4 ferramentas →](/blog/nanoimage-vs-tinypng-vs-squoosh-vs-photopea/)`,
  },
  ru: {
    category: 'Сравнения',
    title: `NanoImage vs TinyPNG: сравнение бесплатных инструментов сжатия изображений (2026)`,
    excerpt: `TinyPNG загружает ваши изображения на сервер. NanoImage — нет. Сравнение скорости, качества и приватности.`,
    readTime: '8 мин чтения',
    metaDescription: `NanoImage vs TinyPNG в 2026: сжатие в браузере vs на сервере, скорость, приватность, лимиты и функции.`,
    body: `# NanoImage vs TinyPNG: сравнение бесплатных инструментов сжатия изображений (2026)

Если вы сжимали картинки онлайн за последнее десятилетие, скорее всего пользовались TinyPNG. Панда, drag-and-drop, «мы сэкономили 73%» — почти стандарт отрасли. TinyPNG даёт отличный результат.

Но легко забыть: **TinyPNG загружает файл на сервер в Амстердаме. Каждый раз.**

**Раскрытие**: NanoImage — наш проект. Мы постарались быть честными к TinyPNG — это сильный продукт.

---

## Краткое сравнение

| | **NanoImage** | **TinyPNG** |
|---|:---:|:---:|
| Где сжатие? | В браузере (Canvas API) | Серверы TinyPNG |
| Нужна загрузка? | Нет | Да |
| Бесплатный лимит | Без лимита | 500 изображений/мес, 5 МБ каждое |
| Качество | Хорошее | Отличное (эталон) |
| Фото 5 МБ | ~200 мс локально | 2–5 с |
| Офлайн | Да | Нет |
| Другие инструменты | 14 (ресайз, кроп и т.д.) | Нет |
| API для продакшена | Скоро | Да, зрелый (~$0,009/фото после 500/мес) |
| Приватность | Файл не покидает устройство (проверяемо) | Удаление после обработки (на доверии) |

---

## Качество сжатия

Движок Tinify настраивали больше десяти лет. Наши тесты:

- **PNG-скриншоты с текстом**: TinyPNG 71%; NanoImage 58%.
- **JPG-фото**: TinyPNG 64%; NanoImage 59%.
- **PNG-логотипы с прозрачностью**: TinyPNG 78%; NanoImage 64%.

По чистому коэффициенту выигрывает TinyPNG. Но важны ли эти 10–15% в вашей задаче?

---

## Приватность

При перетаскивании файла браузер отправляет его на серверы Tinify. Политика прозрачна, GDPR соблюдён — но есть случаи, когда любая загрузка недопустима:

- **Медицина**: HIPAA, GDPR ст. 9.
- **Юриспруденция**: доказательства, legal hold.
- **Корпоративное**: макеты неанонсированных продуктов, NDA.
- **Личное**: фото детей, дома, вашего лица.

NanoImage обрабатывает всё локально. DevTools → Network — без исходящих запросов.

---

## Скорость

| Файл | TinyPNG (Wi-Fi) | TinyPNG (4G) | NanoImage |
|---|---|---|---|
| 500 КБ | 1,4 с | 2,1 с | 80 мс |
| 3 МБ | 2,3 с | 5,6 с | 180 мс |
| 8 МБ | N/A (лимит 5 МБ) | N/A | 320 мс |

На нестабильной сети TinyPNG может идти 30 с или падать. NanoImage — нет.

---

## Охват функций

TinyPNG только сжимает JPG, PNG и WebP. У NanoImage 15 инструментов: сжатие, до 100 КБ, ресайз, кроп, поворот, отражение, Ч/Б, размытие, рамка, водяной знак, JPG, мем, разделение, слияние.

Реальные задачи часто многошаговые. В NanoImage: ресайз → сжатие → водяной знак в одной вкладке.

---

## API и продакшен-пайплайны

Здесь NanoImage пока проигрывает. API Tinify зрелый и десять с лишним лет тянет e-commerce и CI. Для WordPress или серверных job — TinyPNG.

---

## Когда выбрать TinyPNG

- Оптимизация большого каталога (сотни и тысячи фото)
- Интеграция в продакшен (WordPress, CI/CD)
- Контент не чувствительный, загрузка допустима

## Когда выбрать NanoImage

- Нужно больше, чем сжатие (ресайз, кроп, конвертация, водяной знак)
- Файл не должен покидать устройство (медицина, право, NDA, личное)
- Медленный или нестабильный интернет, офлайн
- Файл > 5 МБ (бесплатный лимит TinyPNG)
- Исчерпан месячный лимит без желания платить

---

## Итог

Если сжимаете изредка и загрузка не пугает — **TinyPNG подойдёт**. Панда заслужила репутацию.

Если часто работаете с изображениями, нужен набор инструментов или важна локальная приватность — **NanoImage для вас**. TinyPNG — точная пила, NanoImage — швейцарский нож.

[**Попробовать NanoImage →**](https://nanoimage.net) | [Полное сравнение 4 инструментов →](/blog/nanoimage-vs-tinypng-vs-squoosh-vs-photopea/)`,
  },
}
