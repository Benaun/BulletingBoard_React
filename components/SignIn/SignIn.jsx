import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import css from './SignIn.module.css'

export default function SignIn() {
    const { data: session, status } = useSession();
    if ('loading' === status) {
        return <h2>Loading</h2>;
    }

    if (session) {
        return <>
            <Link href={"/profile"}>
                <Image 
                    src={session?.user?.image || '/images/avatar.svg'} 
                    width={40} 
                    height={40} 
                    className={css.avatar} 
                    alt="ava" 
                />
            </Link>

            <Link href={'/addBullet'} className={css.header__btn}>
                Разместить объявление
            </Link>
            <Link href={"#"} onClick={() => signOut({callbackUrl: "/"})} className={css.header__btn}>
                Выйти
            </Link>
        </>
    }
    return (
        <Link href={"#"} onClick={() => signIn({callbackUrl: "/"})} className={css.header__btn}>
            Войти
        </Link>
    )
}

