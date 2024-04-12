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
            href: '/catalog/combo/pizzas',
          },
          {
            id: 4,
            text: 'Комбо напитки',
            href: '/catalog/combo/drinks',
          },
          {
            id: 5,
            text: 'Еда+Вода',
            href: '/catalog/combo/all',
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
            href: '/catalog/pizza&{params}',
          },
          {
            id: 8,
            text: 'Вегетарианские',
            href: '/catalog/pizza/isNew',
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
            href: '/catalog/drinks/gaz',
          },
          {
            id: 11,
            text: 'Популярные',
            href: '/catalog/drinks/popular',
          },
          {
            id: 12,
            text: 'Новинки',
            href: '/catalog/drinks/new',
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
        text: 'Политика',
        href: '/rules',
        children: [
          {
            id: 15,
            text: 'Обработки данных',
            href: '/personal-data-policy',
          },
          {
            id: 16,
            text: 'Конфиденциальности',
            href: '/privacy-policy',
          },
        ],
      },
      {
        id: 17,
        text: 'О нас',
        href: '/about-us',
        children: [
          {
            id: 18,
            text: 'Возвраты',
            href: '/about-us/returns',
          },
          {
            id: 19,
            text: 'Оплата',
            href: '/about-us/payment',
          },
          {
            id: 20,
            text: 'Доставка',
            href: '/about-us/delivery',
          },
        ],
      },
    ],
  },
  {
    id: 21,
    text: 'Контакты',
    href: '/contacts',
    children: [
      {
        id: 22,
        text: 'Разработчик',
        href: '/contacts/developer',
        children: [
          {
            id: 23,
            text: 'Telegram',
            href: 'https://t.me/gudkoviurii',
          },
          {
            id: 24,
            text: 'Github',
            href: 'https://github.com/gudkovWay',
          },
        ],
      },
      {
        id: 25,
        text: 'Колледж',
        href: '/contacts/college',
        children: [
          {
            id: 26,
            text: 'Telegram',
            href: 'https://t.me/Media21TK',
          },
          {
            id: 27,
            text: 'Vkontakte',
            href: 'https://vk.com/tk21msk',
          },
        ],
      },
    ],
  },
]
