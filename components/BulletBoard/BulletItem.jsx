import Link from "next/link";
import css from './BulletItem.module.css'

export default function BulletItem({ item }) {
    const { id, title, price, images, address: { city } } = item;
    return (
        <Link href={`/bullet/${id}`}>
            <div key={id} className={css.item__card}>
                <div className={css.item__img}>
                    {
                        images
                        ? <img src={images[0]} alt={title} />
                        : <div className={css.not__img}></div>
                    }
                    
                </div>
                <div className={css.item__description}>
                    <h3 className={css.item__title}>{title ? title : "Без названия"}</h3>
                    <p className={[css.item__text, css.item__price].join(' ')}>{price ? price : "Цена не указана"} &#8381;</p>
                    <p className={[css.item__text, css.item__info].join(' ')}>{city ? city : "Не указан"}</p>
                </div>
            </div>
        </Link>
    )
}
