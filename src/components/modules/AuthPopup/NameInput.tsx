import NameErrorMessage from '@/components/elements/NameErrorMessage/NameErrorMessage'
import { nameValidationRules } from '@/shared/lib/utils/auth'
import { IAuthInput } from '@/shared/types/authPopup'
import styles from '@/styles/auth-popup/index.module.scss'

const NameInput = ({ register, errors }: IAuthInput) => (
  <div className='form__block'>
    <input
      type='text'
      className='form__block__input'
      placeholder='Имя'
      {...register(
        'name',
        nameValidationRules('Недопустимое значение!', 'Введите имя!')
      )}
    />
    <NameErrorMessage
      errors={errors}
      className={styles.error_alert}
      fieldName='name'
    />
  </div>
)

export default NameInput
