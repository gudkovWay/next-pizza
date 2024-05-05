import { notFound } from 'next/navigation'

import CatalogPage from '@/components/templates/CatalogPage'
import { productCategories } from '@/shared/constants/product'

export default function Category({ params }: { params: { category: string } }) {
  if (!productCategories.includes(params.category)) {
    notFound()
  }

  const breadcrumbs = [
    {
      href: '/catalog',
      children: 'Каталог',
    },
    {
      href: `/catalog/${params.category}`,
      children: `${params.category}`,
    },
  ]
  return (
    <CatalogPage
      searchParams={params || {}}
      pageName={params.category}
      crumbs={breadcrumbs}
    />
  )
}
