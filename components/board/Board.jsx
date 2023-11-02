import BulletList from "../bulletList/BulltetList";
import SearchBar from "../searchbar/SearchBar";
import categories from '../../assets/categories'

import css from "./Board.module.css";
import { useEffect, useState } from "react";
import CategoriesList from "../categoriesList/CategoriesList";

const API = 'http://localhost:8000/bullets';

export default function Board({ }) {
    const [searchValue, setSearchValue] = useState('');
    const [bullets, setBullets] = useState([]);
    const [filterFunction, setfilterFunction] = useState(_ => a => true);
    const [error, setError] = useState(null);

    console.log('filterFunction = ', filterFunction)

    useEffect(() => {
        async function getBullets() {
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
    }, []);
    if (error) return <div>Ошибка: {error.message}</div>;

    const handleSearchValue = (value) => {
        setSearchValue(value);
    };

    const filtered = bullets
    .filter(filterFunction)
    .filter((bullet) =>bullet.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    function onClick(evt) {
        const source = evt.target.closest('button[data-action]');
        if (source) {
            const { action, id } = source.dataset;
            if (action == "Все") {
                setfilterFunction(_ => a => true) 
            } else {
                setfilterFunction(_ => el => el.category == action)
            }
        };
    };


    return (
        <main>
            <div className={css.container} onClick={onClick}>
                <div>
                    <SearchBar searchValue={searchValue} onSearch={handleSearchValue} />
                    <CategoriesList items={categories} />
                    <BulletList items={filtered} />
                </div>
            </div>
        </main>
    )
}
