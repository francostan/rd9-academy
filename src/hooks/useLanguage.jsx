import { useState, useCallback, createContext, useContext } from 'react';

/**
 * Language context for bilingual support
 * ES = Spanish (primary), EN = English
 */
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() =>
    localStorage.getItem('rd9-lang') || 'es'
  );

  const toggle = useCallback(() => {
    const next = lang === 'es' ? 'en' : 'es';
    localStorage.setItem('rd9-lang', next);
    setLang(next);
  }, [lang]);

  /**
   * Translate function - extracts text from bilingual object
   * @param {string|object} obj - String or { es: '...', en: '...' }
   * @returns {string} - Text in current language
   */
  const t = useCallback((obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.es || obj;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

export { LanguageContext };
