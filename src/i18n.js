import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import languageEN from './locate/en/translate.json'
import languageIT from './locate/it/translate.json'
import languageZH from './locate/zh/translate.json'
// @ts-ignore
i18n
.use(Backend)
.use(LanguageDetector)
.use(initReactI18next)
.init({
    load: 'languageOnly',
    resources: {
        en: languageEN,
        it: languageIT,
        zh: languageZH
    },
    /* When react i18next not finding any language to as default in borwser */
    fallbackLng: 'en',
    /* debugger For Development environment */
    debug: true,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: ".",
    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },
    react: {
        wait: true,
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'default'
    }
})

export default i18n;