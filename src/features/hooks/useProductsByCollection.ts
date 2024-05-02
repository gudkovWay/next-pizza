/* eslint-disable prettier/prettier */
import { useUnit } from 'effector-react'
import { loadProductsByFilterFx } from '@/features/context/goods'
import { $products } from '@/features/context/goods/state'
import { capitalizeFirstLetter } from '@/shared/lib/utils/common'

export const useProductsByCollection = (collection: string) => {
  const products = useUnit($products)
  const spinner = useUnit(loadProductsByFilterFx.pending)
  const langText = 'Коллекция '
  const capitalizedCollection = capitalizeFirstLetter(collection)
  const title = `${langText} «${capitalizedCollection}»`

  return { title, capitalizedCollection, products, spinner }
}
