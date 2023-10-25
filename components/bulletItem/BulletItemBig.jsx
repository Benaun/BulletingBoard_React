import Link from "next/link"
import css from "./BulletItem.module.css"

export default function BulletItemBig({item}) {
    const {title, images, price, email, phone, description, address: {region, city, street}} = item;
    return (
        <div className={css.container}>
            <Link  className={css.link} href={'/'}>
                <h2>На главную</h2>
            </Link>
            <div className={css.content}>
                <div className={css.left}>
                    <h2 className={css.left__title}>{title}</h2>
                    <div className={css.left__img}>
                        <img src={images[0]} alt={title} />
                    </div>
                    <div className={css.left__descr}>
                        <h2>Адрес</h2>
                        <p>{region}, {city}, {street}</p>
                        <h2>Описание</h2>
                        <p>{description}</p>
                    </div>
                </div>

                <div className={css.right}>
                    <h2 className={css.right__price}>{price} &#8381;</h2>
                    <button className={[css.right__btn, css.btn__purple].join(' ')}>Купить с доставкой</button>
                    <div className={css.right__descr}>
                        <p><span className={css.delivery__icon}></span>Доставка компанией</p>
                        <p><span className={css.pay__icon}></span>Оплата при получении</p>
                        <p><span className={css.refund__icon}></span>Возврат денежных средств</p>
                    </div>
                    <button className={[css.right__btn, css.btn__green].join(' ')}>
                        <span>Показать номер</span><br />
                        <span>{phone}</span>
                    </button>
                    <button className={[css.right__btn, css.btn__blue].join(' ')}>
                       <span>Написать сообщение</span><br />
                        <span>{email}</span>
                    </button>
                </div>
            </div>
        </div>

    )
}