export const content = `
# Comment Éditer des Images Directement dans Claude — Guide d'Intégration NanoImage MCP

Si vous avez déjà été au milieu d'une conversation avec Claude et avez eu besoin de compresser rapidement une image, de la redimensionner pour Instagram ou de convertir un PNG en WebP — vous connaissez la friction. Vous vous arrêtez, ouvrez un autre onglet, uploadez le fichier, attendez, téléchargez, revenez.

Cela est maintenant optionnel. NanoImage fonctionne comme un serveur MCP (Model Context Protocol) gratuit sur \`mcp.nanoimage.net\`, ce qui signifie que Claude peut traiter vos images directement dans la conversation — sans changer d'onglet, sans upload vers des serveurs tiers.

Ce guide vous montre exactement comment le connecter et ce que vous pouvez faire avec.

---

## Qu'est-ce que MCP ?

MCP (Model Context Protocol) est un standard ouvert qui permet à Claude de se connecter à des outils et services externes. Une fois que vous avez ajouté un serveur MCP à vos paramètres Claude, Claude peut l'appeler automatiquement lorsque vous demandez quelque chose qu'il gère.

Pensez-y comme donner à Claude un nouvel ensemble de mains — dans ce cas, des mains qui peuvent manipuler des fichiers image.

---

## Ce que NanoImage MCP Peut Faire

Une fois connecté, vous pouvez demander à Claude des choses comme :

- *« Compresse cette image à moins de 200 Ko »*
- *« Redimensionne cette photo à 1080×1080 pixels »*
- *« Recadre cette image au format 16:9 »*
- *« Convertis ce PNG en WebP »*
- *« Fais pivoter cette image de 90 degrés »*
- *« Transforme cette photo en noir et blanc »*
- *« Floute cette image »*
- *« Quelles sont les dimensions et la taille du fichier de cette image ? »*

Claude appellera automatiquement le bon outil en fonction de ce que vous demandez. Pas besoin de savoir quel outil utiliser — décrivez simplement ce que vous voulez.

**Outils disponibles (v1.1) :**

| Tool | What it does |
|------|-------------|
| compress_image | Reduce file size (JPG, PNG, WebP) |
| resize_image | Change dimensions by pixel or percentage |
| crop_image | Crop to coordinates or aspect ratio (1:1, 16:9, 4:5…) |
| rotate_image | Rotate 90°, 180°, or 270° |
| flip_image | Mirror horizontally, vertically, or both |
| convert_image | Convert between JPG, PNG, and WebP |
| blur_image | Apply Gaussian blur |
| grayscale_image | Convert to black and white |
| get_image_info | Get dimensions, format, file size, color space |

---

## Comment Connecter NanoImage à Claude

### Option A : Claude.ai (Web / Mobile) — Le Plus Simple

Claude.ai prend en charge nativement les serveurs MCP distants. Aucune installation requise.

1. Ouvrez [claude.ai](https://claude.ai) et allez dans **Paramètres**
2. Cliquez sur **Intégrations** dans le menu de gauche
3. Cliquez sur **Ajouter une intégration** → sélectionnez **MCP Server**
4. Remplissez :
   - **Nom :** NanoImage
   - **URL :** https://mcp.nanoimage.net/mcp
5. Cliquez sur **Enregistrer**
6. Démarrez une nouvelle conversation — les outils NanoImage seront disponibles immédiatement

> Les intégrations MCP sont disponibles sur les plans Claude Pro et Team. Si vous ne voyez pas le menu Intégrations, utilisez l'option B ci-dessous.

---

### Option B : Claude Desktop (macOS / Windows)

Modifiez votre fichier de configuration Claude Desktop :

- **macOS :** ~/Library/Application Support/Claude/claude_desktop_config.json
- **Windows :** %APPDATA%\\Claude\\claude_desktop_config.json

Ajoutez ou fusionnez :

\`\`\`json
{
  "mcpServers": {
    "nanoimage": {
      "url": "https://mcp.nanoimage.net/mcp"
    }
  }
}
\`\`\`

Enregistrez et **redémarrez complètement Claude Desktop**. NanoImage apparaîtra dans les outils disponibles.

**Si votre version ne prend pas encore en charge MCP distant**, utilisez le proxy mcp-remote (nécessite Node.js) :

\`\`\`json
{
  "mcpServers": {
    "nanoimage": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp.nanoimage.net/mcp"]
    }
  }
}
\`\`\`

---

## Essayer

Une fois connecté, uploadez une image à Claude et essayez ces invites :

**Test rapide :**
> *« Quelles sont les dimensions et la taille du fichier de cette image ? »*

**Compresser pour le web :**
> *« Compresse cette image à moins de 150 Ko, garde-la en JPG »*

**Préparer pour Instagram :**
> *« Recadre cette image au format 1:1 carré, puis compresse-la à moins de 1 Mo »*

Claude enchaînera automatiquement les deux appels d'outils — recadrage d'abord, puis compression.

**Convertir le format :**
> *« Convertis ce PNG en WebP à 85 % de qualité »*

---

## Confidentialité

- Les images sont envoyées via **HTTPS** (chiffrées en transit)
- Les images sont traitées en mémoire et renvoyées immédiatement
- **Aucune image n'est stockée** après le traitement
- Aucun compte ni connexion requis
- Hébergé sur **Cloudflare Workers** (réseau edge mondial)

---

## Limites de Débit

NanoImage MCP est gratuit et public. Une limite de **20 requêtes par minute par IP** est appliquée pour éviter les abus. L'utilisation normale de Claude (quelques appels d'outils par conversation) n'atteindra jamais cette limite.

---

## Dépannage

**Claude n'appelle pas automatiquement les outils NanoImage**
Assurez-vous d'avoir uploadé une image dans la conversation. Claude a besoin d'une entrée image pour déclencher les outils image.

**Je vois une erreur 429**
Vous avez atteint la limite de débit. Attendez 60 secondes et réessayez.

**Les outils n'apparaissent pas après avoir enregistré la configuration**
Pour Claude Desktop, quittez complètement et rouvrez l'application. Pour Claude.ai, démarrez une nouvelle conversation.

---

## Référence Rapide

| What you want | Prompt |
|--------------|--------|
| Check image details | "What size and format is this image?" |
| Compress for email | "Compress this under 500KB" |
| Resize for a platform | "Resize to 1200×628 pixels" |
| Crop for Instagram | "Crop to 1:1 square" |
| Crop for Stories | "Crop to 9:16 ratio" |
| Convert format | "Convert to WebP at 85% quality" |
| Rotate | "Rotate 90 degrees clockwise" |
| Black and white | "Make this grayscale" |
| Blur | "Apply a moderate blur" |

---

*NanoImage est une boîte à outils d'édition d'images gratuite basée sur le navigateur avec 13 outils disponibles sur [nanoimage.net](https://nanoimage.net) — pas de compte, pas d'upload, pas de suivi.*
`;
