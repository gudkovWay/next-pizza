'use client'
import { useUnit } from 'effector-react'
import { useRef, MutableRefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMediaQuery } from '@/features/hooks/useMediaQuery'
import MobileNavbar from '../modules/MobileNavbar/MobileNavbar'
import SearchModal from '../modules/Header/SearchModal'
import { $searchModal, $showQuickViewModal } from '@/features/context/modals'
import {
  handleCloseAuthPopup,
  handleCloseSearchModal,
} from '@/shared/lib/utils/common'
import Footer from '../modules/Footer/Footer'
import QuickViewModal from '../modules/QuickViewModal/QuickViewModal'
import { $openAuthPopup } from '@/features/context/auth'
import AuthPopup from '../modules/AuthPopup/AuthPopup'
import Header from '../modules/Header/Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMedia800 = useMediaQuery(800)
  const searchModal = useUnit($searchModal)
  const showQuickViewModal = useUnit($showQuickViewModal)
  const openAuthPopup = useUnit($openAuthPopup)
  const authWrapperRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleCloseAuthPopupByTarget = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as Element

    if (target === authWrapperRef.current) {
      handleCloseAuthPopup()
    }
  }

  return (
    <>
      <Header />
      {children}
      {isMedia800 && <MobileNavbar />}
      <AnimatePresence>
        {openAuthPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className='auth-popup-wrapper'
            onClick={handleCloseAuthPopupByTarget}
            ref={authWrapperRef}
          >
            <AuthPopup />
          </motion.div>
        )}
        {searchModal && (
          <motion.div
            initial={{ opacity: 0, zIndex: 102 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SearchModal />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showQuickViewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuickViewModal />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`header__search-overlay ${
          searchModal ? 'overlay-active' : ''
        }`}
        onClick={handleCloseSearchModal}
      />
      <Footer />
    </>
  )
}

export default Layout
