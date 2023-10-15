import css from "./Registration.module.css"
import { useState } from "react";

export default function Registration({ setShowRegistration, setAuth }) {
    const [registration, setRegistration] = useState(false);
    const [active, setActive] = useState(true);

    const registrationAction = (event) => {
        const source = event.target.closest('button[data-action]');
        const button = event.target.closest('button');
        if (source) {
            const { action } = source.dataset;
            switch (action) {
                case 'ok':
                    setShowRegistration(false);
                    setAuth(true);
                    return;
                case 'cancel':
                    setShowRegistration(false);
                    return;
                case 'signIn':
                    setActive(true);
                    setRegistration(false);
                    {active ?
                        button.classList.add(css.reg__active)
                        : button.classList.remove(css.reg__active);
                    }
                    return;
                case 'signUp':
                    setActive(false);
                    setRegistration(true);
                    {!active ?
                        button.classList.add(css.reg__active)
                        : button.classList.remove(css.reg__active);
                    }
                    return;
            }
        }
    }

    return (
        <div onClick={(event) => registrationAction(event)} className={css.wrapper}>
            <div className={css.reg}>
                <form className={css.reg__form}>
                    <div className={css.reg__head}>
                        <button
                            className={[css.reg__btn, css.reg__active].join(' ')}
                            type="button"
                            data-action='signIn'
                            onClick={() => setRegistration(true)}
                        >
                            Войти
                        </button>
                        <button
                            className={css.reg__btn}
                            type="button"
                            data-action='signUp'
                            onClick={() => setRegistration(false)}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                    {registration 
                    ? <input placeholder="Придумайте email" className={css.input} type="email" />
                    : <input placeholder="Введите email" className={css.input} type="email" />
                    }
                    
                    {registration && <input placeholder="Придумайте логин" className={css.input} type="text" />}

                    {registration 
                    ? <input placeholder="Придумайте пароль" className={css.input} type="email" />
                    : <input placeholder="Введите пароль" className={css.input} type="password" />
                    }
                    
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