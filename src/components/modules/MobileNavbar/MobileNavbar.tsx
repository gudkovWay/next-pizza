'use client'
import Link from 'next/link'

import { openMenu } from '@/features/context/modals'
import { useGoodsByAuth } from '@/features/hooks/useGoodsByAuth'
import { $cart, $cartFromLs } from '@/features/context/cart/state'
import {
  $favorites,
  $favoritesFromLS,
} from '@/features/context/favorites/state'
import { addOverflowHiddenToBody } from '@/shared/lib/utils/common'

const MobileNavbar = () => {
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)

  const handleOpenMenu = () => {
    addOverflowHiddenToBody()
    openMenu()
  }

  return (
    <>
      <div className='mobile-navbar'>
        <Link href='/' className='mobile-navbar__btn'>
          Главная
        </Link>
        <Link href='/catalog' className='mobile-navbar__btn'>
          Каталог
        </Link>
        <Link className='mobile-navbar__btn' href='/favorites'>
          {!!currentFavoritesByAuth.length && (
            <span className='not-empty not-empty-mobile-favorite' />
          )}
          Избранное
        </Link>
        <Link className='mobile-navbar__btn' href='/cart'>
          {!!currentCartByAuth.length && (
            <span className='not-empty not-empty-mobile' />
          )}
          Корзина
        </Link>
        <button className='mobile-navbar__btn' onClick={handleOpenMenu}>
          Больше
        </button>
      </div>
    </>
  )
}

export default MobileNavbar
