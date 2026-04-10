import { http, HttpResponse } from 'msw'
import { mockProducts, mockProductDetail } from './fixtures'

const BASE = 'https://itx-frontend-test.onrender.com'

export const handlers = [
  http.get(`${BASE}/api/product`, () => HttpResponse.json(mockProducts)),
  http.get(`${BASE}/api/product/:id`, () => HttpResponse.json(mockProductDetail)),
  http.post(`${BASE}/api/cart`, () => HttpResponse.json({ count: 1 })),
]
