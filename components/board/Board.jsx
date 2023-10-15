import BulletList from "../bulletList/BulltetList";
import SearchBar from "../searchbar/SearchBar";
import bullets from '../../assets/bullets';
import categories from '../../assets/categories'

import css from "./Board.module.css";
import { useState } from "react";
import CategoriesList from "../categoriesList/CategoriesList";

export default function Board({ }) {

    const [searchValue, setSearchValue] = useState('');
    // const [filteredBullet, setFilteredBullets] = useState(bullets);

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