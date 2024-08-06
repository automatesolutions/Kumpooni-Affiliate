import React from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome'
import {atoms as a, useTheme} from '#/theme'
import {useWebMediaQueries} from '#/lib/hooks/useWebMediaQueries'

import {UserGroupIcon} from 'lib/icons'
import {isWeb} from 'platform/detection'
import {Growth_Stroke2_Corner0_Rounded as Growth} from '#/components/icons/Growth'
import {Text} from '#/components/Typography'

export function EmptyState({
  testID,
  icon,
  message,
  style,
}: {
  testID?: string
  icon: IconProp | 'user-group' | 'growth'
  message: string
  style?: StyleProp<ViewStyle>
}) {
  // const pal = usePalette('default')
  const t = useTheme()
  const {isTabletOrDesktop} = useWebMediaQueries()
  const iconSize = isTabletOrDesktop ? 80 : 64
  return (
    <View
      testID={testID}
      style={[
        styles.container,
        isTabletOrDesktop && {paddingRight: 20},
        style,
      ]}>
      <View
        style={[
          styles.iconContainer,
          isTabletOrDesktop && styles.iconContainerBig,
          t.atoms.bg_contrast_25,
        ]}>
        {icon === 'user-group' ? (
          <UserGroupIcon size={iconSize} />
        ) : icon === 'growth' ? (
          <Growth width={iconSize} fill={t.palette.contrast_300} />
        ) : (
          <FontAwesomeIcon
            icon={icon}
            size={iconSize}
            style={[{color: t.palette.contrast_300} as FontAwesomeIconStyle]}
          />
        )}
      </View>
      <Text style={[{color: t.palette.contrast_700}, styles.text, a.text_xl]}>
        {message}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: isWeb ? 1 : undefined,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 80,
    marginTop: 30,
  },
  iconContainerBig: {
    width: 140,
    height: 140,
    marginTop: 50,
  },
  text: {
    textAlign: 'center',
    paddingTop: 20,
  },
})
