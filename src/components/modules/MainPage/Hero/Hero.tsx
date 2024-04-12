'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

import HeroSlide from './HeroSlide'
import ProductSubtitle from '@/components/elements/ProductSubtitle/ProductSubtitle'

import img1 from '@/../public/img/products/pizza/итальянская.png'
import img2 from '@/../public/img/products/pizza/мясная.png'
import img3 from '@/../public/img/products/pizza/сырная.png'
import styles from '@/styles/main-page/index.module.scss'
import stylesForAd from '@/styles/ad/index.module.scss'

const Hero = () => {
  const slides = [
    {
      id: 1,
      title: `Итальянская`,
      image: img1,
      price: 999,
    },
    {
      id: 2,
      title: `Мясная`,
      image: img2,
      price: 899,
    },
    {
      id: 3,
      title: `Сырная`,
      image: img3,
      price: 1099,
    },
  ]

  const handleSlideClick = (e: SwiperType) => e.slideTo(e.clickedIndex)

  return (
    <section className={styles.hero}>
      <h1 className='visually-hidden'>
        DOODLE PIZZA | BEST COURSE WORK | By Gudkov
      </h1>
      <div className={`container ${styles.hero__container}`}>
        <span className={stylesForAd.ad}>Популярные</span>
        <Swiper
          className={styles.hero__slider}
          effect='coverflow'
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          slidesPerView='auto'
          initialSlide={2}
          autoplay
          loop
          onClick={handleSlideClick}
          modules={[EffectCoverflow]}
          grabCursor
          centeredSlides
        >
          {slides.map((slide) => (
            <SwiperSlide className={styles.hero__slider__slide} key={slide.id}>
              <HeroSlide slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>
        <ProductSubtitle />
        <h2 className={styles.hero__title}>
          <span className={`${styles.hero__title__subtitle}`}>
            [ Для <b>вечеринок</b> и <b>одного</b> ]
          </span>
          <span className={styles.hero__title__text}>Doodle</span>
        </h2>
      </div>
    </section>
  )
}

export default Hero
