export const content = `
Vous avez une photo à compresser, faire pivoter ou redimensionner. Vous cherchez en ligne, trouvez un outil, importez votre image et téléchargez le résultat. Assez simple.

Mais qu'est-il arrivé à votre photo entre-temps ?

La plupart des gens ne se posent jamais la question. Cet article explique ce qui se passe réellement quand vous importez une image dans un outil en ligne — et comment vous protéger quand vous devez modifier des photos sensibles.

## Que se passe-t-il quand vous importez une image en ligne ?

Quand vous utilisez un outil d'image typique en ligne, voici le processus en coulisses :

1. Vous sélectionnez votre photo et cliquez sur importer
2. Votre image est envoyée via internet au serveur de l'outil (un ordinateur possédé ou loué par cette entreprise)
3. Le serveur traite votre image (la compresse, la redimensionne, etc.)
4. L'image traitée est renvoyée à votre navigateur pour le téléchargement

Votre photo se trouve sur l'ordinateur de quelqu'un d'autre pendant ce processus. Qu'elle y reste ensuite dépend entièrement des politiques de cette entreprise — et la plupart des gens ne lisent jamais ces politiques.

## Conservent-ils vraiment vos images ?

La réponse honnête : **cela dépend de l'outil, et la plupart ne vous le disent pas clairement.**

Voici les différentes approches adoptées par les outils :

**"Supprimées immédiatement après le traitement"** — Certains outils affirment supprimer les fichiers importés instantanément après le téléchargement. C'est la politique la plus respectueuse de la vie privée pour les outils basés sur serveur. Mais "immédiatement" signifie souvent quelques secondes à quelques minutes, et vous faites confiance à leur parole.

**"Supprimées après X heures"** — De nombreux outils conservent vos fichiers pendant 1 à 24 heures pour vous permettre de les re-télécharger. C'est courant et pratique, mais votre image reste sur leur serveur pendant ce temps.

**"Peuvent être conservées pour améliorer le service"** — C'est préoccupant. Certains outils utilisent les images importées pour entraîner des systèmes ou améliorer des algorithmes. Cela est généralement enfoui dans les conditions d'utilisation.

**Aucune politique déclarée** — De nombreux petits outils n'abordent tout simplement pas ce sujet. L'absence de politique déclarée n'équivaut pas à une politique protectrice de la vie privée.

## Pourquoi c'est vraiment important

Pour la plupart des images — une photo de produit, un mème, une capture d'écran de quelque chose de public — le risque pour la vie privée est faible. Mais considérez ces scénarios :

**Documents officiels et pièces d'identité.** De nombreuses demandes de visa et de permis exigent des photos avec des exigences de taille spécifiques. Les gens compressent régulièrement des photos de passeports, cartes d'identité et documents officiels avec des outils en ligne quelconques. Ces documents contiennent votre nom complet, date de naissance, adresse et numéro d'identification.

**Images médicales.** Captures d'écran d'applications de santé, photos d'examens médicaux, photos d'ordonnances. Ce sont parmi les fichiers les plus sensibles que vous puissiez avoir sur votre téléphone.

**Documents professionnels et financiers.** Captures de contrats, relevés financiers, courriels confidentiels. Si vous les compressez pour un envoi professionnel, les faire transiter par un serveur tiers est un risque de sécurité.

**Photos personnelles.** Photos de vous, de votre famille, de votre maison — même si elles ne sont pas immédiatement sensibles, ce sont des données personnelles que vous ne souhaitez peut-être pas voir stockées sur des serveurs inconnus.

## En quoi les outils basés sur le navigateur sont différents

Une catégorie plus récente d'outils d'image traite tout directement dans votre navigateur, grâce à une technologie appelée Canvas API. Ces outils n'ont jamais besoin d'envoyer votre image où que ce soit.

Quand vous utilisez un outil basé sur le navigateur comme [NanoImage](https://nanoimage.net) :

1. Vous sélectionnez votre photo
2. Le traitement se fait entièrement dans votre navigateur, sur votre propre appareil
3. Le résultat est enregistré directement sur votre appareil
4. À aucun moment votre image ne transite par internet vers un serveur

Ce n'est pas une différence de politique — c'est une différence technique. L'outil est physiquement incapable de stocker votre image car il ne la reçoit jamais.

## Comment vérifier si un outil importe vos images

Quelques façons de vérifier :

**Consultez la politique de confidentialité.** Cherchez des mots comme "importer", "stocker", "conserver", "supprimer" et "tiers". Un outil digne de confiance sera explicite sur ce qu'il advient de vos fichiers.

**Surveillez le trafic réseau.** Dans n'importe quel navigateur, vous pouvez ouvrir les Outils de développement (F12 ou clic droit → Inspecter) et aller dans l'onglet Réseau. Importez une image et observez si des requêtes réseau apparaissent. Un outil basé sur le navigateur ne montrera aucune activité d'import.

**Cherchez le fonctionnement hors connexion.** Si un outil fonctionne quand vous coupez votre connexion internet après le chargement de la page, il traite définitivement en local. Les outils basés sur serveur ne fonctionneront pas sans connexion.

## Quand être particulièrement vigilant

Utilisez un outil basé sur le navigateur axé sur la confidentialité chaque fois que vous modifiez :

- Des photos de passeport ou de carte d'identité
- Des documents médicaux ou dossiers de santé
- Des photos de documents financiers
- Des documents professionnels marqués comme confidentiels
- Toute image que vous ne voudriez pas voir stockée sur l'ordinateur d'un inconnu

Pour un usage occasionnel — redimensionner une photo de vacances ou compresser une image culinaire pour les réseaux sociaux — le risque est moindre. Mais prendre l'habitude d'utiliser des outils basés sur le navigateur par défaut est une approche raisonnable.

## Conclusion

La plupart des outils d'image en ligne populaires importent vos fichiers sur leurs serveurs. Certains les suppriment rapidement, d'autres les conservent plus longtemps, et certains ne vous le disent pas clairement.

Les outils basés sur le navigateur qui traitent les images localement — comme NanoImage — sont techniquement incapables de stocker vos images car ils ne les reçoivent jamais. Pour les photos sensibles, c'est l'option la plus sûre.

Avant d'importer votre prochaine photo dans un outil en ligne, prenez trente secondes pour vérifier : cet outil importe-t-il mon image sur un serveur, ou la traite-t-il dans mon navigateur ?

La réponse fait une plus grande différence que la plupart des gens ne le pensent.
`;
