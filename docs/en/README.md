# 📊 TabPilse - Chrome Manifest V3 Extension

A simple and lightweight extension to track your browsing statistics.

## 📋 Project Files

### 1. **manifest.json**
Configuration of the extension (required by Chrome).

**What it does:**
- Declares the name, version and description of the extension
- Lists required permissions (`tabs`, `webNavigation`, `storage`)
- Points to the service worker (`background.js`)
- Configures the popup (`popup.html`)

**Key point:** `manifest_version: 3` = Manifest V3 (new standard)

---

### 2. **background.js**
Service Worker that runs in the background and manages the logic.

**What it does:**
- 🕐 **Initializes the session** → Records browser startup time
- 📄 **Counts pages** → Uses `chrome.webNavigation.onCommitted` to detect each new page
- 🚫 **Avoids duplicates** → Compares current URL with previous one
- 💾 **Stores data** → Uses `chrome.storage.local` (local storage, never sent anywhere)
- 📨 **Communicates with popup** → Responds to popup messages with stats

**Key events:**
- `chrome.webNavigation.onCommitted` → Fires when a page actually loads
- `chrome.runtime.onMessage` → Receives requests from the popup

---

### 3. **popup.html**
User interface (what you see when clicking the icon).

**What it displays:**
- ⏱️ Time elapsed since browser startup (in minutes)
- 📊 Total number of pages viewed
- 🎨 Modern design with purple gradient

---

### 4. **popup.js**
Popup logic.

**What it does:**
- 🔄 Fetches stats from the background every second
- 📝 Formats numbers in a readable way
- ✨ Updates the interface in real-time

---

### 5. **options.html / options.js**
Settings page to change the language.

**What it does:**
- 🌍 Choose between 5 languages (French, English, Russian, Spanish, Chinese)
- 💾 Save your preference
- 🔄 Instantly translate the entire extension

---

### 6. **i18n.js**
Translation system.

**Contains:**
- All texts in 5 languages
- Functions to load and apply translations
- Real-time language switching

---

## 🚀 How to Load the Extension

### Step 1: Access the Extensions Page
1. Open **Chrome** or **Brave**
2. Go to: `chrome://extensions/` (Chrome) or `brave://extensions/` (Brave)

### Step 2: Enable Developer Mode
- Click the **"Developer mode"** toggle (top right corner)

### Step 3: Load the Extension
1. Click **"Load unpacked"**
2. Select the folder containing the extension files
3. ✅ Extension is loaded!

### Step 4: Test the Extension
- You'll see the extension icon in your toolbar
- Click it to open the popup
- Statistics will increase with each new page
- Click ⚙️ Settings to change language

---

## 🔐 Privacy

✅ **This extension:**
- ❌ NEVER records URLs
- ❌ NEVER records page titles
- ❌ NEVER records history
- ✅ Only counts pages (raw number, no details)
- ✅ Data stays in local browser storage
- ✅ Nothing is sent online

---

## 📈 How It Works (in detail)

```
User clicks on a page
         ↓
background.js detects onCommitted event
         ↓
Compares URL with previous one to avoid duplicates
         ↓
Increments page counter
         ↓
User opens popup
         ↓
popup.js requests stats from background
         ↓
background.js sends: elapsed time + page count
         ↓
popup.js displays updated stats
         ↓
Popup updates every second (timer)
```

---

## 💾 Stored Data

The extension stores 4 keys in `chrome.storage.local`:

| Key | Value | Example |
|-----|-------|---------|
| `sessionStartTime` | Browser startup timestamp | `1715000000000` |
| `pageCount` | Number of pages viewed | `42` |
| `lastUrl` | Last URL to avoid duplicates | `https://google.com` |
| `language` | Current language | `en` |

---

## 🌍 Supported Languages

- 🇬🇧 English (default)
- 🇫🇷 Français
- 🇷🇺 Русский
- 🇪🇸 Español
- 🇨🇳 中文

---

## ✨ Future Improvements

**Ideas for evolution:**
- Add a "Reset" button to start a new session
- Display daily/weekly statistics
- Create charts and graphs
- Add daily time limit notifications
- Dark mode support

The code structure is ready for these improvements. Good luck! 🚀
