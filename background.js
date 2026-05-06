/**
 * Background Service Worker - TabPilse
 * 
 * Responsabilités :
 * - Suivre le temps de session du navigateur
 * - Compter les pages consultées
 * - Gérer le stockage des données
 */

// Clés du stockage
const STORAGE_KEYS = {
  SESSION_START: 'sessionStartTime',
  PAGE_COUNT: 'pageCount',
  LAST_TAB_ID: 'lastTabId',
  LAST_URL: 'lastUrl',
  DAILY_STATS: 'dailyStats'
};

// Initialiser la session au démarrage du service worker
initializeSession();

/**
 * Initialise une nouvelle session si elle n'existe pas
 */
function initializeSession() {
  chrome.storage.local.get([STORAGE_KEYS.SESSION_START], (result) => {
    if (!result[STORAGE_KEYS.SESSION_START]) {
      // Première fois que l'extension démarre cette session
      const now = Date.now();
      chrome.storage.local.set({
        [STORAGE_KEYS.SESSION_START]: now,
        [STORAGE_KEYS.PAGE_COUNT]: 0,
        [STORAGE_KEYS.LAST_TAB_ID]: null,
        [STORAGE_KEYS.LAST_URL]: null,
        [STORAGE_KEYS.DAILY_STATS]: {},
        language: 'en'
      });
      console.log('[TabPilse] Session initialisée');
    }
  });
}

/**
 * Événement : Augmenter le compteur lorsqu'une page se charge
 * Utilise webNavigation.onCommitted pour éviter les comptes multiples
 */
chrome.webNavigation.onCommitted.addListener((details) => {
  // Ignorer les frames imbriquées (iframes, etc)
  if (details.frameId !== 0) return;
  
  // Récupérer les données actuelles
  chrome.storage.local.get(
    [STORAGE_KEYS.PAGE_COUNT, STORAGE_KEYS.LAST_URL, STORAGE_KEYS.DAILY_STATS],
    (result) => {
      const currentCount = result[STORAGE_KEYS.PAGE_COUNT] || 0;
      const lastUrl = result[STORAGE_KEYS.LAST_URL];
      const currentUrl = details.url;
      const dailyStats = result[STORAGE_KEYS.DAILY_STATS] || {};
      
      // Incrémenter le compteur seulement si c'est une URL différente
      // ou si c'est le premier chargement
      if (currentUrl !== lastUrl) {
        const newCount = currentCount + 1;
        
        // Mettre à jour les statistiques quotidiennes
        const today = new Date().toISOString().split('T')[0];
        dailyStats[today] = (dailyStats[today] || 0) + 1;
        
        chrome.storage.local.set({
          [STORAGE_KEYS.PAGE_COUNT]: newCount,
          [STORAGE_KEYS.LAST_URL]: currentUrl,
          [STORAGE_KEYS.DAILY_STATS]: dailyStats
        });
        console.log(`[TabPilse] Page comptabilisée. Total: ${newCount}`);
      }
    }
  );
});

/**
 * Fonction utilitaire : Obtenir les statistiques actuelles
 * Utilisée par le popup
 */
function getStats(callback) {
  chrome.storage.local.get(
    [STORAGE_KEYS.SESSION_START, STORAGE_KEYS.PAGE_COUNT],
    (result) => {
      const sessionStart = result[STORAGE_KEYS.SESSION_START] || Date.now();
      const pageCount = result[STORAGE_KEYS.PAGE_COUNT] || 0;
      const sessionTime = Date.now() - sessionStart;
      
      callback({
        sessionDuration: sessionTime,
        pageCount: pageCount
      });
    }
  );
}

/** * Fonction utilitaire : Obtenir le nom du jour selon l'index (0 = aujourd'hui, 6 = il y a 6 jours)
 */
function getDayLabel(index) {
  const days = ['Vendredi', 'Jeudi', 'Mercredi', 'Mardi', 'Lundi', 'Dimanche', 'Samedi'];
  return days[index] || 'Jour';
}

/** * Fonction utilitaire : Obtenir les statistiques détaillées pour une période
 * Utilisée par la page stats
 */
function getDetailedStats(period, callback) {
  chrome.storage.local.get(
    [STORAGE_KEYS.DAILY_STATS, STORAGE_KEYS.SESSION_START, STORAGE_KEYS.PAGE_COUNT],
    (result) => {
      const dailyStats = result[STORAGE_KEYS.DAILY_STATS] || {};
      const sessionStart = result[STORAGE_KEYS.SESSION_START] || Date.now();
      const currentPageCount = result[STORAGE_KEYS.PAGE_COUNT] || 0;
      
      let chartData = [];
      let totalPages = 0;
      let avgSession = 0;
      let bestDay = 0;
      
      const now = Date.now();
      
      // Calculer la session moyenne (pages par heure) - indépendant de la période
      const sessionDurationHours = (now - sessionStart) / (1000 * 60 * 60);
      avgSession = sessionDurationHours > 0 ? Math.round(currentPageCount / sessionDurationHours) : 0;
        // Statistiques des 7 derniers jours
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now - i * 24 * 60 * 60 * 1000);
          const dateKey = date.toISOString().split('T')[0];
          const value = dailyStats[dateKey] || 0;
          
          chartData.push({
            label: getDayLabel(i),
            value: value
          });
          
          totalPages += value;
          bestDay = Math.max(bestDay, value);
        }
      } else if (period === 'week') {
        // Statistiques des 4 dernières semaines
        for (let i = 3; i >= 0; i--) {
          const weekStart = new Date(now - i * 7 * 24 * 60 * 60 * 1000);
          let weekTotal = 0;
          
          // Calculer le total de la semaine
          for (let j = 0; j < 7; j++) {
            const date = new Date(weekStart.getTime() + j * 24 * 60 * 60 * 1000);
            const dateKey = date.toISOString().split('T')[0];
            weekTotal += dailyStats[dateKey] || 0;
          }
          
          chartData.push({
            label: `Semaine ${4 - i}`,
            value: weekTotal
          });
          
          totalPages += weekTotal;
          bestDay = Math.max(bestDay, weekTotal);
        }
      } else if (period === 'year') {
        // Statistiques des 12 derniers mois
        for (let i = 11; i >= 0; i--) {
          const monthStart = new Date(now);
          monthStart.setMonth(monthStart.getMonth() - i);
          monthStart.setDate(1);
          
          let monthTotal = 0;
          const daysInMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
          
          // Calculer le total du mois
          for (let j = 0; j < daysInMonth; j++) {
            const date = new Date(monthStart.getTime() + j * 24 * 60 * 60 * 1000);
            const dateKey = date.toISOString().split('T')[0];
            monthTotal += dailyStats[dateKey] || 0;
          }
          
          chartData.push({
            label: monthStart.toLocaleDateString('fr-FR', { month: 'short' }),
            value: monthTotal
          });
          
          totalPages += monthTotal;
          bestDay = Math.max(bestDay, monthTotal);
        }
      }
      
      callback({
        avgSession,
        totalPages,
        bestDay,
        chartData
      });
    }
  );
}

/**
 * Listener de message pour communiquer avec le popup
 * Le popup demande les stats et les affiche
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStats') {
    getStats((stats) => {
      sendResponse(stats);
    });
    return true; // Garder le channel ouvert pour la réponse asynchrone
  }

  if (request.action === 'getDetailedStats') {
    getDetailedStats(request.period, (stats) => {
      sendResponse({ stats });
    });
    return true;
  }
});
