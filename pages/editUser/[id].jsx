import { getCurrentUser } from "@/assets/getCurrent";
import UserEditForm from "@/components/UsersProfile/UserEditForm";
import DefaultLayout from "@/layouts/default";
import { useFetchAllUsersQuery } from "@/store/services/UserService";
import { useRouter } from "next/router";

export default function EditUser() {
    const router = useRouter();
    const { id } = router.query;
    const {data: users} = useFetchAllUsersQuery();
    const currentUser = getCurrentUser(users, id);

    return (
        <DefaultLayout>
            <UserEditForm item={currentUser} />
        </DefaultLayout>
    )
}