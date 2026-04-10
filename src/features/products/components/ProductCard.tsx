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
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`${product.brand} ${product.model}`}
      className="flex w-full flex-col border border-gray-200 bg-[#F4F2EF] cursor-pointer transition hover:-translate-y-1"
    >
      <div className="h-64 bg-white">
        <ProductImage
          src={product.imgUrl}
          alt={`${product.brand} ${product.model}`}
          className="h-full w-full object-contain p-4"
        />
      </div>
      <div className="border-t border-gray-200 bg-[#F4F2EF] px-3 py-3">
        <span className="inline-block mb-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-gray-700">
          {product.brand}
        </span>
        <div className="flex items-baseline justify-between gap-2">
          <p className="line-clamp-1 text-md text-[#111827]">{product.model}</p>
          <span className="shrink-0 text-sm font-bold" style={{ color: 'rgb(69, 71, 69)' }}>
            {product.price.replace(' EUR', '\u00a0€')}
          </span>
        </div>
      </div>
    </div>
  )
}
