import { IAuthInput } from '@/shared/types/authPopup'
import styles from '@/styles/auth-popup/index.module.scss'

const PasswordInput = ({ register, errors }: IAuthInput) => (
  <div className='form__block'>
    <input
      type='password'
      className='form__block__input'
      placeholder='Пароль'
      {...register('password', {
        required: 'Укажите пароль!',
        minLength: 4,
        maxLength: 40,
      })}
    />
    {errors.password && (
      <span className={styles.error_alert}>{errors.password?.message}</span>
    )}
    {errors.password && errors.password.type === 'minLength' && (
      <span className={styles.error_alert}>Минимальная длина: 4 символа</span>
    )}
    {errors.password && errors.password.type === 'maxLength' && (
      <span className={styles.error_alert}>
        Максимальная длина: 20 символов
      </span>
    )}
  </div>
)
export default PasswordInput
