// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker/locale/ru')
const pizzaSizes = ['small', 'medium', 'large']
const pizzaTypes = ['thin', 'traditional']
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
const pizzaCategories = ['вегетарианская', 'сырная', 'мясная', 'грибная']

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
            size: faker.helpers.arrayElement(pizzaSizes),
            type: faker.helpers.arrayElement(pizzaTypes),
          },
          {
            name: 'сырная',
            category: faker.helpers.arrayElement(pizzaCategories),
            size: faker.helpers.arrayElement(pizzaSizes),
            type: faker.helpers.arrayElement(pizzaTypes),
          },
          {
            name: 'маргарита',
            category: faker.helpers.arrayElement(pizzaCategories),
            size: faker.helpers.arrayElement(pizzaSizes),
            type: faker.helpers.arrayElement(pizzaTypes),
          },
          {
            name: 'пепперони',
            category: faker.helpers.arrayElement(pizzaCategories),
            size: faker.helpers.arrayElement(pizzaSizes),
            type: faker.helpers.arrayElement(pizzaTypes),
          },
          {
            name: 'вегетарианская',
            category: faker.helpers.arrayElement(pizzaCategories),
            size: faker.helpers.arrayElement(pizzaSizes),
            type: faker.helpers.arrayElement(pizzaTypes),
          },
          {
            name: 'мясная',
            category: faker.helpers.arrayElement(pizzaCategories),
            size: faker.helpers.arrayElement(pizzaSizes),
            type: faker.helpers.arrayElement(pizzaTypes),
          },
          {
            name: 'грибная',
            category: faker.helpers.arrayElement(pizzaCategories),
            size: faker.helpers.arrayElement(pizzaSizes),
            type: faker.helpers.arrayElement(pizzaTypes),
          },
          {
            name: 'цыплёнок',
            category: faker.helpers.arrayElement(pizzaCategories),
            size: faker.helpers.arrayElement(pizzaSizes),
            type: faker.helpers.arrayElement(pizzaTypes),
          },
        ]
        const currentCharacteristics = characteristics.find(
          (item) => item.name === name
        )

        return {
          category: 'pizza',
          name: name.charAt(0).toUpperCase() + name.slice(1),
          description: faker.lorem.sentences(6),
          images: images.filter((item) => item.includes(name)),
          rating: faker.number.int({ min: 0, max: 5 }),
          popularity: +faker.string.numeric(3),
          vendorCode: faker.string.numeric(4),
          characteristics: currentCharacteristics,
          price: faker.number.int({ min: 300, max: 999 }),
          sizes: {
            26: +faker.datatype.boolean(),
            30: +faker.datatype.boolean(),
            36: +faker.datatype.boolean(),
          },
          types: {
            thin: +faker.datatype.boolean(),
            traditional: +faker.datatype.boolean(),
          },
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
        }
      })
    )
  },

  async down(db) {
    return db.collection('pizza').updateMany([])
  },
}
