import { isAndroid } from '#/platform/detection'
import { ANDROID_DEFAULT_CHANNEL_ID } from './constants'
import notifee from '@notifee/react-native'

export async function setupAndroidChannel() {
  if (!isAndroid) return

  await notifee.createChannel({
    id: ANDROID_DEFAULT_CHANNEL_ID,
    name: 'Default',
  })
}
