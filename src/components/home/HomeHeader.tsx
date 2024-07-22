import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { atoms as a, useTheme } from '#/theme'
import { Text } from '#/components/Typography'
import { memo, useCallback } from 'react'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { HStack } from '#/components/HStack'
import { ChevronDown, LogOut, User } from 'lucide-react-native'
import { useSessionApi } from '#/state/session'
import { logger } from '#/logger'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '#/lib/routes/types'
import { UserAvatar } from '#/view/com/util/UserAvatar'
import { NotificationBtn } from './NotificationBtn'
import { colors } from '#/lib/styles'
import { useUnreadNotifications } from '#/state/queries/notifications/unread'
let HomeHeader = ({
  name,
  role,
}: {
  name: string
  role: string
}): React.ReactNode => {
  const t = useTheme()
  const navigation = useNavigation<NavigationProp>()
  const { logout } = useSessionApi()
  const unreadNotif = useUnreadNotifications()
  const onPressLogout = useCallback(async () => {
    try {
      await logout()
    } catch (error) {
      logger.error('Failed to logout')
    }
  }, [])

  const onPressSettings = useCallback(() => {
    navigation.navigate('SettingsTab')
  }, [navigation])
  const onPressNotification = useCallback(() => {
    navigation.navigate('Notification')
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

      <View style={[a.flex_row, a.gap_2xl, a.align_center]}>
        <NotificationBtn
          // hasNotification={hasNotification}
          count={unreadNotif}
          onPress={onPressNotification}
        />
        {/* Vertical */}
        <View style={styles.vertical} />
        <Menu>
          <MenuTrigger style={[a.flex_row, a.align_center, a.gap_2xs]}>
            <UserAvatar size={42} />
            {name.length > 0 && <Text style={{}}>{name}</Text>}
            <ChevronDown size={24} color={colors.gray4} />
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
export default HomeHeader

HomeHeader = memo(HomeHeader)

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
  vertical: {
    height: 12,
    width: 1,
    backgroundColor: '#000',
  },
})
