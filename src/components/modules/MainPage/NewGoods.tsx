import { useUnit } from 'effector-react'
import MainPageSection from './MainPageSection'
import { $newProducts } from '@/context/goods'
import { getNewProductsFx } from '@/shared/api/main-page'

const NewGoods = () => {
  const goods = useUnit($newProducts)
  const spinner = useUnit(getNewProductsFx.pending)
  return <MainPageSection title={`Новинки`} goods={goods} spinner={spinner} />
}

export default NewGoods
