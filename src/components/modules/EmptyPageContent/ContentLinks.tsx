import Link from 'next/link'
import styles from '@/app/styles/empty-content/index.module.scss'

const ContentLinks = ({ btnText }: { btnText: string }) => (
  <div className={styles.empty_content__links}>
    <Link href='/catalog'>{btnText}</Link>
    <Link href='/'>Вернуться на главную</Link>
  </div>
)

export default ContentLinks
