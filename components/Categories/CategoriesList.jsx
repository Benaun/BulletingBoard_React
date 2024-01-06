import css from './CategoriesList.module.css';
import categories from '@/assets/categories';
import CategoriesItem from './CategoriesItem';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';

export default function CategoriesList() {
    const [activeItem, setActiveItem] = useState(0);

    return (
        <Container fluid className='mt-4'>
            <Row className={css.categories__list}>
                {categories.map((category, id) =>
                    <CategoriesItem
                        key={id}
                        item={category}
                        active={id === activeItem}
                        onClick={()=> setActiveItem(id)}
                    />
                )}
            </Row>
        </Container>
    )
}