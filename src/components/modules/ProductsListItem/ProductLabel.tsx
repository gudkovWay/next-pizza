import { IProductLabelProps } from '@/shared/types/modules'
import styles from '@/app/styles/product-list-item/index.module.scss'

const ProductLabel = ({ isNew, isBestseller }: IProductLabelProps) => {
  const bestsellerLabel = (
    <span
      className={`${styles.list__item__label} ${styles.list__item__bestseller}`}
    >
      Хит
    </span>
  )
  const newLabel = (
    <span className={`${styles.list__item__label} ${styles.list__item__new}`}>
      Новинка
    </span>
  )
  const allLabel = (
    <div className={styles.list__item__label__all}>
      {newLabel}
      {bestsellerLabel}
    </div>
  )

  if (isNew && isBestseller) {
    return allLabel
  }

  if (isBestseller) {
    return bestsellerLabel
  }

  return newLabel
}

export default ProductLabel
