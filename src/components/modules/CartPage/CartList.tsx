import { AnimatePresence, motion } from 'framer-motion'
import { basePropsForMotion } from '@/shared/constants/motion'
import CartListItem from './CartListItem'
import { $cart, $cartFromLs } from '@/features/context/cart/state'
import { useGoodsByAuth } from '@/features/hooks/useGoodsByAuth'
import styles from '@/app/styles/cart-page/index.module.scss'

const CartList = () => {
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)

  return (
    <>
      <AnimatePresence>
        {currentCartByAuth.map((item) => (
          <motion.li
            key={item._id || item.clientId}
            {...basePropsForMotion}
            className={styles.cart__list__item}
          >
            <CartListItem item={item} />
          </motion.li>
        ))}
      </AnimatePresence>
    </>
  )
}

export default CartList
