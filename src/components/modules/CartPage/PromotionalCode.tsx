import { useState } from 'react'
import styles from '@/app/styles/cart-page/index.module.scss'

const PromotionalCode = ({
  setIsCorrectPromotionalCode,
}: {
  setIsCorrectPromotionalCode: (arg0: boolean) => void
}) => {
  const [value, setValue] = useState('')
  const isCorrectCode = value === 'GENIUS'

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)

    if (e.target.value === 'GENIUS') {
      setIsCorrectPromotionalCode(true)
    } else {
      setIsCorrectPromotionalCode(false)
    }
  }

  return (
    <div className={styles.cart__promotional_code}>
      <input
        type='text'
        placeholder='Промокод'
        value={value}
        onChange={handleChangeValue}
        style={
          isCorrectCode ? { border: '1px solid #16D9A6', color: '16D9A6' } : {}
        }
      />
      <p>Чтобы воспользоваться скидкой введите промокод</p>
    </div>
  )
}

export default PromotionalCode
