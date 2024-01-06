import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { SessionProvider } from 'next-auth/react';
import { Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import { setupStore } from '@/store/store';
import { Provider } from 'react-redux';

const store = setupStore();

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps } }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ThemeProvider breakpoints={['xl', 'lg', 'md', 'sm', 'xs']}>
          <Component {...pageProps} />
        </ThemeProvider>
        <Toaster position='bottom-right' />
      </SessionProvider>
    </Provider>
  )
}