import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './enTranslations';
import ruTranslations from './ruTranslations';
import { LanguagesKeys } from '../types/enum';

const resources = {
  [LanguagesKeys.EN]: enTranslations,
  [LanguagesKeys.RU]: ruTranslations,
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: import.meta.env.DEV, // include debugger in dev mode
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
