import { useRouter } from "next/router"
import DefaultLayout from "@/layouts/default"
import { useFetchAllBulletsQuery } from "@/store/services/BulletService";
import { getCurrentBullet } from "@/assets/getCurrent";
import EditBulletForm from "@/components/productForm/EditBulletForm";


export default function EditBullet() {
    const router = useRouter();
    const { id } = router.query;
    const {data: bullets} = useFetchAllBulletsQuery();
    const currentBullet = getCurrentBullet(bullets, id);

    return (
        <DefaultLayout>
            <EditBulletForm item={currentBullet} />
        </DefaultLayout>
    )
}