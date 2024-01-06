import { useFetchAllUsersQuery } from '@/store/services/UserService';
import BulletList from '../BulletBoard/BulletList';
import { useSession } from 'next-auth/react';
import { getCurrentUser } from '@/assets/getCurrent';

export default function FavoritesBullets () {
    const { data: session } = useSession();
    const userId = session?.user.id;
    const {data: users} = useFetchAllUsersQuery();
    const currentUser = getCurrentUser(users, userId);
    const favoritesBullets = currentUser?.favorites;

    return <>
        {favoritesBullets?.length
            ? <BulletList items={favoritesBullets} />
            : <h2 style={{margin: "20px 0"}}>Нет объявлений</h2>
        }
    </>
}