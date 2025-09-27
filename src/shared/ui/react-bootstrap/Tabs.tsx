import type { HTMLAttributes, PropsWithChildren } from 'react'

type TabsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onSelect'
> & {
  id?: string
  activeKey?: string
  onSelect?: (k: string) => void
}

function TabsRoot({
  children,
  className = '',
  activeKey,
  onSelect,
  ...rest
}: PropsWithChildren<TabsProps>) {
  void activeKey
  void onSelect
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}

function Tab({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}

const Tabs = Object.assign(TabsRoot, { Tab })

export default Tabs
