import css from "./BulletCard.module.css";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";


export default function BulletCard({ item }) {
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const { title, image, price, phone, description, region, city, street } = item;
    return (
        <Container fluid className="mt-4">
            <Row className="d-flex justify-content-between">
                <Col lg={3} xl={6}>
                    <h2 className={css.left__title}>{title}</h2>
                    <div className={css.left__img}>
                        {image
                            ? <img src={image} alt={title} />
                            : <Image src={"/images/not.jpg"} alt="not" width={500} height={500} />
                        }
                    </div>
                    <div className={css.left__descr}>
                        <h2>Адрес</h2>
                        <p>{region}, {city}, {street}</p>
                        <h2>Описание</h2>
                        <p>{description}</p>
                    </div>
                </Col>

                <Col xs={3}>
                    <h2 className={css.right__price}>{price} &#8381;</h2>
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
                </Col>
                <Col xs={1} className="d-flex justify-content-end align-items-start">
                    <button
                        onClick={() => router.back()}
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "25px"
                        }}
                    >
                        &lArr;
                    </button>
                </Col>
            </Row>
        </Container>
    )
}