import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb } from './Breadcrumb'
import { CartCounter } from './CartCounter'
import { useCartStore } from '@/features/cart/store/cartStore'

interface HeaderProps {
  breadcrumbItems: Array<{ label: string; href?: string }>
}

export function Header({ breadcrumbItems }: HeaderProps) {
  const count = useCartStore((s) => s.count)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-14">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-bold tracking-tight">
            Mobix
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <CartCounter count={count} />
      </div>
    </header>
  )
}
