// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker/locale/ru')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]
const getRandomElements = (arr) =>
  arr
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * arr.length) - 2)

const pizzaCategories = ['сырная', 'мясная', 'вегетарианская', 'грибная']
const collections = ['dinner', 'family', 'party']
const pizzaNames = [
  'итальянская',
  'маргарита',
  'пепперони',
  'сырная',
  'вегетарианская',
  'мясная',
  'грибная',
  'цыплёнок',
]
const dough = ['thin', 'traditional']
const compositions = [
  'тесто',
  'колбаса',
  'сахар',
  'ветчина',
  'пепперони',
  'грибы',
  'оливки',
  'репчатый лук',
  'лук зелёный',
  'лук',
  'кукуруза',
  'горошек',
  'ананас',
  'орегано',
  'базиллик',
  'укроп',
  'петрушка',
  'кинза',
  'кетчуп',
  'майонез',
  'сыр',
  'перец',
  'моцарелла',
]
const images = [
  '/img/products/pizza/сырный-цыплёнок.png',
  '/img/products/pizza/вегетарианская.png',
  '/img/products/pizza/сырная.png',
  '/img/products/pizza/мясная.png',
  '/img/products/pizza/итальянская.png',
  '/img/products/pizza/мясная-маргарита.png',
  '/img/products/pizza/итальянская-мясная-с-сыром.png',
  '/img/products/pizza/пепперони.png',
  '/img/products/pizza/мясная-1.png',
  '/img/products/pizza/грибная.png',
]

module.exports = {
  async up(db) {
    return db.collection('pizza').insertMany(
      [...Array(50)].map(() => {
        const name = pizzaNames[Math.floor(Math.random() * pizzaNames.length)]
        const characteristics = [
          {
            name: 'итальянская',
            category: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
          },
          {
            name: 'сырная',
            category: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
          },
          {
            name: 'маргарита',
            category: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
          },
          {
            name: 'пепперони',
            category: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
          },
          {
            name: 'вегетарианская',
            category: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
          },
          {
            name: 'мясная',
            category: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
          },
          {
            name: 'грибная',
            category: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
          },
          {
            name: 'цыплёнок',
            category: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
          },
        ]
        const currentCharacteristics = characteristics.find(
          (item) => item.name === name
        )

        return {
          category: 'pizza',
          price: +faker.string.numeric(3).replace(/.{0,2}$/, 99),
          name: name.charAt(0).toUpperCase() + name.slice(1),
          description: faker.lorem.sentences(10),
          characteristics: currentCharacteristics,
          images: images.filter((item) => item.includes(name)),
          vendorCode: faker.string.numeric(4),
          popularity: +faker.string.numeric(3),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          sizes: {
            26: +faker.datatype.boolean(),
            30: +faker.datatype.boolean(),
            36: +faker.datatype.boolean(),
          },
        }
      })
    )
  },

  async down(db) {
    return db.collection('pizza').updateMany([])
  },
}
