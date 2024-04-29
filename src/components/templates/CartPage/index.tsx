/* eslint-disable react/jsx-indent */
'use client'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'

import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount'
import CartList from '@/components/modules/CartPage/CartList'
import PromotionalCode from '@/components/modules/CartPage/PromotionalCode'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent'
import OrderInfoBlock from '@/components/modules/OrderInfoBlock/OrderInfoBlock'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

import { getCartItemsFx } from '@/shared/api/cart'
import { useMediaQuery } from '@/features/hooks/useMediaQuery'
import { useGoodsByAuth } from '@/features/hooks/useGoodsByAuth'
import { loginCheckFx } from '@/features/context/user'
import {
  $cart,
  $cartFromLs,
  $shouldShowEmpty,
} from '@/features/context/cart/state'

import { basePropsForMotion } from '@/shared/constants/motion'
import { countWholeCartItemsAmount } from '@/shared/lib/utils/cart'
import { isUserAuth } from '@/shared/lib/utils/common'
import cartSkeletonStyles from '@/app/styles/cart-skeleton/index.module.scss'
import styles from '@/app/styles/cart-page/index.module.scss'

const CartPage = () => {
  const cartSpinner = useUnit(getCartItemsFx.pending)
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const isMedia930 = useMediaQuery(930)
  const [isCorrectPromotionalCode, setIsCorrectPromotionalCode] =
    useState(false)
  const shouldShowEmpty = useUnit($shouldShowEmpty)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)

  return (
    <>
      <Breadcrumbs
        crumbs={[
          {
            href: '/cart',
            children: 'Корзина',
          },
        ]}
      />
      <main>
        {!shouldShowEmpty ? (
          <section className={styles.cart}>
            <div className='container'>
              <HeadingWithCount
                count={countWholeCartItemsAmount(currentCartByAuth)}
                title={`Корзина`}
                spinner={cartSpinner}
              />
              <div className={styles.cart__inner}>
                <div className={styles.cart__left}>
                  {(isUserAuth()
                    ? cartSpinner || loginCheckSpinner
                    : cartSpinner) && (
                    <motion.ul
                      {...basePropsForMotion}
                      className={cartSkeletonStyles.skeleton}
                    >
                      {Array.from(new Array(3)).map((_, i) => (
                        <li
                          key={i}
                          className={cartSkeletonStyles.skeleton__item}
                        >
                          <div
                            className={cartSkeletonStyles.skeleton__item__light}
                          />
                        </li>
                      ))}
                    </motion.ul>
                  )}
                  {!cartSpinner && (
                    <motion.ul
                      {...basePropsForMotion}
                      className={styles.cart__list}
                    >
                      <CartList />
                    </motion.ul>
                  )}
                </div>
                <div className={styles.cart__right}>
                  {isMedia930 && (
                    <PromotionalCode
                      setIsCorrectPromotionalCode={setIsCorrectPromotionalCode}
                    />
                  )}
                  <div className={styles.cart__right__order}>
                    <OrderInfoBlock
                      isCorrectPromotionalCode={isCorrectPromotionalCode}
                    />
                  </div>
                </div>
              </div>
              {!isMedia930 && (
                <PromotionalCode
                  setIsCorrectPromotionalCode={setIsCorrectPromotionalCode}
                />
              )}
            </div>
          </section>
        ) : (
          <section>
            <div className='container'>
              <EmptyPageContent
                subtitle={`Ваша корзина пуста :(`}
                description={`Чтобы совершить покупку перейдите в каталог и положите в корзину выбранные вещи`}
                btnText={`Закупаться ->`}
                bgClassName={styles.empty_bg}
              />
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export default CartPage
