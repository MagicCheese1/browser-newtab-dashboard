#!/bin/bash
# Script pour nettoyer complètement et recharger l'extension

echo "🧹 Nettoyage complet en cours..."

# 1. Supprimer le dossier dist
echo "📁 Suppression du dossier dist..."
rm -rf dist

# 2. Rebuild complet
echo "🔨 Reconstruction du projet..."
npm run build

# 3. Vérifier le résultat
echo ""
echo "✅ Build terminé. Vérification du HTML généré :"
echo "---"
cat dist/index.html
echo "---"
echo ""

# 4. Vérifier que le fichier JS existe
echo "📦 Fichiers générés dans dist/assets/ :"
ls -lh dist/assets/

echo ""
echo "🔄 MAINTENANT, SUIVEZ CES ÉTAPES DANS CHROME :"
echo ""
echo "1. Allez sur chrome://extensions/"
echo "2. Trouvez 'Dashboard New Tab' et cliquez sur 'Supprimer'"
echo "3. Fermez TOUS les onglets ouverts"
echo "4. Appuyez sur Cmd+Shift+Delete pour ouvrir les paramètres de suppression"
echo "5. Sélectionnez 'Toutes les périodes' et cochez :"
echo "   - Images et fichiers en cache"
echo "   - Cookies et autres données de sites"
echo "6. Cliquez sur 'Effacer les données'"
echo "7. Retournez sur chrome://extensions/"
echo "8. Activez le 'Mode développeur'"
echo "9. Cliquez sur 'Charger l'extension non empaquetée'"
echo "10. Sélectionnez ce dossier :"
echo "    $(pwd)/dist"
echo ""
echo "11. Ouvrez un nouvel onglet et vérifiez qu'il n'y a plus d'erreur"
echo ""


