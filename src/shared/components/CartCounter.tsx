import { useRef } from 'react'
import { CartIcon, type CartIconHandle } from '@/components/ui/cart'
import { Badge } from '@/components/ui/badge'

interface CartCounterProps {
  count: number
}

export function CartCounter({ count }: CartCounterProps) {
  const cartRef = useRef<CartIconHandle>(null)

  return (
    <div
      className="relative cursor-pointer p-2"
      aria-label="Carrito"
      onMouseEnter={() => cartRef.current?.startAnimation()}
      onMouseLeave={() => cartRef.current?.stopAnimation()}
    >
      <CartIcon ref={cartRef} size={22} />
      <Badge
        key={count}
        className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-[#845ec2] text-white border-0 animate-[cartBounce_0.3s_ease-out]"
      >
        {count}
      </Badge>
    </div>
  )
}
