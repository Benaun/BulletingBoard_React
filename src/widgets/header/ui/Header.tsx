'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import SignIn from '@/features/auth/ui/SignIn'

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <header
      className={`bg-white shadow-sm border-bottom ${
        isHomePage ? 'sticky-top' : ''
      }`}
      style={{
        transition: 'all 0.3s ease-in-out',
        zIndex: 1020
      }}
    >
      <nav className='container d-flex align-items-center justify-content-between py-3'>
        <Link
          href='/'
          aria-label='Домой'
          className='d-flex align-items-center text-decoration-none'
        >
          <Image
            src={'/images/logo.png'}
            alt='Logo'
            width={71}
            height={64}
          />
        </Link>
        <h3 className='h4 fw-bold text-danger mb-0 text-center flex-grow-1'>
          Доска бесплатных объявлений
        </h3>
        <div className='d-flex align-items-center'>
          <SignIn />
        </div>
      </nav>
    </header>
  )
}
