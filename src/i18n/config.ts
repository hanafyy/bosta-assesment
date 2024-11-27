import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import arTranslation from "./locales/ar/translation.json";

export const resources = {
  en: {
    translations: enTranslation,
  },
  ar: {
    translations: arTranslation,
  },
} as const;

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: localStorage.getItem("lang") as string,
  ns: ["translations"],
  defaultNS: "translations",
  resources,
});

i18n.languages = ["en", "ar"];

export default i18n;
