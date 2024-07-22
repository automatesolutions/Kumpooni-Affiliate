import { colors } from '#/lib/styles'
import { isAndroid } from '#/platform/detection'
import { useTheme } from '#/theme'
import { color } from '#/theme/tokens'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { memo, useMemo } from 'react'
import { Image, StyleSheet, View } from 'react-native'

export type UserAvatarType = 'user'

interface BaseUserAvatarProps {
  type?: UserAvatarType
  size: number
  avatar?: string | null
}
interface UserAvatarProps extends BaseUserAvatarProps {
  usePlainRNImage?: boolean
}

let UserAvatar = ({
  type = 'user',
  size,
  avatar,
}: UserAvatarProps): React.ReactNode => {
  const backgroundColor = color.gray_100
  const t = useTheme()
  const aviStyle = useMemo(() => {
    return {
      width: size,
      height: size,
      borderRadius: Math.floor(size / 2),
      backgroundColor,
    }
  }, [type, size, backgroundColor])

  const alert = useMemo(() => {
    return (
      <View style={[styles.alertIconContainer, t.atoms.bg]}>
        <FontAwesomeIcon
          icon="exclamation-circle"
          style={styles.alertIcon}
          size={Math.floor(size / 3)}
        />
      </View>
    )
  }, [size])

  return (
    avatar && (
      <View style={{ width: size, height: size }}>
        <Image
          accessibilityIgnoresInvertColors
          testID="userAvatarImage"
          style={aviStyle}
          resizeMode="cover"
          source={{ uri: avatar }}
          blurRadius={0}
        />
        {alert}
      </View>
    )
  )
}
UserAvatar = memo(UserAvatar)
export { UserAvatar }

const styles = StyleSheet.create({
  editButtonContainer: {
    position: 'absolute',
    width: 24,
    height: 24,
    bottom: 0,
    right: 0,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray5,
  },
  alertIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 100,
  },
  alertIcon: {
    color: colors.red3,
  },
})
