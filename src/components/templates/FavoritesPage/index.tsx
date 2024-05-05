/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
'use client'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'

import FavoritesList from '@/components/modules/FavoritesPage/FavoritesList'
import Breadcrumbs from '@/components/modules/Breadcrumbs'
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent'

import { loginCheckFx } from '@/features/context/user'
import { getFavoriteItemsFx } from '@/features/context/favorites'
import { useGoodsByAuth } from '@/features/hooks/useGoodsByAuth'
import {
  $favorites,
  $favoritesFromLS,
  $shouldShowEmptyFavorites,
} from '@/features/context/favorites/state'

import { isUserAuth } from '@/shared/lib/utils/common'
import { basePropsForMotion } from '@/shared/constants/motion'
import cartSkeletonStyles from '@/app/styles/cart-skeleton/index.module.scss'
import styles from '@/app/styles/favorites/index.module.scss'

const FavoritesPage = () => {
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const shouldShowEmptyFavorites = useUnit($shouldShowEmptyFavorites)
  const favoritesSpinner = useUnit(getFavoriteItemsFx.pending)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)

  return (
    <main>
      {!shouldShowEmptyFavorites ? (
        <section className={styles.favorites}>
          <div className={`container ${styles.favorites__container}`}>
            <Breadcrumbs
              crumbs={[
                {
                  href: '/favorites',
                  children: 'Избранное',
                },
              ]}
            />
            <HeadingWithCount
              count={currentFavoritesByAuth.length}
              title={'Избранные'}
              spinner={favoritesSpinner}
            />
            {(isUserAuth()
              ? favoritesSpinner || loginCheckSpinner
              : favoritesSpinner) && (
              <motion.ul
                {...basePropsForMotion}
                className={cartSkeletonStyles.skeleton}
              >
                {Array.from(new Array(3)).map((_, i) => (
                  <li key={i} className={cartSkeletonStyles.skeleton__item}>
                    <div className={cartSkeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </motion.ul>
            )}
            {!favoritesSpinner && (
              <motion.ul
                {...basePropsForMotion}
                className={styles.favorites__list}
              >
                <FavoritesList />
              </motion.ul>
            )}
          </div>
        </section>
      ) : (
        <section>
          <div className='container'>
            <EmptyPageContent
              subtitle={`В избранных нет продуктов!`}
              description={`:-(`}
              btnText={`Исправить ошибку ->`}
              bgClassName={styles.empty_bg}
            />
          </div>
        </section>
      )}
    </main>
  )
}

export default FavoritesPage
