export const content = `
# Comment remettre une photo prise de travers dans le bon sens

Vous prenez une photo en tenant votre téléphone à la verticale, vous la téléversez quelque part — et elle apparaît sur le côté. Ou vous numérisez un document et le PDF s'affiche pivoté à 90 degrés. Ou vous recevez une image d'un collègue et elle s'ouvre à l'envers dans tous les programmes que vous essayez.

C'est l'un des problèmes photo les plus courants et les plus agaçants. Voici pourquoi cela se produit et comment y remédier en quelques secondes.

---

## Pourquoi les photos apparaissent de travers (Le problème d'orientation EXIF)

La cause la plus fréquente des photos de travers n'est pas que les données de l'image sont réellement de travers — c'est que la photo a été prise dans une orientation, mais les **métadonnées EXIF** indiquent qu'elle doit être pivotée.

Voici ce qui se passe :

1. Vous tenez votre téléphone pour prendre une photo en portrait
2. Le capteur de la caméra capture l'image dans son orientation physique
3. Le téléphone enregistre une balise EXIF qui dit « faire pivoter de 90 degrés dans le sens horaire lors de l'affichage »
4. Les logiciels qui lisent les données EXIF (iPhone, Chrome, la plupart des apps modernes) l'affichent correctement en portrait
5. Les logiciels qui ignorent les données EXIF affichent l'image brute — de travers

C'est pourquoi une photo semble normale sur votre téléphone mais apparaît de travers quand vous la téléversez sur un site web, l'envoyez par e-mail ou l'ouvrez dans certains programmes.

**La solution :** Faire pivoter l'image et la sauvegarder avec la rotation intégrée dans les données de pixels — pas seulement enregistrée dans les métadonnées.

---

## Autres raisons pour lesquelles les photos apparaissent de travers

**Documents numérisés :** Les scanners à plat ne détectent pas toujours automatiquement l'orientation. Placer un document de travers ou l'insérer sur le côté produit un scan pivoté.

**Captures d'écran d'interfaces pivotées :** Si vous prenez une capture d'écran alors que votre appareil est en mode paysage, la capture est en paysage. Dans un contexte portrait, cela apparaît de travers.

**Images téléchargées :** Certaines images sont intrinsèquement pivotées en raison de la façon dont elles ont été exportées depuis un logiciel ou un appareil photo.

**Appareils reflex :** De nombreux appareils reflex et sans miroir n'ont pas d'accéléromètres. Les photos prises avec l'appareil photo pivoté peuvent ne pas avoir de métadonnées d'orientation du tout.

---

## Étape par étape : corriger une photo de travers

### Étape 1 : Ouvrir NanoImage Rotation

Rendez-vous sur [NanoImage Rotation d'image](/rotate-image/). Fonctionne dans n'importe quel navigateur — sans compte, sans installation, sans envoi sur un serveur.

### Étape 2 : Téléversez votre photo

Glissez-déposez ou cliquez pour téléverser. JPEG, PNG et WebP sont pris en charge.

### Étape 3 : Choisissez la rotation

- **90° dans le sens horaire :** Le haut du sujet pointe vers la gauche
- **90° dans le sens antihoraire :** Le haut du sujet pointe vers la droite
- **180° :** La photo est à l'envers

Si vous n'êtes pas sûr, regardez de quel côté se trouve le ciel (ou le plafond) et faites pivoter en conséquence.

### Étape 4 : Téléchargez

Cliquez sur **Rotation** puis sur **Télécharger**. La rotation est intégrée dans le fichier image — le résultat s'affiche correctement dans tous les programmes, navigateurs et plateformes.

---

## Comment savoir dans quel sens faire pivoter

**Cherchez des indices liés à la gravité :** L'eau dans un verre est au fond. Les cheveux tombent vers le bas. Les horizons sont horizontaux. Le texte se lit de gauche à droite.

**Observez les traits du visage :** Les nez pointent vers l'avant. Les yeux sont horizontaux.

**Vérifiez le contexte :** Qu'est-ce qui devrait se trouver en haut de l'image ? Faites pivoter jusqu'à ce que cet élément soit en haut.

En cas de doute, essayez d'abord 90° dans le sens horaire — c'est le problème d'orientation le plus courant avec les photos portrait prises sur des appareils Android.

---

## Corriger la rotation de façon permanente (pas seulement les métadonnées)

C'est la partie cruciale : certains outils « font pivoter » une photo en ne mettant à jour que la balise d'orientation EXIF, sans modifier réellement les données de pixels. L'image semble pivotée à l'écran, mais est toujours stockée de travers.

Si vous téléversez cette image sur une plateforme qui ignore les données EXIF, elle réapparaît de travers.

NanoImage fait pivoter les données de pixels réelles, pas seulement les métadonnées. La rotation est permanente et s'affiche correctement partout — qu'importe si le lecteur lit les balises EXIF ou non.

---

## Scénarios courants et leurs solutions

**La photo portrait apparaît de travers lors du téléversement sur des sites web :**
Problème le plus fréquent. Faites pivoter de 90° dans la bonne direction. La plateforme ignore les métadonnées EXIF.

**La page du PDF numérisé est de travers :**
NanoImage fonctionne avec des fichiers image — si votre scan est un PDF, exportez d'abord la page en JPEG (la plupart des lecteurs PDF permettent d'exporter des pages en images), puis faites pivoter.

**Les photos d'un ancien appareil photo sont de travers :**
Les anciens appareils sans accéléromètres n'enregistrent pas l'orientation. Faites pivoter manuellement et sauvegardez — la rotation sera conservée.

**L'image s'ouvre correctement dans une application mais de travers dans une autre :**
Une application lit l'orientation EXIF, l'autre non. Faire pivoter et sauvegarder à nouveau avec NanoImage intègre la rotation dans les données de pixels, corrigeant le problème dans toutes les applications.

**L'image est légèrement inclinée, pas exactement à 90° :**
Utilisez la rotation d'angle personnalisé de NanoImage pour corriger une légère inclinaison. Entrez un angle spécifique (par exemple, 2,5° ou −3°) pour redresser une photo légèrement de travers.

---

## Rotation vs. miroir : quelle est la différence ?

**Rotation :** Fait pivoter l'image d'un nombre de degrés fixe — 90°, 180°, 270°, ou tout angle personnalisé. L'image tourne autour de son centre.

**Miroir :** Crée une image miroir horizontalement (de gauche à droite) ou verticalement (de haut en bas).

Si votre photo est de travers, vous avez besoin de **rotation**, pas d'un miroir. Si votre photo est l'image miroir de ce que vous vouliez (fréquent avec les selfies), utilisez l'outil séparé [Retourner l'image](/flip-image/).

---

## Questions fréquentes

**Pourquoi ma photo semble normale sur mon téléphone mais apparaît de travers partout ailleurs ?**
Votre téléphone lit les données d'orientation EXIF et les affiche en conséquence. De nombreux sites web, formulaires de téléversement et programmes ne le font pas. Faire pivoter et sauvegarder à nouveau avec NanoImage corrige cela de façon permanente.

**La rotation réduit-elle la qualité de l'image ?**
Faire pivoter un JPEG de exactement 90°, 180° ou 270° peut être fait sans perte — sans réencoder les données JPEG. NanoImage utilise une rotation sans perte quand c'est possible, préservant la qualité complète de l'image.

**J'ai fait pivoter mon image mais elle semble toujours de travers après le téléchargement. Que s'est-il passé ?**
Essayez d'ouvrir le fichier téléchargé dans un programme différent, ou téléversez-le sur un site web pour vérifier son affichage. Certains visionneuses de photos remplacent l'affichage en fonction de leur propre lecture EXIF.

**Puis-je ne faire pivoter qu'une partie d'une image ?**
Non — la rotation s'applique à toute l'image. Pour une rotation sélective, vous auriez besoin d'un éditeur photo plus avancé.

---

## Résumé

Corriger une photo de travers prend environ 10 secondes :

1. Ouvrez [NanoImage Rotation d'image](/rotate-image/)
2. Téléversez votre photo
3. Sélectionnez 90° dans le sens horaire, 90° dans le sens antihoraire, ou 180°
4. Téléchargez — la rotation est intégrée de façon permanente dans le fichier

**[Corrigez votre photo de travers — gratuit, sans téléversement, sans compte →](/rotate-image/)**
`;
