'use client'
import Link from 'next/link'
import styles from '@/styles/main-page/index.module.scss'

const AllLink = (link: string) => (
  <Link href={link} className={styles.all}>
    <span />
    Все
  </Link>
)

export default AllLink
