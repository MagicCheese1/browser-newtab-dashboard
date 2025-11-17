# Solution pour l'erreur "Manifest file is missing or unreadable"

## ✅ Vérifications effectuées

Tous les fichiers sont présents et valides :
- ✓ manifest.json existe et est valide
- ✓ index.html existe
- ✓ Toutes les icônes existent
- ✓ Attributs étendus macOS supprimés
- ✓ Permissions du fichier correctes

## 🔧 Solution étape par étape

### 1. Supprimez COMPLÈTEMENT l'extension

1. Ouvrez `chrome://extensions/`
2. Trouvez "Dashboard New Tab"
3. Cliquez sur **"Supprimer"** (pas juste désactiver)
4. Confirmez la suppression

### 2. Videz le cache de Chrome

1. Ouvrez `chrome://settings/clearBrowserData`
2. Sélectionnez "Toutes les périodes"
3. Cochez :
   - ✓ Images et fichiers en cache
   - ✓ Cookies et autres données de sites
4. Cliquez sur "Effacer les données"

### 3. Fermez COMPLÈTEMENT Chrome

**Sur macOS :**
- Clic droit sur l'icône Chrome dans le Dock
- Cliquez sur "Quitter"
- OU : Cmd+Q dans Chrome

**Vérifiez que Chrome est vraiment fermé :**
```bash
ps aux | grep -i chrome
```
Si vous voyez des processus Chrome, tuez-les :
```bash
killall "Google Chrome"
```

### 4. Rechargez l'extension

1. Rouvrez Chrome
2. Allez sur `chrome://extensions/`
3. Activez le **"Mode développeur"** (toggle en haut à droite)
4. Cliquez sur **"Charger l'extension non empaquetée"**
5. **IMPORTANT** : Naviguez vers et sélectionnez :
   ```
   /Users/mchangeat/Documents/github/browser-newtab-dashboard/dist
   ```
   ⚠️ **Sélectionnez le dossier `dist`, PAS le dossier parent !**

### 5. Vérification

Après le chargement, vous devriez voir :
- ✅ "Dashboard New Tab" dans la liste
- ✅ Pas d'erreur rouge
- ✅ L'extension est activée

## 🐛 Si l'erreur persiste

### Option A : Créer un nouveau dossier dist

```bash
cd /Users/mchangeat/Documents/github/browser-newtab-dashboard
rm -rf dist
npm run build
```

Puis rechargez l'extension depuis le nouveau dossier `dist`.

### Option B : Vérifier les logs Chrome

1. Ouvrez `chrome://extensions/`
2. Cliquez sur "Détails" sur votre extension
3. Regardez les erreurs dans la console

### Option C : Test avec un manifest minimal

Le manifest a été simplifié. Si cela fonctionne, on pourra réajouter la CSP.

## 📍 Chemin exact à charger

```
/Users/mchangeat/Documents/github/browser-newtab-dashboard/dist
```

Dans le sélecteur de fichiers Chrome, vous devriez voir directement `manifest.json` dans le dossier que vous sélectionnez.

## ⚠️ Erreurs courantes

❌ **NE PAS** charger : `/Users/mchangeat/Documents/github/browser-newtab-dashboard`
✅ **CHARGER** : `/Users/mchangeat/Documents/github/browser-newtab-dashboard/dist`

❌ **NE PAS** juste "Recharger" l'extension
✅ **SUPPRIMER** puis recharger complètement

