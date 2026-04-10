import { PickaxeIcon } from '@/components/ui/pickaxe'

interface EmptyStateProps {
  query: string
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <PickaxeIcon className="mb-4 h-12 w-12 text-muted-foreground/40" />
      <p className="text-lg font-medium text-muted-foreground">
        No hay resultados para{' '}
        <span className="font-semibold text-foreground">"{query}"</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground/70">Prueba con otro término</p>
    </div>
  )
}
