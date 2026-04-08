import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/features/products/api/productApi'
import { ONE_HOUR_MS } from '@/lib/queryClient'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: ONE_HOUR_MS,
  })
}
