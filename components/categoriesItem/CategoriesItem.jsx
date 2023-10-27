import css from './CategoriesItem.module.css'

export default function CategoriesItem({ item }) {
    const { id, img, name } = item;
    return (
        <li key={id} className={css.item__card}>
            <div className={css.item__img}>
                <img src={img} alt={name} />
            </div>
            <p className={css.item__title}>{name}</p>
        </li>
    )
}