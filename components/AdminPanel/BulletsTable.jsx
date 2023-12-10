import { useState, useEffect } from 'react';
import TableLayout from './TablesLayout';
import css from './UsersTable.module.css';

const API = 'http://localhost:8000/bullets/';

const columnsBullets = [
    { title: '#', getVal: obj => obj.id },
    { title: 'Название', getVal: obj => obj.title },
    { title: 'Цена', getVal: obj => obj.price },
    { title: 'Категория', getVal: obj => obj.category },
    { title: 'Город', getVal: obj => obj.city },
];
const columnsWithButtons = columnsBullets.concat({
    title: '', getVal: ({ id }) => <>
        <button className={[css.btn, css.btn__del].join(' ')} data-id={id} data-action='delete'>X</button>
    </>
});


export default function BulletsTable() {
    const
        [bullets, setBullets] = useState([]),
        [sortColumns, setSortColumns] = useState('0'),
        [error, setError] = useState(null)

    useEffect(() => {
        async function getBullets() {
            try {
                const response = await fetch(API);
                if (!response.ok) throw new Error('fetch ' + response.status);
                setBullets(await response.json());
                setError(null);
            } catch (err) {
                setError(err)
            }
        }
        getBullets();
    }, [bullets]);

    async function onClick(evt) {
        const source = evt.target.closest('button[data-action]');
        if (source) {
            const { action, id } = source.dataset;
            switch (action) {
                case 'delete': ;
                    return fetch(API + id, { method: 'DELETE' })
                        .then(async res => {
                            if (!res.ok) {
                                throw (new Error(res.status + ' ' + res.statusText));
                            }
                        });
            };
            return;
        };

        const th = evt.target.closest('th');
        if (th && th.cellIndex) {
            let newSort;
            if (Math.abs(sortColumns) === 1 + th.cellIndex) {
                newSort = -sortColumns;
            } else {
                newSort = 1 + th.cellIndex;
            }
            const { getVal } = columnsBullets[Math.abs(newSort) - 1];

            const sortedBullets = bullets.toSorted((a, b) => {
                switch (true) {
                    case (typeof getVal(a) === 'string' && typeof getVal(b) === 'string'):
                        return getVal(a).localeCompare(getVal(b));
                }
            });

            if (newSort < 0) {
                sortedBullets.reverse();
            };
            setBullets(sortedBullets);
            setSortColumns(newSort);
        };
    };

    return (
        <div onClick={onClick}>
            <h2 className='text-center'>Таблица объявлений</h2>
            {bullets &&
                <TableLayout
                    items={bullets}
                    columns={columnsWithButtons}
                    sortColumns={sortColumns}
                />
            }
        </div>
    );
};