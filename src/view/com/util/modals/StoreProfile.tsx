import React, {useCallback, useState} from 'react'
import {View, StyleSheet, KeyboardAvoidingView, BackHandler} from 'react-native'
import {Text} from '#/components/Typography'
import {useTheme, atoms as a} from '#/theme'
import {
  StoreProfile,
  useStoreBannerUpdateMutation,
  useStoreFrontUpdateMutation,
} from '#/state/queries/profile'

import {HStack} from '#/components/HStack'
import {isAndroid} from '#/platform/detection'
import {useModalControls} from '#/state/modals'
import {Image as RNImage} from 'react-native-image-crop-picker'
import {compressIfNeeded} from '#/lib/media/manip'
import {useSession} from '#/state/session'
import {cleanError} from '#/lib/strings/errors'
import {Button, ButtonText} from '#/components/Button'
import {ErrorMessage} from '../error/ErrorMessage'
import {EditableUserAvatar} from '../UserAvatar'

import * as Toast from '#/view/com/util/Toast'
import * as TextField from '#/components/forms/TextField'

type StoreProfileProps = {
  profile: StoreProfile
}

export const snapPoints = ['fullscreen']
export function Component({profile}: StoreProfileProps) {
  const t = useTheme()
  const {session} = useSession()
  const {closeModal} = useModalControls()
  const [storeAvatar, setStoreAvatar] = useState<string | undefined | null>(
    profile.store_img,
  )
  const [storeBanner, setStoreBanner] = useState<string | undefined | null>(
    profile.banner_img,
  )
  const [imageError, setImageError] = useState<string>('')
  const [newStoreAvatar, setNewStoreAvatar] = useState<RNImage | null>(null)
  const [newStoreBanner, setNewStoreBanner] = useState<RNImage | null>(null)

  const storeFrontMutation = useStoreFrontUpdateMutation()
  const storeBannerMutation = useStoreBannerUpdateMutation()
  const onSelectNewAvatar = useCallback(async (img: RNImage | null) => {
    setImageError('')
    if (img === null) {
      return
    }

    try {
      const finalImg = await compressIfNeeded(img, 1000000)
      setNewStoreAvatar(finalImg)
      setStoreAvatar(finalImg.path)
    } catch (e: any) {
      setImageError(cleanError(e))
    }
  }, [])

  const onSelectBanner = useCallback(
    async (img: RNImage | null) => {
      setImageError('')
      if (img === null) {
        return
      }
      try {
        const finalImg = await compressIfNeeded(img, 1000000)
        setNewStoreBanner(finalImg)
        setStoreBanner(finalImg.path)
      } catch (e: any) {
        setImageError(cleanError(e))
      }
    },
    [setNewStoreBanner, setStoreBanner, setImageError],
  )

  const onStoreFrontSave = useCallback(async () => {
    setImageError('')

    try {
      if (!newStoreAvatar) return
      await storeFrontMutation.mutateAsync({
        newImage: newStoreAvatar,
        storeId: session?.store_id!,
      })
      Toast.show(`Submitted Successfully`)
    } catch (e) {
      setImageError(cleanError(e))
    }
  }, [session, newStoreAvatar, setImageError])

  const onStoreBannerSave = useCallback(async () => {
    setImageError('')

    try {
      if (!newStoreBanner) return
      await storeBannerMutation.mutateAsync({
        newImage: newStoreBanner,
        storeId: session?.store_id!,
      })
      Toast.show(`Submitted Successfully`)
    } catch (e) {
      setImageError(cleanError(e))
    }
  }, [session, newStoreBanner, setImageError])

  React.useEffect(() => {
    let listener = {remove() {}}
    if (isAndroid) {
      listener = BackHandler.addEventListener('hardwareBackPress', () => {
        return closeModal()
      })
    }
    return () => {
      listener.remove()
    }
  }, [closeModal])

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={[a.flex_1, t.atoms.bg_contrast_25]}>
      <View style={styles.container}>
        <View style={[]}>
          <Text style={[a.text_2xl, a.font_bold]}>Store Profile</Text>
        </View>
        <View style={[t.atoms.bg, a.mt_sm, a.py_2xl, a.px_lg, a.rounded_md]}>
          {imageError !== '' && (
            <View style={styles.errorContainer}>
              <ErrorMessage message={imageError} />
            </View>
          )}
          {/* StoreName */}
          <View style={[a.gap_sm]}>
            <HStack style={[a.gap_2xs]}>
              <Text style={[a.text_lg, {fontWeight: '700'}]}>Store Name:</Text>
            </HStack>
            <View style={{width: 350}}>
              <TextField.Root>
                <TextField.Input
                  label="Store Name"
                  value={profile.name}
                  style={[a.font_bold, a.text_lg]}
                  placeholderTextColor={'#000'}
                  editable={false}
                />
              </TextField.Root>
            </View>
          </View>
          <View style={[a.gap_sm, a.mt_md]}>
            <HStack style={[a.gap_2xs]}>
              <Text style={[a.text_lg, {fontWeight: '700'}]}>
                Store Front Image:
              </Text>
            </HStack>
            <HStack style={[a.align_end, a.gap_lg]}>
              <View style={styles.avi}>
                <EditableUserAvatar
                  type="store"
                  avatar={storeAvatar}
                  size={90}
                  onSelectNewAvatar={onSelectNewAvatar}
                />
              </View>
              <Button
                disabled={!newStoreAvatar}
                onPress={onStoreFrontSave}
                label="Save"
                variant={!newStoreAvatar ? 'solid' : 'outline'}
                color={!newStoreAvatar ? 'secondary' : 'primary'}
                style={[a.py_2xs, a.px_lg, a.rounded_sm]}>
                <ButtonText>Save</ButtonText>
              </Button>
            </HStack>
          </View>

          {/* StoreBanner */}
          <View style={[a.gap_sm, a.mt_md]}>
            <HStack style={[a.gap_2xs]}>
              <Text style={[a.text_lg, {fontWeight: '700'}]}>
                Store Banner Image:
              </Text>
            </HStack>
            <HStack style={[a.align_end, a.gap_lg]}>
              <View style={styles.aviBanner}>
                <EditableUserAvatar
                  type="banner"
                  avatar={storeBanner}
                  size={90}
                  onSelectNewAvatar={onSelectBanner}
                />
              </View>

              <Button
                disabled={!newStoreBanner}
                onPress={onStoreBannerSave}
                label="Save"
                variant={!newStoreBanner ? 'solid' : 'outline'}
                color={!newStoreBanner ? 'secondary' : 'primary'}
                style={[a.py_2xs, a.px_lg, a.rounded_sm]}>
                <ButtonText>Save</ButtonText>
              </Button>
            </HStack>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
  },
  titleSection: {
    backgroundColor: 'red',
  },
  btnSave: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  avi: {
    width: 94,
    height: 94,
    borderWidth: 1,
    borderRadius: 8,
  },
  aviBanner: {
    width: 348,
    height: 142,
    borderWidth: 1,
    borderRadius: 8,
  },
  errorContainer: {
    marginTop: 20,
  },
})
