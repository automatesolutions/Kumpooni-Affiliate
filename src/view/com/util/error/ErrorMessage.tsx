import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native'
import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome'
import { useTheme } from '#/theme'
import { Text } from '#/components/Typography'

import { colors } from '#/lib/styles'

export function ErrorMessage({
  message,
  numberOfLines,
  style,
  onPressTryAgain,
}: {
  message: string
  numberOfLines?: number
  style?: StyleProp<ViewStyle>
  onPressTryAgain?: () => void
}) {
  const t = useTheme()

  return (
    <View
      testID="errorMessageView"
      style={[styles.outer, { backgroundColor: '#ec4868' }, style]}>
      <View style={[styles.errorIcon, { backgroundColor: '#d11043' }]}>
        <FontAwesomeIcon
          icon="exclamation"
          style={{ color: '#fff' } as FontAwesomeIconStyle}
          size={16}
        />
      </View>
      <Text
        style={[styles.message, t.atoms.text_inverted]}
        numberOfLines={numberOfLines}>
        {message}
      </Text>
      {onPressTryAgain && (
        <TouchableOpacity
          testID="errorMessageTryAgainButton"
          style={styles.btn}
          onPress={onPressTryAgain}
          accessibilityRole="button"
          accessibilityLabel={`Retry`}
          accessibilityHint={`Retries the last action, which errored out`}>
          <FontAwesomeIcon
            icon="arrows-rotate"
            style={{ color: t.palette.negative_400 }}
            size={18}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  errorIcon: {
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  message: {
    flex: 1,
    paddingRight: 10,
  },
  btn: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
})
