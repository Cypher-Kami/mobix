import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartState {
  count: number
  setCount: (count: number) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      count: 0,
      setCount: (count) => set({ count }),
    }),
    {
      name: 'mobix-cart',
    }
  )
)
