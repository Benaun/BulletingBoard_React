import SignIn from '@/components/SignIn/SignIn'
import Image from 'next/image'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import css from './Header.module.css'

export default function Header({ }) {
    return (
        <header className='container'>
            <Navbar bg="light" data-bs-theme="light" className={css.header__inner}>
                <Container>
                    <Navbar.Brand href="/">
                        <Image src={"/images/logo.svg"} alt='Logo' width={71} height={64} />
                    </Navbar.Brand>
                    <Navbar.Text className={css.header__text}>
                        Доска бесплатных объявлений
                    </Navbar.Text>
                    <Navbar.Text className={css.header__right}>
                        <SignIn />
                    </Navbar.Text>
                </Container>
            </Navbar>
        </header>
    )
}
