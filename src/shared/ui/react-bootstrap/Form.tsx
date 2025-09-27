import type {
  FormHTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
  TextareaHTMLAttributes
} from 'react'

function FormRoot({
  children,
  className = '',
  ...rest
}: PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>) {
  return (
    <form className={className} {...rest}>
      {children}
    </form>
  )
}

type ControlProps = (
  | ({
      as?: 'textarea'
    } & TextareaHTMLAttributes<HTMLTextAreaElement>)
  | ({ as?: 'input' } & InputHTMLAttributes<HTMLInputElement>)
) & { className?: string }

function Control(props: ControlProps) {
  const { as, className = '', ...rest } = props as ControlProps
  const base = `block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400`
  if (as === 'textarea') {
    const r = rest as TextareaHTMLAttributes<HTMLTextAreaElement>
    return <textarea className={`${base} ${className}`} {...r} />
  }
  const r = rest as InputHTMLAttributes<HTMLInputElement>
  return <input className={`${base} ${className}`} {...r} />
}

const Form = Object.assign(FormRoot, { Control })

export default Form
