import { useEffect } from 'react'
import { useUnit } from 'effector-react'

import ProductImages from './ProductImages'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'
import WatchedProducts from '../WatchedProducts'
import ProductInfoAccordion from './ProductInfoAccordion'
import ProductsByCollection from './ProductsByCollection'
import AddToCartBtn from '../ProductsListItem/AddToCartBtn'
import ProductSizesItem from '../ProductsListItem/ProductSizesItem'
import ProductCounter from '../ProductsListItem/ProductCounter'

import { useCartAction } from '@/features/hooks/useCartAction'
import { useFavoritesAction } from '@/features/hooks/useFavoritesAction'
import { setIsAddToFavorites } from '@/features/context/favorites'
import { useWatchedProducts } from '@/features/hooks/useWatchedProducts'
import { openShareModal } from '@/features/context/modals'
import { $currentProduct } from '@/features/context/goods/state'
import { ICartItem } from '@/shared/types/cart'
import {
  addOverflowHiddenToBody,
  formatPrice,
  getWatchedProductFromLS,
} from '@/shared/lib/utils/common'
import styles from '@/app/styles/product/index.module.scss'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'

const ProductPageContent = () => {
  const product = useUnit($currentProduct)
  const {
    handleAddProductToFavorites,
    addToFavoritesSpinner,
    isProductInFavorites,
  } = useFavoritesAction(product)
  const {
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
  const { watchedProducts } = useWatchedProducts(product._id)

  useEffect(() => {
    const watchedProducts = getWatchedProductFromLS()

    const isInWatched = watchedProducts.find((item) => item._id === product._id)

    if (isInWatched) {
      return
    }

    localStorage.setItem(
      'watched',
      JSON.stringify([
        ...watchedProducts,
        { category: product.category, _id: product._id },
      ])
    )
  }, [product._id, product.category])

  const handleProductShare = () => {
    addOverflowHiddenToBody()
    openShareModal()
  }

  const addToCart = () => {
    setIsAddToFavorites(false)
    handleAddToCart(count)
  }

  return (
    <>
      <Breadcrumbs
        crumbs={[
          {
            href: '/catalog',
            children: 'Каталог',
          },
          {
            href: `/catalog/${product.category}`,
            children: `${product.category === 'drinks' ? 'Напитки' : 'Пиццы'}`,
          },
          {
            href: `/catalog/${product.category}/${product.slug}`,
            children: `${product.name}`,
          },
        ]}
      />
      <div className={styles.product__top}>
        <ProductImages />
        <div className={styles.product__top__right}>
          {(product.isBestseller || product.isNew) && (
            <div className={styles.product__top__label}>
              {product.isNew && (
                <span className={styles.product__top__label__new}>Новинка</span>
              )}
              {product.isBestseller && (
                <span className={styles.product__top__label__bestseller}>
                  Хит
                </span>
              )}
            </div>
          )}
          <h1 className={styles.product__top__title}>{product.name}</h1>
          <div className={styles.product__top__price}>
            <h3 className={styles.product__top__price__title}>
              {formatPrice(product.price)} ₽
            </h3>
            <div className={styles.product__top__price__inner}>
              <div className={styles.product__top__price__favorite}>
                <ProductItemActionBtn
                  spinner={addToFavoritesSpinner}
                  text='В избранное'
                  iconClass={`${
                    addToFavoritesSpinner
                      ? 'actions__btn_spinner'
                      : isProductInFavorites
                        ? 'actions__btn_favorite_checked'
                        : 'actions__btn_favorite'
                  }`}
                  withTooltip={false}
                  callback={handleAddProductToFavorites}
                />
              </div>
              <button
                className={`btn-reset ${styles.product__top__price__share}`}
                onClick={handleProductShare}
              />
            </div>
          </div>
          <div className={styles.product__top__available}>
            <ProductAvailable
              vendorCode={product.vendorCode}
              inStock={+product.inStock}
            />
          </div>
          {!!product.characteristics.collection && (
            <span className={styles.product__top__collection}>
              <span>Для:</span> {product.characteristics.collection}
            </span>
          )}
          {!!Object.keys(product.sizes).length && (
            <>
              <span className={styles.product__top__size}>
                <span>
                  {product.category === 'pizza' ? 'Размер: ' : 'Объём: '}
                </span>
                {selectedSize &&
                  product.category === 'pizza' &&
                  `${selectedSize} см.`}
                {selectedSize &&
                  product.category === 'drinks' &&
                  `${selectedSize} л.`}
              </span>
              <ul className={`list-reset ${styles.product__top__sizes}`}>
                {Object.entries(product.sizes).map(([key, value], i) => (
                  <ProductSizesItem
                    key={i}
                    currentSize={[key, value]}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    currentCartItems={currentCartItems}
                    category={product.category}
                  />
                ))}
              </ul>
            </>
          )}
          <div className={styles.product__top__bottom}>
            <span className={styles.product__top__count}>Всего в корзине:</span>
            <div className={styles.product__top__inner}>
              {!!selectedSize ? (
                <ProductCounter
                  className={`counter ${styles.product__top__counter}`}
                  count={count}
                  totalCount={+product.inStock}
                  initialCount={+(existingItem?.count || 1)}
                  setCount={setCount}
                  cartItem={existingItem as ICartItem}
                  updateCountAsync={false}
                />
              ) : (
                <div
                  className={`counter ${styles.product__top__counter}`}
                  style={{ justifyContent: 'center' }}
                >
                  <span>Всего в корзине: {allCurrentCartItemCount}</span>
                </div>
              )}
              <AddToCartBtn
                className={styles.product__top__add}
                text='В корзину'
                handleAddToCart={addToCart}
                addToCartSpinner={addToCartSpinner || updateCountSpinner}
                btnDisabled={
                  addToCartSpinner ||
                  updateCountSpinner ||
                  allCurrentCartItemCount === +product.inStock
                }
              />
            </div>
          </div>
          <div className={styles.product__top__description}>
            <ProductInfoAccordion title='Описание'>
              <p className={styles.product__top__description__text}>
                {product.description}
              </p>
            </ProductInfoAccordion>
            <ProductInfoAccordion title='Характеристики'>
              <ul
                className={`list-reset ${styles.product__top__description__characteristics}`}
              >
                {Object.entries(product.characteristics).map(([key, value]) => (
                  <li
                    key={key}
                    className={styles.product__top__description__text}
                  >
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </ProductInfoAccordion>
          </div>
        </div>
      </div>
      {!!product.characteristics.collection && (
        <ProductsByCollection collection={product.characteristics.collection} />
      )}
      {!!watchedProducts.items?.length && (
        <WatchedProducts watchedProducts={watchedProducts} />
      )}
    </>
  )
}

export default ProductPageContent
