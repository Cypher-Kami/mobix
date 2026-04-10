import { render, screen, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProductImage } from '../ProductImage'

describe('ProductImage', () => {
  it('renders image with correct src and alt', () => {
    render(<ProductImage src="https://example.com/img.jpg" alt="Test product" />)
    const img = screen.getByRole('img', { name: 'Test product' })
    expect(img).toHaveAttribute('src', 'https://example.com/img.jpg')
  })

  it('falls back to placeholder on error', async () => {
    render(<ProductImage src="https://broken.url/img.jpg" alt="Test product" />)
    const img = screen.getByRole('img')
    await act(async () => {
      img.dispatchEvent(new Event('error'))
    })
    expect(img).toHaveAttribute('src', '/placeholder.png')
  })
})
