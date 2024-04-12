import toast from 'react-hot-toast'
import { IProduct } from '@/shared/types/common'
import { idGenerator } from './common'
import {
  setFavoritesFromLS,
  setShouldShowEmptyFavorites,
} from '@/features/context/favorites'
import { IFavoriteItem } from '@/shared/types/favorites'

export const addFavoriteItemToLS = (
  product: IProduct,
  selectedSize: string,
  withToast = true
) => {
  let favoritesFromLS: IFavoriteItem[] = JSON.parse(
    localStorage.getItem('favorites') as string
  )

  const clientId = idGenerator()

  if (!favoritesFromLS) {
    favoritesFromLS = []
  }

  setShouldShowEmptyFavorites(false)

  const existingItem = favoritesFromLS.find(
    (item) => item.productId === product._id && item.size === selectedSize
  )

  if (existingItem) {
    toast.success('Добавлено в избранное!')
    return existingItem.clientId
  }

  const favorites = [
    ...favoritesFromLS,
    {
      clientId,
      productId: product._id,
      size: selectedSize,
      image: product.images[0],
      name: product.name,
      price: product.price,
      inStock: product.inStock,
      category: product.category,
      color: product.characteristics.color,
    },
  ]

  localStorage.setItem('favorites', JSON.stringify(favorites))
  setFavoritesFromLS(favorites as IFavoriteItem[])
  withToast && toast.success('Добавлено в избранное')

  return clientId
}
