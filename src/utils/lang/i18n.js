import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import langEn from "./lang.en.json";

const resource = {
  en: {
    translations: langEn,
  },
};

const browserLanguage = () => {
  if (navigator.language.slice(0, 2) !== ("ko" || "en")) {
    return "en";
  }
  return navigator.language.slice(0, 2);
};

i18n.use(initReactI18next).init({
  resources: resource,
  lng: localStorage.getItem("language")
    ? localStorage.getItem("language")
    : browserLanguage(),
  //유저의 언어세팅이 작동하지 않을 때.
  fallbackLng: "en",
  debug: true,
  defaultNS: "translations",
  ns: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
