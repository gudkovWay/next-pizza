import { AnimatePresence, motion } from 'framer-motion'

import FavoritesListItem from './FavoritesListItem'
import {
  $favorites,
  $favoritesFromLS,
} from '@/features/context/favorites/state'
import { useGoodsByAuth } from '@/features/hooks/useGoodsByAuth'

import { basePropsForMotion } from '@/shared/constants/motion'
import styles from '@/styles/favorites/index.module.scss'

const FavoritesList = () => {
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)

  return (
    <AnimatePresence>
      {currentFavoritesByAuth.map((item) => (
        <motion.li
          {...basePropsForMotion}
          key={item._id || item.clientId}
          className={styles.favorites__list__item}
        >
          <FavoritesListItem item={item} />
        </motion.li>
      ))}
    </AnimatePresence>
  )
}

export default FavoritesList
