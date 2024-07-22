import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import { STALE } from '#/utils/query'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { FeedNotification } from './types'
import { useUnreadNotificationsApi } from './unread'
import { invalidateQuery } from '../util'
import { RQKEY as RQKEY_NOTIFS } from './count'
const RQKEY_ROOT = 'notification-feed-by-category'
export function RQKEY(category: number) {
  return [RQKEY_ROOT, category]
}

const SUB_CATEGORY = `sub_category:notification_category!store_notifications_sub_category_id_fkey(*)`

const CATEGORY = `category:notification_category!store_notifications_category_id_fkey(*)`

export function useNotificationByCategoryQuery({
  storeId = '',
  categoryId,
  subCategoryId = 0,
}: {
  storeId?: string | null
  categoryId: number
  subCategoryId?: number
}) {
  const unreadApi = useUnreadNotificationsApi()
  const queryClient = useQueryClient()
  return useQuery({
    staleTime: STALE.SECONDS.FIFTEEN,
    queryKey: RQKEY(categoryId),
    queryFn: async () => {
      if (!storeId) {
        throw Error('Session Expired')
      }
      const { data, error } = await supabase
        .from('store_notifications')
        .select(`*, ${CATEGORY}, ${SUB_CATEGORY}`)
        .eq('store_id', storeId)
        .or(`category_id.eq.${categoryId},sub_category_id.eq.${subCategoryId}`)
        .order('created_at', { ascending: false })
        .returns<FeedNotification[]>()

      if (error) {
        logger.error('useNotificationFeedQuery', error)
        throw error
      }
      unreadApi.markReadByCategory({ category_id: categoryId })
      invalidateQuery(queryClient, RQKEY_NOTIFS())
      return data
    },
  })
}
