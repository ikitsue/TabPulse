# 📊 TabPulse - Extension Chrome Manifest V3

Extension simple et légère pour suivre vos statistiques de navigation.

## 📋 Fichiers du projet

### 1. **manifest.json**
Configuration de l'extension (obligatoire pour Chrome).

**Ce qu'il fait :**
- Déclare le nom, version et description de l'extension
- Énumère les permissions nécessaires (`tabs`, `webNavigation`, `storage`)
- Pointe vers le service worker (`background.js`)
- Configure le popup (`popup.html`)

**Clé importante :** `manifest_version: 3` = Manifest V3 (nouvelle standard)

---

### 2. **background.js**
Service Worker qui tourne en arrière-plan et gère la logique.

**Ce qu'il fait :**
- 🕐 **Initialise la session** → Enregistre l'heure de démarrage du navigateur
- 📄 **Compte les pages** → Utilise `chrome.webNavigation.onCommitted` pour détecter chaque nouvelle page
- 🚫 **Évite les doublons** → Compare l'URL actuelle avec la précédente
- 💾 **Stocke les données** → Utilise `chrome.storage.local` (stockage local, jamais envoyé)
- 📨 **Communique avec le popup** → Répond aux messages du popup avec les stats

**Événements clés :**
- `chrome.webNavigation.onCommitted` → Se déclenche quand une page se charge réellement
- `chrome.runtime.onMessage` → Reçoit les demandes du popup

---

### 3. **popup.html**
Interface utilisateur (ce qu'on voit en cliquant sur l'icône).

**Ce qu'il affiche :**
- ⏱️ Temps écoulé depuis le démarrage du navigateur (en minutes)
- 📊 Nombre total de pages consultées
- 🎨 Design moderne avec dégradé violet

---

### 4. **popup.js**
Logique du popup.

**Ce qu'il fait :**
- 🔄 Récupère les stats du background chaque seconde
- 📝 Formate les nombres de manière lisible
- ✨ Met à jour l'interface en temps réel

---

### 5. **options.html / options.js**
Page des paramètres pour changer la langue.

**Ce qu'elle fait :**
- 🌍 Choisir entre 5 langues (Français, Anglais, Russe, Espagnol, Chinois)
- 💾 Sauvegarder votre préférence
- 🔄 Traduire instantanément toute l'extension

---

### 6. **i18n.js**
Système de traduction.

**Contient :**
- Tous les textes en 5 langues
- Fonctions pour charger et appliquer les traductions
- Changement de langue en temps réel

---

## 🚀 Comment charger l'extension

### Étape 1 : Accéder à la page des extensions
```
Chrome  → chrome://extensions/
Brave   → brave://extensions/
```

### Étape 2 : Activer le mode développeur
- Cliquez sur l'interrupteur **"Mode de développement"** (coin haut-droit)

### Étape 3 : Charger l'extension
1. Cliquez sur **"Charger l'extension non empaquetée"**
2. Naviguez vers le dossier de l'extension
3. Sélectionnez le dossier et validez

✅ **Done !** L'extension s'affiche dans votre barre d'outils

### Étape 4 : Tester l'extension
- Vous verrez l'icône de l'extension dans votre barre d'outils
- Cliquez dessus pour ouvrir le popup
- Les statistiques augmentent à chaque nouvelle page
- Cliquez sur ⚙️ Paramètres pour changer la langue

---

## 🔐 Respect de la vie privée

✅ **Cette extension :**
- ❌ N'enregistre JAMAIS les URLs
- ❌ N'enregistre JAMAIS les titres de pages
- ❌ N'enregistre JAMAIS l'historique
- ✅ Ne compte que le nombre de pages (nombre brut, pas les détails)
- ✅ Les données restent dans le stockage local du navigateur
- ✅ Rien n'est envoyé en ligne

---

## 📈 Comment ça fonctionne (en détail)

```
Utilisateur clique sur une page
         ↓
background.js détecte l'événement onCommitted
         ↓
Compare l'URL avec la précédente pour éviter les doublons
         ↓
Incrémente le compteur de pages
         ↓
Utilisateur ouvre le popup
         ↓
popup.js demande les stats au background
         ↓
background.js envoie : temps écoulé + nombre de pages
         ↓
popup.js affiche les stats mises à jour
         ↓
Le popup se met à jour chaque seconde (timer)
```

---

## 💾 Données stockées

L'extension stocke 4 clés dans `chrome.storage.local` :

| Clé | Valeur | Exemple |
|-----|--------|---------|
| `sessionStartTime` | Timestamp du démarrage | `1715000000000` |
| `pageCount` | Nombre de pages consultées | `42` |
| `lastUrl` | Dernière URL pour éviter les doublons | `https://google.com` |
| `language` | Langue courante | `fr` |

---

## 🌍 Langues supportées

- 🇬🇧 English
- 🇫🇷 Français (par défaut)
- 🇷🇺 Русский
- 🇪🇸 Español
- 🇨🇳 中文

---

## ✨ Pour évoluer plus tard

**Idées d'améliorations :**
- Ajouter un bouton "Réinitialiser" pour recommencer la session
- Afficher des statistiques quotidiennes/hebdomadaires
- Créer des graphiques
- Ajouter une limite de temps quotidienne
- Mode sombre

La structure du code est prête pour ces évolutions. Bonne luck ! 🚀
