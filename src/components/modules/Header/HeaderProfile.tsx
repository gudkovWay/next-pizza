import { withClickOutside } from '@/components/hocs/withClickOutside'
import { useUserLogout } from '@/features/hooks/useLogout'
import { useUserAvatar } from '@/features/hooks/useUserAvatar'
import { IWrappedComponentProps } from '@/shared/types/hocs'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { forwardRef } from 'react'

const HeaderProfile = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const handleTogglePopup = () => setOpen(!open)
    const handleLogout = useUserLogout()
    const { src, alt } = useUserAvatar()

    return (
      <div className='header-profile__popup' ref={ref}>
        <button className='header-profile__btn' onClick={handleTogglePopup}>
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
              className=' header-profile__inner'
            >
              <li className='header-profile__arrow' />
              <li className='header-profile__item'>
                <button className='header-profile__item__btn'>Профиль</button>
              </li>
              <li className='header-profile__item'>
                <button
                  className='header-profile__item__btn'
                  onClick={handleLogout}
                >
                  Выйти из аккаунта
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
