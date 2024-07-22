import { Database } from '#/database'
import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useHolidayQuery(storeId?: string | null) {
  return useQuery({
    queryKey: ['holiday'],
    queryFn: async () => {
      if (!storeId) {
        throw new Error('Session Expired')
      }
      const { data, error } = await supabase.rpc('get_store_holidays', {
        _store_id: storeId,
      })
      // .gte('start_date', new Date())
      if (error) {
        logger.error('useHolidayQuery', { error })
        throw error
      }
      console.log('Data', data)
      return data
    },
  })
}
export function useHolidayMutation(storeId?: string | null) {
  return useMutation({
    mutationFn: async (listDate: string[]) => {
      if (!storeId) {
        throw new Error('Session Expired')
      }
      const startDate = listDate[0]
      const endDate = listDate[listDate.length - 1]
      const { data, error } = await supabase
        .from('holiday')
        .insert({
          store_id: storeId,
          start_date: startDate,
          end_date: endDate,
          description: null,
        })
        .eq('store_id', storeId)
      if (error) {
        console.log('error', error)
      }

      console.log('data', data)
    },
  })
}

export type Holiday = Database['public']['Tables']['holiday']['Row']
