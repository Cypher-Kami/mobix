import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PLPPage from '../PLPPage'

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  )
}

describe('PLPPage', () => {
  it('shows product cards after loading', async () => {
    renderWithProviders(<PLPPage />)
    await waitFor(() => {
      expect(screen.getByText('iPhone 14')).toBeInTheDocument()
    })
    expect(screen.getByText('Galaxy S23')).toBeInTheDocument()
  })

  it('shows skeleton while loading', () => {
    renderWithProviders(<PLPPage />)
    const skeletons = document.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })
})
