import Link from "next/link"
import css from "./BulletCard.module.css";
import { useState } from "react";
import Image from "next/image";


export default function BulletCard({ item }) {
    const [visible, setVisible] = useState(false);
    const { title, images, price, email, phone, description, region, city, street } = item;
    return (
        <div className={css.container}>
            <div className={css.content}>
                <div className={css.left}>

                    <h2 className={css.left__title}>{title}</h2>
                    <div className={css.left__img}>
                        {images
                            ? <img src={images[0]} alt={title} />
                            : <Image src={"/images/not.jpg"} alt="not" width={500} height={500} />
                        }

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
                        <p><span className={css.icon}>
                            <Image src={"/icons/delivery.svg"} alt="delivery" width={25} height={25} />
                        </span>Доставка компанией</p>
                        <p><span className={css.icon}>
                            <Image src={"/icons/coins.svg"} alt="coins" width={25} height={25} />
                        </span>Оплата при получении</p>
                        <p><span className={css.icon}>
                            <Image src={"/icons/back.svg"} alt="refund" width={25} height={25} />
                        </span>Возврат денежных средств</p>
                    </div>
                    <button onClick={() => setVisible(true)} className={[css.right__btn, css.btn__green].join(' ')}>
                        <span>Показать номер</span><br />
                        {!visible
                            ? <span>+7 XXX XXX XX XX</span>
                            : <span>{phone}</span>}
                    </button>
                    <button className={[css.right__btn, css.btn__blue].join(' ')}>
                        <span>Написать сообщение</span><br />
                        <span>{email}</span>
                    </button>
                </div>
                <div>
                    <Link className={css.link} href={'/'}>
                        <p>&lArr; На главную</p>
                    </Link>
                </div>
            </div>
        </div>

    )
}