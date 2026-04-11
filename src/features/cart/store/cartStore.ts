import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  brand: string
  model: string
  imgUrl: string
  storageLabel: string
  colorLabel: string
}

interface CartState {
  count: number
  items: CartItem[]
  addItem: (item: CartItem) => void
}

export type { CartItem }

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      count: 0,
      items: [],
      addItem: (item) => set({ count: get().count + 1, items: [...get().items, item] }),
    }),
    {
      name: 'mobix-cart',
    }
  )
)
