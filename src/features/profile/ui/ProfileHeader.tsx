'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Container } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa'

import { getCurrentUser } from '@/shared/lib/getCurrentUser'
import EditBtn from '@/shared/ui/icon-buttons/EditBtn'

import { useFetchAllUsersQuery } from '@/entities/user/api/service'

export default function ProfileHeader() {
  const { data: session } = useSession()
  const { data: users } = useFetchAllUsersQuery()
  const userId = (
    session?.user as { id?: string | number } | undefined
  )?.id
  const currentUser = getCurrentUser(users, userId)
  return (
    <Container fluid className='mt-3 mb-3'>
      <div className='flex items-center gap-[30px]'>
        <FaUserCircle size={42} fill='rgb(185, 184, 182)' />
        <h3>
          {currentUser?.name ||
            (session?.user as { email?: string } | undefined)
              ?.email}
        </h3>
        <h3>{currentUser?.email}</h3>
        <Link href={`/editUser/${userId}`}>
          <EditBtn size={30} handleClick={() => {}} />
        </Link>
      </div>
    </Container>
  )
}
