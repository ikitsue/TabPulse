/**
 * Options Script - Gestion des paramètres
 * 
 * Permet à l'utilisateur de changer la langue et sauvegarde le choix
 */

const languageSelect = document.getElementById('languageSelect');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');

/**
 * Initialisation : Charger la langue actuelle au démarrage
 */
document.addEventListener('DOMContentLoaded', () => {
  // Traduire la page
  translatePage();
  
  // Charger la langue sauvegardée
  getLanguage((lang) => {
    languageSelect.value = lang;
  });
});

/**
 * Bouton Enregistrer : Sauvegarder la langue sélectionnée
 */
saveBtn.addEventListener('click', () => {
  const selectedLang = languageSelect.value;
  
  setLanguage(selectedLang, () => {
    // Afficher un message de confirmation
    translate('savedMsg', (text) => {
      message.textContent = text;
      message.classList.add('show');
      
      // Masquer le message après 2 secondes
      setTimeout(() => {
        message.classList.remove('show');
      }, 2000);
    });
  });
});

/**
 * Bouton Réinitialiser : Retourner au français
 */
resetBtn.addEventListener('click', () => {
  languageSelect.value = 'fr';
  saveBtn.click(); // Sauvegarder le changement
});
