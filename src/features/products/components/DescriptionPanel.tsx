import type { ProductDetail } from '@/features/products/api/productTypes'

interface DescriptionPanelProps {
  product: ProductDetail
}

const specs = (product: ProductDetail) => [
  { label: 'Marca', value: product.brand },
  { label: 'Modelo', value: product.model },
  { label: 'Precio', value: product.price },
  { label: 'CPU', value: product.cpu },
  { label: 'RAM', value: product.ram },
  { label: 'Sistema Operativo', value: product.os },
  { label: 'Resolución', value: product.displayResolution },
  { label: 'Batería', value: product.battery },
  { label: 'Cámara principal', value: product.primaryCamera },
  { label: 'Cámara frontal', value: product.secondaryCamera },
  { label: 'Dimensiones', value: product.dimensions },
  { label: 'Peso', value: product.weight },
]

export function DescriptionPanel({ product }: DescriptionPanelProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Especificaciones</h2>
      <dl className="space-y-3">
        {specs(product).map(({ label, value }) => (
          <div key={label} className="flex justify-between gap-4 border-b border-gray-50 pb-2 last:border-0">
            <dt className="text-sm text-gray-500">{label}</dt>
            <dd className="text-right text-sm font-medium text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
