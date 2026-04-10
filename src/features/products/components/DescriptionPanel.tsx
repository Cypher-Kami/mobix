import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Especificaciones</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <dl className="space-y-0">
          {specs(product).map(({ label, value }, i) => (
            <div key={label}>
              <div className="flex justify-between py-2.5">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-sm font-medium text-right max-w-[60%]">{value}</dd>
              </div>
              {i < specs(product).length - 1 && <Separator />}
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
