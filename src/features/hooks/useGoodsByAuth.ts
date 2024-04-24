import { useUnit } from 'effector-react'
import { $isAuth } from '@/features/context/auth'
import { UseGoodsByAuth } from '@/shared/types/common'

export const useGoodsByAuth = <T>(
  storeAsync: UseGoodsByAuth<T>,
  storeSync: UseGoodsByAuth<T>
) => {
  const goods = useUnit(storeAsync)
  const isAuth = useUnit($isAuth)
  const goodsFromLS = useUnit(storeSync)
  const currentFavoritesByAuth = isAuth ? goods : goodsFromLS

  return currentFavoritesByAuth
}
