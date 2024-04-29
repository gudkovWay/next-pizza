import Accordion from '../Accordion/Accordion'
import { IProductInfoAccordionProps } from '@/shared/types/product'
import styles from '@/app/styles/product/index.module.scss'

const ProductInfoAccordion = ({
  children,
  title,
}: IProductInfoAccordionProps) => (
  <Accordion
    title={`${title}:`}
    titleClass={styles.product__top__description__btn}
    rotateIconClass={styles.expanded}
  >
    {children}
  </Accordion>
)

export default ProductInfoAccordion
