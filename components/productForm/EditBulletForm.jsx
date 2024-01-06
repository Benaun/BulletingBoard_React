import { useState } from "react";
import css from './ProductForm.module.css';
import { Form, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useFetchAllBulletsQuery, useUpdateBulletMutation } from "@/store/services/BulletService";
import { getCurrentBullet } from "@/assets/getCurrent";
import { useRouter } from "next/router";
import FormInput from "../UI/FormInput";

export default function EditBulletForm({ item }) {
    const router = useRouter();
    const { data: bullets } = useFetchAllBulletsQuery();
    const currentBullet = getCurrentBullet(bullets, item?.id);
    const [bullet, setBullet] = useState(currentBullet);
    const [updateBullet] = useUpdateBulletMutation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBullet(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = async (bullet) => {
        await updateBullet(bullet)
            .unwrap()
            .then((response) => {
                toast.success('Данные обновлены!')
                return response
            })
            .catch((error) => {
                toast.error('Возникла проблема с вашим запросом: ' + error.message)
            })
        router.back()
    };

    return (
        <main className={css.main}>
            <form onSubmit={() => handleFormSubmit(bullet)}>
                <div className=" flex">
                    <div className={css.content__column1}>
                        <FormInput
                            text={"Название"}
                            name={"title"}
                            value={bullet?.title}
                            handleInputChange={handleInputChange}
                        />
                        <FormInput
                            text={"Изображение"}
                            name={"image"}
                            value={bullet?.image}
                            handleInputChange={handleInputChange}
                        />
                        <FormInput
                            text={"Цена"}
                            name={"price"}
                            value={bullet?.price}
                            handleInputChange={handleInputChange}
                        />
                    </div>

                    <div className={css.content__column2}>
                        <FormInput
                            text={"Телефон"}
                            name={"phone"}
                            value={bullet?.phone}
                            handleInputChange={handleInputChange}
                        />
                        <FormInput
                            text={"Регион"}
                            name={"region"}
                            value={bullet?.region}
                            handleInputChange={handleInputChange}
                        />
                        <FormInput
                            text={"Город"}
                            name={"city"}
                            value={bullet?.city}
                            handleInputChange={handleInputChange}
                        />
                        <FormInput
                            text={"Улица"}
                            name={"street"}
                            value={bullet?.street}
                            handleInputChange={handleInputChange}
                        />
                    </div>

                    <div className={css.content__column3}>
                        <Form.Control
                            className={css.form__textarea}
                            placeholder='Краткое описание товара'
                            name="description"
                            value={bullet?.description}
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
                                onClick={() => router.back()}
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