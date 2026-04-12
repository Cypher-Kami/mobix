import { useRef, useState } from 'react'
import { CartIcon, type CartIconHandle } from '@/components/ui/cart'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/features/cart/store/cartStore'

interface CartCounterProps {
  count: number
}

export function CartCounter({ count }: CartCounterProps) {
  const cartRef = useRef<CartIconHandle>(null)
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const items = useCartStore((s) => s.items)

  function handleEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
    cartRef.current?.startAnimation()
  }

  function handleLeave() {
    cartRef.current?.stopAnimation()
    timeoutRef.current = setTimeout(() => setOpen(false), 200)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className="relative cursor-pointer p-2"
        role="status"
        aria-label={`Carrito: ${count} ${count === 1 ? 'producto' : 'productos'}`}
      >
        <CartIcon ref={cartRef} size={22} aria-hidden="true" />
        <Badge
          key={count}
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-[#845ec2] text-white border-0 animate-[cartBounce_0.3s_ease-out]"
        >
          {count}
        </Badge>
      </div>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-64 rounded-lg border border-white/20 bg-[#0f172a] shadow-2xl shadow-black/40 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
            <span className="text-xs font-semibold text-white">Carrito</span>
            <span className="rounded-full bg-[#845ec2]/30 px-2 py-0.5 text-[10px] font-semibold text-[#845ec2]">
              {count} {count === 1 ? 'item' : 'items'}
            </span>
          </div>

          {items.length === 0 ? (
            <p className="px-4 py-4 text-center text-xs text-gray-400">
              El carrito está vacío
            </p>
          ) : (
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
          )}
        </div>
      )}
    </div>
  )
}
