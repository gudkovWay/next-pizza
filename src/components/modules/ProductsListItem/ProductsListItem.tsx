/* eslint-disable indent */
import Link from 'next/link'
import Image from 'next/image'

import ProductLabel from './ProductLabel'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'

import { showQuickViewModal } from '@/features/context/modals'
import { setCurrentProduct } from '@/features/context/goods'
import { useFavoritesAction } from '@/features/hooks/useFavoritesAction'

import { IProductsListItemProps } from '@/shared/types/modules'
import { addOverflowHiddenToBody, formatPrice } from '@/shared/lib/utils/common'

import styles from '@/app/styles/product-list-item/index.module.scss'
import { useMediaQuery } from '@/features/hooks/useMediaQuery'

const ProductsListItem = ({ item, title }: IProductsListItemProps) => {
  const isTitleForNew = title === 'Новинки'
  const isMediaQuery568 = useMediaQuery(568)

  const {
    handleAddProductToFavorites,
    addToFavoritesSpinner,
    isProductInFavorites,
  } = useFavoritesAction(item)

  const handleShowQuickViewModal = () => {
    addOverflowHiddenToBody()
    showQuickViewModal()
    setCurrentProduct(item)
  }

  return (
    <>
      <li className={styles.list__item}>
        {title ? (
          <span
            className={`${styles.list__item__label} ${
              isTitleForNew
                ? styles.list__item__new
                : styles.list__item__bestseller
            }`}
          >
            {isTitleForNew ? 'Новинка' : 'Хит'}
          </span>
        ) : !item.isNew && !item.isBestseller ? (
          ''
        ) : (
          <ProductLabel isBestseller={item.isBestseller} isNew={item.isNew} />
        )}
        <div className={styles.list__item__actions}>
          <ProductItemActionBtn
            spinner={addToFavoritesSpinner}
            text={`${
              !isProductInFavorites
                ? 'Добавить в избранное'
                : 'Удалить из избранного'
            }`}
            iconClass={`${
              addToFavoritesSpinner
                ? 'actions__btn_spinner'
                : isProductInFavorites
                  ? 'actions__btn_favorite_checked'
                  : 'actions__btn_favorite'
            }`}
            callback={handleAddProductToFavorites}
          />
        </div>
        <Link
          href={`/catalog/${item.category}/${item.slug}`}
          className={styles.list__item__img}
        >
          <Image src={item.images[0]} alt={item.name} fill />
        </Link>
        <div className={styles.list__item__inner}>
          <h3 className={styles.list__item__title}>
            <Link href={`/catalog/${item.category}/${item.slug}`}>
              {item.name}
            </Link>
          </h3>
          <ProductAvailable
            vendorCode={item.vendorCode}
            inStock={+item.inStock}
          />
        </div>
        <div className={styles.list__item__right__bottom}>
          <span className={styles.list__item__price}>
            {formatPrice(+item.price)} ₽
          </span>
          {isMediaQuery568 ? (
            <Link href={`/pizza/`} className={styles.list__item__cart}>
              Подробнее
            </Link>
          ) : (
            <button
              className={styles.list__item__cart}
              onClick={handleShowQuickViewModal}
            >
              В корзину
            </button>
          )}
        </div>
      </li>
    </>
  )
}

export default ProductsListItem
