import { createBrowserRouter } from 'react-router-dom'
import PLPPage from '@/pages/PLPPage'
import PDPPage from '@/pages/PDPPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PLPPage />,
  },
  {
    path: '/product/:id',
    element: <PDPPage />,
  },
])
