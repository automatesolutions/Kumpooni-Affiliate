import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'

import { atoms as a, useTheme } from '#/theme'
import {
  useLoggedOutView,
  useLoggedOutViewControls,
} from '#/state/shell/logged-out'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { isIOS, isNative } from '#/platform/detection'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '#/lib/routes/types'

import { ErrorBoundary } from '../util/ErrorBoundary'
import { Login } from '#/screens/Login'

enum ScreenState {
  S_Login,
}
export function LoggedOut({ onDismiss }: { onDismiss?: () => void }) {
  const t = useTheme()
  const { setShowLoggedOut } = useLoggedOutViewControls()

  const [screenState, setScreenState] = React.useState<ScreenState>(
    ScreenState.S_Login,
  )

  const navigation = useNavigation<NavigationProp>()
  const onPressSearch = React.useCallback(() => {
    navigation.navigate('MyProfileTab')
  }, [navigation])

  const onPressDismiss = React.useCallback(() => {
    if (onDismiss) {
      onDismiss()
    }
  }, [onDismiss])

  return (
    <View testID="noSessionView" style={[a.h_full, t.atoms.bg]}>
      <ErrorBoundary>
        {onDismiss ? (
          <Pressable
            accessibilityHint={`Go back`}
            accessibilityLabel={`Go back`}
            accessibilityRole="button"
            style={{
              position: 'absolute',
              top: isIOS ? 0 : 20,
              left: 10,
              padding: 10,
              zIndex: 100,
              backgroundColor: t.palette.white,
              borderRadius: 100,
            }}
            onPress={onPressDismiss}>
            <FontAwesomeIcon
              icon="x"
              size={14}
              style={{
                color: String(t.atoms.text.color),
              }}
            />
          </Pressable>
        ) : null}

        {screenState === ScreenState.S_Login ? <Login /> : undefined}
      </ErrorBoundary>
    </View>
  )
}

const styles = StyleSheet.create({})
