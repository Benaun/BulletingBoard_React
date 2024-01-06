import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import css from './UserEditForm.module.css';
import { useFetchAllUsersQuery, useUpdateUserMutation } from "@/store/services/UserService";
import { getCurrentUser } from "@/assets/getCurrent";
import FormInput from "../UI/FormInput";

export default function UserEditForm({ item }) {
    const router = useRouter();
    const { data: users } = useFetchAllUsersQuery();
    const currentUser = getCurrentUser(users, item?.id);
    const [user, setUser] = useState(currentUser);
    const [updateUser] = useUpdateUserMutation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = async (user) => {
        await updateUser(user)
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
            <form onSubmit={() => handleFormSubmit(user)}>
                <FormInput
                    text={"Имя"}
                    name={"name"}
                    value={user?.name}
                    handleInputChange={handleInputChange}
                />

                <FormInput
                    text={"Email"}
                    name={"email"}
                    value={user?.email}
                    handleInputChange={handleInputChange}
                />

                <FormInput
                    text={"Пароль"}
                    name={"password"}
                    value={user?.password}
                    handleInputChange={handleInputChange}
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
            </form>
        </main>
    );
}