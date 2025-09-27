import type {
  ButtonHTMLAttributes,
  PropsWithChildren
} from 'react'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'success' | 'warning' | 'outline-secondary' | string
}

export default function Button({
  children,
  className = '',
  variant,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const variantClass =
    variant === 'success'
      ? 'bg-green-600 hover:bg-green-700 text-white'
      : variant === 'warning'
        ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
        : variant === 'outline-secondary'
          ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          : 'bg-gray-900 hover:bg-gray-800 text-white'
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-3 py-2 disabled:opacity-50 ${variantClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
