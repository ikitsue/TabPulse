# Estructura del Proyecto - TabPilse

```
TabPilse/
├── manifest.json          # Configuración de la extensión
├── background.js          # Service Worker (lógica principal)
├── popup.html             # Interfaz del popup
├── popup.js               # Lógica del popup
├── options.html           # Página de configuración
├── options.js             # Lógica de configuración
├── i18n.js                # Sistema de traducción
├── README.md              # Documentación principal (multilingüe)
├── README_EN.md           # Documentación en inglés
├── README_FR.md           # Documentación en francés
├── README_RU.md           # Documentación en ruso
├── README_ES.md           # Documentación en español
├── README_ZH.md           # Documentación en chino
├── STRUCTURE.md           # Estructura del proyecto (francés)
├── LICENSE                # Licencia MIT
├── .gitignore             # Archivo de exclusión de Git
├── images/                # Carpeta para iconos (opcional)
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── README.md
└── [archivos de otros idiomas]
```

## Notas sobre la organización

- **manifest.json** : Verifique los permisos según sea necesario
- **background.js** : Lógica de negocio (dónde agregar nuevas características)
- **popup.html/js** : Interfaz de usuario (dónde modificar la visualización)
- **options.html/js** : Página de configuración (idioma, preferencias futuras)
- **i18n.js** : Sistema de traducción (agregue nuevos idiomas aquí)
- **images/** : Coloque sus iconos PNG (16x16, 48x48, 128x128)

La estructura es minimalista pero extensible para desarrollo futuro.
