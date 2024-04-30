import type { Metadata, Viewport } from 'next'
import PagesLayout from '@/components/layouts/PagesLayout'
import './styles/globalStyles/normalize.css'
import './styles/globalStyles/globals.scss'
import './styles/globalStyles/header.css'
import './styles/globalStyles/menu.css'
import './styles/globalStyles/mobile-navbar.css'
import './styles/globalStyles/search-modal.css'
import './styles/globalStyles/cart-popup.css'
import './styles/globalStyles/footer.css'
import './styles/globalStyles/slick-theme.css'
import './styles/globalStyles/slick.css'
import './styles/globalStyles/auth-popup.css'
import './styles/globalStyles/header-profile.css'
import './styles/globalStyles/cookie-popup.css'
import './styles/globalStyles/breadcrumbs.css'

export const metadata: Metadata = {
  title: 'Doodle Pizza',
  description: 'Doodle Pizza | Ошалевшая курсовая',
  openGraph: {
    title: 'DoodlePizza | Гениальные вые**ны',
    description:
      // eslint-disable-next-line max-len
      'Быстрый заказ пицц и напитков по Москве и области. Узнайте что такое максимальный комфорт с широким ассортиментом 🍕🥛. Позвоните по номеру +8 (800) 555-35-35',
    images:
      'https://habrastorage.org/r/w1560/getpro/habr/upload_files/9e5/b31/212/9e5b31212bc1f0924d832880c5dce8fa.png',
  },
}

export const viewport: Viewport = {
  themeColor: 'white',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ru'>
      <body>
        <PagesLayout>{children}</PagesLayout>
      </body>
    </html>
  )
}
