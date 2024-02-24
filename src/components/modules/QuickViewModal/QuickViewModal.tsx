import Link from 'next/link'

import QuickViewModalSlider from './QuickViewModalSlider'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import ProductSizesItem from '../ProductsListItem/ProductSizesItem'
import ProductCounter from '../ProductsListItem/ProductCounter'
import AddToCartBtn from '../ProductsListItem/AddToCartBtn'
import { useCartAction } from '@/features/hooks/useCartAction'
import { useProductImages } from '@/features/hooks/useProductImages'
import { closeQuickViewModal } from '@/context/modals'

import {
  formatPrice,
  removeOverflowHiddenFromBody,
} from '@/shared/api/lib/utils/common'
import { ICartItem } from '@/shared/types/cart'
import styles from '@/styles/quick-view-modal/index.module.scss'
import stylesForProduct from '@/styles/product-list-item/index.module.scss'

const QuickViewModal = () => {
  const {
    product,
    selectedSize,
    setSelectedSize,
    handleAddToCart,
    addToCartSpinner,
    updateCountSpinner,
    currentCartItems,
    allCurrentCartItemCount,
    setCount,
    existingItem,
    count,
  } = useCartAction()
  const images = useProductImages(product)

  const handleCloseModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  const addToCart = () => handleAddToCart(count)

  return (
    <div className={styles.modal}>
      <button
        className={`btn-reset ${styles.modal__close}`}
        onClick={handleCloseModal}
      />
      <div className={styles.modal__left}>
        <QuickViewModalSlider images={images} />
      </div>
      <div className={styles.modal__right}>
        <div className={styles.modal__actions}>
          <ProductItemActionBtn
            text={`В избранное`}
            iconClass='actions__btn_favorite'
            withTooltip={false}
          />
          <ProductItemActionBtn
            text={`Сравнить`}
            iconClass='actions__btn_comparison'
            withTooltip={false}
          />
        </div>
        <h3 className={styles.modal__right__title}>{product.name}</h3>
        <div className={styles.modal__right__price}>
          {formatPrice(+product.price)} ₽
        </div>
        <div className={styles.modal__right__info}>
          <ProductAvailable
            vendorCode={product.vendorCode}
            inStock={+product.inStock}
          />
          {Object.keys(product.sizes).length && (
            <div className={styles.modal__right__info__size}>
              <div className={styles.modal__right__info__size__inner}>
                <span className={stylesForProduct.product__size_title}>
                  Размер:
                </span>
              </div>
              <ul className={`list-reset ${styles.modal__right__info__sizes}`}>
                {Object.entries(product.sizes).map(([key, value], i) => (
                  <ProductSizesItem
                    key={i}
                    currentSize={[key, value]}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    currentCartItems={currentCartItems}
                  />
                ))}
              </ul>
            </div>
          )}
          <div className={styles.modal__right__bottom}>
            <div className={styles.modal__right__bottom__inner}>
              {!!selectedSize ? (
                <>
                  <ProductCounter
                    className={`counter ${styles.modal__right__bottom__counter}`}
                    count={count}
                    totalCount={+product.inStock}
                    initialCount={+(existingItem?.count || 1)}
                    setCount={setCount}
                    cartItem={existingItem as ICartItem}
                    updateCountAsync={false}
                  />
                  <AddToCartBtn
                    className={styles.modal__right__bottom__add}
                    text={`Добавить в корзину `}
                    handleAddToCart={addToCart}
                    addToCartSpinner={addToCartSpinner || updateCountSpinner}
                    btnDisabled={
                      addToCartSpinner ||
                      updateCountSpinner ||
                      allCurrentCartItemCount === +product.inStock
                    }
                  />
                </>
              ) : (
                <div
                  className={`counter ${styles.modal__right__bottom__counter}`}
                  style={{ justifyContent: 'center' }}
                >
                  <span>
                    Сейчас в корзине:
                    {` ${allCurrentCartItemCount} шт. :(`}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={styles.modal__right__more}>
            <Link
              href={`/catalog/${product.category}/${product._id}`}
              className={styles.modal__right__more__link}
              onClick={handleCloseModal}
            >
              Больше
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal
