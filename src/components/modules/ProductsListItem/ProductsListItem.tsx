/* eslint-disable indent */
import Link from 'next/link'
import Image from 'next/image'

import {
  addOverflowHiddenToBody,
  formatPrice,
} from '@/shared/api/lib/utils/common'
import ProductLabel from './ProductLabel'
import ProductSubtitle from '@/components/elements/ProductSubtitle/ProductSubtitle'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'

import { useMediaQuery } from '@/features/hooks/useMediaQuery'
import { useCartAction } from '@/features/hooks/useCartAction'
import { showQuickViewModal } from '@/context/modals'
import { setCurrentProduct } from '@/context/goods'

import { IProductsListItemProps } from '@/shared/types/modules'
import styles from '@/styles/product-list-item/index.module.scss'
import stylesForAd from '@/styles/ad/index.module.scss'

const ProductsListItem = ({ item, title }: IProductsListItemProps) => {
  const isMedia800 = useMediaQuery(800)
  const isTitleForNew = title === `Новинки`
  useCartAction()

  const handleShowQuickViewModal = () => {
    addOverflowHiddenToBody()
    showQuickViewModal()
    setCurrentProduct(item)
  }

  return (
    <>
      {item.characteristics.collection === 'line' &&
      item.type === 't-shirts' ? (
        <li className={styles.list__item_ad}>
          <Link
            href={`/catalog/${item.category}/${item._id}`}
            className={styles.list__item_ad__inner}
          >
            <span className={`${stylesForAd.ad} ${styles.list__item_ad__ad}`}>
              Реклама
            </span>
            <ProductSubtitle
              subtitleClassName={styles.list__item_ad__subtitle}
              subtitleRectClassName={styles.list__item_ad__subtitle__rect}
            />
            <div className={styles.list__item_ad__img}>
              <Image src={item.images[0]} alt={item.name} fill />
            </div>
            <p className={styles.list__item_ad__title}>
              <span>Футболки «Line»</span>
              <span>{formatPrice(+item.price)} ₽</span>
            </p>
          </Link>
        </li>
      ) : (
        <li className={styles.list__item}>
          {title ? (
            <span
              className={`${styles.list__item__label} ${
                isTitleForNew
                  ? styles.list__item__new
                  : styles.list__item__bestseller
              }`}
            >
              {isTitleForNew ? `Новинки ` : `Бестселлеры`}
            </span>
          ) : !item.isNew && !item.isBestseller ? (
            ''
          ) : (
            <ProductLabel isBestseller={item.isBestseller} isNew={item.isNew} />
          )}
          <div className={styles.list__item__actions}>
            <ProductItemActionBtn
              text={`В избранное`}
              iconClass='actions__btn_favorite'
            />
            <ProductItemActionBtn
              text={`Сравнить`}
              iconClass='actions__btn_comparison'
            />
            {!isMedia800 && (
              <ProductItemActionBtn
                text={`Предпросмотр товара`}
                iconClass='actions__btn_quick_view'
                callback={handleShowQuickViewModal}
              />
            )}
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
            <span className={styles.list__item__price}>
              {formatPrice(+item.price)} ₽
            </span>
          </div>
          <button
            className={`btn-reset ${styles.list__item__cart}`}
            onClick={handleShowQuickViewModal}
          >
            Добавить в корзину!
          </button>
        </li>
      )}
    </>
  )
}

export default ProductsListItem
