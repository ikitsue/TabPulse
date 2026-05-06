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
    statsBtn: '📊 Statistiques',
    statsTitle: 'Statistiques',
    dayBtn: 'Jour',
    weekBtn: 'Semaine',
    yearBtn: 'Année',
    avgSessionLabel: 'Pages par heure',
    totalPagesLabel: 'Total pages',
    bestDayLabel: 'Meilleur jour',
    minutesUnit: 'pages/h',
    pagesUnit: 'pages',
    chartTitle: 'Activité',
    noData: 'Pas de données disponibles',
    chartNote: '💡 Les données de navigation sont stockées localement et ne sont jamais envoyées.',
    privacyNote: '✓ Données jamais enregistrées',
    appName: 'TabPilse',
    subtitle: 'Vos statistiques de navigation',
    languageLabel: 'Langue',
    darkModeLabel: 'Mode Sombre',
    darkModeOn: 'Activé',
    darkModeOff: 'Désactivé',
    saveBtn: 'Enregistrer',
    resetBtn: '↻ Réinitialiser',
    settingsTitle: 'Paramètres - TabPilse',
    savedMsg: 'Paramètres sauvegardés !',
    infoMessage: '💡 Info : Changez la langue et appuyez sur "Enregistrer" pour appliquer les modifications à tout l\'extension.',
    // Jours de la semaine
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    // Semaines
    week1: 'Semaine 1',
    week2: 'Semaine 2',
    week3: 'Semaine 3',
    week4: 'Semaine 4',
    // Top Sites
    topSitesTitle: 'Top 10 Sites',
    topSitesSubtitle: 'Vos sites les plus visités'
  },
  en: {
    sessionTimeLabel: 'Time Elapsed',
    pageCountLabel: 'Pages Viewed',
    settingsBtn: '⚙️ Settings',
    statsBtn: '📊 Statistics',
    statsTitle: 'Statistics',
    dayBtn: 'Day',
    weekBtn: 'Week',
    yearBtn: 'Year',
    avgSessionLabel: 'Pages per hour',
    totalPagesLabel: 'Total pages',
    bestDayLabel: 'Best day',
    minutesUnit: 'pages/h',
    pagesUnit: 'pages',
    chartTitle: 'Activity',
    noData: 'No data available',
    chartNote: '💡 Browsing data is stored locally and never sent.',
    statsTitle: 'Statistics',
    dayBtn: 'Day',
    weekBtn: 'Week',
    yearBtn: 'Year',
    avgSessionLabel: 'Average session',
    totalPagesLabel: 'Total pages',
    bestDayLabel: 'Best day',
    minutesUnit: 'minutes',
    pagesUnit: 'pages',
    chartTitle: 'Activity',
    noData: 'No data available',
    chartNote: '💡 Browsing data is stored locally and never sent.',
    privacyNote: '✓ Data never recorded',
    appName: 'TabPilse',
    subtitle: 'Your browsing statistics',
    languageLabel: 'Language',
    darkModeLabel: 'Dark Mode',
    darkModeOn: 'Enabled',
    darkModeOff: 'Disabled',
    saveBtn: 'Save',
    resetBtn: '↻ Reset',
    settingsTitle: 'Settings - TabPilse',
    savedMsg: 'Settings saved!',
    infoMessage: '💡 Info: Change the language and click "Save" to apply changes to the entire extension.',
    // Days of the week
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    // Weeks
    week1: 'Week 1',
    week2: 'Week 2',
    week3: 'Week 3',
    week4: 'Week 4',
    // Top Sites
    topSitesTitle: 'Top 10 Sites',
    topSitesSubtitle: 'Your most visited sites'
  },
  ru: {
    sessionTimeLabel: 'Прошедшее время',
    pageCountLabel: 'Просмотренные страницы',
    settingsBtn: '⚙️ Настройки',
    statsBtn: '📊 Статистика',
    statsTitle: 'Статистика',
    dayBtn: 'День',
    weekBtn: 'Неделя',
    yearBtn: 'Год',
    avgSessionLabel: 'Страниц в час',
    totalPagesLabel: 'Всего страниц',
    bestDayLabel: 'Лучший день',
    minutesUnit: 'стр/ч',
    pagesUnit: 'страниц',
    chartTitle: 'Активность',
    noData: 'Нет доступных данных',
    chartNote: '💡 Данные просмотра хранятся локально и никогда не отправляются.',
    privacyNote: '✓ Данные никогда не записываются',
    appName: 'TabPilse',
    subtitle: 'Ваша статистика просмотров',
    languageLabel: 'Язык',
    darkModeLabel: 'Темный режим',
    darkModeOn: 'Включен',
    darkModeOff: 'Отключен',
    saveBtn: 'Сохранить',
    resetBtn: '↻ Сброс',
    settingsTitle: 'Настройки - TabPilse',
    savedMsg: 'Параметры сохранены!',
    infoMessage: '💡 Информация: измените язык и нажмите "Сохранить" для применения изменений ко всему расширению.',
    // Дни недели
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    // Недели
    week1: 'Неделя 1',
    week2: 'Неделя 2',
    week3: 'Неделя 3',
    week4: 'Неделя 4',
    // Топ сайтов
    topSitesTitle: 'Топ 10 сайтов',
    topSitesSubtitle: 'Ваши наиболее посещаемые сайты'
  },
  es: {
    sessionTimeLabel: 'Tiempo transcurrido',
    pageCountLabel: 'Páginas visitadas',
    settingsBtn: '⚙️ Configuración',
    statsBtn: '📊 Estadísticas',
    statsTitle: 'Estadísticas',
    dayBtn: 'Día',
    weekBtn: 'Semana',
    yearBtn: 'Año',
    avgSessionLabel: 'Páginas por hora',
    totalPagesLabel: 'Total páginas',
    bestDayLabel: 'Mejor día',
    minutesUnit: 'pág/h',
    pagesUnit: 'páginas',
    chartTitle: 'Actividad',
    noData: 'No hay datos disponibles',
    chartNote: '💡 Los datos de navegación se almacenan localmente y nunca se envían.',
    statsTitle: 'Estadísticas',
    dayBtn: 'Día',
    weekBtn: 'Semana',
    yearBtn: 'Año',
    avgSessionLabel: 'Páginas por hora',
    totalPagesLabel: 'Total páginas',
    bestDayLabel: 'Mejor día',
    minutesUnit: 'pág/h',
    pagesUnit: 'páginas',
    chartTitle: 'Actividad',
    noData: 'No hay datos disponibles',
    chartNote: '💡 Los datos de navegación se almacenan localmente y nunca se envían.',
    privacyNote: '✓ Datos nunca registrados',
    appName: 'TabPilse',
    subtitle: 'Tus estadísticas de navegación',
    languageLabel: 'Idioma',
    darkModeLabel: 'Modo Oscuro',
    darkModeOn: 'Activado',
    darkModeOff: 'Desactivado',
    saveBtn: 'Guardar',
    resetBtn: '↻ Reiniciar',
    settingsTitle: 'Configuración - TabPilse',
    savedMsg: '¡Configuración guardada!',
    infoMessage: '💡 Información: cambia el idioma y haz clic en "Guardar" para aplicar los cambios a toda la extensión.',
    // Días de la semana
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    // Semanas
    week1: 'Semana 1',
    week2: 'Semana 2',
    week3: 'Semana 3',
    week4: 'Semana 4',
    // Top Sitios
    topSitesTitle: 'Top 10 Sitios',
    topSitesSubtitle: 'Tus sitios más visitados'
  },
  zh: {
    sessionTimeLabel: '已用时间',
    pageCountLabel: '已查看页面',
    settingsBtn: '⚙️ 设置',
    statsBtn: '📊 统计数据',
    statsTitle: '统计数据',
    dayBtn: '日',
    weekBtn: '周',
    yearBtn: '年',
    avgSessionLabel: '每小时页面数',
    totalPagesLabel: '总页面',
    bestDayLabel: '最佳日期',
    minutesUnit: '页/时',
    pagesUnit: '页面',
    chartTitle: '活动',
    noData: '无可用数据',
    chartNote: '💡 浏览数据存储在本地，从不发送。',
    privacyNote: '✓ 永不记录数据',
    appName: 'TabPilse',
    subtitle: '您的浏览统计',
    languageLabel: '语言',
    darkModeLabel: '深色模式',
    darkModeOn: '启用',
    darkModeOff: '禁用',
    saveBtn: '保存',
    resetBtn: '↻ 重置',
    settingsTitle: '设置 - TabPilse',
    savedMsg: '设置已保存！',
    infoMessage: '💡 信息：更改语言并单击"保存"以将更改应用于整个扩展。',
    // 星期
    monday: '星期一',
    tuesday: '星期二',
    wednesday: '星期三',
    thursday: '星期四',
    friday: '星期五',
    // 周
    week1: '第1周',
    week2: '第2周',
    week3: '第3周',
    week4: '第4周',
    // 热门网站
    topSitesTitle: '热门10网站',
    topSitesSubtitle: '您最常访问的网站'
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
      const text = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) 
        ? TRANSLATIONS[lang][key] 
        : (TRANSLATIONS.en && TRANSLATIONS.en[key] ? TRANSLATIONS.en[key] : key);
      
      // Pour les inputs, utiliser .value
      if (el.tagName === 'INPUT') {
        el.value = text;
      } else {
        // Pour tout le reste (button, span, div, etc), utiliser .textContent
        el.textContent = text;
      }
    });
    
    // Mettre à jour le titre du bouton d'action dans la barre d'extension
    if (typeof chrome !== 'undefined' && chrome.action) {
      const settingsBtnTitle = (TRANSLATIONS[lang] && TRANSLATIONS[lang]['settingsBtn']) 
        ? TRANSLATIONS[lang]['settingsBtn'] 
        : TRANSLATIONS.en['settingsBtn'];
      chrome.action.setTitle({ title: settingsBtnTitle });
    }
  });
}
