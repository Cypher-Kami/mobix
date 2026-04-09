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
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-blue-600 hover:text-blue-700 transition-colors"
          >
            Mobix
          </Link>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <CartCounter count={count} />
      </div>
    </header>
  )
}
