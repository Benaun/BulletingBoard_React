'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import toast from 'react-hot-toast'

import { getCurrentBullet } from '@/shared/lib/getCurrentBullet'
import { getCurrentUser } from '@/shared/lib/getCurrentUser'

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
    <div
      className='bg-white border rounded position-relative overflow-hidden'
      style={{
        minHeight: '320px',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow =
          '0 4px 12px rgba(0,0,0,0.12)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow =
          '0 1px 3px rgba(0,0,0,0.08)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <Link
        href={`/bullet/${id}`}
        className='text-decoration-none'
      >
        {/* Изображение */}
        <div
          className='position-relative overflow-hidden'
          style={{
            height: '180px',
            backgroundColor: '#f8f9fa'
          }}
        >
          {image ? (
            <img
              src={image}
              alt={title || 'Объявление'}
              className='w-100 h-100'
              style={{
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          ) : (
            <img
              src='images/not.jpg'
              alt='No photo'
              className='w-100 h-100'
              style={{
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          )}
        </div>

        {/* Контент карточки */}
        <div className='p-3'>
          {/* Название и кнопка избранного */}
          <div className='d-flex align-items-start justify-content-between mb-2'>
            {/* Название */}
            <div
              className='lh-sm'
              style={{
                color: '#212529',
                fontSize: '18px',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '34px',
                flex: '1',
                marginRight: '8px'
              }}
            >
              {title || 'Без названия'}
            </div>

            {/* Кнопка избранного */}
            {session &&
              role !== 'admin' &&
              String(ownerId) !== String(userId) && (
                <button
                  className='btn btn-sm d-flex align-items-center justify-content-center heart-button'
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleToggleFavorite()
                  }}
                  style={{
                    fontSize: '20px',
                    border: 'none',
                    background: 'transparent',
                    padding: '6px 10px',
                    borderRadius: '50%',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                >
                  <i
                    className={`bi ${inFav ? 'bi-heart-fill' : 'bi-heart'}`}
                    style={{
                      color: inFav ? '#dc3545' : '#000',
                      WebkitTextStroke: inFav
                        ? 'none'
                        : '1px #000',
                      WebkitTextFillColor: inFav
                        ? '#dc3545'
                        : '#fff',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      if (!inFav) {
                        e.currentTarget.style.webkitTextStroke =
                          '1px #dc3545'
                        e.currentTarget.style.color = '#dc3545'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!inFav) {
                        e.currentTarget.style.webkitTextStroke =
                          '1px #000'
                        e.currentTarget.style.color = '#000'
                      }
                    }}
                  ></i>
                </button>
              )}
          </div>

          {/* Цена */}
          <div
            className='fw-bold mb-2'
            style={{
              color: '#495057',
              fontSize: '18px',
              lineHeight: '1.2'
            }}
          >
            {price ? `${price} ₽` : 'Цена не указана'}
          </div>

          {/* Местоположение */}
          <div className='text-muted small d-flex align-items-center mb-3'>
            <i
              className='bi bi-geo-alt me-1'
              style={{ fontSize: '12px' }}
            ></i>
            {city || 'Местоположение не указано'}
          </div>
        </div>
      </Link>

      {/* Кнопки редактирования/удаления для владельца на странице профиля */}
      {session &&
        role !== 'admin' &&
        typeof window !== 'undefined' &&
        window.location.href ===
          'http://localhost:3000/profile' &&
        String(ownerId) === String(userId) && (
          <div className='px-3 pb-3'>
            <div className='d-flex justify-content-end gap-1'>
              <button
                className='btn btn-outline-danger btn-sm'
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleDelete(id)
                }}
                style={{ fontSize: '12px' }}
              >
                <i className='bi bi-trash'></i>
              </button>
              <Link
                href={`/editBullet/${id}`}
                className='btn btn-outline-primary btn-sm text-decoration-none'
                onClick={e => e.stopPropagation()}
                style={{ fontSize: '12px' }}
              >
                <i className='bi bi-pencil'></i>
              </Link>
            </div>
          </div>
        )}
    </div>
  )
}
