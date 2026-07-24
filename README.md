# Scan-ID — Application de bureau

Ce dossier contient tout ce qu'il faut pour transformer votre site en un vrai logiciel installable (.exe pour Windows, .dmg pour Mac, .AppImage pour Linux).

## Étape 1 — Installer Node.js
Si ce n'est pas déjà fait, téléchargez et installez Node.js : https://nodejs.org (version LTS)

## Étape 2 — Ajouter une icône (optionnel mais recommandé)
Placez un fichier `icon.png` (idéalement 512x512px, fond transparent) dans ce dossier, à côté de `main.js`.
Si vous n'en avez pas, vous pouvez commenter/supprimer la ligne `icon:` dans `main.js` et dans `package.json` — l'app utilisera l'icône par défaut d'Electron.

## Étape 3 — Installer les dépendances
Ouvrez un terminal dans ce dossier et lancez :
```
npm install
```

## Étape 4 — Tester l'application (optionnel)
```
npm start
```
Cela ouvre l'application dans une fenêtre, comme un vrai logiciel.

## Étape 5 — Générer l'installateur
```
npm run dist
```
Les fichiers installables apparaissent dans le dossier `release/` :
- Windows → `Scan-ID Setup 1.0.0.exe`
- Mac → `Scan-ID-1.0.0.dmg`
- Linux → `Scan-ID-1.0.0.AppImage`

**Important** : electron-builder génère par défaut l'installateur pour le système sur lequel vous compilez (si vous êtes sur Windows, vous obtenez le .exe). Pour générer les 3 versions à la fois, le plus simple est d'utiliser GitHub Actions (voir plus bas) ou un service comme https://www.electron.build.

## Étape 6 — Distribuer le lien de téléchargement
Une fois l'installateur généré :
1. Allez sur votre dépôt GitHub → onglet **Releases** → **Create a new release**
2. Glissez le fichier `.exe` (et `.dmg`/`.AppImage` si vous les avez) dans la release
3. Publiez — GitHub vous donne alors un lien de téléchargement direct que vous pouvez partager ou intégrer sur votre site ("Télécharger pour Windows")

## Générer automatiquement les 3 versions (Windows/Mac/Linux) via GitHub Actions
Si vous voulez éviter de compiler manuellement sur chaque système, ajoutez un fichier
`.github/workflows/build.yml` qui utilise `electron-builder` avec une matrice multi-OS.
Dites-moi si vous voulez que je vous prépare ce fichier — je peux l'ajouter directement au projet.

## Notes importantes
- Le site utilise des bibliothèques chargées depuis des CDN (Tesseract.js, xlsx, jsPDF, PeerJS, QRCode).
  L'application aura donc besoin d'une connexion internet pour les charger, tout comme la fonction
  "scanner via téléphone" qui nécessite un serveur de signalisation en ligne.
- Pour une version 100% hors-ligne, il faudrait télécharger ces bibliothèques et les inclure
  localement dans le dossier — dites-le-moi si vous voulez que je fasse cette adaptation.
