/* eslint-disable indent */
import {
  addProductToCartFx,
  deleteCartItemFx,
  getCartItemsFx,
} from '@/shared/api/cart'
import { refreshTokenFx } from '@/features/context/auth'
import { addProductsFromLSToCartFx } from '@/features/context/cart'
import {
  addProductToFavoriteFx,
  addProductsFromLSToFavoritesFx,
  deleteFavoriteItemFx,
  getFavoriteItemsFx,
} from '@/features/context/favorites'
import { loginCheckFx } from '@/features/context/user'

import { JWTError } from '@/shared/constants/jwt'
import {
  IAddProductToCartFx,
  IAddProductsFromLSToCartFx,
  IDeleteCartItemsFx,
} from '@/shared/types/cart'
import {
  IAddProductsFromLSToFavoriteFx,
  IDeleteFavoriteItemsFx,
} from '@/shared/types/favorites'

export const handleJWTError = async (
  errorName: string,
  repeatRequestAfterRefreshData?: {
    repeatRequestMethodName: string
    payload?: unknown
  }
) => {
  if (errorName === JWTError.EXPIRED_JWT_TOKEN) {
    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const newTokens = await refreshTokenFx({ jwt: auth.refreshToken })

    if (repeatRequestAfterRefreshData) {
      const { repeatRequestMethodName, payload } = repeatRequestAfterRefreshData

      switch (repeatRequestMethodName) {
        case 'getCartItemsFx':
          return getCartItemsFx({
            jwt: newTokens.accessToken,
          })
        case 'addProductToCartFx':
          return addProductToCartFx({
            ...(payload as IAddProductToCartFx),
            jwt: newTokens.accessToken,
          })
        case 'addProductsFromLSToCartFx':
          return addProductsFromLSToCartFx({
            ...(payload as IAddProductsFromLSToCartFx),
            jwt: newTokens.accessToken,
          })
        case 'deleteCartItemFx':
          return deleteCartItemFx({
            ...(payload as IDeleteCartItemsFx),
            jwt: newTokens.accessToken,
          })
        case 'addProductToFavoriteFx':
          return addProductToFavoriteFx({
            ...(payload as Omit<IAddProductToCartFx, 'count'>),
            jwt: newTokens.accessToken,
          })
        case 'getFavoriteItemsFx':
          return getFavoriteItemsFx({
            jwt: newTokens.accessToken,
          })
        case 'addProductsFromLSToFavoritesFx':
          return addProductsFromLSToFavoritesFx({
            ...(payload as IAddProductsFromLSToFavoriteFx),
            jwt: newTokens.accessToken,
          })
        case 'deleteFavoriteItemFx':
          return deleteFavoriteItemFx({
            ...(payload as IDeleteFavoriteItemsFx),
            jwt: newTokens.accessToken,
          })
        case 'loginCheckFx':
          await loginCheckFx({
            jwt: newTokens.accessToken,
          })
          break
      }
    }
  }
}
