'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import toast from 'react-hot-toast'

import { getCurrentBullet } from '@/shared/lib/getCurrentBullet'
import { getCurrentUser } from '@/shared/lib/getCurrentUser'

import { useFetchAllBulletsQuery } from '@/entities/bullet/api/service'
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

  return (
    <div className='bullet-card bg-white rounded-t-lg relative overflow-hidden h-[360px] transition-all duration-200 ease-in-out cursor-pointer hover:-translate-y-0.5'>
      <Link
        href={`/bullet/${id}`}
        className='no-underline hover:no-underline text-inherit hover:text-inherit'
      >
        {/* Изображение */}
        <div className='relative rounded-b-lg overflow-hidden h-[240px] bg-gray-50'>
          {image ? (
            <img
              src={image}
              alt={title || 'Объявление'}
              className='w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105'
            />
          ) : (
            <img
              src='images/not.jpg'
              alt='No photo'
              className='w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105'
            />
          )}
        </div>

        {/* Контент карточки */}
        <div className='p-3 flex flex-col justify-between h-[110px]'>
          {/* Название и кнопка избранного */}
          <div className='flex items-start justify-between mb-2'>
            {/* Название */}
            <div className='leading-5 text-gray-900 text-lg line-clamp-2 min-h-8 flex-1 mr-2'>
              {title || 'Без названия'}
            </div>

            {/* Кнопка избранного */}
            {session &&
              role !== 'admin' &&
              String(ownerId) !== String(userId) && (
                <button
                  className='text-xl border-none bg-transparent px-2.5 py-1.5 rounded-full transition-all duration-200 ease-in-out flex-shrink-0 flex items-center justify-center hover:bg-gray-100'
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleToggleFavorite()
                  }}
                >
                  <i
                    className={`bi ${inFav ? 'bi-heart-fill' : 'bi-heart'} heart-icon ${inFav ? 'heart-icon-filled' : 'heart-icon-empty'}`}
                  ></i>
                </button>
              )}
          </div>

          {/* Цена и местоположение */}
          <div className='flex flex-col gap-1'>
            {/* Цена */}
            <div className='font-bold text-gray-600 text-lg leading-tight'>
              {price ? `${price} ₽` : 'Цена не указана'}
            </div>

            {/* Местоположение */}
            <div className='text-gray-500 text-sm flex items-center'>
              <i className='bi bi-geo-alt mr-1 text-xs'></i>
              {city || 'Местоположение не указано'}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
