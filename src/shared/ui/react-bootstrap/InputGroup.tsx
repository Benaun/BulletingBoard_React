import type { HTMLAttributes, PropsWithChildren } from 'react'

function InputGroupRoot({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={`flex items-stretch gap-2 ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

function Text({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-3 text-sm text-gray-700 ${className}`}
      {...rest}
    >
      {children}
    </span>
  )
}

const InputGroup = Object.assign(InputGroupRoot, { Text })

export default InputGroup
