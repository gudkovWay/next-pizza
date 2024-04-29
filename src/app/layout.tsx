import type { Metadata, Viewport } from 'next'
import PagesLayout from '@/components/layouts/PagesLayout'
import './globalStyles/normalize.css'
import './globalStyles/globals.scss'
import './globalStyles/header.css'
import './globalStyles/menu.css'
import './globalStyles/mobile-navbar.css'
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
  title: 'Doodle Pizza',
  description: 'Doodle Pizza | Ошалевшая курсовая',
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
        <meta property='og:title' content='by GENIUS \/2024/\' />
        <meta
          property='og:url'
          content='https://next-pizza-genius.vercel.app/'
        />
        <meta
          property='og:image'
          content='https://next-pizza-genius.vercel.app/img/logo.svg'
        />
      </head>
      <body>
        <PagesLayout>{children}</PagesLayout>
      </body>
    </html>
  )
}
