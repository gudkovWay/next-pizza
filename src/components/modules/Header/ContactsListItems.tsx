import Link from 'next/link'

const ContactsListItems = () => (
  <>
    <li className='nav-menu__accordion__item'>
      <a
        href='tel:+74995558293'
        className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
      />
    </li>
    <li className='nav-menu__accordion__item'>
      <a
        href='mailto:test@gmail.com'
        className='nav-menu__accordion__item__link'
      >
        Email
      </a>
    </li>
    <li className='nav-menu__accordion__item'>
      <Link
        href='https://t.me/gudkoviurii'
        className='nav-menu__accordion__item__link'
      >
        Телеграм
      </Link>
    </li>
    <li className='nav-menu__accordion__item'>
      <Link
        href='https://vk.com/mediatk21'
        className='nav-menu__accordion__item__link'
      >
        Вк
      </Link>
    </li>
  </>
)

export default ContactsListItems
