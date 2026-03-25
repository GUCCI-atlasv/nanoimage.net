export const content = `
# Comment flouter une photo en ligne — Censurer, protéger la vie privée ou ajouter de la profondeur

Flouter une image n'est pas seulement un effet artistique — c'est souvent une nécessité pratique. Vous pourriez avoir besoin de cacher un visage dans une capture d'écran avant de la partager publiquement, d'obscurcir une plaque d'immatriculation sur une photo de rue, ou de flouter un arrière-plan encombré pour que votre sujet ressort davantage.

Quelle que soit votre raison, ce guide explique comment flouter des images en ligne rapidement et gratuitement — sans envoyer vos fichiers sur aucun serveur.

---

## Pourquoi flouter une image ?

Il y a trois raisons principales pour lesquelles les personnes floutent des photos :

### 1. Protection de la vie privée
Avant de partager des captures d'écran, des documents ou des photos publiquement, vous pourriez avoir besoin de cacher :
- Des visages (pour le consentement ou l'anonymat)
- Des informations personnelles (adresses, numéros de téléphone, adresses e-mail)
- Des plaques d'immatriculation
- Des détails financiers dans des captures d'écran
- Des noms d'utilisateur ou des photos de profil dans des captures d'écran de réseaux sociaux

### 2. Censure de contenu sensible
- Rédaction d'informations confidentielles dans des documents
- Masquage de spoilers dans du contenu de jeux vidéo ou de divertissement
- Obscurcissement de contenu inapproprié pour un public plus large

### 3. Effets artistiques et visuels
- Créer un effet « bokeh » (faible profondeur de champ) que les appareils photo professionnels produisent
- Attirer l'attention sur un sujet en adoucissant l'arrière-plan
- Ajouter une qualité onirique ou cinématographique aux photos

---

## Types de flou

Tous les flous ne se valent pas. Voici les principaux types que vous rencontrerez :

**Flou gaussien** — Le plus courant. Crée un adoucissement régulier et uniforme sur l'ensemble de l'image ou de la zone sélectionnée. Nommé d'après la courbe mathématique (distribution gaussienne) qui décrit comment les pixels sont mélangés.

**Pixélisation / Mosaïque** — Divise l'image en grands blocs carrés. Souvent utilisée pour censurer des visages et des plaques d'immatriculation — plus difficile à inverser que le flou gaussien.

**Flou de mouvement** — Simule le mouvement en floutant dans une direction. Utilisé pour des effets artistiques de vitesse.

**Flou radial** — Flou qui rayonne à partir d'un point central, créant un effet de rotation ou de zoom.

Pour la protection de la vie privée et la censure, le **flou gaussien** ou la **pixélisation** sont les choix les plus pratiques.

---

## Comment flouter une image avec NanoImage

[L'outil de flou de NanoImage](https://nanoimage.net/blur-image) applique un flou gaussien à votre image entière directement dans le navigateur. Sans envoi, sans compte, sans attente.

### Étape 1 : Ouvrir l'outil de flou
Rendez-vous sur [nanoimage.net/blur-image](https://nanoimage.net/blur-image).

### Étape 2 : Télécharger votre image
Glissez-déposez votre image ou cliquez sur **Sélectionner un fichier**. Formats acceptés : JPG, PNG, WebP, GIF, BMP.

### Étape 3 : Ajuster l'intensité du flou
Utilisez le curseur pour contrôler l'intensité de l'effet de flou :
- **Faible (1–3)** — Adoucissement subtil ; idéal pour lisser la peau ou réduire le bruit
- **Moyen (4–7)** — Flou perceptible ; idéal pour les effets d'arrière-plan
- **Fort (8–15)** — Flou intense ; idéal pour masquer des détails et protéger la vie privée
- **Maximum** — Obscurcissement complet ; le sujet est méconnaissable

### Étape 4 : Prévisualiser et télécharger
Voyez le résultat en temps réel, puis cliquez sur **Télécharger** pour enregistrer votre image floutée.

---

## Conseils pour une protection efficace de la vie privée

### Utilisez un flou plus fort pour les informations sensibles
Pour les visages, les noms ou les données financières, utilisez une valeur de flou élevée. Un flou léger peut parfois être inversé avec des outils de traitement d'image — un flou intense est beaucoup plus difficile à annuler.

### La pixélisation est meilleure que le flou pour le texte
Si vous masquez du texte (comme un mot de passe ou une adresse e-mail), la pixélisation est plus efficace que le flou gaussien. Le flou gaussien peut parfois être partiellement inversé grâce à des algorithmes d'accentuation, surtout sur du texte à fort contraste. La pixélisation brouille l'information de manière plus complète.

### Couvrez toute la zone sensible
Une erreur courante est de flouter une zone trop petite. Assurez-vous que le flou couvre l'ensemble de l'élément que vous masquez, y compris les ombres ou les reflets.

### Conservez l'original
Gardez toujours la version originale non floutée de votre fichier. NanoImage crée un nouveau fichier lors du téléchargement — votre original n'est pas touché.

---

## Créer un effet de flou d'arrière-plan

Vous voulez faire ressortir votre sujet de l'arrière-plan, comme un appareil photo professionnel avec une grande ouverture ? Voici une approche simple :

1. **Identifiez votre flux de travail :** Vous devrez flouter l'arrière-plan séparément du sujet
2. **Utilisez d'abord un outil de suppression d'arrière-plan** pour isoler votre sujet (fonctionnalité future de NanoImage — actuellement disponible sur des outils comme remove.bg)
3. **Appliquez le flou à la couche d'arrière-plan**
4. **Composez les couches ensemble**

Pour une approche plus simple ne nécessitant pas d'édition de calques : si votre sujet est déjà naturellement séparé de l'arrière-plan (par exemple, un portrait avec un arrière-plan uni), un léger flou appliqué à l'image entière puis la superposition du sujet original peut fonctionner. Cela est mieux géré dans un éditeur d'image complet si vous avez besoin d'un masquage précis.

---

## Quand le floutage ne suffit pas

Pour les informations vraiment sensibles — dossiers médicaux, documents juridiques, données financières — envisagez ces étapes supplémentaires :

- **Utilisez des barres de rédaction noires** plutôt que le flou (plus difficile à inverser)
- **Supprimez le fichier sensible** après avoir partagé la version expurgée
- **Utilisez des canaux chiffrés de bout en bout** lors du partage de documents avec du contenu sensible
- **Vérifiez que le flou est suffisant** en zoomant à 400–500 % après l'application

---

## Questions fréquentes

**Le texte flouté peut-il être récupéré ?**
En théorie, certains algorithmes de flou peuvent être partiellement inversés en utilisant le traitement d'image par « déconvolution » — mais seulement si le flou est léger et que le texte original était en haute résolution. Pour une protection pratique de la vie privée avec un paramètre de flou élevé, le texte ne peut pas être récupéré de manière significative.

**Le floutage fonctionne-t-il sur les visages ?**
Oui. Un flou gaussien de haute intensité ou un effet de pixélisation sur un visage le rend méconnaissable en pratique. Pour un usage légal ou journalistique où une anonymisation stricte est requise, vérifiez les normes spécifiques de votre juridiction.

**L'image floutée sera-t-elle un fichier plus petit ?**
Curieusement, non. Les images floutées sont souvent légèrement plus grandes que les originales car le flou réduit les bords nets que les algorithmes de compression exploitent. Si la taille du fichier est importante, compressez après avoir flouté.

**Puis-je flouter seulement une partie d'une image ?**
L'outil de flou actuel de NanoImage applique l'effet à toute l'image. Pour un floutage sélectif de zone, utilisez les outils intégrés du navigateur ou un outil de censure/rédaction dédié.

---

## Outils associés

- **[Recadrer](https://nanoimage.net/crop-image)** — Rogner la partie que vous souhaitez masquer entièrement
- **[Ajouter un filigrane](https://nanoimage.net/watermark-image)** — Ajouter des superpositions de texte aux images
- **[Compresser](https://nanoimage.net/compress-image)** — Réduire la taille du fichier après modification
`;
