/**
 * Popup Script - TabPilse
 * 
 * Gère l'affichage des statistiques dans le popup
 * Récupère les données du background service worker
 */

/**
 * Formate le temps en secondes/minutes/heures/jours
 * @param {number} milliseconds - Durée en millisecondes
 * @returns {string} Format lisible
 */
function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  
  if (seconds < 60) {
    return seconds + 's';
  }
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return minutes + 'm';
  }
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours + 'h' + (minutes % 60) + 'm';
  }
  
  const days = Math.floor(hours / 24);
  return days + 'j' + (hours % 24) + 'h';
}

/**
 * Met à jour l'affichage des statistiques
 * Récupère les données du background et les affiche
 */
function updateStats() {
  // Envoyer un message au background pour récupérer les stats
  chrome.runtime.sendMessage({ action: 'getStats' }, (stats) => {
    if (stats) {
      // Mettre à jour le temps écoulé
      const timeDisplay = document.getElementById('sessionTime');
      if (timeDisplay) {
        const minutes = Math.floor(stats.sessionDuration / 60000);
        timeDisplay.textContent = minutes;
      }
      
      // Mettre à jour le compteur de pages
      const pageCountDisplay = document.getElementById('pageCount');
      if (pageCountDisplay) {
        pageCountDisplay.textContent = stats.pageCount;
      }
    }
  });
}

/**
 * Initialisation au chargement du popup
 */
document.addEventListener('DOMContentLoaded', () => {
  // Charger les traductions (vérifier que la fonction existe)
  if (typeof translatePage === 'function') {
    translatePage();
  }
  
  // Charger le dark mode
  loadDarkModePopup();
  
  // Afficher les stats immédiatement
  updateStats();
  
  // Mettre à jour les stats chaque seconde pour que le temps s'actualise
  setInterval(updateStats, 1000);
  
  // Gérer le clic sur le bouton paramètres
  const settingsBtn = document.getElementById('settingsBtn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      // Ouvrir la page d'options avec gestion d'erreur
      chrome.runtime.openOptionsPage().catch((error) => {
        console.error('Erreur lors de l\'ouverture des paramètres:', error);
      });
    });
  }

  // Gérer le clic sur le bouton stats
  const statsBtn = document.getElementById('statsBtn');
  if (statsBtn) {
    statsBtn.addEventListener('click', () => {
      // Ouvrir la page stats
      chrome.tabs.create({ url: chrome.runtime.getURL('stats.html') });
    });
  }
});

/**
 * Dark Mode : Charger et appliquer le thème au popup
 */
function loadDarkModePopup() {
  chrome.storage.local.get(['darkMode'], (result) => {
    const isDarkMode = result.darkMode || false;
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  });
}
