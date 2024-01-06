import { useSession } from 'next-auth/react';
import { Container } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import Link from 'next/link';
import { useFetchAllUsersQuery } from '@/store/services/UserService';
import EditBtn from '../UI/EditBtn';
import { getCurrentUser } from '@/assets/getCurrent';

export default function ProfileHeader() {
    const { data: session } = useSession();
    const {data: users} = useFetchAllUsersQuery();
    const userId = session?.user.id;
    const currentUser = getCurrentUser(users, userId);

    return (
        <Container fluid className='mt-3 mb-3'>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "30px",
            }}>
                <FaUserCircle size={42} fill='rgb(185, 184, 182)'/>
                <h3>{currentUser?.name || session?.user.email}</h3>
                <h3>{currentUser?.email}</h3>
                <Link href={`/editUser/${userId}`}>
                    <EditBtn size={30} />
                </Link>
            </div>
        </Container>
    )
}