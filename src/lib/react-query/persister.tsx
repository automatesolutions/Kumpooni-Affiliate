import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import { cacheStorageCompat } from './cache-storage'

/**
 * Creates an AsyncStorage persister
 */
// export async function createSyncStoragePersisterAsync(
//   storageKey = 'queryClient-logged-out',
// ) {
//   // await ensureCacheStorageDirExists();

//   return tanstackCreateSyncStoragePersister({
//     storage: cacheStorageCompat,
//     key: storageKey,
//   })
// }

export const clientPersister = createSyncStoragePersister({
  storage: cacheStorageCompat,
})
