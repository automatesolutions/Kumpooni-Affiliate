import { StyleProp, StyleSheet, TextStyle, View } from 'react-native'
import React from 'react'
import { ViewStyleProp, atoms as a } from '#/theme'
import { Dot } from 'lucide-react-native'
import { Text } from './Typography'

type StatusProps = React.PropsWithChildren<{
  color?: string
  textStyle?: StyleProp<TextStyle>
}>

export function Status({ color, textStyle, children, ...props }: StatusProps) {
  return (
    <View
      style={[
        a.flex_row,
        a.align_center,
        { backgroundColor: color, borderRadius: 8 },
      ]}
      {...props}>
      <Text style={[{ padding: 10 }, textStyle]}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
