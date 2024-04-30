import CatalogLayout from '@/components/layouts/CatalogLayout'

export const metadata = {
  title: 'Doodle Pizza | Genius Catalog',
  openGraph: {
    title: 'DoodlePizza | Genius Catalog',
    description:
      // eslint-disable-next-line max-len
      'Быстрый заказ пицц и напитков по Москве и области. Узнайте что такое максимальный комфорт с широким ассортиментом 🍕🥛. Позвоните по номеру +8 (800) 555-35-35',
    images:
      'https://habrastorage.org/r/w1560/getpro/habr/upload_files/9e5/b31/212/9e5b31212bc1f0924d832880c5dce8fa.png',
  },
}

export default function CatalogRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CatalogLayout>{children}</CatalogLayout>
}
