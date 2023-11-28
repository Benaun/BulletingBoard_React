import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Spiner from '../Spiner/Spiner';
import { Button } from 'react-bootstrap';
import css from './SignIn.module.css'

export default function SignIn() {
    const { data: session, status } = useSession();
    if ('loading' === status) {
        return <Spiner />;
    }

    if (session) {
        console.log(session)
        return <>
            {session.user.role === "admin"
                ? <Link href={"/controlPanel"}>
                    <Image
                        src={'/images/crown.svg'}
                        width={40}
                        height={40}
                        className={css.avatar}
                        alt="ava"
                    />
                </Link>
                : <div>
                    <Link href={"/profile"}>
                        <Image
                            src={session?.user?.image || '/images/avatar.svg'}
                            width={40}
                            height={40}
                            className={css.avatar}
                            alt="ava"
                        />
                    </Link>
                    <Link href={'/addBullet'}>
                        <Button variant="warning">
                            Разместить объявление
                        </Button>
                    </Link>
                </div>
            }
            <Link href={"#"} onClick={() => signOut({ callbackUrl: "/" })}>
                <Button variant="warning">
                    Выйти
                </Button>
            </Link>
        </>
    }
    return (
        <Link href={"#"} onClick={() => signIn({ callbackUrl: "/" })}>
            <Button variant="warning">
                Войти
            </Button>
        </Link>
    )
}

