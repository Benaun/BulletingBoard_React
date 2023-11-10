import css from './CategoriesList.module.css'
import CategoriesItem from './CategoriesItem'
import { useState } from 'react'

export default function CategoriesList({ items }) {
    const [activeItem, setActiveItem] = useState(0);

    return (
        <div className={css.container}>
            <ul className={css.categories__list}>
                {items.map((item, id) =>
                    <CategoriesItem
                        key={id}
                        item={item}
                        active={id === activeItem}
                        onClick={()=> setActiveItem(id)}
                    />
                )}
            </ul>
        </div>
    )
}