import { useEffect } from 'react'
import { motion } from 'framer-motion'

import ProductsListItem from '../ProductsListItem/ProductsListItem'
import AllLink from '@/components/elements/AllLink'
import { loadProductsByFilter } from '@/features/context/goods'
import { useProductsByCollection } from '@/features/hooks/useProductsByCollection'

import { allowedCollectionsCategories } from '@/shared/constants/product'
import { basePropsForMotion } from '@/shared/constants/motion'
import styles from '@/app/styles/product/index.module.scss'
import skeletonStyles from '@/app/styles/skeleton/index.module.scss'

const ProductsByCollection = ({ collection }: { collection: string }) => {
  const { title, spinner, products } = useProductsByCollection(collection)
  const currentCategory =
    allowedCollectionsCategories[
      Math.floor(Math.random() * allowedCollectionsCategories.length)
    ]

  useEffect(() => {
    loadProductsByFilter({
      limit: 4,
      offset: 0,
      category:
        allowedCollectionsCategories[
          Math.floor(Math.random() * allowedCollectionsCategories.length)
        ],
      additionalParam: `collection=${collection}`,
    })
  }, [])

  if (!products.items?.length) {
    return null
  }

  return (
    <div className={styles.product__collection}>
      <span className={styles.product__collection__bg}>{collection}</span>
      <AllLink
        text={title}
        href={`/collection-products?collection=${collection}&category=${currentCategory}`}
      />
      <div className={styles.product__collection__inner}>
        {spinner && (
          <motion.ul
            className={skeletonStyles.skeleton}
            {...basePropsForMotion}
          >
            {Array.from(new Array(4)).map((_, i) => (
              <li key={i} className={skeletonStyles.skeleton__item}>
                <div className={skeletonStyles.skeleton__item__light} />
              </li>
            ))}
          </motion.ul>
        )}
        {!spinner && (
          <motion.ul
            className={`list-reset ${styles.product__collection__list}`}
            {...basePropsForMotion}
          >
            {(products.items || []).map((item) => (
              <ProductsListItem key={item._id} item={item} title={title} />
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  )
}

export default ProductsByCollection
