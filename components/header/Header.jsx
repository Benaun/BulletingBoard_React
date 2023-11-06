import Link from 'next/link'
import css from './Header.module.css'
import SignIn from '@/components/SignIn/SignIn'
import Image from 'next/image'

export default function Header({ }) {

    return <>
        <header className={css.header}>
            <div className="container">
                <div className={css.header__inner}>
                    <div className={css.header__left}>
                        <Link className={css.header__logo} href='/'>
                            <Image src={"/images/logo.svg"} alt='Logo' width={71} height={64}/>
                        </Link>
                        <h2 className={css.header__text}>Доска бесплатных объявлений</h2>
                    </div>
                    <div className={css.header__right}>
                        <SignIn />
                    </div>
                </div>
            </div>
        </header>
    </>
}
