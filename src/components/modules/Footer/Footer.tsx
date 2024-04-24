import Link from 'next/link'

import Logo from '@/components/elements/Logo/Logo'
import { useMediaQuery } from '@/features/hooks/useMediaQuery'
import FooterLinks from './FooterLinks'

const Footer = () => {
  const isMedia950 = useMediaQuery(950)

  return (
    <footer className='footer'>
      <div className='footer__top'>
        <div className='container footer__top__container'>
          <div className='footer__logo'>
            <Logo />
          </div>
          <div className='footer__contacts'>
            <span>
              <a href='https://github.com/gudkovWay'>github (dev)</a>
            </span>
            <span>
              <a href='https://t.me/gudkoviurii'>telegram (dev)</a>
            </span>
            {isMedia950 && <FooterLinks />}
          </div>
          {!isMedia950 && <FooterLinks />}
          <ul className='list-reset footer__socials'>
            <li className='footer__socials__item'>
              <a
                href='https://t.me/gudkoviurii'
                className='footer__socials__item__link'
              />
            </li>
            <li className='footer__socials__item'>
              <a
                href='https://vk.com/tk21msk'
                className='footer__socials__item__link'
              />
            </li>
            <li className='footer__socials__item'>
              <a
                href='https://github.com/gudkovWay'
                className='footer__socials__item__link'
              />
            </li>
          </ul>
        </div>
      </div>
      <div className='footer__bottom'>
        <div className='container footer__bottom__container'>
          <div className='footer__copyright'>
            <b>© 2024 GENIUS</b>
          </div>
          <div className='footer__policy'>
            <div className='footer__policy__inner'>
              <Link href='/personal-data-policy'>
                Политика обработки данных
              </Link>
              <Link href='/privacy-policy'>Политика конфиденциальности</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
