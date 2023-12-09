import BulletList from '../BulletBoard/BulletList';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function FavoritesBullets () {
    const { data: session } = useSession();
    const [currentUser, setCurrentUser] = useState([]);
    const [error, setError] = useState(null);
    const userId = session?.user.id;

    useEffect(() => {
        async function getFavorites() {
            try {
                const response = await fetch(`http://localhost:8000/users/${userId}`);
                if (!response.ok) throw new Error('fetch ' + response.status);
                setCurrentUser(await response.json());
                setError(null);
            } catch (err) {
                setError(err)
            }
        }
        getFavorites();
    }, [userId])

    const favoritesBullets = currentUser.favorites;

    return <>
        {favoritesBullets?.length
            ? <BulletList items={favoritesBullets} />
            : <h2 style={{margin: "20px 0"}}>Нет объявлений</h2>
        }
    </>
}