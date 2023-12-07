import BulletList from '../BulletBoard/BulletList';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function FavoritesBullets () {
    const { data: session } = useSession();
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getFavorites() {
            try {
                const response = await fetch('http://localhost:8000/favorites');
                if (!response.ok) throw new Error('fetch ' + response.status);
                setFavorites(await response.json());
                setError(null);
            } catch (err) {
                setError(err)
            }
        }
        getFavorites();
    }, [])

    const filtered = favorites.filter((favorite) => favorite.inFav === session?.user.id);

    return <>
        {filtered.length
            ? <BulletList items={filtered} />
            : <h2 style={{margin: "20px 0"}}>Нет объявлений</h2>
        }
    </>
}