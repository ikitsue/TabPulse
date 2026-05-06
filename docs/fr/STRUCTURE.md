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
├── LICENSE                # Licence MIT
├── .gitignore             # Fichier d'exclusion Git
├── docs/                  # Documentation par langue
│   ├── en/
│   │   ├── README.md
│   │   └── STRUCTURE.md
│   ├── fr/
│   │   ├── README.md
│   │   └── STRUCTURE.md
│   ├── ru/
│   │   ├── README.md
│   │   └── STRUCTURE.md
│   ├── es/
│   │   ├── README.md
│   │   └── STRUCTURE.md
│   └── zh/
│       ├── README.md
│       └── STRUCTURE.md
├── images/                # Dossier pour les icônes (optionnel)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── DOCUMENTATION_ALL.md   # Documentation complète dans un seul fichier
```

## Notes d'organisation

- **manifest.json** : Vérifier les permissions au besoin
- **background.js** : Logique métier (où ajouter de nouvelles features)
- **popup.html/js** : Interface (où modifier l'affichage)
- **options.html/js** : Page des paramètres (langue, préférences futures)
- **i18n.js** : Système de traduction (ajouter les nouvelles langues ici)
- **docs/** : Documentation par langue (organisée par code de langue)
- **images/** : Mettre vos icônes PNG (16x16, 48x48, 128x128)

La structure est minimaliste mais extensible.
