import { bulletAPI } from '@/store/services/BulletService';
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
    const { data: bullets } = bulletAPI.useFetchAllBulletsQuery();

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
    };

    return (
        <div>
            <h2 className='text-center'>Таблица объявлений</h2>
            {bullets &&
                <TableLayout
                    items={bullets}
                    columns={columnsWithButtons}
                />
            }
        </div>
    );
};