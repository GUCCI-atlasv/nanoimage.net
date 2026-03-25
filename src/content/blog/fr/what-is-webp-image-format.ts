export const content = `
# Qu'est-ce que WebP ? Le format d'image moderne qui accélère les sites web

Vous avez probablement remarqué de plus en plus de fichiers \`.webp\` apparaître lorsque vous enregistrez des images depuis des sites web, ou vu votre navigateur afficher des images dans un format que vous ne reconnaissez pas. WebP est de plus en plus présent partout — mais la plupart des gens ne savent pas ce que c'est réellement ni pourquoi c'est important.

Ce guide explique WebP en termes simples : ce que c'est, pourquoi il a été créé, comment il se compare à JPG et PNG, et que faire lorsque vous en rencontrez un.

---

## Qu'est-ce que WebP ?

WebP est un format d'image développé par **Google**, lancé pour la première fois en 2010 et progressivement adopté sur le web depuis lors. Il a été spécifiquement conçu pour rendre les pages web plus rapides en produisant des fichiers d'images plus petits que les formats existants — sans perte notable de qualité visuelle.

Le nom vient de « Web Picture » (image web) — il a été conçu spécifiquement pour le web, plutôt qu'adapté de formats plus anciens conçus pour l'impression ou le stockage.

---

## Pourquoi WebP a-t-il été créé ?

Les images représentent généralement la plus grande partie du poids total d'une page web. Selon HTTP Archive, les images représentent environ 50 % du poids moyen d'une page web. Réduire la taille des fichiers d'images — même modestement — a un impact direct sur :

- **La vitesse de chargement des pages** — Un chargement plus rapide améliore l'expérience utilisateur
- **L'utilisation de la bande passante** — Une consommation de données plus faible pour les utilisateurs sur les réseaux mobiles
- **Le référencement** — Google utilise la vitesse des pages comme signal de classement ; un chargement d'images plus rapide aide

JPG et PNG avaient bien servi le web pendant des décennies, mais ils avaient été conçus au début des années 1990. Google voulait un format spécialement conçu pour les performances web modernes.

---

## Comment fonctionne WebP ?

WebP utilise des algorithmes de compression plus sophistiqués que JPG ou PNG :

**Pour la compression avec perte** (comme JPG), WebP utilise une technique basée sur le codec vidéo VP8. Cette approche est meilleure pour préserver les détails dans les zones complexes (visages, textures) tout en compressant plus agressivement les zones plus simples — résultant en des fichiers plus petits avec une dégradation moins visible qu'un JPG équivalent.

**Pour la compression sans perte** (comme PNG), WebP utilise le codage prédictif — il analyse chaque pixel par rapport à ses voisins et ne stocke que la différence, plutôt que la valeur absolue de chaque pixel. C'est plus efficace que l'approche de PNG.

WebP prend également en charge l'**animation** (comme GIF, mais avec une bien meilleure compression) et la **transparence** (canal alpha, comme PNG).

---

## WebP vs JPG vs PNG : les chiffres

Comparaisons de tailles de fichiers en conditions réelles sur une photographie typique de 1920×1080 :

| Format | Paramètre de qualité | Taille du fichier | Taille relative |
|---|---|---|---|
| PNG (sans perte) | — | 8,4 Mo | 100 % |
| JPG | 90 % | 1,7 Mo | 20 % |
| JPG | 80 % | 1,1 Mo | 13 % |
| WebP (sans perte) | — | 6,1 Mo | 73 % |
| WebP (avec perte) | 80 % | 780 Ko | 9,3 % |

Pour les photographies, WebP à 80 % de qualité produit des fichiers environ **30 % plus petits** qu'un JPG équivalent tout en paraissant pratiquement identiques à l'œil humain.

---

## Récapitulatif des fonctionnalités WebP

| Fonctionnalité | WebP | JPG | PNG | GIF |
|---|---|---|---|---|
| Compression avec perte | ✅ | ✅ | ❌ | ❌ |
| Compression sans perte | ✅ | ❌ | ✅ | ✅ (limité) |
| Transparence | ✅ | ❌ | ✅ | ✅ (1 bit) |
| Animation | ✅ | ❌ | ❌ | ✅ |
| Taille du fichier | La plus petite | Petite | Moyenne–Grande | Moyenne |
| Compatibilité navigateur | 95%+ | Universelle | Universelle | Universelle |

---

## Compatibilité avec les navigateurs et les plateformes

WebP est maintenant pris en charge par tous les principaux navigateurs modernes :
- **Chrome** — depuis 2010
- **Firefox** — depuis 2019
- **Safari** — depuis 2020 (macOS Big Sur / iOS 14)
- **Edge** — depuis 2018
- **Opera** — depuis 2013

Début 2026, la prise en charge des navigateurs dépasse 95 % au niveau mondial. Les principales lacunes de compatibilité se trouvent dans les environnements d'entreprise anciens fonctionnant sous d'anciennes versions d'Internet Explorer, et certains clients de messagerie plus anciens.

**Important :** De nombreux clients de messagerie ne prennent toujours pas en charge WebP. Si vous préparez des images pour des newsletters par e-mail, utilisez JPG ou PNG pour garantir qu'elles s'affichent correctement pour tous les destinataires.

---

## Quand utiliser WebP

**✅ Utilisez WebP pour :**
- Toute image sur un site web ou une application web
- Quand vous souhaitez des fichiers plus petits sans sacrifier la qualité visible
- Images avec transparence qui doivent se charger rapidement
- Images animées (en alternative au GIF)
- Applications web progressives et web mobile

**❌ Évitez WebP quand :**
- La destination est une campagne e-mail (utilisez JPG/PNG)
- Vous devez partager le fichier avec quelqu'un utilisant un logiciel plus ancien
- La plateforme cible ne confirme pas la prise en charge de WebP
- Vous envoyez à un service d'impression (utilisez TIFF ou JPG/PNG de haute qualité)

---

## Travailler avec des fichiers WebP

### Ouvrir des fichiers WebP
Les navigateurs modernes ouvrent les fichiers WebP nativement. Pour l'édition, la plupart des versions actuelles des éditeurs d'images prennent en charge WebP :
- **Photoshop** (CC 2021 et versions ultérieures) — prise en charge native
- **GIMP** — prise en charge native
- **Aperçu (Mac)** — prise en charge native
- **Photos Windows** — prise en charge native

Les versions plus anciennes de ces applications peuvent ne pas ouvrir WebP. Si vous êtes bloqué avec un logiciel plus ancien, convertir d'abord en JPG ou PNG est la solution.

### Convertir WebP en JPG ou PNG
Besoin de convertir un fichier WebP téléchargé en un format plus compatible ? [L'outil Convertir en JPG de NanoImage](https://nanoimage.net/convert-to-jpg) gère la conversion WebP → JPG entièrement dans votre navigateur. Sans envoi, sans compte requis.

### Convertir JPG/PNG en WebP
La plupart des éditeurs d'images prenant en charge WebP vous permettent d'« Enregistrer sous » WebP. Pour une conversion rapide en ligne, plusieurs outils prennent en charge cela — bien que NanoImage se concentre actuellement sur la conversion en JPG.

---

## Devriez-vous passer votre site web en WebP ?

Si vous gérez un site web, passer à WebP est l'une des améliorations de performance les plus impactantes que vous puissiez apporter. Les outils Lighthouse et PageSpeed Insights de Google signaleront les images non-WebP comme une opportunité d'optimisation.

**Comment implémenter WebP sur votre site :**
- Utilisez l'élément HTML \`<picture>\` pour servir WebP avec un fallback JPG/PNG pour les navigateurs plus anciens
- De nombreuses plateformes CMS (WordPress avec des plugins, Shopify, Squarespace) convertissent automatiquement les images en WebP
- L'optimisation d'images de Cloudflare peut servir WebP automatiquement aux navigateurs pris en charge

---

## Questions fréquentes

**WebP est-il de meilleure qualité que JPG ?**
À la même taille de fichier, oui — WebP préserve plus de détails. Au même paramètre de qualité, WebP produit un fichier plus petit. Le plafond de qualité visuelle des deux formats est similaire.

**WebP remplacera-t-il JPG et PNG ?**
WebP gagne du terrain, mais JPG et PNG restent dominants en raison de leur compatibilité universelle. Un format plus récent, AVIF, offre une compression encore meilleure que WebP et est en train de s'imposer parallèlement à lui.

**Pourquoi les images des sites web s'enregistrent-elles en WebP ?**
Les sites web servent du WebP aux navigateurs modernes pour les performances. Lorsque vous enregistrez une image d'une page web, elle s'enregistre dans le format que le site a servi — de plus en plus WebP. Vous pouvez le convertir en JPG avec NanoImage si nécessaire.

---

## Outils associés

- **[Convertir en JPG](https://nanoimage.net/convert-to-jpg)** — Convertir les fichiers WebP en JPG ou d'autres formats
- **[Compresser l'image](https://nanoimage.net/compress-image)** — Réduire la taille des fichiers JPG ou PNG
- **[Redimensionner l'image](https://nanoimage.net/resize-image)** — Modifier les dimensions de l'image
`;
