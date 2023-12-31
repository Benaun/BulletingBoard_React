import { useState } from 'react';
import TableLayout from './TablesLayout';
import UserForm from './UserForm';
import css from './UsersTable.module.css';
import { userAPI } from '@/store/services/UserService';

const API = 'http://localhost:8000/users/';

const columnsUsers = [
    { title: '№', getVal: obj => obj.id },
    { title: 'Имя', getVal: obj => obj.name, setVal: name => ({ name }) },
    { title: 'Email', getVal: obj => obj.email, setVal: email => ({ email }) },
    { title: 'Пароль', getVal: obj => obj.password, setVal: password => ({ password }) },
    { title: 'Роль', getVal: obj => obj.role, setVal: role => ({ role }) },
    { title: 'В избранном', getVal: obj => obj.favorites?.length ? obj.favorites?.length : "0" }
];
const columnsWithButtons = columnsUsers.concat({
    title: '', getVal: ({ id }) => <>
        <button className={[css.btn, css.btn__edit].join(' ')} data-id={id} data-action='edit'>Ред.</button>
        <button className={[css.btn, css.btn__del].join(' ')} data-id={id} data-action='delete'>X</button>
    </>
});

export default function UserTable() {
    const [isEdited, setIsedited] = useState(false);
    const [newUserId, setNewUserId] = useState(null);
    const [values, setValues] = useState(columnsUsers.map(() => ''));
    const {data: users} = userAPI.useFetchAllUsersQuery();

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
                case 'ok':
                    setNewUserId(null);
                    if (newUserId) {
                        const index = users.findIndex((obj) => obj.id == newUserId);
                        const newUser = { ...users[index] };
                        columnsUsers.forEach(({ setVal }, id) => Object.assign(newUser, setVal?.(values[id])));
                        setValues(columnsUsers.map(() => ''));
                        return fetch(API + newUserId,
                            {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(newUser)
                            })
                            .then(async res => {
                                if (!res.ok) {
                                    throw (new Error(res.status + ' ' + res.statusText));
                                }
                            });
                    } else {
                        const newUser = { id: Math.round(Math.random() * 100) };
                        columnsUsers.forEach(({ setVal }, index) => Object.assign(newUser, setVal?.(values[index])));
                        setValues(columnsUsers.map(() => ''));
                        return fetch(API,
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(newUser)
                            })
                            .then(async res => {
                                if (!res.ok) {
                                    throw (new Error(res.status + ' ' + res.statusText));
                                }
                            });
                    }
            };

            switch (action) {
                case 'edit':
                    setNewUserId(id);
                    const index = users.findIndex((obj) => obj.id == id);
                    setValues(columnsUsers.map(({ setVal, getVal }) => setVal ? getVal(users[index]) : ''));
                    setIsedited(true)
                    return;
                case 'cancel':
                    setNewUserId(null);
                    setValues(columnsUsers.map(() => ''));
                    setIsedited(false)
                    return;
            };
            return;
        };;
    };

    return (
        <div onClick={onClick} className={css.table__users}>
            <h2 className='text-center'>Таблица пользователей</h2>
            <button className={[css.btn, css.btn__add].join(' ')}>Добавить</button>
            {users &&
                <TableLayout items={users} columns={columnsWithButtons} newUserId={newUserId}>
                    {isEdited &&
                        <UserForm columns={columnsUsers} values={values} setValues={setValues} />
                    }
                </TableLayout>
            }
        </div>
    );
};