import BulletList from './BulletList';
import SearchBar from '../UI/SearchBar';
import CategoriesList from "../Categories/CategoriesList";
import { useState } from "react";
import { Container } from 'react-bootstrap';
import { useFetchAllBulletsQuery } from '@/store/services/BulletService';


export default function BulletBoard() {
    const [searchValue, setSearchValue] = useState('');
    const [filterFunction, setfilterFunction] = useState(_ => a => true);
    const {data: bullets} = useFetchAllBulletsQuery();
    const handleSearchValue = (value) => {
        setSearchValue(value);
    };

    const filtered = bullets?.filter(filterFunction)
        .filter((bullet) => bullet.title.toLowerCase().includes(searchValue.toLowerCase())
        );

    async function onClick(evt) {
        const source = evt.target.closest('button[data-action]');
        if (source) {
            const { action } = source.dataset;
            if (action == "Все") {
                setfilterFunction(_ => a => true)
            } else {
                setfilterFunction(_ => el => el.category == action)
            };
        }
    };

    return (
        <Container fluid className='mt-4'>
            <main style={{ minHeight: "80.4vh" }}>
                <div onClick={onClick}>
                    <div>
                        <SearchBar
                            searchValue={searchValue}
                            onSearch={handleSearchValue}
                            onClick={() => setSearchValue('')}
                        />
                        <CategoriesList />
                        <BulletList items={filtered} />
                    </div>
                </div>
            </main>
        </Container>
    )
};
