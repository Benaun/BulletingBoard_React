import { useSession } from 'next-auth/react';
import UserBulletList from './UserBulletList';
import { useFetchAllBulletsQuery } from '@/store/services/BulletService';

export default function UserBullets () {
    const { data: session } = useSession();
    const {data: bullets} = useFetchAllBulletsQuery();

    const filtered = bullets?.filter((bullet) => bullet.owner === session?.user.id);

    return <>
        {filtered?.length
            ? <UserBulletList items={filtered} />
            : <h2 style={{margin: "20px 0"}}>Нет объявлений</h2>
        }
    </>
}