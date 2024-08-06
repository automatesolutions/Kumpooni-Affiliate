import {supabase} from '#/lib/supabase'
import {logger} from '#/logger'
import {SupabaseClient} from '@supabase/supabase-js'
import {useQuery} from '@tanstack/react-query'
import {StorePerformance} from './types'
import {Database} from '#/types/supabase'

export async function getAppointments(
  client: SupabaseClient<Database>,
  storeId: string,
) {
  return client
    .from('repair_orders')
    .select('*')
    .eq('store_id', storeId)
    .order('appointment_date_str', {ascending: false})
    .limit(10)
}

export function useAppointmentsQuery(storeId: string | null) {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const {data, error} = await getAppointments(supabase, storeId!)

      if (error) {
        console.log('Error', error)
        throw new Error('Failed to fetch data')
      }

      return data
    },
    enabled: !!storeId,
  })
}

export async function getStorePerformance(
  client: SupabaseClient<Database>,
  args: {storeId: string; period: string},
) {
  return client.rpc('get_store_metrics', {
    _store_id: args.storeId,
    _period: args.period,
  })
}

export async function getStorePerformanceByDate(
  client: SupabaseClient<Database>,
  {
    start_date,
    end_date,
    storeId,
  }: {storeId: string; start_date: string; end_date: string},
) {
  return client.rpc('get_store_metrics', {
    _store_id: storeId,
    start_date,
    end_date,
  })
}

export function useStorePerformance(storeId: string | null, period: string) {
  return useQuery({
    queryKey: ['store-performance', period],
    queryFn: async () => {
      const {data, error} = await getStorePerformance(supabase, {
        storeId: storeId!,
        period,
      })
      if (error) {
        logger.error('useStorePerfomance', {error})
        throw error
      }
      console.log('useStorePerformance', data)
      const response = data.length >= 1 ? data[0] : []
      return response as unknown as StorePerformance
    },
    enabled: !!storeId,
  })
}
