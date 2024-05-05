'use client'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import ProductsListItem from '@/components/modules/ProductsListItem/ProductsListItem'
import Breadcrumbs from '@/components/modules/Breadcrumbs'
import { loadProductsByFilter } from '@/features/context/goods'
import { useProductsByCollection } from '@/features/hooks/useProductsByCollection'

import { getSearchParamsUrl } from '@/shared/lib/utils/common'
import { basePropsForMotion } from '@/shared/constants/motion'
import {
  allowedCollections,
  allowedCollectionsCategories,
} from '@/shared/constants/product'
import skeletonStyles from '@/app/styles/skeleton/index.module.scss'
import styles from '@/app/styles/watched-products-page/index.module.scss'

const CollectionProductsPage = () => {
  const [currentCollection, setCurrentCollection] = useState('')
  const { title, spinner, products } =
    useProductsByCollection(currentCollection)

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const categoryParam = urlParams.get('category')
    const collectionParam = urlParams.get('collection')

    if (
      categoryParam &&
      collectionParam &&
      allowedCollectionsCategories.includes(categoryParam) &&
      allowedCollections.includes(collectionParam)
    ) {
      setCurrentCollection(collectionParam)

      loadProductsByFilter({
        limit: 12,
        offset: 0,
        category: categoryParam,
        additionalParam: urlParams.toString(),
      })

      return
    }

    notFound()
  }, [])

  return (
    <main>
      <section className={styles.watched_products}>
        <div className='container'>
          <Breadcrumbs
            crumbs={[
              {
                children: 'Коллекции',
                href: '/collection-products',
              },
            ]}
          />
          <h1 className={`site-title ${styles.watched_products__title}`}>
            {title}
          </h1>
          {spinner && (
            <motion.ul
              className={skeletonStyles.skeleton}
              style={{ marginBottom: 40 }}
              {...basePropsForMotion}
            >
              {Array.from(new Array(12)).map((_, i) => (
                <li key={i} className={skeletonStyles.skeleton__item}>
                  <div className={skeletonStyles.skeleton__item__light} />
                </li>
              ))}
            </motion.ul>
          )}
          {!spinner && (
            <ul className={`list-reset ${styles.watched_products__list}`}>
              {(products.items || []).map((item) => (
                <ProductsListItem key={item._id} item={item} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}

export default CollectionProductsPage
