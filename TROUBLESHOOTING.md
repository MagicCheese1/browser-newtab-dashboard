# Troubleshooting - MIME Type Error

Si vous rencontrez l'erreur :
```
Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/octet-stream"
```

## Solutions à essayer (dans l'ordre) :

### 1. Vider le cache de Chrome pour l'extension

1. Ouvrez `chrome://extensions/`
2. Activez le "Mode développeur" (en haut à droite)
3. Trouvez votre extension "Dashboard New Tab"
4. Cliquez sur "Recharger" (icône de rafraîchissement)
5. Si cela ne fonctionne pas, cliquez sur "Supprimer" puis rechargez le dossier `dist`

### 2. Vider le cache du navigateur

1. Ouvrez les DevTools (F12)
2. Clic droit sur le bouton de rechargement de la page
3. Sélectionnez "Vider le cache et effectuer une actualisation forcée"
4. Ou utilisez Ctrl+Shift+R (Cmd+Shift+R sur Mac)

### 3. Reconstruire l'extension

```bash
# Supprimer l'ancien build
rm -rf dist

# Reconstruire
npm run build

# Recharger l'extension dans Chrome
```

### 4. Vérifier le fichier HTML généré

Le fichier `dist/index.html` doit contenir :
```html
<script crossorigin src="./assets/main-XXXXX.js"></script>
```

**PAS** :
```html
<script type="module" src="/src/main.tsx"></script>
```

### 5. Vérifier que le fichier JS existe

```bash
ls -la dist/assets/main-*.js
```

Le fichier doit exister et être un fichier JavaScript valide.

### 6. Vérifier le manifest

Le fichier `dist/manifest.json` doit pointer vers `index.html` :
```json
"chrome_url_overrides": {
  "newtab": "index.html"
}
```

### 7. Solution de dernier recours

Si rien ne fonctionne :

1. Supprimez complètement l'extension de Chrome
2. Fermez toutes les fenêtres Chrome
3. Supprimez le dossier `dist`
4. Reconstruisez : `npm run build`
5. Rechargez l'extension dans Chrome

## Vérification

Après avoir rechargé l'extension :
1. Ouvrez un nouvel onglet
2. Ouvrez la console (F12)
3. Vérifiez qu'il n'y a plus d'erreurs de MIME type
4. Le dashboard devrait s'afficher correctement

