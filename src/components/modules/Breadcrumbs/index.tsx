'use client'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

type Breadcrumb = ComponentProps<typeof Link> & { children: string }

interface BreadcrumbsProps {
  crumbs: Breadcrumb[]
}

const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => {
  const { t } = useTranslation('translations')

  return (
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
              {t(crumb.children)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Breadcrumbs
