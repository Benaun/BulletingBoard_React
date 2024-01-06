import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Spiner from '../UI/Spiner';
import { FaCrown, FaUserCircle } from "react-icons/fa";
import { Button } from 'react-bootstrap';

export default function SignIn() {
    const { data: session, status } = useSession();
    if ('loading' === status) {
        return <Spiner />;
    }

    if (session) {
        return <>
            {session.user.role === "admin"
                ? <Link href={"/admin"}>
                    <FaCrown
                        size={42}
                        cursor={'pointer'}
                        fill='rgb(185, 184, 182)'
                    />
                </Link>
                : <div>
                    <Link href={"/profile"}>
                        <FaUserCircle
                            size={42}
                            fill='rgb(185, 184, 182)'
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

