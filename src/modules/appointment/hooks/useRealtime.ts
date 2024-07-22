import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import { useSession } from '#/state/session'
import { useEffect } from 'react'

export function useRealtime(table: string, filter?: string) {
  const { session } = useSession()

  useEffect(() => {
    if (!supabase || !session || !table) return
    console.log('inside realtime')
    supabase.realtime.setAuth(session.access_token)

    const channel = supabase
      .channel(`postgres_changes:${table}}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
          filter: filter,
        },
        async payload => {
          console.log('payloadType', payload.eventType)
          logger.debug('PayloadContext', payload)
        },
      )
      .subscribe()

    return () => {
      if (channel) supabase?.removeChannel(channel)
    }
  }, [supabase, table, filter])
}
