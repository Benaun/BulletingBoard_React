'use client'

import { useQuery } from '@tanstack/react-query'

import { httpDelete, httpGet } from '@/shared/api/http'

import TableLayout from '@/widgets/admin/ui/TablesLayout'

interface AdminBullet {
  id: number
  title: string
  price: number | string
  category?: string
  city?: string
}
const columnsBullets: {
  title: string
  getVal: (obj: AdminBullet) => React.ReactNode
}[] = [
  { title: '#', getVal: obj => obj.id },
  { title: 'Название', getVal: obj => obj.title },
  { title: 'Цена', getVal: obj => obj.price },
  { title: 'Категория', getVal: obj => obj.category },
  { title: 'Город', getVal: obj => obj.city }
]
const columnsWithButtons = columnsBullets.concat({
  title: '',
  getVal: ({ id }: AdminBullet) => (
    <button
      className='px-[5px] py-[2px] rounded-[8px] bg-[rgb(216,96,96)] text-white'
      data-id={id}
      data-action='delete'
    >
      X
    </button>
  )
})

export default function BulletsTable() {
  const { data: bullets } = useQuery<AdminBullet[]>({
    queryKey: ['admin-bullets'],
    queryFn: () => httpGet('/bullets')
  })

  async function onClick(evt: React.MouseEvent<HTMLDivElement>) {
    const source = (evt.target as HTMLElement).closest(
      'button[data-action]'
    ) as HTMLButtonElement | null
    if (!source) return
    const { action, id } = source.dataset
    if (action === 'delete' && id) {
      await httpDelete(`/bullets/${id}`)
    }
  }

  return (
    <div onClick={onClick}>
      <h2 className='text-center'>Таблица объявлений</h2>
      {bullets && (
        <TableLayout
          items={bullets}
          columns={columnsWithButtons}
        />
      )}
    </div>
  )
}
