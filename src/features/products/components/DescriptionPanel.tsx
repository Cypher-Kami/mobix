import { useState } from 'react'
import {
  Cpu,
  MemoryStick,
  Smartphone,
  Monitor,
  Battery,
  Camera,
  CameraOff,
  Ruler,
  Weight,
  Tag,
  Building2,
  HardDrive,
  Palette,
  ShoppingCart,
} from 'lucide-react'
import { toast } from 'sonner'
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'
import type { ProductDetail } from '@/features/products/api/productTypes'

interface DescriptionPanelProps {
  product: ProductDetail
}

const specs = (product: ProductDetail) => [
  { icon: Building2, label: 'Marca', value: product.brand },
  { icon: Smartphone, label: 'Modelo', value: product.model },
  { icon: Tag, label: 'Precio', value: product.price.replace(' EUR', '\u00a0€') },
  { icon: Cpu, label: 'CPU', value: product.cpu },
  { icon: MemoryStick, label: 'RAM', value: product.ram },
  { icon: Smartphone, label: 'Sistema Operativo', value: product.os },
  { icon: Monitor, label: 'Resolución', value: product.displayResolution },
  { icon: Battery, label: 'Batería', value: product.battery },
  { icon: Camera, label: 'Cámara principal', value: product.primaryCamera },
  { icon: CameraOff, label: 'Cámara frontal', value: product.secondaryCamera },
  { icon: Ruler, label: 'Dimensiones', value: product.dimensions },
  { icon: Weight, label: 'Peso', value: product.weight },
]

export function DescriptionPanel({ product }: DescriptionPanelProps) {
  const defaultStorage = product.storageOptions[0]?.code ?? null
  const defaultColor = product.colorOptions[0]?.code ?? null

  const [selectedStorage, setSelectedStorage] = useState<number | null>(defaultStorage)
  const [selectedColor, setSelectedColor] = useState<number | null>(defaultColor)

  const { mutate, isPending, isError, reset } = useAddToCart()

  const canAdd = selectedStorage !== null && selectedColor !== null

  function handleAddToCart() {
    if (selectedStorage === null || selectedColor === null) return
    reset()
    mutate(
      { id: product.id, colorCode: selectedColor, storageCode: selectedStorage },
      {
        onSuccess: () => toast.success('Producto añadido al carrito'),
        onError: () => toast.error('No se pudo añadir al carrito'),
      }
    )
  }

  const allRows = specs(product).length + (product.storageOptions.length > 0 ? 1 : 0) + (product.colorOptions.length > 0 ? 1 : 0)
  let rowIndex = specs(product).length

  return (
    <div className="overflow-hidden rounded-lg border border-white/20 bg-[#1e293b]">
      <div className="border-b border-white/15 px-5 py-3">
        <h2 className="text-sm font-semibold text-white">Especificaciones</h2>
      </div>

      <dl>
        {specs(product).map(({ icon: Icon, label, value }, i) => (
          <div
            key={label}
            className={`flex items-center gap-3 px-5 py-3 ${i % 2 === 0 ? 'bg-[#1e293b]' : 'bg-[#172033]'}`}
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#845ec2]/30">
              <Icon className="h-3.5 w-3.5 text-[#845ec2]" />
            </div>
            <dt className="w-36 shrink-0 text-xs text-gray-300">{label}</dt>
            <dd className="text-xs font-medium text-white">{value}</dd>
          </div>
        ))}

        {/* Separador Opciones */}
        <div className="border-t border-white/15 px-5 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Opciones</p>
        </div>

        {product.storageOptions.length > 0 && (
          <div className={`flex items-start gap-3 px-5 py-3 ${rowIndex++ % 2 === 0 ? 'bg-[#1e293b]' : 'bg-[#172033]'}`}>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#845ec2]/30">
              <HardDrive className="h-3.5 w-3.5 text-[#845ec2]" />
            </div>
            <dt className="w-36 shrink-0 pt-1 text-xs text-gray-300">Almacenamiento</dt>
            <dd className="flex flex-wrap gap-1.5">
              {product.storageOptions.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setSelectedStorage(opt.code)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-all ${
                    selectedStorage === opt.code
                      ? 'border-[#845ec2] bg-[#845ec2] text-white'
                      : 'border-white/20 bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </dd>
          </div>
        )}

        {product.colorOptions.length > 0 && (
          <div className={`flex items-start gap-3 px-5 py-3 ${rowIndex++ % 2 === 0 ? 'bg-[#1e293b]' : 'bg-[#172033]'}`}>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#845ec2]/30">
              <Palette className="h-3.5 w-3.5 text-[#845ec2]" />
            </div>
            <dt className="w-36 shrink-0 pt-1 text-xs text-gray-300">Color</dt>
            <dd className="flex flex-wrap gap-1.5">
              {product.colorOptions.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setSelectedColor(opt.code)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-all ${
                    selectedColor === opt.code
                      ? 'border-[#845ec2] bg-[#845ec2] text-white'
                      : 'border-white/20 bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </dd>
          </div>
        )}
      </dl>

      {isError && (
        <p className="px-5 pb-2 text-xs text-red-500">
          Error al añadir.{' '}
          <button type="button" onClick={handleAddToCart} className="underline">
            Reintentar
          </button>
        </p>
      )}

      <div className="px-5 py-4">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!canAdd || isPending}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#845ec2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#6b4a9e] disabled:cursor-not-allowed disabled:opacity-50"
          style={{ display: allRows > 0 ? 'flex' : 'none' }}
        >
          <ShoppingCart className="h-4 w-4" />
          {isPending ? 'Añadiendo...' : 'Añadir al carrito'}
        </button>
      </div>
    </div>
  )
}
