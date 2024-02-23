'use client'
import styles from '@/styles/product-list-item/index.module.scss'

const ProductComposition = ({ composition }: { composition: string }) => (
  <span className={styles.product__composition}>
    {`product.composition ${composition}`}:
    {/**eslint-disable-next-line @typescript-eslint/ban-ts-comment
     * @ts-ignore */}
    {`catalog[composition] ${composition}`}
  </span>
)

export default ProductComposition
