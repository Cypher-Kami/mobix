import { useNavigate } from 'react-router-dom'
import { ProductImage } from './ProductImage'
import type { ProductItem } from '@/features/products/api/productTypes'

interface ProductCardProps {
  product: ProductItem
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/product/${product.id}`)
  }

  return (
  <div
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
    <div className="h-64 bg-white rounded-t-md">
      <ProductImage
        src={product.imgUrl}
        alt={`${product.brand} ${product.model}`}
        className="h-full w-full object-contain p-6"
      />
    </div>

    <div className="
      border-t border-white/10
      bg-white/5
      text-white
      px-4 pt-3 pb-3
    ">
      <span className="
        inline-block mb-1
        rounded-full bg-[#845ec2] px-2 py-0.5
        text-xs font-semibold text-white
      ">
        {product.brand}
      </span>

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
