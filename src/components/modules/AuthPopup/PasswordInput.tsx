import { IAuthInput } from '@/types/authPopup'
import styles from '@/styles/auth-popup/index.module.scss'

const PasswordInput = ({ register, errors }: IAuthInput) => (
  <div className='form__block'>
    <input
      type='password'
      className='form__block__input'
      placeholder={`Ваш пароль`}
      {...register('password', {
        required: `Введите пароль!`,
        minLength: 4,
        maxLength: 40,
      })}
    />
    {errors.password && (
      <span className={styles.error_alert}>{errors.password?.message}</span>
    )}
    {errors.password && errors.password.type === 'minLength' && (
      <span className={styles.error_alert}>{`validation.min_4`}</span>
    )}
    {errors.password && errors.password.type === 'maxLength' && (
      <span className={styles.error_alert}>{`validation.max_20`}</span>
    )}
  </div>
)
export default PasswordInput
