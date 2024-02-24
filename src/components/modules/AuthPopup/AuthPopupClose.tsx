import { useUnit } from 'effector-react'
import { $showQuickViewModal } from '@/context/modals'
import { closeAuthPopupWhenSomeModalOpened } from '@/shared/api/lib/utils/common'
import { useEffect } from 'react'

const AuthPopupClose = () => {
  const showQuickViewModal = useUnit($showQuickViewModal)

  const closePopup = () => closeAuthPopupWhenSomeModalOpened(showQuickViewModal)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopup()
      }
    }
    document.addEventListener('keydown', handler)
  }, [showQuickViewModal])

  return <button className='btn-reset auth-popup__close' onClick={closePopup} />
}

export default AuthPopupClose
