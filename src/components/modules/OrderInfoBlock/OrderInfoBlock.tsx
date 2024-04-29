import Link from 'next/link'
import { MutableRefObject, useRef, useState } from 'react'

import { useTotalPrice } from '@/features/hooks/useTotalPrice'
import { useGoodsByAuth } from '@/features/hooks/useGoodsByAuth'
import { $cart, $cartFromLs } from '@/features/context/cart/state'

import { countWholeCartItemsAmount } from '@/shared/lib/utils/cart'
import { formatPrice } from '@/shared/lib/utils/common'
import { OrderInfoBlock } from '@/shared/types/modules'
import styles from '@/app/styles/order-block/index.module.scss'

const OrderInfoBlock = ({
  isCorrectPromotionalCode,
  isOrderPage,
}: OrderInfoBlock) => {
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const [isUserAgree, setIsUserAgree] = useState(false)
  const { animatedPrice } = useTotalPrice()
  const checkboxRef = useRef() as MutableRefObject<HTMLInputElement>
  const priceWithDiscount = isCorrectPromotionalCode
    ? formatPrice(Math.round(animatedPrice - animatedPrice * 0.3))
    : formatPrice(animatedPrice)

  const handleAgreementChange = () => setIsUserAgree(!isUserAgree)

  const handleTabCheckbox = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key == ' ' || e.code == 'Space') {
      e.preventDefault()
      setIsUserAgree(!checkboxRef.current.checked)
      checkboxRef.current.checked = !checkboxRef.current.checked
    }
  }

  return (
    <div className={styles.order_block}>
      <div className={styles.order_block__inner}>
        <p className={styles.order_block__info}>
          {countWholeCartItemsAmount(currentCartByAuth)} товара на сумму
          <span className={styles.order_block__info__text}>
            {formatPrice(animatedPrice)} ₽
          </span>
        </p>
        <p className={styles.order_block__info}>
          Сумма со скидками:
          <span className={styles.order_block__info__text}>
            {priceWithDiscount} ₽
          </span>
        </p>
        {isOrderPage && <></>}
        <p className={styles.order_block__total}>
          <span>Итого:</span>
          <span className={styles.order_block__total__price}>
            {priceWithDiscount} ₽
          </span>
        </p>
        {isOrderPage ? (
          <button />
        ) : (
          <Link
            href='/order'
            className={`${styles.order_block__btn} ${
              !isUserAgree || !currentCartByAuth.length ? styles.disabled : ''
            }`}
          >
            Оформить заказ
          </Link>
        )}
        <label className={styles.order_block__agreement}>
          <input
            className={styles.order_block__agreement__input}
            type='checkbox'
            tabIndex={-1}
            ref={checkboxRef}
            onChange={handleAgreementChange}
            checked={isUserAgree}
          />
          <span className={styles.order_block__agreement__mark} />
          <span
            className={styles.order_block__agreement__checkbox}
            tabIndex={0}
            onKeyDown={handleTabCheckbox}
          />
          <span className={styles.order_block__agreement__text}>
            Нажимая на кнопку «Оформить заказ», вы даете согласие на обработку{' '}
            <Link
              href='/privacy-policy'
              className={styles.order_block__agreement__link}
            >
              персональных данных
            </Link>
          </span>
        </label>
      </div>
    </div>
  )
}

export default OrderInfoBlock
