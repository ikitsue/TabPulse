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
├── LICENSE                # MIT License
├── .gitignore             # Git ignore file
├── docs/                  # Documentation by language
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
├── images/                # Folder for icons (optional)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── DOCUMENTATION_ALL.md   # Complete documentation in one file
```

## Notes on Organization

- **manifest.json** : Check permissions as needed
- **background.js** : Business logic (where to add new features)
- **popup.html/js** : User interface (where to modify display)
- **options.html/js** : Settings page (language, future preferences)
- **i18n.js** : Translation system (add new languages here)
- **docs/** : Language-specific documentation (organized by language code)
- **images/** : Put your PNG icons (16x16, 48x48, 128x128)

The structure is minimal but extensible for future development.
