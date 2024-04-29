import { IProductSubtitleProps } from '@/shared/types/elements'
import styles from '@/app/styles/productSubtitle/index.module.scss'

const ProductSubtitle = ({
  subtitleClassName,
  subtitleRectClassName,
}: IProductSubtitleProps) => (
  <div className={`${styles.product_subtitle__subtitle} ${subtitleClassName}`}>
    <div
      className={`${styles.product_subtitle__subtitle__rect} ${subtitleRectClassName}`}
    />
    <span>Еда и напитки</span>
    <br />
  </div>
)

export default ProductSubtitle
