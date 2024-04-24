import { INameErrorMessageProps } from '@/shared/types/authPopup'

const NameErrorMessage = ({
  errors,
  className,
  fieldName,
}: INameErrorMessageProps) => (
  <>
    {errors[fieldName] && (
      <span className={className}>{errors[fieldName]?.message}</span>
    )}
    {errors[fieldName] && errors[fieldName]?.type === 'minLength' && (
      <span className={className}>Минимум 2 символа!</span>
    )}
    {errors[fieldName] && errors[fieldName]?.type === 'maxLength' && (
      <span className={className}>Максимум 15 символов!</span>
    )}
  </>
)

export default NameErrorMessage
