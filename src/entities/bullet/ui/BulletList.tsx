import { Container, Row } from 'react-bootstrap'

import type { Bullet } from '@/entities/bullet/model/schema'
import BulletItem from '@/entities/bullet/ui/BulletItem'

interface Props {
  items?: Bullet[]
}

export default function BulletList({ items }: Props) {
  return (
    <Container fluid className='mt-3 mb-3'>
      <Row>
        {items?.map(item => (
          <BulletItem key={item.id} item={item} />
        ))}
      </Row>
    </Container>
  )
}
