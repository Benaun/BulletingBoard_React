'use client'

import { useParams } from 'next/navigation'
import { Container } from 'react-bootstrap'

import { getCurrentBullet } from '@/shared/lib/getCurrentBullet'

import { useFetchAllBulletsQuery } from '@/entities/bullet/api/service'
import BulletCard from '@/entities/bullet/ui/BulletCard'

export default function Details() {
  const params = useParams()
  const id = params.id as string
  const {
    data: bullets,
    isLoading,
    error
  } = useFetchAllBulletsQuery()
  const currentBullet = getCurrentBullet(bullets, id)

  if (isLoading) {
    return (
      <Container fluid className='mt-4'>
        <div className='text-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Загрузка...</span>
          </div>
          <p className='mt-2'>Загрузка объявления...</p>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container fluid className='mt-4'>
        <div className='alert alert-danger text-center'>
          <h4>Ошибка загрузки</h4>
          <p>Не удалось загрузить объявление.</p>
        </div>
      </Container>
    )
  }

  if (!currentBullet) {
    return (
      <Container fluid className='mt-4'>
        <div className='alert alert-warning text-center'>
          <h4>Объявление не найдено</h4>
          <p>Объявление с ID {id} не существует.</p>
        </div>
      </Container>
    )
  }

  return <BulletCard item={currentBullet} />
}
