
import BulletList from "../bulletList/BulltetList";
import SearchBar from "../searchbar/SearchBar";
import bullets from '../../assets/bullets'

import css from "./Board.module.css";
import { useState } from "react";

export default function Board({ }) {

    const [searchValue, setSearchValue] = useState('');
    const [filteredBullet, setFilteredBullets] = useState(bullets);

    const handleSearchValue = (value) => {
        setSearchValue(value);
    };


    return (
        <main>
            <div className={css.container}>
                <div>
                    {/* <SearchBar searchValue={searchValue} onSearch={handleSearchValue} />
                    <BulletList items={filteredBullet} /> */}
                </div>
            </div>
        </main>
    )
}