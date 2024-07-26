import {Database, Tables} from '#/types/supabase'
import {SupabaseClient} from '@supabase/supabase-js'

export type NotifCategoryType =
  | 'New Order'
  | 'Cancelled Order'
  | 'Order'
  | 'Important'
  | 'Store'
  | 'Services'
  | 'Updates'

export type FeedNotificationBase = Tables<'store_notifications'>
type Category = Tables<'notification_category'> & {
  display_name: NotifCategoryType
}

export type FeedNotification = Omit<
  FeedNotificationBase,
  'category' | 'sub_category' | 'metadata'
> & {
  category: Category
  sub_category: Category | null
  metadata: {
    order_id: string
    applink?: string
  }
}

export interface CachedFeedPage {
  /**
   * if true, the cached page is recent enough to use as the response
   */
  usableInFeed: boolean
  syncedAt: Date
  data: NotifUnreadCount[] | undefined
  hasUnread?: boolean
  unreadCount: number
}

// export interface NotifUnreadCount {
//   category_id: number
//   count: number
//   category_name: string
//   display_name: string
// }

export async function getNotifUnreadCount(
  client: SupabaseClient<Database>,
  id: string,
) {
  return client.rpc('get_notification_counts', {storeid: id})
}

export type NotifUnreadCount = NonNullable<
  Awaited<ReturnType<typeof getNotifUnreadCount>>['data']
>[number]

// export type FeedNotification =
//   | (FeedNotificationBase & {
//       metadata?: MetadataBase & {
//         appLink: string
//         webLink: string
//       }
//     })
//   | (FeedNotificationBase & {
//       metadata?: MetadataBase
//     })

// type MetadataBase = {
//   title: string
//   description: string | null
//   picture: string | null
//   is_read: boolean
//   category_id: number
//   sub_category_id: number | null
//   category: Category
//   sub_category: Category | null
// }

//
