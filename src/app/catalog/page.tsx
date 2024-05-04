import CatalogPage from '@/components/templates/CatalogPage'
import { SearchParams } from '@/shared/types/catalog'

const crumbs = [
  {
    href: '/catalog',
    children: 'Каталог',
  },
]

export default function Catalog({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  return (
    <CatalogPage
      searchParams={searchParams || {}}
      pageName='catalog'
      crumbs={crumbs}
    />
  )
}
