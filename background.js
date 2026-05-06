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
  LAST_URL: 'lastUrl'
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
        [STORAGE_KEYS.LAST_URL]: null
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
    [STORAGE_KEYS.PAGE_COUNT, STORAGE_KEYS.LAST_URL],
    (result) => {
      const currentCount = result[STORAGE_KEYS.PAGE_COUNT] || 0;
      const lastUrl = result[STORAGE_KEYS.LAST_URL];
      const currentUrl = details.url;
      
      // Incrémenter le compteur seulement si c'est une URL différente
      // ou si c'est le premier chargement
      if (currentUrl !== lastUrl) {
        chrome.storage.local.set({
          [STORAGE_KEYS.PAGE_COUNT]: currentCount + 1,
          [STORAGE_KEYS.LAST_URL]: currentUrl
        });
        console.log(`[TabPilse] Page comptabilisée. Total: ${currentCount + 1}`);
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
});
