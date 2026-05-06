/**
 * Options Script - Gestion des paramètres
 * 
 * Permet à l'utilisateur de changer la langue et sauvegarde le choix
 */

const languageSelect = document.getElementById('languageSelect');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeStatus = document.getElementById('darkModeStatus');

/**
 * Initialisation : Charger la langue actuelle au démarrage
 */
document.addEventListener('DOMContentLoaded', () => {
  // Traduire la page
  translatePage();
  
  // Charger la langue sauvegardée
  getLanguage((lang) => {
    languageSelect.value = lang;
  });
  
  // Charger le mode sombre sauvegardé
  loadDarkMode();
  
  // Écouteur pour le toggle dark mode
  darkModeToggle.addEventListener('change', toggleDarkMode);
});

/**
 * Bouton Enregistrer : Sauvegarder la langue sélectionnée
 */
saveBtn.addEventListener('click', () => {
  const selectedLang = languageSelect.value;
  
  setLanguage(selectedLang, () => {
    // Re-traduire la page après changement
    translatePage();
    
    // Afficher un message de confirmation
    translate('savedMsg', (text) => {
      message.textContent = text;
      message.classList.add('show');
      
      // Masquer le message après 2 secondes
      setTimeout(() => {
        message.classList.remove('show');
      }, 2000);
    });
  });
});

/**
 * Bouton Réinitialiser : Retourner à l'anglais
 */
resetBtn.addEventListener('click', () => {
  languageSelect.value = 'en';
  saveBtn.click(); // Sauvegarder le changement
});

/**
 * Dark Mode : Charger l'état sauvegardé
 */
function loadDarkMode() {
  chrome.storage.local.get(['darkMode'], (result) => {
    const isDarkMode = result.darkMode || false;
    darkModeToggle.checked = isDarkMode;
    applyDarkMode(isDarkMode);
  });
}

/**
 * Dark Mode : Basculer le mode sombre
 */
function toggleDarkMode() {
  const isDarkMode = darkModeToggle.checked;
  
  // Sauvegarder la préférence
  chrome.storage.local.set({ darkMode: isDarkMode }, () => {
    applyDarkMode(isDarkMode);
    
    // Mettre à jour le texte du statut
    const statusKey = isDarkMode ? 'darkModeOn' : 'darkModeOff';
    translate(statusKey, (text) => {
      darkModeStatus.textContent = text;
    });
  });
}

/**
 * Dark Mode : Appliquer le thème à la page
 */
function applyDarkMode(isDarkMode) {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}
