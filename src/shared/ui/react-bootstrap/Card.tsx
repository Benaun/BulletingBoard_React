import type { HTMLAttributes, PropsWithChildren } from 'react'

function CardRoot({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={`rounded-md border border-gray-200 bg-white shadow-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

function Body({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={`p-4 ${className}`} {...rest}>
      {children}
    </div>
  )
}

function Title({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h3
      className={`text-base font-semibold ${className}`}
      {...rest}
    >
      {children}
    </h3>
  )
}

function Text({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
  return (
    <p
      className={`text-sm text-gray-600 ${className}`}
      {...rest}
    >
      {children}
    </p>
  )
}

const Card = Object.assign(CardRoot, { Body, Title, Text })

export default Card
