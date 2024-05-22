import Link from 'next/link'
import { forwardRef } from 'react'
import { useUnit } from 'effector-react'
import clsx from 'clsx'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'

import CartPopupItem from './CartPopupItem'
import { withClickOutside } from '@/components/hocs/withClickOutside'

import { getCartItemsFx } from '@/shared/api/cart'
import { useGoodsByAuth } from '@/features/hooks/useGoodsByAuth'
import { useTotalPrice } from '@/features/hooks/useTotalPrice'
import {
  $cart,
  $cartFromLs,
  $shouldShowEmpty,
} from '@/features/context/cart/state'

import { formatPrice } from '@/shared/lib/utils/common'
import { IWrappedComponentProps } from '@/shared/types/hocs'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const handleShowPopup = () => setOpen(true)
    const spinner = useUnit(getCartItemsFx.pending)
    const shouldShowEmpty = useUnit($shouldShowEmpty)
    const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
    const { animatedPrice } = useTotalPrice()

    const handleHidePopup = () => setOpen(false)

    return (
      <div className='cart-popup' ref={ref}>
        <Link
          className='header__links__item__btn header__links__item__btn--cart'
          href='/cart'
          onMouseEnter={handleShowPopup}
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
              onMouseLeave={handleHidePopup}
            >
              <span className='cart-popup__arrow' />
              <button className='cart-popup__close' onClick={handleHidePopup} />
              <h3 className='cart-popup__title'>Корзина</h3>
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
                <ul className=' cart-popup__cart-list'>
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
                  <span>Цена:</span>
                  <span>{formatPrice(animatedPrice)} ₽</span>
                </div>
                <Link
                  href='/cart'
                  className={clsx('cart-popup__footer__link', {
                    ['cart-popup__footer__link--disabled']: shouldShowEmpty,
                  })}
                >
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
