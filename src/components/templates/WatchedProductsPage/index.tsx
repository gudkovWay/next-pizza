'use client'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import ProductsListItem from '@/components/modules/ProductsListItem/ProductsListItem'
import { useWatchedProducts } from '@/features/hooks/useWatchedProducts'

import styles from '@/styles/watched-products-page/index.module.scss'

const WatchedProductsPage = () => {
  const { watchedProducts } = useWatchedProducts()

  return (
    <main>
      <Breadcrumbs
        crumbs={[
          {
            children: 'Просмотренные товары',
            href: '/watched-products',
          },
        ]}
      />
      <section className={styles.watched_products}>
        <div className='container'>
          <h1 className={`site-title ${styles.watched_products__title}`}>
            Просмотренные товары
          </h1>
          <ul className={`list-reset ${styles.watched_products__list}`}>
            {(watchedProducts.items || []).map((item) => (
              <ProductsListItem key={item._id} item={item} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default WatchedProductsPage
