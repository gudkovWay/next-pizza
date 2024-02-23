import Link from 'next/link'
import styles from '@/styles/empty-content/index.module.scss'

const ContentLinks = ({ btnText }: { btnText: string }) => (
  <div className={styles.empty_content__links}>
    <Link href='/cart'>{btnText}</Link>
    <Link href='/'>{`Переместиться на главную ->`}</Link>
  </div>
)

export default ContentLinks
