import BulletList from './BulletList';
import SearchBar from '../Searchbar/SearchBar';
import categories from '@/assets/categories'

import css from "./BulletBoard.module.css";
import { useEffect, useState } from "react";
import CategoriesList from "../Categories/CategoriesList";
import HeartBtn from '../UI/HeartBtn';

const API = 'http://localhost:8000/bullets';

export default function BulletBoard({ }) {
    const [searchValue, setSearchValue] = useState('');
    const [bullets, setBullets] = useState([]);
    const [filterFunction, setfilterFunction] = useState(_ => a => true);
    const [error, setError] = useState(null);

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

    const handleSearchValue = (value) => {
        setSearchValue(value);
    };


    const filtered = bullets
        .filter(filterFunction)
        .filter((bullet) => bullet.title.toLowerCase().includes(searchValue.toLowerCase())
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
        <main className={css.bullet__board}>
            <div onClick={onClick}>
                <div>
                    <SearchBar
                        searchValue={searchValue}
                        onSearch={handleSearchValue}
                        onClick={() => setSearchValue('')}
                    />
                    <CategoriesList items={categories} />
                    <BulletList items={filtered}>
                        <HeartBtn width={20} height={20} fill={"gray"}/>
                    </BulletList>
                </div>
            </div>
        </main>
    )
}
