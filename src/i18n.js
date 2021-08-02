import { createI18n } from "vue-i18n/index";
import en from "./locales/en.json";

export default createI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || "en",
    fallbackLocale: "en",
    messages: {
        en: en,
    }
});