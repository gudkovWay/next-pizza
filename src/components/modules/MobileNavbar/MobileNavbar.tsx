'use client'
import Link from 'next/link'
import {
  closeCatalogMenu,
  closeMenu,
  openCatalogMenu,
  openMenu,
} from '@/features/context/modals'
import { addOverflowHiddenToBody } from '@/shared/lib/utils/common'
import { $cart, $cartFromLs } from '@/features/context/cart'
import { useGoodsByAuth } from '@/features/hooks/useGoodsByAuth'
import { $favorites, $favoritesFromLS } from '@/features/context/favorites'

const MobileNavbar = () => {
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)

  const handleOpenMenu = () => {
    addOverflowHiddenToBody()
    openMenu()
    closeCatalogMenu()
  }

  const handleOpenCatalogMenu = () => {
    addOverflowHiddenToBody('0')
    openCatalogMenu()
    closeMenu()
  }

  return (
    <>
      <div className='mobile-navbar'>
        <Link href='/' className='mobile-navbar__btn'>
          Главная
        </Link>
        <Link
          href='/catalog'
          className='btn-reset mobile-navbar__btn'
          onClick={handleOpenCatalogMenu}
        >
          Каталог
        </Link>
        <Link className='btn-reset mobile-navbar__btn' href='/favorites'>
          {!!currentFavoritesByAuth.length && (
            <span className='not-empty not-empty-mobile-favorite' />
          )}
          Избранное
        </Link>
        <Link className='btn-reset mobile-navbar__btn' href='/cart'>
          {!!currentCartByAuth.length && (
            <span className='not-empty not-empty-mobile' />
          )}
          Корзина
        </Link>
        <button
          className='btn-reset mobile-navbar__btn'
          onClick={handleOpenMenu}
        >
          Больше
        </button>
      </div>
    </>
  )
}

export default MobileNavbar
