import { useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductImage } from './ProductImage'
import { fetchProductDetail } from '@/features/products/api/productApi'
import { ONE_HOUR_MS } from '@/lib/queryClient'
import type { ProductItem } from '@/features/products/api/productTypes'

const PREFETCH_DELAY_MS = 150

interface ProductCardProps {
  product: ProductItem
}

export function ProductCard({ product }: ProductCardProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleMouseEnter() {
    timerRef.current = setTimeout(() => {
      void queryClient.prefetchQuery({
        queryKey: ['product', product.id],
        queryFn: () => fetchProductDetail(product.id),
        staleTime: ONE_HOUR_MS,
      })
    }, PREFETCH_DELAY_MS)
  }

  function handleMouseLeave() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  function handleClick() {
    navigate(`/product/${product.id}`)
  }

  return (
    <Card
      className="cursor-pointer transition-all duration-150 hover:scale-[1.02] hover:shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`${product.brand} ${product.model}`}
    >
      <CardContent className="p-4">
        <div className="mb-4 overflow-hidden rounded-lg bg-muted/30">
          <ProductImage
            src={product.imgUrl}
            alt={`${product.brand} ${product.model}`}
            className="aspect-square w-full object-contain p-2"
          />
        </div>
        <div className="space-y-1.5">
          <Badge variant="secondary" className="text-xs font-normal">
            {product.brand}
          </Badge>
          <p className="font-semibold leading-tight">{product.model}</p>
          <p className="text-sm font-medium text-primary">{product.price}</p>
        </div>
      </CardContent>
    </Card>
  )
}
