import BulletList from './BulletList';
import SearchBar from '../Searchbar/SearchBar';
import categories from '@/assets/categories'
import css from "./BulletBoard.module.css";
import CategoriesList from "../Categories/CategoriesList";

import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const API = 'http://localhost:8000/bullets/';

export default function BulletBoard() {
    const [searchValue, setSearchValue] = useState('');
    const [isLiked, setIsliked] = useState(false);
    const [bullets, setBullets] = useState([]);
    const [filterFunction, setfilterFunction] = useState(_ => a => true);
    const [error, setError] = useState(null);
    const { data: session } = useSession();

    useEffect(() => {
        async function getBullets() {
            try {
                const response = await fetch(API);
                if (!response.ok) throw new Error('fetch ' + response.status);
                setBullets(await response.json());
                setError(null);
            } catch (err) {
                setError(err)
            }
        }
        getBullets();
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
                const currentBullet = bullets.find(bullet => bullet.id == id)
                if (!isLiked) {
                    return fetch(`http://localhost:8000/favorites/`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            inFav: userId,
                            ...currentBullet
                        })
                    })
                        .then(async res => {
                            if (!res.ok) {
                                throw (new Error(res.status + ' ' + res.statusText));
                            }
                            toast.success("Добавлено в избранное!")
                            setIsliked(!isLiked)
                        });
                } else {
                    return fetch(`http://localhost:8000/favorites/${currentBullet}`, 
                    { method: "DELETE"})
                    .then(async res => {
                        if (!res.ok) {
                            throw (new Error(res.status + ' ' + res.statusText));
                        }
                        toast.success("Удалено из избранного избранное!")
                    });
                }

            }
            if (action == "Все") {
                setfilterFunction(_ => a => true)
            }
            else {
                setfilterFunction(_ => el => el.category == action)
            };
        }
    };

    return (
        <main className={css.bullet__board}>
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
    )
};


