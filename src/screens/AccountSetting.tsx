import React, { useCallback } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '#/components/Typography'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTheme, atoms as a } from '#/theme'
import { CommonNavigatorParams } from '#/lib/routes/types'
import { HStack } from '#/components/HStack'
import { ChangeEmailDialog } from '#/components/dialogs/ChangeEmail'
import { useDialogControl } from '#/components/Dialog'
import { color } from '#/theme/tokens'
import { useSession } from '#/state/session'
import { useModalControls } from '#/state/modals'

type Props = NativeStackScreenProps<CommonNavigatorParams, 'AccountSetting'>

export function AccountSettingScreen(props: Props) {
  const t = useTheme()
  const changeEmailControl = useDialogControl()

  const { session } = useSession()
  const { openModal } = useModalControls()

  const onPressChangeEmail = useCallback(async () => {
    // try {
    //   const { data, error } = await supabase.auth.updateUser({
    //     email: session?.user?.email,
    //   })
    // } catch (error) {
    //   Toast.show('Failed to request email changed')
    // }

    changeEmailControl.open()
  }, [changeEmailControl])

  const onPressChangePassword = useCallback(() => {
    openModal({
      name: 'change-password',
    })
  }, [openModal])
  return (
    <>
      <View style={[a.flex_1, t.atoms.bg_contrast_25]}>
        <View style={styles.container}>
          <View style={[]}>
            <Text style={[a.text_xl, a.font_bold]}>Account Setting</Text>
          </View>
          <View style={[t.atoms.bg, a.mt_sm, a.py_2xl, a.px_lg, a.rounded_md]}>
            <View style={[a.gap_2xs]}>
              <Text
                style={[a.text_md, a.font_semibold, { letterSpacing: 0.7 }]}>
                Email Address
              </Text>
              <HStack style={[a.gap_sm]}>
                <Text style={[a.text_md]}>{session?.user?.email}</Text>
                <TouchableOpacity onPress={onPressChangeEmail}>
                  <Text
                    style={[{ color: color.blue_600 }, a.text_sm, a.font_bold]}>
                    Change
                  </Text>
                </TouchableOpacity>
              </HStack>
            </View>
            {/* <View style={[a.gap_2xs, a.mt_lg]}>
              <Text
                style={[a.text_lg, a.font_semibold, { letterSpacing: 0.7 }]}>
                Phone Number
              </Text>
              <View />
              <HStack style={[a.gap_sm]}>
              <Text style={[a.text_md]}>{session.user.email}</Text>
              <TouchableOpacity>
              <Text style={[{ color: color.blue_600 }, a.font_bold]}>
              Change
              </Text>
              </TouchableOpacity>
            </HStack>
            </View> */}

            <View style={[a.gap_2xs, a.mt_lg]}>
              <Text
                style={[a.text_md, a.font_semibold, { letterSpacing: 0.7 }]}>
                Password
              </Text>
              <HStack style={[a.gap_sm, a.align_center]}>
                <Text style={[a.text_md]}>********</Text>
                <TouchableOpacity onPress={onPressChangePassword}>
                  <Text
                    style={[{ color: color.blue_600 }, a.font_bold, a.text_sm]}>
                    Change
                  </Text>
                </TouchableOpacity>
              </HStack>
            </View>
          </View>
        </View>
      </View>
      <ChangeEmailDialog control={changeEmailControl} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
  },
})
