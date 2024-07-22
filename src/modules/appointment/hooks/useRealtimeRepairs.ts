import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import { RepairOrder } from '#/modules/repairs'
import { useSession } from '#/state/session'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export function useRealtimeRepairsUpdater() {
  const { session } = useSession()
  const qc = useQueryClient()
  useEffect(() => {
    if (!supabase || !session || !session.store_id) return
    console.log('inside realtime')
    supabase.realtime.setAuth(session.access_token)

    const channel = supabase
      .channel(`postgres_changes:repair_orders`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'repair_order',
          filter: `store_id=eq.${session.store_id}`,
        },
        async payload => {
          //   logger.debug('PayloadContext', payload)
          if (payload.eventType === 'INSERT') {
            qc.setQueryData(
              ['repair_orders'],
              (cache: RepairOrder[] | undefined) => {
                if (cache) {
                  const newRepair = { ...payload.new }
                  return [...cache, newRepair]
                }
                return cache
              },
            )
          } else if (payload.eventType === 'UPDATE') {
            qc.setQueryData(
              ['repair_orders'],
              (cache: RepairOrder[] | undefined) => {
                if (cache) {
                  const index = cache.findIndex(c => c.id === payload.new.id)
                  //   let updatedRepairs: RepairOrder = {} as RepairOrder
                  if (index !== -1) {
                    const newArr = [...cache]
                    newArr[index] = { ...(payload.new as RepairOrder) }

                    return newArr
                  }
                }
                return cache
              },
            )
          } else if (payload.eventType === 'DELETE') {
            const deletedId: string = payload.old.id
            qc.setQueryData(
              ['repair_orders'],
              (cache: RepairOrder[] | undefined) => {
                if (cache) {
                  return cache.filter(c => c.id !== deletedId)
                }
                return cache
              },
            )
          }
        },
      )
      .subscribe()

    return () => {
      console.log('repair_order-removing')
      // if (channel) supabase?.removeChannel(channel)
      channel.unsubscribe()
    }
  }, [supabase])
}
