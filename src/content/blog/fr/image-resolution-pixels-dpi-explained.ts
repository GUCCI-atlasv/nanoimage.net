export const content = `
# Résolution d'image expliquée : pixels, DPI et pourquoi ça compte

Vous avez probablement entendu les termes « résolution », « pixels » et « DPI » lorsqu'on parle de qualité d'image. Mais que signifient-ils vraiment — et quand est-ce que cela vous concerne ?

Ce guide explique la résolution d'image en termes simples, pour que vous puissiez prendre des décisions intelligentes concernant la taille, la qualité et le format de vos images.

---

## Qu'est-ce qu'un pixel ?

Un **pixel** (abréviation de « picture element », ou élément d'image) est la plus petite unité d'une image numérique. Zoomez suffisamment sur n'importe quelle photo numérique et vous la verrez se décomposer en une grille de petits carrés colorés — ce sont les pixels.

Le nombre total de pixels dans une image constitue sa **résolution**. Une image de 1920×1080 comporte 1 920 pixels en largeur et 1 080 pixels en hauteur, pour un total d'environ 2 millions de pixels — c'est pourquoi on l'appelle « 2 mégapixels » (MP).

Plus de pixels signifie :
- Plus de détails et de netteté
- Des fichiers plus volumineux
- La capacité d'imprimer en plus grand format ou de recadrer davantage sans perte de qualité

---

## Qu'est-ce que le DPI ?

**DPI** signifie « dots per inch » (points par pouce). Il décrit combien de pixels sont compressés dans un pouce d'espace physique lorsqu'une image est imprimée ou affichée.

C'est là que beaucoup de personnes se confondent, car le DPI est un **concept d'impression** — il n'a pas vraiment de sens pour les images affichées sur des écrans.

Voici pourquoi : les écrans affichent les images à la taille qui convient à l'affichage. Une image de 1920×1080 sur un moniteur de 24 pouces paraît différente de la même image sur un écran de téléphone de 5 pouces. Les pixels par pouce varient selon l'appareil, mais l'image elle-même est inchangée.

Lorsque vous **imprimez** une image, le DPI devient essentiel car il détermine la netteté de l'impression à une taille physique spécifique.

---

## Résolution pour écran vs. impression

### Pour les écrans
La plupart des écrans affichent entre 72 et 144 PPI (pixels par pouce). Normes courantes :
- **Moniteurs standard :** ~96 PPI
- **Écrans Retina / HiDPI :** 192–264 PPI
- **Écrans de smartphones :** 300–460 PPI

Pour les images web, ce qui compte sont les **dimensions en pixels**, pas le paramètre DPI. Une image à 72 DPI et une image à 300 DPI avec les mêmes dimensions en pixels paraissent identiques à l'écran.

### Pour l'impression
C'est là que le DPI est important. La recommandation standard :

| Cas d'utilisation | DPI recommandé |
|---|---|
| Impression photo professionnelle | 300 DPI |
| Imprimante domestique | 200–300 DPI |
| Grand format affiche (vu de loin) | 100–150 DPI |
| Panneau d'affichage (vu à plus de 10 m) | 15–30 DPI |
| Document de bureau standard | 150–200 DPI |

**La règle :** plus le spectateur sera proche de l'impression, plus le DPI doit être élevé.

---

## Calculer la taille d'impression à partir des dimensions en pixels

Voici la formule clé :

> **Taille d'impression (en pouces) = Dimension en pixels ÷ DPI**

Donc si vous avez une image de 3000×2000 pixels et que vous souhaitez l'imprimer à 300 DPI :
- Largeur : 3000 ÷ 300 = **10 pouces**
- Hauteur : 2000 ÷ 300 = **6,67 pouces**

Si vous essayez d'imprimer cette même image de 3000×2000 en plus grand — disons 20×13 pouces à 300 DPI — vous auriez besoin d'une image de 6000×3900 pixels. Étirer l'image de 3000×2000 à cette taille signifie imprimer à seulement 150 DPI, ce qui paraîtra nettement flou.

---

## Pourquoi les images sont belles à l'écran mais floues à l'impression

C'est l'un des problèmes d'image les plus courants rencontrés par les personnes.

**La cause :** Une image qui paraît nette à l'écran peut ne pas avoir suffisamment de pixels pour la taille d'impression physique souhaitée.

**Exemple :** Une photo d'une application de messagerie ou d'un réseau social est souvent compressée à 1080×1080 pixels. Sur un écran de 5 pouces de large, c'est environ 216 PPI — suffisamment net. Mais essayez de l'imprimer en 20×20 cm à 300 DPI, et vous n'avez que 135 DPI — nettement flou.

**La solution :** Utilisez toujours la résolution originale la plus élevée que vous avez. Pour l'impression professionnelle, votre image doit avoir suffisamment de pixels pour imprimer à 300 DPI à la taille souhaitée.

---

## Mégapixels et résolution d'appareil photo

Vous verrez souvent des appareils photo commercialisés par leur nombre de mégapixels. Voici ce que cela signifie pour l'impression :

| Résolution de l'appareil photo | Taille d'impression maximale à 300 DPI |
|---|---|
| 8 MP (3264×2448) | ~27,7 × 20,8 cm |
| 12 MP (4000×3000) | ~33,9 × 25,4 cm |
| 20 MP (5472×3648) | ~46,3 × 31 cm |
| 48 MP (8000×6000) | ~67,7 × 50,8 cm |

Les smartphones modernes avec des appareils photo de 12 à 50 MP peuvent produire une excellente qualité d'impression pour les formats standard comme 10×15 cm, 13×18 cm et 20×25 cm.

---

## Erreurs courantes de résolution

### Utiliser des images basse résolution pour l'impression
Télécharger des images depuis des sites web pour les utiliser dans des documents imprimés est une erreur classique. Les images de sites web sont optimisées pour de petites tailles de fichiers à la résolution d'écran — elles ont rarement suffisamment de pixels pour une impression de qualité.

### Confondre « redimensionner » et « augmenter la résolution »
Redimensionner une image à des dimensions plus grandes n'ajoute pas d'informations de pixels — cela étire simplement les pixels existants. Une image de 500×500 redimensionnée à 2000×2000 paraîtra floue car le logiciel devine les détails manquants (ce processus s'appelle « mise à l'échelle ascendante » ou « suréchantillonnage »).

### Ignorer le DPI lors de l'export pour l'impression
Certains outils de conception permettent de définir le DPI lors de l'export. Si vous exportez une image optimisée pour le web à 72 DPI mais que vous avez l'intention de l'imprimer, vous pourriez obtenir une impression physique plus petite que prévu — ou floue.

---

## Référence rapide : résolution pour les usages courants

| Cas d'utilisation | Dimensions en pixels recommandées |
|---|---|
| Bannière pleine largeur de site web | 1920×1080 px minimum |
| Publication Instagram (carré) | 1080×1080 px |
| Portrait Instagram | 1080×1350 px |
| Couverture Facebook | 851×315 px |
| Bannière LinkedIn | 1584×396 px |
| Image de newsletter e-mail | 600–800 px de large |
| Impression photo 10×15 cm (300 DPI) | 1200×1800 px |
| Impression photo 20×25 cm (300 DPI) | 2400×3000 px |
| Impression document A4 (300 DPI) | 2480×3508 px |

---

## Gérer la résolution d'image avec NanoImage

Besoin de redimensionner une image à des dimensions exactes en pixels ? [L'outil de redimensionnement de NanoImage](https://nanoimage.net/resize-image) vous permet de définir des dimensions exactes en pixels directement dans votre navigateur — sans aucun logiciel.

Besoin de réduire la taille du fichier sans changer les dimensions ? [Compresser](https://nanoimage.net/compress-image) gère cela aussi.

---

## Outils associés

- **[Redimensionner l'image](https://nanoimage.net/resize-image)** — Définir des dimensions exactes en pixels
- **[Compresser l'image](https://nanoimage.net/compress-image)** — Réduire la taille du fichier tout en conservant les dimensions
- **[Recadrer l'image](https://nanoimage.net/crop-image)** — Supprimer les zones indésirables et modifier le format
`;
