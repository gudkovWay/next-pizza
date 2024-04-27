import { AnimatePresence, motion } from 'framer-motion'

import SelectBtn from './SelectBtn'
import { useClickOutside } from '@/features/hooks/useClickOutside'
import { usePriceFilter } from '@/features/hooks/usePriceFilter'

import { basePropsForMotion } from '@/shared/constants/motion'
import {
  getCheckedPriceFrom,
  getCheckedPriceTo,
} from '@/shared/lib/utils/catalog'

import styles from '@/styles/catalog/index.module.scss'

const PriceSelect = ({
  handleApplyFiltersWithPrice,
}: {
  handleApplyFiltersWithPrice: (arg0: string, arg1: string) => void
}) => {
  const { open, ref, toggle, setOpen } = useClickOutside()
  const {
    setPriceFrom,
    setPriceTo,
    priceFrom,
    priceTo,
    setPriceInfo,
    priceInfo,
    priceFromInfo,
    priceToInfo,
    handleChangePriceFrom,
    handleChangePriceTo,
  } = usePriceFilter()

  const handleSelectPrice = () => {
    const validPriceFrom = getCheckedPriceFrom(+priceFrom) as string
    const validPriceTo = getCheckedPriceTo(+priceTo) as string

    setPriceFrom(validPriceFrom)
    setPriceTo(validPriceTo)
    setPriceInfo(
      `${priceFromInfo(validPriceFrom)} ${priceToInfo(validPriceTo)}`
    )
    setOpen(false)
    handleApplyFiltersWithPrice(validPriceFrom, validPriceTo)
  }

  return (
    <div className={styles.catalog__filters__select} ref={ref}>
      <SelectBtn
        open={open}
        toggle={toggle}
        defaultText={`Цена`}
        dynamicText={priceInfo}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            className={` ${styles.catalog__filters__list}`}
            {...basePropsForMotion}
          >
            <li
              className={`${styles.catalog__filters__list__item} ${styles.catalog__filters__list__item__price}`}
            >
              <div className={styles.catalog__filters__list__item__inputs}>
                <label>
                  <span>От</span>
                  <input
                    type='text'
                    placeholder='99 ₽'
                    value={priceFrom}
                    onChange={handleChangePriceFrom}
                  />
                </label>
                <label>
                  <span>До</span>
                  <input
                    type='text'
                    placeholder='7 777 ₽'
                    value={priceTo}
                    onChange={handleChangePriceTo}
                  />
                </label>
              </div>
              <button
                className={`${styles.catalog__filters__list__item__done}`}
                disabled={!priceFrom || !priceTo}
                onClick={handleSelectPrice}
              >
                Подтвердить
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PriceSelect
