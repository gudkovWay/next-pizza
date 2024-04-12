import { AnimatePresence, motion } from 'framer-motion'
import { basePropsForMotion } from '@/shared/constants/motion'
import { $favorites, $favoritesFromLS } from '@/features/context/favorites'
import { useGoodsByAuth } from '@/features/hooks/useGoodsByAuth'
import FavoritesListItem from './FavoritesListItem'
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