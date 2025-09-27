import { Container } from 'react-bootstrap'

import ProfileBoard from '@/features/profile/ui/ProfileBoard'
import ProfileHeader from '@/features/profile/ui/ProfileHeader'

export default function UserProfile() {
  return (
    <Container fluid className='h-auto'>
      <ProfileHeader />
      <ProfileBoard />
    </Container>
  )
}
