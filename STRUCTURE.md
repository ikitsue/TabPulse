# Structure du projet TabPilse

```
TabPilse/
├── manifest.json          # Configuration de l'extension (obligatoire)
├── background.js          # Service worker (logique principale)
├── popup.html             # Interface du popup
├── popup.js               # Logique du popup
├── README.md              # Ce fichier
├── images/                # Dossier pour les icônes (optionnel)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── .gitignore            # Fichiers à ignorer si vous utilisez git
```

## Notes d'organisation

- **manifest.json** : Vérifier les permissions au besoin
- **background.js** : Logique métier (où ajouter de nouvelles features)
- **popup.html/js** : Interface (où modifier l'affichage)
- **images/** : Mettre vos icônes PNG (16x16, 48x48, 128x128)

La structure est minimaliste mais extensible.
