'use client'

import { signIn } from 'next-auth/react'

export default function LoginButton() {
  return (
    <div className='rounded-lg bg-blue-400 hover:bg-blue-500'>
      <button
        onClick={() => signIn(undefined, { callbackUrl: '/' })}
        className='text-white px-6 py-3.5 font-medium text-sm transition-colors'
      >
        Войти
      </button>
    </div>
  )
}
