import Link from "next/link";
import css from '../BulletBoard/BulletItem.module.css';
import Card from 'react-bootstrap/Card';
import { useSession } from "next-auth/react";
import LikeBtn from "../UI/LikeBtn";
import DeleteBtn from "../UI/DeleteBtn";
import { Col, Container } from "react-bootstrap";
import { useState } from "react";
import EditBulletForm from "../productForm/EditBulletForm";


export default function UserBulletItem({ item }) {
    const [showForm, setShowForm] = useState(false);
    const { data: session } = useSession();
    const { id, title, price, image, city, owner } = item;

    const handleShowForm = () => {
        setShowForm(false)
    }
    return (
        <Col xs={8} md={6} lg={4} xl={3} className="mb-3">
            <Card key={id} className={css.item__card}>
                <Container className={css.item__img}>
                    {image
                        ? <img src={image} alt={title} />
                        : <div className={css.not__img}></div>
                    }
                </Container>
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
                    {session?.user.role === "admin" || !session
                        ? <div></div>
                        : owner !== session?.user.id
                            ? <LikeBtn width={20} height={20} fill={"#c9b6b6"} id={id} />
                            : window.location.href == "http://localhost:3000/profile"
                                ? <div>
                                    <DeleteBtn width={20} height={20} fill={"#f01010"} id={id} />
                                    <button
                                        style={{
                                            border: "none",
                                            backgroundColor: "transparent",
                                            fontSize: "25px"
                                        }}
                                        onClick={() => setShowForm(true)}
                                    >
                                        &#9997;
                                    </button>
                                </div>
                                : <div></div>
                    }
                </Card.Body>
            </Card>
            {showForm && <EditBulletForm bulletId={id} onClick={handleShowForm} />}
        </Col>
    )
}
