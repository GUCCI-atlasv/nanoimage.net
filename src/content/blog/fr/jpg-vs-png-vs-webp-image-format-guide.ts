export const content = `
# JPG vs PNG vs WebP — Quel format d'image devriez-vous utiliser ?

Si vous vous êtes déjà demandé pourquoi il existe autant de formats d'image — et pourquoi le choix est important — ce guide est fait pour vous.

En résumé : les différents formats font des compromis différents entre taille de fichier, qualité et fonctionnalités comme la transparence. Choisir le mauvais peut signifier des fichiers inutilement volumineux, une perte de qualité visible ou des problèmes de compatibilité.

Voici tout ce que vous devez savoir, en termes simples.

---

## Les trois formats en un coup d'œil

| | JPG | PNG | WebP |
|---|---|---|---|
| **Compression** | Avec perte | Sans perte | Les deux (avec et sans perte) |
| **Transparence** | ❌ Non | ✅ Oui | ✅ Oui |
| **Taille de fichier** | Petite | Moyenne–Grande | La plus petite |
| **Idéal pour** | Photos | Graphiques, logos, captures d'écran | Images web (tous types) |
| **Compatibilité navigateur** | Universelle | Universelle | Navigateurs modernes (95%+) |
| **Qualité lors de l'édition** | Se dégrade à chaque enregistrement | Aucune perte de qualité | Perte minimale (mode sans perte) |

---

## JPG (JPEG) — La norme pour les photos

JPG est le format dominant pour les photographies depuis les années 1990. Il fonctionne en analysant l'image et en supprimant les informations visuelles que l'œil humain est le moins susceptible de remarquer — un processus appelé **compression avec perte**.

### Comment fonctionne la compression JPG
Lorsque vous enregistrez un JPG, l'encodeur divise l'image en blocs de 8×8 pixels et applique une transformation mathématique (Transformée en cosinus discret) à chaque bloc. Les détails haute fréquence (bords nets, textures fines) sont réduits plus agressivement que les informations basse fréquence (dégradés lisses, grandes zones de couleur similaire).

Aux paramètres de haute qualité (85–100 %), ce processus est presque invisible. Aux paramètres de basse qualité (en dessous de 60 %), vous commencez à voir des « artefacts » caractéristiques — des patches en blocs, surtout autour des bords et du texte.

### Quand utiliser JPG
- ✅ Photographies et images du monde réel
- ✅ Photos de produits pour le commerce en ligne
- ✅ Images à partager par e-mail (petite taille de fichier)
- ✅ Partout où la taille du fichier compte plus que la qualité parfaite au pixel près

### Quand NE PAS utiliser JPG
- ❌ Images avec du texte (les artefacts de compression rendent le texte flou)
- ❌ Logos et icônes (les bords nets deviennent pixelisés)
- ❌ Images avec des arrière-plans transparents
- ❌ Fichiers que vous modifierez et ré-enregistrerez plusieurs fois (la qualité se dégrade à chaque fois)

---

## PNG — Le champion de la qualité et de la transparence

PNG utilise une **compression sans perte** — aucune information visuelle n'est jamais supprimée. Ce que vous mettez dedans est exactement ce que vous récupérez, pixel par pixel. Cela rend PNG idéal pour les images où la précision est importante : logos, captures d'écran, graphiques et tout ce qui implique de la transparence.

### L'avantage de la transparence
PNG prend en charge un **canal alpha** — une quatrième couche de données qui stocke les informations de transparence pour chaque pixel. Cela signifie que des parties de l'image peuvent être entièrement transparentes, entièrement opaques, ou n'importe quoi entre les deux. Ceci est essentiel pour :
- Les logos placés sur des arrière-plans de différentes couleurs
- Les éléments d'interface utilisateur (boutons, icônes)
- Les stickers et superpositions

JPG ne peut tout simplement pas faire cela. Si vous essayez d'enregistrer une image transparente en JPG, les zones transparentes se remplissent d'une couleur unie (généralement du blanc).

### Tailles de fichiers PNG
Le compromis pour la qualité sans perte est des fichiers plus volumineux. Une photographie PNG peut être 3 à 5 fois plus grande qu'un JPG équivalent. Pour une utilisation web, c'est un inconvénient significatif pour les photos — mais tout à fait acceptable pour les logos et les graphiques où les éléments visuels sont plus simples et se compressent plus efficacement.

### Quand utiliser PNG
- ✅ Logos et actifs de marque
- ✅ Captures d'écran (surtout avec des éléments d'interface et du texte)
- ✅ Images nécessitant de la transparence
- ✅ Graphiques avec des couleurs unies, des lignes nettes ou du texte
- ✅ Fichiers sources que vous modifierez plusieurs fois

### Quand NE PAS utiliser PNG
- ❌ Photographies sur des pages web (trop volumineuses, utilisez JPG ou WebP à la place)
- ❌ Quand la taille du fichier est la priorité absolue

---

## WebP — Le format web moderne

WebP a été développé par Google et lancé en 2010. Il est conçu pour offrir le meilleur des deux mondes : des fichiers plus petits que JPG et PNG, tout en prenant en charge la transparence et en offrant des modes avec et sans perte.

### L'avantage de la taille
WebP produit typiquement :
- Des fichiers **25–35 % plus petits** que JPG de qualité équivalente
- Des fichiers **26 % plus petits** que PNG équivalent

C'est une économie de bande passante significative pour les sites web, où la vitesse de chargement des images affecte directement l'expérience utilisateur et le référencement.

### Compatibilité
WebP est maintenant pris en charge par tous les principaux navigateurs modernes : Chrome, Firefox, Safari (depuis 2020), Edge et Opera. En 2024, la prise en charge des navigateurs dépasse 95 % au niveau mondial. Cependant, certains logiciels et plateformes plus anciens ne le prennent pas en charge — notamment les anciens clients de messagerie et certains éditeurs d'images.

### Quand utiliser WebP
- ✅ Images web où la performance est importante
- ✅ Quand vous souhaitez une compression maximale avec une perte de qualité minimale
- ✅ Images avec transparence qui doivent se charger rapidement
- ✅ Tout scénario où JPG ou PNG fonctionnerait mais où vous voulez un fichier plus petit

### Quand NE PAS utiliser WebP
- ❌ Quand la plateforme cible a un support WebP limité (ex. : anciens clients de messagerie)
- ❌ Quand la compatibilité avec un logiciel ancien est requise
- ❌ Lors de l'édition dans des applications qui ne prennent pas en charge WebP

---

## Comparaison de tailles de fichiers en conditions réelles

Voici un exemple typique avec une photographie de 2000×1500 px :

| Format | Paramètres | Taille du fichier |
|---|---|---|
| PNG (sans perte) | — | ~8,5 Mo |
| JPG | 90 % de qualité | ~1,8 Mo |
| JPG | 80 % de qualité | ~1,1 Mo |
| WebP | 80 % de qualité | ~780 Ko |
| WebP | Sans perte | ~6,2 Mo |

Pour une photo, WebP à 80 % de qualité offre le meilleur équilibre — une qualité visuelle similaire à JPG à 80 % mais environ 30 % plus petit.

---

## GIF et BMP — Une note rapide

Vous rencontrerez parfois deux autres formats :

**GIF** — Prend en charge l'animation (d'où sa popularité pour les mèmes et les réactions). Limité à 256 couleurs, ce qui le rend inadapté aux photographies. Pour les images statiques, PNG est toujours meilleur. Pour les animations, envisagez WebP (qui prend en charge l'animation) ou des formats vidéo.

**BMP** — Un format Windows non compressé. Les fichiers sont énormes (un BMP de 1920×1080 est généralement supérieur à 6 Mo). Il n'y a presque aucune raison d'utiliser BMP pour autre chose que des applications Windows héritées.

---

## Guide de décision rapide

**Est-ce une photographie ?** → Utilisez **JPG** (ou WebP si la plateforme le prend en charge)

**A-t-il besoin d'un arrière-plan transparent ?** → Utilisez **PNG** (ou WebP)

**Est-ce un logo, une icône ou une capture d'écran ?** → Utilisez **PNG**

**Est-ce pour un site web et vous voulez le fichier le plus petit possible ?** → Utilisez **WebP**

**L'éditerez-vous à nouveau plus tard ?** → Utilisez **PNG** (pour éviter la perte de qualité lors des ré-enregistrements)

**Doit-il fonctionner dans tous les clients de messagerie et anciens logiciels ?** → Utilisez **JPG** ou **PNG**

---

## Conversion entre formats

Besoin de changer le format d'une image ? [L'outil Convertir en JPG de NanoImage](https://nanoimage.net/convert-to-jpg) gère les conversions PNG, WebP, GIF et BMP → JPG instantanément dans votre navigateur.

---

## Outils associés

- **[Compresser l'image](https://nanoimage.net/compress-image)** — Réduire la taille du fichier JPG ou PNG sans changer de format
- **[Convertir en JPG](https://nanoimage.net/convert-to-jpg)** — Convertir PNG, WebP, GIF, BMP en JPG
- **[Redimensionner l'image](https://nanoimage.net/resize-image)** — Modifier les dimensions de l'image
`;
