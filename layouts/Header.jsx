import SignIn from '@/components/SignIn/SignIn'
import Image from 'next/image'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Header({ }) {
    return (
        <Container fluid>
            <header className='container'>
                <Navbar
                    bg="light"
                    data-bs-theme="light"
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "2px solid #222"
                    }}
                >
                    <Container>
                        <Navbar.Brand href="/">
                            <Image
                                src={"/images/logo.png"}
                                alt='Logo'
                                width={71}
                                height={64}
                            />
                        </Navbar.Brand>
                        <Navbar.Text>
                            <h3
                                style={{ fontSize: "24px" }}
                            >
                                Доска бесплатных объявлений
                            </h3>
                        </Navbar.Text>
                        <Navbar.Text
                            style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center"
                            }}
                        >
                            <SignIn />
                        </Navbar.Text>
                    </Container>
                </Navbar>
            </header>
        </Container>
    )
}
