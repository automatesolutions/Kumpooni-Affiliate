import {useCallback} from 'react'
import {Alert, Linking} from 'react-native'
import ImagePicker, {Options} from 'react-native-image-crop-picker'

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

export default function useImagePicker() {
  const openPicker = useCallback(async (options: Options) => {
    let image = null
    try {
      image = await ImagePicker.openPicker(options)
    } catch (e: any) {
      if (e?.message === 'User did not grant library permission.') {
        openPermissionAlert('Photo Gallery')
      }
    }
    return image
  }, [])

  return {
    openPicker,
  }
}
