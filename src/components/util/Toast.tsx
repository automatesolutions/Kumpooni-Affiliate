import { IS_TEST } from '#/env'

import React from 'react'
import {
  Animated,
  StyleSheet,
  View,
  ViewStyle,
  useAnimatedValue,
} from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import { Text } from '../Typography'
import { useTheme } from '#/theme'

const TIMEOUT = 2e3

export function show(message: string) {
  if (IS_TEST) return
  const item = new RootSiblings(<Toast message={message} />)
  setTimeout(() => {
    item.destroy()
  }, TIMEOUT)
}
function Toast({ message }: { message: string }) {
  const interp = useAnimatedValue(0)
  const t = useTheme()
  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(interp, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.delay(3700),
      Animated.timing(interp, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start()
  })

  const opacityStyle: ViewStyle = { opacity: interp }

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View
        style={[{ borderColor: '#f0e9e9' }, styles.toast, opacityStyle]}>
        <Text style={{ color: '#fff' }}>{message}</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  toast: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    marginHorizontal: 6,
    backgroundColor: '#000',
  },
})
