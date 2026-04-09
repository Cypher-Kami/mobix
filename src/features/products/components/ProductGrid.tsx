import type { ProductItem } from '@/features/products/api/productTypes'
import { ProductCard } from './ProductCard'
import { SkeletonCard } from './SkeletonCard'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'

const SKELETON_COUNT = 8

interface ProductGridProps {
  products: ProductItem[] | undefined
  isLoading: boolean
  isError: boolean
  searchQuery: string
  onRetry: () => void
}

export function ProductGrid({
  products,
  isLoading,
  isError,
  searchQuery,
  onRetry,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (isError) {
    return <ErrorState onRetry={onRetry} />
  }

  if (!products || products.length === 0) {
    return <EmptyState query={searchQuery} />
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
