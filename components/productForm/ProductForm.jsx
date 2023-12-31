import css from './ProductForm.module.css';
import categories from "@/assets/categories";
import Select from '../UI/Select';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useCreateBulletMutation } from '@/store/services/BulletService';

export default function ProductForm() {
    const { handleSubmit, register, reset } = useForm();
    const { data: session } = useSession();
    const [createBullet] = useCreateBulletMutation();

    const addPostHandler = async (data) => {
        await createBullet({
            id: Math.round(Math.random() * 100),
            owner: session.user.id,
            email: session.user.email,
            ...data
        })
            .unwrap()
            .then(toast.success("Объявление создано!"))
            .catch((error) => toast.error("Что-то пошло не так...", error))
        reset();
        console.log(data)
    }

    return (
        <main className={css.main}>
            <div className="container">
                <form onSubmit={handleSubmit(addPostHandler)} action="">
                    <h2>Разместить объявление</h2>
                    <div className={css.form__content}>
                        <div className={css.content__column1}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Название<span style={{ color: "red" }}>*</span>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    {...register('title')}
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Изображение
                                </InputGroup.Text>
                                <Form.Control
                                    {...register('image')}
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Цена<span style={{ color: "red" }}>*</span>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    {...register('price')}
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                            <Select required register={register} list={categories} formKey={'category'} />
                        </div>
                        <div className={css.content__column2}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Телефон<span style={{ color: "red" }}>*</span>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    {...register('phone')}
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Регион<span style={{ color: "red" }}>*</span>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    {...register('region')}
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Город<span style={{ color: "red" }}>*</span>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    {...register('city')}
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    Улица<span style={{ color: "red" }}>*</span>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    {...register('street')}
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                        </div>
                        <div className={css.content__column3}>
                            <Form.Control
                                className={css.form__textarea}
                                placeholder='Краткое описание товара'
                                required
                                {...register('description')}
                                aria-describedby="inputGroup-sizing-default"
                                as="textarea"
                            />
                            <Button className={css.btn__submit} variant="success" type="submit">Разместить объявление</Button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}
