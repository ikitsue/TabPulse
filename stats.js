/**
 * Stats Page Script - TabPulse
 *
 * Manages detailed statistics display with charts
 */

let currentPeriod = 'day';

/**
 * Initialization when the page loads
 */
document.addEventListener('DOMContentLoaded', () => {
  // Load translations
  if (typeof translatePage === 'function') {
    translatePage();
  }

  // Load dark mode
  loadDarkModeStats();

  // Initialize the period buttons
  initPeriodButtons();

  // Load data
  loadStats();
  loadTopSites();

  // Update stats every minute
  setInterval(loadStats, 60000);
  setInterval(loadTopSites, 60000);
});

/**
 * Initialize period buttons
 */
function initPeriodButtons() {
  const buttons = document.querySelectorAll('.time-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove the active class from all buttons
      buttons.forEach(btn => btn.classList.remove('active'));

      // Add the active class to the clicked button
      button.classList.add('active');

      // Change the period
      currentPeriod = button.dataset.period;

      // Reload stats
      loadStats();
    });
  });
}

/**
 * Load statistics
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

function loadTopSites() {
  chrome.runtime.sendMessage({ action: 'getTopSites' }, (response) => {
    if (response && response.topSites && response.topSites.length > 0) {
      displayTopSites(response.topSites);
    } else {
      displayTopSites([]);
    }
  });
}

/**
 * Display statistics
 */
function displayStats(stats) {
  // General statistics
  document.getElementById('avgSession').textContent = stats.avgSession || '--';
  document.getElementById('totalPages').textContent = stats.totalPages || '--';
  document.getElementById('bestDay').textContent = stats.bestDay || '--';

  // Chart
  displayChart(stats.chartData);
}

/**
 * Display the chart
 */
function displayChart(chartData) {
  const chartContent = document.getElementById('chartContent');

  if (!chartData || chartData.length === 0) {
    displayEmptyState();
    return;
  }

  // Calculate the maximum height for the bars
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
 * Display the empty state
 */
function displayEmptyState() {
  const chartContent = document.getElementById('chartContent');
  chartContent.innerHTML = `
    <div class="empty-state">
      <p data-i18n="noData">Pas de données disponibles</p>
    </div>
  `;

  // Empty statistics
  document.getElementById('avgSession').textContent = '--';
  document.getElementById('totalPages').textContent = '--';
  document.getElementById('bestDay').textContent = '--';
}

function displayTopSites(topSites) {
  const list = document.getElementById('topSitesList');
  const emptyState = document.getElementById('topSitesEmpty');

  list.innerHTML = '';
  emptyState.style.display = topSites.length === 0 ? 'block' : 'none';

  if (topSites.length === 0) {
    return;
  }

  topSites.forEach((site, index) => {
    const item = document.createElement('li');
    item.className = 'top-site-item';
    item.innerHTML = `
      <span class="site-domain">${index + 1}. ${site.domain}</span>
      <span class="site-visits">${site.visits}</span>
    `;
    list.appendChild(item);
  });
}

/**
 * Dark Mode: Load and apply the theme
 */
function loadDarkModeStats() {
  chrome.storage.local.get(['darkMode'], (result) => {
    const isDarkMode = result.darkMode || false;
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  });
}