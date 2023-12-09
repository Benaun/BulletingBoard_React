import { Container } from 'react-bootstrap'

export default function Footer() {
    return (
        <Container fluid>
            <footer className='container'>
                <p
                    style={{
                        display: "flex",
                        borderTop: "2px solid #222",
                        width: "100%",
                        justifyContent: "center",
                        padding: "11px 0"
                    }}
                >
                    &copy;2023 Andrey Kharitonov | All Rights Reserved
                </p>
            </footer>
        </Container>
    )
}