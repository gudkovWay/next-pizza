// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker/locale/ru')

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
  const slug = `combo-${newName}-${vendorCode}`
  return slug.toLowerCase()
}
const collections = ['dinner', 'family', 'party']
const comboNames = [
  'пепси-комбо',
  'колы-комбо',
  'две-пиццы',
  'три-пиццы',
  'пицца-вечеринка',
]
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
  'молоко',
  'сахар',
  'вода',
  'лёд',
  'апельсин',
  'фруктоза',
  'ванилин',
  'клубника',
  'черешня',
  'петрушка',
  'кинза',
  'кетчуп',
  'майонез',
  'сыр',
  'перец',
  'моцарелла',
]
const images = [
  '/img/products/combo/две-пиццы.png',
  '/img/products/combo/колы-комбо.png',
  '/img/products/combo/пепси-комбо.png',
  '/img/products/combo/пицца-вечеринка.png',
  '/img/products/combo/три-пиццы.png',
]

module.exports = {
  async up(db) {
    return db.collection('combo').insertMany(
      [...Array(50)].map(() => {
        const characteristics = [
          {
            name: 'две-пиццы',
            type: 'pizza',
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
          {
            name: 'колы-комбо',
            type: 'drinks',
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
          {
            name: 'пепси-комбо',
            type: 'drinks',
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
          {
            name: 'пицца-вечеринка',
            type: 'pizza',
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
          {
            name: 'три-пиццы',
            type: 'pizza',
            compositions: getRandomElements(compositions),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
        ]
        const name = comboNames[Math.floor(Math.random() * comboNames.length)]
        const isBestseller = faker.datatype.boolean()
        const isNew = !isBestseller && faker.datatype.boolean()
        const vendorCode = faker.string.numeric(4)
        const slug = generateSlug(name, vendorCode)

        const currentCharacteristics = characteristics.find(
          (item) => item.name === name
        )

        return {
          category: 'combo',
          type: currentCharacteristics.type,
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name: name.charAt(0).toUpperCase() + name.slice(1),
          description: faker.lorem.sentences(10),
          characteristics: currentCharacteristics,
          images: images.filter((item) => item.includes(name)),
          vendorCode: vendorCode,
          slug: slug,
          weight: +faker.string.numeric(3),
          popularity: +faker.string.numeric(3),
          inStock: +faker.string.numeric(3),
          isBestseller: isBestseller,
          isNew: isNew,
          sizes: {},
        }
      })
    )
  },

  async down(db) {
    return db.collection('combo').updateMany([])
  },
}
