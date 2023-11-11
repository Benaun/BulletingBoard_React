import Link from "next/link";
import css from './BulletItem.module.css';
import Card from 'react-bootstrap/Card';

export default function BulletItem({ item }) {
    const { id, title, price, images, city } = item;
    return (
        <Link href={`/bullet/${id}`}>
            <Card key={id} className={css.item__card}>
                <div className={css.item__img}>
                    {images
                        ? <img src={images[0]} alt={title} />
                        : <div className={css.not__img}></div>
                    }
                </div>
                <Card.Body className={css.card__body}>
                    <Card.Title className={css.item__title}>{title ? title : "Без названия"}</Card.Title>
                    <Card.Text className={css.item__text}>
                        {price ? price : "Цена не указана"} &#8381;
                    </Card.Text >
                    <Card.Text className={css.item__price}>
                        {city ? city : "Не указан"}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
}
