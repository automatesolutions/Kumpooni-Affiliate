import { useEffect, useRef, useState } from 'react'
import { QueryClient } from '@tanstack/react-query'

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import {
  PersistQueryClientProvider,
  PersistQueryClientProviderProps,
  Persister,
} from '@tanstack/react-query-persist-client'
import { cacheStorageCompat } from './cache-storage'

// any query keys in this array will be persisted to AsyncStorage
const STORED_CACHE_QUERY_KEYS = ['services']

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        structuralSharing: false,
        retry: false,
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  })

// const clientPersister = createSyncStoragePersister({
//   storage: cacheStorageCompat,
// })

function QueryProviderInner({
  children,
  sessionId,
}: {
  children: React.ReactNode
  sessionId: string | undefined
}) {
  const [isReady, setIsReady] = useState(false)

  const initialSessionId = useRef(sessionId)

  if (sessionId !== initialSessionId.current) {
    throw Error(
      'Something is very wrong. Expected did to be stable due to key above.',
    )
  }

  const [queryClient, _setQueryClient] = useState(() => createQueryClient())
  const [persistOptions, _setPersistOptions] = useState(() => {
    const syncPersister = createSyncStoragePersister({
      storage: cacheStorageCompat,
      key: 'queryClient-' + (sessionId ?? 'logged-out'),
    })
    return {
      persister: syncPersister,
      dehydrateOptions,
    }
  })

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}>
      {children}
    </PersistQueryClientProvider>
  )
}

export const dehydrateOptions: PersistQueryClientProviderProps['persistOptions']['dehydrateOptions'] =
  {
    shouldDehydrateMutation: (_: any) => false,
    shouldDehydrateQuery: query => {
      return STORED_CACHE_QUERY_KEYS.includes(String(query.queryKey[0]))
    },
  }

export function QueryProvider({
  children,
  sessionId,
}: {
  children: React.ReactNode
  sessionId: string | undefined
}) {
  return (
    <QueryProviderInner key={sessionId} sessionId={sessionId}>
      {children}
    </QueryProviderInner>
  )
}
