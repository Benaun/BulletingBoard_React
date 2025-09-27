'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { httpDelete, httpPost, httpPut } from '@/shared/api/http'

import TableLayout from '@/widgets/admin/ui/TablesLayout'
import UserForm from '@/widgets/admin/ui/UserForm'

interface AdminUser {
  id: number
  name?: string
  email?: string
  password?: string
  role?: string
  favorites?: unknown[]
}
type Getter<T> = (obj: AdminUser) => T
type Setter = (
  v: string
) => Partial<
  Pick<AdminUser, 'name' | 'email' | 'password' | 'role'>
>
const columnsUsers: {
  title: string
  getVal: Getter<string | number | undefined>
  setVal?: Setter
}[] = [
  { title: '№', getVal: obj => obj.id },
  {
    title: 'Имя',
    getVal: obj => obj.name,
    setVal: name => ({ name })
  },
  {
    title: 'Email',
    getVal: obj => obj.email,
    setVal: email => ({ email })
  },
  {
    title: 'Пароль',
    getVal: obj => obj.password,
    setVal: password => ({ password })
  },
  {
    title: 'Роль',
    getVal: obj => obj.role,
    setVal: role => ({ role })
  },
  {
    title: 'В избранном',
    getVal: obj =>
      obj.favorites?.length ? obj.favorites?.length : '0'
  }
]
const columnsWithButtons: {
  title: string
  getVal: (obj: AdminUser) => React.ReactNode
}[] = [
  ...columnsUsers.map(c => ({
    title: c.title,
    getVal: c.getVal as (obj: AdminUser) => React.ReactNode
  })),
  {
    title: '',
    getVal: ({ id }: AdminUser) => (
      <>
        <button
          className='inline-flex items-center justify-center rounded-md bg-gray-100 text-[color:var(--color-text)] hover:bg-gray-200 mr-1 px-2 py-1 text-sm'
          data-id={id}
          data-action='edit'
        >
          Ред.
        </button>
        <button
          className='inline-flex items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600 px-2 py-1 text-sm'
          data-id={id}
          data-action='delete'
        >
          X
        </button>
      </>
    )
  }
]

export default function UsersTable() {
  const [isEdited, setIsedited] = useState(false)
  const [newUserId, setNewUserId] = useState<string | null>(null)
  const [values, setValues] = useState(
    columnsUsers.map(() => '')
  )
  const queryClient = useQueryClient()

  const { data: users = [] } = useQuery<AdminUser[]>({
    queryKey: ['admin-users'],
    queryFn: () =>
      fetch('http://localhost:8000/users').then(r => r.json())
  })

  async function onClick(evt: React.MouseEvent<HTMLDivElement>) {
    const source = (evt.target as HTMLElement).closest(
      'button[data-action]'
    ) as HTMLButtonElement | null
    if (!source) return
    const { action, id } = source.dataset
    if (!action) return
    switch (action) {
      case 'delete':
        if (id) await httpDelete(`/users/${id}`)
        await queryClient.invalidateQueries({
          queryKey: ['admin-users']
        })
        return
      case 'ok':
        setNewUserId(null)
        if (newUserId) {
          const index = users.findIndex(
            obj => String(obj.id) === String(newUserId)
          )
          const newUser: AdminUser = { ...users[index] }
          columnsUsers.forEach(({ setVal }, i) =>
            Object.assign(newUser, setVal?.(values[i]))
          )
          setValues(columnsUsers.map(() => ''))
          await httpPut(`/users/${newUserId}`, newUser)
        } else {
          const newUser: AdminUser = {
            id: Math.round(Math.random() * 100)
          }
          columnsUsers.forEach(({ setVal }, i) =>
            Object.assign(newUser, setVal?.(values[i]))
          )
          setValues(columnsUsers.map(() => ''))
          await httpPost('/users', newUser)
        }
        await queryClient.invalidateQueries({
          queryKey: ['admin-users']
        })
        return
      case 'edit':
        if (!id) return
        setNewUserId(id)
        {
          const index = users.findIndex(
            obj => String(obj.id) === String(id)
          )
          setValues(
            columnsUsers.map(({ setVal, getVal }) =>
              setVal ? String(getVal(users[index]) ?? '') : ''
            )
          )
        }
        setIsedited(true)
        return
      case 'cancel':
        setNewUserId(null)
        setValues(columnsUsers.map(() => ''))
        setIsedited(false)
        return
    }
  }

  return (
    <div onClick={onClick} className='relative'>
      <h2 className='text-center'>Таблица пользователей</h2>
      <button className='inline-flex items-center justify-center rounded-md bg-gray-100 text-[color:var(--color-text)] hover:bg-gray-200 absolute top-[2%] right-[27%] px-2 py-1 text-sm'>
        Добавить
      </button>
      {users && (
        <TableLayout<AdminUser>
          items={users}
          columns={columnsWithButtons}
          newUserId={newUserId}
        >
          {isEdited && (
            <UserForm
              columns={columnsUsers}
              values={values}
              setValues={setValues}
            />
          )}
        </TableLayout>
      )}
    </div>
  )
}
