import { Database } from '#/database'
import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import { useSession } from '#/state/session'
import { SupabaseClient } from '@supabase/supabase-js'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const prefetchServicesAndParts = async () => {
  const { session } = useSession()
  const queryClient = useQueryClient()
  if (!session?.store_id) return
  await queryClient.prefetchQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service')
        .select('*')
        .eq('store_id', session.store_id!)
      if (error) {
        logger.error('prefetchServicesAndParts', error)
        throw error
      }
      return data
    },
  })
}

export async function getServices(
  client: SupabaseClient<Database>,
  storeId: string,
) {
  return client
    .from('service')
    .select('id, name, store_id, price')
    .eq('store_id', storeId)
}

export async function getInternalServices(client: SupabaseClient<Database>) {
  return client.from('service').select('*, categories(id, name)')
}

export function useServicesQuery(storeId: string | undefined | null) {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      if (!storeId) throw new Error('Failed to fetch data')
      const { data, error } = await getServices(supabase, storeId)
      if (error) throw error
      return data
    },
    staleTime: Infinity,
  })
}

export async function getServicesList() {}

export async function getParts(
  client: SupabaseClient<Database>,
  storeId: string,
) {
  return client
    .from('parts')
    .select(
      'id, name, store_id, price, part_no, description, created_at, updated_at, category_id, brand, category(id, name)',
    )
    .eq('store_id', storeId)
}

export function usePartsQuery(storeId: string | undefined | null) {
  return useQuery({
    queryKey: ['parts'],
    queryFn: async () => {
      if (!storeId) throw new Error('Failed to fetch data')
      const { data, error } = await getParts(supabase, storeId)
      if (error) throw error
      return data
    },
    staleTime: Infinity,
  })
}
export async function getCategories(
  client: SupabaseClient<Database>,
  args: { search: string },
) {
  let query = client
    .from('categories')
    .select('*', {
      count: 'exact',
    })
    .eq('is_archived', false)

  if (args.search.length > 0) {
    query = query.or(`name.ilike.%${args.search}%`)
  }
  query = query.order('name')
  return query
}

export function useCategoriesQuery(args: { search: string }) {
  return useQuery({
    queryKey: ['categories', { ...args }],
    queryFn: async () => {
      const { data, error } = await getCategories(supabase, args)
      if (error) {
        throw error
      }
      return data
    },
  })
}
