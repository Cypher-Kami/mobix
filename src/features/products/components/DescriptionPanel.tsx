import { useState } from 'react'
import { HardDrive, Palette } from 'lucide-react'
import { toast } from 'sonner'
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'
import type { ProductDetail } from '@/features/products/api/productTypes'
import { buildSpecs } from './description/buildSpecs'
import { SpecRow } from './description/SpecRow'
import { OptionSelector } from './description/OptionSelector'
import { AddToCartButton } from './description/AddToCartButton'

export function DescriptionPanel({ product }: { product: ProductDetail }) {
  const specs = buildSpecs(product)

  const [selectedStorage, setSelectedStorage] = useState<number | null>(
    product.storageOptions[0]?.code ?? null,
  )
  const [selectedColor, setSelectedColor] = useState<number | null>(
    product.colorOptions[0]?.code ?? null,
  )

  const { mutate, isPending, isError, reset } = useAddToCart()
  const canAdd = selectedStorage !== null && selectedColor !== null

  function handleAddToCart() {
    if (!canAdd) return
    reset()
    mutate(
      {
        id: product.id,
        colorCode: selectedColor,
        storageCode: selectedStorage,
        item: {
          id: product.id,
          brand: product.brand,
          model: product.model,
          imgUrl: product.imgUrl,
          storageLabel: product.storageOptions.find((o) => o.code === selectedStorage)?.label ?? '',
          colorLabel: product.colorOptions.find((o) => o.code === selectedColor)?.label ?? '',
        },
      },
      {
        onSuccess: () => toast.success('Producto añadido al carrito'),
        onError: () => toast.error('No se pudo añadir al carrito'),
      },
    )
  }

  let rowIndex = specs.length

  return (
    <div className="overflow-hidden rounded-lg border border-white/20 bg-[#1e293b]">
      <div className="border-b border-white/15 px-5 py-3">
        <h2 className="text-sm font-semibold text-white">Especificaciones</h2>
      </div>

      <dl>
        {specs.map((spec, i) => (
          <SpecRow key={spec.label} spec={spec} index={i} />
        ))}

        <div className="border-t border-white/15 px-5 py-4">
          <p className="text-sm font-semibold text-white">Acciones</p>
        </div>

        <OptionSelector
          icon={HardDrive}
          label="Almacenamiento"
          options={product.storageOptions}
          selected={selectedStorage}
          onSelect={setSelectedStorage}
          index={rowIndex++}
        />
        <OptionSelector
          icon={Palette}
          label="Color"
          options={product.colorOptions}
          selected={selectedColor}
          onSelect={setSelectedColor}
          index={rowIndex++}
        />
      </dl>

      {isError && (
        <p className="px-5 pb-2 text-xs text-red-500">
          Error al añadir.{' '}
          <button type="button" onClick={handleAddToCart} className="underline">
            Reintentar
          </button>
        </p>
      )}

      <AddToCartButton
        disabled={!canAdd || isPending}
        loading={isPending}
        onClick={handleAddToCart}
      />
    </div>
  )
}
