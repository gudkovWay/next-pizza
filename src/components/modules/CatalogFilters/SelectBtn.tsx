import { ISelectBtnProps } from '@/shared/types/catalog'
import styles from '@/app/styles/catalog/index.module.scss'

const SelectBtn = ({
  open,
  toggle,
  dynamicText,
  defaultText,
  bgClassName,
}: ISelectBtnProps) => (
  <button
    className={`${styles.catalog__filters__btn} ${open ? styles.is_open : ''} ${
      bgClassName || ''
    }`}
    onClick={toggle}
  >
    {dynamicText ? (
      <span className={styles.catalog__filters__btn__inner}>
        <span className={styles.catalog__filters__btn__text}>
          {defaultText}
        </span>
        <span className={styles.catalog__filters__btn__info}>
          {dynamicText}
        </span>
      </span>
    ) : (
      defaultText
    )}
  </button>
)

export default SelectBtn
