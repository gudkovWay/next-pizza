import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useClickOutside } from '@/features/hooks/useClickOutside'
import SelectBtn from './SelectBtn'
import { basePropsForMotion } from '@/shared/constants/motion'
import SelectItem from './SelectItem'
import { getSearchParamsUrl } from '@/shared/lib/utils/common'
import styles from '@/styles/catalog/index.module.scss'

const SortSelect = ({
  handleApplyFiltersBySort,
}: {
  handleApplyFiltersBySort: (arg0: string) => void
}) => {
  const { open, ref, toggle } = useClickOutside()
  const [option, setOption] = useState('')

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const sizesParam = urlParams.get('sort')

    if (sizesParam) {
      const paramOption = sizesParam

      if (paramOption) {
        setOption(paramOption)
        handleApplyFiltersBySort(sizesParam)
      }
    }
  }, [])

  const sortOptions = [
    {
      id: 1,
      title: 'Сначала популярные',
      filterHandler: () => handleApplyFiltersBySort('popular'),
    },
    {
      id: 2,
      title: 'Сначала новинки',
      filterHandler: () => handleApplyFiltersBySort('new'),
    },
    {
      id: 3,
      title: 'Сначала дешевки',
      filterHandler: () => handleApplyFiltersBySort('cheap_first'),
    },
    {
      id: 4,
      title: 'Сначала дорогие',
      filterHandler: () => handleApplyFiltersBySort('expensive_first'),
    },
  ]

  return (
    <div
      className={`${styles.catalog__filters__select} ${styles.catalog__filters__select_size}`}
      ref={ref}
    >
      <SelectBtn
        open={open}
        toggle={toggle}
        defaultText={'Сортировка'}
        dynamicText={option}
        bgClassName={styles.bg_sort}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            className={` ${styles.catalog__filters__list}`}
            {...basePropsForMotion}
          >
            {sortOptions.map((item) => (
              <SelectItem
                key={item.id}
                item={item}
                setOption={setOption}
                isActive={item.title === option}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SortSelect
