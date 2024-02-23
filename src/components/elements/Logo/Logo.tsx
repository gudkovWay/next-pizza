import Image from 'next/image'
import Link from 'next/link'

const Logo = () => (
  <Link className='logo' href='/'>
    <p>Doodle</p>
    <Image
      className='logo__img'
      src='/img/logo.svg'
      alt='Doodle Pizza'
      width={56.7}
      height={56.7}
    />
  </Link>
)

export default Logo
