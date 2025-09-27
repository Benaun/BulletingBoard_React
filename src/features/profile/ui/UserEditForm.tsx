import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from 'react-bootstrap'
import toast from 'react-hot-toast'

import { getCurrentUser } from '@/shared/lib/getCurrentUser'
import FormInput from '@/shared/ui/form/FormInput'

import {
  useFetchAllUsersQuery,
  useUpdateUserMutation
} from '@/entities/user/api/service'
import type { AppUser } from '@/entities/user/model/schema'

interface Props {
  item?: AppUser | null
}

export default function UserEditForm({ item }: Props) {
  const router = useRouter()
  const { data: users } = useFetchAllUsersQuery()
  const currentUser = getCurrentUser(users, item?.id)
  const [user, setUser] = useState<AppUser | undefined>(
    currentUser
  )
  const [updateUser] = useUpdateUserMutation()

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setUser(prev =>
      prev ? ({ ...prev, [name]: value } as AppUser) : prev
    )
  }

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    if (!user) return
    await updateUser(user)
      .unwrap()
      .then(() => toast.success('Данные обновлены!'))
      .catch(() =>
        toast.error('Возникла проблема с вашим запросом')
      )
    router.back()
  }

  return (
    <main className='pt-10 flex text-center min-h-[85.4vh]'>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          text={'Имя'}
          name={'name'}
          value={user?.name}
          handleInputChange={handleInputChange}
        />
        <FormInput
          text={'Email'}
          name={'email'}
          value={user?.email}
          handleInputChange={handleInputChange}
        />
        <FormInput
          text={'Пароль'}
          name={'password'}
          value={user?.password}
          handleInputChange={handleInputChange}
        />
        <div>
          <Button
            className='w-[250px] py-[10px] mr-[10px]'
            variant='success'
            type='submit'
          >
            Подтвердить
          </Button>
          <Button
            className='w-[250px] py-[10px] mr-[10px]'
            variant='warning'
            onClick={() => router.back()}
          >
            Отменить
          </Button>
        </div>
      </form>
    </main>
  )
}
