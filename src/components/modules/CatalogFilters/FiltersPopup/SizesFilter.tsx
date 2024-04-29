import CheckboxSelectItem from '../CheckboxSelectItem'
import { useSizeFilter } from '@/features/hooks/useSizeFilter'
import styles from '@/app/styles/catalog/index.module.scss'

const SizesFilter = ({
  handleApplyFiltersWithSizes,
}: {
  handleApplyFiltersWithSizes: (sizes: string[]) => void
}) => {
  const { handleSelectSize, sizesOptions } = useSizeFilter(
    handleApplyFiltersWithSizes
  )

  return (
    <>
      <h3 className={styles.catalog__filters__popup__inner_title}>Размер</h3>
      <ul
        className={` ${styles.catalog__filters__list} ${styles.filters_mobile}`}
      >
        {sizesOptions.map((item) => (
          <CheckboxSelectItem
            key={item.id}
            item={item}
            callback={handleSelectSize}
            mobileClassName={styles.filters_mobile}
          />
        ))}
      </ul>
    </>
  )
}

export default SizesFilter
