// Importamos los archivos JSON de traducciones
import esHome from './es/home.json';
import enHome from './en/home.json';
import caHome from './ca/home.json';

// Objeto con todas las traducciones
export const translations = {
  es: {
    home: esHome
  },
  en: {
    home: enHome
  },
  ca: {
    home: caHome
  }
};

// Idiomas soportados
export const languages = ['es', 'en', 'ca'];

// Idioma por defecto
export const defaultLanguage = 'es';

// Función para obtener traducciones
export function getTranslations(lang, section) {
  return translations[lang][section];
}