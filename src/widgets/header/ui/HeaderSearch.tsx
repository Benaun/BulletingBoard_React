'use client'

import { useState } from 'react'

import { useSearch } from '@/shared/contexts/useSearch'

export default function HeaderSearch() {
  const { searchValue, setSearchValue } = useSearch()
  const [inputValue, setInputValue] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchValue(inputValue)
  }

  const handleClear = () => {
    setInputValue('')
    setSearchValue('')
  }

  return (
    <div className='flex-1 max-w-2xl mx-4'>
      <form onSubmit={handleSearch} className='w-full'>
        <div className='flex items-stretch border border-gray-300 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow'>
          <div className='relative flex-1 bg-blue-400'>
            <input
              type='text'
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder='Поиск по объявлениям'
              className={`w-full h-12 pl-4 text-base bg-white border-2 border-blue-400 rounded-2xl focus:outline-none placeholder-gray-500 ${
                inputValue ? 'pr-10' : 'pr-4'
              }`}
            />
            {inputValue && (
              <button
                type='button'
                onClick={handleClear}
                className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-100'
                aria-label='Очистить поиск'
              >
                <svg
                  width='14'
                  height='14'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            )}
          </div>
          <button
            type='submit'
            className='px-6 text-white font-semibold transition-colors bg-blue-400 hover:bg-blue-500
            '
          >
            Найти
          </button>
        </div>
      </form>
    </div>
  )
}
