import { PackageSearch } from 'lucide-react'

interface EmptyStateProps {
  query: string
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <PackageSearch className="mb-4 h-12 w-12 text-gray-300" />
      <p className="text-lg font-medium text-gray-500">
        No se encontraron productos para{' '}
        <span className="font-semibold text-gray-700">"{query}"</span>
      </p>
      <p className="mt-1 text-sm text-gray-400">Prueba con otro término de búsqueda</p>
    </div>
  )
}
