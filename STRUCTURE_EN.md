# Project Structure - TabPilse

```
TabPilse/
├── manifest.json          # Extension configuration
├── background.js          # Service Worker (main logic)
├── popup.html             # Popup interface
├── popup.js               # Popup logic
├── options.html           # Settings page
├── options.js             # Settings logic
├── i18n.js                # Translation system
├── README.md              # Main documentation (multilingual)
├── README_EN.md           # English documentation
├── README_FR.md           # French documentation
├── README_RU.md           # Russian documentation
├── README_ES.md           # Spanish documentation
├── README_ZH.md           # Chinese documentation
├── STRUCTURE.md           # Project structure (English)
├── LICENSE                # MIT License
├── .gitignore             # Git ignore file
├── images/                # Folder for icons (optional)
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── README.md
└── [other language files]
```

## Notes on Organization

- **manifest.json** : Check permissions as needed
- **background.js** : Business logic (where to add new features)
- **popup.html/js** : User interface (where to modify display)
- **options.html/js** : Settings page (language, future preferences)
- **i18n.js** : Translation system (add new languages here)
- **images/** : Put your PNG icons (16x16, 48x48, 128x128)

The structure is minimal but extensible for future development.
