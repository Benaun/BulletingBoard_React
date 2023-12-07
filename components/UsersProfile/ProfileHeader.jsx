import Image from 'react-bootstrap/Image';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Container } from 'react-bootstrap';



export default function ProfileHeader() {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch('http://localhost:8000/users');
                if (!response.ok) throw new Error('fetch ' + response.status);
                setUsers(await response.json());
                setError(null);
            } catch (err) {
                setError(err)
            }
        }
        getUsers();
    }, [])

    const currentUser = users.filter((user) => {
        if (user.email === session?.user.email) {
            return user
        }
    });

    return (
        <Container fluid className='mt-3 mb-3'>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "30px",
            }}>
                <Image
                    src={session?.user.image || '/images/avatar.svg'}
                    width={50}
                    height={50}
                    roundedCircle
                    alt="avatar"
                />
                <h3>{currentUser[0]?.name || session?.user.email}</h3>
                <h3>{currentUser[0]?.email}</h3>
            </div>
        </Container>
    )
}