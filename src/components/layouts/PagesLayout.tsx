'use client'
import { useUnit } from 'effector-react'
import { Toaster } from 'react-hot-toast'
import { EarthoOneProvider } from '@eartho/one-client-react'
import { Next13ProgressBar } from 'next13-progressbar'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import Layout from './Layout'
import CookieAlert from '../modules/CookieAlert/CookieAlert'

import { $openAuthPopup } from '@/features/context/auth/state'
import { closeQuickViewModal } from '@/features/context/modals'
import {
  $shareModal,
  $showQuickViewModal,
} from '@/features/context/modals/state'
import '@/features/context/goods/init'
import '@/features/context/auth/init'
import '@/features/context/cart/init'
import '@/features/context/favorites/init'
import '@/features/context/user/init'

import {
  handleCloseAuthPopup,
  handleCloseShareModal,
  removeOverflowHiddenFromBody,
} from '@/shared/lib/utils/common'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false)
  const [cookieAlertOpen, setCookieAlertOpen] = useState(false)
  const showQuickViewModal = useUnit($showQuickViewModal)
  const shareModal = useUnit($shareModal)
  const openAuthPopup = useUnit($openAuthPopup)

  useEffect(() => setIsClient(true), [])

  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  useEffect(() => {
    const checkCookie = document.cookie.indexOf('CookieBy=DoodlePizza')
    checkCookie != -1
      ? setCookieAlertOpen(false)
      : setTimeout(() => setCookieAlertOpen(true), 3000)
  }, [])

  return (
    <>
      {isClient ? (
        <EarthoOneProvider
          clientId={`${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`}
        >
          <html lang='ru'>
            <body>
              <Next13ProgressBar height='4px' color='#F7CA6A' showOnShallow />
              <Layout>{children}</Layout>
              <div
                className={`quick-view-modal-overlay ${
                  showQuickViewModal ? 'overlay-active' : ''
                }`}
                onClick={handleCloseQuickViewModal}
              />
              <div
                className={`auth-overlay ${
                  openAuthPopup ? 'overlay-active' : ''
                }`}
                onClick={handleCloseAuthPopup}
              />
              <div
                className={`share-overlay ${
                  shareModal ? 'overlay-active' : ''
                }`}
                onClick={handleCloseShareModal}
              />
              {cookieAlertOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className='cookie-popup'
                >
                  <CookieAlert setCookieAlertOpen={setCookieAlertOpen} />
                </motion.div>
              )}
              <Toaster position='top-center' reverseOrder={false} />
            </body>
          </html>
        </EarthoOneProvider>
      ) : (
        <html lang='ru'>
          <body>
            <></>
          </body>
        </html>
      )}
    </>
  )
}

export default PagesLayout
