import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { ChipSelector } from './ChipSelector'
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'
import type { StorageOption, ColorOption } from '@/features/products/api/productTypes'

interface ActionsPanelProps {
  productId: string
  storageOptions: StorageOption[]
  colorOptions: ColorOption[]
}

export function ActionsPanel({ productId, storageOptions, colorOptions }: ActionsPanelProps) {
  const defaultStorage = storageOptions[0]?.code ?? null
  const defaultColor = colorOptions[0]?.code ?? null

  const [selectedStorage, setSelectedStorage] = useState<number | null>(defaultStorage)
  const [selectedColor, setSelectedColor] = useState<number | null>(defaultColor)

  const { mutate, isPending, isError, reset } = useAddToCart()

  const canAdd = selectedStorage !== null && selectedColor !== null

  function handleAddToCart() {
    if (selectedStorage === null || selectedColor === null) return
    reset()
    mutate(
      { id: productId, colorCode: selectedColor, storageCode: selectedStorage },
      {
        onSuccess: () => toast.success('Producto añadido al carrito'),
        onError: () => toast.error('No se pudo añadir al carrito'),
      }
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-5 py-3">
        <h2 className="text-sm font-semibold text-[#111827]">Opciones</h2>
      </div>
      <div className="space-y-4 px-5 py-4">
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

        {isError && (
          <p className="text-xs text-red-500">
            Error al añadir.{' '}
            <button type="button" onClick={handleAddToCart} className="underline">
              Reintentar
            </button>
          </p>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!canAdd || isPending}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#111827] px-4 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart className="h-4 w-4" />
          {isPending ? 'Añadiendo...' : 'Añadir al carrito'}
        </button>
      </div>
    </div>
  )
}
