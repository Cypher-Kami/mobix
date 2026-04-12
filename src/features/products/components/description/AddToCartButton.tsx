import { useRef } from 'react'
import { CartIcon, type CartIconHandle } from '@/components/ui/cart'

interface AddToCartButtonProps {
  disabled: boolean
  loading: boolean
  onClick: () => void
}

export function AddToCartButton({ disabled, loading, onClick }: AddToCartButtonProps) {
  const cartRef = useRef<CartIconHandle>(null)

  return (
    <div className="px-5 py-4">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => cartRef.current?.startAnimation()}
        onMouseLeave={() => cartRef.current?.stopAnimation()}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#845ec2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#6b4a9e] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CartIcon ref={cartRef} size={24} aria-hidden="true" />
        {loading ? 'Añadiendo...' : 'Añadir al carrito'}
      </button>
    </div>
  )
}
