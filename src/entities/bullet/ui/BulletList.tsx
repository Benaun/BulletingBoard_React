import type { Bullet } from '@/entities/bullet/model/schema'
import BulletItem from '@/entities/bullet/ui/BulletItem'

interface Props {
  items?: Bullet[]
}

export default function BulletList({ items }: Props) {
  return (
    <div className='container-fluid px-3'>
      {/* Сетка объявлений в стиле Avito */}
      <div className='grid gap-3 grid-cols-[repeat(auto-fill,minmax(280px,1fr))] auto-rows-auto'>
        {items?.map(item => (
          <BulletItem key={item.id} item={item} />
        ))}
      </div>

      {/* Пагинация (заглушка в стиле Avito) */}
      {items && items.length > 0 && (
        <div className='flex justify-center mt-5'>
          <nav>
            <ul className='pagination pagination-sm'>
              <li className='page-item active'>
                <span className='page-link'>1</span>
              </li>
              <li className='page-item'>
                <a className='page-link no-underline' href='#'>
                  2
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link no-underline' href='#'>
                  3
                </a>
              </li>
              <li className='page-item'>
                <span className='page-link'>...</span>
              </li>
              <li className='page-item'>
                <a className='page-link no-underline' href='#'>
                  100
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}
