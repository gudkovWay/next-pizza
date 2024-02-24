import Link from 'next/link'
import { forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useUnit } from 'effector-react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CartPopupItem from './CartPopupItem'
import { withClickOutside } from '@/components/hocs/withClickOutside'
import { useCartByAuth } from '@/features/hooks/useCartByAuth'
import { useTotalPrice } from '@/features/hooks/useTotalPrice'
import { getCartItemsFx } from '@/shared/api/cart'
import { formatPrice } from '@/shared/api/lib/utils/common'
import { IWrappedComponentProps } from '@/shared/types/hocs'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    setOpen(true)
    const spinner = useUnit(getCartItemsFx.pending)
    const currentCartByAuth = useCartByAuth()
    const { animatedPrice } = useTotalPrice()
    return (
      <div className='cart-popup' ref={ref}>
        <Link
          className='header__links__item__btn header__links__item__btn--cart'
          href='/cart'
        >
          {!!currentCartByAuth.length && <span className='not-empty' />}
        </Link>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className='cart-popup__wrapper'
            >
              <span className='cart-popup__arrow' />
              <button className='btn-reset cart-popup__close' />
              <h3 className='cart-popup__title'>Ваша корзина</h3>
              {spinner ? (
                <div className='cart-popup__spinner'>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    color='#fff'
                    size='3x'
                  />
                </div>
              ) : (
                <ul className='list-reset cart-popup__cart-list'>
                  <AnimatePresence>
                    {currentCartByAuth.length ? (
                      currentCartByAuth.map((item) => (
                        <motion.li
                          key={item._id || item.clientId}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className='cart-list__item'
                        >
                          <CartPopupItem item={item} />
                        </motion.li>
                      ))
                    ) : (
                      <li className='cart-popup__cart-list__empty-cart' />
                    )}
                  </AnimatePresence>
                </ul>
              )}
              <div className='cart-popup__footer'>
                <div className='cart-popup__footer__inner'>
                  <span>Стоимость заказа:</span>
                  <span>{formatPrice(animatedPrice)} ₽</span>
                </div>
                <Link href='/order' className='cart-popup__footer__link'>
                  Заказать
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)
