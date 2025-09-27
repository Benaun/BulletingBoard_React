'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Col, Container } from 'react-bootstrap'
import toast from 'react-hot-toast'

import { getCurrentBullet } from '@/shared/lib/getCurrentBullet'
import { getCurrentUser } from '@/shared/lib/getCurrentUser'
import DeleteBtn from '@/shared/ui/icon-buttons/DeleteBtn'
import EditBtn from '@/shared/ui/icon-buttons/EditBtn'
import HeartBtn from '@/shared/ui/icon-buttons/HeartBtn'

import {
  useDeleteBulletMutation,
  useFetchAllBulletsQuery
} from '@/entities/bullet/api/service'
import type { Bullet } from '@/entities/bullet/model/schema'
import {
  useFetchAllUsersQuery,
  useUpdateUserFavoritesMutation
} from '@/entities/user/api/service'

interface BulletItemProps {
  item: Bullet
}

export default function BulletItem({ item }: BulletItemProps) {
  const { data: session } = useSession()
  type SessionUser = { id?: string | number; role?: string }
  const userId = (session?.user as SessionUser | undefined)?.id
  const role = (session?.user as SessionUser | undefined)?.role
  const { id, title, price, image, city, ownerId } = item
  const { data: bullets } = useFetchAllBulletsQuery()
  const { data: users } = useFetchAllUsersQuery()
  const currentUser = getCurrentUser(users, userId)
  const currentBullet = getCurrentBullet(bullets, id)
  const favoritesArray = currentUser?.favorites || []
  const bulletInFav = favoritesArray?.find(
    (favorite: Bullet) => favorite.id != currentBullet?.id
  )
  const inFav = favoritesArray?.some(
    (favorite: Bullet) => favorite.id == currentBullet?.id
  )
  const [updateUserFavorites] = useUpdateUserFavoritesMutation()
  const [deleteBullet] = useDeleteBulletMutation()

  const handleToggleFavorite = async () => {
    if (!currentBullet) {
      toast.error('Элемент не найден')
      return
    }
    let updatedFavorites: Bullet[] = [...favoritesArray]
    if (!inFav) {
      updatedFavorites = [...updatedFavorites, currentBullet]
    } else {
      const list = (bullets as Bullet[]) || []
      updatedFavorites = list.includes(currentBullet as Bullet)
        ? updatedFavorites.filter(
            (f: Bullet) => f.id !== (currentBullet as Bullet)?.id
          )
        : updatedFavorites.filter(
            (f: Bullet) =>
              f.id !== (bulletInFav as Bullet | undefined)?.id
          )
    }
    await updateUserFavorites({
      userId: userId as string | number,
      favorites: updatedFavorites
    })
      .unwrap()
      .then(() =>
        toast.success(
          !inFav
            ? 'Добавлено в избранное!'
            : 'Удалено из избранного!'
        )
      )
      .catch(() =>
        toast.error('Возникла проблема с вашим запросом')
      )
  }

  const handleDelete = async (id: number) => {
    await deleteBullet(id)
      .unwrap()
      .then(() => toast.success('Объявление удалено!'))
      .catch(() =>
        toast.error('Возникла проблема с вашим запросом')
      )
  }

  return (
    <Col xs={8} md={6} lg={4} xl={3} className='mb-3'>
      <div
        className='rounded-lg transition-shadow'
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.06)'
        }}
      >
        <Container className='aspect-square overflow-hidden bg-gray-100 rounded-t-lg'>
          {image ? (
            <img
              src={image}
              alt={title || ''}
              className='h-full w-full object-cover'
            />
          ) : (
            <div className='h-full w-full bg-gray-200' />
          )}
        </Container>
        <div className='p-4'>
          <Link href={`/bullet/${id}`}>
            <h3 className='line-clamp-2 text-base font-semibold hover:text-primary'>
              {title || 'Без названия'}
            </h3>
            <p className='mt-1 text-sm text-text'>
              {price || 'Цена не указана'} &#8381;
            </p>
            <p className='text-sm text-text-muted'>
              {city || 'Не указан'}
            </p>
          </Link>
          {role === 'admin' || !session ? (
            <div />
          ) : ownerId !==
            (userId as string | number | undefined) ? (
            <HeartBtn
              inFav={inFav}
              handleClick={handleToggleFavorite}
            />
          ) : typeof window !== 'undefined' &&
            window.location.href ==
              'http://localhost:3000/profile' ? (
            <div>
              <DeleteBtn handleClick={() => handleDelete(id)} />
              <Link href={`/editBullet/${id}`}>
                <EditBtn size={20} handleClick={() => {}} />
              </Link>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </Col>
  )
}
