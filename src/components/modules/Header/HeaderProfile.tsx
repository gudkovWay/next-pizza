import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { forwardRef } from 'react'

import { withClickOutside } from '@/components/hocs/withClickOutside'
import { useUserLogout } from '@/features/hooks/useLogout'
import { useUserAvatar } from '@/features/hooks/useUserAvatar'
import { IWrappedComponentProps } from '@/shared/types/hocs'

const HeaderProfile = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const handleTogglePopup = () => setOpen(!open)
    const handleLogout = useUserLogout()
    const { src, alt } = useUserAvatar()

    return (
      <div className='header-profile__popup' ref={ref}>
        <button
          className='btn-reset header-profile__btn'
          onClick={handleTogglePopup}
        >
          <Image
            src={src ? src : '/img/profile.svg'}
            alt={alt ? alt : 'profile'}
            width={24}
            height={24}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className='list-reset header-profile__inner'
            >
              <li className='header-profile__item'>
                <Link
                  href='/profile'
                  className='btn-reset header-profile__item__btn'
                  style={{ textDecoration: 'none' }}
                >{`
                Аккаунт ->
                `}</Link>
              </li>
              <li className='header-profile__item'>
                <button
                  className='btn-reset header-profile__item__btn header-profile__item__btn--logout'
                  onClick={handleLogout}
                >
                  {`Выход ->`}
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

HeaderProfile.displayName = 'HeaderProfile'

export default withClickOutside(HeaderProfile)
