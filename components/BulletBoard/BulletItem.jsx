import Link from "next/link";
import css from './BulletItem.module.css';
import Card from 'react-bootstrap/Card';
import { useSession } from "next-auth/react";
import LikeBtn from "../UI/LikeBtn";
import DeleteBtn from "../UI/DeleteBtn";
import { memo, useState } from "react";


export default memo(function BulletItem({ item }) {
    const { data: session } = useSession();
    const { id, title, price, image, city, owner } = item;
    const [isActive, setIsActive] = useState(false);

    const handleClick = (event) => {
        setIsActive(current => !current)
    }

    return (
        <Card key={id} className={css.item__card}>
            <div className={css.item__img}>
                {image
                    ? <img src={image} alt={title} />
                    : <div className={css.not__img}></div>
                }
            </div>
            <Card.Body className={css.card__body}>
                <Link href={`/bullet/${id}`}>
                    <Card.Title className={css.item__title}>{title ? title : "Без названия"}</Card.Title>
                    <Card.Text className={css.item__text}>
                        {price ? price : "Цена не указана"} &#8381;
                    </Card.Text >
                    <Card.Text className={css.item__text}>
                        {city ? city : "Не указан"}
                    </Card.Text>
                </Link>
                {session?.user.email === "admin@mail.ru" || !session
                    ? <div></div>
                    : owner !== session?.user.id
                        ? <LikeBtn width={20} height={20} fill={isActive ? "#f01010" :"#c9b6b6"} id={id} onClick={handleClick}/>
                        : <DeleteBtn width={20} height={20} fill={"#f01010"} id={id}/>
                }
            </Card.Body>
        </Card>
    )
}) 
