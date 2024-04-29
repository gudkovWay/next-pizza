import { IProductAvailableProps } from '@/shared/types/elements'
import styles from '@/app/styles/product-list-item/index.module.scss'

const ProductAvailable = ({ vendorCode, inStock }: IProductAvailableProps) => {
  const isInStock = +inStock > 0

  return (
    <div className={styles.product}>
      <span
        className={`${styles.product__stock} ${
          isInStock ? styles.product__stock__green : styles.product__stock__red
        }`}
      >
        {isInStock ? 'В наличии' : 'Нет в наличии :('}
      </span>
      <span className={styles.product__code}>арт.: {vendorCode}</span>
    </div>
  )
}

export default ProductAvailable
