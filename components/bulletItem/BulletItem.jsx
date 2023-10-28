import css from "./BulletItem.module.css"

export default function BulletItem({ item }) {
    const { id, title, price, images, address: { city } } = item;
    return (
        <div key={id} className={css.item__card}>
            <div className={css.item__img}>
                <img src={images[0]} alt={title} />
            </div>
            <div className={css.item__description}>
                <h3 className={css.item__title}>{title}</h3>
                <p className={[css.item__text, css.item__price].join(' ')}>{price} &#8381;</p>
                <p className={[css.item__text, css.item__info].join(' ')}>{city}</p>
            </div>
        </div>
    )
}
