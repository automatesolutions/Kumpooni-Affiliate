import React from 'react'
import type {CachedFeedPage, NotifUnreadCount} from './types'
import {supabase} from '#/lib/supabase'
import BroadcastChannel from '#/lib/broadcast'

import {useSession} from '#/state/session'
import {logger} from '#/logger'
import EventEmitter from 'eventemitter3'
import {AppState} from 'react-native'
import {useQueryClient} from '@tanstack/react-query'
import {truncateAndInvalidate} from '../util'
import {RQKEY as RQKEY_NOTIFS} from './count'
import {resetBadgeCount} from '#/lib/notification'

type StateContext = string
const stateContext = React.createContext<StateContext>('')

type ApiContext = {
  markAllAsRead: () => Promise<void>
  markReadByCategory: (opts?: {category_id?: number}) => Promise<void>
  checkUnreadMsgCount: (opts?: {
    isPoll?: boolean
    invalidate?: boolean
  }) => Promise<void>
  getCachedUnreadMsgCount: () => NotifUnreadCount[] | undefined
}

const apiContext = React.createContext<ApiContext>({
  async markAllAsRead() {},
  async markReadByCategory() {},
  async checkUnreadMsgCount() {},
  getCachedUnreadMsgCount: () => undefined,
})

const UPDATE_INTERVAL = 60 * 1e3 // 30sec

const broadcast = new BroadcastChannel('NOTIFS_BROADCAST_CHANNEL')
const emitter = new EventEmitter()
export function Provider({children}: React.PropsWithChildren<{}>) {
  const [hasUnread, setHasUnread] = React.useState<boolean>(false)
  const [numUnread, setNumUnread] = React.useState('')
  const checkUnreadRef = React.useRef<ApiContext['checkUnreadMsgCount'] | null>(
    null,
  )
  const cacheRef = React.useRef<CachedFeedPage>({
    usableInFeed: false,
    syncedAt: new Date(),
    data: undefined,
    hasUnread: false,
    unreadCount: 0,
  })
  const {session, hasSession} = useSession()
  const queryClient = useQueryClient()
  React.useEffect(() => {
    function markAsUnusable() {
      if (cacheRef.current) {
        cacheRef.current.usableInFeed = false
      }
    }
    emitter.addListener('invalidate', markAsUnusable)
    return () => {
      emitter.removeListener('invalidate', markAsUnusable)
    }
  }, [])

  // periodic sync
  React.useEffect(() => {
    if (!hasSession || !checkUnreadRef.current) {
      return
    }
    checkUnreadRef.current() // fire on init
    const interval = setInterval(
      () => checkUnreadRef.current?.({isPoll: true}),
      UPDATE_INTERVAL,
    )
    return () => clearInterval(interval)
  }, [hasSession])

  // listen for broadcasts
  React.useEffect(() => {
    //@ts-ignore MessageEvent Type
    const listener = ({data}: MessageEvent) => {
      cacheRef.current = {
        usableInFeed: false,
        syncedAt: new Date(),
        data: undefined,
        hasUnread: data.event ? true : false,
        unreadCount: 0,
      }
      console.log('useEffect Listener')
      setHasUnread(data.event ? true : false)
    }

    broadcast.addEventListener('message', listener)

    return () => {
      broadcast.removeEventListener('message', listener)
    }
  }, [setHasUnread])

  // Create Api
  const api = React.useMemo(() => {
    return {
      async markAllAsRead() {
        try {
          if (!session || !session.store_id) return
          await supabase
            .from('store_notifications')
            .update({is_read: true})
            .eq('store_id', session.store_id)
            .eq('is_read', false)

          resetBadgeCount()
        } catch (e) {
          logger.warn('Failed to mark all as read', {error: e})
        }
      },
      async markReadByCategory({category_id}: {category_id?: number} = {}) {
        console.log('markReadByCategory')
        try {
          if (!session || !session.store_id) return
          if (!category_id) return

          await supabase
            .from('store_notifications')
            .update({is_read: true})
            .eq('store_id', session.store_id)
            .eq('category_id', category_id)

          resetBadgeCount()
        } catch (e) {
          logger.warn('Failed to mark all as read by category', {error: e})
        }
      },
      async checkUnreadMsgCount({
        isPoll,
        invalidate,
      }: {isPoll?: boolean; invalidate?: boolean} = {}) {
        try {
          if (!session || !session.store_id) return
          if (AppState.currentState !== 'active') {
            return
          }

          // reduce polling if unread count is set
          if (isPoll && cacheRef.current?.unreadCount !== 0) {
            // if hit 30+ then don't poll, otherwise reduce polling by 50%
            if (cacheRef.current?.unreadCount >= 10 || Math.random() >= 0.5) {
              return
            }
          }

          const {data, error} = await supabase.rpc('get_notification_counts', {
            storeid: session.store_id,
          })

          if (error) {
            logger.error('checkUnreadMsgCount Error:', {e: error})
            throw error
          }

          const unreadCount = countUnread(data)
          const unreadCountStr =
            unreadCount >= 30
              ? '30+'
              : unreadCount === 0
              ? ''
              : String(unreadCount)

          // track last sync
          const now = new Date()

          cacheRef.current = {
            usableInFeed: !!invalidate, // will be used immediately
            data: data,
            syncedAt: now,
            unreadCount,
          }

          // update & broadcast
          setNumUnread(unreadCountStr)

          if (invalidate) {
            truncateAndInvalidate(queryClient, RQKEY_NOTIFS())
          }
          broadcast.postMessage({event: unreadCountStr})
        } catch (e) {
          logger.warn('Failed to check unread notifications', {error: e})
        }
      },
      getCachedUnreadMsgCount() {
        // return cached page if it's marked as fresh enough
        if (cacheRef.current.usableInFeed) {
          return cacheRef.current.data
        }
      },
    }
  }, [setNumUnread, queryClient])
  checkUnreadRef.current = api.checkUnreadMsgCount

  return (
    <stateContext.Provider value={numUnread}>
      <apiContext.Provider value={api}>{children}</apiContext.Provider>
    </stateContext.Provider>
  )
}

function countUnread(notifs: NotifUnreadCount[]) {
  return notifs.reduce((acc, reducer) => {
    return (acc = acc + reducer.count)
  }, 0)
}

export function useUnreadNotifications() {
  return React.useContext(stateContext)
}

export function useUnreadNotificationsApi() {
  return React.useContext(apiContext)
}
