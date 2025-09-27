'use client'

import { useSession } from 'next-auth/react'

import UserBulletList from '@/features/profile/ui/UserBulletList'

import { useFetchAllBulletsQuery } from '@/entities/bullet/api/service'

export default function UserBullets() {
  const { data: session } = useSession()
  const { data: bullets } = useFetchAllBulletsQuery()
  const userId = (
    session?.user as { id?: string | number } | undefined
  )?.id
  const filtered = bullets?.filter(
    bullet => bullet.ownerId === userId
  )
  return (
    <>
      {filtered?.length ? (
        <UserBulletList items={filtered} />
      ) : (
        <h2 className='my-5 text-center text-lg font-medium'>
          Нет объявлений
        </h2>
      )}
    </>
  )
}
