/* eslint-disable indent */
'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactPaginate from 'react-paginate'

import ProductsListItem from '@/components/modules/ProductsListItem/ProductsListItem'
import CatalogFilters from '@/components/modules/CatalogFilters/CatalogFilters'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

import { setCatalogCategoryOptions } from '@/features/context/catalog'
import { useProductFilters } from '@/features/hooks/useProductFilters'

import { IProductsPage } from '@/shared/types/catalog'
import { basePropsForMotion } from '@/shared/constants/motion'
import { getCatalogOptionsByPage } from '@/shared/constants/catalog'
import skeletonStyles from '@/app/styles/skeleton/index.module.scss'
import styles from '@/app/styles/catalog/index.module.scss'

const CatalogPage = ({ searchParams, pageName }: IProductsPage) => {
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
    setCatalogCategoryOptions(
      getCatalogOptionsByPage(pageName, handleApplyFiltersWithCategory)
    )
  }, [pageName, handleApplyFiltersWithCategory])

  return (
    <>
      {pageName === 'catalog' ? (
        <Breadcrumbs
          crumbs={[
            {
              href: '/catalog',
              children: 'Каталог',
            },
          ]}
        />
      ) : (
        <Breadcrumbs
          crumbs={[
            {
              href: '/catalog',
              children: 'Каталог',
            },
            {
              href: `/catalog/${pageName}`,
              children: `${pageName === 'pizza' ? 'Пиццы' : 'Напитки'}`,
            },
          ]}
        />
      )}
      <CatalogFilters
        handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
        handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
        handleApplyFiltersBySort={handleApplyFiltersBySort}
        pageName={pageName}
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

export default CatalogPage
