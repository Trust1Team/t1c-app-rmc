import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import nl from './locales/nl.json';
import fr from './locales/fr.json';


const getDefaultBrowserLocale = (defaultLocale = window.VUE_APP_ENV_DEFAULT_LANGUAGE || 'en') => {
  const usedLocales = ['en', 'nl', 'fr'];

  const browserLanguage = navigator.language.split('-')[0].toLowerCase();

  return usedLocales.includes(browserLanguage) ? browserLanguage : defaultLocale;
}

export default createI18n({
  locale: getDefaultBrowserLocale(),
  fallbackLocale: 'en',
  messages: {
    en: en,
    nl: nl,
    fr: fr
  }
})
