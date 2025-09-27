'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function UserMenu() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  const role = (session.user as { role?: string } | undefined)
    ?.role
  const isAdmin = role === 'admin'

  return (
    <div className='flex items-center gap-3'>
      {/* Кнопка размещения объявления (только для обычных пользователей) */}
      {!isAdmin && (
        <Link
          href='/addBullet'
          className='bg-blue-400 hover:bg-blue-500 text-white px-4 py-3.5 rounded-3xl font-medium text-sm transition-colors no-underline whitespace-nowrap'
        >
          Разместить объявление
        </Link>
      )}

      {/* Ссылка в админку для админов */}
      {isAdmin && (
        <Link
          href='/admin'
          className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors no-underline flex items-center gap-2'
        >
          <svg
            width='16'
            height='16'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z'
              clipRule='evenodd'
            />
          </svg>
          Админ
        </Link>
      )}

      {/* Аватар */}
      <Link
        href='/profile'
        className='flex items-center hover:opacity-80 transition-opacity'
      >
        <Image
          src='/images/avatar.svg'
          alt='Аватар пользователя'
          width={45}
          height={45}
          className='rounded-full border border-gray-300 bg-white p-1'
        />
      </Link>

      {/* Кнопка выхода */}
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className='text-gray-600 hover:text-gray-800 px-2 py-2 rounded-lg font-medium text-sm transition-colors'
        title='Выйти из аккаунта'
      >
        <svg
          width='30'
          height='30'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path
            fillRule='evenodd'
            d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
            clipRule='evenodd'
          />
        </svg>
      </button>
    </div>
  )
}
