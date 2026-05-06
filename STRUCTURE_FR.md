# Structure du projet TabPilse

```
TabPilse/
├── manifest.json          # Configuration de l'extension
├── background.js          # Service Worker (logique principale)
├── popup.html             # Interface du popup
├── popup.js               # Logique du popup
├── options.html           # Page des paramètres
├── options.js             # Logique des paramètres
├── i18n.js                # Système de traduction
├── README.md              # Documentation principale (multilingue)
├── README_EN.md           # Documentation en anglais
├── README_FR.md           # Documentation en français
├── README_RU.md           # Documentation en russe
├── README_ES.md           # Documentation en espagnol
├── README_ZH.md           # Documentation en chinois
├── STRUCTURE.md           # Structure du projet (français)
├── LICENSE                # Licence MIT
├── .gitignore             # Fichier d'exclusion Git
├── images/                # Dossier pour les icônes (optionnel)
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── README.md
└── [fichiers des autres langues]
```

## Notes d'organisation

- **manifest.json** : Vérifier les permissions au besoin
- **background.js** : Logique métier (où ajouter de nouvelles features)
- **popup.html/js** : Interface (où modifier l'affichage)
- **options.html/js** : Page des paramètres (langue, préférences futures)
- **i18n.js** : Système de traduction (ajouter les nouvelles langues ici)
- **images/** : Mettre vos icônes PNG (16x16, 48x48, 128x128)

La structure est minimaliste mais extensible.
