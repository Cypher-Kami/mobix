import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { WrenchIcon, type WrenchIconHandle } from '@/components/ui/wrench'
import { Breadcrumb } from './Breadcrumb'
import { CartCounter } from './CartCounter'
import { useCartStore } from '@/features/cart/store/cartStore'

interface HeaderProps {
  breadcrumbItems: Array<{ label: string; href?: string }>
}

export function Header({ breadcrumbItems }: HeaderProps) {
  const count = useCartStore((s) => s.count)
  const wrenchRef = useRef<WrenchIconHandle>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      wrenchRef.current?.startAnimation()
    }, 2000)
    wrenchRef.current?.startAnimation()
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur-xl border-b border-white/20">
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-4 h-16">
        <Link to="/" className="flex items-center gap-2">
          <WrenchIcon ref={wrenchRef} size={22} className="text-white" />
          <span className="text-xl font-bold tracking-tight text-white">
            MOBIX
          </span>
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
