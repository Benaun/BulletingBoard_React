import { useEffect, useRef, useState } from 'react'

import categories from '@/entities/category/model/categories'
import CategoriesItem from '@/entities/category/ui/CategoriesListItem'

interface CategoriesListProps {
  onCategorySelect?: (categoryIds: number[]) => void
  selectedCategoryIds?: number[]
}

export default function CategoriesList({
  onCategorySelect,
  selectedCategoryIds = []
}: CategoriesListProps) {
  const [activeItems, setActiveItems] = useState<number[]>(
    selectedCategoryIds
  )
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActiveItems(selectedCategoryIds)
  }, [selectedCategoryIds])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [])

  const handleCategoryClick = (categoryId: number) => {
    let newActiveItems: number[]

    if (activeItems.includes(categoryId)) {
      // Убираем категорию из выбранных
      newActiveItems = activeItems.filter(
        id => id !== categoryId
      )
    } else {
      // Добавляем категорию к выбранным
      newActiveItems = [...activeItems, categoryId]
    }

    setActiveItems(newActiveItems)
    onCategorySelect?.(newActiveItems)
  }

  const handleSelectAll = () => {
    const allCategoryIds = categories.map(cat => cat.id)
    setActiveItems(allCategoryIds)
    onCategorySelect?.(allCategoryIds)
  }

  const handleClearAll = () => {
    setActiveItems([])
    onCategorySelect?.([])
  }

  return (
    <div className='w-full mt-6'>
      {/* Заголовок */}
      <div className='mb-4'>
        <h2 className='text-xl font-bold text-gray-900'>
          Все категории
        </h2>
      </div>

      {/* Мобильные устройства - выпадающий список */}
      <div className='block sm:hidden mb-4'>
        <div
          className='relative flex items-center'
          ref={dropdownRef}
        >
          {/* Кнопка выпадающего списка */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='w-[300px] flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full shadow-sm hover:shadow-md hover:from-blue-100 hover:to-indigo-100 transition-all duration-200'
          >
            <div className='flex items-center'>
              <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2'>
                <svg
                  className='w-3 h-3 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                  />
                </svg>
              </div>
              <span className='text-xs font-medium text-gray-700'>
                {activeItems.length === 0
                  ? 'Категории'
                  : `${activeItems.length} выбрано`}
              </span>
            </div>
            <div
              className={`w-6 h-6 bg-white rounded-full flex items-center justify-center transition-all duration-200 ${isDropdownOpen ? 'rotate-180 bg-blue-500' : 'hover:bg-blue-50'}`}
            >
              <svg
                className={`w-3 h-3 transition-colors duration-200 text-grey`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </button>

          {/* Выпадающий список */}
          {isDropdownOpen && (
            <div className='absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-200 rounded-2xl shadow-2xl z-50 max-h-80 overflow-hidden'>
              {/* Кнопки управления */}
              <div className='p-3 bg-gray-50 border-b border-gray-200 flex gap-2'>
                <button
                  onClick={handleSelectAll}
                  className='flex-1 px-4 py-2 text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-sm hover:shadow-md'
                >
                  ✓ Выбрать все
                </button>
                <button
                  onClick={handleClearAll}
                  className='flex-1 px-4 py-2 text-xs font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-sm hover:shadow-md'
                >
                  ✕ Очистить
                </button>
              </div>

              {/* Список категорий в 3 столбца */}
              <div className='max-h-60 overflow-y-auto p-3'>
                <div className='grid grid-cols-3 gap-1'>
                  {categories.map(category => (
                    <div
                      key={category.id}
                      onClick={() =>
                        handleCategoryClick(category.id)
                      }
                      className={`p-1 rounded-lg cursor-pointer transition-all duration-200 ${
                        activeItems.includes(category.id)
                          ? 'bg-blue-100 border border-blue-300'
                          : 'bg-gray-100 hover:bg-gray-200 border border-transparent'
                      }`}
                    >
                      <div className='flex flex-col items-center text-center'>
                        <span className='text-sm mb-1'>
                          {category.icon}
                        </span>
                        <span
                          className={`text-[10px] font-medium leading-tight ${
                            activeItems.includes(category.id)
                              ? 'text-blue-800'
                              : 'text-gray-700'
                          }`}
                        >
                          {category.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Футер с информацией */}
              {activeItems.length > 0 && (
                <div className='bg-blue-50 p-3 border-t border-blue-200'>
                  <div className='flex items-center justify-center text-blue-600'>
                    <svg
                      className='w-4 h-4 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span className='text-xs font-medium'>
                      Выбрано {activeItems.length} из{' '}
                      {categories.length} категорий
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Планшеты и десктопы - сетка */}
      <div className='hidden sm:block'>
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 sm:gap-4'>
          {categories.map(category => (
            <CategoriesItem
              key={category.id}
              item={category}
              active={activeItems.includes(category.id)}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>
      </div>

      {/* Стили для скрытия полосы прокрутки */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
