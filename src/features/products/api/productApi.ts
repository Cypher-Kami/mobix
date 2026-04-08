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

const FALLBACK_STRING = '-'
const FALLBACK_PRICE = 'Precio no disponible'
const FALLBACK_IMG = '/placeholder.png'

// --- Normalización ---

function normalizeString(value: string | null | undefined): string {
  return value?.trim() || FALLBACK_STRING
}

function normalizePrice(value: string | null | undefined): string {
  if (!value || value.trim() === '') return FALLBACK_PRICE
  return `${value} EUR`
}

// --- Transformaciones DTO → UI_Model ---

export function transformProductDTO(dto: ProductDTO): ProductItem {
  return {
    id: dto.id,
    brand: normalizeString(dto.brand),
    model: normalizeString(dto.model),
    price: normalizePrice(dto.price),
    imgUrl: dto.imgUrl?.trim() || FALLBACK_IMG,
  }
}

export function transformProductDetailDTO(dto: ProductDetailDTO): ProductDetail {
  return {
    id: dto.id,
    brand: normalizeString(dto.brand),
    model: normalizeString(dto.model),
    price: normalizePrice(dto.price),
    imgUrl: dto.imgUrl?.trim() || FALLBACK_IMG,
    cpu: normalizeString(dto.cpu),
    ram: normalizeString(dto.ram),
    os: normalizeString(dto.os),
    displayResolution: normalizeString(dto.displayResolution),
    battery: normalizeString(dto.battery),
    primaryCamera: dto.primaryCamera?.join(', ') || FALLBACK_STRING,
    secondaryCamera: dto.secondaryCmera?.join(', ') || FALLBACK_STRING,
    dimensions: normalizeString(dto.dimentions),
    weight: normalizeString(dto.weight),
    storageOptions: dto.internalMemory?.map((m) => ({ code: m.code, label: m.value })) ?? [],
    colorOptions: dto.colors?.map((c) => ({ code: c.code, label: c.value })) ?? [],
  }
}

// --- Filtrado ---

export function filterProducts(products: ProductItem[], query: string): ProductItem[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return products
  return products.filter(
    (p) =>
      p.brand.toLowerCase().includes(normalized) ||
      p.model.toLowerCase().includes(normalized)
  )
}

// --- Fetch helpers ---

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options)
  if (!res.ok) {
    throw new ApiError(res.status, `API error ${res.status}: ${path}`)
  }
  return res.json() as Promise<T>
}

// --- Fetch functions ---

export async function fetchProducts(): Promise<ProductItem[]> {
  const dtos = await apiFetch<ProductDTO[]>('/api/product')
  return dtos.map(transformProductDTO)
}

export async function fetchProductDetail(id: string): Promise<ProductDetail> {
  const dto = await apiFetch<ProductDetailDTO>(`/api/product/${id}`)
  return transformProductDetailDTO(dto)
}

export async function postCart(body: CartRequestDTO): Promise<CartResponseDTO> {
  return apiFetch<CartResponseDTO>('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}
