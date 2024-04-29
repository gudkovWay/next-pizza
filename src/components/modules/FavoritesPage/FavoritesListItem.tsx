import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import DeleteItemBtn from '@/components/elements/DeleteCartItemBtn/DeleteCartItemBtn'
import AddToCartIcon from '@/components/elements/AddToCartIcon/AddToCartIcon'

import { useMediaQuery } from '@/features/hooks/useMediaQuery'
import { useProductDelete } from '@/features/hooks/useProductDelete'
import { useGoodsByAuth } from '@/features/hooks/useGoodsByAuth'
import { addProductToCart } from '@/features/context/cart'
import { $cart, $cartFromLs } from '@/features/context/cart/state'
import {
  deleteProductFromFavorites,
  setFavoritesFromLS,
  setShouldShowEmptyFavorites,
} from '@/features/context/favorites'

import { IProduct } from '@/shared/types/common'
import { addCartItemToLS } from '@/shared/lib/utils/cart'
import { IFavoriteItem } from '@/shared/types/favorites'
import {
  deleteProductFromLS,
  formatPrice,
  isUserAuth,
} from '@/shared/lib/utils/common'
import styles from '@/app/styles/favorites/index.module.scss'

const FavoritesListItem = ({ item }: { item: IFavoriteItem }) => {
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)
  const isProductInCart = currentCartByAuth.find(
    (cartItem) =>
      cartItem.productId === item.productId && cartItem.size === item.size
  )
  const isMedia485 = useMediaQuery(485)
  const imgSize = isMedia485 ? 132 : 160
  const { handleDelete, deleteSpinner } = useProductDelete(
    item._id || item.clientId,
    deleteProductFromFavorites
  )

  const addToCart = () => {
    const cartItem = {
      ...item,
      _id: item.productId,
      images: [item.image],
      characteristics: {},
    }

    if (!isUserAuth()) {
      addCartItemToLS(cartItem as unknown as IProduct, item.size, 1)
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)

    const clientId = addCartItemToLS(
      cartItem as unknown as IProduct,
      item.size,
      1,
      false
    )

    addProductToCart({
      jwt: auth.accessToken,
      setSpinner: setAddToCartSpinner,
      productId: item.productId,
      category: item.category,
      slug: item.slug,
      count: 1,
      size: item.size,
      clientId,
    })
  }

  const handleDeleteFavorite = () => {
    if (!isUserAuth()) {
      deleteProductFromLS(
        item.clientId,
        'favorites',
        setFavoritesFromLS,
        setShouldShowEmptyFavorites,
        'Удалено из избранного!'
      )
      return
    }

    handleDelete()
    deleteProductFromLS(
      item.clientId,
      'favorites',
      setFavoritesFromLS,
      setShouldShowEmptyFavorites,
      '',
      false
    )
  }

  return (
    <>
      <DeleteItemBtn
        btnDisabled={deleteSpinner}
        callback={handleDeleteFavorite}
        className={styles.favorites__list__item__delete}
      />
      <AddToCartIcon
        isProductInCart={!!isProductInCart}
        addToCartSpinner={addToCartSpinner}
        callback={addToCart}
        className={styles.favorites__list__item__cart}
        addedClassName={styles.favorites__list__item__cart_added}
      />
      <Link
        href={`/catalog/${item.category}/${item.slug}`}
        className={styles.favorites__list__item__img}
      >
        <Image
          src={item.image}
          alt={item.name}
          width={imgSize}
          height={imgSize}
        />
      </Link>
      <p className={styles.favorites__list__item__info}>
        <span className={styles.favorites__list__item__info__name}>
          {item.name}
        </span>
        <span className={styles.favorites__list__item__info__price}>
          {formatPrice(+item.price)} ₽
        </span>
      </p>
    </>
  )
}

export default FavoritesListItem
