import type { ChangeEvent } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

interface SearchBarProps {
  searchValue: string
  onSearch: (value: string) => void
  onClick: () => void
}

export default function SearchBar({
  searchValue,
  onSearch,
  onClick
}: SearchBarProps) {
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    onSearch(event.target.value)
  }

  return (
    <Container>
      <InputGroup className='mt-4'>
        <Form.Control
          className='w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 border border-[var(--color-border)] bg-white'
          placeholder='Поиск'
          aria-label='Поле поиска'
          aria-describedby='searchbar'
          value={searchValue}
          onChange={handleInputChange}
        />
        <Button
          id='searchbar'
          onClick={onClick}
          aria-label='Очистить поиск'
          tabIndex={0}
          className='inline-flex items-center justify-center rounded-md bg-gray-100 text-[color:var(--color-text)] hover:bg-gray-200 px-3 py-2 text-sm'
        >
          Х
        </Button>
      </InputGroup>
    </Container>
  )
}
