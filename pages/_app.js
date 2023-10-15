import Header from '../components/header/Header';
import '../styles/global.css';

export default function MyApp({ Component, pageProps }) {
  return <>
    <Header />
    <main><Component {...pageProps} /></main>
  </>
}