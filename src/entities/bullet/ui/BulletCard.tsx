'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import toast from 'react-hot-toast'

import { getCurrentBullet } from '@/shared/lib/getCurrentBullet'
import { getCurrentUser } from '@/shared/lib/getCurrentUser'

import { useFetchAllBulletsQuery } from '@/entities/bullet/api/service'
import type { Bullet } from '@/entities/bullet/model/schema'
import {
  useFetchAllUsersQuery,
  useFetchUserQuery,
  useUpdateUserFavoritesMutation
} from '@/entities/user/api/service'

interface Props {
  item?: Bullet | null
}

export default function BulletCard({ item }: Props) {
  const [visible, setVisible] = useState(false)
  const [needsBlurBg, setNeedsBlurBg] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  // Получаем данные продавца по ownerId
  const {
    data: seller,
    isLoading: isSellerLoading,
    error: sellerError
  } = useFetchUserQuery(item?.ownerId)

  // Логика избранного (как в BulletItem)
  type SessionUser = { id?: string | number; role?: string }
  const userId = (session?.user as SessionUser | undefined)?.id
  const role = (session?.user as SessionUser | undefined)?.role
  const { data: bullets } = useFetchAllBulletsQuery()
  const { data: users } = useFetchAllUsersQuery()
  const currentUser = getCurrentUser(users, userId)
  const currentBullet = getCurrentBullet(bullets, item?.id)
  const favoritesArray = currentUser?.favorites || []
  const bulletInFav = favoritesArray?.find(
    (favorite: Bullet) => favorite.id != currentBullet?.id
  )
  const inFav = favoritesArray?.some(
    (favorite: Bullet) => favorite.id == currentBullet?.id
  )
  const [updateUserFavorites] = useUpdateUserFavoritesMutation()

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const img = e.target as HTMLImageElement
    const container = img.parentElement
    if (container) {
      const containerWidth = container.offsetWidth
      const { naturalWidth, naturalHeight } = img

      // Вычисляем ширину изображения при высоте контейнера
      const containerHeight = container.offsetHeight
      const scaledWidth =
        (naturalWidth * containerHeight) / naturalHeight

      // Если изображение уже контейнера, нужен размытый фон
      setNeedsBlurBg(scaledWidth < containerWidth)
    }
  }

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

  if (!item) {
    return (
      <Container className='mt-4'>
        <div className='text-center py-5'>
          <div
            className='spinner-border text-primary'
            role='status'
          >
            <span className='visually-hidden'>Загрузка...</span>
          </div>
          <p className='mt-3 text-gray-500'>
            Загрузка объявления...
          </p>
        </div>
      </Container>
    )
  }

  const {
    title,
    image,
    price,
    description,
    city,
    phone,
    region,
    street,
    category
  } = item

  return (
    <Container className='mt-4 max-w-6xl'>
      {/* Breadcrumb navigation */}
      <nav aria-label='breadcrumb' className='mb-3'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link href='/' className='no-underline'>
              Главная
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <span className='text-gray-500'>{category}</span>
          </li>
          <li
            className='breadcrumb-item active'
            aria-current='page'
          >
            {title}
          </li>
        </ol>
      </nav>

      <Row className='g-4'>
        {/* Left Column - Images and Description */}
        <Col lg={8}>
          {/* Title */}
          <h1 className='text-3xl font-bold mb-4 text-gray-900'>
            {title}
          </h1>

          {/* Image */}
          <Card className='mb-4 border-0'>
            <div className='relative overflow-hidden rounded h-96 bg-gray-50'>
              {image ? (
                <div className='relative w-full h-full flex items-center justify-center'>
                  {/* Размытый фон если изображение узкое */}
                  {needsBlurBg && (
                    <div
                      className='absolute inset-0 bg-cover bg-center'
                      style={{
                        backgroundImage: `url(${image})`,
                        filter: 'blur(20px) brightness(0.7)',
                        transform: 'scale(1.1)'
                      }}
                    />
                  )}

                  {/* Основное изображение */}
                  <img
                    src={image}
                    alt={title}
                    onLoad={handleImageLoad}
                    className='h-full w-auto object-contain relative z-10'
                  />
                </div>
              ) : (
                <div className='flex items-center justify-center h-full'>
                  <div className='text-center text-gray-500'>
                    <i className='bi bi-image text-5xl'></i>
                    <p className='mt-2'>
                      Изображение отсутствует
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Characteristics */}
          <Card className='mb-4'>
            <Card.Header className='bg-white border-bottom'>
              <h3 className='h5 mb-0 fw-bold'>Характеристики</h3>
            </Card.Header>
            <Card.Body>
              <Row className='g-3'>
                <Col md={6}>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-gray-500'>
                      Категория
                    </span>
                    <span className='font-medium'>
                      {category || 'Не указана'}
                    </span>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Location */}
          <Card className='mb-4'>
            <Card.Header className='bg-white border-bottom'>
              <h3 className='h5 mb-0 fw-bold'>Адрес</h3>
            </Card.Header>
            <Card.Body>
              <div className='flex items-center mb-2'>
                <i className='bi bi-geo-alt text-primary me-2'></i>
                <span className='font-medium'>
                  {region}, {city}
                </span>
              </div>
              {street && (
                <div className='text-gray-500 small ms-4'>
                  {street}
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Description */}
          <Card className='mb-4'>
            <Card.Header className='bg-white border-bottom'>
              <h3 className='h5 mb-0 fw-bold'>Описание</h3>
            </Card.Header>
            <Card.Body>
              <p className='mb-0 leading-relaxed whitespace-pre-line'>
                {description || 'Описание отсутствует'}
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column - Price and Actions */}
        <Col lg={4}>
          <Card className='sticky top-5'>
            <Card.Body className='p-4'>
              {/* Price */}
              <div className='mb-4'>
                <h2 className='h1 fw-bold text-primary mb-0'>
                  {price} ₽
                </h2>
              </div>

              {/* Action Buttons */}
              <div className='d-grid gap-3 mb-4'>
                <button
                  onClick={() => setVisible(!visible)}
                  className='btn btn-success btn-lg font-medium h-12'
                  disabled={isSellerLoading}
                >
                  {isSellerLoading ? (
                    <>
                      <div
                        className='spinner-border spinner-border-sm me-2'
                        role='status'
                      >
                        <span className='visually-hidden'>
                          Загрузка...
                        </span>
                      </div>
                      Загрузка...
                    </>
                  ) : !visible ? (
                    <>
                      <i className='bi bi-telephone me-2'></i>
                      Показать телефон
                    </>
                  ) : (
                    <>
                      <i className='bi bi-telephone-fill me-2'></i>
                      {seller?.phone ||
                        phone ||
                        '+7 XXX XXX XX XX'}
                    </>
                  )}
                </button>

                <button className='btn btn-outline-primary btn-lg font-medium'>
                  <i className='bi bi-chat-dots me-2'></i>
                  Написать сообщение
                </button>
              </div>

              {/* Seller Info */}
              <Card className='border'>
                <Card.Body className='p-3'>
                  {isSellerLoading ? (
                    <div className='flex items-center mb-2'>
                      <div className='rounded-full bg-gray-200 flex items-center justify-center mr-3 w-10 h-10'>
                        <div
                          className='spinner-border spinner-border-sm text-gray-500'
                          role='status'
                        >
                          <span className='visually-hidden'>
                            Загрузка...
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className='font-medium text-gray-500'>
                          Загрузка данных продавца...
                        </div>
                      </div>
                    </div>
                  ) : sellerError ? (
                    <div className='flex items-center mb-2'>
                      <div className='rounded-full bg-red-500 text-white flex items-center justify-center mr-3 w-10 h-10'>
                        <i className='bi bi-exclamation-triangle'></i>
                      </div>
                      <div>
                        <div className='font-medium text-danger'>
                          Ошибка загрузки данных продавца
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='flex items-center mb-2'>
                      <div className='rounded-full bg-blue-600 text-white flex items-center justify-center mr-3 w-10 h-10'>
                        <i className='bi bi-person'></i>
                      </div>
                      <div>
                        <div className='font-medium'>
                          {seller?.name || `Продавец`}
                        </div>
                        <div className='small text-gray-500'>
                          <i className='bi bi-star-fill text-warning me-1'></i>
                          4.8 · Частное лицо
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  {seller?.email && (
                    <div className='small text-gray-500 mb-1'>
                      <i className='bi bi-envelope me-1'></i>
                      {seller.email}
                    </div>
                  )}
                </Card.Body>
              </Card>

              {/* Additional Features */}
              <div className='mt-4'>
                <div className='small text-gray-500 mb-2'>
                  <i className='bi bi-shield-check text-success me-2'></i>
                  Безопасная сделка
                </div>
                <div className='small text-gray-500 mb-2'>
                  <i className='bi bi-truck text-info me-2'></i>
                  Доставка по договорённости
                </div>
                <div className='small text-gray-500'>
                  <i className='bi bi-arrow-return-left text-warning me-2'></i>
                  Возврат по условиям продавца
                </div>
              </div>

              {/* Stats */}
              <hr className='my-4' />
              <div className='d-flex justify-content-between small text-gray-500'>
                <span>№ {item.id}</span>
                <span>
                  <i className='bi bi-eye me-1'></i>
                  {Math.floor(Math.random() * 200) + 50}{' '}
                  просмотров
                </span>
              </div>
              <div className='small text-gray-500 mt-1'>
                Размещено{' '}
                {new Date().toLocaleDateString('ru-RU')}
              </div>

              {/* Favorites and Share */}
              <div className='flex gap-2 mt-3'>
                {/* Кнопка избранного - показываем только если НЕ владелец и авторизован */}
                {session &&
                role !== 'admin' &&
                String(item?.ownerId) !== String(userId) ? (
                  <button
                    className='btn btn-outline-secondary flex-fill'
                    onClick={handleToggleFavorite}
                  >
                    <i
                      className={`bi ${inFav ? 'bi-heart-fill' : 'bi-heart'} heart-icon ${inFav ? 'heart-icon-filled' : 'heart-icon-empty'}`}
                    ></i>
                  </button>
                ) : (
                  <button
                    className='btn btn-outline-secondary flex-fill'
                    disabled
                  >
                    <i className='bi bi-heart text-gray-500'></i>
                  </button>
                )}
                <button className='btn btn-outline-secondary flex-fill'>
                  <i className='bi bi-share'></i>
                </button>
                <button
                  onClick={() => router.back()}
                  className='btn btn-outline-secondary flex-fill'
                >
                  <i className='bi bi-arrow-left'></i>
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
