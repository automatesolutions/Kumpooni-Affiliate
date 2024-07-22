import type { Database } from '#/database/types'
import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import { SupabaseClient } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'

export async function getBookings(
  client: SupabaseClient<Database>,
  id: string,
) {
  return client.from('repair_order').select('*').eq('store_id', id)
}

export function useBookingsQuery(id: string) {
  return useQuery({
    queryKey: ['store-booking'],
    queryFn: async () => {
      const { data, error } = await getBookings(supabase, id)

      if (error) {
        logger.error('useBookingsQuery')
        throw new Error('Failed to fetch data.')
      }
    },
  })
}
