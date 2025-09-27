'use client'

import React from 'react'

import UserEditForm from '@/features/profile/ui/UserEditForm'

import { getCurrentUser } from '@/shared/lib/getCurrentUser'

import { useFetchAllUsersQuery } from '@/entities/user/api/service'

interface EditUserProps {
  params: Promise<{ id: string }>
}

export default function EditUser({ params }: EditUserProps) {
  const { data: users } = useFetchAllUsersQuery()

  // В реальном приложении лучше использовать React.use() или await в async компоненте
  const [id, setId] = React.useState<string | null>(null)

  React.useEffect(() => {
    params.then(resolvedParams => setId(resolvedParams.id))
  }, [params])

  const currentUser = getCurrentUser(users, id || undefined)

  return <UserEditForm item={currentUser} />
}
