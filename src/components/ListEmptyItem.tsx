import React from 'react'
import {View, StyleSheet, StyleProp, TextStyle, ViewStyle} from 'react-native'
import {Text} from '#/components/Typography'
import {useTheme, atoms as a} from '#/theme'

type EmptyDataProps = {
  style?: StyleProp<ViewStyle>
  textStlye?: StyleProp<TextStyle>
}

export function ListEmptyItem(props: EmptyDataProps) {
  const t = useTheme()
  return (
    <View style={[a.justify_center, a.align_center, props.style]}>
      <Text
        style={[
          a.font_bold,
          a.text_4xl,
          t.atoms.text_contrast_low,
          props.textStlye,
        ]}>
        Empty Data
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({})
