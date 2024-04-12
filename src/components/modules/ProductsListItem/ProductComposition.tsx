'use client'
import styles from '@/styles/product-list-item/index.module.scss'

const ProductComposition = ({ composition }: { composition: string }) => (
  <span className={styles.product__composition}>
    Состав:
    {[composition]}
  </span>
)

export default ProductComposition
