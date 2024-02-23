/* eslint-disable indent */
import { IProductsListItemProps } from '@/types/modules'
import styles from '@/styles/product-list-item/index.module.scss'
import stylesForAd from '@/styles/ad/index.module.scss'
import Link from 'next/link'
import ProductSubtitle from '@/components/elements/ProductSubtitle/ProductSubtitle'
import Image from 'next/image'
import {
  addOverflowHiddenToBody,
  formatPrice,
  isItemInList,
} from '@/lib/utils/common'
import ProductLabel from './ProductLabel'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { showQuickViewModal } from '@/context/modals'
import { setCurrentProduct } from '@/context/goods'
import { productsWithoutSizes } from '@/shared/constants/product'
import { useCartAction } from '@/hooks/useCartAction'
import { addProductToCartBySizeTable } from '@/lib/utils/cart'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductsListItem = ({ item, title }: IProductsListItemProps) => {
  const isMedia800 = useMediaQuery(800)
  const isTitleForNew = title === `Новинки`
  const { addToCartSpinner, setAddToCartSpinner, currentCartByAuth } =
    useCartAction()
  const isProductInCart = isItemInList(currentCartByAuth, item._id)

  const handleShowQuickViewModal = () => {
    addOverflowHiddenToBody()
    showQuickViewModal()
    setCurrentProduct(item)
  }

  const addToCart = () =>
    addProductToCartBySizeTable(item, setAddToCartSpinner, 1)

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
          {productsWithoutSizes.includes(item.type) ? (
            <button
              onClick={addToCart}
              className={`btn-reset ${styles.list__item__cart} ${
                isProductInCart ? styles.list__item__cart_added : ''
              }`}
              disabled={addToCartSpinner}
              style={addToCartSpinner ? { minWidth: 125, height: 48 } : {}}
            >
              {addToCartSpinner ? (
                <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
              ) : isProductInCart ? (
                `В корзине`
              ) : (
                `В корзину`
              )}
            </button>
          ) : (
            <button
              className={`btn-reset ${styles.list__item__cart}`}
              onClick={addToCart}
            >
              Добавить в корзину!
            </button>
          )}
        </li>
      )}
    </>
  )
}

export default ProductsListItem
