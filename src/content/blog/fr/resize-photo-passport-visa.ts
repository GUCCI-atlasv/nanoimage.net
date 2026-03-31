export const content = `
# Comment redimensionner une photo pour un visa ou un passeport

Les exigences pour les photos de passeport et de visa sont réputées strictes. Mauvaises dimensions, mauvais poids de fichier, mauvais arrière-plan — et votre dossier est refusé. Refaire une photo prend du temps, parfois de l’argent, et peut retarder vos projets de voyage.

Ce guide détaille les exigences des passeports et visas les plus courants et vous explique comment redimensionner et préparer votre photo vous-même — gratuitement, dans votre navigateur.

---

## Pourquoi les exigences sont-elles si strictes ?

Les photos de passeport servent à la reconnaissance faciale, à la vérification d’identité et à la correspondance biométrique. Les dimensions strictes garantissent :

- Un positionnement et une taille du visage cohérents pour la correspondance automatisée
- Un cadrage adapté au format physique du livret passeport
- Une extraction fiable des traits du visage par les systèmes numériques

La plupart des refus viennent d’un **mauvais rapport hauteur/largeur**, d’un **visage trop petit ou trop grand dans le cadre**, ou d’un **fichier trop lourd ou trop léger** — pas parce que la photo est « mauvaise » visuellement.

---

## Dimensions des photos de passeport par pays

### États-Unis (passeport américain)

| Exigence | Spécification |
|-------------|------|
| Format tirage | 2 × 2 pouces (51 × 51 mm) |
| Format numérique | 600 × 600 px minimum, jusqu’à 1200 × 1200 px |
| Rapport d’aspect | 1:1 (carré) |
| Taille du fichier | 240 Ko à 10 Mo (demandes en ligne) |
| Taille du visage | La tête doit occuper 50 à 69 % de la hauteur du cadre |
| Arrière-plan | Blanc uni ou blanc cassé |

### Royaume-Uni (passeport britannique)

| Exigence | Spécification |
|-------------|------|
| Format tirage | 35 × 45 mm |
| Rapport d’aspect | 35:45 (environ 7:9) |
| Format numérique | Minimum 600 px sur le côté le plus court |
| Taille du fichier | Moins de 10 Mo |
| Taille du visage | 29 à 34 mm du menton au sommet de la tête |
| Arrière-plan | Gris clair ou crème |

### Visa Schengen (UE)

| Exigence | Spécification |
|-------------|------|
| Format tirage | 35 × 45 mm |
| Rapport d’aspect | 35:45 |
| Taille du visage | 32 à 36 mm du menton au sommet de la tête (70 à 80 % du cadre) |
| Arrière-plan | Clair / blanc |

### Passeport canadien

| Exigence | Spécification |
|-------------|------|
| Format tirage | 50 × 70 mm |
| Rapport d’aspect | 5:7 |
| Taille du visage | 31 à 36 mm du menton au sommet de la tête |
| Arrière-plan | Blanc |

### Passeport australien

| Exigence | Spécification |
|-------------|------|
| Format tirage | 35 × 45 mm |
| Rapport d’aspect | 35:45 |
| Visage | Doit remplir 70 à 80 % du cadre |
| Arrière-plan | Uni clair |

### Passeport / visa indien

| Exigence | Spécification |
|-------------|------|
| Format tirage | 51 × 51 mm (2 × 2 pouces) |
| Format numérique | 200 × 200 px à 1000 × 1000 px |
| Taille du fichier | 10 Ko à 1 Mo |
| Arrière-plan | Blanc |

---

## Pas à pas : préparer votre photo d’identité

### Étape 1 : Prendre la photo

Avant tout redimensionnement, il vous faut une bonne photo source :

- **Arrière-plan uni :** mur blanc ou clair. Évitez les ombres — tenez-vous à une trentaine de centimètres du mur.
- **Expression neutre :** bouche fermée, yeux ouverts et bien visibles.
- **Tête droite :** regardez l’objectif. Pas d’inclinaison.
- **Sans lunettes :** la plupart des pays refusent désormais les photos avec lunettes.
- **Lumière :** éclairage uniforme sur le visage. Pas d’ombre marquée d’un côté.

Prenez la photo en bonne lumière (près d’une fenêtre, par exemple) avec l’appareil photo de votre smartphone en orientation portrait.

### Étape 2 : Recadrer au bon rapport d’aspect

Ouvrez [NanoImage Recadrage](/crop/) et importez votre photo.

Pour **États-Unis et passeport indien :** choisissez le préréglage **1:1** → placez le cadre de recadrage pour centrer le visage avec de l’espace au-dessus de la tête et sous le menton → recadrez.

Pour **Royaume-Uni, Schengen, Australie :** choisissez le rapport **Personnalisé** → saisissez **35:45** → positionnez le visage pour qu’il occupe 70 à 80 % de la hauteur du cadre → recadrez.

Pour **Canada :** choisissez **Personnalisé** → saisissez **5:7** → recadrez.

**Conseil de cadrage :** vos yeux doivent se situer dans le tiers supérieur du cadre, environ aux deux tiers de la hauteur depuis le bas de l’image.

### Étape 3 : Redimensionner aux dimensions requises

Ouvrez [NanoImage Redimensionnement](/resize/) et importez votre photo recadrée.

Saisissez les dimensions cibles en pixels. Pour la plupart des demandes en ligne :
- Passeport américain (numérique) : **600 × 600 px** (minimum) — vous pouvez aller jusqu’à 1200 × 1200 px
- Royaume-Uni / Schengen / Australie (numérique) : **600 × 771 px** (échelle 35:45 à 600 px de large)
- Canada (numérique) : **600 × 840 px** (échelle 5:7 à 600 px de large)
- Inde (numérique) : **600 × 600 px**

Vérifiez que **Verrouiller le rapport d’aspect** est activé. Comme vous avez déjà le bon rapport, les dimensions se calculent correctement.

### Étape 4 : Vérifier la taille du fichier

La plupart des portails de dépôt imposent une limite de taille (souvent 240 Ko à 10 Mo).

Contrôlez le poids de votre photo redimensionnée. S’il est trop élevé, ouvrez [NanoImage Compression](/compress/), importez la photo, définissez une taille cible légèrement sous la limite, puis téléchargez.

S’il est trop faible (rare), la résolution est peut-être trop basse — reprenez une photo à plus haute résolution.

---

## Raisons fréquentes de refus (et comment les éviter)

**Visage trop petit :** si la tête occupe moins de 50 % de la hauteur du cadre, la photo est refusée. Recadrez plus près du visage — laissez moins d’espace au-dessus de la tête.

**Visage trop grand :** si le haut de la tête ou le menton est coupé, recadrez plus large. Visez environ 70 à 80 % du cadre pour le visage.

**Mauvais rapport d’aspect :** une photo portrait extraite d’une image paysage n’a pas automatiquement le bon ratio. Utilisez toujours l’outil de recadrage avec ratio personnalisé plutôt qu’à l’œil.

**Ombre sur l’arrière-plan :** refus pour non-respect du fond uni. Reprenez la photo en vous éloignant davantage du mur.

**Fichier trop lourd :** de nombreux portails ont des plafonds stricts (parfois 240 Ko pour les demandes américaines). Utilisez la compression avec taille cible pour atteindre un poids précis en Ko.

**Mauvais format :** certains portails exigent le JPEG (pas PNG ni WebP). Utilisez [NanoImage Conversion en JPG](/convert-jpg/) pour obtenir un fichier .jpg.

---

## Pourquoi le faire dans le navigateur ?

Une photo de passeport contient votre visage en entier, des données biométriques, et est souvent associée à des informations personnelles. Un outil basé sur un serveur signifie envoyer une photo haute définition du visage à un tiers.

NanoImage traite tout dans votre navigateur — recadrage, redimensionnement et compression sur votre appareil. Votre photo ne quitte pas votre ordinateur ou votre téléphone.

---

## Foire aux questions

**Puis-je prendre ma photo de passeport chez moi ?**
Oui — pour les dépôts numériques et de nombreuses demandes en personne, les photos prises par soi-même sont acceptées si elles respectent les exigences techniques. La photo doit être récente (généralement moins de 6 mois).

**Faut-il imprimer ou peut-on tout envoyer en numérique ?**
Les nouvelles demandes de passeport (États-Unis, Royaume-Uni, Canada, Australie) proposent souvent l’envoi numérique. Consultez le portail de votre démarche. Pour un dépôt en bureau de poste ou centre photo, il faut un tirage.

**Quelle résolution utiliser ?**
Pour le numérique : 600 px sur le côté court est le minimum sur la plupart des portails. 1200 px convient partout sans dépasser les plafonds habituels.

**Puis-je porter des lunettes ?**
En 2023–2026, pratiquement tous les grands pays émetteurs refusent les photos avec lunettes, y compris correctrices et solaires. Retirez les lunettes pour la photo.

**Mon portail dit que le fichier est encore trop lourd après compression. Que faire ?**
Fixez une cible plus agressive dans NanoImage Compression — essayez 200 Ko pour les portails très stricts. À 600×600 px, un JPEG à qualité 70–75 passe souvent sous 100 Ko avec une qualité acceptable.

---

## Synthèse

Préparer vous-même votre photo de passeport ou de visa :

1. Prenez une photo bien éclairée devant un fond uni
2. [Recadrez au bon rapport d’aspect](/crop/) — 1:1 pour États-Unis / Inde, 35:45 pour Royaume-Uni / Schengen / Australie, 5:7 pour le Canada
3. [Redimensionnez aux dimensions en pixels requises](/resize/)
4. [Compressez pour respecter les limites de taille](/compress/) si nécessaire
5. [Convertissez en JPG](/convert-jpg/) si le portail exige le JPEG

**[Redimensionnez votre photo de passeport maintenant — gratuit, sans envoi, sans compte →](/resize/)**
`;
