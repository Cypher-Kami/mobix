import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useProductDetail } from '@/features/products/hooks/useProductDetail'
import { Header } from '@/shared/components/Header'
import { ProductImage } from '@/features/products/components/ProductImage'
import { DescriptionPanel } from '@/features/products/components/DescriptionPanel'
import { ErrorState } from '@/features/products/components/ErrorState'

function ImageSkeleton() {
  return <Skeleton className="h-44 w-full rounded-lg" />
}

function DescriptionSkeleton() {
  return (
    <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  )
}

export default function PDPPage() {
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading, isError, refetch } = useProductDetail(id ?? '')

  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: product?.model ?? '' },
  ]

  return (
    <div className="min-h-screen">
      <Header breadcrumbItems={breadcrumbItems} />
      <main className="mx-auto max-w-7xl px-4 py-6">
        {isError && (
          <ErrorState
            message="No se pudo cargar el producto."
            onRetry={() => void refetch()}
          />
        )}

        {!isError && (
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="lg:w-2/5">
              {isLoading ? (
                <ImageSkeleton />
              ) : product ? (
                <div className="flex flex-col items-center">
                  <h1 className="mb-4 text-center text-2xl font-bold text-white">
                    {product.brand} {product.model}
                  </h1>
                  <div className="relative flex h-64 w-full overflow-hidden rounded-lg bg-white">
                    <ProductImage
                      src={product.imgUrl}
                      alt={`${product.brand} ${product.model}`}
                      className="h-full w-full object-contain p-4"
                    />
                  </div>
                  <Link
                    to="/"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Volver al catálogo
                  </Link>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-4 lg:flex-1">
              {isLoading ? (
                <DescriptionSkeleton />
              ) : product ? (
                <>
                  <DescriptionPanel product={product} />
                </>
              ) : null}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
