import BulletList from './BulletList';
import SearchBar from '../UI/SearchBar';
import categories from '@/assets/categories'
import CategoriesList from "../Categories/CategoriesList";
import deleteFromFav from '@/assets/deleteItem';
import addToFav from '@/assets/addItem';
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { Container } from 'react-bootstrap';

const API_BULLETS = 'http://localhost:8000/bullets/';
const API_USERS = 'http://localhost:8000/users/';

export default function BulletBoard() {
    const [searchValue, setSearchValue] = useState('');
    const [bullets, setBullets] = useState([]);
    const [users, setUsers] = useState([]);
    const [filterFunction, setfilterFunction] = useState(_ => a => true);
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

    const handleSearchValue = (value) => {
        setSearchValue(value);
    };

    const filtered = bullets
        .filter(filterFunction)
        .filter((bullet) => bullet.title.toLowerCase().includes(searchValue.toLowerCase())
        );

    

    async function onClick(evt) {
        const source = evt.target.closest('button[data-action]');
        if (source) {
            const { action, id } = source.dataset;

            if (action == "delete") {
                return fetch(API + id,
                    { method: "DELETE" })
                    .then(async res => {
                        if (!res.ok) {
                            throw (new Error(res.status + ' ' + res.statusText));
                        }
                        toast.success("Объявление удалено!")
                    });
            }
            if (action == "like") {
                const userId = session.user.id;
                const currentBullet = bullets.find(bullet => bullet.id == id);
                const currentUser = users?.find(user => user.id == userId);
                const favoritesArray = currentUser.favorites;
                const inFav = favoritesArray?.find(favorite => favorite.id == currentBullet.id);
                if (!inFav) {
                    try {
                        const response = await fetch(`http://localhost:8000/users/${userId}`,
                            {
                                method: "PATCH",
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    favorites: addToFav(favoritesArray, currentBullet)
                                })
                            })
                        if (!response.ok) throw new Error('fetch ' + response.status);
                        toast.success("Добавлено в избранное!")
                        return await response.json();
                    } catch (error) {
                        toast.error("Возникла проблема с вашим fetch запросом: ", error.message);
                    }
                } else {
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

            if (action == "Все") {
                setfilterFunction(_ => a => true)
            } else {
                setfilterFunction(_ => el => el.category == action)
            };
        }
    };

    return (
        <Container fluid className='mt-4'>
            <main style={{minHeight: "80.4vh"}}>
                <div onClick={onClick}>
                    <div>
                        <SearchBar
                            searchValue={searchValue}
                            onSearch={handleSearchValue}
                            onClick={() => setSearchValue('')}
                        />
                        <CategoriesList items={categories} />
                        <BulletList items={filtered} />
                    </div>
                </div>
            </main>
        </Container>
    )
};
