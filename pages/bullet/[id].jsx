import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import BulletCard from "@/components/BulletDetails/BulletCard";
import DefaultLayout from "@/layouts/default"


export default function Details() {
    const router = useRouter();
    const [bullet, setBullet] = useState(null);
    const [error, setError] = useState([]);
    const { id } = router.query;

    useEffect (() => {
        async function getDetails() {
            try {
                const response = await fetch (`http://localhost:8000/bullets/${id}`);
                if (!response.ok) throw new Error('fetch ' + response.status);
                setBullet(await response.json());
                setError(null);
            } catch (error){
                setError(error)
            }
        }
        getDetails();
    }, [id]);

    if(error) return <div>Ошибка: {error.message}</div>;

    return (
        <DefaultLayout>
            <BulletCard item={bullet} />
        </DefaultLayout>
    )
}

