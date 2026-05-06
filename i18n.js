/**
 * Fichier de traductions - i18n.js
 * 
 * Contient les textes de l'extension dans plusieurs langues
 */

const TRANSLATIONS = {
  fr: {
    sessionTimeLabel: 'Temps écoulé',
    pageCountLabel: 'Pages consultées',
    settingsBtn: '⚙️ Paramètres',
    privacyNote: '✓ Données jamais enregistrées',
    appName: 'TabPilse',
    subtitle: 'Vos statistiques de navigation',
    languageLabel: 'Langue',
    saveBtn: 'Enregistrer',
    settingsTitle: 'Paramètres - TabPilse',
    savedMsg: 'Paramètres sauvegardés !'
  },
  en: {
    sessionTimeLabel: 'Time Elapsed',
    pageCountLabel: 'Pages Viewed',
    settingsBtn: '⚙️ Settings',
    privacyNote: '✓ Data never recorded',
    appName: 'TabPilse',
    subtitle: 'Your browsing statistics',
    languageLabel: 'Language',
    saveBtn: 'Save',
    settingsTitle: 'Settings - TabPilse',
    savedMsg: 'Settings saved!'
  },
  ru: {
    sessionTimeLabel: 'Прошедшее время',
    pageCountLabel: 'Просмотренные страницы',
    settingsBtn: '⚙️ Настройки',
    privacyNote: '✓ Данные никогда не записываются',
    appName: 'TabPilse',
    subtitle: 'Ваша статистика просмотров',
    languageLabel: 'Язык',
    saveBtn: 'Сохранить',
    settingsTitle: 'Настройки - TabPilse',
    savedMsg: 'Параметры сохранены!'
  },
  es: {
    sessionTimeLabel: 'Tiempo transcurrido',
    pageCountLabel: 'Páginas visitadas',
    settingsBtn: '⚙️ Configuración',
    privacyNote: '✓ Datos nunca registrados',
    appName: 'TabPilse',
    subtitle: 'Tus estadísticas de navegación',
    languageLabel: 'Idioma',
    saveBtn: 'Guardar',
    settingsTitle: 'Configuración - TabPilse',
    savedMsg: '¡Configuración guardada!'
  },
  zh: {
    sessionTimeLabel: '已用时间',
    pageCountLabel: '已查看页面',
    settingsBtn: '⚙️ 设置',
    privacyNote: '✓ 永不记录数据',
    appName: 'TabPilse',
    subtitle: '您的浏览统计',
    languageLabel: '语言',
    saveBtn: '保存',
    settingsTitle: '设置 - TabPilse',
    savedMsg: '设置已保存！'
  }
};

/**
 * Récupère la langue actuelle (par défaut: anglais)
 */
function getLanguage(callback) {
  chrome.storage.local.get(['language'], (result) => {
    const lang = result.language || 'en';
    callback(lang);
  });
}

/**
 * Définit la langue
 */
function setLanguage(lang, callback) {
  chrome.storage.local.set({ language: lang }, callback);
}

/**
 * Récupère une traduction pour la langue courante
 */
function translate(key, callback) {
  getLanguage((lang) => {
    const text = TRANSLATIONS[lang] && TRANSLATIONS[lang][key] 
      ? TRANSLATIONS[lang][key] 
      : TRANSLATIONS.fr[key]; // Fallback français
    callback(text);
  });
}

/**
 * Traduit tous les éléments HTML avec l'attribut data-i18n
 * Exemple: <span data-i18n="sessionTimeLabel"></span>
 */
function translatePage() {
  getLanguage((lang) => {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
        if (el.tagName === 'BUTTON' || el.tagName === 'INPUT') {
          el.value = TRANSLATIONS[lang][key];
        } else {
          el.textContent = TRANSLATIONS[lang][key];
        }
      } else if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
        // Fallback en anglais si la langue n'existe pas
        if (el.tagName === 'BUTTON' || el.tagName === 'INPUT') {
          el.value = TRANSLATIONS.en[key];
        } else {
          el.textContent = TRANSLATIONS.en[key];
        }
      }
    });
  });
}
