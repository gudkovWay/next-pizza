import type { Metadata, Viewport } from 'next'
import PagesLayout from '@/components/layouts/PagesLayout'
import './globalStyles/normalize.css'
import './globalStyles/globals.css'
import './globalStyles/header.css'
import './globalStyles/menu.css'
import './globalStyles/mobile-navbar.css'
import './globalStyles/catalog-menu.css'
import './globalStyles/search-modal.css'
import './globalStyles/cart-popup.css'
import './globalStyles/footer.css'
import './globalStyles/slick-theme.css'
import './globalStyles/slick.css'
import './globalStyles/auth-popup.css'
import './globalStyles/header-profile.css'
import './globalStyles/cookie-popup.css'
import './globalStyles/breadcrumbs.css'

export const metadata: Metadata = {
  title: 'DoodlePizza',
  description: 'I USE ARCH BTW',
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
      <head>
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='DoodlePizza' />
        <meta property='og:title' content='DoodlePizza | Ошалевшая курсовая' />
        <meta property='og:url' content='https://next-pizza-six.vercel.app/' />
        <meta property='og:image' content='/logo.png' />
      </head>
      <body>
        <PagesLayout>{children}</PagesLayout>
      </body>
    </html>
  )
}
