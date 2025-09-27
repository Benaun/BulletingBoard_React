import type { HTMLAttributes, PropsWithChildren } from 'react'

interface TabProps extends HTMLAttributes<HTMLDivElement> {
  eventKey?: string
  title?: string
}

export default function Tab({
  children,
  className = '',
  ...rest
}: PropsWithChildren<TabProps>) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}
