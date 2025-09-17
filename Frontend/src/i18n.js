// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationPT from './locales/pt/translation.json';

i18n
  .use(LanguageDetector) // Usa o detector de idioma do navegador
  .use(initReactI18next) // Passa a instância do i18n para o react-i18next
  .init({
    debug: true,
    resources: {
      en: {
        translation: translationEN,
      },
      pt: {
        translation: translationPT,
      },
    },
    fallbackLng: 'en', // Idioma padrão caso a detecção falhe
    interpolation: {
      escapeValue: false, // React já faz a proteção contra XSS
    },
  });

export default i18n;