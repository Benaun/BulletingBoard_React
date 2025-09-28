'use client'

import { useState } from 'react'
import { Container } from 'react-bootstrap'

import { useSearch } from '@/shared/contexts/useSearch'

import { useFetchAllBulletsQuery } from '@/entities/bullet/api/service'
import type { Bullet } from '@/entities/bullet/model/schema'
import BulletList from '@/entities/bullet/ui/BulletList'
import { categoryMapping } from '@/entities/category/lib/categoryMapping'
import categories from '@/entities/category/model/categories'
import CategoriesList from '@/entities/category/ui/CategoriesList'

export default function BulletBoard() {
  const { searchValue, setSearchValue } = useSearch()
  type ListFilter = (b: {
    category?: string
    title: string
  }) => boolean
  const [filterFunction, setfilterFunction] =
    useState<ListFilter>(() => () => true)
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<
    number[]
  >([])

  const {
    data: bullets,
    isLoading,
    error
  } = useFetchAllBulletsQuery()

  const handleCategorySelect = (categoryIds: number[]) => {
    setSelectedCategoryIds(categoryIds)

    // Если не выбрано ни одной категории, показываем все объявления
    if (categoryIds.length === 0) {
      setfilterFunction(() => () => true)
      return
    }

    // Получаем названия выбранных категорий из базы данных
    const selectedCategories = categoryIds
      .map(id => categories.find(cat => cat.id === id)?.name)
      .filter(Boolean)
      .map(name => categoryMapping[name as string] || name)

    setfilterFunction(() => (el: { category?: string }) => {
      return selectedCategories.includes(el.category || '')
    })
  }

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

  // Сначала фильтруем по поиску по всем объявлениям
  const searchFiltered =
    bullets?.filter((bullet: Bullet) =>
      bullet.title
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    ) || []

  // Затем применяем фильтр по категориям к результатам поиска
  const filtered = searchFiltered.filter(filterFunction)

  return (
    <Container fluid className='mt-4'>
      <main className='min-h-[80.4vh]'>
        <div>
          <CategoriesList
            onCategorySelect={handleCategorySelect}
            selectedCategoryIds={selectedCategoryIds}
          />
          <BulletList items={filtered} />
        </div>
      </main>
    </Container>
  )
}
