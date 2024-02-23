'use client'
import Link from 'next/link'
import styles from '@/styles/main-page/index.module.scss'

const AllLink = () => (
  <Link href='/catalog' className={styles.all}>
    <span />
    Все
  </Link>
)

export default AllLink
