/* eslint-disable indent */
import Link from 'next/link'
import Image from 'next/image'

import {
  addOverflowHiddenToBody,
  formatPrice,
} from '@/shared/api/lib/utils/common'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'

import { useCartAction } from '@/features/hooks/useCartAction'
import { showQuickViewModal } from '@/context/modals'
import { setCurrentProduct } from '@/context/goods'

import { IProductsListItemProps } from '@/shared/types/modules'
import styles from '@/styles/product-list-item/index.module.scss'

const ProductsListItem = ({ item }: IProductsListItemProps) => {
  useCartAction()
  const handleShowQuickViewModal = () => {
    addOverflowHiddenToBody()
    showQuickViewModal()
    setCurrentProduct(item)
  }

  return (
    <>
      <li className={styles.list__item}>
        <div className={styles.list__item__actions}>
          <ProductItemActionBtn
            text={`В избранное`}
            iconClass='actions__btn_favorite'
          />
          <ProductItemActionBtn
            text={`Сравнить`}
            iconClass='actions__btn_comparison'
          />
        </div>
        <Link
          href={`/catalog/${item.category}/${item._id}`}
          className={styles.list__item__img}
        >
          <Image src={item.images[0]} alt={item.name} fill />
        </Link>
        <div className={styles.list__item__inner}>
          <h3 className={styles.list__item__title}>
            <Link href={`/catalog/${item.category}/${item._id}`}>
              {item.name}
            </Link>
          </h3>
          <ProductAvailable
            vendorCode={item.vendorCode}
            inStock={+item.inStock}
          />
          <div className={styles.list__item__inner__price}>
            <span className={styles.list__item__price}>
              {formatPrice(+item.price)} ₽
            </span>
            <button
              className={`btn-reset ${styles.list__item__cart}`}
              onClick={handleShowQuickViewModal}
            >
              В корзину
            </button>
          </div>
        </div>
      </li>
    </>
  )
}

export default ProductsListItem
