export const content = `
Chaque plateforme a des exigences différentes pour les images. WhatsApp compresse les photos automatiquement mais les rend souvent floues. Les pièces jointes d'email sont bloquées si elles sont trop volumineuses. Instagram recadre votre photo si les dimensions ne sont pas correctes.

Ce guide vous donne les tailles exactes nécessaires pour chaque plateforme — et comment redimensionner vos images rapidement sans installer de logiciel.

## Pourquoi le redimensionnement est important

L'appareil photo de votre téléphone prend des photos à 12 mégapixels ou plus. Cela produit un fichier de 3 000 × 4 000 pixels ou plus — bien plus que ce qu'un écran de téléphone ou une plateforme de réseaux sociaux affiche réellement.

Envoyer des images surdimensionnées cause plusieurs problèmes :
- **WhatsApp** les recompresse et les rend floues
- **Les clients email** peuvent bloquer les pièces jointes dépassant une certaine taille
- **Instagram** peut les recadrer si le rapport d'aspect est incorrect
- **Les sites web** chargent lentement si les images sont trop grandes

Redimensionner avant d'envoyer vous donne le contrôle sur exactement ce que le destinataire voit.

## Tailles d'image recommandées par plateforme

### WhatsApp

| Usage | Taille recommandée |
|-------|-------------------|
| Photo de profil | 500 × 500 px |
| Photo partagée (meilleure qualité) | 1600 × 1200 px max |
| Image en document | Moins de 5Mo |

**Le problème avec WhatsApp :** Quand vous envoyez une photo normalement, WhatsApp la compresse automatiquement pour économiser la bande passante — réduisant parfois la qualité de façon significative. Pour envoyer une photo en pleine qualité, utilisez l'option "Document" au lieu du partage photo standard. Mais même ainsi, garder les images sous 2Mo est une bonne pratique.

**Meilleure approche :** Redimensionnez à 1600px sur le côté le plus long avant d'envoyer. Cela préserve la qualité visible tout en évitant une recompression agressive.

### Email

| Usage | Taille recommandée |
|-------|-------------------|
| Image dans le corps de l'email | 600–800px de large |
| Pièce jointe (général) | Moins de 1Mo par image |
| Profil / avatar | 400 × 400 px |

**Le problème avec l'email :** Les serveurs de messagerie d'entreprise ont souvent des limites de 10–25Mo au total pour les pièces jointes. Si vous envoyez plusieurs photos de 5Mo chacune, vous atteindrez la limite rapidement. Redimensionner les images à moins de 500Ko chacune vous permet d'envoyer plus de 20 photos dans un seul email.

**Meilleure approche :** Redimensionnez à 1200px de large maximum, puis compressez. Pour une seule photo qui doit être belle, 1200px de large avec une compression modérée fait généralement moins de 300Ko.

### Instagram

| Format | Taille recommandée | Rapport d'aspect |
|--------|-------------------|-----------------|
| Publication carrée | 1080 × 1080 px | 1:1 |
| Publication portrait | 1080 × 1350 px | 4:5 |
| Publication paysage | 1080 × 566 px | 1.91:1 |
| Story / Reel | 1080 × 1920 px | 9:16 |

**Le problème avec Instagram :** Si votre image ne correspond pas à l'un des rapports d'aspect pris en charge, Instagram ajoutera des bordures blanches ou la recadrera automatiquement. Aucun des deux ne rend bien.

**Meilleure approche :** Redimensionnez à exactement 1080px de large avec la hauteur correcte pour votre format. Utilisez l'[outil de Redimensionnement de NanoImage](/resize-image) pour définir des dimensions exactes en pixels.

### Autres plateformes courantes

| Plateforme | Photo de profil | Image partagée |
|------------|----------------|---------------|
| Facebook | 170 × 170 px | 1200 × 630 px (aperçu de lien) |
| Twitter/X | 400 × 400 px | 1200 × 675 px |
| LinkedIn | 400 × 400 px | 1200 × 627 px |
| Miniature YouTube | 1280 × 720 px | — |

## Comment redimensionner une image en 3 étapes (sans logiciel)

1. **Allez sur l'[outil de Redimensionnement de NanoImage](/resize-image)**
2. **Importez votre image** — glissez-déposez ou cliquez pour sélectionner
3. **Entrez les dimensions souhaitées** — définissez la largeur, la hauteur ou les deux. Activez "Verrouiller le rapport d'aspect" pour éviter de déformer l'image.
4. **Téléchargez** votre image redimensionnée

Votre image est traitée entièrement dans votre navigateur. Rien n'est importé sur un serveur.

## Redimensionner vs. Compresser — Quelle est la différence ?

Ces deux notions sont souvent confondues :

**Redimensionner** modifie les dimensions en pixels d'une image. Une image de 4000×3000 redimensionnée à 1200×900 aura moins de pixels — c'est une image physiquement plus petite.

**Compresser** réduit la taille du fichier sans nécessairement modifier ses dimensions en pixels. Une image de 1200×900 peut être compressée de 800Ko à 200Ko en réduisant la qualité JPEG.

Pour la plupart des usages pratiques, il vaut mieux faire **les deux** : d'abord redimensionner aux dimensions appropriées, puis compresser à la taille de fichier adéquate.

NanoImage dispose d'outils séparés pour chaque opération :
- [Redimensionner une image](/resize-image) — modifier les dimensions en pixels
- [Compresser une image](/compress-image) — réduire la taille du fichier

## Erreurs courantes à éviter

**Agrandir les petites images.** Si vous avez une image de 400×400 et la redimensionnez à 2000×2000, elle ne deviendra pas plus nette — elle paraîtra simplement floue et pixelisée. Le redimensionnement ne fonctionne bien que pour réduire la taille des images.

**Ignorer le rapport d'aspect.** Forcer une photo portrait (verticale) dans des dimensions carrées l'étirera ou l'écrasera. Maintenez toujours les proportions originales, sauf si vous voulez intentionnellement recadrer.

**Redimensionner après la compression.** Redimensionnez toujours d'abord, puis compressez. Si vous compressez d'abord puis agrandissez, vous amplifierez les artefacts de compression.

**Ne pas sauvegarder l'original.** Conservez toujours une copie de votre image originale en haute résolution. Une fois redimensionnée et compressée, vous ne pouvez pas récupérer les détails perdus. NanoImage ne modifie jamais votre original — il crée toujours un nouveau téléchargement.

## Référence rapide : Quelle taille utiliser ?

| Vous envoyez vers... | Redimensionnez à... |
|----------------------|-------------------|
| Chat WhatsApp | 1600px de large |
| Email (dans le corps) | 800px de large |
| Email (pièce jointe) | 1200px de large + compresser à <500Ko |
| Instagram carré | 1080 × 1080px |
| Story Instagram | 1080 × 1920px |
| Publication Twitter/X | 1200 × 675px |
| Publication LinkedIn | 1200 × 627px |
| Photo de profil (toute plateforme) | 400 × 400px ou 500 × 500px |

## Résumé

Redimensionner les images avant de les partager est l'un des moyens les plus simples d'améliorer la qualité et d'éviter les problèmes sur toutes les plateformes. Les points essentiels :

- Chaque plateforme a des dimensions idéales — utilisez le tableau ci-dessus comme référence
- Redimensionnez toujours avant de compresser, pas après
- Pour WhatsApp, visez 1600px de large pour éviter que la recompression automatique ne dégrade la qualité
- Pour Instagram, respectez le rapport d'aspect exact pour éviter le recadrage
- Utilisez un outil basé sur le navigateur pour garder vos images privées
`;
