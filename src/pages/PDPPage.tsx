import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useProductDetail } from '@/features/products/hooks/useProductDetail'
import { Header } from '@/shared/components/Header'
import { ProductImage } from '@/features/products/components/ProductImage'
import { DescriptionPanel } from '@/features/products/components/DescriptionPanel'
import { ActionsPanel } from '@/features/products/components/ActionsPanel'
import { ErrorState } from '@/features/products/components/ErrorState'

function ImageSkeleton() {
  return <div className="aspect-square w-full animate-pulse rounded-xl bg-gray-200" />
}

function DescriptionSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 space-y-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex justify-between">
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
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
    <div className="min-h-screen bg-gray-50">
      <Header breadcrumbItems={breadcrumbItems} />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>

        {isError && (
          <ErrorState
            message="No se pudo cargar el producto."
            onRetry={() => void refetch()}
          />
        )}

        {!isError && (
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Columna izquierda — Imagen */}
            <div className="lg:w-2/5">
              {isLoading ? (
                <ImageSkeleton />
              ) : product ? (
                <div className="flex items-center justify-center rounded-xl border border-gray-100 bg-white p-6">
                  <ProductImage
                    src={product.imgUrl}
                    alt={`${product.brand} ${product.model}`}
                    className="h-64 w-full object-contain"
                  />
                </div>
              ) : null}
            </div>

            {/* Columna derecha — Descripción + Acciones */}
            <div className="flex flex-col gap-4 lg:flex-1">
              {isLoading ? (
                <DescriptionSkeleton />
              ) : product ? (
                <>
                  <DescriptionPanel product={product} />
                  <ActionsPanel
                    productId={product.id}
                    storageOptions={product.storageOptions}
                    colorOptions={product.colorOptions}
                  />
                </>
              ) : null}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
