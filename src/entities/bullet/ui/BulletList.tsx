import type { Bullet } from '@/entities/bullet/model/schema'
import BulletItem from '@/entities/bullet/ui/BulletItem'

interface Props {
  items?: Bullet[]
}

export default function BulletList({ items }: Props) {
  return (
    <div className='container-fluid px-3'>
      {/* Заголовок секции */}
      <div className='d-flex align-items-center justify-content-between mb-4'>
        <h2
          className='h4 fw-bold mb-0'
          style={{ color: '#1a1a1a' }}
        >
          Объявления
        </h2>
        <span className='text-muted small'>
          {items?.length || 0} объявлений
        </span>
      </div>

      {/* Сетка объявлений в стиле Avito */}
      <div
        className='d-grid gap-3'
        style={{
          gridTemplateColumns:
            'repeat(auto-fill, minmax(280px, 1fr))',
          gridAutoRows: 'auto'
        }}
      >
        {items?.map(item => (
          <BulletItem key={item.id} item={item} />
        ))}
      </div>

      {/* Пагинация (заглушка в стиле Avito) */}
      {items && items.length > 0 && (
        <div className='d-flex justify-content-center mt-5'>
          <nav>
            <ul className='pagination pagination-sm'>
              <li className='page-item active'>
                <span className='page-link'>1</span>
              </li>
              <li className='page-item'>
                <a
                  className='page-link text-decoration-none'
                  href='#'
                >
                  2
                </a>
              </li>
              <li className='page-item'>
                <a
                  className='page-link text-decoration-none'
                  href='#'
                >
                  3
                </a>
              </li>
              <li className='page-item'>
                <span className='page-link'>...</span>
              </li>
              <li className='page-item'>
                <a
                  className='page-link text-decoration-none'
                  href='#'
                >
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
