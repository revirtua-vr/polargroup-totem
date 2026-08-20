import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ptBR from './locales/pt-BR/common.json'
import en from './locales/en/common.json'
import es from './locales/es/common.json'

const supportedLngs = ['pt-BR', 'en', 'es']

function getInitialLng(): string {
  const hashParams = new URLSearchParams(window.location.hash.split('?')[1] ?? '')
  const lng = hashParams.get('lng')
  return lng && supportedLngs.includes(lng) ? lng : 'pt-BR'
}

i18n.use(initReactI18next).init({
  resources: {
    'pt-BR': { common: ptBR },
    en: { common: en },
    es: { common: es },
  },
  lng: getInitialLng(),
  fallbackLng: 'pt-BR',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
