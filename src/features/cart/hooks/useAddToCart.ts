import { useMutation } from '@tanstack/react-query'
import { postCart } from '@/features/products/api/productApi'
import { useCartStore, type CartItem } from '@/features/cart/store/cartStore'

interface AddToCartParams {
  id: string
  colorCode: number
  storageCode: number
  item: CartItem
}

export function useAddToCart() {
  const addItem = useCartStore((s) => s.addItem)

  return useMutation({
    mutationFn: ({ id, colorCode, storageCode }: AddToCartParams) =>
      postCart({ id, colorCode, storageCode }),
    retry: 0,
    onSuccess: (_data, variables) => {
      addItem(variables.item)
    },
  })
}
