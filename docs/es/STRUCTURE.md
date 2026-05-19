# Estructura del Proyecto - TabPulse

```
TabPulse/
├── manifest.json          # Configuración de la extensión
├── background.js          # Service Worker (lógica principal)
├── popup.html             # Interfaz del popup
├── popup.js               # Lógica del popup
├── options.html           # Página de configuración
├── options.js             # Lógica de configuración
├── i18n.js                # Sistema de traducción
├── README.md              # Documentación principal (multilingüe)
├── LICENSE                # Licencia MIT
├── .gitignore             # Archivo de exclusión de Git
├── docs/                  # Documentación por idioma
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
├── images/                # Carpeta para iconos (opcional)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── DOCUMENTATION_ALL.md   # Documentación completa en un archivo
```

## Notas sobre la organización

- **manifest.json** : Verifique los permisos según sea necesario
- **background.js** : Lógica de negocio (dónde agregar nuevas características)
- **popup.html/js** : Interfaz de usuario (dónde modificar la visualización)
- **options.html/js** : Página de configuración (idioma, preferencias futuras)
- **i18n.js** : Sistema de traducción (agregue nuevos idiomas aquí)
- **docs/** : Documentación por idioma (organizada por código de idioma)
- **images/** : Coloque sus iconos PNG (16x16, 48x48, 128x128)

La estructura es minimalista pero extensible para desarrollo futuro.
