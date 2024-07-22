import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { atoms as a, useTheme } from '#/theme'
import { Text } from '#/components/Typography'
import { memo, useCallback } from 'react'

import { MagnifyingGlassIcon2 } from '#/lib/icons'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { HStack } from '#/components/HStack'
import { LogOut, User } from 'lucide-react-native'
import { useSessionApi } from '#/state/session'
import { logger } from '#/logger'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '#/lib/routes/types'
import { UserAvatar } from '#/view/com/util/UserAvatar'
let DashboardHeader = ({
  name,
  role,
}: {
  name: string
  role: string
}): React.ReactNode => {
  const t = useTheme()
  const navigation = useNavigation<NavigationProp>()
  const { logout } = useSessionApi()
  const onPressLogout = useCallback(async () => {
    try {
      await logout()
    } catch (error) {
      logger.error('Failed to logout')
    }
  }, [])
  const onPressSettings = useCallback(() => {
    navigation.navigate('MyProfileTab')
  }, [navigation])
  return (
    <View
      style={[
        a.flex_row,
        a.justify_between,
        a.align_center,
        a.px_2xl,
        a.py_2xs,
        t.atoms.bg,
      ]}>
      <Text style={[a.text_3xl, a.font_bold]}>Dashboard</Text>
      {/* SearchBar */}
      {/* <View
        style={[
          a.border,
          a.rounded_full,
          a.justify_center,
          styles.searchBarShadow,
          { width: 500, height: 46 },
        ]}>
        <View style={[a.pl_xs, a.flex_row, a.align_center, a.gap_2xs]}>
          <MagnifyingGlassIcon2 size={24} strokeWidth={1.8} />
          <TextInput style={[a.text_lg, a.flex_1]} placeholder="Search" />
        </View>
      </View> */}
      {/* User Account */}
      <View style={[a.flex_row, a.gap_2xl, a.align_center]}>
        <View style={[a.align_end]}>
          <Text style={[a.font_bold]}>{name}</Text>
          <Text style={[a.text_sm]}>{`${
            role.charAt(0).toUpperCase() + role.slice(1)
          }`}</Text>
        </View>
        <Menu>
          <MenuTrigger>
            <UserAvatar size={42} />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsWrapper: {},
              optionsContainer: {
                marginTop: 45,
                width: 250,
              },
            }}>
            <MenuOption
              style={[a.border_b, t.atoms.border_contrast_medium]}
              onSelect={onPressSettings}>
              <HStack style={[a.px_2xs, a.py_2xs, a.gap_2xl]}>
                <User size={20} color={t.palette.contrast_600} />
                <Text style={[a.font_bold]}>Profile Settings</Text>
              </HStack>
            </MenuOption>
            <MenuOption
              style={[a.border_b, t.atoms.border_contrast_medium]}
              onSelect={onPressLogout}>
              <HStack style={[a.px_2xs, a.py_2xs, a.gap_2xl]}>
                <LogOut size={20} color={t.palette.contrast_600} />
                <Text style={[a.font_bold]}>Logout</Text>
              </HStack>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </View>
  )
}
export default DashboardHeader

DashboardHeader = memo(DashboardHeader)

const styles = StyleSheet.create({
  searchBarShadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: -0.2,
    },

    shadowOpacity: 1,
    shadowRadius: 1,

    elevation: 4,
  },
})
