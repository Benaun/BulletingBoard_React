import type { HTMLAttributes, PropsWithChildren } from 'react'

export default function Row({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={`flex flex-wrap -mx-2 ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
