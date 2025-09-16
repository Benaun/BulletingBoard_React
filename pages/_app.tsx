import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import '@/styles/global.css'
// prefer src/app/store if present; fallback to legacy store
import { setupStore } from '@/store/store'

const store = setupStore()
const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Toaster position="bottom-right" />
        </QueryClientProvider>
      </SessionProvider>
    </Provider>
  )
}
