import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ptBR from './locales/pt-BR/common.json'
import en from './locales/en/common.json'
import es from './locales/es/common.json'

i18n.use(initReactI18next).init({
  resources: {
    'pt-BR': { common: ptBR },
    en: { common: en },
    es: { common: es },
  },
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
