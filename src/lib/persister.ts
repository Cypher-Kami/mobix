import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { queryClient, ONE_HOUR_MS } from './queryClient'

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'mobix-query-cache',
})

persistQueryClient({
  queryClient,
  persister,
  maxAge: ONE_HOUR_MS,
})
