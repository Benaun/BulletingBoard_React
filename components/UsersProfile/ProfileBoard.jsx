import { useEffect, useState } from 'react';
import css from './ProfileBoard.module.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BulletList from '../BulletBoard/BulletList';
import { useSession } from 'next-auth/react';

export default function ProfileBoard() {
    const { data: session } = useSession();
    const [key, setKey] = useState('bullets');
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

    
    const filtered = bullets.filter((bullet) => bullet.owner === session?.user.email);

    return (
        <div className='container'>
            <main className={css.profile__board}>
                <Tabs
                    id="tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className={css.profile__tab}
                >
                    <Tab eventKey="bullets" title="Мои объявления">
                        {filtered.length
                            ? <BulletList items={filtered} />
                            : <h2 className={css.profile__text}>Нет объявлений</h2>
                        }

                    </Tab>
                    <Tab eventKey="favorites" title="Избранное">
                        {!filtered.length
                            ? <BulletList items={filtered}/>
                            : <h2 className={css.profile__text}>Нет избранных</h2>
                        }
                    </Tab>
                </Tabs>
            </main>
        </div>
    );
}
