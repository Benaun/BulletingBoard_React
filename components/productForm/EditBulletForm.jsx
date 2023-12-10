import { useState, useEffect } from "react";
import css from './ProductForm.module.css';
import { InputGroup, Form, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';

export default function EditBulletForm({ bulletId, onClick }) {
    const [bullet, setBullet] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getBullet() {
            try {
                const response = await fetch(`http://localhost:8000/bullets/${bulletId}`);
                if (!response.ok) throw new Error('fetch ' + response.status);
                setBullet(await response.json());
                setError(null);
            } catch (err) {
                setError(err)
            }
        }
        getBullet();
    }, [bulletId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBullet(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8000/bullets/${bulletId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bullet),
        })
            .then(response => {
                if (response.ok) {
                    toast.success("Объявление изменено!")
                    window.location.reload();
                } else {
                    throw new Error('Failed to update user data');
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <main className={css.main}>
            <form onSubmit={handleFormSubmit} className={css.form}>
                <div className={css.form__content}>
                    <div className={css.content__column1}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                Название
                            </InputGroup.Text>
                            <Form.Control
                                name="title"
                                value={bullet.title}
                                onChange={handleInputChange}
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                Изображение
                            </InputGroup.Text>
                            <Form.Control
                                name="image"
                                value={bullet.image}
                                onChange={handleInputChange}
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                Цена
                            </InputGroup.Text>
                            <Form.Control
                                name="price"
                                value={bullet.price}
                                onChange={handleInputChange}
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                    </div>
                    <div className={css.content__column2}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                Телефон
                            </InputGroup.Text>
                            <Form.Control
                                name="phone"
                                value={bullet.phone}
                                onChange={handleInputChange}
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                Регион
                            </InputGroup.Text>
                            <Form.Control
                                name="region"
                                value={bullet.region}
                                onChange={handleInputChange}
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                Город
                            </InputGroup.Text>
                            <Form.Control
                                name="city"
                                value={bullet.city}
                                onChange={handleInputChange}
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                Улица
                            </InputGroup.Text>
                            <Form.Control
                                name="street"
                                value={bullet.street}
                                onChange={handleInputChange}
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                    </div>
                    <div className={css.content__column3}>
                        <Form.Control
                            className={css.form__textarea}
                            placeholder='Краткое описание товара'
                            name="description"
                            value={bullet.description}
                            onChange={handleInputChange}
                            aria-describedby="inputGroup-sizing-default"
                            as="textarea"
                        />
                        <div>
                            <Button
                                className={css.btn__submit}
                                variant="success"
                                type="submit"
                            >
                                Подтвердить
                            </Button>
                            <Button
                                className={css.btn__submit}
                                variant="warning"
                                onClick={onClick}
                            >
                                Отменить
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    )
}