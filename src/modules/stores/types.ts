import { getStore, getStoreUser } from './stores.service'

export type Store = NonNullable<Awaited<ReturnType<typeof getStore>>['data']>
