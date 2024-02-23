import { IProductSubtitleProps } from '@/types/elements'
import styles from '@/styles/productSubtitle/index.module.scss'

const ProductSubtitle = ({
  subtitleClassName,
  subtitleRectClassName,
}: IProductSubtitleProps) => (
  <div className={`${styles.product_subtitle__subtitle} ${subtitleClassName}`}>
    <div
      className={`${styles.product_subtitle__subtitle__rect} ${subtitleRectClassName}`}
    />
    <span> Удиви свой желудок</span>
    <br />
  </div>
)

export default ProductSubtitle
