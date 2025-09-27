import type { HTMLAttributes, PropsWithChildren } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  fluid?: boolean
}

export default function Container({
  children,
  className = '',
  fluid,
  ...rest
}: PropsWithChildren<ContainerProps>) {
  const base = fluid
    ? 'w-full px-4'
    : 'max-w-screen-xl mx-auto px-4'
  return (
    <div className={`${base} ${className}`} {...rest}>
      {children}
    </div>
  )
}
