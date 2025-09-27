import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { FaCrown, FaUserCircle } from 'react-icons/fa'

export default function SignIn() {
  const { data: session, status } = useSession()
  if ('loading' === status) {
    return <Spinner />
  }
  if (session) {
    const role = (session.user as { role?: string } | undefined)
      ?.role
    return (
      <>
        {role === 'admin' ? (
          <Link href={'/admin'}>
            <FaCrown
              size={42}
              cursor={'pointer'}
              fill='rgb(185, 184, 182)'
            />
          </Link>
        ) : (
          <div className='flex items-center gap-2'>
            <Link href={'/profile'}>
              <FaUserCircle
                size={42}
                fill='rgb(185, 184, 182)'
              />
            </Link>
            <Link href={'/addBullet'}>
              <Button
                className='inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors text-white focus:outline-none focus:ring-2'
                style={{ background: 'var(--color-primary)' }}
              >
                Разместить объявление
              </Button>
            </Link>
          </div>
        )}
        <Link
          href={'#'}
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <Button className='inline-flex items-center justify-center rounded-md bg-gray-100 text-[color:var(--color-text)] hover:bg-gray-200 px-3 py-2 text-sm'>
            Выйти
          </Button>
        </Link>
      </>
    )
  }
  return (
    <Link
      href={'#'}
      onClick={() => signIn(undefined, { callbackUrl: '/' })}
    >
      <Button
        className='inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors text-white focus:outline-none focus:ring-2'
        style={{ background: 'var(--color-primary)' }}
      >
        Войти
      </Button>
    </Link>
  )
}
