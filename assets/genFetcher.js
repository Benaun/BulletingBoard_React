import Spiner from '@/components/UI/Spiner';
import { useEffect, useState } from 'react';


export default function GenFetcher({ onLoadCallback, fetcher, children }) {
    const
        [data, setData] = useState(null),
        [error, setError] = useState(null);

    useEffect(() => {
        async function f() {
            try {
                const d = await fetcher();
                setData(d);
                onLoadCallback(d);
                setError(null);
            } catch (err) {
                setError(err);
            }
        } f();
    }, [onLoadCallback]);

    if (error) return <Error error={error} />;
    if (data) return <>{children}</>;
    return <Spiner/>;
}

function Error({ error }) {
    return <h2 className='error' >{error.toString()} </h2>;
}
