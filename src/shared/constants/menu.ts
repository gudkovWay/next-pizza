export const menuLinks = [
  {
    id: 1,
    text: 'Каталог',
    href: '/catalog',
    children: [
      {
        id: 2,
        text: 'Комбо',
        href: '/catalog/combo',
        children: [
          {
            id: 3,
            text: 'Комбо пиццы',
            href: '/catalog/combo?offset=0&type=pizza',
          },
          {
            id: 4,
            text: 'Комбо напитки',
            href: '/catalog/combo?offset=0&type=drinks',
          },
          {
            id: 5,
            text: 'Еда+Вода',
            href: '/catalog/combo?offset=0&type=all',
          },
        ],
      },
      {
        id: 6,
        text: 'Пиццы',
        href: '/catalog/pizza',
        children: [
          {
            id: 7,
            text: 'Мясные',
            href: '/catalog/pizza?offset=0&type=meat',
          },
          {
            id: 8,
            text: 'Вегетарианские',
            href: '/catalog/pizza?offset=0&type=vegetarian',
          },
        ],
      },
      {
        id: 9,
        text: 'Напитки',
        href: '/catalog/drinks',
        children: [
          {
            id: 10,
            text: 'Газировка',
            href: '/catalog/drinks?offset=0&type=gaz',
          },
          {
            id: 11,
            text: 'Популярные',
            href: '/catalog/drinks?offset=0&sort=popular',
          },
          {
            id: 12,
            text: 'Новинки',
            href: '/catalog/drinks?offset=0&sort=new',
          },
        ],
      },
    ],
  },
  {
    id: 13,
    text: 'Покупателям',
    href: '/buyers',
    children: [
      {
        id: 14,
        text: 'Политика обработки данных',
        href: '/personal-data-policy',
      },
      {
        id: 15,
        text: 'Политика конфиденциальности',
        href: '/privacy-policy',
      },
    ],
  },
  {
    id: 16,
    text: 'Контакты',
    href: '/contacts',
    children: [
      {
        id: 17,
        text: 'Разработчик',
        href: '/contacts/developer',
        children: [
          {
            id: 18,
            text: 'Telegram',
            href: 'https://t.me/gudkoviurii',
          },
          {
            id: 19,
            text: 'Github',
            href: 'https://github.com/gudkovWay',
          },
        ],
      },
      {
        id: 20,
        text: 'Колледж',
        href: '/contacts/college',
        children: [
          {
            id: 21,
            text: 'Telegram',
            href: 'https://t.me/Media21TK',
          },
          {
            id: 22,
            text: 'Vkontakte',
            href: 'https://vk.com/tk21msk',
          },
        ],
      },
    ],
  },
]
