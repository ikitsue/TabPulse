# 📊 TabPilse - Extensión de Chrome Manifest V3

Una extensión simple y ligera para rastrear tus estadísticas de navegación.

## 📋 Archivos del Proyecto

### 1. **manifest.json**
Configuración de la extensión (requerida por Chrome).

**Qué hace:**
- Declara el nombre, versión y descripción de la extensión
- Enumera los permisos necesarios (`tabs`, `webNavigation`, `storage`)
- Apunta al Service Worker (`background.js`)
- Configura el popup (`popup.html`)

**Punto clave:** `manifest_version: 3` = Manifest V3 (nuevo estándar)

---

### 2. **background.js**
Service Worker que se ejecuta en segundo plano y gestiona la lógica.

**Qué hace:**
- 🕐 **Inicializa la sesión** → Registra la hora de inicio del navegador
- 📄 **Cuenta páginas** → Utiliza `chrome.webNavigation.onCommitted` para detectar cada página nueva
- 🚫 **Evita duplicados** → Compara la URL actual con la anterior
- 💾 **Almacena datos** → Utiliza `chrome.storage.local` (almacenamiento local, nunca se envía)
- 📨 **Se comunica con el popup** → Responde a los mensajes del popup con estadísticas

**Eventos clave:**
- `chrome.webNavigation.onCommitted` → Se activa cuando se carga una página
- `chrome.runtime.onMessage` → Recibe solicitudes del popup

---

### 3. **popup.html**
Interfaz de usuario (lo que ves al hacer clic en el icono).

**Qué muestra:**
- ⏱️ Tiempo transcurrido desde el inicio del navegador (en minutos)
- 📊 Número total de páginas visitadas
- 🎨 Diseño moderno con gradiente púrpura

---

### 4. **popup.js**
Lógica del popup.

**Qué hace:**
- 🔄 Obtiene estadísticas del fondo cada segundo
- 📝 Formatea números de manera legible
- ✨ Actualiza la interfaz en tiempo real

---

### 5. **options.html / options.js**
Página de configuración para cambiar el idioma.

**Qué hace:**
- 🌍 Elige entre 5 idiomas (Inglés, Francés, Ruso, Español, Chino)
- 💾 Guarda tu preferencia
- 🔄 Traduce al instante toda la extensión

---

### 6. **i18n.js**
Sistema de traducción.

**Contiene:**
- Todos los textos en 5 idiomas
- Funciones para cargar y aplicar traducciones
- Cambio de idioma en tiempo real

---

## 🚀 Cómo cargar la extensión

### Paso 1: Abre la página de extensiones
1. Abre **Chrome** o **Brave**
2. Ve a: `chrome://extensions/` (Chrome) o `brave://extensions/` (Brave)

### Paso 2: Habilita el modo de desarrollador
- Haz clic en el interruptor **"Modo de desarrollador"** (esquina superior derecha)

### Paso 3: Carga la extensión
1. Haz clic en **"Cargar extensión sin empaquetar"**
2. Selecciona la carpeta que contiene los archivos de la extensión
3. ✅ ¡Extensión cargada!

### Paso 4: Prueba la extensión
- Verás el icono de la extensión en tu barra de herramientas
- Haz clic en él para abrir el popup
- Las estadísticas aumentarán con cada nueva página
- Haz clic en ⚙️ Configuración para cambiar de idioma

---

## 🔐 Privacidad

✅ **Esta extensión:**
- ❌ NUNCA registra URLs
- ❌ NUNCA registra títulos de páginas
- ❌ NUNCA registra historial
- ✅ Solo cuenta páginas (número bruto, sin detalles)
- ✅ Los datos permanecen en el almacenamiento local del navegador
- ✅ Nada se envía en línea

---

## 📈 Cómo funciona (en detalle)

```
El usuario hace clic en una página
         ↓
background.js detecta el evento onCommitted
         ↓
Compara la URL con la anterior para evitar duplicados
         ↓
Incrementa el contador de páginas
         ↓
El usuario abre el popup
         ↓
popup.js solicita estadísticas al fondo
         ↓
background.js envía: tiempo transcurrido + cantidad de páginas
         ↓
popup.js muestra las estadísticas actualizadas
         ↓
El popup se actualiza cada segundo (temporizador)
```

---

## 💾 Datos almacenados

La extensión almacena 4 claves en `chrome.storage.local`:

| Clave | Valor | Ejemplo |
|-------|-------|---------|
| `sessionStartTime` | Marca de tiempo de inicio del navegador | `1715000000000` |
| `pageCount` | Número de páginas visitadas | `42` |
| `lastUrl` | Última URL para evitar duplicados | `https://google.com` |
| `language` | Idioma actual | `es` |

---

## 🌍 Idiomas compatibles

- 🇬🇧 English
- 🇫🇷 Français
- 🇷🇺 Русский
- 🇪🇸 Español (por defecto)
- 🇨🇳 中文

---

## ✨ Mejoras futuras

**Ideas para evolución:**
- Agregar botón "Reiniciar" para comenzar una nueva sesión
- Mostrar estadísticas diarias/semanales
- Crear gráficos y gráficas
- Agregar notificaciones de límite de tiempo diario
- Soporte para modo oscuro

La estructura del código está lista para estas mejoras. ¡Buena suerte! 🚀
