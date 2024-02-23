'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import HeroSlide from './HeroSlide'
import ProductSubtitle from '@/components/elements/ProductSubtitle/ProductSubtitle'
import img1 from '@/../public/img/products/pizza/грибная.png'
import img2 from '@/../public/img/products/pizza/итальянская.png'
import img3 from '@/../public/img/products/pizza/мясная.png'
import styles from '@/styles/main-page/index.module.scss'

const slides = [
  {
    id: 1,
    title: 'Грибная',
    image: img1,
  },
  {
    id: 2,
    title: 'Италия',
    image: img2,
  },
  {
    id: 3,
    title: 'Мясная',
    image: img3,
  },
]

const Hero = () => {
  const handleSlideClick = (e: SwiperType) => e.slideTo(e.clickedIndex)

  return (
    <section className={styles.hero}>
      <h1 className='visually-hidden'>Ахуенная курсовая</h1>
      <div className={`container ${styles.hero__container}`}>
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
          <span
            className={`${styles.hero__title__subtitle} styles.hero__title__subtitle_lang `}
          >
            [ Для party и одного ]
          </span>
          <span className={styles.hero__title__text}>Doodle</span>
        </h2>
      </div>
    </section>
  )
}
export default Hero
