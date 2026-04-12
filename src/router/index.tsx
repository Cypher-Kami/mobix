import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PageFallback } from '@/shared/components/PageFallback'
import { PLPPage, PDPPage } from './lazyPages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageFallback />}>
        <PLPPage />
      </Suspense>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <Suspense fallback={<PageFallback />}>
        <PDPPage />
      </Suspense>
    ),
  },
])
