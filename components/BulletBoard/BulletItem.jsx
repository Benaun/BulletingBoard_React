import Link from "next/link";
import css from './BulletItem.module.css';
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Col, Container } from "react-bootstrap";
import { useFetchAllUsersQuery, useUpdateUserFavoritesMutation } from "@/store/services/UserService";
import { useDeleteBulletMutation, useFetchAllBulletsQuery } from "@/store/services/BulletService";
import EditBulletForm from "../productForm/EditBulletForm";
import deleteFromFav from "@/assets/deleteItem";
import HeartBtn from "../UI/HeartBtn";
import DeleteBtn from "../UI/DeleteBtn";
import EditBtn from "../UI/EditBtn";
import { getCurrentUser, getCurrentBullet } from "@/assets/getCurrent";

export default function BulletItem({ item }) {
    const { data: session } = useSession();
    const userId = session?.user.id;
    const [showForm, setShowForm] = useState(false);
    const { id, title, price, image, city, owner } = item;
    const { data: bullets } = useFetchAllBulletsQuery();
    const { data: users } = useFetchAllUsersQuery();
    const currentUser = getCurrentUser(users, userId);
    const currentBullet = getCurrentBullet(bullets, id);
    const favoritesArray = currentUser?.favorites;
    const bulletInFav = favoritesArray?.find((favorite) => favorite.id != currentBullet?.id);// для удаления объявление которое есть в избранном но владелец его удалил, иначе будет ошибка
    const inFav = favoritesArray?.some((favorite) => favorite.id == currentBullet?.id);
    const [updateUserFavorites] = useUpdateUserFavoritesMutation();
    const [deleteBullet] = useDeleteBulletMutation();

    const handleToggleFavorite = async () => {
        let updatedFavorites = [...favoritesArray];
        {
            !inFav
            ? updatedFavorites = [...updatedFavorites, currentBullet]
            : bullets.includes(currentBullet)
                ? updatedFavorites = deleteFromFav(updatedFavorites, currentBullet)
                : updatedFavorites = deleteFromFav(updatedFavorites, bulletInFav)
        }
        await updateUserFavorites({ userId, favorites: updatedFavorites })
            .unwrap()
            .then((response) => {
                toast.success(!inFav ? 'Добавлено в избранное!' : 'Удалено из избранного!')
                return response
            })
            .catch((error) => {
                toast.error('Возникла проблема с вашим запросом: ' + error.message)
            })
    }

    const handleDelete = async (id) => {
        await deleteBullet(id)
            .unwrap()
            .then((response) => {
                toast.success('Объявление удалено!')
                return response
            })
            .catch((error) => {
                toast.error('Возникла проблема с вашим запросом: ' + error.message)
            })
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
                        <Card.Title className={css.item__title}>
                            {title ? title : "Без названия"}
                        </Card.Title>
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
                            ? <HeartBtn inFav={inFav} handleClick={handleToggleFavorite} />
                            : window.location.href == "http://localhost:3000/profile"
                                ? <div>
                                    <DeleteBtn handleClick={() => handleDelete(id)} />
                                    <Link href={`/editBullet/${id}`}>
                                        <EditBtn size={20} />
                                    </Link>
                                </div>
                                : <div></div>
                    }
                </Card.Body>
            </Card>
        </Col>
    )
}
