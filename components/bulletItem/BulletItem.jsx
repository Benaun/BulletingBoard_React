import Link from "next/link";
import css from "./BulletItem.module.css"

export default function BulletItem({ item }) {
    const { id, name, price, place } = item;
    return (
        <Link href={`/bulletCard`}>
            <div key={id} className={css.item__card}>
                <div className={css.item__img}></div>
                <div className={css.item__description}>
                    <h3 className={css.item__title}>{name}</h3>
                    <p className={[css.item__text, css.item__price].join(' ')}>{price}</p>
                    <p className={[css.item__text, css.item__info].join(' ')}>{place}</p>
                </div>
            </div>
        </Link>
    )
}
