import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '@/features/hooks/useClickOutside'
import { useSizeFilter } from '@/features/hooks/useSizeFilter'
import SelectBtn from './SelectBtn'
import { basePropsForMotion } from '@/shared/constants/motion'
import CheckboxSelectItem from './CheckboxSelectItem'
import styles from '@/styles/catalog/index.module.scss'

const SizesSelect = ({
  handleApplyFiltersWithSizes,
}: {
  handleApplyFiltersWithSizes: (sizes: string[]) => void
}) => {
  const { open, ref, toggle } = useClickOutside()
  const { handleSelectSize, sizes, sizesOptions } = useSizeFilter(
    handleApplyFiltersWithSizes
  )

  return (
    <div
      className={`${styles.catalog__filters__select} ${styles.catalog__filters__select_size}`}
      ref={ref}
    >
      <SelectBtn
        open={open}
        toggle={toggle}
        defaultText={`Размер`}
        dynamicText={sizes.join(', ')}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            className={` ${styles.catalog__filters__list}`}
            {...basePropsForMotion}
          >
            {sizesOptions.map((item) => (
              <CheckboxSelectItem
                key={item.id}
                item={item}
                callback={handleSelectSize}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SizesSelect
