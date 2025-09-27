import 'bootstrap/dist/css/bootstrap.min.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'

import { config } from '@/shared/config/config'

import './globals.css'
import { Providers } from './providers'
import Footer from '@/widgets/footer/ui/Footer'
import Header from '@/widgets/header/ui/Header'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: {
    default: config.title.default,
    template: config.title.template
  },
  description: config.description
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css'
        />
      </head>
      <body
        className={`${poppins.variable} d-flex flex-column min-vh-100`}
      >
        <Providers>
          <Header />
          <main className='flex-grow-1 container py-4'>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
