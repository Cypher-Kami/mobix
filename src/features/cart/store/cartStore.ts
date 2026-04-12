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
  items: CartItem[]
  addItem: (item: CartItem) => void
}

export type { CartItem }

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    }),
    {
      name: 'mobix-cart',
    }
  )
)
