/**
 * Popup Script - TabPulse
 * 
 * Manages statistics display in the popup
 * Retrieves data from the background service worker
 */

/**
 * Formate le temps en secondes/minutes/heures/jours
 * @param {number} milliseconds - Duration in milliseconds
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
 * Update the statistics display
 * Retrieves data from the background and shows it
 */
function updateStats() {
  // Send a message to the background to fetch stats
  chrome.runtime.sendMessage({ action: 'getStats' }, (stats) => {
    if (stats) {
      // Update elapsed time
      const timeDisplay = document.getElementById('sessionTime');
      if (timeDisplay) {
        const minutes = Math.floor(stats.sessionDuration / 60000);
        timeDisplay.textContent = minutes;
      }
      
      // Update the page count display
      const pageCountDisplay = document.getElementById('pageCount');
      if (pageCountDisplay) {
        pageCountDisplay.textContent = stats.pageCount;
      }
    }
  });
}

/**
 * Initialization when the popup loads
 */
document.addEventListener('DOMContentLoaded', () => {
  // Load translations (check that the function exists)
  if (typeof translatePage === 'function') {
    translatePage();
  }
  
  // Load dark mode
  loadDarkModePopup();
  
  // Display stats immediately
  updateStats();
  
  // Update stats every second so time refreshes
  setInterval(updateStats, 1000);
  
  // Handle click on the settings button
  const settingsBtn = document.getElementById('settingsBtn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      // Open the options page with error handling
      chrome.runtime.openOptionsPage().catch((error) => {
        console.error('Erreur lors de l\'ouverture des paramètres:', error);
      });
    });
  }

  // Handle click on the stats button
  const statsBtn = document.getElementById('statsBtn');
  if (statsBtn) {
    statsBtn.addEventListener('click', () => {
      // Open the stats page
      chrome.tabs.create({ url: chrome.runtime.getURL('stats.html') });
    });
  }
});

/**
 * Dark Mode: Load and apply the theme to the popup
 */
function loadDarkModePopup() {
  chrome.storage.local.get(['darkMode'], (result) => {
    const isDarkMode = result.darkMode || false;
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  });
}
