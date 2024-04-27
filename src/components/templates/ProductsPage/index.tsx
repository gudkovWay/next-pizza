/* eslint-disable indent */
'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactPaginate from 'react-paginate'

import ProductsListItem from '@/components/modules/ProductsListItem/ProductsListItem'
import CatalogFilters from '@/components/modules/CatalogFilters/CatalogFilters'

import { setCatalogCategoryOptions } from '@/features/context/catalog'
import { useProductFilters } from '@/features/hooks/useProductFilters'

import { IProductsPage } from '@/shared/types/catalog'
import { basePropsForMotion } from '@/shared/constants/motion'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import styles from '@/styles/catalog/index.module.scss'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

const ProductsPage = ({ searchParams, pageName }: IProductsPage) => {
  const {
    products,
    productsSpinner,
    paginationProps,
    handlePageChange,
    handleApplyFiltersWithCategory,
    handleApplyFiltersWithPrice,
    handleApplyFiltersWithSizes,
    handleApplyFiltersBySort,
  } = useProductFilters(searchParams, pageName, pageName === 'catalog')

  useEffect(() => {
    switch (pageName) {
      case 'catalog':
        setCatalogCategoryOptions({
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
            {
              id: 4,
              title: 'Комбо наборы',
              href: '/catalog/combo',
            },
          ],
        })
        break
      case 'pizza':
        setCatalogCategoryOptions({
          drinksCategoryOptions: [
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
        })
        break
      case 'drinks':
        setCatalogCategoryOptions({
          pizzaCategoryOptions: [
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
        })
        break
      case 'combo':
        setCatalogCategoryOptions({
          comboCategoryOptions: [
            {
              id: 1,
              title: 'Комбо наборы (напитки и пиццы)',
              filterHandler: () => handleApplyFiltersWithCategory('full'),
            },
            {
              id: 2,
              title: 'Комбо наборы (только пиццы)',
              filterHandler: () => handleApplyFiltersWithCategory('pizza'),
            },
            {
              id: 3,
              title: 'Комбо наборы (только напитки)',
              filterHandler: () => handleApplyFiltersWithCategory('drinks'),
            },
          ],
        })
        break
      default:
        break
    }
  }, [handleApplyFiltersWithCategory, pageName])

  return (
    <>
      <Breadcrumbs
        crumbs={[
          {
            href: '/catalog',
            children: 'Каталог',
          },
        ]}
      />
      <CatalogFilters
        handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
        handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
        handleApplyFiltersBySort={handleApplyFiltersBySort}
      />
      {productsSpinner && (
        <motion.ul
          {...basePropsForMotion}
          className={skeletonStyles.skeleton}
          style={{ marginBottom: 60 }}
        >
          {Array.from(new Array(12)).map((_, i) => (
            <li key={i} className={skeletonStyles.skeleton__item}>
              <div className={skeletonStyles.skeleton__item__light} />
            </li>
          ))}
        </motion.ul>
      )}
      {!productsSpinner && (
        <motion.ul {...basePropsForMotion} className={styles.catalog__list}>
          {(products.items || []).map((item) => (
            <ProductsListItem key={item._id} item={item} />
          ))}
        </motion.ul>
      )}
      {!products.items?.length && !productsSpinner && (
        <div className={styles.catalog__list__empty}>Ничего не найдено :(</div>
      )}
      <div className={styles.catalog__bottom}>
        <ReactPaginate
          {...paginationProps}
          nextLabel={<span>Следующая</span>}
          previousLabel={<span>Предыдущая</span>}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default ProductsPage
