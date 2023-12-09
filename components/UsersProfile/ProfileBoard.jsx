import { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserBullets from './UserBullets';
import FavoritesBullets from './FavoriteBullets';
import deleteFromFav from '@/assets/deleteItem';
import toast from 'react-hot-toast';
import { Container } from 'react-bootstrap';
import { useSession } from 'next-auth/react';

const API_BULLETS = 'http://localhost:8000/bullets/';
const API_USERS = 'http://localhost:8000/users/';

export default function ProfileBoard() {
    const [key, setKey] = useState('bullets');
    const [bullets, setBullets] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const { data: session } = useSession();

    useEffect(() => {
        async function getBullets() {
            try {
                const response = await fetch(API_BULLETS);
                if (!response.ok) throw new Error('fetch ' + response.status);
                setBullets(await response.json());
                setError(null);
            } catch (err) {
                setError(err)
            }
        }
        getBullets();

        async function getUsers() {
            try {
                const response = await fetch(API_USERS);
                if (!response.ok) throw new Error('fetch ' + response.status);
                setUsers(await response.json());
                setError(null);
            } catch (err) {
                setError(err)
            }
        }
        getUsers();
    }, []);

    async function onClick(evt) {
        const source = evt.target.closest('button[data-action]');
        if (source) {
            const { action, id } = source.dataset;

            if (action == "delete") {
                try {
                    const response = await fetch(`http://localhost:8000/bullets/${id}`,
                        { method: "DELETE" });
                    if (!response.ok) throw new Error('fetch ' + response.status);
                    toast.success("Объявление удалено!")
                    return await response.json();
                } catch (error) {
                    toast.error("Возникла проблема с вашим fetch запросом: ", error.message);
                }
            }

            if (action == "like") {
                const userId = session.user.id;
                const currentBullet = bullets.find(bullet => bullet.id == id);
                const currentUser = users?.find(user => user.id == userId);
                const favoritesArray = currentUser.favorites;
                const inFav = favoritesArray?.find(favorite => favorite.id == currentBullet.id);
                if (inFav) {
                    try {
                        const response = await fetch(`http://localhost:8000/users/${userId}`,
                            {
                                method: "PATCH",
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    favorites: deleteFromFav(favoritesArray, currentBullet)
                                })
                            })
                        if (!response.ok) throw new Error('fetch ' + response.status);
                        toast.success("Удалено из избранного!")
                        return await response.json();
                    } catch (error) {
                        toast.error("Возникла проблема с вашим fetch запросом: ", error.message);
                    }
                }
            }
        }
    };

    return (
        <Container fluid className='mt-4' onClick={onClick}>
            <main style={{minHeight: "76vh"}}>
                <Tabs
                    id="tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="bullets" title="Мои объявления">
                        <UserBullets />
                    </Tab>
                    <Tab eventKey="favorites" title="Избранное">
                        <FavoritesBullets />
                    </Tab>
                </Tabs>
            </main>
        </Container>
    );
}
