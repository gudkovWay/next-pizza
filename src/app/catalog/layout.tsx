import CatalogLayout from '@/components/layouts/CatalogLayout'

export const metadata = {
  title: 'Doodle Pizza | Genius Catalog',
}

export default function CatalogRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CatalogLayout>{children}</CatalogLayout>
}
