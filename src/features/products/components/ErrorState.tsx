import { BadgeAlertIcon } from '@/components/ui/badge-alert'
import { Button } from '@/components/ui/button'

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
      <BadgeAlertIcon className="mb-4 h-12 w-12 text-destructive/60" />
      <p className="text-lg font-medium">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-4" variant="default">
          Reintentar
        </Button>
      )}
    </div>
  )
}
