'use client'

import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import FavoritesBullets from '@/features/profile/ui/FavoriteBullets'
import UserBullets from '@/features/profile/ui/UserBullets'

export default function ProfileBoard() {
  const [key, setKey] = useState('bullets')
  return (
    <Container fluid className='mt-4'>
      <main className='min-h-[76vh]'>
        <Tabs
          id='tabs'
          activeKey={key}
          onSelect={k => setKey(k as string)}
        >
          <Tab eventKey='bullets' title='Мои объявления'>
            <UserBullets />
          </Tab>
          <Tab eventKey='favorites' title='Избранное'>
            <FavoritesBullets />
          </Tab>
        </Tabs>
      </main>
    </Container>
  )
}
