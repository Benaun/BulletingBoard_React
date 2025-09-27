'use client'

import { useSession } from 'next-auth/react'

import { getCurrentUser } from '@/shared/lib/getCurrentUser'

import BulletList from '@/entities/bullet/ui/BulletList'
import { useFetchAllUsersQuery } from '@/entities/user/api/service'

export default function FavoritesBullets() {
  const { data: session } = useSession()
  const userId = (
    session?.user as { id?: string | number } | undefined
  )?.id
  const { data: users } = useFetchAllUsersQuery()
  const currentUser = getCurrentUser(users, userId)
  const favoritesBullets = currentUser?.favorites
  return (
    <>
      {favoritesBullets?.length ? (
        <BulletList items={favoritesBullets} />
      ) : (
        <h2 className='my-5 text-center text-lg font-medium'>
          Нет объявлений
        </h2>
      )}
    </>
  )
}
