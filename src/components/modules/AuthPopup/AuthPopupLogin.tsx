import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AuthPopupClose from './AuthPopupClose'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import AuthPopupSocials from './AuthPopupSocials'

import { useAuthForm } from '@/features/hooks/useAuthForm'
import { handleSignIn } from '@/context/auth'
import { IAuthSideProps, IInputs } from '@/shared/types/authPopup'
import { singInFx } from '@/shared/api/auth'

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
          Рады видеть Вас снова на нашем сайте
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <div className='card-body__inner'>
            <div className='inner__top'>
              <button className='inner__btn' type='submit' disabled={spinner}>
                {spinner ? <FontAwesomeIcon icon={faSpinner} spin /> : `Войти`}
              </button>
            </div>
            <div className='inner__bottom'>
              <span className='inner__bottom__text'>Ещё нет аккаунта?</span>
              <button
                type='button'
                className='btn-reset inner__switch'
                onClick={toggleAuth}
              >
                Зарегестрируйся!
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
