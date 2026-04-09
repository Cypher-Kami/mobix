import { useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
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
    <article
      className="cursor-pointer rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-150 hover:scale-[1.02] hover:shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`${product.brand} ${product.model}`}
    >
      <ProductImage
        src={product.imgUrl}
        alt={`${product.brand} ${product.model}`}
        className="mb-4 aspect-square w-full rounded-lg object-contain"
      />
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {product.brand}
        </p>
        <p className="font-semibold text-gray-900">{product.model}</p>
        <p className="text-sm font-medium text-blue-600">{product.price}</p>
      </div>
    </article>
  )
}
