import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useUnreadNotificationsApi } from './unread'
import { supabase } from '#/lib/supabase'
import { useSession } from '#/state/session'

export function RQKEY() {
  return ['notification-count']
}
export function useNotificationCountQuery() {
  const queryClient = useQueryClient()
  const unreads = useUnreadNotificationsApi()
  const { session } = useSession()
  return useQuery({
    queryKey: RQKEY(),
    queryFn: async () => {
      if (!session || !session.store_id) {
        throw new Error('Session Expired')
      }
      let page
      page = unreads.getCachedUnreadMsgCount()

      if (!page) {
        const { data, error } = await supabase.rpc('get_notification_counts', {
          storeid: session.store_id,
        })
        if (error) throw error
        page = data
      }
      return page
    },
  })
}
