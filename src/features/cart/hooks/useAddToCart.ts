import { useMutation } from '@tanstack/react-query'
import { postCart } from '@/features/products/api/productApi'
import { useCartStore } from '@/features/cart/store/cartStore'

export function useAddToCart() {
  const setCount = useCartStore((s) => s.setCount)

  return useMutation({
    mutationFn: postCart,
    retry: 0,
    onSuccess: (data) => {
      setCount(data.count)
    },
  })
}
