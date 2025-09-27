'use client'

import { type ReactNode, createContext, useState } from 'react'

interface SearchContextType {
  searchValue: string
  setSearchValue: (value: string) => void
}

const SearchContext = createContext<
  SearchContextType | undefined
>(undefined)

export function SearchProvider({
  children
}: {
  children: ReactNode
}) {
  const [searchValue, setSearchValue] = useState('')

  return (
    <SearchContext.Provider
      value={{ searchValue, setSearchValue }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContext
