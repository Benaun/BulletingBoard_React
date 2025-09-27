import type {
  PropsWithChildren,
  TableHTMLAttributes
} from 'react'

interface TableProps
  extends TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean
  bordered?: boolean
  hover?: boolean
  responsive?: boolean
}

export default function Table({
  children,
  className = '',
  ...rest
}: PropsWithChildren<TableProps>) {
  return (
    <table
      className={`w-full border-collapse text-sm ${className}`}
      {...rest}
    >
      {children}
    </table>
  )
}
