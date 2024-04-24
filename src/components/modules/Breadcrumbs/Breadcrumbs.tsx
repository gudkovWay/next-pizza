import Link from 'next/link'
import { ComponentProps } from 'react'

import clsx from 'clsx'

type Breadcrumb = ComponentProps<typeof Link>

interface BreadcrumbsProps {
  crumbs: Breadcrumb[]
}

const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => (
  <div className='container breadcrumbs__container'>
    <ul className='list-reset breadcrumbs'>
      {crumbs.map((crumb, index) => (
        <li key={index} className='breadcrumbs__item'>
          <Link
            href={crumb.href}
            className={clsx('breadcrumbs__item__link', {
              ['first-crumb']: index === 0,
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
