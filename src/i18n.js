import { createI18n } from "vue-i18n/index";
import en from "./locales/en.json";
import nl from "./locales/nl.json";
import fr from "./locales/fr.json";

export default createI18n({
  locale: window.VUE_APP_ENV_DEFAULT_LANGUAGE || "en",
  fallbackLocale: "en",
  messages: {
    en: en,
    nl: nl,
    fr: fr,
  },
});
