import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import notifee, {
  AndroidStyle,
  EventType,
  Notification,
} from '@notifee/react-native'
import { PermissionsAndroid, Platform } from 'react-native'
import { PERMISSIONS, request } from 'react-native-permissions'

import { Session } from '@supabase/supabase-js'

import { supabase } from '../supabase'
import { devicePlatform, isAndroid, isIOS } from '#/platform/detection'
import { ANDROID_DEFAULT_CHANNEL_ID } from '#/lib/notification/constants'
import { AutomateError, logger } from '#/logger'

export * from './permisions'

//TODO: Optimize Update on User
export async function getFCMToken(userId: string) {
  let token = null

  await checkApplicationNotificationPermission()
  await registerAppWithFCM()

  if (!userId) return
  token = await messaging().getToken()

  try {
    await supabase.from('notification_push_token').upsert(
      {
        user_id: userId,
        token: token,
        platform: devicePlatform,
        app_id: 'www.automate.com',
      },
      { ignoreDuplicates: true },
    )
  } catch (error) {
    console.error('Failed to saved fcm token')
  }
}

export async function registerAppWithFCM() {
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .registerDeviceForRemoteMessages()
      .then(status => {
        console.log('registerDeviceForRemoteMessages status', status)
      })
      .catch(error => {
        console.log('registerDeviceForRemoteMessages error ', error)
      })
  }
}

export async function checkApplicationNotificationPermission() {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)
  }
  request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
    .then(result => {
      console.log('POST_NOTIFICATIONS status:', result)
    })
    .catch(error => {
      console.log('POST_NOTIFICATIONS error ', error)
    })
}

export function registerTokenChangeHandler(session: Session) {
  const unsubscribe = messaging().onTokenRefresh(async (fcmToken: string) => {
    try {
      await supabase.from('notification_push_token').upsert(
        {
          user_id: session.user.id,
          token: fcmToken,
          platform: devicePlatform,
          app_id: 'www.automate.com',
        },
        { ignoreDuplicates: true },
      )
    } catch (error) {
      console.error('Notifications: Failed to set push token', { error })
    }
  })

  return () => {
    unsubscribe()
  }
}

export async function onDisplayNotification(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
  const image = isIOS
    ? (remoteMessage.data?.picture as string)
    : remoteMessage.notification?.android?.imageUrl

  const data = remoteMessage.data
  const notification: Notification = {
    ...remoteMessage.notification,
    data,
    android: {
      channelId: ANDROID_DEFAULT_CHANNEL_ID,
      smallIcon: 'ic_launcher_round',
      largeIcon: 'ic_launcher_round',
      pressAction: {
        id: 'default',
      },
    },
    ios: {},
  }
  if (image) {
    notification.ios!.attachments = [{ url: image }]
    notification.android!.largeIcon = image
    notification.android!.style = {
      picture: image,
      type: AndroidStyle.BIGPICTURE,
    }
  }
  // Request permissions (required for iOS)
  await notifee.requestPermission()

  await notifee.displayNotification(notification).catch(error => {
    logger.error(
      new AutomateError(
        'Error while displaying notification with notifee library',
      ),
      { error },
    )
  })
}
export async function resetBadgeCount() {
  notifee.setBadgeCount(0)
}
