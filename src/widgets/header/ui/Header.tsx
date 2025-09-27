'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import HeaderSearch from './HeaderSearch'
import LoginButton from './LoginButton'
import UserMenu from './UserMenu'

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const { data: session } = useSession()

  return (
    <header
      className={`bg-white shadow-sm transition-all duration-300 ease-in-out z-40 ${
        isHomePage ? 'sticky top-0' : ''
      }`}
    >
      <nav className='container flex items-center justify-between p-4'>
        {/* Логотип */}
        <Link
          href='/'
          aria-label='Домой'
          className='flex items-center no-underline'
        >
          <Image
            src={'/images/logo.png'}
            alt='Логотип доски объявлений'
            width={64}
            height={58}
            priority
          />
        </Link>

        {/* Строка поиска */}
        <HeaderSearch />

        {/* Правая часть */}
        <div className='flex items-center'>
          {session ? <UserMenu /> : <LoginButton />}
        </div>
      </nav>
    </header>
  )
}
