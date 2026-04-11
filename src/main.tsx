import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { Toaster } from '@/components/ui/sonner'
import { queryClient, ONE_HOUR_MS } from '@/lib/queryClient'
import { persister } from '@/lib/persister'
import { router } from '@/router'
import { ErrorBoundary } from '@/shared/components/ErrorBoundary'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister,
          maxAge: ONE_HOUR_MS,
          dehydrateOptions: {
            shouldDehydrateQuery: (query) => {
              return query.state.status === 'success'
            },
          },
        }}
      >
        <RouterProvider router={router} />
        <Toaster position="bottom-right" richColors />
      </PersistQueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)
