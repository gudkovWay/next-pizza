import { useUnit } from 'effector-react'
import { $showQuickViewModal } from '@/features/context/modals/state'
import { closeAuthPopupWhenSomeModalOpened } from '@/shared/lib/utils/common'

const AuthPopupClose = () => {
  const showQuickViewModal = useUnit($showQuickViewModal)

  const closePopup = () => closeAuthPopupWhenSomeModalOpened(showQuickViewModal)

  return <button className='auth-popup__close' onClick={closePopup} />
}

export default AuthPopupClose
