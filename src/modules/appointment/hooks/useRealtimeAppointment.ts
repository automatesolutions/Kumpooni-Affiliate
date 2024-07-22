import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import { Appointment } from '#/modules/appointment'
import { useSession } from '#/state/session'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export function useRealtimeAppointment() {
  const { session } = useSession()
  const qc = useQueryClient()
  const table = 'repair_order'
  const filter = `store_id=eq.${session?.store_id}`
  console.log('filter', filter)
  useEffect(() => {
    if (!supabase || !session) return

    const channel = supabase
      .channel(`postgres_changes:${table}}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: table,
          filter: filter,
        },
        async payload => {
          console.log('payloadType', payload.eventType)
          logger.debug('PayloadContext', payload)
          qc.invalidateQueries({
            queryKey: ['appointments'],
          })
          qc.invalidateQueries({
            queryKey: ['store-performance'],
          })
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: table,
          filter: filter,
        },
        async payload => {
          console.log('payloadType', payload.eventType)
          logger.debug('PayloadContext', payload)
          qc.invalidateQueries({
            queryKey: ['appointments'],
          })
          qc.invalidateQueries({
            queryKey: ['store-performance'],
          })
        },
      )
      .subscribe()

    return () => {
      console.log('Unmount Supabase Realtime')
      if (channel) supabase?.removeChannel(channel)
    }
  }, [supabase, table, filter])
}
