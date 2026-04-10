import { Link } from 'react-router-dom'
import { Breadcrumb } from './Breadcrumb'
import { CartCounter } from './CartCounter'
import { useCartStore } from '@/features/cart/store/cartStore'

interface HeaderProps {
  breadcrumbItems: Array<{ label: string; href?: string }>
}

export function Header({ breadcrumbItems }: HeaderProps) {
  const count = useCartStore((s) => s.count)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur-xl border-b border-white/20">
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-4 h-16">
        <Link to="/" className="text-lg font-bold tracking-tight text-white">
          Mobix
        </Link>
        <div className="flex justify-center">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className="flex justify-end">
          <CartCounter count={count} />
        </div>
      </div>
    </header>
  )
}
