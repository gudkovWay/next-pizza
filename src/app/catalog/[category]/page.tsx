import CatalogPage from '@/components/templates/CatalogPage'
import { productCategories } from '@/shared/constants/product'
import { notFound } from 'next/navigation'
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
      children: `${params.category === 'pizza' ? 'Пиццы' : 'Напитки'}`,
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
