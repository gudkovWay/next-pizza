export const menuLinks = [
  {
    id: 1,
    text: 'Каталог',
    href: '/catalog',
    children: [
      {
        id: 2,
        text: 'Пиццы',
        href: '/catalog/pizza',
        children: [
          {
            id: 3,
            text: 'Мясные',
            href: '/catalog/pizza?offset=0&type=meat',
          },
          {
            id: 4,
            text: 'Вегетарианские',
            href: '/catalog/pizza?offset=0&type=vegetarian',
          },
        ],
      },
      {
        id: 5,
        text: 'Напитки',
        href: '/catalog/drinks',
        children: [
          {
            id: 6,
            text: 'Газировка',
            href: '/catalog/drinks?offset=0&type=gaz',
          },
          {
            id: 7,
            text: 'Популярные',
            href: '/catalog/drinks?offset=0&sort=popular',
          },
          {
            id: 8,
            text: 'Новинки',
            href: '/catalog/drinks?offset=0&sort=new',
          },
        ],
      },
    ],
  },
  {
    id: 9,
    text: 'Покупателям',
    href: '/buyers',
    children: [
      {
        id: 10,
        text: 'Политика обработки данных',
        href: '/personal-data-policy',
      },
      {
        id: 11,
        text: 'Политика конфиденциальности',
        href: '/privacy-policy',
      },
    ],
  },
  {
    id: 12,
    text: 'Контакты',
    href: '/contacts',
    children: [
      {
        id: 13,
        text: 'Разработчик',
        href: '/contacts/developer',
        children: [
          {
            id: 14,
            text: 'Telegram',
            href: 'https://t.me/gudkoviurii',
          },
          {
            id: 15,
            text: 'Github',
            href: 'https://github.com/gudkovWay',
          },
        ],
      },
      {
        id: 16,
        text: 'Колледж',
        href: '/contacts/college',
        children: [
          {
            id: 17,
            text: 'Telegram',
            href: 'https://t.me/Media21TK',
          },
          {
            id: 18,
            text: 'Vkontakte',
            href: 'https://vk.com/tk21msk',
          },
        ],
      },
    ],
  },
]
