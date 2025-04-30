// Utility functions for internationalization

// Define supported languages
export const languages = {
  en: 'English',
  es: 'Español',
  ca: 'Català',
  defaultLang: 'es'
};

// Language names in their native language
export const languageNames = {
  en: 'English',
  es: 'Español',
  ca: 'Català'
};

// Normalize language code (handle default case)
export function normalizeLanguageCode(lang) {
  if (!lang || lang === '/' || !Object.keys(languages).includes(lang)) {
    return languages.defaultLang;
  }
  return lang;
}

// Get URL path for a language
export function getLanguagePath(lang) {
  // Default language (Spanish) should be at the root
  if (lang === languages.defaultLang) {
    return '/';
  }
  // Other languages have their own path
  return `/${lang}`;
}

// Detect browser language
export function detectBrowserLanguage() {
  if (typeof navigator === 'undefined') return 'en';
  
  const browserLang = navigator.language.split('-')[0];
  
  // Check if browser language is supported
  if (['es', 'ca', 'en'].includes(browserLang)) {
    return browserLang;
  }
  
  // Default to English if browser language is not supported
  return 'en';
}

// Load translations for a specific language and section
export async function loadTranslations(lang, section) {
  try {
    // Default translations as fallback
    const defaultTranslations = {
      nav: {
        about: 'About',
        services: 'Services',
        faq: 'FAQ',
        contact: 'Contact'
      }
    };
    
    // Try to load the specific language file
    try {
      const translations = await import(`./${lang}/${section}.json`);
      return translations.default || defaultTranslations[section];
    } catch (e) {
      console.warn(`Translation file for ${lang}/${section} not found, using default`);
      return defaultTranslations[section];
    }
  } catch (error) {
    console.error('Error loading translations:', error);
    return {
      about: 'About',
      services: 'Services',
      faq: 'FAQ',
      contact: 'Contact'
    };
  }
}