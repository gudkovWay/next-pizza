/* eslint-disable prettier/prettier */
import { useUnit } from 'effector-react'
import { loadProductsByFilterFx } from '@/features/context/goods'
import { $products } from '@/features/context/goods/state'

export const useProductsByCollection = (collection: string) => {
  const products = useUnit($products)
  const spinner = useUnit(loadProductsByFilterFx.pending)
  const langText = 'Коллекция '
  const title = `${langText} «${collection}»`

  return { title, collection, products, spinner }
}
