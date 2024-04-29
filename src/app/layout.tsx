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
