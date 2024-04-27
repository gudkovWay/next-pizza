import { handleSignIn, singInFx } from '@/features/context/auth'
import { useAuthForm } from '@/features/hooks/useAuthForm'
import { IAuthSideProps, IInputs } from '@/shared/types/authPopup'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthPopupClose from './AuthPopupClose'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import AuthPopupSocials from './AuthPopupSocials'

const AuthPopupLogin = ({ toggleAuth, isSideActive }: IAuthSideProps) => {
  const { spinner, register, errors, handleSubmit, handleSignupWithOAuth } =
    useAuthForm(singInFx.pending, isSideActive, handleSignIn)

  const submitForm = (data: IInputs) =>
    handleSignIn({
      email: data.email,
      password: data.password,
      isOAuth: false,
    })

  return (
    <div className='card-back'>
      <AuthPopupClose />
      <div className='card-body wow-bg'>
        <h3 className='card-body__title'>Авторизация</h3>
        <p className='card-body__description'>
          Пользовались нашим сервисом? Авторизуйтесь
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <div className='card-body__inner'>
            <div className='inner__top'>
              <button className='inner__btn' type='submit' disabled={spinner}>
                {spinner ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  'Авторизоваться'
                )}
              </button>
            </div>
            <div className='inner__bottom'>
              <span className='inner__bottom__text'>Впервые у нас?</span>
              <button
                type='button'
                className='inner__switch'
                onClick={toggleAuth}
              >
                Зарегестрируйтесь!
              </button>
            </div>
          </div>
        </form>
        <AuthPopupSocials handleSignupWithOAuth={handleSignupWithOAuth} />
      </div>
    </div>
  )
}

export default AuthPopupLogin
