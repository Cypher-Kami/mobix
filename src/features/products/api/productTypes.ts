// DTOs - forma exacta de la API
export interface ProductDTO {
  id: string
  brand: string | null
  model: string | null
  price: string | null
  imgUrl: string | null
}

export interface ProductDetailDTO {
  id: string
  brand: string | null
  model: string | null
  price: string | null
  imgUrl: string | null
  cpu: string | null
  ram: string | null
  os: string | null
  displayResolution: string | null
  battery: string | null
  primaryCamera: string[] | null
  secondaryCmera: string[] | null   // typo intencional de la API
  dimentions: string | null          // typo intencional de la API
  weight: string | null
  internalMemory: Array<{ code: number; value: string }> | null
  colors: Array<{ code: number; value: string }> | null
}

export interface CartRequestDTO {
  id: string
  colorCode: number
  storageCode: number
}

export interface CartResponseDTO {
  count: number
}

// UI Models — usados en componentes
export interface ProductItem {
  id: string
  brand: string
  model: string
  price: string
  imgUrl: string
}

export interface StorageOption {
  code: number
  label: string
}

export interface ColorOption {
  code: number
  label: string
}

export interface ProductDetail {
  id: string
  brand: string
  model: string
  price: string
  imgUrl: string
  cpu: string
  ram: string
  os: string
  displayResolution: string
  battery: string
  primaryCamera: string
  secondaryCamera: string
  dimensions: string
  weight: string
  storageOptions: StorageOption[]
  colorOptions: ColorOption[]
}
