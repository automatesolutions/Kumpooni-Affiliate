import React from 'react'
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import { Bell_Stroke2_Corner0_Rounded as Bell } from '#/components/icons/Bell'
import { colors } from '#/lib/styles'

type NotificationBtnProps = {
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  count?: string
}

export function NotificationBtn({
  style,
  onPress,
  count,
}: NotificationBtnProps) {
  const t = useTheme()
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Bell size="xl" style={{ color: '#000' }} />
      {count ? <View style={[styles.indicator]} /> : undefined}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    left: '60%',
    top: 2,
    backgroundColor: colors.red4,
    paddingHorizontal: 3,
    height: 11,
    width: 11,
    paddingBottom: 1,
    borderRadius: 6,
    zIndex: 1,
  },
  notificationCountLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.white,
    fontVariant: ['tabular-nums'],
  },
})
