import {InfiniteData, QueryClient, QueryKey} from '@tanstack/react-query'

export function truncateAndInvalidate<T = any>(
  queryClient: QueryClient,
  queryKey: QueryKey,
) {
  queryClient.setQueriesData<InfiniteData<T>>({queryKey}, data => {
    return data
  })
  queryClient.invalidateQueries({queryKey})
}

export function invalidateQuery(queryClient: QueryClient, queryKey: QueryKey) {
  queryClient.invalidateQueries({queryKey})
}
