import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'

import CategoriesItem from '@/features/categories/ui/CategoriesListItem'

import categories from '@/shared/constants/categories'

export default function CategoriesList() {
  const [activeItem, setActiveItem] = useState(0)
  return (
    <Container fluid className='mt-4'>
      <Row className='flex justify-between items-center text-center max-w-full'>
        {categories.map((category, id) => (
          <CategoriesItem
            key={id}
            item={category}
            active={id === activeItem}
            onClick={() => setActiveItem(id)}
          />
        ))}
      </Row>
    </Container>
  )
}
