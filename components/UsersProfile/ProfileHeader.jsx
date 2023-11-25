import Image from 'react-bootstrap/Image';
import css from './ProfileHeader.module.css'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';



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
        <div className="container">
            <div className={css.header__wrapper}>
                <Image
                    src={session?.user.image || '/images/avatar.svg'}
                    width={80}
                    height={80}
                    roundedCircle
                    alt="avatar"
                />
                <h2>{currentUser[0]?.name || session?.user.email}</h2>
                <h2>{currentUser[0]?.email}</h2>
            </div>
        </div>
    )
}