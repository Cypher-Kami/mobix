import { describe, it, expect } from 'vitest'
import { filterProducts, transformProductDTO } from '../productApi'
import type { ProductItem } from '../productTypes'

const products: ProductItem[] = [
  { id: '1', brand: 'Apple', model: 'iPhone 14', price: '999 EUR', imgUrl: '/img.jpg' },
  { id: '2', brand: 'Samsung', model: 'Galaxy S23', price: '899 EUR', imgUrl: '/img.jpg' },
  { id: '3', brand: 'Google', model: 'Pixel 7', price: '599 EUR', imgUrl: '/img.jpg' },
]

describe('filterProducts', () => {
  it('filters by brand (case-insensitive)', () => {
    expect(filterProducts(products, 'apple')).toHaveLength(1)
    expect(filterProducts(products, 'APPLE')).toHaveLength(1)
  })

  it('filters by model', () => {
    expect(filterProducts(products, 'galaxy')).toHaveLength(1)
  })

  it('returns all products for empty query', () => {
    expect(filterProducts(products, '')).toHaveLength(3)
  })

  it('returns all products for whitespace-only query', () => {
    expect(filterProducts(products, '   ')).toHaveLength(3)
  })

  it('handles special characters without throwing', () => {
    expect(() => filterProducts(products, '(.*)')).not.toThrow()
  })

  it('returns empty array when no match', () => {
    expect(filterProducts(products, 'Nokia')).toHaveLength(0)
  })
})

describe('transformProductDTO', () => {
  it('normalizes null fields to fallback values', () => {
    const result = transformProductDTO({ id: '1', brand: null, model: null, price: null, imgUrl: null })
    expect(result.brand).toBe('-')
    expect(result.model).toBe('-')
    expect(result.price).toBe('Precio no disponible')
    expect(result.imgUrl).toBe('/placeholder.png')
  })

  it('formats price with EUR suffix', () => {
    const result = transformProductDTO({ id: '1', brand: 'Apple', model: 'iPhone', price: '999', imgUrl: null })
    expect(result.price).toBe('999 EUR')
  })
})
