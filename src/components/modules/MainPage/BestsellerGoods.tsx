import { useUnit } from 'effector-react'
import { getBestsellerProductsFx } from '@/shared/api/main-page'
import { $bestsellerProducts } from '@/features/context/goods/state'
import MainPageSection from './MainPageSection'

const BestsellerGoods = () => {
  const goods = useUnit($bestsellerProducts)
  const spinner = useUnit(getBestsellerProductsFx.pending)

  return <MainPageSection title={`Хиты`} goods={goods} spinner={spinner} />
}

export default BestsellerGoods
