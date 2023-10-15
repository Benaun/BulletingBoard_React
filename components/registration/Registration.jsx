import css from "./Registration.module.css"
import { useState } from "react";

export default function Registration({setShowRegistration, setAuth}) {
    const [registration, setRegistration] = useState('signIn');

    const registrationClose = (event) => {
        const source = event.target.closest('button[data-action]');
        if(source) {
            const { action } =source.dataset;
            switch(action) {
                case 'ok':
                    setShowRegistration(false);
                    setAuth(true);
                    return;
                case 'cancel':
                    setShowRegistration(false);
            }
        }
    }

    return (
        <div onClick={(event)=>registrationClose(event)} className={css.layout}>
            <div className={css.reg}>
                <form className={css.reg__form}>
                    <div className={css.reg__head}>
                        <button
                            className={[css.reg__btn, css.reg__active].join(' ')}
                            type="button"
                            onClick={() => setRegistration('signIn')}
                        >
                            Войти
                        </button>
                        <button
                            className={css.reg__btn}
                            type="button"
                            onClick={() => setRegistration('signUp')}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                    <input placeholder="Введите email" className={css.input} type="email" />
                    {registration === "signUp" && <input placeholder="Введите логин" className={css.input} type="text" />}
                    <input placeholder="Введите пароль" className={css.input} type="password" />
                    <div className={css.reg__buttons}>
                        <button
                            className={[css.submit__btn, css.btn__ok].join(' ')}
                            data-action='ok'
                            type="submit"
                        >
                            Подтвердить
                        </button>
                        <button
                            className={[css.submit__btn, css.btn__cancel].join(' ')}
                            data-action='cancel'
                            type="submit"
                        >
                            Отменить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}