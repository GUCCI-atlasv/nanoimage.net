export const content = `
# Comment compresser des images pour les pièces jointes d’e-mail

Vous avez pris une photo et voulez l’envoyer par e-mail — mais la pièce jointe fait 8 Mo et votre client refuse l’envoi, ou vous savez que la boîte du destinataire risque de classer le message en spam, ou le chargement sur mobile sera interminable.

Les e-mails et les grosses images ne font pas bon ménage. Voici pourquoi, et comment y remédier en moins d’une minute.

---

## Pourquoi les e-mails et les grosses images ne s’accordent pas

**Limites de taille des pièces jointes :** La plupart des fournisseurs plafonnent entre 10 et 25 Mo par e-mail. Gmail autorise jusqu’à 25 Mo ; Outlook jusqu’à 20 Mo ; Yahoo jusqu’à 25 Mo. Les messageries d’entreprise sont souvent plus strictes — 10 Mo voire 5 Mo.

**Limites côté destinataire :** Même si votre serveur accepte 20 Mo, le serveur du destinataire peut refuser. Une configuration courante en entreprise limite les pièces jointes entrantes à 10 Mo.

**Données mobiles :** Ouvrir une pièce jointe de 5 Mo en 4G consomme du forfait et du temps. Les abonnés avec peu de données peuvent retarder l’ouverture ou ne pas ouvrir du tout.

**Filtres anti-spam :** Certains filtres pénalisent les e-mails avec grosses pièces jointes, ce qui réduit les chances d’arriver en boîte de réception.

**Stockage :** L’expéditeur et le destinataire utilisent tous deux du quota. Une photo de 5 Mo dans les deux boîtes représente 10 Mo au total.

---

## Quelle taille pour les images par e-mail ?

Cela dépend de l’usage :

| Usage | Taille de fichier recommandée | Dimensions recommandées |
|---------|----------------------|----------------------|
| Partage de photos courant | 500 Ko – 1 Mo | 1200–1600 px de large |
| Photo de profil / portrait | Moins de 500 Ko | 800×800 px |
| Scan de document | Moins de 1 Mo | 1200 px de large à 150 ppp |
| Image pour newsletter | Moins de 200 Ko | 600 px de large |
| Épreuve / aperçu client | 200 Ko – 500 Ko | 1000–1200 px de large |
| Livraison qualité tirage | 3–8 Mo | Pleine résolution |

Pour les e-mails personnels et professionnels courants, **moins de 1 Mo par image** est une bonne cible. Moins de 500 Ko est préférable si vos destinataires sont souvent sur mobile.

---

## Pas à pas : compresser une image pour l’e-mail

### Étape 1 : Ouvrir NanoImage Compression

Allez sur [NanoImage Compresser une image](/compress/). Pas de compte, pas d’installation. Votre photo est traitée dans le navigateur — elle n’atteint aucun serveur.

### Étape 2 : Importer votre photo

Glissez-déposez ou cliquez pour importer. JPEG, PNG et WebP sont pris en charge.

### Étape 3 : Définir la taille cible

Dans le champ de taille cible, indiquez le poids souhaité :
- **E-mail courant :** 500–800 Ko
- **Limites serrées :** 200–300 Ko
- **Plusieurs photos (5+ images) :** 200–400 Ko chacune (le total reste sous la plupart des plafonds)

Cliquez sur **Compresser**. NanoImage trouve le niveau de qualité optimal pour approcher votre cible.

### Étape 4 : Aperçu et téléchargement

Vérifiez l’aperçu — surtout visages, texte et détails fins. À 500 Ko–1 Mo, une photo type doit être identique à l’original à la taille d’affichage d’un e-mail. Téléchargez et joignez à votre message.

---

## Faut-il redimensionner avant de compresser ?

Souvent oui. Une photo 4000×3000 compressée à 500 Ko paraîtra plus dégradée qu’une 1600×1200 à 500 Ko — la seconde peut être enregistrée à une qualité JPEG plus élevée car il y a moins de pixels à encoder.

**Flux recommandé pour les grosses photos :**

1. Ouvrez [NanoImage Redimensionnement](/resize/) et redimensionnez à **1200–1600 px de large** (grand côté)
2. Téléchargez la photo redimensionnée
3. Ouvrez [NanoImage Compression](/compress/) et fixez une cible de 500 Ko–1 Mo
4. Téléchargez et joignez

Cette approche en deux étapes offre le meilleur compromis qualité / poids.

---

## Envoyer plusieurs photos

Si vous joignez plusieurs photos dans un même e-mail, c’est le **poids total** qui compte le plus.

**Calcul rapide :**
- 5 photos à 1 Mo chacune = 5 Mo au total ✅ (correct pour la plupart des services)
- 10 photos à 2 Mo chacune = 20 Mo au total ⚠️ (proche des limites)
- 20 photos à 3 Mo chacune = 60 Mo au total ❌ (échec assuré)

Pour de gros lots, compressez chaque photo à 200–400 Ko. 20 photos à 300 Ko = 6 Mo au total — largement sous les plafonds des grands fournisseurs.

NanoImage prend en charge la compression par lots — importez plusieurs photos et appliquez la même taille cible à toutes en une fois.

---

## Alternatives à l’e-mail pour les grosses photos

Si vous devez vraiment partager des fichiers pleine résolution (tirage, usage pro, archivage), l’e-mail n’est pas l’outil adapté, compression ou non :

- **Google Drive / Dropbox / OneDrive :** Partagez un lien plutôt qu’une pièce jointe. Pas de limite de taille de fichier. Le destinataire ne télécharge que ce qu’il veut.
- **WeTransfer :** Partage gratuit jusqu’à 2 Go. Pratique pour un envoi ponctuel volumineux.
- **iCloud Photos / albums partagés Google Photos :** Idéal pour les albums familiaux.

Compressez pour l’e-mail quand le destinataire doit seulement voir la photo. Utilisez un service de fichiers quand il lui faut le fichier pleine résolution.

---

## Format d’e-mail : JPEG, PNG ou WebP ?

Pour les photos en pièce jointe, **le JPEG est le meilleur choix** :
- Pris en charge partout par les clients e-mail et systèmes d’exploitation
- Format le plus efficace pour les photos
- La plupart des clients affichent le JPEG en ligne (sans téléchargement explicite)

Évitez le WebP en pièce jointe — les anciens clients (surtout Outlook) peuvent ne pas l’afficher en ligne et montrer une icône générique.

Si votre image est un PNG (capture, graphique, logo), gardez le PNG pour le texte ou la transparence. Pour une photo en PNG, passez en JPEG avant l’envoi — la réduction de taille est énorme sans différence visible.

---

## Foire aux questions

**Mon e-mail dit « pièce jointe trop volumineuse » — que faire ?**
Compressez pour rester nettement sous la moitié de la limite annoncée. Si le serveur indique 10 Mo, visez 4–5 Mo au total.

**Le destinataire verra-t-il que l’image est compressée ?**
À 500 Ko–1 Mo pour une photo standard, non. Les clients e-mail affichent à la résolution écran (souvent 72–96 ppp), pas en qualité tirage. La compression ne se verra pas.

**Puis-je compresser un PDF pour l’e-mail ?**
NanoImage traite les fichiers image (JPEG, PNG, WebP). Pour les PDF, il faut un outil dédié.

**Dois-je ZIP les images avant d’envoyer ?**
Pour du JPEG, le ZIP apporte presque rien — le JPEG est déjà compressé. Le ZIP sert surtout à envoyer beaucoup de fichiers organisés dans un dossier, pas à réduire la taille des JPEG.

**Et si je dois envoyer un fichier très haute résolution ?**
Utilisez un service de partage (Google Drive, Dropbox, WeTransfer) et envoyez le lien par e-mail. Ne compressez jamais une photo « tirage » au point de perdre une résolution exploitable — le destinataire doit recevoir le fichier complet.

---

## Synthèse

Compresser des photos pour l’e-mail :

1. **Redimensionnez d’abord** si la photo dépasse 1600 px de large — utilisez [NanoImage Redimensionnement](/resize/)
2. **Compressez avec une cible** — 500 Ko–1 Mo pour une image seule, 200–400 Ko par image pour les lots
3. **Privilégiez le JPEG** — meilleure compatibilité avec tous les clients
4. **Vérifiez le poids total** avant d’envoyer — restez largement sous la limite de votre fournisseur

**[Compressez votre photo pour l’e-mail — gratuit, sans envoi, instantané →](/compress/)**
`;
