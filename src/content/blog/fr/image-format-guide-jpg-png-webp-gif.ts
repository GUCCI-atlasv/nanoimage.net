export const content = `
# WebP vs JPG vs PNG vs GIF : quel format d'image choisir ?

Vous vous êtes déjà demandé pourquoi il existe autant de formats d'image — et lequel utiliser concrètement ? Ce guide couvre tout ce que vous devez savoir. Nous allons comparer les quatre formats principaux, expliquer leurs compromis et vous proposer un cadre de décision simple.

---

## Les quatre formats en un coup d'œil

| | JPG | PNG | WebP | GIF |
|---|---|---|---|---|
| **Compression** | Avec perte | Sans perte | Les deux | Sans perte (limitée) |
| **Transparence** | ❌ Non | ✅ Oui | ✅ Oui | ✅ 1 bit seulement |
| **Animation** | ❌ | ❌ | ✅ | ✅ |
| **Taille du fichier** | Petite | Moyenne–Grande | La plus petite | Grande |
| **Idéal pour** | Photos | Logos, captures d'écran | Images web (tous types) | Animations simples |
| **Support navigateurs** | Universel | Universel | 95%+ | Universel |

---

## JPG — Le standard pour les photographies

JPG est le format dominant pour les photographies depuis les années 1990. Il utilise la **compression avec perte** — en éliminant les données visuelles que l'œil humain est le moins susceptible de percevoir.

**Comment ça fonctionne :** JPG divise l'image en blocs de 8×8 pixels et applique une compression mathématique. Les détails haute fréquence (bords nets, textures fines) sont réduits plus agressivement que les zones lisses. Avec des réglages de haute qualité (85–100 %), la compression est quasi invisible. En dessous de 60 %, des « artefacts » de blocs caractéristiques apparaissent.

**Utilisez JPG quand :**
- ✅ Photographies et images du monde réel
- ✅ Photos de produits pour l'e-commerce
- ✅ La taille du fichier est importante et vous n'avez pas besoin de transparence
- ✅ Pièces jointes d'e-mail (fichier léger)

**Évitez JPG quand :**
- ❌ Images contenant du texte (les artefacts rendent le texte flou)
- ❌ Logos et icônes (les bords nets deviennent pixelisés)
- ❌ Images avec fond transparent
- ❌ Fichiers que vous éditerez et réenregistrerez à plusieurs reprises (la qualité se dégrade à chaque sauvegarde)

---

## PNG — Qualité et transparence

PNG utilise la **compression sans perte** — aucune information visuelle n'est jamais supprimée. Ce qui entre ressort pixel parfait.

**L'avantage de la transparence :** PNG supporte un canal alpha — chaque pixel peut être entièrement transparent, entièrement opaque, ou n'importe quoi entre les deux. C'est indispensable pour les logos sur différents fonds, les éléments d'interface et les stickers. JPG ne peut tout simplement pas stocker la transparence ; les zones transparentes deviennent blanc uni.

**Le compromis sur la taille :** Une photographie en PNG est généralement 3 à 5 fois plus grande que l'équivalent en JPG. Pour les photos web, c'est un inconvénient. Pour les logos et les graphiques aux couleurs unies, PNG compresse efficacement et reste le bon choix.

**Utilisez PNG quand :**
- ✅ Logos et actifs de marque
- ✅ Captures d'écran avec texte ou éléments d'interface
- ✅ Toute image nécessitant de la transparence
- ✅ Graphiques aux couleurs unies ou aux lignes nettes
- ✅ Fichiers sources que vous éditerez à plusieurs reprises

**Évitez PNG quand :**
- ❌ Photographies affichées sur des pages web (taille de fichier trop grande)
- ❌ La taille du fichier est la priorité absolue

---

## WebP — Le format web moderne

WebP a été développé par Google (sorti en 2010) pour combiner le meilleur des deux mondes : plus petit que JPG et PNG, avec support de la transparence, des modes avec et sans perte, et même de l'animation.

**L'avantage en taille :**
- **25 à 35 % plus petit** qu'un JPG de qualité équivalente
- **26 % plus petit** qu'un PNG équivalent

Ces économies de bande passante ont un impact direct sur la vitesse de chargement des pages et le SEO.

**Comparaison réelle des tailles de fichiers** (photographie 2000×1500 px) :

| Format | Réglages | Taille du fichier |
|---|---|---|
| PNG (sans perte) | — | ~8,5 Mo |
| JPG | Qualité 90 % | ~1,8 Mo |
| JPG | Qualité 80 % | ~1,1 Mo |
| WebP | Qualité 80 % (avec perte) | ~780 Ko |
| WebP | Sans perte | ~6,2 Mo |

**Support navigateurs :** Chrome, Firefox, Safari (depuis 2020), Edge, Opera — plus de 95 % à l'échelle mondiale en 2026. Les principales lacunes concernent les clients mail anciens et les logiciels très anciens.

**Utilisez WebP quand :**
- ✅ Toute image sur un site web ou une application web
- ✅ Compression maximale avec perte de qualité visible minimale
- ✅ Images transparentes devant se charger rapidement
- ✅ Tout scénario où JPG ou PNG fonctionnerait mais où vous voulez un fichier plus petit

**Évitez WebP quand :**
- ❌ Campagnes e-mail (la plupart des clients ne le supportent pas — utilisez JPG/PNG)
- ❌ Partage avec des utilisateurs sur des logiciels anciens
- ❌ Envoi à des services d'impression (utilisez TIFF ou JPG/PNG haute qualité)

---

## GIF — Les animations et leurs limites

GIF est le format d'animation d'internet depuis 1987, et son rôle culturel dans les mèmes et réactions le maintient en vie. Mais ses limitations techniques sont importantes :

**Les problèmes du GIF :**
- **Limite de 256 couleurs** — les photos sont affreuses ; des bandes et du tramage apparaissent
- **Tailles de fichiers énormes** — un GIF de 5 secondes en 480p peut peser entre 5 et 20 Mo ; le même clip en MP4 pourrait faire 500 Ko
- **Pas d'audio**
- **Compression primitive** — l'algorithme LZW du GIF est bien moins efficace que les codecs modernes

**Pourquoi le GIF persiste :** Compatibilité universelle, lecture automatique sans interaction de l'utilisateur, et ancrage culturel dans les contenus de mèmes et réactions.

**Pour les images statiques, PNG est toujours meilleur que GIF.** Pour les animations, envisagez :
- **WebP animé** — 64 à 70 % plus petit que GIF, les 16,7 millions de couleurs complètes, transparence totale. À utiliser quand vous contrôlez l'environnement d'affichage et pouvez confirmer le support des animations WebP.
- **Vidéo MP4** — plus de 90 % plus petit que GIF, qualité complète, accepte l'audio. Idéal pour le web (`<video autoplay muted loop>`), les réseaux sociaux, et tout ce qui dure plus de 3–4 secondes.

**Utilisez GIF quand :**
- ✅ Une compatibilité maximale est requise (anciens clients mail, plateformes héritées)
- ✅ L'animation est très simple (2–4 couleurs, mouvement basique)
- ✅ La plateforme requiert spécifiquement le format GIF
- ✅ Création de contenu de mèmes ou réactions pour le partage social

---

## Cadre de décision du format

**C'est une photo pour le web ?** → **WebP** (ou JPG si WebP n'est pas supporté)

**Besoin de transparence ?** → **PNG** (ou WebP pour des fichiers plus petits sur les plateformes modernes)

**C'est un logo, une icône ou une capture d'écran ?** → **PNG**

**Ça va dans un e-mail ?** → **JPG** ou **PNG** (pas WebP, pas de GIF animé pour les images complexes)

**Besoin d'animation ?** → **Vidéo MP4** (meilleur rapport qualité/taille), **WebP animé** (navigateurs modernes) ou **GIF** (compatibilité maximale)

**Vous l'éditerez à nouveau plus tard ?** → **PNG** (sans perte, pas de dégradation de qualité à la re-sauvegarde)

**Doit fonctionner dans de vieux logiciels ?** → **JPG** ou **PNG**

---

## Conversion entre formats

Besoin de changer une image d'un format à un autre ? L'[outil Convert to JPG de NanoImage](/convert-to-jpg/) gère les conversions de PNG, WebP, GIF et BMP vers JPG instantanément dans votre navigateur — sans téléchargement requis.

---

## Questions fréquentes

**WebP est-il de meilleure qualité que JPG ?**
À la même taille de fichier, oui — WebP préserve plus de détails. Avec le même réglage de qualité, WebP produit un fichier plus petit. Le plafond de qualité visuelle des deux formats est similaire.

**WebP remplacera-t-il JPG et PNG ?**
WebP gagne du terrain, mais JPG et PNG restent dominants grâce à leur compatibilité universelle. Un format plus récent, AVIF, offre une compression encore meilleure que WebP et son adoption est en croissance.

**Pourquoi les images des sites web sont-elles sauvegardées en WebP ?**
Les sites web servent du WebP aux navigateurs modernes pour les performances. Quand vous sauvegardez une image d'une page web, elle est sauvegardée dans le format que le site a servi — de plus en plus souvent WebP. Vous pouvez la convertir en JPG avec [NanoImage](/convert-to-jpg/) si besoin.

**Le GIF disparaîtra-t-il un jour ?**
Probablement pas complètement. Son rôle culturel dans les mèmes et réactions est trop ancré. Mais pour les cas d'usage techniques (performance web, animation professionnelle), il est déjà en train d'être remplacé par la vidéo et les formats modernes.

---

## Outils associés

- **[Compresser une image](/compress-image/)** — Réduire la taille d'un fichier JPG ou PNG sans changer de format
- **[Convertir en JPG](/convert-to-jpg/)** — Convertir PNG, WebP, GIF, BMP en JPG instantanément
- **[Redimensionner une image](/resize-image/)** — Modifier les dimensions d'une image pour n'importe quelle plateforme
`;
