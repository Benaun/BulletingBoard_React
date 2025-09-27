import { Container, Row } from 'react-bootstrap'

import type { Bullet } from '@/entities/bullet/model/schema'
import BulletItem from '@/entities/bullet/ui/BulletItem'

export default function UserBulletList({
  items
}: {
  items: Bullet[]
}) {
  return (
    <Container fluid className='mt-3 mb-3'>
      <Row>
        {items.map(item => (
          <BulletItem key={item.id} item={item} />
        ))}
      </Row>
    </Container>
  )
}
