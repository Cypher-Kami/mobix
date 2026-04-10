import { useEffect, useState } from 'react'
import { useProducts } from '@/features/products/hooks/useProducts'
import { filterProducts } from '@/features/products/api/productApi'
import { Header } from '@/shared/components/Header'
import { SearchInput } from '@/features/products/components/SearchInput'
import { ProductGrid } from '@/features/products/components/ProductGrid'

export default function PLPPage() {
  const { data, isLoading, isError, refetch } = useProducts()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const filteredProducts = filterProducts(data ?? [], debouncedQuery)

  return (
    <div className="min-h-screen">
      <Header breadcrumbItems={[]} />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} productos
          </p>
          <div className="w-full max-w-xs">
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          isError={isError}
          searchQuery={debouncedQuery}
          onRetry={() => void refetch()}
        />
      </main>
    </div>
  )
}
