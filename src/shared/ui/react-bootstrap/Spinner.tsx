import type { HTMLAttributes } from 'react'

export default function Spinner({
  className = '',
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-spin h-5 w-5 rounded-full border-2 border-gray-300 border-t-transparent ${className}`}
      {...rest}
    />
  )
}
