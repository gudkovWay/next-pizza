import { motion } from 'framer-motion'
import { useUnit } from 'effector-react'

import SelectInfoItem from './SelectInfoItem'
import FiltersPopup from './FiltersPopup/FiltersPopup'
import CategorySelect from './CategorySelect'
import PriceSelect from './PriceSelect'
import SizesSelect from './SizesSelect'
import SortSelect from './SortSelect'

import { useMediaQuery } from '@/features/hooks/useMediaQuery'
import { $sizesOptions } from '@/features/context/catalog/state'
import {
  setFiltersPopup,
  setSizes,
  setSizesOptions,
} from '@/features/context/catalog'

import { basePropsForMotion } from '@/shared/constants/motion'
import { addOverflowHiddenToBody } from '@/shared/lib/utils/common'
import { ICatalogFiltersProps } from '@/shared/types/catalog'

import styles from '@/styles/catalog/index.module.scss'

const CatalogFilters = ({
  handleApplyFiltersWithPrice,
  handleApplyFiltersWithSizes,
  handleApplyFiltersBySort,
}: ICatalogFiltersProps) => {
  const sizesOptions = useUnit($sizesOptions)
  const isMedia910 = useMediaQuery(910)
  const isMedia610 = useMediaQuery(610)

  const handleRemoveSizeOption = (id: number) => {
    const updatedOptions = sizesOptions.map((item) =>
      item.id === id ? { ...item, checked: false } : item
    )

    setSizesOptions(updatedOptions)

    const updatedSizes = updatedOptions
      .filter((item) => item.checked)
      .map((item) => item.size)

    setSizes(updatedSizes)
    handleApplyFiltersWithSizes(updatedSizes)
  }

  const handleOpenPopup = () => {
    addOverflowHiddenToBody()
    setFiltersPopup(true)
  }

  return (
    <>
      <FiltersPopup
        handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
        handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
      />
      <div className={styles.catalog__filters}>
        <div className={styles.catalog__filters__top}>
          {!isMedia610 && (
            <>
              <div className={styles.catalog__filters__top__left}>
                <CategorySelect />
                {isMedia910 && (
                  <SizesSelect
                    handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
                  />
                )}
                <PriceSelect
                  handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
                />
              </div>
              {!isMedia910 && (
                <SizesSelect
                  handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
                />
              )}
              <div className={styles.catalog__filters__top__right}>
                <SortSelect
                  handleApplyFiltersBySort={handleApplyFiltersBySort}
                />
              </div>
            </>
          )}
          {isMedia610 && (
            <>
              <SortSelect handleApplyFiltersBySort={handleApplyFiltersBySort} />
              <button
                className={`${styles.catalog__filters__top__filter_btn}`}
                onClick={handleOpenPopup}
              />
            </>
          )}
        </div>
        <div className={styles.catalog__filters__bottom}>
          <motion.ul
            className={` ${styles.catalog__filters__bottom__list}`}
            {...basePropsForMotion}
          >
            {sizesOptions
              .filter((item) => item.checked)
              .map((item) => (
                <SelectInfoItem
                  key={item.id}
                  id={item.id}
                  text={item.size}
                  handleRemoveItem={handleRemoveSizeOption}
                />
              ))}
          </motion.ul>
        </div>
      </div>
    </>
  )
}

export default CatalogFilters
