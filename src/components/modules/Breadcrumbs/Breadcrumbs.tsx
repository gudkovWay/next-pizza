import Link from 'next/link'
import { ComponentProps } from 'react'
import clsx from 'clsx'

type Breadcrumb = ComponentProps<typeof Link>

interface BreadcrumbsProps {
  crumbs: Breadcrumb[]
}

const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => (
  <div className='breadcrumbs__container'>
    <ul className='breadcrumbs'>
      <li className='breadcrumbs__item'>
        <Link href='/' className='breadcrumbs__item__link first-crumb'>
          Главная
        </Link>
      </li>
      {crumbs.map((crumb, index) => (
        <li key={index} className='breadcrumbs__item'>
          <Link
            href={crumb.href}
            className={clsx('breadcrumbs__item__link', {
              ['last-crumb']: index === crumbs.length - 1,
            })}
          >
            {crumb.children}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default Breadcrumbs
