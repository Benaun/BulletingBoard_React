import css from './CategoriesList.module.css'
import CategoriesItem from '../categoriesItem/CategoriesItem'

export default function CategoriesList({ items }) {
    return (
        <div className={css.container}>
            <ul className={css.categories__list}>
                {items.map((item)=>
                    <CategoriesItem key={item.id} item={item}/>
                )}
            </ul>
        </div>
    )
}