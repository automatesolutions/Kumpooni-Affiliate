import {Linking} from 'react-native'
import {
  PERMISSIONS,
  check,
  request as requestPermission,
} from 'react-native-permissions'
import {isIOS, isWeb} from '#/platform/detection'
import {Alert} from '#/view/com/util/Alert'
import {logger} from '#/logger'

const openPermissionAlert = (perm: string) => {
  Alert.alert(
    'Permission needed',
    `Kumpooni does not have permission to access your ${perm}.`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Open Settings', onPress: () => Linking.openSettings()},
    ],
  )
}

export function usePhotoLibraryPermission() {
  const type = isIOS
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION
  const requestPhotoAccessIfNeeded = async () => {
    const status = await check(type)
    logger.debug('[PhotoLibrary] Android Permission status: ', {status})

    if (status == 'granted') {
      return true
    } else if (!status || status == 'denied' || status == 'limited') {
      const updateRes = await requestPermission(type)
      console.log('updateRes', updateRes)
      if (updateRes == 'blocked') {
        openPermissionAlert('Photo Library')
        return false
      }
      return updateRes == 'granted'
    } else {
      openPermissionAlert('Photo Library')
      return false
    }
  }
  return {requestPhotoAccessIfNeeded}
}
export function useLocationPermission(cb?: () => void) {
  const type = isIOS
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION

  const requestLocationAccessIfNeeded = async () => {
    const res = await check(type)

    if (res == 'granted') {
      return true
    } else if (!res || res == 'denied' || res == 'limited') {
      console.log('updatedRes')
      const updateRes = await requestPermission(type)
      if (updateRes == 'blocked') {
        console.log('Blocked')
        openPermissionAlert('location')
        return false
      }
      console.log(updateRes === 'granted')
      return updateRes == 'granted'
    } else {
      console.log('Else', res)
      openPermissionAlert('location')
      return false
    }
  }

  return {requestLocationAccessIfNeeded}
}

export function useCameraPermission() {
  const type = isIOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
  const requestCameraAccessIfNeeded = async () => {
    const status = await check(type)

    if (status == 'granted') {
      return true
    } else if (!status || status == 'denied' || status == 'limited') {
      const updateRes = await requestPermission(type)
      if (updateRes == 'blocked') {
        openPermissionAlert('camera')
        return false
      }
      return updateRes == 'granted'
    } else {
      openPermissionAlert('cameara')
      return false
    }
  }

  return {requestCameraAccessIfNeeded}
}
