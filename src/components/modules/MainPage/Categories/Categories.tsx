'use client'
import Image from 'next/image'
import Link from 'next/link'

import MainSlider from '../MainSlider'
import useImagePreloader from '@/features/hooks/useImagePreloader'
import { useMediaQuery } from '@/features/hooks/useMediaQuery'
import img2 from '@/../public/img/categories-img-2.png'
import img3 from '@/../public/img/categories-img-3.png'
import styles from '@/styles/main-page/index.module.scss'

const images = [
  {
    src: img2,
    id: 1,
    title: 'Питцы',
  },
  {
    src: img3,
    id: 2,
    title: 'Напитки',
  },
]

const Categories = () => {
  const isMedia490 = useMediaQuery(490)
  const { handleLoadingImageComplete, imgSpinner } = useImagePreloader()
  const imgSpinnerClass = imgSpinner ? styles.img_loading : ''
  return (
    <section className={styles.categories}>
      <div className={`container ${styles.categories__container}`}>
        <h2 className={`site-title ${styles.categories__title}`}>Категории</h2>
        <div className={styles.categories__inner}>
          {!isMedia490 && (
            <>
              <div className={styles.categories__left}>
                <div className={styles.categories__left__top}>
                  <Link
                    href='/catalog/pizza'
                    className={`${styles.categories__left__top__right} ${styles.categories__img} ${imgSpinnerClass}`}
                  >
                    <Image
                      src={img2}
                      alt='Питцы гениев'
                      className='transition-opacity opacity-0 duration'
                      onLoad={handleLoadingImageComplete}
                    />
                    <span> Пиццы </span>
                  </Link>
                  <Link
                    href='/catalog/drinks'
                    className={`${styles.categories__left__top__left} ${styles.categories__img}
                              ${imgSpinnerClass} ${styles.drinks}`}
                  >
                    <Image
                      src={img3}
                      alt='Наппитки '
                      className='transition-opacity opacity-0 duration'
                      onLoad={handleLoadingImageComplete}
                    />
                    <span>Напитки</span>
                  </Link>
                </div>
              </div>
            </>
          )}
          {isMedia490 && <MainSlider images={images} />}
        </div>
      </div>
    </section>
  )
}

export default Categories
