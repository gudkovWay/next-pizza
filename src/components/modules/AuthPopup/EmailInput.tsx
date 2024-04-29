import { emailValidationRules } from '@/shared/lib/utils/auth'
import { IAuthInput } from '@/shared/types/authPopup'
import styles from '@/app/styles/auth-popup/index.module.scss'

const EmailInput = ({ register, errors }: IAuthInput) => (
  <div className='form__block'>
    <input
      type='email'
      className='form__block__input'
      placeholder='Email'
      {...register(
        'email',
        emailValidationRules('Неверная почта или пароль!', 'Введите почту!')
      )}
    />
    {errors.email && (
      <span className={styles.error_alert}>{errors.email?.message}</span>
    )}
  </div>
)

export default EmailInput
