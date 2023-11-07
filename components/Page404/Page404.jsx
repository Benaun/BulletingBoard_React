import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import css from './Page404.module.css';

export default function Page404() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 5000);
    }, [router]);

    return <>
        <main className={css.main}>
            <div className={css.noise}></div>
            <div className={css.overlay}></div>
            <div className={css.terminal}>
                <h1>Error <span className={css.errorcode}>404</span></h1>
                <p className={css.output}>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
                <p className={css.output}>Please try to <Link className={css.link} href="/">return to the homepage</Link></p>
                <p className={css.output}>Good luck.</p>
            </div>
        </main>
    </>
}


