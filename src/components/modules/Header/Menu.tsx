/* eslint-disable @next/next/no-img-element */
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Logo from '@/components/elements/Logo/Logo'
import { $menuIsOpen, closeMenu } from '@/context/modals'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'
import Accordion from '../Accordion/Accordion'
import { usePathname } from 'next/navigation'
import MenuLinkItem from './MenuLinkItem'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import BuyersListItems from './BuyersListItems'
import ContactsListItems from './ContactsListItems'
import { menuLinks } from '@/constants/menu'

export interface MenuLinksProps {
  id: number
  text: string
  href: string
  children?: MenuLinksProps[]
}

const Menu = () => {
  const [showCatalogList, setShowCatalogList] = useState(-1)
  const [showAccordion, setShowAccordion] = useState(-1)
  const menuIsOpen = useUnit($menuIsOpen)
  const pathname = usePathname()
  const isMedia800 = useMediaQuery(800)
  const isMedia640 = useMediaQuery(640)

  const handleShowCatalogList = (id: number) => setShowCatalogList(id)
  const handleShowAccordion = (id: number) => setShowAccordion(id)

  const handleCloseMenu = () => {
    removeOverflowHiddenFromBody()
    closeMenu()
  }

  const handleRedirectToCatalog = (path: string) => {
    if (pathname.includes('/catalog')) {
      window.history.pushState({ path }, '', path)
      window.location.reload()
    }

    handleCloseMenu()
  }

  return (
    <nav className={`nav-menu ${menuIsOpen ? 'open' : 'close'}`}>
      <div className='container nav-menu__container'>
        <div className={`nav-menu__logo ${menuIsOpen ? 'open' : ''}`}>
          <Logo />
        </div>
        <img
          className={`nav-menu__bg ${menuIsOpen ? 'open' : ''}`}
          src={`/img/menu-bg${isMedia800 ? '-small' : ''}.png`}
          alt='menu background'
        />
        <button
          className={`btn-reset nav-menu__close ${menuIsOpen ? 'open' : ''}`}
          onClick={handleCloseMenu}
        />
        <ul className={`list-reset nav-menu__list ${menuIsOpen ? 'open' : ''}`}>
          {!isMedia800 &&
            menuLinks.map((link) => (
              <li className='nav-menu__list__item' key={link.id}>
                <button
                  className='btn-reset nav-menu__list__item__btn'
                  onMouseEnter={() => handleShowCatalogList(link.id)}
                >
                  {link.text}
                </button>
                <AnimatePresence>
                  {showCatalogList === link.id && (
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='list-reset nav-menu__accordion'
                    >
                      <li className='nav-menu__accordion__item'>
                        {link.children?.map((item) => (
                          <>
                            <motion.button
                              key={item.id}
                              initial={false}
                              onClick={() => handleShowAccordion(item.id)}
                              className={`btn-reset nav-menu__accordion__item__title`}
                            >
                              {item.text}
                            </motion.button>
                            <ul className='list-reset nav-menu__accordion__item__list'>
                              <AnimatePresence initial={false}>
                                {showAccordion === item.id &&
                                  item.children?.map((child) => (
                                    <motion.div
                                      key='content'
                                      initial='collapsed'
                                      animate='open'
                                      exit='collapsed'
                                      variants={{
                                        open: { opacity: 1, height: 'auto' },
                                        collapsed: { opacity: 0, height: 0 },
                                      }}
                                      style={{ overflow: 'hidden' }}
                                      transition={{
                                        duration: 0.8,
                                        ease: [0.04, 0.62, 0.23, 0.98],
                                      }}
                                    >
                                      <MenuLinkItem
                                        key={child.id}
                                        item={child}
                                        handleRedirectToCatalog={
                                          handleRedirectToCatalog
                                        }
                                      />
                                    </motion.div>
                                  ))}
                              </AnimatePresence>
                            </ul>
                          </>
                        ))}
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          <li className='nav-menu__list__item'>
            {isMedia640 && (
              <Accordion
                title={`Заказчики`}
                titleClass='btn-reset nav-menu__list__item__btn'
              >
                <ul className='list-reset nav-menu__accordion__item__list'>
                  <BuyersListItems />
                </ul>
              </Accordion>
            )}
          </li>
          <li className='nav-menu__list__item'>
            {isMedia640 && (
              <Accordion
                title='contacts'
                titleClass='btn-reset nav-menu__list__item__btn'
              >
                <ul className='list-reset nav-menu__accordion__item__list'>
                  <ContactsListItems />
                </ul>
              </Accordion>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Menu
