import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
i18n.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      characteristics: {
        dough: 'Тесто',
        collection: 'Коллекция',
        compositions: 'Состав',
        name: 'Имя',
        type: 'Тип',
      },
    },
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
})

export default i18n
