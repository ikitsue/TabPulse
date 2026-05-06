/**
 * Options Script - Settings management
 * 
 * Allows the user to change the language and save the choice
 */

const languageSelect = document.getElementById('languageSelect');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeStatus = document.getElementById('darkModeStatus');

/**
 * Initialization: Load current language on startup
 */
document.addEventListener('DOMContentLoaded', () => {
  // Translate the page
  translatePage();
  
  // Load the saved language
  getLanguage((lang) => {
    languageSelect.value = lang;
  });
  
  // Load the saved dark mode state
  loadDarkMode();
  
  // Listener for the dark mode toggle
  darkModeToggle.addEventListener('change', toggleDarkMode);
});

/**
 * Save button: Save the selected language
 */
saveBtn.addEventListener('click', () => {
  const selectedLang = languageSelect.value;
  
  setLanguage(selectedLang, () => {
    // Re-translate the page after changing the language
    translatePage();
    
    // Show a confirmation message
    translate('savedMsg', (text) => {
      message.textContent = text;
      message.classList.add('show');
      
      // Hide the message after 2 seconds
      setTimeout(() => {
        message.classList.remove('show');
      }, 2000);
    });
  });
});

/**
 * Reset button: Revert to English
 */
resetBtn.addEventListener('click', () => {
  languageSelect.value = 'en';
  saveBtn.click(); // Sauvegarder le changement
});

/**
 * Dark Mode: Load the saved state
 */
function loadDarkMode() {
  chrome.storage.local.get(['darkMode'], (result) => {
    const isDarkMode = result.darkMode || false;
    darkModeToggle.checked = isDarkMode;
    applyDarkMode(isDarkMode);
  });
}

/**
 * Dark Mode: Toggle dark mode
 */
function toggleDarkMode() {
  const isDarkMode = darkModeToggle.checked;
  
  // Save the preference
  chrome.storage.local.set({ darkMode: isDarkMode }, () => {
    applyDarkMode(isDarkMode);
    
    // Update the status text
    const statusKey = isDarkMode ? 'darkModeOn' : 'darkModeOff';
    translate(statusKey, (text) => {
      darkModeStatus.textContent = text;
    });
  });
}

/**
 * Dark Mode: Apply the theme to the page
 */
function applyDarkMode(isDarkMode) {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}
