# 📊 TabPulse - Complete Documentation

Choose your language / Choisissez votre langue / Выберите ваш язык / Elige tu idioma / 选择您的语言

---

## Table of Contents

1. [English Documentation](#english)
2. [Documentation Française](#french)
3. [Русская Документация](#russian)
4. [Documentación Española](#spanish)
5. [中文文档](#chinese)

---

---

## 🇬🇧 English Documentation {#english}

# TabPulse - Chrome Manifest V3 Extension

A simple and lightweight extension to track your browsing statistics.

### Project Files

#### 1. **manifest.json**
Configuration of the extension (required by Chrome).

- Declares the name, version and description of the extension
- Lists required permissions (`tabs`, `webNavigation`, `storage`)
- Points to the service worker (`background.js`)
- Configures the popup (`popup.html`)

**Key point:** `manifest_version: 3` = Manifest V3 (new standard)

#### 2. **background.js**
Service Worker that runs in the background and manages the logic.

- 🕐 **Initializes the session** → Records browser startup time
- 📄 **Counts pages** → Uses `chrome.webNavigation.onCommitted` to detect each new page
- 🚫 **Avoids duplicates** → Compares current URL with previous one
- 💾 **Stores data** → Uses `chrome.storage.local` (local storage, never sent anywhere)
- 📨 **Communicates with popup** → Responds to popup messages with stats

#### 3. **popup.html & popup.js**
User interface and logic.

- ⏱️ Time elapsed since browser startup (in minutes)
- 📊 Total number of pages viewed
- 🎨 Modern design with purple gradient

#### 4. **options.html & options.js**
Settings page to change the language.

- 🌍 Choose between 5 languages
- 💾 Save your preference
- 🔄 Instantly translate the entire extension

#### 5. **i18n.js**
Translation system with all texts in 5 languages.

### How to Load

1. Open `chrome://extensions/` or `brave://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the TabPulse folder
5. Done! ✅

### Privacy

✅ **This extension:**
- ❌ NEVER records URLs, page titles, or history
- ✅ Only counts pages (raw number, no details)
- ✅ Data stays in local browser storage
- ✅ Nothing is sent online

### Supported Languages

- 🇬🇧 English (default)
- 🇫🇷 Français
- 🇷🇺 Русский
- 🇪🇸 Español
- 🇨🇳 中文

---

---

## 🇫🇷 Documentation Française {#french}

# TabPulse - Extension Chrome Manifest V3

Extension simple et légère pour suivre vos statistiques de navigation.

### Fichiers du projet

#### 1. **manifest.json**
Configuration de l'extension (obligatoire pour Chrome).

- Déclare le nom, version et description de l'extension
- Énumère les permissions nécessaires (`tabs`, `webNavigation`, `storage`)
- Pointe vers le service worker (`background.js`)
- Configure le popup (`popup.html`)

**Clé importante :** `manifest_version: 3` = Manifest V3 (nouvelle standard)

#### 2. **background.js**
Service Worker qui tourne en arrière-plan et gère la logique.

- 🕐 **Initialise la session** → Enregistre l'heure de démarrage du navigateur
- 📄 **Compte les pages** → Utilise `chrome.webNavigation.onCommitted` pour détecter chaque nouvelle page
- 🚫 **Évite les doublons** → Compare l'URL actuelle avec la précédente
- 💾 **Stocke les données** → Utilise `chrome.storage.local` (stockage local, jamais envoyé)
- 📨 **Communique avec le popup** → Répond aux messages du popup avec les stats

#### 3. **popup.html & popup.js**
Interface utilisateur et logique.

- ⏱️ Temps écoulé depuis le démarrage du navigateur (en minutes)
- 📊 Nombre total de pages consultées
- 🎨 Design moderne avec dégradé violet

#### 4. **options.html & options.js**
Page des paramètres pour changer la langue.

- 🌍 Choisir entre 5 langues
- 💾 Sauvegarder votre préférence
- 🔄 Traduire instantanément toute l'extension

#### 5. **i18n.js**
Système de traduction avec tous les textes en 5 langues.

### Comment charger

1. Ouvrez `chrome://extensions/` ou `brave://extensions/`
2. Activez le "Mode de développement" (coin haut-droit)
3. Cliquez sur "Charger l'extension non empaquetée"
4. Sélectionnez le dossier TabPulse
5. Done ! ✅

### Respect de la vie privée

✅ **Cette extension :**
- ❌ N'enregistre JAMAIS les URLs, titres de pages, ou historique
- ✅ Ne compte que le nombre de pages (nombre brut, pas les détails)
- ✅ Les données restent dans le stockage local du navigateur
- ✅ Rien n'est envoyé en ligne

### Langues supportées

- 🇬🇧 English
- 🇫🇷 Français (par défaut)
- 🇷🇺 Русский
- 🇪🇸 Español
- 🇨🇳 中文

---

---

## 🇷🇺 Русская Документация {#russian}

# TabPulse - Расширение Chrome Manifest V3

Простое и легкое расширение для отслеживания статистики вашего просмотра.

### Файлы проекта

#### 1. **manifest.json**
Конфигурация расширения (требуется Chrome).

- Объявляет имя, версию и описание расширения
- Перечисляет необходимые разрешения (`tabs`, `webNavigation`, `storage`)
- Указывает на Service Worker (`background.js`)
- Настраивает всплывающее окно (`popup.html`)

**Ключевой момент:** `manifest_version: 3` = Manifest V3 (новый стандарт)

#### 2. **background.js**
Service Worker, работающий в фоне и управляющий логикой.

- 🕐 **Инициализирует сеанс** → Записывает время запуска браузера
- 📄 **Подсчитывает страницы** → Использует `chrome.webNavigation.onCommitted` для обнаружения каждой новой страницы
- 🚫 **Избегает дубликатов** → Сравнивает текущий URL с предыдущим
- 💾 **Хранит данные** → Использует `chrome.storage.local` (локальное хранилище, никогда не отправляется)
- 📨 **Обменивается данными с всплывающим окном** → Отвечает на сообщения с статистикой

#### 3. **popup.html & popup.js**
Пользовательский интерфейс и логика.

- ⏱️ Время, прошедшее с момента запуска браузера (в минутах)
- 📊 Общее количество просмотренных страниц
- 🎨 Современный дизайн с фиолетовым градиентом

#### 4. **options.html & options.js**
Страница настроек для изменения языка.

- 🌍 Выбор между 5 языками
- 💾 Сохранение вашего предпочтения
- 🔄 Мгновенный перевод всего расширения

#### 5. **i18n.js**
Система перевода со всеми текстами на 5 языках.

### Как загрузить

1. Откройте `chrome://extensions/` или `brave://extensions/`
2. Включите "Режим разработчика" (верхний правый угол)
3. Нажмите "Загрузить распакованное расширение"
4. Выберите папку TabPulse
5. Готово! ✅

### Конфиденциальность

✅ **Это расширение:**
- ❌ НИКОГДА не записывает URL, названия страниц или историю
- ✅ Только подсчитывает страницы (сырое число, без деталей)
- ✅ Данные остаются в локальном хранилище браузера
- ✅ Ничего не отправляется в интернет

### Поддерживаемые языки

- 🇬🇧 English
- 🇫🇷 Français
- 🇷🇺 Русский (по умолчанию)
- 🇪🇸 Español
- 🇨🇳 中文

---

---

## 🇪🇸 Documentación Española {#spanish}

# TabPulse - Extensión de Chrome Manifest V3

Una extensión simple y ligera para rastrear tus estadísticas de navegación.

### Archivos del Proyecto

#### 1. **manifest.json**
Configuración de la extensión (requerida por Chrome).

- Declara el nombre, versión y descripción de la extensión
- Enumera los permisos necesarios (`tabs`, `webNavigation`, `storage`)
- Apunta al Service Worker (`background.js`)
- Configura el popup (`popup.html`)

**Punto clave:** `manifest_version: 3` = Manifest V3 (nuevo estándar)

#### 2. **background.js**
Service Worker que se ejecuta en segundo plano y gestiona la lógica.

- 🕐 **Inicializa la sesión** → Registra la hora de inicio del navegador
- 📄 **Cuenta páginas** → Utiliza `chrome.webNavigation.onCommitted` para detectar cada página nueva
- 🚫 **Evita duplicados** → Compara la URL actual con la anterior
- 💾 **Almacena datos** → Utiliza `chrome.storage.local` (almacenamiento local, nunca se envía)
- 📨 **Se comunica con el popup** → Responde a los mensajes del popup con estadísticas

#### 3. **popup.html & popup.js**
Interfaz de usuario y lógica.

- ⏱️ Tiempo transcurrido desde el inicio del navegador (en minutos)
- 📊 Número total de páginas visitadas
- 🎨 Diseño moderno con gradiente púrpura

#### 4. **options.html & options.js**
Página de configuración para cambiar el idioma.

- 🌍 Elige entre 5 idiomas
- 💾 Guarda tu preferencia
- 🔄 Traduce al instante toda la extensión

#### 5. **i18n.js**
Sistema de traducción con todos los textos en 5 idiomas.

### Cómo cargar

1. Abre `chrome://extensions/` o `brave://extensions/`
2. Habilita el "Modo de desarrollador" (esquina superior derecha)
3. Haz clic en "Cargar extensión sin empaquetar"
4. Selecciona la carpeta TabPulse
5. ¡Hecho! ✅

### Privacidad

✅ **Esta extensión:**
- ❌ NUNCA registra URLs, títulos de páginas o historial
- ✅ Solo cuenta páginas (número bruto, sin detalles)
- ✅ Los datos permanecen en el almacenamiento local del navegador
- ✅ Nada se envía en línea

### Idiomas compatibles

- 🇬🇧 English
- 🇫🇷 Français
- 🇷🇺 Русский
- 🇪🇸 Español (por defecto)
- 🇨🇳 中文

---

---

## 🇨🇳 中文文档 {#chinese}

# TabPulse - Chrome Manifest V3 扩展

一个简单轻巧的扩展程序，用于跟踪您的浏览统计数据。

### 项目文件

#### 1. **manifest.json**
扩展的配置（Chrome 必需）。

- 声明扩展的名称、版本和描述
- 列出所需的权限（`tabs`、`webNavigation`、`storage`）
- 指向 Service Worker（`background.js`）
- 配置弹出窗口（`popup.html`）

**关键点：** `manifest_version: 3` = Manifest V3（新标准）

#### 2. **background.js**
在后台运行并管理逻辑的 Service Worker。

- 🕐 **初始化会话** → 记录浏览器启动时间
- 📄 **计算页面** → 使用 `chrome.webNavigation.onCommitted` 检测每个新页面
- 🚫 **避免重复** → 将当前 URL 与上一个进行比较
- 💾 **存储数据** → 使用 `chrome.storage.local`（本地存储，从不发送）
- 📨 **与弹出窗口通信** → 用统计数据响应弹出窗口的消息

#### 3. **popup.html & popup.js**
用户界面和逻辑。

- ⏱️ 自浏览器启动以来经过的时间（以分钟为单位）
- 📊 浏览的总页数
- 🎨 带有紫色渐变的现代设计

#### 4. **options.html & options.js**
用于更改语言的设置页面。

- 🌍 在 5 种语言之间选择
- 💾 保存您的首选项
- 🔄 即时翻译整个扩展

#### 5. **i18n.js**
翻译系统，包含 5 种语言的所有文本。

### 如何加载

1. 打开 `chrome://extensions/` 或 `brave://extensions/`
2. 启用"开发者模式"（右上角）
3. 单击"加载未打包的扩展程序"
4. 选择 TabPulse 文件夹
5. 完成！✅

### 隐私

✅ **此扩展：**
- ❌ 从不记录 URL、页面标题或历史记录
- ✅ 仅计算页面（原始数字，无详细信息）
- ✅ 数据保留在浏览器本地存储中
- ✅ 不向网络发送任何内容

### 支持的语言

- 🇬🇧 English
- 🇫🇷 Français
- 🇷🇺 Русский
- 🇪🇸 Español
- 🇨🇳 中文（默认）

---

---

**[Back to top ⬆️](#table-of-contents)**
