import { useState } from 'react'
import { IProduct } from '@/shared/types/common'
import { useGoodsByAuth } from './useGoodsByAuth'
import {
  $favorites,
  $favoritesFromLS,
  addProductToFavorites,
  deleteProductFromFavorites,
  setFavoritesFromLS,
  setIsAddToFavorites,
  setShouldShowEmptyFavorites,
} from '@/features/context/favorites'
import { deleteProductFromLS, isUserAuth } from '@/shared/lib/utils/common'
import { addFavoriteItemToLS } from '@/shared/lib/utils/favorites'
import { useProductDelete } from './useProductDelete'

export const useFavoritesAction = (product: IProduct) => {
  const [addToFavoritesSpinner, setAddToFavoritesSpinner] = useState(false)
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const existingItem = currentFavoritesByAuth.find(
    (item) => item.productId === product._id
  )
  const { handleDelete } = useProductDelete(
    // @ts-expect-error: Unreachable code error
    existingItem?._id || existingItem?.clientId,
    deleteProductFromFavorites
  )

  const handleDeleteProductFromFavorites = () => {
    if (!isUserAuth()) {
      deleteProductFromLS(
        existingItem!.clientId,
        'favorites',
        setFavoritesFromLS,
        setShouldShowEmptyFavorites,
        'Удалено из избранного!'
      )
      return
    }

    handleDelete()
    deleteProductFromLS(
      existingItem!.clientId,
      'favorites',
      setFavoritesFromLS,
      setShouldShowEmptyFavorites,
      '',
      false
    )
  }

  const handleAddProductToFavorites = () => {
    if (existingItem) {
      handleDeleteProductFromFavorites()
      return
    }

    if (!isUserAuth()) {
      addFavoriteItemToLS(product, '')
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const clientId = addFavoriteItemToLS(product, '', false)

    addProductToFavorites({
      jwt: auth.accessToken,
      productId: product._id,
      setSpinner: setAddToFavoritesSpinner,
      size: '',
      category: product.category,
      clientId,
    })
    setIsAddToFavorites(true)
  }

  return {
    handleAddProductToFavorites,
    addToFavoritesSpinner,
    setAddToFavoritesSpinner,
    isProductInFavorites: existingItem,
  }
}
