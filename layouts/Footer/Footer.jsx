import css from './Footer.module.css'

export default function Footer() {
    return (
        <footer className='container'>
            <p className={css.footer}>&copy;2023 Andrey Kharitonov | All Rights Reserved</p>
        </footer>
    )
}