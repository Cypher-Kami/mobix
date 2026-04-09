import { useQuery } from '@tanstack/react-query'
import { fetchProductDetail } from '@/features/products/api/productApi'
import { ONE_HOUR_MS } from '@/lib/queryClient'

export function useProductDetail(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductDetail(id),
    staleTime: ONE_HOUR_MS,
    enabled: !!id,
    retry: 1,
  })
}
