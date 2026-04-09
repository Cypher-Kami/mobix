import { AlertCircle } from 'lucide-react'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  message = 'Ha ocurrido un error al cargar los datos.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <AlertCircle className="mb-4 h-12 w-12 text-red-400" />
      <p className="text-lg font-medium text-gray-700">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
