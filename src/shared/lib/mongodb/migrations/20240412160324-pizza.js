// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker/locale/ru')

const getRandomNumber = () => Math.floor(Math.random() * 100)
const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]
const getRandomElements = (arr) => {
  const minElements = 4
  const maxElements = 11
  const randomLength =
    Math.floor(
      Math.random() * (Math.min(maxElements, arr.length) - minElements)
    ) + minElements
  return arr.sort(() => 0.5 - Math.random()).slice(0, randomLength)
}

const translitMap = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ы: 'y',
  э: 'e',
  ю: 'yu',
  я: 'ya',
}

const translit = (word) =>
  word.replace(/[а-я ]/g, (char) => {
    if (char === ' ') {
      return '-'
    } else {
      return translitMap[char] || ''
    }
  })

const generateSlug = (name, vendorCode) => {
  const newName = translit(name)
  const slug = `${newName}-${vendorCode}`
  return slug.toLowerCase()
}

const pizzaCategories = [
  'cheese',
  'meat',
  'vegeterian',
  'mushroom',
  'pepperoni',
]
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
        const characteristics = [
          {
            name: 'итальянская',
            type: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
            weight: +faker.string.numeric(3),
            calories: +faker.string.numeric(3),
            protein: +faker.string.numeric(2),
            fat: +faker.string.numeric(2),
            carbohydrates: +faker.string.numeric(2),
          },
          {
            name: 'сырная',
            type: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
            weight: +faker.string.numeric(3),
            calories: +faker.string.numeric(3),
            protein: +faker.string.numeric(2),
            fat: +faker.string.numeric(2),
            carbohydrates: +faker.string.numeric(2),
          },
          {
            name: 'маргарита',
            type: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
            weight: +faker.string.numeric(3),
            calories: +faker.string.numeric(3),
            protein: +faker.string.numeric(2),
            fat: +faker.string.numeric(2),
            carbohydrates: +faker.string.numeric(2),
          },
          {
            name: 'пепперони',
            type: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
            weight: +faker.string.numeric(3),
            calories: +faker.string.numeric(3),
            protein: +faker.string.numeric(2),
            fat: +faker.string.numeric(2),
            carbohydrates: +faker.string.numeric(2),
          },
          {
            name: 'вегетарианская',
            type: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
            weight: +faker.string.numeric(3),
            calories: +faker.string.numeric(3),
            protein: +faker.string.numeric(2),
            fat: +faker.string.numeric(2),
            carbohydrates: +faker.string.numeric(2),
          },
          {
            name: 'мясная',
            type: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
            weight: +faker.string.numeric(3),
            calories: +faker.string.numeric(3),
            protein: +faker.string.numeric(2),
            fat: +faker.string.numeric(2),
            carbohydrates: +faker.string.numeric(2),
          },
          {
            name: 'грибная',
            type: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
            weight: +faker.string.numeric(3),
            calories: +faker.string.numeric(3),
            protein: +faker.string.numeric(2),
            fat: +faker.string.numeric(2),
            carbohydrates: +faker.string.numeric(2),
          },
          {
            name: 'цыплёнок',
            type: faker.helpers.arrayElement(pizzaCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
            dough: getRandomArrayValue(dough),
            weight: +faker.string.numeric(3),
            calories: +faker.string.numeric(3),
            protein: +faker.string.numeric(2),
            fat: +faker.string.numeric(2),
            carbohydrates: +faker.string.numeric(2),
          },
        ]
        const name = pizzaNames[Math.floor(Math.random() * pizzaNames.length)]
        const isBestseller = faker.datatype.boolean()
        const isNew = !isBestseller && faker.datatype.boolean()
        const vendorCode = faker.string.numeric(4)
        const slug = generateSlug(name, vendorCode)
        const sizes = {
          26: getRandomNumber(),
          30: getRandomNumber(),
          36: getRandomNumber(),
        }
        const inStock = Object.values(sizes).reduce(
          (total, size) => total + size,
          0
        )
        const type =
          pizzaCategories[Math.floor(Math.random() * pizzaCategories.length)]

        const currentCharacteristics = characteristics.find(
          (item) => item.name === name
        )

        return {
          category: 'pizza',
          type: type,
          price: +faker.string.numeric(3).replace(/.{0,2}$/, 99),
          name: name.charAt(0).toUpperCase() + name.slice(1),
          description: faker.lorem.sentences(10),
          characteristics: currentCharacteristics,
          images: images.filter((item) => item.includes(name)),
          vendorCode: vendorCode,
          slug: slug,
          popularity: +faker.string.numeric(3),
          inStock: inStock,
          isBestseller: isBestseller,
          isNew: isNew,
          sizes: sizes,
        }
      })
    )
  },

  async down(db) {
    return db.collection('pizza').updateMany([])
  },
}
