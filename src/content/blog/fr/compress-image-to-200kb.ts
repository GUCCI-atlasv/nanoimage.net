export const content = `
De nombreux sites web, applications et services de messagerie imposent des limites strictes sur la taille des fichiers. Une photo de profil doit peser moins de 100Ko. Une pièce jointe ne peut pas dépasser 200Ko. Votre photo fait 3Mo et vous ne savez pas quoi faire.

Ce guide vous montre les méthodes les plus simples pour compresser une image à 200Ko — sans installer de logiciel et sans envoyer votre photo sur le serveur d'un inconnu.

## Pourquoi les fichiers doivent-ils peser moins de 200Ko ?

Les limites de taille existent pour des raisons de bande passante, de stockage et de vitesse de chargement. Voici les situations les plus courantes où vous les rencontrerez :

- **Formulaires administratifs et demandes de visa** — beaucoup exigent des photos de moins de 200Ko, voire 50Ko
- **Portails d'emploi** — l'import de photos pour le CV a souvent des limites très strictes
- **Courrier électronique** — certains systèmes d'entreprise bloquent les pièces jointes volumineuses
- **WhatsApp et applications de messagerie** — les images sont compressées automatiquement, mais parfois vous avez besoin d'une taille précise
- **Import sur des sites web** — photos de profil, images de produits, avatars

Ce qui est frustrant, c'est que les appareils photo modernes des téléphones produisent des images de 3Mo à 10Mo. Une seule photo d'iPhone peut peser 8Mo — soit 40 fois plus que la limite de 200Ko.

## Méthode 1 : Utilisez NanoImage (Gratuit, sans import de fichier)

Le moyen le plus rapide de compresser une image à exactement moins de 200Ko est d'utiliser l'[outil de compression de NanoImage](/compress-image).

**Pourquoi NanoImage est différent :** La plupart des compresseurs en ligne importent votre image sur leurs serveurs, la traitent, puis vous la renvoient. Votre photo passe par l'ordinateur d'une entreprise que vous ne connaissez pas. NanoImage traite tout directement dans votre navigateur — votre image ne quitte jamais votre appareil.

**Étapes :**

1. Allez sur [nanoimage.net/compress-image](/compress-image)
2. Cliquez sur **Importer une image** ou glissez-déposez votre photo
3. L'outil trouve automatiquement la meilleure compression pour passer sous les 200Ko
4. Cliquez sur **Télécharger** pour enregistrer votre image compressée

C'est tout. Pas de compte nécessaire, pas de filigrane ajouté, entièrement gratuit.

**Quels formats de fichier sont pris en charge ?** JPG, PNG, WebP et GIF.

## Méthode 2 : Ajuster la taille manuellement

Si vous avez besoin d'une taille cible différente de 200Ko, vous pouvez ajuster manuellement le curseur de qualité sur la plupart des outils de compression.

Quelques points à connaître :

- **La compression JPEG** fonctionne en réduisant les détails dans les zones où l'œil humain est moins sensible. À 80% de qualité, la plupart des gens ne voient pas la différence avec l'original. À 60%, vous pourriez commencer à percevoir un léger flou dans les zones détaillées.
- **Les fichiers PNG** sont sans perte par défaut. Convertir un PNG en JPG avant de compresser vous donnera généralement un fichier beaucoup plus petit.
- **La résolution compte aussi.** Une image de 4000×3000 pixels sera toujours plus lourde qu'une image de 1200×900 à la même qualité. Si vous n'avez besoin de l'image que pour l'écran (pas pour l'impression), réduire les dimensions d'abord est très efficace.

## Méthode 3 : Réduire les dimensions d'abord, puis compresser

Parfois, l'approche la plus efficace est de redimensionner l'image avant de la compresser.

Pour la plupart des usages sur écran, une image n'a pas besoin de dépasser 1200 pixels de large. Si votre original fait 4000 pixels de large, le redimensionner à 1200 pixels réduira la taille du fichier d'environ 90% avant même d'appliquer une compression.

Vous pouvez le faire en deux étapes avec NanoImage :

1. Utilisez d'abord l'[outil de Redimensionnement](/resize-image) pour réduire les dimensions
2. Puis utilisez l'[outil de Compression](/compress-image) pour atteindre votre taille cible

## Que devient la qualité d'image après compression ?

C'est la préoccupation la plus fréquente. La réponse courte : **pour un usage quotidien, vous ne remarquerez pas la différence.**

Voici ce qui change réellement :

- Les détails très fins (comme la texture d'un tissu ou les feuilles individuelles d'un arbre) sont légèrement lissés
- Les zones plates de couleur (comme un ciel bleu ou un fond blanc) sont à peine affectées
- Pour les photos portrait, les tons de peau et les visages restent généralement très bien même à des niveaux de compression élevés

Une photo compressée à 200Ko depuis 5Mo paraîtra quasiment identique sur un écran de téléphone ou une page web. La différence ne serait visible que si vous zoomez de très près ou l'imprimez en grand format.

## Conseils pour obtenir la plus petite taille de fichier

- **Utilisez le JPG plutôt que le PNG** pour les photographies. Le PNG est préférable pour les graphiques avec du texte ou des fonds transparents. Pour les photos, le JPG est presque toujours plus léger à qualité similaire.
- **Supprimez les métadonnées (données EXIF).** Votre appareil photo intègre la localisation GPS, les informations de l'appareil et les réglages dans chaque photo. Supprimer ces données peut vous faire économiser 10 à 50Ko sur certaines images.
- **Redimensionnez avant de compresser.** Si l'image va s'afficher à 400×400 pixels à l'écran, elle n'a pas besoin de faire 3000×3000 pixels.

## Questions fréquentes

**La compression à 200Ko va-t-elle endommager ma photo originale ?**
Non. NanoImage télécharge une nouvelle copie compressée. Votre fichier original sur votre appareil reste intact.

**Que faire si mon image est encore trop lourde après la compression maximale ?**
Si l'image dépasse toujours 200Ko à la qualité minimale, c'est que l'image est trop grande en termes de dimensions. Utilisez l'[outil de Redimensionnement](/resize-image) pour réduire les dimensions en pixels d'abord, puis compressez à nouveau.

**Est-il sûr de compresser des photos sensibles en ligne ?**
Avec NanoImage, oui — car votre image ne quitte jamais votre navigateur. Avec d'autres outils qui importent vers un serveur, vous confiez vos données à cette entreprise. Vérifiez toujours la politique de confidentialité d'un outil avant d'importer des fichiers sensibles.

**Puis-je compresser plusieurs images en même temps ?**
La compression par lot est dans la feuille de route de NanoImage. Actuellement, les images sont traitées une par une.

## Résumé

Compresser une image à 200Ko est simple quand on connaît le bon outil. Les points essentiels :

- Utilisez un outil basé sur le navigateur comme NanoImage pour garder vos images privées
- Pour les grandes photos, redimensionnez les dimensions avant de compresser
- Le format JPG offre les tailles de fichier les plus petites pour les photographies
- La qualité à 200Ko est largement suffisante pour le web, les emails et la plupart des formulaires
`;
