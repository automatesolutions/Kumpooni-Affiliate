import { Database } from '#/database'
import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import { SupabaseClient } from '@supabase/supabase-js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useScheduleQuery(storeId?: string | null) {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: async () => {
      if (!storeId) {
        throw new Error('No Session Available')
      }
      const { data, error } = await supabase
        .from('store_schedule')
        .select('*')
        .eq('store_id', storeId)
        .order('day_of_week')
      if (error) {
        logger.error('useScheduleQuery', error)
        throw error
      }
      return data
    },
  })
}
// export function upsertSchedule(client: SupabaseClient<Database>)
export function useScheduleMutation(storeId?: string | null) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ schedules }: { schedules: Schedule[] }) => {
      const { data, error } = await supabase
        .from('store_schedule')
        .upsert(schedules, { onConflict: 'id' })

      if (error) {
        logger.error('useScheduleMutation', error)
        throw error
      }
      console.log('data', data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['schedule'],
      })
    },
  })
}

export type StoreSchedule =
  Database['public']['Tables']['store_schedule']['Row']

type Schedule = {
  id: number
  open_time: string | null
  close_time: string | null
  day_of_week: number
  store_id: string
}
