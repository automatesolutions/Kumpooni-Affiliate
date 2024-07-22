import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

import { atoms as a, flatten, useTheme } from '#/theme'
import { Warning_Stroke2_Corner0_Rounded as Warning } from '#/components/icons/Warning'
import { Text } from '#/components/Typography'

export function FormError({
  error,
  style,
}: {
  error?: string
  style?: StyleProp<ViewStyle>
}) {
  const t = useTheme()

  if (!error) return null

  return (
    <View
      style={[
        { backgroundColor: t.palette.negative_400 },
        a.flex_row,
        a.rounded_sm,
        a.p_sm,
        a.gap_sm,
        flatten(style),
      ]}>
      <Warning fill={t.palette.white} size="lg" />
      <View style={[a.flex_1]}>
        <Text style={[{ color: t.palette.white }, a.font_bold, a.leading_snug]}>
          {error}
        </Text>
      </View>
    </View>
  )
}
