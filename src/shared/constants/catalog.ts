/* eslint-disable indent */
export const getCatalogOptionsByPage = (
  pageName: string,
  handleApplyFiltersWithCategory: (categoryType: string) => void
) => {
  switch (pageName) {
    case 'catalog':
      return {
        rootCategoryOptions: [
          {
            id: 2,
            title: 'Пиццы',
            href: '/catalog/pizza',
          },
          {
            id: 3,
            title: 'Напитки',
            href: '/catalog/drinks',
          },
        ],
      }
    case 'pizza':
      return {
        pizzaCategoryOptions: [
          {
            id: 1,
            title: 'Мясные',
            filterHandler: () => handleApplyFiltersWithCategory('meat'),
          },
          {
            id: 2,
            title: 'Вегетарианские',
            filterHandler: () => handleApplyFiltersWithCategory('vegeterian'),
          },
          {
            id: 3,
            title: 'Сырные',
            filterHandler: () => handleApplyFiltersWithCategory('cheese'),
          },
          {
            id: 4,
            title: 'Грибные',
            filterHandler: () => handleApplyFiltersWithCategory('mushrooms'),
          },
          {
            id: 5,
            title: 'Пепперони',
            filterHandler: () => handleApplyFiltersWithCategory('pepperoni'),
          },
        ],
      }
    case 'drinks':
      return {
        drinksCategoryOptions: [
          {
            id: 1,
            title: 'Газировки',
            filterHandler: () => handleApplyFiltersWithCategory('sodas'),
          },
          {
            id: 2,
            title: 'Милкшейки',
            filterHandler: () => handleApplyFiltersWithCategory('milkshake'),
          },
          {
            id: 3,
            title: 'Вода',
            filterHandler: () => handleApplyFiltersWithCategory('water'),
          },
          {
            id: 4,
            title: 'Соки',
            filterHandler: () => handleApplyFiltersWithCategory('juice'),
          },
        ],
      }
    default:
      return {}
  }
}
