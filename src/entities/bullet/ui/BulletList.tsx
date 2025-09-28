import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll'

import type { Bullet } from '@/entities/bullet/model/schema'
import BulletItem from '@/entities/bullet/ui/BulletItem'

interface Props {
  items?: Bullet[]
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  fetchNextPage?: () => void
}

export default function BulletList({
  items,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage
}: Props) {
  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage: fetchNextPage || (() => {}),
    threshold: 200
  })

  return (
    <div className='container-fluid px-3'>
      {/* Сетка объявлений в стиле Avito */}
      <div className='grid gap-3 grid-cols-[repeat(auto-fill,minmax(280px,1fr))] auto-rows-auto'>
        {items?.map(item => (
          <BulletItem key={item.id} item={item} />
        ))}
      </div>

      {/* Индикатор загрузки для бесконечного скролла */}
      {fetchNextPage && (
        <div
          ref={loadMoreRef}
          className='flex justify-center items-center py-8'
        >
          {isFetchingNextPage ? (
            <div className='flex items-center gap-2'>
              <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600'></div>
              <span className='text-gray-600'>Загрузка...</span>
            </div>
          ) : hasNextPage ? (
            <div className='text-gray-400 text-sm'>
              Прокрутите вниз для загрузки еще объявлений
            </div>
          ) : (
            <div className='text-gray-400 text-sm'>
              Все объявления загружены
            </div>
          )}
        </div>
      )}
    </div>
  )
}
