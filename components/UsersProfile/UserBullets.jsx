import BulletList from '../BulletBoard/BulletList';
import css from './ProfileBoard.module.css';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function UserBullets () {
    const { data: session } = useSession();
    const [bullets, setBullets] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getBullets() {
            try {
                const response = await fetch('http://localhost:8000/bullets');
                if (!response.ok) throw new Error('fetch ' + response.status);
                setBullets(await response.json());
                setError(null);
            } catch (err) {
                setError(err)
            }
        }
        getBullets();
    }, [])

    const filtered = bullets.filter((bullet) => bullet.owner === session?.user.id);

    return <>
        {filtered.length
            ? <BulletList items={filtered} />
            : <h2 className={css.profile__text}>Нет объявлений</h2>
        }
    </>
}