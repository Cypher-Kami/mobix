import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Opciones</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {storageOptions.length > 0 && (
          <ChipSelector
            label="Almacenamiento"
            options={storageOptions}
            value={selectedStorage}
            onChange={setSelectedStorage}
          />
        )}
        {colorOptions.length > 0 && storageOptions.length > 0 && <Separator />}
        {colorOptions.length > 0 && (
          <ChipSelector
            label="Color"
            options={colorOptions}
            value={selectedColor}
            onChange={setSelectedColor}
          />
        )}

        {isError && (
          <p className="text-sm text-destructive">
            Error al añadir.{' '}
            <button type="button" onClick={handleAddToCart} className="underline">
              Reintentar
            </button>
          </p>
        )}

        <Button
          type="button"
          onClick={handleAddToCart}
          disabled={!canAdd || isPending}
          className="w-full"
          size="lg"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isPending ? 'Añadiendo...' : 'Añadir al carrito'}
        </Button>
      </CardContent>
    </Card>
  )
}
