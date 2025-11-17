#!/bin/bash

echo "=== Vérification de l'extension ==="
echo ""

DIST_DIR="/Users/mchangeat/Documents/github/browser-newtab-dashboard/dist"

echo "1. Vérification du dossier dist:"
if [ -d "$DIST_DIR" ]; then
    echo "   ✓ Dossier dist existe"
else
    echo "   ✗ Dossier dist n'existe pas: $DIST_DIR"
    exit 1
fi

echo ""
echo "2. Vérification du manifest.json:"
if [ -f "$DIST_DIR/manifest.json" ]; then
    echo "   ✓ manifest.json existe"
    if [ -r "$DIST_DIR/manifest.json" ]; then
        echo "   ✓ manifest.json est lisible"
    else
        echo "   ✗ manifest.json n'est pas lisible"
    fi
    
    # Vérifier que c'est du JSON valide
    if node -e "JSON.parse(require('fs').readFileSync('$DIST_DIR/manifest.json', 'utf8'))" 2>/dev/null; then
        echo "   ✓ manifest.json est un JSON valide"
    else
        echo "   ✗ manifest.json n'est pas un JSON valide"
    fi
else
    echo "   ✗ manifest.json n'existe pas"
fi

echo ""
echo "3. Vérification des fichiers requis:"
REQUIRED_FILES=("index.html" "icons/icon16.png" "icons/icon48.png" "icons/icon128.png")
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$DIST_DIR/$file" ]; then
        echo "   ✓ $file existe"
    else
        echo "   ✗ $file manquant"
    fi
done

echo ""
echo "4. Contenu du manifest.json:"
cat "$DIST_DIR/manifest.json"

echo ""
echo ""
echo "=== Chemin à charger dans Chrome ==="
echo "$DIST_DIR"
echo ""
echo "Pour charger l'extension:"
echo "1. Ouvrez chrome://extensions/"
echo "2. Activez le Mode développeur"
echo "3. Cliquez sur 'Charger l'extension non empaquetée'"
echo "4. Sélectionnez ce dossier: $DIST_DIR"

