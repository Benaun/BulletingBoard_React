import css from "./BulletItem.module.css"


export default function BulletItem({ item }) {
    const { id, name, price, description } = item;
    return (
        <div className={css.item__card}>
            <img className={css.item__img} src="../../assets/images/brak.jpg" alt={name} />
            <div className={css.item__description}>
                <h3 className={css.item__title}>{name}</h3>
                <p className={css.item__text}> Price: {price}</p>
                <p className={css.item__text}> Description: {description}</p>
            </div>
        </div>
    )
}
