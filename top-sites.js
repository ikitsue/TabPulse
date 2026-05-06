/**
 * Top Sites Page Script - TabPilse
 * Displays the top 10 most visited sites
 */

/**
 * Initialisation au chargement de la page
 */
document.addEventListener('DOMContentLoaded', () => {
  // Charger les traductions
  if (typeof translatePage === 'function') {
    translatePage();
  }

  // Charger le dark mode
  loadDarkMode();

  // Charger les top sites
  loadTopSites();
});

/**
 * Dark Mode: Load and apply the theme
 */
function loadDarkMode() {
  chrome.storage.local.get(['darkMode'], (result) => {
    const isDarkMode = result.darkMode || false;
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  });
}

/**
 * Charger les top sites
 */
function loadTopSites() {
  chrome.runtime.sendMessage({ action: 'getTopSites' }, (response) => {
    if (response && response.topSites && response.topSites.length > 0) {
      displayTopSites(response.topSites);
    } else {
      displayEmpty();
    }
  });
}

/**
 * Afficher les top sites
 */
function displayTopSites(topSites) {
  const sitesList = document.getElementById('sitesList');
  const emptyState = document.getElementById('emptyState');
  
  sitesList.innerHTML = '';
  emptyState.style.display = 'none';

  topSites.forEach((site, index) => {
    const rank = index + 1;
    let rankClass = '';
    
    if (rank === 1) rankClass = 'first top3';
    else if (rank === 2) rankClass = 'second top3';
    else if (rank === 3) rankClass = 'third';

    const li = document.createElement('li');
    li.className = 'site-item';
    li.innerHTML = `
      <div class="rank ${rankClass}">${rank}</div>
      <div class="site-info">
        <div class="site-domain">${site.domain}</div>
        <div class="site-visits">${site.visits} visite${site.visits > 1 ? 's' : ''}</div>
      </div>
    `;
    
    sitesList.appendChild(li);
  });
}

/**
 * Display the empty state
 */
function displayEmpty() {
  const sitesList = document.getElementById('sitesList');
  const emptyState = document.getElementById('emptyState');
  
  sitesList.innerHTML = '';
  emptyState.style.display = 'block';
}
