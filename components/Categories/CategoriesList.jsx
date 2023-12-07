import css from './CategoriesList.module.css'
import CategoriesItem from './CategoriesItem'
import { useState } from 'react'
import { Container, Row } from 'react-bootstrap';

export default function CategoriesList({ items }) {
    const [activeItem, setActiveItem] = useState(0);

    return (
        <Container fluid className='mt-4'>
            <Row className={css.categories__list}>
                {items.map((item, id) =>
                    <CategoriesItem
                        key={id}
                        item={item}
                        active={id === activeItem}
                        onClick={()=> setActiveItem(id)}
                    />
                )}
            </Row>
        </Container>
    )
}