import Link from 'next/link'
import Image from 'next/image'

import DeleteItemBtn from '@/components/elements/DeleteCartItemBtn/DeleteCartItemBtn'
import { useMediaQuery } from '@/features/hooks/useMediaQuery'
import { useProductDelete } from '@/features/hooks/useProductDelete'
import {
  deleteProductFromFavorites,
  setFavoritesFromLS,
  setShouldShowEmptyFavorites,
} from '@/features/context/favorites'

import { IFavoriteItem } from '@/shared/types/favorites'
import {
  deleteProductFromLS,
  formatPrice,
  isUserAuth,
} from '@/shared/lib/utils/common'
import styles from '@/app/styles/favorites/index.module.scss'

const FavoritesListItem = ({ item }: { item: IFavoriteItem }) => {
  const isMedia485 = useMediaQuery(485)
  const imgSize = isMedia485 ? 132 : 160
  const { handleDelete, deleteSpinner } = useProductDelete(
    item._id || item.clientId,
    deleteProductFromFavorites
  )

  const handleDeleteFavorite = () => {
    if (!isUserAuth()) {
      deleteProductFromLS(
        item.clientId,
        'favorites',
        setFavoritesFromLS,
        setShouldShowEmptyFavorites,
        'Удалено из избранного!'
      )
      return
    }

    handleDelete()
    deleteProductFromLS(
      item.clientId,
      'favorites',
      setFavoritesFromLS,
      setShouldShowEmptyFavorites,
      '',
      false
    )
  }

  return (
    <>
      <DeleteItemBtn
        btnDisabled={deleteSpinner}
        callback={handleDeleteFavorite}
        className={styles.favorites__list__item__delete}
      />
      <Link
        href={`/catalog/${item.category}/${item.slug}`}
        className={styles.favorites__list__item__img}
      >
        <Image
          src={item.image}
          alt={item.name}
          width={imgSize}
          height={imgSize}
        />
      </Link>
      <p className={styles.favorites__list__item__info}>
        <span className={styles.favorites__list__item__info__name}>
          {item.name}
        </span>
        <span className={styles.favorites__list__item__info__price}>
          {formatPrice(+item.price)} ₽
        </span>
      </p>
    </>
  )
}

export default FavoritesListItem
