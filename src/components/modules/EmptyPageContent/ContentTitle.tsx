import { IContentTitleProps } from '@/shared/types/modules'
import styles from '@/app/styles/empty-content/index.module.scss'

const ContentTitle = ({ title, oopsWord }: IContentTitleProps) => (
  <div className={styles.empty_content__title}>
    <span>{oopsWord}</span>
    <span>{title}</span>
  </div>
)

export default ContentTitle
