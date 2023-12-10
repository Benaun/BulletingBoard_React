import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { InputGroup, Form, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import css from './UserEditForm.module.css';

export default function UserEditForm() {
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { data: session } = useSession();
    const userId = session?.user.id;

    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch(`http://localhost:8000/users/${userId}`);
                if (!response.ok) throw new Error('fetch ' + response.status);
                setUser(await response.json());
                setError(null);
            } catch (err) {
                setError(err)
            }
        }
        getUser();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                if (response.ok) {
                    toast.success("Данные пользователя изменены!")
                } else {
                    throw new Error('Failed to update user data');
                }
            })
            .catch(error => console.error(error));
    };


    return (
        <main className={css.main}>
            <form onSubmit={handleFormSubmit}>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default" >
                        Имя
                    </InputGroup.Text>
                    <Form.Control
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default" >
                        Email
                    </InputGroup.Text>
                    <Form.Control
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default" >
                        Пароль
                    </InputGroup.Text>
                    <Form.Control
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>
                <div>
                    <Button
                        className={css.btn__submit}
                        variant="success"
                        type="submit"
                        onClick={() => router.back()}
                    >
                        Подтвердить
                    </Button>
                    <Button
                        className={css.btn__submit}
                        variant="warning"
                        onClick={() => router.back()}
                    >
                        Отменить
                    </Button>
                </div>
            </form>
        </main>
    );
}