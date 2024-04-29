'use client'
import { useUnit } from 'effector-react'
import { useRef, MutableRefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import ShareModal from '../modules/ShareModal'
import Header from '../modules/Header/Header'
import SearchModal from '../modules/Header/SearchModal'
import AuthPopup from '../modules/AuthPopup/AuthPopup'
import QuickViewModal from '../modules/QuickViewModal/QuickViewModal'
import Footer from '../modules/Footer/Footer'
import MobileNavbar from '../modules/MobileNavbar/MobileNavbar'

import { useMediaQuery } from '@/features/hooks/useMediaQuery'
import { $openAuthPopup } from '@/features/context/auth/state'
import {
  $shareModal,
  $searchModal,
  $showQuickViewModal,
} from '@/features/context/modals/state'

import {
  handleCloseAuthPopup,
  handleCloseSearchModal,
} from '@/shared/lib/utils/common'
import { basePropsForMotion } from '@/shared/constants/motion'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMedia800 = useMediaQuery(800)
  const searchModal = useUnit($searchModal)
  const showQuickViewModal = useUnit($showQuickViewModal)
  const openAuthPopup = useUnit($openAuthPopup)
  const shareModal = useUnit($shareModal)
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
          <motion.div {...basePropsForMotion}>
            <SearchModal />
          </motion.div>
        )}
        {shareModal && (
          <motion.div {...basePropsForMotion}>
            <ShareModal />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showQuickViewModal && (
          <motion.div {...basePropsForMotion}>
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
