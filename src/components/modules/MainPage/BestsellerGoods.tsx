import { useUnit } from 'effector-react'
import { getBestsellerProductsFx } from '@/shared/api/main-page'
import { $bestsellerProducts } from '@/context/goods'
import MainPageSection from './MainPageSection'

const BestsellerGoods = () => {
  const goods = useUnit($bestsellerProducts)
  const spinner = useUnit(getBestsellerProductsFx.pending)

  return (
    <MainPageSection
      title='Бестселлеры'
      goods={goods}
      spinner={spinner}
      sortBy='popularity'
    />
  )
}

export default BestsellerGoods
