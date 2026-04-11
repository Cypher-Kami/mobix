import { useMutation } from '@tanstack/react-query'
import { postCart } from '@/features/products/api/productApi'
import { useCartStore } from '@/features/cart/store/cartStore'

export function useAddToCart() {
  const setCount = useCartStore((s) => s.setCount)

  return useMutation({
    mutationFn: postCart,
    retry: 0,
    onSuccess: () => {
      const current = useCartStore.getState().count
      setCount(current + 1)
    },
  })
}
