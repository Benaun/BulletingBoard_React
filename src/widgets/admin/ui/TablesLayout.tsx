import { Fragment, PropsWithChildren } from 'react'
import Table from 'react-bootstrap/Table'

interface Column<T> {
  title: string
  getVal: (row: T) => React.ReactNode
}

interface TableLayoutProps<T> {
  items: T[]
  columns: Column<T>[]
  newUserId?: string | number | null
}

export default function TableLayout<
  T extends { id: string | number }
>({
  items,
  columns,
  newUserId,
  children
}: PropsWithChildren<TableLayoutProps<T>>) {
  return (
    <Table striped bordered hover responsive className='text-sm'>
      <thead>
        <tr className='bg-gray-100'>
          {columns.map(({ title }) => (
            <th key={title} className='font-medium text-text'>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <Fragment key={String(item.id)}>
            {String(item.id) === String(newUserId) ? (
              <>{children}</>
            ) : (
              <tr
                key={String(item.id)}
                data-user-id={String(item.id)}
              >
                {columns.map(({ title, getVal }) => (
                  <td key={title} className='text-text'>
                    {getVal(item)}
                  </td>
                ))}
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
      {!newUserId && <tfoot>{children}</tfoot>}
    </Table>
  )
}
