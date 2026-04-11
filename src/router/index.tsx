import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const PLPPage = lazy(() => import('@/pages/PLPPage'))
const PDPPage = lazy(() => import('@/pages/PDPPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense>
        <PLPPage />
      </Suspense>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <Suspense>
        <PDPPage />
      </Suspense>
    ),
  },
])
