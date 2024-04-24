import { usePriceFilter } from '@/features/hooks/usePriceFilter'
import { useDebounceCallback } from '@/features/hooks/useDebounceCallback'
import {
  getCheckedPriceFrom,
  getCheckedPriceTo,
} from '@/shared/lib/utils/catalog'
import styles from '@/styles/catalog/index.module.scss'

const PriceFilter = ({
  handleApplyFiltersWithPrice,
}: {
  handleApplyFiltersWithPrice: (arg0: string, arg1: string) => void
}) => {
  const {
    setPriceFrom,
    setPriceTo,
    priceFrom,
    priceTo,
    handleChangePriceFrom,
    handleChangePriceTo,
  } = usePriceFilter()
  const delayCallback = useDebounceCallback(2000)

  const onPriceFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangePriceFrom(e)

    if (!priceTo) {
      return
    }

    const validPriceFrom = getCheckedPriceFrom(
      +e.target.value.replace(/[^0-9]+/g, '')
    ) as string
    const validPriceTo = getCheckedPriceTo(+priceTo) as string

    setPriceFrom(validPriceFrom)
    delayCallback(() =>
      handleApplyFiltersWithPrice(validPriceFrom, validPriceTo)
    )
  }

  const onPriceToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangePriceTo(e)
    if (!priceFrom) {
      return
    }

    const validPriceFrom = getCheckedPriceFrom(+priceFrom) as string
    const validPriceTo = getCheckedPriceTo(
      +e.target.value.replace(/[^0-9]+/g, '')
    ) as string

    setPriceTo(validPriceTo)
    delayCallback(() =>
      handleApplyFiltersWithPrice(validPriceFrom, validPriceTo)
    )
  }

  return (
    <>
      <h3 className={styles.catalog__filters__popup__inner_title}>Цена</h3>
      <div
        className={`
          ${styles.catalog__filters__list__item__inputs} ${styles.catalog__filters__popup__price__inputs}
        `}
      >
        <label>
          <span>От:</span>
          <input
            type='text'
            placeholder='99 ₽'
            value={priceFrom}
            onChange={onPriceFromChange}
          />
        </label>
        <label>
          <span>До:</span>
          <input
            type='text'
            placeholder='7 777 ₽'
            value={priceTo}
            onChange={onPriceToChange}
          />
        </label>
      </div>
    </>
  )
}

export default PriceFilter
