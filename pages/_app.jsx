import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  )
}