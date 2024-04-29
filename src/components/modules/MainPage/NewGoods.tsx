import { useUnit } from 'effector-react'
import MainPageSection from './MainPageSection'
import { $newProducts } from '@/features/context/goods/state'
import { getNewProductsFx } from '@/api/main-page'

const NewGoods = () => {
  const goods = useUnit($newProducts)
  const spinner = useUnit(getNewProductsFx.pending)

  return <MainPageSection title={`Новинки`} goods={goods} spinner={spinner} />
}

export default NewGoods
