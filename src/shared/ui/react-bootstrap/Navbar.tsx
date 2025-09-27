import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren
} from 'react'

function NavbarRoot({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <nav
      className={`w-full bg-white/80 backdrop-blur border-b ${className}`}
      {...rest}
    >
      <div className='max-w-screen-xl mx-auto px-4 py-2'>
        {children}
      </div>
    </nav>
  )
}

function Brand({
  children,
  className = '',
  ...rest
}: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return (
    <a
      className={`inline-flex items-center gap-2 ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

function Text({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span
      className={`text-sm text-gray-700 ${className}`}
      {...rest}
    >
      {children}
    </span>
  )
}

const Navbar = Object.assign(NavbarRoot, { Brand, Text })

export default Navbar
