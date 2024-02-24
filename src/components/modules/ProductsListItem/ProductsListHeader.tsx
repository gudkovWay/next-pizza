import Link from 'next/link'
import styles from '@/styles/main-page/index.module.scss'
import { ProductHeaderProps } from '@/shared/types/common'

const ProductsListHeader = ({ title, sortBy }: ProductHeaderProps) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <h2 className={`site-title ${styles.main_section__title}`}>{title}</h2>
    <Link href={`/catalog?sortBy=${sortBy}`} className={styles.all}>
      <span />
      Все
    </Link>
  </div>
)

export default ProductsListHeader
