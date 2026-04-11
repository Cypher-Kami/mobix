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
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Mobix — Ir al inicio">
            <WrenchIcon ref={wrenchRef} size={22} className="text-[#845ec2]" />
            <span className="text-xl font-bold tracking-tight text-[#845ec2]" style={{ fontFamily: 'ZenDots, cursive' }}>
              Mobix
            </span>
          </Link>
          <div className="hidden sm:flex flex-1 justify-center mx-4 min-w-0 overflow-hidden">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div className="shrink-0">
            <CartCounter count={count} />
          </div>
        </div>
        {breadcrumbItems.length > 0 && (
          <div className="sm:hidden flex justify-center pb-2 -mt-1">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        )}
      </div>
    </header>
  )
}
