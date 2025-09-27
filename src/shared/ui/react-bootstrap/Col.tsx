import type { HTMLAttributes, PropsWithChildren } from 'react'

interface ColProps extends HTMLAttributes<HTMLDivElement> {
  xs?: number
  md?: number
  lg?: number
  xl?: number
}

export default function Col({
  children,
  className = '',
  ...rest
}: PropsWithChildren<ColProps>) {
  const widthClass = 'w-full'
  return (
    <div className={`px-2 ${widthClass} ${className}`} {...rest}>
      {children}
    </div>
  )
}
