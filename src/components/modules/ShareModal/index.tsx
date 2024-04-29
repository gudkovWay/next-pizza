'use client'
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share'

import { handleCloseShareModal } from '@/shared/lib/utils/common'
import styles from '@/app/styles/share-modal/index.module.scss'

const ShareModal = () => (
  <div className={styles.share_modal}>
    <h2 className={styles.share_modal__title}>Поделиться</h2>
    <button
      className={`btn-reset ${styles.share_modal__close}`}
      onClick={handleCloseShareModal}
    />
    <WhatsappShareButton url={window.location.href} style={{ marginRight: 10 }}>
      <WhatsappIcon size={32} round />
    </WhatsappShareButton>
    <TelegramShareButton url={window.location.href}>
      <TelegramIcon size={32} round />
    </TelegramShareButton>
  </div>
)

export default ShareModal
