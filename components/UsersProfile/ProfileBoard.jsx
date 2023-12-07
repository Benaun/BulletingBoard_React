import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserBullets from './UserBullets';
import FavoritesBullets from './FavoriteBullets';
import toast from 'react-hot-toast';
import { Container } from 'react-bootstrap';

export default function ProfileBoard() {
    const [key, setKey] = useState('bullets');
    const [isLiked, setIsliked] = useState(true);

    async function onClick(evt) {
        const source = evt.target.closest('button[data-action]');
        if (source) {
            const { action, id } = source.dataset;

            if (action == "delete") {
                try {
                    const response = await fetch(`http://localhost:8000/bullets/${id}`,
                    {method: "DELETE"});
                    if (!response.ok) throw new Error('fetch ' + response.status);
                    toast.success("Объявление удалено!")
                    return await response.json();
                } catch (error) {
                    toast.error("Возникла проблема с вашим fetch запросом: ", error.message);
                }
                // return fetch(`http://localhost:8000/bullets/${id}`,
                //     { method: "DELETE" })
                //     .then(async res => {
                //         if (!res.ok) {
                //             throw (new Error(res.status + ' ' + res.statusText));
                //         }
                //         toast.success("Объявление удалено!")
                //     });
            }
            if (action == "like") {
                if (isLiked) {
                    try {
                        const response = await fetch(`http://localhost:8000/favorites/${id}`,
                        {method: "DELETE"});
                        if (!response.ok) throw new Error('fetch ' + response.status);
                        toast.success("Удалено из избранного избранное!")
                        return await response.json();
                    } catch (error) {
                        toast.error("Возникла проблема с вашим fetch запросом: ", error.message);
                    }
                    // return fetch(`http://localhost:8000/favorites/${id}`, 
                    // { method: "DELETE"})
                    // .then(async res => {
                    //     if (!res.ok) {
                    //         throw (new Error(res.status + ' ' + res.statusText));
                    //     }
                    //     toast.success("Удалено из избранного избранное!")
                    // });
                }
            }
        }
    };

    return (
        <Container fluid className='mt-4' onClick={onClick}>
            <main>
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
