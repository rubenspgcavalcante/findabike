import en from "date-fns/locale/en";
import pt from "date-fns/locale/pt";

export const language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

export const dateLocale =
  {
    en: en,
    "en-US": en,
    pt: pt,
    "pt-BR": pt
  }[language] || en;
