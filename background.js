/**
 * Background Service Worker - TabPilse
 * 
 * Responsibilities:
 * - Track browser session time
 * - Count visited pages
 * - Manage data storage
 */

// Storage keys
const STORAGE_KEYS = {
  SESSION_START: 'sessionStartTime',
  PAGE_COUNT: 'pageCount',
  LAST_TAB_ID: 'lastTabId',
  LAST_URL: 'lastUrl',
  DAILY_STATS: 'dailyStats',
  VISITED_SITES: 'visitedSites'
};

// Initialize the session when the service worker starts
initializeSession();

/**
 * Initialize a new session if one does not exist
 */
function initializeSession() {
  chrome.storage.local.get([STORAGE_KEYS.SESSION_START], (result) => {
    if (!result[STORAGE_KEYS.SESSION_START]) {
      // First time the extension is starting this session
      const now = Date.now();
      chrome.storage.local.set({
        [STORAGE_KEYS.SESSION_START]: now,
        [STORAGE_KEYS.PAGE_COUNT]: 0,
        [STORAGE_KEYS.LAST_TAB_ID]: null,
        [STORAGE_KEYS.LAST_URL]: null,
        [STORAGE_KEYS.DAILY_STATS]: {},
        [STORAGE_KEYS.VISITED_SITES]: {},
        language: 'en'
      });
      console.log('[TabPilse] Session initialisée');
    }
  });
}

/**
 * Event: Increase count when a page loads
 * Uses webNavigation.onCommitted to avoid duplicate counts
 */
chrome.webNavigation.onCommitted.addListener((details) => {
  // Ignore embedded frames (iframes, etc)
  if (details.frameId !== 0) return;
  
  // Retrieve current data
  chrome.storage.local.get(
    [STORAGE_KEYS.PAGE_COUNT, STORAGE_KEYS.LAST_URL, STORAGE_KEYS.DAILY_STATS, STORAGE_KEYS.VISITED_SITES],
    (result) => {
      const currentCount = result[STORAGE_KEYS.PAGE_COUNT] || 0;
      const lastUrl = result[STORAGE_KEYS.LAST_URL];
      const currentUrl = details.url;
      const dailyStats = result[STORAGE_KEYS.DAILY_STATS] || {};
      const visitedSites = result[STORAGE_KEYS.VISITED_SITES] || {};
      
      // Increment the counter only if the URL is different
      // or if this is the first load
      if (currentUrl !== lastUrl) {
        const newCount = currentCount + 1;
        
        // Extract the domain from the URL
        try {
          const url = new URL(currentUrl);
          const domain = url.hostname || url.origin;
          
          // Increment the site counter
          visitedSites[domain] = (visitedSites[domain] || 0) + 1;
        } catch (e) {
          // Invalid URL, ignore it
        }
        
        // Update daily statistics
        const today = new Date().toISOString().split('T')[0];
        dailyStats[today] = (dailyStats[today] || 0) + 1;
        
        chrome.storage.local.set({
          [STORAGE_KEYS.PAGE_COUNT]: newCount,
          [STORAGE_KEYS.LAST_URL]: currentUrl,
          [STORAGE_KEYS.DAILY_STATS]: dailyStats,
          [STORAGE_KEYS.VISITED_SITES]: visitedSites
        });
        console.log(`[TabPilse] Page comptabilisée. Total: ${newCount}`);
      }
    }
  );
});

/**
 * Utility function: Get current statistics
 * Used by the popup
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
 * Utility function: Get the day name for a date
 */
function getDayLabel(date, locale) {
  const options = { weekday: 'long' };
  const dayName = date.toLocaleDateString(locale, options);
  return dayName.charAt(0).toUpperCase() + dayName.slice(1);
}

/**
 * Utility function: Get detailed statistics for a period
 * Used by the stats page
 */
function getDetailedStats(period, callback) {
  chrome.storage.local.get(
    [STORAGE_KEYS.DAILY_STATS, STORAGE_KEYS.SESSION_START, STORAGE_KEYS.PAGE_COUNT, 'language'],
    (result) => {
      const dailyStats = result[STORAGE_KEYS.DAILY_STATS] || {};
      const sessionStart = result[STORAGE_KEYS.SESSION_START] || Date.now();
      const currentPageCount = result[STORAGE_KEYS.PAGE_COUNT] || 0;
      const language = result.language || 'en';
      
      let chartData = [];
      let totalPages = 0;
      let avgSession = 0;
      let bestDay = 0;
      
      const localeMap = {
        fr: 'fr-FR',
        en: 'en-US',
        ru: 'ru-RU',
        es: 'es-ES',
        zh: 'zh-CN'
      };
      const locale = localeMap[language] || 'en-US';
      const weekPrefix = {
        fr: 'Semaine',
        en: 'Week',
        ru: 'Неделя',
        es: 'Semana',
        zh: '第'
      };
      
      const now = Date.now();
      
      // Calculate average session (pages per hour) - independent of period
      const sessionDurationHours = (now - sessionStart) / (1000 * 60 * 60);
      avgSession = sessionDurationHours > 0 ? Math.round(currentPageCount / sessionDurationHours) : 0;
      
      if (period === 'day') {
        // Statistics for the last 7 days
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now - i * 24 * 60 * 60 * 1000);
          const dateKey = date.toISOString().split('T')[0];
          const value = dailyStats[dateKey] || 0;
          
          chartData.push({
            label: getDayLabel(date, locale),
            value: value
          });
          
          totalPages += value;
          bestDay = Math.max(bestDay, value);
        }
      } else if (period === 'week') {
        // Statistics for the last 4 weeks (Week 1 to 4)
        const weeks = [];
        for (let i = 3; i >= 0; i--) {
          const weekStart = new Date(now - i * 7 * 24 * 60 * 60 * 1000);
          let weekTotal = 0;
          
          // Calculate the weekly total
          for (let j = 0; j < 7; j++) {
            const date = new Date(weekStart.getTime() + j * 24 * 60 * 60 * 1000);
            const dateKey = date.toISOString().split('T')[0];
            weekTotal += dailyStats[dateKey] || 0;
          }
          
          const weekNumber = 4 - i;
          let weekLabel = language === 'zh'
            ? `${weekPrefix[language]}${weekNumber}周`
            : `${weekPrefix[language]} ${weekNumber}`;
          
          weeks.push({
            label: weekLabel,
            value: weekTotal
          });
          
          totalPages += weekTotal;
          bestDay = Math.max(bestDay, weekTotal);
        }
        // Reverse to show Week 1 first
        chartData = weeks.reverse();
      } else if (period === 'year') {
        // Statistics for the last 12 months (Jan to Dec)
        const months = [];
        for (let i = 11; i >= 0; i--) {
          const monthStart = new Date(now);
          monthStart.setMonth(monthStart.getMonth() - i);
          monthStart.setDate(1);
          
          let monthTotal = 0;
          const daysInMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
          
          // Calculate the monthly total
          for (let j = 0; j < daysInMonth; j++) {
            const date = new Date(monthStart.getTime() + j * 24 * 60 * 60 * 1000);
            const dateKey = date.toISOString().split('T')[0];
            monthTotal += dailyStats[dateKey] || 0;
          }
          
          let monthName = monthStart.toLocaleDateString(locale, { month: 'short' });
          monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
          
          months.push({
            label: monthName,
            value: monthTotal
          });
          
          totalPages += monthTotal;
          bestDay = Math.max(bestDay, monthTotal);
        }
        // Reverse to show January first
        chartData = months.reverse();
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
 * Get the top 10 most visited sites
 */
function getTopSites(callback) {
  chrome.storage.local.get([STORAGE_KEYS.VISITED_SITES], (result) => {
    const visitedSites = result[STORAGE_KEYS.VISITED_SITES] || {};
    
    // Convert the object to an array and sort by visits
    const topSites = Object.entries(visitedSites)
      .map(([domain, count]) => ({
        domain: domain,
        visits: count
      }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10); // Keep only the top 10
    
    callback(topSites);
  });
}

/**
 * Message listener to communicate with the popup
 * The popup requests stats and displays them
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStats') {
    getStats((stats) => {
      sendResponse(stats);
    });
    return true; // Keep channel open for async response
  }

  if (request.action === 'getDetailedStats') {
    getDetailedStats(request.period, (stats) => {
      sendResponse({ stats });
    });
    return true;
  }

  if (request.action === 'getTopSites') {
    getTopSites((topSites) => {
      sendResponse({ topSites });
    });
    return true;
  }
});
