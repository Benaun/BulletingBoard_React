import css from './CategoriesItem.module.css'

export default function CategoriesItem({ item }) {
    const { id, img, name } = item;
    return (
        <li key={id} className={css.item__card}>
            <button className={css.item__img} data-action={name}>
                <img src={img} alt={name} />
            </button>
            <p className={css.item__title}>{name}</p>
        </li>
    )
}