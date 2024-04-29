import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'

import PriceFilter from './PriceFilter'
import CategoryFilterList from '../CategoryFilterList'
import SizesFilter from './SizesFilter'

import { setFiltersPopup } from '@/features/context/catalog'
import { loadProductsByFilterFx } from '@/features/context/goods'
import { useCategoryFilter } from '@/features/hooks/useCategoryFilter'
import { useMenuAnimation } from '@/features/hooks/useMenuAnimation'
import { $products } from '@/features/context/goods/state'
import { $filtersPopup } from '@/features/context/catalog/state'

import { ICatalogFiltersProps } from '@/shared/types/catalog'
import {
  removeOverflowHiddenFromBody,
  showCountMessage,
} from '@/shared/lib/utils/common'
import styles from '@/styles/catalog/index.module.scss'

const FiltersPopup = ({
  handleApplyFiltersWithPrice,
  handleApplyFiltersWithSizes,
}: Omit<ICatalogFiltersProps, 'handleApplyFiltersBySort'>) => {
  const filtersPopup = useUnit($filtersPopup)
  const products = useUnit($products)
  const productsSpinner = useUnit(loadProductsByFilterFx.pending)
  const { itemVariants, sideVariants, popupZIndex } = useMenuAnimation(
    102,
    filtersPopup
  )
  const {
    handleSelectAllCategories,
    currentOptions,
    option,
    setOption,
    allCategoriesTitle,
    catalogCategoryOptions,
  } = useCategoryFilter()

  const handleClosePopup = () => {
    removeOverflowHiddenFromBody()
    setFiltersPopup(false)
  }

  return (
    <div
      style={{ zIndex: popupZIndex }}
      className={styles.catalog__filters__popup}
    >
      <AnimatePresence>
        {filtersPopup && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: '100%',
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
            className={styles.catalog__filters__popup__aside}
          >
            <motion.div
              className={styles.catalog__filters__popup__inner}
              initial='closed'
              animate='open'
              exit='closed'
              variants={sideVariants}
            >
              <motion.button
                className={`${styles.catalog__filters__popup__close}`}
                variants={itemVariants}
                onClick={handleClosePopup}
              />
              <motion.h2
                variants={itemVariants}
                className={styles.catalog__filters__popup__title}
              >
                Фильтры
              </motion.h2>
              <motion.div
                className={styles.catalog__filters__popup__price}
                variants={itemVariants}
              >
                <PriceFilter
                  handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
                />
              </motion.div>
              <motion.div
                className={styles.catalog__filters__popup__category}
                variants={itemVariants}
              >
                <h3 className={styles.catalog__filters__popup__inner_title}>
                  Категории
                </h3>
                <CategoryFilterList
                  mobileClassName={styles.filters_mobile}
                  handleSelectAllCategories={handleSelectAllCategories}
                  currentOptions={currentOptions}
                  option={option}
                  setOption={setOption}
                  allCategoriesTitle={allCategoriesTitle}
                  catalogCategoryOptions={catalogCategoryOptions}
                />
              </motion.div>
              <motion.div
                className={styles.catalog__filters__popup__sizes}
                variants={itemVariants}
              >
                <SizesFilter
                  handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
                />
              </motion.div>
              <motion.button
                variants={itemVariants}
                className={`${styles.catalog__filters__popup__apply}`}
                onClick={handleClosePopup}
              >
                {productsSpinner ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : !!products.count ? (
                  `Найдено ${products.count} ${showCountMessage(
                    `${products.count} шт.`
                  )}`
                ) : (
                  'Ничего не нашлось по вашему скромному запросу :('
                )}
              </motion.button>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FiltersPopup
