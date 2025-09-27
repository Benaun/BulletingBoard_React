'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => router.push('/'), 5000)
    return () => clearTimeout(t)
  }, [router])
  return (
    <main className='box-border h-full bg-black text-[1.5rem] text-[rgba(128,255,128,0.8)] [text-shadow:0_0_1ex_rgba(51,255,51,1),0_0_2px_rgba(255,255,255,0.8)]'>
      <div className='pointer-events-none absolute inset-0 z-[-1] opacity-[.02] bg-[url(https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif)] bg-no-repeat bg-cover'></div>
      <div className='pointer-events-none absolute inset-0 [background:repeating-linear-gradient(180deg,rgba(0,0,0,0)_0,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0)_100%)] bg-[length:auto_4px] before:content-[""] before:pointer-events-none before:absolute before:inset-0 before:w-full before:h-full before:bg-[linear-gradient(0deg,transparent_0%,rgba(32,128,32,0.2)_2%,rgba(32,128,32,0.8)_3%,rgba(32,128,32,0.2)_3%,transparent_100%)] before:bg-no-repeat [animation:scan_7.5s_linear_infinite]'></div>
      <style jsx>{`
        @keyframes scan {
          0% {
            background-position: 0 -100vh;
          }
          35%,
          100% {
            background-position: 0 100vh;
          }
        }
      `}</style>
      <div className='box-border absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-[1000px] max-w-full p-16 uppercase'>
        <h1>
          Error <span className='text-white'>404</span>
        </h1>
        <p className='text-[rgba(128,255,128,0.8)] [text-shadow:0_0_1px_rgba(51,255,51,0.4),0_0_2px_rgba(255,255,255,0.8)] before:content-[">_"] before:mr-2'>
          The page you are looking for might have been removed,
          had its name changed or is temporarily unavailable.
        </p>
        <p className='text-[rgba(128,255,128,0.8)] [text-shadow:0_0_1px_rgba(51,255,51,0.4),0_0_2px_rgba(255,255,255,0.8)] before:content-[">_"] before:mr-2'>
          Please try to{' '}
          <Link
            className='text-white no-underline before:content-["["] after:content-["]"]'
            href='/'
          >
            return to the homepage
          </Link>
        </p>
        <p className='text-[rgba(128,255,128,0.8)] [text-shadow:0_0_1px_rgba(51,255,51,0.4),0_0_2px_rgba(255,255,255,0.8)] before:content-[">_"] before:mr-2'>
          Good luck.
        </p>
      </div>
    </main>
  )
}

export default NotFound
