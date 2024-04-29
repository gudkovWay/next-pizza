import Link from 'next/link'

type AllLinkProps = {
  href: string
  text: string
}

const AllLink: React.FC<AllLinkProps> = ({ href, text }) => (
  <div className='all-link__container'>
    <h2 className='all-link__title'>{text}</h2>
    <Link href={href} className='all-link__link'>
      <span>Все</span>
    </Link>
  </div>
)

export default AllLink
