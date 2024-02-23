export const useCrumbText = (initialText: string) => {
  const breadcrumbs = {
    main: 'Главная',
    comparison: 'Сравнение',
    cart: 'Корзина',
    favorites: 'Избранное',
    catalog: 'Каталог',
    profile: 'Профиль',
    cloth: 'Одежда',
    accessories: 'Аксесуары',
    office: 'Концелярия',
    souvenirs: 'Сувениры',
    order: 'Оформление заказа',
    personal_data_policy: 'Политика обработки данных',
    privacy_policy: 'Политика конфиденциальности',
  }

  const crumbText = (breadcrumbs as { [index: string]: string })[initialText]

  return { crumbText }
}
