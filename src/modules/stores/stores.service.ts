import { Database } from '#/database/types'
import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import { SupabaseClient } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'

export async function getStoreUser(
  client: SupabaseClient<Database>,
  id: string,
) {
  return client.from('user_roles').select('*').eq('user_id', id).single()
}

export async function getStore(client: SupabaseClient<Database>, id: string) {
  return client.from('store').select('*').eq('id', id).single()
}

export function useStoreQuery(id: string) {
  return useQuery({
    enabled: !!id,
    queryKey: ['store', id],
    queryFn: async () => {
      const { data, error } = await getStore(supabase, id)
      if (error) {
        logger.error('useStoreQueryError', { error })
      }
      return data
    },
  })
}
