import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Text } from '#/components/Typography'
import { atoms as a } from '#/theme'

type HStackProps = {
  style?: StyleProp<ViewStyle>
}
export function HStack({
  children,
  style,
}: React.PropsWithChildren<HStackProps>) {
  return <View style={[a.flex_row, a.align_center, style]}>{children}</View>
}

const styles = StyleSheet.create({})
