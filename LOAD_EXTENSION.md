# Comment charger l'extension dans Chrome

## ⚠️ IMPORTANT : Chargez le BON dossier

Vous devez charger le dossier **`dist`** et NON le dossier racine du projet.

## Chemin complet du dossier à charger :

```
/Users/mchangeat/Documents/github/browser-newtab-dashboard/dist
```

## Étapes détaillées :

1. **Ouvrez Chrome**
2. **Allez sur** `chrome://extensions/`
3. **Activez le "Mode développeur"** (toggle en haut à droite)
4. **Cliquez sur "Charger l'extension non empaquetée"** (ou "Load unpacked")
5. **Naviguez vers le dossier `dist`** :
   - Ne sélectionnez PAS le dossier `browser-newtab-dashboard`
   - Sélectionnez le dossier `dist` qui est DANS `browser-newtab-dashboard`
6. **Cliquez sur "Sélectionner"** (ou "Select")

## Vérification :

Après avoir chargé l'extension, vous devriez voir :
- ✅ "Dashboard New Tab" dans la liste des extensions
- ✅ Pas d'erreur "Manifest file is missing"
- ✅ L'extension est activée

## Si vous avez toujours l'erreur :

1. **Vérifiez que vous chargez bien le dossier `dist`** :
   ```bash
   ls -la /Users/mchangeat/Documents/github/browser-newtab-dashboard/dist/manifest.json
   ```
   Ce fichier doit exister.

2. **Supprimez complètement l'extension** de Chrome
3. **Fermez toutes les fenêtres Chrome**
4. **Rouvrez Chrome**
5. **Rechargez l'extension** depuis le dossier `dist`

## Structure attendue dans `dist` :

```
dist/
├── manifest.json      ← Doit être ici
├── index.html         ← Doit être ici
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── assets/
    ├── main-XXXXX.js
    └── main-XXXXX.css
```

## Erreur courante :

❌ **NE PAS** charger : `/Users/mchangeat/Documents/github/browser-newtab-dashboard`
✅ **CHARGER** : `/Users/mchangeat/Documents/github/browser-newtab-dashboard/dist`

