/**
 * Stats Page Script - TabPulse
 *
 * Gère l'affichage des statistiques détaillées avec graphiques
 */

let currentPeriod = 'day';

/**
 * Initialisation au chargement de la page
 */
document.addEventListener('DOMContentLoaded', () => {
  // Charger les traductions
  if (typeof translatePage === 'function') {
    translatePage();
  }

  // Charger le dark mode
  loadDarkModeStats();

  // Initialiser les boutons de période
  initPeriodButtons();

  // Charger les données
  loadStats();

  // Mettre à jour les stats chaque minute
  setInterval(loadStats, 60000);
});

/**
 * Initialiser les boutons de période
 */
function initPeriodButtons() {
  const buttons = document.querySelectorAll('.time-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Retirer la classe active de tous les boutons
      buttons.forEach(btn => btn.classList.remove('active'));

      // Ajouter la classe active au bouton cliqué
      button.classList.add('active');

      // Changer la période
      currentPeriod = button.dataset.period;

      // Recharger les stats
      loadStats();
    });
  });
}

/**
 * Charger les statistiques
 */
function loadStats() {
  chrome.runtime.sendMessage({ action: 'getDetailedStats', period: currentPeriod }, (response) => {
    if (response && response.stats) {
      displayStats(response.stats);
    } else {
      displayEmptyState();
    }
  });
}

/**
 * Afficher les statistiques
 */
function displayStats(stats) {
  // Statistiques générales
  document.getElementById('avgSession').textContent = stats.avgSession || '--';
  document.getElementById('totalPages').textContent = stats.totalPages || '--';
  document.getElementById('bestDay').textContent = stats.bestDay || '--';

  // Graphique
  displayChart(stats.chartData);
}

/**
 * Afficher le graphique
 */
function displayChart(chartData) {
  const chartContent = document.getElementById('chartContent');

  if (!chartData || chartData.length === 0) {
    displayEmptyState();
    return;
  }

  // Calculer la hauteur maximale pour les barres
  const maxValue = Math.max(...chartData.map(item => item.value));
  const maxHeight = 250; // hauteur maximale en pixels

  let chartHTML = '<div class="chart-bar">';

  chartData.forEach(item => {
    const height = maxValue > 0 ? (item.value / maxValue) * maxHeight : 40;

    chartHTML += `
      <div class="bar-group">
        <div class="bar-item" style="height: ${height}px;" title="${item.label}: ${item.value}">
          <div class="bar-value">${item.value}</div>
        </div>
        <div class="bar-label">${item.label}</div>
      </div>
    `;
  });

  chartHTML += '</div>';

  chartContent.innerHTML = chartHTML;
}

/**
 * Afficher l'état vide
 */
function displayEmptyState() {
  const chartContent = document.getElementById('chartContent');
  chartContent.innerHTML = `
    <div class="empty-state">
      <p data-i18n="noData">Pas de données disponibles</p>
    </div>
  `;

  // Statistiques vides
  document.getElementById('avgSession').textContent = '--';
  document.getElementById('totalPages').textContent = '--';
  document.getElementById('bestDay').textContent = '--';
}

/**
 * Dark Mode : Charger et appliquer le thème
 */
function loadDarkModeStats() {
  chrome.storage.local.get(['darkMode'], (result) => {
    const isDarkMode = result.darkMode || false;
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  });
}