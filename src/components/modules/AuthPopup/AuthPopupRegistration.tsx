import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useAuthForm } from '@/features/hooks/useAuthForm'
import AuthPopupClose from './AuthPopupClose'
import { handleSignUp, singUpFx } from '@/features/context/auth'
import { IAuthSideProps, IInputs } from '@/shared/types/authPopup'
import NameInput from './NameInput'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import AuthPopupSocials from './AuthPopupSocials'

const AuthPopupRegistration = ({
  toggleAuth,
  isSideActive,
}: IAuthSideProps) => {
  const { spinner, register, errors, handleSubmit, handleSignupWithOAuth } =
    useAuthForm(singUpFx.pending, isSideActive, handleSignUp)

  const submitForm = (data: IInputs) =>
    handleSignUp({
      name: data.name,
      email: data.email,
      password: data.password,
      isOAuth: false,
    })

  return (
    <div className='card-front'>
      <AuthPopupClose />
      <div className='card-body wow-bg'>
        <h3 className='card-body__title'>Регистрация</h3>
        <p className='card-body__description'>Создайте аккаунт</p>
        <form onSubmit={handleSubmit(submitForm)}>
          <NameInput register={register} errors={errors} />
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <div className='card-body__inner'>
            <div className='inner__top'>
              <button className='inner__btn' type='submit' disabled={spinner}>
                {spinner ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  'Создать'
                )}
              </button>
            </div>
            <div className='inner__bottom'>
              <span className='inner__bottom__text'>
                Уже пользовались нашим сервисом?
              </span>
              <button
                type='button'
                className='inner__switch'
                onClick={toggleAuth}
              >
                Авторизуйтесь!
              </button>
            </div>
          </div>
        </form>
        <AuthPopupSocials handleSignupWithOAuth={handleSignupWithOAuth} />
      </div>
    </div>
  )
}

export default AuthPopupRegistration
