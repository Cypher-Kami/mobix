import { ShoppingCart } from 'lucide-react'

interface CartCounterProps {
  count: number
}

export function CartCounter({ count }: CartCounterProps) {
  return (
    <div className="relative flex items-center gap-2">
      <ShoppingCart className="h-5 w-5" />
      <span
        key={count}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white animate-[cartBounce_0.3s_ease-out]"
      >
        {count}
      </span>
    </div>
  )
}
