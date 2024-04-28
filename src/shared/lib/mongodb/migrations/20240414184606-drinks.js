// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker/locale/ru')

const getRandomNumber = () => Math.floor(Math.random() * 100)
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
const drinksCategories = ['milkshake', 'water', 'sodas', 'juice']
const collections = ['dinner', 'family', 'party']
const drinksNames = ['молочный коктейль', 'газировка', 'кола', 'сок']
const compositions = [
  'молоко',
  'сахар',
  'вода',
  'лёд',
  'апельсин',
  'фруктоза',
  'ванилин',
  'клубника',
  'черешня',
  'земляника',
]
const images = [
  '/img/products/drinks/кола.png',
  '/img/products/drinks/Молочный-коктейль.png',
  '/img/products/drinks/молочный коктейль.png',
  '/img/products/drinks/коктейль.png',
  '/img/products/drinks/газировка.png',
  '/img/products/drinks/Газировка.png',
  '/img/products/drinks/сок.png',
]

module.exports = {
  async up(db) {
    return db.collection('drinks').insertMany(
      [...Array(50)].map(() => {
        const characteristics = [
          {
            name: 'кола',
            type: faker.helpers.arrayElement(drinksCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
          {
            name: 'газировка',
            type: faker.helpers.arrayElement(drinksCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
          {
            name: 'сок',
            type: faker.helpers.arrayElement(drinksCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
          {
            name: 'молочный коктейль',
            type: faker.helpers.arrayElement(drinksCategories),
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
        ]
        const name = drinksNames[Math.floor(Math.random() * drinksNames.length)]
        const isBestseller = faker.datatype.boolean()
        const isNew = !isBestseller && faker.datatype.boolean()
        const vendorCode = faker.string.numeric(4)
        const slug = generateSlug(name, vendorCode)
        const sizes = {
          0.5: getRandomNumber(),
          1: getRandomNumber(),
        }
        const inStock = Object.values(sizes).reduce(
          (total, size) => total + size,
          0
        )
        const type =
          drinksCategories[Math.floor(Math.random() * drinksCategories.length)]

        const currentCharacteristics = characteristics.find(
          (item) => item.name === name
        )

        return {
          category: 'drinks',
          type: type,
          price: +faker.string.numeric(3).replace(/.{0,2}$/, 99),
          name: name.charAt(0).toUpperCase() + name.slice(1),
          description: faker.lorem.sentences(10),
          characteristics: currentCharacteristics,
          images: images.filter((item) => item.includes(name)),
          vendorCode: vendorCode,
          slug: slug,
          weight: +faker.string.numeric(3),
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
    return db.collection('drinks').updateMany([])
  },
}
