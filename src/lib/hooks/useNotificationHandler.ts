import React, { useCallback, useEffect, useRef } from 'react'

import { CommonActions, useNavigation } from '@react-navigation/native'

import { NavigationProp } from '../routes/types'

import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import { setupAndroidChannel } from '../notification/setupAndroidChannels'
import * as notification from '#/lib/notification'
import notifee, {
  Event as NotifeeEvent,
  EventType,
} from '@notifee/react-native'
import { logger } from '#/logger'

type Callback = () => void

export function useNotificationsHandler() {
  const navigation = useNavigation<NavigationProp>()

  const foregroundNotificationListener = useRef<Callback>()
  const notificationOpenedListener = useRef<Callback>()
  const notifeeForegroundEventListener = useRef<Callback>()
  // const handleNotification = (payload: MinimalNotification) => {
  //   if (!payload) return

  //   if (payload.data?.type === 'new-order') {
  //     return
  //   }
  //   return
  // }

  const onForegroundRemoteNotification = (
    payload: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    const type = payload.data?.type
    notification.onDisplayNotification(payload)
  }

  const createNotification = (data: any): NotificationPayload => {
    if (data?.type === 'important') {
      return {
        type: 'important',
        templateId: data?.templateId,
      }
    } else {
      return {
        type: data?.type,
        orderId: data?.orderId,
        referenceNo: data?.referenceNo,
      }
    }
  }

  const handleAppOpenedWithNotification = (
    payload: FirebaseMessagingTypes.RemoteMessage | null,
  ) => {
    if (!payload) return
    const data = payload.data as unknown as NotificationPayload
    const notification = createNotification(data)
    handleOpenedNotification(notification)
  }
  const handleOpenedNotification = (notification?: NotificationPayload) => {
    if (!notification) return

    if (notification.type === 'new-order') {
      // casting data payload based on type
      navigation.dispatch(state => {
        if (state.routes[0].name === 'Order') {
          if (state.routes[state.routes.length - 1].name === 'OrderDetails') {
            return CommonActions.reset({
              ...state,
              routes: [
                ...state.routes.slice(0, state.routes.length - 1),
                {
                  name: 'OrderDetails',
                  params: {
                    id: notification.orderId,
                  },
                },
              ],
            })
          } else {
            return CommonActions.navigate('OrderDetails', {
              id: notification.orderId,
            })
          }
        } else {
          return CommonActions.navigate('OrdersTab', {
            screen: 'Order',
            params: {},
          })
        }
      })
    } else {
      logger.warn(`NotificationsHandler: received unknown notification`, {
        notification,
      })
    }
  }

  const handleNotificationPressed = (event: NotifeeEvent) => {
    if (event.type === EventType.PRESS) {
      handleOpenedNotification(event.detail.notification as NotificationPayload)
    }
  }

  // On Android, we cannot control which sound is used for a notification on Android
  // 28 or higher. Instead, we have to configure a notification channel ahead of time
  // which has the sounds we want in the configuration for that channel. These two
  // channels allow for the mute/unmute functionality we want for the background
  // handler.

  useEffect(() => {
    setupAndroidChannel()
    foregroundNotificationListener.current = messaging().onMessage(
      onForegroundRemoteNotification,
    )
    notificationOpenedListener.current = messaging().onNotificationOpenedApp(
      handleAppOpenedWithNotification,
    )
    messaging().getInitialNotification().then(handleAppOpenedWithNotification)

    notifeeForegroundEventListener.current = notifee.onForegroundEvent(
      handleNotificationPressed,
    )

    return () => {
      foregroundNotificationListener.current?.()
      notificationOpenedListener.current?.()
      notificationOpenedListener.current?.()
    }
  }, [])
}
