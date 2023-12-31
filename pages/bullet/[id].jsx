import { useRouter } from "next/router"
import BulletCard from "@/components/BulletDetails/BulletCard";
import DefaultLayout from "@/layouts/default"
import { useFetchAllBulletsQuery } from "@/store/services/BulletService";
import { getCurrentBullet } from "@/assets/getCurrent";


export default function Details() {
    const router = useRouter();
    const { id } = router.query;
    const {data: bullets} = useFetchAllBulletsQuery();
    const currentBullet = getCurrentBullet(bullets, id)

    return (
        <DefaultLayout>
            <BulletCard item={currentBullet} />
        </DefaultLayout>
    )
}

