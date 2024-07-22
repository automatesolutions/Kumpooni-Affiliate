import messaging from '@react-native-firebase/messaging'

import { PermissionsAndroid, Platform } from 'react-native'
import { requestNotifications } from 'react-native-permissions'
import {
  getApiLevel,
  getBrand,
  getBuildNumber,
  getManufacturer,
  getModel,
  getSystemName,
  getUniqueId,
} from 'react-native-device-info'

export async function checkPermission() {
  return await messaging().hasPermission()
}

export async function requestPermission() {
  const apiLevel = await getApiLevel()
  const fcmToken = await messaging().getToken()
  const deviceId = await getUniqueId()
  const manufacturer = await getManufacturer()
  const devicePlatform = getSystemName()
  const model = getModel()

  const deviceName = `${manufacturer} ${model}`

  const brandName = getBrand()
  const buildNumber = getBuildNumber()

  const isAndroidAPILevelGreater32 = apiLevel > 32 && Platform.OS === 'android'
  if (isAndroidAPILevelGreater32) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    )
  }
  await messaging().requestPermission()

  const pushData = {
    subscription_type: 'fcm',
    subscription_attributes: {
      deviceName,
      devicePlatform,
      apiLevel,
      brandName,
      buildNumber,
      push_token: fcmToken,
      device_id: deviceId,
    },
  }
}
