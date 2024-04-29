'use client'
import styles from '@/styles/product-list-item/index.module.scss'

const ProductComposition = ({ composition }: { composition: string[] }) => (
  <span className={styles.product__composition}>
    Состав:
    {composition.map((value, index) => (
      <i key={index}>{value}, </i>
    ))}
  </span>
)

export default ProductComposition
