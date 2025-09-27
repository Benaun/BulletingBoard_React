'use client'

import React from 'react'

import EditBulletForm from '@/features/bullet-crud/ui/EditBulletForm'

import { getCurrentBullet } from '@/shared/lib/getCurrentBullet'

import { useFetchAllBulletsQuery } from '@/entities/bullet/api/service'

interface EditBulletProps {
  params: Promise<{ id: string }>
}

export default function EditBullet({ params }: EditBulletProps) {
  const { data: bullets } = useFetchAllBulletsQuery()

  // В реальном приложении лучше использовать React.use() или await в async компоненте
  const [id, setId] = React.useState<string | null>(null)

  React.useEffect(() => {
    params.then(resolvedParams => setId(resolvedParams.id))
  }, [params])

  const currentBullet = getCurrentBullet(
    bullets,
    id || undefined
  )

  return <EditBulletForm item={currentBullet} />
}
