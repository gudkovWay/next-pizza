import { emailValidationRules } from '@/shared/api/lib/utils/auth'
import { IAuthInput } from '@/types/authPopup'
import styles from '@/styles/auth-popup/index.module.scss'

const EmailInput = ({ register, errors }: IAuthInput) => (
  <div className='form__block'>
    <input
      type='email'
      className='form__block__input'
      placeholder='Ваша почта'
      {...register(
        'email',
        emailValidationRules(
          `Проверьте корректность вашей почты`,
          `Введите почту!`
        )
      )}
    />
    {errors.email && (
      <span className={styles.error_alert}>{errors.email?.message}</span>
    )}
  </div>
)

export default EmailInput
