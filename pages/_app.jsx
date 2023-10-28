import '../styles/global.css';
import { UsersProvider } from '../context/context';

export default function MyApp({ Component, pageProps }) {
  return (
    <UsersProvider>
      <Component {...pageProps} />
    </UsersProvider>
  )
}