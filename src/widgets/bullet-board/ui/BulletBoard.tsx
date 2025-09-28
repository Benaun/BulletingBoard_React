'use client'

import { useState } from 'react'
import { Container } from 'react-bootstrap'

import { useSearch } from '@/shared/contexts/useSearch'

import { useInfiniteBulletsQuery } from '@/entities/bullet/api/service'
import type { Bullet } from '@/entities/bullet/model/schema'
import BulletList from '@/entities/bullet/ui/BulletList'
import { categoryMapping } from '@/entities/category/lib/categoryMapping'
import categories from '@/entities/category/model/categories'
import CategoriesList from '@/entities/category/ui/CategoriesList'

export default function BulletBoard() {
  const { searchValue } = useSearch()
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<
    number[]
  >([])

  const {
    data: bullets,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error
  } = useInfiniteBulletsQuery()

  const handleCategorySelect = (categoryIds: number[]) => {
    setSelectedCategoryIds(categoryIds)
  }

  // Фильтрация объявлений
  const filteredBullets =
    bullets?.filter((bullet: Bullet) => {
      // Фильтр по поиску
      const matchesSearch = bullet.title
        .toLowerCase()
        .includes(searchValue.toLowerCase())

      if (!matchesSearch) return false

      // Если не выбрано ни одной категории, показываем все объявления
      if (selectedCategoryIds.length === 0) return true

      // Фильтр по категориям
      const selectedCategories = selectedCategoryIds
        .map(id => categories.find(cat => cat.id === id)?.name)
        .filter(Boolean)
        .map(name => categoryMapping[name as string] || name)

      return selectedCategories.includes(bullet.category || '')
    }) || []

  if (isLoading) {
    return (
      <Container fluid className='mt-4'>
        <div className='text-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Загрузка...</span>
          </div>
          <p className='mt-2'>Загрузка объявлений...</p>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container fluid className='mt-4'>
        <div className='alert alert-danger text-center'>
          <h4>Ошибка загрузки</h4>
          <p>
            Не удалось загрузить объявления. Проверьте
            подключение к серверу.
          </p>
          <p className='small text-muted'>
            Ошибка: {error.message}
          </p>
        </div>
      </Container>
    )
  }

  if (!bullets || bullets.length === 0) {
    return (
      <Container fluid className='mt-4'>
        <div className='text-center'>
          <h3>Объявлений не найдено</h3>
          <p className='text-muted'>
            Пока нет доступных объявлений для отображения.
          </p>
        </div>
      </Container>
    )
  }

  return (
    <Container fluid className='mt-4'>
      <main className='min-h-[80.4vh]'>
        <div>
          <CategoriesList
            onCategorySelect={handleCategorySelect}
            selectedCategoryIds={selectedCategoryIds}
          />
          <BulletList
            items={filteredBullets}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
      </main>
    </Container>
  )
}
