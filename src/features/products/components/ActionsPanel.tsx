import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { ChipSelector } from './ChipSelector'
import { Toast } from '@/shared/components/Toast'
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'
import type { StorageOption, ColorOption } from '@/features/products/api/productTypes'

interface ActionsPanelProps {
  productId: string
  storageOptions: StorageOption[]
  colorOptions: ColorOption[]
}

export function ActionsPanel({ productId, storageOptions, colorOptions }: ActionsPanelProps) {
  // Default to first option if available
  const defaultStorage = storageOptions[0]?.code ?? null
  const defaultColor = colorOptions[0]?.code ?? null

  const [selectedStorage, setSelectedStorage] = useState<number | null>(defaultStorage)
  const [selectedColor, setSelectedColor] = useState<number | null>(defaultColor)
  const [showToast, setShowToast] = useState(false)

  const { mutate, isPending, isError, reset } = useAddToCart()

  const canAdd = selectedStorage !== null && selectedColor !== null

  function handleAddToCart() {
    if (selectedStorage === null || selectedColor === null) return
    reset()
    mutate(
      { id: productId, colorCode: selectedColor, storageCode: selectedStorage },
      { onSuccess: () => setShowToast(true) }
    )
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Opciones</h2>
      <div className="space-y-4">
        {storageOptions.length > 0 && (
          <ChipSelector
            label="Almacenamiento"
            options={storageOptions}
            value={selectedStorage}
            onChange={setSelectedStorage}
          />
        )}
        {colorOptions.length > 0 && (
          <ChipSelector
            label="Color"
            options={colorOptions}
            value={selectedColor}
            onChange={setSelectedColor}
          />
        )}
      </div>

      {isError && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          No se pudo añadir al carrito.{' '}
          <button
            type="button"
            onClick={handleAddToCart}
            className="font-medium underline hover:no-underline"
          >
            Reintentar
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!canAdd || isPending}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ShoppingCart className="h-4 w-4" />
        {isPending ? 'Añadiendo...' : 'Añadir al carrito'}
      </button>

      {showToast && (
        <Toast message="Producto añadido al carrito" onClose={() => setShowToast(false)} />
      )}
    </div>
  )
}
