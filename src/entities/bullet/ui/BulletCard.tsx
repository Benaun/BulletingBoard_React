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
          <p className='mt-3 text-muted'>
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
    <Container className='mt-4' style={{ maxWidth: '1200px' }}>
      {/* Breadcrumb navigation */}
      <nav aria-label='breadcrumb' className='mb-3'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link href='/' className='text-decoration-none'>
              Главная
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <span className='text-muted'>{category}</span>
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
          <h1
            className='h2 fw-bold mb-4'
            style={{ color: '#1a1a1a' }}
          >
            {title}
          </h1>

          {/* Image */}
          <Card className='mb-4 border-0'>
            <div
              className='position-relative overflow-hidden rounded'
              style={{
                height: '500px',
                backgroundColor: '#f8f9fa'
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className='w-100 h-100'
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div className='d-flex align-items-center justify-content-center h-100'>
                  <div className='text-center text-muted'>
                    <i className='bi bi-image fs-1'></i>
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
                  <div className='d-flex justify-content-between py-2 border-bottom'>
                    <span className='text-muted'>Категория</span>
                    <span className='fw-medium'>
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
              <div className='d-flex align-items-center mb-2'>
                <i className='bi bi-geo-alt text-primary me-2'></i>
                <span className='fw-medium'>
                  {region}, {city}
                </span>
              </div>
              {street && (
                <div className='text-muted small ms-4'>
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
              <p
                className='mb-0 lh-lg'
                style={{ whiteSpace: 'pre-line' }}
              >
                {description || 'Описание отсутствует'}
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column - Price and Actions */}
        <Col lg={4}>
          <Card className='sticky-top' style={{ top: '20px' }}>
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
                  className='btn btn-success btn-lg fw-medium'
                  style={{ height: '50px' }}
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

                <button className='btn btn-outline-primary btn-lg fw-medium'>
                  <i className='bi bi-chat-dots me-2'></i>
                  Написать сообщение
                </button>
              </div>

              {/* Seller Info */}
              <Card className='border'>
                <Card.Body className='p-3'>
                  {isSellerLoading ? (
                    <div className='d-flex align-items-center mb-2'>
                      <div
                        className='rounded-circle bg-light d-flex align-items-center justify-content-center me-3'
                        style={{ width: '40px', height: '40px' }}
                      >
                        <div
                          className='spinner-border spinner-border-sm text-muted'
                          role='status'
                        >
                          <span className='visually-hidden'>
                            Загрузка...
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className='fw-medium text-muted'>
                          Загрузка данных продавца...
                        </div>
                      </div>
                    </div>
                  ) : sellerError ? (
                    <div className='d-flex align-items-center mb-2'>
                      <div
                        className='rounded-circle bg-danger text-white d-flex align-items-center justify-content-center me-3'
                        style={{ width: '40px', height: '40px' }}
                      >
                        <i className='bi bi-exclamation-triangle'></i>
                      </div>
                      <div>
                        <div className='fw-medium text-danger'>
                          Ошибка загрузки данных продавца
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='d-flex align-items-center mb-2'>
                      <div
                        className='rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3'
                        style={{ width: '40px', height: '40px' }}
                      >
                        <i className='bi bi-person'></i>
                      </div>
                      <div>
                        <div className='fw-medium'>
                          {seller?.name || `Продавец`}
                        </div>
                        <div className='small text-muted'>
                          <i className='bi bi-star-fill text-warning me-1'></i>
                          4.8 · Частное лицо
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  {seller?.email && (
                    <div className='small text-muted mb-1'>
                      <i className='bi bi-envelope me-1'></i>
                      {seller.email}
                    </div>
                  )}
                </Card.Body>
              </Card>

              {/* Additional Features */}
              <div className='mt-4'>
                <div className='small text-muted mb-2'>
                  <i className='bi bi-shield-check text-success me-2'></i>
                  Безопасная сделка
                </div>
                <div className='small text-muted mb-2'>
                  <i className='bi bi-truck text-info me-2'></i>
                  Доставка по договорённости
                </div>
                <div className='small text-muted'>
                  <i className='bi bi-arrow-return-left text-warning me-2'></i>
                  Возврат по условиям продавца
                </div>
              </div>

              {/* Stats */}
              <hr className='my-4' />
              <div className='d-flex justify-content-between small text-muted'>
                <span>№ {item.id}</span>
                <span>
                  <i className='bi bi-eye me-1'></i>
                  {Math.floor(Math.random() * 200) + 50}{' '}
                  просмотров
                </span>
              </div>
              <div className='small text-muted mt-1'>
                Размещено{' '}
                {new Date().toLocaleDateString('ru-RU')}
              </div>

              {/* Favorites and Share */}
              <div className='d-flex gap-2 mt-3'>
                {/* Кнопка избранного - показываем только если НЕ владелец и авторизован */}
                {session &&
                role !== 'admin' &&
                String(item?.ownerId) !== String(userId) ? (
                  <button
                    className='btn btn-outline-secondary flex-fill'
                    onClick={handleToggleFavorite}
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
                ) : (
                  <button
                    className='btn btn-outline-secondary flex-fill'
                    disabled
                  >
                    <i className='bi bi-heart text-muted'></i>
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
