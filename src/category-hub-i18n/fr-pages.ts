import type { CategoryHubPagesPartial } from './types'

export const frCategoryHubPages: CategoryHubPagesPartial = {
  'optimize-images': {
    seo: {
      title: 'Optimiser des images en ligne – Compresser, redimensionner et agrandir',
      description:
        'Optimisez vos images en ligne gratuitement. Compressez, redimensionnez, compressez par lot et agrandissez JPG, PNG, WebP et GIF directement dans votre navigateur, sans inscription ni envoi.',
      h1: 'Optimiser des images en ligne',
      hero:
        'Rendez vos images plus légères, plus nettes et plus faciles à partager. Outils gratuits dans le navigateur pour compresser, redimensionner, optimiser par lot ou agrandir sans envoyer vos fichiers.',
    },
    introMarkdown: `## Optimisez vos images en ligne pour des sites plus rapides, un partage plus simple et une meilleure qualité

L'optimisation d'images est l'un des moyens les plus simples d'accélérer et de simplifier le travail numérique. Les fichiers volumineux ralentissent les sites, prolongent les envois, remplissent les pièces jointes et échouent souvent face aux limites strictes des formulaires. NanoImage propose un ensemble ciblé d'[outils d'optimisation d'images](/tools/optimize-images) gratuits en ligne pour réduire la taille, modifier les dimensions, compresser plusieurs fichiers ou agrandir une image basse résolution directement dans votre navigateur.

La catégorie Optimiser des images couvre les tâches quotidiennes : compresser un JPG avant un e-mail, redimensionner un PNG pour une bannière web, réduire un WebP pour un chargement plus rapide ou agrandir une petite image pour une présentation. Chaque outil reste simple pour des retouches ponctuelles, avec des contrôles utiles : format de sortie, qualité, dimensions et taille cible.

Utilisez [Compresser une image en ligne](/compress-image) lorsque l'objectif principal est de réduire la taille. La compression convient aux images de blog, photos produits, formulaires, téléversements de documents et visuels pour les réseaux sociaux. Pour respecter une limite précise, choisissez un compresseur cible comme [100 Ko](/compress-image-to-100kb), [200 Ko](/compress-image-to-200kb), [500 Ko](/compress-image-to-500kb) ou [1 Mo](/compress-image-to-1mb).

Utilisez [Redimensionner une image en ligne](/resize-image) lorsque les dimensions posent problème. Une photo de téléphone peut faire 4000 pixels de large, alors qu'une vignette web n'en demande souvent que 1200 ou moins. Le redimensionnement réduit fortement la taille tout en gardant une image claire pour l'usage prévu.

Utilisez [Compression par lot](/batch-compress) pour préparer plusieurs images d'un coup. Au lieu d'envoyer et télécharger fichier par fichier, traitez un groupe ensemble. Idéal pour vendeurs e-commerce, blogueurs, designers, étudiants et toute personne préparant de nombreuses photos pour le web.

Utilisez [Agrandir une image en ligne](/upscale-image) lorsque l'image est trop petite et doit paraître plus nette en grand format. L'agrandissement aide pour anciennes captures, petites photos produits, visuels sociaux ou images à intégrer dans une mise en page plus large.

NanoImage se distingue car l'optimisation se fait dans votre navigateur lorsque c'est possible. Vos images sont traitées localement sur votre appareil plutôt qu'envoyées sur un serveur. Le flux est plus rapide pour de nombreux fichiers et protège mieux photos privées, documents personnels, brouillons produits et travaux clients.

Pour un résultat optimal, choisissez l'outil selon le problème. Fichier trop lourd : compressez. Mauvaises dimensions : redimensionnez. Beaucoup de fichiers : compression par lot. Image trop petite : agrandissez. Vous pouvez aussi combiner : redimensionner puis compresser ; convertir en WebP puis compresser ; ou supprimer les EXIF avant publication.`,
    scenarios: [
      { question: 'Besoin d\'un fichier plus petit ?', toolSlug: 'compress-image' },
      { question: 'Besoin d\'une limite exacte (100 Ko) ?', toolSlug: 'compress-image-to-100kb' },
      { question: 'Besoin d\'une limite exacte (200 Ko) ?', toolSlug: 'compress-image-to-200kb' },
      { question: 'Besoin de nouvelles dimensions ?', toolSlug: 'resize-image' },
      { question: 'Besoin de traiter plusieurs fichiers ?', toolSlug: 'batch-compress' },
      { question: 'Besoin d\'une image plus grande ?', toolSlug: 'upscale-image' },
    ],
    faqs: [
      { q: 'Les outils d\'optimisation NanoImage sont-ils gratuits ?', a: 'Oui. Compression, redimensionnement, lot et agrandissement sont gratuits, sans inscription pour les usages essentiels.' },
      { q: 'Compresser ou redimensionner en premier ?', a: 'Redimensionnez d\'abord si les dimensions ne conviennent pas à la plateforme. Compressez si le fichier est trop lourd. Beaucoup de flux combinent les deux.' },
      { q: 'La compression réduit-elle la qualité visible ?', a: 'Avec des réglages raisonnables (souvent 80–92 pour JPG/WebP), les photos restent quasi identiques tandis que la taille chute nettement.' },
      { q: 'Mes fichiers sont-ils envoyés sur votre serveur ?', a: 'NanoImage traite les images dans votre navigateur lorsque c\'est pris en charge. Vos fichiers restent sur votre appareil pendant l\'optimisation.' },
      { q: 'Quel format pour un site web ?', a: 'WebP produit souvent des fichiers plus petits que JPG pour les photos. PNG convient mieux à la transparence et aux graphiques nets. Convertissez en WebP, puis compressez si besoin.' },
    ],
    howItWorks: [
      'Importez ou déposez votre image dans le navigateur — aucun compte requis.',
      'Choisissez compression, redimensionnement, lot ou agrandissement et prévisualisez.',
      'Téléchargez instantanément. Combinez avec conversion ou suppression EXIF si nécessaire.',
    ],
  },
  'edit-images': {
    seo: {
      title: 'Modifier des images en ligne – Recadrer, pivoter, retourner et améliorer',
      description:
        'Modifiez des images en ligne gratuitement. Recadrez, pivotez, retournez, ajoutez du texte, changez l\'arrière-plan, améliorez et ajustez les couleurs dans votre navigateur. Sans inscription ni filigrane.',
      h1: 'Modifier des images en ligne',
      hero:
        'Retouches rapides sans installer de logiciel. Recadrez, pivotez, retournez, ajoutez du texte, changez les arrière-plans, améliorez et ajustez les couleurs avec des outils gratuits dans le navigateur.',
    },
    introMarkdown: `## Modifier des images en ligne sans installer de logiciel

Vous n'avez pas toujours besoin d'un éditeur photo complexe pour une modification utile. La plupart des retouches sont simples : recadrer, pivoter une photo de travers, retourner, ajouter du texte, changer la couleur de fond, améliorer une photo sombre ou préparer une photo d'identité. NanoImage regroupe ces [outils d'édition d'images en ligne](/tools/edit-images) dans un espace rapide, gratuit et basé sur le navigateur.

Utilisez [Recadrer une image en ligne](/crop-image) pour supprimer des zones indésirables, mettre le sujet en valeur ou adapter un ratio. Le recadrage convient aux photos de profil, vignettes, images e-commerce, couvertures de blog, documents et posts sociaux.

Utilisez [Pivoter une image en ligne](/rotate-image) lorsqu'une photo apparaît de côté ou à l'envers — fréquent lors des transferts entre téléphones, appareils photo, apps et sites.

Utilisez [Retourner une image en ligne](/flip-image) pour un effet miroir horizontal ou vertical. Utile pour selfies, mises en page, scans, orientation produit et effets créatifs.

Utilisez [Ajouter du texte à une image](/add-text) pour légendes, étiquettes, instructions, mèmes, vignettes ou visuels promotionnels simples.

Utilisez [Changer l'arrière-plan](/change-background) lorsque la couleur de fond ne convient pas. Pratique pour images produits, photos type identité, graphiques simples et fiches e-commerce.

Utilisez [Améliorer une image](/enhance-image) pour des ajustements rapides — luminosité, contraste, saturation, netteté et clarté.

Utilisez [Changer les couleurs](/change-color) pour remplacer, ajuster ou teinter des couleurs.

Utilisez [Créateur de photo d'identité](/passport-photo) pour un format officiel avec contrôle de taille, fond et poids du fichier.

Un bon flux combine souvent plusieurs outils : recadrer, [redimensionner en ligne](/resize-image), [compresser en ligne](/compress-image), puis [supprimer les EXIF](/remove-exif) avant publication. L'atout majeur de NanoImage : simplicité et confidentialité — édition rapide dans le navigateur, sans inscription ni filigrane au téléchargement.`,
    scenarios: [
      { question: 'Besoin de recadrer ou changer le ratio ?', toolSlug: 'crop-image' },
      { question: 'Photo de travers ou à l\'envers ?', toolSlug: 'rotate-image' },
      { question: 'Besoin d\'un effet miroir ?', toolSlug: 'flip-image' },
      { question: 'Besoin de légendes ou étiquettes ?', toolSlug: 'add-text' },
      { question: 'Besoin d\'un fond propre ?', toolSlug: 'change-background' },
      { question: 'Besoin de corrections rapides ?', toolSlug: 'enhance-image' },
      { question: 'Besoin d\'une photo passeport ou visa ?', toolSlug: 'passport-photo' },
    ],
    faqs: [
      { q: 'Dois-je installer un logiciel ?', a: 'Non. Tous les outils d\'édition fonctionnent dans votre navigateur sur ordinateur et mobile.' },
      { q: 'Différence entre recadrer et redimensionner ?', a: 'Le recadrage supprime des parties pour changer le cadrage. Le redimensionnement modifie les dimensions en pixels de l\'image entière.' },
      { q: 'Pivoter et retourner dans le même flux ?', a: 'Oui. Corrigez l\'orientation avec Pivoter, puis retournez si besoin.' },
      { q: 'Les retouches ajoutent-elles un filigrane ?', a: 'Non. Les téléchargements NanoImage sont propres, sans filigrane d\'outil.' },
      { q: 'Mes photos sont-elles envoyées ?', a: 'Le traitement se fait dans votre navigateur lorsque c\'est pris en charge. Les fichiers restent sur votre appareil.' },
    ],
    howItWorks: [
      'Ouvrez l\'outil d\'édition — recadrage, rotation, retournement, texte, etc.',
      'Importez votre image et ajustez les paramètres dans le navigateur.',
      'Téléchargez le fichier modifié. Redimensionnez ou compressez si la plateforme impose des limites.',
    ],
  },
  'convert-formats': {
    seo: {
      title: 'Convertir des formats d\'image en ligne – JPG, PNG, WebP, PDF',
      description:
        'Convertissez des formats d\'image en ligne gratuitement. Changez JPG, PNG, WebP, GIF et autres fichiers dans votre navigateur, sans inscription, avec téléchargement instantané.',
      h1: 'Convertir des formats d\'image en ligne',
      hero:
        'Convertissez vos images au format souhaité. Transformez JPG, PNG, WebP, GIF et autres fichiers en formats web ou document directement dans votre navigateur.',
    },
    introMarkdown: `## Convertir des formats d'image en ligne pour le web, les documents et le partage

Chaque format d'image répond à un usage. JPG pour les photos, PNG pour la transparence et les captures, WebP pour des fichiers web légers, GIF pour l'animation, PDF souvent requis pour documents ou soumissions. La catégorie [convertir des formats d'image en ligne](/tools/convert-formats) de NanoImage vous aide à changer de format sans installer de logiciel.

Utilisez [Convertir une image en ligne](/convert-image) pour un convertisseur général JPG, PNG, WebP, GIF, BMP, etc. Utilisez [Convertir JPG/PNG en WebP](/convert-to-webp) pour des pages web ou orientées performance — WebP produit souvent des fichiers plus petits avec une bonne qualité visuelle.

Utilisez [Convertisseur image en PDF](/image-to-pdf) pour transformer une ou plusieurs images en document : reçus, formulaires scannés, devoirs, pièces d'identité ou fichiers imprimables.

Le bon format dépend de l'usage final. JPG pour photos sans transparence. PNG pour captures, graphiques et logos. WebP pour le web quand la taille compte. PDF pour soumission, impression ou partage documentaire.

La conversion s'inscrit souvent dans un flux plus large : redimensionner un gros PNG, convertir en WebP, puis [compresser en ligne](/compress-image). Ou convertir une photo de téléphone en JPG pour un formulaire, puis compresser pour respecter une limite. NanoImage garde le flux simple — importer, choisir le format, télécharger.

Beaucoup cherchent parce qu'un téléversement bloque : « JPG uniquement », « WebP obligatoire » ou « soumettre en PDF ». Ce hub indique quel outil résout le problème et y mène directement. Le traitement dans le navigateur, axé sur la confidentialité, compte car les utilisateurs convertissent souvent des pièces d'identité, reçus, visuels professionnels et assets clients sensibles.`,
    scenarios: [
      { question: 'Quel convertisseur choisir ?', toolSlug: 'convert-image' },
      { question: 'Besoin de fichiers web plus légers ?', toolSlug: 'convert-to-webp' },
      { question: 'Besoin d\'un document à partir d\'images ?', toolSlug: 'image-to-pdf' },
      { question: 'Fichier encore trop lourd après conversion ?', toolSlug: 'compress-image' },
    ],
    faqs: [
      { q: 'JPG vs PNG vs WebP — lequel choisir ?', a: 'JPG pour photos, PNG pour transparence et graphiques nets, WebP pour fichiers web plus petits avec bonne qualité.' },
      { q: 'Convertir plusieurs images à la fois ?', a: 'Convertir une image prend en charge la conversion par lot pour de nombreux flux courants.' },
      { q: 'Que devient la transparence en JPG ?', a: 'Le JPG n\'a pas de canal alpha. Les zones transparentes deviennent une couleur de fond unie que vous choisissez.' },
      { q: 'Convertir des images en PDF ?', a: 'Oui. Image en PDF fusionne jusqu\'à 20 images en un PDF avec contrôle de taille de page et marges.' },
      { q: 'Les conversions sont-elles traitées localement ?', a: 'Oui, lorsque c\'est pris en charge — les fichiers sont traités dans votre navigateur plutôt qu\'envoyés pour conversion.' },
    ],
    howItWorks: [
      'Choisissez Convertir, WebP ou PDF selon votre besoin de sortie.',
      'Importez les fichiers et sélectionnez format cible et options de qualité.',
      'Téléchargez les fichiers convertis. Compressez ou redimensionnez si la plateforme impose des limites.',
    ],
  },
  'create-more': {
    seo: {
      title: 'Créer des images en ligne – GIF, mèmes, collages et grilles',
      description:
        'Créez des images en ligne gratuitement. Réalisez GIF, mèmes, collages photo, grilles photo et grilles de dessin dans votre navigateur, sans inscription ni filigrane.',
      h1: 'Créer des images en ligne',
      hero:
        'Transformez vos photos en visuels partageables. Créez GIF, mèmes, collages, grilles photo et grilles de dessin avec des outils simples et gratuits dans le navigateur.',
    },
    introMarkdown: `## Créer des images, GIF, mèmes, collages et grilles partageables

Les images ne se contentent pas d'être éditées — elles se créent aussi. La catégorie [créer des images en ligne](/tools/create-more) de NanoImage regroupe les outils pour produire du contenu visuel à partir de photos existantes ou de mises en page vides.

Utilisez [Créateur de GIF](/gif-maker) pour animer plusieurs images — réactions, aperçus produits, avant/après et explications visuelles légères.

Utilisez [Générateur de mèmes](/meme-generator) pour ajouter rapidement du texte en gras en haut et en bas. Pour plus de contrôle typographique, essayez [Ajouter du texte à une image](/add-text).

Utilisez [Créateur de collage](/image-collage) pour combiner plusieurs photos — posts Instagram, mood boards, récaps d'événements et vitrines produits.

Utilisez [Grille photo](/photo-grid) pour des mises en page 2×2, 3×3 et 4×4 structurées — portfolios, comparaisons et posts sociaux nécessitant alignement et cohérence.

Utilisez [Créateur de grille](/grid-maker) pour ajouter une grille de dessin à une photo de référence ou créer des grilles imprimables vides pour artistes, étudiants et enseignants.

Les flux créatifs passent souvent par plusieurs outils : [recadrer en ligne](/crop-image) avant un collage, [redimensionner en ligne](/resize-image) avant une grille, [compresser en ligne](/compress-image) avant envoi, ou [ajouter un filigrane](/add-watermark) sur le visuel final. NanoImage garde la création légère — rapide, gratuite, privée, sans inscription.`,
    scenarios: [
      { question: 'Besoin d\'un GIF animé ?', toolSlug: 'gif-maker' },
      { question: 'Besoin de texte style mème ?', toolSlug: 'meme-generator' },
      { question: 'Combiner plusieurs photos ?', toolSlug: 'image-collage' },
      { question: 'Besoin d\'une grille alignée ?', toolSlug: 'photo-grid' },
      { question: 'Besoin d\'une grille de référence pour dessiner ?', toolSlug: 'grid-maker' },
    ],
    faqs: [
      { q: 'GIF vs vidéo — quand utiliser le créateur de GIF ?', a: 'Les GIF conviennent aux boucles courtes, réactions et animations simples sans lecteur vidéo.' },
      { q: 'Collage vs grille photo ?', a: 'Les collages sont des mises en page créatives libres. Les grilles photo privilégient des cellules égales et un alignement net.' },
      { q: 'Les téléchargements ont-ils un filigrane ?', a: 'Non. NanoImage n\'ajoute pas de filigrane aux images ou GIF créés.' },
      { q: 'Ajouter du texte après un mème ?', a: 'Oui. Le générateur de mèmes est le plus rapide pour les mises en page classiques ; Ajouter du texte offre plus de contrôle typographique.' },
      { q: 'Faut-il un compte ?', a: 'Aucun compte requis pour les outils de création essentiels.' },
    ],
    howItWorks: [
      'Choisissez GIF, mème, collage, grille ou grille de dessin selon votre sortie.',
      'Importez des images ou configurez la mise en page dans le navigateur.',
      'Téléchargez votre création. Redimensionnez ou compressez avant de publier sur les réseaux.',
    ],
  },
  'privacy-protection': {
    seo: {
      title: 'Outils de confidentialité image – EXIF, flou, pixelisation et filigrane',
      description:
        'Protégez la confidentialité de vos images en ligne. Supprimez les EXIF, floutez les visages, pixelisez les zones sensibles et ajoutez des filigranes dans votre navigateur, sans inscription ni envoi.',
      h1: 'Outils de confidentialité et protection d\'images',
      hero:
        'Protégez les détails sensibles avant de partager. Supprimez les métadonnées, floutez les zones privées, pixelisez visages ou plaques et ajoutez des filigranes directement dans votre navigateur.',
    },
    introMarkdown: `## Protégez vos images avant de les partager en ligne

Chaque image peut contenir plus d'informations que prévu — métadonnées de localisation, détails appareil, horodatages, visages, plaques, adresses et détails privés en arrière-plan. Les [outils de confidentialité d'images](/tools/privacy-protection) de NanoImage vous aident à préparer un partage plus sûr.

Utilisez [Supprimer les données EXIF](/remove-exif) pour retirer les métadonnées cachées. Les EXIF peuvent inclure modèle d'appareil, date, heure et parfois position GPS. Utile avant de partager photos de voyage, images personnelles, travaux clients, captures ou documents.

Utilisez [Flouter une image en ligne](/blur-image) pour masquer des informations tout en gardant l'image naturelle — visages, adresses, plaques, numéros de compte et détails de fond.

Utilisez [Pixeliser une image en ligne](/pixelate-image) pour une confidentialité visuelle plus forte. La pixelisation censure souvent visages, pièces d'identité, plaques et zones sensibles dans les captures.

Utilisez [Ajouter un filigrane à une image](/add-watermark) pour protéger la propriété ou décourager la réutilisation non autorisée avec texte ou logo.

La confidentialité des images a deux niveaux : détails visibles et métadonnées cachées. Un flux complet peut exiger les deux — [supprimer les EXIF](/remove-exif) et flouter ou pixeliser les zones sensibles. NanoImage privilégie le traitement dans le navigateur pour que les utilisateurs soucieux de leur vie privée n'aient pas à envoyer des images sensibles vers des serveurs inconnus.

Cas courants : masquer des visages sur photos de classe, retirer le GPS des photos de téléphone, flouter des plaques avant de publier une voiture, pixeliser des noms d'utilisateur dans des captures, ajouter un filigrane à des photos produits avant partage public.`,
    scenarios: [
      { question: 'Besoin de retirer les métadonnées cachées ?', toolSlug: 'remove-exif' },
      { question: 'Besoin de masquer visages ou plaques ?', toolSlug: 'blur-image' },
      { question: 'Besoin d\'une censure évidente ?', toolSlug: 'pixelate-image' },
      { question: 'Besoin de protéger la propriété ?', toolSlug: 'add-watermark' },
    ],
    faqs: [
      { q: 'Qu\'est-ce que les données EXIF ?', a: 'Les EXIF sont des métadonnées intégrées à de nombreuses photos — réglages appareil, date, heure et parfois coordonnées GPS.' },
      { q: 'Flou vs pixelisation — lequel est mieux ?', a: 'Le flou paraît naturel pour les visages ; la pixelisation est plus difficile à inverser et signale clairement une censure volontaire. Flou ou pixelisation fort pour texte et chiffres.' },
      { q: 'Le flou supprime-t-il les EXIF ?', a: 'Non. Retirez les métadonnées séparément avec Supprimer EXIF après la censure visuelle.' },
      { q: 'Les outils de confidentialité sont-ils gratuits ?', a: 'Oui. Les outils essentiels sont gratuits, sans inscription.' },
      { q: 'Mes fichiers sensibles sont-ils envoyés ?', a: 'NanoImage traite les fichiers dans votre navigateur lorsque c\'est pris en charge — vérifiez via DevTools → Network pendant le traitement.' },
    ],
    howItWorks: [
      'Importez l\'image que vous comptez partager publiquement.',
      'Supprimez EXIF, floutez, pixelisez ou filigranez selon les besoins — souvent en combinaison.',
      'Téléchargez et vérifiez l\'image finale avant publication.',
    ],
  },
  'ai-tools': {
    seo: {
      title: 'Outils d\'image IA gratuits en ligne — sur l\'appareil, sans upload',
      description:
        'Suppression d\'arrière-plan IA, gomme à objets, restauration de photos et recadrage intelligent — le tout exécuté localement dans votre navigateur. Vos images ne quittent jamais votre appareil. Gratuit, sans compte, sans filigrane.',
      h1: 'Outils d\'image IA — sur l\'appareil, sans upload',
      hero:
        'Des outils d\'image IA qui n\'envoient toujours pas vos photos. Les modèles sont téléchargés une fois dans le navigateur, puis toute l\'inférence tourne localement.',
    },
  },
  'video-tools': {
    seo: {
      title: 'Outils vidéo en ligne gratuits – Convertir vidéo en GIF ou MP3',
      description:
        'Utilisez des outils vidéo en ligne gratuits pour convertir des clips en GIF ou extraire l\'audio MP3. Outils rapides dans le navigateur, sans inscription, téléchargements simples.',
      h1: 'Outils vidéo en ligne gratuits',
      hero:
        'Convertissez de courts clips vidéo en GIF partageables ou extrayez l\'audio en MP3. Outils vidéo simples et gratuits pour des flux rapides dans le navigateur.',
    },
    introMarkdown: `## Outils vidéo en ligne simples pour GIF, audio et conversions rapides

Les fichiers vidéo sont utiles, mais pas toujours les plus faciles à partager. Un court clip peut mieux fonctionner en GIF animé, tandis qu'un enregistrement peut être plus utile en MP3. Les [outils vidéo en ligne gratuits](/tools/video-tools) de NanoImage offrent des conversions simples et ciblées sans logiciel d'édition complexe.

Utilisez [Convertisseur vidéo en GIF](/video-to-gif) pour réactions, tutoriels, aperçus produits, posts sociaux et explications visuelles rapides. Les GIF bouclent automatiquement et s'intègrent souvent plus facilement que les vidéos.

Utilisez [Convertisseur vidéo en MP3](/video-to-mp3) pour extraire l'audio de notes vocales, cours, interviews, enregistrements d'écran et clips de référence.

Cette catégorie est un utilitaire léger — importer ou sélectionner une vidéo, choisir la sortie, traiter et télécharger. Les outils vidéo se connectent au reste de NanoImage : convertir en GIF puis [compresser](/compress-image) ou [recadrer](/crop-image) ; extraire MP3 pour podcasts ou notes.

Les GIF conviennent aux clips courts et mouvements simples. L'extraction MP3 est idéale quand vous n'avez besoin que du son. Si le traitement se fait dans le navigateur pour les fichiers pris en charge, les fichiers restent sur votre appareil — consultez l'avis de confidentialité de chaque outil.`,
    scenarios: [
      { question: 'Besoin d\'une boucle pour chat ou réseaux ?', toolSlug: 'video-to-gif' },
      { question: 'Besoin de l\'audio seulement ?', toolSlug: 'video-to-mp3' },
      { question: 'GIF trop lourd après conversion ?', toolSlug: 'compress-image' },
      { question: 'Besoin de texte mème sur une image ?', toolSlug: 'meme-generator' },
    ],
    faqs: [
      { q: 'Quelle durée de vidéo pour un GIF ?', a: 'Les clips courts (quelques secondes à ~15 s) fonctionnent le mieux. Les clips plus longs produisent des GIF très volumineux.' },
      { q: 'Vidéo en MP3 — la vidéo est-elle conservée ?', a: 'Non. L\'export MP3 est audio uniquement. Conservez le fichier vidéo original si vous avez besoin des deux.' },
      { q: 'Les outils vidéo sont-ils gratuits ?', a: 'Oui. Les outils de conversion essentiels sont gratuits, sans inscription.' },
      { q: 'Quels formats sont pris en charge ?', a: 'Formats courants pris en charge par le navigateur comme MP4 et WebM. Voir chaque page d\'outil pour les détails.' },
      { q: 'Modifier le GIF après conversion ?', a: 'Oui. Utilisez les outils image — recadrage, redimensionnement, compression ou texte — sur les images exportées ou flux associés.' },
    ],
    howItWorks: [
      'Ouvrez Vidéo en GIF ou Vidéo en MP3 et importez votre clip.',
      'Ajustez qualité, timing ou paramètres audio si nécessaire.',
      'Téléchargez le GIF ou MP3. Utilisez les outils image pour optimiser davantage.',
    ],
  },
}
