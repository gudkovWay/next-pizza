import CatalogPage from '@/components/templates/CatalogPage'
import { SearchParams } from '@/shared/types/catalog'

export default function Catalog({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  return <CatalogPage searchParams={searchParams || {}} pageName='catalog' />
}
