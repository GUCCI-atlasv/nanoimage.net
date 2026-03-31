export const content = `
# Comment inverser les couleurs d’une image en ligne (effet négatif gratuit)

Inverser les couleurs d’une image produit un effet négatif — le noir devient blanc, le blanc deviant noir, et chaque couleur est remplacée par son opposé sur le cercle chromatique. Un clic suffit, et les usages pratiques sont plus nombreux qu’on ne croit.

---

## Que fait exactement l’inversion des couleurs ?

Lorsque vous inversez une image, chaque valeur de pixel est remplacée par son opposé mathématique. Sur une image 8 bits :

- Un pixel à **0** (noir) devient **255** (blanc)
- Un pixel à **255** (blanc) devient **0** (noir)
- Un pixel à **100** (gris foncé) devient **155** (gris clair)
- Un pixel rouge (255, 0, 0) devient cyan (0, 255, 255)
- Un pixel jaune (255, 255, 0) devient bleu (0, 0, 255)

Le résultat est le négatif couleur exact de l’image d’origine — le même effet qu’en regardant un négatif argentique classique.

---

## Usages pratiques de l’inversion des couleurs

**Créer un effet négatif photo.** Le cas d’usage classique — inverser une photo donne un rendu surréaliste. Portraits, architecture et images abstraites sont souvent saisissants une fois inversés.

**Conception d’interface mode sombre.** Les designers utilisent l’inversion pour prévisualiser des éléments d’UI sur fond sombre, ou pour créer rapidement des versions mode sombre d’icônes et d’illustrations.

**Accessibilité et lisibilité.** Certaines personnes en situation de handicap visuel ou sensibles à la lumière trouvent les couleurs inversées plus confortables. Inverser un document ou une capture peut améliorer la lecture dans certains contextes.

**Contrôle de l’équilibre des couleurs.** Photographes et designers inversent parfois une image pour repérer les dominantes — une dominante bleue devient une dominante orange évidente, plus facile à voir.

**Variations artistiques.** Les images inversées servent d’art numérique, d’affiches ou de calques dans des compositions multi-expositions.

**Lecture de scans de négatifs argentiques.** Si vous avez numérisé des négatifs directement (sans scanner dédié aux films), inverser l’image récupère l’image positive.

**Imagerie médicale et scientifique.** Certaines images (radiographie, thermique) sont inversées pour l’analyse — os en noir sur blanc ou l’inverse, inversion des dégradés thermiques.

---

## Pas à pas : inverser une image dans le navigateur

### Étape 1 : Ouvrir NanoImage Inverser les couleurs

Allez sur [NanoImage Inverser les couleurs](/invert/). Pas de compte, pas d’installation. Votre image reste sur votre appareil — rien n’est envoyé.

### Étape 2 : Importer votre image

Glissez-déposez ou cliquez pour importer. JPEG, PNG et WebP sont pris en charge.

### Étape 3 : Aperçu de l’inversion

L’image inversée s’affiche immédiatement. Observez le déplacement des couleurs — le résultat est l’inversion mathématique exacte de chaque pixel.

### Étape 4 : Téléchargement

Cliquez sur **Télécharger** pour enregistrer votre image inversée. Elle est prête à l’emploi.

---

## Idées d’images intéressantes à inverser

Certaines images donnent des résultats plus marquants que d’autres :

**Portraits :** Les tons de peau deviennent un bleu-cyan étrange. Les yeux sont souvent très dramatiques. Idéal pour un usage artistique ou éditorial.

**Paysages avec ciel bleu :** Le ciel devient orange chaud, la végétation verte devient magenta — effet paysage « alien » très marqué.

**Photos noir et blanc :** Inverser une image en niveaux de gris reproduit l’aspect « négatif film » — noir et blanc inversés, ombres et hautes lumières échangées. Très efficace sur les portraits.

**Documents texte :** Fond blanc et texte noir devient fond noir et texte blanc — utile pour une conversion type mode sombre.

**Logos et icônes :** Permet de voir rapidement le rendu sur fond sombre ou clair.

**Traits et illustrations :** Traits noirs sur papier blanc deviennent traits blancs sur fond noir — utile pour certaines techniques d’impression ou un effet craie.

---

## Inversion vs autres effets de couleur

Il faut distinguer l’inversion d’effets proches :

| Effet | Action |
|--------|--------------|
| **Inverser** | Remplace chaque pixel par sa couleur mathématiquement opposée |
| **Niveaux de gris / N&B** | Supprime toute couleur, conserve la luminosité en gris |
| **Désaturer** | Réduit l’intensité des couleurs sans tout retirer |
| **Rotation de teinte** | Décale toutes les couleurs d’un angle donné sur le cercle chromatique |
| **Négatif** | Identique à inverser (autre nom, même résultat) |
| **Solarisation** | Inversion partielle — seuls les pixels au-dessus d’un seuil de luminosité sont inversés |

L’outil Inverser les couleurs de NanoImage effectue une inversion complète. Pour passer en niveaux de gris, utilisez plutôt [NanoImage Noir et blanc](/bw/).

---

## Inversion pour récupérer un négatif argentique

Si vous avez numérisé des négatifs argentiques avec un scanner plat ou un appareil photo, vous avez probablement une image rouge-orange — base du film négatif plus couleurs inversées. Voici comment l’inversion aide :

1. Numérisez ou photographiez le négatif tel quel
2. Importez dans [NanoImage Inverser les couleurs](/invert/)
3. Inversez l’image
4. L’image positive apparaît (couleurs et tons redeviennent cohérents)

**Remarque :** La teinte orange de la base du film sera aussi inversée (vers le bleu), il faudra probablement une correction colorimétrique après inversion pour retirer la dominante. C’est une première étape simple, pas un pipeline complet négatif-positif. Les logiciels dédiés au film (Negative Lab Pro, SilverFast, etc.) sont plus précis, mais l’inversion NanoImage est un point de départ gratuit et rapide.

---

## Foire aux questions

**Inverser les couleurs, c’est la même chose que « négatif » dans les applis photo ?**
Oui — « inverser les couleurs », « négatif » et « négatif couleur » désignent la même opération : remplacer chaque valeur de pixel par son complément mathématique (255 moins la valeur d’origine pour chaque canal).

**Puis-je inverser seulement une partie de l’image ?**
L’outil d’inversion de NanoImage s’applique à l’image entière. Pour une inversion sélective (un visage, un objet), il faut un éditeur plus avancé comme Photoshop ou GIMP.

**L’inversion dégrade-t-elle la qualité ?**
Non. L’inversion est une opération mathématique sans perte — chaque pixel est recalculé à une valeur exacte. Aucune approximation. La qualité de sortie est identique à l’entrée.

**Puis-je inverser un PNG avec transparence ?**
Oui — NanoImage préserve la transparence (canal alpha) lors de l’inversion. Seuls les canaux RVB sont inversés ; les zones transparentes restent transparentes.

**Comment retrouver l’original après inversion ?**
Inversez à nouveau. Deux inversions successives ramènent chaque pixel exactement à sa valeur d’origine. Si vous avez enregistré l’image inversée, rouvrez-la dans NanoImage et inversez de nouveau — vous retrouvez les couleurs d’origine.

---

## Synthèse

Inverser les couleurs d’une image :

1. Ouvrez [NanoImage Inverser les couleurs](/invert/)
2. Importez votre image
3. Prévisualisez l’effet négatif
4. Téléchargez — terminé instantanément

Un clic, sans envoi, sans compte.

**[Inversez les couleurs de votre image gratuitement →](/invert/)**
`;
