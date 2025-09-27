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
      className={`bg-white shadow-sm border-b transition-all duration-300 ease-in-out z-40 ${
        isHomePage ? 'sticky top-0' : ''
      }`}
    >
      <nav className='container flex items-center justify-between py-3'>
        <Link
          href='/'
          aria-label='Домой'
          className='flex items-center no-underline'
        >
          <Image
            src={'/images/logo.png'}
            alt='Logo'
            width={71}
            height={64}
          />
        </Link>
        <h3 className='text-xl font-bold text-red-600 mb-0 text-center flex-grow'>
          Доска бесплатных объявлений
        </h3>
        <div className='flex items-center'>
          <SignIn />
        </div>
      </nav>
    </header>
  )
}
