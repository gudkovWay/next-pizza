import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ICartItem } from '@/shared/types/cart'
import { useCartItemAction } from '@/features/hooks/useCartItemAction'
import { useMediaQuery } from '@/features/hooks/useMediaQuery'
import { formatPrice } from '@/shared/lib/utils/common'
import ProductCounter from '../ProductsListItem/ProductCounter'
import styles from '@/app/styles/cart-page/index.module.scss'
import Link from 'next/link'

const CartListItem = ({ item }: { item: ICartItem }) => {
  const {
    deleteSpinner,
    increasePriceWithAnimation,
    decreasePriceWithAnimation,
    animatedPrice,
    count,
    setCount,
    handleDeleteCartItem,
  } = useCartItemAction(item)
  const isMedia530 = useMediaQuery(530)
  const imageSize = isMedia530 ? 132 : 160

  return (
    <>
      <button
        disabled={deleteSpinner}
        className={styles.cart__list__item__delete}
        onClick={handleDeleteCartItem}
      >
        {deleteSpinner ? (
          <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
        ) : (
          <span />
        )}
      </button>
      <Link
        href={`/catalog/${item.category}/${item._id}`}
        className={`${styles.cart__list__item__img} ${styles.cart__list__item__block}`}
      >
        <Image
          src={item.image}
          alt={item.name}
          width={imageSize}
          height={imageSize}
        />
      </Link>
      <div className={styles.cart__list__item__wrapper}>
        <div
          className={`${styles.cart__list__item__name} ${styles.cart__list__item__block}`}
        >
          {item.name}
        </div>
        <div
          className={`${styles.cart__list__item__size} ${styles.cart__list__item__block}`}
        >
          Размер: {`${item.size} ${item.category === 'pizza' ? 'см.' : 'л.'}`}
        </div>
      </div>
      <div className={styles.cart__list__item__inner}>
        <div
          className={`${styles.cart__list__item__initial} ${styles.cart__list__item__inner__block}`}
        >
          <span
            className={`${styles.cart__list__item__price} ${styles.cart__list__item__initial__price}`}
          >
            {formatPrice(+item.price)} ₽
          </span>
          <span className={styles.cart__list__item__initial__text}>
            Цена за 1 шт.
          </span>
        </div>
        <ProductCounter
          // eslint-disable-next-line max-len
          className={`cart-list__item__counter ${styles.cart__list__item__counter} ${styles.cart__list__item__inner__block}`}
          count={count}
          setCount={setCount}
          increasePrice={increasePriceWithAnimation}
          decreasePrice={decreasePriceWithAnimation}
          cartItem={item}
          updateCountAsync
        />
        <div
          className={`${styles.cart__list__item__price} ${styles.cart__list__item__inner__block}`}
        >
          {formatPrice(animatedPrice)} ₽
        </div>
      </div>
    </>
  )
}

export default CartListItem
