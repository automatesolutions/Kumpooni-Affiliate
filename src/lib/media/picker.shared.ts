import {getDataUriSize} from './util'
import * as Toast from '#/view/com/util/Toast'
import ImagePicker, {Options} from 'react-native-image-crop-picker'
import {Alert} from '#/view/com/util/Alert'
import {Linking} from 'react-native'

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
// const openPicker = useCallback(async (options: Options) => {
//   let image = null
//   try {
//     image = await ImagePicker.openPicker(options)
//   } catch (e: any) {
//     if (e?.message === 'User did not grant library permission.') {
//       Alert({
//         buttons: [
//           { style: 'cancel', text: lang.t('image_picker.cancel') },
//           {
//             onPress: Linking.openSettings,
//             text: lang.t('image_picker.confirm'),
//           },
//         ],
//         message: lang.t('image_picker.message'),
//         title: lang.t('image_picker.title'),
//       })
//     }
//   }
//   return image
// }, [])

// return {
//   openPicker,
// }
export async function openPicker(opts?: Options) {
  let image = null
  try {
    image = await ImagePicker.openPicker({
      includeExif: true,
      mediaType: 'photo',
      quality: 1,
      ...opts,
    })
  } catch (e: any) {
    console.log('error', e)
    if (e?.message === 'User did not grant libary permission.') {
      openPermissionAlert('Photo Library')
    }
  }
  return image
}
