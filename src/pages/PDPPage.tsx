import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useProductDetail } from '@/features/products/hooks/useProductDetail'
import { Header } from '@/shared/components/Header'
import { ProductImage } from '@/features/products/components/ProductImage'
import { DescriptionPanel } from '@/features/products/components/DescriptionPanel'
import { ActionsPanel } from '@/features/products/components/ActionsPanel'
import { ErrorState } from '@/features/products/components/ErrorState'

function ImageSkeleton() {
  return <Skeleton className="aspect-square w-full rounded-xl" />
}

function DescriptionSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border p-6">
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
    <div className="min-h-screen bg-muted/30">
      <Header breadcrumbItems={breadcrumbItems} />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
          <Link to="/">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Volver al catálogo
          </Link>
        </Button>

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
                <Card>
                  <CardContent className="flex items-center justify-center p-8">
                    <ProductImage
                      src={product.imgUrl}
                      alt={`${product.brand} ${product.model}`}
                      className="h-72 w-full object-contain"
                    />
                  </CardContent>
                </Card>
              ) : null}
            </div>

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
