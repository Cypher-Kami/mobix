import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { CartIcon, type CartIconHandle } from '@/components/ui/cart'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/features/cart/store/cartStore'

interface CartCounterProps {
  count: number
}

export function CartCounter({ count }: CartCounterProps) {
  const cartRef = useRef<CartIconHandle>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(null)
  const [open, setOpen] = useState(false)
  const items = useCartStore((s) => s.items)

  const hasItems = count > 0

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 400)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  function handleClick() {
    if (!hasItems) return
    cancelClose()
    setOpen((v) => !v)
  }

  function handleMouseEnter() {
    if (!hasItems) return
    cancelClose()
    setOpen(true)
    cartRef.current?.startAnimation()
  }

  function handleMouseLeave() {
    cartRef.current?.stopAnimation()
    scheduleClose()
  }

  // Close on outside click/touch (mobile)
  useEffect(() => {
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleOutside)
      document.addEventListener('touchstart', handleOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('touchstart', handleOutside)
    }
  }, [open])

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="relative flex items-center gap-1 cursor-pointer p-2"
        aria-label={`Carrito: ${count} ${count === 1 ? 'producto' : 'productos'}`}
        aria-expanded={hasItems ? open : undefined}
        onClick={handleClick}
      >
        <div className="relative">
          <CartIcon ref={cartRef} size={22} aria-hidden="true" />
          <Badge
            key={count}
            aria-hidden="true"
            className="absolute -top-2.5 -right-3 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-[#845ec2] text-white border-0 animate-[cartBounce_0.3s_ease-out]"
          >
            {count}
          </Badge>
        </div>
        {hasItems && (
          <ChevronDown
            className={`ml-1 h-3.5 w-3.5 text-white/70 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      {open && hasItems && (
        <div className="absolute right-0 top-full mt-1 w-64 rounded-lg border border-white/20 bg-[#0f172a] shadow-2xl shadow-black/40 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
            <span className="text-xs font-semibold text-white">Carrito</span>
            <span className="rounded-full bg-[#845ec2]/30 px-2 py-0.5 text-[10px] font-semibold text-[#845ec2]">
              {count} {count === 1 ? 'item' : 'items'}
            </span>
          </div>
          <ul className="max-h-52 overflow-y-auto">
            {items.map((item, i) => (
              <li
                key={`${item.id}-${i}`}
                className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/10"
              >
                <img
                  src={item.imgUrl}
                  alt=""
                  className="h-8 w-8 shrink-0 rounded-md bg-white object-contain p-1"
                />
                <span className="text-xs text-white truncate">
                  {item.brand} {item.model}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
