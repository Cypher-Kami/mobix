// Smoke test — verifica que el entorno de test está configurado correctamente
import { describe, it, expect } from 'vitest'

describe('setup', () => {
  it('test environment is configured', () => {
    expect(true).toBe(true)
  })
})
