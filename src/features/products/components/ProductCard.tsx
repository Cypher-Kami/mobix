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
    className="
      flex w-full flex-col overflow-hidden
      rounded-md border border-white/50
      bg-white/5 backdrop-blur-md
      cursor-pointer
      transition-all duration-300 ease-out
      hover:-translate-y-1 hover:scale-[1.01] hover:bg-white/10
      hover:animate-[glowPulse_2s_ease-in-out_infinite]
    "
  >
    {/* IMAGE */}
    <div className="h-64 bg-white rounded-t-md">
      <ProductImage
        src={product.imgUrl}
        alt={`${product.brand} ${product.model}`}
        className="h-full w-full object-contain p-6"
      />
    </div>

    {/* CONTENT */}
    <div className="
      border-t border-white/10
      bg-white/5
      text-white
      px-4 pt-3 pb-3
    ">
      
      {/* BRAND */}
      <span className="
        inline-block mb-1
        rounded-full bg-[#845ec2] px-2 py-0.5
        text-xs font-semibold text-white
      ">
        {product.brand}
      </span>

      {/* TITLE + PRICE */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium line-clamp-1">
          {product.model}
        </p>

        <span className="shrink-0 text-sm font-semibold">
          {product.price.replace(' EUR', '\u00a0€')}
        </span>
      </div>
    </div>
  </div>
)
}
