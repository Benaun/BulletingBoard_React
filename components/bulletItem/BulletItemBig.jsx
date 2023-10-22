import Link from "next/link"
import css from "./BulletItem.module.css"

export default function BulletItemBig({ }) {
    return (
        <div className={css.container}>
            <Link  className={css.link} href={'/'}>
                <h2>На главную</h2>
            </Link>
            <div className={css.content}>
                <div className={css.left}>
                    <h2 className={css.left__title}>Ghbdtn</h2>
                    <div className={css.left__img}></div>
                    <div className={css.left__descr}>
                        <h2>Адрес</h2>
                        <p>Ставроплль, 50 лет ВЛКСМ, 52</p>
                        <h2>Описание</h2>
                        <p>Ставроплль, 50 лет ВЛКСМ, 52Ставроплль, 50 лет ВЛКСМ, 52Ставроплль, 50 лет ВЛКСМ, 52Ставроплль, 50 лет ВЛКСМ, 52Ставроплль, 50 лет ВЛКСМ, 52</p>
                    </div>
                </div>

                <div className={css.right}>
                    <h2 className={css.right__price}>15000 P</h2>
                    <button className={[css.right__btn, css.btn__purple].join(' ')}>Купить с доставкой</button>
                    <div className={css.right__descr}>
                        <p><span className={css.delivery__icon}></span>Доставка компанией</p>
                        <p><span className={css.pay__icon}></span>Оплата при получении</p>
                        <p><span className={css.refund__icon}></span>Возврат денежных средств</p>
                    </div>
                    <button className={[css.right__btn, css.btn__green].join(' ')}>
                        <span>Позвонить</span><br />
                        <span>+7 962 XXX XX XX</span>
                    </button>
                    <button className={[css.right__btn, css.btn__blue].join(' ')}>Написать сообщение</button>
                </div>
            </div>
        </div>

    )
}