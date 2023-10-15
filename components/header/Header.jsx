import Link from 'next/link'
import css from './Header.module.css'
import Registration from '../registration/Registration'
import { useState } from 'react'

export default function Header({ }) {

    const [showRegistration, setShowRegistration] = useState(false);
    const [auth, setAuth] = useState(false);
    return <>
        <header className={css.header}>
            <div className="container">
                <div className={css.header__inner}>
                    <div className={css.header__left}>
                        <Link className={css.header__logo} href='/'></Link>
                        <h2 className={css.header__text}>Доска бесплатных объявлений</h2>
                    </div>
                    {auth
                        ? <div className={css.header__right}>
                            <button className={css.header__btn}>Разместить объявление</button>
                            <button onClick={() => setAuth(false)} className={css.header__btn}>Выйти</button>
                        </div>
                        : <div>
                            <button onClick={() => setShowRegistration(true)} className={css.header__btn}>Войти</button>
                        </div>
                    }

                </div>
            </div>
            {showRegistration && <Registration setShowRegistration={setShowRegistration} setAuth={setAuth} />}

        </header>
    </>
}