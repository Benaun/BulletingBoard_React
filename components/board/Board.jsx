import BulletList from "../bulletList/BulltetList";
import SearchBar from "../searchbar/SearchBar";
import categories from '../../assets/categories'

import css from "./Board.module.css";
import { useEffect, useState } from "react";
import CategoriesList from "../categoriesList/CategoriesList";

const API = 'http://localhost:8000/bullets';

export default function Board({}) {
    const [searchValue, setSearchValue] = useState('');
    const [bullets, setBullets] = useState([]);
    const [error, setError] = useState(null);

    useEffect (()=> {
        async function getBullets () {
            try {
                const response = await fetch(`${API}`);
                if (!response.ok) throw new Error('fetch ' + response.status);
                setBullets(await response.json());
                setError(null);
            } catch (err) {
                setError(err)
            }
        }
        getBullets();
    }, [bullets]);
    if (error) return <div>Ошибка: {error.message}</div>;
    
    const handleSearchValue = (value) => {
        setSearchValue(value);
    };


    return (
        <main>
            <div className={css.container}>
                <div>
                    <SearchBar searchValue={searchValue} onSearch={handleSearchValue} />
                    <CategoriesList items={categories} />
                    <BulletList items={bullets} />
                </div>
            </div>
        </main>
    )
}