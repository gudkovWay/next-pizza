import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translations: {
        dough: 'Тесто',
        collection: 'Коллекция',
        compositions: 'Состав',
        name: 'Имя',
        type: 'Тип',
        weight: 'Вес',
        calories: 'Калории',
        protein: 'Белки',
        fat: 'Жиры',
        carbohydrates: 'Углеводы',

        pizza: 'Пиццы',
        drinks: 'Напитки',

        meat: 'Мясная',
        cheese: 'Сырная',
        vegeterian: 'Вегетарианская',
        mushroom: 'Грибная',
        pepperoni: 'Пепперони',
        dinner: 'Идеально для ужина',
        family: 'Идеально для семьи',
        party: 'Идеально для тусовки',
        traditional: 'Традициональное',
        thin: 'Тонкое',

        milkshake: 'Молочный коктейль',
        water: 'Вода',
        sodas: 'Газировка',
        juice: 'Сок',
      },
    },
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
})

export default i18n
