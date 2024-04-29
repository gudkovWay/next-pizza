import { useUnit } from 'effector-react'
import { useEffect } from 'react'

import { loadWatchedProducts } from '@/features/context/goods'
import { $watchedProducts } from '@/features/context/goods/state'
import { getWatchedProductFromLS } from '@/shared/lib/utils/common'

export const useWatchedProducts = (excludedProductId?: string) => {
  const watchedProducts = useUnit($watchedProducts)

  useEffect(() => {
    const watchedProducts = getWatchedProductFromLS()

    loadWatchedProducts({
      payload: excludedProductId
        ? watchedProducts.filter((item) => item._id !== excludedProductId)
        : watchedProducts,
    })
  }, [excludedProductId])

  return { watchedProducts }
}
