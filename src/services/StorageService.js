// src/services/StorageService.js

// Chei pentru localStorage
const STORAGE_KEYS = {
    CUSTOM_VALUES: 'diabetes-app-custom-values',
    CALCULATION_HISTORY: 'diabetes-app-calculation-history'
  };
  
  // Serviciu pentru gestionarea stocării datelor
  const StorageService = {
    // Salvează valorile personalizate
    saveCustomValues: (values) => {
      try {
        localStorage.setItem(STORAGE_KEYS.CUSTOM_VALUES, JSON.stringify(values));
        return true;
      } catch (error) {
        console.error('Eroare la salvarea valorilor personalizate:', error);
        return false;
      }
    },
  
    // Încarcă valorile personalizate
    loadCustomValues: () => {
      try {
        const values = localStorage.getItem(STORAGE_KEYS.CUSTOM_VALUES);
        return values ? JSON.parse(values) : null;
      } catch (error) {
        console.error('Eroare la încărcarea valorilor personalizate:', error);
        return null;
      }
    },
  
    // Adaugă un calcul în istoric
    addCalculationToHistory: (calculation) => {
      try {
        // Adaugă timestamp la calcul
        const calculationWithTimestamp = {
          ...calculation,
          timestamp: new Date().toISOString()
        };
        
        // Obține istoricul existent
        const history = StorageService.getCalculationHistory();
        
        // Adaugă noul calcul la început
        history.unshift(calculationWithTimestamp);
        
        // Păstrează doar ultimele 50 de calcule
        const limitedHistory = history.slice(0, 50);
        
        // Salvează istoricul actualizat
        localStorage.setItem(STORAGE_KEYS.CALCULATION_HISTORY, JSON.stringify(limitedHistory));
        
        return true;
      } catch (error) {
        console.error('Eroare la salvarea calculului în istoric:', error);
        return false;
      }
    },
  
    // Obține tot istoricul calculelor
    getCalculationHistory: () => {
      try {
        const history = localStorage.getItem(STORAGE_KEYS.CALCULATION_HISTORY);
        return history ? JSON.parse(history) : [];
      } catch (error) {
        console.error('Eroare la încărcarea istoricului calculelor:', error);
        return [];
      }
    },
  
    // Șterge tot istoricul calculelor
    clearCalculationHistory: () => {
      try {
        localStorage.removeItem(STORAGE_KEYS.CALCULATION_HISTORY);
        return true;
      } catch (error) {
        console.error('Eroare la ștergerea istoricului calculelor:', error);
        return false;
      }
    }
  };
  
  export default StorageService;