'use client'
import Link from 'next/link'
import { closeCatalogMenu, openMenu } from '@/context/modals'
import { useCartByAuth } from '@/features/hooks/useCartByAuth'
import { addOverflowHiddenToBody } from '@/shared/api/lib/utils/common'

const MobileNavbar = () => {
  const currentCartByAuth = useCartByAuth()
  const handleOpenMenu = () => {
    addOverflowHiddenToBody()
    openMenu()
    closeCatalogMenu()
  }

  return (
    <>
      <div className='mobile-navbar'>
        <Link href='/' className='mobile-navbar__btn'>
          Главная
        </Link>
        <Link href='/catalog' className='btn-reset mobile-navbar__btn'>
          Каталог
        </Link>
        <Link className='btn-reset mobile-navbar__btn' href='/favorites'>
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
