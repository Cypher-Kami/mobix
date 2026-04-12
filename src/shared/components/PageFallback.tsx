import { Skeleton } from '@/components/ui/skeleton'

export function PageFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    </div>
  )
}
