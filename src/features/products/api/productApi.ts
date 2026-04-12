import { ApiError } from '@/lib/queryClient'
import type {
  ProductDTO,
  ProductDetailDTO,
  ProductItem,
  ProductDetail,
  CartRequestDTO,
  CartResponseDTO,
} from './productTypes'

const BASE_URL = 'https://itx-frontend-test.onrender.com'

const FALLBACK = '-'
const FALLBACK_IMG = '/placeholder.png'

function normalizeField(value: string[] | string | null | undefined): string {
  if (!value) return FALLBACK
  if (Array.isArray(value)) return value.join(', ') || FALLBACK
  return value.trim() || FALLBACK
}

function normalizePrice(value: string[] | string | null | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value
  if (!raw || raw.trim() === '') return 'Precio no disponible'
  return `${raw.trim()} EUR`
}

export function formatPrice(price: string): string {
  return price.replace(' EUR', '\u00a0€')
}

function normalizeImg(value: string[] | string | null | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value
  return raw?.trim() || FALLBACK_IMG
}

export function transformProductDTO(dto: ProductDTO): ProductItem {
  return {
    id: dto.id,
    brand: normalizeField(dto.brand),
    model: normalizeField(dto.model),
    price: normalizePrice(dto.price),
    imgUrl: normalizeImg(dto.imgUrl),
  }
}

export function transformProductDetailDTO(dto: ProductDetailDTO): ProductDetail {
  return {
    id: dto.id,
    brand: normalizeField(dto.brand),
    model: normalizeField(dto.model),
    price: normalizePrice(dto.price),
    imgUrl: normalizeImg(dto.imgUrl),
    cpu: normalizeField(dto.cpu),
    ram: normalizeField(dto.ram),
    os: normalizeField(dto.os),
    displayResolution: normalizeField(dto.displaySize),
    battery: normalizeField(dto.battery),
    primaryCamera: normalizeField(dto.primaryCamera),
    secondaryCamera: normalizeField(dto.secondaryCmera),
    dimensions: normalizeField(dto.dimentions),
    weight: (() => {
      const raw = Array.isArray(dto.weight) ? dto.weight[0] : dto.weight
      return raw?.trim() ? `${raw.trim()} g` : FALLBACK
    })(),
    storageOptions: dto.options?.storages?.map((s) => ({ code: s.code, label: s.name })) ?? [],
    colorOptions: dto.options?.colors?.map((c) => ({ code: c.code, label: c.name })) ?? [],
  }
}

export function filterProducts(products: ProductItem[], query: string): ProductItem[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return products
  return products.filter(
    (p) =>
      p.brand.toLowerCase().includes(normalized) ||
      p.model.toLowerCase().includes(normalized)
  )
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options)
  if (!res.ok) {
    throw new ApiError(res.status, `API error ${res.status}: ${path}`)
  }
  return res.json() as Promise<T>
}

export async function fetchProducts(): Promise<ProductItem[]> {
  const dtos = await apiFetch<ProductDTO[]>('/api/product')
  return dtos.map(transformProductDTO)
}

export async function fetchProductDetail(id: string): Promise<ProductDetail> {
  const dto = await apiFetch<ProductDetailDTO>(`/api/product/${encodeURIComponent(id)}`)
  return transformProductDetailDTO(dto)
}

export async function postCart(body: CartRequestDTO): Promise<CartResponseDTO> {
  return apiFetch<CartResponseDTO>('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}
