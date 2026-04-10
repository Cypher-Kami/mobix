import type { ProductDTO, ProductDetailDTO } from '@/features/products/api/productTypes'

export const mockProducts: ProductDTO[] = [
  {
    id: 'product-1',
    brand: 'Apple',
    model: 'iPhone 14',
    price: '999',
    imgUrl: 'https://example.com/iphone14.jpg',
  },
  {
    id: 'product-2',
    brand: null,
    model: 'Galaxy S23',
    price: null,
    imgUrl: null,
  },
]

export const mockProductDetail: ProductDetailDTO = {
  id: 'product-1',
  brand: 'Apple',
  model: 'iPhone 14',
  price: '999',
  imgUrl: 'https://example.com/iphone14.jpg',
  cpu: 'A15 Bionic',
  ram: '6 GB RAM',
  os: 'iOS 16',
  displayResolution: '6.1 inches',
  displaySize: '2532 x 1170 pixels',
  battery: '3279 mAh',
  primaryCamera: ['12 MP', 'f/1.5'],
  secondaryCmera: '12 MP',
  dimentions: '146.7 x 71.5 x 7.8 mm',
  weight: '172',
  internalMemory: ['128 GB', '256 GB'],
  colors: ['Midnight', 'Starlight'],
  sim: 'Nano-SIM',
  wlan: ['Wi-Fi 802.11 a/b/g/n/ac/6'],
  bluetooth: '5.3',
  sensors: ['Face ID', 'accelerometer'],
  options: {
    colors: [
      { code: 1000, name: 'Midnight' },
      { code: 1001, name: 'Starlight' },
    ],
    storages: [
      { code: 2000, name: '128 GB' },
      { code: 2001, name: '256 GB' },
    ],
  },
}
