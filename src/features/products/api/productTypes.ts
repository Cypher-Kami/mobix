type Flexible = string[] | string | null

export interface ProductDTO {
  id: string
  brand: Flexible
  model: Flexible
  price: Flexible
  imgUrl: Flexible
}

export interface ProductDetailDTO {
  id: string
  brand: Flexible
  model: Flexible
  price: Flexible
  imgUrl: Flexible
  cpu: Flexible
  ram: Flexible
  os: Flexible
  displayResolution: Flexible
  displaySize: Flexible
  battery: Flexible
  primaryCamera: Flexible
  secondaryCmera: Flexible
  dimentions: Flexible
  weight: Flexible
  internalMemory: Flexible
  colors: Flexible
  sim: Flexible
  wlan: Flexible
  bluetooth: Flexible
  sensors: Flexible
  options: {
    colors: Array<{ code: number; name: string }> | null
    storages: Array<{ code: number; name: string }> | null
  } | null
}

export interface CartRequestDTO {
  id: string
  colorCode: number
  storageCode: number
}

export interface CartResponseDTO {
  count: number
}

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
