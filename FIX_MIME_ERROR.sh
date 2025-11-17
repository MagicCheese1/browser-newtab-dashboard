#!/bin/bash
# Script pour résoudre définitivement l'erreur MIME type

echo "🔧 CORRECTION DE L'ERREUR MIME TYPE"
echo "===================================="
echo ""

# 1. Nettoyer complètement le build
echo "🧹 Nettoyage du dossier dist..."
rm -rf dist

# 2. Rebuild complet
echo "🔨 Reconstruction du projet..."
npm run build

# 3. Vérifier le HTML généré
echo ""
echo "✅ Vérification du HTML généré :"
echo "---"
cat dist/index.html
echo "---"
echo ""

# Vérifier que le HTML est correct
if grep -q 'type="module"' dist/index.html; then
    echo "❌ ERREUR : Le HTML contient encore type=\"module\" !"
    echo "   Le plugin Vite ne fonctionne pas correctement."
    exit 1
else
    echo "✅ Le HTML ne contient pas type=\"module\" (correct)"
fi

# Vérifier que le fichier JS existe et est en IIFE
JS_FILE=$(grep -o './assets/main-[^"]*\.js' dist/index.html | head -1)
if [ -f "dist/${JS_FILE#./}" ]; then
    echo "✅ Le fichier JS existe : dist/${JS_FILE#./}"
    FIRST_LINE=$(head -1 "dist/${JS_FILE#./}")
    if [[ $FIRST_LINE == "(function()"* ]]; then
        echo "✅ Le fichier JS est bien en format IIFE (correct)"
    else
        echo "⚠️  Le fichier JS ne semble pas être en format IIFE"
    fi
fi

echo ""
echo "===================================="
echo "✅ BUILD TERMINÉ"
echo "===================================="
echo ""
echo "🚨 MAINTENANT, SUIVEZ CES ÉTAPES DANS CHROME :"
echo ""
echo "1. Ouvrez Chrome et allez sur : chrome://extensions/"
echo ""
echo "2. Trouvez 'Dashboard New Tab' et CLIQUEZ SUR 'SUPPRIMER' (pas juste désactiver)"
echo ""
echo "3. Fermez COMPLÈTEMENT Chrome (Cmd+Q sur Mac)"
echo ""
echo "4. Attendez 5 secondes"
echo ""
echo "5. Rouvrez Chrome"
echo ""
echo "6. Allez sur chrome://extensions/"
echo ""
echo "7. Activez le 'Mode développeur' (toggle en haut à droite)"
echo ""
echo "8. Cliquez sur 'Charger l'extension non empaquetée'"
echo ""
echo "9. Naviguez vers et SÉLECTIONNEZ le dossier :"
echo "   $(pwd)/dist"
echo ""
echo "10. Vérifiez que le chemin affiché sous l'extension se termine par '/dist'"
echo ""
echo "11. Ouvrez un nouvel onglet"
echo ""
echo "12. Si l'erreur persiste, ouvrez la console (F12) et vérifiez :"
echo "    - L'URL du fichier qui cause l'erreur"
echo "    - Si c'est 'main.tsx', c'est un problème de cache"
echo "    - Essayez Cmd+Shift+Delete pour vider le cache Chrome"
echo ""

