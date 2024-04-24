/* eslint-disable @next/next/no-img-element */
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import Slider from 'react-slick'
import { AnimatePresence, motion } from 'framer-motion'

import Logo from '@/components/elements/Logo/Logo'
import MenuLinkItem from './MenuLinkItem'

import { $menuIsOpen, closeMenu } from '@/features/context/modals'
import { useMediaQuery } from '@/features/hooks/useMediaQuery'
import { removeOverflowHiddenFromBody } from '@/shared/lib/utils/common'
import { menuLinks } from '@/shared/constants/menu'

export interface MenuLinksProps {
  id: number
  text: string
  href: string
  children?: MenuLinksProps[]
}
const settings = {
  className: 'center',
  infinite: true,
  centerPadding: '60px',
  slidesToShow: 1,
  speed: 777,
  dots: false,
  arrows: false,
}
const Menu = () => {
  const [showCatalogList, setShowCatalogList] = useState(-1)
  const [showAccordion, setShowAccordion] = useState(-1)
  const menuIsOpen = useUnit($menuIsOpen)
  const pathname = usePathname()
  const isMedia800 = useMediaQuery(800)

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
            menuLinks.map((link: MenuLinksProps) => (
              <li className='nav-menu__list__item' key={link.id}>
                <button
                  className={`btn-reset nav-menu__list__item__btn
${showCatalogList === link.id && 'nav-menu__list__item__btn-active'}`}
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
                            {item.children ? (
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
                                            open: {
                                              opacity: 1,
                                              height: 'auto',
                                            },
                                            collapsed: {
                                              opacity: 0,
                                              height: 0,
                                            },
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
                            ) : (
                              <>
                                <motion.button
                                  key={item.id}
                                  initial={false}
                                  onClick={() => handleShowAccordion(item.id)}
                                  className={`btn-reset nav-menu__accordion__item__title`}
                                >
                                  <ul className='list-reset '>
                                    <MenuLinkItem
                                      key={item.id}
                                      item={item}
                                      handleRedirectToCatalog={
                                        handleRedirectToCatalog
                                      }
                                    />
                                  </ul>
                                </motion.button>
                              </>
                            )}
                          </>
                        ))}
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          <li className='nav-menu__list__item'>
            {isMedia800 && (
              <Slider {...settings}>
                {menuLinks.map((link: MenuLinksProps) => (
                  <li
                    className='nav-menu__list__item nav-menu__list__item-mobile'
                    key={link.id}
                  >
                    <button
                      className={`btn-reset nav-menu__list__item__btn
${showCatalogList === link.id && 'nav-menu__list__item__btn-active'}`}
                      onClick={() => handleShowCatalogList(link.id)}
                    >
                      {link.text}
                    </button>
                    <AnimatePresence>
                      {showCatalogList === link.id && (
                        <motion.ul
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className='list-reset nav-menu__accordion nav-menu__accordion-mobile'
                        >
                          <li className='nav-menu__accordion__item '>
                            {link.children?.map((item) => (
                              <>
                                {item.children ? (
                                  <>
                                    <motion.button
                                      key={item.id}
                                      initial={false}
                                      onClick={() =>
                                        handleShowAccordion(item.id)
                                      }
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
                                                open: {
                                                  opacity: 1,
                                                  height: 'auto',
                                                },
                                                collapsed: {
                                                  opacity: 0,
                                                  height: 0,
                                                },
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
                                ) : (
                                  <>
                                    <motion.button
                                      key={item.id}
                                      initial={false}
                                      onClick={() =>
                                        handleShowAccordion(item.id)
                                      }
                                      className={`btn-reset nav-menu__accordion__item__title`}
                                    >
                                      <ul className='list-reset '>
                                        <MenuLinkItem
                                          key={item.id}
                                          item={item}
                                          handleRedirectToCatalog={
                                            handleRedirectToCatalog
                                          }
                                        />
                                      </ul>
                                    </motion.button>
                                  </>
                                )}
                              </>
                            ))}
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </Slider>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Menu
