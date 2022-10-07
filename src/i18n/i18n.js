import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import nl from './locales/nl.json';
import fr from './locales/fr.json';

const USED_LOCALES = ['en', 'nl', 'fr'];

const getDefaultBrowserLocale = (defaultLocale = window?._env_?.VUE_APP_DEFAULT_LANGUAGE || 'en') => {

  const browserLanguage = navigator.language.split('-')[0].toLowerCase();

  return USED_LOCALES.includes(browserLanguage) ? browserLanguage : defaultLocale;
}

const getCurrentLocale = (defaultLocale) => {
  if (localStorage.getItem('i18n-locale')) {
    return localStorage.getItem('i18n-locale');
  }

  const browserLocale = getDefaultBrowserLocale(defaultLocale);

  localStorage.setItem('i18n-locale', browserLocale);

  return browserLocale;
}

export default createI18n({
  locale: getCurrentLocale(),
  fallbackLocale: 'en',
  messages: {
    en: en,
    nl: nl,
    fr: fr
  }
})
