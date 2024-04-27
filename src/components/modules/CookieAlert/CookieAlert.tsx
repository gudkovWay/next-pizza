import toast from 'react-hot-toast'

const CookieAlert = ({
  setCookieAlertOpen,
}: {
  setCookieAlertOpen: (arg0: boolean) => void
}) => {
  const handleAcceptCookie = () => {
    document.cookie = 'CookieBy=DoodlePizza; max-age=' + 60 * 60 * 24 * 30

    if (document.cookie) {
      setCookieAlertOpen(false)
    } else {
      toast.error(
        // eslint-disable-next-line max-len
        'Файл cookie не может быть установлен! Пожалуйста, разблокируйте этот сайт с помощью настроек cookie вашего браузера..'
      )
    }
  }

  const handleCloseAlert = () => setCookieAlertOpen(false)

  return (
    <div className='container cookie-popup__container'>
      <button className='cookie-popup__close' onClick={handleCloseAlert} />
      <p
        className='cookie-popup__text'
        dangerouslySetInnerHTML={{
          __html: `Doodle Pizza обрабатывает <a href="https://support.google.com/accounts/answer/61416">Cookies</a>
                    для корректной работы сайта и персонализации сервисов, в т.ч. с использованием метрических
                    программ и систем аналитик. Вы можете запретить обработку
                    <a href="https://support.google.com/accounts/answer/61416">Cookies</a>
                    в настройках браузера.`,
        }}
      />
      <button className='cookie-popup__accept' onClick={handleAcceptCookie}>
        Ок!
      </button>
    </div>
  )
}

export default CookieAlert
