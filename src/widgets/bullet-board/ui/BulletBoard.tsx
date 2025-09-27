'use client'

import { useState } from 'react'
import { Container } from 'react-bootstrap'

import CategoriesList from '@/features/categories/ui/CategoriesList'

import SearchBar from '@/shared/ui/search/SearchBar'

import { useFetchAllBulletsQuery } from '@/entities/bullet/api/service'
import type { Bullet } from '@/entities/bullet/model/schema'
import BulletList from '@/entities/bullet/ui/BulletList'

export default function BulletBoard() {
  const [searchValue, setSearchValue] = useState('')
  type ListFilter = (b: {
    category?: string
    title: string
  }) => boolean
  const [filterFunction, setfilterFunction] =
    useState<ListFilter>(() => () => true)
  const {
    data: bullets,
    isLoading,
    error
  } = useFetchAllBulletsQuery()

  const handleSearchValue = (value: string) => {
    setSearchValue(value)
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

  const filtered = bullets
    ?.filter(filterFunction)
    .filter((bullet: Bullet) =>
      bullet.title
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )

  async function onClick(evt: React.MouseEvent<HTMLDivElement>) {
    const source = (evt.target as HTMLElement).closest(
      'button[data-action]'
    ) as HTMLButtonElement | null
    if (source) {
      const { action } = source.dataset
      if (action == 'Все') {
        setfilterFunction(() => () => true)
      } else {
        setfilterFunction(
          () => (el: { category?: string }) =>
            el.category == action
        )
      }
    }
  }
  return (
    <Container fluid className='mt-4'>
      <main className='min-h-[80.4vh]'>
        <div onClick={onClick}>
          <div>
            <SearchBar
              searchValue={searchValue}
              onSearch={handleSearchValue}
              onClick={() => setSearchValue('')}
            />
            <CategoriesList />
            <BulletList items={filtered} />
          </div>
        </div>
      </main>
    </Container>
  )
}
