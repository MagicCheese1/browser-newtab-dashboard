#!/bin/bash
# Script de vérification complète

echo "🔍 VÉRIFICATION COMPLÈTE DE L'EXTENSION"
echo "========================================"
echo ""

# Vérifier le dossier dist
if [ ! -d "dist" ]; then
    echo "❌ Le dossier dist n'existe pas!"
    exit 1
fi

# Vérifier manifest.json
if [ ! -f "dist/manifest.json" ]; then
    echo "❌ dist/manifest.json n'existe pas!"
    exit 1
fi

# Vérifier index.html
if [ ! -f "dist/index.html" ]; then
    echo "❌ dist/index.html n'existe pas!"
    exit 1
fi

# Vérifier le contenu du HTML
echo "✅ Vérification du HTML dans dist/index.html :"
echo "---"
cat dist/index.html
echo "---"
echo ""

# Vérifier que le HTML ne contient PAS type="module"
if grep -q 'type="module"' dist/index.html; then
    echo "❌ ERREUR : dist/index.html contient encore type=\"module\" !"
    echo "   Cela ne devrait pas être le cas."
    exit 1
else
    echo "✅ Le HTML ne contient pas type=\"module\" (correct)"
fi

# Vérifier que le HTML pointe vers ./assets/
if grep -q './assets/main-' dist/index.html; then
    echo "✅ Le HTML pointe vers ./assets/main-*.js (correct)"
else
    echo "❌ ERREUR : Le HTML ne pointe pas vers ./assets/main-*.js"
    exit 1
fi

# Vérifier que le fichier JS existe
JS_FILE=$(grep -o './assets/main-[^"]*\.js' dist/index.html | head -1)
if [ -f "dist/${JS_FILE#./}" ]; then
    echo "✅ Le fichier JS existe : dist/${JS_FILE#./}"
    
    # Vérifier que c'est un IIFE et pas un module ES
    FIRST_LINE=$(head -1 "dist/${JS_FILE#./}")
    if [[ $FIRST_LINE == "(function()"* ]]; then
        echo "✅ Le fichier JS est bien en format IIFE (correct)"
    else
        echo "⚠️  Le fichier JS ne semble pas être en format IIFE"
        echo "   Première ligne : ${FIRST_LINE:0:100}..."
    fi
else
    echo "❌ ERREUR : Le fichier JS n'existe pas : dist/${JS_FILE#./}"
    exit 1
fi

# Vérifier le manifest
echo ""
echo "✅ Vérification du manifest.json :"
cat dist/manifest.json
echo ""

echo "========================================"
echo "✅ TOUTES LES VÉRIFICATIONS SONT OK"
echo "========================================"
echo ""
echo "📋 CHEMIN COMPLET DU DOSSIER À CHARGER DANS CHROME :"
echo ""
echo "    $(pwd)/dist"
echo ""
echo "🚨 IMPORTANT : Vous DEVEZ charger le dossier 'dist', PAS le dossier racine !"
echo ""
echo "📝 INSTRUCTIONS ÉTAPE PAR ÉTAPE :"
echo ""
echo "1. Ouvrez Chrome et allez sur : chrome://extensions/"
echo ""
echo "2. Cherchez 'Dashboard New Tab' dans la liste"
echo "   - Si vous la voyez, regardez le chemin affiché dessous"
echo "   - Le chemin doit se terminer par '/dist' et PAS juste '/browser-newtab-dashboard'"
echo "   - Si le chemin ne se termine pas par '/dist', SUPPRIMEZ l'extension"
echo ""
echo "3. Supprimez complètement l'extension (cliquez sur 'Supprimer')"
echo ""
echo "4. Fermez TOUS les onglets de Chrome"
echo ""
echo "5. Quittez complètement Chrome (Cmd+Q)"
echo ""
echo "6. Rouvrez Chrome"
echo ""
echo "7. Allez sur chrome://extensions/"
echo ""
echo "8. Activez le 'Mode développeur' (toggle en haut à droite)"
echo ""
echo "9. Cliquez sur 'Charger l'extension non empaquetée'"
echo ""
echo "10. Dans le sélecteur de fichiers, naviguez vers :"
echo "    $(pwd)"
echo "    Puis ENTREZ dans le dossier 'dist' et cliquez sur 'Sélectionner'"
echo ""
echo "11. Vérifiez que l'extension affiche le chemin :"
echo "    $(pwd)/dist"
echo ""
echo "12. Ouvrez un nouvel onglet et vérifiez dans la console (F12)"
echo ""


