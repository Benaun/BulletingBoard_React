'use client'

import { Container } from 'react-bootstrap'

import BulletsTable from '@/widgets/admin/ui/BulletsTable'
import UsersTable from '@/widgets/admin/ui/UsersTable'

export default function AdminPanel() {
  return (
    <Container fluid className='mt-3'>
      <BulletsTable />
      <UsersTable />
    </Container>
  )
}
