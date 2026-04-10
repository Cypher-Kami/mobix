import { ShoppingCart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface CartCounterProps {
  count: number
}

export function CartCounter({ count }: CartCounterProps) {
  return (
    <Button variant="ghost" size="icon" className="relative" aria-label="Carrito">
      <ShoppingCart className="h-5 w-5" />
      <Badge
        key={count}
        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-[#845ec2] text-white border-0 animate-[cartBounce_0.3s_ease-out]"
      >
        {count}
      </Badge>
    </Button>
  )
}
