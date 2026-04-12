import {
  Building2, Smartphone, Tag, Cpu, MemoryStick,
  Monitor, Battery, Camera, CameraOff, Ruler, Weight,
} from 'lucide-react'
import { formatPrice } from '@/features/products/api/productApi'
import type { ProductDetail } from '@/features/products/api/productTypes'
import type { Spec } from './types'

export function buildSpecs(product: ProductDetail): Spec[] {
  return [
    { icon: Building2, label: 'Marca', value: product.brand },
    { icon: Smartphone, label: 'Modelo', value: product.model },
    { icon: Tag, label: 'Precio', value: formatPrice(product.price) },
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
}
